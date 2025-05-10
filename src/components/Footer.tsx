import Link from 'next/link';

function Footer() {
  return (
    <footer className="p-8 border-t-2 border-persimmon bg-cream text-center text-peach text-lg font-league-spartan font-bold">
      {/* <Link className="hover:text-persimmon" target="_blank" href="/admin">
        InspirED
      </Link>{' '}
      |  */}
      Developed & Maintained by{' '}
      <Link
        className="text-pistachio hover:text-olive"
        target="_blank"
        href="https://nostew.com"
      >
        Noah Stewart
      </Link>{' '}
    </footer>
  );
}
export default Footer;
