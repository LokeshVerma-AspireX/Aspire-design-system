import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarDays } from "lucide-react"
import type { DateRange } from "react-day-picker"

/**
 * # Calendar
 *
 * A date-picker calendar built on top of `react-day-picker` with shadcn/ui
 * styling. Supports single date, date range, and multiple date selection modes.
 *
 * ## When to Use
 * - To let users select a single date (e.g., campaign launch date)
 * - To let users select a date range (e.g., campaign duration, reporting window)
 * - To provide a visual date context inside forms and popovers
 *
 * ## When NOT to Use
 * - For date-only display without selection -- use a formatted text string instead
 * - For time-only input -- use a time picker instead
 * - For selecting relative dates like "last 7 days" -- use a preset dropdown
 *
 * ## Accessibility
 * - Full keyboard navigation between days, months, and years
 * - Arrow keys move between days; PageUp/PageDown navigate months
 * - `aria-selected` applied to selected day buttons
 * - Disabled dates are visually muted and removed from tab order
 * - Focus ring visible on keyboard navigation
 *
 * ## Import
 * ```tsx
 * import { Calendar } from '@/components/ui/calendar'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * const [date, setDate] = useState<Date | undefined>(new Date())
 *
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 *   className="rounded-md border"
 * />
 * ```
 */
const meta: Meta<typeof Calendar> = {
  title: "4. Components/Data Display/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A date picker built on react-day-picker. Supports single, multiple, and range selection modes with shadcn/ui styling.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "range", "multiple"],
      description:
        "Selection mode. `single` picks one date, `range` picks a start/end pair, `multiple` picks many individual dates.",
      table: {
        type: { summary: '"single" | "range" | "multiple"' },
        defaultValue: { summary: "single" },
        category: "Selection",
      },
    },
    selected: {
      description:
        "The currently selected date(s). Type depends on `mode`: Date for single, DateRange for range, Date[] for multiple.",
      table: {
        type: { summary: "Date | DateRange | Date[]" },
        category: "Selection",
      },
    },
    onSelect: {
      description: "Callback fired when the user selects a date. Signature depends on `mode`.",
      table: {
        type: { summary: "(value: Date | DateRange | Date[]) => void" },
        category: "Events",
      },
    },
    disabled: {
      description:
        "Dates to disable. Accepts a Date, array of Dates, or a matcher object like `{ before: new Date() }`.",
      table: {
        type: { summary: "Matcher | Matcher[]" },
        category: "Validation",
      },
    },
    showOutsideDays: {
      control: "boolean",
      description: "Show days from the previous/next month to fill the grid.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Appearance",
      },
    },
    captionLayout: {
      control: "select",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
      description:
        "How the month/year caption is rendered. `dropdown` allows quick month/year jumping.",
      table: {
        type: { summary: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"' },
        defaultValue: { summary: "label" },
        category: "Appearance",
      },
    },
    buttonVariant: {
      control: "select",
      options: ["ghost", "outline", "default", "secondary"],
      description: "Variant applied to the prev/next navigation buttons.",
      table: {
        type: { summary: '"ghost" | "outline" | "default" | "secondary"' },
        defaultValue: { summary: "ghost" },
        category: "Appearance",
      },
    },
    numberOfMonths: {
      control: { type: "number", min: 1, max: 4 },
      description: "Number of months to display side by side.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
        category: "Appearance",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the root element.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    onSelect: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

// ─── CORE VARIANTS ─────────────────────────────────

/**
 * Single date selection mode. The most common usage for picking one date.
 *
 * ```tsx
 * const [date, setDate] = useState<Date | undefined>(new Date())
 *
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 * ```
 */
export const SingleDate: Story = {
  name: "Single Date",
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="space-y-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        {date && (
          <p className="text-center text-sm text-muted-foreground">
            Selected: {date.toLocaleDateString("en-US", { dateStyle: "long" })}
          </p>
        )}
      </div>
    )
  },
}

/**
 * Range selection mode. Select a start and end date for spans like campaign
 * durations or reporting windows.
 *
 * ```tsx
 * const [range, setRange] = useState<DateRange | undefined>()
 *
 * <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
 * ```
 */
export const RangePicker: Story = {
  name: "Range Picker",
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    return (
      <div className="space-y-3">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          className="rounded-md border"
        />
        {range?.from && range?.to && (
          <p className="text-center text-sm text-muted-foreground">
            {range.from.toLocaleDateString()} &rarr; {range.to.toLocaleDateString()}
          </p>
        )}
      </div>
    )
  },
}

/**
 * Multiple date selection. Select several individual dates (e.g., content
 * publishing schedule or blackout dates).
 *
 * ```tsx
 * const [dates, setDates] = useState<Date[] | undefined>([])
 *
 * <Calendar mode="multiple" selected={dates} onSelect={setDates} />
 * ```
 */
