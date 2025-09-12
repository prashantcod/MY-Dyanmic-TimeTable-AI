
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  ClipboardCheck,
  UserCheck,
  CalendarOff,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {UserNav} from '@/components/user-nav';
import {Logo} from '@/components/logo';
import { OnLeaveDialog } from '@/components/on-leave-dialog';

export default function TeacherLayout({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Button variant="ghost" className="-ml-2 flex items-center gap-2">
            <Logo className="text-primary" />
            <span className="font-headline text-lg font-semibold">
              NEP Timetable AI
            </span>
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/teacher/dashboard"
                asChild
                isActive
                tooltip="Dashboard"
              >
                <Link href="/teacher/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarGroup>
                 <SidebarMenuItem>
                    <SidebarMenuButton href="/teacher/timetable" asChild tooltip="My Timetable">
                        <Link href="/teacher/timetable">
                            <Calendar />
                            My Timetable
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton href="/teacher/assignments" asChild tooltip="Manage Assignments">
                        <Link href="/teacher/assignments">
                            <ClipboardCheck />
                            Assignments
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton href="/teacher/materials" asChild tooltip="Upload Materials">
                        <Link href="/teacher/materials">
                            <FileText />
                            Materials
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/teacher/attendance" asChild tooltip="Mark Attendance">
                        <Link href="/teacher/attendance">
                            <UserCheck />
                            Attendance
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <OnLeaveDialog />
             </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background p-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex flex-1 items-center justify-end">
            <UserNav userType="teacher" />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

    