"use server";

import { loadGithubFiles } from "./loadGIthub";

export const checkFiles = async ({ repoUrl }: { repoUrl: string }) => {
  const docs = await loadGithubFiles({ repoUrl });
  return docs.map((doc) => ({
    id: doc.metadata.id,
    pageContent: doc.pageContent,
    metadata: {
      source: doc.metadata.source,
      repository: doc.metadata.repository,
      branch: doc.metadata.branch,
    },
  }));
};
