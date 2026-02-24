import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import * as React from "react"
import { CampaignCreationFlow } from "@/components/campaigns/creation-flow"
import { AppShell } from "@/components/layout/AppShell"
import type { CampaignCreationData } from "@/components/campaigns/creation-flow"

/**
 * # Campaign Creation Flow
 *
 * A 4-step, goal-first campaign creation wizard designed to be completed in
 * under 60 seconds. Anchors every campaign to a measurable objective, recommends
 * the right template, and sets up default workflow stages.
 *
 * ## Steps
 *
 * 1. **Objective** — Select primary campaign goal (Brand Awareness, Content Creation,
 *    Sales & Conversions, Product Seeding, Ambassador Program) with optional KPI target
 * 2. **Campaign Type** — Choose execution template (Influencer Campaign, Product Seeding,
 *    Ambassador Program, Custom Project) with smart recommendation based on objective
 * 3. **Details** — Campaign name (required, 35 char max), start date, optional end date
 * 4. **Review & Create** — Summary with edit links, workflow stage preview, and next steps
 *
 * ## Components Used
 *
 * - `CampaignCreationFlow` — Main orchestrator
 * - `HorizontalStepper` — Step indicator at top
 * - `CampaignCreationHeader` — Back link + close button
 * - `UnsavedChangesDialog` — Confirmation on close with unsaved data
 * - `WorkflowStagePreview` — Connected pill chain for stages
 * - `ObjectiveStep`, `CampaignTypeStep`, `DetailsStep`, `ReviewStep`
 *
 * ## Features
 *
 * - Horizontal stepper with completed/active/upcoming states
 * - Smart campaign type recommendation based on selected objective
 * - KPI target slide-in animation after objective selection
 * - Workflow stage preview as connected pills
 * - Unsaved changes confirmation dialog
 * - Dynamic placeholder names based on objective + type combo
 * - Character counter on campaign name (35 max)
 * - Contextual hints (e.g., "Ambassador programs don't have an end date")
 * - Edit buttons on review step navigate back to relevant step
 *
 * ## Usage
 *
 * ```tsx
 * import { CampaignCreationFlow } from "@/components/campaigns/creation-flow"
 *
 * <CampaignCreationFlow
 *   onComplete={(data) => console.log("Created:", data)}
 *   onCancel={() => router.back()}
 * />
 * ```
 */
const meta: Meta<typeof CampaignCreationFlow> = {
  title: "6. Pages/Campaigns/CampaignCreationFlow",
  component: CampaignCreationFlow,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "4-step campaign creation wizard with goal-first approach, smart recommendations, and workflow stage previews.",
      },
    },
  },
  args: {
    onComplete: fn(),
    onCancel: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Step 1: Objective (empty) ─────────────────────────────────────────────────

/** Step 1 with no selection — user sees 5 objective cards. */
export const Step1Objective: Story = {
  name: "Step 1 — Objective",
  args: {
    initialStep: 0,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ── Step 1: Objective Selected ────────────────────────────────────────────────

/** Step 1 with "Brand Awareness" selected and KPI target filled in. Shows the KPI slide-in section. */
export const Step1ObjectiveSelected: Story = {
  name: "Step 1 — Objective Selected",
  args: {
    initialStep: 0,
    initialData: {
      objective: "brand_awareness",
      kpiTarget: "2,000,000",
      kpiPeriod: "total_campaign",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ── Step 2: Campaign Type ─────────────────────────────────────────────────────

/** Step 2 with "Brand Awareness" objective pre-selected. Influencer Campaign appears first with "Recommended" badge. */
export const Step2CampaignType: Story = {
  name: "Step 2 — Campaign Type",
  args: {
    initialStep: 1,
    initialData: {
      objective: "brand_awareness",
      kpiTarget: "2,000,000",
      kpiPeriod: "total_campaign",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ── Step 2: Product Seeding Recommended ───────────────────────────────────────

/** Step 2 with "Product Seeding" objective — Product Seeding type is recommended. */
export const Step2ProductSeedingRecommended: Story = {
  name: "Step 2 — Product Seeding Recommended",
  args: {
    initialStep: 1,
    initialData: {
      objective: "product_seeding",
      kpiTarget: "500",
      kpiPeriod: "total_campaign",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ── Step 3: Details ───────────────────────────────────────────────────────────

/** Step 3 with objective and type pre-selected. Dynamic placeholder based on selections. */
export const Step3Details: Story = {
  name: "Step 3 — Details",
  args: {
    initialStep: 2,
    initialData: {
      objective: "brand_awareness",
      kpiTarget: "2,000,000",
      kpiPeriod: "total_campaign",
      campaignType: "influencer_campaign",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ── Step 3: Ambassador Details ────────────────────────────────────────────────

/** Step 3 for an Ambassador Program — shows contextual hint about end dates. */
export const Step3AmbassadorDetails: Story = {
  name: "Step 3 — Ambassador Details",
  args: {
    initialStep: 2,
    initialData: {
      objective: "ambassador_program",
      kpiTarget: "25",
      kpiPeriod: "per_month",
      campaignType: "ambassador_program",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ── Step 4: Review ────────────────────────────────────────────────────────────

/** Step 4 with all fields completed. Shows campaign summary, workflow stages, and next steps. */
export const Step4Review: Story = {
  name: "Step 4 — Review & Create",
  args: {
    initialStep: 3,
    initialData: {
      objective: "brand_awareness",
      kpiTarget: "2,000,000",
      kpiPeriod: "total_campaign",
      campaignType: "influencer_campaign",
      campaignName: "Summer 2026 Awareness Push",
      startDate: "2026-03-01",
      endDate: "2026-06-30",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ── Step 4: Review (No KPI) ───────────────────────────────────────────────────

/** Step 4 without a KPI target set — shows "Not set yet" in muted text. */
export const Step4ReviewNoKpi: Story = {
  name: "Step 4 — Review (No KPI)",
  args: {
    initialStep: 3,
    initialData: {
      objective: "content_creation",
      campaignType: "influencer_campaign",
      campaignName: "Q1 Creator Content Sprint",
      startDate: "2026-02-01",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ── Full Flow with AppShell ───────────────────────────────────────────────────

/** Full creation flow wrapped in AppShell with collapsed sidebar for context. */
export const FullFlowWithAppShell: Story = {
  name: "Full Flow (with Sidebar)",
  args: {
    initialStep: 0,
  },
  render: (args) => (
    <AppShell
      activeHref="/campaigns"
      user={{ name: "Lokesh Verma", initials: "LV" }}
      badgeCounts={{ messages: 3 }}
      defaultCollapsed
    >
      <div className="h-full overflow-hidden">
        <CampaignCreationFlow {...args} />
      </div>
    </AppShell>
  ),
}

// ── Duplicate Campaign ────────────────────────────────────────────────────────

/** Duplicate campaign flow — starts at Step 3 with pre-filled data from source campaign. Name has "(Copy)" appended. */
export const DuplicateCampaign: Story = {
  name: "Duplicate Campaign",
  args: {
    initialStep: 2,
    initialData: {
      objective: "sales_conversions",
      kpiTarget: "$50,000",
      kpiPeriod: "per_quarter",
      campaignType: "influencer_campaign",
      campaignName: "Spring Affiliate Campaign (Copy)",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}
