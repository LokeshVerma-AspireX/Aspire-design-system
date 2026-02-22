"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ThreadList, type ThreadPreview } from "./ThreadList"
import { ThreadDetail, type ThreadMessage } from "./ThreadDetail"

interface InboxTabProps {
  threads: ThreadPreview[]
  activeThreadId?: string
  subject?: string
  messageCount?: number
  assignedTo?: string[]
  messages?: ThreadMessage[]
  onSelectThread?: (id: string) => void
  className?: string
}

function InboxTab({
  threads,
  activeThreadId,
  subject = "Collaboration Brief Terms",
  messageCount,
  assignedTo,
  messages = [],
  onSelectThread,
  className,
}: InboxTabProps) {
  const [reply, setReply] = React.useState("")
  const [search, setSearch] = React.useState("")
  const [localActive, setLocalActive] = React.useState(activeThreadId ?? threads[0]?.id)

  const handleSelect = (id: string) => {
    setLocalActive(id)
    onSelectThread?.(id)
  }

  return (
    <div className={cn("flex h-full overflow-hidden", className)}>
      {/* Left pane: thread list */}
      <div className="w-80 shrink-0">
        <ThreadList
          threads={threads}
          activeThreadId={localActive}
          onSelectThread={handleSelect}
          searchValue={search}
          onSearchChange={setSearch}
          className="h-full"
        />
      </div>

      {/* Right pane: thread detail */}
      <div className="flex flex-1 flex-col overflow-hidden border-l border-border">
        {localActive ? (
          <ThreadDetail
            subject={subject}
            messageCount={messageCount}
            assignedTo={assignedTo}
            messages={messages}
            replyValue={reply}
            onReplyChange={setReply}
            onSendReply={() => setReply("")}
            className="h-full"
          />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  )
}

export { InboxTab, type InboxTabProps }
