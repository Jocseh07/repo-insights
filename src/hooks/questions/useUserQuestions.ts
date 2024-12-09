import { useQuery } from "@tanstack/react-query";
import { getUserQuestions } from "@/server/actions/questions/questions";

export default function useUserQuestions() {
  return useQuery({
    queryKey: ["userQuestions"],
    queryFn: async () => await getUserQuestions(),
  });
}
