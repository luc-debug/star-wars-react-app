"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/select";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { StarWarsEntity } from "@/types/Root";
import {
  EntityConfig,
  getEntityDisplayName,
  getEntityValue,
} from "./entity-config";

interface EntityGridClientProps {
  entities: StarWarsEntity[];
  config: EntityConfig;
}

export function EntityGridClient({ entities, config }: EntityGridClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [sortKey, setSortKey] = useState<string>(
    config.sortOptions[0]?.key || ""
  );
  const [showFilters, setShowFilters] = useState(false);

  // Get filter options from data
  const filterOptions: Record<string, SelectOption[]> = {};
  config.filters.forEach((filter) => {
    const values = filter.getOptions(entities);
    filterOptions[filter.key] = [
      { value: "", label: `All ${filter.label}` },
      ...values.map((v) => ({ value: v, label: v })),
    ];
  });

  // Sort options for select
  const sortOptions: SelectOption[] = config.sortOptions.map((opt) => ({
    value: opt.key,
    label: opt.label,
  }));

  // Filter handler
  function handleFilterChange(key: string, value: string) {
    setActiveFilters((prev) => {
      if (value === "") {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
  }

  // Clear all filters
  function clearFilters() {
    setActiveFilters({});
    setSearchQuery("");
  }

  // Filtered and sorted entities
  const processedEntities = (() => {
    let result = [...entities];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((entity) =>
        config.searchKeys.some((key) => {
          const value = getEntityValue(entity, key);
          return value && String(value).toLowerCase().includes(query);
        })
      );
    }

    // Filter
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((entity) => {
          const entityValue = getEntityValue(entity, key);
          if (typeof entityValue === "string") {
            // Handle comma-separated values
            return entityValue
              .split(",")
              .map((v) => v.trim().toLowerCase())
              .includes(value.toLowerCase());
          }
          return String(entityValue).toLowerCase() === value.toLowerCase();
        });
      }
    });

    // Sort
    const sortConfig = config.sortOptions.find((opt) => opt.key === sortKey);
    if (sortConfig) {
      result.sort(sortConfig.compare);
    }

    return result;
  })();

  const Icon = config.icon;
  const hasActiveFilters =
    Object.keys(activeFilters).length > 0 || searchQuery.trim() !== "";

  return (
    <div className="space-y-4">
      {/* Search and Controls Bar */}
      <div className="flex flex-col gap-4">
        {/* Main Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={`Search ${config.title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {/* Sort Select */}
            <div className="w-40">
              <Select
                options={sortOptions}
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
              />
            </div>

            {/* Toggle Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-colors ${
                showFilters || hasActiveFilters
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-input hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {Object.keys(activeFilters).length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {Object.keys(activeFilters).length}
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && config.filters.length > 0 && (
          <div className="flex flex-wrap gap-3 p-4 rounded-lg border bg-card">
            {config.filters.map((filter) => (
              <div key={filter.key} className="min-w-[150px]">
                <label className="text-xs text-muted-foreground mb-1 block">
                  {filter.label}
                </label>
                <Select
                  options={filterOptions[filter.key] || []}
                  value={activeFilters[filter.key] || ""}
                  onChange={(e) =>
                    handleFilterChange(filter.key, e.target.value)
                  }
                />
              </div>
            ))}
            {hasActiveFilters && (
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {processedEntities.length} of {entities.length} {config.title.toLowerCase()}
      </div>

      {/* Entity Grid */}
      {processedEntities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No results found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 text-primary hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processedEntities.map((entity, index) => (
            <Card
              key={index}
              className="hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${config.iconColor}`} />
                  {getEntityDisplayName(entity)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {config.fields.slice(0, 4).map((field) => {
                    const value = getEntityValue(entity, field.key);
                    const displayValue = field.format
                      ? field.format(value)
                      : String(value ?? "N/A");
                    return (
                      <div key={field.key}>
                        <span className="text-muted-foreground">
                          {field.label}:
                        </span>
                        <p className="font-mono text-foreground">
                          {displayValue}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  {config.badges.map((badge) => {
                    const value = getEntityValue(entity, badge.key);
                    if (!value) return null;
                    return (
                      <Badge key={badge.key} variant={badge.variant}>
                        {String(value)}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
