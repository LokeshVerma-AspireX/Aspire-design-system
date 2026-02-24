import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { AppShell } from "@/components/layout/AppShell"
import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Plus, Download, Filter, Search, Users } from "lucide-react"

// ─── Fixtures ───────────────────────────────────────────────────────────────

const defaultUser = {
  name: "Olivia Martin",
  initials: "OM",
}

const userWithAvatar = {
  name: "Olivia Martin",
  avatarUrl: "https://i.pravatar.cc/150?u=olivia",
  initials: "OM",
}

/**
 * # AppShell
 *
 * The top-level application layout that composes `SidebarProvider`, `AppSidebar`,
 * and `SidebarInset` into a single wrapper. Every authenticated page in Aspire
 * is rendered inside `AppShell`.
 *
 * ## When to Use
 * - As the outermost layout wrapper for every authenticated page
 * - When you need a sidebar with navigation alongside page content
 * - To provide consistent sidebar behaviour (collapse/expand) across the app
 *
 * ## When NOT to Use
 * - For unauthenticated pages (login, signup) -- use a plain centered layout
 * - When embedding content in a modal or drawer -- the shell is already present
 * - For marketing / landing pages that have their own layout
 *
 * ## Accessibility
 * - The sidebar uses `<nav>` landmarks with labelled groups
 * - `SidebarRail` provides a draggable resize handle with keyboard support
 * - Active nav item is indicated via `data-active` and `aria-current`
 * - Collapsed state keeps icon + text label visible (stacked) for main nav
 *
 * ## Import
 * ```tsx
 * import { AppShell } from '@/components/layout/AppShell'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <AppShell
 *   activeHref="/contacts"
 *   user={{ name: "Olivia Martin", initials: "OM" }}
 *   onNavigate={(href) => router.push(href)}
 * >
 *   <PageHeader title="Contacts" />
 *   <main className="flex-1 p-6">Page content</main>
 * </AppShell>
 * ```
 */
const meta: Meta<typeof AppShell> = {
  title: "5. Layout/AppShell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Top-level application shell that wraps SidebarProvider, AppSidebar, and SidebarInset. Use as the root layout for every authenticated page in Aspire.",
      },
    },
  },
  argTypes: {
    activeHref: {
      control: "select",
      options: ["/", "/recruit", "/contacts", "/campaigns", "/content", "/offers", "/reporting", "/settings", "/messages"],
      description: "The `href` of the currently active nav item. Controls which sidebar link is highlighted.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"/"' },
        category: "Navigation",
      },
    },
    user: {
      control: "object",
      description: "User info displayed at the bottom of the sidebar. Contains `name`, optional `avatarUrl`, and optional `initials`.",
      table: {
        type: { summary: "UserInfo" },
        category: "Content",
      },
    },
    badgeCounts: {
      control: "object",
      description: "Badge counts for sidebar footer items. Keys map to `badgeKey` on footer nav items (e.g. `messages`).",
      table: {
        type: { summary: "BadgeCounts" },
        defaultValue: { summary: "{}" },
        category: "Content",
      },
    },
    defaultCollapsed: {
      control: "boolean",
      description: "Whether the sidebar starts in the collapsed (icon-only) state.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Behavior",
      },
    },
    onNavigate: {
      action: "navigated",
      description: "Callback fired when a sidebar nav item is clicked. Receives the `href` string.",
      table: {
        type: { summary: "(href: string) => void" },
        category: "Events",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the `SidebarInset` content wrapper.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    children: {
      control: false,
      description: "Page content rendered inside the `SidebarInset` area.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
  args: {
    activeHref: "/",
    user: defaultUser,
    defaultCollapsed: true,
    onNavigate: fn(),
  },
}

export default meta
type Story = StoryObj<typeof AppShell>

// ─── Helpers ────────────────────────────────────────────────────────────────

function PlaceholderContent({ rows = 6 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3 p-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-12 rounded-lg bg-muted/40 animate-pulse"
          style={{ width: `${75 + (i % 3) * 8}%` }}
        />
      ))}
    </div>
  )
}

// ─── CORE VARIANTS ──────────────────────────────────────────────────────────

/**
 * Default shell with collapsed sidebar and simple page content.
 *
 * ```tsx
 * <AppShell activeHref="/" user={{ name: "Olivia Martin" }}>
 *   <PageHeader title="Dashboard" />
 *   <main className="flex-1 p-6">Welcome to Aspire</main>
 * </AppShell>
 * ```
 */
