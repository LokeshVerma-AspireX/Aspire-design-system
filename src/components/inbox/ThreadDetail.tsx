"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ThreadHeader } from "./ThreadHeader"
import { MessageItem } from "./MessageItem"
import { ReplyComposer } from "./ReplyComposer"
import type { Thread } from "./types"

interface ThreadDetailProps {
  thread: Thread
  onSend?: (text: string) => void
  className?: string
}

function ThreadDetail({ thread, onSend, className }: ThreadDetailProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden bg-background",
        className
      )}
    >
      <ThreadHeader thread={thread} />

      <ScrollArea className="flex-1">
        <div>
          {thread.messages.map((message, i) => (
            <React.Fragment key={message.id}>
              {i > 0 && <Separator />}
              <MessageItem message={message} />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>

      <ReplyComposer onSend={onSend} />
    </div>
  )
}

export { ThreadDetail }
