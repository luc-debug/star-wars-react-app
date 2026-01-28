/**
 * Application Constants
 */

/**
 * SWAPI Base URL
 */
export const SWAPI_BASE_URL = "https://swapi.py4e.com/api";

/**
 * Cache revalidation time in seconds (1 hour)
 */
export const CACHE_REVALIDATION_TIME = 3600;

/**
 * API Endpoints for each entity type
 */
export const API_ENDPOINTS = {
  people: `${SWAPI_BASE_URL}/people`,
  planets: `${SWAPI_BASE_URL}/planets`,
  starships: `${SWAPI_BASE_URL}/starships`,
  films: `${SWAPI_BASE_URL}/films`,
  species: `${SWAPI_BASE_URL}/species`,
  vehicles: `${SWAPI_BASE_URL}/vehicles`,
} as const;

/**
 * Application metadata
 */
export const APP_METADATA = {
  title: "Star Wars Databank",
  description: "Explore the Star Wars universe with data from SWAPI",
} as const;
