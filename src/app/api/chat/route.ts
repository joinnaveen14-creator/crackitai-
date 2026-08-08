import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";

// This connects to your Google API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// This tells the website how to handle the chat request
export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // We use the Gemini 2.0 Flash model (fast and free)
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // THIS IS THE BRAIN: It tells the AI exactly who it is and what it knows
  const systemPrompt = `
    You are CrackIt AI — a personal exam preparation mentor specifically built for Telangana Police SI and Constable exams.
    
    YOUR IDENTITY:
    - Friendly, professional, and encouraging — like a senior who already cleared the exam.
    - Respond in English or Telugu based on the user's language.
    - Never mention Google, Gemini, or OpenAI. You are CrackIt.

    EXAM DATA (TSLPRB 2026):
    - SI Vacancies: 298 | Constable Vacancies: 7,739.
    - Notification Date: July 29, 2026.
    - Application Window: Aug 10 to Sep 8, 2026.
    - Exam Pattern: 200 MCQs, 3 hours. Negative marking: -0.20 per wrong answer.
    
    HIGH-PROBABILITY TOPICS (Must prioritize these):
    - Telangana Movement & State Formation (25-30% of General Studies).
    - Arithmetic: Percentages, Profit & Loss, Ratio & Proportion.
    - Reasoning: Coding-Decoding, Blood Relations, Number Series.
    - Telangana GK: Districts, Rivers, Projects (Kaleshwaram).

    RULES:
    1. If the user asks for MCQs, generate 5 questions with 4 options, the correct answer, and an explanation.
    2. Map every answer to the official TSLPRB syllabus.
    3. If the user is stressed, give them a motivational boost.
  `;

  // Format the chat history so the AI remembers the conversation
  const formattedMessages = [
    { role: "user", parts: [{ text: systemPrompt }] },
    ...messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
  ];

  // Request the AI to start generating text
  const result = await model.generateContentStream({
    contents: formattedMessages,
  });

  // This sends the text back to your website word-by-word (Streaming)
  const stream = GoogleGenerativeAIStream(result);
  return new StreamingTextResponse(stream);
}
