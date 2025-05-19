import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/contact/ContactSection';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | InspiredSK',
  description: 'Contact us for more information or inquiries.',
};

function Contact() {
  return (
    <section className="h-screen w-screen">
      <Navbar />
      <ContactSection />
      <Footer />
    </section>
  );
}
export default Contact;
