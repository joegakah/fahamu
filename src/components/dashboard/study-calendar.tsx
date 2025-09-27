"use client";

import type { StudySession } from '@/ai/flows/generate-personalized-study-plan';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, CalendarDays } from 'lucide-react';
import { format, parseISO, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

type StudyCalendarProps = {
  sessions: StudySession[];
};

type SessionsByDay = {
  [key: string]: StudySession[];
};

export function StudyCalendar({ sessions }: StudyCalendarProps) {
  const sessionsByDay: SessionsByDay = sessions.reduce((acc: SessionsByDay, session) => {
    const day = format(parseISO(session.date), 'yyyy-MM-dd');
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(session);
    return acc;
  }, {});

  const sessionDates = sessions.map(s => parseISO(s.date));
  const firstDay = sessionDates.length > 0 ? sessionDates[0] : new Date();
  const lastDay = sessionDates.length > 0 ? sessionDates[sessionDates.length - 1] : new Date();
  
  const weekDays = eachDayOfInterval({
    start: firstDay,
    end: lastDay
  });

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" />
            Your Weekly Timetable
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {weekDays.map(day => {
          const dayKey = format(day, 'yyyy-MM-dd');
          const daySessions = sessionsByDay[dayKey] || [];
          
          return (
            <Card key={dayKey} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{format(day, 'EEEE')}</CardTitle>
                <CardDescription>{format(day, 'MMMM do')}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                {daySessions.length > 0 ? (
                  daySessions.sort((a,b) => a.startTime.localeCompare(b.startTime)).map((session, index) => (
                    <div key={index} className="p-3 rounded-lg border bg-card shadow-sm space-y-2">
                       <Badge variant="secondary">{session.topic}</Badge>
                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{session.startTime} - {session.endTime}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Target className="h-4 w-4 mt-0.5 text-primary" />
                        <p className='flex-1'><span className="font-semibold">Objective:</span> {session.objective}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-6 h-full flex items-center justify-center">
                    <p>No sessions scheduled.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
