"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Film, Calendar, Clock, Sparkles, Swords, Rocket, Crown, Zap, User } from "lucide-react"

type TimelineMode = "chronological" | "release"

interface StarWarsFilm {
  title: string
  episode: string
  year: number
  director: string
  releaseYear: number
  chronologicalYear: number
  description: string
  era: "prequel" | "original" | "sequel"
  color: string
  icon: string
}

const films: StarWarsFilm[] = [
  {
    title: "The Phantom Menace",
    episode: "Episode I",
    year: 32,
    director: "George Lucas",
    releaseYear: 1999,
    chronologicalYear: 32,
    description: "The Jedi Knights discover a young slave with extraordinary Force abilities.",
    era: "prequel",
    color: "from-red-500 to-orange-500",
    icon: "crown",
  },
  {
    title: "Attack of the Clones",
    episode: "Episode II",
    year: 22,
    director: "George Lucas",
    releaseYear: 2002,
    chronologicalYear: 22,
    description: "The Republic faces a separatist crisis as clone armies are discovered.",
    era: "prequel",
    color: "from-red-500 to-orange-500",
    icon: "swords",
  },
  {
    title: "Revenge of the Sith",
    episode: "Episode III",
    year: 19,
    director: "George Lucas",
    releaseYear: 2005,
    chronologicalYear: 19,
    description: "The Clone Wars end and the Empire rises from the ashes of the Republic.",
    era: "prequel",
    color: "from-red-500 to-orange-500",
    icon: "zap",
  },
  {
    title: "A New Hope",
    episode: "Episode IV",
    year: 0,
    director: "George Lucas",
    releaseYear: 1977,
    chronologicalYear: 0,
    description: "A young farm boy joins forces with a Jedi Knight to save the galaxy.",
    era: "original",
    color: "from-blue-500 to-cyan-500",
    icon: "sparkles",
  },
  {
    title: "The Empire Strikes Back",
    episode: "Episode V",
    year: 3,
    director: "Irvin Kershner",
    releaseYear: 1980,
    chronologicalYear: 3,
    description: "The Rebels flee and Luke learns a devastating truth about his father.",
    era: "original",
    color: "from-blue-500 to-cyan-500",
    icon: "swords",
  },
  {
    title: "Return of the Jedi",
    episode: "Episode VI",
    year: 4,
    director: "Richard Marquand",
    releaseYear: 1983,
    chronologicalYear: 4,
    description: "The Rebels launch a final assault to destroy the second Death Star.",
    era: "original",
    color: "from-blue-500 to-cyan-500",
    icon: "crown",
  },
  {
    title: "The Force Awakens",
    episode: "Episode VII",
    year: 34,
    director: "J.J. Abrams",
    releaseYear: 2015,
    chronologicalYear: 34,
    description: "A new generation of heroes rises to face the remnants of the Empire.",
    era: "sequel",
    color: "from-purple-500 to-pink-500",
    icon: "user",
  },
  {
    title: "The Last Jedi",
    episode: "Episode VIII",
    year: 34,
    director: "Rian Johnson",
    releaseYear: 2017,
    chronologicalYear: 34,
    description: "Rey seeks to learn the ways of the Force from a reluctant Luke Skywalker.",
    era: "sequel",
    color: "from-purple-500 to-pink-500",
    icon: "sparkles",
  },
  {
    title: "The Rise of Skywalker",
    episode: "Episode IX",
    year: 35,
    director: "J.J. Abrams",
    releaseYear: 2019,
    chronologicalYear: 35,
    description: "The final chapter in the Skywalker saga brings an epic conclusion.",
    era: "sequel",
    color: "from-purple-500 to-pink-500",
    icon: "zap",
  },
]

function getIcon(iconName: string) {
  const icons: Record<string, typeof Film> = {
    crown: Crown,
    swords: Swords,
    sparkles: Sparkles,
    zap: Zap,
    user: User,
    rocket: Rocket,
  }
  return icons[iconName] || Film
}

