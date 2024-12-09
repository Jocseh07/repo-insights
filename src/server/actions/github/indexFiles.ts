"use server";

import { type Project } from "@/server/db/schema";
import { generateEmbeddings } from "@/server/actions/github/generateEmbeddings";
import { insertSourceCodeEmbedding } from "@/server/actions/github/insertSourceCodeEmbedding";
import { type Document } from "@langchain/core/documents";

export const indexFiles = async ({
  docs,
  project,
}: {
  docs: Document[];
  project: Project;
}) => {
  try {
    const allEmbeddings = await generateEmbeddings({
      docs,
    });
    await insertSourceCodeEmbedding({
      allEmbeddings,
      project,
    });
    return true;
  } catch (error) {
    throw error;
  }
};
