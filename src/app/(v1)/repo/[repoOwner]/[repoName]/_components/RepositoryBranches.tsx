"use client";

import useRepoBranches from "@/hooks/github/useRepoBranches";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch } from "lucide-react";
import Link from "next/link";
import RepositoryBranchesSkeleton from "./RepositoryBranchesSkeleton";
import RepositoryError from "./RepositoryError";
import NoDataAlert from "./NoDataAlert";

export default function RepositoryBranches({
  repoOwner,
  repoName,
}: {
  repoOwner: string;
  repoName: string;
}) {
  const {
    data: branches,
    isLoading,
    error,
  } = useRepoBranches({
    owner: repoOwner,
    repo: repoName,
  });

  if (isLoading) return <RepositoryBranchesSkeleton />;
  if (error || !branches) return <RepositoryError name="branches" />;
  if (branches.data.length === 0) return <NoDataAlert name="branches" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Branches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {branches.data.map((branch) => (
            <Link
              key={branch.name}
              href={`https://github.com/${repoOwner}/${repoName}/tree/${branch.name}`}
              target="_blank"
              className="flex items-center gap-2 rounded-md p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <GitBranch className="h-4 w-4" />
              <span>{branch.name}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
