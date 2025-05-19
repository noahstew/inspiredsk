'use client';

import supabase from '@/utils/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define our Link type based on the database schema
interface LinkItem {
  id: string;
  title: string;
  url: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export default function AdminLinks() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  // New state for the add link modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLink, setNewLink] = useState<{
    title: string;
    url: string;
    image_url: string;
  }>({
    title: '',
    url: '',
    image_url: '',
  });
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    url?: string;
  }>({});

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Fetch links from Supabase when component mounts
  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    // Clear delete confirmation when clicking outside the button
    const handleClickOutside = () => {
      setDeleteConfirmId(null);
    };

    if (deleteConfirmId) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [deleteConfirmId]);

  async function fetchLinks() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (err) {
      console.error('Error fetching links:', err);
      setError('Failed to load links. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const moveLink = async (id: string, direction: 'up' | 'down') => {
    // Find the current index
    const currentIndex = links.findIndex((link) => link.id === id);
    if (currentIndex === -1) return;

    // Calculate new index based on direction
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    // Check if the new index is valid
    if (newIndex < 0 || newIndex >= links.length) return;

    // Create a copy of the links array
    const updatedLinks = [...links];

    // Swap the items
    [updatedLinks[currentIndex], updatedLinks[newIndex]] = [
      updatedLinks[newIndex],
      updatedLinks[currentIndex],
    ];

    // Update the sort_order for each item
    const reorderedLinks = updatedLinks.map((link, index) => ({
      ...link,
      sort_order: index,
    }));

    // Update state
    setLinks(reorderedLinks);

    // Save to database
    try {
      setIsSaving(true);
      setSaveMessage(null);

      // Update the two items that changed positions
      const [item1, item2] = [
        {
          id: reorderedLinks[currentIndex].id,
          sort_order: reorderedLinks[currentIndex].sort_order,
        },
        {
          id: reorderedLinks[newIndex].id,
          sort_order: reorderedLinks[newIndex].sort_order,
        },
      ];

      const { error: error1 } = await supabase
        .from('links')
        .update({ sort_order: item1.sort_order })
        .eq('id', item1.id);

      const { error: error2 } = await supabase
        .from('links')
        .update({ sort_order: item2.sort_order })
        .eq('id', item2.id);

      if (error1 || error2) throw new Error('Failed to update order');

      setSaveMessage({
        text: 'Order updated successfully',
        type: 'success',
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error updating order:', err);
      setSaveMessage({
        text: 'Failed to update order. Please try again.',
        type: 'error',
      });
      // Revert to original order by refetching
      fetchLinks();
    } finally {
      setIsSaving(false);
    }
  };

  // Function to handle input changes in the add link form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Function to validate form
  const validateForm = () => {
    const errors: {
      title?: string;
      url?: string;
    } = {};

    if (!newLink.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!newLink.url.trim()) {
      errors.url = 'URL is required';
    } else if (!newLink.url.match(/^https?:\/\//i)) {
      errors.url = 'URL must start with http:// or https://';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSaving(true);

      // Get the next sort order value
      const nextSortOrder =
        links.length > 0
          ? Math.max(...links.map((link) => link.sort_order)) + 1
          : 0;

      // Prepare the new link data
      const linkData = {
        title: newLink.title,
        url: newLink.url,
        image_url: newLink.image_url || null,
        sort_order: nextSortOrder,
      };

      // Insert into database
      const { data, error } = await supabase
        .from('links')
        .insert(linkData)
        .select();

      if (error) throw error;

      // Update the links array with the new link
      if (data && data.length > 0) {
        setLinks([...links, data[0]]);
      }

      // Show success message
      setSaveMessage({
        text: 'Link added successfully',
        type: 'success',
      });

      // Close the modal and reset form
      setIsAddModalOpen(false);
      setNewLink({ title: '', url: '', image_url: '' });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error adding link:', err);
      setSaveMessage({
        text: 'Failed to add link. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Function to handle link deletion
  const handleDelete = async (id: string) => {
    // If not in confirm mode yet, enter confirm mode
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      return;
    }

    // Otherwise, proceed with deletion
    try {
      setIsSaving(true);
      setSaveMessage(null);

      // Find the item to delete
      const itemToDelete = links.find((link) => link.id === id);
      if (!itemToDelete) return;

      // Delete the item from the database
      const { error } = await supabase.from('links').delete().eq('id', id);

      if (error) throw error;

      // Create a new array without the deleted item
      const updatedLinks = links.filter((link) => link.id !== id);

      // Reorder remaining items
      const reorderedLinks = updatedLinks.map((link, index) => ({
        ...link,
        sort_order: index,
      }));

      // Update sort orders in database for all affected items
      const promises = reorderedLinks
        .filter(
          (link) =>
            link.sort_order !== links.find((l) => l.id === link.id)?.sort_order
        )
        .map((link) =>
          supabase
            .from('links')
            .update({ sort_order: link.sort_order })
            .eq('id', link.id)
        );

      if (promises.length > 0) {
        const results = await Promise.all(promises);
        if (results.some((result) => result.error)) {
          throw new Error('Failed to update order after deletion');
        }
      }

      // Update state
      setLinks(reorderedLinks);
      setDeleteConfirmId(null);

      setSaveMessage({
        text: 'Link deleted successfully',
        type: 'success',
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error deleting link:', err);
      setSaveMessage({
        text: 'Failed to delete link. Please try again.',
        type: 'error',
      });
      // Reset confirmation state
      setDeleteConfirmId(null);
      // Refresh links to ensure consistency
      fetchLinks();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with back button and Add Link button */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/admin"
            className="bg-pistachio hover:bg-peach text-white py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Admin
          </Link>

          <div className="flex items-center space-x-4">
            {isSaving && (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-pistachio mr-2"></div>
                <span className="text-gray-600">Saving...</span>
              </div>
            )}

            {saveMessage && (
              <div
                className={`text-sm px-4 py-2 rounded ${
                  saveMessage.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-persimmon/10 text-persimmon'
                }`}
              >
                {saveMessage.text}
              </div>
            )}

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-peach hover:bg-persimmon text-white py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center"
              disabled={isSaving}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Link
            </button>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-league-spartan font-bold text-pistachio mb-6">
          Manage Links
        </h1>

        {/* Loading and error states */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pistachio"></div>
            <p className="mt-4 text-charcoal">Loading links...</p>
          </div>
        )}

        {error && (
          <div className="bg-persimmon/10 border-l-4 border-persimmon text-persimmon p-4 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Links list */}
        {!isLoading && !error && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      URL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {links.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No links found. Add your first link to get started.
                      </td>
                    </tr>
                  ) : (
                    links.map((link, index) => (
                      <tr key={link.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium w-5 text-center">
                              {link.sort_order}
                            </span>
                            <div className="flex flex-col">
                              <button
                                onClick={() => moveLink(link.id, 'up')}
                                disabled={index === 0 || isSaving}
                                className={`p-1 rounded hover:bg-gray-200 ${
                                  index === 0
                                    ? 'opacity-30 cursor-not-allowed'
                                    : ''
                                }`}
                                aria-label="Move up"
                              >
                                <svg
                                  className="w-4 h-4 text-gray-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => moveLink(link.id, 'down')}
                                disabled={
                                  index === links.length - 1 || isSaving
                                }
                                className={`p-1 rounded hover:bg-gray-200 ${
                                  index === links.length - 1
                                    ? 'opacity-30 cursor-not-allowed'
                                    : ''
                                }`}
                                aria-label="Move down"
                              >
                                <svg
                                  className="w-4 h-4 text-gray-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-charcoal">
                            {link.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pistachio hover:text-peach truncate block max-w-xs"
                          >
                            {link.url}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {link.image_url ? (
                            <div className="h-10 w-10 relative">
                              <img
                                src={link.image_url}
                                alt={link.title}
                                className="object-cover rounded h-10 w-10"
                              />
                            </div>
                          ) : (
                            <span className="text-gray-400">No image</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(link.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleDelete(link.id)}
                            disabled={isSaving}
                            className={`p-2 rounded-full ${
                              deleteConfirmId === link.id
                                ? 'bg-persimmon/10 text-persimmon hover:bg-persimmon/20'
                                : 'text-gray-500 hover:text-persimmon hover:bg-gray-100'
                            }`}
                            aria-label={
                              deleteConfirmId === link.id
                                ? 'Confirm delete'
                                : 'Delete link'
                            }
                          >
                            {deleteConfirmId === link.id ? (
                              <div className="flex items-center">
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-1 text-xs font-medium">
                                  Confirm
                                </span>
                              </div>
                            ) : (
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9z"
                                  clipRule="evenodd"
                                />
                                <path d="M9 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                              </svg>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Link Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-cream z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-league-spartan font-bold text-pistachio">
                  Add New Link
                </h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddLink}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title <span className="text-persimmon">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newLink.title}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      formErrors.title ? 'border-persimmon' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-pistachio`}
                    placeholder="Link Title"
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-persimmon">
                      {formErrors.title}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    URL <span className="text-persimmon">*</span>
                  </label>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    value={newLink.url}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      formErrors.url ? 'border-persimmon' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-pistachio`}
                    placeholder="https://example.com"
                  />
                  {formErrors.url && (
                    <p className="mt-1 text-sm text-persimmon">
                      {formErrors.url}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="image_url"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image URL <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="image_url"
                    name="image_url"
                    value={newLink.image_url}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pistachio"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pistachio hover:bg-peach text-white rounded-md transition-colors duration-300 flex items-center"
                    disabled={isSaving}
                  >
                    {isSaving && (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    )}
                    Add Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
