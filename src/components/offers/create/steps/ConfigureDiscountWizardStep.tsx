"use client"

import * as React from "react"
import { Shield, Globe } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DiscountValueInput, type DiscountMode } from "@/components/shared/DiscountValueInput"
import { FeatureToggleCard } from "@/components/shared/FeatureToggleCard"
import { CollapsibleSection } from "@/components/shared/CollapsibleSection"
import type { WizardStepProps } from "@/components/shared/wizard"

type OfferType = "amount_off_purchase" | "percent_off_purchase" | "free_shipping" | "buy_x_get_y"

const OFFER_TYPE_LABELS: Record<OfferType, string> = {
  amount_off_purchase: "Amount Off Purchase",
  percent_off_purchase: "Percent Off Purchase",
  free_shipping: "Free Shipping",
  buy_x_get_y: "Buy X Get Y",
}

function savingsSummary(mode: DiscountMode, value: number | "", type: string): string | null {
  if (!value || !type) return null
  if (mode === "percent") return `Customers save ${value}% on their purchase`
  if (mode === "flat") return `Customers save $${value} on their purchase`
  return null
}

function ConfigureDiscountWizardStep({ data, updateData }: WizardStepProps) {
  const summary = savingsSummary(
    data.discountMode ?? "percent",
    data.discountValue ?? "",
    data.offerType ?? ""
  )

  return (
    <div className="space-y-8">
      {/* Customer Discount */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Customer Discount</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Define the discount customers receive when they use a creator's promo code or link.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label>Offer Type</Label>
          <Select
            value={data.offerType ?? ""}
            onValueChange={(v) => updateData("offerType", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select offer type…" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(OFFER_TYPE_LABELS) as OfferType[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {OFFER_TYPE_LABELS[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Discount Value</Label>
          <DiscountValueInput
            mode={data.discountMode ?? "percent"}
            onModeChange={(mode) => updateData("discountMode", mode)}
            value={data.discountValue ?? ""}
            onChange={(value) => updateData("discountValue", value)}
          />
        </div>

        {summary && (
          <div className="flex items-center gap-2.5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300">
            <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-green-600 dark:text-green-400" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {summary}
          </div>
        )}
      </section>

      {/* How Creators Share */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">How Creators Share This Offer</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Choose how creators will distribute this offer to their audience.
          </p>
        </div>

        <FeatureToggleCard
          icon={<Shield className="size-4" />}
          title="Enable SecureCodes™"
          description="Each creator gets a unique, tamper-proof promo code that prevents sharing or unauthorized use."
          recommended
          checked={data.enableSecureCodes ?? true}
          onCheckedChange={(checked) => updateData("enableSecureCodes", checked)}
          checklistItems={[
            "Unique code per creator",
            "Fraud-resistant & non-transferable",
            "Real-time usage tracking",
          ]}
          footerLink={{ label: "How SecureCodes™ Work?", onClick: () => {} }}
        />

        <FeatureToggleCard
          icon={<Globe className="size-4" />}
          title="Create Offer Landing Page"
          description="Generate a branded landing page creators can share with their audience directly."
          recommended
          checked={data.enableLandingPage ?? false}
          onCheckedChange={(checked) => updateData("enableLandingPage", checked)}
        />

        <CollapsibleSection title="Link Redirect">
          <p className="text-sm text-muted-foreground">
            Configure where customers are redirected after clicking the creator's link.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Purchase Restrictions">
          <p className="text-sm text-muted-foreground">
            Set minimum purchase amount, maximum usage, or product restrictions.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Code Management">
          <p className="text-sm text-muted-foreground">
            Manage code prefixes, expiry dates, and single-use rules.
          </p>
        </CollapsibleSection>
      </section>
    </div>
  )
}

export { ConfigureDiscountWizardStep }