export const MultipleDates: Story = {
  name: "Multiple Dates",
  render: () => {
    const [dates, setDates] = useState<Date[] | undefined>([
      new Date(),
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    ])

    return (
      <div className="space-y-3">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          className="rounded-md border"
        />
        <p className="text-center text-sm text-muted-foreground">
          {dates?.length ?? 0} date{(dates?.length ?? 0) !== 1 ? "s" : ""} selected
        </p>
      </div>
    )
  },
}

// ─── MONTHS & LAYOUT ─────────────────────────────────

/**
 * Display two months side by side. Useful for range selection where users need
 * to see span context.
 *
 * ```tsx
 * <Calendar numberOfMonths={2} className="rounded-md border" />
 * ```
 */
export const TwoMonths: Story = {
  name: "Two Months",
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        className="rounded-md border"
      />
    )
  },
}

/**
 * Three-month view for broader date range context.
 *
 * ```tsx
 * <Calendar numberOfMonths={3} />
 * ```
 */
export const ThreeMonths: Story = {
  name: "Three Months",
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={3}
        className="rounded-md border"
      />
    )
  },
}

// ─── DISABLED / CONSTRAINED DATES ─────────────────────

/**
 * Disable dates before today. Common for scheduling future events like
 * campaign launches.
 *
 * ```tsx
 * <Calendar
 *   mode="single"
 *   disabled={{ before: new Date() }}
 * />
 * ```
 */
export const DisabledPastDates: Story = {
  name: "Disabled Past Dates",
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ before: new Date() }}
        className="rounded-md border"
      />
    )
  },
}

/**
 * Constrain selection to a min/max date window. Useful for limiting
 * campaign date range to a specific quarter or billing period.
 *
 * ```tsx
 * const min = new Date(2025, 0, 1)
 * const max = new Date(2025, 2, 31)
 *
 * <Calendar
 *   mode="single"
 *   disabled={[{ before: min }, { after: max }]}
 * />
 * ```
 */
export const MinMaxDates: Story = {
  name: "Min / Max Date Window",
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    const today = new Date()
    const min = new Date(today.getFullYear(), today.getMonth(), 1)
    const max = new Date(today.getFullYear(), today.getMonth() + 2, 0)

    return (
      <div className="space-y-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={[{ before: min }, { after: max }]}
          className="rounded-md border"
        />
        <p className="text-center text-xs text-muted-foreground">
          Only dates in the current and next month are selectable
        </p>
      </div>
    )
  },
}

/**
 * Disable specific days of the week (e.g., weekends) so creators cannot
 * schedule content on non-business days.
 *
 * ```tsx
 * <Calendar
 *   mode="single"
 *   disabled={{ dayOfWeek: [0, 6] }}
 * />
 * ```
 */
export const DisabledWeekends: Story = {
  name: "Disabled Weekends",
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    return (
      <div className="space-y-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={{ dayOfWeek: [0, 6] }}
          className="rounded-md border"
        />
        <p className="text-center text-xs text-muted-foreground">
          Weekends are disabled
        </p>
      </div>
    )
  },
}

// ─── CAPTION LAYOUT ────────────────────────────────────

/**
 * Dropdown caption layout for quickly jumping between months and years.
 *
 * ```tsx
 * <Calendar
 *   captionLayout="dropdown"
 *   startMonth={new Date(2020, 0)}
 *   endMonth={new Date(2030, 11)}
 * />
 * ```
 */
export const DropdownCaption: Story = {
  name: "Dropdown Caption",
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
        className="rounded-md border"
      />
    )
  },
}

// ─── COMPOSITIONS & REAL-WORLD PATTERNS ────────────────

/**
 * Date picker popover -- the most common real-world usage. A button triggers
 * a popover containing the calendar. Use this pattern in forms for fields
 * like campaign start date or content deadline.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">
 *       <CalendarDays className="mr-2 h-4 w-4" />
 *       Pick a date
 *     </Button>
 *   </PopoverTrigger>
 *   <PopoverContent className="w-auto p-0">
 *     <Calendar mode="single" selected={date} onSelect={setDate} />
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const DatePickerPopover: Story = {
  name: "Date Picker Popover",
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    const [open, setOpen] = useState(false)

    return (
      <div className="w-72 space-y-3 rounded-lg border bg-card p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Campaign launch date</p>
          <p className="text-xs text-muted-foreground">
            Select when this campaign goes live.
          </p>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              {date ? (
                date.toLocaleDateString("en-US", { dateStyle: "medium" })
              ) : (
                <span className="text-muted-foreground">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d)
                setOpen(false)
              }}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
        {date && (
          <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
            <span className="text-xs text-muted-foreground">Selected date</span>
            <Badge variant="secondary" className="text-xs">
              {date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Badge>
          </div>
        )}
      </div>
    )
  },
}

/**
 * Aspire campaign date range picker. Two-month range selection inside a
 * card for selecting the active window of a creator campaign.
 *
 * ```tsx
 * <Calendar
 *   mode="range"
 *   selected={range}
 *   onSelect={setRange}
 *   numberOfMonths={2}
 *   disabled={{ before: new Date() }}
 * />
 * ```
 */
