"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface ContentPost {
  id: string
  thumbnailUrl?: string
  likes?: number
  comments?: number
  platform?: "instagram" | "tiktok" | "youtube"
}

type HighlightTab = "recent" | "branded" | "portfolio"

interface ContentHighlightsProps {
  recentPosts?: ContentPost[]
  brandedContent?: ContentPost[]
  portfolio?: ContentPost[]
  activeTab?: HighlightTab
  onTabChange?: (tab: HighlightTab) => void
  className?: string
}

function PostGrid({ posts }: { posts: ContentPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border bg-muted/30 py-12">
        <p className="text-sm text-muted-foreground">No content yet</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-1.5">
      {posts.map((post) => (
        <div
          key={post.id}
          className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
        >
          {post.thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.thumbnailUrl}
              alt=""
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="size-8 rounded-full bg-muted-foreground/20" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ContentHighlights({
  recentPosts = [],
  brandedContent = [],
  portfolio = [],
  activeTab = "recent",
  onTabChange,
  className,
}: ContentHighlightsProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Tabs
        value={activeTab}
        onValueChange={(v) => onTabChange?.(v as HighlightTab)}
      >
        <TabsList variant="line" className="h-8 gap-0 rounded-none bg-transparent p-0 border-b w-full justify-start">
          <TabsTrigger value="recent"   className="h-8 rounded-none px-3 text-xs">Recent Posts</TabsTrigger>
          <TabsTrigger value="branded"  className="h-8 rounded-none px-3 text-xs">Branded Content</TabsTrigger>
          <TabsTrigger value="portfolio" className="h-8 rounded-none px-3 text-xs">Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="recent"    className="mt-3"><PostGrid posts={recentPosts} /></TabsContent>
        <TabsContent value="branded"   className="mt-3"><PostGrid posts={brandedContent} /></TabsContent>
        <TabsContent value="portfolio" className="mt-3"><PostGrid posts={portfolio} /></TabsContent>
      </Tabs>
    </div>
  )
}

export { ContentHighlights, type ContentHighlightsProps, type ContentPost, type HighlightTab }
