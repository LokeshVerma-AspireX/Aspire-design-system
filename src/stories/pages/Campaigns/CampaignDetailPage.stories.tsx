import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { CampaignDetailPage } from "@/components/campaigns/CampaignDetailPage"
import { InviteCreatorsDialog } from "@/components/campaigns/InviteCreatorsDialog"
import { AppShell } from "@/components/layout/AppShell"

/**
 * ## Campaign Detail Page
 *
 * Full detail page for a single campaign with 9 tabs.
 * The Members tab is the default view, showing the creator management table.
 *
 * ```tsx
 * import { CampaignDetailPage } from "@/components/campaigns/CampaignDetailPage"
 * ```
 */
const meta = {
  title: "6. Pages/Campaigns/CampaignDetailPage",
  component: CampaignDetailPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CampaignDetailPage>

export default meta
type Story = StoryObj

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Overview tab active — campaign KPIs and info. */
export const OverviewTab: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignDetailPage activeTab="overview" />
    </AppShell>
  ),
}

/** Members tab active (default) — creator management table. */
export const MembersTabActive: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignDetailPage activeTab="members" />
    </AppShell>
  ),
}

/** Members tab with Approved filter active. */
export const MembersApprovedFilter: Story = {
  name: "Members — Approved Filter",
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignDetailPage activeTab="members" />
    </AppShell>
  ),
}

/** Content tab active. */
export const ContentTabActive: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignDetailPage activeTab="content" />
    </AppShell>
  ),
}

/** Offers tab active. */
export const OffersTabActive: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignDetailPage activeTab="offers" />
    </AppShell>
  ),
}

/** Tasks tab active. */
export const TasksTabActive: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignDetailPage activeTab="tasks" />
    </AppShell>
  ),
}

/** Inbox tab active. */
export const InboxTabActive: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignDetailPage activeTab="inbox" />
    </AppShell>
  ),
}

/** Reporting tab active. */
export const ReportingTabActive: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignDetailPage activeTab="reporting" />
    </AppShell>
  ),
}

/** Links tab active. */
export const LinksTabActive: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignDetailPage activeTab="links" />
    </AppShell>
  ),
}

/** Settings tab active. */
export const SettingsTabActive: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignDetailPage activeTab="settings" />
    </AppShell>
  ),
}

/** Invite Creators modal open. */
export const InviteCreatorsModalOpen: Story = {
  render: () => {
    const [inviteOpen, setInviteOpen] = React.useState(true)
    return (
      <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
        <CampaignDetailPage
          activeTab="members"
          onInviteCreators={() => setInviteOpen(true)}
        />
        <InviteCreatorsDialog
          open={inviteOpen}
          onOpenChange={setInviteOpen}
        />
      </AppShell>
    )
  },
}

/** Standalone without sidebar. */
export const Standalone: Story = {
  render: () => (
    <div className="h-screen">
      <CampaignDetailPage />
    </div>
  ),
}
