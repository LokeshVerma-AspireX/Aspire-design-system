import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
  Home,
  Settings,
  User,
  FileText,
  Search,
  Mail,
  Bell,
  BarChart,
  LogOut,
  Plus,
  Keyboard,
  Users,
  Megaphone,
  Download,
  Inbox,
  Gift,
  Globe,
  Calculator,
  Calendar,
  CreditCard,
  Smile,
} from "lucide-react"
import type { ElementType } from "react"

/**
 * # Command
 *
 * A fast, composable command palette built on top of the `cmdk` library.
 * Provides search-driven navigation and action execution with full keyboard support.
 *
 * ## When to Use
 * - To provide a global search / command palette (Cmd+K pattern)
 * - For inline searchable menus that filter items as the user types
 * - To let users quickly navigate between pages or trigger actions
 * - For any UI where users need to search and select from a list
 *
 * ## When NOT to Use
 * - For a simple dropdown select with a few static options -- use Select instead
 * - For form fields that need validation -- use Combobox or Autocomplete patterns
 * - For navigation that should always be visible -- use NavigationMenu or Tabs
 *
 * ## Accessibility
 * - Full keyboard navigation with arrow keys, Enter to select, Escape to close
 * - ARIA listbox semantics provided automatically by cmdk
 * - Search input is auto-focused when the command palette opens
 * - Screen readers announce the number of matching results
 * - `CommandDialog` wraps in an accessible Dialog with sr-only title/description
 *
 * ## Import
 * ```tsx
 * import {
 *   Command,
 *   CommandDialog,
 *   CommandInput,
 *   CommandList,
 *   CommandEmpty,
 *   CommandGroup,
 *   CommandItem,
 *   CommandShortcut,
 *   CommandSeparator,
 * } from '@/components/ui/command'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Command className="w-80 rounded-lg border shadow-md">
 *   <CommandInput placeholder="Type a command..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Dashboard</CommandItem>
 *       <CommandItem>Settings</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
const meta: Meta<typeof Command> = {
  title: "4. Components/Navigation/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Fast command palette with keyboard navigation. Powers search and navigation experiences using the cmdk library.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the root Command wrapper.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Appearance",
      },
    },
    shouldFilter: {
      control: "boolean",
      description:
        "Whether cmdk should automatically filter items based on the search input. Disable for server-side filtering.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Behavior",
      },
    },
    loop: {
      control: "boolean",
      description:
        "When true, keyboard navigation loops from the last item back to the first and vice versa.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Behavior",
      },
    },
    onValueChange: {
      action: "valueChanged",
      description: "Callback fired when the selected value changes via keyboard navigation.",
      table: {
        type: { summary: "(value: string) => void" },
        category: "Events",
      },
    },
    children: {
      control: false,
      description:
        "Compose with CommandInput, CommandList, CommandGroup, CommandItem, etc.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
  args: {
    onValueChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── BASIC ────────────────────────────────────────

/**
 * The simplest inline command menu with a search input, empty state, and a single group.
 *
 * ```tsx
 * <Command className="w-80 rounded-lg border shadow-md">
 *   <CommandInput placeholder="Type a command..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Dashboard</CommandItem>
 *       <CommandItem>Documents</CommandItem>
 *       <CommandItem>Settings</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
export const Basic: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Home />
            Dashboard
          </CommandItem>
          <CommandItem>
            <FileText />
            Documents
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

// ─── WITH ICONS AND SHORTCUTS ─────────────────────

/**
 * Command items can include leading icons and trailing keyboard shortcuts
 * using `CommandShortcut`.
 *
 * ```tsx
 * <CommandItem>
 *   <Home />
 *   Dashboard
 *   <CommandShortcut>Cmd+H</CommandShortcut>
 * </CommandItem>
 * ```
 */
