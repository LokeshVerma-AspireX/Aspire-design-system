"use client"

import * as React from "react"
import { Columns3, MoreHorizontal, Search, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/layout/PageHeader"
import { FilterBar } from "@/components/shared/FilterBar"
import { DataTable, type ColumnDef } from "@/components/shared/DataTable"
import { Pagination } from "@/components/shared/Pagination"
import { StatusDot, type StatusVariant } from "@/components/shared/StatusDot"

// ─── Types ───────────────────────────────────────────────────────────────────

export type OfferStatus = "active" | "paused" | "draft" | "expired"

export interface Offer {
  id: string
  name: string
  imageUrl?: string
  connectedTo?: string
  landingPage: string
  memberCount: number
  status: OfferStatus
}

interface OffersPageProps {
  offers: Offer[]
  /** Selected tab — defaults to "offers" */
  activeTab?: string
  onTabChange?: (tab: string) => void
  // Selection
  selectedIds?: Set<string>
  onSelectId?: (id: string, selected: boolean) => void
  onSelectAll?: (selected: boolean) => void
  // Sorting
  sortKey?: string
  sortDirection?: "asc" | "desc"
  onSort?: (key: string, direction: "asc" | "desc") => void
  // Pagination
  currentPage?: number
  totalPages?: number
  totalItems?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  // Actions
  onCreateOffer?: () => void
  onSendPayment?: () => void
  // Search
  searchValue?: string
  onSearchChange?: (value: string) => void
  // Column settings
  onColumnSettings?: () => void
  className?: string
}

// ─── Status mapping ──────────────────────────────────────────────────────────

const statusToVariant: Record<OfferStatus, StatusVariant> = {
  active: "active",
  paused: "paused",
  draft: "deactivated",
  expired: "error",
}

const statusLabel: Record<OfferStatus, string> = {
  active: "Active",
  paused: "Paused",
  draft: "Draft",
  expired: "Expired",
}

// ─── Column definitions ──────────────────────────────────────────────────────

const columns: ColumnDef<Offer>[] = [
  {
    id: "name",
    header: "Offer",
    sortable: true,
    cell: (row) => (
      <div className="flex items-center gap-3">
        {row.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.imageUrl}
            alt=""
            className="size-10 shrink-0 rounded-md object-cover"
          />
        ) : (
          <div className="size-10 shrink-0 rounded-md bg-muted" />
        )}
        <span className="font-medium text-foreground">{row.name}</span>
      </div>
    ),
  },
  {
    id: "connectedTo",
    header: "Connected to",
    className: "w-[220px]",
    cell: (row) =>
      row.connectedTo ? (
        <span className="inline-flex items-center rounded-md bg-foreground/10 px-3 py-1 text-xs font-medium text-foreground">
          {row.connectedTo}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    id: "landingPage",
    header: "Landing Page",
    cell: (row) => (
      <span className="text-sm text-muted-foreground">{row.landingPage}</span>
    ),
  },
  {
    id: "members",
    header: "Members",
    className: "w-[187px]",
    cell: (row) => (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-3 py-1 text-xs font-medium text-foreground">
        <Users className="size-3" strokeWidth={1.5} />
        {row.memberCount}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    className: "w-[121px]",
    cell: (row) => (
      <StatusDot
        status={statusToVariant[row.status]}
        label={statusLabel[row.status]}
      />
    ),
  },
]

// ─── Filter options ──────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Paused", value: "paused" },
  { label: "Draft", value: "draft" },
  { label: "Expired", value: "expired" },
]

const TYPE_OPTIONS = [
  { label: "Percentage", value: "percentage" },
  { label: "Fixed Amount", value: "fixed" },
  { label: "Free Shipping", value: "free-shipping" },
  { label: "Buy X Get Y", value: "bxgy" },
]

// ─── OffersPage ──────────────────────────────────────────────────────────────

function OffersPage({
  offers,
  activeTab = "offers",
  onTabChange,
  selectedIds,
  onSelectId,
  onSelectAll,
  sortKey,
  sortDirection,
  onSort,
  currentPage = 1,
  totalPages = 3,
  totalItems = 27,
  pageSize = 10,
  onPageChange,
  onCreateOffer,
  onSendPayment,
  searchValue = "",
  onSearchChange,
  onColumnSettings,
  className,
}: OffersPageProps) {
  return (
    <div className={cn("flex h-full flex-col bg-background", className)}>
      {/* ── Page Header ────────────────────────────────────────────────── */}
      <PageHeader title="Offers" showAstra />

      {/* ── Tabs ──────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-4">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="landing-pages">Landing Pages</TabsTrigger>
          </TabsList>
        </Tabs>

       
      </div>

      {/* ── Filter Bar ─────────────────────────────────────────────────── */}
      <FilterBar
        quickFilters={[
          { id: "status", label: "Status", options: STATUS_OPTIONS },
          { id: "type", label: "Type", options: TYPE_OPTIONS },
        ]}
        onAddFilter={() => {}}
      />

      {/* ── Table Card ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="overflow-clip rounded-xl border border-border shadow-sm">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-background px-4 py-2.5">
            {/* Left: primary actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/85"
                onClick={onCreateOffer}
              >
                Create New Offer
              </Button>
              <Button variant="outline" size="sm" onClick={onSendPayment}>
                Send Payment
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                className="opacity-50"
                aria-label="More options"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </div>

            {/* Right: column toggle + search */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Column settings"
                onClick={onColumnSettings}
              >
                <Columns3 className="size-4" />
              </Button>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="Search"
                  className="h-9 w-72 pl-9"
                />
              </div>
            </div>
          </div>

          {/* Data table */}
          <DataTable
            data={offers}
            columns={columns}
            selectedIds={selectedIds}
            onSelectId={onSelectId}
            onSelectAll={onSelectAll}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={onSort}
            emptyMessage="No offers found."
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={onPageChange ?? (() => {})}
            className="border-t border-border"
          />
        </div>
      </div>
    </div>
  )
}

export { OffersPage, type OffersPageProps }
