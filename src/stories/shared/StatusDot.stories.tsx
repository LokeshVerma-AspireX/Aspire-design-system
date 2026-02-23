import type { Meta, StoryObj } from "@storybook/react"
import { within, expect } from "storybook/test"
import { StatusDot } from "@/components/shared/StatusDot"

/**
 * # StatusDot
 *
 * A small colored circle paired with an optional text label to communicate the
 * current status of a record at a glance. The four built-in variants map
 * directly to common Aspire entity states: active (green), deactivated
 * (orange), paused (gray), and error (red).
 *
 * ## When to Use
 * - In data tables to show campaign, offer, or creator status
 * - In detail page headers alongside entity names
 * - In summary cards where status needs to be scannable
 * - Anywhere a quick visual indicator of state is needed
 *
 * ## When NOT to Use
 * - For decorative color dots with no semantic meaning — use a plain `<span>`
 * - For complex multi-state workflows — use a stepper or progress component
 * - For notification counts — use Badge instead
 * - For boolean on/off states — use Switch or Toggle
 *
 * ## Accessibility
 * - The colored dot is marked `aria-hidden="true"` so screen readers skip it
 * - The visible label text conveys the status to assistive technology
 * - When `showLabel` is `false`, ensure the surrounding context provides an
 *   accessible name (e.g., a table column header)
 * - The `data-status` attribute enables automated testing selectors
 *
 * ## Import
 * ```tsx
 * import { StatusDot } from '@/components/shared/StatusDot'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <StatusDot status="active" />
 * <StatusDot status="paused" showLabel={false} />
 * <StatusDot status="error" label="Connection lost" />
 * ```
 */
const meta: Meta<typeof StatusDot> = {
  title: "4. Components/Data Display/StatusDot",
  component: StatusDot,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Small colored circle + label. Used in Contacts, Offers, and Campaign tables to show record status at a glance.",
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: ["active", "deactivated", "paused", "error"],
      description:
        "The status variant that determines the dot color and default label text.",
      table: {
        type: { summary: '"active" | "deactivated" | "paused" | "error"' },
        defaultValue: { summary: "-" },
        category: "Core",
      },
    },
    label: {
      control: "text",
      description:
        "Custom label text. When omitted, the component uses a built-in default label for the given status (e.g., 'Active', 'Paused').",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined (uses default per status)" },
        category: "Content",
      },
    },
    showLabel: {
      control: "boolean",
      description:
        "Whether to render the text label next to the dot. Set to `false` for compact table cells where the column header already indicates the meaning.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Appearance",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes merged via the `cn()` utility.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    status: "active",
  },
}

export default meta
type Story = StoryObj<typeof StatusDot>

// ─── STATUS VARIANTS ──────────────────────────────

/**
 * Green dot with "Active" label. Used for live campaigns, active offers,
 * and enabled creator accounts.
 *
 * ```tsx
 * <StatusDot status="active" />
 * ```
 */
export const Active: Story = {
  args: { status: "active" },
}

/**
 * Orange dot with "Deactivated" label. Indicates a disabled or
 * deactivated record that can be re-enabled.
 *
 * ```tsx
 * <StatusDot status="deactivated" />
 * ```
 */
export const Deactivated: Story = {
  args: { status: "deactivated" },
}

/**
 * Gray dot with "Paused" label. Used for temporarily halted campaigns
 * or offers.
 *
 * ```tsx
 * <StatusDot status="paused" />
 * ```
 */
export const Paused: Story = {
  args: { status: "paused" },
}

/**
 * Red dot with "Error" label. Indicates a failed connection, broken
 * tracking link, or integration error.
 *
 * ```tsx
 * <StatusDot status="error" />
 * ```
 */
export const Error: Story = {
  args: { status: "error" },
}

// ─── LABEL OPTIONS ────────────────────────────────

/**
 * Override the default label with a custom string. The dot color still
 * follows the `status` prop.
 *
 * ```tsx
 * <StatusDot status="active" label="Live" />
 * ```
 */
export const CustomLabel: Story = {
  name: "Custom Label",
  args: { status: "active", label: "Live" },
}

/**
 * Dot-only mode with `showLabel={false}`. Useful in compact table cells
 * where the column header already describes the meaning.
 *
 * ```tsx
 * <StatusDot status="active" showLabel={false} />
 * ```
 */
export const DotOnly: Story = {
  name: "Dot Only (No Label)",
  args: { status: "active", showLabel: false },
}

// ─── GALLERIES ────────────────────────────────────

/** Side-by-side comparison of all four status variants with labels. */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusDot status="active" />
      <StatusDot status="deactivated" />
      <StatusDot status="paused" />
      <StatusDot status="error" />
    </div>
  ),
}

/** All four variants in dot-only mode (no labels). */
export const AllVariantsDotOnly: Story = {
  name: "All Variants — Dot Only",
  render: () => (
    <div className="flex items-center gap-3">
      <StatusDot status="active" showLabel={false} />
      <StatusDot status="deactivated" showLabel={false} />
      <StatusDot status="paused" showLabel={false} />
      <StatusDot status="error" showLabel={false} />
    </div>
  ),
}

// ─── GROUPED STATUSES ─────────────────────────────

/**
 * A horizontal group of statuses — e.g., a quick status summary in
 * a dashboard card or filter area.
 *
 * ```tsx
 * <div className="flex items-center gap-4">
 *   <StatusDot status="active" label="12 Active" />
 *   <StatusDot status="paused" label="3 Paused" />
 *   <StatusDot status="error" label="1 Error" />
 * </div>
 * ```
 */
