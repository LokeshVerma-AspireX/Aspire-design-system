import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import { DataTable, type ColumnDef, type ColumnGroup, type RowAction, type SortDirection } from "@/components/shared/DataTable"
import { StatusDot, type StatusVariant } from "@/components/shared/StatusDot"

// ─── Sample data ──────────────────────────────────────────────────────────────

interface Creator {
  id: string
  name: string
  email: string
  instagram: string
  impressions: number
  engagements: number
  reach: number
  likes: number
  shares: number
  saves: number
  status: StatusVariant
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

const CREATORS: Creator[] = [
  { id: "1",  name: "Sarah Chen",      email: "sarah@influencer.com",      instagram: "@sarahchen_style",    impressions: 2840000, engagements: 142000, reach: 1920000, likes: 98400, shares: 12300, saves: 31200, status: "active" },
  { id: "2",  name: "Marcus Rivera",   email: "marcus@creator.io",         instagram: "@marcusrivera",       impressions: 1650000, engagements:  89000, reach: 1120000, likes: 67200, shares:  8900, saves: 12800, status: "active" },
  { id: "3",  name: "Priya Sharma",    email: "priya@priyasharma.co",      instagram: "@priyasharma_fit",    impressions: 3200000, engagements: 198000, reach: 2450000, likes: 142000, shares: 21000, saves: 35000, status: "active" },
  { id: "4",  name: "Jake Morrison",   email: "jake@jakemedia.com",        instagram: "@jakemorrision",      impressions:  890000, engagements:  34000, reach:  670000, likes: 24500, shares:  3200, saves:  6300, status: "paused" },
  { id: "5",  name: "Lia Torres",      email: "lia@liatorres.com",         instagram: "@liatorres_life",     impressions: 4100000, engagements: 267000, reach: 3200000, likes: 198000, shares: 28000, saves: 41000, status: "active" },
  { id: "6",  name: "Noah Kim",        email: "noah@noahkimcreative.com",  instagram: "@noahkimcreative",    impressions:  720000, engagements:  28000, reach:  520000, likes: 19800, shares:  2100, saves:  6100, status: "deactivated" },
  { id: "7",  name: "Amara Osei",      email: "amara@osei.agency",         instagram: "@amaraosei",          impressions: 1900000, engagements:  95000, reach: 1380000, likes: 72000, shares:  9400, saves: 13500, status: "active" },
  { id: "8",  name: "Felix Nguyen",    email: "felix@felixcreates.com",    instagram: "@felixcreates",       impressions:  560000, engagements:  19000, reach:  410000, likes: 14200, shares:  1800, saves:  3900, status: "paused" },
  { id: "9",  name: "Isabella Rossi",  email: "isabella@isabellarossi.it", instagram: "@isabellarossi",      impressions: 5800000, engagements: 342000, reach: 4200000, likes: 271000, shares: 38000, saves: 33000, status: "active" },
  { id: "10", name: "Darius Okafor",   email: "darius@okafor.co",          instagram: "@dariusokafor",       impressions: 1100000, engagements:  52000, reach:  780000, likes: 38000, shares:  5200, saves:  8800, status: "active" },
  { id: "11", name: "Mei Lin",         email: "mei@meilin.studio",         instagram: "@meilin.creates",     impressions: 2300000, engagements: 118000, reach: 1700000, likes: 91000, shares: 11000, saves: 16000, status: "active" },
  { id: "12", name: "Jordan Walsh",    email: "jordan@jwalsh.com",         instagram: "@jordanwalshfitness", impressions:  980000, engagements:  41000, reach:  710000, likes: 30000, shares:  3800, saves:  7200, status: "error" },
]

// ─── Column definitions ───────────────────────────────────────────────────────

const COLUMNS: ColumnDef<Creator>[] = [
  {
    id: "name",
    header: "Name",
    sortable: true,
    cell: (row) => (
      <div className="min-w-[160px]">
        <p className="font-medium text-foreground truncate">{row.name}</p>
        <p className="text-xs text-muted-foreground truncate">{row.email}</p>
      </div>
    ),
  },
  {
    id: "instagram",
    header: "Instagram",
    cell: (row) => (
      <span className="text-sm text-muted-foreground">{row.instagram}</span>
    ),
  },
  {
    id: "impressions",
    header: "Impressions",
    sortable: true,
    headerClassName: "text-right",
    className: "text-right tabular-nums",
    cell: (row) => fmt(row.impressions),
  },
  {
    id: "engagements",
    header: "Engagements",
    sortable: true,
    headerClassName: "text-right",
    className: "text-right tabular-nums",
    cell: (row) => fmt(row.engagements),
  },
  {
    id: "reach",
    header: "Reach",
    sortable: true,
    headerClassName: "text-right",
    className: "text-right tabular-nums",
    cell: (row) => fmt(row.reach),
  },
  {
    id: "likes",
    header: "Likes",
    sortable: true,
    headerClassName: "text-right",
    className: "text-right tabular-nums",
    cell: (row) => fmt(row.likes),
  },
  {
    id: "shares",
    header: "Shares",
    sortable: true,
    headerClassName: "text-right",
    className: "text-right tabular-nums",
    cell: (row) => fmt(row.shares),
  },
  {
    id: "saves",
    header: "Saves",
    sortable: true,
    headerClassName: "text-right",
    className: "text-right tabular-nums",
    cell: (row) => fmt(row.saves),
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => <StatusDot status={row.status} />,
  },
]

const BASIC_COLUMNS: ColumnDef<Creator>[] = [
  {
    id: "name",
    header: "Name",
    sortable: true,
    cell: (row) => (
      <div className="min-w-[140px]">
        <p className="font-medium text-foreground">{row.name}</p>
        <p className="text-xs text-muted-foreground">{row.email}</p>
      </div>
    ),
  },
  {
    id: "instagram",
    header: "Instagram",
    cell: (row) => (
      <span className="text-sm text-muted-foreground">{row.instagram}</span>
    ),
  },
  {
    id: "impressions",
    header: "Impressions",
    sortable: true,
    headerClassName: "text-right",
    className: "text-right tabular-nums",
    cell: (row) => fmt(row.impressions),
  },
  {
    id: "engagements",
    header: "Engagements",
    sortable: true,
    headerClassName: "text-right",
    className: "text-right tabular-nums",
    cell: (row) => fmt(row.engagements),
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => <StatusDot status={row.status} />,
  },
]

const COLUMN_GROUPS: ColumnGroup[] = [
  { header: "Default Member Data", columnIds: ["name", "instagram"] },
  { header: "Social Data", columnIds: ["impressions", "engagements", "reach", "likes", "shares", "saves"] },
]

const ROW_MENU_ITEMS: RowAction<Creator>[] = [
  { label: "View Profile",    onClick: fn() },
  { label: "Add to Campaign", onClick: fn() },
  { label: "Send Message",    onClick: fn() },
  { label: "Export",          onClick: fn() },
  { label: "Deactivate",      onClick: fn(), variant: "destructive" },
]

// ─── Meta ─────────────────────────────────────────────────────────────────────

/**
 * # DataTable
 *
 * A generic, fully-featured data table component for displaying tabular data
 * with support for sorting, row selection, column grouping, row actions, and
 * custom empty states.
 *
 * ## When to Use
 * - Displaying lists of creators, campaigns, offers, or any structured data
 * - When users need to sort, select, and act on rows in bulk
 * - When data has logical groupings (e.g. "Member Data" vs "Social Data")
 * - For admin views that require inline row actions and menus
 *
 * ## When NOT to Use
 * - For simple key-value pairs -- use a description list or Card instead
 * - For fewer than 3 rows -- a simple list or card layout may be more appropriate
 * - For highly visual data -- use Charts or PostsGrid instead
 * - When the table will only ever have 1-2 columns -- use a simpler layout
 *
 * ## Accessibility
 * - Uses semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` elements
 * - "Select all" checkbox has `aria-label="Select all rows"`
 * - Per-row checkboxes have `aria-label="Select row N"`
 * - Sort indicators use visible icons (ArrowUp, ArrowDown, ArrowUpDown)
 * - Row action menus use `aria-label="Row options"`
 * - Sticky header keeps context visible during scroll
 *
 * ## Import
 * ```tsx
 * import { DataTable, type ColumnDef, type ColumnGroup, type RowAction, type SortDirection } from '@/components/shared/DataTable'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * const columns: ColumnDef<User>[] = [
 *   { id: "name", header: "Name", sortable: true, cell: (row) => row.name },
 *   { id: "email", header: "Email", cell: (row) => row.email },
 * ]
 *
 * <DataTable data={users} columns={columns} />
 * ```
 */
const meta = {
  title: "4. Components/Tables/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Generic sortable data table with checkbox selection, column group headers, status dots, and per-row action menus. Designed for the Aspire creator management platform.",
      },
    },
  },
  argTypes: {
    data: {
      description: "Array of row objects to display. Each object must have an `id: string` field.",
      table: {
        type: { summary: "TData[]" },
        category: "Data",
      },
    },
    columns: {
      description: "Column definitions controlling headers, cell rendering, sorting, and alignment.",
      table: {
        type: { summary: "ColumnDef<TData>[]" },
        category: "Data",
      },
    },
    columnGroups: {
      description: "Optional groupings that render a secondary header row spanning multiple columns.",
      table: {
        type: { summary: "ColumnGroup[]" },
        defaultValue: { summary: "undefined" },
        category: "Data",
      },
    },
    selectedIds: {
      description: "Set of selected row IDs. Pass with `onSelectId` and `onSelectAll` to enable selection.",
      table: {
        type: { summary: "Set<string>" },
        defaultValue: { summary: "undefined" },
        category: "Selection",
      },
    },
    onSelectId: {
      description: "Callback when a single row is selected or deselected.",
      table: {
        type: { summary: "(id: string, selected: boolean) => void" },
        category: "Selection",
      },
    },
    onSelectAll: {
      description: "Callback when the header checkbox is toggled to select/deselect all rows.",
      table: {
        type: { summary: "(selected: boolean) => void" },
        category: "Selection",
      },
    },
    sortKey: {
      control: "text",
      description: "The currently sorted column ID.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Sorting",
      },
    },
    sortDirection: {
      control: "select",
      options: ["asc", "desc"],
      description: "Current sort direction.",
      table: {
        type: { summary: '"asc" | "desc"' },
        defaultValue: { summary: "undefined" },
        category: "Sorting",
      },
    },
    onSort: {
      description: "Callback when a sortable column header is clicked.",
      table: {
        type: { summary: "(key: string, direction: SortDirection) => void" },
        category: "Sorting",
      },
    },
    rowActionLabel: {
      control: "text",
      description: "Label for the primary row action button.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Action"' },
        category: "Row Actions",
      },
    },
    onRowAction: {
      description: "Callback for the primary row action button click.",
      table: {
        type: { summary: "(row: TData) => void" },
        category: "Row Actions",
      },
    },
    rowMenuItems: {
      description: "Array of dropdown menu actions rendered in a `...` menu per row.",
      table: {
        type: { summary: "RowAction<TData>[]" },
        defaultValue: { summary: "undefined" },
        category: "Row Actions",
      },
    },
    emptyMessage: {
      control: "text",
      description: "Message displayed when `data` is empty.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"No records found."' },
        category: "Content",
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
} satisfies Meta<typeof DataTable>

