
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useDataStore } from '@/lib/data-store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { UserCheck } from 'lucide-react';

export default function StudentAttendancePage() {
  const { loggedInStudent, studentGroups, courses, attendance } = useDataStore();
  const router = useRouter();

  useEffect(() => {
    if (!loggedInStudent) {
      router.replace('/student/login');
    }
  }, [loggedInStudent, router]);

  const myGroup = useMemo(() => studentGroups.find(group => group.name === loggedInStudent?.groupName), [studentGroups, loggedInStudent]);
  const myCourses = useMemo(() => myGroup?.courses.map(code => courses.find(c => c.code === code)).filter(Boolean) as (typeof courses[0])[], [myGroup, courses]);

  const attendanceData = useMemo(() => {
    if (!loggedInStudent || !myCourses) return [];

    return myCourses.map(course => {
      const courseAttendance = attendance.filter(
        a => a.studentRollNumber === loggedInStudent.rollNumber && a.courseCode === course.code
      );
      
      const absentCount = courseAttendance.filter(a => a.status === 'Absent').length;
      
      // Make total classes dynamic based on course and absences to create variation
      const baseTotalClasses = 20;
      const totalClasses = baseTotalClasses + (course.code.includes('L') ? 5 : 0) - absentCount;
      const presentCount = totalClasses - absentCount > 0 ? totalClasses - absentCount : 0;
      const percentage = totalClasses > 0 ? (presentCount / totalClasses) * 100 : 100;

      return {
        ...course,
        percentage: Math.round(percentage),
        absentRecords: courseAttendance.filter(a => a.status === 'Absent'),
      };
    });
  }, [loggedInStudent, myCourses, attendance]);

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
          <CardTitle>My Attendance</CardTitle>
          <CardDescription>
            An overview of your attendance percentage in each subject.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {attendanceData.map(course => (
              <Card key={course.code}>
                <CardHeader>
                  <CardTitle className="text-xl">{course.name}</CardTitle>
                  <CardDescription>{course.code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Progress value={course.percentage} className="flex-1" />
                    <span className="font-bold text-lg">{course.percentage}%</span>
                     <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Show Details</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Absent Details for {course.name}</DialogTitle>
                           <DialogDescription>
                            You were marked absent on the following dates.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          {course.absentRecords.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Date</TableHead>
                                  <TableHead className="text-right">Marked By</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {course.absentRecords.map(record => (
                                  <TableRow key={record.date}>
                                    <TableCell>{format(new Date(record.date), 'PPP')}</TableCell>
                                    <TableCell className="text-right font-medium opacity-50">{record.facultyName}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ): (
                            <div className="text-center p-8 text-muted-foreground">
                                <UserCheck className="mx-auto size-12 mb-4 text-green-500" />
                                <p>No absences recorded for this subject. Keep it up!</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
           {attendanceData.length === 0 && (
            <div className="text-center p-12 text-muted-foreground">
                <p>No courses found to display attendance for.</p>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
