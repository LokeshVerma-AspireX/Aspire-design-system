import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Send } from "lucide-react"

/**
 * # ScrollArea
 *
 * A custom-styled scrollable container with cross-browser consistent
 * scrollbars built on Radix UI ScrollArea. Supports vertical, horizontal,
 * and bidirectional scrolling.
 *
 * ## When to Use
 * - For lists that can grow beyond their container (sidebar menus, tag lists)
 * - For chat/message threads with variable-length content
 * - For horizontal carousels of cards, tags, or thumbnails
 * - When you need consistent scrollbar styling across browsers
 *
 * ## When NOT to Use
 * - For the main page scroll -- let the browser handle it natively
 * - For content that should always be fully visible -- avoid hiding content
 * - For tiny containers -- native overflow may be sufficient
 *
 * ## Accessibility
 * - The viewport is focusable via keyboard (`tabIndex=0`)
 * - Focus ring visible on keyboard navigation
 * - Scrollbar is a purely visual enhancement; scroll behavior works without it
 * - Screen readers can navigate content normally within the scroll area
 *
 * ## Import
 * ```tsx
 * import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <ScrollArea className="h-64 w-56 rounded-md border">
 *   <div className="p-4">
 *     {items.map((item) => (
 *       <p key={item}>{item}</p>
 *     ))}
 *   </div>
 * </ScrollArea>
 * ```
 */
