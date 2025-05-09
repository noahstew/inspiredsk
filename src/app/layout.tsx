import type { Metadata } from 'next';
import './globals.css';

/*
TODO: 
- Add a favicon
- Add SEO
*/
export const metadata: Metadata = {
  title: 'InspiredSK | Home ',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
