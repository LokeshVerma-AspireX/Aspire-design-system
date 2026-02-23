import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

// Import all shadcn components for live previews
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertCircle,
  ChevronDown,
  Search,
  Bell,
  ToggleLeft,
  Type,
  LayoutGrid,
  Layers,
  Table2,
  PanelsTopLeft,
} from "lucide-react"

/**
 * # Component Index
 *
 * Visual gallery of all Aspire Design System components.
 * Each card shows a live mini-preview — click to navigate to full docs.
 */
const meta: Meta = {
  title: "1. Getting Started/Component Index",
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}
export default meta

// ── Types ──────────────────────────────────────────────────────

interface ComponentCard {
  name: string
  description: string
  storyId: string
  preview: React.ReactNode
}

interface Category {
  name: string
  icon: React.ReactNode
  components: ComponentCard[]
}

// ── Categories ─────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    name: "Actions",
    icon: <ToggleLeft size={16} />,
    components: [
      {
        name: "Button",
        description: "Trigger actions and navigation with clear visual emphasis.",
        storyId: "3-primitives-button--docs",
        preview: (
          <div className="flex gap-2 flex-wrap">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="outline">Outline</Button>
            <Button size="sm" variant="ghost">Ghost</Button>
          </div>
        ),
      },
      {
        name: "Toggle",
        description: "Switch between two states: on or off.",
        storyId: "3-primitives-toggle--docs",
        preview: (
          <div className="flex items-center gap-3">
            <Switch defaultChecked />
            <Switch />
          </div>
        ),
      },
      {
        name: "Dropdown Menu",
        description: "Display a list of actions in a contextual popup.",
        storyId: "4-components-navigation-dropdownmenu--docs",
        preview: (
          <div className="pointer-events-none">
            <div className="rounded-md border border-stone-200 bg-white shadow-sm w-36 py-1">
              <div className="px-3 py-1.5 text-xs font-medium text-stone-500">Options</div>
              <div className="px-3 py-1.5 text-sm text-stone-800 bg-stone-50">Edit</div>
              <div className="px-3 py-1.5 text-sm text-stone-800">Duplicate</div>
              <div className="px-3 py-1.5 text-sm text-red-600">Delete</div>
            </div>
          </div>
        ),
      },
      {
        name: "Tooltip",
        description: "Show contextual information on hover.",
        storyId: "3-primitives-tooltip--docs",
        preview: (
          <div className="flex flex-col items-center gap-1 pointer-events-none">
            <div className="rounded bg-stone-900 text-white text-xs px-2 py-1">Save changes</div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-900" />
            <Button size="sm" variant="outline">Hover me</Button>
          </div>
        ),
      },
      {
        name: "Command",
        description: "Fast searchable command palette for power users.",
        storyId: "4-components-navigation-command--docs",
        preview: (
          <div className="pointer-events-none w-full">
            <div className="rounded-md border border-stone-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-stone-100">
                <Search size={12} className="text-stone-400" />
                <span className="text-sm text-stone-400">Type a command...</span>
              </div>
              <div className="py-1">
                <div className="px-3 py-1.5 text-sm text-stone-800 bg-stone-50">Search creators</div>
                <div className="px-3 py-1.5 text-sm text-stone-800">Create campaign</div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Feedback & Status",
    icon: <Bell size={16} />,
    components: [
      {
        name: "Badge",
        description: "Highlight status, categories, or counts at a glance.",
        storyId: "3-primitives-badge--docs",
        preview: (
          <div className="flex gap-2 flex-wrap">
            <Badge>Active</Badge>
            <Badge variant="secondary">Draft</Badge>
            <Badge variant="outline">Pending</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        ),
      },
      {
        name: "Alert",
        description: "Communicate important messages and system states.",
        storyId: "4-components-feedback-alert--docs",
        preview: (
          <Alert className="py-2 px-3">
            <AlertCircle className="h-3.5 w-3.5" />
            <AlertDescription className="text-xs ml-1">
              Campaign published successfully.
            </AlertDescription>
          </Alert>
        ),
      },
      {
        name: "Progress",
        description: "Show completion percentage of a task or process.",
        storyId: "4-components-data-display-progress--docs",
        preview: (
          <div className="w-full space-y-1.5">
            <Progress value={65} className="h-2" />
            <p className="text-xs text-stone-500">65% complete</p>
          </div>
        ),
      },
      {
        name: "Skeleton",
        description: "Placeholder while content is loading.",
        storyId: "4-components-data-display-skeleton--docs",
        preview: (
          <div className="space-y-2 w-full">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ),
      },
      {
        name: "Alert Dialog",
        description: "Confirmation modal for destructive or important actions.",
        storyId: "4-components-feedback-alertdialog--docs",
        preview: (
          <div className="pointer-events-none w-full">
            <div className="rounded-lg border border-stone-200 bg-white shadow-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-stone-900">Are you sure?</p>
              <p className="text-xs text-stone-500">This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline" className="h-7 text-xs">Cancel</Button>
                <Button size="sm" variant="destructive" className="h-7 text-xs">Delete</Button>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Forms",
    icon: <Type size={16} />,
    components: [
      {
        name: "Input",
        description: "Single-line text field for user input.",
        storyId: "3-primitives-input--docs",
        preview: (
          <div className="w-full space-y-2">
            <Input placeholder="Campaign name..." className="h-8 text-sm" />
            <Input placeholder="Search creators..." className="h-8 text-sm" />
          </div>
        ),
      },
      {
        name: "Select",
        description: "Choose a single option from a dropdown list.",
        storyId: "3-primitives-select--docs",
        preview: (
          <div className="pointer-events-none w-full">
            <div className="flex items-center justify-between border border-stone-200 rounded-md px-3 h-8 bg-white text-sm text-stone-400">
              <span>Select status...</span>
              <ChevronDown size={14} />
            </div>
          </div>
        ),
      },
      {
        name: "Checkbox",
        description: "Let users select one or multiple options.",
        storyId: "3-primitives-checkbox--docs",
        preview: (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox checked id="ci-c1" />
              <label htmlFor="ci-c1" className="text-sm text-stone-700">Instagram</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="ci-c2" />
              <label htmlFor="ci-c2" className="text-sm text-stone-700">TikTok</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked id="ci-c3" />
              <label htmlFor="ci-c3" className="text-sm text-stone-700">YouTube</label>
            </div>
          </div>
        ),
      },
      {
        name: "Textarea",
        description: "Multi-line text field for longer input.",
        storyId: "3-primitives-textarea--docs",
        preview: (
          <Textarea
            placeholder="Write your campaign brief..."
            className="text-xs resize-none h-20"
          />
        ),
      },
      {
        name: "Slider",
        description: "Select a value from a continuous range.",
        storyId: "3-primitives-separator--docs",
        preview: (
          <div className="w-full space-y-1">
            <Slider defaultValue={[40]} max={100} className="w-full" />
            <p className="text-xs text-stone-400">Budget: $40,000</p>
          </div>
        ),
      },
      {
        name: "Radio Group",
        description: "Select one option from a set of choices.",
        storyId: "3-primitives-radiogroup--docs",
        preview: (
          <div className="space-y-2">
            {["Flat fee", "Commission", "Product only"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`h-4 w-4 rounded-full border-2 ${i === 0 ? "border-stone-900" : "border-stone-300"} flex items-center justify-center`}>
                  {i === 0 && <div className="h-2 w-2 rounded-full bg-stone-900" />}
                </div>
                <span className="text-sm text-stone-700">{label}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        name: "Label",
        description: "Accessible form field labels with required indicators.",
        storyId: "3-primitives-label--docs",
        preview: (
          <div className="w-full space-y-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-stone-700">Email <span className="text-red-500">*</span></p>
              <Input placeholder="team@aspire.io" className="h-8 text-sm" />
            </div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Layout & Structure",
    icon: <LayoutGrid size={16} />,
    components: [
      {
        name: "Card",
        description: "Container for grouping related content and actions.",
        storyId: "3-primitives-card--docs",
        preview: (
          <Card className="w-full">
            <CardHeader className="pb-1 pt-3 px-3">
              <CardTitle className="text-xs font-semibold text-stone-600">Campaign Stats</CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <p className="text-xl font-bold text-stone-900">1,248</p>
              <p className="text-xs text-stone-400">Total creators</p>
            </CardContent>
          </Card>
        ),
      },
      {
        name: "Separator",
        description: "Visually divide sections of content.",
        storyId: "3-primitives-separator--docs",
        preview: (
          <div className="w-full space-y-2">
            <p className="text-xs text-stone-500">Section A</p>
            <Separator />
            <p className="text-xs text-stone-500">Section B</p>
          </div>
        ),
      },
      {
        name: "Scroll Area",
        description: "Scrollable container with custom scrollbar styling.",
        storyId: "4-components-data-display-scrollarea--docs",
        preview: (
          <ScrollArea className="h-20 w-full border border-stone-100 rounded-md p-2">
            {["Emma Wilson", "Sophia Turner", "Marcus Lee", "Aisha Johnson", "Dylan Park", "Priya Sharma"].map(name => (
              <div key={name} className="text-xs text-stone-600 py-0.5">{name}</div>
            ))}
          </ScrollArea>
        ),
      },
      {
        name: "Tabs",
        description: "Organize content into switchable sections.",
        storyId: "5-layout-tabs--docs",
        preview: (
          <Tabs defaultValue="members">
            <TabsList className="h-7">
              <TabsTrigger value="overview" className="text-xs px-3 h-6">Overview</TabsTrigger>
              <TabsTrigger value="members" className="text-xs px-3 h-6">Members</TabsTrigger>
              <TabsTrigger value="content" className="text-xs px-3 h-6">Content</TabsTrigger>
            </TabsList>
          </Tabs>
        ),
      },
      {
        name: "Accordion",
        description: "Expandable sections for progressive disclosure.",
        storyId: "4-components-data-display-accordion--docs",
        preview: (
          <div className="w-full pointer-events-none">
            <div className="border border-stone-200 rounded-md overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-stone-700 bg-stone-50">
                <span>Campaign Details</span>
                <ChevronDown size={14} className="rotate-180" />
              </div>
              <div className="px-3 py-2 text-xs text-stone-500 border-t border-stone-100">
                Summer collection launch with 50 creators across Instagram and TikTok.
              </div>
              <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-stone-700 border-t border-stone-200">
                <span>Requirements</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "Dialog",
        description: "Modal overlay for focused tasks and confirmations.",
        storyId: "4-components-feedback-dialog--docs",
        preview: (
          <div className="pointer-events-none w-full">
            <div className="rounded-lg border border-stone-200 bg-white shadow-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-stone-900">Edit Campaign</p>
              <Input placeholder="Campaign name" className="h-7 text-xs" />
              <div className="flex justify-end gap-2 pt-1">
                <Button size="sm" variant="outline" className="h-7 text-xs">Cancel</Button>
                <Button size="sm" className="h-7 text-xs">Save</Button>
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "Sheet",
        description: "Slide-out panel for detail views and forms.",
        storyId: "4-components-feedback-sheet--docs",
        preview: (
          <div className="pointer-events-none w-full">
            <div className="rounded-l-lg border border-stone-200 bg-white shadow-lg p-3 space-y-2 ml-6">
              <p className="text-xs font-semibold text-stone-900">Creator Details</p>
              <Separator />
              <div className="space-y-1">
                <Skeleton className="h-2.5 w-3/4" />
                <Skeleton className="h-2.5 w-full" />
                <Skeleton className="h-2.5 w-1/2" />
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Data Display",
    icon: <Layers size={16} />,
    components: [
      {
        name: "Table",
        description: "Display structured data in rows and columns.",
        storyId: "4-components-data-display-table--docs",
        preview: (
          <div className="pointer-events-none w-full overflow-hidden rounded border border-stone-100">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  <th className="text-left px-2 py-1.5 font-medium text-stone-500">Creator</th>
                  <th className="text-left px-2 py-1.5 font-medium text-stone-500">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stone-50">
                  <td className="px-2 py-1.5 text-stone-700">Emma Wilson</td>
                  <td className="px-2 py-1.5"><Badge className="text-[10px] px-1.5 py-0">Active</Badge></td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 text-stone-700">Marcus Lee</td>
                  <td className="px-2 py-1.5"><Badge variant="secondary" className="text-[10px] px-1.5 py-0">Draft</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        name: "Avatar",
        description: "Display user profile images with fallback initials.",
        storyId: "3-primitives-avatar--docs",
        preview: (
          <div className="flex items-center gap-2">
            {[
              { fallback: "ET", color: "bg-violet-100 text-violet-700" },
              { fallback: "ML", color: "bg-blue-100 text-blue-700" },
              { fallback: "AJ", color: "bg-amber-100 text-amber-700" },
              { fallback: "DP", color: "bg-green-100 text-green-700" },
            ].map(({ fallback, color }) => (
              <Avatar key={fallback} className="h-8 w-8">
                <AvatarFallback className={`text-xs font-semibold ${color}`}>{fallback}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        ),
      },
      {
        name: "Calendar",
        description: "Date picker for selecting dates and date ranges.",
        storyId: "4-components-data-display-calendar--docs",
        preview: (
          <div className="pointer-events-none w-full">
            <div className="rounded-md border border-stone-200 bg-white p-2">
              <div className="text-xs font-medium text-center text-stone-700 mb-1">February 2026</div>
              <div className="grid grid-cols-7 gap-0.5 text-center text-[10px]">
                {["S","M","T","W","T","F","S"].map((d, i) => (
                  <div key={i} className="text-stone-400 py-0.5">{d}</div>
                ))}
                {Array.from({ length: 7 }, (_, i) => i + 15).map(d => (
                  <div key={d} className={`py-0.5 rounded ${d === 18 ? "bg-stone-900 text-white" : "text-stone-600"}`}>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "Carousel",
        description: "Swipeable content slider for images and cards.",
        storyId: "4-components-data-display-carousel--docs",
        preview: (
          <div className="w-full pointer-events-none">
            <div className="flex gap-2 items-center">
              <div className="h-16 w-16 rounded-md bg-stone-100 flex items-center justify-center text-xs text-stone-400 shrink-0">1</div>
              <div className="h-16 w-16 rounded-md bg-stone-100 flex items-center justify-center text-xs text-stone-400 shrink-0 ring-2 ring-stone-300">2</div>
              <div className="h-16 w-16 rounded-md bg-stone-100 flex items-center justify-center text-xs text-stone-400 shrink-0">3</div>
            </div>
          </div>
        ),
      },
      {
        name: "Hover Card",
        description: "Rich preview popup on hover for linked content.",
        storyId: "4-components-data-display-hovercard--docs",
        preview: (
          <div className="pointer-events-none w-full">
            <div className="rounded-lg border border-stone-200 bg-white shadow-md p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px] bg-violet-100 text-violet-700">ET</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-semibold text-stone-800">Emma Turner</p>
                  <p className="text-[10px] text-stone-400">@emmaturner</p>
                </div>
              </div>
              <p className="text-[10px] text-stone-500">245K followers &middot; 4.2% engagement</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Tables & Data",
    icon: <Table2 size={16} />,
    components: [
      {
        name: "DataTable",
        description: "Advanced sortable, selectable data table.",
        storyId: "4-components-tables-datatable--docs",
        preview: (
          <div className="pointer-events-none w-full overflow-hidden rounded border border-stone-100">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  <th className="text-left px-2 py-1.5 w-5"><Checkbox className="h-3 w-3" /></th>
                  <th className="text-left px-2 py-1.5 font-medium text-stone-500">Name</th>
                  <th className="text-left px-2 py-1.5 font-medium text-stone-500">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stone-50 bg-stone-50/50">
                  <td className="px-2 py-1.5"><Checkbox checked className="h-3 w-3" /></td>
                  <td className="px-2 py-1.5 text-stone-700">Emma W.</td>
                  <td className="px-2 py-1.5 text-stone-500">Creator</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5"><Checkbox className="h-3 w-3" /></td>
                  <td className="px-2 py-1.5 text-stone-700">Marcus L.</td>
                  <td className="px-2 py-1.5 text-stone-500">Creator</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        name: "Pagination",
        description: "Navigate between pages of data.",
        storyId: "4-components-tables-pagination--docs",
        preview: (
          <div className="pointer-events-none flex items-center gap-1">
            <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-xs">&laquo;</Button>
            <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-xs">1</Button>
            <Button size="sm" className="h-7 w-7 p-0 text-xs">2</Button>
            <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-xs">3</Button>
            <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-xs">&raquo;</Button>
          </div>
        ),
      },
      {
        name: "Filter Bar",
        description: "Filter controls for narrowing table data.",
        storyId: "4-components-tables-filterbar--docs",
        preview: (
          <div className="pointer-events-none w-full flex gap-2">
            <div className="flex items-center gap-1.5 border border-stone-200 rounded-md px-2 h-7 bg-white text-xs text-stone-500">
              <Search size={11} /> Search...
            </div>
            <div className="flex items-center gap-1 border border-stone-200 rounded-md px-2 h-7 bg-white text-xs text-stone-600">
              Status <ChevronDown size={11} />
            </div>
            <div className="flex items-center gap-1 border border-stone-200 rounded-md px-2 h-7 bg-white text-xs text-stone-600">
              Platform <ChevronDown size={11} />
            </div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Layout",
    icon: <PanelsTopLeft size={16} />,
    components: [
      {
        name: "App Shell",
        description: "Full page layout with sidebar navigation.",
        storyId: "5-layout-appshell--docs",
        preview: (
          <div className="pointer-events-none w-full">
            <div className="flex rounded-md border border-stone-200 overflow-hidden h-24">
              <div className="w-12 bg-stone-900 flex flex-col items-center py-2 gap-2">
                <div className="h-4 w-4 rounded bg-lime-400/80" />
                <div className="h-3 w-3 rounded bg-stone-600" />
                <div className="h-3 w-3 rounded bg-stone-600" />
                <div className="h-3 w-3 rounded bg-stone-600" />
              </div>
              <div className="flex-1 bg-stone-50 p-2">
                <Skeleton className="h-3 w-24 mb-2" />
                <Skeleton className="h-2 w-full mb-1" />
                <Skeleton className="h-2 w-3/4" />
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "Page Header",
        description: "Page title with breadcrumbs and action buttons.",
        storyId: "5-layout-pageheader--docs",
        preview: (
          <div className="pointer-events-none w-full space-y-1">
            <div className="flex items-center gap-1 text-[10px] text-stone-400">
              <span>Home</span> <span>/</span> <span>Campaigns</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-stone-900">Campaigns</p>
              <Button size="sm" className="h-6 text-xs px-2">Create</Button>
            </div>
          </div>
        ),
      },
      {
        name: "Breadcrumb",
        description: "Show navigation hierarchy and current location.",
        storyId: "4-components-navigation-breadcrumb--docs",
        preview: (
          <div className="pointer-events-none flex items-center gap-1.5 text-xs">
            <span className="text-stone-400 hover:text-stone-600">Home</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-400">Campaigns</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-700 font-medium">Summer 2026</span>
          </div>
        ),
      },
      {
        name: "Navigation Menu",
        description: "Top navigation bar with dropdowns.",
        storyId: "5-layout-navigationmenu--docs",
        preview: (
          <div className="pointer-events-none flex items-center gap-4 text-xs">
            <span className="text-stone-900 font-medium border-b-2 border-stone-900 pb-0.5">Dashboard</span>
            <span className="text-stone-500">Campaigns</span>
            <span className="text-stone-500">Creators</span>
            <span className="text-stone-500">Analytics</span>
          </div>
        ),
      },
    ],
  },
]

// ── Gallery Component ──────────────────────────────────────────

function ComponentGallery() {
  const navigateToStory = (storyId: string) => {
    const url = `/?path=/docs/${storyId}`
    // Story runs inside a Storybook iframe — navigate the parent window
    try {
      window.parent.location.href = url
    } catch {
      window.location.href = url
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="border-b border-stone-200 px-10 py-10">
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Components</h1>
        <p className="mt-2 text-base text-stone-500 max-w-2xl">
          Production-ready components built on shadcn/ui and Radix UI, styled for the Aspire design system.
          Click any component to view its documentation, props, and usage examples.
        </p>
        {/* Search bar */}
        <div className="mt-6 relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 outline-none focus:bg-white focus:border-stone-400 transition-colors"
            onChange={(e) => {
              const q = e.target.value.toLowerCase()
              document.querySelectorAll("[data-component-card]").forEach((el) => {
                const name = el.getAttribute("data-name") || ""
                ;(el as HTMLElement).style.display = name.includes(q) || q === "" ? "" : "none"
              })
              document.querySelectorAll("[data-category-section]").forEach((el) => {
                const visibleCards = el.querySelectorAll('[data-component-card]:not([style*="display: none"])')
                ;(el as HTMLElement).style.display = visibleCards.length === 0 ? "none" : ""
              })
            }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-10 py-10 space-y-14">
        {CATEGORIES.map((category) => (
          <section key={category.name} data-category-section>
            {/* Category header */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-stone-400">{category.icon}</span>
              <h2 className="text-lg font-semibold text-stone-900">{category.name}</h2>
              <span className="text-sm text-stone-400 font-normal ml-1">
                {category.components.length} components
              </span>
            </div>

            {/* Component grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.components.map((comp) => (
                <button
                  key={comp.name}
                  data-component-card
                  data-name={comp.name.toLowerCase()}
                  onClick={() => navigateToStory(comp.storyId)}
                  className="group text-left bg-white border border-stone-200 rounded-xl overflow-hidden
                             hover:border-stone-400 hover:shadow-md transition-all duration-150
                             focus:outline-none focus:ring-2 focus:ring-[#16282D] focus:ring-offset-2"
                >
                  {/* Preview area */}
                  <div className="bg-stone-50 border-b border-stone-100 px-5 py-6
                                  flex items-center justify-center min-h-[130px]
                                  group-hover:bg-stone-100 transition-colors">
                    <div className="w-full flex items-center justify-center">
                      {comp.preview}
                    </div>
                  </div>

                  {/* Label area */}
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-stone-900 group-hover:text-[#16282D]">
                        {comp.name}
                      </p>
                      <svg
                        className="text-stone-300 group-hover:text-[#16282D] group-hover:translate-x-0.5 transition-all"
                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5 leading-snug line-clamp-2">
                      {comp.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer count */}
      <div className="border-t border-stone-100 px-10 py-6">
        <p className="text-sm text-stone-400">
          {CATEGORIES.reduce((acc, c) => acc + c.components.length, 0)} components across{" "}
          {CATEGORIES.length} categories
        </p>
      </div>
    </div>
  )
}

// ── Story Export ────────────────────────────────────────────────

export const Gallery: StoryObj = {
  name: "Gallery",
  render: () => <ComponentGallery />,
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
}
