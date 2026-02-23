import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  SlidersHorizontal,
  Home,
  BarChart,
  Users,
  Settings,
  FileText,
  Bell,
  LogOut,
  X,
  Instagram,
  Youtube,
  ExternalLink,
} from "lucide-react"
import type { ElementType } from "react"

/**
 * # Sheet
 *
 * A slide-in panel that emerges from any edge of the viewport. Built on top
 * of Radix Dialog primitives, it includes a backdrop overlay and focus
 * trapping. Ideal for navigation drawers, filter panels, and detail views
 * that need more space than a popover but should not replace the page.
 *
 * ## When to Use
 * - Side navigation or mobile menu drawers
 * - Filter panels with multiple controls
 * - Detail views for list items (creator profiles, order details)
 * - Notification or activity panels
 *
 * ## When NOT to Use
 * - For short confirmations -- use Dialog instead
 * - For quick inline info -- use Popover instead
 * - For full-page forms -- use a dedicated page or route
 * - For non-blocking feedback -- use Toast instead
 *
 * ## Accessibility
 * - Focus is trapped inside the sheet while open
 * - Pressing Escape closes the sheet
 * - `SheetTitle` is announced as the dialog label
 * - `SheetDescription` provides assistive context
 * - Close button includes `sr-only` text for screen readers
 * - Returns focus to trigger on close
 *
 * ## Import
 * ```tsx
 * import {
 *   Sheet,
 *   SheetContent,
 *   SheetDescription,
 *   SheetHeader,
 *   SheetTitle,
 *   SheetTrigger,
 *   SheetFooter,
 * } from '@/components/ui/sheet'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button>Open Panel</Button>
 *   </SheetTrigger>
 *   <SheetContent side="right">
 *     <SheetHeader>
 *       <SheetTitle>Panel Title</SheetTitle>
 *       <SheetDescription>Description text.</SheetDescription>
 *     </SheetHeader>
 *     <p>Content goes here.</p>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
const meta: Meta<typeof Sheet> = {
  title: "4. Components/Feedback/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Slide-in panel from any edge. Ideal for navigation drawers, filter panels, and detail views.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description:
        "Controlled open state. When provided, the sheet becomes controlled and `onOpenChange` is required.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
        category: "State",
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "The initial open state for uncontrolled usage.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    onOpenChange: {
      description:
        "Callback fired when the open state changes. Required for controlled mode.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Events",
      },
    },
    modal: {
      control: "boolean",
      description:
        "When true (default), interaction with outside elements is disabled.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Behavior",
      },
    },
  },
  args: {
    onOpenChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── SIDE VARIANTS ─────────────────────────────────

/**
 * Default sheet sliding in from the right edge. This is the most common
 * variant for detail panels and settings.
 *
 * ```tsx
 * <SheetContent side="right">
 *   ...
 * </SheetContent>
 * ```
 */
