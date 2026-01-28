/**
 * API Service Layer - Centralized data fetching with error handling
 */

import { StarWarsEntity, StarWarsEntities } from "@/types/Root";
import { ResponseType } from "@/types/ResponseType";
import { entityConfigs } from "@/lib/entity-config";
import { CACHE_REVALIDATION_TIME } from "./constants";

/**
 * Fetch a single entity by slug using the SWAPI search endpoint
 */
export async function fetchEntity<T extends StarWarsEntity>(
  slug: string,
  entityType: StarWarsEntities
): Promise<T> {
  const config = entityConfigs[entityType];
  if (!config) {
    throw new Error(`Unknown entity type: ${entityType}`);
  }

  try {
    // Use SWAPI's search endpoint for efficiency
    const searchTerm = slug.split("-")[0]; // Get first word for search
    const searchUrl = `${config.apiEndpoint}/?search=${encodeURIComponent(searchTerm)}`;
    
    const res = await fetch(searchUrl, {
      next: { revalidate: CACHE_REVALIDATION_TIME },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch entity: ${res.statusText}`);
    }

    const data: ResponseType<T[]> = await res.json();
    
    // Find exact match by comparing slugified names
    const entity = data.results.find((e) => {
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

    return entity;
  } catch (error) {
    console.error("Error fetching entity:", error);
    throw error;
  }
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
