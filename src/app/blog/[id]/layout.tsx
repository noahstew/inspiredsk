import type { Metadata } from 'next';
import supabase from '@/utils/supabase/supabaseClient';

// Define types
type Props = {
  params: { id: string };
};

// Generate dynamic metadata based on the blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get the post ID from params
  const id = params.id;

  try {
    // Fetch the blog post data
    const { data: post } = await supabase
      .from('blog_posts')
      .select('title, content')
      .eq('id', id)
      .single();

    // If post found, use its title; otherwise use fallback
    if (post) {
      return {
        title: `${post.title} | InspirED Blog`,
        description: post.content
          ? post.content.substring(0, 150).replace(/<[^>]*>/g, '')
          : 'Read our latest blog post.',
        // You can add more metadata like OpenGraph tags too:
        openGraph: {
          title: post.title,
          description: post.content
            ? post.content.substring(0, 150).replace(/<[^>]*>/g, '')
            : 'Read our latest blog post.',
          type: 'article',
        },
      };
    }
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
  }

  // Fallback metadata if fetching fails
  return {
    title: 'Blog Post | InspirED SK',
    description: 'View our resources and announcements.',
  };
}

// Your regular layout component
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
