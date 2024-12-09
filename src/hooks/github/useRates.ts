import { useQuery } from "@tanstack/react-query";
import useOctokit from "../useOctokit";

export default function useRates() {
  const octokit = useOctokit();

  return useQuery({
    queryKey: ["rateLimit", "important"],
    queryFn: async () => await octokit?.rest.rateLimit.get(),
    refetchInterval: 1000 * 1,
    staleTime: 1000 * 1,
  });
}
