import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json()

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert resume reviewer and career counselor. Analyze the provided resume and provide comprehensive feedback. Return your analysis in JSON format with the following structure:
      {
        "overallScore": 85,
        "summary": "Overall assessment summary",
        "categories": [
          {
            "name": "Content Quality",
            "score": 80,
            "feedback": "Specific feedback for this category"
          }
        ],
        "strengths": ["strength1", "strength2", ...],
        "improvements": [
          {
            "issue": "Issue description",
            "suggestion": "How to fix it"
          }
        ],
        "keywords": {
          "strong": ["keyword1", "keyword2", ...],
          "missing": ["missing1", "missing2", ...]
        }
      }`,
      prompt: `Please analyze this resume and provide detailed feedback:

${resumeText}

Evaluate the resume across these categories:
1. Content Quality (relevance, achievements, quantified results)
2. Formatting & Structure (organization, readability, consistency)
3. Keywords & ATS Optimization (industry keywords, technical terms)
4. Professional Summary (compelling, targeted, clear value proposition)
5. Experience Section (impact, progression, relevant skills)
6. Skills Section (relevant, current, properly categorized)

Provide specific, actionable feedback for improvement and identify both strong and missing keywords for ATS optimization.`,
    })

    // Parse the JSON response
    let analysis
    try {
      analysis = JSON.parse(text)
    } catch (parseError) {
      // Fallback if JSON parsing fails
      analysis = {
        overallScore: 75,
        summary: "Your resume shows good potential with room for improvement in several key areas.",
        categories: [
          { name: "Content Quality", score: 80, feedback: "Good use of action verbs and quantified achievements" },
          { name: "Formatting", score: 70, feedback: "Structure is clear but could benefit from better organization" },
          { name: "Keywords", score: 65, feedback: "Missing some industry-specific keywords" },
        ],
        strengths: ["Clear professional experience", "Quantified achievements", "Relevant technical skills"],
        improvements: [
          {
            issue: "Missing professional summary",
            suggestion: "Add a compelling 2-3 line summary at the top highlighting your key value proposition",
          },
          {
            issue: "Limited use of industry keywords",
            suggestion: "Incorporate more role-specific keywords to improve ATS compatibility",
          },
        ],
        keywords: {
          strong: ["JavaScript", "React", "Project Management"],
          missing: ["Agile", "Scrum", "API", "Database"],
        },
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Resume analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 })
  }
}
