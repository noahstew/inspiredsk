'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import supabase from '@/utils/supabase/supabaseClient';
import { BlogPost } from '@/components/blog/BlogPostForm';

function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);

        console.log('Current date for comparison:', new Date().toISOString());

        const response = await supabase
          .from('blog_posts')
          .select('*')
          .not('published_at', 'is', null) // Only published posts
          .order('published_at', { ascending: false }); // Newest first

        console.log('Raw query response:', response);
        const { data, error } = response;

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Function to format dates
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to truncate text for previews
  const truncateText = (text: string, maxLength: number = 150) => {
    if (!text) return '';
    // Add a period and space after headings, paragraphs, and list items
    let processedText = text
      .replace(/<\/h[1-6]>/gi, '. ')
      .replace(/<\/p>/gi, '. ')
      .replace(/<\/li>/gi, '. ');
    // Strip all HTML tags
    const strippedText = processedText.replace(/<[^>]*>/g, '');
    if (strippedText.length <= maxLength) return strippedText;
    return `${strippedText.substring(0, maxLength)}...`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pistachio"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-persimmon/10 border-l-4 border-persimmon text-persimmon p-4 rounded my-6">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-screen font-league-spartan">
      <h1 className="text-4xl md:text-5xl font-bold text-olive font-league-spartan mb-8 text-center">
        Our Blog
      </h1>
      <p className="text-lg text-pistachio mb-8 text-center">
        Read about our latest news, events, and updates from the InspirED team
        here!
      </p>
      <div className="h-2 w-full bg-persimmon mt-8 mb-16 rounded-2xl"></div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No blog posts available yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  {post.image_urls && post.image_urls.length > 0 ? (
                    <Image
                      src={post.image_urls[0]}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="bg-white h-full flex items-center justify-center">
                      <div className="relative w-3/4 h-3/4">
                        <Image
                          src="/logo.png"
                          alt="InspirED SK Logo"
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{formatDate(post.published_at)}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author_name}</span>
                  </div>

                  <h2 className="text-xl font-bold text-charcoal mb-3 group-hover:text-pistachio transition-colors">
                    {post.title}
                  </h2>

                  <div className="text-gray-600 mb-4 flex-grow">
                    {truncateText(post.content)}
                  </div>

                  <div className="mt-auto">
                    <span className="inline-flex items-center text-pistachio font-semibold group-hover:text-peach transition-colors">
                      Read more
                      <svg
                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPage;
