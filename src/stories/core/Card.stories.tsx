import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Check,
  Star,
  Zap,
} from "lucide-react";
import type { ElementType } from "react";

const meta = {
  title: "Core/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Flexible container with Header, Content, and Footer sub-components for building structured UI blocks.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A brief description of this card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Card content goes here. Add any components or text.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCards: Story = {
  name: "Real World — Stats Grid",
  render: () => {
    const stats: Array<{
      label: string;
      value: string;
      change: string;
      icon: ElementType;
      color: string;
    }> = [
      {
        label: "Total Revenue",
        value: "$45,231",
        change: "+20.1%",
        icon: DollarSign,
        color: "text-emerald-500",
      },
      {
        label: "Active Users",
        value: "2,350",
        change: "+180",
        icon: Users,
        color: "text-blue-500",
      },
      {
        label: "Conversion",
        value: "12.5%",
        change: "+2.4%",
        icon: TrendingUp,
        color: "text-indigo-500",
      },
      {
        label: "Uptime",
        value: "99.97%",
        change: "30 days",
        icon: Activity,
        color: "text-amber-500",
      },
    ];
    return (
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, change, icon: Icon, color }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  },
};

export const PricingCards: Story = {
  name: "Real World — Pricing Plans",
  render: () => {
    const plans = [
      {
        name: "Starter",
        price: "$0",
        description: "Perfect for individuals",
        features: ["5 projects", "1 GB storage", "Email support"],
        cta: "Get started",
        variant: "outline" as const,
        highlight: false,
      },
      {
        name: "Pro",
        price: "$19",
        description: "Best for growing teams",
        features: ["Unlimited projects", "50 GB storage", "Priority support", "Advanced analytics"],
        cta: "Start free trial",
        variant: "default" as const,
        highlight: true,
      },
    ];
    return (
      <div className="flex gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`w-56 ${plan.highlight ? "border-primary shadow-md" : ""}`}
          >
            {plan.highlight && (
              <div className="rounded-t-xl bg-primary py-1 text-center text-xs font-medium text-primary-foreground">
                Most popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {plan.name}
                {plan.highlight && (
                  <Zap className="h-4 w-4 text-primary" />
                )}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="pt-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant={plan.variant} className="w-full">
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  },
};

export const TeamMemberCard: Story = {
  name: "Real World — Team Member",
  render: () => (
    <Card className="w-64 text-center">
      <CardHeader className="items-center pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="Sarah" />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-2">Sarah Johnson</CardTitle>
        <CardDescription>Lead Product Designer</CardDescription>
        <div className="flex gap-1 pt-1">
          <Badge variant="secondary">Figma</Badge>
          <Badge variant="secondary">UX</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <div className="flex justify-around py-2">
          <div>
            <p className="font-semibold text-foreground">42</p>
            <p className="text-xs">Projects</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">1.2k</p>
            <p className="text-xs">Followers</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">4.9</p>
            <p className="text-xs flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              Rating
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1" size="sm">
          Message
        </Button>
        <Button className="flex-1" size="sm">
          Follow
        </Button>
      </CardFooter>
    </Card>
  ),
};
