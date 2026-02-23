import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, expect } from "storybook/test"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Twitter, Linkedin, Settings, Users, CreditCard, LogOut } from "lucide-react"

/**
 * # Separator
 *
 * A visual or semantic divider between content sections. Built on Radix UI
 * Separator, it renders a thin line (horizontal or vertical) to organize
 * and group related content.
 *
 * ## When to Use
 * - To visually separate sections within a card, panel, or page
 * - Between groups of navigation items in a sidebar or menu
 * - As an "or" divider between alternative actions (e.g., OAuth vs email login)
 * - To divide content areas in profile cards, settings panels, and footers
 *
 * ## When NOT to Use
 * - Between every item in a list -- use spacing or `divide-y` utility instead
 * - As a decorative element with no semantic meaning -- set `decorative={true}`
 * - When a full-width border is needed -- use CSS `border-b` instead
 *
 * ## Accessibility
 * - When `decorative={true}` (default), renders as `role="none"` -- invisible to screen readers
 * - When `decorative={false}`, renders as `role="separator"` with proper ARIA semantics
 * - Orientation is conveyed via `aria-orientation` when non-decorative
 * - Does not receive focus (non-interactive element)
 *
 * ## Import
 * ```tsx
 * import { Separator } from '@/components/ui/separator'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <div>
 *   <p>Section A</p>
 *   <Separator className="my-4" />
 *   <p>Section B</p>
 * </div>
 * ```
 */
