import type { Meta, StoryObj } from "@storybook/react"
import { TagPillGroup } from "@/components/shared/TagPillGroup"

const meta = {
  title: "Shared/TagPillGroup",
  component: TagPillGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Row of colored tag pills. 9 color variants: teal, purple, amber, blue, rose, lime, orange, sky, default (gray). Used for campaigns, groups, interests, and tags.",
      },
    },
  },
} satisfies Meta<typeof TagPillGroup>

export default meta
type Story = StoryObj<typeof meta>

export const CampaignPills: Story = {
  args: {
    pills: [
      { label: "Petfluencer Perks",       color: "teal" },
      { label: "VIP Marketing List 2026", color: "purple" },
      { label: "Coffee Campaign Brief",   color: "amber" },
      { label: "Summer Skincare Drop",    color: "rose" },
    ],
  },
  parameters: { docs: { description: { story: "Campaign-style colored pills." } } },
}

export const GroupPills: Story = {
  args: {
    pills: [
      { label: "Macro Influencers", color: "lime" },
      { label: "LA Creators",       color: "sky" },
      { label: "Fitness & Health",  color: "orange" },
    ],
  },
}

export const TagPills: Story = {
  args: {
    pills: [
      { label: "ugc" },
      { label: "fashion" },
      { label: "lifestyle" },
      { label: "paid-partner" },
    ],
  },
  parameters: { docs: { description: { story: "Gray default pills used for free-form tags." } } },
}

export const AllColors: Story = {
  args: {
    pills: [
      { label: "teal",    color: "teal" },
      { label: "purple",  color: "purple" },
      { label: "amber",   color: "amber" },
      { label: "blue",    color: "blue" },
      { label: "rose",    color: "rose" },
      { label: "lime",    color: "lime" },
      { label: "orange",  color: "orange" },
      { label: "sky",     color: "sky" },
      { label: "default", color: "default" },
    ],
  },
  parameters: { docs: { description: { story: "All 9 color variants in one row." } } },
}

export const SinglePill: Story = {
  args: { pills: [{ label: "ugc", color: "blue" }] },
}

export const ManyPills: Story = {
  args: {
    pills: Array.from({ length: 12 }, (_, i) => ({
      label: `tag-${i + 1}`,
      color: (["teal", "purple", "amber", "blue", "rose", "lime", "orange", "sky", "default"] as const)[i % 9],
    })),
  },
  parameters: { docs: { description: { story: "12 pills wrapping across multiple lines." } } },
}
