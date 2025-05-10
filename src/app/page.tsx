import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div>
      {/* NavBar & Hero */}
      <div className="h-screen w-screen bg-blue-500">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}
