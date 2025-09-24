"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MessageSquare, Send, Loader2, Play, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function InterviewPage() {
  const [selectedRole, setSelectedRole] = useState("")
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [interviewComplete, setInterviewComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const roles = [
    "Software Developer",
    "Data Analyst",
    "Machine Learning Engineer",
    "UX Designer",
    "Product Manager",
    "DevOps Engineer",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startInterview = async () => {
    if (!selectedRole) return

    setInterviewStarted(true)
    setIsLoading(true)

    try {
      const response = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      })

      const data = await response.json()
      setMessages([
        {
          type: "bot",
          content: data.question,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("Failed to start interview:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async () => {
    if (!currentAnswer.trim()) return

    const userMessage = {
      type: "user",
      content: currentAnswer,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentAnswer("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/interview/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: selectedRole,
          answer: currentAnswer,
          questionNumber: currentQuestion + 1,
          conversationHistory: messages,
        }),
      })

      const data = await response.json()

      const botMessage = {
        type: "bot",
        content: data.response,
        feedback: data.feedback,
        nextQuestion: data.nextQuestion,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      if (data.isComplete) {
        setInterviewComplete(true)
      } else {
        setCurrentQuestion((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Failed to submit answer:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetInterview = () => {
    setInterviewStarted(false)
    setMessages([])
    setCurrentAnswer("")
    setCurrentQuestion(0)
    setInterviewComplete(false)
    setSelectedRole("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-red-600" />
              <span className="text-xl font-bold text-gray-900">Mock Interview</span>
            </div>
          </div>
          {interviewStarted && (
            <Button variant="outline" onClick={resetInterview}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Interview
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!interviewStarted ? (
          // Setup Screen
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Interview Practice</h1>
              <p className="text-gray-600">Practice with our AI interviewer to improve your interview skills</p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Choose Your Role</CardTitle>
                <CardDescription>Select the role you want to practice interviewing for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role to practice" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">What to Expect:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 5-7 interview questions tailored to your chosen role</li>
                    <li>• Mix of technical and behavioral questions</li>
                    <li>• Real-time feedback on your responses</li>
                    <li>• Suggestions for improvement</li>
                  </ul>
                </div>

                <Button onClick={startInterview} disabled={!selectedRole || isLoading} className="w-full" size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Starting Interview...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Mock Interview
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Interview Screen
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedRole} Interview</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of 5</p>
              </div>
              <Badge variant="secondary">{interviewComplete ? "Complete" : "In Progress"}</Badge>
            </div>

            {/* Chat Interface */}
            <Card className="h-[500px] flex flex-col">
              <CardContent className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        {message.feedback && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-semibold text-green-700 mb-1">Feedback:</p>
                            <p className="text-sm text-gray-700">{message.feedback}</p>
                          </div>
                        )}
                        {message.nextQuestion && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-semibold text-blue-700 mb-1">Next Question:</p>
                            <p className="text-sm text-gray-700">{message.nextQuestion}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </CardContent>

              {!interviewComplete && (
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Type your answer here..."
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      className="flex-1 min-h-[80px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.ctrlKey) {
                          submitAnswer()
                        }
                      }}
                    />
                    <Button onClick={submitAnswer} disabled={!currentAnswer.trim() || isLoading} className="self-end">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Press Ctrl+Enter to send</p>
                </div>
              )}
            </Card>

            {interviewComplete && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Interview Complete!</CardTitle>
                  <CardDescription>Great job! Here are some next steps to continue your preparation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button onClick={resetInterview} className="w-full">
                      Practice Another Interview
                    </Button>
                    <Link href="/jobs">
                      <Button variant="outline" className="w-full bg-transparent">
                        Browse Job Opportunities
                      </Button>
                    </Link>
                    <Link href="/resources">
                      <Button variant="outline" className="w-full bg-transparent">
                        Find Learning Resources
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
