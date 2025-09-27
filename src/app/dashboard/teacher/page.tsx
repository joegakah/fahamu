
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronRight, Users, TrendingUp, TrendingDown, Target, FileText, User } from "lucide-react"
import { OverallPerformanceChart } from "@/components/dashboard/overall-performance-chart"
import { SubjectBreakdownChart } from "@/components/dashboard/subject-breakdown-chart"

const teacherData = {
    name: "Ms. Adisa",
    subject: "Biology",
    classStats: {
        average: 68,
        systemicWeaknesses: 2,
        interventionCount: 7,
    },
    students: [
        { id: 1, name: "Jane Doe", average: 72, weaknesses: 3, averageTopics: 1, strongholds: 5, trend: "up", topWeakness: { topic: "Cell Structure", score: 45 } },
        { id: 2, name: "John Smith", average: 55, weaknesses: 5, averageTopics: 3, strongholds: 1, trend: "down", topWeakness: { topic: "Genetics", score: 40 } },
        { id: 3, name: "Emily White", average: 88, weaknesses: 0, averageTopics: 2, strongholds: 7, trend: "up", topWeakness: null },
        { id: 4, name: "Michael Brown", average: 65, weaknesses: 2, averageTopics: 4, strongholds: 3, trend: "stable", topWeakness: { topic: "Ecology", score: 58 } },
        { id: 5, name: "Sarah Green", average: 75, weaknesses: 1, averageTopics: 5, strongholds: 3, trend: "up", topWeakness: { topic: "Photosynthesis", score: 62 } },
    ],
    topicPerformance: [
        { topic: "Ecology", classAverage: 48, status: "weakness" },
        { topic: "Photosynthesis", classAverage: 55, status: "weakness" },
        { topic: "Cell Structure", classAverage: 65, status: "average" },
        { topic: "Genetics", classAverage: 72, status: "average" },
        { topic: "Human Anatomy", classAverage: 85, status: "stronghold" },
    ]
}

export default function TeacherDashboard() {
    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle className="text-3xl font-bold">Welcome, {teacherData.name}! ({teacherData.subject})</CardTitle>
                            <CardDescription>Here's your classroom overview for Form 3, Class 3A, Term 2.</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                             <Select defaultValue="form3">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Form" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="form3">Form 3</SelectItem>
                                    <SelectItem value="form4">Form 4</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="class3a">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="class3a">Class 3A</SelectItem>
                                    <SelectItem value="class3b">Class 3B</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Class Average</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{teacherData.classStats.average}%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Systemic Weaknesses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{teacherData.classStats.systemicWeaknesses} Topics</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Students for Intervention</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{teacherData.classStats.interventionCount} Students</p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-12 gap-6">
                {/* Center Panel */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Performance Overview (Biology)</CardTitle>
                            <CardDescription>Average subject score across terms.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <OverallPerformanceChart />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Topic Performance Drill-Down</CardTitle>
                            <CardDescription>Class average mastery for each topic.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Topic</TableHead>
                                        <TableHead className="text-center">Class Average</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teacherData.topicPerformance.sort((a, b) => a.classAverage - b.classAverage).map(topic => (
                                        <TableRow key={topic.topic}>
                                            <TableCell className="font-medium">{topic.topic}</TableCell>
                                            <TableCell className="text-center font-bold">{topic.classAverage}%</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={topic.status === 'weakness' ? 'destructive' : 'secondary'}>
                                                    {topic.status === 'weakness' && <TrendingDown className="h-4 w-4 mr-1" />}
                                                    {topic.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                             <Button className="mt-4 w-full">Generate Targeted Review Plan <FileText className="ml-2 h-4 w-4" /></Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Roster & Quick Stats</CardTitle>
                            <CardDescription>Overview of students in Form 3, Class 3A.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Avg.</TableHead>
                                        <TableHead>Weaknesses</TableHead>
                                        <TableHead>Profile</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teacherData.students.map(student => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-medium">{student.name}</TableCell>
                                            <TableCell className="font-bold">{student.average}%</TableCell>
                                            <TableCell>
                                                <span className="font-bold text-destructive">{student.weaknesses}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon">
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Focused Student View Example */}
                    <Card className="bg-accent border-accent-foreground/20">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    <CardTitle>Focused Student: John Smith</CardTitle>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-destructive font-bold">
                                     <TrendingDown className="h-4 w-4" />
                                     <span>Trending Down</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-1 text-destructive flex items-center gap-2">
                                    <Target className="h-4 w-4" /> Top Weakness
                                </h4>
                                <p>Genetics (40% Mastery)</p>
                            </div>
                            <div className="h-[100px]">
                                <OverallPerformanceChart />
                            </div>
                            <Button className="w-full">
                                Generate Personalized Study Plan <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
