"use client";

import { useParams } from "next/navigation";
import RepositoryDetails from "./_components/RepositoryDetails";
import RepositoryBranches from "./_components/RepositoryBranches";
import RepositoryCommits from "./_components/RepositoryCommits";
import RepositoryReleases from "./_components/RepositoryReleases";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import RepositoryIssues from "./_components/RepositoryIssues";

export default function RepoDetails() {
  const params = useParams<{ repoOwner: string; repoName: string }>();
  const { repoOwner, repoName } = params;

  return (
    <div className="space-y-6">
      <RepositoryDetails repoOwner={repoOwner} repoName={repoName} />
      <Tabs defaultValue="branches">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="commits">Commits</TabsTrigger>
          <TabsTrigger value="releases">Releases</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>
        <TabsContent value="branches">
          <RepositoryBranches repoOwner={repoOwner} repoName={repoName} />
        </TabsContent>
        <TabsContent value="commits">
          <RepositoryCommits repoOwner={repoOwner} repoName={repoName} />
        </TabsContent>
        <TabsContent value="releases">
          <RepositoryReleases repoOwner={repoOwner} repoName={repoName} />
        </TabsContent>
        <TabsContent value="issues">
          <RepositoryIssues repoOwner={repoOwner} repoName={repoName} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
