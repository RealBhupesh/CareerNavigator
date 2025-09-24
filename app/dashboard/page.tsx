import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Target, BookOpen, Briefcase, FileText, MessageSquare, TrendingUp, Users, Award } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const quickStats = [
    { label: "Profile Completion", value: 75, icon: Users },
    { label: "Skill Match Rate", value: 82, icon: TrendingUp },
    { label: "Certifications", value: 3, icon: Award },
  ]

  const recentActivity = [
    { action: "Completed skill analysis", time: "2 hours ago", type: "analysis" },
    { action: "Applied to Software Developer role", time: "1 day ago", type: "application" },
    { action: "Completed React course", time: "3 days ago", type: "learning" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CareerAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Free Plan</Badge>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-600">{"Let's continue building your career path"}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">
                    {typeof stat.value === "number" && stat.label.includes("Rate") ? `${stat.value}%` : stat.value}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                {typeof stat.value === "number" && stat.value <= 100 && (
                  <Progress value={stat.value} className="mt-2" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Features */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Career Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/profile">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                    </div>
                    <CardTitle>Skill Analysis</CardTitle>
                    <CardDescription>Analyze your resume and skills with AI-powered insights</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/careers">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <CardTitle>Career Paths</CardTitle>
                    <CardDescription>Discover personalized career recommendations</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/jobs">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                    </div>
                    <CardTitle>Job Matching</CardTitle>
                    <CardDescription>Find jobs with AI-calculated match percentages</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/resume">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                      <FileText className="w-5 h-5 text-orange-600" />
                    </div>
                    <CardTitle>Resume Optimizer</CardTitle>
                    <CardDescription>Get AI-powered feedback to improve your resume</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/interview">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                      <MessageSquare className="w-5 h-5 text-red-600" />
                    </div>
                    <CardTitle>Mock Interview</CardTitle>
                    <CardDescription>Practice interviews with our AI chatbot</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/resources">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <CardTitle>Learning Resources</CardTitle>
                    <CardDescription>Personalized upskilling recommendations</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Complete skill assessment
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Update resume
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Practice interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
