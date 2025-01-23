'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@founderswap/design-system/components/ui/sidebar';
import {
  ChartColumn,
  Info,
  MessageCircle,
  PlusCircle,
  Rocket,
} from 'lucide-react';
import type React from 'react';

import { MobileTitle } from '@/components/ui/mobile-title';
import { NavHeader } from '@/components/ui/nav-header';
import { NavMain } from '@/components/ui/nav-main';
import { NavUser } from '@/components/ui/nav-user';
import { MobileContent } from './mobile-content';

const data = {
  user: {
    name: "Federico",
    email: "kkratter@example.com",
    avatar: "https://avatars.githubusercontent.com/u/70836137?v=4",
  },
  navMain: [
    {
      title: 'Startups',
      url: '/startups',
      icon: Rocket,
    },
    {
      title: 'Benchmark',
      url: '/benchmark',
      icon: ChartColumn,
    },
  ],
  navSecondary: [
    {
      title: 'Submit',
      url: 'https://tally.so/r/3lKZEW',
      icon: PlusCircle,
      isExternal: true,
    },
    {
      title: 'About',
      url: '/about',
      icon: Info,
    },
    {
      title: 'Feedback',
      url: 'https://tally.so/r/mOdyN8',
      icon: MessageCircle,
      isExternal: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset" {...props}
      collapsible="icon" {...props}
      mobileTitle={<MobileTitle />}
      mobileContent={<MobileContent mainItems={data.navMain} secondaryItems={data.navSecondary} />}
    >
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
