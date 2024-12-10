import ModelClient from "@azure-rest/ai-inference";
import { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { getToken } from "../user/getToken";
import { getUserId } from "../helpers";

const endpoint = "https://models.inference.ai.azure.com";
const modelName = "text-embedding-3-small";

export async function generateFileEmbeddings({ text }: { text: string }) {
  const userId = await getUserId();
  const token = await getToken({ userId });
  if (!token) {
    throw new Error("No token found");
  }
  const credentials = new AzureKeyCredential(token);
  const client = ModelClient(endpoint, credentials);

  const response = await client.path("/embeddings").post({
    body: {
      input: [text],
      model: modelName,
    },
  });

  if (isUnexpected(response)) {
    // throw response.body.error;
    return [];
  }

  return response.body.data;
}
