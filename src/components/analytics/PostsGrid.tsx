"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { PlatformIcon, PLATFORM_COLOR, type Platform } from "./PlatformIcon"
import { EmptyState } from "@/components/shared/EmptyState"
import { LayoutGrid } from "lucide-react"

export interface PostData {
  id: string
  thumbnailUrl?: string
  platform: Platform
  impressions: number
  engagementRate: number
  creatorName: string
  creatorInitials?: string
  date: string
}

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

interface PostsGridProps {
  posts: PostData[]
  className?: string
}

function PostsGrid({ posts, className }: PostsGridProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon={<LayoutGrid className="size-6" />}
        title="No posts found"
        description="Posts will appear here once creators start submitting content."
        className={className}
      />
    )
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        className
      )}
    >
      {posts.map((post) => {
        const initials = (post.creatorInitials ?? post.creatorName.slice(0, 2)).toUpperCase()
        return (
          <div
            key={post.id}
            className="relative overflow-hidden rounded-xl border border-border bg-muted cursor-pointer hover:border-foreground/30 transition-colors"
          >
            <div className="aspect-square bg-gradient-to-br from-muted-foreground/10 to-muted-foreground/25 flex items-center justify-center">
              {post.thumbnailUrl ? (
                <img src={post.thumbnailUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-muted-foreground/30">{initials}</span>
              )}
            </div>

            {/* Platform badge */}
            <div
              className={cn(
                "absolute top-2 left-2 flex size-5 items-center justify-center rounded-full",
                PLATFORM_COLOR[post.platform]
              )}
            >
              <PlatformIcon platform={post.platform} className="size-3" />
            </div>

            {/* Metric overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-2">
              <p className="text-[11px] font-bold text-white">{formatK(post.impressions)}</p>
              <p className="text-[10px] text-white/70">{post.engagementRate.toFixed(1)}% eng.</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { PostsGrid, type PostsGridProps }
