import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { AppShell } from "@/components/layout/AppShell"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  ChevronDown,
  LayoutGrid,
  List,
  Download,
  Settings2,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  SendHorizonal,
  UserRound,
  Clock,
  Eye,
  MessageSquare,
  Radio,
  LayoutList,
  Columns3,
} from "lucide-react"

// ─── Sample Data ──────────────────────────────────────────────────────────────

const CREATORS = [
  {
    id: "1",
    name: "Sophia Chen",
    niche: "Fashion",
    location: "New York, NY",
    initials: "SC",
    platforms: ["instagram", "tiktok"],
    followers: "487K",
    engRate: "4.2%",
    avgEng: "20.5K",
  },
  {
    id: "2",
    name: "Marcus Rivera",
    niche: "Fitness",
    location: "Los Angeles, CA",
    initials: "MR",
    platforms: ["instagram", "youtube", "tiktok"],
    followers: "325K",
    engRate: "5.1%",
    avgEng: "16.6K",
  },
  {
    id: "3",
    name: "Aria Patel",
    niche: "Beauty",
    location: "Miami, FL",
    initials: "AP",
    platforms: ["instagram", "tiktok", "youtube"],
    followers: "672K",
    engRate: "3.9%",
    avgEng: "26.2K",
  },
  {
    id: "4",
    name: "Jake Thompson",
    niche: "Fitness",
    location: "Austin, TX",
    initials: "JT",
    platforms: ["instagram", "youtube"],
    followers: "156K",
    engRate: "6.1%",
    avgEng: "9.5K",
  },
  {
    id: "5",
    name: "Mia Rodriguez",
    niche: "Food",
    location: "Chicago, IL",
    initials: "MR",
    platforms: ["instagram", "tiktok"],
    followers: "298K",
    engRate: "4.7%",
    avgEng: "14.0K",
  },
  {
    id: "6",
    name: "David Kim",
    niche: "Tech",
    location: "San Francisco, CA",
    initials: "DK",
    platforms: ["youtube", "instagram", "tiktok"],
    followers: "512K",
    engRate: "3.2%",
    avgEng: "16.4K",
  },
  {
    id: "7",
    name: "Luna Vasquez",
    niche: "Travel",
    location: "London, UK",
    initials: "LV",
    platforms: ["instagram", "youtube"],
    followers: "389K",
    engRate: "5.5%",
    avgEng: "21.4K",
  },
  {
    id: "8",
    name: "Zoe Nakamura",
    niche: "Sustainable Living",
    location: "Portland, OR",
    initials: "ZN",
    platforms: ["instagram", "tiktok"],
    followers: "224K",
    engRate: "7.2%",
    avgEng: "16.1K",
  },
]

const APPLICANTS = [
  {
    id: "1",
    name: "Sophia Martinez",
    email: "sophia.m@email.com",
    initials: "SM",
    campaign: "Summer Drop 2026",
    groups: ["VIP Creators", "+3"],
    travelLA: "Yes",
    skinType: "Oily",
    collegeStudent: "No",
    vacationFreq: "Once a month",
    productPref: "Sunscreen A",
  },
  {
    id: "2",
    name: "James Liu",
    email: "james.liu@email.com",
    initials: "JL",
    campaign: "Spring Collection",
    groups: ["New Applicants"],
    travelLA: "No",
    skinType: "Dry",
    collegeStudent: "Yes",
    vacationFreq: "A few times a year",
    productPref: "Sunscreen B",
  },
  {
    id: "3",
    name: "Aisha Patel",
    email: "aisha.p@email.com",
    initials: "AP",
    campaign: "Summer Drop 2026",
    groups: ["Top Tier", "+7"],
    travelLA: "Yes",
    skinType: "Combination",
    collegeStudent: "No",
    vacationFreq: "Once a year",
    productPref: "Sunscreen A",
  },
  {
    id: "4",
    name: "Liam O'Brien",
    email: "liam.ob@email.com",
    initials: "LO",
    campaign: "Wellness Launch",
    groups: ["New Applicants"],
    travelLA: "No",
    skinType: "Sensitive",
    collegeStudent: "No",
    vacationFreq: "A few times a year",
    productPref: "Sunscreen B",
  },
  {
    id: "5",
    name: "Emma Nakamura",
    email: "emma.n@email.com",
    initials: "EN",
    campaign: "Spring Collection",
    groups: ["VIP Creators", "+3"],
    travelLA: "No",
    skinType: "Normal",
    collegeStudent: "Yes",
    vacationFreq: "Once a month",
    productPref: "Sunscreen A",
  },
  {
    id: "6",
    name: "Carlos Rivera",
    email: "carlos.r@email.com",
    initials: "CR",
    campaign: "Summer Drop 2026",
    groups: ["New Applicants"],
    travelLA: "Yes",
    skinType: "Oily",
    collegeStudent: "No",
    vacationFreq: "Every few months",
    productPref: "Sunscreen B",
  },
  {
    id: "7",
    name: "Olivia Chen",
    email: "olivia.c@email.com",
    initials: "OC",
    campaign: "Wellness Launch",
    groups: ["Top Tier", "+7"],
    travelLA: "Yes",
    skinType: "Dry",
    collegeStudent: "Yes",
    vacationFreq: "Once a year",
    productPref: "Sunscreen A",
  },
]

