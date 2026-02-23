"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { formatRelativeTime } from "@/lib/formatters"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Thread } from "./types"

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
            {formatRelativeTime(new Date(thread.lastMessageAt))}
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
