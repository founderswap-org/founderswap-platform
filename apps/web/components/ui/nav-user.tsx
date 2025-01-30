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

import { useAuth } from '@/context/auth';
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

const themes = [
  { label: 'Light theme', value: 'light', icon: SunIcon },
  { label: 'Dark theme', value: 'dark', icon: MoonIcon },
  { label: 'System theme', value: 'system', icon: Monitor },
];

export function NavUser() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { isMobile } = useSidebar();

  const handleLogout = async () => {};

  const currentTheme = React.useMemo(() => {
    return themes.find((t) => t.value === theme) ?? themes[2];
  }, [theme]);

  const Icon = currentTheme.icon;

  // const avatarImageComponent= () => (
  //   <AvatarImage src={user.avatar} alt={user.app_metadata.displayName} />
  // );

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
                {/* {avatarImageComponent} */}
                <AvatarFallback className="rounded-lg">
                  {user.user_metadata.initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user.user_metadata.display_name}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
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
                  {/* // TODO: Add avatar image */}
                  {/* {avatarImageComponent} */}
                  <AvatarFallback className="rounded-lg">
                    {user.app_metadata.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user.app_metadata.display_name}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
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
                  <Icon className="size-[1.2rem] transition-all duration-200" />
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
              Log out {/* // TODO:  connect logout action*/}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
