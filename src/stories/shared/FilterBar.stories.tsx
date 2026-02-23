import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import {
  FilterBar,
  type FilterBarProps,
  type QuickFilterDef,
  type AppliedFilterChip,
  type FilterOption,
} from "@/components/shared/FilterBar"

/**
 * # FilterBar
 *
 * A horizontal toolbar that provides saved-view selection, quick-filter
 * dropdowns, an "Add Filter" action, and a row of applied-filter chips.
 * Used across every major list page in the Aspire platform to let users
 * narrow down large data sets quickly.
 *
 * ## When to Use
 * - Above data tables or grids that support server/client-side filtering
 * - When the user needs to switch between saved views (e.g. "All Contacts", "VIPs")
 * - When quick category filters (status, platform, tier) are required
 * - When applied filters should be visible as removable chips
 *
 * ## When NOT to Use
 * - For a simple search field only -- use a standalone Input with a search icon
 * - For date-range pickers as the sole filter -- use a dedicated DateRangePicker
 * - Inside modals or dialogs where space is limited -- prefer inline selects
 * - For sorting controls -- use table header sort toggles instead
 *
 * ## Accessibility
 * - Saved-view dropdown and quick filters use `DropdownMenu` with `RadioGroup`
 *   for single-selection semantics
 * - Applied filter chips have an `aria-label` on the remove button
 *   (e.g. "Remove Status: Active filter")
 * - "Add Filter" button is keyboard-focusable and activatable with Enter / Space
 * - All interactive elements participate in the natural tab order
 *
 * ## Import
 * ```tsx
 * import { FilterBar } from '@/components/shared/FilterBar'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <FilterBar
 *   savedViews={[
 *     { label: "All Contacts", value: "all" },
 *     { label: "VIP Creators", value: "vip" },
 *   ]}
 *   currentSavedView="all"
 *   onSavedViewChange={(viewId) => console.log(viewId)}
 *   quickFilters={[
 *     { id: "status", label: "Status", options: [{ label: "Active", value: "active" }] },
 *   ]}
 *   onAddFilter={() => console.log("add filter")}
 * />
 * ```
 */
const meta: Meta<typeof FilterBar> = {
  title: "4. Components/Tables/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Horizontal filter toolbar with saved views, quick-filter dropdowns, an Add Filter button, and applied-filter chips. Used on Contacts, Campaigns, Offers, and Analytics list pages.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="border rounded-xl overflow-hidden">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    savedViews: {
      description:
        "Array of saved-view options displayed in the saved-views dropdown. Each entry needs a `label` and `value`.",
      control: "object",
      table: {
        type: { summary: "FilterOption[]" },
        defaultValue: { summary: "undefined" },
        category: "Data",
      },
    },
    currentSavedView: {
      description:
        "The `value` of the currently selected saved view. Controls which radio item is highlighted in the dropdown.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Data",
      },
    },
    onSavedViewChange: {
      description:
        "Callback fired when the user selects a different saved view. Receives the new view `value`.",
      table: {
        type: { summary: "(value: string) => void" },
        category: "Events",
      },
    },
    quickFilters: {
      description:
        "Array of quick-filter definitions. Each renders as a dropdown with radio-select options. A selected value highlights the trigger with a tinted border.",
      control: "object",
      table: {
        type: { summary: "QuickFilterDef[]" },
        defaultValue: { summary: "undefined" },
        category: "Data",
      },
    },
    appliedFilters: {
      description:
        "Array of currently applied filter chips shown below the controls row. Each chip has a remove button that calls its `onRemove` handler.",
      control: "object",
      table: {
        type: { summary: "AppliedFilterChip[]" },
        defaultValue: { summary: "undefined" },
        category: "Data",
      },
    },
    onAddFilter: {
      description:
        'Callback fired when the "Add Filter" button is clicked. Typically opens a filter-creation popover or dialog.',
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    className: {
      description: "Additional CSS classes merged via `cn()` utility.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Appearance",
      },
    },
  },
  args: {
    onSavedViewChange: fn(),
    onAddFilter: fn(),
  },
}

export default meta
type Story = StoryObj<typeof FilterBar>

// ─── SAMPLE DATA ─────────────────────────────────

const sampleSavedViews: FilterOption[] = [
  { label: "All Creators", value: "all" },
  { label: "Active This Month", value: "active-month" },
  { label: "High Engagement", value: "high-eng" },
  { label: "Pending Outreach", value: "pending" },
]

