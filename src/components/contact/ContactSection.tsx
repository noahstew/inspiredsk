'use client';

import ImageBubble from '@/components/contact/ImageBubble';
import ContactForm from '@/components/contact/ContactForm';

function ContactSection() {
  const heading = 'Let’s Get In Touch!';

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-8 py-16 bg-cream">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-36">
        {/* Left: Form (2/3) */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-6xl font-league-spartan font-bold text-pistachio mb-8 flex flex-wrap">
            {heading.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animationName: 'waveUp',
                  animationDuration: '5.2s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${i * 0.09}s`,
                  display: char === ' ' ? 'inline-block' : undefined,
                  minWidth: char === ' ' ? '0.5em' : undefined,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
            <style jsx>{`
              @keyframes waveUp {
                0%,
                10% {
                  transform: translateY(0);
                }
                20% {
                  transform: translateY(-18px) scale(1.1) rotate(-6deg);
                }
                40% {
                  transform: translateY(0);
                }
                100% {
                  transform: translateY(0);
                }
              }
            `}</style>
          </h2>
          <ContactForm />
        </div>

        <div className="hidden lg:flex w-full lg:w-1/3 relative justify-center items-center font-cooper">
          <ImageBubble />
        </div>
      </div>
    </section>
  );
}
export default ContactSection;
