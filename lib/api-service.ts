/**
 * API Service Layer - Centralized data fetching with error handling
 */

import { StarWarsEntity, StarWarsEntities } from "@/types/Root";
import { ResponseType } from "@/types/ResponseType";
import { entityConfigs } from "@/components/entity-grid/entity-config";
import { CACHE_REVALIDATION_TIME } from "./constants";

/**
 * Fetch a single entity by slug
 */
export async function fetchEntity<T extends StarWarsEntity>(
  slug: string,
  entityType: StarWarsEntities
): Promise<T> {
  const config = entityConfigs[entityType];
  if (!config) {
    throw new Error(`Unknown entity type: ${entityType}`);
  }

  const entities = await fetchAllEntities(config.apiEndpoint);
  const entity = entities.find((e) => {
    let name = "";
    if (config.nameKey === "title" && "title" in e && typeof e.title === "string") {
      name = e.title;
    } else if ("name" in e && typeof e.name === "string") {
      name = e.name;
    }
    return name.toLowerCase().replace(/\s+/g, "-") === slug;
  });

  if (!entity) {
    throw new Error(`Entity not found: ${slug}`);
  }

  return entity as T;
}

/**
 * Fetch all entities from a paginated API endpoint
 */
export async function fetchAllEntities(
  apiEndpoint: string
): Promise<StarWarsEntity[]> {
  const allEntities: StarWarsEntity[] = [];
  let nextUrl: string | null = apiEndpoint;

  try {
    while (nextUrl) {
      const res = await fetch(nextUrl, {
        next: { revalidate: CACHE_REVALIDATION_TIME },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch from ${nextUrl}: ${res.statusText}`);
      }

      const data: ResponseType<StarWarsEntity[]> = await res.json();
      allEntities.push(...data.results);
      nextUrl = data.next;
    }

    return allEntities;
  } catch (error) {
    console.error("Error fetching entities:", error);
    throw error;
  }
}
