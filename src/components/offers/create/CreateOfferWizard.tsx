"use client"

import * as React from "react"
import {
  Tag,
  Shield,
  Globe,
  Settings2,
  ClipboardCheck,
  Percent,
} from "lucide-react"
import { CreationWizard, type WizardStep } from "@/components/shared/wizard"
import { OfferBasicsWizardStep } from "./steps/OfferBasicsWizardStep"
import { ConfigureDiscountWizardStep } from "./steps/ConfigureDiscountWizardStep"
import { CreatorEarningsWizardStep } from "./steps/CreatorEarningsWizardStep"
import { AdvanceConfigWizardStep } from "./steps/AdvanceConfigWizardStep"
import { OfferReviewWizardStep } from "./steps/OfferReviewWizardStep"

// ─── Steps definition ────────────────────────────────────────────────────────

const OFFER_STEPS: WizardStep[] = [
  {
    id: "offer-basics",
    label: "Offer Basics",
    icon: Tag,
    component: OfferBasicsWizardStep,
    validation: (data) => {
      if (!data.offerName?.trim()) return "Offer name is required"
      return true
    },
  },
  {
    id: "configure-discount",
    label: "Configure Discount",
    icon: Percent,
    component: ConfigureDiscountWizardStep,
  },
  {
    id: "creator-earnings",
    label: "Creator Earnings",
    component: CreatorEarningsWizardStep,
  },
  {
    id: "advance-config",
    label: "Advance Config",
    icon: Settings2,
    optional: true,
    component: AdvanceConfigWizardStep,
  },
  {
    id: "review-create",
    label: "Review & Create",
    icon: ClipboardCheck,
    component: OfferReviewWizardStep,
  },
]

// ─── Default data ────────────────────────────────────────────────────────────

const DEFAULT_OFFER_DATA: Record<string, any> = {
  offerName: "",
  offerDescription: "",
  dateRangeFrom: "",
  dateRangeTo: "",
  generatePromoCodes: false,
  offerType: "",
  discountMode: "percent",
  discountValue: "",
  enableSecureCodes: true,
  enableLandingPage: false,
}

// ─── Component ───────────────────────────────────────────────────────────────

interface CreateOfferWizardProps {
  initialStep?: number
  onClose?: () => void
  onSubmit?: (data?: Record<string, any>) => void
  className?: string
}

function CreateOfferWizard({
  initialStep = 0,
  onClose,
  onSubmit,
  className,
}: CreateOfferWizardProps) {
  return (
    <CreationWizard
      title="Creating New Offer"
      steps={OFFER_STEPS}
      initialStep={initialStep}
      initialData={DEFAULT_OFFER_DATA}
      onComplete={(data) => onSubmit?.(data)}
      onCancel={() => onClose?.()}
      completeLabel="Create Offer"
      className={className}
    />
  )
}

export { CreateOfferWizard, type CreateOfferWizardProps, OFFER_STEPS as STEPS }
