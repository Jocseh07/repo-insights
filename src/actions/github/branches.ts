"use server";

import { getOctokit } from "./github";

export const getBranches = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.repos.listBranches({
    owner,
    repo,
  });

  return data;
};
