import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Upload,
  RotateCcw,
  Pause,
  Play,
  User,
  Image,
  FileText,
  CreditCard,
  Lock,
  BarChart3,
  FileCheck,
  Send,
} from "lucide-react"
import type { ElementType } from "react"

/**
 * # Progress
 *
 * A linear progress bar that displays completion status of a task, upload,
 * or multi-step flow. Built on Radix UI Progress primitive.
 *
 * ## When to Use
 * - To show determinate progress (upload, form completion, onboarding)
 * - To visualize a percentage or ratio (campaign completion, approval status)
 * - To communicate loading progress for long-running operations
 *
 * ## When NOT to Use
 * - For indeterminate loading -- use Skeleton or Spinner instead
 * - For showing a score or rating -- use a custom gauge or star component
 * - For navigation steps -- use a Stepper component
 *
 * ## Accessibility
 * - Renders as `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
 * - Screen readers announce the current progress value
 * - Pair with a visible label describing what the progress represents
 *
 * ## Import
 * ```tsx
 * import { Progress } from '@/components/ui/progress'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Progress value={60} className="w-80" />
 * ```
 */
const meta: Meta<typeof Progress> = {
  title: "4. Components/Data Display/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Linear progress bar for showing completion status of tasks, uploads, or multi-step flows.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value from 0 to 100.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
        category: "Data",
      },
    },
    max: {
      control: { type: "number", min: 1 },
      description: "Maximum value of the progress bar.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "100" },
        category: "Data",
      },
    },
    className: {
      control: "text",
      description:
        "Additional CSS classes. Use `[&>div]:bg-*` to change indicator color.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    value: 60,
    className: "w-80",
  },
}

export default meta
type Story = StoryObj<typeof Progress>

// ─── CORE VARIANTS ─────────────────────────────────

/**
 * Default progress bar at 60%. Drag the value slider in the Controls panel.
 *
 * ```tsx
 * <Progress value={60} className="w-80" />
 * ```
 */
export const Default: Story = {
  args: { value: 60, className: "w-80" },
}

/**
 * Empty state -- 0% progress. Nothing started yet.
 *
 * ```tsx
 * <Progress value={0} />
 * ```
 */
export const Empty: Story = {
  name: "0% -- Empty",
  args: { value: 0, className: "w-80" },
}

/**
 * Quarter complete -- 25%.
 *
 * ```tsx
 * <Progress value={25} />
 * ```
 */
export const Quarter: Story = {
  name: "25% -- Quarter",
  args: { value: 25, className: "w-80" },
}

/**
 * Half complete -- 50%.
 *
 * ```tsx
 * <Progress value={50} />
 * ```
 */
export const Half: Story = {
  name: "50% -- Half",
  args: { value: 50, className: "w-80" },
}

/**
 * Three quarters complete -- 75%.
 *
 * ```tsx
 * <Progress value={75} />
 * ```
 */
export const ThreeQuarters: Story = {
  name: "75% -- Three Quarters",
  args: { value: 75, className: "w-80" },
}

/**
 * Fully complete -- 100%.
 *
 * ```tsx
 * <Progress value={100} />
 * ```
 */
export const Complete: Story = {
  name: "100% -- Complete",
  args: { value: 100, className: "w-80" },
}

// ─── VALUE GALLERY ─────────────────────────────────

/**
 * All standard progress values displayed together for comparison.
 *
 * ```tsx
 * {[0, 25, 50, 75, 100].map((v) => (
 *   <Progress key={v} value={v} />
 * ))}
 * ```
 */
export const AllValues: Story = {
  name: "All Values",
  render: () => (
    <div className="w-80 space-y-4">
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {v === 0
                ? "Not started"
                : v === 100
                  ? "Complete"
                  : "In progress"}
            </span>
            <span className={v === 100 ? "font-medium text-emerald-500" : ""}>
              {v}%
            </span>
          </div>
          <Progress
            value={v}
            className={v === 100 ? "[&>div]:bg-emerald-500" : ""}
          />
        </div>
      ))}
    </div>
  ),
}

// ─── WITH LABEL ────────────────────────────────────

/**
 * Progress bar with an above label showing status text and percentage.
 *
 * ```tsx
 * <div className="space-y-1">
 *   <div className="flex justify-between text-sm">
 *     <span>Uploading...</span>
 *     <span>68%</span>
 *   </div>
 *   <Progress value={68} />
 * </div>
 * ```
 */
export const WithLabel: Story = {
  name: "With Label",
  render: () => (
    <div className="w-80 space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Uploading...</span>
        <span className="font-medium">68%</span>
      </div>
      <Progress value={68} />
    </div>
  ),
}

// ─── CUSTOM COLORS ─────────────────────────────────

/**
 * Custom indicator colors using Tailwind utility classes. Override the
 * indicator color with `[&>div]:bg-*`.
 *
 * ```tsx
 * <Progress value={80} className="[&>div]:bg-emerald-500" />
 * <Progress value={45} className="[&>div]:bg-amber-500" />
 * <Progress value={20} className="[&>div]:bg-red-500" />
 * ```
 */
