import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPage from '@/components/blog/BlogPage';

export const metadata: Metadata = {
  title: 'Blog | InspirED Sask',
  description: 'Read about our latest news, events and updates.',
};

function Blog() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <BlogPage />
      </main>
      <Footer />
    </div>
  );
}
export default Blog;
