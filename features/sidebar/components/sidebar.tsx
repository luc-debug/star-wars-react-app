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
			<SidebarInset className="flex flex-col min-h-screen">
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
					</div>
				</header>
				<main className="flex-1 py-4 px-6">{children}</main>
				<footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
					<p>
						Built with data from{" "}
						<a
							href={
								process.env.NEXT_PUBLIC_SWAPI_BASE_URL ??
								"https://swapi.py4e.com"
							}
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-foreground transition-colors"
						>
							SWAPI
						</a>
					</p>
				</footer>
			</SidebarInset>
		</SidebarProvider>
	);
}
