import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/fonts';
import Footer from '@/ui/footer';
import Header from '@/ui/header';

export const metadata: Metadata = {
  title: 'Movie Watchlist',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <div className="mb-unit-lg pl-[10dvw] pr-[10dvw]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
