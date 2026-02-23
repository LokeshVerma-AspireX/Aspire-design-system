import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "storybook/test";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  DollarSign,
  MoreHorizontal,
  Bell,
  Settings,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const METRICS = [
  {
    label: "Total Revenue",
    value: "$48,295",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Active Users",
    value: "2,847",
    change: "+8.2%",
    trend: "up" as const,
    icon: Users,
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "-0.4%",
    trend: "down" as const,
    icon: Activity,
  },
];

const PROJECTS = [
  { name: "Aspire Design System", progress: 78, status: "On track", statusColor: "text-emerald-600" },
  { name: "Mobile App Redesign", progress: 45, status: "At risk", statusColor: "text-amber-600" },
  { name: "API v3 Migration", progress: 92, status: "On track", statusColor: "text-emerald-600" },
  { name: "Analytics Dashboard", progress: 20, status: "Behind", statusColor: "text-destructive" },
];

const ACTIVITY = [
  { user: "Sarah J.", action: "deployed design tokens", time: "2m ago", initials: "SJ" },
  { user: "Mike C.", action: "merged PR #142", time: "18m ago", initials: "MC" },
  { user: "Emma W.", action: "updated Figma variables", time: "1h ago", initials: "EW" },
  { user: "Alex R.", action: "opened issue #87", time: "3h ago", initials: "AR" },
];

// ─── Dashboard Component ──────────────────────────────────────────────────────

function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-[760px] rounded-xl border bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">A</div>
          <span className="font-semibold text-sm">Aspire Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 h-8">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px]">SJ</AvatarFallback>
                </Avatar>
                <span className="text-sm">Sarah</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-lg font-bold">Good morning, Sarah 👋</h1>
          <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your projects today.</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          {METRICS.map(({ label, value, change, trend, icon: Icon }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">{value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {trend === "up" ? (
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                  )}
                  <span className={`text-xs font-medium ${trend === "up" ? "text-emerald-600" : "text-destructive"}`}>
                    {change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Quick stats */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Project Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "On track", count: 6, color: "bg-emerald-500" },
                    { label: "At risk", count: 2, color: "bg-amber-400" },
                    { label: "Behind", count: 1, color: "bg-destructive" },
                  ].map(({ label, count, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
                      <span className="text-sm flex-1">{label}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
              {/* Recent activity preview */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ACTIVITY.slice(0, 3).map(({ user, action, time, initials }) => (
                    <div key={time} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs truncate">
                          <span className="font-medium">{user}</span> {action}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {PROJECTS.map(({ name, progress, status, statusColor }, i) => (
                    <div key={name}>
                      {i > 0 && null}
                      <div className="flex items-center gap-4 px-4 py-3">
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">{name}</p>
                            <div className="flex items-center gap-2 shrink-0 ml-4">
                              <span className={`text-xs font-medium ${statusColor}`}>{status}</span>
                              <span className="text-xs text-muted-foreground">{progress}%</span>
                            </div>
                          </div>
                          <Progress value={progress} className="h-1.5" />
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {ACTIVITY.map(({ user, action, time, initials }) => (
                    <div key={`${user}-${time}`} className="flex items-center gap-3 px-4 py-3">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{user}</span>{" "}
                          <span className="text-muted-foreground">{action}</span>
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

/**
 * # Dashboard
 *
 * Full dashboard composition demonstrating a realistic product page with metrics,
 * tabbed content, and interactive elements.
 *
 * ## Components Used
 * - `Card`, `CardContent`, `CardHeader`, `CardTitle` — metric cards and content panels
 * - `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — overview/projects/activity switching
 * - `Badge` — project health count indicators
 * - `Avatar`, `AvatarFallback` — user avatars in header and activity feed
 * - `Progress` — project completion bars
 * - `Button` — actions, notifications, and overflow menus
 * - `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuTrigger` — user menu
 * - `Separator` — visual dividers
 * - Lucide icons: `TrendingUp`, `TrendingDown`, `Users`, `Activity`, `DollarSign`, `MoreHorizontal`, `Bell`, `Settings`, `LogOut`
 *
 * ## Data Requirements
 * - `METRICS` — array of `{ label, value, change, trend, icon }` for KPI cards
 * - `PROJECTS` — array of `{ name, progress, status, statusColor }` for project list
 * - `ACTIVITY` — array of `{ user, action, time, initials }` for activity feed
 *
 * ## Customization
 * - Metrics grid is responsive via CSS grid columns
 * - Tab content panels can be swapped with any custom content
 * - Header can include notification badges, search, or additional actions
 * - Project health summary colors map to status severity
 * - Activity feed supports avatar images via `AvatarImage`
 *
 * ```tsx
 * // This is an inline composition — not a standalone importable component.
 * // See source for the DashboardLayout implementation pattern.
 * ```
 */
const meta = {
  title: "7. Patterns/Dashboard",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default view with Overview tab active showing metrics, project health, and recent activity. */
export const Default: Story = {
  name: "Dashboard — Overview",
  render: () => <DashboardLayout />,
};

/** Projects tab showing progress bars and status indicators. Uses play function to navigate. */
export const ProjectsTab: Story = {
  name: "Dashboard — Projects Tab (Play)",
  render: () => <DashboardLayout />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the Projects tab
    const projectsTab = canvas.getByRole("tab", { name: /projects/i });
    await userEvent.click(projectsTab);

    // Verify the tab is now active
    await expect(projectsTab).toHaveAttribute("data-state", "active");

    // Verify project content is visible
    await expect(canvas.getByText("Aspire Design System")).toBeInTheDocument();
    await expect(canvas.getByText("Mobile App Redesign")).toBeInTheDocument();
  },
};

/** Activity tab showing the full activity feed. Uses play function to navigate. */
export const ActivityTab: Story = {
  name: "Dashboard — Activity Tab (Play)",
  render: () => <DashboardLayout />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Activity tab
    const activityTab = canvas.getByRole("tab", { name: /activity/i });
    await userEvent.click(activityTab);

    await expect(activityTab).toHaveAttribute("data-state", "active");
    await expect(canvas.getByText(/deployed design tokens/i)).toBeInTheDocument();
  },
};
