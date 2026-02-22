import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { TableActionBar } from "@/components/shared/TableActionBar"

const DATE_RANGE_OPTIONS = [
  { label: "Last 7 days",  value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "All time",     value: "all" },
]

const ACTIONS = [
  { label: "Add to Campaign", onClick: () => {} },
  { label: "Send Message",    onClick: () => {} },
  { label: "Export",          onClick: () => {} },
]

const MORE_ITEMS = [
  { label: "Bulk Edit",   onClick: () => {} },
  { label: "Archive",     onClick: () => {} },
  { label: "Delete",      onClick: () => {}, variant: "destructive" as const },
]

const meta = {
  title: "Shared/TableActionBar",
  component: TableActionBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Toolbar between FilterBar and DataTable. Left: Actions dropdown (black) + '…' overflow menu. Right: expandable search, export, column settings, date range select, ViewToggle.",
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
} satisfies Meta<typeof TableActionBar>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
  args: {
    actions: ACTIONS,
    moreItems: MORE_ITEMS,
    onSearchChange: () => {},
    dateRangeOptions: DATE_RANGE_OPTIONS,
    dateRange: "30d",
    onDateRangeChange: () => {},
    onExport: () => {},
    onColumnSettings: () => {},
    onViewChange: () => {},
  },
  parameters: { docs: { description: { story: "All features enabled — actions, search, export, column settings, date range, view toggle." } } },
}

export const ActionsOnly: Story = {
  args: { actions: ACTIONS, moreItems: MORE_ITEMS },
}

export const SearchAndExport: Story = {
  args: {
    onSearchChange: () => {},
    onExport: () => {},
    onViewChange: () => {},
  },
  parameters: { docs: { description: { story: "Right-side tools only — no actions menu." } } },
}

export const WithDateRange: Story = {
  args: {
    actions: ACTIONS,
    dateRangeOptions: DATE_RANGE_OPTIONS,
    dateRange: "30d",
    onDateRangeChange: () => {},
  },
}

export const Minimal: Story = {
  args: { actions: ACTIONS },
  parameters: { docs: { description: { story: "Actions dropdown only — no right-side tools." } } },
}
