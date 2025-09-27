import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Award, BookOpen, Briefcase, Calendar, ChevronRight, Lightbulb, Target } from "lucide-react"
import { OverallPerformanceChart } from "@/components/dashboard/overall-performance-chart"
import { SubjectBreakdownChart } from "@/components/dashboard/subject-breakdown-chart"
import Link from "next/link"

const student = {
    name: "John",
    careerGoal: "Doctor",
    quickStats: {
        overallScore: 72,
        studyHours: 10,
        weaknesses: 3,
    },
    recentActivity: [
        {
            type: "grade",
            details: "Received 85% on the History Quiz on World Wars."
        },
        {
            type: "study",
            details: "Completed 2 hours of study on Trigonometry."
        }
    ],
    topicMastery: [
        { topic: "Newton's Laws", score: 45, level: "weakness" },
        { topic: "Cell Structure", score: 65, level: "average" },
        { topic: "Organic Chemistry", score: 35, level: "weakness" },
        { topic: "Shakespearean Sonnets", score: 85, level: "stronghold" },
        { topic: "Differential Equations", score: 40, level: "weakness" },
    ],
    careerGaps: {
        required: ["Physics", "Pure Math", "Chemistry"],
        gaps: ["Organic Chemistry", "Differential Equations"]
    }
}

const getMasteryColor = (level: string) => {
    switch (level) {
        case "weakness": return "text-destructive";
        case "average": return "text-orange-500";
        case "stronghold": return "text-primary";
        default: return "text-muted-foreground";
    }
}

const getMasteryBgColor = (level: string) => {
    switch (level) {
        case "weakness": return "bg-destructive/10";
        case "average": return "bg-orange-500/10";
        case "stronghold": return "bg-primary/10";
        default: return "bg-muted";
    }
}

const getMasteryTag = (level: string) => {
    switch (level) {
        case "weakness": return "🔴 Weakness";
        case "average": return "🟠 Average";
        case "stronghold": return "🟢 Stronghold";
        default: return "⚪ Unknown";
    }
}


export default function StudentDashboard() {
  return (
    <div className="flex flex-col gap-6">
        {/* Header */}
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Welcome back, {student.name}! 👋</CardTitle>
                <CardDescription>Ready to crush your goals today?</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <Card className="flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-lg">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                        <p><strong>Current Term Average:</strong> {student.quickStats.overallScore}%</p>
                        <p><strong>Study Hours Planned:</strong> {student.quickStats.studyHours} Hrs</p>
                        <p><strong>Current Weaknesses:</strong> {student.quickStats.weaknesses} Topics</p>
                    </CardContent>
                </Card>
                <Card className="flex flex-col justify-between">
                    <CardHeader>
                         <div className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            <CardTitle className="text-lg">Career Goal</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{student.careerGoal}</p>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2 flex flex-col justify-between">
                     <CardHeader>
                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                        {student.recentActivity.map((activity, i) => (
                             <p key={i} className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${activity.type === 'grade' ? 'bg-primary' : 'bg-orange-400'}`}></span>
                                {activity.details}
                            </p>
                        ))}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>

        <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Subject Category Radar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SubjectBreakdownChart />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>AI Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert>
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Focus Recommendation</AlertTitle>
                            <AlertDescription>
                                Your lowest score is in Organic Chemistry. Consider starting a study session.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>

            {/* Center Panel */}
            <div className="lg:col-span-5 flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Historical Performance</CardTitle>
                        <CardDescription>Overall grade average vs. your target</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                         <OverallPerformanceChart />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Subject & Topic Mastery Index</CardTitle>
                        <CardDescription>Sorted by weakest topics to guide your focus.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {student.topicMastery.sort((a,b) => a.score - b.score).map((item, i) => (
                            <div key={i} className={`p-3 rounded-lg flex justify-between items-center ${getMasteryBgColor(item.level)}`}>
                                <div>
                                    <p className="font-semibold">{item.topic}</p>
                                    <p className={`text-sm font-bold ${getMasteryColor(item.level)}`}>{getMasteryTag(item.level)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold">{item.score}%</p>
                                    <p className="text-xs text-muted-foreground">Mastery</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-3 flex flex-col gap-6">
                 <Card className="bg-accent border-accent-foreground/20">
                    <CardHeader>
                         <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            <CardTitle>Career Gap Analysis</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-1">Required Path</h4>
                            <div className="flex flex-wrap gap-2">
                                {student.careerGaps.required.map(sub => <Badge key={sub} variant="secondary">{sub}</Badge>)}
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-1 text-destructive">Current Gaps</h4>
                             <ul className="list-disc list-inside text-sm">
                                {student.careerGaps.gaps.map(gap => <li key={gap}>{gap}</li>)}
                            </ul>
                        </div>
                        <Button className="w-full" asChild>
                            <Link href="/dashboard/study-plan">Generate Targeted Plan <ChevronRight className="h-4 w-4 ml-1" /></Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <CardTitle>Personalized Study Calendar</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Your upcoming study sessions.</p>
                        <Button className="w-full" variant="outline" asChild>
                             <Link href="/dashboard/study-plan">View Full Calendar <ChevronRight className="h-4 w-4 ml-1" /></Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            <CardTitle>Study Method Guide</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Explore new techniques to boost your learning.</p>
                        <Button className="w-full" variant="outline" asChild>
                           <Link href="/dashboard/guidance">Browse Methods <ChevronRight className="h-4 w-4 ml-1" /></Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
