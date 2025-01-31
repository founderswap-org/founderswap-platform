import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@founderswap/design-system/components/ui/avatar';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Card } from '@founderswap/design-system/components/ui/card';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@founderswap/design-system/components/ui/sheet';
import { Tag } from '@founderswap/design-system/components/ui/tag';

export const runtime = 'edge';

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
  {
    id: 6,
    name: 'Jane Smith',
    company: 'Company D',
    email: 'jane.smith@example.com',
    image: 'https://github.com/shadcn.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['tag1', 'tag2', 'tag3', 'tag4'],
  },
];

export default function ConnectionsPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-10px)] max-w-screen-xl flex-col gap-10 p-10 lg:flex-row">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-brand font-semibold text-3xl text-brand">
            Connections
          </h1>
          <p className="text-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
          </p>
        </div>
        {/* <Separator /> */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockData.map((item) => (
            <Sheet key={item.id}>
              <SheetTrigger asChild>
                <Card className="flex flex-col gap-4 p-5 hover:cursor-pointer hover:bg-item-hover">
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
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{item.name}</SheetTitle>
                  <SheetDescription>{item.company}</SheetDescription>
                </SheetHeader>
                <SheetBody className="flex w-full flex-col justify-start gap-4">
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  {/* <Separator /> */}
                  <p className="p-1 text-description text-sm">
                    {item.description}
                  </p>
                </SheetBody>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="secondary">Cancel</Button>
                  </SheetClose>
                  <Button>View on Linkedin</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>
    </div>
  );
}
