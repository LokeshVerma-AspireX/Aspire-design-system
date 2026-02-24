import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Copy,
  Scissors,
  Clipboard,
  Trash2,
  Share2,
  Star,
  ExternalLink,
  Pencil,
  FolderOpen,
  Download,
  Mail,
  MessageSquare,
  Eye,
  EyeOff,
  Tag,
  Users,
  BarChart,
  Megaphone,
  Archive,
  Flag,
  UserPlus,
  Link,
} from "lucide-react"

/**
 * # ContextMenu
 *
 * Displays a floating menu on right-click (context click). Supports items,
 * checkbox items, radio items, sub-menus, labels, separators, and keyboard shortcuts.
 *
 * ## When to Use
 * - To provide contextual actions on right-click for specific UI elements
 * - For table rows, cards, or list items that have multiple actions
 * - When actions are secondary and do not need to be always visible
 * - For power-user workflows that benefit from right-click menus
 *
 * ## When NOT to Use
 * - For primary actions -- use Buttons or a DropdownMenu instead
 * - On touch-only devices where right-click is not intuitive -- use DropdownMenu
 * - For navigation -- use NavigationMenu or Tabs
 * - If the user needs to discover the menu -- context menus are hidden by default
 *
 * ## Accessibility
 * - Opens on right-click or via keyboard Shift+F10 on the trigger area
 * - Full keyboard navigation (arrow keys, Enter, Escape)
 * - Items support `disabled` state which removes them from keyboard navigation
 * - Checkbox and radio items include proper ARIA roles
 * - Sub-menus open on hover or ArrowRight keyboard navigation
 *
 * ## Import
 * ```tsx
 * import {
 *   ContextMenu,
 *   ContextMenuTrigger,
 *   ContextMenuContent,
 *   ContextMenuItem,
 *   ContextMenuCheckboxItem,
 *   ContextMenuRadioItem,
 *   ContextMenuLabel,
 *   ContextMenuSeparator,
 *   ContextMenuShortcut,
 *   ContextMenuSub,
 *   ContextMenuSubContent,
 *   ContextMenuSubTrigger,
 *   ContextMenuRadioGroup,
 * } from '@/components/ui/context-menu'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>Right click here</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Copy</ContextMenuItem>
 *     <ContextMenuItem>Paste</ContextMenuItem>
 *     <ContextMenuSeparator />
 *     <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
const meta: Meta<typeof ContextMenu> = {
  title: "4. Components/Navigation/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays a menu on right-click. Supports items, checkboxes, radio groups, sub-menus, and keyboard shortcuts.",
      },
    },
  },
  argTypes: {
    onOpenChange: {
      action: "openChanged",
      description: "Callback fired when the context menu opens or closes.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Events",
      },
    },
    children: {
      control: false,
      description:
        "Must contain a ContextMenuTrigger and ContextMenuContent as children.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    modal: {
      control: "boolean",
      description:
        "Whether the context menu should be modal, blocking interaction with the rest of the page.",
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

// ─── TRIGGER AREA HELPER ──────────────────────────

const TriggerArea = ({ label = "Right-click here" }: { label?: string }) => (
  <ContextMenuTrigger>
    <div className="flex h-32 w-64 cursor-context-menu select-none items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
      {label}
    </div>
  </ContextMenuTrigger>
)

// ─── BASIC ────────────────────────────────────────

/**
 * A basic context menu with copy, cut, paste, and a destructive delete action.
 *
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>Right click here</ContextMenuTrigger>
 *   <ContextMenuContent className="w-52">
 *     <ContextMenuItem>
 *       <Copy /> Copy
 *       <ContextMenuShortcut>⌘C</ContextMenuShortcut>
 *     </ContextMenuItem>
 *     <ContextMenuItem variant="destructive">
 *       <Trash2 /> Delete
 *     </ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
export const Basic: Story = {
  render: () => (
    <ContextMenu>
      <TriggerArea />
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          <Copy />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Scissors />
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Clipboard />
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── WITH SUB-MENUS ───────────────────────────────

/**
 * Use `ContextMenuSub`, `ContextMenuSubTrigger`, and `ContextMenuSubContent`
 * to create nested sub-menus for grouped actions like "Share".
 *
 * ```tsx
 * <ContextMenuSub>
 *   <ContextMenuSubTrigger>
 *     <Share2 /> Share
 *   </ContextMenuSubTrigger>
 *   <ContextMenuSubContent>
 *     <ContextMenuItem>Copy link</ContextMenuItem>
 *     <ContextMenuItem>Email</ContextMenuItem>
 *   </ContextMenuSubContent>
 * </ContextMenuSub>
 * ```
 */
