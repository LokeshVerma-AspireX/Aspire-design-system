"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string
  sender: string
  initials: string
  preview: string
  time: string
  unread: boolean
}

// ─── Sample data ─────────────────────────────────────────────────────────────

const SAMPLE_MESSAGES: Message[] = [
  { id: "m1", sender: "Sophia Turner", initials: "ST", preview: "Hi! I've uploaded all the content for this week. Let me know if you need any revisions.", time: "2h ago", unread: true },
  { id: "m2", sender: "Marcus Lee", initials: "ML", preview: "Quick question about the creative brief — can we include outdoor shots?", time: "5h ago", unread: true },
  { id: "m3", sender: "Aisha Johnson", initials: "AJ", preview: "Thanks for the feedback! I'll make those changes and resubmit by tomorrow.", time: "1d ago", unread: false },
  { id: "m4", sender: "Dylan Park", initials: "DP", preview: "Hey, I was wondering if there's flexibility on the deadline for the TikTok video?", time: "2d ago", unread: false },
  { id: "m5", sender: "Priya Sharma", initials: "PS", preview: "All 4 stories have been posted! Check my Instagram for the latest updates.", time: "3d ago", unread: false },
]

// ─── Component ───────────────────────────────────────────────────────────────

function InboxTab({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 p-6", className)}>
      <div className="rounded-xl border border-stone-200 dark:border-stone-800">
        <div className="flex flex-col divide-y divide-stone-200 dark:divide-stone-800">
          {SAMPLE_MESSAGES.map((msg) => (
            <button
              key={msg.id}
              className={cn(
                "flex items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-stone-50 dark:hover:bg-stone-900/20",
                msg.unread && "bg-stone-50/50 dark:bg-stone-900/10"
              )}
            >
              <Avatar className="size-10 shrink-0">
                <AvatarFallback className="bg-stone-200 text-xs font-medium text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                  {msg.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("text-sm", msg.unread ? "font-semibold text-stone-900 dark:text-stone-100" : "font-medium text-stone-700 dark:text-stone-300")}>
                    {msg.sender}
                  </span>
                  <span className="shrink-0 text-xs text-stone-500 dark:text-stone-400">{msg.time}</span>
                </div>
                <p className="truncate text-sm text-stone-500 dark:text-stone-400">{msg.preview}</p>
              </div>
              {msg.unread && (
                <div className="mt-2 size-2 shrink-0 rounded-full bg-blue-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export { InboxTab }
