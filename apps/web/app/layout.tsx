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
      <DesignSystemProvider>{children}</DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
