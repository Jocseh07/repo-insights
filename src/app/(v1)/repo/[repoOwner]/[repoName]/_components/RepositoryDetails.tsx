"use client";

import useRepo from "@/hooks/github/useRepo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, GitFork, Clock, Eye, ExternalLink } from "lucide-react";
import { format } from "timeago.js";
import Image from "next/image";
import Link from "next/link";
import RepositoryDetailsSkeleton from "./RepositoryDetailsSkeleton";
import RepositoryError from "./RepositoryError";
import { Badge } from "@/components/ui/badge";
import RepositoryReadmeDialog from "./RepositoryReadmeDialog";
import { Button } from "@/components/ui/button";
import AskQuestionCard from "./AskQuestionCard";
import { checkProjectExists } from "@/server/actions/project";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { CreateProject } from "./CreateProject";
import { Skeleton } from "@/components/ui/skeleton";

export default function RepositoryDetails({
  repoOwner,
  repoName,
}: {
  repoOwner: string;
  repoName: string;
}) {
  const [projectExists, setProjectExists] = useState<boolean | null>(null);

  const {
    data: repo,
    isLoading,
    error,
  } = useRepo({
    owner: repoOwner,
    repo: repoName,
  });
  useEffect(() => {
    if (!repo?.data.id) return;
    const checkingProjectExists = async () => {
      const exists = await checkProjectExists({ repoId: repo.data.id });
      setProjectExists(!!exists);
    };
    void checkingProjectExists();
  }, [repo?.data.id]);
  if (isLoading) return <RepositoryDetailsSkeleton />;
  if (error || !repo) return <RepositoryError name="details" />;

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Profile Card */}
            <Card className="flex-1">
              <CardHeader className="flex h-full flex-row items-center gap-3 p-4 sm:gap-6 sm:p-6">
                <Image
                  src={repo.data.owner.avatar_url}
                  alt={`${repo.data.owner.login}'s avatar`}
                  width={40}
                  height={40}
                  className="rounded border-4 border-primary/10 shadow-lg sm:h-[80px] sm:w-[80px]"
                />
                <div className="space-y-2 sm:space-y-3">
                  <CardTitle className="text-lg sm:text-2xl">
                    <Link
                      href={repo.data.html_url}
                      target="_blank"
                      className="hover:text-primary hover:underline"
                    >
                      {repo.data.owner.login}/{repo.data.name}
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    {repo.data.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {repo.data.visibility && (
                      <Badge variant="outline">
                        {repo.data.visibility.toUpperCase()}
                      </Badge>
                    )}
                    {repo.data.homepage && (
                      <Link href={repo.data.homepage} target="_blank">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Website
                        </Badge>
                      </Link>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Stats Card */}
            <Card className="flex-1">
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-base font-semibold">
                        {repo.data.stargazers_count.toLocaleString()} stars
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitFork className="h-4 w-4 text-blue-500" />
                      <span className="text-base font-semibold">
                        {repo.data.forks_count.toLocaleString()} forks
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-500" />
                      <span className="text-base font-semibold">
                        {repo.data.watchers_count.toLocaleString()} watchers
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Updated {format(repo.data.updated_at)}
                      </span>
                    </div>
                    {repo.data.language && (
                      <Link
                        href={`https://github.com/topics/${repo.data.language}`}
                        target="_blank"
                      >
                        <Badge variant="secondary" className="text-sm">
                          {repo.data.language}
                        </Badge>
                      </Link>
                    )}
                    <RepositoryReadmeDialog
                      repoOwner={repoOwner}
                      repoName={repoName}
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>
      <SignedIn>
        {projectExists === null ? (
          <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        ) : !projectExists ? (
          <div className="transition-all duration-200 hover:opacity-95">
            <CreateProject
              repoOwner={repoOwner}
              repoName={repoName}
              repoId={repo.data.id}
            />
          </div>
        ) : (
          <div className="transition-all duration-200 hover:opacity-95">
            <AskQuestionCard repoId={repo.data.id} />
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">
            Have a question about this repository?
          </h3>
          <p className="mb-4 text-muted-foreground">
            Sign in to ask questions and get help from the community.
          </p>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </SignedOut>
    </>
  );
}
