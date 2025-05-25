'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import supabase from '@/utils/supabase/supabaseClient';

// Define type for blog post
export interface BlogPost {
  id?: string;
  author_name: string;
  title: string;
  published_at: string | null;
  content: string;
  image_urls: string[];
  created_at?: string;
}

// Props for the form component
interface BlogPostFormProps {
  initialData?: BlogPost; // For editing existing posts
  isEditing?: boolean; // Whether we're editing or creating
  onSuccess?: () => void; // Optional callback after success
}

// Upload helper function
async function uploadImageToSupabaseLocal(file: File) {
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
  const filePath = `blog_${timestamp}.${fileExt}`;

  const { error } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (error) {
    console.error('Upload error:', error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function BlogPostForm({
  initialData,
  isEditing = false,
  onSuccess,
}: BlogPostFormProps) {
  // Initialize state with initialData if provided (for editing)
  const [authorName, setAuthorName] = useState(initialData?.author_name || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [publishedAt, setPublishedAt] = useState(
    initialData?.published_at
      ? new Date(initialData.published_at).toISOString().slice(0, 16)
      : ''
  );
  const [isDraft, setIsDraft] = useState(!initialData?.published_at);
  const [content, setContent] = useState(initialData?.content || '');
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    initialData?.image_urls || []
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
  };

  const handleRemoveExistingImage = (urlToRemove: string) => {
    setExistingImages(existingImages.filter((url) => url !== urlToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // Upload new images if any
      const newImageUrls: string[] = [];
      for (const file of images) {
        const url = await uploadImageToSupabaseLocal(file);
        newImageUrls.push(url);
      }

      // Combine existing and new images
      const allImageUrls = [...existingImages, ...newImageUrls];

      const blogData = {
        author_name: authorName,
        title,
        published_at: isDraft
          ? null
          : publishedAt
          ? new Date(publishedAt).toISOString()
          : null,
        content,
        image_urls: allImageUrls,
      };

      if (isEditing && initialData?.id) {
        // Update existing post
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', initialData.id);

        if (updateError) throw updateError;
      } else {
        // Create new post
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([
            {
              ...blogData,
              created_at: new Date().toISOString(),
            },
          ]);

        if (insertError) throw insertError;
      }

      // Handle success
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/admin/blog');
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch post';
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? 'Edit Blog Post' : 'Add Blog Post'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Author Name</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isDraft"
              checked={isDraft}
              onChange={(e) => setIsDraft(e.target.checked)}
              className="mr-2 h-5 w-5 text-pistachio"
            />
            <label htmlFor="isDraft" className="font-semibold cursor-pointer">
              Save as Draft
            </label>
          </div>

          {!isDraft && (
            <div className="mb-4">
              <label className="block font-semibold mb-1">Publish Date</label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                This does not schedule the post for publishing. It will be
                published immediately. This just is used to order the posts by
                recency.
              </p>
            </div>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>

        {/* Display existing images with delete option */}
        {existingImages.length > 0 && (
          <div>
            <label className="block font-semibold mb-1">Existing Images</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {existingImages.map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt={`Image ${idx + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(url)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload new images */}
        <div>
          <label className="block font-semibold mb-1">
            {isEditing ? 'Add More Images' : 'Images'} (up to 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border rounded px-3 py-2"
          />
          {images.length > 0 && (
            <div className="flex gap-2 mt-2">
              {images.map((img, idx) => (
                <span key={idx} className="text-xs text-gray-600">
                  {img.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {error && <div className="text-red-600">{error}</div>}

        {/* Add button container with flex display */}
        <div className="flex items-center justify-between">
          <button
            type="button" // Important: type="button" prevents form submission
            onClick={() => router.push('/admin/blog')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-medium transition-colors"
          >
            Go Back Without Saving
          </button>

          <button
            type="submit"
            className="bg-pistachio hover:bg-olive text-white px-4 py-2 rounded font-bold transition-colors"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : isEditing ? 'Update Post' : 'Add Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
