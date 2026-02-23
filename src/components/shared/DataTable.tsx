"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ─── Types ───────────────────────────────────────────────────────────────────

type SortDirection = "asc" | "desc"

interface ColumnDef<TData> {
  id: string
  header: string
  cell: (row: TData, rowIndex: number) => React.ReactNode
  sortable?: boolean
  /** Extra class applied to <td> */
  className?: string
  /** Extra class applied to the <th> */
  headerClassName?: string
}

interface ColumnGroup {
  /** Visible label shown spanning the grouped columns */
  header: string
  /** IDs of columns that belong to this group (must match ColumnDef.id) */
  columnIds: string[]
}

interface RowAction<TData> {
  label: string
  onClick: (row: TData) => void
  variant?: "default" | "destructive"
}

interface DataTableProps<TData extends { id: string }> {
  data: TData[]
  columns: ColumnDef<TData>[]
  columnGroups?: ColumnGroup[]
  // Selection
  selectedIds?: Set<string>
  onSelectId?: (id: string, selected: boolean) => void
  onSelectAll?: (selected: boolean) => void
  // Sorting
  sortKey?: string
  sortDirection?: SortDirection
  onSort?: (key: string, direction: SortDirection) => void
  // Row actions (rendered as the last sticky column)
  rowActionLabel?: string
  onRowAction?: (row: TData) => void
  rowMenuItems?: RowAction<TData>[]
  // Empty state
  emptyMessage?: string
  className?: string
}

// ─── Sort icon helper ─────────────────────────────────────────────────────────

function SortIcon({ colId, sortKey, sortDirection }: {
  colId: string
  sortKey?: string
  sortDirection?: SortDirection
}) {
  if (sortKey !== colId) return <ArrowUpDown className="size-3 opacity-40" />
  return sortDirection === "asc"
    ? <ArrowUp className="size-3 text-primary" />
    : <ArrowDown className="size-3 text-primary" />
}

// ─── Header builder ───────────────────────────────────────────────────────────

function buildHeaderRows<TData>(
  columns: ColumnDef<TData>[],
  columnGroups: ColumnGroup[] | undefined,
  hasSelection: boolean,
  hasActions: boolean,
  sortKey: string | undefined,
  sortDirection: SortDirection | undefined,
  allSelected: boolean,
  someSelected: boolean,
  onSelectAll: ((selected: boolean) => void) | undefined,
  handleSort: (key: string) => void
): { row1: React.ReactNode[]; row2: React.ReactNode[] } {
  const row1: React.ReactNode[] = []
  const row2: React.ReactNode[] = []

  const thBase = "bg-muted/50 px-3 py-2.5 text-left text-xs font-medium text-muted-foreground"
  const thGroup = "bg-muted/30 px-3 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 border-b border-border"

  // ── Checkbox column (rowSpan=2 when groups present) ──────────────────────
  const checkSpan = columnGroups ? 2 : 1
  row1.push(
    <th
      key="th-select"
      rowSpan={checkSpan}
      scope="col"
      className={cn(thBase, "w-10 text-center")}
    >
      {onSelectAll && (
        <Checkbox
          checked={allSelected ? true : someSelected ? "indeterminate" : false}
          onCheckedChange={(c) => onSelectAll(!!c)}
          aria-label="Select all rows"
        />
      )}
    </th>
  )

  // ── Main columns ──────────────────────────────────────────────────────────
  const seenGroups = new Set<string>()

  for (const col of columns) {
    const group = columnGroups?.find((g) => g.columnIds.includes(col.id))

    if (!columnGroups || !group) {
      // No grouping mode, or column not in any group → single header row (or rowSpan=2)
      const cell = (
        <th
          key={`th-${col.id}`}
          rowSpan={columnGroups ? 2 : 1}
          scope="col"
          className={cn(thBase, col.headerClassName, col.sortable && "cursor-pointer select-none")}
          onClick={col.sortable ? () => handleSort(col.id) : undefined}
        >
          <span className="inline-flex items-center gap-1">
            {col.header}
            {col.sortable && (
              <SortIcon colId={col.id} sortKey={sortKey} sortDirection={sortDirection} />
            )}
          </span>
        </th>
      )
      row1.push(cell)
    } else {
      // Column belongs to a group
      if (!seenGroups.has(group.header)) {
        seenGroups.add(group.header)
        row1.push(
          <th
            key={`th-group-${group.header}`}
            colSpan={group.columnIds.length}
            scope="colgroup"
            className={cn(thGroup, "border-x border-border")}
          >
            {group.header}
          </th>
        )
      }
      // Always add to row2
      row2.push(
        <th
          key={`th-${col.id}`}
          scope="col"
          className={cn(thBase, col.headerClassName, col.sortable && "cursor-pointer select-none")}
          onClick={col.sortable ? () => handleSort(col.id) : undefined}
        >
          <span className="inline-flex items-center gap-1">
            {col.header}
            {col.sortable && (
              <SortIcon colId={col.id} sortKey={sortKey} sortDirection={sortDirection} />
            )}
          </span>
        </th>
      )
    }
  }

  // ── Action column ─────────────────────────────────────────────────────────
  if (hasActions) {
    row1.push(
      <th
        key="th-action"
        rowSpan={columnGroups ? 2 : 1}
        scope="col"
        className={cn(thBase, "w-28 text-right")}
      >
        <span className="sr-only">Actions</span>
      </th>
    )
  }

  return { row1, row2 }
}

