import { unstable_cacheLife } from "next/cache";
import { getOctokit } from "./github";

export const getRepos = async ({
  username,
  sort,
  page,
  per_page,
  direction,
}: {
  username: string;
  sort?: "created" | "updated" | "pushed" | "full_name";
  page?: number;
  per_page?: number;
  direction?: "asc" | "desc";
}) => {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.repos.listForUser({
    username,
    page: page || 1,
    per_page: per_page || 10,
    sort: sort || "created",
    direction: direction || "desc",
  });

  return data;
};

export async function getOneRepo({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.repos.get({
    owner,
    repo,
  });

  return data;
}

export async function getRepoReadme({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.repos.getReadme({
    owner,
    repo,
  });

  return data;
}

export async function getUserRepos() {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.repos.listForAuthenticatedUser();

  return data;
}

export async function searchRepos({
  q,
  page,
  per_page,
  order,
  sort,
}: {
  q: string;
  page?: number;
  per_page?: number;
  order?: "desc" | "asc";
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated";
}) {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.search.repos({
    q,
    page: page || 1,
    per_page: per_page || 10,
    order: order || "desc",
    sort: sort || "stars",
  });

  return data;
}

export async function getPopularRepos({
  page,
  per_page,
  language,
}: {
  page?: number;
  per_page?: number;
  language?: string;
}) {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.search.repos({
    q: `stars:>1000 ${language ? `language:${language}` : ""}`,
    page: page || 1,
    per_page: per_page || 6,
    sort: "stars",
    order: "desc",
  });

  return data;
}
