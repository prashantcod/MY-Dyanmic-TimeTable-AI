
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useDataStore } from '@/lib/data-store';
import { TimetableView } from '@/components/timetable-view';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TimetableResult } from '@/app/api/timetable/route';
import { Loader2 } from 'lucide-react';

export default function StudentTimetablePage() {
  const { studentGroups, timetable, loggedInStudent, setTimetable } = useDataStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const fetchTimetable = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/timetable');
      const result: TimetableResult = await response.json();
      setTimetable(result.timetable);
    } catch (error) {
      console.error("Failed to fetch timetable", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedInStudent) {
      router.replace('/student/login');
      return;
    }
    
    if (timetable.length === 0) {
        fetchTimetable();
    } else {
        setIsLoading(false);
    }
  }, [loggedInStudent, router, timetable.length, setTimetable]);

  const myGroup = studentGroups.find(group => group.name === loggedInStudent?.groupName);
  const mySchedule = myGroup ? timetable.filter(entry => entry.studentGroup === myGroup.name) : [];
  
  if (!loggedInStudent || !myGroup) {
     return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading student data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-8">
       <Card>
        <CardHeader>
          <CardTitle>My Weekly Timetable</CardTitle>
          <CardDescription>
            Your personalized class schedule for the week. This is always in sync with the master timetable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="flex h-[60vh] flex-col items-center justify-center gap-4 p-12 text-center">
                <Loader2 className="size-12 animate-spin text-primary" />
                <h3 className="text-lg font-semibold">Loading Timetable...</h3>
                <p className="text-sm text-muted-foreground">
                    Please wait while we fetch your schedule.
                </p>
            </div>
          ) : (
             <TimetableView schedule={mySchedule} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
