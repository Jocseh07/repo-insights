import OpenAI from "openai";
import { getUserId } from "../helpers";
import { getToken } from "../user/getToken";

const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";

export async function askQuestionStream({
  question,
  context,
}: {
  question: string;
  context: string;
}) {
  const userId = await getUserId();
  const token = await getToken({ userId });
  if (!token) {
    throw new Error("No token found");
  }
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const stream = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
            You are an ai code assistant who answers questions about the codebase. Your target audience is a technical intern who is looking to understand the codebase.
          AI assistant is a brand new, powerful, human-like artificial intelligence. The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
          AI is a well-behaved and well-mannered individual. AI is always friendly, kind and inspiring, and he is eager to provide vivid and thoughtful responses to the user
          AI has the sum of all knowledge in their brain and is able to accurately answer nearly any question about any topic in the conversation.
          If the question is asking about code or a specific file, AI will provide the detailed answer, giving a step by step instructions, including code snippets.
          START OF CONTEXT BLOCK
          ${context}
          END OF CONTEXT BLOCK

          AI assistant will take into account the CONTEXT BLOCK that is provided in a conversation. If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, I don't have the answer to that question."
          AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
          AI assistant will not invent anything that is not drawn directly from the context.
          Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering, make sure there is no ambiguity.
            `,
      },
      {
        role: "user",
        content: `
        START QUESTION
        ${question}
        END QUESTION
        `,
      },
    ],
    model: modelName,
    stream: true,
  });

  return stream;
}
