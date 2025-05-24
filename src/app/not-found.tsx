import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | InspiredSK',
  description: 'The page you are looking for does not exist.',
};

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-cream">
      <Image
        src="/logo.png"
        alt="Logo"
        width={164}
        height={164}
        className="mb-6"
      />
      <h1 className="text-4xl font-bold mb-4 text-persimmon">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-peach mb-4">
        Oops! The page you&apos;re looking for does not exist.
      </p>
      <button className="mt-4 px-4 py-2 bg-persimmon text-white rounded hover:bg-peach transition duration-300">
        <Link href="/" className="text-lg font-bold">
          Go to Home
        </Link>
      </button>
    </div>
  );
}
export default NotFound;
