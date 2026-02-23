"use client"

import * as React from "react"
import { Instagram, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Platform, PLATFORM_COLOR, PLATFORM_TEXT_COLOR } from "@/lib/constants/platforms"

function TikTokSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="TikTok"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.79a4.85 4.85 0 01-1.02-.1z" />
    </svg>
  )
}

interface PlatformIconProps {
  platform: Platform
  className?: string
}

function PlatformIcon({ platform, className }: PlatformIconProps) {
  if (platform === "instagram") return <Instagram className={className} />
  if (platform === "youtube")   return <Youtube   className={className} />
  return <TikTokSvg className={className} />
}

export {
  PlatformIcon,
  type Platform,
  type PlatformIconProps,
  PLATFORM_COLOR,
  PLATFORM_TEXT_COLOR,
}
