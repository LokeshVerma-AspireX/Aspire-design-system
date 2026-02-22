"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Thread } from "./types"

export function formatRelativeTime(iso: string): string {
  const now = new Date()
  const date = new Date(iso)
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffMin < 2) return "just now"
  if (diffMin < 60) return `${diffMin} min ago`
  if (diffHour < 24) return `${diffHour}h ago`
  if (diffDay === 1) return "yesterday"
  if (diffDay < 7) return `${diffDay} days ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

interface ThreadItemProps {
  thread: Thread
  selected?: boolean
  onClick?: () => void
  className?: string
}

function ThreadItem({ thread, selected = false, onClick, className }: ThreadItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full px-4 py-3 text-left flex gap-3 transition-colors",
        selected ? "bg-muted" : "hover:bg-muted/50",
        className
      )}
    >
      {/* Blue unread dot */}
      {thread.unread && (
        <span
          aria-label="Unread"
          className="absolute left-1.5 top-1/2 -translate-y-1/2 size-2 rounded-full bg-blue-500 shrink-0"
        />
      )}

      <Avatar className="size-9 shrink-0 mt-0.5">
        {thread.senderAvatarUrl && (
          <AvatarImage src={thread.senderAvatarUrl} alt={thread.senderName} />
        )}
        <AvatarFallback className="text-xs">{thread.senderInitials}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span
            className={cn(
              "text-sm truncate leading-tight",
              thread.unread
                ? "font-semibold text-foreground"
                : "font-medium text-foreground"
            )}
          >
            {thread.senderName}
          </span>
          <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0 leading-tight mt-0.5">
            {formatRelativeTime(thread.lastMessageAt)}
          </span>
        </div>
        <p
          className={cn(
            "text-xs mt-0.5 truncate",
            thread.unread
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          )}
        >
          {thread.subject}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground truncate">
          {thread.snippet}
        </p>
      </div>
    </button>
  )
}

export { ThreadItem }
