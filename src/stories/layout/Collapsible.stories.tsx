import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Settings,
  Filter,
  Info,
  Plus,
  Minus,
  Users,
  Mail,
  Shield,
  Bell,
  Sliders,
  Tag,
  Globe,
} from "lucide-react"

/**
 * # Collapsible
 *
 * An interactive component that expands and collapses a section of content.
 * Built on Radix UI Collapsible primitive, it supports controlled and
 * uncontrolled modes with accessible keyboard interactions.
 *
 * ## When to Use
 * - To hide optional or advanced settings behind a toggle (e.g. "Advanced options")
 * - To progressively disclose additional information without leaving the page
 * - For FAQ-style content where only one section is relevant at a time
 * - For filter groups that can be expanded or collapsed to save vertical space
 *
 * ## When NOT to Use
 * - For multiple collapsible sections that should work together -- use **Accordion** instead
 * - For navigation menus -- use a sidebar or dropdown menu
 * - For content that should always be visible -- just render it inline
 * - For modal-like reveals -- use **Dialog** or **Sheet** instead
 *
 * ## Accessibility
 * - Trigger automatically gets `aria-expanded` reflecting the open/closed state
 * - Content is hidden from assistive technology when collapsed
 * - Enter and Space toggle the collapsible when the trigger is focused
 * - Disabled state prevents toggling and removes from keyboard interaction
 * - Use descriptive trigger text so screen reader users understand what will be revealed
 *
 * ## Import
 * ```tsx
 * import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     Hidden content revealed on toggle.
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
const meta: Meta<typeof Collapsible> = {
  title: "4. Components/Data Display/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An interactive expand/collapse component built on Radix UI Collapsible. Supports controlled and uncontrolled modes, disabled state, and custom triggers.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description:
        "The controlled open state. Must be used with `onOpenChange` for controlled behavior.",
      table: {
        type: { summary: "boolean" },
        category: "State",
      },
    },
    defaultOpen: {
      control: "boolean",
      description:
        "Whether the collapsible is open by default in uncontrolled mode.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    disabled: {
      control: "boolean",
      description:
        "When true, prevents the user from toggling the collapsible.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback fired when the open state changes.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Events",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the root Collapsible element.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    onOpenChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Collapsible>

// ─── BASIC ────────────────────────────────────────

/**
 * Basic collapsible with a button trigger and hidden content.
 * Starts closed. Click to reveal additional items.
 *
 * ```tsx
 * <Collapsible className="w-72 space-y-2">
 *   <div className="flex items-center justify-between rounded-md border px-4 py-2">
 *     <p className="text-sm font-medium">@shadcn starred 3 repos</p>
 *     <CollapsibleTrigger asChild>
 *       <Button variant="ghost" size="sm">
 *         <ChevronsUpDown className="h-4 w-4" />
 *       </Button>
 *     </CollapsibleTrigger>
 *   </div>
 *   <CollapsibleContent className="space-y-2">
 *     <div className="rounded-md border px-4 py-2 text-sm">Hidden item</div>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const Default: Story = {
  render: (args) => (
    <Collapsible className="w-72 space-y-2" {...args}>
      <div className="flex items-center justify-between rounded-md border px-4 py-2">
        <p className="text-sm font-medium">@aspire starred 3 repos</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm font-mono">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm font-mono">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 text-sm font-mono">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// ─── DEFAULT OPEN ─────────────────────────────────

/**
 * Collapsible that starts in the open state using `defaultOpen`.
 * The content is visible when the component first renders.
 *
 * ```tsx
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger>Hide details</CollapsibleTrigger>
 *   <CollapsibleContent>Visible by default</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const DefaultOpen: Story = {
  name: "Default Open",
  render: (args) => (
    <Collapsible defaultOpen className="w-72 space-y-2" {...args}>
      <div className="flex items-center justify-between rounded-md border px-4 py-2">
        <p className="text-sm font-medium">Project dependencies</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm font-mono">
          react@19.0.0
        </div>
        <div className="rounded-md border px-4 py-2 text-sm font-mono">
          next@15.0.0
        </div>
        <div className="rounded-md border px-4 py-2 text-sm font-mono">
          tailwindcss@4.0.0
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// ─── CUSTOM TRIGGER WITH CHEVRON ──────────────────

/**
 * Custom trigger button with an animated chevron icon that rotates
 * when the collapsible opens. Uses controlled state for the rotation.
 *
 * ```tsx
 * const [open, setOpen] = useState(false)
 * <Collapsible open={open} onOpenChange={setOpen}>
 *   <CollapsibleTrigger asChild>
 *     <button className="flex items-center gap-2">
 *       Advanced Options
 *       <ChevronDown className={open ? "rotate-180" : ""} />
 *     </button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>...</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const WithAnimatedChevron: Story = {
  name: "With Animated Chevron",
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-72">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
            Advanced Options
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 px-3 pb-3 pt-1">
            {[
              "Enable caching",
              "Debug mode",
              "Verbose logging",
              "Custom headers",
            ].map((opt) => (
              <div
                key={opt}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">{opt}</span>
                <div className="h-4 w-8 rounded-full bg-muted border" />
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

/**
 * Trigger with a right-pointing chevron that rotates 90 degrees when open.
 * This pattern is common for tree-view or sidebar navigation items.
 */
