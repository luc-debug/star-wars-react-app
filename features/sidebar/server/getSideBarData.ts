import type { Item } from "@/features/sidebar/components/nav-main";
import { makeSlug } from "@/lib/generateStaticParams";
import type { ResponseType } from "@/types/ResponseType";
import type { StarWarsDataModels, StarWarsEntity } from "@/types/Root";

export async function getSideBarData(): Promise<Item[]> {
  let urls: StarWarsDataModels;

  try {
    const res = await fetch("https://swapi.py4e.com/api");

    if (!res.ok) return [];

    urls = await res.json();
  } catch {
    return [];
  }

  // Fetch each top-level endpoint and build a section with sub-items
  const entries = Object.entries(urls); // [ [key, url], ... ]

  const sectionPromises = entries.map(async ([key, url]) => {
    try {
      const r = await fetch(url);
      if (!r.ok) {
        return {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          url: `/${makeSlug(key)}`,
          items: [],
        } satisfies Item;
      }

      const json: ResponseType<StarWarsEntity[]> = await r.json();
      const results = json.results;

      const items = results.map((entity) => {
        let name = "";
        if ("name" in entity && typeof entity.name === "string") {
          name = entity.name;
        } else if ("title" in entity && typeof entity.title === "string") {
          name = entity.title;
        }

        return {
          title: ("name" in entity ? String(entity.name) : entity.title) ?? "Unknown",
          url: `/${makeSlug(key)}/${makeSlug(name)}`,
        };
      });

      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        url: `/${makeSlug(key)}`,
        items,
      } satisfies Item;
    } catch {
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        url: `/${makeSlug(key)}`,
        items: [],
      } satisfies Item;
    }
  });

  const sections = await Promise.all(sectionPromises);
  return sections;
}