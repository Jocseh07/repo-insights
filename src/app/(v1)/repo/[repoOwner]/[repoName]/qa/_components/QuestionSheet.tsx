"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Fragment } from "react";
import MDEditor from "@uiw/react-md-editor";
import { FileReferences } from "@/types/types";
import { useSearchParams, useRouter } from "next/navigation";
import { Question } from "@/server/db/schema";
import CodeReferences from "@/app/(v1)/qa/_components/CodeReferences";

interface QuestionSheetProps {
  questions: Question[];
}

export default function QuestionSheet({ questions }: QuestionSheetProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const questionIdx = parseInt(searchParams.get("q") || "0");
  const question = questions[questionIdx];

  const setQuestionIdx = (idx: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("q", idx.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Sheet>
      <div className="h-4" />
      <h1 className="text-xl font-semibold">Repository Questions</h1>
      <div className="h-2" />
      <div className="flex flex-col gap-2">
        {questions.map((q, idx) => (
          <Fragment key={q.id}>
            <SheetTrigger onClick={() => setQuestionIdx(idx)}>
              <div className="flex items-center gap-4 rounded border p-4 shadow hover:bg-accent/50">
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <p className="line-clamp-1 text-lg font-medium">
                      {q.question}
                    </p>
                    <span className="whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(q.createdAt || "").toLocaleDateString()}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {q.answer}
                  </p>
                </div>
              </div>
            </SheetTrigger>
          </Fragment>
        ))}
      </div>
      {question && (
        <SheetContent className="sm:max-w-[80vw]">
          <SheetHeader>
            <SheetTitle>{question.question}</SheetTitle>
            <div className="mt-4">
              <MDEditor.Markdown
                source={question.answer}
                className="prose max-w-none dark:prose-invert"
              />
            </div>
            <div className="mt-6">
              <CodeReferences
                fileReferences={
                  (question.fileReferences as FileReferences) ?? []
                }
              />
            </div>
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
}
