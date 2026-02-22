import * as React from "react"
import { cn } from "@/lib/utils"

export type ActivityType =
  | "content_submitted"
  | "brief_signed"
  | "comment_added"
  | "brief_edit_requested"
  | "new_applicant"
  | "payment_sent"
  | "message_received"

interface ActivityItemProps {
  type: ActivityType
  title: string
  description?: string
  comment?: string
  thumbnails?: string[]
  timestamp: string
  actionLabel?: string
  onAction?: () => void
  isLast?: boolean
  className?: string
}

const typeConfig: Record<ActivityType, { label: string; dotColor: string; labelColor: string }> = {
  content_submitted:     { label: "CONTENT SUBMITTED",   dotColor: "bg-blue-500",   labelColor: "text-blue-600   dark:text-blue-400" },
  brief_signed:          { label: "BRIEF SIGNED",         dotColor: "bg-green-500",  labelColor: "text-green-600  dark:text-green-400" },
  comment_added:         { label: "COMMENT ADDED",        dotColor: "bg-amber-500",  labelColor: "text-amber-600  dark:text-amber-400" },
  brief_edit_requested:  { label: "BRIEF EDIT REQUESTED", dotColor: "bg-orange-500", labelColor: "text-orange-600 dark:text-orange-400" },
  new_applicant:         { label: "NEW APPLICANT",        dotColor: "bg-purple-500", labelColor: "text-purple-600 dark:text-purple-400" },
  payment_sent:          { label: "PAYMENT SENT",         dotColor: "bg-teal-500",   labelColor: "text-teal-600   dark:text-teal-400" },
  message_received:      { label: "MESSAGE RECEIVED",     dotColor: "bg-slate-400",  labelColor: "text-slate-500  dark:text-slate-400" },
}

function ActivityItem({
  type,
  title,
  description,
  comment,
  thumbnails,
  timestamp,
  actionLabel,
  onAction,
  isLast = false,
  className,
}: ActivityItemProps) {
  const config = typeConfig[type]

  return (
    <div className={cn("relative flex gap-3", className)}>
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div className={cn("mt-1 size-2.5 shrink-0 rounded-full ring-2 ring-background", config.dotColor)} />
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>

      {/* Content */}
      <div className={cn("min-w-0 pb-6", isLast && "pb-0")}>
        <p className={cn("text-[10px] font-bold tracking-widest", config.labelColor)}>
          {config.label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-foreground">{title}</p>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}

        {comment && (
          <blockquote className="mt-2 rounded-md border-l-2 border-primary/40 bg-muted/40 pl-3 pr-2 py-2 text-sm text-foreground/80 italic">
            "{comment}"
          </blockquote>
        )}

        {thumbnails && thumbnails.length > 0 && (
          <div className="mt-2 flex gap-2">
            {thumbnails.map((src, i) => (
              <div
                key={i}
                className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
            {thumbnails.length === 0 && (
              <div className="h-16 w-16 rounded-md bg-muted" />
            )}
          </div>
        )}

        <div className="mt-1.5 flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          {actionLabel && (
            <button
              onClick={onAction}
              className="text-xs font-medium text-primary hover:underline"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { ActivityItem, type ActivityItemProps }
