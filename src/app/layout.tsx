import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const siteUrl = 'https://mertercan.com';
const siteName = 'Mert Ercan';
const siteDescription =
  'A frontend developer exploring how small things grow into meaning, through clear structures, thoughtful work, and tiny creative worlds.';
const socialLinks = [
  'https://www.pinterest.com/mertcreates',
  'https://github.com/mertcreates',
  'https://www.linkedin.com/in/mert-ercan',
  'https://x.com/Mert_Ercan',
];
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteName,
    url: siteUrl,
    email: 'mailto:me@mertercan.com',
    jobTitle: 'Frontend Developer',
    sameAs: socialLinks,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    inLanguage: 'en',
    publisher: {
      '@type': 'Person',
      name: siteName,
    },
  },
];

// eslint-disable-next-line new-cap
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  applicationName: 'mertercan.com',
  title: {
    default: 'Mert Ercan — creating with clarity and curiosity',
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
    title: 'Mert Ercan — creating with clarity and curiosity',
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
    title: 'Mert Ercan — creating with clarity and curiosity',
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
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Script id='quiet-nod'>
          {
            'if (!window._q) { window._q = true; console.log("you found the quiet part.\\n\\nmaybe we care about the same small things.\\n\\nme@mertercan.com"); }'
          }
        </Script>
      </body>
    </html>
  );
}
