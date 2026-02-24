import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect, waitFor } from "storybook/test"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Settings,
  LogOut,
  CreditCard,
  Bell,
  HelpCircle,
  ChevronDown,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Share,
  ExternalLink,
  Star,
  Archive,
  UserPlus,
  Mail,
  MessageSquare,
  Download,
  SortAsc,
  SortDesc,
  ArrowUpDown,
  Eye,
  Tag,
  Megaphone,
  BarChart,
  Link,
  Flag,
  Shield,
  Palette,
} from "lucide-react"

/**
 * # DropdownMenu
 *
 * A button-triggered floating menu for presenting a set of actions or options.
 * Built on Radix UI DropdownMenu with support for items, groups, separators,
 * checkboxes, radio items, sub-menus, and keyboard shortcuts.
 *
 * ## When to Use
 * - For actions triggered by a button click (not right-click)
 * - For "more actions" overflow menus on table rows, cards, or toolbars
 * - For user profile / account menus
 * - For sort, filter, or view-toggle menus
 *
 * ## When NOT to Use
 * - For right-click menus -- use ContextMenu instead
 * - For navigation with dropdowns -- use NavigationMenu instead
 * - For selecting a single value in a form -- use Select instead
 * - For command palette / search -- use Command instead
 *
 * ## Accessibility
 * - Opens on click or Enter/Space on the trigger
 * - Full keyboard navigation: arrow keys to move, Enter to select, Escape to close
 * - `DropdownMenuContent` has `sideOffset={4}` by default for visual separation
 * - Items support `disabled` state and `variant="destructive"` styling
 * - Checkbox and radio items include proper ARIA checked states
 * - Sub-menus open on hover or ArrowRight keyboard press
 *
 * ## Import
 * ```tsx
 * import {
 *   DropdownMenu,
 *   DropdownMenuContent,
 *   DropdownMenuGroup,
 *   DropdownMenuItem,
 *   DropdownMenuLabel,
 *   DropdownMenuSeparator,
 *   DropdownMenuShortcut,
 *   DropdownMenuSub,
 *   DropdownMenuSubContent,
 *   DropdownMenuSubTrigger,
 *   DropdownMenuTrigger,
 *   DropdownMenuCheckboxItem,
 *   DropdownMenuRadioGroup,
 *   DropdownMenuRadioItem,
 * } from '@/components/ui/dropdown-menu'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline">Options</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Edit</DropdownMenuItem>
 *     <DropdownMenuItem>Duplicate</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
const meta: Meta<typeof DropdownMenu> = {
  title: "4. Components/Navigation/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button-triggered context menu. Supports items, groups, separators, checkboxes, radio items, sub-menus, and keyboard shortcuts.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state of the dropdown menu.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
        category: "State",
      },
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback fired when the dropdown opens or closes.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Events",
      },
    },
    modal: {
      control: "boolean",
      description:
        "When true, interaction with outside elements is disabled and only menu content is visible to screen readers.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Behavior",
      },
    },
    children: {
      control: false,
      description:
        "Must include DropdownMenuTrigger and DropdownMenuContent as children.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
  args: {
    onOpenChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── BASIC ────────────────────────────────────────

/**
 * A simple dropdown menu triggered by a button with basic items and a separator.
 *
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline">
 *       Options <ChevronDown className="ml-2 h-4 w-4" />
 *     </Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>New file</DropdownMenuItem>
 *     <DropdownMenuItem>Open</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>Settings</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const Basic: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Options <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>New file</DropdownMenuItem>
        <DropdownMenuItem>Open</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ─── WITH ICONS ───────────────────────────────────

/**
 * Items with leading icons and trailing keyboard shortcuts for a richer menu.
 *
 * ```tsx
 * <DropdownMenuItem>
 *   <Edit /> Edit
 *   <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
export const WithIcons: Story = {
  name: "With Icons & Shortcuts",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          File <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Edit />
            Edit
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy />
            Duplicate
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ExternalLink />
            Open in new tab
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Archive />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ─── WITH SUB-MENUS ───────────────────────────────

/**
 * Use `DropdownMenuSub`, `DropdownMenuSubTrigger`, and `DropdownMenuSubContent`
 * to create nested menus. Sub-menus open on hover or ArrowRight key.
 *
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>
 *     <Share /> Share
 *   </DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Copy link</DropdownMenuItem>
 *     <DropdownMenuItem>Email</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
export const WithSubMenus: Story = {
  name: "With Sub-Menus",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Actions <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>
          <Edit />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Share />
            Share
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-40">
            <DropdownMenuItem>
              <Link />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare />
              Slack
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Tag />
            Add label
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-40">
            <DropdownMenuItem>Bug</DropdownMenuItem>
            <DropdownMenuItem>Feature</DropdownMenuItem>
            <DropdownMenuItem>Enhancement</DropdownMenuItem>
            <DropdownMenuItem>Documentation</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ─── WITH CHECKBOX ITEMS ──────────────────────────

/**
 * Use `DropdownMenuCheckboxItem` for toggleable options like column visibility.
 *
 * ```tsx
 * <DropdownMenuCheckboxItem
 *   checked={showName}
 *   onCheckedChange={setShowName}
 * >
 *   Name
 * </DropdownMenuCheckboxItem>
 * ```
 */
