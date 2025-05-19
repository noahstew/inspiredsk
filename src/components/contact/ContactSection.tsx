import ImageBubble from '@/components/contact/ImageBubble';
import ContactForm from '@/components/contact/ContactForm';

function ContactSection() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-8 py-16 bg-cream">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-36">
        {/* Left: Form (2/3) */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-6xl font-league-spartan font-bold text-pistachio mb-8">
            Let’s Get In Touch!
          </h2>
          <ContactForm />
        </div>

        <div className="hidden lg:flex w-full lg:w-1/3 relative  justify-center items-center font-cooper  ">
          <ImageBubble />
        </div>
      </div>
    </section>
  );
}
export default ContactSection;
