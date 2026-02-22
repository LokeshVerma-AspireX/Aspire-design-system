import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { StatusDot } from "@/components/shared/StatusDot"

const meta = {
  title: "Shared/StatusDot",
  component: StatusDot,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Small colored circle + label. Used in Contacts, Offers, and Offer Detail tables to show record status at a glance.",
      },
    },
  },
} satisfies Meta<typeof StatusDot>

export default meta
// status is required; render-only stories use StoryObj without generic
type Story = StoryObj

export const Active: Story = {
  args: { status: "active" },
}

export const Deactivated: Story = {
  args: { status: "deactivated" },
}

export const Paused: Story = {
  args: { status: "paused" },
}

export const Error: Story = {
  args: { status: "error" },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusDot status="active" />
      <StatusDot status="deactivated" />
      <StatusDot status="paused" />
      <StatusDot status="error" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "All four status variants stacked." } },
  },
}

export const DotOnly: Story = {
  args: { status: "active", showLabel: false },
  parameters: { docs: { description: { story: "showLabel=false — dot without text, useful in compact table cells." } } },
}

export const CustomLabel: Story = {
  args: { status: "active", label: "Live" },
  parameters: { docs: { description: { story: "Override the default label text." } } },
}

export const InTableCell: Story = {
  render: () => (
    <table className="text-sm border border-border rounded-lg overflow-hidden">
      <thead className="bg-muted/40">
        <tr>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">Creator</th>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {[
          { name: "Jane Doe", status: "active" },
          { name: "Alex Kim", status: "deactivated" },
          { name: "Mia Tanaka", status: "paused" },
          { name: "Sam Park", status: "error" },
        ].map((row) => (
          <tr key={row.name} className="bg-background">
            <td className="px-4 py-2">{row.name}</td>
            <td className="px-4 py-2">
              <StatusDot status={row.status as "active" | "deactivated" | "paused" | "error"} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  parameters: {
    docs: { description: { story: "Realistic table usage — each row has a status dot." } },
  },
}
