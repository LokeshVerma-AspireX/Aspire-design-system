import type { Meta, StoryObj } from "@storybook/react"
import { type CSSProperties } from "react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

// ─── Fixtures ───────────────────────────────────────────────────────────────

const sidebarStyle = {
  "--sidebar-width": "15rem",
  "--sidebar-width-icon": "5rem",
} as CSSProperties

const defaultUser = {
  name: "Lokesh Verma",
  initials: "LV",
}

const userWithAvatar = {
  name: "Lokesh Verma",
  avatarUrl: "https://i.pravatar.cc/150?u=lokesh",
  initials: "LV",
}

/**
 * # AppSidebar
 *
 * The primary navigation sidebar for the Aspire platform, built on shadcn/ui
 * `Sidebar` primitives with `collapsible="icon"` mode. Contains a logo header,
 * 7 main navigation items, 4 footer utility items (with optional badge counts),
 * a user avatar, and a rail toggle.
 *
 * ## When to Use
 * - As the main navigation inside `AppShell`
 * - When building a new page that needs the standard Aspire sidebar
 * - When testing sidebar states (collapsed, expanded, active items, badges)
 *
 * ## When NOT to Use
 * - Directly in pages -- wrap with `AppShell` instead which handles `SidebarProvider`
 * - For secondary navigation within a page -- use Tabs or Breadcrumbs
 * - In modals or drawers -- sidebar is always the top-level layout element
 *
 * ## Accessibility
 * - Built on `<aside>` with `<nav>` landmark and labelled groups
 * - Active item uses `data-active` attribute and `aria-current="page"`
 * - Collapsed mode retains text labels (stacked) for main nav; footer uses tooltips
 * - `SidebarRail` supports keyboard toggle (Cmd+B / Ctrl+B)
 * - Badge counts are announced by screen readers via inline text
 *
 * ## Import
 * ```tsx
 * import { AppSidebar } from '@/components/layout/AppSidebar'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <SidebarProvider defaultOpen={false}>
 *   <AppSidebar
 *     activeHref="/contacts"
 *     user={{ name: "Lokesh Verma", initials: "LV" }}
 *     badgeCounts={{ messages: 5 }}
 *     onNavigate={(href) => console.log(href)}
 *   />
 *   <SidebarInset>{children}</SidebarInset>
 * </SidebarProvider>
 * ```
 */
const meta: Meta<typeof AppSidebar> = {
  title: "5. Layout/AppSidebar",
  component: AppSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Aspire platform sidebar built on shadcn/ui Sidebar primitives with `collapsible=\"icon\"` mode. " +
          "Collapsed (80px): stacked icon + label for main nav, icon-only with tooltips for footer nav. " +
          "Expanded (240px): inline icon + label layout. Active state uses `bg-sidebar-accent` only.",
      },
    },
  },
  argTypes: {
    activeHref: {
      control: "select",
      options: ["/", "/recruit", "/contacts", "/campaigns", "/content", "/offers", "/reporting", "/search", "/automations", "/messages", "/settings"],
      description: "The `href` of the currently active navigation item. The matching item receives a highlighted `bg-sidebar-accent` background.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"/"' },
        category: "Navigation",
      },
    },
    user: {
      control: "object",
      description: "User info rendered in the sidebar footer. Displays an avatar circle with initials or an image, plus the user name when expanded.",
      table: {
        type: { summary: "UserInfo" },
        category: "Content",
      },
    },
    badgeCounts: {
      control: "object",
      description: "Badge counts for footer nav items. Currently supports `messages` key. Displays as an inline pill (expanded) or a dot indicator (collapsed). Values above 99 show \"99+\".",
      table: {
        type: { summary: "BadgeCounts" },
        defaultValue: { summary: "{}" },
        category: "Content",
      },
    },
    onNavigate: {
      action: "navigated",
      description: "Callback fired when any nav item is clicked. Receives the `href` string of the clicked item.",
      table: {
        type: { summary: "(href: string) => void" },
        category: "Events",
      },
    },
  },
  decorators: [
    (Story, context) => {
      const defaultOpen = (context.args as Record<string, unknown>).defaultOpen as boolean ?? false
      return (
        <div className="flex h-screen bg-background">
          <SidebarProvider defaultOpen={defaultOpen} style={sidebarStyle}>
            <Story />
            <SidebarInset>
              <div className="flex-1 bg-muted/20 p-6 text-muted-foreground text-sm">
                Page content area
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      )
    },
  ],
  args: {
    activeHref: "/",
    user: defaultUser,
    badgeCounts: { messages: 5 },
    onNavigate: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── CORE VARIANTS ──────────────────────────────────────────────────────────

/**
 * Collapsed (default) state at 80px width. Main nav shows stacked icon + label.
 * Footer nav uses 40x40 icon buttons with tooltips.
 *
 * ```tsx
 * <SidebarProvider defaultOpen={false}>
 *   <AppSidebar activeHref="/" user={user} />
 *   <SidebarInset>{children}</SidebarInset>
 * </SidebarProvider>
 * ```
 */
export const Collapsed: Story = {
  args: {
    defaultOpen: false,
  } as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        story:
          "Default collapsed state at 80px width. Main nav uses stacked icon (20px) + label (11px). " +
          "Footer uses 40x40 icon buttons with tooltips. Active item highlighted with `bg-sidebar-accent`.",
      },
    },
  },
}

