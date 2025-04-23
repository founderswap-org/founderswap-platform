import { Button } from '@founderswap/design-system/components/ui/button';
// import { Icon } from 'lucide-react';
import {
  type ComponentProps,
  type ElementRef,
  type ReactNode,
  forwardRef,
  useState,
} from 'react';
import { useTimeoutFn } from 'react-use';

interface CopyButtonProps extends ComponentProps<'button'> {
  contentValue: string;
  copiedMessage?: ReactNode;
}

export const CopyButton = forwardRef<ElementRef<'button'>, CopyButtonProps>(
  (
    {
      children = 'Copy',
      copiedMessage = 'Copied!',
      contentValue,
      onClick,
      ...rest
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    const [_isReady, _cancel, reset] = useTimeoutFn(() => {
      setCopied(false);
    }, 2000);

    return (
      <Button
        variant="secondary"
        onClick={(e) => {
          onClick && onClick(e);
          navigator.clipboard.writeText(contentValue);
          setCopied(true);
          reset();
        }}
        ref={ref}
        className="flex items-center gap-2 text-xs"
        {...rest}
      >
        {/* <Icon
          type={copied ? 'ClipboardDocumentCheckIcon' : 'ClipboardDocumentIcon'}
          className="text-xl"
        /> */}
        {copied ? copiedMessage : children}
      </Button>
    );
  }
);

CopyButton.displayName = 'CopyButton';
