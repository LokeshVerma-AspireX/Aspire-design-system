import * as React from "react"
import { cn } from "@/lib/utils"

type LogoVariant = "mark" | "circle" | "full"
type LogoSize = "xs" | "sm" | "md" | "lg" | "xl"

interface AspireLogoProps {
  variant?: LogoVariant
  size?: LogoSize
  className?: string
}

const markSizes: Record<LogoSize, number> = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
}

const fullHeights: Record<LogoSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
}

/**
 * Aspire "A" mark — the stylised letterform with swoosh.
 * ViewBox matches the 40×40 brand asset; fill uses currentColor.
 */
function AspireMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M29.909 30.454h-4.04l-1.315-3.771-1.219-3.457L20.032 13.894h-.064l-3.303 9.333-1.219 3.456-1.313 3.768-.303.003H10.091l8.081-22 3.688.001 8.049 21.999Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.983 24.647a15.94 15.94 0 0 1-5.405 4.279 15.94 15.94 0 0 1-6.748 1.528v-3.743a12.19 12.19 0 0 0 5.102-1.155 12.19 12.19 0 0 0 4.087-3.235l2.964 2.326Z"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * Aspire "A" mark inside a filled circle — matches the brand
 * circle asset. Circle uses currentColor, mark is knocked out
 * in the contrasting colour (passed via `markClassName`).
 */
function AspireCircleMark({
  size = 32,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle cx="20" cy="20" r="20" fill="currentColor" />
      <path
        d="M29.909 30.454h-4.04l-1.315-3.771-1.219-3.457L20.032 13.894h-.064l-3.303 9.333-1.219 3.456-1.313 3.768-.303.003H10.091l8.081-22 3.688.001 8.049 21.999Z"
        className="fill-sidebar dark:fill-background"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.983 24.647a15.94 15.94 0 0 1-5.405 4.279 15.94 15.94 0 0 1-6.748 1.528v-3.743a12.19 12.19 0 0 0 5.102-1.155 12.19 12.19 0 0 0 4.087-3.235l2.964 2.326Z"
        className="fill-sidebar dark:fill-background"
      />
    </svg>
  )
}

/**
 * Full Aspire wordmark — the "A" mark + "spire" text.
 * Scaled from the 214×75 brand asset. Uses currentColor.
 */
function AspireWordmark({ height = 24, className }: { height?: number; className?: string }) {
  const width = Math.round((214 / 75) * height)
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 214 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M48.823 44.38c1.536 9.286 8.296 14.504 18.665 14.504 9.601 0 15.9-4.911 15.9-12.355-.23-8.211-6.068-11.127-15.593-13.813-5.76-1.612-8.142-2.763-8.142-4.912 0-2.456 2.458-4.067 6.222-4.067 3.994 0 6.99 2.225 8.295 6.523l8.45-2.379c-.922-3.607-2.92-6.446-5.992-8.672-3.072-2.225-6.683-3.3-10.754-3.3-8.526 0-15.978 5.219-15.978 12.049.307 7.29 5.146 9.669 14.056 12.202 6.836 2.072 9.678 3.607 9.678 6.753 0 2.533-2.765 4.144-7.144 4.144-5.914 0-8.986-2.686-10.292-8.825l-7.371 2.149Z"
        fill="currentColor"
      />
      <path
        d="M89.533 75h9.217V54.51h.154c2.381 2.686 6.452 4.374 10.984 4.374 10.523 0 18.204-9.055 18.204-21.488 0-12.432-7.681-21.487-18.281-21.487-4.532 0-8.449 1.611-11.138 4.374h-.154v-3.223h-8.986V75Zm29.342-37.603c0 8.058-3.995 13.046-10.524 13.046-2.688 0-4.992-.921-6.836-2.763-1.843-1.918-2.765-4.22-2.765-7.06v-6.523c0-5.525 4.148-9.746 9.755-9.746 6.452 0 10.37 4.988 10.37 13.046Z"
        fill="currentColor"
      />
      <path d="M134.989 57.733h9.218V17.06h-9.218v40.673Z" fill="currentColor" />
      <path
        d="M152.692 57.733h9.217V34.941c0-6.446 2.381-9.67 7.143-9.67 1.229 0 2.689.23 4.379.691l1.613-8.979c-1.46-.46-3.073-.69-4.916-.69-3.764 0-6.836 1.611-8.603 4.297h-.154v-3.53h-8.679v40.673Z"
        fill="currentColor"
      />
      <path
        d="M176.209 37.397c0 12.815 7.835 21.487 19.126 21.487 7.758 0 13.749-3.3 17.436-9.746l-6.759-4.912c-3.073 4.682-6.145 6.677-10.677 6.677-5.761 0-9.525-4.297-9.832-10.82H214v-3.147c0-12.432-7.527-21.027-18.819-21.027-11.06 0-18.972 8.826-18.972 21.488Zm9.371-4.067c.307-5.449 4.378-9.44 9.678-9.44 5.761 0 9.294 3.684 9.602 9.44h-19.28Z"
        fill="currentColor"
      />
      <path
        d="M133.237 6.136a6.136 6.136 0 1 1 12.32 0 6.136 6.136 0 0 1-12.32 0Z"
        fill="currentColor"
      />
      <path
        d="M47.91 57.727h-9.768l-3.178-9.195-2.946-8.43L24.033 17.348h-.155L15.893 40.104l-2.946 8.428-3.175 9.188-.732.007H0l19.536-53.636h8.916l19.459 53.636Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.419 43.569a29.963 29.963 0 0 1-13.066 10.433 29.963 29.963 0 0 1-16.313 3.725v-9.127a23.712 23.712 0 0 0 12.335-2.817 23.712 23.712 0 0 0 9.879-7.888l7.165 5.674Z"
        fill="currentColor"
      />
    </svg>
  )
}

function AspireLogo({
  variant = "mark",
  size = "md",
  className,
}: AspireLogoProps) {
  const markPx = markSizes[size]

  if (variant === "mark") {
    return <AspireMark size={markPx} className={cn("text-foreground", className)} />
  }

  if (variant === "circle") {
    return <AspireCircleMark size={markPx} className={cn("text-foreground", className)} />
  }

  const fullH = fullHeights[size]
  return <AspireWordmark height={fullH} className={cn("text-foreground", className)} />
}

export {
  AspireLogo,
  AspireMark,
  AspireCircleMark,
  AspireWordmark,
  type AspireLogoProps,
  type LogoVariant,
  type LogoSize,
}
