import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { CreatorDetailDrawer, type Creator } from "@/components/campaigns/CreatorDetailDrawer"

// ─── Sample creators ────────────────────────────────────────────────────────

const SOPHIA: Creator = {
  id: "1",
  name: "Sophia Turner",
  email: "sophia.turner@gmail.com",
  handle: "@sophiaturner",
  platforms: ["Instagram", "TikTok"],
  followers: 285000,
  engagementRate: 5.2,
  avgViews: 68000,
  postsPerMonth: 14,
  status: "Approved",
  offer: "$250.00",
  deliverables: "3 posts, 2 stories",
  contentSubmitted: [
    { type: "Instagram Post", date: "Feb 10, 2026", platform: "Instagram" },
    { type: "TikTok Video", date: "Feb 15, 2026", platform: "TikTok" },
    { type: "Instagram Story", date: "Feb 18, 2026", platform: "Instagram" },
  ],
  activity: [
    { action: "Invited to campaign", date: "Jan 15, 2026" },
    { action: "Accepted invitation", date: "Jan 17, 2026" },
    { action: "Viewed creative brief", date: "Jan 20, 2026" },
    { action: "Content submitted", date: "Feb 10, 2026" },
  ],
}

const DYLAN: Creator = {
  id: "4",
  name: "Dylan Park",
  email: "dylan.park@tiktok.co",
  handle: "@dylanpark",
  platforms: ["TikTok"],
  followers: 92000,
  engagementRate: 7.1,
  avgViews: 35000,
  postsPerMonth: 8,
  status: "Pending",
  offer: "$150.00",
  deliverables: "1 video",
  contentSubmitted: [],
  activity: [
    { action: "Invited to campaign", date: "Jan 20, 2026" },
    { action: "Viewed invitation", date: "Jan 21, 2026" },
  ],
}

/**
 * ## Creator Detail Drawer
 *
 * Right-side Sheet panel showing a creator's profile, campaign details,
 * submitted content, and activity timeline.
 *
 * ```tsx
 * import { CreatorDetailDrawer } from "@/components/campaigns/CreatorDetailDrawer"
 * ```
 */
const meta = {
  title: "6. Pages/Campaigns/CreatorDetailDrawer",
  component: CreatorDetailDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CreatorDetailDrawer>

export default meta
type Story = StoryObj

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Open drawer with full creator data (Approved status, 3 content pieces). */
export const OpenWithFullData: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <div className="h-screen">
        <CreatorDetailDrawer creator={SOPHIA} open={open} onOpenChange={setOpen} />
      </div>
    )
  },
}

/** Pending status creator with no content submitted. */
export const PendingStatus: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <div className="h-screen">
        <CreatorDetailDrawer creator={DYLAN} open={open} onOpenChange={setOpen} />
      </div>
    )
  },
}

/** Three content pieces submitted. */
export const WithThreeContentPieces: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <div className="h-screen">
        <CreatorDetailDrawer creator={SOPHIA} open={open} onOpenChange={setOpen} />
      </div>
    )
  },
}