export const RightSide: Story = {
  name: "Right (Default)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Right Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Right Panel</SheetTitle>
          <SheetDescription>
            This panel slides in from the right side. Default behavior.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 py-4 text-sm text-muted-foreground">
          Add any content here -- forms, details, or navigation.
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Sheet sliding in from the left edge. Common for navigation drawers on
 * mobile or secondary navigation menus.
 *
 * ```tsx
 * <SheetContent side="left">
 *   ...
 * </SheetContent>
 * ```
 */
export const LeftSide: Story = {
  name: "Left Side",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Panel</SheetTitle>
          <SheetDescription>Slides in from the left edge.</SheetDescription>
        </SheetHeader>
        <div className="px-4 py-4 text-sm text-muted-foreground">
          Typically used for navigation drawers.
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Sheet sliding down from the top edge. Useful for search bars, announcements,
 * or command palettes.
 *
 * ```tsx
 * <SheetContent side="top">
 *   ...
 * </SheetContent>
 * ```
 */
export const TopSide: Story = {
  name: "Top Side",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top Panel</SheetTitle>
          <SheetDescription>Slides down from the top edge.</SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          Good for search overlays or announcements.
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Sheet sliding up from the bottom edge. Common on mobile for action sheets
 * and bottom drawers.
 *
 * ```tsx
 * <SheetContent side="bottom">
 *   ...
 * </SheetContent>
 * ```
 */
export const BottomSide: Story = {
  name: "Bottom Side",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Panel</SheetTitle>
          <SheetDescription>Slides up from the bottom edge.</SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          Common on mobile for action sheets.
        </div>
      </SheetContent>
    </Sheet>
  ),
}

// ─── WITH FORM / FOOTER ────────────────────────────

/**
 * Sheet with a form inside. Includes a scrollable body area and a sticky
 * footer with action buttons.
 *
 * ```tsx
 * <SheetContent className="flex flex-col">
 *   <SheetHeader>...</SheetHeader>
 *   <div className="flex-1 overflow-y-auto px-4">
 *     ...form fields...
 *   </div>
 *   <SheetFooter>
 *     <Button variant="outline">Cancel</Button>
 *     <Button>Save</Button>
 *   </SheetFooter>
 * </SheetContent>
 * ```
 */
export const WithForm: Story = {
  name: "With Form",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Creator</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Edit creator profile</SheetTitle>
          <SheetDescription>
            Update the creator details below. Changes save immediately.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          <div className="grid gap-1.5">
            <Label htmlFor="sf-name">Full name</Label>
            <Input id="sf-name" defaultValue="Alex Rivera" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="sf-email">Email</Label>
            <Input
              id="sf-email"
              type="email"
              defaultValue="alex@example.com"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="sf-handle">Instagram handle</Label>
            <Input id="sf-handle" defaultValue="@alexrivera" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="sf-niche">Niche</Label>
            <Input id="sf-niche" defaultValue="Lifestyle & Travel" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="sf-rate">Rate per post ($)</Label>
            <Input id="sf-rate" type="number" defaultValue="500" />
          </div>
        </div>
        <SheetFooter className="border-t pt-4">
          <SheetClose asChild>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </SheetClose>
          <Button className="flex-1">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Sheet with a footer containing multiple action buttons. The footer is
 * pinned to the bottom using `mt-auto`.
 *
 * ```tsx
 * <SheetFooter className="border-t pt-4">
 *   <Button variant="outline">Reset</Button>
 *   <Button>Apply</Button>
 * </SheetFooter>
 * ```
 */
export const WithFooter: Story = {
  name: "With Footer",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open With Footer</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Panel with Footer</SheetTitle>
          <SheetDescription>
            The footer stays pinned at the bottom of the sheet.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 px-4 py-4 text-sm text-muted-foreground">
          <p>
            Content area fills the available space. The footer below uses
            `mt-auto` to pin itself to the bottom.
          </p>
        </div>
        <SheetFooter className="border-t pt-4">
          <Button variant="outline" className="flex-1">
            Secondary
          </Button>
          <Button className="flex-1">Primary Action</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

// ─── ASPIRE REAL-WORLD EXAMPLES ─────────────────────

const navItems: Array<{
  icon: ElementType
  label: string
  href: string
  active?: boolean
  badge?: string
}> = [
  { icon: Home, label: "Dashboard", href: "#", active: true },
  { icon: BarChart, label: "Analytics", href: "#", badge: "New" },
  { icon: Users, label: "Team", href: "#" },
  { icon: FileText, label: "Projects", href: "#", badge: "12" },
  { icon: Bell, label: "Notifications", href: "#", badge: "3" },
  { icon: Settings, label: "Settings", href: "#" },
]

/**
 * Aspire creator detail panel. Shows a creator's profile overview in a
 * right-side sheet, common in the contacts list view.
 */
export const AspireCreatorDetail: Story = {
  name: "Aspire -- Creator Detail Panel",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Creator</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle>Creator Details</SheetTitle>
          <SheetDescription>
            Quick view of creator profile and stats.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Alex Rivera"
              />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Alex Rivera</p>
              <p className="text-sm text-muted-foreground">
                @alexrivera
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Lifestyle</Badge>
            <Badge variant="secondary">Travel</Badge>
            <Badge variant="secondary">Fashion</Badge>
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold">245K</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="text-lg font-bold">3.8%</p>
              <p className="text-xs text-muted-foreground">Eng. Rate</p>
            </div>
            <div>
              <p className="text-lg font-bold">$500</p>
              <p className="text-xs text-muted-foreground">Per Post</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-medium">Platforms</p>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Instagram className="h-4 w-4" /> Instagram
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Youtube className="h-4 w-4" /> YouTube
              </div>
            </div>
          </div>
        </div>
        <SheetFooter className="border-t p-4">
          <Button variant="outline" className="flex-1 gap-1.5">
            <ExternalLink className="h-4 w-4" />
            Full Profile
          </Button>
          <Button className="flex-1">Add to Campaign</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Aspire filter panel. A right-side sheet with toggles, search, and date
 * range inputs for narrowing down list results.
 */
export const AspireFilterPanel: Story = {
  name: "Aspire -- Filter Panel",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Filter Results</SheetTitle>
          <SheetDescription>
            Narrow down results by applying filters.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Search
            </Label>
            <Input placeholder="Filter by name..." />
          </div>
          <Separator />
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Status
            </Label>
            {["Active", "Pending", "Archived", "Draft"].map((s) => (
              <div key={s} className="flex items-center justify-between">
                <Label htmlFor={`filter-${s}`} className="font-normal">
                  {s}
                </Label>
                <Switch id={`filter-${s}`} defaultChecked={s === "Active"} />
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Date Range
            </Label>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="filter-from" className="text-xs">
                  From
                </Label>
                <Input id="filter-from" type="date" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="filter-to" className="text-xs">
                  To
                </Label>
                <Input id="filter-to" type="date" />
              </div>
            </div>
          </div>
        </div>
        <SheetFooter className="border-t pt-4">
          <Button variant="outline" className="flex-1">
            Reset
          </Button>
          <Button className="flex-1">Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Aspire notification panel. A left-side navigation drawer used as a
 * mobile menu with navigation links, badges, and user profile.
 */
export const AspireNotificationPanel: Story = {
  name: "Aspire -- Navigation Drawer",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-64 flex-col p-0">
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                A
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold">Aspire</p>
              <p className="text-xs text-muted-foreground">Design System</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map(({ icon: Icon, label, active, badge }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              onClick={(e) => e.preventDefault()}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{label}</span>
              {badge && (
                <Badge variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              )}
            </a>
          ))}
        </nav>
        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted">
            <Avatar className="h-7 w-7">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User"
              />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                Sarah Johnson
              </p>
              <p className="text-xs truncate">sarah@aspire.io</p>
            </div>
            <LogOut className="h-4 w-4 shrink-0" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Interaction test: clicks the trigger button and verifies the sheet title
 * becomes visible in the DOM.
 */
export const OpenSheetTest: Story = {
  name: "Test -- Open Sheet",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Test Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Test Sheet Title</SheetTitle>
          <SheetDescription>
            Sheet content for interaction testing.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 py-4 text-sm text-muted-foreground">
          Test content is visible here.
        </div>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Open Test Sheet" })
    await userEvent.click(trigger)
    // Sheet renders in a portal, query the document body
    const body = within(document.body)
    const title = await body.findByText("Test Sheet Title")
    await expect(title).toBeVisible()
  },
}

/**
 * Interaction test: opens the sheet and verifies the body content paragraph
 * is rendered and visible.
 */
export const VerifyContentTest: Story = {
  name: "Test -- Verify Content Visible",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Content Test</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Content Test</SheetTitle>
          <SheetDescription>Testing content visibility.</SheetDescription>
        </SheetHeader>
        <p className="px-4 py-4 text-sm" data-testid="sheet-test-content">
          This paragraph should be visible after opening the sheet.
        </p>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Open Content Test" })
    await userEvent.click(trigger)
    const body = within(document.body)
    const content = await body.findByText(
      "This paragraph should be visible after opening the sheet."
    )
    await expect(content).toBeVisible()
  },
}
