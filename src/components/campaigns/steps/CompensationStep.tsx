"use client"

import * as React from "react"
import { DollarSign, TrendingUp, Gift, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FeatureToggleCard } from "@/components/shared/FeatureToggleCard"
import type { WizardStepProps } from "@/components/shared/wizard"

// ─── Constants ───────────────────────────────────────────────────────────────

const COMPENSATION_TYPES = [
  {
    value: "fixed",
    label: "Fixed Rate",
    description: "Set a fixed payment amount per creator",
    icon: DollarSign,
  },
  {
    value: "performance",
    label: "Performance Based",
    description: "Pay based on results and metrics",
    icon: TrendingUp,
  },
  {
    value: "product",
    label: "Product Only",
    description: "Compensate creators with free products",
    icon: Gift,
  },
  {
    value: "hybrid",
    label: "Hybrid",
    description: "Combine fixed rate with performance bonuses",
    icon: Layers,
  },
] as const

const USAGE_RIGHTS_OPTIONS = [
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
  { value: "365", label: "1 year" },
  { value: "perpetual", label: "Perpetual" },
]

const CONTRACT_TEMPLATES = [
  { value: "standard", label: "Standard Creator Agreement" },
  { value: "ambassador", label: "Ambassador Contract" },
  { value: "affiliate", label: "Affiliate Agreement" },
  { value: "custom", label: "Upload Custom" },
]

// ─── Component ───────────────────────────────────────────────────────────────

function CompensationStep({ data, updateData }: WizardStepProps) {
  const compensationType = data.compensationType ?? ""
  const showPayment = compensationType === "fixed" || compensationType === "hybrid"
  const showCommission = compensationType === "performance" || compensationType === "hybrid"

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-base font-semibold text-foreground">Compensation & Terms</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Define how creators will be compensated and the terms of the partnership.
        </p>
      </div>

      {/* Compensation Type */}
      <section className="space-y-3">
        <Label>Compensation Type</Label>
        <div className="grid grid-cols-2 gap-3">
          {COMPENSATION_TYPES.map((type) => {
            const isSelected = compensationType === type.value
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => updateData("compensationType", type.value)}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-muted-foreground/30"
                )}
              >
                <type.icon
                  className={cn(
                    "size-5",
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  )}
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">{type.label}</p>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Payment Amount */}
      {showPayment && (
        <section className="space-y-1.5">
          <Label htmlFor="payment-amount">Payment Amount (per creator)</Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <Input
              id="payment-amount"
              type="number"
              min="0"
              step="50"
              placeholder="0.00"
              value={data.paymentAmount ?? ""}
              onChange={(e) => updateData("paymentAmount", e.target.value)}
              className="pl-7"
            />
          </div>
        </section>
      )}

      {/* Commission Rate */}
      {showCommission && (
        <section className="space-y-1.5">
          <Label htmlFor="commission-rate">Commission Rate</Label>
          <div className="relative">
            <Input
              id="commission-rate"
              type="number"
              min="0"
              max="100"
              step="0.5"
              placeholder="e.g. 15"
              value={data.commissionRate ?? ""}
              onChange={(e) => updateData("commissionRate", e.target.value)}
              className="pr-8"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              %
            </span>
          </div>
        </section>
      )}

      {/* Product Seeding */}
      <FeatureToggleCard
        icon={<Gift className="size-4" />}
        title="Product Seeding"
        description="Send products to creators before the campaign starts so they can create authentic content."
        checked={data.productSeeding ?? false}
        onCheckedChange={(checked) => updateData("productSeeding", checked)}
      />

      {/* Usage Rights */}
      <section className="space-y-1.5">
        <Label>Usage Rights</Label>
        <Select
          value={data.usageRights ?? ""}
          onValueChange={(v) => updateData("usageRights", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select usage rights period..." />
          </SelectTrigger>
          <SelectContent>
            {USAGE_RIGHTS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          How long you can reuse creator content across your channels.
        </p>
      </section>

      {/* Exclusivity */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label>Exclusivity</Label>
            <p className="text-xs text-muted-foreground">
              Prevent creators from working with competitors during the campaign.
            </p>
          </div>
          <Switch
            checked={data.exclusivity ?? false}
            onCheckedChange={(checked) => updateData("exclusivity", checked)}
          />
        </div>
        {data.exclusivity && (
          <div className="space-y-1.5">
            <Label htmlFor="exclusivity-duration">Exclusivity Duration (days)</Label>
            <Input
              id="exclusivity-duration"
              type="number"
              min="1"
              placeholder="e.g. 30"
              value={data.exclusivityDuration ?? ""}
              onChange={(e) => updateData("exclusivityDuration", e.target.value)}
            />
          </div>
        )}
      </section>

      {/* Contract Template */}
      <section className="space-y-1.5">
        <Label>Contract Template</Label>
        <Select
          value={data.contractTemplate ?? ""}
          onValueChange={(v) => updateData("contractTemplate", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a contract template..." />
          </SelectTrigger>
          <SelectContent>
            {CONTRACT_TEMPLATES.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
    </div>
  )
}

export { CompensationStep }
