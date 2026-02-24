import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import { TableActionBar, type ActionItem, type DateRangeOption } from "@/components/shared/TableActionBar"

// ─── Sample data ──────────────────────────────────────────────────────────────

const DATE_RANGE_OPTIONS: DateRangeOption[] = [
  { label: "Last 7 days",  value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Year to date", value: "ytd" },
  { label: "All time",     value: "all" },
]

const CREATOR_ACTIONS: ActionItem[] = [
  { label: "Add to Campaign", onClick: fn() },
  { label: "Send Message",    onClick: fn() },
  { label: "Export Selected",  onClick: fn() },
]

const CAMPAIGN_ACTIONS: ActionItem[] = [
  { label: "Duplicate Campaign", onClick: fn() },
  { label: "Archive Selected",   onClick: fn() },
  { label: "Export Report",      onClick: fn() },
]

const MORE_ITEMS: ActionItem[] = [
  { label: "Bulk Edit",   onClick: fn() },
  { label: "Merge Rows",  onClick: fn() },
  { label: "Archive",     onClick: fn() },
  { label: "Delete",      onClick: fn(), variant: "destructive" },
]

// ─── Meta ─────────────────────────────────────────────────────────────────────

/**
 * # TableActionBar
 *
 * A toolbar component that sits between the FilterBar and DataTable.
 * It provides batch actions, search, export, column configuration,
 * date range selection, and view toggle controls.
 *
 * ## When to Use
 * - Above data tables that need bulk operations (add to campaign, send message, etc.)
 * - When users need to search, filter by date range, or export table data
 * - When toggling between grid and list views is needed
 * - In combination with DataTable for a complete table management UI
 *
 * ## When NOT to Use
 * - For page-level navigation -- use PageHeader or Breadcrumbs instead
 * - For filtering by category/status -- use FilterBar instead
 * - For single-row actions -- use row-level menus in DataTable
 * - When there are no bulk actions or table tools needed
 *
 * ## Accessibility
 * - Search button has `aria-label="Search"` and close button has `aria-label="Close search"`
 * - Export button has `aria-label="Export"`
 * - Column settings button has `aria-label="Column settings"`
 * - More options button has `aria-label="More options"`
 * - ViewToggle uses `role="group"` with `aria-label="View mode"`
 * - All interactive elements are keyboard accessible
 *
 * ## Import
 * ```tsx
 * import { TableActionBar } from '@/components/shared/TableActionBar'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <TableActionBar
 *   actions={[{ label: "Export", onClick: handleExport }]}
 *   onSearchChange={setSearchValue}
 *   onExport={handleExport}
 * />
 * ```
 */
const meta: Meta<typeof TableActionBar> = {
  title: "4. Components/Tables/TableActionBar",
  component: TableActionBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Toolbar between FilterBar and DataTable. Left side: Actions dropdown (black) + overflow menu. Right side: expandable search, export, column settings, date range select, and ViewToggle.",
      },
    },
  },
  argTypes: {
    actions: {
      description: "Primary action items rendered in the left-side 'Actions' dropdown button.",
      table: {
        type: { summary: "ActionItem[]" },
        defaultValue: { summary: "undefined" },
        category: "Actions",
      },
    },
    moreItems: {
      description: "Overflow menu items rendered in a three-dot button next to the Actions dropdown.",
      table: {
        type: { summary: "ActionItem[]" },
        defaultValue: { summary: "undefined" },
        category: "Actions",
      },
    },
    searchValue: {
      control: "text",
      description: "Controlled search input value. Pass alongside `onSearchChange` to enable search.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
        category: "Search",
      },
    },
    onSearchChange: {
      description: "Callback fired when the search input value changes. Presence enables the search icon.",
      table: {
        type: { summary: "(value: string) => void" },
        category: "Search",
      },
    },
    dateRangeOptions: {
      description: "Array of date range options displayed in a Select dropdown.",
      table: {
        type: { summary: "DateRangeOption[]" },
        defaultValue: { summary: "undefined" },
        category: "Date Range",
      },
    },
    dateRange: {
      control: "text",
      description: "Currently selected date range value.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Date Range",
      },
    },
    onDateRangeChange: {
      description: "Callback fired when a different date range is selected.",
      table: {
        type: { summary: "(value: string) => void" },
        category: "Date Range",
      },
    },
    onExport: {
      description: "Callback for the export icon button. Presence enables the export button.",
      table: {
        type: { summary: "() => void" },
        category: "Tools",
      },
    },
    onColumnSettings: {
      description: "Callback for the column settings icon button. Presence enables the button.",
      table: {
        type: { summary: "() => void" },
        category: "Tools",
      },
    },
    view: {
      control: "select",
      options: ["grid", "list"],
      description: "Current view mode. Pass with `onViewChange` to render the ViewToggle.",
      table: {
        type: { summary: '"grid" | "list"' },
        defaultValue: { summary: "undefined" },
        category: "View",
      },
    },
    onViewChange: {
      description: "Callback fired when the view mode toggle is clicked. Presence enables the toggle.",
      table: {
        type: { summary: "(view: ViewMode) => void" },
        category: "View",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the outer wrapper.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    onSearchChange: fn(),
    onExport: fn(),
    onColumnSettings: fn(),
    onDateRangeChange: fn(),
    onViewChange: fn(),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="border rounded-xl overflow-hidden">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

// ─── WITH SEARCH ─────────────────────────────────────────────────────────────

/**
 * Search-only toolbar. Click the search icon to expand the search field.
 * Typing fires `onSearchChange`.
 *
 * ```tsx
 * <TableActionBar
 *   onSearchChange={(value) => setSearch(value)}
 *   onExport={handleExport}
 * />
 * ```
 */
export const WithSearch: Story = {
  name: "With Search",
  args: {
    onSearchChange: fn(),
    onExport: fn(),
    onColumnSettings: undefined,
    onDateRangeChange: undefined,
    dateRangeOptions: undefined,
    onViewChange: undefined,
    actions: undefined,
    moreItems: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Right-side search icon and export button only. Click the magnifying glass to expand the inline search field.",
      },
    },
  },
}

