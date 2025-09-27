import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lightbulb, Target } from "lucide-react"
import { OverallPerformanceChart } from "@/components/dashboard/overall-performance-chart"
import { SubjectBreakdownChart } from "@/components/dashboard/subject-breakdown-chart"

const topicProgress = [
  {
    topic: "Geometry",
    before: 30,
    after: 65,
    sessions_completed: 4
  },
  {
    topic: "Photosynthesis",
    before: 50,
    after: 80,
    sessions_completed: 3
  }
];

const aiInsights = [
  "Your Chemistry scores increased by 20% after 2 hrs/week study.",
  "Biology performance is dropping — revise last month’s notes."
];

const badges = ["Consistency Star", "Math Improver", "Top Performer"];

export default function StudentDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <div className="xl:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>
              Overall performance trend over the last 4 weeks.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverallPerformanceChart />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1 xl:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Subjects Strength Map</CardTitle>
            <CardDescription>
              Your performance breakdown by subject.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubjectBreakdownChart />
          </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Weakness Improvement Tracking</CardTitle>
             <CardDescription>
              See your progress in the topics you are focusing on.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {topicProgress.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">{item.topic}</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-destructive font-semibold">{item.before}%</span> → <span className="text-primary font-semibold">{item.after}%</span>
                  </p>
                </div>
                <Progress value={item.after} />
                 <p className="text-xs text-muted-foreground mt-2">{item.sessions_completed} sessions completed.</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

       <div className="lg:col-span-2 xl:col-span-4">
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>AI Insights</AlertTitle>
          <AlertDescription>
             <ul className="list-disc list-inside">
                {aiInsights.map((insight, index) => (
                    <li key={index}>{insight}</li>
                ))}
            </ul>
          </AlertDescription>
        </Alert>
      </div>

       <div className="lg:col-span-1 xl:col-span-4">
         <Card>
            <CardHeader>
                <CardTitle>Badges Earned</CardTitle>
                 <CardDescription>
                    Your achievements and milestones.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="text-sm">
                    🎉 {badge}
                </Badge>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}