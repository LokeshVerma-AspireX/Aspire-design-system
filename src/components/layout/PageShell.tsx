"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SideNav, type UserInfo, type BadgeCounts } from "./SideNav"

interface PageShellProps {
  children: React.ReactNode
  activeHref?: string
  user?: UserInfo
  badgeCounts?: BadgeCounts
  defaultCollapsed?: boolean
  className?: string
}

function PageShell({
  children,
  activeHref,
  user,
  badgeCounts,
  defaultCollapsed = true,
  className,
}: PageShellProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  return (
    <div
      data-slot="page-shell"
      className={cn("flex h-screen w-full overflow-hidden bg-background", className)}
    >
      <SideNav
        activeHref={activeHref}
        user={user}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        badgeCounts={badgeCounts}
      />
      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}

export { PageShell, type PageShellProps }
