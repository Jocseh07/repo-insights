import { useQuery } from "@tanstack/react-query";
import useOctokit from "../useOctokit";

export default function useRepoReadme({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const octokit = useOctokit();

  return useQuery({
    queryKey: ["repo", owner, repo, "readme"],
    queryFn: async () =>
      await octokit?.rest.repos.getReadme({
        owner,
        repo,
      }),
  });
}