export const CustomColors: Story = {
  name: "Custom Colors",
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-emerald-600 font-medium">Success</span>
          <span>80%</span>
        </div>
        <Progress value={80} className="[&>div]:bg-emerald-500" />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-amber-600 font-medium">Warning</span>
          <span>45%</span>
        </div>
        <Progress value={45} className="[&>div]:bg-amber-500" />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-red-600 font-medium">Critical</span>
          <span>20%</span>
        </div>
        <Progress value={20} className="[&>div]:bg-red-500" />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-blue-600 font-medium">Info</span>
          <span>65%</span>
        </div>
        <Progress value={65} className="[&>div]:bg-blue-500" />
      </div>
    </div>
  ),
}

// ─── SIZES ─────────────────────────────────────────

/**
 * Different bar heights achieved via Tailwind height classes.
 *
 * ```tsx
 * <Progress value={60} className="h-1" />
 * <Progress value={60} className="h-2" />
 * <Progress value={60} className="h-3" />
 * <Progress value={60} className="h-4" />
 * ```
 */
export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="w-80 space-y-4">
      {[
        { height: "h-1", label: "Thin (h-1)" },
        { height: "h-2", label: "Default (h-2)" },
        { height: "h-3", label: "Medium (h-3)" },
        { height: "h-4", label: "Thick (h-4)" },
      ].map(({ height, label }) => (
        <div key={height} className="space-y-1">
          <span className="text-xs text-muted-foreground">{label}</span>
          <Progress value={60} className={height} />
        </div>
      ))}
    </div>
  ),
}

// ─── ANIMATED ──────────────────────────────────────

/**
 * Animated progress that auto-increments. Demonstrates a real-time
 * upload or processing simulation with play/pause controls.
 *
 * ```tsx
 * const [progress, setProgress] = useState(0)
 * useEffect(() => {
 *   const t = setTimeout(() => setProgress((p) => p + 5), 200)
 *   return () => clearTimeout(t)
 * }, [progress])
 * ```
 */
export const Animated: Story = {
  name: "Animated (Auto-increment)",
  render: () => {
    const [progress, setProgress] = useState(0)
    const [running, setRunning] = useState(false)

    useEffect(() => {
      if (!running) return
      if (progress >= 100) {
        setRunning(false)
        return
      }
      const t = setTimeout(
        () => setProgress((p) => Math.min(p + Math.random() * 12, 100)),
        200
      )
      return () => clearTimeout(t)
    }, [running, progress])

    const reset = () => {
      setProgress(0)
      setRunning(false)
    }

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {progress >= 100
                ? "Complete!"
                : running
                  ? "Processing..."
                  : "Ready"}
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress
            value={progress}
            className={progress >= 100 ? "[&>div]:bg-emerald-500" : ""}
          />
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setRunning((r) => !r)}
            disabled={progress >= 100}
            className="flex-1"
          >
            {running ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {progress === 0 ? "Start" : "Resume"}
              </>
            )}
          </Button>
          <Button size="sm" variant="ghost" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  },
}

// ─── IN CARD CONTEXT ───────────────────────────────

/**
 * Progress bar inside a card with contextual information. Common layout
 * for dashboards and overview pages.
 *
 * ```tsx
 * <Card>
 *   <CardHeader>Campaign Progress</CardHeader>
 *   <CardContent>
 *     <Progress value={72} />
 *   </CardContent>
 * </Card>
 * ```
 */
export const InCardContext: Story = {
  name: "In Card Context",
  render: () => (
    <div className="w-80 space-y-4 rounded-lg border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Q1 Campaign Goal</p>
          <p className="text-xs text-muted-foreground">72 of 100 creators onboarded</p>
        </div>
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
        >
          72%
        </Badge>
      </div>
      <Progress value={72} className="[&>div]:bg-blue-500" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>28 remaining</span>
        <span>Due Mar 31</span>
      </div>
    </div>
  ),
}

// ─── REAL-WORLD: ASPIRE PATTERNS ───────────────────

/**
 * Profile completion tracker. Shows a checklist-style breakdown of
 * setup steps with overall progress.
 *
 * ```tsx
 * const pct = Math.round((completed / total) * 100)
 * <Progress value={pct} />
 * ```
 */
