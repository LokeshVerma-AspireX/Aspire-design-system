import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn, within, userEvent, expect, waitFor } from "storybook/test"
import * as React from "react"
import { CampaignCreationFlow } from "@/components/campaigns/creation-flow"
import { AppShell } from "@/components/layout/AppShell"
import type { CampaignCreationData } from "@/components/campaigns/creation-flow"

/**
 * # Campaign Creation Flow — V2 Stories
 *
 * Comprehensive coverage of all states, edge cases, and interaction paths for
 * the 4-step campaign creation wizard.
 *
 * ## What's New in V2
 *
 * - **All 5 objective variations** — each with its appropriate KPI slide-in
 * - **All 4 campaign type selections** — with stage previews and recommendation badges
 * - **Details step edge cases** — character counter at limit, end date validation error
 * - **All 4 review variations** — one per campaign template type
 * - **Special states** — submitting spinner, unsaved changes dialog, date validation error
 * - **Full flows** per objective type — Content Creation, Sales, Ambassador, Custom
 *
 * ## Error States Covered
 *
 * | State | How to Reproduce |
 * |-------|----------------|
 * | End date before start date | `Step3_EndDateValidationError` — play function clicks Continue |
 * | Name at character limit | `Step3_AtCharacterLimit` — name is exactly 35 chars |
 * | Submitting (loading) | `State_Submitting` — `isSubmitting: true` prop |
 * | Unsaved changes dialog | `State_UnsavedChangesDialog` — pre-opened via prop |
 *
 * ## Navigation & Interaction Rules
 *
 * - **Back** text link is shown on Steps 2–4 (not Step 1)
 * - **X** close button triggers unsaved-changes guard if any data was entered
 * - **Escape key** also triggers close with guard
 * - **Continue** is disabled until required field(s) for each step are filled
 */
