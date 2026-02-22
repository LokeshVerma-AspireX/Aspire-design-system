import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Twitter, Linkedin } from "lucide-react";

const meta = {
  title: "Core/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Visually or semantically separates content. Supports horizontal and vertical orientations.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-72">
      <p className="text-sm font-medium">Section A</p>
      <Separator className="my-4" />
      <p className="text-sm font-medium">Section B</p>
    </div>
  ),
};

export const Vertical: Story = {
  name: "Vertical",
  render: () => (
    <div className="flex items-center gap-4 text-sm">
      <span>Home</span>
      <Separator orientation="vertical" className="h-5" />
      <span>About</span>
      <Separator orientation="vertical" className="h-5" />
      <span>Contact</span>
    </div>
  ),
};

export const WithLabel: Story = {
  name: "With Label (Or divider)",
  render: () => (
    <div className="w-72 space-y-4">
      <Button className="w-full" variant="outline">Continue with Google</Button>
      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          or
        </span>
      </div>
      <Button className="w-full">Sign in with email</Button>
    </div>
  ),
};

export const ProfileCard: Story = {
  name: "Real World — Profile Card",
  render: () => (
    <div className="w-72 rounded-lg border bg-card p-4 space-y-4">
      <div>
        <h3 className="font-semibold">Sarah Johnson</h3>
        <p className="text-sm text-muted-foreground">Lead Design Engineer</p>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Projects", value: "24" },
          { label: "Followers", value: "1.2k" },
          { label: "Stars", value: "342" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-lg font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="secondary">Design</Badge>
          <Badge variant="secondary">React</Badge>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          <Github className="h-4 w-4 cursor-pointer hover:text-foreground" />
          <Twitter className="h-4 w-4 cursor-pointer hover:text-foreground" />
          <Linkedin className="h-4 w-4 cursor-pointer hover:text-foreground" />
        </div>
      </div>
    </div>
  ),
};

export const Sidebar: Story = {
  name: "Real World — Sidebar Navigation",
  render: () => (
    <div className="w-48 rounded-lg border bg-card p-3 space-y-1">
      {["Dashboard", "Analytics", "Projects"].map((item) => (
        <button key={item} className="w-full text-left px-3 py-1.5 rounded-md text-sm hover:bg-muted transition-colors">
          {item}
        </button>
      ))}
      <Separator className="my-2" />
      {["Settings", "Team", "Billing"].map((item) => (
        <button key={item} className="w-full text-left px-3 py-1.5 rounded-md text-sm hover:bg-muted transition-colors">
          {item}
        </button>
      ))}
      <Separator className="my-2" />
      <button className="w-full text-left px-3 py-1.5 rounded-md text-sm text-destructive hover:bg-destructive/10 transition-colors">
        Sign out
      </button>
    </div>
  ),
};