const FUNNEL_DATA = [
  { stage: "Outreach Sent", value: 2480, color: "#e05a20" },
  { stage: "Opened",        value: 1736, color: "#2d9e9e", note: "-30% drop" },
  { stage: "Responded",     value:  868, color: "#2d6f8a", note: "-50% drop" },
  { stage: "Applied",       value:  521, color: "#c9b84c", note: "-40% drop" },
  { stage: "Accepted",      value:  312, color: "#5a9e68", note: "-40% drop" },
  { stage: "Rejected",      value:  209, color: "#d94040", note: "of applicants", highlight: true },
  { stage: "Activated",     value:  234, color: "#7db87d", note: "--12% drop" },
]

const CREATOR_STATUS_DATA = [
  { name: "Active",      value: 234, pct: "49%", color: "#3b9a5e" },
  { name: "Pending",     value:  78, pct: "16%", color: "#e6a817" },
  { name: "Onboarding",  value:  45, pct: "9%",  color: "#2d9e9e" },
  { name: "Declined",    value:  89, pct: "19%", color: "#c94040" },
  { name: "Inactive",    value:  33, pct: "7%",  color: "#8a8a9a" },
]

const KPI_METRICS = [
  {
    label: "Total Outreach",
    value: "2,480",
    change: 23.5,
    trend: "up" as const,
    sub: "Emails sent",
    icon: SendHorizonal,
  },
  {
    label: "Application Rate",
    value: "21.0%",
    change: 4.2,
    trend: "up" as const,
    sub: "521 of 2,480 contacted",
    icon: UserRound,
  },
  {
    label: "Conversion Rate",
    value: "9.4%",
    change: -1.8,
    trend: "down" as const,
    sub: "234 active creators",
    icon: UserRound,
  },
  {
    label: "Rejection Rate",
    value: "40.1%",
    change: 3.2,
    trend: "up" as const,
    sub: "209 of 521 applicants",
    icon: UserRound,
  },
  {
    label: "Avg. Time to Activate",
    value: "10.4 days",
    change: 12.6,
    trend: "up" as const,
    sub: "From first contact to active",
    icon: Clock,
  },
]

// ─── Platform icon helpers ─────────────────────────────────────────────────────

function PlatformBadge({ platform }: { platform: string }) {
  const configs: Record<string, { label: string; color: string; bg: string }> = {
    instagram: { label: "Instagram", color: "text-pink-600", bg: "bg-pink-50" },
    tiktok: { label: "Tiktok", color: "text-neutral-800", bg: "bg-neutral-100" },
    youtube: { label: "YouTube", color: "text-red-600", bg: "bg-red-50" },
  }
  const c = configs[platform] ?? { label: platform, color: "text-muted-foreground", bg: "bg-muted" }
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", c.bg, c.color)}>
      {platform === "instagram" && (
        <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )}
      {platform === "tiktok" && (
        <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )}
      {platform === "youtube" && (
        <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )}
      {c.label}
    </span>
  )
}

