"use server";

import { getOctokit } from "./github";

export const getIssues = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.issues.listForRepo({
    owner,
    repo,
  });

  return data;
};