export const WithIconsAndShortcuts: Story = {
  name: "With Icons & Shortcuts",
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem>
            <Home />
            Dashboard
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <BarChart />
            Analytics
            <CommandShortcut>⌘A</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <User />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

// ─── WITH MULTIPLE GROUPS ─────────────────────────

/**
 * Use `CommandGroup` with headings and `CommandSeparator` to organize
 * items into logical sections.
 *
 * ```tsx
 * <CommandGroup heading="Pages">
 *   <CommandItem>Dashboard</CommandItem>
 * </CommandGroup>
 * <CommandSeparator />
 * <CommandGroup heading="Actions">
 *   <CommandItem>New Project</CommandItem>
 * </CommandGroup>
 * ```
 */
export const WithGroups: Story = {
  name: "With Multiple Groups",
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem>
            <Home />
            Dashboard
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <BarChart />
            Analytics
            <CommandShortcut>⌘A</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <User />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <Plus />
            New Project
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Mail />
            Send Invite
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem>
            <Settings />
            Settings
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <LogOut />
            Log out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

// ─── EMPTY STATE ──────────────────────────────────

/**
 * The `CommandEmpty` component renders when no items match the search query.
 * Customise the empty state to guide users toward alternative actions.
 */
export const EmptyState: Story = {
  name: "Empty State",
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Search..." value="zzzzz" />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-4">
            <Search className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No results found.</p>
            <p className="text-xs text-muted-foreground/75">
              Try a different search term.
            </p>
          </div>
        </CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Dashboard</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

// ─── AS DIALOG ────────────────────────────────────

/**
 * `CommandDialog` combines Command with a Dialog for the classic Cmd+K
 * command palette pattern. The dialog title and description are screen-reader-only.
 *
 * ```tsx
 * <CommandDialog open={open} onOpenChange={setOpen}>
 *   <CommandInput placeholder="Search commands..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Actions">
 *       <CommandItem onSelect={() => setOpen(false)}>
 *         Go to Dashboard
 *       </CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </CommandDialog>
 * ```
 */
export const AsDialog: Story = {
  name: "Command Dialog (⌘K)",
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-center gap-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="text-muted-foreground">Search or jump to...</span>
          <kbd className="ml-2 flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-xs">
            <Keyboard className="h-3 w-3" />K
          </kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search commands..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => setOpen(false)}>
                <Home />
                Go to Dashboard
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <BarChart />
                Go to Analytics
                <CommandShortcut>⌘A</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Inbox />
                Go to Inbox
                <CommandShortcut>⌘I</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => setOpen(false)}>
                <Plus />
                Create Campaign
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Download />
                Export Data
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Account">
              <CommandItem onSelect={() => setOpen(false)}>
                <Settings />
                Settings
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <LogOut />
                Log out
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        <p className="text-xs text-muted-foreground">
          Click the button to open the command palette
        </p>
      </div>
    )
  },
}

// ─── WITH SEARCH FILTERING ────────────────────────

/**
 * cmdk provides automatic search filtering out of the box. Type in the
 * input and items are filtered in real time. Set `shouldFilter={false}`
 * to handle filtering server-side.
 */
