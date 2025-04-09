import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { FC, ReactNode } from 'react';

interface TooltipProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  content?: ReactNode;
  children: ReactNode;
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  open,
  onOpenChange,
}) => {
  if (content === undefined) return <>{children}</>;

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root open={open} onOpenChange={onOpenChange}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content className="rounded bg-zinc-100 px-2 py-1 text-sm drop-shadow-md dark:bg-zinc-600 dark:drop-shadow-none">
            {content}
            <RadixTooltip.Arrow className="rounded fill-zinc-100 drop-shadow dark:fill-zinc-600 dark:drop-shadow-none" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
