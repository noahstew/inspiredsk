'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import supabase from '@/utils/supabase/supabaseClient';
import LinkCard from './LinkCard';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  image_url: string | null;
  sort_order: number;
}

function Hero() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen w-full bg-cream px-4 py-12 md:py-16 ">
      <div className="max-w-5xl mx-auto">
        {/* Hero section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-league-spartan font-bold text-pistachio mb-6">
            We are InspirED!
          </h1>
          {/* Map component placeholder - Uncomment when map component is ready */}
          {/* <div className="h-64 bg-gray-200 rounded-lg mb-8">Map Component</div> */}
        </section>

        {/* Links and Resources section */}
        <section className="mb-16">
          <h2 className="text-3xl font-league-spartan font-bold text-peach mb-8 text-center">
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

        {/* Social Media section */}
        <section className="mb-12">
          {/* Contact us Call to action */}
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-pistachio hover:bg-olive text-white font-medium rounded-md transition-colors"
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Hero;
