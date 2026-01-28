import { StarWarsEntities, StarWarsEntity } from "@/types/Root";
import { fetchEntity } from "./api-service";

/**
 * Search for an entity by slug
 * @deprecated Use fetchEntity from api-service instead
 */
export const searchItem = async <T extends StarWarsEntity>(
  slug: string,
  type: StarWarsEntities
): Promise<T> => {
  return fetchEntity<T>(slug, type);
};