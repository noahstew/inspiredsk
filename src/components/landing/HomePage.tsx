'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import supabase from '@/utils/supabase/supabaseClient';
import LinkCard from './LinkCard';
import Hero from './Hero';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  image_url: string | null;
  sort_order: number;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published_at: string;
  author_name: string;
  image_urls: string[] | null;
}

function HomePage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [latestPost, setLatestPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refs and state for fade-in on scroll
  const linksSectionRef = useRef<HTMLDivElement>(null);
  const blogSectionRef = useRef<HTMLDivElement>(null);
  const [linksVisible, setLinksVisible] = useState(false);
  const [blogVisible, setBlogVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const { data: linksData, error: linksError } = await supabase
          .from('links')
          .select('*')
          .order('sort_order', { ascending: true });

        if (linksError) throw linksError;

        const { data: blogData, error: blogError } = await supabase
          .from('blog_posts')
          .select('*')
          .not('published_at', 'is', null)
          .lte('published_at', new Date().toISOString())
          .order('published_at', { ascending: false })
          .limit(1);

        if (blogError) throw blogError;

        setLinks(linksData || []);
        setLatestPost(blogData && blogData.length > 0 ? blogData[0] : null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Fade-in on scroll logic
  useEffect(() => {
    const observerLinks = new IntersectionObserver(
      ([entry]) => setLinksVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const observerBlog = new IntersectionObserver(
      ([entry]) => setBlogVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (linksSectionRef.current) observerLinks.observe(linksSectionRef.current);
    if (blogSectionRef.current) observerBlog.observe(blogSectionRef.current);

    return () => {
      observerLinks.disconnect();
      observerBlog.disconnect();
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (!text) return '';
    const strippedText = text.replace(/<[^>]*>/g, '');
    if (strippedText.length <= maxLength) return strippedText;
    return `${strippedText.substring(0, maxLength)}...`;
  };

  return (
    <div className="min-h-screen w-full bg-cream px-4 py-12 md:py-16 ">
      <div className="max-w-5xl mx-auto">
        {/* Hero section */}
        <section className="mb-16 text-center">
          <Hero />
        </section>

        {/* Links and Resources section */}
        <section
          ref={linksSectionRef}
          className="mb-16"
          style={{
            opacity: linksVisible ? 1 : 0,
            transform: linksVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1s ease-out 0.2s, transform 1s ease-out 0.2s',
          }}
        >
          <h2 className="text-3xl font-league-spartan font-bold text-persimmon mb-8 text-center">
            Check out our resources and links below.
          </h2>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pistachio"></div>
            </div>
          )}

          {error && (
            <div className="bg-persimmon/10 border-l-4 border-persimmon text-persimmon p-4 rounded mb-6">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && links.length === 0 && (
            <p className="text-center text-gray-600">
              No links available at the moment.
            </p>
          )}

          <div className="flex flex-col space-y-4">
            {links.map((link) => (
              <div key={link.id} className="w-full">
                <LinkCard
                  title={link.title}
                  url={link.url}
                  imageUrl={link.image_url}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Latest Blog Post Section */}
        <section
          ref={blogSectionRef}
          className="mb-16"
          style={{
            opacity: blogVisible ? 1 : 0,
            transform: blogVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s',
          }}
        >
          <h2 className="text-3xl font-league-spartan font-bold text-persimmon mb-8 text-center">
            Latest from our Blog
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pistachio"></div>
            </div>
          ) : latestPost ? (
            <Link href={`/blog/${latestPost.id}`} className="block">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="md:flex">
                  {/* Post thumbnail */}
                  <div className="md:w-1/3 relative">
                    {latestPost.image_urls &&
                    latestPost.image_urls.length > 0 ? (
                      <div className="h-48 md:h-full relative">
                        <Image
                          src={latestPost.image_urls[0]}
                          alt={latestPost.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="h-48 md:h-full bg-white flex items-center justify-center">
                        <div className="relative w-3/4 h-3/4">
                          <Image
                            src="/logo.png"
                            alt="InspirED SK Logo"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Post content */}
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{formatDate(latestPost.published_at)}</span>
                      <span className="mx-2">•</span>
                      <span>{latestPost.author_name}</span>
                    </div>

                    <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-pistachio">
                      {latestPost.title}
                    </h3>

                    <p className="text-gray-600 mb-4">
                      {truncateText(latestPost.content)}
                    </p>

                    <div className="flex items-center text-pistachio font-semibold hover:text-peach transition-colors">
                      Read more
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <p className="text-center text-gray-600">
              No blog posts available yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default HomePage;
