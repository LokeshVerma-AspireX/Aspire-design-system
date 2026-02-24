import {
  Eye,
  Camera,
  TrendingUp,
  Gift,
  Handshake,
  Megaphone,
  Package,
  Users,
  Settings2,
} from "lucide-react"
import type {
  CampaignObjective,
  CampaignTemplateType,
  ObjectiveCardConfig,
  CampaignTypeCardConfig,
  KpiPeriodOption,
} from "./types"

// ── Objective Cards ───────────────────────────────────────────────────────────

export const OBJECTIVES: ObjectiveCardConfig[] = [
  {
    id: "brand_awareness",
    title: "Brand Awareness",
    description:
      "Increase reach, impressions, and brand visibility through creator audiences",
    icon: Eye,
    selectedColor: "border-purple-500 bg-purple-50 dark:bg-purple-950/30",
    kpiLabel: "Impressions target",
    kpiPlaceholder: "e.g., 2,000,000",
  },
  {
    id: "content_creation",
    title: "Content Creation",
    description:
      "Get high-quality posts, reels, or videos from creators for your brand",
    icon: Camera,
    selectedColor: "border-teal-500 bg-teal-50 dark:bg-teal-950/30",
    kpiLabel: "Content pieces",
    kpiPlaceholder: "e.g., 100",
  },
  {
    id: "sales_conversions",
    title: "Sales & Conversions",
    description:
      "Drive revenue through affiliate links, promo codes, and creator-driven sales",
    icon: TrendingUp,
    selectedColor: "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
    kpiLabel: "Revenue target",
    kpiPlaceholder: "e.g., $50,000",
  },
  {
    id: "product_seeding",
    title: "Product Seeding",
    description:
      "Get your products into creators' hands and track organic mentions",
    icon: Gift,
    selectedColor: "border-rose-500 bg-rose-50 dark:bg-rose-950/30",
    kpiLabel: "Products to seed",
    kpiPlaceholder: "e.g., 500",
  },
  {
    id: "ambassador_program",
    title: "Ambassador Program",
    description:
      "Run a long-term creator partnership with recurring deliverables",
    icon: Handshake,
    selectedColor: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
    kpiLabel: "Active creators",
    kpiPlaceholder: "e.g., 25",
  },
]

// ── KPI Period Options ────────────────────────────────────────────────────────

export const KPI_PERIODS: KpiPeriodOption[] = [
  { value: "total_campaign", label: "Total campaign" },
  { value: "per_month", label: "Per month" },
  { value: "per_quarter", label: "Per quarter" },
]

// ── Campaign Type Cards ───────────────────────────────────────────────────────

export const CAMPAIGN_TYPES: CampaignTypeCardConfig[] = [
  {
    id: "influencer_campaign",
    title: "Influencer Campaign",
    subtitle: "Work with creators in exchange for content or promotion",
    icon: Megaphone,
    selectedColor: "border-purple-500 bg-purple-50 dark:bg-purple-950/30",
    workflowType: "standard",
    stages: [
      { label: "Welcome Email" },
      { label: "Send Brief" },
      { label: "Product Fulfillment" },
      { label: "Content Review" },
      { label: "Payment" },
    ],
  },
  {
    id: "product_seeding",
    title: "Product Seeding",
    subtitle: "Gift products to creators with no obligation to post",
    icon: Package,
    selectedColor: "border-rose-500 bg-rose-50 dark:bg-rose-950/30",
    workflowType: "flexible",
    stages: [
      { label: "Welcome Email" },
      { label: "Product Catalog" },
      { label: "Track Posts" },
    ],
  },
  {
    id: "ambassador_program",
    title: "Ambassador Program",
    subtitle: "Work with creators over an extended period",
    icon: Users,
    selectedColor: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
    workflowType: "flexible",
    stages: [
      { label: "Welcome Email" },
      { label: "Send Brief" },
      { label: "Product Catalog" },
      { label: "Content Review" },
      { label: "Sales Tracking" },
      { label: "Payment" },
    ],
  },
  {
    id: "custom_project",
    title: "Custom Project",
    subtitle: "Create a campaign with your own custom stages",
    icon: Settings2,
    selectedColor: "border-gray-500 bg-gray-50 dark:bg-gray-950/30",
    workflowType: "custom",
    stages: [],
    stageNote:
      "No default stages \u2014 you\u2019ll configure these in Settings \u2192 Workflow",
  },
]

// ── Recommendation Logic ──────────────────────────────────────────────────────

export const OBJECTIVE_TO_RECOMMENDED_TYPE: Record<
  CampaignObjective,
  CampaignTemplateType
> = {
  brand_awareness: "influencer_campaign",
  content_creation: "influencer_campaign",
  sales_conversions: "influencer_campaign",
  product_seeding: "product_seeding",
  ambassador_program: "ambassador_program",
}

// ── Placeholder Name Mapping ──────────────────────────────────────────────────

const PLACEHOLDER_NAMES: Record<string, string> = {
  "brand_awareness:influencer_campaign": "e.g., Summer 2026 Awareness Push",
  "content_creation:influencer_campaign": "e.g., Q1 Creator Content Sprint",
  "sales_conversions:influencer_campaign": "e.g., Spring Affiliate Campaign",
  "product_seeding:product_seeding": "e.g., New Product Launch Seeding",
  "ambassador_program:ambassador_program": "e.g., 2026 Brand Ambassadors",
}

const DEFAULT_PLACEHOLDER = "e.g., My Custom Campaign"

export function getPlaceholderName(
  objective?: CampaignObjective,
  campaignType?: CampaignTemplateType
): string {
  if (!objective || !campaignType) return DEFAULT_PLACEHOLDER
  return (
    PLACEHOLDER_NAMES[`${objective}:${campaignType}`] ?? DEFAULT_PLACEHOLDER
  )
}

// ── Step Labels ───────────────────────────────────────────────────────────────

export const STEP_LABELS = [
  "Objective",
  "Campaign Type",
  "Details",
  "Review",
] as const

// ── Next Steps (contextual based on template) ─────────────────────────────────

export function getNextSteps(campaignType?: CampaignTemplateType): string[] {
  const base = [
    "Design your application page for creator recruitment",
    "Set up automations to save time",
  ]

  switch (campaignType) {
    case "influencer_campaign":
      return [
        "Configure your brief template with deliverables and compensation",
        "Set up product catalogs for creator selection",
        ...base,
        "Define offers and tracking links",
      ]
    case "product_seeding":
      return [
        "Set up product catalogs for creator selection",
        ...base,
      ]
    case "ambassador_program":
      return [
        "Configure your brief template with deliverables and compensation",
        "Set up product catalogs for creator selection",
        ...base,
        "Define offers and tracking links",
      ]
    case "custom_project":
      return [
        "Configure your workflow stages in Settings",
        ...base,
      ]
    default:
      return base
  }
}
