import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { AstraButton } from "@/components/layout/AstraButton"

const meta = {
  title: "Shared/AstraButton",
  component: AstraButton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "AI assistant trigger button. Shows a Sparkles icon + 'Ask Astra' label. In collapsed mode (sidebar icon-only) it shows only the icon. Lime-tinted border and background; sparkle icon rotates on hover.",
      },
    },
  },
} satisfies Meta<typeof AstraButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { collapsed: false },
  parameters: { docs: { description: { story: "Full-width with 'Ask Astra' label." } } },
}

export const Collapsed: Story = {
  args: { collapsed: true },
  parameters: { docs: { description: { story: "Collapsed sidebar mode — icon only." } } },
}

export const InSidebar: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-52 rounded-xl border border-border bg-sidebar p-4">
      <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wide mb-1">
        Sidebar (expanded)
      </p>
      <AstraButton collapsed={false} onClick={() => alert("Ask Astra!")} />
      <div className="mt-4">
        <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wide mb-1">
          Collapsed
        </p>
        <div className="w-10">
          <AstraButton collapsed onClick={() => alert("Ask Astra!")} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: "Expanded and collapsed states rendered on the dark sidebar background." } },
  },
}

export const WithClickHandler: Story = {
  args: {
    collapsed: false,
    onClick: () => alert("Astra AI panel opening…"),
  },
  parameters: { docs: { description: { story: "Click to see the handler callback fire." } } },
}
