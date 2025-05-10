import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/landing/Hero';

export default function Home() {
  return (
    <div>
      {/* NavBar & Hero */}
      <div className="h-screen w-screen bg-blue-500">
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </div>
  );
}
