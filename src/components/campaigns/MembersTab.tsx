"use client"

import * as React from "react"
import {
  ChevronDown,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pagination } from "@/components/shared/Pagination"
import { CreatorDetailDrawer, type Creator } from "./CreatorDetailDrawer"

// ─── Types ───────────────────────────────────────────────────────────────────

export type CreatorStatus = "Approved" | "Invited" | "Pending" | "Declined"

export interface CampaignCreatorRow {
  id: string
  name: string
  email: string
  avatarUrl?: string
  deliverables: string
  content: string
  offer: string
  status: CreatorStatus
}

interface MembersTabProps {
  creators?: CampaignCreatorRow[]
  onInviteCreators?: () => void
  className?: string
}

// ─── Status badge config ─────────────────────────────────────────────────────

const statusConfig: Record<CreatorStatus, string> = {
  Approved: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Invited: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Declined: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
}

// ─── Sample data ─────────────────────────────────────────────────────────────

const SAMPLE_CREATORS: CampaignCreatorRow[] = [
  { id: "1", name: "Sophia Turner", email: "sophia.turner@gmail.com", deliverables: "3 posts, 2 stories", content: "5 submitted", offer: "$250.00", status: "Approved" },
  { id: "2", name: "Marcus Lee", email: "marcus.lee@creator.co", deliverables: "2 reels", content: "0 submitted", offer: "$180.00", status: "Invited" },
  { id: "3", name: "Aisha Johnson", email: "aisha.j@media.com", deliverables: "5 posts", content: "3 submitted", offer: "$400.00", status: "Approved" },
  { id: "4", name: "Dylan Park", email: "dylan.park@tiktok.co", deliverables: "1 video", content: "0 submitted", offer: "$150.00", status: "Pending" },
  { id: "5", name: "Priya Sharma", email: "priya.s@influence.io", deliverables: "4 stories", content: "4 submitted", offer: "$320.00", status: "Approved" },
  { id: "6", name: "Liam Chen", email: "liam.chen@creator.net", deliverables: "2 posts", content: "1 submitted", offer: "$200.00", status: "Declined" },
  { id: "7", name: "Emma Wilson", email: "emma.w@brandco.com", deliverables: "3 reels, 1 post", content: "0 submitted", offer: "$350.00", status: "Invited" },
  { id: "8", name: "Noah Garcia", email: "noah.g@lifestyle.co", deliverables: "2 posts", content: "2 submitted", offer: "$175.00", status: "Approved" },
  { id: "9", name: "Olivia Kim", email: "olivia.kim@beauty.co", deliverables: "6 posts", content: "5 submitted", offer: "$500.00", status: "Approved" },
  { id: "10", name: "James Brown", email: "james.b@sport.io", deliverables: "1 reel", content: "0 submitted", offer: "$120.00", status: "Invited" },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// ─── Quick Filter Row ────────────────────────────────────────────────────────

type QuickFilterValue = "all" | "invited" | "approved" | "declined"

function QuickFilterRow({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: QuickFilterValue
  onFilterChange: (f: QuickFilterValue) => void
}) {
  const filters: { id: QuickFilterValue; label: string; width: string }[] = [
    { id: "all", label: "All Creators", width: "w-[182px]" },
    { id: "invited", label: "Invited", width: "w-[129px]" },
    { id: "approved", label: "Approved", width: "w-[130px]" },
    { id: "declined", label: "Declined", width: "w-[128px]" },
  ]

  return (
    <div className="flex items-center gap-2 border-b border-stone-200 px-6 py-2.5 dark:border-stone-800">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onFilterChange(f.id)}
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm transition-colors",
            activeFilter === f.id
              ? "border-primary bg-primary text-primary-foreground"
              : "border-stone-200 bg-background text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
          )}
        >
          {f.label}
          {f.id !== "all" && <ChevronDown className="size-3.5 opacity-50" />}
        </button>
      ))}
      <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-stone-200 px-3 text-sm text-stone-500 transition-colors hover:text-stone-700 dark:border-stone-700 dark:text-stone-400 dark:hover:text-stone-300">
        <Plus className="size-3.5" />
        More Filters
      </button>
    </div>
  )
}

// ─── MembersTab ──────────────────────────────────────────────────────────────