export function Timeline() {
  const [mode, setMode] = useState<TimelineMode>("chronological")
  const [selectedFilm, setSelectedFilm] = useState<StarWarsFilm | null>(null)

  const sortedFilms = [...films].sort((a, b) => {
    if (mode === "chronological") {
      return b.chronologicalYear - a.chronologicalYear
    }
    return a.releaseYear - b.releaseYear
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Star Wars Timeline</h2>
          <p className="text-muted-foreground text-balance">
            Journey through the Skywalker saga across{" "}
            {mode === "chronological" ? "galactic history" : "cinematic releases"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={mode === "chronological" ? "default" : "outline"}
            onClick={() => setMode("chronological")}
            className="gap-2"
          >
            <Clock className="w-4 h-4" />
            Chronological
          </Button>
          <Button
            variant={mode === "release" ? "default" : "outline"}
            onClick={() => setMode("release")}
            className="gap-2"
          >
            <Calendar className="w-4 h-4" />
            Release Order
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
          <span className="text-xs text-muted-foreground font-medium">Prequel Trilogy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
          <span className="text-xs text-muted-foreground font-medium">Original Trilogy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          <span className="text-xs text-muted-foreground font-medium">Sequel Trilogy</span>
        </div>
      </div>

      <div className="relative w-full">
        {/* Timeline container with custom scrollbar */}
        <div className="relative overflow-x-auto pb-6">
          <div className="relative min-w-max px-8 py-8">
            {/* Horizontal timeline line with gradient */}
            <div className="absolute top-[72px] left-8 right-8 h-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute top-[72px] left-8 right-8 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 blur-sm" />

            {/* Timeline items */}
            <div className="relative flex items-start gap-0">
              {sortedFilms.map((film, index) => {
                const IconComponent = getIcon(film.icon)
                const isSelected = selectedFilm?.episode === film.episode

                return (
                  <div
                    key={film.episode}
                    className="relative flex flex-col items-center group cursor-pointer"
                    style={{ width: `${100 / sortedFilms.length}%`, minWidth: "160px" }}
                    onClick={() => setSelectedFilm(isSelected ? null : film)}
                  >
                    {/* Timeline node */}
                    <div className="relative z-10 flex items-center justify-center mb-6">
                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${film.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 scale-75 group-hover:scale-100`}
                      />

                      {/* Node circle */}
                      <div
                        className={`relative flex items-center justify-center w-20 h-20 rounded-full border-4 transition-all duration-300 ${
                          isSelected
                            ? `bg-gradient-to-br ${film.color} border-transparent shadow-lg scale-110`
                            : "bg-card border-border group-hover:border-primary group-hover:scale-110"
                        }`}
                      >
                        <IconComponent
                          className={`w-8 h-8 transition-all duration-300 ${
                            isSelected ? "text-white" : "text-muted-foreground group-hover:text-primary"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Film information */}
                    <div className="text-center space-y-2 px-2">
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold transition-colors ${
                          isSelected ? "border-primary bg-primary/10 text-primary" : ""
                        }`}
                      >
                        {film.episode}
                      </Badge>
                      <h3
                        className={`text-sm font-bold text-balance leading-tight transition-colors ${
                          isSelected ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                        }`}
                      >
                        {film.title}
                      </h3>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-medium text-primary">
                          {mode === "chronological"
                            ? `${Math.abs(film.chronologicalYear)} ${film.chronologicalYear >= 0 ? "BBY" : "ABY"}`
                            : film.releaseYear}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {mode === "chronological" ? `Released ${film.releaseYear}` : film.director}
                        </p>
                      </div>
                    </div>

                    {/* Connecting line to next film */}
                    {index < sortedFilms.length - 1 && (
                      <div className="absolute top-[72px] left-[50%] w-full h-1 opacity-0" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-12 h-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>

      {selectedFilm && (
        <Card
          className={`p-8 border-2 bg-gradient-to-br ${selectedFilm.color} bg-opacity-5 backdrop-blur-sm animate-in fade-in-50 slide-in-from-bottom-4 duration-300 relative overflow-hidden`}
        >
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${selectedFilm.color} opacity-5`} />

          <div className="relative space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className={`bg-gradient-to-r ${selectedFilm.color} text-white border-0 px-3 py-1`}>
                    {selectedFilm.episode}
                  </Badge>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">Directed by {selectedFilm.director}</span>
                </div>
                <h3 className="text-3xl font-bold text-foreground tracking-tight">{selectedFilm.title}</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedFilm(null)} className="shrink-0">
                Close
              </Button>
            </div>

            <p className="text-foreground/90 leading-relaxed text-base">{selectedFilm.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Era</p>
                <p className="text-sm font-bold text-foreground capitalize">{selectedFilm.era} Trilogy</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Timeline</p>
                <p className="text-sm font-bold text-foreground">
                  {Math.abs(selectedFilm.chronologicalYear)} {selectedFilm.chronologicalYear >= 0 ? "BBY" : "ABY"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Released</p>
                <p className="text-sm font-bold text-foreground">{selectedFilm.releaseYear}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Director</p>
                <p className="text-sm font-bold text-foreground">{selectedFilm.director}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="flex items-center justify-center gap-8 text-xs text-muted-foreground pt-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>
            <span className="font-semibold">BBY</span> = Before the Battle of Yavin
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            <span className="font-semibold">ABY</span> = After the Battle of Yavin
          </span>
        </div>
      </div>
    </div>
  )
}
