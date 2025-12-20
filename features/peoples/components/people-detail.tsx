import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Ruler,
  Scale,
  Calendar,
  User,
  Scissors,
  Palette,
  Eye,
  Film,
  Rocket,
  Car,
  Globe,
} from "lucide-react";
import { People } from "../types/People";
import { ResponseType } from "@/types/ResponseType";
import { Badge } from "@/components/ui/badge";

export async function PeopleDetail({ slug }: { slug: string }) {
  const searchTerm = (slug && slug.split("-")[0]) || slug;

  const res = await fetch(
    `https://swapi.py4e.com/api/people/?search=${searchTerm}`
  );
  const data: ResponseType<People[]> = await res.json();
  const person = data.results?.[0];

  if (!person) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">People Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No People found for "{slug.replace(/-/g, " ")}".
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statItems = [
    { label: "Height", value: person.height, unit: "cm", icon: Ruler },
    { label: "Mass", value: person.mass, unit: "kg", icon: Scale },
    { label: "Birth Year", value: person.birth_year, icon: Calendar },
    { label: "Gender", value: person.gender, icon: User },
  ];

  const appearanceItems = [
    { label: "Hair Color", value: person.hair_color, icon: Scissors },
    { label: "Skin Color", value: person.skin_color, icon: Palette },
    { label: "Eye Color", value: person.eye_color, icon: Eye },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {person.name}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statItems.map((item) => (
          <Card key={item.label} className="bg-card/50 backdrop-blur">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <item.icon className="w-6 h-6 mb-2 text-primary" />
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
        ))}
      </div>

      {/* Appearance */}
      <Card className="mb-8 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {appearanceItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium capitalize">
                    {item.value !== "unknown" && item.value !== "n/a"
                      ? item.value
                      : "Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Films */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Film className="w-4 h-4 text-primary" />
              Films
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">
              {person.films?.length || 0} appearances
            </Badge>
          </CardContent>
        </Card>

        {/* Starships */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Rocket className="w-4 h-4 text-primary" />
              Starships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">
              {person.starships?.length || 0} piloted
            </Badge>
          </CardContent>
        </Card>

        {/* Vehicles */}
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Car className="w-4 h-4 text-primary" />
              Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">
              {person.vehicles?.length || 0} piloted
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Homeworld */}
      {person.homeworld && (
        <Card className="mt-8 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Homeworld
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Homeworld data available via API
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
