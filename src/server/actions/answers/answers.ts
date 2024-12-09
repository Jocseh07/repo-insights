"use server";

import { db } from "@/server/db";
import { question } from "@/server/db/schema";
import { getUserId } from "../helpers";
import { FileReferences } from "@/types/types";

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
