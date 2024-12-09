"use server";

import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "@/env";
import { generateCodeEmbeddings } from "../gemini/gemini";
import { and, cosineDistance, desc, eq, gt, sql } from "drizzle-orm";
import { question, sourceCodeEmbedding } from "@/server/db/schema";
import { db } from "@/server/db";
import { streamTextPrompt } from "@/data/prompts";
import { getUserId } from "../helpers";

const google = createGoogleGenerativeAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function askQuestion({
  question,
  repoId,
}: {
  question: string;
  repoId: number;
}) {
  const stream = createStreamableValue();
  const embedding = await generateCodeEmbeddings({ text: question });
  // const vectorQuery = `[${queryVector.join(",")}]`;
  const similarity = sql<number>`1 - (${cosineDistance(sourceCodeEmbedding.summaryEmbedding, embedding)})`;

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
  await (async () => {
    const { textStream } = streamText({
      model: google("gemini-1.5-flash"),
      prompt: streamTextPrompt({
        context,
        question,
      }),
    });
    for await (const delta of textStream) {
      stream.update(delta);
    }
    stream.done();
  })();

  return {
    output: stream.value,
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
