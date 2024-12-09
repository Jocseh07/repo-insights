import { useQuery } from "@tanstack/react-query";
import useOctokit from "../useOctokit";

export default function useRepoBranches({
  owner,
  repo,
  perPage = 5,
  page = 1,
}: {
  owner: string;
  repo: string;
  perPage?: number;
  page?: number;
}) {
  const octokit = useOctokit();

  return useQuery({
    queryKey: ["repo", owner, repo, "branches"],
    queryFn: async () =>
      await octokit?.rest.repos.listBranches({
        owner,
        repo,
        per_page: perPage,
        page,
      }),
  });
}
