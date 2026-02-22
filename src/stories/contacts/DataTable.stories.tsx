import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { DataTable, type ColumnDef, type ColumnGroup, type SortDirection } from "@/components/shared/DataTable"
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

const COLUMN_GROUPS: ColumnGroup[] = [
  { header: "Default Member Data", columnIds: ["name", "instagram"] },
  { header: "Social Data", columnIds: ["impressions", "engagements", "reach", "likes", "shares", "saves"] },
]

const ROW_MENU_ITEMS = [
  { label: "View Profile",     onClick: (r: Creator) => alert(`View: ${r.name}`) },
  { label: "Add to Campaign",  onClick: (r: Creator) => alert(`Add to campaign: ${r.name}`) },
  { label: "Send Message",     onClick: (r: Creator) => alert(`Message: ${r.name}`) },
  { label: "Export",           onClick: (r: Creator) => alert(`Export: ${r.name}`) },
  { label: "Deactivate",       onClick: (r: Creator) => alert(`Deactivate: ${r.name}`), variant: "destructive" as const },
]

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Contacts/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Generic sortable data table with checkbox selection, column group headers, status dots, and per-row action menus.",
      },
    },
  },
} satisfies Meta<typeof DataTable>

export default meta
// DataTable is generic — use unparameterized StoryObj since render: functions pass concrete types
type Story = StoryObj

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <DataTable
        data={CREATORS}
        columns={COLUMNS}
        columnGroups={COLUMN_GROUPS}
        rowActionLabel="Add to Campaign"
        onRowAction={(r) => alert(`Add: ${r.name}`)}
        rowMenuItems={ROW_MENU_ITEMS}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Full table with column group headers, row actions, and 12 sample creators.",
      },
    },
  },
}

export const WithSelection: Story = {
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
          columns={COLUMNS}
          columnGroups={COLUMN_GROUPS}
          selectedIds={selected}
          onSelectId={toggle}
          onSelectAll={toggleAll}
          rowActionLabel="Add to Campaign"
          onRowAction={(r) => alert(`Add: ${r.name}`)}
          rowMenuItems={ROW_MENU_ITEMS}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Rows 1, 3, and 5 pre-selected. Header checkbox shows indeterminate state.",
      },
    },
  },
}

export const Sortable: Story = {
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
          columnGroups={COLUMN_GROUPS}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => { setSortKey(key); setSortDir(dir) }}
          rowMenuItems={ROW_MENU_ITEMS}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: { story: "Click any sortable column header to sort asc/desc." },
    },
  },
}

export const EmptyState: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <DataTable
        data={[]}
        columns={COLUMNS}
        emptyMessage="No creators match your current filters. Try adjusting or clearing filters."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Empty data — shows the empty state message." },
    },
  },
}

export const NoGroupHeaders: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <DataTable
        data={CREATORS.slice(0, 6)}
        columns={COLUMNS}
        rowMenuItems={ROW_MENU_ITEMS}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Without column group headers — single-row thead layout." },
    },
  },
}
