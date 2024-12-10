"use server";
import { type Document } from "@langchain/core/documents";
import { summarizeFile } from "../models/summarizeFile";
import { generateFileEmbeddings } from "../models/generateFileEmbeddings";

export const generateEmbeddings = async ({ docs }: { docs: Document[] }) => {
  return await Promise.all(
    docs.map(async (doc) => {
      const summary = await summarizeFile({ doc });
      const embedding = await generateFileEmbeddings({ text: summary });
      return {
        summary,
        embedding: embedding,
        sourceCode: doc.pageContent,
        filename: doc.metadata.source as string,
      };
    }),
  );
};
