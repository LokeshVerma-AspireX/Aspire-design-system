import type { Meta, StoryObj } from "@storybook/react"
import { AspireLogo } from "@/components/layout/AspireLogo"

const meta = {
  title: "Layout/AspireLogo",
  component: AspireLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Aspire brand logo with SVG mark. Supports `mark` (icon only), `circle` (mark inside filled circle), and `full` (mark + wordmark) variants across five sizes (xs–xl). Uses `currentColor` so it inherits the parent text colour and works with theme switching.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["mark", "circle", "full"],
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof AspireLogo>

export default meta
type Story = StoryObj<typeof meta>

/** Default mark-only logo at medium size. */
export const Default: Story = {
  args: {
    variant: "mark",
    size: "md",
  },
}

/** Circle mark — "A" inside a filled circle. */
export const Circle: Story = {
  args: {
    variant: "circle",
    size: "md",
  },
}

/** Full logo with wordmark. */
export const Full: Story = {
  args: {
    variant: "full",
    size: "md",
  },
}

/** All sizes — mark variant. */
export const MarkSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <AspireLogo variant="mark" size={size} />
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
}

/** All sizes — circle variant. */
export const CircleSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <AspireLogo variant="circle" size={size} />
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
}

/** All sizes — full variant. */
export const FullSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-6 text-xs text-muted-foreground">{size}</span>
          <AspireLogo variant="full" size={size} />
        </div>
      ))}
    </div>
  ),
}

/** On coloured background — verifies currentColor inheritance. */
export const OnColoredBackground: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center rounded-lg bg-foreground p-4">
          <AspireLogo variant="full" size="md" className="text-background" />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-primary p-4">
          <AspireLogo variant="full" size="md" className="text-primary-foreground" />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-sidebar p-4 border">
          <AspireLogo variant="full" size="md" className="text-sidebar-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center rounded-lg bg-foreground p-4">
          <AspireLogo variant="circle" size="lg" className="text-background" />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-primary p-4">
          <AspireLogo variant="circle" size="lg" className="text-primary-foreground" />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-sidebar p-4 border">
          <AspireLogo variant="circle" size="lg" className="text-sidebar-foreground" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo uses `currentColor` — pass a text colour class to adapt to any background.",
      },
    },
  },
}

/** Sidebar context — how it appears in the collapsed and expanded nav. */
export const SidebarContext: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <div className="flex w-20 flex-col items-center gap-2 rounded-lg border bg-sidebar p-3">
        <AspireLogo variant="mark" size="lg" className="text-sidebar-foreground" />
        <span className="text-[10px] text-muted-foreground">Collapsed (mark)</span>
      </div>
      <div className="flex w-20 flex-col items-center gap-2 rounded-lg border bg-sidebar p-3">
        <AspireLogo variant="circle" size="lg" className="text-sidebar-foreground" />
        <span className="text-[10px] text-muted-foreground">Collapsed (circle)</span>
      </div>
      <div className="flex w-60 flex-col gap-2 rounded-lg border bg-sidebar p-3">
        <AspireLogo variant="full" size="md" className="text-sidebar-foreground" />
        <span className="text-[10px] text-muted-foreground">Expanded</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows the logo as used in the SideNav — mark or circle when collapsed (80px), full wordmark when expanded (240px).",
      },
    },
  },
}
