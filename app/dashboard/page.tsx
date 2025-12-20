import { AppSidebar } from "@/components/app-sidebar";
import { Item } from "@/components/nav-main";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ResponseType } from "@/types/ResponseType";

async function getSideBarData(): Promise<Item[]> {
  const res = await fetch("https://swapi.py4e.com/api", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch planets");
  }

  const urls: Record<string, string> = await res.json();

  // Fetch each top-level endpoint and build a section with sub-items
  const entries = Object.entries(urls); // [ [key, url], ... ]

  const sectionPromises = entries.map(async ([key, url]) => {
    const r = await fetch(url);
    if (!r.ok) {
      // If a single category fails, return an empty section instead of throwing
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        url: url,
        items: [],
      } satisfies Item;
    }

    const json: ResponseType<unknown[]> = await r.json();

    // Many SWAPI endpoints return a paginated response with `results`.
    const results = json.results;

    const items = results.map((it: any) => ({
      title: (it.name ?? it.title ?? "Unknown") as string,
      url: it.url ?? url,
    }));

    return {
      title: key.charAt(0).toUpperCase() + key.slice(1),
      url: url,
      items,
    } satisfies Item;
  });

  const sections = await Promise.all(sectionPromises);
  return sections;
}

export default async function Page() {
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
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
