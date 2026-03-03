"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StarWarsEntity } from "@/types/Root";
import type { EntityConfig } from "./entity-config";
import { makeSlug } from "@/lib/generateStaticParams";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

interface EntityGridClientProps {
  entities: StarWarsEntity[];
  config: EntityConfig;
}

export function EntityGridClient({ entities, config }: EntityGridClientProps) {
  const IconComponent = LucideIcons[
    config.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entities.map((entity) => {
          // Coerce the name to a safe string so JSX doesn't try to render `unknown`
          const nameValue = String(
            (entity as Record<string, unknown>)[config.nameKey] ?? "N/A",
          );
          const slug = makeSlug(nameValue);

          return (
            <Link key={config.nameKey} href={`/${config.entityType}/${slug}`} passHref>
              <Card
                className="hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
                    {nameValue}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {config.fields.slice(0, 4).map((field) => {
                      const value = (entity as Record<string, unknown>)[
                        field.key
                      ];
                      const displayValue = field.formatSuffix
                        ? `${String(value ?? "N/A")} ${field.formatSuffix}`
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
                      const value = (entity as Record<string, unknown>)[
                        badge.key
                      ];
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
            </Link>
          );
        })}
      </div>
    </div>
  );
}
