import useRepoIssues from "@/hooks/github/useRepoIssues";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { format } from "timeago.js";
import RepositoryIssuesSkeleton from "./RepositoryIssuesSkeleton";
import RepositoryError from "./RepositoryError";
import NoDataAlert from "./NoDataAlert";
export default function RepositoryIssues({
  repoOwner,
  repoName,
}: {
  repoOwner: string;
  repoName: string;
}) {
  const {
    data: issues,
    isLoading,
    error,
  } = useRepoIssues({
    owner: repoOwner,
    repo: repoName,
  });

  if (isLoading) return <RepositoryIssuesSkeleton />;
  if (error || !issues) return <RepositoryError name="issues" />;
  if (issues.data.length === 0) return <NoDataAlert name="issues" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Issues</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {issues.data.map((issue) => (
            <Link
              key={issue.id}
              href={issue.html_url}
              target="_blank"
              className="flex items-center gap-2 rounded-md p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <AlertCircle className="h-4 w-4" />
              <span>{issue.title}</span>
              <span className="ml-auto text-xs">
                {format(issue.created_at || "")}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
