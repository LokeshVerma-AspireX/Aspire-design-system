import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { SideNav } from "@/components/layout/SideNav"

const meta = {
  title: "Layout/SideNav",
  component: SideNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Primary navigation sidebar matched to Figma export. Uses shadcn sidebar tokens (`bg-sidebar`, `text-sidebar-foreground`, `bg-sidebar-accent`). Single text colour for all states — active distinguished by `bg-sidebar-accent` only. Collapsed (80 px): stacked icon (20 px) + label, `justify-between` layout. Expanded (240 px): inline icon + label. Footer icons: 40×40 px (18 px icons) with tooltips. Supports light and dark mode via Aspire theme tokens.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen bg-background">
        <Story />
        <div className="flex-1 bg-muted/20 p-6 text-muted-foreground text-sm">
          ← Page content goes here
        </div>
      </div>
    ),
  ],
  args: {
    activeHref: "/",
    user: {
      name: "Lokesh Verma",
      initials: "LV",
    },
    badgeCounts: { messages: 5 },
  },
} satisfies Meta<typeof SideNav>

export default meta
type Story = StoryObj<typeof meta>

/** Collapsed (default) — matches the Figma Global Nav design. */
export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default collapsed state — 80 px, `justify-between` layout. Main nav: stacked 16 px icon + label, gap-1, px-3. Footer: 40×40 px icon buttons with gap-3 and tooltips. Active = `bg-sidebar-accent` only (no text colour change).",
      },
    },
  },
}

/** Expanded — 240 px, inline icon + label. */
export const Expanded: Story = {
  args: {
    collapsed: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Expanded state — 240 px wide. Inline 16 px icon + label. Active uses `bg-sidebar-accent` only — same `text-sidebar-foreground` colour for all states.",
      },
    },
  },
}

/** Interactive collapse / expand. */
export const Interactive: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = React.useState(true)
    return (
      <div className="flex h-screen bg-background">
        <SideNav
          {...args}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
        <div className="flex-1 bg-muted/20 p-6 text-muted-foreground text-sm">
          Click the chevron on the sidebar edge to toggle.
        </div>
      </div>
    )
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Fully interactive — click the edge toggle to collapse and expand.",
      },
    },
  },
}

/** Offers active — collapsed. */
export const OffersActive: Story = {
  args: {
    collapsed: true,
    activeHref: "/offers",
  },
}

/** Home active — expanded. */
export const HomeActiveExpanded: Story = {
  args: {
    collapsed: false,
    activeHref: "/",
  },
}

/** Messages with badge — expanded. */
export const MessagesWithBadge: Story = {
  args: {
    collapsed: false,
    activeHref: "/messages",
    badgeCounts: { messages: 12 },
  },
}

/** Messages with badge — collapsed (dot indicator). */
export const CollapsedWithBadge: Story = {
  args: {
    collapsed: true,
    activeHref: "/messages",
    badgeCounts: { messages: 12 },
  },
}

/** No user avatar row. */
export const NoUser: Story = {
  args: {
    collapsed: true,
    user: undefined,
  },
}

/** Badge overflows to 99+. */
export const HighBadgeCount: Story = {
  args: {
    collapsed: false,
    activeHref: "/messages",
    badgeCounts: { messages: 104 },
  },
}
