import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ContactsPageHeader } from "@/components/contacts/ContactsPageHeader"
import { ContactsTabs } from "@/components/contacts/ContactsTabs"
import { FilterBar } from "@/components/shared/FilterBar"
import { TableActionBar } from "@/components/shared/TableActionBar"
import { DataTable, type ColumnDef, type ColumnGroup, type SortDirection } from "@/components/shared/DataTable"
import { StatusDot, type StatusVariant } from "@/components/shared/StatusDot"
import { Pagination } from "@/components/shared/Pagination"
import { AppShell } from "@/components/layout/AppShell"

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

function fmt(n: number) {
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
    cell: (row) => <span className="text-sm text-muted-foreground">{row.instagram}</span>,
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

const DATE_OPTIONS = [
  { label: "Last 7 days",    value: "7d" },
  { label: "Last 30 days",   value: "30d" },
  { label: "Last 3 months",  value: "3m" },
  { label: "Last 6 months",  value: "6m" },
  { label: "Last 12 months", value: "12m" },
  { label: "All time",       value: "all" },
]

const QUICK_FILTERS = [
  {
    id: "platform",
    label: "Platform",
    options: [
      { label: "Instagram", value: "instagram" },
      { label: "TikTok",    value: "tiktok" },
      { label: "YouTube",   value: "youtube" },
    ],
  },
  {
    id: "status",
    label: "Status",
    options: [
      { label: "Active",      value: "active" },
      { label: "Paused",      value: "paused" },
      { label: "Deactivated", value: "deactivated" },
    ],
  },
  {
    id: "followers",
    label: "Followers",
    options: [
      { label: "Nano (1K–10K)",   value: "nano" },
      { label: "Micro (10K–100K)", value: "micro" },
      { label: "Macro (100K–1M)", value: "macro" },
      { label: "Mega (1M+)",      value: "mega" },
    ],
  },
]

// ─── Full contacts page component ─────────────────────────────────────────────

function ContactsPageFull() {
  const [page, setPage] = React.useState(1)
  const [view, setView] = React.useState<"grid" | "list">("list")
  const [dateRange, setDateRange] = React.useState("6m")
  const [search, setSearch] = React.useState("")
  const [sortKey, setSortKey] = React.useState("impressions")
  const [sortDir, setSortDir] = React.useState<SortDirection>("desc")
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [tab, setTab] = React.useState<"creators" | "customers" | "talent-manager" | "analytics">("creators")
  const [chips, setChips] = React.useState([
    { id: "status-active", label: "Status: Active" },
  ])

  const filtered = CREATORS.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.instagram.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey as keyof Creator] as number | string
    const bv = b[sortKey as keyof Creator] as number | string
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return sortDir === "asc" ? cmp : -cmp
  })

  function toggleRow(id: string, on: boolean) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (on) next.add(id); else next.delete(id)
      return next
    })
  }

  function toggleAll(on: boolean) {
    setSelected(on ? new Set(sorted.map((c) => c.id)) : new Set())
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ContactsPageHeader onNewCreator={() => alert("New Creator")} />

      <ContactsTabs
        activeTab={tab}
        onTabChange={setTab}
        counts={{ creators: 2451, customers: 184 }}
      >
        <FilterBar
          savedViews={[
            { label: "All Creators",    value: "all" },
            { label: "Top Performers",  value: "top" },
            { label: "Instagram Only",  value: "ig" },
          ]}
          quickFilters={QUICK_FILTERS}
          appliedFilters={chips.map((c) => ({
            ...c,
            onRemove: () => setChips((prev) => prev.filter((p) => p.id !== c.id)),
          }))}
          onAddFilter={() => alert("Open advanced filter")}
        />

        <TableActionBar
          actions={[
            { label: "Add to Campaign",   onClick: () => alert("Add to Campaign") },
            { label: "Send Message",      onClick: () => alert("Send Message") },
            { label: "Export Selected",   onClick: () => alert("Export") },
            { label: "Deactivate",        onClick: () => alert("Deactivate"), variant: "destructive" },
          ]}
          moreItems={[
            { label: "Import CSV",        onClick: () => alert("Import") },
            { label: "Manage Columns",    onClick: () => alert("Columns") },
            { label: "Clear All Filters", onClick: () => setChips([]) },
          ]}
          searchValue={search}
          onSearchChange={setSearch}
          dateRangeOptions={DATE_OPTIONS}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onExport={() => alert("Export all")}
          onColumnSettings={() => alert("Column settings")}
          view={view}
          onViewChange={setView}
        />

        <div className="flex-1 overflow-auto">
          <DataTable
            data={sorted}
            columns={COLUMNS}
            columnGroups={COLUMN_GROUPS}
            selectedIds={selected}
            onSelectId={toggleRow}
            onSelectAll={toggleAll}
            sortKey={sortKey}
            sortDirection={sortDir}
            onSort={(key, dir) => { setSortKey(key); setSortDir(dir) }}
            rowActionLabel="Add to Campaign"
            onRowAction={(r) => alert(`Add to campaign: ${r.name}`)}
            rowMenuItems={[
              { label: "View Profile",    onClick: (r) => alert(`View: ${r.name}`) },
              { label: "Send Message",    onClick: (r) => alert(`Message: ${r.name}`) },
              { label: "Deactivate",      onClick: (r) => alert(`Deactivate: ${r.name}`), variant: "destructive" },
            ]}
            emptyMessage="No creators match your filters."
          />
        </div>

        <div className="border-t border-border">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(2451 / 50)}
            totalItems={2451}
            pageSize={50}
            onPageChange={setPage}
          />
        </div>
      </ContactsTabs>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

