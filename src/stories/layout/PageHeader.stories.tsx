import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Download,
  Filter,
  Settings,
  ArrowLeft,
  Share2,
  MoreHorizontal,
  Pencil,
} from "lucide-react"

/**
 * # PageHeader
 *
 * Page-level header with title, optional breadcrumbs, description, and action
 * slots. The Astra AI button is shown by default on the right side.
 *
 * ## When to Use
 * - At the top of every page inside the AppShell content area
 * - To display the current page title and provide contextual actions
 * - When breadcrumb navigation is needed to show page hierarchy
 * - To house primary page-level actions (create, export, filter)
 *
 * ## When NOT to Use
 * - Inside cards or panels -- use a card header instead
 * - For section headings within a page -- use a plain `<h2>` or `<h3>`
 * - In modals or sheets -- they have their own header patterns
 *
 * ## Accessibility
 * - Renders a `<header>` element with `data-slot="page-header"`
 * - Breadcrumbs use `<nav aria-label="Breadcrumb">` with chevron separators
 * - The title is an `<h1>` with `text-xl font-semibold`
 * - Action buttons should include descriptive labels or `aria-label`
 * - The Astra button has `aria-label="Ask Astra AI"`
 *
 * ## Import
 * ```tsx
 * import { PageHeader } from '@/components/layout/PageHeader'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <PageHeader
 *   title="Campaigns"
 *   description="Manage your influencer campaigns."
 *   breadcrumbs={[
 *     { label: "Home", href: "/" },
 *     { label: "Campaigns" },
 *   ]}
 *   actions={<Button size="sm"><Plus /> New Campaign</Button>}
 * />
 * ```
 */
const meta: Meta<typeof PageHeader> = {
  title: "5. Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Page-level header with title, optional breadcrumbs, description, and action slots. AstraButton is shown by default on the right.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "The main page title rendered as an `<h1>` element.",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },
    description: {
      control: "text",
      description: "Optional subtitle text displayed below the title in muted foreground colour.",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },
    breadcrumbs: {
      control: "object",
      description: "Array of breadcrumb items. Each has a `label` string and optional `href`. The last item is rendered as plain text (current page).",
      table: {
        type: { summary: "Breadcrumb[]" },
        category: "Navigation",
      },
    },
    actions: {
      control: false,
      description: "Action buttons or controls rendered on the right side of the header, before the Astra button.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    showAstra: {
      control: "boolean",
      description: "Whether to show the Astra AI button on the right side. Set to `false` for utility pages like Settings.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Behavior",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the root `<header>` element.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    title: "Campaigns",
    showAstra: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── CORE VARIANTS ──────────────────────────────────────────────────────────

/**
 * Minimal header with just a title. The Astra button appears on the right.
 *
 * ```tsx
 * <PageHeader title="Campaigns" />
 * ```
 */
export const Simple: Story = {
  parameters: {
    docs: {
      description: { story: "Title only -- the minimal header configuration." },
    },
  },
}

/**
 * Header with a description subtitle below the title.
 *
 * ```tsx
 * <PageHeader
 *   title="Campaigns"
 *   description="Manage and track all your influencer campaigns in one place."
 * />
 * ```
 */
export const WithDescription: Story = {
  name: "With Description",
  args: {
    description: "Manage and track all your influencer campaigns in one place.",
  },
}

/**
 * Header with breadcrumb navigation showing page hierarchy.
 *
 * ```tsx
 * <PageHeader
 *   title="Summer Drop 2025"
 *   breadcrumbs={[
 *     { label: "Home", href: "/" },
 *     { label: "Campaigns", href: "/campaigns" },
 *     { label: "Summer Drop 2025" },
 *   ]}
 * />
 * ```
 */
export const WithBreadcrumbs: Story = {
  name: "With Breadcrumbs",
  args: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Campaigns", href: "/campaigns" },
      { label: "Summer Drop 2025" },
    ],
    title: "Summer Drop 2025",
  },
}

