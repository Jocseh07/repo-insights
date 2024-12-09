"use server";

import { db } from "@/server/db";
import { question } from "@/server/db/schema";
import { type FileReferences } from "@/types/types";
import { getUserId } from "../helpers";

export const saveAnswer = async ({
  questionAsked,
  answer,
  projectId,
  fileReferences,
}: {
  questionAsked: string;
  answer: string;
  projectId: number;
  fileReferences: FileReferences;
}) => {
  const userId = await getUserId();
  await db.insert(question).values({
    question: questionAsked,
    answer,
    projectId,
    fileReferences,
    userId,
  });
};