export const WithRightChevron: Story = {
  name: "With Right Chevron",
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-72">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <ChevronRight
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                open ? "rotate-90" : ""
              }`}
            />
            Team Members
            <Badge variant="secondary" className="ml-auto text-xs">
              5
            </Badge>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-6 space-y-1 pb-2">
            {[
              "Emma Rodriguez",
              "Alex Chen",
              "Maya Johnson",
              "Liam Park",
              "Sophie Turner",
            ].map((name) => (
              <div
                key={name}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/50"
              >
                {name}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

// ─── DISABLED ─────────────────────────────────────

/**
 * Disabled collapsible. The trigger cannot be clicked and the content
 * cannot be toggled. The disabled state is forwarded to the trigger.
 *
 * ```tsx
 * <Collapsible disabled>
 *   <CollapsibleTrigger asChild>
 *     <Button variant="outline" disabled>Toggle (disabled)</Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>This cannot be revealed.</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const Disabled: Story = {
  render: (args) => (
    <Collapsible disabled className="w-72 space-y-2" {...args}>
      <div className="flex items-center justify-between rounded-md border px-4 py-2 opacity-50">
        <p className="text-sm font-medium">Locked Section</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">
          This content will never be revealed because the collapsible is disabled.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// ─── NESTED COLLAPSIBLES ──────────────────────────

/**
 * Nested collapsibles for hierarchical content. Each level can be
 * independently expanded or collapsed.
 *
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Parent</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <Collapsible>
 *       <CollapsibleTrigger>Child</CollapsibleTrigger>
 *       <CollapsibleContent>Nested content</CollapsibleContent>
 *     </Collapsible>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const NestedCollapsibles: Story = {
  name: "Nested Collapsibles",
  render: () => {
    const [parentOpen, setParentOpen] = useState(true)
    const [child1Open, setChild1Open] = useState(false)
    const [child2Open, setChild2Open] = useState(false)
    return (
      <div className="w-80">
        <Collapsible
          open={parentOpen}
          onOpenChange={setParentOpen}
          className="rounded-lg border"
        >
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors">
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                Campaign Settings
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                  parentOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="border-t">
              {/* Nested child 1 */}
              <Collapsible
                open={child1Open}
                onOpenChange={setChild1Open}
              >
                <CollapsibleTrigger asChild>
                  <button className="flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors">
                    <span className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      Targeting
                    </span>
                    <ChevronRight
                      className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
                        child1Open ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-1 px-4 pb-3 pl-10">
                    <p className="text-xs text-muted-foreground">Region: North America</p>
                    <p className="text-xs text-muted-foreground">Age range: 18-35</p>
                    <p className="text-xs text-muted-foreground">Interests: Fashion, Beauty</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Nested child 2 */}
              <Collapsible
                open={child2Open}
                onOpenChange={setChild2Open}
              >
                <CollapsibleTrigger asChild>
                  <button className="flex w-full items-center justify-between border-t px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors">
                    <span className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                      Content Requirements
                    </span>
                    <ChevronRight
                      className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
                        child2Open ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-1 px-4 pb-3 pl-10">
                    <p className="text-xs text-muted-foreground">Format: Instagram Reel</p>
                    <p className="text-xs text-muted-foreground">Min duration: 30 seconds</p>
                    <p className="text-xs text-muted-foreground">Hashtags: #summerglow #aspire</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  },
}

// ─── ASPIRE REAL-WORLD COMPOSITIONS ───────────────

