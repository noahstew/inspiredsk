import Link from 'next/link';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-8 border-t-2 border-persimmon bg-cream text-center text-peach text-lg font-league-spartan font-bold">
      &copy; {currentYear}{' '}
      <Link className="hover:text-persimmon" href="/admin">
        InspirED
      </Link>{' '}
      all rights reserved | developed & maintained by{' '}
      <Link
        className="text-pistachio hover:text-olive"
        target="_blank"
        href="https://nostew.com"
      >
        nostew
      </Link>{' '}
    </footer>
  );
}
export default Footer;