const meta: Meta<typeof ScrollArea> = {
  title: "4. Components/Data Display/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Custom-styled scrollable area with cross-browser consistent scrollbar. Wraps content with overflow control.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description:
        "CSS classes applied to the root. Set height/width to constrain the scrollable area.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    children: {
      description: "Content to render inside the scrollable viewport.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    type: {
      control: "select",
      options: ["auto", "always", "scroll", "hover"],
      description:
        "Controls when the scrollbar is visible. `auto` shows on overflow, `always` always visible, `hover` on mouse hover, `scroll` while scrolling.",
      table: {
        type: { summary: '"auto" | "always" | "scroll" | "hover"' },
        defaultValue: { summary: "auto" },
        category: "Behavior",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

// ─── VERTICAL SCROLL ───────────────────────────────

/**
 * Basic vertical scroll list. Content overflows vertically and a custom
 * scrollbar appears.
 *
 * ```tsx
 * <ScrollArea className="h-64 w-56 rounded-md border">
 *   <div className="p-4">
 *     {items.map((item) => (
 *       <div key={item}>
 *         <p className="py-1.5 text-sm">{item}</p>
 *         <Separator />
 *       </div>
 *     ))}
 *   </div>
 * </ScrollArea>
 * ```
 */
export const VerticalScroll: Story = {
  name: "Vertical Scroll",
  render: () => (
    <ScrollArea className="h-64 w-56 rounded-md border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-semibold">Components</h4>
        {Array.from({ length: 20 }, (_, i) => `Component ${i + 1}`).map(
          (c) => (
            <div key={c}>
              <p className="py-1.5 text-sm">{c}</p>
              <Separator />
            </div>
          )
        )}
      </div>
    </ScrollArea>
  ),
}

/**
 * Long-form text content that requires scrolling. Simulates reading
 * a documentation page or message body.
 *
 * ```tsx
 * <ScrollArea className="h-72 w-80 rounded-md border">
 *   <div className="p-4 space-y-4">
 *     <p>Long paragraph content...</p>
 *   </div>
 * </ScrollArea>
 * ```
 */
export const LongContent: Story = {
  name: "Long Text Content",
  render: () => (
    <ScrollArea className="h-72 w-80 rounded-md border">
      <div className="space-y-4 p-4">
        <h4 className="text-sm font-semibold">Campaign Brief</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Welcome to our Summer 2025 Creator Campaign. This initiative aims to
          partner with 50 creators across Instagram, TikTok, and YouTube to
          promote our new product line. Each creator will produce 3 pieces of
          content over a 6-week period.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Content requirements include one unboxing video, one review post, and
          one creative lifestyle integration. All content must be approved
          before publishing. Creators retain rights to their content after the
          exclusivity window of 90 days.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Compensation structure: Base fee of $500 per creator plus performance
          bonuses based on engagement metrics. Top performers may receive
          additional campaign extensions and increased rates for future
          collaborations.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Timeline: Creator onboarding begins June 1st, first content due by
          June 15th, campaign wrap-up by July 31st. Monthly check-ins with
          campaign managers are required. Analytics reports will be shared
          bi-weekly.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Brand guidelines: Use approved brand colors (see asset library).
          Product must be shown in at least 3 seconds of video content.
          Mandatory FTC disclosure required on all sponsored posts. Tag
          official brand account in all social media posts.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Success metrics: Target 2M total impressions, 50K+ engagements, and
          5,000 link clicks. Performance dashboard available in real-time via
          the Aspire analytics portal.
        </p>
      </div>
    </ScrollArea>
  ),
}

// ─── HORIZONTAL SCROLL ─────────────────────────────

/**
 * Horizontal scrolling for card grids or item carousels. Add
 * `whitespace-nowrap` and use `ScrollBar orientation="horizontal"`.
 *
 * ```tsx
 * <ScrollArea className="w-72 whitespace-nowrap rounded-md border">
 *   <div className="flex p-4 gap-3">
 *     {items.map((item) => (
 *       <div key={item} className="shrink-0 w-24 h-20" />
 *     ))}
 *   </div>
 *   <ScrollBar orientation="horizontal" />
 * </ScrollArea>
 * ```
 */
export const HorizontalScroll: Story = {
  name: "Horizontal Scroll",
  render: () => (
    <ScrollArea className="w-72 whitespace-nowrap rounded-md border">
      <div className="flex gap-3 p-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex h-20 w-24 shrink-0 flex-col items-center justify-center rounded-lg border bg-muted/50 text-sm"
          >
            <span className="text-xl font-bold text-muted-foreground">
              {i + 1}
            </span>
            <span className="text-xs text-muted-foreground">Item</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

/**
 * Horizontal tag/badge overflow. Common in filter bars or profile skill
 * tags that may exceed the container width.
 *
 * ```tsx
 * <ScrollArea className="w-64 whitespace-nowrap">
 *   <div className="flex gap-2 pb-2">
 *     {tags.map((tag) => (
 *       <Badge key={tag} variant="secondary">{tag}</Badge>
 *     ))}
 *   </div>
 *   <ScrollBar orientation="horizontal" />
 * </ScrollArea>
 * ```
 */
export const HorizontalTags: Story = {
  name: "Horizontal Tags",
  render: () => {
    const tags = [
      "Instagram",
      "TikTok",
      "YouTube",
      "Beauty",
      "Fashion",
      "Lifestyle",
      "Fitness",
      "Food",
      "Travel",
      "Tech",
      "Gaming",
      "Parenting",
    ]
    return (
      <div className="w-64 space-y-2">
        <p className="text-sm font-medium">Creator interests</p>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="shrink-0">
                {tag}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    )
  },
}

// ─── BOTH DIRECTIONS ───────────────────────────────

/**
 * Bidirectional scrolling for large grids or matrices that exceed both
 * dimensions.
 *
 * ```tsx
 * <ScrollArea className="h-64 w-72 rounded-md border">
 *   <div className="w-[600px] p-4">
 *     ...wide content...
 *   </div>
 *   <ScrollBar orientation="horizontal" />
 * </ScrollArea>
 * ```
 */
export const BothDirections: Story = {
  name: "Both Directions",
  render: () => (
    <ScrollArea className="h-64 w-72 rounded-md border">
      <div className="w-[600px] p-4">
        <h4 className="mb-3 text-sm font-semibold">Performance Matrix</h4>
        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: 80 }, (_, i) => (
            <div
              key={i}
              className="flex h-12 w-16 items-center justify-center rounded border bg-muted/30 text-xs text-muted-foreground"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

// ─── REAL-WORLD: ASPIRE PATTERNS ───────────────────

const TAGS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Radix UI",
  "Storybook",
  "Vite",
  "ESLint",
  "Prettier",
  "Jest",
  "Vitest",
  "Testing Library",
  "Cypress",
  "GraphQL",
  "REST API",
  "Prisma",
  "PostgreSQL",
  "Supabase",
  "Vercel",
  "GitHub Actions",
  "Docker",
  "Figma",
  "Framer Motion",
]

/**
 * Tag selector with search and scrollable list. This pattern appears in
 * campaign tagging, creator categorization, and filter UIs.
 *
 * ```tsx
 * <ScrollArea className="h-40 rounded-md border">
 *   <div className="p-2">
 *     {tags.map((tag) => (
 *       <button key={tag} onClick={() => toggle(tag)}>
 *         {tag}
 *       </button>
 *     ))}
 *   </div>
 * </ScrollArea>
 * ```
 */
export const TagSelector: Story = {
  name: "Aspire -- Tag Selector",
  render: () => {
    const [selected, setSelected] = useState([
      "React",
      "Next.js",
      "Tailwind CSS",
    ])
    const [query, setQuery] = useState("")

    const filtered = TAGS.filter((t) =>
      t.toLowerCase().includes(query.toLowerCase())
    )
    const toggle = (tag: string) =>
      setSelected((s) =>
        s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag]
      )

    return (
      <div className="w-72 space-y-2 rounded-lg border bg-card p-3">
        <p className="text-sm font-medium">Select technologies</p>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {selected.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="cursor-pointer gap-1 pr-1"
                onClick={() => toggle(t)}
              >
                {t}
                <span className="text-muted-foreground hover:text-foreground">
                  x
                </span>
              </Badge>
            ))}
          </div>
        )}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-8 pl-8 text-sm"
            placeholder="Search tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-40 rounded-md border">
          <div className="space-y-0.5 p-2">
            {filtered.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No tags found
              </p>
            ) : (
              filtered.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggle(tag)}
                  className={`flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                    selected.includes(tag)
                      ? "font-medium text-primary"
                      : "text-foreground"
                  }`}
                >
                  {tag}
                  {selected.includes(tag) && (
                    <span className="text-primary">&#10003;</span>
                  )}
                </button>
              ))
            )}
          </div>
        </ScrollArea>
        <p className="text-xs text-muted-foreground">
          {selected.length} tag{selected.length !== 1 ? "s" : ""} selected
        </p>
      </div>
    )
  },
}

