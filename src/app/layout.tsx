import type { Metadata } from 'next';
import './globals.css';

/*
TODO: 
- Add a favicon
- Add SEO
*/
export const metadata: Metadata = {
  title: 'Home | InspiredSK',
  description: 'Meet the team behind our project.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cream">{children}</body>
    </html>
  );
}
