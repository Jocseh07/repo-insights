"use server";

import { db } from "@/server/db";
import { type Project, sourceCodeEmbedding } from "@/server/db/schema";
import type { EmbeddingItemOutput } from "@azure-rest/ai-inference";

export const insertSourceCodeEmbedding = async ({
  allEmbeddings,
  project,
}: {
  allEmbeddings: {
    summary: string;
    embedding: EmbeddingItemOutput[];
    sourceCode: string;
    filename: string;
  }[];
  project: Project;
}) => {
  await Promise.allSettled(
    allEmbeddings.map(async (embedding) => {
      if (!embedding) return;
      let summaryEmbedding: number[] = [];
      if (embedding.embedding.length > 0) {
        summaryEmbedding = embedding.embedding[0]?.embedding as number[];
      }

      await db
        .insert(sourceCodeEmbedding)
        .values({
          projectId: project.repoId,
          sourceCode: embedding.sourceCode,
          fileName: embedding.filename,
          summary: embedding.summary,
          summaryEmbedding,
        })
        .returning();
    }),
  );
};
