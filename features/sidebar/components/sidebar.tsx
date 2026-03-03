import { Separator } from "@radix-ui/react-separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSideBarData } from "../server/getSideBarData";
import { AppSidebar } from "./app-sidebar";

export async function Sidebar({ children }: { children: React.ReactNode }) {
	const data = await getSideBarData();

	return (
		<SidebarProvider>
			<AppSidebar data={data} />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
					</div>
				</header>
				<main className="py-4 px-6">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
