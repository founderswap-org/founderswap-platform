import { cn } from '@founderswap/design-system/lib/utils';
import type { FC } from 'react';

interface DisclaimerProps {
  className?: string;
}

export const Disclaimer: FC<DisclaimerProps> = ({ className }) => {
  return (
    <p
      className={cn(
        'max-w-prose text-xs text-zinc-400 dark:text-zinc-500',
        className
      )}
    >
      This call web app is built on top of Orange Meets application built using{' '}
      <a className="underline" href="https://developers.cloudflare.com/calls/">
        Cloudflare Calls
      </a>{' '}
      <a
        className="underline"
        href="https://dash.cloudflare.com/?to=/:account/calls"
      >
        Cloudflare Dashboard
      </a>
      .
    </p>
  );
};
