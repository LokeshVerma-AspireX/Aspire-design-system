import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CampaignSettingsPage } from "@/components/campaigns/CampaignSettingsPage"
import { AppShell } from "@/components/layout/AppShell"

/**
 * ## Campaign Settings
 *
 * The full Campaign Settings experience. All project types — new campaigns, migrated Flex
 * projects, and migrated Standard/Legacy projects — converge into this single unified UI.
 *
 * ### Tab structure (some tabs are conditional)
 *
 * | # | Tab | Visibility |
 * |---|-----|------------|
 * | 1 | **Setup** | Always |
 * | 2 | **Workflow** | Always |
 * | 3 | Custom Stages | When campaign has custom stages |
 * | 4 | Application Page | Always |
 * | 5 | Recruitment | `RECRUITMENT_V2` flag |
 * | 6 | Briefs | Has a Brief/Terms stage |
 * | 7 | Offers | Has an Offer/Sales Tracking stage |
 * | 8 | Product Catalogs | Has Product Fulfillment stage **+** `PFA_V2` flag |
 * | 9 | Budget | `BUDGET_ALLOCATION` or `BUDGET_V2` flag |
 * | 10 | Invite Email | Always |
 *
 * > **Automations tab** has been removed from Settings and moved to a Campaign-level section.
 *
 * ### Setup tab — what changed from Project V2
 * - **Added:** Campaign objective (5 options) and KPI target with period selector.
 * - **Removed:** Budget and Sales Goal fields (budget is now a separate tab; sales goal
 *   is captured as KPI during creation).
 *
 * ### Workflow tab — three origin scenarios
 *
 * | Origin | What the user sees |
 * |--------|--------------------|
 * | **New Campaign** | Stages (drag-drop) + Creator Interaction Setup. No workflow type selector. |
 * | **Migrated Flex** | Workflow type locked as "Flexible" + Stages + Creator Interaction Setup. |
 * | **Migrated Standard** | Workflow type locked as "Standard (Linear)" + Stages only. No Creator Interaction. |
 *
 * ### BETA improvements applied (Workflow tab)
 * - **R1** Unified save — all stage changes (add/remove/reorder) are staged locally and saved together.
 * - **R2** Native drag-and-drop reordering via grab handles.
 * - **R3** Stage deletion no longer blocked by "move creators" check; shows confirmation instead.
 * - **R4** Unsaved changes guard when navigating between tabs.
 * - **R5** Fixed tab order — tabs never dynamically reposition.
 *
 * ### Budget tab — behavior by origin
 * - **New campaign** — Budget V2 interface only.
 * - **Migrated + Budget V1 connected** — Budget V1 interface (accounts, fiscal year, granularity, stats).
 * - **Migrated + Budget V2 or no budget** — Budget V2 interface.
 *
 * ```tsx
 * import { CampaignSettingsPage } from "@/components/campaigns/CampaignSettingsPage"
 * ```
 */
const meta = {
  title: "6. Pages/Campaigns/CampaignSettings",
  component: CampaignSettingsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <AppShell
        activeHref="/campaigns"
        user={{ name: "Lokesh Verma", initials: "LV" }}
        defaultCollapsed
      >
        <Story />
      </AppShell>
    ),
  ],
} satisfies Meta<typeof CampaignSettingsPage>

export default meta
type Story = StoryObj<typeof meta>

// ─── Origin Scenarios ─────────────────────────────────────────────────────────

/**
 * **New Campaign** — created via the new Campaign creation flow.
 *
 * - Setup tab: objective and KPI pre-populated from creation, fully editable.
 * - Workflow tab: shows stages + Creator Interaction Setup. No workflow type shown.
 * - Budget tab (when visible): Budget V2 only.
 */
export const NewCampaign: Story = {
  name: "Origin — New Campaign",
  args: {
    campaignOrigin: "new",
    campaignName: "Summer Glow Beauty Launch",
    activeSettingsTab: "setup",
    hasBudgetV2: true,
    hasBriefStage: true,
    hasOfferStage: true,
  },
}

/**
 * **Migrated Project V2 (Flex)** — an existing Flex project migrated into the new experience.
 *
 * - Workflow tab: shows workflow type locked as **"Flexible"** with a lock icon.
 * - Objective field appears empty until the user sets it retroactively.
 * - Creator Interaction Setup is still shown.
 * - Budget shows V1 interface if already connected (see BudgetV1Connected story).
 */