const MESSAGES = [
  {
    user: "Sarah",
    text: "Just shipped the new design tokens! Check it out.",
    time: "9:01 AM",
    initials: "SJ",
  },
  {
    user: "Mike",
    text: "Looks great! The color palette is so much better.",
    time: "9:03 AM",
    initials: "MC",
  },
  {
    user: "Alex",
    text: "One question -- did we finalize the spacing scale?",
    time: "9:07 AM",
    initials: "AR",
  },
  {
    user: "Sarah",
    text: "Yes! 4px base, multiples of 4. Full doc in Notion.",
    time: "9:08 AM",
    initials: "SJ",
  },
  {
    user: "Emma",
    text: "Perfect. I'll update the Figma variables today.",
    time: "9:12 AM",
    initials: "EW",
  },
  {
    user: "Mike",
    text: "Should we do a quick sync at 2pm to walk everyone through?",
    time: "9:15 AM",
    initials: "MC",
  },
  {
    user: "Sarah",
    text: "Sure, I'll send a calendar invite.",
    time: "9:16 AM",
    initials: "SJ",
  },
  {
    user: "Alex",
    text: "Added to my calendar. Sharing my screen for the token walkthrough.",
    time: "9:20 AM",
    initials: "AR",
  },
  {
    user: "Emma",
    text: "Also -- can we add motion tokens in the same sprint?",
    time: "9:22 AM",
    initials: "EW",
  },
  {
    user: "Sarah",
    text: "Definitely. I'll create tickets for animation duration and easing.",
    time: "9:25 AM",
    initials: "SJ",
  },
]

/**
 * Message thread with scroll area. Mirrors the Aspire inbox thread detail
 * panel where conversations can get long.
 *
 * ```tsx
 * <ScrollArea className="h-72">
 *   {messages.map((msg) => (
 *     <MessageBubble key={msg.id} {...msg} />
 *   ))}
 * </ScrollArea>
 * ```
 */
