import { getUserQuestions } from "@/server/actions/questions/questions";
import QuestionSheet from "./_components/QuestionSheet";

export default async function RepoQAPage({
  params,
}: {
  params: { repoOwner: string; repoName: string };
}) {
  const questions = await getUserQuestions();

  return <QuestionSheet questions={questions} />;
}
