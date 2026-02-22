"use client"

import * as React from "react"
import { ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlatformIcon, PLATFORM_TEXT_COLOR, type Platform } from "./PlatformIcon"

export interface PostTableRow {
  id: string
  thumbnailUrl?: string
  platform: Platform
  creatorName: string
  creatorInitials: string
  impressions: number
  engagement: number
  reach: number
  date: string
}

type SortKey = "impressions" | "engagement" | "reach" | "date"

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

interface PostsTableProps {
  posts: PostTableRow[]
  className?: string
}

function SortableHeader({
  children,
  sortKey,
  activeSortKey,
  dir,
  onSort,
}: {
  children: React.ReactNode
  sortKey: SortKey
  activeSortKey: SortKey
  dir: "asc" | "desc"
  onSort: (key: SortKey) => void
}) {
  const isActive = sortKey === activeSortKey
  return (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground"
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <ArrowUpDown
          className={cn("size-3 transition-opacity", isActive ? "opacity-100" : "opacity-40")}
        />
      </span>
    </th>
  )
}

function PostsTable({ posts, className }: PostsTableProps) {
  const [sortKey, setSortKey] = React.useState<SortKey>("impressions")
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc")

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const sorted = [...posts].sort((a, b) => {
    const av = sortKey === "date" ? new Date(a.date).getTime() : (a[sortKey] as number)
    const bv = sortKey === "date" ? new Date(b.date).getTime() : (b[sortKey] as number)
    return sortDir === "asc" ? (av < bv ? -1 : 1) : av > bv ? -1 : 1
  })

  const sharedSortProps = { activeSortKey: sortKey, dir: sortDir, onSort: handleSort }

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border", className)}>
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Post</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Creator</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Platform</th>
            <SortableHeader sortKey="impressions" {...sharedSortProps}>Impressions</SortableHeader>
            <SortableHeader sortKey="engagement"  {...sharedSortProps}>Engagement</SortableHeader>
            <SortableHeader sortKey="reach"       {...sharedSortProps}>Reach</SortableHeader>
            <SortableHeader sortKey="date"        {...sharedSortProps}>Date</SortableHeader>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sorted.map((post) => (
            <tr key={post.id} className="bg-background hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3">
                <div className="size-10 overflow-hidden rounded-md bg-muted">
                  {post.thumbnailUrl ? (
                    <img src={post.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-muted-foreground/40">
                      {post.creatorInitials.slice(0, 1)}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                    {post.creatorInitials}
                  </div>
                  <span className="font-medium text-foreground">{post.creatorName}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 capitalize text-sm",
                    PLATFORM_TEXT_COLOR[post.platform]
                  )}
                >
                  <PlatformIcon platform={post.platform} className="size-3.5" />
                  {post.platform}
                </span>
              </td>
              <td className="px-4 py-3 font-medium text-foreground">{formatK(post.impressions)}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatK(post.engagement)}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatK(post.reach)}</td>
              <td className="px-4 py-3 text-muted-foreground">{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { PostsTable, type PostsTableProps }
