"use client"

import * as React from "react"
import { Paperclip, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ReplyComposerProps {
  onSend?: (text: string) => void
  placeholder?: string
  className?: string
}

function ReplyComposer({
  onSend,
  placeholder = "Reply…",
  className,
}: ReplyComposerProps) {
  const [text, setText] = React.useState("")

  function handleSend() {
    if (!text.trim()) return
    onSend?.(text.trim())
    setText("")
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={cn("border-t border-border bg-background p-4", className)}>
      <div className="rounded-lg border border-input bg-background transition-[box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
        <Textarea
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          className="resize-none border-0 shadow-none focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none min-h-0 field-sizing-fixed"
        />
        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
          <button
            type="button"
            aria-label="Attach file"
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Paperclip className="size-4" />
          </button>
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!text.trim()}
            className="h-7 gap-1 px-3 text-xs bg-foreground text-background hover:bg-foreground/85"
          >
            <Send className="size-3" />
            Send
          </Button>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">⌘ Enter to send</p>
    </div>
  )
}

export { ReplyComposer }
