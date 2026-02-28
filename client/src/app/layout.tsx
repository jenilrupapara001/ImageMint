import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LinkPixel | Instant Image Hosting for Developers',
  description: 'The fastest way to host images and generate public URLs. Instant setup, minimal UI, and zero friction.',
  openGraph: {
    type: 'website',
    url: 'https://imagemint.easysell.work.gd',
    title: 'LinkPixel | Instant Image Hosting',
    description: 'Host images and get instant public links. Perfect for developers and creators.',
    images: [
      {
        url: '/logo-social.png',
        width: 1200,
        height: 630,
        alt: 'LinkPixel - Instant Image Hosting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkPixel | Image Hosting',
    description: 'The fastest way to host images for developers.',
    images: ['/logo-social.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
