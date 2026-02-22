import type { Meta, StoryObj } from "@storybook/react"
import { ContentTab } from "@/components/contact-detail/ContentTab"
import type { ContentCardProps } from "@/components/contact-detail/ContentCard"

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
  title: "Contact Detail/ContentTab",
  component: ContentTab,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Content grouped by campaign brief. Each group has a signed header and a horizontal scroll of content cards.",
      },
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
