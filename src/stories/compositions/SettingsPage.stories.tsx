import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Upload } from "lucide-react";

// ─── Profile Tab ──────────────────────────────────────────────────────────────

function ProfileTab() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {saved && (
        <Alert className="border-emerald-500/50 bg-emerald-50 text-emerald-800 [&>svg]:text-emerald-600 py-2">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className="text-sm">Profile saved successfully!</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="Sarah Johnson" />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Upload className="h-3.5 w-3.5" />
            Change photo
          </Button>
          <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
        </div>
      </div>

      <Separator />

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="settings-first">First name</Label>
            <Input id="settings-first" defaultValue="Sarah" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="settings-last">Last name</Label>
            <Input id="settings-last" defaultValue="Johnson" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="settings-email">Email</Label>
          <Input id="settings-email" type="email" defaultValue="sarah@aspire.io" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="settings-bio">Bio</Label>
          <Input id="settings-bio" defaultValue="Lead Design Engineer at Aspire" />
          <p className="text-xs text-muted-foreground">Shown on your public profile.</p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="settings-timezone">Timezone</Label>
          <Select defaultValue="pst">
            <SelectTrigger id="settings-timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pst">Pacific Time (PST) — UTC-8</SelectItem>
              <SelectItem value="mst">Mountain Time (MST) — UTC-7</SelectItem>
              <SelectItem value="cst">Central Time (CST) — UTC-6</SelectItem>
              <SelectItem value="est">Eastern Time (EST) — UTC-5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Discard</Button>
        <Button onClick={handleSave}>Save changes</Button>
      </div>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────

const NOTIFICATION_GROUPS = [
  {
    title: "Email Notifications",
    items: [
      { id: "email-comments", label: "New comments", desc: "When someone comments on your work.", defaultChecked: true },
      { id: "email-mentions", label: "Mentions", desc: "When someone @mentions you.", defaultChecked: true },
      { id: "email-digest", label: "Weekly digest", desc: "A weekly summary of activity.", defaultChecked: false },
    ],
  },
  {
    title: "Push Notifications",
    items: [
      { id: "push-activity", label: "Activity", desc: "Live activity updates.", defaultChecked: false },
      { id: "push-reminders", label: "Reminders", desc: "Deadline and meeting reminders.", defaultChecked: true },
    ],
  },
];

function NotificationsTab() {
  return (
    <div className="space-y-6">
      {NOTIFICATION_GROUPS.map(({ title, items }) => (
        <div key={title} className="space-y-4">
          <h3 className="text-sm font-semibold">{title}</h3>
          <div className="space-y-3">
            {items.map(({ id, label, desc, defaultChecked }) => (
              <div key={id} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch id={id} defaultChecked={defaultChecked} />
              </div>
            ))}
          </div>
          <Separator />
        </div>
      ))}
      <div className="flex justify-end">
        <Button>Save preferences</Button>
      </div>
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────────────────

function SecurityTab() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Change Password</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="current-pw">Current password</Label>
            <Input id="current-pw" type="password" placeholder="Enter current password" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-pw">New password</Label>
            <Input id="new-pw" type="password" placeholder="Min. 8 characters" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm-pw">Confirm new password</Label>
            <Input id="confirm-pw" type="password" placeholder="Re-enter new password" />
          </div>
        </div>
        <Button variant="outline">Update password</Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold">Two-Factor Authentication</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account.</p>
          </div>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Enabled</Badge>
        </div>
        <Button variant="outline" size="sm">Manage 2FA</Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
        <div className="rounded-lg border border-destructive/30 p-4 space-y-3">
          <div>
            <p className="text-sm font-medium">Delete account</p>
            <p className="text-xs text-muted-foreground">Permanently delete your account and all data. This cannot be undone.</p>
          </div>
          <Button variant="destructive" size="sm">Delete account</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Full Settings Layout ─────────────────────────────────────────────────────

function SettingsLayout({ defaultTab = "profile" }: { defaultTab?: string }) {
  return (
    <div className="w-[640px] rounded-xl border bg-card overflow-hidden">
      <div className="border-b px-6 py-4">
        <h1 className="text-base font-bold">Account Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your profile, notifications, and security.</p>
      </div>
      <div className="p-6">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile"><ProfileTab /></TabsContent>
          <TabsContent value="notifications"><NotificationsTab /></TabsContent>
          <TabsContent value="security"><SecurityTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Compositions/Settings Page",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Settings page composition with tabbed navigation, form inputs, switches, selects, and alerts. Demonstrates multi-section form UX.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Profile: Story = {
  name: "Settings — Profile Tab",
  render: () => <SettingsLayout defaultTab="profile" />,
};

export const Notifications: Story = {
  name: "Settings — Notifications Tab",
  render: () => <SettingsLayout defaultTab="notifications" />,
};

export const Security: Story = {
  name: "Settings — Security Tab",
  render: () => <SettingsLayout defaultTab="security" />,
};

export const SaveProfile: Story = {
  name: "Settings — Save Profile (Play)",
  render: () => <SettingsLayout defaultTab="profile" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Update first name
    const firstNameInput = canvas.getByDisplayValue("Sarah");
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "Alexandra", { delay: 40 });

    // Click Save changes
    const saveBtn = canvas.getByRole("button", { name: /save changes/i });
    await userEvent.click(saveBtn);

    // Verify success alert
    await expect(canvas.getByText(/profile saved successfully/i)).toBeInTheDocument();
  },
};

export const SwitchToNotifications: Story = {
  name: "Settings — Navigate to Notifications (Play)",
  render: () => <SettingsLayout defaultTab="profile" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const notifTab = canvas.getByRole("tab", { name: /notifications/i });
    await userEvent.click(notifTab);

    await expect(notifTab).toHaveAttribute("data-state", "active");
    await expect(canvas.getByText("Email Notifications")).toBeInTheDocument();
  },
};
