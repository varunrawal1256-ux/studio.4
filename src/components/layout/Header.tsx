"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  const pathname = usePathname();
  const pageTitle =
    pathname === "/"
      ? "Player Dashboard"
      : pathname === "/compare"
      ? "AI Player Comparison"
      : "Cricket Stats Hub";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>
    </header>
  );
};

export default Header;
