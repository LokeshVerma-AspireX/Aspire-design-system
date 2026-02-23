import type { Meta, StoryObj } from "@storybook/react"
import { ContentTab } from "@/components/contact-detail/ContentTab"
import type { ContentCardProps } from "@/components/contact-detail/ContentCard"

/**
 * # ContentTab
 *
 * Content submissions grouped by campaign brief. Each group displays a signed-brief header
 * and a horizontal scroll of content cards showing status, ad rights, and tag counts.
 *
 * ## Components Used
 * - `ContentBriefGroup` -- section header with brief name, signed date, campaign link, and content row
 * - `ContentCard` -- individual content submission card with status badge, ad-rights indicator, tags
 *
 * ## Data Requirements
 * - `briefGroups` (ContentBriefGroupProps[]) -- array of brief groups, each containing:
 *   - `briefName` (string) -- name of the collaboration brief
 *   - `signedDate` (string) -- date the brief was signed
 *   - `campaignName` (string, optional) -- linked campaign name
 *   - `content` (ContentCardProps[]) -- array of content cards with creatorName, date, status, tagCount
 *   - `onViewBrief` / `onViewCampaign` -- callback functions for action links
 *
 * ## Customization
 * - Number of brief groups is dynamic; empty array shows an empty state
 * - Content card statuses: "approved", "pending", "in_review", "rejected"
 * - `hasAdRights` flag toggles the ad-rights badge on individual cards
 * - `platform` field on cards can be "instagram", "tiktok", or "youtube"
 * - Campaign link is optional per group
 *
 * ```tsx
 * import { ContentTab } from "@/components/contact-detail/ContentTab"
 * ```
 */

const makeCards = (count: number, status: ContentCardProps["status"] = "approved"): ContentCardProps[] =>
  Array.from({ length: count }, (_, i) => ({
    creatorName: "Jane Doe",
    creatorInitials: "JD",
    date: `Feb ${10 + i}, 2026`,
    usageRights: i % 2 === 0 ? "Limited Broad" : "Full Buyout",
    tagCount: i + 1,
    status,
    hasAdRights: i % 3 === 0,
    platform: (["instagram", "tiktok", "youtube"] as const)[i % 3],
  }))

const meta = {
  title: "6. Pages/Contacts/ContentTab",
  component: ContentTab,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    briefGroups: {
      control: "object",
      description: "Array of brief group objects, each containing a brief header and content cards.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the root container.",
    },
  },
} satisfies Meta<typeof ContentTab>

export default meta
type Story = StoryObj<typeof meta>

export const TwoBriefs: Story = {
  args: {
    briefGroups: [
      {
        briefName: "Coffee Campaign Brief",
        signedDate: "Feb 2, 2026",
        campaignName: "Petfluencer Perks",
        content: makeCards(4),
        onViewBrief: () => {},
        onViewCampaign: () => {},
      },
      {
        briefName: "Summer Skincare Brief",
        signedDate: "Jan 15, 2026",
        campaignName: "Summer Skincare Drop",
        content: makeCards(3, "approved"),
        onViewBrief: () => {},
        onViewCampaign: () => {},
      },
    ],
  },
}

export const ThreeBriefs: Story = {
  args: {
    briefGroups: [
      {
        briefName: "Coffee Campaign Brief",
        signedDate: "Feb 2, 2026",
        campaignName: "Petfluencer Perks",
        content: makeCards(5),
        onViewBrief: () => {},
        onViewCampaign: () => {},
      },
      {
        briefName: "Holiday Gift Guide Brief",
        signedDate: "Dec 1, 2025",
        campaignName: "Holiday Gift Guide 2025",
        content: makeCards(2, "in_review"),
        onViewBrief: () => {},
        onViewCampaign: () => {},
      },
      {
        briefName: "Fitness App Launch",
        signedDate: "Nov 10, 2025",
        content: makeCards(3, "pending"),
        onViewBrief: () => {},
      },
    ],
  },
}

export const Empty: Story = {
  args: { briefGroups: [] },
  parameters: {
    docs: { description: { story: "No content submitted." } },
  },
}

export const MixedStatuses: Story = {
  args: {
    briefGroups: [
      {
        briefName: "Coffee Campaign Brief",
        signedDate: "Feb 2, 2026",
        content: [
          { creatorName: "Jane Doe", creatorInitials: "JD", date: "Feb 10, 2026", status: "approved", hasAdRights: true, tagCount: 2 },
          { creatorName: "Jane Doe", creatorInitials: "JD", date: "Feb 12, 2026", status: "pending", tagCount: 1 },
          { creatorName: "Jane Doe", creatorInitials: "JD", date: "Feb 14, 2026", status: "in_review", tagCount: 3 },
          { creatorName: "Jane Doe", creatorInitials: "JD", date: "Feb 15, 2026", status: "rejected" },
        ],
        onViewBrief: () => {},
        onViewCampaign: () => {},
      },
    ],
  },
  parameters: {
    docs: { description: { story: "Mix of content statuses: approved, pending, in-review, rejected." } },
  },
}
