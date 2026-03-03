
import { StarWarsEntities, StarWarsEntity } from "@/types/Root";
import { ResponseType } from "@/types/ResponseType";
import { EntityGridClient } from "./entity-grid-client";
import { entityConfigs, EntityConfig } from "./entity-config";

/**
 * Fetches all pages of entities from the SWAPI
 */
async function fetchAllEntities(
  apiEndpoint: string
): Promise<StarWarsEntity[]> {
  const allEntities: StarWarsEntity[] = [];
  let nextUrl: string | null = apiEndpoint;

  while (nextUrl) {
    const res = await fetch(nextUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch from ${nextUrl}`);
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