export const MigratedFlex: Story = {
  name: "Origin — Migrated Flex Project",
  args: {
    campaignOrigin: "migrated-flex",
    campaignName: "Holiday Creator Campaign (Flex)",
    activeSettingsTab: "workflow",
    hasBudgetAllocation: true,
    budgetV1Connected: false,
  },
}

/**
 * **Migrated Older/Standard Project** — an existing Standard or Legacy project.
 *
 * - Workflow tab: shows workflow type locked as **"Standard (Linear)"**.
 * - Creator Interaction Setup is **hidden** (not applicable to standard linear workflow).
 * - Objective field appears empty until set retroactively.
 */
export const MigratedStandard: Story = {
  name: "Origin — Migrated Standard Project",
  args: {
    campaignOrigin: "migrated-standard",
    campaignName: "Brand Awareness 2025 (Legacy)",
    activeSettingsTab: "workflow",
    hasBudgetAllocation: true,
    budgetV1Connected: true,
  },
}

// ─── Setup Tab ────────────────────────────────────────────────────────────────

/**
 * **Setup tab** — the About section with campaign name, description, objective, KPI target,
 * active dates, and campaign image. Objective and KPI are new fields vs. the old Project V2.
 */
export const SetupAbout: Story = {
  name: "Setup — About Section",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "setup",
  },
}

/**
 * **Setup tab with delete confirmation dialog open** — demonstrates the destructive action
 * confirmation pattern for campaign deletion.
 */
export const SetupDeleteDialog: Story = {
  name: "Setup — Delete Campaign Dialog",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "setup",
    deleteDialogOpen: true,
  },
}

// ─── Workflow Tab ─────────────────────────────────────────────────────────────

/**
 * **Workflow — New Campaign**
 *
 * No workflow type selector. Shows drag-and-drop stage list and Creator Interaction Setup
 * so operators can control which stages are visible to creators in their portal.
 */
export const WorkflowNewCampaign: Story = {
  name: "Workflow — New Campaign (no type lock)",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "workflow",
  },
}

/**
 * **Workflow — Migrated Flex**
 *
 * Displays the "Flexible" workflow type badge (read-only, locked). Stage list and
 * Creator Interaction Setup are fully editable.
 */
export const WorkflowMigratedFlex: Story = {
  name: "Workflow — Migrated Flex (type locked: Flexible)",
  args: {
    campaignOrigin: "migrated-flex",
    activeSettingsTab: "workflow",
  },
}

/**
 * **Workflow — Migrated Standard**
 *
 * Displays the "Standard (Linear)" workflow type (locked). Creator Interaction Setup
 * section is hidden as it is not applicable to the linear workflow.
 */
export const WorkflowMigratedStandard: Story = {
  name: "Workflow — Migrated Standard (type locked, no Creator Interaction)",
  args: {
    campaignOrigin: "migrated-standard",
    activeSettingsTab: "workflow",
  },
}

// ─── Budget Tab ───────────────────────────────────────────────────────────────

/**
 * **Budget V2 — New Campaign**
 *
 * New campaigns can only connect Budget V2. Shows connected budgets list, spend summary
 * KPI cards, and a budget ledger table.
 */
export const BudgetV2NewCampaign: Story = {
  name: "Budget — V2 (New Campaign)",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "budget",
    hasBudgetV2: true,
    budgetV1Connected: false,
  },
}

/**
 * **Budget V1 — Migrated Project with V1 already connected**
 *
 * Migrated projects that already have Budget V1 connected continue to show the V1 interface:
 * connected accounts, fiscal year selector, granularity toggle, and statistics.
 */
export const BudgetV1Connected: Story = {
  name: "Budget — V1 (Migrated, V1 already connected)",
  args: {
    campaignOrigin: "migrated-flex",
    activeSettingsTab: "budget",
    hasBudgetAllocation: true,
    budgetV1Connected: true,
  },
}

/**
 * **Budget V2 — Migrated Project (no V1 connected)**
 *
 * A migrated project with no Budget V1 connection will see the Budget V2 interface,
 * same as a new campaign.
 */
export const BudgetV2Migrated: Story = {
  name: "Budget — V2 (Migrated, no V1 connection)",
  args: {
    campaignOrigin: "migrated-flex",
    activeSettingsTab: "budget",
    hasBudgetAllocation: true,
    budgetV1Connected: false,
  },
}

// ─── Conditional Tabs ─────────────────────────────────────────────────────────

