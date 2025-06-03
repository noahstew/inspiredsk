'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <>
      <section className="relative w-full overflow-hidden">
        {/* Text overlay positioned higher on mobile, lower on desktop */}
        <div className="absolute inset-0 flex items-start justify-center z-0 pt-0 md:pt-16 lg:pt-24">
          <div className="text-center flex flex-col mt-0">
            <span
              className="text-olive font-league-spartan font-bold text-6xl md:text-7xl lg:text-8xl"
              style={{
                animation: 'pulseScale 4s ease-in-out infinite',
                display: 'inline-block',
              }}
            >
              WE ARE
            </span>
            <span
              className="font-league-spartan font-bold text-7xl md:text-8xl lg:text-9xl -mt-2 md:-mt-3 lg:-mt-4"
              style={{
                animation:
                  'pulseScale 4s ease-in-out infinite, colorCycle 4s ease-in-out infinite',
                color: '#ff7f50', // initial color (persimmon)
                display: 'inline-block',
              }}
            >
              INSPIRED
            </span>
          </div>
        </div>

        {/* Image with semi-transparency to let text show through */}
        <div className="relative z-10 max-w-6xl w-full mx-auto">
          <Image
            src="/assets/clear.png"
            alt="Inspired Group"
            width={1200}
            height={800}
            className="w-full relative opacity-85"
            priority
          />
        </div>
      </section>
      <section className="text-olive">
        <p className="text-center text-xl lg:text-2xl font-league-spartan mb-8">
          We are a diverse group of students at the University of Regina
          committed to creating <b>positive change</b> across our community and
          Saskatchewan through <b>monthly initiatives</b>.
        </p>
        <p className="text-center text-xl lg:text-2xl font-league-spartan mb-8">
          By promoting <b>practical education</b> and{' '}
          <b>community engagement</b>, we equip individuals with the knowledge
          and tools to <b>inspire meaningful impact.</b> Our goal is to foster
          unity, responsibility, and action that drives lasting improvements in
          society.
        </p>
      </section>
      <style jsx>{`
        @keyframes pulseScale {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.92;
          }
        }
        @keyframes colorCycle {
          0%,
          100% {
            color: #e0ac7c; /* peach */
          }
          50% {
            color: #e79a45; /* persimmon */
          }
        }
      `}</style>
    </>
  );
}
