import { Inter, Rubik } from 'next/font/google'
import { cn } from '@founderswap/design-system/lib/utils';

const sansFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const brandFont = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brand',
});

export const fonts = cn(
  sansFont.variable,
  brandFont.variable,
  'touch-manipulation font-sans antialiased'
);
