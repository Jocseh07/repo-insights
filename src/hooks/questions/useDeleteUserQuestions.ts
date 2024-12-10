import { useMutation } from "@tanstack/react-query";
import { deleteQuestion } from "@/server/actions/questions/questions";
import { queryClient } from "@/components/providers/Providers";

export default function useDeleteQuestion() {
  return useMutation({
    mutationFn: async (id: string) => await deleteQuestion(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userQuestions"] });
    },
  });
}
