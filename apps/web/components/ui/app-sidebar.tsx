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

import { MobileTitle } from '@/components/ui/mobile-title';
import { NavHeader } from '@/components/ui/nav-header';
import { NavMain } from '@/components/ui/nav-main';
import { NavUser } from '@/components/ui/nav-user';
import { MobileContent } from './mobile-content';
import { useAuth } from '@/hooks/useAuth';

const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://avatars.githubusercontent.com/u/70836137?v=4',
};

const navItems = [
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
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth() ?? {};

  /*
  const userData = user?.email ? {
    name: `${user.user_metadata.firstname} ${user.user_metadata.lastname}`,
    email: user.email,
    avatar: user.user_metadata.avatar_url || undefined,
  } : null;
  */

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      mobileTitle={<MobileTitle />}
      mobileContent={<MobileContent mainItems={navItems} secondaryItems={[]} />}
    >
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        {userData && <NavUser user={userData} />}
      </SidebarFooter>
    </Sidebar>
  );
}
