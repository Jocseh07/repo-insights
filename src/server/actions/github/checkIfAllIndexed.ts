"use server";

import { db } from "@/server/db";
import { Project, sourceCodeEmbedding } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const checkIfAllIndexed = async ({
  project,
  filesCount,
}: {
  project: Project;
  filesCount: number;
}) => {
  const filesWithEmbedding = await db
    .select()
    .from(sourceCodeEmbedding)
    .where(eq(sourceCodeEmbedding.projectId, project.repoId));
  const filesWithEmbeddingCount = filesWithEmbedding.length;
  return filesCount === filesWithEmbeddingCount;
};
