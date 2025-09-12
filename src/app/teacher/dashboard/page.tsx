
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
  CardFooter,
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
import { Badge } from '@/components/ui/badge';
import { useDataStore, Course } from '@/lib/data-store';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  BookUser,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Clock,
  Download,
  MoreHorizontal,
  Users,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { week: 'Week 1', thisMonth: 12, lastMonth: 8 },
  { week: 'Week 2', thisMonth: 14, lastMonth: 10 },
  { week: 'Week 3', thisMonth: 10, lastMonth: 6 },
  { week: 'Week 4', thisMonth: 16, lastMonth: 12 },
];

const agendaItems = [
    { time: '7:30 AM - 8:30 AM', title: 'Department Meetings', color: 'bg-purple-200' },
    { time: '9:00 AM - 10:00 AM', title: 'Attending Conferences', color: 'bg-blue-200' },
    { time: '10:30 AM - 11:30 AM', title: 'Course Coordination', color: 'bg-purple-200' },
];

export default function TeacherDashboardPage() {
  const teacherAvatar = placeholderImages.find(img => img.id === 'user-avatar');
  const { loggedInTeacher, courses, studentGroups, timetable } = useDataStore();
  const router = useRouter();

  useEffect(() => {
    if (!loggedInTeacher) {
      router.replace('/teacher/login');
    }
  }, [loggedInTeacher, router]);

  const assignedCourses = useMemo(() => {
    if (!loggedInTeacher) return [];
    return courses.filter(course =>
      loggedInTeacher.expertise.includes(course.code)
    );
  }, [courses, loggedInTeacher]);

  const creditHours = useMemo(() => {
    return assignedCourses.reduce((sum, course) => sum + (course.credits || 0), 0);
  }, [assignedCourses]);

   const mySchedule = useMemo(() => {
    if (!loggedInTeacher) return [];
    return timetable.filter(entry => entry.facultyName === loggedInTeacher.name);
  }, [timetable, loggedInTeacher]);

  const totalWorkingHours = mySchedule.length;
  
  const totalStudents = useMemo(() => {
     if (!loggedInTeacher) return 0;
     const myCourseCodes = loggedInTeacher.expertise;
     const relevantGroups = studentGroups.filter(g => g.courses.some(c => myCourseCodes.includes(c)));
     const uniqueGroups = [...new Set(relevantGroups)];
     return uniqueGroups.reduce((acc, group) => acc + group.size, 0);
  }, [studentGroups, loggedInTeacher]);


  if (!loggedInTeacher) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading teacher data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-8">
       <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Welcome Back, {loggedInTeacher.name.split(' ')[0]} 👋</h1>
                <p className="text-muted-foreground">Here's your teaching summary for the week.</p>
            </div>
            <Button variant="outline">
                <Download className="mr-2" />
                Export
            </Button>
       </div>
      
       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <Card className="col-span-1 flex flex-col justify-between bg-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Faculty Profile</span>
                         <Button variant="link" className="text-primary-foreground p-0 h-auto">See more</Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col items-center justify-center text-center gap-4">
                    <Avatar className="h-24 w-24 border-4 border-primary-foreground/20">
                    {teacherAvatar && <AvatarImage src={teacherAvatar.imageUrl} alt="Teacher avatar" />}
                    <AvatarFallback className="text-primary bg-primary-foreground text-3xl">
                        {loggedInTeacher.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        
                        
                    </div>
                </CardContent>
                <CardFooter className="bg-black/10 p-4 rounded-b-lg">
                    <div className="flex items-center justify-between w-full">
                        <Button size="icon" variant="ghost" className="hover:bg-black/20"><ChevronLeft/></Button>
                        <div className="text-center">
                             <p className="text-4xl font-bold">86%</p>
                             <p className="text-xs opacity-80 max-w-xs">Your Lesson Planning Score increased by 25% from the last month. Pretty good performance!</p>
                        </div>
                         <Button size="icon" variant="ghost" className="hover:bg-black/20"><ChevronRight/></Button>
                    </div>
                </CardFooter>
            </Card>

            {/* Right Column */}
            <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Assigned Subjects</CardTitle>
                        <BookUser className="text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{assignedCourses.length}</p>
                        <p className="text-xs text-muted-foreground">Across all semesters</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{totalStudents.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">In all your classes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
                        <Clock className="text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{creditHours}</p>
                        <p className="text-xs text-muted-foreground">Total teaching load</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Working Hours</CardTitle>
                        <MoreHorizontal className="text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{totalWorkingHours}h / week</p>
                        <p className="text-xs text-muted-foreground">Based on current timetable</p>
                    </CardContent>
                </Card>
            </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Working Hours Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                       <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorThisMonth" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="week" tickLine={false} axisLine={false} />
                        <YAxis tickFormatter={(value) => `${value}h`} tickLine={false} axisLine={false} domain={[0, 16]} ticks={[0, 4, 8, 12, 16]} />
                        <Tooltip contentStyle={{ borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))' }}/>
                        <Legend />
                        <Area type="monotone" dataKey="thisMonth" stroke="hsl(var(--chart-1))" fill="url(#colorThisMonth)" strokeWidth={2} name="This Month" dot={false} />
                        <Area type="monotone" dataKey="lastMonth" stroke="hsl(var(--chart-2))" fill="url(#colorLastMonth)" strokeWidth={2} name="Last Month" dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>My Agenda</CardTitle>
                    <CardDescription>Today - {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {agendaItems.map((item, index) => (
                        <div key={index} className={`p-3 rounded-lg ${item.color}`}>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.time}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
