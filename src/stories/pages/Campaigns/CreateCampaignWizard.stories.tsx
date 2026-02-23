import type { Meta, StoryObj } from "@storybook/react"
import { CreateCampaignWizard } from "@/components/campaigns/CreateCampaignWizard"
import { AppShell } from "@/components/layout/AppShell"

/**
 * # CreateCampaignWizard
 *
 * 5-step wizard for creating a new campaign. Built on the reusable `CreationWizard`
 * system with step validation, stepper sidebar, and keyboard shortcuts.
 *
 * ## Components Used
 * - `CreateCampaignWizard` — campaign-specific wrapper around `CreationWizard`
 * - `CreationWizard` — reusable wizard shell with stepper, header, and footer
 * - `WizardStepper` — vertical step indicator sidebar
 * - `WizardHeader` — title bar with step counter and close button
 * - `WizardFooter` — back / next / complete action bar
 * - `CampaignBasicsStep` — step 1: name, type, dates, cover image, budget
 * - `CreatorRequirementsStep` — step 2: platforms, followers, deliverables
 * - `CompensationStep` — step 3: payment, commission, product seeding, terms
 * - `CampaignAdvancedStep` — step 4: affiliate tracking, secure codes, landing page
 * - `CampaignReviewStep` — step 5: review all data before submission
 * - `AppShell` — application shell (used in sidebar story variant)
 *
 * ## Data Requirements
 * - `initialStep` (optional) — zero-indexed step to start on (default `0`)
 * - `initialData` (optional) — `Record<string, any>` pre-filled wizard data
 * - `onClose` / `onSubmit` — callbacks for cancel and completion
 * - Step data shape varies per step (see each step component for field keys)
 *
 * ## Customization
 * - Steps are defined as `WizardStep[]` and can be reordered or extended
 * - Each step has optional `validation` function for field-level validation
 * - `completeLabel` changes the final button text (default: "Create Campaign")
 * - Wrap in `AppShell` with `defaultCollapsed` for sidebar context
 *
 * ```tsx
 * import { CreateCampaignWizard } from "@/components/campaigns/CreateCampaignWizard"
 * ```
 */
const meta = {
  title: "6. Pages/Campaigns/CreateCampaignWizard",
  component: CreateCampaignWizard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CreateCampaignWizard>

export default meta
type Story = StoryObj<typeof meta>

/** Step 1: Campaign Basics — name, type, dates, cover image, budget. */
export const Step1Basics: Story = {
  args: { initialStep: 0 },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreateCampaignWizard {...args} />
    </div>
  ),
}

/** Step 2: Creator Requirements — platforms, followers, deliverables. */
export const Step2Creators: Story = {
  args: {
    initialStep: 1,
    initialData: {
      campaignName: "Summer Style Refresh 2026",
      campaignType: "sponsored",
      campaignStartDate: "2026-01-15",
      campaignEndDate: "2026-03-30",
      campaignBudget: "50000",
      deliverables: [
        { id: "d1", platform: "instagram", contentType: "Reel", quantity: 2 },
        { id: "d2", platform: "tiktok", contentType: "Video", quantity: 1 },
      ],
    },
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreateCampaignWizard {...args} />
    </div>
  ),
}

/** Step 3: Compensation with configuration set. */
export const Step3Compensation: Story = {
  args: {
    initialStep: 2,
    initialData: {
      campaignName: "Summer Style Refresh 2026",
      campaignType: "sponsored",
      compensationType: "hybrid",
      paymentAmount: "500",
      commissionRate: "15",
    },
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreateCampaignWizard {...args} />
    </div>
  ),
}

/** Step 4: Advanced Settings with features toggled on. */
export const Step4Advanced: Story = {
  args: {
    initialStep: 3,
    initialData: {
      campaignName: "Summer Style Refresh 2026",
      campaignType: "sponsored",
      enableAffiliateTracking: true,
      enableSecureCodes: true,
      createLandingPage: true,
    },
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreateCampaignWizard {...args} />
    </div>
  ),
}

/** Step 5: Review with all data filled. */
export const Step5Review: Story = {
  args: {
    initialStep: 4,
    initialData: {
      campaignName: "Summer Style Refresh 2026",
      campaignDescription: "Partner with fashion and lifestyle creators for our summer collection launch.",
      campaignType: "sponsored",
      campaignStartDate: "2026-01-15",
      campaignEndDate: "2026-03-30",
      campaignBudget: "50000",
      targetPlatforms: ["instagram", "tiktok"],
      minFollowers: "10000",
      contentCategories: ["Fashion", "Lifestyle"],
      deliverables: [
        { id: "d1", platform: "instagram", contentType: "Reel", quantity: 2 },
        { id: "d2", platform: "tiktok", contentType: "Video", quantity: 1 },
      ],
      compensationType: "hybrid",
      paymentAmount: "500",
      commissionRate: "15",
      productSeeding: true,
      usageRights: "90",
      exclusivity: true,
      exclusivityDuration: "30",
      enableAffiliateTracking: true,
      enableSecureCodes: true,
      createLandingPage: true,
    },
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreateCampaignWizard {...args} />
    </div>
  ),
}

/** Full wizard inside the AppShell. */
export const WithSidebar: Story = {
  args: { initialStep: 0 },
  render: (args) => (
    <AppShell
      activeHref="/campaigns"
      user={{ name: "Lokesh Verma", initials: "LV" }}
      badgeCounts={{ messages: 3 }}
      defaultCollapsed
    >
      <div className="h-full overflow-hidden">
        <CreateCampaignWizard {...args} />
      </div>
    </AppShell>
  ),
}
