"use client";

import { Car, Dna, Film, Globe, Home, Rocket, User } from "lucide-react";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { type Item, NavMain } from "@/features/sidebar/components/nav-main";

export function AppSidebar({
	data,
	...props
}: React.ComponentProps<typeof Sidebar> & { data: Item[] }) {
	const homeItem: Item = {
		title: "Home",
		url: "/",
		icon: Home,
	};

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
				<NavMain items={[homeItem, ...data]} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
