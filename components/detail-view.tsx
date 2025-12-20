import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";

// Typen für die generische Komponente
interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AppearanceItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ConnectionItem {
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface AdditionalSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
}

interface GenericDetailViewProps {
  title: string;
  notFoundMessage?: string;
  statItems?: StatItem[];
  appearanceItems?: AppearanceItem[];
  appearanceTitle?: string;
  connectionItems?: ConnectionItem[];
  additionalSections?: AdditionalSection[];
  isLoading?: boolean;
  notFound?: boolean;
}

export function DetailView({
  title,
  notFoundMessage = "Not Found",
  statItems = [],
  appearanceItems = [],
  appearanceTitle = "Appearance",
  connectionItems = [],
  additionalSections = [],
  isLoading = false,
  notFound = false,
}: GenericDetailViewProps) {
  // Not Found State
  if (notFound) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{notFoundMessage}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      {/* Stats Grid */}
      {statItems.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="bg-card/50 backdrop-blur">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Icon className="w-6 h-6 mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-lg font-semibold">
                    {item.value !== "unknown" && item.value !== "n/a"
                      ? `${item.value}${item.unit ? ` ${item.unit}` : ""}`
                      : "Unknown"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Appearance */}
      {appearanceItems.length > 0 && (
        <Card className="mb-8 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {appearanceItems[0]?.icon && (() => {
                const Icon = appearanceItems[0].icon;
                return <Icon className="w-5 h-5 text-primary" />;
              })()}
              {appearanceTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {appearanceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-medium capitalize">
                        {item.value !== "unknown" && item.value !== "n/a"
                          ? item.value
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connections */}
      {connectionItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {connectionItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    {item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">
                    {item.count} {item.description || "items"}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Additional Sections */}
      {additionalSections.map((section, index) => {
        const Icon = section.icon;
        return (
          <Card key={index} className="mt-8 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>{section.content}</CardContent>
          </Card>
        );
      })}
    </div>
  );
}