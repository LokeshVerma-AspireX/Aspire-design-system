import type { KpiMetric }                from "@/components/analytics/AnalyticsPage"
import type { PerformanceDataPoint }     from "@/components/analytics/PerformanceLineChart"
import type { PlatformData }             from "@/components/analytics/PlatformBarChart"
import type { TopPost }                  from "@/components/analytics/TopPostsCarousel"
import type { PostData }                 from "@/components/analytics/PostsGrid"
import type { PostTableRow }             from "@/components/analytics/PostsTable"
import type { CreatorPerformanceRow }    from "@/components/analytics/CreatorPerformanceTable"
import type { CreatorDataPoint }         from "@/components/analytics/CreatorScatterChart"

// ─── 26 weeks of data (Aug 2025 → Feb 2026) ──────────────────────────────────

function week(i: number): string {
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"]
  const weekInMonth = i % 4
  const month = months[Math.floor(i / 4)]
  return `${month} W${weekInMonth + 1}`
}

function trend(start: number, end: number, i: number, total: number, noise: number): number {
  const t = i / (total - 1)
  const base = start + (end - start) * t
  const jitter = (Math.sin(i * 2.1) * noise + Math.cos(i * 1.3) * noise * 0.5)
  return Math.max(0, Math.round(base + jitter))
}

export const PERFORMANCE_DATA: PerformanceDataPoint[] = Array.from({ length: 26 }, (_, i) => ({
  date:        week(i),
  impressions: trend(820_000, 1_540_000, i, 26, 45_000),
  reach:       trend(640_000, 1_200_000, i, 26, 35_000),
  engagement:  trend(32_000,   72_000,   i, 26,  4_000),
  tmv:         trend(12_400,   28_600,   i, 26,  1_200),
}))

// KPI Cards ───────────────────────────────────────────────────────────────────

function buildSparkline(data: PerformanceDataPoint[], key: keyof Omit<PerformanceDataPoint, "date">) {
  return data.map((d) => ({ value: d[key] }))
}

export const KPI_METRICS: KpiMetric[] = [
  {
    label:         "Total Impressions",
    value:         "23.4M",
    change:        18.2,
    trendLabel:    "vs last period",
    sparklineData: buildSparkline(PERFORMANCE_DATA, "impressions"),
  },
  {
    label:         "Total Reach",
    value:         "18.1M",
    change:        14.7,
    trendLabel:    "vs last period",
    sparklineData: buildSparkline(PERFORMANCE_DATA, "reach"),
  },
  {
    label:         "Total Engagement",
    value:         "1.27M",
    change:        22.1,
    sparklineData: buildSparkline(PERFORMANCE_DATA, "engagement"),
  },
  {
    label:         "Total Media Value",
    value:         "$481K",
    change:        9.4,
    sparklineData: buildSparkline(PERFORMANCE_DATA, "tmv"),
  },
  {
    label:         "Revenue",
    value:         "$142K",
    change:        31.5,
    trendLabel:    "vs last period",
    sparklineData: PERFORMANCE_DATA.map((_, i) => ({
      value: trend(8_400, 22_000, i, 26, 900),
    })),
  },
  {
    label:         "Conversions",
    value:         "8,241",
    change:        -3.2,
    sparklineData: PERFORMANCE_DATA.map((_, i) => ({
      value: trend(520, 480, i, 26, 40),
    })),
  },
]

// Platform breakdown ──────────────────────────────────────────────────────────

export const PLATFORM_DATA: PlatformData[] = [
  { platform: "Instagram", impressions: 11_200_000, reach: 8_700_000, engagement: 620_000 },
  { platform: "TikTok",    impressions:  8_400_000, reach: 6_200_000, engagement: 510_000 },
  { platform: "YouTube",   impressions:  3_800_000, reach: 3_200_000, engagement: 140_000 },
]

// Top posts ───────────────────────────────────────────────────────────────────

const PLATFORMS = ["instagram", "tiktok", "youtube"] as const