// ─── Image grid placeholder ────────────────────────────────────────────────────

const IMAGE_PALETTES = [
  ["#8B7355","#C4956A","#2C3E50"],
  ["#1a1a2e","#16213e","#0f3460"],
  ["#4a1942","#c9485b","#ff6b6b"],
  ["#1d3557","#457b9d","#a8dadc"],
  ["#264653","#2a9d8f","#e9c46a"],
  ["#3d405b","#81b29a","#f2cc8f"],
  ["#6b4226","#d4a373","#ccd5ae"],
  ["#370617","#6a040f","#9d0208"],
]

function CreatorImageGrid({ creatorIdx }: { creatorIdx: number }) {
  const palette = IMAGE_PALETTES[creatorIdx % IMAGE_PALETTES.length]
  const images = Array.from({ length: 6 }, (_, i) => palette[i % palette.length])
  return (
    <div className="grid grid-cols-3 gap-0.5 rounded-lg overflow-hidden">
      {images.map((bg, i) => (
        <div
          key={i}
          className="aspect-square"
          style={{ background: bg, opacity: 0.7 + (i % 3) * 0.1 }}
        />
      ))}
    </div>
  )
}

// ─── Creator Card ─────────────────────────────────────────────────────────────

function CreatorCard({
  creator,
  idx,
  selected,
  bookmarked,
  onSelect,
  onBookmark,
}: {
  creator: (typeof CREATORS)[0]
  idx: number
  selected: boolean
  bookmarked: boolean
  onSelect: (v: boolean) => void
  onBookmark: () => void
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-md",
        selected && "ring-2 ring-primary"
      )}
    >
      {/* Top row: checkbox + avatar/name + bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Checkbox checked={selected} onCheckedChange={onSelect} />
          <Avatar className="size-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
              {creator.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold leading-tight">{creator.name}</p>
            <p className="text-xs text-muted-foreground">
              {creator.niche} · {creator.location}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 text-muted-foreground"
          onClick={onBookmark}
        >
          <Bookmark className={cn("size-4", bookmarked && "fill-primary text-primary")} />
        </Button>
      </div>

      {/* Platform badges */}
      <div className="flex flex-wrap gap-1">
        {creator.platforms.map((p) => (
          <PlatformBadge key={p} platform={p} />
        ))}
      </div>

      {/* Image grid */}
      <CreatorImageGrid creatorIdx={idx} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-base font-bold">{creator.followers}</p>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Followers</p>
        </div>
        <div>
          <p className="text-base font-bold">{creator.engRate}</p>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Eng. Rate</p>
        </div>
        <div>
          <p className="text-base font-bold">{creator.avgEng}</p>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Avg. Eng.</p>
        </div>
      </div>
    </div>
  )
}

// ─── Creator Discovery Tab ────────────────────────────────────────────────────