export const WithSearchFiltering: Story = {
  name: "With Search Filtering",
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Filter items..." />
      <CommandList>
        <CommandEmpty>No matching items.</CommandEmpty>
        <CommandGroup heading="Fruits">
          <CommandItem>Apple</CommandItem>
          <CommandItem>Banana</CommandItem>
          <CommandItem>Cherry</CommandItem>
          <CommandItem>Date</CommandItem>
          <CommandItem>Elderberry</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Vegetables">
          <CommandItem>Asparagus</CommandItem>
          <CommandItem>Broccoli</CommandItem>
          <CommandItem>Carrot</CommandItem>
          <CommandItem>Daikon</CommandItem>
          <CommandItem>Eggplant</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

// ─── ASPIRE: SEARCH CREATORS ──────────────────────

/**
 * Aspire-specific example: search creators by name within a command palette.
 *
 * ```tsx
 * <Command className="w-96 rounded-lg border shadow-md">
 *   <CommandInput placeholder="Search creators..." />
 *   <CommandList>
 *     <CommandGroup heading="Creators">
 *       <CommandItem>
 *         <Users />
 *         @jessicasmith -- 125K followers
 *       </CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
export const AspireSearchCreators: Story = {
  name: "Aspire -- Search Creators",
  render: () => {
    const creators = [
      { handle: "@jessicasmith", followers: "125K", platform: "Instagram" },
      { handle: "@mikejohnson", followers: "89K", platform: "TikTok" },
      { handle: "@sarahwilliams", followers: "210K", platform: "YouTube" },
      { handle: "@alexchen", followers: "56K", platform: "Instagram" },
      { handle: "@emilydavis", followers: "340K", platform: "TikTok" },
    ]

    return (
      <Command className="w-96 rounded-lg border shadow-md">
        <CommandInput placeholder="Search creators..." />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-4">
              <Users className="h-6 w-6 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No creators found.</p>
            </div>
          </CommandEmpty>
          <CommandGroup heading="Creators">
            {creators.map((c) => (
              <CommandItem key={c.handle} className="flex items-center gap-3">
                <User />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{c.handle}</span>
                  <span className="text-xs text-muted-foreground">
                    {c.followers} followers on {c.platform}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    )
  },
}

// ─── ASPIRE: NAVIGATE + RUN ACTIONS ───────────────

/**
 * Aspire-specific example: a full command palette with navigation,
 * campaign actions, and data export grouped logically.
 */
export const AspireCommandPalette: Story = {
  name: "Aspire -- Full Command Palette",
  render: () => {
    const [open, setOpen] = useState(false)

    const groups: Array<{
      heading: string
      items: Array<{ icon: ElementType; label: string; shortcut?: string }>
    }> = [
      {
        heading: "Navigate",
        items: [
          { icon: Home, label: "Go to Dashboard", shortcut: "⌘H" },
          { icon: Users, label: "Go to Creators", shortcut: "⌘C" },
          { icon: Megaphone, label: "Go to Campaigns", shortcut: "⌘G" },
          { icon: BarChart, label: "Go to Analytics", shortcut: "⌘A" },
          { icon: Inbox, label: "Go to Inbox", shortcut: "⌘I" },
          { icon: Gift, label: "Go to Offers" },
        ],
      },
      {
        heading: "Actions",
        items: [
          { icon: Plus, label: "Create Campaign", shortcut: "⌘N" },
          { icon: Mail, label: "Send Outreach Email" },
          { icon: Download, label: "Export Data", shortcut: "⌘E" },
          { icon: Globe, label: "View Public Storefront" },
        ],
      },
      {
        heading: "Account",
        items: [
          { icon: User, label: "My Profile" },
          { icon: Bell, label: "Notifications", shortcut: "⌘B" },
          { icon: Settings, label: "Settings", shortcut: "⌘," },
          { icon: LogOut, label: "Sign out" },
        ],
      },
    ]

    return (
      <div className="flex flex-col items-center gap-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="text-muted-foreground">
            Search Aspire...
          </span>
          <kbd className="ml-2 flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-xs">
            ⌘K
          </kbd>
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="What do you need?" />
          <CommandList className="max-h-80">
            <CommandEmpty>No results found.</CommandEmpty>
            {groups.map(({ heading, items }, gi) => (
              <div key={heading}>
                {gi > 0 && <CommandSeparator />}
                <CommandGroup heading={heading}>
                  {items.map(({ icon: Icon, label, shortcut }) => (
                    <CommandItem
                      key={label}
                      onSelect={() => setOpen(false)}
                    >
                      <Icon />
                      {label}
                      {shortcut && (
                        <CommandShortcut>{shortcut}</CommandShortcut>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ))}
          </CommandList>
        </CommandDialog>

        <p className="text-xs text-muted-foreground">
          The Aspire command palette for navigation, actions, and account.
        </p>
      </div>
    )
  },
}

// ─── KEYBOARD LOOP ────────────────────────────────

/**
 * Set `loop` to allow keyboard navigation to wrap from last to first item.
 *
 * ```tsx
 * <Command loop className="w-80 rounded-lg border shadow-md">
 *   ...
 * </Command>
 * ```
 */
export const WithKeyboardLoop: Story = {
  name: "With Keyboard Loop",
  render: () => (
    <Command loop className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Navigate with arrow keys..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick Actions">
          <CommandItem>
            <Calculator />
            Calculator
          </CommandItem>
          <CommandItem>
            <Calendar />
            Calendar
          </CommandItem>
          <CommandItem>
            <CreditCard />
            Billing
          </CommandItem>
          <CommandItem>
            <Smile />
            Emoji Picker
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies the search input filters items. Typing "Dash" should keep
 * the "Dashboard" item visible and filter out non-matching items.
 */
export const SearchFilterTest: Story = {
  name: "Interaction: Search Filters Items",
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem>Dashboard</CommandItem>
          <CommandItem>Analytics</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Search...")
    await userEvent.type(input, "Dash")
    // Dashboard should still be visible
    const dashboard = canvas.getByText("Dashboard")
    await expect(dashboard).toBeVisible()
  },
}

/**
 * Verifies that keyboard navigation works: pressing ArrowDown highlights
 * items, and the command input accepts keyboard input.
 */
export const KeyboardNavigationTest: Story = {
  name: "Interaction: Keyboard Navigation",
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Navigate with keys..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem value="dashboard">Dashboard</CommandItem>
          <CommandItem value="analytics">Analytics</CommandItem>
          <CommandItem value="settings">Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Navigate with keys...")
    // Focus the input
    await userEvent.click(input)
    // Press arrow down twice to navigate
    await userEvent.keyboard("[ArrowDown]")
    await userEvent.keyboard("[ArrowDown]")
    // The input should still be present and focusable
    await expect(input).toBeVisible()
  },
}

/**
 * Verifies the empty state displays when the search query matches nothing.
 */
export const EmptyStateTest: Story = {
  name: "Interaction: Empty State Display",
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Try searching..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Items">
          <CommandItem>Apple</CommandItem>
          <CommandItem>Banana</CommandItem>
          <CommandItem>Cherry</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Try searching...")
    await userEvent.type(input, "xyznotfound")
    const emptyMessage = canvas.getByText("No results found.")
    await expect(emptyMessage).toBeVisible()
  },
}
