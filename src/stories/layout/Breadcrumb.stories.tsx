import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, expect } from "storybook/test"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, ChevronRight, Slash, Settings, Users } from "lucide-react"

/**
 * # Breadcrumb
 *
 * Displays the user's current location within a navigational hierarchy.
 * Breadcrumbs help users understand where they are and navigate back to
 * parent pages. Supports collapsed paths with ellipsis, custom separators,
 * and icon-enhanced links.
 *
 * ## When to Use
 * - On pages more than one level deep in the navigation hierarchy
 * - When users need a quick way to navigate back to parent sections
 * - In detail pages to show context (e.g., Campaigns > Summer 2026 > Details)
 * - In settings and admin pages with nested sub-sections
 *
 * ## When NOT to Use
 * - On the top-level / home page (no parent to navigate to)
 * - In modals or dialogs (these have their own close mechanism)
 * - When there is only one level of depth
 * - As a replacement for primary navigation -- use SideNav or Tabs instead
 *
 * ## Accessibility
 * - Wrapped in a `<nav>` element with `aria-label="breadcrumb"`
 * - Uses an `<ol>` for proper list semantics
 * - Current page uses `aria-current="page"` and `aria-disabled="true"`
 * - Separators are marked with `aria-hidden="true"` and `role="presentation"`
 * - Ellipsis element is marked `aria-hidden="true"` with sr-only "More" text
 *
 * ## Import
 * ```tsx
 * import {
 *   Breadcrumb,
 *   BreadcrumbList,
 *   BreadcrumbItem,
 *   BreadcrumbLink,
 *   BreadcrumbPage,
 *   BreadcrumbSeparator,
 *   BreadcrumbEllipsis,
 * } from '@/components/ui/breadcrumb'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
const meta: Meta<typeof Breadcrumb> = {
  title: "5. Layout/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays the current page location within a navigational hierarchy. Supports ellipsis truncation for deep paths.",
      },
    },
  },
  argTypes: {
    children: {
      description:
        "The breadcrumb list content. Should contain `BreadcrumbList` with `BreadcrumbItem` children.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the `<nav>` element.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Appearance",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── CORE VARIANTS ─────────────────────────────────

/**
 * Simple two-level breadcrumb. The most basic usage with a parent link
 * and the current page.
 *
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Dashboard</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
export const SimpleTwoLevel: Story = {
  name: "Simple (2-Level)",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/**
 * Multi-level breadcrumb with three or more segments. Common for nested
 * pages like settings sections or campaign details.
 *
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/components">Components</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
export const MultiLevel: Story = {
  name: "Multi-Level",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Feedback</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/**
 * Collapsed breadcrumb with ellipsis for deep navigation paths. Middle
 * segments are hidden behind `BreadcrumbEllipsis` to save horizontal
 * space.
 *
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbEllipsis />
 * </BreadcrumbItem>
 * ```
 */
