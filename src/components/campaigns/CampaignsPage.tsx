"use client"

import * as React from "react"
import {
  Bookmark,
  ChevronDown,
  LayoutGrid,
  List,
  Megaphone,
  MoreHorizontal,
  Plus,
  Search,
  UsersRound,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PageHeader } from "@/components/layout/PageHeader"
import { Pagination } from "@/components/shared/Pagination"
import { EmptyState } from "@/components/shared/EmptyState"
import { CampaignCard, type Campaign, type CampaignStatus } from "./CampaignCard"
import {
  CampaignAnalyticsTab,
  type CampaignAnalyticsTabProps,
} from "./CampaignAnalyticsTab"

// ─── Types ───────────────────────────────────────────────────────────────────

type ViewMode = "grid" | "list"

interface CampaignsPageProps {
  campaigns: Campaign[]
  activeTab?: string
  onTabChange?: (tab: string) => void
  // View
  viewMode?: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
  // Selection (table view)
  selectedIds?: Set<string>
  onSelectId?: (id: string, selected: boolean) => void
  onSelectAll?: (selected: boolean) => void
  // Sorting
  sortKey?: string
  sortDirection?: "asc" | "desc"
  onSort?: (key: string, direction: "asc" | "desc") => void
  // Pagination
  currentPage?: number
  totalPages?: number
  totalItems?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  // Actions
  onCreateCampaign?: () => void
  onViewCampaign?: (id: string) => void
  // Search
  searchValue?: string
  onSearchChange?: (value: string) => void
  // Analytics
  analyticsProps?: CampaignAnalyticsTabProps
  className?: string
}

// ─── Status badge config ─────────────────────────────────────────────────────

const statusBadgeConfig: Record<CampaignStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  },
  draft: {
    label: "Draft",
    className: "bg-stone-100 text-stone-600 dark:bg-stone-800/40 dark:text-stone-400",
  },
  paused: {
    label: "Paused",
    className: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
  completed: {
    label: "Completed",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(d: string): string {
  if (!d) return "—"
  const date = new Date(d + "T00:00:00")
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
}

// ─── Sample Data ─────────────────────────────────────────────────────────────

const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Summer Style Refresh 2026",
    status: "active",
    type: "sponsored",
    startDate: "2026-01-15",
    endDate: "2026-03-30",
    creatorCount: 24,
    contentCount: 48,
    revenue: 12500,
    progress: 60,
  },
  {
    id: "2",
    name: "Petfluencer Perks",
    status: "active",
    type: "gifted",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    creatorCount: 48,
    contentCount: 96,
    revenue: 8400,
    progress: 80,
  },
  {
    id: "3",
    name: "Fitness Challenge Q1",
    status: "completed",
    type: "affiliate",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    creatorCount: 120,
    contentCount: 240,
    revenue: 45000,
    progress: 100,
  },
  {
    id: "4",
    name: "VIP Brand Ambassadors",
    status: "active",
    type: "ambassador",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    creatorCount: 15,
    contentCount: 30,
    revenue: 75000,
    progress: 25,
  },
  {
    id: "5",
    name: "Holiday Gift Guide",
    status: "draft",
    type: "sponsored",
    startDate: "",
    endDate: "",
    creatorCount: 0,
    contentCount: 0,
    revenue: 0,
    progress: 0,
  },
  {
    id: "6",
    name: "TikTok Launch Wave",
    status: "paused",
    type: "sponsored",
    startDate: "2026-01-10",
    endDate: "2026-02-28",
    creatorCount: 32,
    contentCount: 64,
    revenue: 18200,
    progress: 45,
  },
]

// ─── ViewToggle (local) ─────────────────────────────────────────────────────

function ViewToggleButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ElementType
  label: string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md border transition-colors",
        active
          ? "border-stone-300 bg-stone-100 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
          : "border-transparent text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300"
      )}
    >
      <Icon className="size-4" />
    </button>
  )
}

// ─── CampaignsPage ──────────────────────────────────────────────────────────