export const GroupedStatuses: Story = {
  name: "Grouped — Dashboard Summary",
  render: () => (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3">
      <StatusDot status="active" label="12 Active" />
      <StatusDot status="paused" label="3 Paused" />
      <StatusDot status="deactivated" label="2 Deactivated" />
      <StatusDot status="error" label="1 Error" />
    </div>
  ),
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Realistic table usage showing status dots in a creator management
 * table — each row has a status indicator.
 *
 * ```tsx
 * <table>
 *   <tbody>
 *     <tr>
 *       <td>Jane Doe</td>
 *       <td><StatusDot status="active" /></td>
 *     </tr>
 *   </tbody>
 * </table>
 * ```
 */
export const InTableRow: Story = {
  name: "Real World — Creator Table",
  render: () => (
    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
      <thead className="bg-muted/40">
        <tr>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Creator
          </th>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Platform
          </th>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {[
          { name: "Jane Doe", platform: "Instagram", status: "active" as const },
          { name: "Alex Kim", platform: "TikTok", status: "deactivated" as const },
          { name: "Mia Tanaka", platform: "YouTube", status: "paused" as const },
          { name: "Sam Park", platform: "Instagram", status: "error" as const },
        ].map((row) => (
          <tr key={row.name} className="bg-background">
            <td className="px-4 py-2 font-medium">{row.name}</td>
            <td className="px-4 py-2 text-muted-foreground">{row.platform}</td>
            <td className="px-4 py-2">
              <StatusDot status={row.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}

/**
 * Campaign status list — a compact sidebar-style list showing
 * campaign names with their current status.
 */
export const CampaignStatusList: Story = {
  name: "Real World — Campaign Status List",
  render: () => (
    <div className="w-72 rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-2.5">
        <h3 className="text-sm font-semibold text-foreground">Campaigns</h3>
      </div>
      <ul className="divide-y divide-border">
        {[
          { name: "Summer Skincare Drop", status: "active" as const },
          { name: "Holiday Gift Guide", status: "paused" as const },
          { name: "Spring Collection", status: "deactivated" as const },
          { name: "Fitness Challenge", status: "active" as const },
          { name: "Back to School", status: "error" as const },
        ].map((campaign) => (
          <li
            key={campaign.name}
            className="flex items-center justify-between px-4 py-2.5"
          >
            <span className="text-sm text-foreground">{campaign.name}</span>
            <StatusDot status={campaign.status} />
          </li>
        ))}
      </ul>
    </div>
  ),
}

/**
 * Offer status row — shows status dots alongside offer details in
 * a typical offers table.
 */
export const OfferStatusRow: Story = {
  name: "Real World — Offer Table",
  render: () => (
    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
      <thead className="bg-muted/40">
        <tr>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Offer
          </th>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Discount
          </th>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {[
          { name: "SUMMER10", discount: "10% off", status: "active" as const },
          { name: "WELCOME20", discount: "20% off", status: "active" as const },
          { name: "HOLIDAY15", discount: "15% off", status: "paused" as const },
          { name: "EXPIRED5", discount: "5% off", status: "deactivated" as const },
        ].map((offer) => (
          <tr key={offer.name} className="bg-background">
            <td className="px-4 py-2 font-mono font-medium">{offer.name}</td>
            <td className="px-4 py-2 text-muted-foreground">{offer.discount}</td>
            <td className="px-4 py-2">
              <StatusDot status={offer.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that the correct label text is rendered for each status variant
 * and that the data-status attribute is set correctly.
 */
export const DefaultLabelTest: Story = {
  name: "Test: Default labels render correctly",
  args: { status: "active" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText("Active")
    await expect(label).toBeInTheDocument()
    const dot = canvasElement.querySelector('[data-status="active"]')
    await expect(dot).toBeTruthy()
  },
}

/**
 * Verifies that a custom label overrides the default label, and that
 * `showLabel={false}` hides the text while keeping the dot visible.
 */
export const CustomLabelAndHiddenTest: Story = {
  name: "Test: Custom label & showLabel=false",
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusDot status="active" label="Live Now" />
      <StatusDot status="paused" showLabel={false} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Custom label should be visible
    const customLabel = canvas.getByText("Live Now")
    await expect(customLabel).toBeInTheDocument()
    // Default "Active" label should NOT be present
    const defaultLabel = canvas.queryByText("Active")
    await expect(defaultLabel).toBeNull()
    // "Paused" label should NOT be visible when showLabel=false
    const hiddenLabel = canvas.queryByText("Paused")
    await expect(hiddenLabel).toBeNull()
    // But the dot for paused should still exist in the DOM
    const pausedDot = canvasElement.querySelector('[data-status="paused"]')
    await expect(pausedDot).toBeTruthy()
  },
}

/**
 * Verifies that all four status variants render their corresponding
 * data-status attributes.
 */
export const AllStatusAttributesTest: Story = {
  name: "Test: All data-status attributes present",
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusDot status="active" />
      <StatusDot status="deactivated" />
      <StatusDot status="paused" />
      <StatusDot status="error" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Verify all labels are present
    await expect(canvas.getByText("Active")).toBeInTheDocument()
    await expect(canvas.getByText("Deactivated")).toBeInTheDocument()
    await expect(canvas.getByText("Paused")).toBeInTheDocument()
    await expect(canvas.getByText("Error")).toBeInTheDocument()
    // Verify all data-status attributes
    for (const status of ["active", "deactivated", "paused", "error"]) {
      const el = canvasElement.querySelector(`[data-status="${status}"]`)
      await expect(el).toBeTruthy()
    }
  },
}
