"use client"

import * as React from "react"
import { X, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FormFooterProps {
  onClose?: () => void
  onPrevious?: () => void
  onNext?: () => void
  nextLabel?: string
  previousLabel?: string
  showPrevious?: boolean
  nextDisabled?: boolean
  className?: string
}

function FormFooter({
  onClose,
  onPrevious,
  onNext,
  nextLabel = "Next",
  previousLabel = "Previous",
  showPrevious = false,
  nextDisabled = false,
  className,
}: FormFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-border bg-background px-6 py-4",
        className
      )}
    >
      {/* Left: Close */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="size-9 text-muted-foreground hover:text-foreground"
        aria-label="Close"
      >
        <X className="size-4" />
      </Button>

      {/* Right: Prev + Next */}
      <div className="flex items-center gap-2">
        {showPrevious && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="h-9 gap-1.5"
          >
            <ArrowLeft className="size-3.5" />
            {previousLabel}
          </Button>
        )}
        <Button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="h-9 gap-1.5 bg-foreground text-background hover:bg-foreground/85"
        >
          {nextLabel}
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}

export { FormFooter, type FormFooterProps }
