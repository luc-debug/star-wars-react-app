import type { ResponseType } from "@/types/ResponseType";
import type { StarWarsEntities, StarWarsEntity } from "@/types/Root";
import { entityConfigs } from "./entity-config";
import { EntityGridClient } from "./entity-grid-client";

/**
 * Fetches all pages of entities from the SWAPI
 */
async function fetchAllEntities(
	apiEndpoint: string,
): Promise<StarWarsEntity[]> {
	const allEntities: StarWarsEntity[] = [];
	let nextUrl: string | null = apiEndpoint;

	while (nextUrl) {
		const res = await fetch(nextUrl, {
			headers: {
				"User-Agent": "star-wars-databank/1.0 (https://github.com)",
				Accept: "application/json",
			},
		});

		if (!res.ok) {
			const body = await res.text().catch(() => "(unreadable)");
			throw new Error(
				`Failed to fetch from ${nextUrl} — ${res.status} ${res.statusText}\nBody: ${body}`,
			);
		}

		const data: ResponseType<StarWarsEntity[]> = await res.json();
		allEntities.push(...data.results);
		nextUrl = data.next;
	}

	return allEntities;
}

/**
 * Generic Entity Grid component that can display any Star Wars entity type
 * with search, filter, and sort functionality.
 *
 * @example
 * // Display planets
 * <EntityGrid entityType="planets" />
 */
export async function EntityGrid({
	entityType,
}: {
	entityType: StarWarsEntities;
}) {
	const config = entityConfigs[entityType];

	if (!config) {
		throw new Error(`Unknown entity type: ${entityType}`);
	}

	const entities = await fetchAllEntities(config.apiEndpoint);

	return <EntityGridClient entities={entities} config={config} />;
}
