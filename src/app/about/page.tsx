import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AboutHero from '@/components/about/AboutHero';
import AboutDescription from '@/components/about/AboutDescription';
import RecentInitiatives from '@/components/about/RecentInitiatives';
import GoalsSection from '@/components/about/GoalsSection';

function About() {
  return (
    <section>
      <Navbar />
      <AboutHero />
      <AboutDescription />
      <GoalsSection />

      <RecentInitiatives />
      <Footer />
    </section>
  );
}
export default About;