function CreatorDiscoveryTab() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [bookmarked, setBookmarked] = React.useState<Set<string>>(new Set())
  const [search, setSearch] = React.useState("")
  const [view, setView] = React.useState<"grid" | "list">("grid")

  const filtered = CREATORS.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.niche.toLowerCase().includes(search.toLowerCase())
  )

  function toggleSelect(id: string, on: boolean | "indeterminate") {
    setSelected((prev) => {
      const next = new Set(prev)
      if (on === true) next.add(id)
      else next.delete(id)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Search + Filters bar */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Bookmark className="size-3.5" />
              Saved Search
              <ChevronDown className="size-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Top Fitness Creators</DropdownMenuItem>
            <DropdownMenuItem>NY Fashion Influencers</DropdownMenuItem>
            <DropdownMenuItem>Macro (100K–1M)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8 text-sm h-8"
            placeholder="Search creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button variant="outline" size="sm" className="gap-1.5 text-xs ml-auto">
          <SlidersHorizontal className="size-3.5" />
          Filters
        </Button>
      </div>

      {/* Selection bar + view toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selected.size === filtered.length && filtered.length > 0}
            onCheckedChange={(v) =>
              setSelected(v ? new Set(filtered.map((c) => c.id)) : new Set())
            }
          />
          <span className="text-sm text-muted-foreground">{selected.size} selected</span>
          {selected.size > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="gap-1.5 text-xs h-7">
                  + Add to
                  <ChevronDown className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Campaign</DropdownMenuItem>
                <DropdownMenuItem>Group</DropdownMenuItem>
                <DropdownMenuItem>Lists</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {selected.size === 0 && (
            <Button size="sm" variant="outline" className="gap-1.5 text-xs h-7 opacity-50 cursor-default" disabled>
              + Add to
              <ChevronDown className="size-3" />
            </Button>
          )}
        </div>

        {/* Grid / List toggle */}
        <div className="flex items-center rounded-md border bg-background p-0.5 gap-0.5">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="size-7"
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="size-3.5" />
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon"
            className="size-7"
            onClick={() => setView("list")}
          >
            <List className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Creator grid */}
      <div
        className={cn(
          "grid gap-4",
          view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}
      >
        {filtered.map((creator, idx) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            idx={idx}
            selected={selected.has(creator.id)}
            bookmarked={bookmarked.has(creator.id)}
            onSelect={(v) => toggleSelect(creator.id, v)}
            onBookmark={() =>
              setBookmarked((prev) => {
                const next = new Set(prev)
                next.has(creator.id) ? next.delete(creator.id) : next.add(creator.id)
                return next
              })
            }
          />
        ))}
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
        <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Previous</Button>
          <Button variant="secondary" size="sm" className="h-7 w-7 text-xs">1</Button>
          <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Next</Button>
        </div>
      </div>
    </div>
  )
}

// ─── Applicants Tab ───────────────────────────────────────────────────────────

