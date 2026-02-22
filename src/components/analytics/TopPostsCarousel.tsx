"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { PlatformIcon, PLATFORM_COLOR, type Platform } from "./PlatformIcon"

export interface TopPost {
  id: string
  thumbnailUrl?: string
  platform: Platform
  impressions: number
  engagementRate: number
  creatorName: string
  creatorInitials?: string
}

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

function TopPostCard({ post }: { post: TopPost }) {
  const initials = post.creatorInitials ?? post.creatorName.slice(0, 2).toUpperCase()
  return (
    <div className="relative flex-none w-36 overflow-hidden rounded-xl border border-border bg-muted">
      {/* Thumbnail */}
      <div className="aspect-[4/5] bg-gradient-to-br from-muted-foreground/10 to-muted-foreground/25 flex items-center justify-center">
        {post.thumbnailUrl ? (
          <img src={post.thumbnailUrl} alt={`${post.creatorName} post`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl font-bold text-muted-foreground/30">{initials}</span>
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
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2.5 py-2">
        <p className="text-[11px] font-bold text-white">{formatK(post.impressions)}</p>
        <p className="text-[10px] text-white/70">{post.engagementRate.toFixed(1)}% eng.</p>
      </div>
    </div>
  )
}

interface TopPostsCarouselProps {
  posts: TopPost[]
  className?: string
}

function TopPostsCarousel({ posts, className }: TopPostsCarouselProps) {
  if (posts.length === 0) {
    return (
      <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
        <h3 className="mb-4 text-sm font-semibold text-foreground">Top Performing Posts</h3>
        <p className="text-sm text-muted-foreground">No posts to display.</p>
      </div>
    )
  }

  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
      <h3 className="mb-4 text-sm font-semibold text-foreground">Top Performing Posts</h3>
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
        {posts.map((post) => (
          <TopPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export { TopPostsCarousel, type TopPostsCarouselProps }
