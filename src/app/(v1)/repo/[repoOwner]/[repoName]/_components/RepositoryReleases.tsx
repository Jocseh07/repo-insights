import useRepoReleases from "@/hooks/github/useRepoReleases";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";
import Link from "next/link";
import RepositoryReleasesSkeleton from "./RepositoryReleasesSkeleton";
import { format } from "timeago.js";
import RepositoryError from "./RepositoryError";
import NoDataAlert from "./NoDataAlert";

export default function RepositoryReleases({
  repoOwner,
  repoName,
}: {
  repoOwner: string;
  repoName: string;
}) {
  const {
    data: releases,
    isLoading,
    error,
  } = useRepoReleases({
    owner: repoOwner,
    repo: repoName,
  });

  if (isLoading) return <RepositoryReleasesSkeleton />;
  if (error || !releases) return <RepositoryError name="releases" />;
  if (releases.data.length === 0) return <NoDataAlert name="releases" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Releases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {releases.data.map((release) => (
            <Link
              key={release.id}
              href={release.html_url}
              target="_blank"
              className="flex flex-wrap items-center gap-2 rounded-md p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Tag className="h-4 w-4" />
              <span className="break-all">{release.tag_name}</span>
              <span className="ml-auto text-xs">
                {format(release.published_at || "")}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