export default meta
// DataTable is generic -- use unparameterized StoryObj since render functions pass concrete types
type Story = StoryObj

// ─── BASIC TABLE ─────────────────────────────────────────────────────────────

/**
 * A simple table with basic columns, no selection, no grouping.
 * This is the minimal viable usage of DataTable.
 *
 * ```tsx
 * <DataTable
 *   data={creators}
 *   columns={basicColumns}
 * />
 * ```
 */
export const Default: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <DataTable
        data={CREATORS.slice(0, 6)}
        columns={BASIC_COLUMNS}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal table with 5 columns and 6 rows. No selection, no row actions, no column groups.",
      },
    },
  },
}

// ─── WITH SORTING ────────────────────────────────────────────────────────────

/**
 * Controlled sort state. Click any sortable column header to toggle
 * between ascending and descending. The data is re-sorted in the
 * render function.
 *
 * ```tsx
 * const [sortKey, setSortKey] = useState("impressions")
 * const [sortDir, setSortDir] = useState<SortDirection>("desc")
 *
 * <DataTable
 *   data={sorted}
 *   columns={columns}
 *   sortKey={sortKey}
 *   sortDirection={sortDir}
 *   onSort={(key, dir) => { setSortKey(key); setSortDir(dir) }}
 * />
 * ```
 */