function MembersTab({
  creators,
  onInviteCreators,
  className,
}: MembersTabProps) {
  const data = creators ?? SAMPLE_CREATORS
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [searchValue, setSearchValue] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState<QuickFilterValue>("all")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [drawerCreator, setDrawerCreator] = React.useState<Creator | null>(null)

  // Filter data
  const filteredData = React.useMemo(() => {
    let result = data
    if (activeFilter !== "all") {
      const statusMap: Record<string, CreatorStatus> = {
        invited: "Invited",
        approved: "Approved",
        declined: "Declined",
      }
      result = result.filter((c) => c.status === statusMap[activeFilter])
    }
    if (searchValue) {
      const q = searchValue.toLowerCase()
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      )
    }
    return result
  }, [data, activeFilter, searchValue])

  const allSelected = filteredData.length > 0 && filteredData.every((c) => selectedIds.has(c.id))
  const someSelected = filteredData.some((c) => selectedIds.has(c.id)) && !allSelected

  function handleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedIds(new Set(filteredData.map((c) => c.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  function handleSelect(id: string, checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  function openDrawer(row: CampaignCreatorRow) {
    setDrawerCreator({
      id: row.id,
      name: row.name,
      email: row.email,
      avatarUrl: row.avatarUrl,
      handle: `@${row.name.toLowerCase().replace(/\s+/g, "")}`,
      platforms: ["Instagram", "TikTok"],
      followers: 125000,
      engagementRate: 4.8,
      avgViews: 45000,
      postsPerMonth: 12,
      status: row.status,
      offer: row.offer,
      deliverables: row.deliverables,
      contentSubmitted: [
        { type: "Instagram Post", date: "Feb 10, 2026", platform: "Instagram" },
        { type: "TikTok Video", date: "Feb 15, 2026", platform: "TikTok" },
        { type: "Instagram Story", date: "Feb 18, 2026", platform: "Instagram" },
      ],
      activity: [
        { action: "Invited to campaign", date: "Jan 15, 2026" },
        { action: "Accepted invitation", date: "Jan 17, 2026" },
        { action: "Viewed creative brief", date: "Jan 20, 2026" },
        { action: "Content submitted", date: "Feb 10, 2026" },
      ],
    })
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Quick Filter Row */}
      <QuickFilterRow activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Table content */}
      <div className="flex-1 overflow-auto px-6 pb-6 pt-4">
        <div className="overflow-clip rounded-xl border border-stone-200 shadow-sm dark:border-stone-800">
          {/* Table Action Bar */}
          <div className="flex items-center justify-between gap-3 border-b border-stone-200 bg-background px-4 py-2.5 dark:border-stone-800">
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Invite
              </Button>
              <Button
                size="sm"
                variant="outline"
              >
                Message
              </Button>
              <Button
                size="sm"
                variant="outline"
              >
                Export
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search..."
                  className="h-9 w-[200px] pl-9"
                />
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={cn(
                    "inline-flex size-9 items-center justify-center rounded-md border transition-colors",
                    viewMode === "grid"
                      ? "border-stone-300 bg-stone-100 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
                      : "border-transparent text-stone-400 hover:text-stone-600 dark:text-stone-500"
                  )}
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={cn(
                    "inline-flex size-9 items-center justify-center rounded-md border transition-colors",
                    viewMode === "list"
                      ? "border-stone-300 bg-stone-100 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
                      : "border-transparent text-stone-400 hover:text-stone-600 dark:text-stone-500"
                  )}
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium text-stone-900 dark:text-stone-100">No creators yet</p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Invite creators to join this campaign.
              </p>
              <Button
                size="sm"
                className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={onInviteCreators}
              >
                Invite Creators
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="h-16 border-b border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/30">
                    <th className="w-12 px-4">
                      <Checkbox
                        checked={allSelected ? true : someSelected ? "indeterminate" : false}
                        onCheckedChange={(checked) => handleSelectAll(!!checked)}
                        aria-label="Select all"
                      />
                    </th>
                    <th className="min-w-[300px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                      Creator
                    </th>
                    <th className="w-[167px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                      Deliverables
                    </th>
                    <th className="w-[167px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                      Content
                    </th>
                    <th className="w-[167px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                      Offer
                    </th>
                    <th className="w-[167px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">
                      Status
                    </th>
                    <th className="w-[195px] px-3 text-right text-sm font-medium text-stone-500 dark:text-stone-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((creator) => {
                    const isSelected = selectedIds.has(creator.id)
                    return (
                      <tr
                        key={creator.id}
                        className="group h-16 border-b border-stone-200 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/20"
                      >
                        {/* Checkbox */}
                        <td className="w-12 px-4">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) => handleSelect(creator.id, !!checked)}
                            aria-label={`Select ${creator.name}`}
                          />
                        </td>

                        {/* Creator */}
                        <td className="px-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-10 shrink-0">
                              <AvatarImage src={creator.avatarUrl} alt={creator.name} />
                              <AvatarFallback className="bg-stone-200 text-xs font-medium text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                                {getInitials(creator.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                                {creator.name}
                              </span>
                              <span className="text-[13px] text-stone-500 dark:text-stone-400">
                                {creator.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Deliverables */}
                        <td className="w-[167px] px-3">
                          <span className="text-sm text-stone-900 dark:text-stone-100">
                            {creator.deliverables}
                          </span>
                        </td>

                        {/* Content */}
                        <td className="w-[167px] px-3">
                          <span className="text-sm text-stone-900 dark:text-stone-100">
                            {creator.content}
                          </span>
                        </td>

                        {/* Offer */}
                        <td className="w-[167px] px-3">
                          <span className="text-sm text-stone-900 dark:text-stone-100">
                            {creator.offer}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="w-[167px] px-3">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              statusConfig[creator.status]
                            )}
                          >
                            {creator.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="w-[195px] px-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                              onClick={() => openDrawer(creator)}
                            >
                              View Profile
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="size-9"
                                  aria-label="More actions"
                                >
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openDrawer(creator)}>
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>Send Message</DropdownMenuItem>
                                <DropdownMenuItem>Edit Offer</DropdownMenuItem>
                                <DropdownMenuItem>Remove from Campaign</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive">
                                  Block Creator
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {filteredData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.max(1, Math.ceil(filteredData.length / 50))}
              totalItems={filteredData.length}
              pageSize={50}
              onPageChange={setCurrentPage}
              className="border-t border-stone-200 dark:border-stone-800"
            />
          )}
        </div>
      </div>

      {/* Creator Detail Drawer */}
      <CreatorDetailDrawer
        creator={drawerCreator}
        open={!!drawerCreator}
        onOpenChange={(open) => !open && setDrawerCreator(null)}
      />
    </div>
  )
}

export { MembersTab, type MembersTabProps }
