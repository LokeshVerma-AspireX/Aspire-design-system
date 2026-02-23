"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// ─── Component ───────────────────────────────────────────────────────────────

function SettingsTab({ className }: { className?: string }) {
  const [editing, setEditing] = React.useState(false)

  return (
    <div className={cn("flex flex-col gap-6 p-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Campaign Settings</h3>
        <Button
          variant={editing ? "default" : "outline"}
          size="sm"
          onClick={() => setEditing((p) => !p)}
          className={editing ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
        >
          {editing ? "Save Changes" : "Edit Settings"}
        </Button>
      </div>

      <div className="max-w-xl rounded-lg border border-stone-200 bg-background p-6 dark:border-stone-800">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="campaign-name" className="text-sm text-stone-500 dark:text-stone-400">Campaign Name</Label>
            <Input id="campaign-name" defaultValue="Summer Glow Beauty Launch" disabled={!editing} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="campaign-desc" className="text-sm text-stone-500 dark:text-stone-400">Description</Label>
            <Input id="campaign-desc" defaultValue="Summer beauty collection campaign with top-tier creators" disabled={!editing} />
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="start-date" className="text-sm text-stone-500 dark:text-stone-400">Start Date</Label>
              <Input id="start-date" type="date" defaultValue="2026-01-15" disabled={!editing} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="end-date" className="text-sm text-stone-500 dark:text-stone-400">End Date</Label>
              <Input id="end-date" type="date" defaultValue="2026-03-30" disabled={!editing} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="budget" className="text-sm text-stone-500 dark:text-stone-400">Total Budget</Label>
            <Input id="budget" defaultValue="$25,000" disabled={!editing} />
          </div>

          <Separator />

          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-stone-500 dark:text-stone-400">Campaign Type</Label>
            <span className="inline-flex w-fit items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
              Sponsored
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-stone-500 dark:text-stone-400">Status</Label>
            <span className="inline-flex w-fit items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SettingsTab }
