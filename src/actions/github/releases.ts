"use server";

import { getOctokit } from "./github";

export const getReleases = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.repos.listReleases({
    owner,
    repo,
  });
  return data;
};
