import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { People } from "../types/People";
import { ResponseType } from "@/types/ResponseType";

async function getPeople(): Promise<People[]> {
  const res = await fetch("https://swapi.py4e.com/api/people", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch people");
  }

  const data: ResponseType<People[]> = await res.json();
  return data.results.slice(0, 12);
}

export async function PeopleGrid() {
  const people = await getPeople();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {people.map((person, index) => (
        <Card key={index} className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {person.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Height:</span>
                <p className="font-mono text-foreground">{person.height} cm</p>
              </div>
              <div>
                <span className="text-muted-foreground">Mass:</span>
                <p className="font-mono text-foreground">{person.mass} kg</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{person.gender}</Badge>
              <Badge variant="outline">{person.birth_year}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
