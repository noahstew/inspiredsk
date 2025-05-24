'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BlogPostForm, { BlogPost } from '@/components/blog/BlogPostForm';
import supabase from '@/utils/supabase/supabaseClient';

export default function EditBlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Post not found');

        setPost(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pistachio"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
        <div className="text-red-600">{error || 'Post not found'}</div>
        <button
          onClick={() => router.push('/admin/blog')}
          className="mt-4 bg-gray-200 px-4 py-2 rounded"
        >
          Back to Blog Posts
        </button>
      </div>
    );
  }

  return <BlogPostForm initialData={post} isEditing={true} />;
}
