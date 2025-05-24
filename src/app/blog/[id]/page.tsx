'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import supabase from '@/utils/supabase/supabaseClient';
import { BlogPost } from '@/components/blog/BlogPostForm';
import 'react-quill-new/dist/quill.snow.css';

// Custom CSS for Quill content
const quillStyles = `
  .blog-content {
    color: #333;
    font-size: 1.1rem;
    line-height: 1.8;
  }

  .blog-content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #456a47; /* pistachio */
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-family: var(--font-league-spartan, sans-serif);
  }

  .blog-content h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #456a47; /* pistachio */
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
    font-family: var(--font-league-spartan, sans-serif);
  }

  .blog-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #456a47; /* pistachio */
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-family: var(--font-league-spartan, sans-serif);
  }

  .blog-content p {
    margin-bottom: 1.25rem;
  }

  /* Ensure links are properly styled */
  .blog-content a,
  .blog-content a[href] {
    color: #ef774e !important; /* peach */
    text-decoration: underline !important;
    transition: color 0.2s;
  }

  .blog-content a:hover,
  .blog-content a[href]:hover {
    color: #e45832 !important; /* darker peach */
  }

  /* Fix bullet list formatting */
  .blog-content ul {
    list-style-type: disc !important;
    padding-left: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    display: block !important;
  }

  .blog-content ol {
    list-style-type: decimal !important;
    padding-left: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    display: block !important;
  }

  /* Ensure list items are properly styled */
  .blog-content ul > li {
    display: list-item !important;
    list-style-type: disc !important;
    margin-bottom: 0.5rem !important;
  }

  .blog-content ol > li {
    display: list-item !important;
    list-style-type: decimal !important;
    margin-bottom: 0.5rem !important;
  }

  /* Ensure nested lists have proper styling */
  .blog-content ul ul {
    list-style-type: circle !important;
    margin-top: 0.5rem !important;
  }

  .blog-content ul ul ul {
    list-style-type: square !important;
  }

  /* Fix for Quill's specific list classes */
  .blog-content .ql-bullet,
  .blog-content li.ql-bullet,
  .blog-content .quill-bullet-list > li {
    list-style-type: disc !important;
  }

  /* Fix italics */
  .blog-content em,
  .blog-content i,
  .blog-content .ql-italic {
    font-style: italic !important;
  }

  /* Fix bold text */
  .blog-content strong,
  .blog-content b,
  .blog-content .ql-bold {
    font-weight: bold !important;
  }

  /* Fix underlined text */
  .blog-content u,
  .blog-content .ql-underline {
    text-decoration: underline !important;
  }

  .blog-content blockquote {
    border-left: 4px solid #456a47;
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
    color: #555;
  }

  .blog-content pre {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }

  .blog-content img {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    border-radius: 4px;
  }

  .blog-content .ql-align-center {
    text-align: center;
  }

  .blog-content .ql-align-right {
    text-align: right;
  }

  .blog-content .ql-align-justify {
    text-align: justify;
  }

  .blog-content .ql-indent-1 {
    padding-left: 3em;
  }

  .blog-content .ql-indent-2 {
    padding-left: 6em;
  }

  .blog-content .ql-size-small {
    font-size: 0.75em;
  }

  .blog-content .ql-size-large {
    font-size: 1.5em;
  }

  .blog-content .ql-size-huge {
    font-size: 2em;
  }
`;

// Enhance the processQuillHtml function to fix more formatting issues
const processQuillHtml = (html: string) => {
  if (!html) return '';

  let processed = html;

  // Fix unordered lists
  processed = processed.replace(
    /<ul data-checked="(true|false)">/g,
    '<ul class="quill-bullet-list">'
  );

  // Ensure <p> tags that contain links have proper styling
  processed = processed.replace(
    /<a /g,
    '<a style="color: #ef774e; text-decoration: underline;" '
  );

  // Fix italics if needed
  processed = processed.replace(
    /<span class="ql-italic">(.*?)<\/span>/g,
    '<em>$1</em>'
  );

  // Make sure all links have underline
  processed = processed.replace(
    /<a href="(.*?)"(.*?)>/g,
    '<a href="$1"$2 style="color: #ef774e; text-decoration: underline;">'
  );

  // Fix list items to ensure proper bullets
  processed = processed.replace(/<li>/g, '<li style="display: list-item;">');

  // Fix lists with class="ql-list-bullet"
  processed = processed.replace(
    /<ul class="ql-list-bullet">/g,
    '<ul style="list-style-type: disc !important; padding-left: 1.5rem; margin-bottom: 1.5rem;">'
  );

  return processed;
};

function ViewBlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch post data
  useEffect(() => {
    async function fetchPost() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Post not found');

        setPost(data);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : 'Failed to load post';
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Image carousel controls
  const nextImage = useCallback(() => {
    if (!post?.image_urls?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.image_urls.length - 1 ? 0 : prevIndex + 1
    );
  }, [post?.image_urls?.length]);

  const prevImage = useCallback(() => {
    if (!post?.image_urls?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.image_urls.length - 1 : prevIndex - 1
    );
  }, [post?.image_urls?.length]);

  // Auto-advance carousel every 10 seconds
  useEffect(() => {
    if (!post?.image_urls?.length || post.image_urls.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, 10000);

    return () => clearInterval(interval);
  }, [post?.image_urls?.length, nextImage]);

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-cream">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pistachio"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-cream p-6 md:p-8 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <svg
            className="w-16 h-16 mx-auto text-persimmon mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-charcoal mb-2">
            Something Went Wrong
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'Unable to load blog post'}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-white bg-pistachio hover:bg-olive transition-colors"
          >
            Back to All Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Add the style tag with Quill styles */}
      <style jsx global>
        {quillStyles}
      </style>

      {/* Image carousel (if images exist) */}
      {post.image_urls && post.image_urls.length > 0 && (
        <div className="relative">
          {/* Back button positioned on the image area */}
          <div className="absolute top-4 left-4 z-20">
            <Link
              href="/blog"
              className="inline-flex items-center px-3 py-2 bg-white/90 hover:bg-white text-pistachio hover:text-olive rounded-md transition-all shadow-md"
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
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Full width carousel with no overlay */}
          <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
            {post.image_urls.map((url, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={url}
                  alt={`${post.title} - image ${idx + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>

          {/* Carousel controls (only show if multiple images) */}
          {post.image_urls.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal rounded-full p-3 z-10 transition-all hover:scale-110 shadow-md"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal rounded-full p-3 z-10 transition-all hover:scale-110 shadow-md"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {post.image_urls.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-3 w-3 rounded-full transition-colors shadow-md ${
                      idx === currentImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/70 hover:bg-white'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Content section - Full width with max-width constraints */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-28 xl:px-44 py-16">
        {/* Title and meta info */}
        <div className="mb-12">
          <h1 className="text-5xl text-5xl font-bold text-pistachio font-league-spartan mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center text-gray-600">
            <span className="flex items-center">
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
              {post.author_name}
            </span>

            <span className="mx-3">•</span>

            <span className="flex items-center">
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
              {formatDate(post.published_at)}
            </span>
          </div>
        </div>

        {/* Only show back button here if no images */}
        {(!post.image_urls || post.image_urls.length === 0) && (
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 bg-pistachio text-white rounded-md hover:bg-olive transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        )}
        <div className="h-2 w-full bg-peach mb-4 rounded-2xl"></div>

        {/* Post content - styled for Quill without container */}
        <div className="ql-editor blog-content">
          <div
            dangerouslySetInnerHTML={{ __html: processQuillHtml(post.content) }}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewBlogPostPage;
