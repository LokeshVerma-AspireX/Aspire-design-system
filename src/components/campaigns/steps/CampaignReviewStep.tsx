"use client"

import * as React from "react"
import { Pencil, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { WizardStepProps } from "@/components/shared/wizard"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value ?? "—"}</span>
    </div>
  )
}

function ReviewSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-lg border border-border overflow-hidden">
      <div className="border-b border-border bg-muted/40 px-4 py-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
      </div>
      <div className="divide-y divide-border px-4">{children}</div>
    </section>
  )
}

// ─── Type labels ─────────────────────────────────────────────────────────────

const CAMPAIGN_TYPE_LABELS: Record<string, string> = {
  sponsored: "Sponsored",
  gifted: "Gifted",
  affiliate: "Affiliate",
  ambassador: "Ambassador",
}

const COMPENSATION_TYPE_LABELS: Record<string, string> = {
  fixed: "Fixed Rate",
  performance: "Performance Based",
  product: "Product Only",
  hybrid: "Hybrid",
}

const USAGE_RIGHTS_LABELS: Record<string, string> = {
  "30": "30 days",
  "90": "90 days",
  "365": "1 year",
  perpetual: "Perpetual",
}

// ─── Component ───────────────────────────────────────────────────────────────

function CampaignReviewStep({ data, updateData, errors }: WizardStepProps) {
  const platforms = (data.targetPlatforms as string[] ?? [])
    .map((p: string) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(", ")

  const deliverablesSummary = (data.deliverables as any[] ?? [])
    .map((d: any) => `${d.quantity}x ${d.contentType} (${d.platform})`)
    .join(", ")

  const categoriesSummary = (data.contentCategories as string[] ?? []).join(", ")

  const enabledFeatures = [
    data.enableAffiliateTracking && "Affiliate Tracking",
    data.autoApproveContent && "Auto-approve Content",
    data.enableSecureCodes && "SecureCodes™",
    data.createLandingPage && "Landing Page",
  ].filter(Boolean).join(", ")

  function formatDate(d: string | undefined) {
    if (!d) return "—"
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Review & Create</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Review your campaign details before creating.
        </p>
      </div>

      {/* Campaign Basics */}
      <ReviewSection title="Campaign Basics">
        <ReviewRow label="Campaign Name" value={data.campaignName || "—"} />
        <ReviewRow label="Type" value={CAMPAIGN_TYPE_LABELS[data.campaignType] || "—"} />
        <ReviewRow
          label="Duration"
          value={
            data.campaignStartDate
              ? `${formatDate(data.campaignStartDate)} → ${formatDate(data.campaignEndDate)}`
              : "—"
          }
        />
        <ReviewRow
          label="Budget"
          value={data.campaignBudget ? `$${Number(data.campaignBudget).toLocaleString()}` : "—"}
        />
      </ReviewSection>

      {/* Creator Requirements */}
      <ReviewSection title="Creator Requirements">
        <ReviewRow label="Platforms" value={platforms || "—"} />
        <ReviewRow
          label="Min. Followers"
          value={data.minFollowers ? Number(data.minFollowers).toLocaleString() : "—"}
        />
        <ReviewRow label="Categories" value={categoriesSummary || "—"} />
        <ReviewRow label="Deliverables" value={deliverablesSummary || "—"} />
      </ReviewSection>

      {/* Compensation */}
      <ReviewSection title="Compensation & Terms">
        <ReviewRow
          label="Compensation"
          value={COMPENSATION_TYPE_LABELS[data.compensationType] || "—"}
        />
        {data.paymentAmount && (
          <ReviewRow label="Payment" value={`$${Number(data.paymentAmount).toLocaleString()}`} />
        )}
        {data.commissionRate && (
          <ReviewRow label="Commission" value={`${data.commissionRate}%`} />
        )}
        <ReviewRow label="Product Seeding" value={data.productSeeding ? "Yes" : "No"} />
        <ReviewRow
          label="Usage Rights"
          value={USAGE_RIGHTS_LABELS[data.usageRights] || "—"}
        />
        <ReviewRow
          label="Exclusivity"
          value={
            data.exclusivity
              ? `Yes (${data.exclusivityDuration || "—"} days)`
              : "No"
          }
        />
      </ReviewSection>

      {/* Advanced Settings */}
      <ReviewSection title="Advanced Settings">
        <ReviewRow label="Enabled Features" value={enabledFeatures || "None"} />
      </ReviewSection>

      {/* Campaign Preview Card */}
      <div className="rounded-lg border border-border bg-muted/20 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Campaign Preview
        </p>
        <div className="flex items-center gap-3">
          {data.coverImagePreviewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.coverImagePreviewUrl}
              alt=""
              className="size-16 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Rocket className="size-6 text-muted-foreground" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {data.campaignName || "Untitled Campaign"}
            </p>
            <p className="text-xs text-muted-foreground">
              {CAMPAIGN_TYPE_LABELS[data.campaignType] || "—"} • {platforms || "No platforms"}
            </p>
          </div>
        </div>
      </div>

      {/* Confirm checkbox */}
      <div className="flex items-start gap-3 rounded-lg border border-border p-4">
        <Checkbox
          id="campaign-confirm"
          checked={data._confirmed ?? false}
          onCheckedChange={(checked) => updateData("_confirmed", !!checked)}
        />
        <Label
          htmlFor="campaign-confirm"
          className="text-sm leading-relaxed text-foreground cursor-pointer"
        >
          I've reviewed all campaign details and everything looks correct
        </Label>
      </div>
    </div>
  )
}

export { CampaignReviewStep }
