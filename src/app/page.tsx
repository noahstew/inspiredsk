import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/components/landing/HomePage';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Home | InspirED Sask',
  description:
    'Welcome to InspirED Sask, your hub for educational resources and community engagement in Saskatchewan.',
};

export default function Home() {
  return (
    <div>
      {/* NavBar & Hero */}
      <div className="">
        <Navbar />
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}
