"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarWarsEntity } from "@/types/Root";
import { EntityConfig } from "./entity-config";
import * as LucideIcons from 'lucide-react';

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
        {entities.map((entity, index) => (
          <Card
            key={index}
            className="hover:border-primary/50 transition-colors"
          >
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
                {(entity as Record<string, unknown>)[config.nameKey]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {config.fields.slice(0, 4).map((field) => {
                  const value = (entity as Record<string, unknown>)[field.key];
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
                  const value = (entity as Record<string, unknown>)[badge.key];
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
    </div>
  );
}
