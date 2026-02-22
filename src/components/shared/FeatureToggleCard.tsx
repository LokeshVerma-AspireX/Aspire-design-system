"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

interface FeatureToggleCardProps {
  icon?: React.ReactNode
  title: string
  description?: string
  recommended?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  checklistItems?: string[]
  footerLink?: { label: string; href?: string; onClick?: () => void }
  disabled?: boolean
  className?: string
}

function FeatureToggleCard({
  icon,
  title,
  description,
  recommended,
  checked,
  onCheckedChange,
  checklistItems,
  footerLink,
  disabled,
  className,
}: FeatureToggleCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 transition-colors",
        checked && "border-primary/40 bg-primary/5",
        className
      )}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground">
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground">{title}</span>
            {recommended && (
              <span className="inline-flex items-center rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary-foreground">
                Recommended
              </span>
            )}
          </div>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className="shrink-0"
        />
      </div>

      {/* Checklist items */}
      {checklistItems && checklistItems.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5 pl-1">
          {checklistItems.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                <svg viewBox="0 0 10 10" className="size-2.5" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Footer link */}
      {footerLink && (
        <div className="mt-3 pl-1">
          <button
            onClick={footerLink.onClick}
            className="text-xs text-primary underline-offset-2 hover:underline"
          >
            {footerLink.label}
          </button>
        </div>
      )}
    </div>
  )
}

export { FeatureToggleCard, type FeatureToggleCardProps }
