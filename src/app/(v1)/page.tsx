import { RepositoryCard } from "@/app/(v1)/_components/RepositoryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hero } from "@/app/(v1)/_components/Hero";
import { Features } from "@/app/(v1)/_components/Features";
import { languageColors } from "@/data/languageColors";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="h-full w-full space-y-6 pt-6 sm:space-y-10 sm:pt-10 md:space-y-16 md:pt-16 lg:space-y-20 lg:pt-20">
      <Hero />
      <Features />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Popular Repositories
          </h1>
          <p className="text-muted-foreground">
            Discover trending repositories in different programming languages.
          </p>
        </div>
        <Tabs defaultValue={languageColors[0]?.name} className="w-full">
          <TabsList className="flex h-fit flex-wrap justify-between gap-2 text-balance">
            {languageColors.map((language) => (
              <TabsTrigger
                key={language.name}
                value={language.name}
                className="min-w-20 gap-1 whitespace-normal"
              >
                <span
                  className={cn(
                    `inline-block h-2 w-2 rounded-full ${language.color} `,
                  )}
                />
                {language.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {languageColors.map((language) => (
            <TabsContent key={language.name} value={language.name}>
              <RepositoryCard query={language.name} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
