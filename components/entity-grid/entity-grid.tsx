
import { StarWarsEntities } from "@/types/Root";
import { EntityGridClient } from "./entity-grid-client";
import { entityConfigs } from "@/lib/entity-config";
import { fetchAllEntities } from "@/lib/api-service";

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
