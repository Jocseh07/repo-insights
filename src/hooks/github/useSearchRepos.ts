import { useQuery } from "@tanstack/react-query";
import useOctokit from "../useOctokit";

export default function useSearchRepositories({
  query,
  page = 1,
  per_page = 6,
  sort = "stars",
  order = "desc",
}: {
  query: string;
  page?: number;
  per_page?: number;
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated";
  order?: "desc" | "asc";
}) {
  const octokit = useOctokit();

  return useQuery({
    queryKey: ["repos", query, page, per_page, sort, order],
    queryFn: async () => {
      try {
        return await octokit?.rest.search.repos({
          q: query,
          page,
          per_page,
          sort,
          order,
        });
      } catch (error) {
        throw error;
      }
    },
  });
}