const meta: Meta<typeof Separator> = {
  title: "3. Primitives/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Visually or semantically separates content. Supports horizontal and vertical orientations. Built on Radix UI Separator.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/iOUu95ALlUm7fDs2eQPLQb/New-STA-with-Shadcn",
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Direction of the separator line.",
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
        category: "Appearance",
      },
    },
    decorative: {
      control: "boolean",
      description:
        'When `true`, the separator is purely visual (`role="none"`). When `false`, it is announced as a separator by screen readers.',
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Accessibility",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply. Use for spacing (`my-4`) or color overrides.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Separator>

// ─── ORIENTATIONS ─────────────────────────────────

/**
 * Default horizontal separator. Stretches to full width of its container.
 *
 * ```tsx
 * <Separator className="my-4" />
 * ```
 */
export const Horizontal: Story = {
  render: () => (
    <div className="w-72">
      <p className="text-sm font-medium">Section A</p>
      <Separator className="my-4" />
      <p className="text-sm font-medium">Section B</p>
    </div>
  ),
}

/**
 * Vertical separator between inline elements. Must set an explicit height
 * since vertical separators are `h-full` by default.
 *
 * ```tsx
 * <Separator orientation="vertical" className="h-5" />
 * ```
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-sm">
      <span>Home</span>
      <Separator orientation="vertical" className="h-5" />
      <span>About</span>
      <Separator orientation="vertical" className="h-5" />
      <span>Contact</span>
    </div>
  ),
}

// ─── DECORATIVE STATES ────────────────────────────

/**
 * Decorative separator (default). Rendered as `role="none"` and invisible
 * to screen readers. Use for purely visual dividers.
 */
export const Decorative: Story = {
  name: "Decorative (role=none)",
  render: () => (
    <div className="w-72">
      <p className="text-sm">Content above</p>
      <Separator decorative={true} className="my-4" />
      <p className="text-sm">Content below</p>
    </div>
  ),
}

/**
 * Semantic separator. Rendered as `role="separator"` for screen readers.
 * Use when the division has semantic meaning (e.g., between nav groups).
 */
export const Semantic: Story = {
  name: "Semantic (role=separator)",
  render: () => (
    <div className="w-72">
      <p className="text-sm">Navigation group 1</p>
      <Separator decorative={false} className="my-4" />
      <p className="text-sm">Navigation group 2</p>
    </div>
  ),
}

// ─── PATTERNS ─────────────────────────────────────

/**
 * "Or" divider between alternative actions. Common on login / sign-up pages.
 *
 * ```tsx
 * <div className="relative">
 *   <Separator />
 *   <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
 *     or
 *   </span>
 * </div>
 * ```
 */
export const WithLabel: Story = {
  name: "With Label (Or Divider)",
  render: () => (
    <div className="w-72 space-y-4">
      <Button className="w-full" variant="outline">
        Continue with Google
      </Button>
      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          or
        </span>
      </div>
      <Button className="w-full">Sign in with email</Button>
    </div>
  ),
}

/**
 * Separator between breadcrumb-like navigation items using the vertical
 * orientation. Useful for toolbar dividers and inline link lists.
 */
export const BetweenMenuItems: Story = {
  name: "Between Inline Items",
  render: () => (
    <div className="flex items-center gap-3 text-sm">
      <a href="#" className="text-primary hover:underline">Dashboard</a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-primary hover:underline">Campaigns</a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-primary hover:underline">Analytics</a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-muted-foreground">Settings</a>
    </div>
  ),
}

/**
 * Separator used within a content section to divide heading from body.
 */
export const InContentSection: Story = {
  name: "In Content Section",
  render: () => (
    <div className="w-80 space-y-3">
      <div>
        <h3 className="text-lg font-semibold">Campaign Overview</h3>
        <p className="text-sm text-muted-foreground">
          Performance metrics for Q4 2025
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">12.4K</p>
          <p className="text-xs text-muted-foreground">Impressions</p>
        </div>
        <div>
          <p className="text-2xl font-bold">3.2%</p>
          <p className="text-xs text-muted-foreground">Engagement</p>
        </div>
        <div>
          <p className="text-2xl font-bold">$8.5K</p>
          <p className="text-xs text-muted-foreground">Revenue</p>
        </div>
      </div>
    </div>
  ),
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Profile card with separators dividing header, stats, and footer.
 *
 * ```tsx
 * <Separator />
 * ```
 */
export const ProfileCard: Story = {
  name: "Real World -- Profile Card",
  render: () => (
    <div className="w-72 rounded-lg border bg-card p-4 space-y-4">
      <div>
        <h3 className="font-semibold">Sarah Johnson</h3>
        <p className="text-sm text-muted-foreground">Lead Design Engineer</p>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Projects", value: "24" },
          { label: "Followers", value: "1.2k" },
          { label: "Stars", value: "342" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-lg font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="secondary">Design</Badge>
          <Badge variant="secondary">React</Badge>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          <Github className="h-4 w-4 cursor-pointer hover:text-foreground" />
          <Twitter className="h-4 w-4 cursor-pointer hover:text-foreground" />
          <Linkedin className="h-4 w-4 cursor-pointer hover:text-foreground" />
        </div>
      </div>
    </div>
  ),
}

/**
 * Sidebar navigation with separators grouping related items and a
 * destructive sign-out action isolated at the bottom.
 */
export const SidebarNavigation: Story = {
  name: "Real World -- Sidebar Navigation",
  render: () => (
    <div className="w-52 rounded-lg border bg-card p-3 space-y-1">
      {[
        { label: "Dashboard", icon: null },
        { label: "Analytics", icon: null },
        { label: "Campaigns", icon: null },
      ].map(({ label }) => (
        <button
          key={label}
          className="w-full text-left px-3 py-1.5 rounded-md text-sm hover:bg-muted transition-colors"
        >
          {label}
        </button>
      ))}
      <Separator className="my-2" />
      {[
        { label: "Settings", icon: Settings },
        { label: "Team", icon: Users },
        { label: "Billing", icon: CreditCard },
      ].map(({ label, icon: Icon }) => (
        <button
          key={label}
          className="w-full flex items-center gap-2 text-left px-3 py-1.5 rounded-md text-sm hover:bg-muted transition-colors"
        >
          <Icon className="h-4 w-4 text-muted-foreground" />
          {label}
        </button>
      ))}
      <Separator className="my-2" />
      <button className="w-full flex items-center gap-2 text-left px-3 py-1.5 rounded-md text-sm text-destructive hover:bg-destructive/10 transition-colors">
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  ),
}

/**
 * Footer with vertical separators dividing inline link groups.
 */
export const FooterLinks: Story = {
  name: "Real World -- Footer Links",
  render: () => (
    <div className="w-full max-w-lg rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        <Separator orientation="vertical" className="h-4" />
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        <Separator orientation="vertical" className="h-4" />
        <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
        <Separator orientation="vertical" className="h-4" />
        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
      </div>
      <Separator />
      <p className="text-center text-xs text-muted-foreground">
        2025 Aspire. All rights reserved.
      </p>
    </div>
  ),
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that a decorative separator renders with `role="none"` and
 * is NOT exposed to assistive technology.
 */
export const DecorativeRoleTest: Story = {
  name: "Test: Decorative Role",
  render: () => (
    <div className="w-72">
      <p>Above</p>
      <Separator decorative={true} data-testid="sep-decorative" />
      <p>Below</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Decorative separator should NOT have role="separator"
    const separators = canvasElement.querySelectorAll('[data-testid="sep-decorative"]')
    await expect(separators.length).toBe(1)

    const sep = separators[0]
    await expect(sep).toHaveAttribute("role", "none")
  },
}

/**
 * Verifies that a semantic (non-decorative) separator renders with
 * `role="separator"` and the correct orientation.
 */
export const SemanticRoleTest: Story = {
  name: "Test: Semantic Separator Role",
  render: () => (
    <div className="w-72">
      <p>Above</p>
      <Separator decorative={false} data-testid="sep-semantic" />
      <p>Below</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Semantic separator should have role="separator"
    const sep = canvas.getByRole("separator")
    await expect(sep).toBeInTheDocument()
    await expect(sep).toHaveAttribute("data-orientation", "horizontal")
  },
}

/**
 * Verifies that a vertical semantic separator has the correct orientation attribute.
 */
export const VerticalOrientationTest: Story = {
  name: "Test: Vertical Orientation",
  render: () => (
    <div className="flex items-center gap-4 h-10">
      <span>Left</span>
      <Separator orientation="vertical" decorative={false} />
      <span>Right</span>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const sep = canvas.getByRole("separator")
    await expect(sep).toBeInTheDocument()
    await expect(sep).toHaveAttribute("data-orientation", "vertical")
  },
}