export const WithEllipsis: Story = {
  name: "With Ellipsis (Collapsed Middle)",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Notifications</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/**
 * Breadcrumb with a custom separator. By default, `BreadcrumbSeparator`
 * renders a `ChevronRight` icon. Pass children to override.
 *
 * ```tsx
 * <BreadcrumbSeparator>
 *   <Slash className="h-3.5 w-3.5" />
 * </BreadcrumbSeparator>
 * ```
 */
export const WithCustomSeparator: Story = {
  name: "Custom Separator (Slash)",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash className="h-3.5 w-3.5" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash className="h-3.5 w-3.5" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Profile</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/**
 * Breadcrumb with a dropdown menu for collapsed items. Clicking the
 * ellipsis reveals hidden breadcrumb segments in a dropdown.
 *
 * ```tsx
 * <BreadcrumbItem>
 *   <DropdownMenu>
 *     <DropdownMenuTrigger className="flex items-center gap-1">
 *       <BreadcrumbEllipsis />
 *     </DropdownMenuTrigger>
 *     <DropdownMenuContent align="start">
 *       <DropdownMenuItem>Hidden Page 1</DropdownMenuItem>
 *       <DropdownMenuItem>Hidden Page 2</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 * </BreadcrumbItem>
 * ```
 */
export const WithDropdownCollapsed: Story = {
  name: "With Dropdown for Collapsed Items",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle collapsed pages</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Campaigns</DropdownMenuItem>
              <DropdownMenuItem>Summer Collection</DropdownMenuItem>
              <DropdownMenuItem>Creators</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Analytics</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Performance</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

// ─── ENHANCED VARIANTS ─────────────────────────────

/**
 * Breadcrumb with icons alongside text labels. The Home icon is a common
 * pattern for the root breadcrumb item.
 *
 * ```tsx
 * <BreadcrumbLink href="#" className="flex items-center gap-1">
 *   <Home className="h-3.5 w-3.5" />
 *   Home
 * </BreadcrumbLink>
 * ```
 */
export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1">
            <Settings className="h-3.5 w-3.5" />
            Settings
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            Team Members
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

// ─── ASPIRE REAL-WORLD EXAMPLES ─────────────────────

/**
 * Aspire campaign detail page breadcrumb. Shows the path from Campaigns
 * to a specific campaign and its detail section.
 */
export const AspireCampaignDetail: Story = {
  name: "Aspire -- Campaigns > Summer Collection > Details",
  render: () => (
    <div className="w-[560px] space-y-4 rounded-lg border bg-card p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Campaigns</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Summer Collection</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-xl font-bold">Summer Collection 2026</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage campaign details, creators, and performance analytics.
        </p>
      </div>
      <div className="h-px bg-border" />
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">24</p>
          <p className="text-xs text-muted-foreground">Creators</p>
        </div>
        <div>
          <p className="text-2xl font-bold">$12K</p>
          <p className="text-xs text-muted-foreground">Budget</p>
        </div>
        <div>
          <p className="text-2xl font-bold">3.8%</p>
          <p className="text-xs text-muted-foreground">Avg. Engagement</p>
        </div>
      </div>
    </div>
  ),
}

/**
 * Aspire contact detail page breadcrumb. Simple two-level path showing
 * the Contacts list and the specific creator.
 */
export const AspireContactDetail: Story = {
  name: "Aspire -- Contacts > Sarah Chen",
  render: () => (
    <div className="w-[560px] space-y-4 rounded-lg border bg-card p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Contacts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Sarah Chen</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-xl font-bold">Sarah Chen</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Lifestyle creator based in Los Angeles. 245K followers on Instagram.
        </p>
      </div>
      <div className="h-px bg-border" />
      <div className="space-y-3">
        {["Profile", "Content", "Inbox", "Activity"].map((tab) => (
          <span
            key={tab}
            className="inline-block mr-4 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {tab}
          </span>
        ))}
      </div>
    </div>
  ),
}

/**
 * Aspire settings page breadcrumb with nested sub-sections. Uses an
 * icon on the root and three levels of depth.
 */
export const AspireSettingsPage: Story = {
  name: "Aspire -- Settings > Notifications",
  render: () => (
    <div className="w-[560px] space-y-4 rounded-lg border bg-card p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Notifications</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-xl font-bold">Notification Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage how and when you receive notifications.
        </p>
      </div>
      <div className="h-px bg-border" />
      <div className="space-y-3">
        {["Email digests", "Push notifications", "Weekly reports"].map(
          (item) => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-sm">{item}</span>
              <div className="h-5 w-9 rounded-full bg-primary/30 border border-primary/50" />
            </div>
          )
        )}
      </div>
    </div>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Interaction test: verifies that breadcrumb links render as anchor elements
 * and the current page is not a link.
 */
export const VerifyLinksTest: Story = {
  name: "Test -- Verify Links Render",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Campaigns</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Details</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Verify breadcrumb links are rendered as anchor elements
    const homeLink = canvas.getByText("Home")
    await expect(homeLink.tagName).toBe("A")
    const campaignsLink = canvas.getByText("Campaigns")
    await expect(campaignsLink.tagName).toBe("A")
    // Verify current page renders as a span, not a link
    const currentPage = canvas.getByText("Details")
    await expect(currentPage.tagName).toBe("SPAN")
    await expect(currentPage).toHaveAttribute("aria-current", "page")
  },
}

/**
 * Interaction test: verifies the breadcrumb nav element has the correct
 * aria-label and the current page is marked with aria-disabled.
 */
export const VerifyAccessibilityTest: Story = {
  name: "Test -- Verify Accessibility Attributes",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Verify the nav element has the correct aria-label
    const nav = canvas.getByRole("navigation", { name: "breadcrumb" })
    await expect(nav).toBeInTheDocument()
    // Verify the current page has aria-disabled
    const currentPage = canvas.getByText("Settings")
    await expect(currentPage).toHaveAttribute("aria-disabled", "true")
    await expect(currentPage).toHaveAttribute("aria-current", "page")
    // Verify the parent link is clickable (is an anchor)
    const dashboardLink = canvas.getByText("Dashboard")
    await expect(dashboardLink.tagName).toBe("A")
  },
}
