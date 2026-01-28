/**
 * Configuration Helpers - Reduce duplication in entity configurations
 */

import { SortConfig, FilterConfig, FieldConfig } from "@/lib/entity-config";

/**
 * Create common sort options that most entities share
 */
export function createCommonSortOptions(nameKey: string = "name"): SortConfig[] {
  return [
    { 
      key: `${nameKey}_asc`, 
      label: `${nameKey === "title" ? "Title" : "Name"} (A-Z)`, 
      sortKey: nameKey, 
      type: "string", 
      direction: "asc" 
    },
    { 
      key: `${nameKey}_desc`, 
      label: `${nameKey === "title" ? "Title" : "Name"} (Z-A)`, 
      sortKey: nameKey, 
      type: "string", 
      direction: "desc" 
    },
  ];
}

/**
 * Create a filter configuration with optional split behavior
 */
export function createFilter(
  key: string,
  label: string,
  options?: { split?: boolean; delimiter?: string }
): FilterConfig {
  return {
    key,
    label,
    optionKey: key,
    split: options?.split,
    delimiter: options?.delimiter,
  };
}

/**
 * Create a sort configuration
 */
export function createSort(
  key: string,
  label: string,
  sortKey: string,
  type: "string" | "number" | "date" = "string",
  direction: "asc" | "desc" = "asc"
): SortConfig {
  return {
    key,
    label,
    sortKey,
    type,
    direction,
  };
}

/**
 * Create a field configuration
 */
export function createField(
  key: string,
  label: string,
  formatSuffix?: string
): FieldConfig {
  return {
    key,
    label,
    formatSuffix,
  };
}

/**
 * Common field configurations that many entities share
 */
export const commonFields = {
  model: createField("model", "Model"),
  crew: createField("crew", "Crew"),
  passengers: createField("passengers", "Passengers"),
};

/**
 * Common sort configurations
 */
export const commonSorts = {
  crew: createSort("crew", "Crew Size", "crew", "number"),
  length: createSort("length", "Length", "length", "number"),
};

/**
 * Common filters
 */
export const commonFilters = {
  manufacturer: createFilter("manufacturer", "Manufacturer", { split: true, delimiter: "," }),
};