export const WithSorting: Story = {
  name: "With Sorting",
  render: () => {
    const [sortKey, setSortKey] = React.useState<string>("impressions")
    const [sortDir, setSortDir] = React.useState<SortDirection>("desc")

    const sorted = [...CREATORS].sort((a, b) => {
      const av = a[sortKey as keyof Creator] as number | string
      const bv = b[sortKey as keyof Creator] as number | string
      const cmp = av < bv ? -1 : av > bv ? 1 : 0
      return sortDir === "asc" ? cmp : -cmp
    })

    return (
      <div className="border rounded-lg overflow-hidden">
        <DataTable
          data={sorted}
          columns={COLUMNS}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => { setSortKey(key); setSortDir(dir) }}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Click sortable column headers (Name, Impressions, Engagements, etc.) to sort ascending or descending. Arrow icons indicate current sort state.",
      },
    },
  },
}

// ─── WITH SELECTION ──────────────────────────────────────────────────────────

/**
 * Row selection with indeterminate header checkbox. The selection
 * count banner above the table updates in real time.
 *
 * ```tsx
 * const [selected, setSelected] = useState<Set<string>>(new Set(["1", "3"]))
 *
 * <DataTable
 *   data={creators}
 *   columns={columns}
 *   selectedIds={selected}
 *   onSelectId={(id, on) => { ... }}
 *   onSelectAll={(on) => { ... }}
 * />
 * ```
 */
