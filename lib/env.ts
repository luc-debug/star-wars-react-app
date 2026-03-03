/**
 * Validated environment variables.
 * NEXT_PUBLIC_ prefix makes the value available in both server and client bundles.
 */
export const env = {
	swapiBaseUrl: process.env.SWAPI_BASE_URL,
} as const;
