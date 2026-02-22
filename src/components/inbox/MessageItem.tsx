"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { Message } from "./types"

interface MessageItemProps {
  message: Message
  className?: string
}

function MessageItem({ message, className }: MessageItemProps) {
  const { sender, sentAt, content } = message

  const dateStr = new Date(sentAt).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  const paragraphs = content.split("\n\n").filter(Boolean)

  return (
    <div className={cn("flex gap-4 px-6 py-5", className)}>
      <Avatar className="size-9 shrink-0 mt-0.5">
        {sender.avatarUrl && (
          <AvatarImage src={sender.avatarUrl} alt={sender.name} />
        )}
        <AvatarFallback className="text-xs">{sender.initials}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        {/* Sender header row */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-sm font-semibold text-foreground shrink-0">
              {sender.name}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              &lt;{sender.email}&gt;
            </span>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
            {dateStr}
          </span>
        </div>

        <Separator className="my-3" />

        {/* Message body — double-newline separated paragraphs */}
        <div className="text-sm text-foreground leading-relaxed space-y-3">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export { MessageItem }
export type { Message }
