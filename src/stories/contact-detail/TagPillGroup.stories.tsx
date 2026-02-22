import type { Meta, StoryObj } from "@storybook/react"
import { TagPillGroup } from "@/components/shared/TagPillGroup"

const meta = {
  title: "Contact Detail/TagPillGroup",
  component: TagPillGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Colored pill tags used for campaigns (teal, purple, amber…), groups, and plain tags (default gray).",
      },
    },
  },
} satisfies Meta<typeof TagPillGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Campaigns: Story = {
  args: {
    pills: [
      { label: "Petfluencer Perks",         color: "teal" },
      { label: "VIP Marketing List 2026",    color: "purple" },
      { label: "Coffee Campaign Brief",      color: "amber" },
      { label: "Summer Skincare Drop",       color: "rose" },
      { label: "Holiday Gift Guide 2025",    color: "blue" },
    ],
  },
}

export const Groups: Story = {
  args: {
    pills: [
      { label: "Macro Influencers",  color: "lime" },
      { label: "LA Creators",        color: "sky" },
      { label: "Fitness & Health",   color: "orange" },
      { label: "US West Coast",      color: "teal" },
    ],
  },
}

export const Tags: Story = {
  args: {
    pills: [
      { label: "ugc",          color: "default" },
      { label: "fashion",      color: "default" },
      { label: "lifestyle",    color: "default" },
      { label: "paid-partner", color: "default" },
      { label: "high-er",      color: "default" },
    ],
  },
}

export const Mixed: Story = {
  args: {
    pills: [
      { label: "Petfluencer Perks",  color: "teal" },
      { label: "VIP 2026",           color: "purple" },
      { label: "ugc",                color: "default" },
      { label: "fashion",            color: "default" },
      { label: "LA Creators",        color: "lime" },
    ],
  },
}

export const Empty: Story = {
  args: { pills: [] },
}
