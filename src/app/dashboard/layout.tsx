// src/app/dashboard/layout.tsx
'use client';
import type { PropsWithChildren } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import {
  Book,
  Briefcase,
  Home,
  Settings,
  SquareKanban,
  Users,
  Eye,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserNav } from "@/components/user-nav"
import { Logo } from "@/components/logo"

export default function DashboardLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const showSidebar = pathname !== '/dashboard/subjects';

  if (!showSidebar) {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
    )
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/dashboard">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Study Plan">
                <Link href="/dashboard/study-plan">
                  <SquareKanban />
                  <span>Study Plan</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Guidance">
                <Link href="/dashboard/guidance">
                  <Book />
                  <span>Guidance</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Subjects">
                <Link href="/dashboard/subjects">
                  <Eye />
                  <span>Subjects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Teacher View">
                <Link href="/dashboard/teacher">
                  <Users />
                  <span>For Teachers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Admin View">
                <Link href="/dashboard/admin">
                  <Briefcase />
                  <span>For Admins</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {/* Can add breadcrumbs or search here */}
          </div>
          <UserNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
