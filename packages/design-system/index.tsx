import { AnalyticsProvider } from '@founderswap/analytics';
import type { ThemeProviderProps } from 'next-themes';
import { ToastProvider } from './components/ui/toast';
import { TooltipProvider } from './components/ui/tooltip';

export const DesignSystemProvider = ({ children }: ThemeProviderProps) => (
  <AnalyticsProvider>
    <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
    <ToastProvider />
  </AnalyticsProvider>
);
