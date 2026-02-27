"use client"

import * as React from "react"
import {
  Lock,
  GripVertical,
  Plus,
  Trash2,
  AlertTriangle,
  Upload,
  DollarSign,
  ArrowLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// ─── Types ────────────────────────────────────────────────────────────────────

export type CampaignOrigin = "new" | "migrated-flex" | "migrated-standard"

export interface CampaignSettingsPageProps {
  campaignName?: string
  campaignOrigin?: CampaignOrigin
  /** Controlled active settings tab */
  activeSettingsTab?: string
  onSettingsTabChange?: (tab: string) => void
  onBack?: () => void
  // ── Conditional tab feature flags ──
  hasCustomStages?: boolean
  hasRecruitmentV2?: boolean
  hasBriefStage?: boolean
  hasOfferStage?: boolean
  hasProductFulfillmentStage?: boolean
  hasPfaV2?: boolean
  hasBudgetAllocation?: boolean
  hasBudgetV2?: boolean
  /** For migrated projects — whether Budget V1 is already connected */
  budgetV1Connected?: boolean
  /** Open the delete confirmation dialog immediately (for story demos) */
  deleteDialogOpen?: boolean
  className?: string
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const WORKFLOW_STAGES_DEFAULT = [
  { id: "application", label: "Application", color: "bg-blue-500" },
  { id: "brief", label: "Brief / Terms", color: "bg-amber-500" },
  { id: "content", label: "Content Review", color: "bg-purple-500" },
  { id: "offer", label: "Offer / Sales Tracking", color: "bg-lime-500" },
  { id: "complete", label: "Complete", color: "bg-stone-400" },
]

const TEAM_MEMBERS = [
  { id: "1", name: "Sarah Chen", initials: "SC" },
  { id: "2", name: "Marcus Reid", initials: "MR" },
  { id: "3", name: "Priya Nair", initials: "PN" },
]

// ─── Shared: Dirty/Save bar ───────────────────────────────────────────────────

function DirtyBar({ onDiscard, onSave }: { onDiscard: () => void; onSave: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/50 dark:bg-amber-950/30">
      <p className="text-sm text-amber-700 dark:text-amber-400">You have unsaved changes.</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onDiscard}>
          Discard
        </Button>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onSave}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}

// ─── Unsaved Changes Navigation Guard ────────────────────────────────────────

function UnsavedChangesGuard({
  open,
  onContinue,
  onCancel,
}: {
  open: boolean
  onContinue: () => void
  onCancel: () => void
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes on this tab. Leaving now will discard them.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Stay here</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>Discard &amp; leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// ─── Section: Setup ───────────────────────────────────────────────────────────

function SetupSection({ initialDeleteOpen = false }: { initialDeleteOpen?: boolean }) {
  const [objective, setObjective] = React.useState("sales_conversions")
  const [contentReviewEnabled, setContentReviewEnabled] = React.useState(true)
  const [unpaidOffer, setUnpaidOffer] = React.useState(false)
  const [isDirty, setIsDirty] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(initialDeleteOpen)
  const [archiveDialogOpen, setArchiveDialogOpen] = React.useState(false)

  const kpiMeta: Record<string, { label: string; placeholder: string }> = {
    brand_awareness: { label: "Reach target", placeholder: "e.g. 500,000 impressions" },
    content_creation: { label: "Content pieces target", placeholder: "e.g. 50 posts" },
    sales_conversions: { label: "Revenue target ($)", placeholder: "e.g. 100,000" },
    product_seeding: { label: "Products seeded target", placeholder: "e.g. 200 units" },
    ambassador_program: { label: "Ambassadors target", placeholder: "e.g. 25 creators" },
  }
  const kpi = kpiMeta[objective] ?? kpiMeta["sales_conversions"]

  return (
    <div className="space-y-8 max-w-2xl">
      {isDirty && (
        <DirtyBar onDiscard={() => setIsDirty(false)} onSave={() => setIsDirty(false)} />
      )}

      {/* ── About ── */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          About
        </h3>
        <Separator className="mt-2 mb-5" />
        <div className="grid gap-5">
          <div className="space-y-1.5">
            <Label htmlFor="s-name">
              Campaign Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="s-name"
              defaultValue="Summer Glow Beauty Launch"
              maxLength={35}
              onChange={() => setIsDirty(true)}
            />
            <p className="text-xs text-muted-foreground">Max 35 characters</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-desc">Description</Label>
            <Textarea
              id="s-desc"
              defaultValue="A premium summer beauty campaign targeting Gen-Z and millennial creators across Instagram and TikTok."
              rows={3}
              onChange={() => setIsDirty(true)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-objective">Campaign Objective</Label>
            <Select
              value={objective}
              onValueChange={(v) => {
                setObjective(v)
                setIsDirty(true)
              }}
            >
              <SelectTrigger id="s-objective">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
                <SelectItem value="content_creation">Content Creation</SelectItem>
                <SelectItem value="sales_conversions">Sales &amp; Conversions</SelectItem>
                <SelectItem value="product_seeding">Product Seeding</SelectItem>
                <SelectItem value="ambassador_program">Ambassador Program</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>
              {kpi.label}{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <div className="flex gap-3">
              <Input
                className="flex-1"
                placeholder={kpi.placeholder}
                defaultValue="120,000"
                onChange={() => setIsDirty(true)}
              />
              <Select
                defaultValue="total_campaign"
                onValueChange={() => setIsDirty(true)}
              >
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="total_campaign">Total campaign</SelectItem>
                  <SelectItem value="per_month">Per month</SelectItem>
                  <SelectItem value="per_quarter">Per quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Active Dates</Label>
            <div className="flex items-center gap-3">
              <Input
                type="date"
                defaultValue="2026-01-15"
                className="flex-1"
                onChange={() => setIsDirty(true)}
              />
              <span className="shrink-0 text-sm text-muted-foreground">to</span>
              <Input
                type="date"
                defaultValue="2026-06-30"
                className="flex-1"
                onChange={() => setIsDirty(true)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Campaign Image</Label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-24 items-center justify-center rounded-md border border-dashed border-border bg-muted">
                <Upload className="size-5 text-muted-foreground" />
              </div>
              <Button variant="outline" size="sm">
                Upload image
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Additional Settings ── */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Additional Settings
        </h3>
        <Separator className="mt-2 mb-5" />
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="s-owner">Campaign Owner</Label>
            <Select defaultValue="1">
              <SelectTrigger id="s-owner">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEAM_MEMBERS.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Unpaid Offer</p>
              <p className="text-xs text-muted-foreground">
                Enable gifted/unpaid offers for this campaign.
              </p>
            </div>
            <Switch
              checked={unpaidOffer}
              onCheckedChange={(v) => {
                setUnpaidOffer(v)
                setIsDirty(true)
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Content Review Enabled</p>
              <p className="text-xs text-muted-foreground">
                Require internal review before content goes live.
              </p>
            </div>
            <Switch
              checked={contentReviewEnabled}
              onCheckedChange={(v) => {
                setContentReviewEnabled(v)
                setIsDirty(true)
              }}
            />
          </div>

          {contentReviewEnabled && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-200 space-y-2 border-l-2 border-primary/30 pl-4">
              <Label>Content Reviewers</Label>
              <div className="flex flex-wrap gap-2">
                {TEAM_MEMBERS.slice(0, 2).map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1"
                  >
                    <Avatar className="size-5">
                      <AvatarFallback className="text-[9px]">{m.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{m.name}</span>
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={`Remove ${m.name}`}
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 rounded-full px-3 text-xs"
                >
                  <Plus className="mr-1 size-3" /> Add reviewer
                </Button>
              </div>
            </div>
          )}

          <Separator />

          {/* Danger zone */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-destructive">
              Danger Zone
            </p>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="text-sm font-medium">Archive Campaign</p>
                <p className="text-xs text-muted-foreground">
                  Hide from active lists. Can be restored later.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setArchiveDialogOpen(true)}
              >
                Archive
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div>
                <p className="text-sm font-medium text-destructive">Delete Campaign</p>
                <p className="text-xs text-muted-foreground">
                  Permanently delete this campaign and all data.
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Archive confirm */}
      <AlertDialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive this campaign?</AlertDialogTitle>
            <AlertDialogDescription>
              The campaign will be hidden from active lists. All data is preserved and it can be
              unarchived at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Archive</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete confirm */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-4" />
              Delete Campaign?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The campaign, all creator data, content, and history
              will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Yes, delete permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// ─── Section: Workflow ────────────────────────────────────────────────────────

function WorkflowSection({ origin = "new" }: { origin?: CampaignOrigin }) {
  const [stages, setStages] = React.useState(WORKFLOW_STAGES_DEFAULT)
  const [isDirty, setIsDirty] = React.useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false)
  const [stageToRemove, setStageToRemove] = React.useState<string | null>(null)
  const [creatorAccess, setCreatorAccess] = React.useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        WORKFLOW_STAGES_DEFAULT.map((s) => [s.id, s.id !== "offer"])
      )
  )

  const isMigratedFlex = origin === "migrated-flex"
  const isMigratedStandard = origin === "migrated-standard"
  const showCreatorInteraction = !isMigratedStandard

  function requestRemove(id: string) {
    setStageToRemove(id)
    setRemoveDialogOpen(true)
  }

  function confirmRemove() {
    if (stageToRemove) {
      setStages((prev) => prev.filter((s) => s.id !== stageToRemove))
      setIsDirty(true)
    }
    setStageToRemove(null)
    setRemoveDialogOpen(false)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {isDirty && (
        <DirtyBar onDiscard={() => setIsDirty(false)} onSave={() => setIsDirty(false)} />
      )}

      {/* Workflow Type — migrated only */}
      {(isMigratedFlex || isMigratedStandard) && (
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Workflow Type
          </h3>
          <Separator className="mt-2 mb-4" />
          <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
            <Lock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {isMigratedFlex ? "Flexible" : "Standard (Linear)"}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                This was set when the project was created and cannot be changed.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Workflow Stages */}
      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Workflow Stages
          </h3>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsDirty(true)}
          >
            <Plus className="mr-1 size-3.5" /> Add stage
          </Button>
        </div>
        <Separator className="mt-2 mb-4" />
        <p className="mb-3 text-xs text-muted-foreground">
          Drag to reorder. Adding, removing, and reordering are all staged locally and saved
          together.
        </p>
        <div className="space-y-2">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className="group flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 hover:border-muted-foreground/30"
            >
              <GripVertical className="size-4 cursor-grab text-muted-foreground/40 group-hover:text-muted-foreground" />
              <div className={cn("size-2.5 shrink-0 rounded-full", stage.color)} />
              <span className="flex-1 text-sm font-medium">{stage.label}</span>
              <span className="text-xs text-muted-foreground">Stage {index + 1}</span>
              <Button
                size="icon"
                variant="ghost"
                className="size-7 opacity-0 group-hover:opacity-100"
                aria-label={`Remove ${stage.label}`}
                onClick={() => requestRemove(stage.id)}
              >
                <Trash2 className="size-3.5 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Creator Interaction Setup — new + migrated-flex only */}
      {showCreatorInteraction && (
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Creator Interaction Setup
          </h3>
          <Separator className="mt-2 mb-4" />
          <p className="mb-3 text-xs text-muted-foreground">
            Control which stages creators can see and interact with in their portal.
          </p>
          <div className="space-y-2">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className={cn("size-2 rounded-full", stage.color)} />
                  <span className="text-sm">{stage.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {creatorAccess[stage.id] && (
                    <span className="text-xs text-muted-foreground">Visible in portal</span>
                  )}
                  <Switch
                    checked={creatorAccess[stage.id] ?? false}
                    onCheckedChange={(v) => {
                      setCreatorAccess((prev) => ({ ...prev, [stage.id]: v }))
                      setIsDirty(true)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Remove stage confirm */}
      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this stage?</AlertDialogTitle>
            <AlertDialogDescription>
              Removing this stage will remove it from the workflow. Members currently associated
              with tasks in this stage will retain their history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove}>Remove stage</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// ─── Section: Custom Stages ───────────────────────────────────────────────────

function CustomStagesSection() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        {[
          { name: "Content Approval", statuses: ["Pending Review", "Approved", "Revision Needed"] },
          { name: "Product Seeding", statuses: ["Pending", "Shipped", "Received"] },
        ].map((stage) => (
          <div key={stage.name} className="rounded-lg border border-border">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold">{stage.name}</span>
              <Button size="sm" variant="ghost" className="h-7 text-xs">
                Edit
              </Button>
            </div>
            <div className="px-4 py-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Custom Statuses</p>
              <div className="flex flex-wrap gap-1.5">
                {stage.statuses.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-md border border-border bg-muted px-2 py-0.5 text-xs"
                  >
                    {s}
                  </span>
                ))}
                <button className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground">
                  <Plus className="size-3" /> Add status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm">
        <Plus className="mr-1.5 size-3.5" /> Add custom stage
      </Button>
    </div>
  )
}

// ─── Section: Application Page ────────────────────────────────────────────────

function ApplicationPageSection() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-1.5">
        <Label htmlFor="app-template">Application Form Template</Label>
        <Select defaultValue="standard">
          <SelectTrigger id="app-template">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard Application</SelectItem>
            <SelectItem value="beauty">Beauty Creator Application</SelectItem>
            <SelectItem value="minimal">Minimal Application</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <Label>Form Fields</Label>
          <Button size="sm" variant="outline">
            <Plus className="mr-1 size-3.5" /> Add field
          </Button>
        </div>
        <div className="space-y-1.5">
          {[
            { label: "Creator Name", type: "Text", required: true },
            { label: "Social Media Handle", type: "Text", required: true },
            { label: "Follower Count", type: "Number", required: false },
            { label: "Past brand collaborations", type: "Textarea", required: false },
          ].map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between rounded-md border border-border px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <GripVertical className="size-4 text-muted-foreground/40" />
                <span className="text-sm">{field.label}</span>
                <span className="text-xs text-muted-foreground">({field.type})</span>
                {field.required && (
                  <span className="text-xs text-destructive">Required</span>
                )}
              </div>
              <Button size="icon" variant="ghost" className="size-7">
                <Trash2 className="size-3.5 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="url-slug">Custom Landing Page Path</Label>
        <div className="flex items-center gap-0 rounded-md border border-border overflow-hidden">
          <span className="bg-muted px-3 py-2 text-sm text-muted-foreground shrink-0 border-r border-border">
            aspire.io/apply/
          </span>
          <Input
            id="url-slug"
            defaultValue="summer-glow-2026"
            className="border-0 rounded-none focus-visible:ring-0"
          />
        </div>
      </div>
    </div>
  )
}

// ─── Section: Recruitment ─────────────────────────────────────────────────────

function RecruitmentSection() {
  const [active, setActive] = React.useState("application-page")
  const sections = [
    { id: "application-page", label: "Application Page" },
    { id: "invite-email-template", label: "Invite Email Template" },
  ]

  return (
    <div className="flex gap-0 -mx-6 -mb-6">
      <nav className="w-52 shrink-0 border-r border-border pb-6 pt-1">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={cn(
              "flex w-full items-start px-4 py-2.5 text-sm transition-colors",
              active === s.id
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 overflow-auto px-6 pb-6">
        {active === "application-page" && <ApplicationPageSection />}
        {active === "invite-email-template" && (
          <EmailTemplateContent title="Recruiter Invite Email" />
        )}
      </div>
    </div>
  )
}

// ─── Section: Briefs ──────────────────────────────────────────────────────────

function BriefsSection() {
  const [active, setActive] = React.useState("default-brief")
  const sections = [
    { id: "default-brief", label: "Default Brief" },
    { id: "brief-email-template", label: "Brief Email Template" },
    { id: "content-guidelines", label: "Content Guidelines" },
  ]

  return (
    <div className="flex gap-0 -mx-6 -mb-6">
      <nav className="w-52 shrink-0 border-r border-border pb-6 pt-1">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={cn(
              "flex w-full items-start px-4 py-2.5 text-sm transition-colors",
              active === s.id
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 overflow-auto px-6 pb-6">
        {active === "default-brief" && <DefaultBriefContent />}
        {active === "brief-email-template" && (
          <EmailTemplateContent title="Brief Email Template" />
        )}
        {active === "content-guidelines" && <ContentGuidelinesContent />}
      </div>
    </div>
  )
}

function DefaultBriefContent() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="space-y-1.5">
        <Label>Brief Type</Label>
        <Select defaultValue="advanced">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="brief-title">Brief Title</Label>
        <Input id="brief-title" defaultValue="Summer Glow Beauty — Creator Brief" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="brief-body">Brief Content</Label>
        <Textarea
          id="brief-body"
          rows={6}
          defaultValue="Welcome to the Summer Glow Beauty Launch campaign! We're excited to partner with you on this campaign. Please review the following guidelines carefully before creating your content..."
        />
      </div>
    </div>
  )
}

function ContentGuidelinesContent() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="space-y-1.5">
        <Label htmlFor="cg-body">Content Guidelines</Label>
        <p className="text-xs text-muted-foreground">
          Visible to creators in their portal throughout the campaign.
        </p>
        <Textarea
          id="cg-body"
          rows={8}
          defaultValue="• Always disclose your partnership with #ad or #sponsored&#10;• Use good natural lighting for all product shots&#10;• Avoid competitor brand mentions&#10;• Submit content for review before posting"
        />
      </div>
      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
        Save Guidelines
      </Button>
    </div>
  )
}

// ─── Section: Offers ──────────────────────────────────────────────────────────

function OffersSection() {
  const [active, setActive] = React.useState("offers")
  const sections = [
    { id: "offers", label: "Offers" },
    { id: "offer-email-template", label: "Offer Email Template" },
  ]

  return (
    <div className="flex gap-0 -mx-6 -mb-6">
      <nav className="w-52 shrink-0 border-r border-border pb-6 pt-1">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={cn(
              "flex w-full items-start px-4 py-2.5 text-sm transition-colors",
              active === s.id
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 overflow-auto px-6 pb-6">
        {active === "offers" && <OffersListContent />}
        {active === "offer-email-template" && (
          <EmailTemplateContent title="Offer Email Template" />
        )}
      </div>
    </div>
  )
}

function OffersListContent() {
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage product offers and deals for creators.
        </p>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-1.5 size-3.5" /> Create offer
        </Button>
      </div>
      <div className="space-y-2">
        {[
          { name: "Flat Fee — Nano Creator", value: "$500", type: "Flat fee" },
          { name: "Commission — 10% of sales", value: "10%", type: "Commission" },
          { name: "Product Gifting — Full Kit", value: "$120", type: "Product" },
        ].map((offer) => (
          <div
            key={offer.name}
            className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{offer.name}</p>
              <p className="text-xs text-muted-foreground">{offer.type}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">{offer.value}</span>
              <Button size="sm" variant="ghost" className="h-7 text-xs">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Section: Product Catalogs ────────────────────────────────────────────────

function ProductCatalogsSection() {
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Connect product catalogs to enable product fulfillment for creators.
        </p>
        <Button size="sm" variant="outline">
          <Plus className="mr-1.5 size-3.5" /> Connect catalog
        </Button>
      </div>
      <div className="space-y-2">
        {[
          { name: "Summer 2026 Beauty Collection", products: 48, status: "Connected" },
          { name: "Skincare Essentials", products: 22, status: "Connected" },
        ].map((catalog) => (
          <div
            key={catalog.name}
            className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{catalog.name}</p>
              <p className="text-xs text-muted-foreground">{catalog.products} products</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-destructive hover:text-destructive"
            >
              Disconnect
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Section: Budget ──────────────────────────────────────────────────────────

function BudgetV1Content() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="rounded-lg border border-border p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold">Connected Budget Accounts</h4>
          <Button size="sm" variant="outline">
            Connect account
          </Button>
        </div>
        <div className="space-y-2">
          {["Q1 Marketing Budget", "Brand Partnerships Pool"].map((name) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-md border border-border px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="size-4 text-muted-foreground" />
                <span className="text-sm">{name}</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs text-destructive hover:text-destructive"
              >
                Disconnect
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Fiscal Year</Label>
          <Select defaultValue="2026">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">FY 2025</SelectItem>
              <SelectItem value="2026">FY 2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Budget Granularity</Label>
          <Select defaultValue="monthly">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Allocated", value: "$125,000" },
          { label: "Spent to Date", value: "$43,200" },
          { label: "Remaining", value: "$81,800" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border p-3">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BudgetV2Content() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="rounded-lg border border-border p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold">Connected Budgets</h4>
          <Button size="sm" variant="outline">
            Connect budget
          </Button>
        </div>
        <div className="space-y-2">
          {["2026 Influencer Marketing"].map((name) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-md border border-border px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="size-4 text-muted-foreground" />
                <span className="text-sm">{name}</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs text-destructive hover:text-destructive"
              >
                Disconnect
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Budget", value: "$50,000" },
          { label: "Committed", value: "$12,400" },
          { label: "Available", value: "$37,600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border p-3">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <div className="border-b border-border bg-muted/50 px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Budget Ledger
          </p>
        </div>
        <div className="divide-y divide-border">
          {[
            { creator: "Maya Johnson", amount: "$2,500", type: "Flat fee", status: "Committed" },
            { creator: "Alex Torres", amount: "$4,100", type: "Commission", status: "Committed" },
            { creator: "Lena Park", amount: "$5,800", type: "Flat fee", status: "Paid" },
          ].map((row) => (
            <div key={row.creator} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{row.creator}</p>
                <p className="text-xs text-muted-foreground">{row.type}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{row.amount}</p>
                <span
                  className={cn(
                    "text-xs",
                    row.status === "Paid" ? "text-green-600" : "text-amber-600"
                  )}
                >
                  {row.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BudgetSection({
  origin = "new",
  budgetV1Connected = false,
}: {
  origin?: CampaignOrigin
  budgetV1Connected?: boolean
}) {
  const showV1 = origin !== "new" && budgetV1Connected
  return showV1 ? <BudgetV1Content /> : <BudgetV2Content />
}

// ─── Section: Invite Email ────────────────────────────────────────────────────

function InviteEmailSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="space-y-1.5">
        <Label>Email Subject</Label>
        <p className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground">
          You&apos;re invited to collaborate on Summer Glow Beauty Launch
        </p>
      </div>
      <div className="space-y-1.5">
        <Label>Email Body</Label>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
            {`Hi {{creator_name}},

We'd love to have you join the Summer Glow Beauty Launch campaign on Aspire.

Click the button below to view your invitation and get started.

[View Invitation]

Best,
{{brand_name}}`}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          This template is read-only.{" "}
          <button className="text-primary underline underline-offset-2">
            Edit in global message templates →
          </button>
        </p>
      </div>
    </div>
  )
}

// ─── Shared: Email Template Content ──────────────────────────────────────────

function EmailTemplateContent({ title }: { title: string }) {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="space-y-1.5">
        <Label htmlFor="et-subject">Email Subject</Label>
        <Input
          id="et-subject"
          defaultValue={`Re: ${title} — Summer Glow Beauty Launch`}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="et-body">Email Body</Label>
        <Textarea
          id="et-body"
          rows={8}
          defaultValue={`Hi {{creator_name}},

Thank you for being part of the Summer Glow Beauty Launch campaign.

Please find your ${title.toLowerCase()} attached.

Best,
{{brand_name}}`}
        />
      </div>
      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
        Save Template
      </Button>
    </div>
  )
}

// ─── Tab Definitions ──────────────────────────────────────────────────────────

interface TabDef {
  id: string
  label: string
}

function buildTabs(props: CampaignSettingsPageProps): TabDef[] {
  const {
    hasCustomStages,
    hasRecruitmentV2,
    hasBriefStage,
    hasOfferStage,
    hasProductFulfillmentStage,
    hasPfaV2,
    hasBudgetAllocation,
    hasBudgetV2,
  } = props

  const tabs: TabDef[] = [
    { id: "setup", label: "Setup" },
    { id: "workflow", label: "Workflow" },
  ]
  if (hasCustomStages) tabs.push({ id: "custom-stages", label: "Custom Stages" })
  tabs.push({ id: "application-page", label: "Application Page" })
  if (hasRecruitmentV2) tabs.push({ id: "recruitment", label: "Recruitment" })
  if (hasBriefStage) tabs.push({ id: "briefs", label: "Briefs" })
  if (hasOfferStage) tabs.push({ id: "offers", label: "Offers" })
  if (hasProductFulfillmentStage && hasPfaV2)
    tabs.push({ id: "product-catalogs", label: "Product Catalogs" })
  if (hasBudgetAllocation || hasBudgetV2) tabs.push({ id: "budget", label: "Budget" })
  tabs.push({ id: "invite-email", label: "Invite Email" })
  return tabs
}

// ─── Main: CampaignSettingsPage ───────────────────────────────────────────────

function CampaignSettingsPage({
  campaignName = "Summer Glow Beauty Launch",
  campaignOrigin = "new",
  activeSettingsTab: controlledTab,
  onSettingsTabChange,
  onBack,
  hasCustomStages = false,
  hasRecruitmentV2 = false,
  hasBriefStage = false,
  hasOfferStage = false,
  hasProductFulfillmentStage = false,
  hasPfaV2 = false,
  hasBudgetAllocation = false,
  hasBudgetV2 = false,
  budgetV1Connected = false,
  deleteDialogOpen: initialDeleteOpen = false,
  className,
}: CampaignSettingsPageProps) {
  const tabs = buildTabs({
    hasCustomStages,
    hasRecruitmentV2,
    hasBriefStage,
    hasOfferStage,
    hasProductFulfillmentStage,
    hasPfaV2,
    hasBudgetAllocation,
    hasBudgetV2,
  })

  const firstTab = tabs[0]?.id ?? "setup"
  const [internalTab, setInternalTab] = React.useState(firstTab)
  const [pendingTab, setPendingTab] = React.useState<string | null>(null)
  const [guardOpen, setGuardOpen] = React.useState(false)
  const [workflowDirty] = React.useState(false) // lifted if needed

  const activeTab = controlledTab ?? internalTab

  function handleTabChange(tab: string) {
    // Guard unsaved workflow changes (R4 from spec)
    if (activeTab === "workflow" && workflowDirty) {
      setPendingTab(tab)
      setGuardOpen(true)
      return
    }
    setInternalTab(tab)
    onSettingsTabChange?.(tab)
  }

  function confirmNavigation() {
    if (pendingTab) {
      setInternalTab(pendingTab)
      onSettingsTabChange?.(pendingTab)
    }
    setPendingTab(null)
    setGuardOpen(false)
  }

  return (
    <div className={cn("flex h-full flex-col bg-background", className)}>
      {/* ── Page header ── */}
      <div className="flex h-[60px] shrink-0 items-center gap-3 border-b border-border px-6">
        <Button
          variant="outline"
          size="icon"
          className="size-8 shrink-0"
          onClick={onBack}
          aria-label="Back to campaign"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <p className="text-xs text-muted-foreground">Campaign Settings</p>
          <h1 className="text-sm font-semibold leading-tight">{campaignName}</h1>
        </div>
      </div>

      {/* ── Tabs ── */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex flex-1 flex-col overflow-hidden"
      >
        {/* Tab nav — fixed ordering preserved (R5) */}
        <div className="shrink-0 overflow-x-auto px-6 pt-4">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab content — scrollable, centered */}
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="setup" className="m-0">
            <div className="mx-auto max-w-3xl px-6 py-8">
              <SetupSection initialDeleteOpen={initialDeleteOpen} />
            </div>
          </TabsContent>

          <TabsContent value="workflow" className="m-0">
            <div className="mx-auto max-w-3xl px-6 py-8">
              <WorkflowSection origin={campaignOrigin} />
            </div>
          </TabsContent>

          <TabsContent value="custom-stages" className="m-0">
            <div className="mx-auto max-w-3xl px-6 py-8">
              <CustomStagesSection />
            </div>
          </TabsContent>

          <TabsContent value="application-page" className="m-0">
            <div className="mx-auto max-w-3xl px-6 py-8">
              <ApplicationPageSection />
            </div>
          </TabsContent>

          <TabsContent value="recruitment" className="m-0">
            <div className="mx-auto max-w-3xl py-8">
              <RecruitmentSection />
            </div>
          </TabsContent>

          <TabsContent value="briefs" className="m-0">
            <div className="mx-auto max-w-3xl py-8">
              <BriefsSection />
            </div>
          </TabsContent>

          <TabsContent value="offers" className="m-0">
            <div className="mx-auto max-w-3xl py-8">
              <OffersSection />
            </div>
          </TabsContent>

          <TabsContent value="product-catalogs" className="m-0">
            <div className="mx-auto max-w-3xl px-6 py-8">
              <ProductCatalogsSection />
            </div>
          </TabsContent>

          <TabsContent value="budget" className="m-0">
            <div className="mx-auto max-w-3xl px-6 py-8">
              <BudgetSection
                origin={campaignOrigin}
                budgetV1Connected={budgetV1Connected}
              />
            </div>
          </TabsContent>

          <TabsContent value="invite-email" className="m-0">
            <div className="mx-auto max-w-3xl px-6 py-8">
              <InviteEmailSection />
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Navigation guard dialog (R4) */}
      <UnsavedChangesGuard
        open={guardOpen}
        onContinue={confirmNavigation}
        onCancel={() => {
          setPendingTab(null)
          setGuardOpen(false)
        }}
      />
    </div>
  )
}

export { CampaignSettingsPage }
