import type { ReactNode } from 'react';

type AnalyticsProviderProps = {
  readonly children: ReactNode;
};

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => (
  <>
    {children}
    {/* <VercelAnalytics /> */}
  </>
);
