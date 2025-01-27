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
import { NavUser } from '@/components/ui/nav-user';
import { useAuth } from '@/hooks/useAuth';
import { MobileContent } from './mobile-content';

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
  const auth = useAuth();

  const userData = auth
    ? {
        name: `${auth.user?.user_metadata.firstname} ${auth.user?.user_metadata.lastname}`,
        email: auth.user?.email ?? '',
        avatar: auth.user?.user_metadata.avatar_url ?? '',
      }
    : undefined;

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
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
