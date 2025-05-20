'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '@/utils/supabase/supabaseClient';

// Define our BlogPost type based on the expected database schema
interface BlogPost {
  id: string;
  title: string;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

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

  // Format date for display
  const formatDate = (dateString: string) => {
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
                  Click "Add New Post" to create your first blog post.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {posts.map((post) => (
                  <Link
                    href={`/admin/blog/${post.id}`}
                    key={post.id}
                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2 group-hover:text-pistachio">
                          {post.title}
                        </h2>
                        <span className="bg-pistachio/10 text-pistachio text-sm px-3 py-1 rounded-full">
                          {formatDate(post.published_at)}
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
                        <span>{post.author}</span>

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
                          Last updated:{' '}
                          {formatDate(post.updated_at || post.created_at)}
                        </span>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <span className="text-pistachio hover:text-peach inline-flex items-center">
                          Edit Post
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
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
