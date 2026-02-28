import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ImageMint | Professional Image Hosting for Developers',
  description: 'ImageMint is the fastest, most reliable way to host images and generate instant public URLs. Built for modern developers and creators who need zero-friction asset management and lightning-fast delivery.',
  openGraph: {
    type: 'website',
    url: 'https://imagemint.easysell.work.gd',
    title: 'ImageMint | Instant Image Hosting',
    description: 'Host images and get instant public links with ImageMint. The professional choice for developers and creators needing fast, reliable, and secure image hosting.',
    images: [
      {
        url: 'https://imagemint.easysell.work.gd/logo-social.png',
        width: 1200,
        height: 630,
        alt: 'ImageMint - Professional Image Hosting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImageMint | Image Hosting',
    description: 'The fastest way to host images for developers and creators.',
    images: ['https://imagemint.easysell.work.gd/logo-social.png'],
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
