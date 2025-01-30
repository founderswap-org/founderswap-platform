'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@founderswap/design-system/components/ui/sidebar';
<<<<<<< Updated upstream
import {
  Calendar,
  Home,
  Users,
} from 'lucide-react';
import type React from 'react';

<<<<<<< Updated upstream:apps/web/components/ui/app-sidebar.tsx
import { MobileTitle } from '@/components/ui/mobile-title';
import { NavHeader } from '@/components/ui/nav-header';
import { NavMain } from '@/components/ui/nav-main';
import { NavUser } from '@/components/ui/nav-user';
import { MobileContent } from './mobile-content';
=======
=======
import { Calendar, Home, Users } from 'lucide-react';
import type React from 'react';

>>>>>>> Stashed changes
import { MobileContent } from '@/components/layouts/mobile-content';
import { MobileTitle } from '@/components/layouts/mobile-title';
import { NavHeader } from '@/components/layouts/nav-header';
import { NavMain } from '@/components/layouts/nav-main';
import { NavUser } from '@/components/layouts/nav-user';
<<<<<<< Updated upstream
>>>>>>> Stashed changes:apps/web/components/layouts/app-sidebar.tsx

const data = {
  user: {
    name: "Federico",
    email: "kkratter@example.com",
    avatar: "https://avatars.githubusercontent.com/u/70836137?v=4",
  },
  navMain: [
    {
      title: 'Overview',
      url: '/',
      icon: Home,
    },
    {
      title: 'Availabilities',
      url: '/availabilities',
      icon: Calendar,
    },
    {
      title: 'Connections',
      url: '/connections',
      icon: Users,
    },
  ],
  navSecondary: []
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset" {...props}
      collapsible="icon" {...props}
      mobileTitle={<MobileTitle />}
      mobileContent={<MobileContent mainItems={data.navMain} secondaryItems={data.navSecondary} />}
=======

const NAV_ITEMS = [
  {
    title: 'Overview',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Availabilities',
    url: '/availabilities',
    icon: Calendar,
  },
  {
    title: 'Connections',
    url: '/connections',
    icon: Users,
  },
];

type AppSidebar = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebar) {
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      mobileTitle={<MobileTitle />}
      mobileContent={
        <MobileContent mainItems={NAV_ITEMS} secondaryItems={[]} />
      }
      {...props}
>>>>>>> Stashed changes
    >
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
<<<<<<< Updated upstream
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
=======
        <NavMain items={NAV_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
>>>>>>> Stashed changes
      </SidebarFooter>
    </Sidebar>
  );
}
