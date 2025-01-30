'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@founderswap/design-system/components/ui/button';
import { toast } from '@founderswap/design-system/components/ui/toast';
import { Tooltip } from '@founderswap/design-system/components/ui/tooltip';

const ShareButtons = () => {
  const [copied, setCopied] = useState(false);

  const shareOnLinkedIn = () => {
    const currentUrl = window.location.href;
    const shareText = '<< Your thoughts go here >>';
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`${shareText}\n\n${currentUrl}`)}`;
    window.open(linkedInShareUrl, '_blank', 'width=600,height=600');
  };

  const copyToClipboard = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    toast('Copied to clipboard. Ready to share!');
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className="flex w-full flex-row flex-wrap gap-2">
      <Button onClick={shareOnLinkedIn}>Share on Linkedin</Button>
      <Tooltip
        className="hidden sm:flex"
        content={copied ? 'Link copied' : 'Copy link'}
      >
        <Button variant="secondary" icon onClick={copyToClipboard}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </Tooltip>
    </div>
  );
};

export default ShareButtons;
