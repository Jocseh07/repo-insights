"use server";

import { loadGithubFiles } from "./loadGIthub";

export const checkFiles = async ({ repoUrl }: { repoUrl: string }) => {
  const docs = await loadGithubFiles({ repoUrl });
  return docs.map((doc) => ({
    id: doc.metadata.id as string,
    pageContent: doc.pageContent,
    metadata: {
      source: doc.metadata.source as string,
      repository: doc.metadata.repository as string,
      branch: doc.metadata.branch as string,
    },
  }));
};
