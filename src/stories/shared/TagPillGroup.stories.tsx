import type { Meta, StoryObj } from "@storybook/react"
import { within, expect } from "storybook/test"
import { TagPillGroup } from "@/components/shared/TagPillGroup"

/**
 * # TagPillGroup
 *
 * A horizontal, wrapping row of colored tag pills. Each pill is a small
 * rounded badge with a colored background. The component supports 9 color
 * variants (teal, purple, amber, blue, rose, lime, orange, sky, default)
 * and gracefully wraps across multiple lines when the container is narrow.
 *
 * ## When to Use
 * - Display campaign tags on a contact or creator card
 * - Show creator categories, interests, or content labels
 * - Indicate group membership in tables and detail panels
 * - Visualize applied filters in a filter bar
 *
 * ## When NOT to Use
 * - For status indicators — use StatusDot instead
 * - For interactive/removable tags — build on top with a close button
 * - For notification counts — use Badge instead
 * - For single-select chips — use Toggle or RadioGroup
 *
 * ## Accessibility
 * - Each pill is a `<span>` with no interactive role; the group is a `<div>`
 * - Color is never the sole differentiator — each pill has visible label text
 * - Dark mode variants are included for all 9 colors to maintain contrast
 * - Use meaningful label text so screen readers convey the tag content
 *
 * ## Import
 * ```tsx
 * import { TagPillGroup } from '@/components/shared/TagPillGroup'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <TagPillGroup
 *   pills={[
 *     { label: "Petfluencer Perks", color: "teal" },
 *     { label: "VIP List", color: "purple" },
 *     { label: "ugc" },
 *   ]}
 * />
 * ```
 */
const meta: Meta<typeof TagPillGroup> = {
  title: "4. Components/Data Display/TagPillGroup",
  component: TagPillGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Row of colored tag pills. 9 color variants: teal, purple, amber, blue, rose, lime, orange, sky, default (gray). Used for campaigns, groups, interests, and tags.",
      },
    },
  },
  argTypes: {
    pills: {
      control: "object",
      description:
        "Array of pill objects. Each pill has a required `label` string and an optional `color` that maps to one of the 9 built-in color schemes.",
      table: {
        type: { summary: "Pill[]" },
        defaultValue: { summary: "[]" },
        category: "Core",
      },
    },
    className: {
      control: "text",
      description:
        "Additional CSS classes merged on the outer `<div>` container via the `cn()` utility.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    pills: [
      { label: "Petfluencer Perks", color: "teal" },
      { label: "VIP Marketing List 2026", color: "purple" },
    ],
  },
}

export default meta
type Story = StoryObj<typeof TagPillGroup>

// ─── BASIC VARIANTS ───────────────────────────────

/**
 * A single pill rendered alone. Works for cases where an entity has
 * only one tag or category.
 *
 * ```tsx
 * <TagPillGroup pills={[{ label: "ugc", color: "blue" }]} />
 * ```
 */
export const SinglePill: Story = {
  name: "Single Pill",
  args: {
    pills: [{ label: "ugc", color: "blue" }],
  },
}

/**
 * Multiple pills in different colors — the typical campaign tag scenario.
 *
 * ```tsx
 * <TagPillGroup
 *   pills={[
 *     { label: "Petfluencer Perks", color: "teal" },
 *     { label: "VIP Marketing List 2026", color: "purple" },
 *     { label: "Coffee Campaign Brief", color: "amber" },
 *     { label: "Summer Skincare Drop", color: "rose" },
 *   ]}
 * />
 * ```
 */
export const CampaignPills: Story = {
  name: "Campaign Tags",
  args: {
    pills: [
      { label: "Petfluencer Perks", color: "teal" },
      { label: "VIP Marketing List 2026", color: "purple" },
      { label: "Coffee Campaign Brief", color: "amber" },
      { label: "Summer Skincare Drop", color: "rose" },
    ],
  },
}

/**
 * Group-based pills used for creator segments or audience groups.
 *
 * ```tsx
 * <TagPillGroup
 *   pills={[
 *     { label: "Macro Influencers", color: "lime" },
 *     { label: "LA Creators", color: "sky" },
 *     { label: "Fitness & Health", color: "orange" },
 *   ]}
 * />
 * ```
 */
export const GroupPills: Story = {
  name: "Creator Groups",
  args: {
    pills: [
      { label: "Macro Influencers", color: "lime" },
      { label: "LA Creators", color: "sky" },
      { label: "Fitness & Health", color: "orange" },
    ],
  },
}

/**
 * Default (gray) pills used for free-form tags without a specific color assignment.
 *
 * ```tsx
 * <TagPillGroup
 *   pills={[
 *     { label: "ugc" },
 *     { label: "fashion" },
 *     { label: "lifestyle" },
 *     { label: "paid-partner" },
 *   ]}
 * />
 * ```
 */
export const DefaultColorPills: Story = {
  name: "Free-form Tags (Default Color)",
  args: {
    pills: [
      { label: "ugc" },
      { label: "fashion" },
      { label: "lifestyle" },
      { label: "paid-partner" },
    ],
  },
}

// ─── COLOR GALLERY ────────────────────────────────

/** All 9 color variants displayed in a single row for comparison. */
export const AllColors: Story = {
  name: "All Colors",
  args: {
    pills: [
      { label: "teal", color: "teal" },
      { label: "purple", color: "purple" },
      { label: "amber", color: "amber" },
      { label: "blue", color: "blue" },
      { label: "rose", color: "rose" },
      { label: "lime", color: "lime" },
      { label: "orange", color: "orange" },
      { label: "sky", color: "sky" },
      { label: "default", color: "default" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "All 9 color variants side by side. Each color includes light and dark mode support.",
      },
    },
  },
}

