import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ViewToggle } from "@/components/shared/ViewToggle"

const meta = {
  title: "Shared/ViewToggle",
  component: ViewToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grid/List view mode switcher. Two icon buttons in a bordered group — active state uses filled black background. Controlled or uncontrolled.",
      },
    },
  },
} satisfies Meta<typeof ViewToggle>

export default meta
type Story = StoryObj<typeof meta>

export const ListActive: Story = {
  args: { defaultValue: "list" },
  parameters: { docs: { description: { story: "Default — list view active." } } },
}

export const GridActive: Story = {
  args: { defaultValue: "grid" },
  parameters: { docs: { description: { story: "Grid view active." } } },
}

export const Controlled: Story = {
  render: () => {
    const [view, setView] = React.useState<"list" | "grid">("list")
    return (
      <div className="flex flex-col gap-4">
        <ViewToggle value={view} onChange={setView} />
        <p className="text-sm text-muted-foreground">
          Current view: <strong>{view}</strong>
        </p>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: "Fully controlled — current mode shown below the toggle." } },
  },
}

export const InToolbar: Story = {
  render: () => (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2">
      <span className="text-sm font-medium text-foreground">Creators</span>
      <ViewToggle defaultValue="list" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Typical placement inside a table toolbar." } },
  },
}
