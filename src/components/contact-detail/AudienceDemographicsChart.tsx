import * as React from "react"
import { cn } from "@/lib/utils"

interface AgeGroup {
  label: string  // e.g. "18-24"
  percentage: number
}

interface GeoRow {
  name: string
  percentage: number
  type: "city" | "country"
}

interface AudienceDemographicsChartProps {
  ageGroups?: AgeGroup[]
  geoData?: GeoRow[]
  primaryGender?: string
  primaryEthnicity?: string
  className?: string
}

const DONUT_COLORS = [
  "#84cc16", // lime
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#ec4899", // pink
  "#8b5cf6", // purple
  "#14b8a6", // teal
]

function DonutChart({ segments }: { segments: AgeGroup[] }) {
  const total = segments.reduce((s, g) => s + g.percentage, 0)
  let cumulativePercent = 0

  return (
    <div className="flex items-center gap-4">
      {/* SVG donut */}
      <svg viewBox="0 0 36 36" className="size-28 -rotate-90">
        {segments.map((seg, i) => {
          const pct = (seg.percentage / total) * 100
          const strokeDasharray = `${pct} ${100 - pct}`
          const strokeDashoffset = 100 - cumulativePercent
          cumulativePercent += pct
          return (
            <circle
              key={i}
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
              strokeWidth="3.5"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={-strokeDashoffset}
              strokeLinecap="butt"
            />
          )
        })}
        {/* Center hole background */}
        <circle cx="18" cy="18" r="12" fill="hsl(var(--card))" />
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-1.5">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }}
            />
            <span className="text-xs text-muted-foreground">{seg.label}</span>
            <span className="text-xs font-semibold text-foreground ml-auto pl-3">{seg.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GeoTable({ rows }: { rows: GeoRow[] }) {
  const cities = rows.filter((r) => r.type === "city")
  const countries = rows.filter((r) => r.type === "country")

  function Section({ title, data }: { title: string; data: GeoRow[] }) {
    return (
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
        <div className="flex flex-col gap-1">
          {data.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs font-medium text-foreground w-4 tabular-nums">{i + 1}.</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground truncate">{row.name}</span>
                  <span className="ml-2 text-xs font-semibold text-foreground">{row.percentage}%</span>
                </div>
                <div className="mt-0.5 h-1 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {cities.length > 0 && <Section title="Top Cities" data={cities} />}
      {countries.length > 0 && <Section title="Top Countries" data={countries} />}
    </div>
  )
}

function AudienceDemographicsChart({
  ageGroups = [],
  geoData = [],
  primaryGender,
  primaryEthnicity,
  className,
}: AudienceDemographicsChartProps) {
  return (
    <div className={cn("flex flex-col gap-6 rounded-xl border bg-card p-4 shadow-sm", className)}>
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Audience Demographics
      </p>

      {(primaryGender || primaryEthnicity) && (
        <div className="grid grid-cols-2 gap-3">
          {primaryGender && (
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Gender</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{primaryGender}</p>
            </div>
          )}
          {primaryEthnicity && (
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Ethnicity</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{primaryEthnicity}</p>
            </div>
          )}
        </div>
      )}

      {ageGroups.length > 0 && (
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Audience Age
          </p>
          <DonutChart segments={ageGroups} />
        </div>
      )}

      {geoData.length > 0 && <GeoTable rows={geoData} />}
    </div>
  )
}

export { AudienceDemographicsChart, type AudienceDemographicsChartProps, type AgeGroup, type GeoRow }
