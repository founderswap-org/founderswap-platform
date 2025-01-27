import type { ReactNode } from 'react';

import '@founderswap/design-system/styles/shared-globals.css';
import { DesignSystemProvider } from '@founderswap/design-system';
import { fonts } from '@founderswap/design-system/lib/fonts';

import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';

export { metadata } from '@/lib/config/metadata';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>
        <ReactQueryClientProvider>
          {/* <AuthProvider> */}
          {children}
          {/* </AuthProvider> */}
        </ReactQueryClientProvider>
      </DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
