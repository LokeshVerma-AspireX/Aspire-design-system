import * as React from "react"
import { cn } from "@/lib/utils"
import { ContentHighlights, type ContentPost } from "./ContentHighlights"
import { ContentRatesTable, type RateRow } from "./ContentRatesTable"
import { SocialStatsCards, type StatCard } from "./SocialStatsCards"
import { AudienceDemographicsChart, type AgeGroup, type GeoRow } from "./AudienceDemographicsChart"
import { BrandCollaborationCard, type BrandCollaborationCardProps } from "./BrandCollaborationCard"
import { TagPillGroup, type Pill } from "@/components/shared/TagPillGroup"

interface DemographicRow {
  label: string
  value: string
}

interface ReelsStat {
  label: string
  value: string
  trend: "up" | "down" | "neutral"
}

interface ProfileTabProps {
  // Social accounts (mini version for profile)
  instagram?: string
  tiktok?: string
  youtube?: string
  // Content highlights
  recentPosts?: ContentPost[]
  brandedContent?: ContentPost[]
  portfolio?: ContentPost[]
  // Pills
  brandPartnerships?: Pill[]
  campaignOpportunities?: Pill[]
  interestsCategories?: Pill[]
  favoriteBrands?: Pill[]
  // About
  bio?: string
  location?: string
  // Rates
  contentRates?: RateRow[]
  // Brand collaborations
  brandCollaborations?: BrandCollaborationCardProps[]
  // Demographics
  demographics?: DemographicRow[]
  // Right column stats
  socialStats?: StatCard[]
  reelsStats?: ReelsStat[]
  ageGroups?: AgeGroup[]
  geoData?: GeoRow[]
  primaryGender?: string
  primaryEthnicity?: string
  className?: string
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  )
}

// Tiny sparkline using SVG — represents an engagement trend
function EngagementSparkline() {
  const points = [40, 55, 48, 62, 70, 65, 80, 75, 90, 85, 95, 100]
  const width = 300
  const height = 64
  const stepX = width / (points.length - 1)
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1

  const pathD = points
    .map((p, i) => {
      const x = i * stepX
      const y = height - ((p - min) / range) * (height - 8) - 4
      return `${i === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  const areaD =
    pathD +
    ` L ${(points.length - 1) * stepX} ${height} L 0 ${height} Z`

  return (
    <div className="flex flex-col gap-1">
      <SectionLabel>Engagements (Jan – Jun)</SectionLabel>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(78 68.2% 84.7%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(78 68.2% 84.7%)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#sparkGrad)" />
        <path d={pathD} fill="none" stroke="hsl(78 68.2% 60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function ProfileTab({
  instagram,
  tiktok,
  youtube,
  recentPosts = [],
  brandedContent = [],
  portfolio = [],
  brandPartnerships = [],
  campaignOpportunities = [],
  interestsCategories = [],
  favoriteBrands = [],
  bio,
  location,
  contentRates = [],
  brandCollaborations = [],
  demographics = [],
  socialStats = [],
  reelsStats = [],
  ageGroups = [],
  geoData = [],
  primaryGender,
  primaryEthnicity,
  className,
}: ProfileTabProps) {
  return (
    <div className={cn("grid grid-cols-5 gap-6 p-6", className)}>
      {/* LEFT column */}
      <div className="col-span-3 flex flex-col gap-5">
        {/* Content Highlights */}
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <ContentHighlights
            recentPosts={recentPosts}
            brandedContent={brandedContent}
            portfolio={portfolio}
          />
        </div>

        {/* Brand Partnerships */}
        {brandPartnerships.length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm">
            <SectionLabel>Brand Partnerships</SectionLabel>
            <TagPillGroup pills={brandPartnerships} />
          </div>
        )}

        {/* About */}
        {(bio || location) && (
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm">
            <SectionLabel>About</SectionLabel>
            {location && <p className="text-xs text-muted-foreground">{location}</p>}
            {bio && <p className="text-sm text-foreground/80 leading-relaxed">{bio}</p>}
          </div>
        )}

        {/* Campaign Opportunities */}
        {campaignOpportunities.length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm">
            <SectionLabel>Campaign Opportunities</SectionLabel>
            <TagPillGroup pills={campaignOpportunities} />
          </div>
        )}

        {/* Interests & Categories */}
        {interestsCategories.length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm">
            <SectionLabel>Interests & Categories</SectionLabel>
            <TagPillGroup pills={interestsCategories} />
          </div>
        )}

        {/* Content Rates */}
        {contentRates.length > 0 && (
          <div className="flex flex-col gap-2">
            <SectionLabel>Content Rates</SectionLabel>
            <ContentRatesTable rates={contentRates} />
          </div>
        )}

        {/* Brand Collaboration Highlights */}
        {brandCollaborations.length > 0 && (
          <div className="flex flex-col gap-2">
            <SectionLabel>Brand Collaboration Highlights</SectionLabel>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {brandCollaborations.map((collab, i) => (
                <BrandCollaborationCard key={i} {...collab} />
              ))}
            </div>
          </div>
        )}

        {/* Favorite Brands */}
        {favoriteBrands.length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm">
            <SectionLabel>Favorite Brands</SectionLabel>
            <TagPillGroup pills={favoriteBrands} />
          </div>
        )}

        {/* Demographics table */}
        {demographics.length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm">
            <SectionLabel>Demographics</SectionLabel>
            <div className="flex flex-col divide-y divide-border">
              {demographics.map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-medium text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT column */}
      <div className="col-span-2 flex flex-col gap-5">
        {/* Social stats cards */}
        {socialStats.length > 0 && <SocialStatsCards stats={socialStats} />}

        {/* Engagement sparkline chart */}
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <EngagementSparkline />
        </div>

        {/* Instagram Reels stats */}
        {reelsStats.length > 0 && (
          <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm">
            <SectionLabel>Instagram Reels Stats</SectionLabel>
            {reelsStats.map((stat, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span
                  className={cn(
                    "text-sm font-bold",
                    stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-500" : "text-foreground"
                  )}
                >
                  {stat.value} {stat.trend === "up" ? "↗" : stat.trend === "down" ? "↘" : ""}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Audience demographics chart */}
        <AudienceDemographicsChart
          ageGroups={ageGroups}
          geoData={geoData}
          primaryGender={primaryGender}
          primaryEthnicity={primaryEthnicity}
        />
      </div>
    </div>
  )
}

export { ProfileTab, type ProfileTabProps }
