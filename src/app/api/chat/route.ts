import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  const { messages } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const systemPrompt = "You are CrackIt AI, a senior mentor for Telangana Police SI/Constable exams. Respond in English or Telugu. Focus on TSLPRB patterns and Telangana Movement. Be encouraging.";

  const promptMessages = [
    { role: "user", parts: [{ text: systemPrompt }] },
    ...messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
  ];

  const result = await model.generateContentStream({ contents: promptMessages });
  const stream = GoogleGenerativeAIStream(result);
  return new StreamingTextResponse(stream);
}
