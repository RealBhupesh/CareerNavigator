"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BookOpen, Search, ExternalLink, Star, Clock, Play } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([])
  const [filteredResources, setFilteredResources] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")

  useEffect(() => {
    // Mock resource data - in real app, this would come from APIs
    const mockResources = [
      {
        id: 1,
        title: "Complete Web Development Bootcamp",
        platform: "Udemy",
        category: "Web Development",
        instructor: "Dr. Angela Yu",
        rating: 4.7,
        students: 850000,
        duration: "65 hours",
        price: "$89.99",
        level: "Beginner to Advanced",
        description: "Learn HTML, CSS, JavaScript, Node.js, React, MongoDB and more in this comprehensive bootcamp.",
        skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
        url: "https://udemy.com",
        match: 95,
      },
      {
        id: 2,
        title: "Machine Learning Specialization",
        platform: "Coursera",
        category: "Machine Learning",
        instructor: "Andrew Ng",
        rating: 4.9,
        students: 500000,
        duration: "3 months",
        price: "$49/month",
        level: "Intermediate",
        description: "Master machine learning fundamentals and build real-world ML systems.",
        skills: ["Python", "TensorFlow", "Scikit-learn", "Neural Networks", "Deep Learning"],
        url: "https://coursera.org",
        match: 92,
      },
      {
        id: 3,
        title: "Data Analysis with Python",
        platform: "freeCodeCamp",
        category: "Data Science",
        instructor: "freeCodeCamp",
        rating: 4.6,
        students: 200000,
        duration: "300 hours",
        price: "Free",
        level: "Beginner to Intermediate",
        description: "Learn data analysis using Python, Pandas, NumPy, and Matplotlib.",
        skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Data Visualization"],
        url: "https://freecodecamp.org",
        match: 89,
      },
      {
        id: 4,
        title: "React - The Complete Guide",
        platform: "Udemy",
        category: "Frontend Development",
        instructor: "Maximilian Schwarzmüller",
        rating: 4.6,
        students: 600000,
        duration: "48 hours",
        price: "$94.99",
        level: "Beginner to Advanced",
        description: "Dive deep into React.js and learn how to build amazing web applications.",
        skills: ["React", "JavaScript", "Redux", "Hooks", "Context API"],
        url: "https://udemy.com",
        match: 87,
      },
      {
        id: 5,
        title: "UX Design Fundamentals",
        platform: "YouTube",
        category: "UX Design",
        instructor: "AJ&Smart",
        rating: 4.5,
        students: 150000,
        duration: "12 hours",
        price: "Free",
        level: "Beginner",
        description: "Learn the fundamentals of user experience design and design thinking.",
        skills: ["Design Thinking", "User Research", "Prototyping", "Figma", "Wireframing"],
        url: "https://youtube.com",
        match: 84,
      },
      {
        id: 6,
        title: "AWS Cloud Practitioner",
        platform: "A Cloud Guru",
        category: "Cloud Computing",
        instructor: "Ryan Kroonenburg",
        rating: 4.4,
        students: 300000,
        duration: "20 hours",
        price: "$39/month",
        level: "Beginner",
        description: "Get started with Amazon Web Services and cloud computing fundamentals.",
        skills: ["AWS", "Cloud Computing", "EC2", "S3", "Lambda"],
        url: "https://acloudguru.com",
        match: 81,
      },
    ]
    setResources(mockResources)
    setFilteredResources(mockResources)
  }, [])

  useEffect(() => {
    let filtered = resources

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((resource) => resource.category.toLowerCase().includes(categoryFilter.toLowerCase()))
    }

    // Platform filter
    if (platformFilter !== "all") {
      filtered = filtered.filter((resource) => resource.platform.toLowerCase() === platformFilter.toLowerCase())
    }

    setFilteredResources(filtered)
  }, [searchTerm, categoryFilter, platformFilter, resources])

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      Udemy: "bg-purple-100 text-purple-700",
      Coursera: "bg-blue-100 text-blue-700",
      freeCodeCamp: "bg-green-100 text-green-700",
      YouTube: "bg-red-100 text-red-700",
      "A Cloud Guru": "bg-orange-100 text-orange-700",
    }
    return colors[platform] || "bg-gray-100 text-gray-700"
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
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Learning Resources</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Learning Resources</h1>
          <p className="text-gray-600">Curated courses and tutorials to help you develop the skills you need</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search courses, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="web development">Web Development</SelectItem>
                  <SelectItem value="machine learning">Machine Learning</SelectItem>
                  <SelectItem value="data science">Data Science</SelectItem>
                  <SelectItem value="frontend">Frontend Development</SelectItem>
                  <SelectItem value="ux design">UX Design</SelectItem>
                  <SelectItem value="cloud">Cloud Computing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="udemy">Udemy</SelectItem>
                  <SelectItem value="coursera">Coursera</SelectItem>
                  <SelectItem value="freecodecamp">freeCodeCamp</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="a cloud guru">A Cloud Guru</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-600 flex items-center">{filteredResources.length} resources found</div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getPlatformColor(resource.platform)}>{resource.platform}</Badge>
                      <Badge variant="outline" className="text-green-600">
                        {resource.match}% match
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{resource.title}</h3>
                    <p className="text-gray-600 mb-2">by {resource.instructor}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{resource.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{resource.rating}</span>
                    <span>({resource.students.toLocaleString()} students)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{resource.duration}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Skills you'll learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {resource.skills.slice(0, 4).map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {resource.skills.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{resource.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{resource.price}</span>
                    <div className="text-sm text-gray-600">{resource.level}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm">
                      Start Learning
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}

        {/* Recommended Learning Path */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recommended Learning Path</CardTitle>
            <CardDescription>Based on your profile, here's a suggested sequence for skill development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Foundation Skills</h4>
                  <p className="text-sm text-gray-600">Start with HTML, CSS, and JavaScript fundamentals</p>
                </div>
                <Badge variant="secondary">2-3 months</Badge>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Framework Mastery</h4>
                  <p className="text-sm text-gray-600">Learn React and build portfolio projects</p>
                </div>
                <Badge variant="secondary">2-3 months</Badge>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Backend & Database</h4>
                  <p className="text-sm text-gray-600">Add Node.js and database skills to become full-stack</p>
                </div>
                <Badge variant="secondary">1-2 months</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
