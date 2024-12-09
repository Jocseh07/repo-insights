import { RepositoryCard } from "@/components/RepositoryCard";
import { languages } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
export default function HomePage() {
  return (
    <div className="h-full w-full">
      <Hero />
      <Features />
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Popular Repositories
        </h1>
        <p className="text-muted-foreground">
          Discover trending repositories in different programming languages.
        </p>
      </div>
      <Tabs defaultValue={languages[0]?.name} className="w-full pb-10">
        <TabsList>
          {languages.map((language) => (
            <TabsTrigger
              key={language.name}
              value={language.name}
              className="gap-3"
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: language.color }}
              />
              {language.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {languages.map((language) => (
          <TabsContent key={language.name} value={language.name}>
            <RepositoryCard query={language.name} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
