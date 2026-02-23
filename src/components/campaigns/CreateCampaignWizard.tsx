"use client"

import * as React from "react"
import {
  Megaphone,
  Gift,
  Link2,
  Crown,
  Sparkles,
  Users,
  DollarSign,
  Settings2,
  ClipboardCheck,
} from "lucide-react"
import { CreationWizard, type WizardStep } from "@/components/shared/wizard"
import { CampaignBasicsStep } from "./steps/CampaignBasicsStep"
import { CreatorRequirementsStep } from "./steps/CreatorRequirementsStep"
import { CompensationStep } from "./steps/CompensationStep"
import { CampaignAdvancedStep } from "./steps/CampaignAdvancedStep"
import { CampaignReviewStep } from "./steps/CampaignReviewStep"

interface CreateCampaignWizardProps {
  initialStep?: number
  initialData?: Record<string, any>
  onClose?: () => void
  onSubmit?: (data: Record<string, any>) => void
  className?: string
}

const CAMPAIGN_STEPS: WizardStep[] = [
  {
    id: "basics",
    label: "Campaign Basics",
    icon: Megaphone,
    description: "Name, type, dates, and cover image",
    component: CampaignBasicsStep,
    validation: (data) => {
      if (!data.campaignName?.trim()) return "Campaign name is required"
      if (!data.campaignType) return "Campaign type is required"
      return true
    },
  },
  {
    id: "creators",
    label: "Creator Requirements",
    icon: Users,
    description: "Platforms, followers, and deliverables",
    component: CreatorRequirementsStep,
  },
  {
    id: "compensation",
    label: "Compensation & Terms",
    icon: DollarSign,
    description: "Payment, rights, and exclusivity",
    component: CompensationStep,
  },
  {
    id: "advanced",
    label: "Advanced Settings",
    icon: Settings2,
    description: "Tracking, approvals, and notifications",
    component: CampaignAdvancedStep,
    optional: true,
  },
  {
    id: "review",
    label: "Review & Create",
    icon: ClipboardCheck,
    description: "Review all details before launching",
    component: CampaignReviewStep,
  },
]

function CreateCampaignWizard({
  initialStep = 0,
  initialData,
  onClose,
  onSubmit,
  className,
}: CreateCampaignWizardProps) {
  return (
    <CreationWizard
      title="Create New Campaign"
      steps={CAMPAIGN_STEPS}
      initialStep={initialStep}
      initialData={initialData}
      onComplete={(data) => onSubmit?.(data)}
      onCancel={() => onClose?.()}
      completeLabel="Create Campaign"
      className={className}
    />
  )
}

export { CreateCampaignWizard, type CreateCampaignWizardProps }
