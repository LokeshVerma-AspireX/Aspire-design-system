"use client"

import * as React from "react"
import { ArrowLeft, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CampaignCreationHeaderProps {
  onBack?: () => void
  onClose: () => void
  isFirstStep: boolean
  className?: string
}

function CampaignCreationHeader({
  onBack,
  onClose,
  isFirstStep,
  className,
}: CampaignCreationHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between border-b border-border px-6 py-3",
        className
      )}
    >
      {/* Left: Back link */}
      <div className="w-24">
        {!isFirstStep && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        )}
      </div>

      {/* Right: Close button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="size-8 text-muted-foreground hover:text-foreground"
        aria-label="Close"
      >
        <X className="size-4" />
      </Button>
    </header>
  )
}

export { CampaignCreationHeader, type CampaignCreationHeaderProps }