function ApplicantsTab() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  function toggleAll(v: boolean | "indeterminate") {
    setSelected(v === true ? new Set(APPLICANTS.map((a) => a.id)) : new Set())
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      {/* Filter bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Bookmark className="size-3.5" />
                Saved Views
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Applicants</DropdownMenuItem>
              <DropdownMenuItem>Pending Review</DropdownMenuItem>
              <DropdownMenuItem>Approved</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            + Add Filter
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            Clear all
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          Save View
        </Button>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="gap-1.5 text-xs">
                Collaborate
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Add to Campaign</DropdownMenuItem>
              <DropdownMenuItem>Send Offer</DropdownMenuItem>
              <DropdownMenuItem>Send Message</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="size-8">
            <Search className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8">
            <Download className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8">
            <Columns3 className="size-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="w-10 py-2 pl-4">
                <Checkbox
                  checked={selected.size === APPLICANTS.length}
                  onCheckedChange={toggleAll}
                />
              </th>
              {/* Column group headers */}
              <th colSpan={2} className="border-r py-1.5 px-3 text-left text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                Default Member Data
              </th>
              <th colSpan={2} className="border-r py-1.5 px-3 text-left text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                Relationship Status
              </th>
              <th colSpan={5} className="border-r py-1.5 px-3 text-left text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                Custom Member Data
              </th>
              <th className="py-1.5 px-3 text-right text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                Actions
              </th>
            </tr>
            <tr className="border-b bg-muted/10">
              <th className="w-10 py-2 pl-4" />
              <th className="py-2 pl-3 pr-6 text-left font-medium text-muted-foreground text-xs">Name</th>
              <th className="py-2 px-3 text-left font-medium text-muted-foreground text-xs border-r">Email</th>
              <th className="py-2 px-3 text-left font-medium text-muted-foreground text-xs">Campaigns</th>
              <th className="py-2 px-3 text-left font-medium text-muted-foreground text-xs border-r">Groups</th>
              <th className="py-2 px-3 text-left font-medium text-muted-foreground text-xs">Can Travel to LA</th>
              <th className="py-2 px-3 text-left font-medium text-muted-foreground text-xs">Skin Type</th>
              <th className="py-2 px-3 text-left font-medium text-muted-foreground text-xs">College Student</th>
              <th className="py-2 px-3 text-left font-medium text-muted-foreground text-xs">Vacation Frequency</th>
              <th className="py-2 px-3 text-left font-medium text-muted-foreground text-xs border-r">Product Preference</th>
              <th className="py-2 px-3 text-right font-medium text-muted-foreground text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {APPLICANTS.map((a) => (
              <tr key={a.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                <td className="py-3 pl-4">
                  <Checkbox
                    checked={selected.has(a.id)}
                    onCheckedChange={(v) =>
                      setSelected((prev) => {
                        const next = new Set(prev)
                        v ? next.add(a.id) : next.delete(a.id)
                        return next
                      })
                    }
                  />
                </td>
                <td className="py-3 pl-3 pr-6">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-muted text-[10px]">{a.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{a.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-muted-foreground text-xs border-r">{a.email}</td>
                <td className="py-3 px-3">
                  <Badge variant="outline" className="text-xs font-normal">{a.campaign}</Badge>
                </td>
                <td className="py-3 px-3 border-r">
                  <div className="flex gap-1 flex-wrap">
                    <Badge variant="outline" className="text-xs font-normal">{a.groups[0]}</Badge>
                    {a.groups[1] && (
                      <Badge variant="outline" className="text-xs font-normal">{a.groups[1]}</Badge>
                    )}
                  </div>
                </td>
                <td className="py-3 px-3 text-sm">{a.travelLA}</td>
                <td className="py-3 px-3 text-sm">{a.skinType}</td>
                <td className="py-3 px-3 text-sm">{a.collegeStudent}</td>
                <td className="py-3 px-3 text-sm">{a.vacationFreq}</td>
                <td className="py-3 px-3 text-sm border-r">{a.productPref}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center justify-end gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" className="gap-1 text-xs h-7">
                          Collaborate
                          <ChevronDown className="size-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Add to Campaign</DropdownMenuItem>
                        <DropdownMenuItem>Send Offer</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" className="size-7">
                      <MoreHorizontal className="size-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
        <span>Showing 1 to {APPLICANTS.length} of {APPLICANTS.length} entries</span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Previous</Button>
          <Button variant="secondary" size="sm" className="h-7 w-7 text-xs">1</Button>
          <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Next</Button>
        </div>
      </div>
    </div>
  )
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function RecruitKpiCard({
  label,
  value,
  change,
  trend,
  sub,
  icon: Icon,
}: (typeof KPI_METRICS)[0]) {
  const isUp = trend === "up"
  return (
    <div className="flex flex-col gap-2 rounded-xl border bg-card p-5">
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="flex size-8 items-center justify-center rounded-full bg-muted">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <div className="flex items-center gap-1.5">
        {isUp ? (
          <TrendingUp className="size-3.5 text-emerald-500" />
        ) : (
          <TrendingDown className="size-3.5 text-red-500" />
        )}
        <span className={cn("text-xs font-medium", isUp ? "text-emerald-600" : "text-red-600")}>
          {isUp ? "+" : ""}{change}%
        </span>
        <span className="text-xs text-muted-foreground">vs last period</span>
      </div>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  )
}

// ─── Recruitment Funnel Chart ─────────────────────────────────────────────────

function RecruitmentFunnelChart() {
  const maxVal = Math.max(...FUNNEL_DATA.map((d) => d.value))

  return (
    <div className="flex flex-col gap-3">
      {FUNNEL_DATA.map((d) => (
        <div key={d.stage} className="flex items-center gap-4">
          <div className="w-28 text-right text-sm text-muted-foreground shrink-0">
            <span className={cn(d.highlight && "text-red-500 font-medium")}>{d.stage}</span>
            {d.note && (
              <p className={cn("text-[10px]", d.highlight ? "text-red-400" : "text-muted-foreground/70")}>
                {d.note}
              </p>
            )}
          </div>
          <div className="flex-1 h-8 bg-muted/40 rounded-sm overflow-hidden">
            <div
              className="h-full rounded-sm transition-all"
              style={{
                width: `${(d.value / maxVal) * 100}%`,
                background: d.color,
              }}
            />
          </div>
          <span className={cn("w-12 text-right text-sm font-semibold tabular-nums shrink-0", d.highlight && "text-red-500")}>
            {d.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Creator Status Donut ─────────────────────────────────────────────────────

function CreatorStatusDonut() {
  return (
    <div className="flex flex-col gap-4">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={CREATOR_STATUS_DATA}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
          >
            {CREATOR_STATUS_DATA.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-1.5">
        {CREATOR_STATUS_DATA.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full shrink-0" style={{ background: d.color }} />
              <span className="text-muted-foreground">{d.name}</span>
            </div>
            <div className="flex gap-4 tabular-nums">
              <span className="font-medium">{d.value}</span>
              <span className="text-muted-foreground w-8 text-right">{d.pct}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Analytics Tab ────────────────────────────────────────────────────────────

function AnalyticsTab() {
  const [period, setPeriod] = React.useState("6m")

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Recruitment Analytics</h2>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40 text-sm h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {KPI_METRICS.map((m) => (
          <RecruitKpiCard key={m.label} {...m} />
        ))}
      </div>

      {/* Funnel + Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Funnel */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-6 flex flex-col gap-4">
          <div>
            <h3 className="font-semibold">Recruitment Funnel</h3>
            <p className="text-xs text-muted-foreground">End-to-end conversion from outreach to activation</p>
          </div>
          <RecruitmentFunnelChart />
          <Separator />
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              <span className="font-medium text-foreground">Overall conversion:</span> 9.4%
            </span>
            <span>
              <TrendingDown className="inline size-3 text-red-500 mr-1" />
              <span className="font-medium text-foreground">Biggest drop:</span> Opened → Responded
            </span>
          </div>
        </div>

        {/* Creator Status */}
        <div className="rounded-xl border bg-card p-6 flex flex-col gap-4">
          <div>
            <h3 className="font-semibold">Creator Status</h3>
            <p className="text-xs text-muted-foreground">Current status of all recruited creators</p>
          </div>
          <CreatorStatusDonut />
        </div>
      </div>
    </div>
  )
}

// ─── Mentions Tab ─────────────────────────────────────────────────────────────

function MentionsTab() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
      <Radio className="size-10 opacity-30" />
      <p className="text-sm font-medium">Mentions — coming soon</p>
      <p className="text-xs opacity-70">Track when creators mention your brand across platforms.</p>
    </div>
  )
}

// ─── Customers Tab ────────────────────────────────────────────────────────────

function CustomersTab() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
      <UserRound className="size-10 opacity-30" />
      <p className="text-sm font-medium">Customers — coming soon</p>
      <p className="text-xs opacity-70">Manage customers who have completed a purchase with your brand.</p>
    </div>
  )
}

// ─── Footer status bar ────────────────────────────────────────────────────────

function RecruitStatusBar() {
  return (
    <div className="flex items-center justify-center gap-4 border-t bg-background py-2 text-xs text-muted-foreground">
      <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
        <MessageSquare className="size-3.5" />
        Comment
      </button>
      <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
        <Eye className="size-3.5" />
        Show
      </button>
      <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
        <LayoutList className="size-3.5" />
        All
      </button>
      <button className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Synced
      </button>
    </div>
  )
}

// ─── Full Recruit Page ────────────────────────────────────────────────────────

function RecruitPage() {
  const [tab, setTab] = React.useState("discovery")

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Page header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-background">
        <h1 className="text-2xl font-bold">Recruit</h1>
        <Button variant="ghost" size="icon" className="size-9 text-muted-foreground">
          <Settings2 className="size-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b bg-background px-4 pt-1">
          <TabsList className="h-auto bg-transparent p-0 gap-0">
            {[
              { value: "discovery", label: "Creator Discovery" },
              { value: "applicants", label: "Applicants" },
              { value: "customers", label: "Customers" },
              { value: "mentions", label: "Mentions" },
              { value: "analytics", label: "Analytics" },
            ].map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-1 text-sm font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="discovery" className="mt-0 h-full">
            <CreatorDiscoveryTab />
          </TabsContent>
          <TabsContent value="applicants" className="mt-0 h-full">
            <ApplicantsTab />
          </TabsContent>
          <TabsContent value="customers" className="mt-0 h-full">
            <CustomersTab />
          </TabsContent>
          <TabsContent value="mentions" className="mt-0 h-full">
            <MentionsTab />
          </TabsContent>
          <TabsContent value="analytics" className="mt-0 h-full">
            <AnalyticsTab />
          </TabsContent>
        </div>
      </Tabs>

      <RecruitStatusBar />
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

/**
 * # RecruitPage
 *
 * Creator recruitment hub for brands to discover, review, and activate creators.
 * The page has five tabs:
 *
 * - **Creator Discovery** — searchable grid of creator cards with follower stats,
 *   platform badges, media grids, bulk-select, and bookmarking.
 * - **Applicants** — table view of applicants with custom member data columns
 *   (skin type, travel availability, vacation frequency, etc.) and per-row
 *   Collaborate action.
 * - **Customers** — placeholder for brand customers.
 * - **Mentions** — placeholder for brand-mention tracking.
 * - **Analytics** — recruitment funnel metrics (outreach → activation) with
 *   5 KPI cards, a horizontal funnel chart, and a Creator Status donut chart.
 *
 * ## Components Used
 * - `AppShell` — sidebar + main content layout
 * - `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` — shadcn/ui tabs
 * - `Button`, `Input`, `Checkbox`, `Avatar`, `Badge` — shadcn/ui primitives
 * - `DropdownMenu`, `Select` — shadcn/ui overlays
 * - `BarChart`, `PieChart` (recharts) — recruitment funnel + status donut
 *
 * ## Customization
 * - Swap in real creator data from your API into `CREATORS` / `APPLICANTS`
 * - KPI metrics and funnel stages are configurable via `KPI_METRICS` / `FUNNEL_DATA`
 * - Tab list and default active tab are controllable via `RecruitPage` state
 *
 * ```tsx
 * import { RecruitPage } from "@/components/recruit/RecruitPage"
 * ```
 */
const meta = {
  title: "6. Pages/Recruit/RecruitPage",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Full Aspire app frame with collapsed sidebar — Creator Discovery tab active. */
export const WithSidebar: Story = {
  render: () => (
    <AppShell
      activeHref="/recruit"
      user={{ name: "Jason Roh", initials: "JR" }}
      badgeCounts={{ messages: 2 }}
      defaultCollapsed
    >
      <RecruitPage />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full Aspire app shell with sidebar. Default tab is Creator Discovery — switch to Applicants, Analytics, etc.",
      },
    },
  },
}

/** Page without sidebar for isolated layout review. */
export const PageOnly: Story = {
  render: () => (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <RecruitPage />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Recruit page without the surrounding sidebar.",
      },
    },
  },
}

/** Creator Discovery tab — grid layout with cards. */
export const CreatorDiscovery: Story = {
  render: () => (
    <AppShell
      activeHref="/recruit"
      user={{ name: "Jason Roh", initials: "JR" }}
      defaultCollapsed
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Recruit</h1>
        </div>
        <div className="flex-1 overflow-auto">
          <CreatorDiscoveryTab />
        </div>
        <RecruitStatusBar />
      </div>
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Isolated Creator Discovery tab: searchable grid of creator cards with platform badges, media grids, stats, checkboxes, and bookmarking.",
      },
    },
  },
}

/** Applicants tab — table with custom member data and Collaborate actions. */
export const Applicants: Story = {
  render: () => (
    <AppShell
      activeHref="/recruit"
      user={{ name: "Jason Roh", initials: "JR" }}
      defaultCollapsed
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Recruit</h1>
        </div>
        <div className="flex-1 overflow-auto">
          <ApplicantsTab />
        </div>
        <RecruitStatusBar />
      </div>
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Isolated Applicants tab: sortable table with default member data, relationship status, and custom member data columns (skin type, travel availability, etc.).",
      },
    },
  },
}

/** Analytics tab — KPI cards, recruitment funnel, and creator status donut. */
export const Analytics: Story = {
  render: () => (
    <AppShell
      activeHref="/recruit"
      user={{ name: "Jason Roh", initials: "JR" }}
      defaultCollapsed
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Recruit</h1>
        </div>
        <div className="flex-1 overflow-auto">
          <AnalyticsTab />
        </div>
        <RecruitStatusBar />
      </div>
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Isolated Analytics tab: 5 KPI cards (Total Outreach, Application Rate, Conversion Rate, Rejection Rate, Avg. Time to Activate), recruitment funnel chart, and creator status donut chart.",
      },
    },
  },
}
