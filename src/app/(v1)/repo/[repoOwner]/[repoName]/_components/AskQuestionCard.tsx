"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { askQuestion } from "@/server/actions/questions/questions";
import { saveAnswer } from "@/server/actions/answers/answers";
import CodeReferences from "@/app/(v1)/qa/_components/CodeReferences";
import { type FileReferences } from "@/types/types";

interface AskQuestionCardProps {
  repoId: number;
}

export default function AskQuestionCard({ repoId }: AskQuestionCardProps) {
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileReferences, setFileReferences] = useState<FileReferences>([]);
  const [answer, setAnswer] = useState("");
  const [isAnswerSaved, setIsAnswerSaved] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    setAnswer("");
    setFileReferences([]);
    setLoading(true);

    toast.promise(
      async () => {
        const { output, fileReferences: refs } = await askQuestion({
          question,
          repoId: repoId,
        });
        setFileReferences(refs);
        setOpen(true);

        for await (const part of output) {
          if (part.choices[0]?.delta?.content) {
            setAnswer((prev) => prev + (part.choices[0]?.delta?.content ?? ""));
          }
        }
      },
      {
        loading: "Asking RepoInsight...",
        success: "Question asked successfully",
        error: "Failed to ask question",
      },
    );

    setLoading(false);
  };

  const handleSaveAnswer = async () => {
    setIsAnswerSaved(true);
    if (!question || !answer || isAnswerSaved) return;
    setLoading(true);
    toast.promise(
      async () =>
        await saveAnswer({
          questionAsked: question,
          answer,
          projectId: repoId,
          fileReferences: fileReferences,
        }),
      {
        loading: "Saving your answer...",
        success: "Answer saved successfully",
        error: "Error saving your answer",
      },
    );
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex !h-full max-h-[80vh] w-full max-w-[70vw] flex-col gap-2">
          <DialogHeader>
            <DialogTitle>
              <div className="flex h-10 w-full items-center gap-2">
                <Button
                  variant={"outline"}
                  className="ml-auto w-fit"
                  disabled={loading || isAnswerSaved}
                  type="button"
                  onClick={handleSaveAnswer}
                >
                  Save Answer
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <MDEditor.Markdown
            source={answer}
            className="h-full w-full overflow-y-scroll bg-background text-foreground"
          />
          <div className="h-4"></div>
          <CodeReferences fileReferences={fileReferences} />
          <Button disabled={loading} onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
      <Card className="relative w-full">
        <CardHeader>
          <CardTitle>Ask a question</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Ask a question..."
            value={question}
            className="resize-none"
            rows={4}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="h-4"></div>
          <Button
            onClick={handleAskQuestion}
            disabled={!question.trim() || loading}
          >
            <Loader2
              className={cn({ "inline-flex animate-spin": loading }, "hidden")}
            />
            Ask RepoInsight
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