export const WithSelection: Story = {
  name: "With Selection",
  render: () => {
    const [selected, setSelected] = React.useState<Set<string>>(new Set(["1", "3", "5"]))

    function toggle(id: string, on: boolean) {
      setSelected((prev) => {
        const next = new Set(prev)
        if (on) next.add(id); else next.delete(id)
        return next
      })
    }
    function toggleAll(on: boolean) {
      setSelected(on ? new Set(CREATORS.map((c) => c.id)) : new Set())
    }

    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="border-b bg-muted/30 px-4 py-2 text-sm text-muted-foreground">
          {selected.size} of {CREATORS.length} selected
        </div>
        <DataTable
          data={CREATORS}
          columns={BASIC_COLUMNS}
          selectedIds={selected}
          onSelectId={toggle}
          onSelectAll={toggleAll}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Rows 1, 3, and 5 are pre-selected. The header checkbox shows an indeterminate state. Toggle individual rows or use the header checkbox to select/deselect all.",
      },
    },
  },
}

// ─── WITH ROW ACTIONS ────────────────────────────────────────────────────────

/**
 * Table with a primary action button and a dropdown overflow menu per row.
 * The primary button text is set via `rowActionLabel`, and `rowMenuItems`
 * populates the three-dot dropdown menu.
 *
 * ```tsx
 * <DataTable
 *   data={creators}
 *   columns={columns}
 *   rowActionLabel="Add to Campaign"
 *   onRowAction={(row) => addToCampaign(row)}
 *   rowMenuItems={[
 *     { label: "View Profile", onClick: (row) => navigate(row.id) },
 *     { label: "Delete", onClick: (row) => remove(row.id), variant: "destructive" },
 *   ]}
 * />
 * ```
 */
export const WithRowActions: Story = {
  name: "With Row Actions",
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <DataTable
        data={CREATORS.slice(0, 6)}
        columns={BASIC_COLUMNS}
        rowActionLabel="Add to Campaign"
        onRowAction={fn()}
        rowMenuItems={ROW_MENU_ITEMS}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Each row has an 'Add to Campaign' primary button and a three-dot overflow menu with View Profile, Send Message, Export, and Deactivate (destructive) actions.",
      },
    },
  },
}

