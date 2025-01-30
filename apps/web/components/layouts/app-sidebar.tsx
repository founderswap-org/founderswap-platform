'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@founderswap/design-system/components/ui/sidebar';
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
import { MobileContent } from '@/components/layouts/mobile-content';
import { MobileTitle } from '@/components/layouts/mobile-title';
import { NavHeader } from '@/components/layouts/nav-header';
import { NavMain } from '@/components/layouts/nav-main';
import { NavUser } from '@/components/layouts/nav-user';
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
