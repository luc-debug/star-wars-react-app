import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { ResponseType } from "@/types/ResponseType";

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  diameter: string;
  gravity: string;
}

async function getPlanets(): Promise<Planet[]> {
  const res = await fetch("https://swapi.py4e.com/api/planets", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch planets");
  }

  const data: ResponseType<Planet[]> = await res.json();
  return data.results;
}

export async function PlanetsGrid() {
  const planets = await getPlanets();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {planets.map((planet, index) => (
        <Card key={index} className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              {planet.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Diameter:</span>
                <p className="font-mono text-foreground">{planet.diameter}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Gravity:</span>
                <p className="font-mono text-foreground">{planet.gravity}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Population:</span>
                <p className="font-mono text-foreground">{planet.population}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{planet.climate}</Badge>
              <Badge variant="outline">{planet.terrain}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
