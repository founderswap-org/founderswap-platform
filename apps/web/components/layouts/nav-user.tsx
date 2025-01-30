"use client"

import {
    ChevronsUpDown,
    LogOut,
    Monitor, MoonIcon, Settings, SunIcon
} from "lucide-react"
import { useTheme } from 'next-themes';
import React from 'react';

<<<<<<< Updated upstream:apps/web/components/ui/nav-user.tsx
=======
import { logout } from '@/app/(auth)/action';
import { useAuth } from '@/context/auth';
>>>>>>> Stashed changes:apps/web/components/layouts/nav-user.tsx
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@founderswap/design-system/components/ui/avatar"
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
} from "@founderswap/design-system/components/ui/dropdown-menu"
import {
<<<<<<< Updated upstream:apps/web/components/ui/nav-user.tsx
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@founderswap/design-system/components/ui/sidebar"
=======
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@founderswap/design-system/components/ui/sidebar';
import Link from 'next/link';
>>>>>>> Stashed changes:apps/web/components/layouts/nav-user.tsx

const themes = [
    { label: 'Light theme', value: 'light', icon: SunIcon },
    { label: 'Dark theme', value: 'dark', icon: MoonIcon },
    { label: 'System theme', value: 'system', icon: Monitor },
];

export function NavUser({
    user,
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const { theme, setTheme } = useTheme();
    const { isMobile, state } = useSidebar();
    const isCollapsed = state === 'collapsed';

<<<<<<< Updated upstream:apps/web/components/ui/nav-user.tsx
    const currentTheme = React.useMemo(() => {
        return themes.find((t) => t.value === theme) ?? themes[2];
    }, [theme]);
=======
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
>>>>>>> Stashed changes:apps/web/components/layouts/nav-user.tsx

    const Icon = currentTheme.icon;

<<<<<<< Updated upstream:apps/web/components/ui/nav-user.tsx
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
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-semibold'>{user.name}</span>
                                <span className='truncate text-xs'>{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
=======
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
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage
                  src={user.avatar}
                  alt={user.app_metadata.initials}
                /> */}
                <AvatarFallback className="rounded-lg uppercase">
                  {user.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="line-clamp-1 font-semibold">
                  {user.app_metadata.displayName}
                </span>
                <span className="line-clamp-1 text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 stroke-icon" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="!h-auto p-0 font-normal">
              <div className="text flex items-center gap-2 px-1.5 py-1 text-left text-sm">
                <Avatar className="size-9 rounded-lg">
                  {/* <AvatarImage
                    src={user.avatar}
                    alt={user.app_metadata.displayName}
                  /> */}
                  <AvatarFallback className="rounded-lg">
                    {user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user.app_metadata.displayName}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
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
                  <Icon className="size-[1.2rem] transition-all duration-200" />
                  {currentTheme.label}
                </DropdownMenuSubMenuTrigger>
                <DropdownMenuSubMenuContent className="min-w-48">
                  {themes.map(({ label, value, icon: Icon }) => (
                    <DropdownMenuItem
                      key={value}
                      onClick={() => setTheme(value)}
>>>>>>> Stashed changes:apps/web/components/layouts/nav-user.tsx
                    >
                        <DropdownMenuLabel className='!h-auto p-0 font-normal'>
                            <div className='text flex items-center gap-2 px-1.5 py-1 text-left text-sm'>
                                <Avatar className='size-9 rounded-lg'>
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">{user.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-semibold'>{user.name}</span>
                                    <span className='truncate text-xs'>{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Settings />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSubMenu>
                                <DropdownMenuSubMenuTrigger>
                                    <Icon className='size-[1.2rem] transition-all duration-200' />
                                    {currentTheme.label}
                                </DropdownMenuSubMenuTrigger>
                                <DropdownMenuSubMenuContent className='min-w-48'>
                                    {themes.map(({ label, value, icon: Icon }) => (
                                        <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
                                            <Icon className="mr-2 size-4" />
                                            {label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubMenuContent>
                            </DropdownMenuSubMenu>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}