// ─── DataTable ────────────────────────────────────────────────────────────────

function DataTable<TData extends { id: string }>({
  data,
  columns,
  columnGroups,
  selectedIds,
  onSelectId,
  onSelectAll,
  sortKey,
  sortDirection,
  onSort,
  rowActionLabel = "Action",
  onRowAction,
  rowMenuItems,
  emptyMessage = "No records found.",
  className,
}: DataTableProps<TData>) {
  const hasSelection = !!(onSelectId || onSelectAll)
  const hasActions = !!(onRowAction || (rowMenuItems && rowMenuItems.length > 0))
  const hasGroupHeaders = columnGroups && columnGroups.length > 0

  const allSelected = data.length > 0 && data.every((r) => selectedIds?.has(r.id))
  const someSelected = !allSelected && data.some((r) => selectedIds?.has(r.id))

  const handleSort = React.useCallback((key: string) => {
    if (!onSort) return
    onSort(key, sortKey === key && sortDirection === "asc" ? "desc" : "asc")
  }, [onSort, sortKey, sortDirection])

  const { row1, row2 } = React.useMemo(
    () => buildHeaderRows(
      columns,
      hasGroupHeaders ? columnGroups : undefined,
      hasSelection,
      hasActions,
      sortKey,
      sortDirection,
      allSelected,
      someSelected,
      onSelectAll,
      handleSort
    ),
    [columns, columnGroups, hasGroupHeaders, hasSelection, hasActions, sortKey, sortDirection, allSelected, someSelected, onSelectAll, handleSort]
  )

  const renderedColumns = React.useMemo(
    () => columns.map((col) => ({ id: col.id, className: col.className, cell: col.cell })),
    [columns]
  )

  const tdBase = "px-3 py-3 text-sm text-foreground"

  return (
    <div
      data-slot="data-table"
      className={cn("w-full overflow-auto", className)}
    >
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 z-10">
          <tr>{row1}</tr>
          {hasGroupHeaders && row2.length > 0 && (
            <tr className="border-b border-border">{row2}</tr>
          )}
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0)}
                className="py-16 text-center text-sm text-muted-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const isSelected = selectedIds?.has(row.id) ?? false
              return (
                <tr
                  key={row.id}
                  data-selected={isSelected || undefined}
                  className={cn(
                    "border-b border-border transition-colors",
                    "hover:bg-muted/40",
                    isSelected && "bg-primary/5"
                  )}
                >
                  {/* Checkbox */}
                  {hasSelection && (
                    <td className={cn(tdBase, "w-10 text-center")}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(c) => onSelectId?.(row.id, !!c)}
                        aria-label={`Select row ${rowIndex + 1}`}
                      />
                    </td>
                  )}

                  {/* Data cells */}
                  {renderedColumns.map((col) => (
                    <td key={col.id} className={cn(tdBase, col.className)}>
                      {col.cell(row, rowIndex)}
                    </td>
                  ))}

                  {/* Action cell */}
                  {hasActions && (
                    <td className={cn(tdBase, "w-28")}>
                      <div className="flex items-center justify-end gap-1">
                        {onRowAction && (
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => onRowAction(row)}
                          >
                            {rowActionLabel}
                          </Button>
                        )}
                        {rowMenuItems && rowMenuItems.length > 0 && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                aria-label="Row options"
                              >
                                <MoreHorizontal className="size-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {rowMenuItems.map((item, i) => (
                                <React.Fragment key={i}>
                                  {i > 0 && item.variant === "destructive" && (
                                    <DropdownMenuSeparator />
                                  )}
                                  <DropdownMenuItem
                                    onClick={() => item.onClick(row)}
                                    variant={item.variant === "destructive" ? "destructive" : "default"}
                                  >
                                    {item.label}
                                  </DropdownMenuItem>
                                </React.Fragment>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

export {
  DataTable,
  type DataTableProps,
  type ColumnDef,
  type ColumnGroup,
  type RowAction,
  type SortDirection,
}