// ─── WITH ACTIONS ────────────────────────────────────────────────────────────

/**
 * Left-side Actions dropdown with a three-dot overflow menu.
 * No right-side tools are enabled.
 *
 * ```tsx
 * <TableActionBar
 *   actions={[
 *     { label: "Add to Campaign", onClick: handleAdd },
 *     { label: "Send Message", onClick: handleMessage },
 *   ]}
 *   moreItems={[
 *     { label: "Delete", onClick: handleDelete, variant: "destructive" },
 *   ]}
 * />
 * ```
 */
export const WithActions: Story = {
  name: "With Actions",
  args: {
    actions: CREATOR_ACTIONS,
    moreItems: MORE_ITEMS,
    onSearchChange: undefined,
    onExport: undefined,
    onColumnSettings: undefined,
    onDateRangeChange: undefined,
    dateRangeOptions: undefined,
    onViewChange: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Left-side only: an 'Actions' dropdown with creator management operations and a three-dot overflow menu with bulk operations and a destructive 'Delete' option.",
      },
    },
  },
}

// ─── WITH DATE RANGE ─────────────────────────────────────────────────────────

/**
 * Date range selector for filtering table data by time period.
 *
 * ```tsx
 * <TableActionBar
 *   actions={actions}
 *   dateRangeOptions={[
 *     { label: "Last 7 days", value: "7d" },
 *     { label: "Last 30 days", value: "30d" },
 *   ]}
 *   dateRange="30d"
 *   onDateRangeChange={(range) => setDateRange(range)}
 * />
 * ```
 */
export const WithDateRange: Story = {
  name: "With Date Range",
  args: {
    actions: CAMPAIGN_ACTIONS,
    dateRangeOptions: DATE_RANGE_OPTIONS,
    dateRange: "30d",
    onDateRangeChange: fn(),
    onSearchChange: undefined,
    onExport: undefined,
    onColumnSettings: undefined,
    onViewChange: undefined,
    moreItems: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Actions dropdown with a date range selector on the right side. Useful for campaign analytics tables where data is filtered by reporting period.",
      },
    },
  },
}

// ─── WITH EXPORT ─────────────────────────────────────────────────────────────

/**
 * Export, column settings, and view toggle on the right side.
 *
 * ```tsx
 * <TableActionBar
 *   onExport={handleExport}
 *   onColumnSettings={handleColumnSettings}
 *   onViewChange={(view) => setViewMode(view)}
 * />
 * ```
 */
export const WithExportAndTools: Story = {
  name: "With Export + Column Settings",
  args: {
    onSearchChange: fn(),
    onExport: fn(),
    onColumnSettings: fn(),
    onViewChange: fn(),
    view: "list",
    actions: undefined,
    moreItems: undefined,
    dateRangeOptions: undefined,
    onDateRangeChange: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Right-side tools: search, export, column settings, and view toggle. No left-side actions. Ideal for read-only analytics tables.",
      },
    },
  },
}

// ─── FULL FEATURED ───────────────────────────────────────────────────────────

/**
 * All features enabled. This is the most common configuration for Aspire
 * creator management tables.
 *
 * ```tsx
 * <TableActionBar
 *   actions={actions}
 *   moreItems={moreItems}
 *   onSearchChange={setSearch}
 *   dateRangeOptions={dateRanges}
 *   dateRange="30d"
 *   onDateRangeChange={setDateRange}
 *   onExport={handleExport}
 *   onColumnSettings={handleColumns}
 *   onViewChange={setView}
 * />
 * ```
 */
