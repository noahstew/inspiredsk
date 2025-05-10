import Link from 'next/link';

function Footer() {
  return (
    <div className="p-8 bg-pistachio">
      Footer | Developed by{' '}
      <Link target="_blank" href="https://nostew.com">
        Noah Stewart
      </Link>{' '}
    </div>
  );
}
export default Footer;