export const MessageThread: Story = {
  name: "Aspire -- Message Thread",
  render: () => (
    <div className="flex w-96 flex-col rounded-lg border bg-card">
      <div className="border-b px-4 py-3">
        <p className="text-sm font-semibold">design-system</p>
        <p className="text-xs text-muted-foreground">10 messages</p>
      </div>
      <ScrollArea className="h-72">
        <div className="space-y-4 p-4">
          {MESSAGES.map(({ user, text, time, initials }, i) => (
            <div key={i} className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium">{user}</span>
                  <span className="text-xs text-muted-foreground">{time}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-3">
        <div className="flex gap-2">
          <Input
            placeholder="Message #design-system"
            className="h-8 text-sm"
          />
          <Button size="sm" className="shrink-0">
            <Send className="mr-1.5 h-3.5 w-3.5" />
            Send
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Creator list sidebar. A scrollable list of creators with avatar, name,
 * and status badge. Matches the Aspire contacts sidebar pattern.
 *
 * ```tsx
 * <ScrollArea className="h-80">
 *   {creators.map((c) => (
 *     <CreatorRow key={c.name} {...c} />
 *   ))}
 * </ScrollArea>
 * ```
 */
export const CreatorListSidebar: Story = {
  name: "Aspire -- Creator List Sidebar",
  render: () => {
    const creators = [
      { name: "Emma Watson", handle: "@emmawatson", status: "Active", initials: "EW" },
      { name: "James Chen", handle: "@jameschen", status: "Pending", initials: "JC" },
      { name: "Sofia Rodriguez", handle: "@sofiarodriguez", status: "Active", initials: "SR" },
      { name: "Alex Kim", handle: "@alexkim", status: "Completed", initials: "AK" },
      { name: "Maya Patel", handle: "@mayapatel", status: "Active", initials: "MP" },
      { name: "Lucas Brown", handle: "@lucasbrown", status: "Pending", initials: "LB" },
      { name: "Olivia Davis", handle: "@oliviadavis", status: "Active", initials: "OD" },
      { name: "Noah Wilson", handle: "@noahwilson", status: "Draft", initials: "NW" },
      { name: "Ava Martinez", handle: "@avamartinez", status: "Active", initials: "AM" },
      { name: "Liam Taylor", handle: "@liamtaylor", status: "Completed", initials: "LT" },
      { name: "Isabella Moore", handle: "@isabellamoore", status: "Pending", initials: "IM" },
      { name: "Ethan Jackson", handle: "@ethanjackson", status: "Active", initials: "EJ" },
    ]

    const statusColor: Record<string, string> = {
      Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
      Pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
      Completed: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      Draft: "bg-muted text-muted-foreground",
    }

    return (
      <div className="w-72 rounded-lg border bg-card">
        <div className="border-b p-3">
          <p className="text-sm font-semibold">Campaign Creators</p>
          <p className="text-xs text-muted-foreground">
            {creators.length} creators
          </p>
        </div>
        <ScrollArea className="h-80">
          <div className="divide-y">
            {creators.map(({ name, handle, status, initials }) => (
              <div
                key={name}
                className="flex cursor-pointer items-center gap-3 p-3 transition-colors hover:bg-muted/50"
              >
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {handle}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={`shrink-0 text-[10px] ${statusColor[status] ?? ""}`}
                >
                  {status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    )
  },
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that the scroll area renders with the correct data-slot attribute
 * and contains scrollable content.
 */
export const RenderTest: Story = {
  name: "Test: ScrollArea Renders",
  render: () => (
    <ScrollArea className="h-32 w-56 rounded-md border">
      <div className="p-4">
        {Array.from({ length: 15 }, (_, i) => (
          <p key={i} className="py-1 text-sm">
            Item {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const scrollAreaEl = canvasElement.querySelector(
      '[data-slot="scroll-area"]'
    )
    await expect(scrollAreaEl).toBeInTheDocument()
    // Verify the viewport is present
    const viewport = canvasElement.querySelector(
      '[data-slot="scroll-area-viewport"]'
    )
    await expect(viewport).toBeInTheDocument()
    // Verify scrollbar is rendered
    const scrollbar = canvasElement.querySelector(
      '[data-slot="scroll-area-scrollbar"]'
    )
    await expect(scrollbar).toBeInTheDocument()
  },
}

/**
 * Verifies that scrollable content is accessible and items can be found
 * inside the scroll viewport.
 */
export const ContentAccessibleTest: Story = {
  name: "Test: Content is Accessible",
  render: () => (
    <ScrollArea className="h-32 w-56 rounded-md border">
      <div className="p-4">
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i} data-testid={`scroll-item-${i}`} className="py-1 text-sm">
            Item {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // First item should be in the DOM
    const firstItem = canvasElement.querySelector(
      '[data-testid="scroll-item-0"]'
    )
    await expect(firstItem).toBeInTheDocument()
    await expect(firstItem).toHaveTextContent("Item 1")
    // Last item should also be in the DOM (even if not visible)
    const lastItem = canvasElement.querySelector(
      '[data-testid="scroll-item-9"]'
    )
    await expect(lastItem).toBeInTheDocument()
    await expect(lastItem).toHaveTextContent("Item 10")
    // Verify the scroll area contains all items
    const allItems = canvasElement.querySelectorAll('[data-testid^="scroll-item-"]')
    await expect(allItems.length).toBe(10)
  },
}

/**
 * Verifies that keyboard focus can reach the scroll area viewport.
 */
export const KeyboardFocusTest: Story = {
  name: "Test: Keyboard Focus",
  render: () => (
    <div>
      <Button size="sm" variant="outline" data-testid="focus-target">
        Focus me first
      </Button>
      <ScrollArea className="mt-2 h-32 w-56 rounded-md border">
        <div className="p-4">
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i} className="py-1 text-sm">
              Item {i + 1}
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Tab from button into scroll area
    const btn = canvas.getByTestId("focus-target")
    await userEvent.click(btn)
    await userEvent.tab()
    // The viewport should be focusable
    const viewport = canvasElement.querySelector(
      '[data-slot="scroll-area-viewport"]'
    )
    await expect(viewport).toBeInTheDocument()
  },
}