export const FullFeatured: Story = {
  name: "Full Featured",
  args: {
    actions: CREATOR_ACTIONS,
    moreItems: MORE_ITEMS,
    onSearchChange: fn(),
    dateRangeOptions: DATE_RANGE_OPTIONS,
    dateRange: "30d",
    onDateRangeChange: fn(),
    onExport: fn(),
    onColumnSettings: fn(),
    onViewChange: fn(),
    view: "list",
  },
  parameters: {
    docs: {
      description: {
        story: "All features enabled: actions dropdown, overflow menu, expandable search, export, column settings, date range selector, and view toggle. Represents a complete creator management toolbar.",
      },
    },
  },
}

// ─── MINIMAL ─────────────────────────────────────────────────────────────────

/**
 * Minimal toolbar with only the Actions dropdown. No right-side tools.
 *
 * ```tsx
 * <TableActionBar actions={[{ label: "Export", onClick: handleExport }]} />
 * ```
 */
export const Minimal: Story = {
  args: {
    actions: [{ label: "Export All", onClick: fn() }],
    onSearchChange: undefined,
    onExport: undefined,
    onColumnSettings: undefined,
    onDateRangeChange: undefined,
    dateRangeOptions: undefined,
    onViewChange: undefined,
    moreItems: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Simplest configuration: a single 'Export All' action in the dropdown. No right-side controls.",
      },
    },
  },
}

// ─── REAL WORLD: CREATORS TABLE TOOLBAR ──────────────────────────────────────

/**
 * Creators management toolbar as used on the Aspire Contacts page.
 * Includes bulk actions for creator management and date-based filtering.
 *
 * ```tsx
 * <TableActionBar
 *   actions={creatorActions}
 *   moreItems={bulkOps}
 *   onSearchChange={setSearch}
 *   onExport={handleExport}
 *   dateRangeOptions={dateRanges}
 *   dateRange="30d"
 *   onDateRangeChange={setRange}
 * />
 * ```
 */
export const CreatorsToolbar: Story = {
  name: "Real World -- Creators Table",
  args: {
    actions: CREATOR_ACTIONS,
    moreItems: MORE_ITEMS,
    onSearchChange: fn(),
    onExport: fn(),
    onColumnSettings: fn(),
    dateRangeOptions: DATE_RANGE_OPTIONS,
    dateRange: "30d",
    onDateRangeChange: fn(),
    onViewChange: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Creators table toolbar from the Aspire Contacts page. Includes 'Add to Campaign', 'Send Message', and 'Export Selected' actions, plus bulk operations in the overflow menu.",
      },
    },
  },
}

/**
 * Campaigns management toolbar with campaign-specific actions and
 * view toggle for grid/list layout.
 */
export const CampaignsToolbar: Story = {
  name: "Real World -- Campaigns Table",
  args: {
    actions: CAMPAIGN_ACTIONS,
    onSearchChange: fn(),
    onExport: fn(),
    onViewChange: fn(),
    view: "grid",
    onColumnSettings: undefined,
    dateRangeOptions: undefined,
    onDateRangeChange: undefined,
    moreItems: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Campaigns table toolbar with 'Duplicate Campaign', 'Archive Selected', and 'Export Report' actions. Includes a view toggle for switching between grid and list layouts.",
      },
    },
  },
}

// ─── INTERACTION TESTS ───────────────────────────────────────────────────────

/**
 * Verifies that clicking the search icon opens the search field
 * and typing fires the onSearchChange callback.
 */
export const SearchInteractionTest: Story = {
  name: "Test: Search Open and Type",
  args: {
    onSearchChange: fn(),
    onExport: fn(),
    actions: undefined,
    moreItems: undefined,
    dateRangeOptions: undefined,
    onDateRangeChange: undefined,
    onColumnSettings: undefined,
    onViewChange: undefined,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // Click the search icon button to open the search field
    const searchButton = canvas.getByLabelText("Search")
    await userEvent.click(searchButton)
    // The search input should now be visible
    const searchInput = canvas.getByPlaceholderText("Search\u2026")
    await expect(searchInput).toBeInTheDocument()
    // Type into the search field
    await userEvent.type(searchInput, "Sarah")
    await expect(args.onSearchChange).toHaveBeenCalled()
  },
}

/**
 * Verifies that the export button fires the onExport callback when clicked.
 */
export const ExportClickTest: Story = {
  name: "Test: Export Button Click",
  args: {
    onExport: fn(),
    onSearchChange: undefined,
    actions: undefined,
    moreItems: undefined,
    dateRangeOptions: undefined,
    onDateRangeChange: undefined,
    onColumnSettings: undefined,
    onViewChange: undefined,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const exportButton = canvas.getByLabelText("Export")
    await userEvent.click(exportButton)
    await expect(args.onExport).toHaveBeenCalledTimes(1)
  },
}
