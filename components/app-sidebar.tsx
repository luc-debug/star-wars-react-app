"use client";

import * as React from "react";

import { Item, NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { User, Globe, Film, Rocket, Car, Dna } from "lucide-react";

export function AppSidebar({
  data,
  ...props
}: React.ComponentProps<typeof Sidebar> & { data: Item[] }) {
  data = data.map((section) => ({
    ...section,
    icon:
      section.title === "People"
        ? User
        : section.title === "Planets"
        ? Globe
        : section.title === "Films"
        ? Film
        : section.title === "Starships"
        ? Rocket
        : section.title === "Vehicles"
        ? Car
        : section.title === "Species"
        ? Dna
        : section.icon,
  }));
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