/**
 * Header with action buttons on the right side.
 *
 * ```tsx
 * <PageHeader
 *   title="Campaigns"
 *   actions={
 *     <div className="flex items-center gap-2">
 *       <Button variant="outline" size="sm">
 *         <Download /> Export
 *       </Button>
 *       <Button size="sm">
 *         <Plus /> New Campaign
 *       </Button>
 *     </div>
 *   }
 * />
 * ```
 */
export const WithActions: Story = {
  name: "With Actions",
  args: {
    actions: (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>
    ),
  },
}

/**
 * Header with the Astra AI button visible (default behaviour).
 *
 * ```tsx
 * <PageHeader title="Campaigns" showAstra={true} />
 * ```
 */
export const WithAstraButton: Story = {
  name: "With Astra AI Button",
  args: {
    title: "Campaigns",
    showAstra: true,
  },
  parameters: {
    docs: {
      description: {
        story: "The Astra AI button is shown by default. It appears as a sparkle icon with \"Ask Astra\" label.",
      },
    },
  },
}

/**
 * Header without the Astra button -- suitable for utility pages.
 *
 * ```tsx
 * <PageHeader title="Settings" showAstra={false} />
 * ```
 */
export const NoAstra: Story = {
  name: "Without Astra Button",
  args: {
    title: "Settings",
    description: "Manage your account and workspace preferences.",
    showAstra: false,
  },
  parameters: {
    docs: {
      description: { story: "Astra button hidden -- suitable for utility pages like Settings." },
    },
  },
}

/**
 * Full configuration with breadcrumbs, description, actions, and Astra.
 *
 * ```tsx
 * <PageHeader
 *   breadcrumbs={[{ label: "Home", href: "/" }, { label: "Campaigns" }]}
 *   title="Campaigns"
 *   description="Manage and track all your influencer campaigns."
 *   actions={
 *     <div className="flex items-center gap-2">
 *       <Button variant="outline" size="sm"><Filter /> Filter</Button>
 *       <Button size="sm"><Plus /> New Campaign</Button>
 *     </div>
 *   }
 *   showAstra
 * />
 * ```
 */
export const FullConfig: Story = {
  name: "Full Configuration",
  args: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Campaigns", href: "/campaigns" },
    ],
    title: "Campaigns",
    description: "Manage and track all your influencer campaigns.",
    actions: (
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
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "All options enabled -- breadcrumbs, description, actions, and Astra.",
      },
    },
  },
}

// ─── ASPIRE REAL-WORLD EXAMPLES ─────────────────────────────────────────────

/**
 * Campaigns page header as used in the Aspire app.
 *
 * ```tsx
 * <PageHeader
 *   title="Campaigns"
 *   description="Plan and manage influencer marketing campaigns."
 *   actions={
 *     <div className="flex items-center gap-2">
 *       <Button variant="outline" size="sm"><Filter /> Filter</Button>
 *       <Button size="sm"><Plus /> New Campaign</Button>
 *     </div>
 *   }
 * />
 * ```
 */
export const AspireCampaignsHeader: Story = {
  name: "Real World -- Campaigns Page",
  args: {
    title: "Campaigns",
    description: "Plan and manage influencer marketing campaigns.",
    actions: (
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
    ),
  },
}

/**
 * Creator detail page header with breadcrumbs and contextual actions.
 *
 * ```tsx
 * <PageHeader
 *   breadcrumbs={[
 *     { label: "Contacts", href: "/contacts" },
 *     { label: "Sarah Chen" },
 *   ]}
 *   title="Sarah Chen"
 *   description="@sarahcreates -- 124K followers on Instagram"
 *   actions={
 *     <div className="flex items-center gap-2">
 *       <Button variant="ghost" size="icon"><Share2 /></Button>
 *       <Button variant="outline" size="sm"><Pencil /> Edit</Button>
 *     </div>
 *   }
 * />
 * ```
 */
