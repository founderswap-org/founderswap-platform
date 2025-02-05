export const runtime = 'edge';

import ShareButtons from '@/components/ui/share-buttons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@founderswap/design-system/components/ui/avatar';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Card } from '@founderswap/design-system/components/ui/card';
import { Separator } from '@founderswap/design-system/components/ui/separator';
import { Tag } from '@founderswap/design-system/components/ui/tag';
import { ClockIcon } from 'lucide-react';
import Link from 'next/link';

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    company: 'Company A',
    email: 'john.doe@example.com',
    image: 'https://github.com/shadcn.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    id: 2,
    name: 'Jane Doe',
    company: 'Company B',
    email: 'jane.doe@example.com',
    image: 'https://github.com/shadcn.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    id: 3,
    name: 'John Smith',
    company: 'Company C',
    email: 'john.smith@example.com',
    image: 'https://github.com/shadcn.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    id: 4,
    name: 'Jane Smith',
    company: 'Company D',
    email: 'jane.smith@example.com',
    image: 'https://github.com/shadcn.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['tag1', 'tag2', 'tag3', 'tag4'],
  },
  {
    id: 5,
    name: 'Jane Smith',
    company: 'Company D',
    email: 'jane.smith@example.com',
    image: 'https://github.com/shadcn.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['tag1', 'tag2', 'tag3', 'tag4'],
  },
];

export default function OverviewPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-10px)] max-w-screen-xl flex-col gap-10 p-10 lg:flex-row">
      <div className="flex w-full flex-col gap-8 lg:w-2/3">
        <div className="flex flex-col gap-2">
          <h1 className="font-brand font-semibold text-3xl text-brand">
            Dashboard
          </h1>
          <p className="text-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
          </p>
        </div>
        <Separator />
        <div className="w-full rounded-2xl border border-border bg-subtle">
          <div className="flex items-center px-6 py-4">
            <div className="flex h-9 items-center justify-center">
              <p className="font-semibold text-xl">Upcoming</p>
            </div>
          </div>
          <Separator />
          <div className="flex p-6">
            <Card className="flex flex-row items-center gap-4 border-0 bg-transparent p-0 shadow-none">
              <Avatar className="size-20 rounded-xl">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="rounded-xl border border-brand-subtle uppercase">
                  ZH
                </AvatarFallback>
              </Avatar>
              <div className="flex w-full flex-col gap-3">
                <div className="line-clamp-1 flex flex-col gap-0">
                  <p className="line-clamp-1 text-description text-xs">
                    You are going to meet
                  </p>
                  <p className="line-clamp-1 flex flex-row gap-1 font-medium text-description text-sm">
                    <span className="line-clamp-1 font-semibold text-brand">
                      Zahra Mahmud
                    </span>
                    from <span>Company D</span>
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  <ClockIcon className="size-4 stroke-icon" />
                  <p className="font-medium text-description text-xs">
                    19:00-19:30
                  </p>
                </div>
              </div>
              <Button>Join meeting</Button>
            </Card>
          </div>
        </div>
        <Separator />
        <div className="w-full rounded-2xl border border-border bg-subtle">
          <div className="flex items-center justify-between gap-4 px-6 py-4">
            <p className="font-semibold text-xl">Recent connections</p>
            <Button variant="text" asChild>
              <Link href="/connections">View all</Link>
            </Button>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            {mockData.slice(0, 4).map((item) => (
              <Card
                key={item.id}
                className="flex flex-col gap-4 border-0 bg-transparent p-0 shadow-none"
              >
                <div className="flex flex-row items-center gap-2">
                  <Avatar className="size-12 rounded-xl">
                    <AvatarImage src={item.image} />
                    <AvatarFallback className="rounded-xl border border-brand-subtle uppercase">
                      {item.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-brand font-medium text-brand text-lg">
                      {item.name}
                    </p>
                    <p className="font-medium text-sm">{item.company}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags?.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <p className="line-clamp-2 text-description text-sm">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Card className="flex max-h-fit w-full flex-col gap-4 lg:sticky lg:top-10 lg:w-1/3">
        <div className="flex w-full flex-col gap-1">
          <h3 className="font-brand font-semibold text-brand text-xl">
            Share FounderSwap
          </h3>
          <p className="text-description text-sm">
            Do you know a founder that should absolutely join?
          </p>
        </div>
        <ShareButtons />
      </Card>
    </div>
  );
}