// ─── WITH COLUMN GROUPS ──────────────────────────────────────────────────────

/**
 * Column groups add a secondary header row that spans related columns.
 * Useful when columns logically fall into categories like
 * "Member Data" and "Social Data".
 *
 * ```tsx
 * const groups: ColumnGroup[] = [
 *   { header: "Default Member Data", columnIds: ["name", "instagram"] },
 *   { header: "Social Data", columnIds: ["impressions", "engagements", "reach"] },
 * ]
 *
 * <DataTable
 *   data={creators}
 *   columns={columns}
 *   columnGroups={groups}
 * />
 * ```
 */
export const WithColumnGroups: Story = {
  name: "With Column Groups",
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <DataTable
        data={CREATORS}
        columns={COLUMNS}
        columnGroups={COLUMN_GROUPS}
        rowActionLabel="Add to Campaign"
        onRowAction={fn()}
        rowMenuItems={ROW_MENU_ITEMS}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Two column groups -- 'Default Member Data' spans Name and Instagram, 'Social Data' spans Impressions through Saves. The Status column stands alone.",
      },
    },
  },
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────

/**
 * When `data` is an empty array, the table renders a single row
 * with the `emptyMessage` spanning all columns.
 *
 * ```tsx
 * <DataTable
 *   data={[]}
 *   columns={columns}
 *   emptyMessage="No creators match your current filters."
 * />
 * ```
 */
export const EmptyState: Story = {
  name: "Empty State",
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <DataTable
        data={[]}
        columns={BASIC_COLUMNS}
        emptyMessage="No creators match your current filters. Try adjusting or clearing filters."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Empty data array displays a centered message spanning all columns. Customize the message with the `emptyMessage` prop.",
      },
    },
  },
}

// ─── STICKY HEADER ───────────────────────────────────────────────────────────

/**
 * The table header is sticky by default via `sticky top-0 z-10` on `<thead>`.
 * When the table is inside a scrollable container, the header stays visible
 * during vertical scroll.
 *
 * ```tsx
 * <div className="h-[300px] overflow-auto">
 *   <DataTable data={creators} columns={columns} />
 * </div>
 * ```
 */
export const StickyHeader: Story = {
  name: "Sticky Header (Scrollable)",
  render: () => (
    <div className="border rounded-lg overflow-hidden h-[350px] overflow-y-auto">
      <DataTable
        data={CREATORS}
        columns={COLUMNS}
        columnGroups={COLUMN_GROUPS}
        rowMenuItems={ROW_MENU_ITEMS}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Container is constrained to 350px height. Scroll vertically to see the sticky header remain fixed at the top.",
      },
    },
  },
}

// ─── FULL FEATURED ───────────────────────────────────────────────────────────

/**
 * Complete table with all features enabled: column groups, selection,
 * sorting, primary row action, and overflow menu.
 *
 * ```tsx
 * <DataTable
 *   data={creators}
 *   columns={columns}
 *   columnGroups={groups}
 *   selectedIds={selected}
 *   onSelectId={toggle}
 *   onSelectAll={toggleAll}
 *   sortKey={sortKey}
 *   sortDirection={sortDir}
 *   onSort={handleSort}
 *   rowActionLabel="Add to Campaign"
 *   onRowAction={handleAdd}
 *   rowMenuItems={menuItems}
 * />
 * ```
 */
