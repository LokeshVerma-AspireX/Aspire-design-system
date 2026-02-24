import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { within, expect } from "storybook/test"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

/**
 * # Skeleton
 *
 * An animated placeholder that mimics the shape of content while it loads.
 * Reduces perceived wait time and prevents layout shift by reserving space
 * for incoming data.
 *
 * ## When to Use
 * - As a loading placeholder for text, images, cards, and data tables
 * - When fetching data asynchronously and the layout is known ahead of time
 * - To prevent cumulative layout shift (CLS) during data loading
 *
 * ## When NOT to Use
 * - For determinate progress -- use the Progress component instead
 * - For inline loading inside buttons -- use a Spinner/Loader icon
 * - When the layout is completely unknown -- use a full-page spinner
 *
 * ## Accessibility
 * - Purely decorative; does not convey semantic information
 * - Pair with `aria-busy="true"` on the parent container during loading
 * - Replace with real content and set `aria-busy="false"` when loaded
 * - The `animate-pulse` animation respects `prefers-reduced-motion`
 *
 * ## Import
 * ```tsx
 * import { Skeleton } from '@/components/ui/skeleton'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Skeleton className="h-4 w-64" />           // text line
 * <Skeleton className="h-12 w-12 rounded-full" /> // avatar circle
 * ```
 */
const meta: Meta<typeof Skeleton> = {
  title: "4. Components/Data Display/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Animated placeholder for content that is loading. Reduces perceived wait time and prevents layout shift.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description:
        "Tailwind utility classes to control shape and size. Use `rounded-full` for circles, height/width for dimensions.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

// ─── BASIC SHAPES ──────────────────────────────────

/**
 * A single text-line skeleton. The most basic usage.
 *
 * ```tsx
 * <Skeleton className="h-4 w-64" />
 * ```
 */
export const Default: Story = {
  render: () => <Skeleton className="h-4 w-64" />,
}

/**
 * Multiple text lines to simulate a paragraph loading state.
 *
 * ```tsx
 * <div className="space-y-2">
 *   <Skeleton className="h-5 w-3/4" />
 *   <Skeleton className="h-4 w-full" />
 *   <Skeleton className="h-4 w-full" />
 *   <Skeleton className="h-4 w-2/3" />
 * </div>
 * ```
 */
export const TextLines: Story = {
  name: "Text Placeholder",
  render: () => (
    <div className="w-72 space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
}

/**
 * Circular skeleton for avatar placeholders. Use `rounded-full` and equal
 * width/height.
 *
 * ```tsx
 * <Skeleton className="h-12 w-12 rounded-full" />
 * ```
 */
export const CircleAvatar: Story = {
  name: "Circle (Avatar)",
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-16 w-16 rounded-full" />
    </div>
  ),
}

/**
 * Profile row skeleton -- avatar circle with text lines beside it.
 *
 * ```tsx
 * <div className="flex items-center gap-3">
 *   <Skeleton className="h-12 w-12 rounded-full" />
 *   <div className="space-y-2">
 *     <Skeleton className="h-4 w-32" />
 *     <Skeleton className="h-3 w-24" />
 *   </div>
 * </div>
 * ```
 */
export const ProfileRow: Story = {
  name: "Profile Row",
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
}

// ─── COMPOSITIONS ──────────────────────────────────

/**
 * Full card skeleton matching a typical Card layout with header, body, and
 * footer action.
 *
 * ```tsx
 * <Card className="w-64">
 *   <CardHeader>
 *     <Skeleton className="h-4 w-3/4" />
 *     <Skeleton className="h-3 w-1/2" />
 *   </CardHeader>
 *   <CardContent>
 *     <Skeleton className="h-3 w-full" />
 *   </CardContent>
 *   <CardFooter>
 *     <Skeleton className="h-9 w-full rounded-md" />
 *   </CardFooter>
 * </Card>
 * ```
 */
export const CardSkeleton: Story = {
  name: "Card Skeleton",
  render: () => (
    <Card className="w-64">
      <CardHeader className="gap-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-9 w-full rounded-md" />
      </CardFooter>
    </Card>
  ),
}

/**
 * Table skeleton with header row and multiple data rows. Useful when
 * a DataTable is loading server-side data.
 *
 * ```tsx
 * <div className="space-y-2 rounded-md border p-3">
 *   {Array.from({ length: 5 }).map((_, i) => (
 *     <div key={i} className="flex items-center gap-4">
 *       <Skeleton className="h-8 w-8 rounded-full" />
 *       <Skeleton className="h-4 flex-1" />
 *       <Skeleton className="h-5 w-16 rounded-full" />
 *     </div>
 *   ))}
 * </div>
 * ```
 */
export const TableRowSkeleton: Story = {
  name: "Table Row Skeleton",
  render: () => (
    <div className="w-[480px] space-y-2 rounded-md border p-3">
      <div className="flex gap-4 px-1 pb-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-md border px-3 py-2.5"
        >
          <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      ))}
    </div>
  ),
}

/**
 * Full page skeleton simulating a typical dashboard layout with a header,
 * metric cards, and a data table.
 *
 * ```tsx
 * <div className="space-y-6">
 *   <Skeleton className="h-8 w-48" />
 *   <div className="grid grid-cols-3 gap-4">
 *     ...metric card skeletons...
 *   </div>
 *   ...table skeleton...
 * </div>
 * ```
 */
