'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '@/utils/supabase/supabaseClient';
import { BlogPost } from '@/components/blog/BlogPostForm';

function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts from Supabase when component mounts
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Delete blog post
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Stop link navigation
    e.stopPropagation(); // Prevent event bubbling

    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);

      if (error) throw error;

      // Filter out the deleted post from state
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';

    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-cream p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with back button and Add Post button */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/admin"
            className="bg-pistachio hover:bg-olive text-white py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center"
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

          <Link
            href="/admin/blog/new"
            className="bg-peach hover:bg-persimmon text-white py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center"
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
            Add New Post
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-league-spartan font-bold text-pistachio mb-6">
          Manage Blog Posts
        </h1>

        {/* Loading and error states */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pistachio"></div>
            <p className="mt-4 text-charcoal">Loading blog posts...</p>
          </div>
        )}

        {error && (
          <div className="bg-persimmon/10 border-l-4 border-persimmon text-persimmon p-4 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Blog posts list */}
        {!isLoading && !error && (
          <div>
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 mb-4">No blog posts found.</p>
                <p className="text-gray-500">
                  Click &quot;Add New Post&quot; to create your first blog post.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2 group-hover:text-pistachio">
                          {post.title}
                        </h2>
                        <span className="bg-pistachio/10 text-pistachio text-sm px-3 py-1 rounded-full">
                          Published date: {formatDate(post.published_at)}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-500 mt-3">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{post.author_name}</span>

                        <span className="mx-3">•</span>

                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          Created: {formatDate(post.created_at ?? null)}
                        </span>
                      </div>

                      <div className="mt-4 flex justify-end space-x-4">
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="text-pistachio hover:text-peach inline-flex items-center"
                        >
                          <svg
                            className="w-5 h-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </Link>

                        <button
                          onClick={(e) => handleDelete(post.id!, e)}
                          className="text-persimmon hover:text-persimmon/80 inline-flex items-center"
                        >
                          <svg
                            className="w-5 h-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBlog;