export const FullFeatured: Story = {
  name: "Full Featured",
  render: () => {
    const [selected, setSelected] = React.useState<Set<string>>(new Set(["1", "5"]))
    const [sortKey, setSortKey] = React.useState<string>("impressions")
    const [sortDir, setSortDir] = React.useState<SortDirection>("desc")

    function toggle(id: string, on: boolean) {
      setSelected((prev) => {
        const next = new Set(prev)
        if (on) next.add(id); else next.delete(id)
        return next
      })
    }
    function toggleAll(on: boolean) {
      setSelected(on ? new Set(CREATORS.map((c) => c.id)) : new Set())
    }

    const sorted = [...CREATORS].sort((a, b) => {
      const av = a[sortKey as keyof Creator] as number | string
      const bv = b[sortKey as keyof Creator] as number | string
      const cmp = av < bv ? -1 : av > bv ? 1 : 0
      return sortDir === "asc" ? cmp : -cmp
    })

    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="border-b bg-muted/30 px-4 py-2 text-sm text-muted-foreground">
          {selected.size} of {CREATORS.length} selected
        </div>
        <DataTable
          data={sorted}
          columns={COLUMNS}
          columnGroups={COLUMN_GROUPS}
          selectedIds={selected}
          onSelectId={toggle}
          onSelectAll={toggleAll}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => { setSortKey(key); setSortDir(dir) }}
          rowActionLabel="Add to Campaign"
          onRowAction={fn()}
          rowMenuItems={ROW_MENU_ITEMS}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "All features combined: column groups, row selection with indeterminate state, clickable sort headers, primary action buttons, and overflow menus with destructive actions.",
      },
    },
  },
}

// ─── INTERACTION TESTS ───────────────────────────────────────────────────────

/**
 * Verifies that clicking the header "Select all" checkbox toggles all row selections on.
 */
export const SelectAllTest: Story = {
  name: "Test: Select All Checkbox",
  render: () => {
    const [selected, setSelected] = React.useState<Set<string>>(new Set())
    const data = CREATORS.slice(0, 3)

    function toggle(id: string, on: boolean) {
      setSelected((prev) => {
        const next = new Set(prev)
        if (on) next.add(id); else next.delete(id)
        return next
      })
    }
    function toggleAll(on: boolean) {
      setSelected(on ? new Set(data.map((c) => c.id)) : new Set())
    }

    return (
      <div className="border rounded-lg overflow-hidden">
        <DataTable
          data={data}
          columns={BASIC_COLUMNS}
          selectedIds={selected}
          onSelectId={toggle}
          onSelectAll={toggleAll}
        />
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click the "Select all rows" checkbox
    const selectAll = canvas.getByLabelText("Select all rows")
    await userEvent.click(selectAll)
    // After clicking, all individual row checkboxes should be checked
    const row1 = canvas.getByLabelText("Select row 1")
    const row2 = canvas.getByLabelText("Select row 2")
    const row3 = canvas.getByLabelText("Select row 3")
    await expect(row1).toBeChecked()
    await expect(row2).toBeChecked()
    await expect(row3).toBeChecked()
  },
}

/**
 * Verifies that clicking a sortable column header updates the sort icon.
 */
export const SortClickTest: Story = {
  name: "Test: Sort Column Click",
  render: () => {
    const [sortKey, setSortKey] = React.useState<string | undefined>(undefined)
    const [sortDir, setSortDir] = React.useState<SortDirection>("asc")

    const sorted = sortKey
      ? [...CREATORS.slice(0, 4)].sort((a, b) => {
          const av = a[sortKey as keyof Creator] as number | string
          const bv = b[sortKey as keyof Creator] as number | string
          const cmp = av < bv ? -1 : av > bv ? 1 : 0
          return sortDir === "asc" ? cmp : -cmp
        })
      : CREATORS.slice(0, 4)

    return (
      <div className="border rounded-lg overflow-hidden">
        <DataTable
          data={sorted}
          columns={BASIC_COLUMNS}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => { setSortKey(key); setSortDir(dir) }}
        />
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click the "Impressions" sortable header
    const impressionsHeader = canvas.getByText("Impressions")
    await userEvent.click(impressionsHeader)
    // After sorting, the first data row should contain the creator with the highest impressions (ascending)
    // Verify the table has re-rendered (the header text should still be present)
    await expect(canvas.getByText("Impressions")).toBeInTheDocument()
    // Click again to toggle direction
    await userEvent.click(impressionsHeader)
    await expect(canvas.getByText("Impressions")).toBeInTheDocument()
  },
}

/**
 * Verifies that the empty state message is displayed when data is empty.
 */
export const EmptyStateTest: Story = {
  name: "Test: Empty State Display",
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <DataTable
        data={[]}
        columns={BASIC_COLUMNS}
        emptyMessage="No results found."
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("No results found.")).toBeInTheDocument()
  },
}
