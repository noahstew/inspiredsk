import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPage from '@/components/blog/BlogPage';

export const metadata: Metadata = {
  title: 'Blog | InspiredSK',
  description: 'Read about our latest news, events and updates.',
};

function Blog() {
  return (
    <div>
      <Navbar />
      <BlogPage />
      <Footer />
    </div>
  );
}
export default Blog;
