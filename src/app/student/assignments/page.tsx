
'use client';
import {
  Card,
  CardContent,
  CardDescription,
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
import { useDataStore } from '@/lib/data-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export default function StudentAssignmentsPage() {
  const { assignments, loggedInStudent, studentGroups } = useDataStore();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // If no student is logged in, redirect to login page
    if (!loggedInStudent) {
      router.replace('/student/login');
    }
  }, [loggedInStudent, router]);

  // Find the group the logged-in student belongs to
  const myGroup = studentGroups.find(group => group.name === loggedInStudent?.groupName);
  
  // Filter assignments based on the student's enrolled courses
  const myAssignments = useMemo(() => 
    myGroup 
      ? assignments.filter(assignment => myGroup.courses.includes(assignment.courseCode))
      : [],
  [myGroup, assignments]);
  
  const handleSubmit = (assignmentTitle: string) => {
    toast({
        title: 'Assignment Submitted',
        description: `Your submission for "${assignmentTitle}" has been received.`,
    })
  }

  // Display a loading/skeleton state if the user is not yet available
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
          <CardTitle>My Assignments</CardTitle>
          <CardDescription>
            An overview of all your upcoming and past assignments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div className="font-medium">{assignment.courseName}</div>
                    <div className="text-sm text-muted-foreground">{assignment.courseCode}</div>
                  </TableCell>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.facultyName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{assignment.points} pts</Badge>
                  </TableCell>
                   <TableCell>{format(new Date(assignment.dueDate), 'PPP')}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => handleSubmit(assignment.title)}>Submit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {myAssignments.length === 0 && (
            <div className="text-center p-12 text-muted-foreground">
                <p>You have no assignments at the moment. Great job!</p>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
