import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  ArrowUpDown,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  Instagram,
  Youtube,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"

/**
 * # Table
 *
 * A set of composable, semantic HTML table primitives with consistent
 * Aspire Design System styling. Built as thin wrappers around native
 * `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`,
 * and `<caption>` elements.
 *
 * ## When to Use
 * - To display structured, tabular data (invoices, user lists, metrics)
 * - For simple read-only data grids without sorting, filtering, or pagination
 * - When you need full control over table markup and behavior
 * - As the foundation for custom table patterns
 *
 * ## When NOT to Use
 * - For feature-rich tables with sorting, filtering, pagination, and row selection
 *   -- use `DataTable` from `@/components/shared/DataTable` instead
 * - For layout purposes -- use CSS Grid or Flexbox
 * - For key-value pairs -- use a description list (`<dl>`)
 * - For single-column lists -- use a List component or simple `<ul>`
 *
 * ## Accessibility
 * - Uses semantic HTML table elements for screen reader support
 * - `TableHead` uses `<th>` with proper scope
 * - `TableCaption` provides a visible accessible name for the table
 * - Hover states on rows use `hover:bg-muted/50` for visual feedback
 * - Selected rows use `data-[state=selected]:bg-muted`
 * - Container has `overflow-x-auto` for responsive horizontal scrolling
 *
 * ## Import
 * ```tsx
 * import {
 *   Table,
 *   TableHeader,
 *   TableBody,
 *   TableFooter,
 *   TableHead,
 *   TableRow,
 *   TableCell,
 *   TableCaption,
 * } from '@/components/ui/table'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Jane Doe</TableCell>
 *       <TableCell>jane@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const meta: Meta<typeof Table> = {
  title: "4. Components/Data Display/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Semantic HTML table primitives with accessible headers, hover states, responsive overflow, and composable cells. For feature-rich tables with sorting/filtering, use DataTable from @/components/shared/DataTable.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description:
        "Additional CSS classes merged via `cn()`. Applied to the `<table>` element.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    children: {
      control: false,
      description:
        "Table content: `TableHeader`, `TableBody`, `TableFooter`, and `TableCaption` elements.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── BASIC VARIANTS ─────────────────────────────────

/**
 * Basic table with a header row and data rows.
 *
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Month</TableHead>
 *       <TableHead>Revenue</TableHead>
 *       <TableHead className="text-right">Growth</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell className="font-medium">January</TableCell>
 *       <TableCell>$12,400</TableCell>
 *       <TableCell className="text-right">+8%</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export const Basic: Story = {
  render: () => (
    <div className="w-[480px] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className="text-right">Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { month: "January", revenue: "$12,400", orders: 89, growth: "+8%" },
            {
              month: "February",
              revenue: "$15,200",
              orders: 112,
              growth: "+22%",
            },
            {
              month: "March",
              revenue: "$18,900",
              orders: 134,
              growth: "+24%",
            },
          ].map((row) => (
            <TableRow key={row.month}>
              <TableCell className="font-medium">{row.month}</TableCell>
              <TableCell>{row.revenue}</TableCell>
              <TableCell>{row.orders}</TableCell>
              <TableCell className="text-right text-emerald-500 font-medium">
                {row.growth}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}

/**
 * Table with a visible caption using `TableCaption`.
 * The caption appears at the bottom and provides accessible context.
 *
 * ```tsx
 * <Table>
 *   <TableCaption>A list of recent invoices.</TableCaption>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 * ```
 */
