"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar, type UserInfo, type BadgeCounts } from "./AppSidebar"

interface AppShellProps {
  children: React.ReactNode
  activeHref?: string
  user?: UserInfo
  badgeCounts?: BadgeCounts
  defaultCollapsed?: boolean
  onNavigate?: (href: string) => void
  className?: string
}

function AppShell({
  children,
  activeHref,
  user,
  badgeCounts,
  defaultCollapsed = true,
  onNavigate,
  className,
}: AppShellProps) {
  return (
    <SidebarProvider
      defaultOpen={!defaultCollapsed}
      style={
        {
          "--sidebar-width": "15rem",
          "--sidebar-width-icon": "5rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        activeHref={activeHref}
        user={user}
        badgeCounts={badgeCounts}
        onNavigate={onNavigate}
      />
      <SidebarInset className={cn("flex flex-col overflow-hidden", className)}>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export { AppShell, type AppShellProps }
