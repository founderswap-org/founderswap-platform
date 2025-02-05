import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import '@founderswap/design-system/styles/shared-globals.css';
import { DesignSystemProvider } from '@founderswap/design-system';
import { fonts } from '@founderswap/design-system/lib/fonts';

export { metadata } from '@/lib/config/metadata';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        themes={['light', 'dark', 'system']}
      >
        <DesignSystemProvider>{children}</DesignSystemProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
