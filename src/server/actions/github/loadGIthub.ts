"use server";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { getUserId } from "../helpers";
import { getToken } from "@/server/actions/user/getToken";

export const loadGithubFiles = async ({ repoUrl }: { repoUrl: string }) => {
  const userId = await getUserId();
  const token = await getToken({ userId });
  if (!token) throw new Error("User not authenticated");
  const loader = new GithubRepoLoader(repoUrl, {
    accessToken: token,
    branch: "main",
    ignoreFiles: [
      "package-lock.json",
      "yarn.lock",
      "bun.lockb",
      "pnpm-lock.yaml",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });
  const docs = await loader.load();
  return docs;
};
