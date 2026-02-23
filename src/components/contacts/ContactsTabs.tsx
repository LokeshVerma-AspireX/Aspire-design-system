"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type ContactTab = "creators" | "customers" | "talent-manager" | "analytics"

interface TabCount {
  creators?: number
  customers?: number
  "talent-manager"?: number
  analytics?: number
}

interface ContactsTabsProps {
  activeTab?: ContactTab
  onTabChange?: (tab: ContactTab) => void
  counts?: TabCount
  children?: React.ReactNode
  className?: string
}

const TAB_DEFS: { value: ContactTab; label: string }[] = [
  { value: "creators",       label: "Creators" },
  { value: "customers",      label: "Customers" },
  { value: "talent-manager", label: "Talent Manager" },
  { value: "analytics",      label: "Analytics" },
]

function ContactsTabs({
  activeTab = "creators",
  onTabChange,
  counts,
  children,
  className,
}: ContactsTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => onTabChange?.(v as ContactTab)}
      className={cn("w-full", className)}
    >
      <div className="px-6 pt-4">
        <TabsList>
          {TAB_DEFS.map(({ value, label }) => {
            const count = counts?.[value]
            return (
              <TabsTrigger key={value} value={value}>
                {label}
                {count != null && (
                  <span className="ml-1.5 text-xs text-muted-foreground tabular-nums">
                    {count.toLocaleString()}
                  </span>
                )}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </div>

      {TAB_DEFS.map(({ value }) => (
        <TabsContent key={value} value={value} className="mt-0">
          {activeTab === value ? children : null}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { ContactsTabs, type ContactTab, type ContactsTabsProps }
