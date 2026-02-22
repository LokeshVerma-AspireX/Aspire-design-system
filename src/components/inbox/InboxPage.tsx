"use client"

import * as React from "react"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThreadList } from "./ThreadList"
import { ThreadDetail } from "./ThreadDetail"
import type { Thread } from "./types"

// Re-export types so story files only need one import
export type { Thread, Message, Participant, Assignee } from "./types"

interface InboxPageProps {
  threads?: Thread[]
  defaultSelectedThreadId?: string
  className?: string
}

function InboxPage({
  threads = [],
  defaultSelectedThreadId,
  className,
}: InboxPageProps) {
  const [selectedId, setSelectedId] = React.useState<string | undefined>(
    defaultSelectedThreadId ?? threads[0]?.id
  )

  const selectedThread = threads.find((t) => t.id === selectedId)

  return (
    <div className={cn("flex h-full overflow-hidden bg-background", className)}>
      {/* Left pane — fixed width thread list */}
      <div className="w-80 shrink-0 flex flex-col overflow-hidden">
        <ThreadList
          threads={threads}
          selectedThreadId={selectedId}
          onSelectThread={setSelectedId}
        />
      </div>

      {/* Right pane — thread detail or empty state */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedThread ? (
          <ThreadDetail thread={selectedThread} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
            <Mail className="size-10 opacity-20" />
            <p className="text-sm">Select a conversation to read</p>
          </div>
        )}
      </div>
    </div>
  )
}

export { InboxPage }
