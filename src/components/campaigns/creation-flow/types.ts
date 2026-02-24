import type * as React from "react"

// ── Objective ─────────────────────────────────────────────────────────────────

export type CampaignObjective =
  | "brand_awareness"
  | "content_creation"
  | "sales_conversions"
  | "product_seeding"
  | "ambassador_program"

export interface ObjectiveCardConfig {
  id: CampaignObjective
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  selectedColor: string
  kpiLabel: string
  kpiPlaceholder: string
}

// ── Campaign Type ─────────────────────────────────────────────────────────────

export type CampaignTemplateType =
  | "influencer_campaign"
  | "product_seeding"
  | "ambassador_program"
  | "custom_project"

export interface WorkflowStage {
  label: string
}

export type WorkflowType = "standard" | "flexible" | "custom"

export interface CampaignTypeCardConfig {
  id: CampaignTemplateType
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  selectedColor: string
  stages: WorkflowStage[]
  workflowType: WorkflowType
  stageNote?: string
}

// ── KPI ───────────────────────────────────────────────────────────────────────

export type KpiPeriod = "total_campaign" | "per_month" | "per_quarter"

export interface KpiPeriodOption {
  value: KpiPeriod
  label: string
}

// ── Creation Flow Data ────────────────────────────────────────────────────────

export interface CampaignCreationData {
  objective?: CampaignObjective
  kpiTarget?: string
  kpiPeriod?: KpiPeriod
  campaignType?: CampaignTemplateType
  campaignName?: string
  startDate?: string
  endDate?: string
}

// ── Step Props ────────────────────────────────────────────────────────────────

export interface CreationFlowStepProps {
  data: CampaignCreationData
  updateData: (key: keyof CampaignCreationData, value: any) => void
  errors: Record<string, string>
  onGoToStep?: (step: number) => void
}

// ── Flow Props ────────────────────────────────────────────────────────────────

export interface CampaignCreationFlowProps {
  onComplete: (data: CampaignCreationData) => void
  onCancel: () => void
  initialData?: Partial<CampaignCreationData>
  initialStep?: number
  className?: string
}
