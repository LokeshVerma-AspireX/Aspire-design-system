"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { StepperSidebar, type StepDef } from "@/components/shared/StepperSidebar"
import { OfferDetailsStep, type OfferDetailsStepData } from "./OfferDetailsStep"
import { ConfigureDiscountStep, type ConfigureDiscountStepData } from "./ConfigureDiscountStep"
import { CreatorEarningsStep } from "./CreatorEarningsStep"
import { AdvanceConfigStep } from "./AdvanceConfigStep"
import { ReviewCreateStep } from "./ReviewCreateStep"

const STEPS: StepDef[] = [
  { id: "offer-basics",         label: "Offer Basics" },
  { id: "configure-discount",   label: "Configure Discount" },
  { id: "creator-earnings",     label: "Creator Earnings" },
  { id: "advance-config",       label: "Advance Config" },
  { id: "review-create",        label: "Review & Create" },
]

interface CreateOfferWizardProps {
  initialStep?: number
  onClose?: () => void
  onSubmit?: () => void
  className?: string
}

const DEFAULT_OFFER_DETAILS: OfferDetailsStepData = {
  offerName: "",
  offerDescription: "",
  dateRange: {},
  generatePromoCodes: false,
}

const DEFAULT_DISCOUNT_CONFIG: ConfigureDiscountStepData = {
  offerType: "",
  discountMode: "percent",
  discountValue: "",
  enableSecureCodes: true,
  enableLandingPage: false,
}

function CreateOfferWizard({
  initialStep = 0,
  onClose,
  onSubmit,
  className,
}: CreateOfferWizardProps) {
  const [activeStep, setActiveStep] = React.useState(initialStep)
  const [offerDetails, setOfferDetails] = React.useState<OfferDetailsStepData>(DEFAULT_OFFER_DETAILS)
  const [discountConfig, setDiscountConfig] = React.useState<ConfigureDiscountStepData>(DEFAULT_DISCOUNT_CONFIG)

  function goNext() {
    setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  }

  function goPrevious() {
    setActiveStep((prev) => Math.max(prev - 1, 0))
  }

  const commonProps = { onClose, onPrevious: goPrevious, onNext: goNext }

  function renderStep() {
    switch (activeStep) {
      case 0:
        return (
          <OfferDetailsStep
            data={offerDetails}
            onChange={(patch) => setOfferDetails((prev) => ({ ...prev, ...patch }))}
            onClose={onClose}
            onNext={goNext}
          />
        )
      case 1:
        return (
          <ConfigureDiscountStep
            data={discountConfig}
            onChange={(patch) => setDiscountConfig((prev) => ({ ...prev, ...patch }))}
            {...commonProps}
          />
        )
      case 2:
        return <CreatorEarningsStep {...commonProps} />
      case 3:
        return <AdvanceConfigStep {...commonProps} />
      case 4:
        return (
          <ReviewCreateStep
            offerDetails={offerDetails}
            discountConfig={discountConfig}
            onClose={onClose}
            onPrevious={goPrevious}
            onSubmit={onSubmit}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("flex h-full flex-col overflow-hidden bg-background", className)}>
      {/* Wizard title bar */}
      <div className="flex items-center border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">Creating New Offer</h1>
      </div>

      {/* Body: stepper + active step */}
      <div className="flex flex-1 overflow-hidden">
        <StepperSidebar steps={STEPS} activeStep={activeStep} />
        <div className="flex flex-1 flex-col overflow-hidden">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}

export { CreateOfferWizard, type CreateOfferWizardProps, STEPS }
