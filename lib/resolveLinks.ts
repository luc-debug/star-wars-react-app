import { makeSlug } from "./generateStaticParams";

export interface ResolvedLink {
	name: string;
	slug: string;
	entityType: string;
	href: string;
}

/**
 * Extract entity type from a SWAPI URL like "https://swapi.py4e.com/api/people/1/"
 */
function getEntityType(url: string): string {
	const match = url.match(/\/api\/(\w+)\//);
	return match?.[1] || "";
}

/**
 * Resolve an array of SWAPI URLs to links with name, slug, and href
 */
export async function resolveLinks(urls: unknown[]): Promise<ResolvedLink[]> {
	if (!urls || urls.length === 0) return [];

	const results = await Promise.all(
		urls
			.filter((u): u is string => typeof u === "string")
			.map(async (url) => {
				try {
					const res = await fetch(url);
					if (!res.ok) return null;
					const data = await res.json();
					const name: string = data.name || data.title || "";
					const slug = makeSlug(name);
					const entityType = getEntityType(url);
					return { name, slug, entityType, href: `/${entityType}/${slug}` };
				} catch {
					return null;
				}
			}),
	);

	return results.filter((r): r is ResolvedLink => r !== null);
}

/**
 * Resolve a single SWAPI URL to a link
 */
export async function resolveLink(url: unknown): Promise<ResolvedLink | null> {
	if (!url || typeof url !== "string") return null;
	const results = await resolveLinks([url]);
	return results[0] || null;
}