const sampleQuickFilters: QuickFilterDef[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Deactivated", value: "deactivated" },
      { label: "Paused", value: "paused" },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    options: [
      { label: "Instagram", value: "instagram" },
      { label: "TikTok", value: "tiktok" },
      { label: "YouTube", value: "youtube" },
    ],
  },
  {
    id: "followers",
    label: "Followers",
    options: [
      { label: "Nano (<10K)", value: "nano" },
      { label: "Micro (10-100K)", value: "micro" },
      { label: "Macro (100K+)", value: "macro" },
    ],
  },
]

const sampleAppliedFilters: AppliedFilterChip[] = [
  { id: "f1", label: "Status: Active", onRemove: fn() },
  { id: "f2", label: "Platform: Instagram", onRemove: fn() },
  { id: "f3", label: "Followers: Macro (100K+)", onRemove: fn() },
]

// ─── CORE STORIES ─────────────────────────────────

/**
 * Empty filter bar with only the "Add Filter" button visible.
 * This is the baseline state before any filters or saved views are configured.
 *
 * ```tsx
 * <FilterBar onAddFilter={() => console.log("add")} />
 * ```
 */
export const Empty: Story = {
  args: {},
  parameters: {
    docs: { description: { story: "Minimal state -- only the '+ Add Filter' button is shown." } },
  },
}

/**
 * Filter bar with a saved-views dropdown. Users can switch between
 * predefined views like "All Creators" and "High Engagement".
 *
 * ```tsx
 * <FilterBar
 *   savedViews={[
 *     { label: "All Creators", value: "all" },
 *     { label: "High Engagement", value: "high-eng" },
 *   ]}
 *   currentSavedView="all"
 *   onSavedViewChange={(v) => console.log(v)}
 * />
 * ```
 */
export const WithSavedViews: Story = {
  name: "With Saved Views",
  args: {
    savedViews: sampleSavedViews,
    currentSavedView: "all",
  },
  parameters: {
    docs: { description: { story: "Saved-views dropdown visible. 'All Creators' is selected." } },
  },
}

/**
 * Saved view set to a non-default option to verify the dropdown label updates.
 *
 * ```tsx
 * <FilterBar
 *   savedViews={savedViews}
 *   currentSavedView="high-eng"
 * />
 * ```
 */
export const SavedViewSelected: Story = {
  name: "Saved View Selected",
  args: {
    savedViews: sampleSavedViews,
    currentSavedView: "high-eng",
  },
  parameters: {
    docs: { description: { story: "'High Engagement' saved view selected -- label updates in the trigger." } },
  },
}

/**
 * Filter bar with quick-filter dropdowns for Status, Platform, and Followers.
 * Quick filters render inline as bordered buttons that highlight when a value
 * is selected.
 *
 * ```tsx
 * <FilterBar
 *   quickFilters={[
 *     { id: "status", label: "Status", options: [...] },
 *     { id: "platform", label: "Platform", options: [...] },
 *   ]}
 * />
 * ```
 */
export const WithQuickFilters: Story = {
  name: "With Quick Filters",
  args: {
    quickFilters: sampleQuickFilters,
  },
  parameters: {
    docs: { description: { story: "Three quick-filter dropdowns without any selected values." } },
  },
}

/**
 * Quick filters with pre-selected values. The selected filters show
 * a primary-tinted border and background.
 *
 * ```tsx
 * <FilterBar
 *   quickFilters={[
 *     { id: "status", label: "Status", options: [...], value: "active" },
 *     { id: "platform", label: "Platform", options: [...], value: "instagram" },
 *   ]}
 * />
 * ```
 */
export const QuickFiltersWithValues: Story = {
  name: "Quick Filters with Selected Values",
  args: {
    quickFilters: [
      {
        id: "status",
        label: "Status",
        options: [
          { label: "Active", value: "active" },
          { label: "Deactivated", value: "deactivated" },
          { label: "Paused", value: "paused" },
        ],
        value: "active",
      },
      {
        id: "platform",
        label: "Platform",
        options: [
          { label: "Instagram", value: "instagram" },
          { label: "TikTok", value: "tiktok" },
          { label: "YouTube", value: "youtube" },
        ],
        value: "instagram",
      },
      {
        id: "followers",
        label: "Followers",
        options: [
          { label: "Nano (<10K)", value: "nano" },
          { label: "Micro (10-100K)", value: "micro" },
          { label: "Macro (100K+)", value: "macro" },
        ],
      },
    ],
  },
  parameters: {
    docs: { description: { story: "Status and Platform have active selections; Followers shows 'Any'." } },
  },
}