/**
 * Expanded state at 240px width. Shows the full Aspire wordmark and
 * inline icon + label for all navigation items.
 *
 * ```tsx
 * <SidebarProvider defaultOpen={true}>
 *   <AppSidebar activeHref="/" user={user} />
 *   <SidebarInset>{children}</SidebarInset>
 * </SidebarProvider>
 * ```
 */
export const Expanded: Story = {
  args: {
    defaultOpen: true,
  } as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        story: "Expanded state at 240px wide. Displays the full Aspire wordmark and inline icon + label layout.",
      },
    },
  },
}

/**
 * Interactive demo -- hover near the sidebar edge and click the rail
 * to toggle, or use Cmd+B / Ctrl+B.
 */
export const Interactive: Story = {
  args: {
    defaultOpen: false,
  } as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        story: "Fully interactive sidebar. Hover near the edge and click the rail to toggle, or use Cmd+B / Ctrl+B.",
      },
    },
  },
}

// ─── ACTIVE ITEM VARIANTS ───────────────────────────────────────────────────

/**
 * Home active in the expanded sidebar.
 */
export const HomeActiveExpanded: Story = {
  name: "Active: Home (Expanded)",
  args: {
    activeHref: "/",
    defaultOpen: true,
  } as Record<string, unknown>,
}

/**
 * Contacts active in the collapsed sidebar.
 */
export const ContactsActive: Story = {
  name: "Active: Contacts (Collapsed)",
  args: {
    activeHref: "/contacts",
    defaultOpen: false,
  } as Record<string, unknown>,
}

/**
 * Campaigns active in the expanded sidebar.
 */
export const CampaignsActive: Story = {
  name: "Active: Campaigns (Expanded)",
  args: {
    activeHref: "/campaigns",
    defaultOpen: true,
  } as Record<string, unknown>,
}

/**
 * Offers active in the collapsed sidebar.
 */
export const OffersActive: Story = {
  name: "Active: Offers (Collapsed)",
  args: {
    activeHref: "/offers",
    defaultOpen: false,
  } as Record<string, unknown>,
}

/**
 * Settings (footer item) active in the expanded sidebar.
 */
export const SettingsActive: Story = {
  name: "Active: Settings (Expanded)",
  args: {
    activeHref: "/settings",
    defaultOpen: true,
  } as Record<string, unknown>,
}

// ─── BADGE COUNTS ───────────────────────────────────────────────────────────

/**
 * Messages badge in expanded sidebar -- shows an inline pill with the count.
 *
 * ```tsx
 * <AppSidebar badgeCounts={{ messages: 12 }} />
 * ```
 */
export const MessagesWithBadge: Story = {
  name: "Badge: Messages (Expanded)",
  args: {
    activeHref: "/messages",
    badgeCounts: { messages: 12 },
    defaultOpen: true,
  } as Record<string, unknown>,
}

