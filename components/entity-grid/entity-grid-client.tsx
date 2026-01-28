"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarWarsEntity } from "@/types/Root";
import { EntityConfig } from "@/lib/entity-config";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface EntityGridClientProps {
  entities: StarWarsEntity[];
  config: EntityConfig;
}

/**
 * Type-safe helper to get an icon component from lucide-react
 */
function getIconComponent(iconName: string): LucideIcon {
  const IconComponent = (LucideIcons as Record<string, unknown>)[iconName];
  if (typeof IconComponent === "function") {
    return IconComponent as LucideIcon;
  }
  // Fallback to a default icon if the specified icon doesn't exist
  return LucideIcons.HelpCircle;
}

/**
 * Type-safe helper to get a field value from an entity
 */
function getEntityValue(entity: StarWarsEntity, key: string): unknown {
  return (entity as Record<string, unknown>)[key];
}

export function EntityGridClient({ entities, config }: EntityGridClientProps) {
  const IconComponent = getIconComponent(config.icon);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entities.map((entity, index) => {
          // Get the name value safely
          const nameValue = String(getEntityValue(entity, config.nameKey) ?? "N/A");

          return (
            <Card
              key={index}
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
                    const value = getEntityValue(entity, field.key);
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
          );
        })}
      </div>
    </div>
  );
}
