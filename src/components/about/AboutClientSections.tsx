'use client';

import { useRef, useEffect, useState } from 'react';
import AboutHero from './AboutHero';
import AboutDescription from './AboutDescription';
import GoalsSection from './GoalsSection';
import RecentInitiatives from './RecentInitiatives';

export default function AboutClientSections() {
  const heroRef = useRef<HTMLElement>(null);
  const descRef = useRef<HTMLElement>(null);
  const goalsRef = useRef<HTMLElement>(null);
  const recentRef = useRef<HTMLElement>(null);

  const [heroVisible, setHeroVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);
  const [goalsVisible, setGoalsVisible] = useState(false);
  const [recentVisible, setRecentVisible] = useState(false);

  useEffect(() => {
    const obsHero = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const obsDesc = new IntersectionObserver(
      ([entry]) => setDescVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const obsGoals = new IntersectionObserver(
      ([entry]) => setGoalsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const obsRecent = new IntersectionObserver(
      ([entry]) => setRecentVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (heroRef.current) obsHero.observe(heroRef.current);
    if (descRef.current) obsDesc.observe(descRef.current);
    if (goalsRef.current) obsGoals.observe(goalsRef.current);
    if (recentRef.current) obsRecent.observe(recentRef.current);

    return () => {
      obsHero.disconnect();
      obsDesc.disconnect();
      obsGoals.disconnect();
      obsRecent.disconnect();
    };
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease-out 0.1s, transform 1s ease-out 0.1s',
        }}
      >
        <AboutHero />
      </section>
      <section
        ref={descRef}
        style={{
          opacity: descVisible ? 1 : 0,
          transform: descVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease-out 0.2s, transform 1s ease-out 0.2s',
        }}
      >
        <AboutDescription />
      </section>
      <section
        ref={goalsRef}
        style={{
          opacity: goalsVisible ? 1 : 0,
          transform: goalsVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
        }}
      >
        <GoalsSection />
      </section>
      <section
        ref={recentRef}
        style={{
          opacity: recentVisible ? 1 : 0,
          transform: recentVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s',
        }}
      >
        <RecentInitiatives />
      </section>
    </>
  );
}