function CampaignsPage({
  campaigns,
  activeTab = "campaigns",
  onTabChange,
  viewMode: controlledViewMode,
  onViewModeChange,
  selectedIds,
  onSelectId,
  onSelectAll,
  sortKey: _sortKey,
  sortDirection: _sortDirection,
  onSort: _onSort,
  currentPage = 1,
  totalPages = 1,
  totalItems,
  pageSize = 50,
  onPageChange,
  onCreateCampaign,
  onViewCampaign,
  searchValue = "",
  onSearchChange,
  analyticsProps,
  className,
}: CampaignsPageProps) {
  const [internalView, setInternalView] = React.useState<ViewMode>("list")
  const viewMode: ViewMode = controlledViewMode ?? internalView
  const setViewMode = (mode: ViewMode) => {
    setInternalView(mode)
    onViewModeChange?.(mode)
  }
  const data = campaigns.length > 0 ? campaigns : SAMPLE_CAMPAIGNS
  const itemCount = totalItems ?? data.length

  const allSelected = selectedIds ? data.every((c) => selectedIds.has(c.id)) : false
  const someSelected = selectedIds ? data.some((c) => selectedIds.has(c.id)) && !allSelected : false

  return (
    <div className={cn("flex h-full flex-col bg-background", className)}>
      {/* Page Header */}
      <PageHeader title="Campaigns" showAstra />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="flex flex-1 flex-col overflow-hidden">
        <div className="px-6 pt-2">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </div>

        {/* ─── Campaigns Tab ──────────────────────────────────── */}
        <TabsContent value="campaigns" className="m-0 flex flex-1 flex-col overflow-hidden">
          {/* Filter Pills Row — above datatable card */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-6 py-3">
            <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm text-foreground transition-colors hover:bg-muted">
              <Bookmark className="size-3.5 text-muted-foreground" />
              Saved Views
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
            <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm text-foreground transition-colors hover:bg-muted">
              Quick Filter
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
            <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm text-foreground transition-colors hover:bg-muted">
              Quick Filter
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
            <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm text-foreground transition-colors hover:bg-muted">
              Quick Filter
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
            <button className="inline-flex h-8 items-center gap-1 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <Plus className="size-3.5" />
              Add Filter
            </button>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-auto px-6 pb-6 pt-4">
            {data.length === 0 ? (
              <EmptyState
                icon={<Megaphone className="size-6" />}
                title="No Campaigns Yet"
                description="Launch your first influencer campaign and start building creator relationships."
                actionLabel="Create Campaign"
                onAction={onCreateCampaign}
                onLearnMore={() => {}}
                className="py-24"
              />
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {data.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onView={onViewCampaign}
                  />
                ))}
              </div>
            ) : (
              /* Table View — matches Figma */
              <div className="overflow-clip rounded-xl border border-stone-200 shadow-sm dark:border-stone-800">
                {/* Table Action Bar */}
                <div className="flex items-center justify-between gap-3 border-b border-stone-200 bg-background px-4 py-2.5 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={onCreateCampaign}
                    >
                      Primary Action
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-9"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={searchValue}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        placeholder="Search..."
                        className="h-9 w-[200px] pl-9"
                      />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <ViewToggleButton
                        active={false}
                        onClick={() => setViewMode("grid")}
                        icon={LayoutGrid}
                        label="Grid view"
                      />
                      <ViewToggleButton
                        active={true}
                        onClick={() => setViewMode("list")}
                        icon={List}
                        label="List view"
                      />
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="h-16 border-b border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/30">
                        <th className="w-12 px-4">
                          <Checkbox
                            checked={allSelected ? true : someSelected ? "indeterminate" : false}
                            onCheckedChange={(checked) => onSelectAll?.(!!checked)}
                            aria-label="Select all"
                          />
                        </th>
                        <th className="px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                          Campaign Name
                        </th>
                        <th className="w-[187px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                          Members
                        </th>
                        <th className="w-[140px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                          Status
                        </th>
                        <th className="w-[160px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                          Start Date
                        </th>
                        <th className="w-[160px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                          End Date
                        </th>
                        <th className="px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                          Column Title
                        </th>
                        <th className="w-[195px] px-3 text-right text-sm font-medium text-stone-500 dark:text-stone-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((campaign) => {
                        const isSelected = selectedIds?.has(campaign.id) ?? false
                        const badge = statusBadgeConfig[campaign.status]
                        return (
                          <tr
                            key={campaign.id}
                            className="group h-16 border-b border-stone-200 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/20"
                          >
                            {/* Checkbox */}
                            <td className="w-12 px-4">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) => onSelectId?.(campaign.id, !!checked)}
                                aria-label={`Select ${campaign.name}`}
                              />
                            </td>

                            {/* Campaign Name */}
                            <td className="px-3">
                              <div className="flex items-center gap-3">
                                {campaign.coverImageUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={campaign.coverImageUrl}
                                    alt=""
                                    className="size-10 shrink-0 rounded-md object-cover"
                                  />
                                ) : (
                                  <div className="size-10 shrink-0 rounded-md bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600" />
                                )}
                                <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                                  {campaign.name}
                                </span>
                              </div>
                            </td>

                            {/* Members */}
                            <td className="w-[187px] px-3">
                              <div className="flex items-center gap-2">
                                <UsersRound className="size-4 text-stone-400 dark:text-stone-500" />
                                <span className="text-sm text-stone-900 dark:text-stone-100">
                                  {campaign.creatorCount}
                                </span>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="w-[140px] px-3">
                              <span
                                className={cn(
                                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                  badge.className
                                )}
                              >
                                {badge.label}
                              </span>
                            </td>

                            {/* Start Date */}
                            <td className="w-[160px] px-3">
                              <span className="text-sm text-stone-900 dark:text-stone-100">
                                {formatDate(campaign.startDate)}
                              </span>
                            </td>

                            {/* End Date */}
                            <td className="w-[160px] px-3">
                              <span className="text-sm text-stone-900 dark:text-stone-100">
                                {formatDate(campaign.endDate)}
                              </span>
                            </td>

                            {/* Column Title (customizable) */}
                            <td className="px-3">
                              <span className="text-sm text-stone-500 dark:text-stone-400">—</span>
                            </td>

                            {/* Actions */}
                            <td className="w-[195px] px-3">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onViewCampaign?.(campaign.id)}
                                >
                                  Action
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="size-9"
                                  aria-label="More actions"
                                >
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={itemCount}
                  pageSize={pageSize}
                  onPageChange={onPageChange ?? (() => {})}
                  className="border-t border-stone-200 dark:border-stone-800"
                />
              </div>
            )}
          </div>
        </TabsContent>

        {/* ─── Analytics Tab ──────────────────────────────────── */}
        <TabsContent value="analytics" className="m-0 flex-1 overflow-y-auto">
          {analyticsProps ? (
            <CampaignAnalyticsTab {...analyticsProps} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-sm text-muted-foreground">
              Campaign analytics — coming soon
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { CampaignsPage, type CampaignsPageProps }
