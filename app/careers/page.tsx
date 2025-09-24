"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Target, TrendingUp, DollarSign, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function CareersPage() {
  const [careerPaths, setCareerPaths] = useState<any[]>([])
  const [selectedCareer, setSelectedCareer] = useState<any>(null)

  useEffect(() => {
    // Mock career data - in real app, this would come from API
    const mockCareers = [
      {
        id: 1,
        title: "Software Developer",
        match: 92,
        description: "Build and maintain software applications using various programming languages and frameworks",
        skills: ["JavaScript", "React", "Node.js", "Python", "Git"],
        salary: "$70,000 - $120,000",
        growth: "22% (Much faster than average)",
        timeToRole: "6-12 months",
        locations: ["Remote", "San Francisco", "New York", "Austin"],
        requirements: [
          "Bachelor's degree in Computer Science or related field",
          "Proficiency in at least one programming language",
          "Understanding of software development lifecycle",
          "Problem-solving and analytical skills",
        ],
        nextSteps: [
          "Complete a full-stack development course",
          "Build 3-5 portfolio projects",
          "Learn version control (Git)",
          "Practice coding interviews",
        ],
      },
      {
        id: 2,
        title: "Data Analyst",
        match: 87,
        description: "Analyze complex data to help organizations make informed business decisions",
        skills: ["SQL", "Python", "Excel", "Tableau", "Statistics"],
        salary: "$60,000 - $95,000",
        growth: "25% (Much faster than average)",
        timeToRole: "4-8 months",
        locations: ["Remote", "Chicago", "Seattle", "Boston"],
        requirements: [
          "Bachelor's degree in Statistics, Mathematics, or related field",
          "Proficiency in SQL and data visualization tools",
          "Strong analytical and critical thinking skills",
          "Experience with statistical analysis",
        ],
        nextSteps: [
          "Learn SQL and database management",
          "Master data visualization tools (Tableau/Power BI)",
          "Complete statistics and analytics courses",
          "Build data analysis portfolio",
        ],
      },
      {
        id: 3,
        title: "Machine Learning Engineer",
        match: 78,
        description: "Design and implement machine learning systems and algorithms",
        skills: ["Python", "TensorFlow", "PyTorch", "Statistics", "AWS"],
        salary: "$90,000 - $150,000",
        growth: "22% (Much faster than average)",
        timeToRole: "12-18 months",
        locations: ["San Francisco", "Seattle", "New York", "Remote"],
        requirements: [
          "Master's degree in Computer Science, Statistics, or related field",
          "Strong programming skills in Python or R",
          "Understanding of machine learning algorithms",
          "Experience with ML frameworks and cloud platforms",
        ],
        nextSteps: [
          "Complete machine learning specialization",
          "Learn deep learning frameworks",
          "Build ML projects and deploy models",
          "Gain experience with cloud ML services",
        ],
      },
      {
        id: 4,
        title: "UX Designer",
        match: 71,
        description: "Design user-centered digital experiences and interfaces",
        skills: ["Figma", "User Research", "Prototyping", "Design Systems", "HTML/CSS"],
        salary: "$65,000 - $110,000",
        growth: "13% (Faster than average)",
        timeToRole: "8-12 months",
        locations: ["Remote", "San Francisco", "New York", "Los Angeles"],
        requirements: [
          "Bachelor's degree in Design, Psychology, or related field",
          "Portfolio demonstrating UX design process",
          "Proficiency in design tools (Figma, Sketch, Adobe)",
          "Understanding of user research methods",
        ],
        nextSteps: [
          "Build a strong UX portfolio",
          "Learn user research methodologies",
          "Master design tools and prototyping",
          "Complete UX design bootcamp or courses",
        ],
      },
    ]
    setCareerPaths(mockCareers)
  }, [])

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
              <Target className="w-6 h-6 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Career Paths</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Career Paths</h1>
          <p className="text-gray-600">
            Based on your skills and interests, here are the career paths that match your profile
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Career List */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {careerPaths.map((career) => (
                <Card
                  key={career.id}
                  className={`cursor-pointer transition-all ${
                    selectedCareer?.id === career.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedCareer(career)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{career.title}</h3>
                      <Badge variant="secondary" className="text-green-600">
                        {career.match}% match
                      </Badge>
                    </div>
                    <Progress value={career.match} className="mb-2" />
                    <p className="text-sm text-gray-600 line-clamp-2">{career.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Career Details */}
          <div className="lg:col-span-2">
            {selectedCareer ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{selectedCareer.title}</CardTitle>
                        <CardDescription className="text-base mt-2">{selectedCareer.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1 text-green-600">
                        {selectedCareer.match}% match
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                      <p className="font-semibold">{selectedCareer.salary}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Job Growth</p>
                      <p className="font-semibold">{selectedCareer.growth}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Time to Role</p>
                      <p className="font-semibold">{selectedCareer.timeToRole}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Top Locations</p>
                      <p className="font-semibold">{selectedCareer.locations[0]}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Skills & Requirements */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Required Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedCareer.locations.map((location: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{location}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Requirements & Next Steps */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedCareer.requirements.map((req: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedCareer.nextSteps.map((step: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/resources">
                    <Button>Find Learning Resources</Button>
                  </Link>
                  <Link href="/jobs">
                    <Button variant="outline">Browse Jobs</Button>
                  </Link>
                  <Link href="/interview">
                    <Button variant="outline">Practice Interview</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Career Path</h3>
                  <p className="text-gray-600">
                    Choose a career from the list to see detailed information and next steps
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
