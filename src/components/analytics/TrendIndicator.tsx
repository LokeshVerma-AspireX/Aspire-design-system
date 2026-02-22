"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

type TrendDirection = "up" | "down" | "neutral"

interface TrendIndicatorProps {
  direction: TrendDirection
  value?: string | number
  suffix?: string
  size?: "sm" | "md"
  className?: string
}

const config: Record<
  TrendDirection,
  { icon: typeof TrendingUp; color: string; prefix: string }
> = {
  up:      { icon: TrendingUp,   color: "text-green-600", prefix: "+" },
  down:    { icon: TrendingDown, color: "text-red-500",   prefix: "" },
  neutral: { icon: Minus,        color: "text-muted-foreground", prefix: "" },
}

function TrendIndicator({
  direction,
  value,
  suffix = "%",
  size = "sm",
  className,
}: TrendIndicatorProps) {
  const { icon: Icon, color, prefix } = config[direction]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-medium",
        size === "sm" ? "text-xs" : "text-sm",
        color,
        className
      )}
    >
      <Icon className={cn("shrink-0", size === "sm" ? "size-3" : "size-4")} strokeWidth={2.5} />
      {value !== undefined && (
        <span>
          {prefix}{value}{suffix}
        </span>
      )}
    </span>
  )
}

export { TrendIndicator, type TrendDirection, type TrendIndicatorProps }
