import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket } from "lucide-react";
import { Starship } from "../types/starship";
import { ResponseType } from "@/types/ResponseType";

async function getStarships(): Promise<Starship[]> {
  const res = await fetch("https://swapi.py4e.com/api/starships", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch starships");
  }

  const data: ResponseType<Starship[]> = await res.json();
  return data.results;
}

export async function StarshipsGrid() {
  const starships = await getStarships();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {starships.map((starship, index) => (
        <Card key={index} className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              {starship.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-muted-foreground text-sm">Model:</span>
              <p className="font-mono text-sm">{starship.model}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Crew:</span>
                <p className="font-mono text-foreground">{starship.crew}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Passengers:</span>
                <p className="font-mono text-foreground">
                  {starship.passengers}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{starship.starship_class}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
