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

  // Fetch links from Supabase when component mounts
  useEffect(() => {
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

    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-cream p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
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
                      Order
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created
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
                    links.map((link) => (
                      <tr key={link.id} className="hover:bg-gray-50">
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
                              <Image
                                src={link.image_url}
                                alt={link.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          ) : (
                            <span className="text-gray-400">No image</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {link.sort_order}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(link.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
