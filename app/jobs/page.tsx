"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Briefcase, Search, MapPin, DollarSign, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [filteredJobs, setFilteredJobs] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [matchFilter, setMatchFilter] = useState("all")

  useEffect(() => {
    // Mock job data - in real app, this would come from job APIs
    const mockJobs = [
      {
        id: 1,
        title: "Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$80,000 - $120,000",
        posted: "2 days ago",
        match: 94,
        description:
          "We're looking for a passionate Frontend Developer to join our team and build amazing user experiences.",
        requirements: ["React", "JavaScript", "TypeScript", "CSS", "Git"],
        benefits: ["Health Insurance", "401k", "Remote Work", "Flexible Hours"],
        url: "#",
      },
      {
        id: 2,
        title: "Data Analyst",
        company: "DataFlow Solutions",
        location: "Remote",
        type: "Full-time",
        salary: "$65,000 - $90,000",
        posted: "1 day ago",
        match: 89,
        description:
          "Join our data team to analyze complex datasets and provide actionable insights for business decisions.",
        requirements: ["SQL", "Python", "Tableau", "Statistics", "Excel"],
        benefits: ["Remote Work", "Health Insurance", "Learning Budget", "Stock Options"],
        url: "#",
      },
      {
        id: 3,
        title: "Junior Software Engineer",
        company: "StartupXYZ",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$70,000 - $95,000",
        posted: "3 days ago",
        match: 87,
        description: "Great opportunity for a junior developer to grow with our fast-paced startup environment.",
        requirements: ["JavaScript", "Node.js", "React", "MongoDB", "Git"],
        benefits: ["Equity", "Health Insurance", "Flexible PTO", "Learning Budget"],
        url: "#",
      },
      {
        id: 4,
        title: "Machine Learning Intern",
        company: "AI Innovations",
        location: "Seattle, WA",
        type: "Internship",
        salary: "$25 - $35/hour",
        posted: "5 days ago",
        match: 76,
        description: "Internship opportunity to work on cutting-edge ML projects with experienced data scientists.",
        requirements: ["Python", "TensorFlow", "Statistics", "Pandas", "Jupyter"],
        benefits: ["Mentorship", "Learning Opportunities", "Networking", "Potential Full-time"],
        url: "#",
      },
      {
        id: 5,
        title: "UX Designer",
        company: "Design Studio Pro",
        location: "New York, NY",
        type: "Contract",
        salary: "$60 - $80/hour",
        posted: "1 week ago",
        match: 72,
        description: "Contract position for an experienced UX designer to work on mobile app redesign project.",
        requirements: ["Figma", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
        benefits: ["Flexible Schedule", "Remote Options", "Portfolio Building", "Networking"],
        url: "#",
      },
      {
        id: 6,
        title: "DevOps Engineer",
        company: "CloudTech Systems",
        location: "Chicago, IL",
        type: "Full-time",
        salary: "$90,000 - $130,000",
        posted: "4 days ago",
        match: 68,
        description:
          "Looking for a DevOps engineer to help scale our cloud infrastructure and improve deployment processes.",
        requirements: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
        benefits: ["Health Insurance", "401k", "Remote Work", "Conference Budget"],
        url: "#",
      },
    ]
    setJobs(mockJobs)
    setFilteredJobs(mockJobs)
  }, [])

  useEffect(() => {
    let filtered = jobs

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requirements.some((req: string) => req.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    // Match filter
    if (matchFilter !== "all") {
      const minMatch = Number.parseInt(matchFilter)
      filtered = filtered.filter((job) => job.match >= minMatch)
    }

    setFilteredJobs(filtered)
  }, [searchTerm, locationFilter, matchFilter, jobs])

  const getMatchColor = (match: number) => {
    if (match >= 90) return "text-green-600"
    if (match >= 80) return "text-blue-600"
    if (match >= 70) return "text-orange-600"
    return "text-gray-600"
  }

  const getMatchBgColor = (match: number) => {
    if (match >= 90) return "bg-green-100"
    if (match >= 80) return "bg-blue-100"
    if (match >= 70) return "bg-orange-100"
    return "bg-gray-100"
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
              <Briefcase className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">Job Matching</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Matched Job Listings</h1>
          <p className="text-gray-600">Jobs ranked by compatibility with your skills and career goals</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                </SelectContent>
              </Select>
              <Select value={matchFilter} onValueChange={setMatchFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Match Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Matches</SelectItem>
                  <SelectItem value="90">90%+ Match</SelectItem>
                  <SelectItem value="80">80%+ Match</SelectItem>
                  <SelectItem value="70">70%+ Match</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-600 flex items-center">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <Badge
                        variant="secondary"
                        className={`${getMatchBgColor(job.match)} ${getMatchColor(job.match)} border-0`}
                      >
                        {job.match}% match
                      </Badge>
                    </div>
                    <p className="text-lg text-gray-700 font-medium mb-1">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.posted}</span>
                      </div>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <Progress value={job.match} className="w-24 mb-2" />
                    <p className={`text-sm font-medium ${getMatchColor(job.match)}`}>{job.match}% Match</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{job.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <Button>
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline">Save Job</Button>
                  </div>
                  <Link href="/interview">
                    <Button variant="ghost" size="sm">
                      Practice Interview
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
