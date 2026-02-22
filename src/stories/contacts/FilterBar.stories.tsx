import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { FilterBar } from "@/components/shared/FilterBar"

const meta = {
  title: "Contacts/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Reusable filter bar with saved views, quick filter dropdowns, and applied filter chips. Appears below the tab bar on list pages.",
      },
    },
  },
  args: {
    savedViews: [
      { label: "All Creators", value: "all" },
      { label: "Active This Month", value: "active-month" },
      { label: "Top Performers", value: "top-performers" },
      { label: "Instagram Only", value: "instagram-only" },
    ],
    quickFilters: [
      {
        id: "platform",
        label: "Platform",
        options: [
          { label: "Instagram", value: "instagram" },
          { label: "TikTok", value: "tiktok" },
          { label: "YouTube", value: "youtube" },
          { label: "Pinterest", value: "pinterest" },
        ],
      },
      {
        id: "status",
        label: "Status",
        options: [
          { label: "Active", value: "active" },
          { label: "Paused", value: "paused" },
          { label: "Deactivated", value: "deactivated" },
        ],
      },
      {
        id: "followers",
        label: "Followers",
        options: [
          { label: "Nano (1K–10K)", value: "nano" },
          { label: "Micro (10K–100K)", value: "micro" },
          { label: "Macro (100K–1M)", value: "macro" },
          { label: "Mega (1M+)", value: "mega" },
        ],
      },
    ],
  },
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  parameters: {
    docs: { description: { story: "No saved view selected, no filters applied." } },
  },
}

export const WithSavedView: Story = {
  args: { currentSavedView: "top-performers" },
  parameters: {
    docs: { description: { story: "A saved view is selected — trigger shows the view name." } },
  },
}

export const WithActiveFilters: Story = {
  args: {
    quickFilters: [
      {
        id: "platform",
        label: "Platform",
        value: "instagram",
        options: [
          { label: "Instagram", value: "instagram" },
          { label: "TikTok", value: "tiktok" },
          { label: "YouTube", value: "youtube" },
        ],
      },
      {
        id: "status",
        label: "Status",
        value: "active",
        options: [
          { label: "Active", value: "active" },
          { label: "Paused", value: "paused" },
        ],
      },
      {
        id: "followers",
        label: "Followers",
        options: [
          { label: "Nano (1K–10K)", value: "nano" },
          { label: "Micro (10K–100K)", value: "micro" },
        ],
      },
    ],
  },
  parameters: {
    docs: { description: { story: "Platform and Status filters are set — triggers highlight with primary tint." } },
  },
}

export const WithFilterChips: Story = {
  args: {
    appliedFilters: [
      { id: "platform-ig", label: "Platform: Instagram", onRemove: () => {} },
      { id: "status-active", label: "Status: Active", onRemove: () => {} },
      { id: "followers-macro", label: "Followers: Macro", onRemove: () => {} },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Applied filter chips appear below the filter row. Each chip has an × to remove.",
      },
    },
  },
}

export const ControlledExample: Story = {
  render: () => {
    const [chips, setChips] = React.useState([
      { id: "platform-ig", label: "Platform: Instagram" },
      { id: "status-active", label: "Status: Active" },
    ])
    const [view, setView] = React.useState<string>()

    return (
      <FilterBar
        savedViews={[
          { label: "All Creators", value: "all" },
          { label: "Top Performers", value: "top-performers" },
        ]}
        currentSavedView={view}
        onSavedViewChange={setView}
        quickFilters={[
          {
            id: "platform",
            label: "Platform",
            options: [{ label: "Instagram", value: "instagram" }],
          },
        ]}
        appliedFilters={chips.map((c) => ({
          ...c,
          onRemove: () => setChips((prev) => prev.filter((p) => p.id !== c.id)),
        }))}
        onAddFilter={() => alert("Add Filter dialog")}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Fully interactive — chips can be removed, saved view can be changed.",
      },
    },
  },
}