// ─── OVERFLOW / WRAPPING ──────────────────────────

/**
 * 12 pills in a constrained container, demonstrating how the flex-wrap
 * layout handles overflow gracefully.
 *
 * ```tsx
 * <div className="w-80">
 *   <TagPillGroup pills={manyPills} />
 * </div>
 * ```
 */
export const OverflowWrapping: Story = {
  name: "Overflow / Wrapping",
  args: {
    pills: Array.from({ length: 12 }, (_, i) => ({
      label: `tag-${i + 1}`,
      color: (
        [
          "teal",
          "purple",
          "amber",
          "blue",
          "rose",
          "lime",
          "orange",
          "sky",
          "default",
        ] as const
      )[i % 9],
    })),
  },
  decorators: [
    (Story) => (
      <div className="w-80 rounded-lg border border-dashed border-border p-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "12 pills inside a 320px-wide container. The flex-wrap layout ensures pills flow to the next line without overflow.",
      },
    },
  },
}

/**
 * Many pills in a wide container — shows that the component remains
 * visually clean even with many items.
 */
export const ManyPills: Story = {
  name: "Many Pills (Wide)",
  args: {
    pills: Array.from({ length: 18 }, (_, i) => ({
      label: `category-${i + 1}`,
      color: (
        [
          "teal",
          "purple",
          "amber",
          "blue",
          "rose",
          "lime",
          "orange",
          "sky",
          "default",
        ] as const
      )[i % 9],
    })),
  },
}

// ─── EMPTY STATE ──────────────────────────────────

/**
 * An empty pills array renders an empty container. In practice,
 * you might conditionally render the component only when pills exist.
 */
export const EmptyPills: Story = {
  name: "Empty State",
  args: {
    pills: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "When the `pills` array is empty, the component renders an empty flex container. Consider conditional rendering to avoid empty markup.",
      },
    },
  },
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Creator card composition — shows a creator name with their category tags,
 * similar to how tags appear in the Contacts table.
 *
 * ```tsx
 * <div className="flex items-center gap-3">
 *   <span className="font-medium">Jane Doe</span>
 *   <TagPillGroup pills={[...]} />
 * </div>
 * ```
 */
export const CreatorCardWithTags: Story = {
  name: "Real World — Creator Card",
  render: () => (
    <div className="w-96 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
          JD
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Jane Doe</p>
          <p className="text-xs text-muted-foreground">@janedoe_creates</p>
        </div>
      </div>
      <TagPillGroup
        pills={[
          { label: "Lifestyle", color: "teal" },
          { label: "Fashion", color: "rose" },
          { label: "Micro Influencer", color: "purple" },
        ]}
      />
    </div>
  ),
}

/**
 * Content labels in a post detail context — tags describe the content
 * type and campaign association.
 */
export const ContentLabels: Story = {
  name: "Real World — Content Labels",
  render: () => (
    <div className="w-80 space-y-2">
      <h4 className="text-sm font-semibold text-foreground">Content Tags</h4>
      <TagPillGroup
        pills={[
          { label: "Instagram Reel", color: "blue" },
          { label: "UGC", color: "amber" },
          { label: "Sponsored", color: "orange" },
          { label: "Summer Campaign", color: "sky" },
        ]}
      />
    </div>
  ),
}

/**
 * Tags in a table row — typical layout in the Contacts or Campaigns table.
 */
export const InTableRow: Story = {
  name: "Real World — Table Row Tags",
  render: () => (
    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
      <thead className="bg-muted/40">
        <tr>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Creator
          </th>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Tags
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {[
          {
            name: "Jane Doe",
            pills: [
              { label: "VIP", color: "purple" as const },
              { label: "Lifestyle", color: "teal" as const },
            ],
          },
          {
            name: "Alex Kim",
            pills: [
              { label: "Fitness", color: "lime" as const },
              { label: "UGC", color: "amber" as const },
              { label: "Nano", color: "sky" as const },
            ],
          },
          {
            name: "Mia Tanaka",
            pills: [{ label: "Beauty", color: "rose" as const }],
          },
        ].map((row) => (
          <tr key={row.name} className="bg-background">
            <td className="px-4 py-2 font-medium">{row.name}</td>
            <td className="px-4 py-2">
              <TagPillGroup pills={row.pills} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that the correct number of pills render and that each
 * pill displays its label text.
 */
export const PillRenderTest: Story = {
  name: "Test: Pills render with correct labels",
  args: {
    pills: [
      { label: "Alpha", color: "teal" },
      { label: "Beta", color: "purple" },
      { label: "Gamma", color: "amber" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Alpha")).toBeInTheDocument()
    await expect(canvas.getByText("Beta")).toBeInTheDocument()
    await expect(canvas.getByText("Gamma")).toBeInTheDocument()
    // Verify the correct number of pills rendered
    const pills = canvasElement.querySelectorAll(".rounded-full")
    await expect(pills.length).toBe(3)
  },
}

/**
 * Verifies that an empty pills array results in no pill elements
 * being rendered in the DOM.
 */
export const EmptyStateTest: Story = {
  name: "Test: Empty array renders no pills",
  args: {
    pills: [],
  },
  play: async ({ canvasElement }) => {
    const pills = canvasElement.querySelectorAll(".rounded-full")
    await expect(pills.length).toBe(0)
  },
}

/**
 * Verifies that pills without an explicit color default to the
 * "default" (slate/gray) color scheme.
 */
export const DefaultColorTest: Story = {
  name: "Test: Default color applied when no color specified",
  args: {
    pills: [
      { label: "no-color-pill" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const pill = canvas.getByText("no-color-pill")
    await expect(pill).toBeInTheDocument()
    // The default color uses bg-slate-100 class
    await expect(pill.className).toContain("bg-slate-100")
  },
}
