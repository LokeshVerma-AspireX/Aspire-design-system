"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ThreadPreview {
  id: string
  author: string
  avatarUrl?: string
  initials?: string
  subject: string
  preview: string
  timestamp: string
  unreadCount?: number
  isActive?: boolean
}

interface ThreadListProps {
  threads: ThreadPreview[]
  activeThreadId?: string
  onSelectThread?: (id: string) => void
  searchValue?: string
  onSearchChange?: (v: string) => void
  className?: string
}

function ThreadList({
  threads,
  activeThreadId,
  onSelectThread,
  searchValue = "",
  onSearchChange,
  className,
}: ThreadListProps) {
  const filtered = threads.filter(
    (t) =>
      !searchValue ||
      t.author.toLowerCase().includes(searchValue.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <div className={cn("flex flex-col h-full border-r border-border bg-card", className)}>
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2.5 py-1.5">
          <Search className="size-3.5 shrink-0 text-muted-foreground" />
          <input
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search conversations…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Thread items */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No conversations found.</p>
        ) : (
          filtered.map((thread) => {
            const isActive = thread.id === activeThreadId
            return (
              <button
                key={thread.id}
                onClick={() => onSelectThread?.(thread.id)}
                className={cn(
                  "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors border-b border-border/50",
                  "hover:bg-muted/50",
                  isActive && "bg-primary/5 border-l-2 border-l-primary"
                )}
              >
                <Avatar className="size-8 mt-0.5 shrink-0">
                  {thread.avatarUrl && <AvatarImage src={thread.avatarUrl} alt={thread.author} />}
                  <AvatarFallback className="text-xs">
                    {thread.initials ?? thread.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm font-semibold text-foreground truncate">{thread.author}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{thread.timestamp}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground/80 truncate">{thread.subject}</span>
                  <span className="text-xs text-muted-foreground truncate">{thread.preview}</span>
                </div>
                {(thread.unreadCount ?? 0) > 0 && (
                  <span className="mt-1 flex h-4.5 min-w-4.5 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground px-1">
                    {thread.unreadCount}
                  </span>
                )}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

export { ThreadList, type ThreadListProps, type ThreadPreview }
