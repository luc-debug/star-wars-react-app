import Link from "next/link";
import { Users, Globe, Rocket } from "lucide-react";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden py-8">
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
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-2">
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
              <Link
                href="/people"
                className="text-sm text-primary hover:underline"
              >
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
              <Link
                href="/planets"
                className="text-sm text-primary hover:underline"
              >
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
              <Link
                href="/starships"
                className="text-sm text-primary hover:underline"
              >
                View Starships →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 mt-12 border-t">
        <div className="container mx-auto px-6 lg:px-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Star Wars Databank</div>
          <div className="flex gap-4">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