/**
 * Advanced settings toggle pattern used across the Aspire platform.
 * A simple toggle that reveals advanced configuration options below
 * the primary settings.
 *
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger asChild>
 *     <Button variant="ghost" size="sm">
 *       <Sliders className="h-4 w-4" />
 *       Advanced Settings
 *     </Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     Advanced form fields here
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const AdvancedSettingsToggle: Story = {
  name: "Real World -- Advanced Settings Toggle",
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="w-80 space-y-4 rounded-lg border bg-card p-6">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">Campaign Configuration</h3>
          <p className="text-xs text-muted-foreground">
            Set up the basic campaign parameters.
          </p>
        </div>
        <div className="space-y-3">
          <div className="grid gap-1.5">
            <Label htmlFor="adv-name">Campaign name</Label>
            <Input id="adv-name" placeholder="e.g. Summer Glow 2025" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="adv-budget">Budget</Label>
            <Input id="adv-budget" type="number" placeholder="5000" />
          </div>
        </div>

        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 px-0 text-muted-foreground hover:text-foreground">
              <Sliders className="h-4 w-4" />
              Advanced Settings
              <ChevronDown
                className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-3 pt-2">
              <div className="grid gap-1.5">
                <Label htmlFor="adv-hashtags">Required hashtags</Label>
                <Input
                  id="adv-hashtags"
                  placeholder="#summerglow #aspire"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="adv-deadline">Content deadline</Label>
                <Input id="adv-deadline" type="date" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Require approval before posting
                </span>
                <div className="h-5 w-9 rounded-full bg-primary" />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  },
}

/**
 * Additional information section that provides context without cluttering
 * the primary view. Common on creator profile pages or offer detail pages.
 */
