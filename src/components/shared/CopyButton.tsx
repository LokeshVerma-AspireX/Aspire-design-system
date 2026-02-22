"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CopyButtonProps {
  value: string
  copiedLabel?: string
  className?: string
  iconClassName?: string
}

function CopyButton({
  value,
  copiedLabel = "Copied!",
  className,
  iconClassName,
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: execCommand
      const el = document.createElement("textarea")
      el.value = value
      el.style.position = "fixed"
      el.style.opacity = "0"
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={copied || undefined}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? copiedLabel : "Copy to clipboard"}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              copied && "text-green-600 hover:text-green-600",
              className
            )}
          >
            {copied ? (
              <Check className={cn("size-3.5", iconClassName)} />
            ) : (
              <Copy className={cn("size-3.5", iconClassName)} />
            )}
          </button>
        </TooltipTrigger>
        {copied && (
          <TooltipContent side="top" className="text-xs">
            {copiedLabel}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export { CopyButton, type CopyButtonProps }
