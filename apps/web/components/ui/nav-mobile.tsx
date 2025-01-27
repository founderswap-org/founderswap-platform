'use client';

import {
  SidebarTrigger,
  useSidebar,
} from '@founderswap/design-system/components/ui/sidebar';

const NavMobile = () => {
  const { isMobile } = useSidebar();
  return (
    <>{isMobile && <SidebarTrigger className="absolute top-6 right-4" />}</>
  );
};

export default NavMobile;
