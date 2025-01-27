import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FounderSwap',
  description: 'Building connections, shaping future',
  keywords: [
    'FounderSwap',
    'Opens-source',
    'Building connections',
    'Shaping future',
  ],
  metadataBase: new URL('https://www.founderswap.com'),
  alternates: {
    canonical: 'https://www.founderswap.com',
  },
  openGraph: {
    title: 'FounderSwap',
    description: 'Building connections, shaping future',
    url: 'https://www.founderswap.com',
    siteName: 'FounderSwap',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};
