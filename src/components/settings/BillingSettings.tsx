"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CreditCard,
  Crown,
  Zap,
  Download,
  ChevronRight,
  Check,
  Users,
  FolderOpen,
  BarChart3,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const invoices = [
  { date: "Feb 1, 2026", number: "INV-2026-006", amount: "$299.00", status: "Paid" as const },
  { date: "Jan 1, 2026", number: "INV-2026-005", amount: "$299.00", status: "Paid" as const },
  { date: "Dec 1, 2025", number: "INV-2025-004", amount: "$299.00", status: "Paid" as const },
  { date: "Nov 1, 2025", number: "INV-2025-003", amount: "$299.00", status: "Pending" as const },
  { date: "Oct 1, 2025", number: "INV-2025-002", amount: "$299.00", status: "Paid" as const },
  { date: "Sep 1, 2025", number: "INV-2025-001", amount: "$299.00", status: "Paid" as const },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Paid: "default",
  Pending: "outline",
  Failed: "destructive",
}

const statusClass: Record<string, string> = {
  Paid: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
  Pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25",
  Failed: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/25",
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function UsageMetric({
  icon: Icon,
  label,
  current,
  limit,
  unit,
  unlimited,
}: {
  icon: React.ElementType
  label: string
  current: number
  limit: number
  unit?: string
  unlimited?: boolean
}) {
  const pct = unlimited ? 20 : Math.round((current / limit) * 100)
  const isNearLimit = pct >= 85

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Icon className="size-4" />
          {label}
        </span>
        <span className="font-medium tabular-nums">
          {current}
          {unit ? ` ${unit}` : ""}{" "}
          <span className="text-muted-foreground font-normal">
            of {unlimited ? "Unlimited" : `${limit}${unit ? ` ${unit}` : ""}`}
          </span>
        </span>
      </div>
      <Progress
        value={pct}
        className={cn("h-2", isNearLimit && "[&>[data-slot=progress-indicator]]:bg-amber-500")}
      />
    </div>
  )
}

function StatBox({
  label,
  value,
  sub,
  pct,
  trend,
}: {
  label: string
  value: string
  sub?: string
  pct?: number
  trend?: "up" | "down"
}) {
  return (
    <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      {sub && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          {trend === "up" && (
            <span className="inline-block text-emerald-500">&#9650;</span>
          )}
          {trend === "down" && (
            <span className="inline-block text-red-500">&#9660;</span>
          )}
          {sub}
        </p>
      )}
      {typeof pct === "number" && (
        <Progress value={pct} className="h-1.5" />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// BillingSettings
// ---------------------------------------------------------------------------

function BillingSettings({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* ----------------------------------------------------------------- */}
      {/* 1. Current Plan Card                                              */}
      {/* ----------------------------------------------------------------- */}
      <Card className="relative overflow-hidden border-primary/50 shadow-md">
        {/* Subtle premium gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Crown className="size-5 text-primary" />
              Pro Plan
            </CardTitle>
            <Badge variant="secondary" className="gap-1">
              <Zap className="size-3" />
              Active
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6">
          {/* Price */}
          <div>
            <span className="text-4xl font-bold tracking-tight">$299</span>
            <span className="text-muted-foreground">/month</span>
            <p className="mt-1 text-sm text-muted-foreground">Billed annually</p>
          </div>

          <Separator />

          {/* Usage metrics */}
          <div className="space-y-4">
            <UsageMetric icon={Users} label="Creators" current={47} limit={50} />
            <UsageMetric
              icon={FolderOpen}
              label="Campaigns"
              current={12}
              limit={999}
              unlimited
            />
            <UsageMetric
              icon={BarChart3}
              label="Storage"
              current={8.2}
              limit={25}
              unit="GB"
            />
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              <ChevronRight className="size-4" />
              Upgrade Plan
            </Button>
            <Button variant="link" className="text-muted-foreground">
              Manage Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ----------------------------------------------------------------- */}
      {/* 2. Payment Method Card                                            */}
      {/* ----------------------------------------------------------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="size-5 text-muted-foreground" />
            Payment Method
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Card representation */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-20 items-center justify-center rounded-md border bg-muted/60 text-xs font-bold tracking-widest text-muted-foreground">
              VISA
            </div>
            <div>
              <p className="text-sm font-medium">
                &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242
              </p>
              <p className="text-xs text-muted-foreground">Expires 12/27</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm">
              Update Payment Method
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Your next billing date is <span className="font-medium text-foreground">March 1, 2026</span>.
          </p>
        </CardContent>
      </Card>

      {/* ----------------------------------------------------------------- */}
      {/* 3. Invoice History Table                                          */}
      {/* ----------------------------------------------------------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Invoice History</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.number}>
                  <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                  <TableCell className="font-medium">{inv.number}</TableCell>
                  <TableCell>{inv.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={statusVariant[inv.status]}
                      className={cn("text-[11px]", statusClass[inv.status])}
                    >
                      {inv.status === "Paid" && <Check className="size-3" />}
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon-xs" aria-label="Download invoice">
                      <Download className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ----------------------------------------------------------------- */}
      {/* 4. Usage Summary Card                                             */}
      {/* ----------------------------------------------------------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Usage Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatBox
              label="API Calls"
              value="142,847"
              sub="this month"
              pct={71}
            />
            <StatBox
              label="Active Creators"
              value="47"
              sub="+3 from last month"
              trend="up"
            />
            <StatBox
              label="Storage Used"
              value="8.2 GB"
              sub="of 25 GB"
              pct={33}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { BillingSettings }
