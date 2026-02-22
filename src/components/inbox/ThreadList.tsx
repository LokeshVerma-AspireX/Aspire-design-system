"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThreadItem } from "./ThreadItem"
import type { Thread } from "./types"

interface ThreadListProps {
  threads: Thread[]
  selectedThreadId?: string
  onSelectThread?: (threadId: string) => void
  className?: string
}

function ThreadList({
  threads,
  selectedThreadId,
  onSelectThread,
  className,
}: ThreadListProps) {
  const [query, setQuery] = React.useState("")

  const filtered = query.trim()
    ? threads.filter(
        (t) =>
          t.subject.toLowerCase().includes(query.toLowerCase()) ||
          t.senderName.toLowerCase().includes(query.toLowerCase()) ||
          t.snippet.toLowerCase().includes(query.toLowerCase())
      )
    : threads

  const unreadCount = threads.filter((t) => t.unread).length

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-border bg-background",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">Inbox</h2>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-semibold leading-none text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="border-b border-border px-3 py-2.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 pl-8 text-xs"
          />
        </div>
      </div>

      {/* Thread items */}
      <ScrollArea className="flex-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center text-sm text-muted-foreground">
            {query ? "No matching conversations" : "Your inbox is empty"}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((thread) => (
              <ThreadItem
                key={thread.id}
                thread={thread}
                selected={thread.id === selectedThreadId}
                onClick={() => onSelectThread?.(thread.id)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export { ThreadList }