/**
 * Filter bar displaying applied-filter chips in a second row.
 * Each chip has a remove button that fires its `onRemove` callback.
 *
 * ```tsx
 * <FilterBar
 *   appliedFilters={[
 *     { id: "1", label: "Status: Active", onRemove: () => {} },
 *     { id: "2", label: "Platform: Instagram", onRemove: () => {} },
 *   ]}
 * />
 * ```
 */
export const WithAppliedFilters: Story = {
  name: "With Applied Filters",
  args: {
    appliedFilters: sampleAppliedFilters,
  },
  parameters: {
    docs: { description: { story: "Three applied filter chips with remove buttons in the second row." } },
  },
}

/**
 * Fully featured filter bar combining saved views, quick filters, and
 * applied filter chips. This is the most common configuration on list pages.
 *
 * ```tsx
 * <FilterBar
 *   savedViews={savedViews}
 *   currentSavedView="all"
 *   onSavedViewChange={handleViewChange}
 *   quickFilters={quickFilters}
 *   appliedFilters={appliedFilters}
 *   onAddFilter={handleAddFilter}
 * />
 * ```
 */
export const FullFeatured: Story = {
  name: "Full Featured",
  args: {
    savedViews: sampleSavedViews,
    currentSavedView: "all",
    quickFilters: sampleQuickFilters,
    appliedFilters: sampleAppliedFilters,
  },
  parameters: {
    docs: { description: { story: "Saved views + quick filters + applied chips -- the typical production layout." } },
  },
}

// ─── ASPIRE REAL-WORLD EXAMPLES ──────────────────

/**
 * Contacts page filter bar. Shows saved views for contact segments,
 * quick filters for status and platform, and one applied chip.
 *
 * ```tsx
 * <FilterBar
 *   savedViews={contactViews}
 *   currentSavedView="all"
 *   quickFilters={contactFilters}
 *   appliedFilters={activeChips}
 *   onAddFilter={() => openFilterDialog()}
 * />
 * ```
 */
export const ContactsFilterBar: Story = {
  name: "Real World -- Contacts Filter Bar",
  args: {
    savedViews: [
      { label: "All Contacts", value: "all" },
      { label: "VIP Creators", value: "vip" },
      { label: "Needs Follow-up", value: "followup" },
      { label: "New This Week", value: "new" },
    ],
    currentSavedView: "all",
    quickFilters: [
      {
        id: "status",
        label: "Status",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Blacklisted", value: "blacklisted" },
        ],
        value: "active",
      },
      {
        id: "platform",
        label: "Platform",
        options: [
          { label: "Instagram", value: "instagram" },
          { label: "TikTok", value: "tiktok" },
          { label: "YouTube", value: "youtube" },
          { label: "Twitter/X", value: "twitter" },
        ],
      },
      {
        id: "tier",
        label: "Tier",
        options: [
          { label: "Nano (1K-10K)", value: "nano" },
          { label: "Micro (10K-50K)", value: "micro" },
          { label: "Mid (50K-500K)", value: "mid" },
          { label: "Macro (500K+)", value: "macro" },
        ],
      },
    ],
    appliedFilters: [{ id: "1", label: "Status: Active", onRemove: fn() }],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Contacts list filter bar with segment saved views, creator-status/platform/tier quick filters, and one applied chip.",
      },
    },
  },
}

/**
 * Campaigns page filter bar. Saved views group campaigns by lifecycle
 * stage, with quick filters for campaign type and platform.
 *
 * ```tsx
 * <FilterBar
 *   savedViews={campaignViews}
 *   currentSavedView="active"
 *   quickFilters={campaignFilters}
 *   onAddFilter={() => openCampaignFilterDialog()}
 * />
 * ```
 */
