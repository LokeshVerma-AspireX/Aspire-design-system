import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { MembersTab } from "@/components/campaigns/MembersTab"
import type { CampaignCreatorRow } from "@/components/campaigns/MembersTab"

/**
 * ## Members Tab
 *
 * Creator management datatable for a campaign.
 * Includes filtering, search, row selection, action menus, and the creator detail drawer.
 *
 * ```tsx
 * import { MembersTab } from "@/components/campaigns/MembersTab"
 * ```
 */
const meta = {
  title: "6. Pages/Campaigns/MembersTab",
  component: MembersTab,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MembersTab>

export default meta
type Story = StoryObj

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default view with all 10 sample creators. */
export const Default: Story = {
  render: () => (
    <div className="h-screen bg-background">
      <MembersTab />
    </div>
  ),
}

/** Filtered to show only Approved creators. */
export const ApprovedOnly: Story = {
  name: "Approved Filter Active",
  render: () => {
    const approved: CampaignCreatorRow[] = [
      { id: "1", name: "Sophia Turner", email: "sophia.turner@gmail.com", deliverables: "3 posts, 2 stories", content: "5 submitted", offer: "$250.00", status: "Approved" },
      { id: "3", name: "Aisha Johnson", email: "aisha.j@media.com", deliverables: "5 posts", content: "3 submitted", offer: "$400.00", status: "Approved" },
      { id: "5", name: "Priya Sharma", email: "priya.s@influence.io", deliverables: "4 stories", content: "4 submitted", offer: "$320.00", status: "Approved" },
      { id: "8", name: "Noah Garcia", email: "noah.g@lifestyle.co", deliverables: "2 posts", content: "2 submitted", offer: "$175.00", status: "Approved" },
      { id: "9", name: "Olivia Kim", email: "olivia.kim@beauty.co", deliverables: "6 posts", content: "5 submitted", offer: "$500.00", status: "Approved" },
    ]
    return (
      <div className="h-screen bg-background">
        <MembersTab creators={approved} />
      </div>
    )
  },
}

/** Empty state — no creators in the campaign yet. */
export const EmptyState: Story = {
  render: () => (
    <div className="h-screen bg-background">
      <MembersTab creators={[]} />
    </div>
  ),
}

/** Loading skeleton placeholder. */
export const LoadingState: Story = {
  render: () => {
    const skeletonCreators: CampaignCreatorRow[] = Array.from({ length: 5 }, (_, i) => ({
      id: `skeleton-${i}`,
      name: "Loading...",
      email: "loading@example.com",
      deliverables: "—",
      content: "—",
      offer: "—",
      status: "Pending" as const,
    }))
    return (
      <div className="h-screen bg-background">
        <MembersTab creators={skeletonCreators} />
      </div>
    )
  },
}
