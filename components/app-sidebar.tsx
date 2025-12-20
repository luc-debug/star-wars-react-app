"use client";

import * as React from "react";

import { Item, NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

export function AppSidebar({
  data,
  ...props
}: React.ComponentProps<typeof Sidebar> & { data: Item[] }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
