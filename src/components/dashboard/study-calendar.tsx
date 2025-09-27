"use client";

import { useState } from 'react';
import type { StudySession } from '@/ai/flows/generate-personalized-study-plan';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target } from 'lucide-react';
import { format, parseISO, isSameDay } from 'date-fns';

type StudyCalendarProps = {
  sessions: StudySession[];
};

export function StudyCalendar({ sessions }: StudyCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDaySessions = sessions.filter(session =>
    date ? isSameDay(parseISO(session.date), date) : false
  );

  const eventDays = sessions.map(session => parseISO(session.date));

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">Your 7-Day Study Calendar</h3>
        <Card className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0"
            modifiers={{
              hasEvent: eventDays
            }}
            modifiersStyles={{
              hasEvent: {
                fontWeight: 'bold',
                textDecoration: 'underline',
              }
            }}
          />
        </Card>
        <p className="text-sm text-muted-foreground mt-2 text-center">Select a day to see the plan.</p>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              {date ? format(date, 'EEEE, MMMM do') : 'Select a day'}
            </CardTitle>
            <CardDescription>
              {selectedDaySessions.length > 0 ? `You have ${selectedDaySessions.length} session(s) scheduled.` : 'No sessions scheduled for this day.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDaySessions.length > 0 ? (
              selectedDaySessions.map((session, index) => (
                <div key={index} className="p-4 rounded-lg border bg-card shadow-sm">
                  <Badge variant="secondary" className="mb-2">{session.topic}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
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
              <div className="text-center text-muted-foreground py-8">
                <p>Enjoy your day off or catch up on other tasks!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