/**
 * Messages badge in collapsed sidebar -- shows a small dot indicator with count.
 */
export const CollapsedWithBadge: Story = {
  name: "Badge: Messages (Collapsed)",
  args: {
    activeHref: "/messages",
    badgeCounts: { messages: 12 },
    defaultOpen: false,
  } as Record<string, unknown>,
}

/**
 * Badge count exceeding 99 displays "99+".
 */
export const HighBadgeCount: Story = {
  name: "Badge: High Count (99+)",
  args: {
    activeHref: "/messages",
    badgeCounts: { messages: 104 },
    defaultOpen: true,
  } as Record<string, unknown>,
}

/**
 * Zero badge count -- badge is not rendered when the value is 0.
 */
export const ZeroBadgeCount: Story = {
  name: "Badge: Zero Count (Hidden)",
  args: {
    badgeCounts: { messages: 0 },
    defaultOpen: true,
  } as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        story: "When the badge count is 0, no badge is rendered -- avoids visual noise.",
      },
    },
  },
}

// ─── USER INFO VARIANTS ─────────────────────────────────────────────────────

/**
 * User with avatar image URL displayed in the footer.
 */
export const WithUserAvatar: Story = {
  name: "User: With Avatar Image",
  args: {
    user: userWithAvatar,
    defaultOpen: true,
  } as Record<string, unknown>,
}

/**
 * User with initials fallback displayed in the footer.
 */
export const WithUserInitials: Story = {
  name: "User: With Initials",
  args: {
    user: defaultUser,
    defaultOpen: true,
  } as Record<string, unknown>,
}

/**
 * No user provided -- the avatar row is hidden entirely.
 */
export const NoUser: Story = {
  name: "User: None (Hidden)",
  args: {
    user: undefined,
    defaultOpen: false,
  } as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        story: "When no `user` prop is provided, the avatar row at the bottom of the sidebar is hidden.",
      },
    },
  },
}

/**
 * User with a collapsed sidebar -- shows avatar circle only.
 */
export const UserCollapsed: Story = {
  name: "User: Collapsed (Avatar Only)",
  args: {
    user: userWithAvatar,
    defaultOpen: false,
  } as Record<string, unknown>,
}

// ─── ALL VARIANTS GALLERY ───────────────────────────────────────────────────

/**
 * Side-by-side comparison of the 7 main nav items. Each row shows
 * a different active item in the expanded sidebar.
 */
export const AllMainNavItems: Story = {
  name: "All Main Nav Items",
  args: {
    defaultOpen: true,
  } as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        story:
          "All 7 main nav items: Home, Recruit, Contacts, Campaigns, Content, Offers, Reporting. " +
          "Toggle the `activeHref` control to see different active states.",
      },
    },
  },
}

// ─── INTERACTION TESTS ──────────────────────────────────────────────────────

/**
 * Verifies that clicking a main nav item fires `onNavigate` with the correct href.
 */
export const NavClickTest: Story = {
  name: "Test: Nav Item Click",
  args: {
    defaultOpen: true,
  } as Record<string, unknown>,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const campaignsButton = await canvas.findByRole("button", { name: /Campaigns/i })
    await userEvent.click(campaignsButton)
    await expect(args.onNavigate).toHaveBeenCalledWith("/campaigns")
  },
}

/**
 * Verifies that clicking a footer nav item fires `onNavigate` with the correct href.
 */
export const FooterNavClickTest: Story = {
  name: "Test: Footer Nav Click",
  args: {
    defaultOpen: true,
  } as Record<string, unknown>,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const settingsButton = await canvas.findByRole("button", { name: /Settings/i })
    await userEvent.click(settingsButton)
    await expect(args.onNavigate).toHaveBeenCalledWith("/settings")
  },
}

/**
 * Verifies the user name is visible when the sidebar is expanded.
 */
export const UserNameVisibleTest: Story = {
  name: "Test: User Name Visible (Expanded)",
  args: {
    user: defaultUser,
    defaultOpen: true,
  } as Record<string, unknown>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const userName = await canvas.findByText("Lokesh Verma")
    await expect(userName).toBeVisible()
  },
}
