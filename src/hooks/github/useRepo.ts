import { useQuery } from "@tanstack/react-query";
import useOctokit from "../useOctokit";

export default function useRepo({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const octokit = useOctokit();

  return useQuery({
    queryKey: ["repo", owner, repo],
    queryFn: async () => await octokit?.rest.repos.get({ owner, repo }),
  });
}
