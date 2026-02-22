import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Thread } from "./types"

interface ThreadHeaderProps {
  thread: Thread
  className?: string
}

function ThreadHeader({ thread, className }: ThreadHeaderProps) {
  const msgCount = thread.messages.length

  return (
    <div
      className={cn(
        "border-b border-border bg-background px-6 py-4 shrink-0",
        className
      )}
    >
      <h2 className="text-base font-semibold text-foreground leading-tight">
        {thread.subject}
      </h2>

      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <span className="text-xs text-muted-foreground">
          {msgCount} {msgCount === 1 ? "Message" : "Messages"}
        </span>

        {thread.assignees.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Assigned to:</span>
            <div className="flex items-center gap-2">
              {thread.assignees.map((a, i) => (
                <div key={a.name} className="flex items-center gap-1">
                  {i > 0 && (
                    <span className="text-muted-foreground/40 text-xs">,</span>
                  )}
                  <Avatar className="size-5">
                    {a.avatarUrl && (
                      <AvatarImage src={a.avatarUrl} alt={a.name} />
                    )}
                    <AvatarFallback className="text-[9px]">
                      {a.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-foreground">{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { ThreadHeader }