export const Default: Story = {
  render: (args) => (
    <AppShell {...args}>
      <PageHeader
        title="Dashboard"
        description="Welcome to Aspire. Select a page from the sidebar to get started."
      />
      <PlaceholderContent />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default shell with collapsed sidebar, PageHeader, and placeholder content rows.",
      },
    },
  },
}

/**
 * Sidebar starts expanded, showing full labels for all nav items.
 *
 * ```tsx
 * <AppShell defaultCollapsed={false} activeHref="/contacts" user={user}>
 *   {children}
 * </AppShell>
 * ```
 */
export const ExpandedSidebar: Story = {
  name: "Expanded Sidebar",
  args: {
    defaultCollapsed: false,
    activeHref: "/contacts",
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader
        title="Contacts"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contacts" }]}
      />
      <PlaceholderContent rows={8} />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shell with the sidebar pre-expanded showing the Aspire wordmark and full nav labels.",
      },
    },
  },
}

/**
 * Shell displaying badge counts on the Messages footer item.
 *
 * ```tsx
 * <AppShell
 *   activeHref="/"
 *   user={user}
 *   badgeCounts={{ messages: 12 }}
 * >
 *   {children}
 * </AppShell>
 * ```
 */
export const WithBadgeCounts: Story = {
  name: "With Badge Counts",
  args: {
    badgeCounts: { messages: 12 },
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader title="Home" />
      <main className="flex-1 p-6">
        <p className="text-sm text-muted-foreground">
          The Messages nav item in the footer displays a badge count of 12.
        </p>
      </main>
    </AppShell>
  ),
}

/**
 * Shell with a high message count that triggers the 99+ truncation.
 */
export const HighBadgeCount: Story = {
  name: "High Badge Count (99+)",
  args: {
    badgeCounts: { messages: 142 },
    defaultCollapsed: false,
    activeHref: "/messages",
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader title="Messages" showAstra={false} />
      <main className="flex-1 p-6">
        <p className="text-sm text-muted-foreground">
          When the badge count exceeds 99, it displays &quot;99+&quot;.
        </p>
      </main>
    </AppShell>
  ),
}

// ─── ACTIVE PAGE VARIANTS ───────────────────────────────────────────────────

/**
 * Shows the Contacts page active in the sidebar.
 */
export const ContactsActive: Story = {
  name: "Active: Contacts",
  args: {
    activeHref: "/contacts",
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader title="Contacts" description="Manage your creator contacts and relationships." />
      <PlaceholderContent />
    </AppShell>
  ),
}

/**
 * Shows the Campaigns page active in the expanded sidebar.
 */
export const CampaignsActive: Story = {
  name: "Active: Campaigns (Expanded)",
  args: {
    activeHref: "/campaigns",
    defaultCollapsed: false,
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader title="Campaigns" description="Plan and manage influencer marketing campaigns." />
      <PlaceholderContent />
    </AppShell>
  ),
}

/**
 * Shows the Settings footer item active.
 */
export const SettingsActive: Story = {
  name: "Active: Settings",
  args: {
    activeHref: "/settings",
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader title="Settings" description="Account preferences and workspace configuration." showAstra={false} />
      <PlaceholderContent />
    </AppShell>
  ),
}

// ─── WITH USER AVATAR ───────────────────────────────────────────────────────

/**
 * Shell with a user that has an avatar image URL.
 */
export const WithUserAvatar: Story = {
  name: "With User Avatar",
  args: {
    user: userWithAvatar,
    defaultCollapsed: false,
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader title="Home" />
      <main className="flex-1 p-6">
        <p className="text-sm text-muted-foreground">
          The sidebar footer displays the user avatar image instead of initials.
        </p>
      </main>
    </AppShell>
  ),
}

/**
 * Shell with no user and no badges -- the bare-bones layout.
 */
export const MinimalShell: Story = {
  name: "Minimal (No User)",
  args: {
    user: undefined,
    activeHref: "/",
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader title="Dashboard" />
      <PlaceholderContent />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: { story: "Shell without a logged-in user -- hides the avatar area." },
    },
  },
}

// ─── REAL-WORLD COMPOSITIONS ────────────────────────────────────────────────

