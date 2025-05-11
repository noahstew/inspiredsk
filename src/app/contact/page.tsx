import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/contact/ContactSection';

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
