"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Bell,
  BellOff,
  Megaphone,
  Users,
  FileCheck,
  CreditCard,
  CalendarClock,
  Moon,
  Send,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChannelToggles {
  email: boolean
  push: boolean
  inApp: boolean
}

interface CategoryState {
  [event: string]: ChannelToggles
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TIMES = [
  "12:00 AM",
  "1:00 AM",
  "2:00 AM",
  "3:00 AM",
  "4:00 AM",
  "5:00 AM",
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
]

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ToggleGrid({
  events,
  state,
  onChange,
  disabled,
}: {
  events: string[]
  state: CategoryState
  onChange: (event: string, channel: keyof ChannelToggles, value: boolean) => void
  disabled?: boolean
}) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 pb-2">
        <span className="text-sm font-medium text-muted-foreground">Event</span>
        <span className="text-sm font-medium text-muted-foreground text-center">
          Email
        </span>
        <span className="text-sm font-medium text-muted-foreground text-center">
          Push
        </span>
        <span className="text-sm font-medium text-muted-foreground text-center">
          In-App
        </span>
      </div>
      <Separator />
      {/* Rows */}
      {events.map((event) => (
        <div
          key={event}
          className="grid grid-cols-4 gap-4 items-center py-3 border-b border-border last:border-b-0"
        >
          <span className="text-sm">{event}</span>
          {(["email", "push", "inApp"] as const).map((channel) => (
            <div key={channel} className="flex justify-center">
              <Switch
                checked={state[event]?.[channel] ?? false}
                onCheckedChange={(v) => onChange(event, channel, !!v)}
                disabled={disabled}
                aria-label={`${event} ${channel}`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function CategoryCard({
  icon: Icon,
  title,
  description,
  events,
  state,
  onChange,
  disabled,
  children,
}: {
  icon: React.ElementType
  title: string
  description: string
  events: string[]
  state: CategoryState
  onChange: (event: string, channel: keyof ChannelToggles, value: boolean) => void
  disabled?: boolean
  children?: React.ReactNode
}) {
  return (
    <Card className="bg-card rounded-xl border border-border p-6">
      <CardHeader className="p-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <ToggleGrid
          events={events}
          state={state}
          onChange={onChange}
          disabled={disabled}
        />
        {children}
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

function NotificationSettings() {
  // Master toggle
  const [pauseAll, setPauseAll] = React.useState(false)

  // Campaign Updates
  const [campaignState, setCampaignState] = React.useState<CategoryState>({
    "Campaign launched": { email: true, push: true, inApp: true },
    "Campaign ended": { email: true, push: false, inApp: true },
    "Budget alert": { email: true, push: true, inApp: true },
  })

  // Creator Activity
  const [creatorState, setCreatorState] = React.useState<CategoryState>({
    "New application": { email: true, push: true, inApp: true },
    "Content submitted": { email: true, push: false, inApp: true },
    "Creator message": { email: false, push: true, inApp: true },
  })

  // Content & Approvals
  const [contentState, setContentState] = React.useState<CategoryState>({
    "Content ready for review": { email: true, push: true, inApp: true },
    "Content approved": { email: true, push: false, inApp: true },
    "Revision requested": { email: true, push: true, inApp: true },
  })

  // Billing & Payments
  const [billingState, setBillingState] = React.useState<CategoryState>({
    "Payment processed": { email: true, push: false, inApp: true },
    "Invoice generated": { email: true, push: false, inApp: true },
    "Payment failed": { email: true, push: true, inApp: true },
  })

  // Weekly Digest
  const [digestState, setDigestState] = React.useState<CategoryState>({
    "Weekly summary": { email: true, push: false, inApp: true },
    "Monthly report": { email: true, push: false, inApp: false },
  })
  const [digestDay, setDigestDay] = React.useState("Mon")
  const [digestTime, setDigestTime] = React.useState("9:00 AM")

  // Quiet Hours
  const [quietStart, setQuietStart] = React.useState("10:00 PM")
  const [quietEnd, setQuietEnd] = React.useState("8:00 AM")

  // Generic updater factory
  function makeUpdater(
    setter: React.Dispatch<React.SetStateAction<CategoryState>>
  ) {
    return (event: string, channel: keyof ChannelToggles, value: boolean) => {
      setter((prev) => ({
        ...prev,
        [event]: {
          ...prev[event],
          [channel]: value,
        },
      }))
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      {/* ----------------------------------------------------------------- */}
      {/* Master Toggle                                                     */}
      {/* ----------------------------------------------------------------- */}
      <Card className="bg-card rounded-xl border border-border p-6">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200",
                  pauseAll
                    ? "bg-destructive/10"
                    : "bg-muted"
                )}
              >
                <BellOff
                  className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    pauseAll
                      ? "text-destructive"
                      : "text-muted-foreground"
                  )}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Label className="text-base font-semibold">
                    Pause All Notifications
                  </Label>
                  {pauseAll && (
                    <Badge variant="destructive" className="text-xs">
                      Paused
                    </Badge>
                  )}
                </div>
                <p
                  className={cn(
                    "text-sm transition-colors duration-200",
                    pauseAll
                      ? "text-destructive"
                      : "text-muted-foreground"
                  )}
                >
                  {pauseAll
                    ? "All notifications are currently paused."
                    : "Temporarily silence every notification channel."}
                </p>
              </div>
            </div>
            <Switch
              checked={pauseAll}
              onCheckedChange={setPauseAll}
              aria-label="Pause all notifications"
            />
          </div>
        </CardContent>
      </Card>

      {/* ----------------------------------------------------------------- */}
      {/* Category Cards                                                    */}
      {/* ----------------------------------------------------------------- */}
      <div
        className={cn(
          "flex flex-col gap-6 transition-opacity duration-300",
          pauseAll && "pointer-events-none opacity-50"
        )}
      >
        {/* Campaign Updates */}
        <CategoryCard
          icon={Megaphone}
          title="Campaign Updates"
          description="Notifications about your campaign lifecycle and budgets."
          events={["Campaign launched", "Campaign ended", "Budget alert"]}
          state={campaignState}
          onChange={makeUpdater(setCampaignState)}
          disabled={pauseAll}
        />

        {/* Creator Activity */}
        <CategoryCard
          icon={Users}
          title="Creator Activity"
          description="Stay updated on creator applications, submissions, and messages."
          events={["New application", "Content submitted", "Creator message"]}
          state={creatorState}
          onChange={makeUpdater(setCreatorState)}
          disabled={pauseAll}
        />

        {/* Content & Approvals */}
        <CategoryCard
          icon={FileCheck}
          title="Content & Approvals"
          description="Track content review status and approval workflows."
          events={[
            "Content ready for review",
            "Content approved",
            "Revision requested",
          ]}
          state={contentState}
          onChange={makeUpdater(setContentState)}
          disabled={pauseAll}
        />

        {/* Billing & Payments */}
        <CategoryCard
          icon={CreditCard}
          title="Billing & Payments"
          description="Payment confirmations, invoices, and failure alerts."
          events={["Payment processed", "Invoice generated", "Payment failed"]}
          state={billingState}
          onChange={makeUpdater(setBillingState)}
          disabled={pauseAll}
        />

        {/* Weekly Digest */}
        <CategoryCard
          icon={CalendarClock}
          title="Weekly Digest"
          description="Periodic summaries and performance reports."
          events={["Weekly summary", "Monthly report"]}
          state={digestState}
          onChange={makeUpdater(setDigestState)}
          disabled={pauseAll}
        >
          <Separator className="my-4" />
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground whitespace-nowrap">
                Delivery day
              </Label>
              <Select
                value={digestDay}
                onValueChange={setDigestDay}
                disabled={pauseAll}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground whitespace-nowrap">
                Delivery time
              </Label>
              <Select
                value={digestTime}
                onValueChange={setDigestTime}
                disabled={pauseAll}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  {TIMES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CategoryCard>

        {/* --------------------------------------------------------------- */}
        {/* Quiet Hours                                                     */}
        {/* --------------------------------------------------------------- */}
        <Card className="bg-card rounded-xl border border-border p-6">
          <CardHeader className="p-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Moon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Quiet Hours</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Suppress push and in-app notifications during these hours.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground whitespace-nowrap">
                  From
                </Label>
                <Select
                  value={quietStart}
                  onValueChange={setQuietStart}
                  disabled={pauseAll}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground whitespace-nowrap">
                  To
                </Label>
                <Select
                  value={quietEnd}
                  onValueChange={setQuietEnd}
                  disabled={pauseAll}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --------------------------------------------------------------- */}
        {/* Test Notification                                               */}
        {/* --------------------------------------------------------------- */}
        <div className="flex justify-end">
          <Button disabled={pauseAll}>
            <Send className="h-4 w-4" />
            Send Test Notification
          </Button>
        </div>
      </div>
    </div>
  )
}

export { NotificationSettings }
