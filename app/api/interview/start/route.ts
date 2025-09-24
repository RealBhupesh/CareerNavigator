import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json()

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an experienced technical interviewer conducting a mock interview for a ${role} position. Your goal is to help the candidate practice and improve their interview skills.

Start the interview with a warm greeting and the first question. The first question should be a general "tell me about yourself" or similar opening question.

Keep your tone professional but friendly. Make the candidate feel comfortable while maintaining the structure of a real interview.`,
      prompt: `Start a mock interview for a ${role} position. Begin with an appropriate opening question.`,
    })

    return NextResponse.json({ question: text })
  } catch (error) {
    console.error("Interview start error:", error)
    return NextResponse.json({ error: "Failed to start interview" }, { status: 500 })
  }
}
