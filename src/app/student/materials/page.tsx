
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useDataStore } from '@/lib/data-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Book, Calendar, Clock, Download, User } from 'lucide-react';
import Link from 'next/link';

export default function StudentMaterialsPage() {
  const { materials, loggedInStudent, studentGroups } = useDataStore();
  const router = useRouter();

  useEffect(() => {
    // If no student is logged in, redirect to login page
    if (!loggedInStudent) {
      router.replace('/student/login');
    }
  }, [loggedInStudent, router]);

  // Find the group the logged-in student belongs to
  const myGroup = studentGroups.find(group => group.name === loggedInStudent?.groupName);
  
  // Filter materials based on the student's enrolled courses
  const myMaterials = useMemo(() => 
    myGroup 
      ? materials.filter(material => myGroup.courses.includes(material.courseCode))
      : [],
  [myGroup, materials]);
  
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
          <CardTitle>My Course Materials</CardTitle>
          <CardDescription>
            Downloadable modules and notes for your enrolled subjects.
          </CardDescription>
        </CardHeader>
        <CardContent>
           {myMaterials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myMaterials.map((material) => (
                <Card key={material.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                             <div className="space-y-1">
                                <CardTitle>{material.title}</CardTitle>
                                <CardDescription>{material.courseName} ({material.courseCode})</CardDescription>
                             </div>
                             <Badge variant="secondary">{material.credits} Credits</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="size-4" />
                            <span>{material.facultyName}</span>
                        </div>
                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="size-4" />
                            <span>~{material.classesToComplete} classes</span>
                        </div>
                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="size-4" />
                            <span>~{material.daysToComplete} days to complete</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href={material.fileUrl} target="_blank">
                                <Download className="mr-2"/>
                                Download PDF
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
              ))}
            </div>
           ) : (
             <div className="text-center p-12 text-muted-foreground">
                <Book className="mx-auto size-12 mb-4" />
                <p>No materials have been uploaded for your courses yet.</p>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