/**
 * **All conditional tabs visible** — all feature flags enabled and all stages present.
 * Demonstrates the full 10-tab experience with fixed tab ordering (R5).
 *
 * Tabs shown: Setup, Workflow, Custom Stages, Application Page, Recruitment, Briefs,
 * Offers, Product Catalogs, Budget, Invite Email.
 */
export const AllConditionalTabsVisible: Story = {
  name: "All Conditional Tabs — Full 10-tab View",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "setup",
    hasCustomStages: true,
    hasRecruitmentV2: true,
    hasBriefStage: true,
    hasOfferStage: true,
    hasProductFulfillmentStage: true,
    hasPfaV2: true,
    hasBudgetV2: true,
    budgetV1Connected: false,
  },
}

/**
 * **Minimum tabs — only the always-visible tabs.**
 *
 * Shows just Setup, Workflow, Application Page, and Invite Email when no optional stages
 * or feature flags are active.
 */
export const MinimumTabsOnly: Story = {
  name: "Minimum Tabs — Always-visible Only",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "setup",
    hasCustomStages: false,
    hasRecruitmentV2: false,
    hasBriefStage: false,
    hasOfferStage: false,
    hasProductFulfillmentStage: false,
    hasPfaV2: false,
    hasBudgetAllocation: false,
    hasBudgetV2: false,
  },
}

// ─── Sidebar-layout Tabs ──────────────────────────────────────────────────────

/**
 * **Recruitment tab** (requires `RECRUITMENT_V2` flag). Uses a sidebar sub-navigation
 * with two sections: Application Page and Invite Email Template.
 */
export const RecruitmentTab: Story = {
  name: "Recruitment Tab (RECRUITMENT_V2)",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "recruitment",
    hasRecruitmentV2: true,
  },
}

/**
 * **Briefs tab** — available when the campaign has a Brief/Terms workflow stage.
 * Sidebar sub-navigation: Default Brief, Brief Email Template, Content Guidelines.
 */
export const BriefsTab: Story = {
  name: "Briefs Tab (has Brief stage)",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "briefs",
    hasBriefStage: true,
  },
}

/**
 * **Offers tab** — available when the campaign has an Offer/Sales Tracking stage.
 * Sidebar sub-navigation: Offers list, Offer Email Template.
 */
export const OffersTab: Story = {
  name: "Offers Tab (has Offer stage)",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "offers",
    hasOfferStage: true,
  },
}

/**
 * **Product Catalogs tab** — available when the campaign has a Product Fulfillment stage
 * and the `PFA_V2` flag is enabled.
 */
export const ProductCatalogsTab: Story = {
  name: "Product Catalogs Tab (PFA_V2)",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "product-catalogs",
    hasProductFulfillmentStage: true,
    hasPfaV2: true,
  },
}

/**
 * **Invite Email tab** — always visible. Shows the campaign invite email subject and body
 * in read-only mode with a link to edit the template in global message template settings.
 */
export const InviteEmailTab: Story = {
  name: "Invite Email Tab",
  args: {
    campaignOrigin: "new",
    activeSettingsTab: "invite-email",
  },
}

// ─── Interactive ──────────────────────────────────────────────────────────────

/**
 * **Interactive — New Campaign, all tabs.**
 * Click through all the tabs to explore the full settings experience.
 */
export const InteractiveNewCampaign: Story = {
  name: "Interactive — New Campaign (all tabs)",
  args: {
    campaignOrigin: "new",
    hasCustomStages: true,
    hasRecruitmentV2: true,
    hasBriefStage: true,
    hasOfferStage: true,
    hasProductFulfillmentStage: true,
    hasPfaV2: true,
    hasBudgetV2: true,
  },
}

/**
 * **Interactive — Migrated Flex, all tabs.**
 * Includes the locked "Flexible" workflow type. Budget V1 not connected, so V2 interface shows.
 */
export const InteractiveMigratedFlex: Story = {
  name: "Interactive — Migrated Flex (all tabs)",
  args: {
    campaignOrigin: "migrated-flex",
    campaignName: "Holiday Creator Campaign (Flex)",
    hasCustomStages: true,
    hasRecruitmentV2: true,
    hasBriefStage: true,
    hasOfferStage: true,
    hasProductFulfillmentStage: true,
    hasPfaV2: true,
    hasBudgetAllocation: true,
    budgetV1Connected: false,
  },
}
