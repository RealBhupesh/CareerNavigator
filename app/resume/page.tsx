"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, FileText, Upload, Loader2, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      })

      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error("Resume analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle
    if (score >= 60) return AlertCircle
    return XCircle
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
              <FileText className="w-6 h-6 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">Resume Optimizer</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Optimization</h1>
          <p className="text-gray-600">Get AI-powered feedback to make your resume stand out to employers</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>Paste your resume text or upload a file for comprehensive analysis</CardDescription>
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
                  <Textarea
                    placeholder="Or paste your resume content here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[400px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleAnalyze} disabled={isAnalyzing || !resumeText} className="w-full" size="lg">
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Analyze My Resume
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div>
            {analysis ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>Overall Resume Score</span>
                      {(() => {
                        const ScoreIcon = getScoreIcon(analysis.overallScore)
                        return <ScoreIcon className={`w-5 h-5 ${getScoreColor(analysis.overallScore)}`} />
                      })()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex-1">
                        <Progress value={analysis.overallScore} className="h-3" />
                      </div>
                      <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                        {analysis.overallScore}/100
                      </span>
                    </div>
                    <p className="text-gray-600">{analysis.summary}</p>
                  </CardContent>
                </Card>

                {/* Detailed Scores */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analysis.categories?.map((category: any, index: number) => {
                      const ScoreIcon = getScoreIcon(category.score)
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <ScoreIcon className={`w-4 h-4 ${getScoreColor(category.score)}`} />
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <span className={`font-semibold ${getScoreColor(category.score)}`}>
                              {category.score}/100
                            </span>
                          </div>
                          <Progress value={category.score} className="h-2" />
                          <p className="text-sm text-gray-600">{category.feedback}</p>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                {/* Strengths */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.strengths?.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Improvements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600">Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.improvements?.map((improvement: any, index: number) => (
                        <li key={index} className="space-y-1">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">{improvement.issue}</p>
                              <p className="text-sm text-gray-600">{improvement.suggestion}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Keywords */}
                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Strong Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.keywords?.strong?.map((keyword: string, index: number) => (
                            <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-600 mb-2">Missing Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.keywords?.missing?.map((keyword: string, index: number) => (
                            <Badge key={index} variant="outline" className="border-orange-300 text-orange-600">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start">Download Optimized Resume Template</Button>
                      <Link href="/jobs">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Find Matching Jobs
                        </Button>
                      </Link>
                      <Link href="/interview">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Practice Interview Questions
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for Analysis</h3>
                  <p className="text-gray-600">Upload or paste your resume to get detailed optimization feedback</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