export const WithCaption: Story = {
  name: "With Caption",
  render: () => (
    <div className="w-[480px] rounded-md border">
      <Table>
        <TableCaption>Q1 2026 Revenue Summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead className="text-right">Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { month: "January", revenue: "$12,400", growth: "+8%" },
            { month: "February", revenue: "$15,200", growth: "+22%" },
            { month: "March", revenue: "$18,900", growth: "+24%" },
          ].map((row) => (
            <TableRow key={row.month}>
              <TableCell className="font-medium">{row.month}</TableCell>
              <TableCell>{row.revenue}</TableCell>
              <TableCell className="text-right">{row.growth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}

/**
 * Table with a footer row using `TableFooter`.
 * Footers have a muted background and are useful for totals or summaries.
 *
 * ```tsx
 * <Table>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 *   <TableFooter>
 *     <TableRow>
 *       <TableCell colSpan={2}>Total</TableCell>
 *       <TableCell className="text-right">$46,500</TableCell>
 *     </TableRow>
 *   </TableFooter>
 * </Table>
 * ```
 */
export const WithFooter: Story = {
  name: "With Footer",
  render: () => {
    const data = [
      { month: "January", revenue: "$12,400", orders: 89 },
      { month: "February", revenue: "$15,200", orders: 112 },
      { month: "March", revenue: "$18,900", orders: 134 },
    ]

    return (
      <div className="w-[480px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right">Orders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.month}>
                <TableCell className="font-medium">{row.month}</TableCell>
                <TableCell>{row.revenue}</TableCell>
                <TableCell className="text-right">{row.orders}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
                Total
              </TableCell>
              <TableCell className="text-right font-semibold">335</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  },
}

/**
 * Striped rows using the `even:bg-muted/50` utility class on TableRow.
 * Improves readability for dense data tables.
 *
 * ```tsx
 * <TableRow className="even:bg-muted/50">
 *   <TableCell>...</TableCell>
 * </TableRow>
 * ```
 */
export const StripedRows: Story = {
  name: "Striped Rows",
  render: () => {
    const data = [
      { id: 1, name: "Product A", category: "Electronics", price: "$299" },
      { id: 2, name: "Product B", category: "Clothing", price: "$49" },
      { id: 3, name: "Product C", category: "Electronics", price: "$199" },
      { id: 4, name: "Product D", category: "Home", price: "$79" },
      { id: 5, name: "Product E", category: "Clothing", price: "$129" },
      { id: 6, name: "Product F", category: "Home", price: "$35" },
    ]

    return (
      <div className="w-[440px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} className="even:bg-muted/50">
                <TableCell className="text-muted-foreground">{row.id}</TableCell>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{row.category}</Badge>
                </TableCell>
                <TableCell className="text-right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
}

/**
 * Table with an actions column using dropdown menus.
 * Each row has a "more" button that opens a contextual menu.
 *
 * ```tsx
 * <TableCell>
 *   <DropdownMenu>
 *     <DropdownMenuTrigger asChild>
 *       <Button variant="ghost" size="icon" className="h-8 w-8">
 *         <MoreHorizontal className="h-4 w-4" />
 *       </Button>
 *     </DropdownMenuTrigger>
 *     <DropdownMenuContent align="end">
 *       <DropdownMenuItem>Edit</DropdownMenuItem>
 *       <DropdownMenuItem>Delete</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 * </TableCell>
 * ```
 */
export const WithActionsColumn: Story = {
  name: "With Actions Column",
  render: () => {
    const users = [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "Designer",
        status: "active" as const,
        initials: "SJ",
      },
      {
        id: 2,
        name: "Mike Chen",
        email: "mike@example.com",
        role: "Engineer",
        status: "active" as const,
        initials: "MC",
      },
      {
        id: 3,
        name: "Alex Rivera",
        email: "alex@example.com",
        role: "Product",
        status: "pending" as const,
        initials: "AR",
      },
      {
        id: 4,
        name: "Emma Wilson",
        email: "emma@example.com",
        role: "Marketing",
        status: "inactive" as const,
        initials: "EW",
      },
    ]

    const statusConfig: Record<
      string,
      { label: string; class?: string; variant?: "outline" | "secondary" }
    > = {
      active: {
        label: "Active",
        class: "bg-emerald-500 hover:bg-emerald-600 text-white",
      },
      pending: { label: "Pending", variant: "outline" },
      inactive: { label: "Inactive", variant: "secondary" },
    }

    return (
      <div className="w-[600px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" />
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const sc = statusConfig[user.status]
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs font-normal">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={sc.variant} className={sc.class}>
                      {sc.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  },
}

/**
 * Responsive table that scrolls horizontally on narrow viewports.
 * The `Table` component wraps content in a container with `overflow-x-auto`.
 *
 * ```tsx
 * <div className="w-[320px]">
 *   <Table>
 *     <!-- Table with many columns will scroll horizontally -->
 *   </Table>
 * </div>
 * ```
 */
export const Responsive: Story = {
  name: "Responsive (Overflow Scroll)",
  render: () => (
    <div className="w-[320px] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            {
              name: "Sarah Johnson",
              email: "sarah@company.com",
              dept: "Design",
              location: "San Francisco",
              salary: "$125,000",
            },
            {
              name: "Mike Chen",
              email: "mike@company.com",
              dept: "Engineering",
              location: "New York",
              salary: "$145,000",
            },
            {
              name: "Alex Rivera",
              email: "alex@company.com",
              dept: "Product",
              location: "Austin",
              salary: "$135,000",
            },
          ].map((row) => (
            <TableRow key={row.name}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.dept}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell className="text-right">{row.salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}

// ─── ASPIRE REAL-WORLD COMPOSITIONS ─────────────────

/**
 * Invoice table with status badges and download actions.
 * A common pattern in the Aspire billing and payments section.
 *
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Invoice</TableHead>
 *       <TableHead>Date</TableHead>
 *       <TableHead>Amount</TableHead>
 *       <TableHead>Status</TableHead>
 *       <TableHead />
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell className="font-medium">INV-001</TableCell>
 *       <TableCell>Jan 5, 2026</TableCell>
 *       <TableCell>$250.00</TableCell>
 *       <TableCell><Badge>paid</Badge></TableCell>
 *       <TableCell><Button>Download</Button></TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export const InvoiceTable: Story = {
  name: "Aspire -- Invoice Table",
  render: () => {
    const invoices = [
      {
        id: "INV-001",
        date: "Jan 5, 2026",
        amount: "$250.00",
        status: "paid" as const,
      },
      {
        id: "INV-002",
        date: "Jan 20, 2026",
        amount: "$180.00",
        status: "paid" as const,
      },
      {
        id: "INV-003",
        date: "Feb 3, 2026",
        amount: "$320.00",
        status: "pending" as const,
      },
      {
        id: "INV-004",
        date: "Feb 15, 2026",
        amount: "$95.00",
        status: "overdue" as const,
      },
    ]

    const statusConfig: Record<
      string,
      { icon: typeof CheckCircle2; class: string }
    > = {
      paid: {
        icon: CheckCircle2,
        class: "bg-emerald-500 hover:bg-emerald-600 text-white",
      },
      pending: {
        icon: Clock,
        class: "border border-border bg-transparent text-foreground",
      },
      overdue: {
        icon: AlertCircle,
        class: "bg-destructive text-destructive-foreground",
      },
    }

    return (
      <div className="w-[520px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => {
              const sc = statusConfig[inv.status]
              const Icon = sc.icon
              return (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {inv.date}
                  </TableCell>
                  <TableCell className="font-medium">{inv.amount}</TableCell>
                  <TableCell>
                    <Badge className={`gap-1 ${sc.class}`}>
                      <Icon className="h-3 w-3" />
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
                Total Outstanding
              </TableCell>
              <TableCell className="font-semibold">$415.00</TableCell>
              <TableCell colSpan={2} />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  },
}

/**
 * Simple creator list table. Displays creator name, platform,
 * follower count, and engagement rate. A lightweight alternative
 * to the full DataTable for simple lists.
 *
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Creator</TableHead>
 *       <TableHead>Platform</TableHead>
 *       <TableHead>Followers</TableHead>
 *       <TableHead>Engagement</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>
 *         <div className="flex items-center gap-2">
 *           <Avatar /><span>Creator Name</span>
 *         </div>
 *       </TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export const CreatorListTable: Story = {
  name: "Aspire -- Simple Creator List",
  render: () => {
    const creators = [
      {
        name: "Emma Rodriguez",
        initials: "ER",
        handle: "@emmarod",
        platform: "Instagram",
        platformIcon: Instagram,
        followers: "245K",
        engagement: "4.8%",
        status: "active" as const,
      },
      {
        name: "Alex Kim",
        initials: "AK",
        handle: "@alexkim",
        platform: "YouTube",
        platformIcon: Youtube,
        followers: "890K",
        engagement: "3.2%",
        status: "active" as const,
      },
      {
        name: "Sarah Chen",
        initials: "SC",
        handle: "@sarahchen",
        platform: "Instagram",
        platformIcon: Instagram,
        followers: "156K",
        engagement: "6.1%",
        status: "pending" as const,
      },
      {
        name: "Jordan Lee",
        initials: "JL",
        handle: "@jordanlee",
        platform: "YouTube",
        platformIcon: Youtube,
        followers: "320K",
        engagement: "5.5%",
        status: "active" as const,
      },
    ]

    return (
      <div className="w-[600px] rounded-md border">
        <Table>
          <TableCaption>Campaign creators -- Summer Glow 2026</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Creator</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="text-right">Followers</TableHead>
              <TableHead className="text-right">Engagement</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creators.map((creator) => {
              const PlatformIcon = creator.platformIcon
              return (
                <TableRow key={creator.name}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {creator.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{creator.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {creator.handle}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <PlatformIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{creator.platform}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {creator.followers}
                  </TableCell>
                  <TableCell className="text-right font-medium text-emerald-600">
                    {creator.engagement}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        creator.status === "active" ? "default" : "outline"
                      }
                      className={
                        creator.status === "active"
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : ""
                      }
                    >
                      {creator.status === "active" ? "Active" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  },
}

/**
 * Payment history table with sortable columns.
 * Demonstrates sortable column headers using state.
 *
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>
 *         <Button variant="ghost" size="sm" onClick={() => toggleSort("date")}>
 *           Date <ArrowUpDown className="h-3.5 w-3.5" />
 *         </Button>
 *       </TableHead>
 *     </TableRow>
 *   </TableHeader>
 * </Table>
 * ```
 */
export const PaymentHistory: Story = {
  name: "Aspire -- Payment History",
  render: () => {
    const payments = [
      {
        id: "PAY-001",
        creator: "Emma Rodriguez",
        initials: "ER",
        campaign: "Summer Glow",
        date: "2026-02-15",
        dateDisplay: "Feb 15, 2026",
        amount: "$2,500",
        method: "Bank Transfer",
        status: "completed" as const,
      },
      {
        id: "PAY-002",
        creator: "Alex Kim",
        initials: "AK",
        campaign: "Holiday Guide",
        date: "2026-02-10",
        dateDisplay: "Feb 10, 2026",
        amount: "$3,200",
        method: "PayPal",
        status: "completed" as const,
      },
      {
        id: "PAY-003",
        creator: "Sarah Chen",
        initials: "SC",
        campaign: "Summer Glow",
        date: "2026-02-20",
        dateDisplay: "Feb 20, 2026",
        amount: "$1,800",
        method: "Bank Transfer",
        status: "processing" as const,
      },
      {
        id: "PAY-004",
        creator: "Jordan Lee",
        initials: "JL",
        campaign: "Spring Launch",
        date: "2026-02-22",
        dateDisplay: "Feb 22, 2026",
        amount: "$4,100",
        method: "Wire Transfer",
        status: "pending" as const,
      },
    ]

    const statusConfig: Record<string, { label: string; class: string }> = {
      completed: {
        label: "Completed",
        class: "bg-emerald-500 hover:bg-emerald-600 text-white",
      },
      processing: {
        label: "Processing",
        class: "bg-blue-500 hover:bg-blue-600 text-white",
      },
      pending: {
        label: "Pending",
        class: "border border-border bg-transparent text-foreground",
      },
    }

    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

    const sorted = [...payments].sort((a, b) => {
      const cmp = a.date.localeCompare(b.date)
      return sortDir === "asc" ? cmp : -cmp
    })

    return (
      <div className="w-[700px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 gap-1"
                  onClick={() =>
                    setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                  }
                >
                  Date
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((payment) => {
              const sc = statusConfig[payment.status]
              return (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {payment.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">
                          {payment.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {payment.creator}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{payment.campaign}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {payment.dateDisplay}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {payment.amount}
                  </TableCell>
                  <TableCell>
                    <Badge className={sc.class}>{sc.label}</Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="font-semibold">
                Total Payments
              </TableCell>
              <TableCell className="text-right font-semibold">
                $11,600
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  },
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that the table renders correct number of rows and has proper
 * semantic structure with thead and tbody.
 */
export const StructureTest: Story = {
  name: "Test: Table semantic structure",
  render: () => (
    <div className="w-[400px] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>Designer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob</TableCell>
            <TableCell>Engineer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Carol</TableCell>
            <TableCell>Manager</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Should have a table element
    const table = canvas.getByRole("table")
    await expect(table).toBeInTheDocument()

    // Should have correct number of column headers
    const columnHeaders = canvas.getAllByRole("columnheader")
    await expect(columnHeaders.length).toBe(2)
    await expect(columnHeaders[0]).toHaveTextContent("Name")
    await expect(columnHeaders[1]).toHaveTextContent("Role")

    // Should have 3 data rows (exclude header row)
    const rows = canvas.getAllByRole("row")
    // 1 header row + 3 body rows = 4
    await expect(rows.length).toBe(4)

    // Verify cell content
    const cells = canvas.getAllByRole("cell")
    await expect(cells[0]).toHaveTextContent("Alice")
    await expect(cells[1]).toHaveTextContent("Designer")
  },
}

/**
 * Verifies that clicking a sort button in the table header triggers
 * a re-render with updated sort state.
 */
export const SortInteractionTest: Story = {
  name: "Test: Sortable column click",
  render: () => {
    const data = [
      { name: "Charlie", score: 85 },
      { name: "Alice", score: 92 },
      { name: "Bob", score: 78 },
    ]

    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
    const sorted = [...data].sort((a, b) =>
      sortDir === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )

    return (
      <div className="w-[320px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 gap-1"
                  onClick={() =>
                    setSortDir((d) => (d === "asc" ? "desc" : "asc"))
                  }
                >
                  Name
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell className="text-right">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Should initially be sorted ascending (Alice, Bob, Charlie)
    const cells = canvas.getAllByRole("cell")
    await expect(cells[0]).toHaveTextContent("Alice")
    await expect(cells[2]).toHaveTextContent("Bob")
    await expect(cells[4]).toHaveTextContent("Charlie")

    // Click the sort button
    const sortButton = canvas.getByRole("button", { name: /Name/i })
    await userEvent.click(sortButton)

    // After click, should be sorted descending (Charlie, Bob, Alice)
    const updatedCells = canvas.getAllByRole("cell")
    await expect(updatedCells[0]).toHaveTextContent("Charlie")
    await expect(updatedCells[2]).toHaveTextContent("Bob")
    await expect(updatedCells[4]).toHaveTextContent("Alice")
  },
}
