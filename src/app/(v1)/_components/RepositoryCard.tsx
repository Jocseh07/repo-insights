"use client";
import { Star, GitFork, Clock } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ErrorRepositoryCard } from "../qa/_components/ErrorRepositoryCard";
import { RepositoryCardSkeletons } from "./RepositoryCardSkeletons";
import { format } from "timeago.js";
import Image from "next/image";
import useSearchRepositories from "@/hooks/github/useSearchRepos";
import { languageColors } from "@/data/languageColors";
import Link from "next/link";

export function RepositoryCard({
  query,
  page = 1,
  per_page = 6,
  order = "desc",
  sort = "stars",
}: {
  query: string;
  page?: number;
  per_page?: number;
  order?: "desc" | "asc";
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated";
}) {
  const { data: repos, isPending } = useSearchRepositories({
    query,
    per_page,
    page,
    order,
    sort,
  });

  if (isPending) return <RepositoryCardSkeletons number={per_page} />;
  if (repos === undefined && !isPending) return <ErrorRepositoryCard />;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      {repos?.data.items.map((repo) => (
        <Card
          key={`${repo.owner?.login}/${repo.name}/${repo.id}`}
          className="w-full transition-shadow hover:shadow-md"
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <Image
                src={repo.owner?.avatar_url ?? ""}
                alt={`${repo.owner?.login}'s avatar`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="space-y-1">
                <Link
                  href={`/repo/${repo.owner?.login}/${repo.name}`}
                  className="cursor-pointer text-xl font-semibold hover:text-primary"
                >
                  {repo.owner?.login}/{repo.name}
                </Link>
                <p className="line-clamp-2 text-muted-foreground">
                  {repo.description}
                </p>
                {repo.language && (
                  <div className="inline-block">
                    <Link
                      href={`/search?query=${repo.language}`}
                      className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ring-2 ring-inset ring-primary/20 ${
                        languageColors.find(
                          (lang) => lang.name === repo.language,
                        )?.color
                      }`}
                    >
                      {repo.language}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex cursor-pointer items-center gap-1.5 hover:text-primary">
                <Star className="h-4 w-4" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex cursor-pointer items-center gap-1.5 hover:text-primary">
                <GitFork className="h-4 w-4" />
                <span>{repo.forks.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{format(repo.updated_at)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
