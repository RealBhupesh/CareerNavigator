"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Brain, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [resumeText, setResumeText] = useState("")
  const [skills, setSkills] = useState("")
  const [interests, setInterests] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, skills, interests }),
      })

      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
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
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Skill Analysis</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Analysis</h1>
          <p className="text-gray-600">
            Upload your resume and provide information about your skills and interests for AI-powered analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Upload</CardTitle>
                <CardDescription>Paste your resume text or upload a file for analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop your resume or</p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
                <div className="relative">
                  <Label htmlFor="resume-text">Or paste resume text</Label>
                  <Textarea
                    id="resume-text"
                    placeholder="Paste your resume content here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[200px] mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
                <CardDescription>Tell us about your technical skills and career interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="skills">Technical Skills</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., JavaScript, Python, React, Data Analysis..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="interests">Career Interests</Label>
                  <Textarea
                    id="interests"
                    placeholder="Describe your career interests, preferred work environment, and goals..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleAnalyze} disabled={isAnalyzing || !resumeText} className="w-full" size="lg">
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Profile...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze My Profile
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div>
            {analysis ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Analysis Complete</CardTitle>
                    <CardDescription>Here are your personalized insights</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.strengths?.map((strength: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Areas for Improvement</h4>
                      <div className="space-y-2">
                        {analysis.improvements?.map((improvement: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Career Match Score</h4>
                      <div className="space-y-3">
                        {analysis.careerMatches?.map((match: any, index: number) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{match.role}</span>
                              <span className="font-medium">{match.score}%</span>
                            </div>
                            <Progress value={match.score} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Link href="/careers">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Explore Career Paths
                        </Button>
                      </Link>
                      <Link href="/resources">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Find Learning Resources
                        </Button>
                      </Link>
                      <Link href="/jobs">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Browse Matching Jobs
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for Analysis</h3>
                  <p className="text-gray-600">
                    Fill in your information and click analyze to get personalized insights
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
