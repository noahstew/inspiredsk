import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TeamPage from '@/components/teams/TeamPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team | InspiredSK',
  description: 'Meet the team behind our project.',
};

function Team() {
  return (
    <>
      <Navbar />
      <TeamPage />
      <Footer />
    </>
  );
}
export default Team;
