import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  BarChart,
  FileText,
  Activity,
} from "lucide-react";

export default {
  title: "Layout/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tab navigation for organizing related content into distinct sections.",
      },
    },
  },
};

export const Default = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-80">
      <TabsList className="w-full">
        <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" className="flex-1">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-3">
        <p className="text-sm text-muted-foreground">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-3">
        <p className="text-sm text-muted-foreground">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-3">
        <p className="text-sm text-muted-foreground">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
};

export const AccountSettings = {
  name: "Real World — Account Settings",
  render: () => (
    <Tabs defaultValue="profile" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="profile" className="gap-2">
          <User className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="password" className="gap-2">
          <Lock className="h-4 w-4" />
          Password
        </TabsTrigger>
        <TabsTrigger value="notifications" className="gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="billing" className="gap-2">
          <CreditCard className="h-4 w-4" />
          Billing
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="as-first">First name</Label>
                <Input id="as-first" defaultValue="Sarah" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="as-last">Last name</Label>
                <Input id="as-last" defaultValue="Johnson" />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="as-email">Email</Label>
              <Input id="as-email" type="email" defaultValue="sarah@example.com" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="as-username">Username</Label>
              <Input id="as-username" defaultValue="@sarahj" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Update your password. You'll be logged out after saving.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-1.5">
              <Label htmlFor="as-current-pw">Current password</Label>
              <Input id="as-current-pw" type="password" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="as-new-pw">New password</Label>
              <Input id="as-new-pw" type="password" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="as-confirm-pw">Confirm new password</Label>
              <Input id="as-confirm-pw" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update password</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose what you want to be notified about.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Project updates", desc: "New activity in your projects" },
              { label: "Team mentions", desc: "When someone @mentions you" },
              { label: "Weekly digest", desc: "Summary every Monday morning" },
              { label: "Security alerts", desc: "Suspicious account activity" },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch defaultChecked={label !== "Weekly digest"} />
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Manage your subscription and billing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Pro Plan</p>
                <p className="text-sm text-muted-foreground">$19/month · Renews Feb 28, 2026</p>
              </div>
              <Badge className="bg-indigo-500 hover:bg-indigo-600">Active</Badge>
            </div>
            <Separator />
            <div className="grid gap-1.5">
              <p className="text-sm font-medium">Payment method</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Visa ending in 4242 · Expires 12/26
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline">Update payment</Button>
            <Button variant="destructive" size="sm">Cancel plan</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const DashboardTabs = {
  name: "Real World — Dashboard Overview",
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList className="w-full">
        <TabsTrigger value="overview" className="flex-1 gap-1.5">
          <BarChart className="h-3.5 w-3.5" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="reports" className="flex-1 gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          Reports
        </TabsTrigger>
        <TabsTrigger value="activity" className="flex-1 gap-1.5">
          <Activity className="h-3.5 w-3.5" />
          Activity
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-3 space-y-3">
        {[
          { label: "Total Users", value: "12,842", change: "+8.2%" },
          { label: "Revenue", value: "$98,420", change: "+12.5%" },
          { label: "Conversion", value: "3.4%", change: "+0.3%" },
        ].map(({ label, value, change }) => (
          <div key={label} className="flex items-center justify-between rounded-lg border p-3">
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="text-right">
              <p className="font-semibold">{value}</p>
              <p className="text-xs text-emerald-500">{change}</p>
            </div>
          </div>
        ))}
      </TabsContent>
      <TabsContent value="reports" className="mt-3">
        <div className="rounded-lg border p-4 text-center text-sm text-muted-foreground">
          No reports generated yet.{" "}
          <span className="text-primary cursor-pointer">Create one →</span>
        </div>
      </TabsContent>
      <TabsContent value="activity" className="mt-3 space-y-2">
        {[
          "Sarah updated the design tokens",
          "Mike merged PR #142",
          "Alex created a new story",
          "Emma left a comment on Button",
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            {item}
          </div>
        ))}
      </TabsContent>
    </Tabs>
  ),
};
