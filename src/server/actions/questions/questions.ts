"use server";

import { and, cosineDistance, desc, eq, gt, sql } from "drizzle-orm";
import { question, sourceCodeEmbedding } from "@/server/db/schema";
import { db } from "@/server/db";
import { getUserId } from "../helpers";
import { generateFileEmbeddings } from "../models/generateFileEmbeddings";
import { askQuestionStream } from "../models/askQuestion";

export async function askQuestion({
  question,
  repoId,
}: {
  question: string;
  repoId: number;
}) {
  const embedding = await generateFileEmbeddings({ text: question });
  const embeddingVector = embedding[0]?.embedding;
  if (!embeddingVector) {
    throw new Error("No embedding found");
  }
  // const vectorQuery = `[${queryVector.join(",")}]`;
  const similarity = sql<number>`1 - (${cosineDistance(sourceCodeEmbedding.summaryEmbedding, embeddingVector)})`;

  // const similar = await db.query.sourceCodeEmbedding.findMany({
  //   where: (table, { eq, gt, and }) =>
  //     and(gt(similarity, 0.5), eq(table.projectId, projectId)),
  //   limit: 4,
  //   orderBy: desc(similarity),
  //   columns: {
  //     id: true,
  //     sourceCode: true,
  //     summary: true,
  //   },
  // });

  const result = await db
    .select({
      sourceCode: sourceCodeEmbedding.sourceCode,
      filename: sourceCodeEmbedding.fileName,
      summary: sourceCodeEmbedding.summary,
      similarity,
    })
    .from(sourceCodeEmbedding)
    .where(and(gt(similarity, 0.5), eq(sourceCodeEmbedding.projectId, repoId)))
    .orderBy((t) => desc(t.similarity))
    .limit(4);

  let context = "";

  for (const doc of result) {
    context += `Source: ${doc.filename} \nSource Code: ${doc.sourceCode}\nSummary: ${doc.summary}\nSimilarity: ${doc.similarity}\n\n`;
  }

  console.log(context);
  const stream = await askQuestionStream({
    question,
    context,
  });

  return {
    output: stream,
    fileReferences: result,
  };
}

export async function getUserQuestions() {
  const userId = await getUserId();
  return await db.query.question.findMany({
    where: (table, { eq }) => eq(table.userId, userId),
    orderBy: desc(question.createdAt),
    with: {
      project: true,
    },
  });
}

export async function deleteQuestion(id: string) {
  await db.delete(question).where(eq(question.id, id));
}