export const WithCheckboxItems: Story = {
  name: "With Checkbox Items",
  render: () => {
    const [checks, setChecks] = useState({
      name: true,
      email: false,
      status: true,
      role: false,
    })
    const toggle = (key: keyof typeof checks) =>
      setChecks((s) => ({ ...s, [key]: !s[key] }))

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Toggle Columns</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={checks.name}
            onCheckedChange={() => toggle("name")}
          >
            Name
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checks.email}
            onCheckedChange={() => toggle("email")}
          >
            Email
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checks.status}
            onCheckedChange={() => toggle("status")}
          >
            Status
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checks.role}
            onCheckedChange={() => toggle("role")}
          >
            Role
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// ─── WITH RADIO ITEMS ─────────────────────────────

/**
 * Use `DropdownMenuRadioGroup` and `DropdownMenuRadioItem` for mutually
 * exclusive options like sort order.
 *
 * ```tsx
 * <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
 *   <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
export const WithRadioItems: Story = {
  name: "With Radio Items",
  render: () => {
    const [sort, setSort] = useState("date")

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort by
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuLabel>Sort order</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="name">
              Name
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="date">
              Date created
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="updated">
              Last updated
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="followers">
              Followers
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// ─── DESTRUCTIVE ITEMS ────────────────────────────

/**
 * Use `variant="destructive"` on `DropdownMenuItem` for dangerous actions.
 * The item text and icon render in destructive colors.
 *
 * ```tsx
 * <DropdownMenuItem variant="destructive">
 *   <Trash2 /> Delete
 * </DropdownMenuItem>
 * ```
 */
