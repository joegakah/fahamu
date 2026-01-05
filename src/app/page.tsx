import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, UserCog, Briefcase } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function RoleSelectionPage() {
  const roles = [
    {
      name: 'Student',
      description: 'Get personalized study plans and identify your academic weaknesses.',
      icon: User,
      href: '/dashboard',
    },
    {
      name: 'Teacher',
      description: 'Analyze class performance and find where to focus your lessons.',
      icon: UserCog,
      href: '/dashboard/teacher',
    },
    {
      name: 'Administrator',
      description: 'Gain insights on learning outcomes to better allocate resources.',
      icon: Briefcase,
      href: '/dashboard/admin',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-12 flex justify-center">
            <Logo />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-foreground mb-4">
          Bridging the Gap for Every Learner, Everywhere With Ai
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Fahamu AI uses advanced analytics to identify learning gaps in real-time, giving teachers the precision to intervene exactly where it matters most.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {roles.map((role) => (
            <Card key={role.name} className="group hover:border-primary transition-colors duration-300 hover:shadow-lg">
              <Link href={role.href} className="flex flex-col h-full">
                <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                        <role.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline">{role.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                    <CardDescription>{role.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0 flex justify-center items-center">
                  <Button variant="ghost" className="text-primary group-hover:underline">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
