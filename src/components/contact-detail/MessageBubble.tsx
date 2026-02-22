import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MessageBubbleProps {
  author: string
  email?: string
  avatarUrl?: string
  initials?: string
  timestamp: string
  body: string
  isOwn?: boolean
  className?: string
}

function MessageBubble({
  author,
  email,
  avatarUrl,
  initials,
  timestamp,
  body,
  isOwn = false,
  className,
}: MessageBubbleProps) {
  return (
    <div className={cn("flex gap-3", isOwn && "flex-row-reverse", className)}>
      <Avatar className="size-8 shrink-0 mt-0.5">
        {avatarUrl && <AvatarImage src={avatarUrl} alt={author} />}
        <AvatarFallback className="text-xs">
          {initials ?? author.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex min-w-0 flex-col gap-1", isOwn && "items-end")}>
        <div className={cn("flex items-baseline gap-2", isOwn && "flex-row-reverse")}>
          <span className="text-sm font-semibold text-foreground">{author}</span>
          {email && <span className="text-xs text-muted-foreground">{email}</span>}
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div
          className={cn(
            "max-w-prose rounded-2xl px-4 py-2.5 text-sm",
            isOwn
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm bg-muted text-foreground"
          )}
        >
          {body}
        </div>
      </div>
    </div>
  )
}

export { MessageBubble, type MessageBubbleProps }