export const CampaignsFilterBar: Story = {
  name: "Real World -- Campaigns Filter",
  args: {
    savedViews: [
      { label: "All Campaigns", value: "all" },
      { label: "Active", value: "active" },
      { label: "Draft", value: "draft" },
      { label: "Completed", value: "completed" },
    ],
    currentSavedView: "active",
    quickFilters: [
      {
        id: "type",
        label: "Type",
        options: [
          { label: "Gifting", value: "gifting" },
          { label: "Sponsored", value: "sponsored" },
          { label: "Affiliate", value: "affiliate" },
          { label: "Ambassador", value: "ambassador" },
        ],
      },
      {
        id: "platform",
        label: "Platform",
        options: [
          { label: "Instagram", value: "instagram" },
          { label: "TikTok", value: "tiktok" },
          { label: "YouTube", value: "youtube" },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Campaign list filter bar with lifecycle-stage saved views and campaign-type/platform quick filters.",
      },
    },
  },
}

/**
 * Offers page filter bar with status, discount-type quick filters, and
 * two applied filter chips.
 *
 * ```tsx
 * <FilterBar
 *   savedViews={offerViews}
 *   currentSavedView="all"
 *   quickFilters={offerFilters}
 *   appliedFilters={offerChips}
 * />
 * ```
 */
export const OffersFilterBar: Story = {
  name: "Real World -- Offers Filter",
  args: {
    savedViews: [
      { label: "All Offers", value: "all" },
      { label: "Active Offers", value: "active" },
      { label: "Expired", value: "expired" },
    ],
    currentSavedView: "all",
    quickFilters: [
      {
        id: "status",
        label: "Status",
        options: [
          { label: "Active", value: "active" },
          { label: "Paused", value: "paused" },
          { label: "Expired", value: "expired" },
        ],
      },
      {
        id: "discountType",
        label: "Discount Type",
        options: [
          { label: "Percentage", value: "percentage" },
          { label: "Fixed Amount", value: "fixed" },
          { label: "Free Shipping", value: "shipping" },
        ],
      },
    ],
    appliedFilters: [
      { id: "1", label: "Status: Active", onRemove: fn() },
      { id: "2", label: "Discount Type: Percentage", onRemove: fn() },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Offers list filter bar with offer-status and discount-type filters, plus two applied chips.",
      },
    },
  },
}

// ─── ALL VARIANTS GALLERY ────────────────────────

/** Side-by-side comparison of empty, saved-views-only, quick-filters, and full-featured states. */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Empty
        </p>
        <div className="rounded-xl border overflow-hidden">
          <FilterBar onAddFilter={fn()} />
        </div>
      </div>
      <div>
        <p className="mb-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          With Saved Views Only
        </p>
        <div className="rounded-xl border overflow-hidden">
          <FilterBar
            savedViews={sampleSavedViews}
            currentSavedView="all"
            onSavedViewChange={fn()}
            onAddFilter={fn()}
          />
        </div>
      </div>
      <div>
        <p className="mb-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          With Quick Filters Only
        </p>
        <div className="rounded-xl border overflow-hidden">
          <FilterBar quickFilters={sampleQuickFilters} onAddFilter={fn()} />
        </div>
      </div>
      <div>
        <p className="mb-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Full Featured
        </p>
        <div className="rounded-xl border overflow-hidden">
          <FilterBar
            savedViews={sampleSavedViews}
            currentSavedView="high-eng"
            onSavedViewChange={fn()}
            quickFilters={sampleQuickFilters}
            appliedFilters={sampleAppliedFilters}
            onAddFilter={fn()}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gallery showing the four main configurations side by side.",
      },
    },
  },
}

// ─── INTERACTION TESTS ───────────────────────────

/**
 * Verifies clicking "Add Filter" fires the `onAddFilter` callback exactly once.
 */
export const AddFilterClickTest: Story = {
  name: "Test: Add Filter Click",
  args: {
    quickFilters: sampleQuickFilters,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const addButton = canvas.getByRole("button", { name: /add filter/i })
    await userEvent.click(addButton)
    await expect(args.onAddFilter).toHaveBeenCalledTimes(1)
  },
}

/**
 * Verifies clicking the remove button on an applied filter chip fires
 * the chip's `onRemove` callback.
 */
export const RemoveFilterChipTest: Story = {
  name: "Test: Remove Applied Filter Chip",
  args: {
    appliedFilters: [
      { id: "chip-test", label: "Status: Active", onRemove: fn() },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const removeButton = canvas.getByRole("button", {
      name: /remove status: active filter/i,
    })
    await userEvent.click(removeButton)
    await expect(args.appliedFilters![0].onRemove).toHaveBeenCalledTimes(1)
  },
}
