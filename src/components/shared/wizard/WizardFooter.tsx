"use client"

import * as React from "react"
import { X, ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface WizardFooterProps {
  onClose?: () => void
  onPrevious?: () => void
  onNext?: () => void
  showPrevious?: boolean
  isFirstStep?: boolean
  isFinalStep?: boolean
  nextLabel?: string
  completeLabel?: string
  nextDisabled?: boolean
  loading?: boolean
  className?: string
}

function WizardFooter({
  onClose,
  onPrevious,
  onNext,
  showPrevious = true,
  isFirstStep = false,
  isFinalStep = false,
  nextLabel = "Next",
  completeLabel = "Complete",
  nextDisabled = false,
  loading = false,
  className,
}: WizardFooterProps) {
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && !e.shiftKey && !nextDisabled && !loading) {
        e.preventDefault()
        onNext?.()
      }
      if (e.key === "Escape") {
        e.preventDefault()
        onClose?.()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onNext, onClose, nextDisabled, loading])

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

      {/* Right: Previous + Next/Complete */}
      <div className="flex items-center gap-2">
        {showPrevious && !isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="h-9 gap-1.5"
          >
            <ArrowLeft className="size-3.5" />
            Previous
          </Button>
        )}
        <Button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || loading}
          className="h-9 gap-1.5 bg-foreground text-background hover:bg-foreground/85"
        >
          {loading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : isFinalStep ? (
            <>
              {completeLabel}
              <Check className="size-3.5" />
            </>
          ) : (
            <>
              {nextLabel}
              <ArrowRight className="size-3.5" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export { WizardFooter, type WizardFooterProps }
