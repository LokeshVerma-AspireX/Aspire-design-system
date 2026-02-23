"use client"

import * as React from "react"
import { ArrowLeft, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MembersTab } from "./MembersTab"
import { OverviewTab } from "./tabs/OverviewTab"
import { ContentTab } from "./tabs/ContentTab"
import { OffersTab } from "./tabs/OffersTab"
import { TasksTab } from "./tabs/TasksTab"
import { InboxTab } from "./tabs/InboxTab"
import { ReportingTab } from "./tabs/ReportingTab"
import { LinksTab } from "./tabs/LinksTab"
import { SettingsTab } from "./tabs/SettingsTab"

// ─── Types ───────────────────────────────────────────────────────────────────

interface CampaignDetailPageProps {
  campaignName?: string
  activeTab?: string
  onTabChange?: (tab: string) => void
  onBack?: () => void
  onInviteCreators?: () => void
  onEditCampaign?: () => void
  className?: string
}

// ─── Tab definitions ─────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Overview", width: "w-[97px]" },
  { id: "members", label: "Members", width: "w-[106px]" },
  { id: "content", label: "Content", width: "w-[120px]" },
  { id: "offers", label: "Offers", width: "w-[95px]" },
  { id: "tasks", label: "Tasks", width: "w-[86px]" },
  { id: "inbox", label: "Inbox", width: "w-[90px]" },
  { id: "reporting", label: "Reporting", width: "w-[194px]" },
  { id: "links", label: "Links", width: "w-[92px]" },
  { id: "settings", label: "Settings", width: "w-[95px]" },
] as const

// ─── Component ───────────────────────────────────────────────────────────────

function CampaignDetailPage({
  campaignName = "Summer Glow Beauty Launch",
  activeTab: controlledTab,
  onTabChange,
  onBack,
  onInviteCreators,
  onEditCampaign,
  className,
}: CampaignDetailPageProps) {
  const [internalTab, setInternalTab] = React.useState("members")
  const activeTab = controlledTab ?? internalTab

  function handleTabChange(tab: string) {
    setInternalTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className={cn("flex h-full flex-col bg-background", className)}>
      {/* Header — 72px */}
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-stone-200 px-6 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0"
            onClick={onBack}
            aria-label="Go back"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
            {campaignName}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onInviteCreators}
          >
            <UserPlus className="mr-1.5 size-4" />
            Invite Creators
          </Button>
          <Button variant="outline" size="sm" onClick={onEditCampaign}>
            Edit Campaign
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-1 flex-col overflow-hidden">
        <div className="px-6 pt-2">
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="m-0 flex-1 overflow-auto">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="members" className="m-0 flex-1 overflow-auto">
          <MembersTab onInviteCreators={onInviteCreators} />
        </TabsContent>
        <TabsContent value="content" className="m-0 flex-1 overflow-auto">
          <ContentTab />
        </TabsContent>
        <TabsContent value="offers" className="m-0 flex-1 overflow-auto">
          <OffersTab />
        </TabsContent>
        <TabsContent value="tasks" className="m-0 flex-1 overflow-auto">
          <TasksTab />
        </TabsContent>
        <TabsContent value="inbox" className="m-0 flex-1 overflow-auto">
          <InboxTab />
        </TabsContent>
        <TabsContent value="reporting" className="m-0 flex-1 overflow-auto">
          <ReportingTab />
        </TabsContent>
        <TabsContent value="links" className="m-0 flex-1 overflow-auto">
          <LinksTab />
        </TabsContent>
        <TabsContent value="settings" className="m-0 flex-1 overflow-auto">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { CampaignDetailPage, type CampaignDetailPageProps }
