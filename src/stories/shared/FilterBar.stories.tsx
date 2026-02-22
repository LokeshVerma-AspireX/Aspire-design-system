import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { FilterBar } from "@/components/shared/FilterBar"

const SAVED_VIEWS = [
  { label: "All Creators",      value: "all" },
  { label: "Active This Month", value: "active-month" },
  { label: "High Engagement",   value: "high-eng" },
]

const QUICK_FILTERS = [
  {
    id: "status",
    label: "Status",
    options: [
      { label: "Active",      value: "active" },
      { label: "Deactivated", value: "deactivated" },
      { label: "Paused",      value: "paused" },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    options: [
      { label: "Instagram", value: "instagram" },
      { label: "TikTok",    value: "tiktok" },
      { label: "YouTube",   value: "youtube" },
    ],
  },
  {
    id: "followers",
    label: "Followers",
    options: [
      { label: "Nano (<10K)",  value: "nano" },
      { label: "Micro (10-100K)", value: "micro" },
      { label: "Macro (100K+)", value: "macro" },
    ],
  },
]

const meta = {
  title: "Shared/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Horizontal filter row used above data tables. Left: saved views dropdown. Middle: quick-filter dropdowns (active filters show lime-tinted border). Add Filter button. Bottom row: applied filter chips with × remove.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="border rounded-xl overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    savedViews: SAVED_VIEWS,
    quickFilters: QUICK_FILTERS,
    onAddFilter: () => {},
  },
}

export const WithSavedView: Story = {
  args: {
    savedViews: SAVED_VIEWS,
    currentSavedView: "high-eng",
    quickFilters: QUICK_FILTERS,
    onAddFilter: () => {},
  },
  parameters: { docs: { description: { story: "'High Engagement' saved view selected." } } },
}

export const WithAppliedFilters: Story = {
  args: {
    savedViews: SAVED_VIEWS,
    quickFilters: QUICK_FILTERS,
    appliedFilters: [
      { id: "f1", label: "Status: Active",         onRemove: () => {} },
      { id: "f2", label: "Platform: Instagram",    onRemove: () => {} },
      { id: "f3", label: "Followers: Macro (100K+)", onRemove: () => {} },
    ],
    onAddFilter: () => {},
  },
  parameters: { docs: { description: { story: "Three applied filter chips shown in the second row." } } },
}

export const NoSavedViews: Story = {
  args: {
    quickFilters: QUICK_FILTERS,
    onAddFilter: () => {},
  },
  parameters: { docs: { description: { story: "No saved views — just quick filters and Add Filter." } } },
}

export const Empty: Story = {
  args: { onAddFilter: () => {} },
  parameters: { docs: { description: { story: "Minimal — only the '+ Add Filter' button." } } },
}
