import type { Metadata } from 'next';
import supabase from '@/utils/supabase/supabaseClient';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  try {
    const { data: post } = await supabase
      .from('blog_posts')
      .select('title, content')
      .eq('id', id)
      .single();

    if (!post) {
      return {
        title: 'Blog Post Not Found | InspirED SK',
      };
    }

    return {
      title: `${post.title} | InspirED`,
      description: post.content
        ? post.content.substring(0, 150).replace(/<[^>]*>/g, '')
        : 'Read our latest blog post.',
      openGraph: {
        title: post.title,
        description: post.content
          ? post.content.substring(0, 150).replace(/<[^>]*>/g, '')
          : 'Read our latest blog post.',
        type: 'article',
      },
    };
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
    return {
      title: 'Blog Post | InspirED SK',
      description: 'View our resources and announcements.',
    };
  }
}
