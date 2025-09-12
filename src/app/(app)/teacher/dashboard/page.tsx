
'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import { placeholderImages } from '@/lib/placeholder-images.json';
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  MoreHorizontal,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const assignedCourses = [
  {
    courseCode: 'CSE-301',
    courseName: 'Advanced Algorithms',
    credits: 4,
    class: 'B.Tech CSE 3rd Year',
  },
  {
    courseCode: 'CSE-205',
    courseName: 'Data Structures',
    credits: 4,
    class: 'B.Tech CSE 2nd Year',
  },
  {
    courseCode: 'ITC-402',
    courseName: 'Cryptography',
    credits: 3,
    class: 'B.Tech IT 4th Year',
  },
  {
    courseCode: 'GEN-101',
    courseName: 'Intro to Programming',
    credits: 3,
    class: 'FYUP Batch 1',
  },
];

const workingHoursData = [
  { week: 'Week 1', thisMonth: 12, lastMonth: 8 },
  { week: 'Week 2', thisMonth: 14, lastMonth: 10 },
  { week: 'Week 3', thisMonth: 10, lastMonth: 6 },
  { week: 'Week 4', thisMonth: 16, lastMonth: 12 },
];

const agendaItems = [
  {
    time: '7:30 AM - 8:30 AM',
    title: 'Department Meetings',
    color: 'bg-purple-200',
  },
  {
    time: '9:00 AM - 10:00 AM',
    title: 'Attending Conferences',
    color: 'bg-blue-200',
  },
  {
    time: '10:30 AM - 11:30 AM',
    title: 'Course Coordination',
    color: 'bg-indigo-200',
  },
];

export default function TeacherDashboardPage() {
  const teacherAvatar = placeholderImages.find(
    img => img.id === 'user-avatar'
  );

  return (
    <div className="flex flex-col gap-8 py-4 md:py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">
            Welcome Back, Dr. Doe! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your academic performance and schedule.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-1">
          <Card className="h-full bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle>Lecturer Performance</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="size-24 border-4 border-primary-foreground/20">
                {teacherAvatar && (
                  <AvatarImage
                    src={teacherAvatar.imageUrl}
                    alt="Teacher avatar"
                    data-ai-hint={teacherAvatar.imageHint}
                  />
                )}
                <AvatarFallback className="bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <p className="mt-4 text-5xl font-bold">91.2%</p>
              <p className="text-sm">Overall Performance Score</p>
              <div className="mt-6 w-full rounded-lg bg-primary-foreground/10 p-4">
                <div className="flex items-center justify-between">
                  <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/20">
                    <ChevronLeft />
                  </Button>
                  <div className="text-center">
                    <p className="text-3xl font-bold">86%</p>
                    <p className="text-xs">
                      Lesson Planning Score increased by 25% from the last month.
                    </p>
                  </div>
                  <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/20">
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="grid gap-6 lg:col-span-2">
            <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        Assigned Subjects
                    </CardTitle>
                    <BookOpen className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">This Semester</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
                    <Clock className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">14</div>
                    <p className="text-xs text-muted-foreground">Weekly Load</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">140</div>
                    <p className="text-xs text-muted-foreground">Across all classes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Days Absent</CardTitle>
                    <UserCheck className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">Current Semester</p>
                    </CardContent>
                </Card>
            </div>
             <Card>
                 <CardHeader className="flex flex-row items-center justify-between">
                     <CardTitle>Working Hours Statistics</CardTitle>
                     <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-primary" />
                            <span>This Month</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-muted-foreground" />
                            <span>Last Month</span>
                        </div>
                     </div>
                 </CardHeader>
                 <CardContent>
                     <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={workingHoursData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                             <XAxis dataKey="week" axisLine={false} tickLine={false} />
                             <YAxis unit="h" axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid hsl(var(--border))',
                                }}
                            />
                             <Area type="monotone" dataKey="thisMonth" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} />
                             <Area type="monotone" dataKey="lastMonth" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.1} />
                        </AreaChart>
                     </ResponsiveContainer>
                 </CardContent>
             </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>My Assigned Courses</CardTitle>
                <CardDescription>
                    A list of courses you are teaching this semester.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Assigned Class</TableHead>
                        <TableHead>
                        <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {assignedCourses.map(course => (
                        <TableRow key={course.courseCode}>
                        <TableCell className="font-medium">
                            {course.courseCode}
                        </TableCell>
                        <TableCell>{course.courseName}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>{course.class}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                            View Details
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>My Agenda</CardTitle>
                    <CardDescription>
                        Today: {new Date().toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {agendaItems.map(item => (
                        <div key={item.title} className="relative flex items-start gap-4">
                            <div className="absolute left-2.5 top-2.5 h-full w-px bg-border" />
                            <div className="relative z-10 flex size-5 items-center justify-center rounded-full bg-background">
                                <div className="size-2 rounded-full bg-primary" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm text-muted-foreground">{item.time}</p>
                                <div className={`rounded-md p-3 ${item.color}`}>
                                    <p className="font-medium">{item.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

