"use server";

import { db } from "@/server/db";
import { Project, sourceCodeEmbedding } from "@/server/db/schema";

export const insertSourceCodeEmbedding = async ({
  allEmbeddings,
  project,
}: {
  allEmbeddings: {
    summary: string;
    embedding: number[];
    sourceCode: string;
    filename: string;
  }[];
  project: Project;
}) => {
  await Promise.allSettled(
    allEmbeddings.map(async (embedding) => {
      if (!embedding) return;
      await db
        .insert(sourceCodeEmbedding)
        .values({
          projectId: project.repoId,
          sourceCode: embedding.sourceCode,
          fileName: embedding.filename,
          summary: embedding.summary,
          summaryEmbedding: embedding.embedding,
        })
        .returning();
    }),
  );
};