export const AdditionalInfoSection: Story = {
  name: "Real World -- Additional Info Section",
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="w-80 rounded-lg border bg-card">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              ER
            </div>
            <div>
              <h3 className="text-sm font-semibold">Emma Rodriguez</h3>
              <p className="text-xs text-muted-foreground">
                Lifestyle & Beauty Creator
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Followers", value: "125K" },
              { label: "Engagement", value: "4.2%" },
              { label: "Posts", value: "342" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-sm font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-center gap-1.5 border-t px-4 py-2.5 text-xs text-muted-foreground hover:bg-muted/50 transition-colors">
              <Info className="h-3.5 w-3.5" />
              {open ? "Hide" : "Show"} additional info
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2 border-t px-4 py-3">
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm">Los Angeles, CA</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Primary Platform</p>
                <p className="text-sm">Instagram</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Categories</p>
                <div className="flex gap-1 pt-0.5">
                  {["Beauty", "Lifestyle", "Fashion"].map((cat) => (
                    <Badge key={cat} variant="secondary" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Active</p>
                <p className="text-sm">2 hours ago</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  },
}

/**
 * Filter group pattern used on list pages (e.g. contacts, campaigns).
 * Each filter category is a collapsible section that can be expanded
 * or collapsed independently.
 */
export const FilterGroup: Story = {
  name: "Real World -- Filter Group",
  render: () => {
    const [platformOpen, setPlatformOpen] = useState(true)
    const [statusOpen, setStatusOpen] = useState(true)
    const [followersOpen, setFollowersOpen] = useState(false)

    const FilterSection = ({
      label,
      icon: Icon,
      open,
      onOpenChange,
      children,
    }: {
      label: string
      icon: React.ComponentType<{ className?: string }>
      open: boolean
      onOpenChange: (open: boolean) => void
      children: React.ReactNode
    }) => (
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-foreground transition-colors">
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              {label}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="pb-3 pt-1">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    )

    return (
      <div className="w-64 space-y-1 rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-semibold">Filters</h3>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
            Clear all
          </Button>
        </div>

        <FilterSection
          label="Platform"
          icon={Globe}
          open={platformOpen}
          onOpenChange={setPlatformOpen}
        >
          <div className="space-y-1.5">
            {["Instagram", "TikTok", "YouTube", "Twitter"].map((platform) => (
              <label
                key={platform}
                className="flex items-center gap-2 rounded px-1 py-0.5 text-sm hover:bg-muted/50 cursor-pointer"
              >
                <div className="h-4 w-4 rounded border" />
                {platform}
              </label>
            ))}
          </div>
        </FilterSection>

        <div className="border-t" />

        <FilterSection
          label="Status"
          icon={Filter}
          open={statusOpen}
          onOpenChange={setStatusOpen}
        >
          <div className="space-y-1.5">
            {["Active", "Pending", "Completed", "Archived"].map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 rounded px-1 py-0.5 text-sm hover:bg-muted/50 cursor-pointer"
              >
                <div className="h-4 w-4 rounded border" />
                {status}
              </label>
            ))}
          </div>
        </FilterSection>

        <div className="border-t" />

        <FilterSection
          label="Followers"
          icon={Users}
          open={followersOpen}
          onOpenChange={setFollowersOpen}
        >
          <div className="space-y-2">
            {["< 10K", "10K - 50K", "50K - 100K", "100K+"].map((range) => (
              <label
                key={range}
                className="flex items-center gap-2 rounded px-1 py-0.5 text-sm hover:bg-muted/50 cursor-pointer"
              >
                <div className="h-4 w-4 rounded border" />
                {range}
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    )
  },
}

/**
 * Notification settings with collapsible category groups. Each notification
 * channel is a collapsible section with individual toggle controls.
 */
export const NotificationSettings: Story = {
  name: "Real World -- Notification Settings",
  render: () => {
    const [emailOpen, setEmailOpen] = useState(true)
    const [pushOpen, setPushOpen] = useState(false)
    return (
      <div className="w-80 rounded-lg border bg-card">
        <div className="border-b px-4 py-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            Notification Preferences
          </h3>
        </div>
        <div className="divide-y">
          <Collapsible open={emailOpen} onOpenChange={setEmailOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Notifications
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    emailOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="divide-y border-t">
                {[
                  { label: "New campaign invites", enabled: true },
                  { label: "Creator messages", enabled: true },
                  { label: "Weekly digest", enabled: false },
                  { label: "Product updates", enabled: false },
                ].map(({ label, enabled }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-2.5"
                  >
                    <span className="text-sm">{label}</span>
                    <div
                      className={`h-5 w-9 rounded-full ${
                        enabled ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={pushOpen} onOpenChange={setPushOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                <span className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  Push Notifications
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    pushOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="divide-y border-t">
                {[
                  { label: "Direct messages", enabled: true },
                  { label: "Campaign updates", enabled: false },
                  { label: "System alerts", enabled: true },
                ].map(({ label, enabled }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-2.5"
                  >
                    <span className="text-sm">{label}</span>
                    <div
                      className={`h-5 w-9 rounded-full ${
                        enabled ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    )
  },
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that clicking the collapsible trigger reveals the hidden content
 * and clicking again hides it.
 */
export const ToggleTest: Story = {
  name: "Test: Click trigger toggles content",
  render: (args) => (
    <Collapsible className="w-72 space-y-2" {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm" data-testid="toggle-trigger">
          Toggle Section
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          data-testid="collapsible-content"
          className="rounded-md border p-3 text-sm"
        >
          This content should appear when toggled open.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Content should not be visible initially
    expect(canvas.queryByTestId("collapsible-content")).not.toBeInTheDocument()

    // Click trigger to open
    const trigger = canvas.getByTestId("toggle-trigger")
    await userEvent.click(trigger)

    // Content should now be visible
    await expect(canvas.getByTestId("collapsible-content")).toBeVisible()

    // Click trigger again to close
    await userEvent.click(trigger)

    // Content should be removed from the DOM or hidden
    expect(canvas.queryByTestId("collapsible-content")).not.toBeInTheDocument()
  },
}

/**
 * Verifies that a disabled collapsible cannot be toggled and the content
 * remains hidden when the trigger is clicked.
 */
export const DisabledToggleTest: Story = {
  name: "Test: Disabled prevents toggling",
  render: (args) => (
    <Collapsible disabled className="w-72 space-y-2" {...args}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          data-testid="disabled-trigger"
        >
          Disabled Toggle
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          data-testid="disabled-content"
          className="rounded-md border p-3 text-sm"
        >
          This content should never appear.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.queryByTestId("disabled-content")).not.toBeInTheDocument()
    const trigger = canvas.getByTestId("disabled-trigger")
    await expect(trigger).toBeDisabled()
  },
}

/**
 * Verifies that a collapsible with `defaultOpen` renders its content
 * immediately and can be closed by clicking the trigger.
 */
export const DefaultOpenToggleTest: Story = {
  name: "Test: DefaultOpen shows content initially",
  render: (args) => (
    <Collapsible defaultOpen className="w-72 space-y-2" {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm" data-testid="default-open-trigger">
          Toggle
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          data-testid="default-open-content"
          className="rounded-md border p-3 text-sm"
        >
          This content is visible by default.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Content should be visible immediately because of defaultOpen
    await expect(canvas.getByTestId("default-open-content")).toBeVisible()

    // Click trigger to close
    const trigger = canvas.getByTestId("default-open-trigger")
    await userEvent.click(trigger)

    // Content should be hidden after closing
    expect(canvas.queryByTestId("default-open-content")).not.toBeInTheDocument()
  },
}
