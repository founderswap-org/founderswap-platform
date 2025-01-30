'use client';
import {
  ChevronsUpDown,
  LogOut,
  Monitor,
  MoonIcon,
  Settings,
  SunIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

import { logout } from '@/app/(auth)/action';
// import { useAuth } from '@/context/auth';
import {
  Avatar,
  AvatarFallback,
} from '@founderswap/design-system/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from '@founderswap/design-system/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@founderswap/design-system/components/ui/sidebar';
import Link from 'next/link';

const themes = [
  { label: 'Light theme', value: 'light', icon: SunIcon },
  { label: 'Dark theme', value: 'dark', icon: MoonIcon },
  { label: 'System theme', value: 'system', icon: Monitor },
];

export function NavUser() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { isMobile } = useSidebar();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const currentTheme = React.useMemo(() => {
    return themes.find((t) => t.value === theme) ?? themes[2];
  }, [theme]);

  const Icon = currentTheme.icon;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-item-hover"
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                {/* <AvatarImage
                  src={user.avatar}
                  alt={user.app_metadata.initials}
                /> */}
                <AvatarFallback className="rounded-lg uppercase">
                  {user.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className="line-clamp-1 font-semibold">
                  {user.app_metadata.displayName}
                </span>
                <span className="line-clamp-1 text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 stroke-icon" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className='!h-auto p-0 font-normal'>
              <div className='text flex items-center gap-2 px-1.5 py-1 text-left text-sm'>
                <Avatar className='size-9 rounded-lg'>
                  {/* <AvatarImage
                    src={user.avatar}
                    alt={user.app_metadata.displayName}
                  /> */}
                  <AvatarFallback className="rounded-lg">
                    {user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {user.app_metadata.displayName}
                  </span>
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/settings">
                <DropdownMenuItem>
                  <Settings />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSubMenu>
                <DropdownMenuSubMenuTrigger>
                  <Icon className='size-[1.2rem] transition-all duration-200' />
                  {currentTheme.label}
                </DropdownMenuSubMenuTrigger>
                <DropdownMenuSubMenuContent className="min-w-48">
                  {themes.map(({ label, value, icon: Icon }) => (
                    <DropdownMenuItem
                      key={value}
                      onClick={() => setTheme(value)}
                    >
                      <Icon className="mr-2 size-4" />
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubMenuContent>
              </DropdownMenuSubMenu>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
