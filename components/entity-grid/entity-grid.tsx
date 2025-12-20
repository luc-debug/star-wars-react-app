"use client";

import { StarWarsEntities, StarWarsEntity } from "@/types/Root";
import { ResponseType } from "@/types/ResponseType";
import { EntityGridClient } from "./entity-grid-client";
import { entityConfigs, EntityConfig } from "./entity-config";

interface EntityGridProps {
  entityType: StarWarsEntities;
  /** Optional: Override specific config options */
  configOverrides?: Partial<EntityConfig>;
}

/**
 * Fetches all pages of entities from the SWAPI
 */
async function fetchAllEntities(
  apiEndpoint: string
): Promise<StarWarsEntity[]> {
  const allEntities: StarWarsEntity[] = [];
  let nextUrl: string | null = apiEndpoint;

  while (nextUrl) {
    const res = await fetch(nextUrl, {
      next: { revalidate: 3600 },
    });

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
 *
 * @example
 * // Display people with custom config
 * <EntityGrid
 *   entityType="people"
 *   configOverrides={{ title: "Heroes" }}
 * />
 */
export async function EntityGrid({
  entityType,
  configOverrides,
}: EntityGridProps) {
  const baseConfig = entityConfigs[entityType];

  if (!baseConfig) {
    throw new Error(`Unknown entity type: ${entityType}`);
  }

  const config: EntityConfig = {
    ...baseConfig,
    ...configOverrides,
  };

  const entities = await fetchAllEntities(config.apiEndpoint);

  return <EntityGridClient entities={entities} config={config} />;
}
