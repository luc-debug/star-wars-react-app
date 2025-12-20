import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PeopleGrid } from "@/features/peoples/components/people-grid"
import { PlanetsGrid } from "@/features/planets/components/planets-grid"
import { StarshipsGrid } from "@/features/starships/components/starships-grid"
import { Header } from "@/components/header"
import { LoadingGrid } from "@/components/loading-grid"
import { Timeline } from "@/components/timeline"

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-balance bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Star Wars Databank
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore peoples, planets, and starships from a galaxy far, far away
          </p>
        </div>

        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="people">Peoples</TabsTrigger>
            <TabsTrigger value="planets">Planets</TabsTrigger>
            <TabsTrigger value="starships">Starships</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="mt-0">
            <Timeline />
          </TabsContent>

          <TabsContent value="people" className="mt-0">
            <Suspense fallback={<LoadingGrid />}>
              <PeopleGrid />
            </Suspense>
          </TabsContent>

          <TabsContent value="planets" className="mt-0">
            <Suspense fallback={<LoadingGrid />}>
              <PlanetsGrid />
            </Suspense>
          </TabsContent>

          <TabsContent value="starships" className="mt-0">
            <Suspense fallback={<LoadingGrid />}>
              <StarshipsGrid />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
