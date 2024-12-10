"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Fragment, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { type FileReferences } from "@/types/types";
import useUserQuestions from "@/hooks/questions/useUserQuestions";
import QASkeleton from "./_components/QASkeleton";
import QAError from "./_components/QAError";
import CodeReferences from "./_components/CodeReferences";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { format } from "timeago.js";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteQuestion } from "@/server/actions/questions/questions";
import { useRouter } from "next/navigation";

export default function QAPage() {
  const router = useRouter();
  const [questionIdx, setQuestionIdx] = useState(0);
  const data = useUserQuestions();
  if (!data.data) return <QASkeleton />;
  if (data.error) return <QAError />;
  const questions = data.data;
  const question = questions[questionIdx];

  const handleDelete = async (id: string) => {
    toast.promise(
      async () => {
        await deleteQuestion(id);
      },
      {
        loading: "Deleting question...",
        success: "Question deleted successfully",
        error: "Failed to delete question",
      },
    );
    router.refresh();
  };

  return (
    <>
      <Sheet>
        <h1 className="text-xl font-semibold">Questions & Answers History</h1>
        <div className="h-2" />
        <div className="flex flex-col gap-2">
          {questions.map((question) => (
            <Fragment key={question.id}>
              <div className="flex items-center gap-4 rounded border p-4 shadow hover:bg-accent/50">
                <SheetTrigger
                  onClick={() => setQuestionIdx(questionIdx)}
                  className="flex-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2">
                        <p className="line-clamp-1 text-lg font-medium">
                          {question.question}
                        </p>
                        <span className="whitespace-nowrap text-xs text-muted-foreground">
                          {format(
                            question.createdAt ?? new Date(),
                            "MMM dd, yyyy",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="link" className="p-0">
                          <Link
                            href={`/repo/${question.project.repoOwner}/${question.project.repoName}`}
                          >
                            <span className="text-muted-foreground">
                              {question.project.repoOwner}/
                              {question.project.repoName}
                            </span>
                          </Link>
                        </Button>
                      </div>
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {question.answer}
                      </p>
                    </div>
                  </div>
                </SheetTrigger>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your question and its answer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(question.id)}
                        className={buttonVariants({ variant: "destructive" })}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Fragment>
          ))}
        </div>
        <SheetContent className="sm:max-w-[80vw]">
          <SheetHeader>
            <SheetTitle>Question Details</SheetTitle>
            <div className="mt-4">
              <MDEditor.Markdown
                source={questions[0]?.answer}
                className="prose max-w-none dark:prose-invert"
              />
              <CodeReferences
                fileReferences={
                  (question?.fileReferences as FileReferences) ?? []
                }
              />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