export const AspireCreatorDetailHeader: Story = {
  name: "Real World -- Creator Detail Page",
  args: {
    breadcrumbs: [
      { label: "Contacts", href: "/contacts" },
      { label: "Sarah Chen" },
    ],
    title: "Sarah Chen",
    description: "@sarahcreates -- 124K followers on Instagram",
    actions: (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Share">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="More options">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>
    ),
  },
}

/**
 * Settings page header -- Astra hidden, clean utility layout.
 *
 * ```tsx
 * <PageHeader
 *   title="Settings"
 *   description="Manage your account, workspace, and integrations."
 *   showAstra={false}
 *   actions={
 *     <Button variant="outline" size="sm">
 *       <Settings /> Workspace
 *     </Button>
 *   }
 * />
 * ```
 */
export const AspireSettingsHeader: Story = {
  name: "Real World -- Settings Page",
  args: {
    title: "Settings",
    description: "Manage your account, workspace, and integrations.",
    showAstra: false,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Settings" },
    ],
    actions: (
      <Button variant="outline" size="sm">
        <Settings className="mr-2 h-4 w-4" />
        Workspace
      </Button>
    ),
  },
}

/**
 * Deep breadcrumb hierarchy for a nested page.
 */
export const DeepBreadcrumbs: Story = {
  name: "Deep Breadcrumb Hierarchy",
  args: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Campaigns", href: "/campaigns" },
      { label: "Summer Drop 2025", href: "/campaigns/summer-drop" },
      { label: "Content Briefs" },
    ],
    title: "Content Briefs",
    description: "Review and approve content briefs for this campaign.",
    actions: (
      <Button size="sm">
        <Plus className="mr-2 h-4 w-4" />
        New Brief
      </Button>
    ),
  },
}

/**
 * Title only with no Astra, no actions, no breadcrumbs, no description.
 */
export const Minimal: Story = {
  name: "Minimal (Title Only, No Astra)",
  args: {
    title: "Dashboard",
    showAstra: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Absolute minimal header -- just a title with no extras. Useful for simple overview pages.",
      },
    },
  },
}

// ─── INTERACTION TESTS ──────────────────────────────────────────────────────

/**
 * Verifies the page title is rendered as an `<h1>` element.
 */
export const TitleRendersAsH1Test: Story = {
  name: "Test: Title Renders as H1",
  args: {
    title: "Test Page Title",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const heading = canvas.getByRole("heading", { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toHaveTextContent("Test Page Title")
  },
}

/**
 * Verifies the breadcrumb nav landmark is present when breadcrumbs are provided.
 */
export const BreadcrumbNavTest: Story = {
  name: "Test: Breadcrumb Navigation Landmark",
  args: {
    title: "Detail Page",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Contacts", href: "/contacts" },
      { label: "Detail Page" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nav = canvas.getByRole("navigation", { name: /breadcrumb/i })
    await expect(nav).toBeVisible()
    await expect(canvas.getByText("Home")).toBeVisible()
    await expect(canvas.getByText("Contacts")).toBeVisible()
    await expect(canvas.getByText("Detail Page")).toBeVisible()
  },
}

/**
 * Verifies the Astra button is rendered with the correct aria-label.
 */
export const AstraButtonTest: Story = {
  name: "Test: Astra Button Accessible",
  args: {
    title: "Campaigns",
    showAstra: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const astraButton = canvas.getByRole("button", { name: /ask astra/i })
    await expect(astraButton).toBeVisible()
  },
}

/**
 * Verifies no Astra button is rendered when `showAstra` is false.
 */
export const NoAstraButtonTest: Story = {
  name: "Test: No Astra When Hidden",
  args: {
    title: "Settings",
    showAstra: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const astraButton = canvas.queryByRole("button", { name: /ask astra/i })
    await expect(astraButton).toBeNull()
  },
}