/**
 * # ContactsPage
 *
 * Full CRM contacts page composition with sidebar shell, page header, tab navigation,
 * filter bar, table action bar, sortable data table, and pagination.
 *
 * ## Components Used
 * - `AppShell` -- application layout shell with sidebar
 * - `ContactsPageHeader` -- page title and "New Creator" CTA
 * - `ContactsTabs` -- Creators / Customers / Talent Manager / Analytics tabs
 * - `FilterBar` -- saved views, quick-filter dropdowns, applied-filter chips
 * - `TableActionBar` -- bulk actions, search, date range, view toggle, export
 * - `DataTable` -- sortable, selectable data table with column groups
 * - `StatusDot` -- coloured status indicator per row
 * - `Pagination` -- page navigation footer
 *
 * ## Data Requirements
 * - `Creator[]` -- array of creator objects with id, name, email, instagram handle,
 *   numeric metrics (impressions, engagements, reach, likes, shares, saves), and status
 * - `ColumnDef<Creator>[]` -- column definitions for the DataTable
 * - `ColumnGroup[]` -- grouped column headers (Default Member Data, Social Data)
 * - Filter option arrays for platforms, statuses, and follower tiers
 *
 * ## Customization
 * - Tab set and counts are configurable via `ContactsTabs` props
 * - Column definitions and column groups can be replaced for different data shapes
 * - Quick filter options and saved views are fully swappable
 * - Bulk action buttons in `TableActionBar` are configurable
 * - Date range options can be changed
 * - Page size and total items drive the `Pagination` component
 *
 * ```tsx
 * import { ContactsTabs } from "@/components/contacts/ContactsTabs"
 * ```
 */
const meta = {
  title: "6. Pages/Contacts/ContactsPage",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    activeTab: {
      control: "select",
      options: ["creators", "customers", "talent-manager", "analytics"],
      description: "Currently active tab in the contacts page.",
    },
    counts: {
      control: "object",
      description: "Badge counts displayed next to each tab label.",
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const WithSidebar: Story = {
  render: () => (
    <AppShell
      activeHref="/contacts"
      user={{ name: "Sarah Chen", initials: "SC" }}
      badgeCounts={{ messages: 5 }}
      defaultCollapsed={true}
    >
      <ContactsPageFull />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story: "Full Aspire app frame -- dark sidebar + full contacts page. All interactions work.",
      },
    },
  },
}

export const PageOnly: Story = {
  render: () => (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <ContactsPageFull />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Contacts page without the surrounding sidebar -- useful for isolating the page layout.",
      },
    },
  },
}
