'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@founderswap/design-system/components/ui/sidebar';
import { Calendar, Home, Users } from 'lucide-react';
import type React from 'react';

import { MobileTitle } from '@/components/ui/mobile-title';
import { NavHeader } from '@/components/ui/nav-header';
import { NavMain } from '@/components/ui/nav-main';
import { MobileContent } from './mobile-content';
import { NavUser } from './nav-user';

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
    >
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