export const WithSubMenus: Story = {
  name: "With Sub-Menus",
  render: () => (
    <ContextMenu>
      <TriggerArea label="Right-click for file actions" />
      <ContextMenuContent className="w-52">
        <ContextMenuLabel>design-tokens.json</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <FolderOpen />
          Open
        </ContextMenuItem>
        <ContextMenuItem>
          <ExternalLink />
          Open in new tab
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Pencil />
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy />
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Share2 />
            Share
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-40">
            <ContextMenuItem>
              <Link />
              Copy link
            </ContextMenuItem>
            <ContextMenuItem>
              <Mail />
              Email file
            </ContextMenuItem>
            <ContextMenuItem>
              <MessageSquare />
              Slack message
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Download />
          Download
        </ContextMenuItem>
        <ContextMenuItem>
          <Star />
          Add to starred
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Move to trash
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── WITH CHECKBOX ITEMS ──────────────────────────

/**
 * `ContextMenuCheckboxItem` renders a toggleable item with a checkmark indicator.
 *
 * ```tsx
 * <ContextMenuCheckboxItem checked>Show grid</ContextMenuCheckboxItem>
 * <ContextMenuCheckboxItem>Show rulers</ContextMenuCheckboxItem>
 * ```
 */
export const WithCheckboxItems: Story = {
  name: "With Checkbox Items",
  render: () => (
    <ContextMenu>
      <TriggerArea label="Right-click for view options" />
      <ContextMenuContent className="w-52">
        <ContextMenuLabel>View Options</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show grid</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show rulers</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked>Snap to grid</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show guides</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── WITH RADIO ITEMS ─────────────────────────────

/**
 * `ContextMenuRadioGroup` and `ContextMenuRadioItem` create a set of
 * mutually exclusive options.
 *
 * ```tsx
 * <ContextMenuRadioGroup value="100">
 *   <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
 *   <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
 *   <ContextMenuRadioItem value="200">200%</ContextMenuRadioItem>
 * </ContextMenuRadioGroup>
 * ```
 */
export const WithRadioItems: Story = {
  name: "With Radio Items",
  render: () => (
    <ContextMenu>
      <TriggerArea label="Right-click for zoom level" />
      <ContextMenuContent className="w-52">
        <ContextMenuLabel>Zoom Level</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="100">
          <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="75">75%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="150">150%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="200">200%</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── WITH CHECKBOX + RADIO COMBINED ───────────────

/**
 * Combine checkbox items and radio groups in a single menu for complex
 * settings panels.
 */
export const CheckboxAndRadioCombined: Story = {
  name: "Checkbox + Radio Items",
  render: () => (
    <ContextMenu>
      <TriggerArea label="Right-click for display settings" />
      <ContextMenuContent className="w-52">
        <ContextMenuLabel>Display</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show grid</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show rulers</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked>Snap to grid</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Zoom</ContextMenuLabel>
        <ContextMenuRadioGroup value="100">
          <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="150">150%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="200">200%</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── WITH SEPARATORS AND LABELS ───────────────────

/**
 * Use `ContextMenuLabel` for section headings and `ContextMenuSeparator` for
 * visual dividers between groups of actions.
 */
export const WithSeparatorsAndLabels: Story = {
  name: "With Separators & Labels",
  render: () => (
    <ContextMenu>
      <TriggerArea label="Right-click for organized menu" />
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>Edit</ContextMenuLabel>
        <ContextMenuItem>
          <Copy />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Scissors />
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Clipboard />
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuItem>
          <Eye />
          Show preview
        </ContextMenuItem>
        <ContextMenuItem>
          <EyeOff />
          Hide sidebar
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Danger Zone</ContextMenuLabel>
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete permanently
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── DESTRUCTIVE ITEMS ────────────────────────────

/**
 * Use `variant="destructive"` on `ContextMenuItem` for dangerous actions.
 * The text and icon turn red, and the hover background uses a destructive tint.
 *
 * ```tsx
 * <ContextMenuItem variant="destructive">
 *   <Trash2 /> Delete
 * </ContextMenuItem>
 * ```
 */
export const DestructiveItems: Story = {
  name: "Destructive Items",
  render: () => (
    <ContextMenu>
      <TriggerArea label="Right-click for destructive actions" />
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          <Archive />
          Archive
        </ContextMenuItem>
        <ContextMenuItem>
          <EyeOff />
          Hide
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Flag />
          Report as spam
        </ContextMenuItem>
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete permanently
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── ASPIRE: CREATOR ROW CONTEXT MENU ─────────────

/**
 * Aspire-specific example: right-click on a creator row in the Creators
 * table to access common actions like view profile, add to campaign, etc.
 */
export const AspireCreatorRow: Story = {
  name: "Aspire -- Creator Row Context Menu",
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex w-80 cursor-context-menu items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
            JS
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">@jessicasmith</p>
            <p className="text-xs text-muted-foreground">
              125K followers -- Instagram
            </p>
          </div>
          <span className="text-xs text-muted-foreground">Right-click</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>@jessicasmith</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Eye />
          View profile
        </ContextMenuItem>
        <ContextMenuItem>
          <ExternalLink />
          Open Instagram
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Megaphone />
          Add to campaign
        </ContextMenuItem>
        <ContextMenuItem>
          <Mail />
          Send outreach email
        </ContextMenuItem>
        <ContextMenuItem>
          <Tag />
          Manage tags
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Share2 />
            Share
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>
              <Link />
              Copy profile link
            </ContextMenuItem>
            <ContextMenuItem>
              <Mail />
              Email profile
            </ContextMenuItem>
            <ContextMenuItem>
              <MessageSquare />
              Share via Slack
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Star />
          Add to favorites
        </ContextMenuItem>
        <ContextMenuItem>
          <UserPlus />
          Add to list
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Remove from workspace
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── ASPIRE: CAMPAIGN CARD CONTEXT MENU ───────────

/**
 * Aspire-specific example: right-click on a campaign card for quick actions
 * such as edit, duplicate, archive, or delete.
 */
export const AspireCampaignCard: Story = {
  name: "Aspire -- Campaign Card Context Menu",
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="w-72 cursor-context-menu rounded-lg border p-4 transition-colors hover:bg-accent/50">
          <div className="mb-2 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              Active
            </span>
            <span className="text-xs text-muted-foreground">Right-click</span>
          </div>
          <h3 className="text-sm font-semibold">Summer Collection Launch</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            12 creators -- $24,500 budget -- 45 posts
          </p>
          <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
            <span>
              <BarChart className="mr-1 inline h-3 w-3" />
              2.4M reach
            </span>
            <span>
              <Users className="mr-1 inline h-3 w-3" />
              12 creators
            </span>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuLabel>Summer Collection Launch</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Eye />
          View details
        </ContextMenuItem>
        <ContextMenuItem>
          <Pencil />
          Edit campaign
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy />
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <BarChart />
          View analytics
        </ContextMenuItem>
        <ContextMenuItem>
          <Download />
          Export report
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Share2 />
            Share
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>
              <Link />
              Copy link
            </ContextMenuItem>
            <ContextMenuItem>
              <Mail />
              Email report
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Archive />
          Archive campaign
        </ContextMenuItem>
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete campaign
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that the context menu trigger area is rendered and visible.
 * Note: Programmatic right-click opening of Radix context menus is limited
 * in test environments, so we verify the trigger renders correctly.
 */
export const TriggerRenderTest: Story = {
  name: "Interaction: Trigger Renders",
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          data-testid="ctx-trigger"
          className="flex h-32 w-64 cursor-context-menu select-none items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground"
        >
          Right-click target area
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByTestId("ctx-trigger")
    await expect(trigger).toBeVisible()
    await expect(trigger).toHaveTextContent("Right-click target area")
  },
}

/**
 * Verifies the context menu opens on right-click and displays menu items.
 */
export const OpenOnRightClickTest: Story = {
  name: "Interaction: Open on Right-Click",
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          data-testid="ctx-trigger-click"
          className="flex h-32 w-64 cursor-context-menu select-none items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground"
        >
          Right-click me
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          <Copy />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>
          <Clipboard />
          Paste
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByTestId("ctx-trigger-click")
    // Simulate right-click to open context menu
    await userEvent.pointer({ keys: "[MouseRight]", target: trigger })
    // Check that menu items appear in the document
    const copyItem = await within(document.body).findByText("Copy")
    await expect(copyItem).toBeVisible()
  },
}