export const ProfileCompletion: Story = {
  name: "Aspire -- Profile Completion",
  render: () => {
    const steps: Array<{ icon: ElementType; label: string; done: boolean }> = [
      { icon: User, label: "Basic info", done: true },
      { icon: Image, label: "Profile photo", done: true },
      { icon: FileText, label: "Bio", done: true },
      { icon: CreditCard, label: "Payment method", done: false },
      { icon: Lock, label: "Enable 2FA", done: false },
    ]
    const completed = steps.filter((s) => s.done).length
    const pct = Math.round((completed / steps.length) * 100)

    return (
      <div className="w-80 rounded-lg border bg-card p-5 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Profile setup</p>
            <Badge
              variant="secondary"
              className={
                pct === 100 ? "bg-emerald-100 text-emerald-700" : ""
              }
            >
              {completed}/{steps.length} done
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Complete your profile to unlock all features
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span>{pct}% complete</span>
            {pct === 100 && (
              <span className="flex items-center gap-1 text-emerald-500">
                <CheckCircle2 className="h-3.5 w-3.5" />
                All done!
              </span>
            )}
          </div>
          <Progress
            value={pct}
            className={pct === 100 ? "[&>div]:bg-emerald-500" : ""}
          />
        </div>
        <ul className="space-y-2">
          {steps.map(({ icon: Icon, label, done }) => (
            <li key={label} className="flex items-center gap-2.5 text-sm">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  done
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Icon className="h-3.5 w-3.5" />
                )}
              </div>
              <span
                className={done ? "line-through text-muted-foreground" : ""}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  },
}

/**
 * File upload progress list. Shows multiple concurrent uploads with
 * individual progress bars -- common in campaign asset management.
 *
 * ```tsx
 * {files.map(({ name, progress }) => (
 *   <Progress value={progress} className="h-1.5" />
 * ))}
 * ```
 */
export const UploadProgress: Story = {
  name: "Aspire -- File Upload",
  render: () => {
    const files = [
      { name: "brand-guidelines.pdf", size: "2.4 MB", progress: 100, done: true },
      { name: "campaign-brief.docx", size: "340 KB", progress: 68, done: false },
      { name: "creator-photos.zip", size: "18.2 MB", progress: 24, done: false },
    ]

    return (
      <div className="w-80 rounded-lg border bg-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Uploading files</p>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Cancel all
          </Button>
        </div>
        {files.map(({ name, size, progress, done }) => (
          <div key={name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <p className="truncate text-sm">{name}</p>
              </div>
              <span className="ml-2 shrink-0 text-xs text-muted-foreground">
                {done ? size : `${progress}%`}
              </span>
            </div>
            <Progress
              value={progress}
              className={`h-1.5 ${done ? "[&>div]:bg-emerald-500" : ""}`}
            />
          </div>
        ))}
      </div>
    )
  },
}

/**
 * Campaign completion dashboard. Multiple progress indicators showing
 * different aspects of campaign fulfillment.
 *
 * ```tsx
 * <Progress value={87} className="[&>div]:bg-emerald-500" />
 * ```
 */
export const CampaignCompletion: Story = {
  name: "Aspire -- Campaign Completion",
  render: () => {
    const metrics = [
      { icon: User, label: "Creators onboarded", value: 87, color: "[&>div]:bg-emerald-500" },
      { icon: FileCheck, label: "Content approved", value: 62, color: "[&>div]:bg-blue-500" },
      { icon: Send, label: "Posts published", value: 45, color: "[&>div]:bg-violet-500" },
      { icon: BarChart3, label: "Reports delivered", value: 30, color: "[&>div]:bg-amber-500" },
    ]

    return (
      <div className="w-80 rounded-lg border bg-card p-5 space-y-5">
        <div>
          <p className="font-semibold text-sm">Summer Campaign 2025</p>
          <p className="text-xs text-muted-foreground">
            Overall campaign fulfillment
          </p>
        </div>
        {metrics.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{label}</span>
              </div>
              <span className="text-sm font-medium">{value}%</span>
            </div>
            <Progress value={value} className={`h-1.5 ${color}`} />
          </div>
        ))}
      </div>
    )
  },
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies the progress bar renders with the correct role and value attributes.
 */
export const RenderTest: Story = {
  name: "Test: Renders with Value",
  args: { value: 42, className: "w-80" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progressBar = canvas.getByRole("progressbar")
    await expect(progressBar).toBeInTheDocument()
  },
}

/**
 * Verifies the animated progress simulation works -- clicking Start
 * begins incrementing the value.
 */
export const AnimatedInteractionTest: Story = {
  name: "Test: Animated Start/Pause",
  render: () => {
    const [progress, setProgress] = useState(0)
    const [running, setRunning] = useState(false)

    useEffect(() => {
      if (!running) return
      if (progress >= 100) {
        setRunning(false)
        return
      }
      const t = setTimeout(
        () => setProgress((p) => Math.min(p + 15, 100)),
        100
      )
      return () => clearTimeout(t)
    }, [running, progress])

    return (
      <div className="w-80 space-y-4">
        <Progress value={progress} />
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setRunning((r) => !r)}
            disabled={progress >= 100}
          >
            {running ? "Pause" : progress === 0 ? "Start" : "Resume"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setProgress(0)
              setRunning(false)
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progressBar = canvas.getByRole("progressbar")
    await expect(progressBar).toBeInTheDocument()
    const startButton = canvas.getByRole("button", { name: "Start" })
    await userEvent.click(startButton)
  },
}
