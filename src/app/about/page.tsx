import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AboutClientSections from '@/components/about/AboutClientSections';

export const metadata: Metadata = {
  title: 'About | InspiredSK',
  description: 'Learn more about InspiredSK and our mission.',
};

export default function About() {
  return (
    <section>
      <Navbar />
      <AboutClientSections />
      <Footer />
    </section>
  );
}
