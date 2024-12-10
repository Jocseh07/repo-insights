import OpenAI from "openai";
import { getUserId } from "../helpers";
import { getToken } from "../user/getToken";
import type { Document } from "@langchain/core/documents";

const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";

export async function summarizeFile({ doc }: { doc: Document }) {
  const code = doc.pageContent.slice(0, 10000);
  const filename = doc.metadata.source as string;

  const userId = await getUserId();
  const token = await getToken({ userId });
  if (!token) {
    throw new Error("No token found");
  }
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an intelligent senior software engineer who specializes in onboarding junior software engineers onto projects. You are onboarding a junior software engineer and explaining to them the purpose of the file Give a summary of no more than 100 words of the code above`,
      },
      {
        role: "user",
        content: `File: ${filename}\n\nCode: ${code}`,
      },
    ],
    temperature: 1.0,
    top_p: 1.0,
    max_tokens: 1000,
    model: modelName,
  });
  if (!response.choices[0]?.message.content) {
    throw new Error("No response from model");
  }
  return response.choices[0]?.message.content;
}
