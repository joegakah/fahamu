import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { OverviewChart } from "@/components/dashboard/overview-chart"

const performanceData = [
  { subject: 'Mathematics', topic: 'Algebra', score: 65, status: 'Average' },
  { subject: 'Physics', topic: 'Kinematics', score: 88, status: 'Excellent' },
  { subject: 'Chemistry', topic: 'Stoichiometry', score: 92, status: 'Excellent' },
  { subject: 'Biology', topic: 'Cell Division', score: 71, status: 'Average' },
  { subject: 'History', topic: 'World War II', score: 55, status: 'Improvement Needed' },
];

const weaknesses = [
  'Algebraic equations in Mathematics',
  'Understanding historical timelines in History',
];

export default function StudentDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>
              Your academic progress over the last few months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Identified Weaknesses</CardTitle>
            <CardDescription>
              Areas where you can focus to improve your scores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-center text-sm text-foreground">
                  <span className="mr-2 h-2 w-2 rounded-full bg-destructive" />
                  {weakness}
                </li>
              ))}
            </ul>
             <p className="text-sm text-muted-foreground mt-4">
              Use the <span className="font-semibold text-primary">Study Plan</span> and <span className="font-semibold text-primary">Guidance</span> pages to work on these areas.
             </p>
          </CardContent>
        </Card>
      </div>
      <div className="xl:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
            <CardDescription>
              A summary of your recent test and assignment scores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((item) => (
                  <TableRow key={item.subject + item.topic}>
                    <TableCell className="font-medium">{item.subject}</TableCell>
                    <TableCell>{item.topic}</TableCell>
                    <TableCell className="text-right">{item.score}%</TableCell>
                    <TableCell className="text-right">
                       <Badge
                        variant={
                          item.status === 'Improvement Needed'
                            ? 'destructive'
                            : item.status === 'Excellent'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
