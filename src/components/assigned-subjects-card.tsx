
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BookUser } from 'lucide-react';
import { useDataStore, Course } from '@/lib/data-store';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

type AssignedCourse = Course & {
    program: string;
}

export function AssignedSubjectsCard() {
  const { courses, loggedInTeacher, studentGroups } = useDataStore();
  
  const assignedCourses: AssignedCourse[] = React.useMemo(() => {
    if (!loggedInTeacher) return [];

    const teacherCourseCodes = loggedInTeacher.expertise;
    const assigned = courses
      .filter(course => teacherCourseCodes.includes(course.code))
      .map(course => {
        // Find which student group (and thus program) this course is for.
        // This is a simplification; a course could be in multiple groups.
        const group = studentGroups.find(g => g.courses.includes(course.code));
        return {
          ...course,
          program: group?.program || 'N/A', // Add program name to the course object
        };
      });
      
    return assigned;

  }, [courses, loggedInTeacher, studentGroups]);


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-muted/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Assigned Subjects</CardTitle>
            <BookUser className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{assignedCourses.length}</p>
            <p className="text-xs text-muted-foreground">Across all semesters</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>My Assigned Subjects</DialogTitle>
          <DialogDescription>
            Here is a list of all subjects assigned to you for teaching.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Course ID</TableHead>
                <TableHead>Subject Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {assignedCourses.map((course) => (
                <TableRow key={course.code}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.program}</TableCell>
                    <TableCell>
                        <Badge variant={course.type === 'Practical' ? 'default' : 'secondary'}>{course.type}</Badge>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
             {assignedCourses.length === 0 && (
                <div className="text-center p-12 text-muted-foreground">
                    <p>You have not been assigned any subjects yet.</p>
                </div>
            )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
