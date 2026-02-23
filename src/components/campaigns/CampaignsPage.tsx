"use client"

import * as React from "react"
import { Megaphone, Search, MoreHorizontal, Columns3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PageHeader } from "@/components/layout/PageHeader"
import { FilterBar } from "@/components/shared/FilterBar"
import { ViewToggle, type ViewMode } from "@/components/shared/ViewToggle"
import { DataTable, type ColumnDef } from "@/components/shared/DataTable"
import { Pagination } from "@/components/shared/Pagination"
import { StatusDot, type StatusVariant } from "@/components/shared/StatusDot"
import { EmptyState } from "@/components/shared/EmptyState"
import { CampaignCard, type Campaign, type CampaignStatus, type CampaignType } from "./CampaignCard"
import {
  CampaignAnalyticsTab,
  type CampaignAnalyticsTabProps,
} from "./CampaignAnalyticsTab"

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Status mapping ──────────────────────────────────────────────────────────

const statusToVariant: Record<CampaignStatus, StatusVariant> = {
  active: "active",
  paused: "paused",
  draft: "deactivated",
  completed: "active",
}

const statusLabel: Record<CampaignStatus, string> = {
  active: "Active",
  paused: "Paused",
  draft: "Draft",
  completed: "Completed",
}

const typeConfig: Record<CampaignType, { label: string; className: string }> = {
  sponsored:  { label: "Sponsored",  className: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
  gifted:     { label: "Gifted",     className: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
  affiliate:  { label: "Affiliate",  className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  ambassador: { label: "Ambassador", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`
  return `$${value}`
}

function formatDateRange(start: string, end: string): string {
  const fmt = (d: string) => {
    const date = new Date(d + "T00:00:00")
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }
  const endDate = new Date(end + "T00:00:00")
  const year = endDate.getFullYear()
  return `${fmt(start)} — ${fmt(end)}, ${year}`
}

// ─── Column definitions ──────────────────────────────────────────────────────

const columns: ColumnDef<Campaign>[] = [
  {
    id: "name",
    header: "Campaign",
    sortable: true,
    cell: (row) => (
      <div className="flex items-center gap-3">
        {row.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={row.coverImageUrl} alt="" className="size-10 shrink-0 rounded-md object-cover" />
        ) : (
          <div className="size-10 shrink-0 rounded-md bg-muted" />
        )}
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-foreground">{row.name}</span>
          <span className={cn("inline-flex w-fit items-center rounded-full px-1.5 py-px text-[10px] font-medium", typeConfig[row.type].className)}>
            {typeConfig[row.type].label}
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    className: "w-[120px]",
    cell: (row) => (
      <StatusDot status={statusToVariant[row.status]} label={statusLabel[row.status]} />
    ),
  },
  {
    id: "creators",
    header: "Creators",
    className: "w-[100px]",
    sortable: true,
    cell: (row) => <span className="text-foreground">{row.creatorCount}</span>,
  },
  {
    id: "content",
    header: "Content",
    className: "w-[100px]",
    sortable: true,
    cell: (row) => <span className="text-foreground">{row.contentCount}</span>,
  },
  {
    id: "impressions",
    header: "Impressions",
    className: "w-[120px]",
    sortable: true,
    cell: (row) => {
      const impressions = Math.round(row.revenue * 15)
      return <span className="text-foreground">{formatK(impressions)}</span>
    },
  },
  {
    id: "engagementRate",
    header: "Eng. Rate",
    className: "w-[100px]",
    cell: (row) => {
      const rate = (2 + (row.progress / 20)).toFixed(1)
      return <span className="text-foreground">{rate}%</span>
    },
  },
  {
    id: "revenue",
    header: "Revenue",
    className: "w-[110px]",
    sortable: true,
    cell: (row) => (
      <span className="font-medium text-foreground">{formatCurrency(row.revenue)}</span>
    ),
  },
  {
    id: "dateRange",
    header: "Date Range",
    className: "w-[180px]",
    cell: (row) => (
      <span className="text-sm text-muted-foreground">
        {formatDateRange(row.startDate, row.endDate)}
      </span>
    ),
  },
  {
    id: "progress",
    header: "Progress",
    className: "w-[120px]",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full",
              row.progress >= 100 ? "bg-green-500" : row.progress >= 50 ? "bg-primary" : "bg-blue-500"
            )}
            style={{ width: `${Math.min(row.progress, 100)}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{row.progress}%</span>
      </div>
    ),
  },
]

// ─── Filter options ──────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Paused", value: "paused" },
  { label: "Completed", value: "completed" },
]

const TYPE_OPTIONS = [
  { label: "Sponsored", value: "sponsored" },
  { label: "Gifted", value: "gifted" },
  { label: "Affiliate", value: "affiliate" },
  { label: "Ambassador", value: "ambassador" },
]

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
  sortKey,
  sortDirection,
  onSort,
  currentPage = 1,
  totalPages = 1,
  totalItems,
  pageSize = 10,
  onPageChange,
  onCreateCampaign,
  onViewCampaign,
  searchValue = "",
  onSearchChange,
  analyticsProps,
  className,
}: CampaignsPageProps) {
  const [internalView, setInternalView] = React.useState<ViewMode>("grid")
  const viewMode = controlledViewMode ?? internalView
  const handleViewChange = (mode: ViewMode) => {
    setInternalView(mode)
    onViewModeChange?.(mode)
  }

  const itemCount = totalItems ?? campaigns.length

  return (
    <div className={cn("flex h-full flex-col bg-background", className)}>
      {/* Page Header */}
      <PageHeader title="Campaigns" showAstra />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6">
          <TabsList className="border-0">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </div>

        {/* ─── Campaigns Tab ──────────────────────────────────── */}
        <TabsContent value="campaigns" className="m-0 flex flex-1 flex-col overflow-hidden">
          {/* Filter Bar */}
          <FilterBar
            quickFilters={[
              { id: "status", label: "Status", options: STATUS_OPTIONS },
              { id: "type", label: "Type", options: TYPE_OPTIONS },
            ]}
            onAddFilter={() => {}}
          />

          {/* Action bar */}
          <div className="flex items-center justify-between gap-3 px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {itemCount} campaign{itemCount !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="Search campaigns..."
                  className="h-9 w-64 pl-9"
                />
              </div>
              <ViewToggle value={viewMode} defaultValue="grid" onChange={handleViewChange} />
              <Button
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/85"
                onClick={onCreateCampaign}
              >
                Create Campaign
              </Button>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-auto px-6 pb-6">
            {campaigns.length === 0 ? (
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
              /* Card Grid */
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {campaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onView={onViewCampaign}
                  />
                ))}
              </div>
            ) : (
              /* Table View */
              <div className="overflow-clip rounded-xl border border-border shadow-sm">
                {/* Table toolbar */}
                <div className="flex items-center justify-between gap-3 border-b border-border bg-background px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-foreground text-background hover:bg-foreground/85"
                      onClick={onCreateCampaign}
                    >
                      Create Campaign
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="opacity-50"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Column settings"
                  >
                    <Columns3 className="size-4" />
                  </Button>
                </div>

                <DataTable
                  data={campaigns}
                  columns={columns}
                  selectedIds={selectedIds}
                  onSelectId={onSelectId}
                  onSelectAll={onSelectAll}
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={onSort}
                  rowActionLabel="View"
                  onRowAction={(row) => onViewCampaign?.(row.id)}
                  rowMenuItems={[
                    { label: "Edit", onClick: () => {} },
                    { label: "Duplicate", onClick: () => {} },
                    { label: "Archive", onClick: () => {}, variant: "destructive" },
                  ]}
                  emptyMessage="No campaigns found."
                />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={itemCount}
                  pageSize={pageSize}
                  onPageChange={onPageChange ?? (() => {})}
                  className="border-t border-border"
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