export const FullPageSkeleton: Story = {
  name: "Full Page Skeleton",
  render: () => (
    <div className="w-[640px] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-lg border p-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="space-y-2 rounded-md border p-3">
        <div className="flex gap-4 px-1 pb-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-md border px-3 py-2.5"
          >
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  ),
}

/**
 * Profile card skeleton matching a creator/user profile card layout.
 *
 * ```tsx
 * <Card className="w-64">
 *   <CardHeader>
 *     <Skeleton className="h-12 w-12 rounded-full" />
 *     <Skeleton className="h-4 w-28" />
 *   </CardHeader>
 * </Card>
 * ```
 */
export const ProfileCardSkeleton: Story = {
  name: "Profile Card Skeleton",
  render: () => (
    <Card className="w-64">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
      <CardFooter className="gap-2">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </CardFooter>
    </Card>
  ),
}

// ─── TOGGLE: LOADING → LOADED ──────────────────────

/**
 * Interactive toggle between skeleton and loaded content. Demonstrates the
 * transition pattern from loading to hydrated state.
 *
 * ```tsx
 * {loaded ? <RealContent /> : <SkeletonPlaceholder />}
 * ```
 */
export const LoadingToggle: Story = {
  name: "Loading to Loaded Toggle",
  render: () => {
    const [loaded, setLoaded] = useState(false)
    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLoaded((l) => !l)}
        >
          {loaded ? "Show skeleton" : "Load content"}
        </Button>
        {loaded ? (
          <Card className="w-64">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Sarah"
                  />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Lead Designer</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Building design systems that scale. Open source contributor and
              workshop facilitator.
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="sm">
                View profile
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-64">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full rounded-md" />
            </CardFooter>
          </Card>
        )}
      </div>
    )
  },
}

// ─── REAL-WORLD: ASPIRE PATTERNS ───────────────────

/**
 * Creator card loading state for Aspire's creator discovery grid.
 * Matches the layout of a creator card with avatar, name, stats, and tags.
 *
 * ```tsx
 * <div className="grid grid-cols-2 gap-4">
 *   {Array.from({ length: 4 }).map((_, i) => (
 *     <CreatorCardSkeleton key={i} />
 *   ))}
 * </div>
 * ```
 */
export const CreatorCardLoading: Story = {
  name: "Aspire -- Creator Card Loading",
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-56 rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-10 rounded-full" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-5 w-12" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-5 w-12" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      ))}
    </div>
  ),
}

/**
 * Data table loading state for Aspire analytics and contacts pages.
 *
 * ```tsx
 * <div className="space-y-2 rounded-md border">
 *   ...header skeleton...
 *   ...row skeletons...
 * </div>
 * ```
 */
export const DataTableLoading: Story = {
  name: "Aspire -- Data Table Loading",
  render: () => (
    <div className="w-[560px] rounded-lg border bg-card">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
      {/* Table header */}
      <div className="flex gap-4 border-b px-4 py-2.5">
        <Skeleton className="h-4 w-4 shrink-0" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
      {/* Table rows */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0"
        >
          <Skeleton className="h-4 w-4 shrink-0" />
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
      {/* Pagination */}
      <div className="flex items-center justify-between border-t p-3">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  ),
}

/**
 * Analytics chart loading state. Simulates a chart area with axis labels
 * and legend.
 *
 * ```tsx
 * <div className="rounded-lg border p-4">
 *   <Skeleton className="h-[200px] w-full rounded-md" />
 * </div>
 * ```
 */
export const AnalyticsChartLoading: Story = {
  name: "Aspire -- Analytics Chart Loading",
  render: () => (
    <div className="w-[480px] space-y-4 rounded-lg border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-56" />
        </div>
        <Skeleton className="h-8 w-28 rounded-md" />
      </div>
      <Skeleton className="h-[200px] w-full rounded-md" />
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  ),
}

/**
 * User list loading skeleton. Matches the contacts sidebar pattern.
 *
 * ```tsx
 * <div className="divide-y rounded-lg border">
 *   {Array.from({ length: 4 }).map((_, i) => (
 *     <UserRowSkeleton key={i} />
 *   ))}
 * </div>
 * ```
 */
export const UserListLoading: Story = {
  name: "Aspire -- User List Loading",
  render: () => (
    <div className="w-80 divide-y rounded-lg border bg-card">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-4">
          <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      ))}
    </div>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies the skeleton element renders with the correct data-slot attribute
 * and the pulse animation class.
 */
export const RenderTest: Story = {
  name: "Test: Skeleton Renders",
  render: () => <Skeleton className="h-4 w-64" data-testid="test-skeleton" />,
  play: async ({ canvasElement }) => {
    const skeletonEl = canvasElement.querySelector('[data-slot="skeleton"]')
    await expect(skeletonEl).toBeInTheDocument()
    await expect(skeletonEl).toHaveClass("animate-pulse")
    await expect(skeletonEl).toHaveClass("rounded-md")
    await expect(skeletonEl).toHaveClass("bg-accent")
  },
}
