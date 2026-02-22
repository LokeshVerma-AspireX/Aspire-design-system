import * as React from "react"
import { cn } from "@/lib/utils"

type PillColor =
  | "teal"
  | "purple"
  | "amber"
  | "blue"
  | "rose"
  | "lime"
  | "orange"
  | "sky"
  | "default"

interface Pill {
  label: string
  color?: PillColor
}

interface TagPillGroupProps {
  pills: Pill[]
  className?: string
}

const colorMap: Record<PillColor, string> = {
  teal:    "bg-teal-100   text-teal-800   border-teal-200   dark:bg-teal-900/40   dark:text-teal-300   dark:border-teal-800",
  purple:  "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800",
  amber:   "bg-amber-100  text-amber-800  border-amber-200  dark:bg-amber-900/40  dark:text-amber-300  dark:border-amber-800",
  blue:    "bg-blue-100   text-blue-800   border-blue-200   dark:bg-blue-900/40   dark:text-blue-300   dark:border-blue-800",
  rose:    "bg-rose-100   text-rose-800   border-rose-200   dark:bg-rose-900/40   dark:text-rose-300   dark:border-rose-800",
  lime:    "bg-lime-100   text-lime-800   border-lime-200   dark:bg-lime-900/40   dark:text-lime-300   dark:border-lime-800",
  orange:  "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800",
  sky:     "bg-sky-100    text-sky-800    border-sky-200    dark:bg-sky-900/40    dark:text-sky-300    dark:border-sky-800",
  default: "bg-slate-100  text-slate-700  border-slate-200  dark:bg-slate-800     dark:text-slate-300  dark:border-slate-700",
}

function TagPill({ label, color = "default" }: Pill) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colorMap[color]
      )}
    >
      {label}
    </span>
  )
}

function TagPillGroup({ pills, className }: TagPillGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {pills.map((pill, i) => (
        <TagPill key={i} {...pill} />
      ))}
    </div>
  )
}

export { TagPillGroup, TagPill, type Pill, type PillColor }
