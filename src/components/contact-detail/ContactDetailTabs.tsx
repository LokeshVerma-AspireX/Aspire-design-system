"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type DetailTab = "overview" | "profile" | "content" | "inbox" | "analytics"

interface ContactDetailTabsProps {
  activeTab?: DetailTab
  onTabChange?: (tab: DetailTab) => void
  /** Per-tab content. When provided, `children` is ignored. */
  contentMap?: Partial<Record<DetailTab, React.ReactNode>>
  /** Shown in the active tab when no contentMap is provided. */
  children?: React.ReactNode
  className?: string
}

const TAB_DEFS: { value: DetailTab; label: string }[] = [
  { value: "overview",  label: "Overview" },
  { value: "profile",   label: "Profile" },
  { value: "content",   label: "Content" },
  { value: "inbox",     label: "Inbox" },
  { value: "analytics", label: "Analytics" },
]

function ContactDetailTabs({
  activeTab = "overview",
  onTabChange,
  contentMap,
  children,
  className,
}: ContactDetailTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => onTabChange?.(v as DetailTab)}
      className={cn("flex flex-1 flex-col overflow-hidden", className)}
    >
      <div className="border-b border-border px-6">
        <TabsList variant="line" className="h-10 gap-0 rounded-none bg-transparent p-0">
          {TAB_DEFS.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="h-10 rounded-none px-4 text-sm font-medium"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {TAB_DEFS.map(({ value }) => (
        <TabsContent
          key={value}
          value={value}
          className="flex-1 overflow-auto mt-0 data-[state=active]:flex data-[state=active]:flex-col"
        >
          {contentMap
            ? (contentMap[value] ?? null)
            : (activeTab === value ? children : null)}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { ContactDetailTabs, type DetailTab, type ContactDetailTabsProps }
