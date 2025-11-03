"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Scale, Trophy, FilePenLine } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import CricketBallIcon from "@/components/icons/CricketBallIcon";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: BarChart2,
    },
    {
      href: "/compare",
      label: "Compare Players",
      icon: Scale,
    },
    {
      href: "/scorer",
      label: "Match Scorer",
      icon: FilePenLine,
    },
  ];

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <CricketBallIcon className="w-8 h-8 text-accent" />
          <h1
            className={cn(
              "text-lg font-semibold text-sidebar-foreground",
              "group-data-[collapsible=icon]:hidden"
            )}
          >
            Cricket Stats Hub
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div
          className={cn(
            "flex items-center gap-2 text-xs text-sidebar-foreground/70",
            "group-data-[collapsible=icon]:justify-center"
          )}
        >
          <Trophy className="w-4 h-4" />
          <span className="group-data-[collapsible=icon]:hidden">
            Rankings powered by AI
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