export const TOP_POSTS: TopPost[] = [
  { id: "p1", platform: "instagram", impressions: 892_000, engagementRate: 6.8, creatorName: "Jane Doe",     creatorInitials: "JD" },
  { id: "p2", platform: "tiktok",    impressions: 741_000, engagementRate: 9.2, creatorName: "Alex Kim",     creatorInitials: "AK" },
  { id: "p3", platform: "instagram", impressions: 628_000, engagementRate: 5.1, creatorName: "Mia Tanaka",   creatorInitials: "MT" },
  { id: "p4", platform: "youtube",   impressions: 514_000, engagementRate: 3.7, creatorName: "Sam Park",     creatorInitials: "SP" },
  { id: "p5", platform: "tiktok",    impressions: 489_000, engagementRate: 8.4, creatorName: "Lily Chen",    creatorInitials: "LC" },
  { id: "p6", platform: "instagram", impressions: 421_000, engagementRate: 4.9, creatorName: "Kai Nguyen",   creatorInitials: "KN" },
  { id: "p7", platform: "tiktok",    impressions: 388_000, engagementRate: 7.1, creatorName: "Zoe Martinez", creatorInitials: "ZM" },
  { id: "p8", platform: "youtube",   impressions: 312_000, engagementRate: 2.8, creatorName: "Ryan Lee",     creatorInitials: "RL" },
]

// Posts grid/table ────────────────────────────────────────────────────────────

const CREATORS = [
  { name: "Jane Doe",     initials: "JD" },
  { name: "Alex Kim",     initials: "AK" },
  { name: "Mia Tanaka",   initials: "MT" },
  { name: "Sam Park",     initials: "SP" },
  { name: "Lily Chen",    initials: "LC" },
  { name: "Kai Nguyen",   initials: "KN" },
  { name: "Zoe Martinez", initials: "ZM" },
  { name: "Ryan Lee",     initials: "RL" },
]

export const POSTS_GRID_DATA: PostData[] = Array.from({ length: 24 }, (_, i) => {
  const creator = CREATORS[i % CREATORS.length]
  const platform = PLATFORMS[i % 3]
  const impressions = Math.round(100_000 + (24 - i) * 35_000 + Math.sin(i) * 25_000)
  return {
    id:              `pg-${i}`,
    platform,
    impressions,
    engagementRate:  +(3.5 + Math.sin(i * 1.4) * 2.5).toFixed(1),
    creatorName:     creator.name,
    creatorInitials: creator.initials,
    date:            `2026-${String(Math.floor(i / 8) + 1).padStart(2, "0")}-${String((i % 20) + 1).padStart(2, "0")}`,
  }
})

export const POSTS_TABLE_DATA: PostTableRow[] = POSTS_GRID_DATA.map((p) => ({
  id:              p.id,
  platform:        p.platform,
  creatorName:     p.creatorName,
  creatorInitials: p.creatorInitials ?? p.creatorName.slice(0, 2).toUpperCase(),
  impressions:     p.impressions,
  engagement:      Math.round(p.impressions * (p.engagementRate / 100)),
  reach:           Math.round(p.impressions * 0.78),
  date:            p.date,
}))

// Creator ranking ─────────────────────────────────────────────────────────────

export const CREATOR_RANKINGS: CreatorPerformanceRow[] = [
  { rank: 1, name: "Jane Doe",     initials: "JD", posts: 12, impressions: 3_240_000, engagementRate: 6.8, revenue: 42_800, revenueChange: 18.2 },
  { rank: 2, name: "Alex Kim",     initials: "AK", posts: 9,  impressions: 2_810_000, engagementRate: 9.1, revenue: 38_400, revenueChange: 24.5 },
  { rank: 3, name: "Mia Tanaka",   initials: "MT", posts: 11, impressions: 2_190_000, engagementRate: 5.4, revenue: 29_100, revenueChange: -4.8 },
  { rank: 4, name: "Sam Park",     initials: "SP", posts: 7,  impressions: 1_840_000, engagementRate: 3.7, revenue: 21_600, revenueChange: 6.3  },
  { rank: 5, name: "Lily Chen",    initials: "LC", posts: 8,  impressions: 1_720_000, engagementRate: 7.8, revenue: 18_900, revenueChange: 11.7 },
  { rank: 6, name: "Kai Nguyen",   initials: "KN", posts: 6,  impressions: 1_420_000, engagementRate: 4.9, revenue: 14_200, revenueChange: -2.1 },
  { rank: 7, name: "Zoe Martinez", initials: "ZM", posts: 5,  impressions: 1_110_000, engagementRate: 6.2, revenue: 11_800, revenueChange: 31.0 },
  { rank: 8, name: "Ryan Lee",     initials: "RL", posts: 4,  impressions:   820_000, engagementRate: 2.8, revenue:  7_400, revenueChange: -9.3 },
]

// Scatter plot ────────────────────────────────────────────────────────────────

export const SCATTER_CREATORS: CreatorDataPoint[] = CREATOR_RANKINGS.map((c) => ({
  name:           c.name,
  reach:          Math.round(c.impressions * 0.78),
  engagementRate: c.engagementRate,
  revenue:        c.revenue,
}))