/**
 * Full application layout with a `PageHeader` and content area, mimicking
 * the Aspire Campaigns page.
 *
 * ```tsx
 * <AppShell activeHref="/campaigns" user={user}>
 *   <PageHeader
 *     title="Campaigns"
 *     description="Manage your influencer campaigns."
 *     actions={<Button size="sm"><Plus /> New Campaign</Button>}
 *   />
 *   <main className="flex-1 overflow-auto p-6">
 *     Page content here
 *   </main>
 * </AppShell>
 * ```
 */
export const AspireCampaignsPage: Story = {
  name: "Real World -- Campaigns Page",
  args: {
    activeHref: "/campaigns",
    user: defaultUser,
    badgeCounts: { messages: 3 },
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader
        title="Campaigns"
        description="Manage and track all your influencer campaigns in one place."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </div>
        }
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Summer Drop 2025", "Back to School", "Holiday Collection"].map(
            (name) => (
              <div
                key={name}
                className="rounded-lg border bg-card p-4 space-y-2"
              >
                <h3 className="text-sm font-semibold">{name}</h3>
                <p className="text-xs text-muted-foreground">
                  12 creators -- 48 posts -- $24.5K budget
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </AppShell>
  ),
}

/**
 * Contacts page layout inside the AppShell, with a PageHeader,
 * search bar, and a placeholder contacts table.
 *
 * ```tsx
 * <AppShell activeHref="/contacts" user={user} badgeCounts={{ messages: 7 }}>
 *   <PageHeader title="Contacts" breadcrumbs={breadcrumbs} actions={actions} />
 *   <main className="flex-1 overflow-auto p-6">
 *     Search bar and contacts table
 *   </main>
 * </AppShell>
 * ```
 */
export const AspireContactsPage: Story = {
  name: "Real World -- Contacts Page",
  args: {
    activeHref: "/contacts",
    user: userWithAvatar,
    badgeCounts: { messages: 7 },
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader
        title="Contacts"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contacts" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Creator
            </Button>
          </div>
        }
      />
      <main className="flex-1 overflow-auto p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="h-9 w-full rounded-md border bg-background pl-10 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="rounded-lg border">
          <div className="grid grid-cols-4 gap-4 border-b bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
            <span>Name</span>
            <span>Platform</span>
            <span>Followers</span>
            <span>Status</span>
          </div>
          {[
            { name: "Sarah Chen", platform: "Instagram", followers: "124K", status: "Active" },
            { name: "Mike Rivera", platform: "TikTok", followers: "89K", status: "Pending" },
            { name: "Alex Kim", platform: "YouTube", followers: "312K", status: "Active" },
          ].map((c) => (
            <div key={c.name} className="grid grid-cols-4 gap-4 border-b px-4 py-3 text-sm last:border-0">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                {c.name}
              </span>
              <span>{c.platform}</span>
              <span>{c.followers}</span>
              <span className="text-xs">{c.status}</span>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  ),
}

/**
 * Reporting page with export action and breadcrumbs.
 */
export const AspireReportingPage: Story = {
  name: "Real World -- Reporting Page",
  args: {
    activeHref: "/reporting",
    user: defaultUser,
  },
  render: (args) => (
    <AppShell {...args}>
      <PageHeader
        title="Reporting"
        description="Track campaign performance and influencer ROI."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reporting" }]}
        actions={
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        }
      />
      <PlaceholderContent rows={10} />
    </AppShell>
  ),
}

// ─── INTERACTION TESTS ──────────────────────────────────────────────────────

/**
 * Verifies that clicking a sidebar nav item fires the `onNavigate` callback.
 */
export const NavigationClickTest: Story = {
  name: "Test: Navigation Click",
  args: {
    defaultCollapsed: false,
    user: defaultUser,
  },
  render: (args) => (
    <AppShell {...args}>
      <main className="flex-1 p-6">
        <p>Click a nav item in the sidebar.</p>
      </main>
    </AppShell>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const contactsButton = await canvas.findByRole("button", { name: /Contacts/i })
    await userEvent.click(contactsButton)
    await expect(args.onNavigate).toHaveBeenCalledWith("/contacts")
  },
}

/**
 * Verifies sidebar renders user name when expanded.
 */
export const UserNameVisibleTest: Story = {
  name: "Test: User Name Visible",
  args: {
    defaultCollapsed: false,
    user: defaultUser,
  },
  render: (args) => (
    <AppShell {...args}>
      <main className="flex-1 p-6">
        <p>Sidebar is expanded so user name should be visible.</p>
      </main>
    </AppShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const userName = await canvas.findByText("Olivia Martin")
    await expect(userName).toBeVisible()
  },
}
