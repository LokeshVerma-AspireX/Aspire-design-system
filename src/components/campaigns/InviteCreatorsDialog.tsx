"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// ─── Types ───────────────────────────────────────────────────────────────────

interface InviteCreator {
  id: string
  name: string
  handle: string
  avatarUrl?: string
  followers: number
  engagementRate: number
  platform: string
}

interface InviteCreatorsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  campaignName?: string
  creators?: InviteCreator[]
  onInvite?: (creatorIds: string[]) => void
}

// ─── Sample creators ─────────────────────────────────────────────────────────

const SAMPLE_INVITE_CREATORS: InviteCreator[] = [
  { id: "i1", name: "Zara Mitchell", handle: "@zaramitchell", followers: 285000, engagementRate: 5.2, platform: "Instagram" },
  { id: "i2", name: "Kai Nakamura", handle: "@kainakamura", followers: 520000, engagementRate: 3.8, platform: "TikTok" },
  { id: "i3", name: "Ava Chen", handle: "@avachen", followers: 150000, engagementRate: 6.1, platform: "Instagram" },
  { id: "i4", name: "Leo Rossi", handle: "@leorossi", followers: 890000, engagementRate: 4.5, platform: "YouTube" },
  { id: "i5", name: "Maya Patel", handle: "@mayapatel", followers: 340000, engagementRate: 5.8, platform: "TikTok" },
  { id: "i6", name: "Jordan Wu", handle: "@jordanwu", followers: 210000, engagementRate: 4.2, platform: "Instagram" },
  { id: "i7", name: "Chloe Park", handle: "@chloepark", followers: 175000, engagementRate: 7.1, platform: "TikTok" },
  { id: "i8", name: "Marcus Santos", handle: "@marcussantos", followers: 430000, engagementRate: 3.5, platform: "YouTube" },
  { id: "i9", name: "Nina Volkov", handle: "@ninavolkov", followers: 620000, engagementRate: 4.9, platform: "Instagram" },
  { id: "i10", name: "Owen Blake", handle: "@owenblake", followers: 95000, engagementRate: 8.3, platform: "TikTok" },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// ─── Filter chips ────────────────────────────────────────────────────────────

type PlatformFilter = "all" | "Instagram" | "TikTok" | "YouTube"

// ─── Component ───────────────────────────────────────────────────────────────

function InviteCreatorsDialog({
  open,
  onOpenChange,
  campaignName = "Summer Glow Beauty Launch",
  creators,
  onInvite,
}: InviteCreatorsDialogProps) {
  const data = creators ?? SAMPLE_INVITE_CREATORS
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [searchValue, setSearchValue] = React.useState("")
  const [platformFilter, setPlatformFilter] = React.useState<PlatformFilter>("all")

  // Filter
  const filtered = React.useMemo(() => {
    let result = data
    if (platformFilter !== "all") {
      result = result.filter((c) => c.platform === platformFilter)
    }
    if (searchValue) {
      const q = searchValue.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q)
      )
    }
    return result
  }, [data, platformFilter, searchValue])

  function handleToggle(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleInvite() {
    onInvite?.(Array.from(selectedIds))
    setSelectedIds(new Set())
    onOpenChange(false)
  }

  // Reset state when dialog opens
  React.useEffect(() => {
    if (open) {
      setSelectedIds(new Set())
      setSearchValue("")
      setPlatformFilter("all")
    }
  }, [open])

  const platforms: { id: PlatformFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "Instagram", label: "Instagram" },
    { id: "TikTok", label: "TikTok" },
    { id: "YouTube", label: "YouTube" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px] gap-0 p-0">
        <DialogHeader className="border-b border-stone-200 px-6 py-4 dark:border-stone-800">
          <DialogTitle>Invite Creators to {campaignName}</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="border-b border-stone-200 px-6 py-3 dark:border-stone-800">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search creators by name, email, or handle..."
              className="pl-9"
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-2 border-b border-stone-200 px-6 py-2.5 dark:border-stone-800">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatformFilter(p.id)}
              className={cn(
                "inline-flex h-8 items-center rounded-full px-3 text-sm font-medium transition-colors",
                platformFilter === p.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Creator list */}
        <div className="max-h-[400px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-sm text-stone-500 dark:text-stone-400">
              No creators found
            </div>
          ) : (
            <div className="flex flex-col">
              {filtered.map((creator) => {
                const isSelected = selectedIds.has(creator.id)
                return (
                  <button
                    key={creator.id}
                    onClick={() => handleToggle(creator.id)}
                    className={cn(
                      "flex items-center gap-3 border-b border-stone-100 px-6 py-3 text-left transition-colors last:border-b-0 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/20",
                      isSelected && "bg-stone-50 dark:bg-stone-900/20"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleToggle(creator.id)}
                      aria-label={`Select ${creator.name}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Avatar className="size-10 shrink-0">
                      <AvatarImage src={creator.avatarUrl} alt={creator.name} />
                      <AvatarFallback className="bg-stone-200 text-xs font-medium text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                        {getInitials(creator.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                        {creator.name}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {creator.handle}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                          {formatFollowers(creator.followers)}
                        </span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">followers</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                          {creator.engagementRate}%
                        </span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">eng.</span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="flex items-center justify-between border-t border-stone-200 px-6 py-4 dark:border-stone-800">
          <span className="text-sm text-stone-500 dark:text-stone-400">
            {selectedIds.size} creator{selectedIds.size !== 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={selectedIds.size === 0}
              onClick={handleInvite}
            >
              Send Invites
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { InviteCreatorsDialog, type InviteCreatorsDialogProps, type InviteCreator }
