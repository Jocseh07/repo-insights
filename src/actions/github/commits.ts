"use server";

import { getOctokit } from "./github";


export const getJustTheCommits = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  const octokit = await getOctokit(); 
  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });

  return data;
};