const meta: Meta<typeof CampaignCreationFlow> = {
  title: "6. Pages/Campaigns/CampaignCreationFlow V2",
  component: CampaignCreationFlow,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "V2 comprehensive coverage: all objective variations, campaign type variations, edge cases, error states, and full flow walkthroughs.",
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

// ─────────────────────────────────────────────────────────────────────────────
// A. STEP 1 — All Objective Variations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Step 1 blank slate — user sees all 5 objective cards, Continue button is disabled
 * until one is selected. Shows the default empty state of the first step.
 */
export const Step1_EmptyState: Story = {
  name: "Step 1 / Objective — Empty (CTA disabled)",
  args: { initialStep: 0 },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 1 — "Content Creation" selected with KPI target of 100 content pieces/quarter.
 * The KPI slide-in animates in after selection.
 */
export const Step1_ContentCreationSelected: Story = {
  name: "Step 1 / Objective — Content Creation selected",
  args: {
    initialStep: 0,
    initialData: {
      objective: "content_creation",
      kpiTarget: "100",
      kpiPeriod: "per_quarter",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 1 — "Sales & Conversions" selected with a revenue target of $50,000/quarter.
 * This objective recommends Influencer Campaign in Step 2.
 */
export const Step1_SalesConversionsSelected: Story = {
  name: "Step 1 / Objective — Sales & Conversions selected",
  args: {
    initialStep: 0,
    initialData: {
      objective: "sales_conversions",
      kpiTarget: "$50,000",
      kpiPeriod: "per_quarter",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 1 — "Product Seeding" selected with 500 products to seed. This objective
 * uniquely recommends the Product Seeding campaign type in Step 2.
 */
export const Step1_ProductSeedingSelected: Story = {
  name: "Step 1 / Objective — Product Seeding selected",
  args: {
    initialStep: 0,
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

/**
 * Step 1 — "Ambassador Program" selected with 25 active creators per month.
 * This objective recommends Ambassador Program in Step 2 and shows a contextual
 * "no end date" hint in Step 3.
 */
export const Step1_AmbassadorProgramSelected: Story = {
  name: "Step 1 / Objective — Ambassador Program selected",
  args: {
    initialStep: 0,
    initialData: {
      objective: "ambassador_program",
      kpiTarget: "25",
      kpiPeriod: "per_month",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 1 — "Brand Awareness" selected with no KPI entered (KPI is optional).
 * Demonstrates that the Continue button is enabled even without a KPI value.
 */
export const Step1_ObjectiveSelectedNoKpi: Story = {
  name: "Step 1 / Objective — Selected, no KPI (optional field)",
  args: {
    initialStep: 0,
    initialData: {
      objective: "brand_awareness",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// B. STEP 2 — All Campaign Type Variations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Step 2 — Content Creation objective → "Influencer Campaign" recommended first.
 * Same recommendation as Brand Awareness and Sales & Conversions.
 */
export const Step2_ContentCreationObjective: Story = {
  name: "Step 2 / Campaign Type — Content Creation → Influencer recommended",
  args: {
    initialStep: 1,
    initialData: {
      objective: "content_creation",
      kpiTarget: "100",
      kpiPeriod: "per_quarter",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 2 — Sales & Conversions objective → "Influencer Campaign" recommended.
 * Shows the "Recommended" badge prominently with the Influencer Campaign card first.
 */
export const Step2_SalesConversionsObjective: Story = {
  name: "Step 2 / Campaign Type — Sales & Conversions → Influencer recommended",
  args: {
    initialStep: 1,
    initialData: {
      objective: "sales_conversions",
      kpiTarget: "$50,000",
      kpiPeriod: "per_quarter",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 2 — Ambassador Program objective → "Ambassador Program" card is recommended
 * and floats to top. Shows the 6-stage workflow preview.
 */
export const Step2_AmbassadorObjective: Story = {
  name: "Step 2 / Campaign Type — Ambassador → Ambassador recommended",
  args: {
    initialStep: 1,
    initialData: {
      objective: "ambassador_program",
      kpiTarget: "25",
      kpiPeriod: "per_month",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 2 — "Custom Project" selected. Shows the "No default stages" note
 * and the grey selected state. CTA is enabled.
 */
export const Step2_CustomProjectSelected: Story = {
  name: "Step 2 / Campaign Type — Custom Project selected",
  args: {
    initialStep: 1,
    initialData: {
      objective: "brand_awareness",
      kpiTarget: "2,000,000",
      kpiPeriod: "total_campaign",
      campaignType: "custom_project",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 2 — "Product Seeding" type selected (user overrides recommendation).
 * Shows 3-stage workflow: Welcome Email → Product Catalog → Track Posts.
 */
export const Step2_ProductSeedingSelected: Story = {
  name: "Step 2 / Campaign Type — Product Seeding selected",
  args: {
    initialStep: 1,
    initialData: {
      objective: "brand_awareness",
      kpiTarget: "2,000,000",
      kpiPeriod: "total_campaign",
      campaignType: "product_seeding",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 2 — No campaign type selected yet (blank state). Continue CTA is disabled.
 * User sees all 4 type cards with "Recommended" badge on top card.
 */
export const Step2_EmptyState: Story = {
  name: "Step 2 / Campaign Type — Empty (CTA disabled)",
  args: {
    initialStep: 1,
    initialData: {
      objective: "brand_awareness",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// C. STEP 3 — Details Edge Cases
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Step 3 — Campaign name approaching limit (25/35 characters). Counter is
 * shown in muted color, not yet warning.
 */
export const Step3_NearCharacterLimit: Story = {
  name: "Step 3 / Details — Near character limit (25/35)",
  args: {
    initialStep: 2,
    initialData: {
      objective: "brand_awareness",
      kpiTarget: "2,000,000",
      kpiPeriod: "total_campaign",
      campaignType: "influencer_campaign",
      campaignName: "Summer 2026 Awareness Push",
      startDate: "2026-03-01",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 3 — Campaign name exactly at 35-character limit. Counter turns red
 * and no more characters can be typed. The Continue CTA is enabled (name is valid).
 */
export const Step3_AtCharacterLimit: Story = {
  name: "Step 3 / Details — At character limit (35/35, counter red)",
  args: {
    initialStep: 2,
    initialData: {
      objective: "sales_conversions",
      kpiTarget: "$50,000",
      kpiPeriod: "per_quarter",
      campaignType: "influencer_campaign",
      campaignName: "Spring Affiliate 2026 Revenue Drive",
      startDate: "2026-04-01",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 3 — Ambassador Program shows contextual hint below the end date field:
 * "Ambassador programs typically don't have an end date."
 */
export const Step3_AmbassadorHint: Story = {
  name: "Step 3 / Details — Ambassador contextual hint (no end date)",
  args: {
    initialStep: 2,
    initialData: {
      objective: "ambassador_program",
      kpiTarget: "25",
      kpiPeriod: "per_month",
      campaignType: "ambassador_program",
      campaignName: "2026 Brand Ambassadors",
      startDate: "2026-03-01",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 3 — End date is set to a date before the start date. Clicking Continue
 * triggers the field-level validation error: "End date must be after the start date."
 *
 * **Play function** automatically clicks Continue to reveal the inline error.
 */
export const Step3_EndDateValidationError: Story = {
  name: "Step 3 / Details — End date before start date (validation error)",
  args: {
    initialStep: 2,
    initialData: {
      objective: "content_creation",
      kpiTarget: "100",
      kpiPeriod: "per_quarter",
      campaignType: "influencer_campaign",
      campaignName: "Q1 Creator Content Sprint",
      startDate: "2026-06-01",
      endDate: "2026-03-01",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click Continue — name is filled so button is enabled; date error fires on validation
    const continueButton = canvas.getByRole("button", { name: /continue/i })
    await userEvent.click(continueButton)
    // Error should appear inline below the end date field
    await waitFor(() =>
      expect(
        canvas.getByText("End date must be after the start date.")
      ).toBeInTheDocument()
    )
  },
}

/**
 * Step 3 — Start date is set to today; no end date entered (left empty).
 * Shows the "No end date" placeholder state.
 */
export const Step3_NoEndDate: Story = {
  name: "Step 3 / Details — No end date (optional, placeholder shown)",
  args: {
    initialStep: 2,
    initialData: {
      objective: "product_seeding",
      kpiTarget: "500",
      kpiPeriod: "total_campaign",
      campaignType: "product_seeding",
      campaignName: "New Product Launch Seeding",
      startDate: "2026-03-01",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 3 — Custom Project flow. Dynamic placeholder shows "e.g., My Custom Campaign"
 * when objective/type combo doesn't match a preset name.
 */
export const Step3_CustomProjectDetails: Story = {
  name: "Step 3 / Details — Custom Project (generic placeholder)",
  args: {
    initialStep: 2,
    initialData: {
      objective: "sales_conversions",
      kpiTarget: "$30,000",
      kpiPeriod: "per_quarter",
      campaignType: "custom_project",
      startDate: "2026-04-01",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// D. STEP 4 — Review Variations (all 4 campaign types)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Step 4 Review — Influencer Campaign with all fields filled, KPI set, end date set.
 * Shows 5-stage workflow: Welcome Email → Send Brief → Product Fulfillment → Content Review → Payment.
 */
export const Step4_InfluencerCampaignReview: Story = {
  name: "Step 4 / Review — Influencer Campaign (fully filled)",
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

/**
 * Step 4 Review — Product Seeding campaign. Shows 3-stage workflow:
 * Welcome Email → Product Catalog → Track Posts. Contextual next-steps list.
 */
export const Step4_ProductSeedingReview: Story = {
  name: "Step 4 / Review — Product Seeding",
  args: {
    initialStep: 3,
    initialData: {
      objective: "product_seeding",
      kpiTarget: "500",
      kpiPeriod: "total_campaign",
      campaignType: "product_seeding",
      campaignName: "New Product Launch Seeding",
      startDate: "2026-03-15",
      endDate: "2026-05-15",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 4 Review — Ambassador Program. Shows 6-stage workflow. No end date
 * (consistent with ambassador pattern). KPI shows 25 active creators/per month.
 */
export const Step4_AmbassadorProgramReview: Story = {
  name: "Step 4 / Review — Ambassador Program (no end date)",
  args: {
    initialStep: 3,
    initialData: {
      objective: "ambassador_program",
      kpiTarget: "25",
      kpiPeriod: "per_month",
      campaignType: "ambassador_program",
      campaignName: "2026 Brand Ambassadors",
      startDate: "2026-03-01",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 4 Review — Custom Project. Workflow section shows the "No stages configured"
 * note. Next-steps list includes "Configure your workflow stages in Settings."
 */
export const Step4_CustomProjectReview: Story = {
  name: "Step 4 / Review — Custom Project (no default stages)",
  args: {
    initialStep: 3,
    initialData: {
      objective: "sales_conversions",
      kpiTarget: "$30,000",
      kpiPeriod: "per_quarter",
      campaignType: "custom_project",
      campaignName: "Q2 Custom Sales Drive",
      startDate: "2026-04-01",
      endDate: "2026-06-30",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 4 Review — No KPI and no end date set. Target shows "Not set yet" in muted text;
 * dates show "Mar 1, 2026 — No end date".
 */
export const Step4_NoKpiNoEndDate: Story = {
  name: "Step 4 / Review — No KPI, No end date (all optional fields empty)",
  args: {
    initialStep: 3,
    initialData: {
      objective: "content_creation",
      campaignType: "influencer_campaign",
      campaignName: "Q1 Creator Content Sprint",
      startDate: "2026-03-01",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * Step 4 Review — Content Creation with KPI per-month target.
 * Shows "100 (Per month)" in the Target row.
 */
export const Step4_ContentCreationReview: Story = {
  name: "Step 4 / Review — Content Creation (per-month KPI)",
  args: {
    initialStep: 3,
    initialData: {
      objective: "content_creation",
      kpiTarget: "100",
      kpiPeriod: "per_month",
      campaignType: "influencer_campaign",
      campaignName: "Q1 Creator Content Sprint",
      startDate: "2026-01-15",
      endDate: "2026-03-31",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// E. SPECIAL STATES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * **Submitting state** — `isSubmitting: true` on the final Review step. The
 * "Create Campaign" button shows a loading spinner and all navigation is blocked.
 * This state persists until `onComplete` resolves and `isSubmitting` is set to false.
 */
export const State_Submitting: Story = {
  name: "Special / Submitting — Loading spinner on Create Campaign",
  args: {
    initialStep: 3,
    isSubmitting: true,
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

/**
 * **Unsaved changes dialog** — Pre-opened confirmation dialog. Fires when the user
 * clicks the X close button (or presses Escape) after entering any data.
 * User can choose "Keep editing" (stays) or "Discard" (triggers onCancel).
 */
export const State_UnsavedChangesDialog: Story = {
  name: "Special / Unsaved Changes Dialog — Pre-opened",
  args: {
    initialStep: 1,
    defaultShowUnsavedDialog: true,
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

/**
 * **Unsaved changes dialog triggered by play** — User is on Step 2 with data entered.
 * The play function clicks the X close button to trigger the dialog.
 */
export const State_UnsavedChangesTriggered: Story = {
  name: "Special / Unsaved Changes Dialog — Triggered by X button",
  args: {
    initialStep: 1,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click the X close button to trigger the unsaved-changes guard
    const closeButton = canvas.getByRole("button", { name: /close/i })
    await userEvent.click(closeButton)
    // Dialog should appear
    await waitFor(() =>
      expect(
        canvas.getByText("You have unsaved changes")
      ).toBeInTheDocument()
    )
  },
}

/**
 * **Duplicate Campaign at Review** — Source campaign was "Spring Affiliate Campaign".
 * Steps 1–2 are inherited; user sees Step 4 Review with "(Copy)" in name,
 * cleared dates, and all other fields pre-filled from the source.
 */
export const State_DuplicateCampaignReview: Story = {
  name: "Special / Duplicate Campaign — At Review step",
  args: {
    initialStep: 3,
    initialData: {
      objective: "sales_conversions",
      kpiTarget: "$50,000",
      kpiPeriod: "per_quarter",
      campaignType: "influencer_campaign",
      campaignName: "Spring Affiliate Campaign (Copy)",
      startDate: "2026-03-01",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * **Back navigation visible** — Step 2 shows the "← Back" text link on the left.
 * This is absent on Step 1 (first step has no back button).
 */
export const State_BackButtonVisible: Story = {
  name: "Special / Navigation — Back button visible on Step 2",
  args: {
    initialStep: 1,
    initialData: {
      objective: "brand_awareness",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// F. FULL FLOW WALKTHROUGHS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * **Full flow — Sales & Conversions + Influencer Campaign** with AppShell sidebar.
 * Starts at Step 1. The sidebar is collapsed to maximize the creation flow viewport.
 */
export const FullFlow_SalesConversions: Story = {
  name: "Full Flow / Sales & Conversions + Influencer (with Sidebar)",
  args: {
    initialStep: 0,
    initialData: {
      objective: "sales_conversions",
    } satisfies Partial<CampaignCreationData>,
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

/**
 * **Full flow — Ambassador Program** starting at Step 1 (blank slate).
 * Walk through: Ambassador → Ambassador Program type → Name + no end date → Review.
 */
export const FullFlow_AmbassadorProgram: Story = {
  name: "Full Flow / Ambassador Program (blank start)",
  args: {
    initialStep: 0,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * **Full flow — Custom Project** starting at Step 1. Walk through:
 * Any objective → Custom Project type → Custom name → Review with no default stages.
 */
export const FullFlow_CustomProject: Story = {
  name: "Full Flow / Custom Project (blank start)",
  args: {
    initialStep: 0,
    initialData: {
      objective: "brand_awareness",
      campaignType: "custom_project",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

/**
 * **Full flow — Product Seeding** starting from Step 1 with Product Seeding objective.
 * Demonstrates the recommendation path: Product Seeding → Product Seeding type.
 */
export const FullFlow_ProductSeeding: Story = {
  name: "Full Flow / Product Seeding (from Step 1)",
  args: {
    initialStep: 0,
    initialData: {
      objective: "product_seeding",
    } satisfies Partial<CampaignCreationData>,
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// G. INTERACTIVE PLAY SCENARIOS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * **Select objective and continue** — Play function selects "Content Creation"
 * card and clicks Continue, advancing to Step 2.
 */
export const Play_SelectObjectiveAndAdvance: Story = {
  name: "Interactive / Select Objective → advance to Step 2",
  args: { initialStep: 0 },
  render: (args) => (
    <div className="h-screen bg-background">
      <CampaignCreationFlow {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Select "Content Creation" objective card
    const contentCreationCard = canvas.getByText("Content Creation")
    await userEvent.click(contentCreationCard)
    // The KPI section should now be visible
    await waitFor(() =>
      expect(canvas.getByText("Set a target (optional)")).toBeInTheDocument()
    )
    // Click Continue to advance to Step 2
    const continueButton = canvas.getByRole("button", { name: /continue/i })
    await userEvent.click(continueButton)
    // Now on Step 2 — should see campaign type header
    await waitFor(() =>
      expect(canvas.getByText("Choose a campaign type")).toBeInTheDocument()
    )
  },
}

/**
 * **Edit from review** — Play function clicks the pencil edit icon next to
 * "Objective" in the review summary, navigating back to Step 1.
 */
export const Play_EditFromReview: Story = {
  name: "Interactive / Edit Objective from Review → navigates to Step 1",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click the edit (pencil) button for Objective row
    const editObjectiveButton = canvas.getByRole("button", {
      name: /edit objective/i,
    })
    await userEvent.click(editObjectiveButton)
    // Should navigate back to Step 1 — objective question visible
    await waitFor(() =>
      expect(
        canvas.getByText("What's the goal of this campaign?")
      ).toBeInTheDocument()
    )
  },
}
