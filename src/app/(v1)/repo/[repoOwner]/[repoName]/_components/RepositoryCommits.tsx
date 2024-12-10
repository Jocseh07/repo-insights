import useRepoCommits from "@/hooks/github/useRepoCommits";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit } from "lucide-react";
import Link from "next/link";
import RepositoryCommitsSkeleton from "./RepositoryCommitsSkeleton";
import { format } from "timeago.js";
import RepositoryError from "./RepositoryError";
import NoDataAlert from "./NoDataAlert";

export default function RepositoryCommits({
  repoOwner,
  repoName,
}: {
  repoOwner: string;
  repoName: string;
}) {
  const {
    data: commits,
    isLoading,
    error,
  } = useRepoCommits({
    owner: repoOwner,
    repo: repoName,
  });

  if (isLoading) return <RepositoryCommitsSkeleton />;
  if (error || !commits) return <RepositoryError name="commits" />;
  if (commits.data.length === 0) return <NoDataAlert name="commits" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          <Link
            href={`https://github.com/${repoOwner}/${repoName}/commits`}
            target="_blank"
          >
            Recent Commits
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {commits.data.map((commit) => (
            <Link
              key={commit.sha}
              href={`https://github.com/${repoOwner}/${repoName}/commit/${commit.sha}`}
              target="_blank"
              className="flex items-center gap-2 rounded-md p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <GitCommit className="h-4 w-4" />
              <span className="flex-1 truncate">{commit.commit.message}</span>
              <span className="w-24 text-right text-xs">
                {format(commit.commit.author?.date ?? "")}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
