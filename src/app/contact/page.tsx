import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/contact/ContactSection';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | InspirED Sask',
  description: "Want to volunteer? partner? Let's get in touch!",
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