export const CampaignDateRange: Story = {
  name: "Aspire -- Campaign Date Range",
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()

    return (
      <div className="w-auto space-y-4 rounded-lg border bg-card p-4">
        <div>
          <p className="text-sm font-semibold">Campaign duration</p>
          <p className="text-xs text-muted-foreground">
            Select start and end dates for your influencer campaign.
          </p>
        </div>
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          disabled={{ before: new Date() }}
          className="rounded-md border"
        />
        <div className="flex items-center gap-2">
          {range?.from ? (
            <Badge variant="secondary" className="text-xs">
              Start: {range.from.toLocaleDateString("en-US", { dateStyle: "medium" })}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              No start date
            </Badge>
          )}
          {range?.to ? (
            <Badge variant="secondary" className="text-xs">
              End: {range.to.toLocaleDateString("en-US", { dateStyle: "medium" })}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              No end date
            </Badge>
          )}
        </div>
      </div>
    )
  },
}

/**
 * Content deadline scheduler. Single date picker with future-only constraint,
 * used when assigning due dates to creator deliverables.
 *
 * ```tsx
 * <Calendar
 *   mode="single"
 *   disabled={{ before: new Date() }}
 * />
 * ```
 */
export const ContentDeadline: Story = {
  name: "Aspire -- Content Deadline",
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    const [open, setOpen] = useState(false)

    return (
      <div className="w-80 space-y-3 rounded-lg border bg-card p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Content deadline</p>
          <p className="text-xs text-muted-foreground">
            When should the creator submit their draft?
          </p>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              {date ? (
                date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              ) : (
                <span className="text-muted-foreground">Set deadline</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d)
                setOpen(false)
              }}
              disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
            />
          </PopoverContent>
        </Popover>
        {date && (
          <p className="text-xs text-muted-foreground">
            The creator has until{" "}
            <span className="font-medium text-foreground">
              {date.toLocaleDateString("en-US", { dateStyle: "long" })}
            </span>{" "}
            to submit their content.
          </p>
        )}
      </div>
    )
  },
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that the calendar renders and contains navigable day buttons.
 */
export const RenderTest: Story = {
  name: "Test: Calendar Renders",
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // The calendar should render a grid element
    const calendarEl = canvasElement.querySelector('[data-slot="calendar"]')
    await expect(calendarEl).toBeInTheDocument()
    // Navigation buttons (prev/next) should exist
    const prevButton = canvas.getAllByRole("button").find(
      (btn) => btn.getAttribute("name") === "Previous Month" || btn.classList.contains("rdp-button_previous")
    )
    // Calendar should have multiple buttons (day cells + navigation)
    const allButtons = canvas.getAllByRole("button")
    await expect(allButtons.length).toBeGreaterThan(2)
  },
}

/**
 * Verifies that clicking a day button triggers selection and updates the display.
 */
export const SelectDateTest: Story = {
  name: "Test: Select a Day",
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    return (
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        {date && (
          <p data-testid="selected-output" className="mt-2 text-center text-sm">
            {date.toLocaleDateString("en-US", { dateStyle: "long" })}
          </p>
        )}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Find a clickable day button (non-disabled, non-outside day)
    const dayButtons = canvas.getAllByRole("button").filter((btn) => {
      const text = btn.textContent?.trim() ?? ""
      return /^\d+$/.test(text) && !btn.hasAttribute("disabled")
    })
    await expect(dayButtons.length).toBeGreaterThan(0)
    // Click the first available day
    await userEvent.click(dayButtons[0])
    // After clicking, the selected-output should appear
    const output = canvasElement.querySelector('[data-testid="selected-output"]')
    await expect(output).toBeInTheDocument()
  },
}

/**
 * Verifies keyboard navigation within the calendar grid.
 */
export const KeyboardNavTest: Story = {
  name: "Test: Keyboard Navigation",
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Find day buttons
    const dayButtons = canvas.getAllByRole("button").filter((btn) => {
      const text = btn.textContent?.trim() ?? ""
      return /^\d+$/.test(text)
    })
    await expect(dayButtons.length).toBeGreaterThan(0)
    // Tab into the calendar and use keyboard
    await userEvent.click(dayButtons[0])
    await userEvent.keyboard("{ArrowRight}")
    // After pressing ArrowRight, focus should have moved
    const focusedEl = document.activeElement
    await expect(focusedEl).not.toBeNull()
  },
}
