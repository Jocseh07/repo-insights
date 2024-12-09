"use server";
import { generateCodeEmbeddings, summarizeCode } from "../gemini/gemini";
import { Document } from "@langchain/core/documents";

export const generateEmbeddings = async ({ docs }: { docs: Document[] }) => {
  return await Promise.all(
    docs.map(async (doc) => {
      const summary = await summarizeCode({ doc });
      const embedding = await generateCodeEmbeddings({ text: summary });
      return {
        summary,
        embedding,
        sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
        filename: doc.metadata.source,
      };
    }),
  );
};
