import { Item } from "@/features/sidebar/components/nav-main";
import { ResponseType } from "@/types/ResponseType";
import { StarWarsDataModels } from "@/types/Root";

export async function getSideBarData(): Promise<Item[]> {
  const res = await fetch("https://swapi.py4e.com/api", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch planets");
  }

  const urls: StarWarsDataModels = await res.json();

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