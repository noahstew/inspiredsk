import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/components/landing/HomePage';

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
