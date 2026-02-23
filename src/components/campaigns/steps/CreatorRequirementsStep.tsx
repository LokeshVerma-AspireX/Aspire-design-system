"use client"

import * as React from "react"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { WizardStepProps } from "@/components/shared/wizard"

// ─── Constants ───────────────────────────────────────────────────────────────

const PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "pinterest", label: "Pinterest" },
]

const CATEGORIES = [
  "Fashion", "Beauty", "Food", "Fitness", "Tech",
  "Travel", "Lifestyle", "Home", "Parenting", "Gaming",
]

const CONTENT_TYPES = [
  "Post", "Reel", "Story", "Video", "Short", "Pin", "Blog Post",
]

interface Deliverable {
  id: string
  platform: string
  contentType: string
  quantity: number
}

// ─── Component ───────────────────────────────────────────────────────────────

function CreatorRequirementsStep({ data, updateData }: WizardStepProps) {
  const selectedPlatforms: string[] = data.targetPlatforms ?? []
  const selectedCategories: string[] = data.contentCategories ?? []
  const deliverables: Deliverable[] = data.deliverables ?? []

  function togglePlatform(id: string) {
    const next = selectedPlatforms.includes(id)
      ? selectedPlatforms.filter((p: string) => p !== id)
      : [...selectedPlatforms, id]
    updateData("targetPlatforms", next)
  }

  function toggleCategory(cat: string) {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c: string) => c !== cat)
      : [...selectedCategories, cat]
    updateData("contentCategories", next)
  }

  function addDeliverable() {
    const next: Deliverable[] = [
      ...deliverables,
      { id: crypto.randomUUID(), platform: "instagram", contentType: "Reel", quantity: 1 },
    ]
    updateData("deliverables", next)
  }

  function updateDeliverable(id: string, field: keyof Deliverable, value: any) {
    const next = deliverables.map((d: Deliverable) =>
      d.id === id ? { ...d, [field]: value } : d
    )
    updateData("deliverables", next)
  }

  function removeDeliverable(id: string) {
    updateData("deliverables", deliverables.filter((d: Deliverable) => d.id !== id))
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-base font-semibold text-foreground">Creator Requirements</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Define what you're looking for in creator partners.
        </p>
      </div>

      {/* Target Platforms */}
      <section className="space-y-3">
        <Label>Target Platforms</Label>
        <div className="flex flex-wrap gap-3">
          {PLATFORMS.map((p) => {
            const checked = selectedPlatforms.includes(p.id)
            return (
              <label
                key={p.id}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors",
                  checked
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30"
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => togglePlatform(p.id)}
                />
                {p.label}
              </label>
            )
          })}
        </div>
      </section>

      {/* Min Followers */}
      <section className="space-y-1.5">
        <Label htmlFor="min-followers">Minimum Followers</Label>
        <Input
          id="min-followers"
          type="number"
          min="0"
          step="1000"
          placeholder="e.g. 10000"
          value={data.minFollowers ?? ""}
          onChange={(e) => updateData("minFollowers", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Only creators with at least this many followers will be eligible.
        </p>
      </section>

      {/* Content Categories */}
      <section className="space-y-3">
        <Label>Content Categories</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategories.includes(cat)
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  isSelected
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      {/* Deliverables Builder */}
      <section className="space-y-3">
        <Label>Deliverables</Label>
        <div className="space-y-2">
          {deliverables.map((d: Deliverable) => (
            <div
              key={d.id}
              className="flex items-center gap-2 rounded-lg border border-border bg-card p-3"
            >
              <Select
                value={d.platform}
                onValueChange={(v) => updateDeliverable(d.id, "platform", v)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={d.contentType}
                onValueChange={(v) => updateDeliverable(d.id, "contentType", v)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONTENT_TYPES.map((ct) => (
                    <SelectItem key={ct} value={ct}>{ct}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                min="1"
                value={d.quantity}
                onChange={(e) => updateDeliverable(d.id, "quantity", parseInt(e.target.value) || 1)}
                className="w-20"
                aria-label="Quantity"
              />

              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeDeliverable(d.id)}
                aria-label="Remove deliverable"
              >
                <X className="size-3.5" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addDeliverable}
            className="gap-1.5"
          >
            <Plus className="size-3.5" />
            Add Deliverable
          </Button>
        </div>
      </section>

      {/* Creator Brief */}
      <section className="space-y-1.5">
        <Label htmlFor="creator-brief">Creator Brief</Label>
        <Textarea
          id="creator-brief"
          placeholder="Provide guidelines for creators: brand voice, do's and don'ts, key messaging points..."
          rows={5}
          value={data.creatorBrief ?? ""}
          onChange={(e) => updateData("creatorBrief", e.target.value)}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          This brief will be shared with all creators who join the campaign.
        </p>
      </section>
    </div>
  )
}

export { CreatorRequirementsStep }
