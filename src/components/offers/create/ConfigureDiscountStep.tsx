"use client"

import * as React from "react"
import { Shield, Globe, Link2, ShoppingBag, Hash } from "lucide-react"
import { cn } from "@/lib/utils"
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
import { FormFooter } from "@/components/shared/FormFooter"

type OfferType =
  | "amount_off_purchase"
  | "percent_off_purchase"
  | "free_shipping"
  | "buy_x_get_y"

interface ConfigureDiscountStepData {
  offerType: OfferType | ""
  discountMode: DiscountMode
  discountValue: number | ""
  enableSecureCodes: boolean
  enableLandingPage: boolean
}

interface ConfigureDiscountStepProps {
  data: ConfigureDiscountStepData
  onChange: (data: Partial<ConfigureDiscountStepData>) => void
  onClose?: () => void
  onPrevious?: () => void
  onNext?: () => void
}

const OFFER_TYPE_LABELS: Record<OfferType, string> = {
  amount_off_purchase: "Amount Off Purchase",
  percent_off_purchase: "Percent Off Purchase",
  free_shipping: "Free Shipping",
  buy_x_get_y: "Buy X Get Y",
}

function savingsSummary(
  mode: DiscountMode,
  value: number | "",
  type: OfferType | ""
): string | null {
  if (!value || !type) return null
  if (mode === "percent") return `Customers save ${value}% on their purchase`
  if (mode === "flat") return `Customers save $${value} on their purchase`
  return null
}

function ConfigureDiscountStep({
  data,
  onChange,
  onClose,
  onPrevious,
  onNext,
}: ConfigureDiscountStepProps) {
  const summary = savingsSummary(data.discountMode, data.discountValue, data.offerType)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-xl space-y-8">

          {/* ── Customer Discount ───────────────────────────── */}
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Customer Discount</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Define the discount customers receive when they use a creator's promo code or link.
              </p>
            </div>

            {/* Offer Type */}
            <div className="space-y-1.5">
              <Label>Offer Type</Label>
              <Select
                value={data.offerType}
                onValueChange={(v) => onChange({ offerType: v as OfferType })}
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

            {/* Discount Value */}
            <div className="space-y-1.5">
              <Label>Discount Value</Label>
              <DiscountValueInput
                mode={data.discountMode}
                onModeChange={(mode) => onChange({ discountMode: mode })}
                value={data.discountValue}
                onChange={(value) => onChange({ discountValue: value })}
              />
            </div>

            {/* Savings summary alert */}
            {summary && (
              <div className="flex items-center gap-2.5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                <svg
                  viewBox="0 0 16 16"
                  className="size-4 shrink-0 text-green-600"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {summary}
              </div>
            )}
          </section>

          {/* ── How Creators Share This Offer ───────────────── */}
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                How Creators Share This Offer
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Choose how creators will distribute this offer to their audience.
              </p>
            </div>

            {/* SecureCodes card */}
            <FeatureToggleCard
              icon={<Shield className="size-4" />}
              title="Enable SecureCodes™"
              description="Each creator gets a unique, tamper-proof promo code that prevents sharing or unauthorized use."
              recommended
              checked={data.enableSecureCodes}
              onCheckedChange={(checked) => onChange({ enableSecureCodes: checked })}
              checklistItems={[
                "Unique code per creator",
                "Fraud-resistant & non-transferable",
                "Real-time usage tracking",
              ]}
              footerLink={{ label: "How SecureCodes™ Work?", onClick: () => {} }}
            />

            {/* Landing Page card */}
            <FeatureToggleCard
              icon={<Globe className="size-4" />}
              title="Create Offer Landing Page"
              description="Generate a branded landing page creators can share with their audience directly."
              recommended
              checked={data.enableLandingPage}
              onCheckedChange={(checked) => onChange({ enableLandingPage: checked })}
            />

            {/* Collapsible sections */}
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
      </div>

      {/* Footer */}
      <FormFooter
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
        showPrevious
        nextLabel="Next"
      />
    </div>
  )
}

export {
  ConfigureDiscountStep,
  type ConfigureDiscountStepProps,
  type ConfigureDiscountStepData,
  type OfferType,
}
