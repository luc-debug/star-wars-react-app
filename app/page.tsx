import Link from "next/link";
import { Timeline } from "@/components/timeline";
import { Users, Globe, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Star Wars Databank
              </h1>
              <p className="text-lg text-muted-foreground max-w-prose">
                Eine umfangreiche, schnell zugängliche Datenbank für das
                Star‑Wars‑Universum: Charaktere, Planeten, Schiffe und mehr —
                wunderschön dargestellt und sofort durchsuchbar.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/people">
                  <Button variant="default" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    People
                  </Button>
                </Link>

                <Link href="/planets">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Planets
                  </Button>
                </Link>

                <Link href="/starships">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    Starships
                  </Button>
                </Link>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                Pro Tipp: Verwende die Filter & Suche, um schnell Ergebnisse zu
                finden — oder stöbere per Timeline weiter unten.
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-card to-accent/5 p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Quick Look</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Über 100+ Einträge (dynamisch per SWAPI geladen)</li>
                  <li>Sofortige Suche, Sortierung & Filter</li>
                  <li>Responsive Design für Desktop & Mobile</li>
                </ul>
                <div className="mt-4 flex gap-2">
                  <Button asChild>
                    <Link href="/films">Browse Films</Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href="/species">Explore Species</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Discover</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 rounded-lg border bg-card hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-md p-2 bg-primary/10 text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold">Characters</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Detaillierte Einträge zu Namen, Maßen, Geburtsjahren und mehr.
              </p>
              <Link href="/people" className="text-sm text-primary hover:underline">
                View Characters →
              </Link>
            </article>

            <article className="p-6 rounded-lg border bg-card hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-md p-2 bg-accent/10 text-accent">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold">Planets</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Klima, Terrain, Population und andere planetare Eigenschaften.
              </p>
              <Link href="/planets" className="text-sm text-primary hover:underline">
                View Planets →
              </Link>
            </article>

            <article className="p-6 rounded-lg border bg-card hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-md p-2 bg-primary/10 text-primary">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold">Starships</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Technische Daten, Kapazität, Hersteller und mehr.
              </p>
              <Link href="/starships" className="text-sm text-primary hover:underline">
                View Starships →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* TIMELINE / EXTRA */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Timeline</h2>
          <Timeline />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 mt-12 border-t">
        <div className="container mx-auto px-6 lg:px-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Star Wars Databank</div>
          <div className="flex gap-4">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
