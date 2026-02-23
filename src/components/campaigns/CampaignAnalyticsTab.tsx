"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"
import { MetricCard, type SparklinePoint } from "@/components/analytics/MetricCard"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CampaignKpi {
  label: string
  value: string
  change?: number
  trendLabel?: string
  sparklineData?: SparklinePoint[]
}

export interface CampaignPerformancePoint {
  month: string
  impressions: number
  engagement: number
  revenue: number
}

export interface PlatformDistribution {
  name: string
  value: number
  color: string
}

export interface TopCampaignRow {
  id: string
  name: string
  creators: number
  content: number
  impressions: number
  engagementRate: number
  revenue: number
  roi: number
}

export interface CreatorActivityPoint {
  week: string
  submissions: number
}

export interface CampaignAnalyticsTabProps {
  kpis?: CampaignKpi[]
  performanceData?: CampaignPerformancePoint[]
  platformData?: PlatformDistribution[]
  topCampaigns?: TopCampaignRow[]
  creatorActivity?: CreatorActivityPoint[]
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

// ─── Component ───────────────────────────────────────────────────────────────

function CampaignAnalyticsTab({
  kpis,
  performanceData,
  platformData,
  topCampaigns,
  creatorActivity,
  className,
}: CampaignAnalyticsTabProps) {
  return (
    <div className={cn("flex flex-col gap-6 p-6", className)}>
      {/* KPI Cards */}
      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {kpis.map((kpi) => (
            <MetricCard key={kpi.label} {...kpi} />
          ))}
        </div>
      )}

      {/* Campaign Performance Over Time */}
      {performanceData && performanceData.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Campaign Performance Over Time
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="cpImpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cpEngGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cpRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tickFormatter={formatK} tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => formatK(value)}
                />
                <Legend />
                <Area type="monotone" dataKey="impressions" stroke="#8b5cf6" fill="url(#cpImpGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="engagement" stroke="#14b8a6" fill="url(#cpEngGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fill="url(#cpRevGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Two-column: Platform donut + Creator activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Content by Platform */}
        {platformData && platformData.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Content by Platform
            </h3>
            <div className="flex items-center gap-6">
              <div className="h-48 w-48 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {platformData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => `${value}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2">
                {platformData.map((p) => (
                  <div key={p.name} className="flex items-center gap-2">
                    <div
                      className="size-3 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="text-sm text-foreground">{p.name}</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {p.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Creator Activity */}
        {creatorActivity && creatorActivity.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Creator Activity by Week
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={creatorActivity} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="submissions" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Top Campaigns Table */}
      {topCampaigns && topCampaigns.length > 0 && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border px-5 py-3">
            <h3 className="text-sm font-semibold text-foreground">Top Campaigns</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">#</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Campaign</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Creators</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Content</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Impressions</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Eng. Rate</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Revenue</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">ROI</th>
                </tr>
              </thead>
              <tbody>
                {topCampaigns.map((row, i) => (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                  >
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                    <td className="px-4 py-3 text-right text-foreground">{row.creators}</td>
                    <td className="px-4 py-3 text-right text-foreground">{row.content}</td>
                    <td className="px-4 py-3 text-right text-foreground">{formatK(row.impressions)}</td>
                    <td className="px-4 py-3 text-right text-foreground">{row.engagementRate}%</td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      ${formatK(row.revenue)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={cn(
                          "font-medium",
                          row.roi >= 3 ? "text-green-600 dark:text-green-400" : "text-foreground"
                        )}
                      >
                        {row.roi}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export { CampaignAnalyticsTab }
