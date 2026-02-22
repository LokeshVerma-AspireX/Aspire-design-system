import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { CopyButton } from "@/components/shared/CopyButton"

const meta = {
  title: "Shared/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Copy-to-clipboard button. Shows a Copy icon; on click switches to a green Check icon and displays a 'Copied!' tooltip for 2 seconds before reverting.",
      },
    },
  },
  args: {
    value: "https://aspire.io/offer/summer-skincare?creator=janedoe",
  },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InContext: Story = {
  render: (args) => (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground">
      <code className="flex-1 truncate text-xs text-muted-foreground font-mono">{args.value}</code>
      <CopyButton {...args} />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Inline with a URL display — typical use in offer link rows." } },
  },
}

export const CustomLabel: Story = {
  args: {
    value: "SUMMER10",
    copiedLabel: "Code copied!",
  },
  render: (args) => (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground">
      <code className="flex-1 font-mono text-sm font-bold">{args.value}</code>
      <CopyButton {...args} />
    </div>
  ),
}
