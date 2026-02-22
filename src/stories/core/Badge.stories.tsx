import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Zap,
  Star,
} from "lucide-react";

const meta = {
  title: "Core/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Small status labels for highlighting categories, states, and metadata.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Default", variant: "default" },
};

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
};

export const Destructive: Story = {
  args: { children: "Destructive", variant: "destructive" },
};

export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="gap-1 bg-emerald-500 hover:bg-emerald-600">
        <CheckCircle className="h-3 w-3" />
        Active
      </Badge>
      <Badge variant="destructive" className="gap-1">
        <XCircle className="h-3 w-3" />
        Inactive
      </Badge>
      <Badge variant="outline" className="gap-1">
        <Clock className="h-3 w-3" />
        Pending
      </Badge>
      <Badge className="gap-1 bg-amber-500 hover:bg-amber-600">
        <AlertCircle className="h-3 w-3" />
        Warning
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  name: "Real World — Order Statuses",
  render: () => {
    const orders = [
      { id: "ORD-001", product: "Pro Plan", status: "active", color: "bg-emerald-500 hover:bg-emerald-600" },
      { id: "ORD-002", product: "Starter Plan", status: "pending", variant: "outline" as const },
      { id: "ORD-003", product: "Enterprise", status: "cancelled", variant: "destructive" as const },
      { id: "ORD-004", product: "Team Plan", status: "trial", color: "bg-amber-500 hover:bg-amber-600" },
    ];
    return (
      <div className="w-80 divide-y rounded-lg border bg-card">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center justify-between p-3">
            <div>
              <p className="text-sm font-medium">{o.product}</p>
              <p className="text-xs text-muted-foreground">{o.id}</p>
            </div>
            <Badge
              variant={o.variant}
              className={o.color}
            >
              {o.status}
            </Badge>
          </div>
        ))}
      </div>
    );
  },
};

export const TagCloud: Story = {
  name: "Real World — Tag Cloud",
  render: () => {
    const tags = [
      "React", "TypeScript", "Tailwind", "Next.js", "Storybook",
      "shadcn/ui", "Radix UI", "Lucide", "Vite", "Testing",
    ];
    return (
      <div className="flex max-w-sm flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-muted">
            {tag}
          </Badge>
        ))}
      </div>
    );
  },
};

export const PlanBadges: Story = {
  name: "Real World — Pricing Plan Tiers",
  render: () => (
    <div className="flex gap-2">
      <Badge variant="outline">Free</Badge>
      <Badge className="gap-1 bg-indigo-500 hover:bg-indigo-600">
        <Zap className="h-3 w-3" />
        Pro
      </Badge>
      <Badge className="gap-1 bg-amber-500 hover:bg-amber-600">
        <Star className="h-3 w-3" />
        Enterprise
      </Badge>
    </div>
  ),
};
