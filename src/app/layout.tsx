import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { siteDescription, siteName, siteTitle, siteUrl } from '@/lib/seo';
import './globals.css';

// eslint-disable-next-line new-cap
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  applicationName: 'mertercan.com',
  title: {
    default: siteTitle,
    template: '%s — Mert Ercan',
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mert Ercan — frontend developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    creator: '@Mert_Ercan',
    images: ['/opengraph-image'],
  },
  icons: '/favicon.svg',
};

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        {children}
        <Script id='quiet-nod'>
          {
            'if (!window._q) { window._q = true; console.log("you found the quiet part.\\n\\nmaybe we care about the same small things.\\n\\nme@mertercan.com"); }'
          }
        </Script>
      </body>
    </html>
  );
}
