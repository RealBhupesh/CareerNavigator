import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { role, answer, questionNumber, conversationHistory } = await request.json()

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an experienced technical interviewer for a ${role} position. You are conducting question ${questionNumber} of a 5-question mock interview.

Analyze the candidate's answer and provide:
1. Brief constructive feedback on their response
2. The next interview question (if not the final question)
3. If this is question 5, provide overall interview feedback and mark as complete

Return your response in JSON format:
{
  "response": "Your acknowledgment and transition",
  "feedback": "Constructive feedback on their answer",
  "nextQuestion": "Next question (if applicable)",
  "isComplete": false/true
}

For ${role} interviews, include a mix of:
- Technical questions relevant to the role
- Behavioral questions (STAR method scenarios)
- Problem-solving questions
- Questions about experience and projects

Keep feedback constructive and encouraging while being honest about areas for improvement.`,
      prompt: `The candidate just answered: "${answer}"

This is question ${questionNumber} of 5 for a ${role} interview.

Previous conversation context:
${conversationHistory.map((msg: any) => `${msg.type}: ${msg.content}`).join("\n")}

Provide feedback and the next question, or conclude if this was the final question.`,
    })

    let response
    try {
      response = JSON.parse(text)
    } catch (parseError) {
      // Fallback response
      response = {
        response: "Thank you for your answer. Let me provide some feedback.",
        feedback: "Good response. Consider providing more specific examples to strengthen your answer.",
        nextQuestion:
          questionNumber < 5
            ? "Can you tell me about a challenging project you worked on and how you overcame the obstacles?"
            : null,
        isComplete: questionNumber >= 5,
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Interview response error:", error)
    return NextResponse.json({ error: "Failed to process interview response" }, { status: 500 })
  }
}