export const DestructiveItems: Story = {
  name: "Destructive Items",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>
          <Archive />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Flag />
          Report
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete permanently
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ─── TRIGGERED FROM AVATAR ────────────────────────

/**
 * Common pattern: user profile menu triggered by clicking an avatar.
 *
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <button className="rounded-full focus-visible:ring-2 ...">
 *       <Avatar><AvatarImage src="..." /><AvatarFallback>SJ</AvatarFallback></Avatar>
 *     </button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent align="end">
 *     <DropdownMenuLabel>Sarah Johnson</DropdownMenuLabel>
 *     ...
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const TriggeredFromAvatar: Story = {
  name: "Triggered from Avatar",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="Sarah" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Sarah Johnson</p>
            <p className="text-xs text-muted-foreground">
              sarah@aspire.io
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
            <Badge variant="secondary" className="ml-auto text-xs">
              Pro
            </Badge>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserPlus />
          Invite teammates
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle />
          Help & support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ─── TABLE ROW ACTIONS ────────────────────────────

/**
 * A common pattern: "more actions" icon button in a table row triggers a
 * dropdown with contextual actions.
 */
export const TableRowActions: Story = {
  name: "Triggered from Table Row",
  render: () => {
    const rows = [
      { name: "Summer Collection Launch", status: "Active" },
      { name: "Back to School Campaign", status: "Draft" },
      { name: "Holiday Promo 2024", status: "Archived" },
    ]
    return (
      <div className="w-96 divide-y rounded-lg border">
        {rows.map(({ name, status }) => (
          <div
            key={name}
            className="flex items-center justify-between px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{status}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Row actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                  <Edit />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star />
                  Favourite
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    )
  },
}

// ─── ASPIRE: USER PROFILE MENU ────────────────────

/**
 * Aspire-specific example: the user account menu in the app header.
 * Includes profile, workspace settings, billing, theme toggle, and sign out.
 */
export const AspireUserProfileMenu: Story = {
  name: "Aspire -- User Profile Menu",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full px-1 py-1 ring-offset-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="Sarah" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Sarah J.</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Sarah Johnson</p>
            <p className="text-xs text-muted-foreground">
              sarah@aspire.io
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Workspace Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing & Plans
            <Badge variant="secondary" className="ml-auto text-xs">
              Pro
            </Badge>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Shield />
            Security
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Palette />
            Appearance
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserPlus />
          Invite teammates
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle />
          Help & feedback
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Sign out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ─── ASPIRE: MORE ACTIONS MENU ────────────────────

/**
 * Aspire-specific example: a "More actions" menu for a campaign
 * detail page with edit, export, share, and archive actions.
 */
export const AspireMoreActionsMenu: Story = {
  name: "Aspire -- More Actions Menu",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreHorizontal className="mr-2 h-4 w-4" />
          More Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Edit />
            Edit campaign
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy />
            Duplicate campaign
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Eye />
            Preview storefront
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BarChart />
            View analytics
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download />
            Export report
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Share />
              Share
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-44">
              <DropdownMenuItem>
                <Link />
                Copy link
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail />
                Email report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare />
                Share via Slack
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Archive />
          Archive campaign
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete campaign
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// ─── ASPIRE: SORT MENU ────────────────────────────

/**
 * Aspire-specific example: sort menu for the creators list with radio
 * selection for sort field and checkboxes for sort direction.
 */
export const AspireSortMenu: Story = {
  name: "Aspire -- Sort Menu",
  render: () => {
    const [sortBy, setSortBy] = useState("followers")
    const [ascending, setAscending] = useState(false)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Sort creators by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="followers">
              Followers
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="engagement">
              Engagement rate
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="recent">
              Recently added
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Direction</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={ascending}
            onCheckedChange={() => setAscending((v) => !v)}
          >
            <SortAsc className="mr-1" />
            Ascending
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={!ascending}
            onCheckedChange={() => setAscending((v) => !v)}
          >
            <SortDesc className="mr-1" />
            Descending
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies the dropdown menu opens when the trigger button is clicked
 * and menu items are visible.
 */
export const OpenMenuTest: Story = {
  name: "Interaction: Open Menu & Click Item",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" data-testid="dd-trigger">
          Open Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByTestId("dd-trigger")
    // Click to open
    await userEvent.click(trigger)
    // Check items appear and are visible (wait for open animation)
    await waitFor(() => {
      expect(within(document.body).getByText("Edit")).toBeVisible()
    }, { timeout: 3000 })
    await waitFor(() => {
      expect(within(document.body).getByText("Delete")).toBeVisible()
    }, { timeout: 3000 })
  },
}

/**
 * Verifies keyboard navigation: pressing Enter on the trigger opens the menu,
 * and arrow key navigation works within the menu.
 */
export const KeyboardNavigationTest: Story = {
  name: "Interaction: Keyboard Open",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" data-testid="dd-kb-trigger">
          Keyboard Test
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>First Item</DropdownMenuItem>
        <DropdownMenuItem>Second Item</DropdownMenuItem>
        <DropdownMenuItem>Third Item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByTestId("dd-kb-trigger")
    // Focus the trigger
    await userEvent.tab()
    await expect(trigger).toHaveFocus()
    // Press Enter to open
    await userEvent.keyboard("[Enter]")
    // Menu items should be visible (wait for open animation)
    await waitFor(() => {
      expect(within(document.body).getByText("First Item")).toBeVisible()
    }, { timeout: 3000 })
  },
}

/**
 * Verifies the dropdown can be closed by pressing Escape.
 */
export const EscapeCloseTest: Story = {
  name: "Interaction: Close with Escape",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" data-testid="dd-esc-trigger">
          Escape Test
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Option A</DropdownMenuItem>
        <DropdownMenuItem>Option B</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByTestId("dd-esc-trigger")
    // Open the menu
    await userEvent.click(trigger)
    await waitFor(() => {
      expect(within(document.body).getByText("Option A")).toBeVisible()
    }, { timeout: 3000 })
    // Press Escape to close
    await userEvent.keyboard("[Escape]")
    // Trigger should still be in the document
    await expect(trigger).toBeVisible()
  },
}
