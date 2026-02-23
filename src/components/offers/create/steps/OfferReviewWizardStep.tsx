"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { WizardStepProps } from "@/components/shared/wizard"

const OFFER_TYPE_LABELS: Record<string, string> = {
  amount_off_purchase: "Amount Off Purchase",
  percent_off_purchase: "Percent Off Purchase",
  free_shipping: "Free Shipping",
  buy_x_get_y: "Buy X Get Y",
}

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value ?? "—"}</span>
    </div>
  )
}

function OfferReviewWizardStep({ data, updateData, errors }: WizardStepProps) {
  const discountSummary = data.discountValue
    ? data.discountMode === "percent"
      ? `${data.discountValue}% off`
      : `$${data.discountValue} off`
    : "—"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Review & Create</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Review your offer details before publishing.
        </p>
      </div>

      {/* Offer Details summary */}
      <section className="rounded-lg border border-border overflow-hidden">
        <div className="border-b border-border bg-muted/40 px-4 py-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Offer Details
          </h3>
        </div>
        <div className="divide-y divide-border px-4">
          <ReviewRow label="Offer Name" value={data.offerName || "—"} />
          <ReviewRow
            label="Duration"
            value={
              data.dateRangeFrom
                ? `${data.dateRangeFrom} → ${data.dateRangeTo ?? "TBD"}`
                : "—"
            }
          />
          <ReviewRow
            label="Promo Codes"
            value={data.generatePromoCodes ? "Enabled" : "Disabled"}
          />
        </div>
      </section>

      {/* Discount summary */}
      <section className="rounded-lg border border-border overflow-hidden">
        <div className="border-b border-border bg-muted/40 px-4 py-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Discount Configuration
          </h3>
        </div>
        <div className="divide-y divide-border px-4">
          <ReviewRow label="Offer Type" value={OFFER_TYPE_LABELS[data.offerType] || "—"} />
          <ReviewRow label="Customer Discount" value={discountSummary} />
          <ReviewRow
            label="SecureCodes™"
            value={data.enableSecureCodes ? "Enabled" : "Disabled"}
          />
          <ReviewRow
            label="Landing Page"
            value={data.enableLandingPage ? "Enabled" : "Disabled"}
          />
        </div>
      </section>

      {/* Confirm checkbox */}
      <div className="flex items-start gap-3 rounded-lg border border-border p-4">
        <Checkbox
          id="offer-confirm"
          checked={data._confirmed ?? false}
          onCheckedChange={(checked) => updateData("_confirmed", !!checked)}
        />
        <Label
          htmlFor="offer-confirm"
          className="text-sm leading-relaxed text-foreground cursor-pointer"
        >
          I've reviewed all offer details and everything looks correct
        </Label>
      </div>
    </div>
  )
}

export { OfferReviewWizardStep }
