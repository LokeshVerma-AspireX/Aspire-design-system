"use client"

import * as React from "react"
import { LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DateRangePicker, type DateRange } from "@/components/shared/DateRangePicker"
import { MetricCard, type SparklinePoint } from "./MetricCard"
import { PerformanceLineChart, type PerformanceDataPoint } from "./PerformanceLineChart"
import { PlatformBarChart, type PlatformData } from "./PlatformBarChart"
import { TopPostsCarousel, type TopPost } from "./TopPostsCarousel"
import { PostsGrid, type PostData } from "./PostsGrid"
import { PostsTable, type PostTableRow } from "./PostsTable"
import { CreatorPerformanceTable, type CreatorPerformanceRow } from "./CreatorPerformanceTable"
import { CreatorScatterChart, type CreatorDataPoint } from "./CreatorScatterChart"

export interface KpiMetric {
  label: string
  value: string
  change?: number
  trendLabel?: string
  sparklineData?: SparklinePoint[]
}

export interface AnalyticsPageProps {
  kpiMetrics?: KpiMetric[]
  performanceData?: PerformanceDataPoint[]
  platformData?: PlatformData[]
  topPosts?: TopPost[]
  postsGridData?: PostData[]
  postsTableData?: PostTableRow[]
  creators?: CreatorPerformanceRow[]
  scatterCreators?: CreatorDataPoint[]
}

type PostView = "grid" | "table"

function SummaryTab({
  kpiMetrics,
  performanceData,
  platformData,
  topPosts,
}: Pick<AnalyticsPageProps, "kpiMetrics" | "performanceData" | "platformData" | "topPosts">) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* KPI Cards */}
      {kpiMetrics && kpiMetrics.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {kpiMetrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>
      )}

      {/* Performance chart */}
      {performanceData && performanceData.length > 0 && (
        <PerformanceLineChart data={performanceData} />
      )}

      {/* Platform breakdown + Top posts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {platformData && platformData.length > 0 && (
          <PlatformBarChart data={platformData} />
        )}
        {topPosts && topPosts.length > 0 && (
          <TopPostsCarousel posts={topPosts} />
        )}
      </div>
    </div>
  )
}

function PostsTab({
  postsGridData,
  postsTableData,
}: Pick<AnalyticsPageProps, "postsGridData" | "postsTableData">) {
  const [view, setView] = React.useState<PostView>("grid")
  const gridData = postsGridData ?? []
  const tableData = postsTableData ?? []

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* View toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {(view === "grid" ? gridData.length : tableData.length)} posts
        </p>
        <div
          role="group"
          aria-label="View mode"
          className="flex items-center overflow-hidden rounded-md border border-input"
        >
          {(["grid", "table"] as PostView[]).map((mode) => {
            const Icon = mode === "grid" ? LayoutGrid : List
            return (
              <button
                key={mode}
                type="button"
                aria-pressed={view === mode}
                onClick={() => setView(mode)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center transition-colors",
                  view === mode
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                aria-label={`${mode} view`}
              >
                <Icon className="size-3.5" />
              </button>
            )
          })}
        </div>
      </div>

      {view === "grid" ? (
        <PostsGrid posts={gridData} />
      ) : (
        <PostsTable posts={tableData} />
      )}
    </div>
  )
}

function MembersTab({
  creators,
  scatterCreators,
}: Pick<AnalyticsPageProps, "creators" | "scatterCreators">) {
  return (
    <div className="flex flex-col gap-4 p-6">
      {creators && creators.length > 0 && (
        <CreatorPerformanceTable creators={creators} />
      )}
      {scatterCreators && scatterCreators.length > 0 && (
        <CreatorScatterChart data={scatterCreators} />
      )}
    </div>
  )
}

function AnalyticsPage({
  kpiMetrics,
  performanceData,
  platformData,
  topPosts,
  postsGridData,
  postsTableData,
  creators,
  scatterCreators,
}: AnalyticsPageProps) {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: "2025-08-21",
    to: "2026-02-21",
  })

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* Page header */}
      <div className="flex items-start justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Analytics</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Campaign performance overview
          </p>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="summary" className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b border-border px-6">
          <TabsList variant="line" className="h-11 gap-0 bg-transparent p-0">
            {["Summary", "Posts", "Members", "Networks"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="h-11 rounded-none px-4 text-sm"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="summary" className="m-0">
            <SummaryTab
              kpiMetrics={kpiMetrics}
              performanceData={performanceData}
              platformData={platformData}
              topPosts={topPosts}
            />
          </TabsContent>

          <TabsContent value="posts" className="m-0">
            <PostsTab postsGridData={postsGridData} postsTableData={postsTableData} />
          </TabsContent>

          <TabsContent value="members" className="m-0">
            <MembersTab creators={creators} scatterCreators={scatterCreators} />
          </TabsContent>

          <TabsContent value="networks" className="m-0">
            <div className="flex flex-col items-center justify-center py-24 text-sm text-muted-foreground">
              Network analytics — coming soon
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export { AnalyticsPage }
