import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell, Moon, Globe, Shield, Smartphone } from "lucide-react";

export default {
  title: "Core/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toggle switch for binary on/off states. Prefer Switch over Checkbox when the change takes immediate effect.",
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export const Default = {
  args: { id: "sw-default" },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-default">Off by default</Label>
    </div>
  ),
};

export const Checked = {
  args: { id: "sw-on", checked: true, onCheckedChange: () => {} },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-on">Enabled</Label>
    </div>
  ),
};

export const Disabled = {
  args: { id: "sw-disabled", disabled: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-disabled" className="text-muted-foreground">
        Unavailable
      </Label>
    </div>
  ),
};

export const Interactive = {
  name: "Interactive Toggle",
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <Switch id="sw-interactive" checked={on} onCheckedChange={setOn} />
          <Label htmlFor="sw-interactive">Dark mode</Label>
        </div>
        <p className="text-xs text-muted-foreground">
          Status: <span className="font-medium">{on ? "On" : "Off"}</span>
        </p>
      </div>
    );
  },
};

export const SettingsPanel = {
  name: "Real World — Notification Settings",
  render: () => {
    const settings = [
      {
        id: "email-notif",
        icon: Bell,
        label: "Email notifications",
        description: "Receive updates via email",
        default: true,
      },
      {
        id: "push-notif",
        icon: Smartphone,
        label: "Push notifications",
        description: "Alerts on your mobile device",
        default: true,
      },
      {
        id: "dark-mode",
        icon: Moon,
        label: "Dark mode",
        description: "Use dark color scheme",
        default: false,
      },
      {
        id: "public-profile",
        icon: Globe,
        label: "Public profile",
        description: "Make your profile visible to everyone",
        default: false,
      },
      {
        id: "two-factor",
        icon: Shield,
        label: "Two-factor auth",
        description: "Extra security for your account",
        default: true,
      },
    ];

    const [states, setStates] = useState(
      Object.fromEntries(settings.map((s) => [s.id, s.default]))
    );

    return (
      <div className="w-96 rounded-lg border bg-card">
        <div className="p-4">
          <h3 className="font-semibold">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your preferences
          </p>
        </div>
        <Separator />
        <div className="divide-y">
          {settings.map(({ id, icon: Icon, label, description }) => (
            <div key={id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
              <Switch
                id={id}
                checked={states[id]}
                onCheckedChange={(v) =>
                  setStates((s) => ({ ...s, [id]: v }))
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};
