"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MessageBubble } from "./MessageBubble"

interface ThreadMessage {
  id: string
  author: string
  email?: string
  avatarUrl?: string
  initials?: string
  timestamp: string
  body: string
  isOwn?: boolean
}

interface ThreadDetailProps {
  subject: string
  messageCount?: number
  assignedTo?: string[]
  messages: ThreadMessage[]
  replyValue?: string
  onReplyChange?: (v: string) => void
  onSendReply?: () => void
  className?: string
}

function ThreadDetail({
  subject,
  messageCount,
  assignedTo,
  messages,
  replyValue = "",
  onReplyChange,
  onSendReply,
  className,
}: ThreadDetailProps) {
  return (
    <div className={cn("flex h-full flex-col bg-background", className)}>
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-border px-5 py-4">
        <h2 className="text-base font-semibold text-foreground">{subject}</h2>
        <div className="flex items-center gap-3">
          {messageCount != null && (
            <span className="text-xs text-muted-foreground">{messageCount} Messages</span>
          )}
          {assignedTo && assignedTo.length > 0 && (
            <span className="text-xs text-muted-foreground">
              Assigned to:{" "}
              <span className="font-medium text-foreground">{assignedTo.join(", ")}</span>
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-5 px-5 py-5">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            author={msg.author}
            email={msg.email}
            avatarUrl={msg.avatarUrl}
            initials={msg.initials}
            timestamp={msg.timestamp}
            body={msg.body}
            isOwn={msg.isOwn}
          />
        ))}
      </div>

      {/* Reply input */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-end gap-2 rounded-xl border border-input bg-background p-2">
          <textarea
            value={replyValue}
            onChange={(e) => onReplyChange?.(e.target.value)}
            placeholder="Write a reply…"
            rows={2}
            className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button
            size="sm"
            onClick={onSendReply}
            disabled={!replyValue.trim()}
            className="h-8 shrink-0 gap-1.5 bg-foreground text-background hover:bg-foreground/85"
          >
            <Send className="size-3.5" />
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

export { ThreadDetail, type ThreadDetailProps, type ThreadMessage }
