import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { CollapsibleSection } from "@/components/shared/CollapsibleSection"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const meta = {
  title: "Shared/CollapsibleSection",
  component: CollapsibleSection,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Expand/collapse container with a title row and chevron toggle. Used for advanced settings sections in wizard steps.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-lg space-y-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CollapsibleSection>

export default meta
// title is a required prop; custom render stories use StoryObj without generic
type Story = StoryObj

export const Closed: Story = {
  args: {
    title: "Link Redirect",
    defaultOpen: false,
    children: (
      <p className="text-sm text-muted-foreground">
        Configure where customers are redirected after clicking the creator's link.
      </p>
    ),
  },
}

export const DefaultOpen: Story = {
  args: {
    title: "Purchase Restrictions",
    defaultOpen: true,
    children: (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label>Minimum Order Value</Label>
          <Input type="number" placeholder="e.g. 25" />
        </div>
        <div className="space-y-1.5">
          <Label>Maximum Uses Per Code</Label>
          <Input type="number" placeholder="e.g. 100" />
        </div>
      </div>
    ),
  },
}

export const MultipleGroups: Story = {
  render: () => (
    <div className="space-y-2 max-w-lg">
      <CollapsibleSection title="Link Redirect">
        <p className="text-sm text-muted-foreground">Configure destination URL for creator links.</p>
      </CollapsibleSection>
      <CollapsibleSection title="Purchase Restrictions" defaultOpen>
        <p className="text-sm text-muted-foreground">Minimum order amount and usage limits.</p>
      </CollapsibleSection>
      <CollapsibleSection title="Code Management">
        <p className="text-sm text-muted-foreground">Prefixes, expiry dates, and single-use rules.</p>
      </CollapsibleSection>
    </div>
  ),
  parameters: {
    docs: { description: { story: "Multiple collapsible sections stacked — middle one starts open." } },
  },
}
