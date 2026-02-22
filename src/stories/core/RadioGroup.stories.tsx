import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Crown } from "lucide-react";
import type { ElementType } from "react";

const meta = {
  title: "Core/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A set of checkable buttons where only one can be selected at a time. Built on Radix UI RadioGroup.",
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  name: "With Descriptions",
  render: () => (
    <RadioGroup defaultValue="comfortable" className="space-y-3">
      {[
        { value: "compact", label: "Compact", desc: "Minimal spacing, fits more content." },
        { value: "comfortable", label: "Comfortable", desc: "Balanced spacing for everyday use." },
        { value: "spacious", label: "Spacious", desc: "Generous spacing for better readability." },
      ].map(({ value, label, desc }) => (
        <div key={value} className="flex items-start space-x-3">
          <RadioGroupItem value={value} id={value} className="mt-0.5" />
          <div className="space-y-0.5">
            <Label htmlFor={value} className="cursor-pointer font-medium">{label}</Label>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  name: "Disabled State",
  render: () => (
    <RadioGroup defaultValue="first" className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="first" id="first" />
        <Label htmlFor="first">Available option</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="second" id="second" disabled />
        <Label htmlFor="second" className="opacity-50 cursor-not-allowed">
          Disabled option
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="third" id="third" />
        <Label htmlFor="third">Available option</Label>
      </div>
    </RadioGroup>
  ),
};

export const PricingPlan: Story = {
  name: "Real World — Pricing Plan Selector",
  render: () => {
    const [plan, setPlan] = useState("pro");
    const plans: Array<{
      value: string;
      icon: ElementType;
      name: string;
      price: string;
      features: string[];
      badge?: string;
    }> = [
      {
        value: "starter",
        icon: Zap,
        name: "Starter",
        price: "$9/mo",
        features: ["5 projects", "10 GB storage", "Email support"],
      },
      {
        value: "pro",
        icon: Shield,
        name: "Pro",
        price: "$29/mo",
        features: ["Unlimited projects", "50 GB storage", "Priority support"],
        badge: "Most popular",
      },
      {
        value: "enterprise",
        icon: Crown,
        name: "Enterprise",
        price: "$99/mo",
        features: ["Everything in Pro", "Custom SLA", "Dedicated manager"],
      },
    ];

    return (
      <div className="w-96 space-y-3">
        <div>
          <h3 className="font-semibold">Choose your plan</h3>
          <p className="text-sm text-muted-foreground">Cancel anytime. No hidden fees.</p>
        </div>
        <RadioGroup value={plan} onValueChange={setPlan} className="space-y-2">
          {plans.map(({ value, icon: Icon, name, price, features, badge }) => (
            <label
              key={value}
              htmlFor={`plan-${value}`}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                plan === value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <RadioGroupItem value={value} id={`plan-${value}`} className="mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{name}</span>
                  {badge && (
                    <Badge variant="secondary" className="text-xs">{badge}</Badge>
                  )}
                  <span className="ml-auto text-sm font-semibold">{price}</span>
                </div>
                <ul className="mt-1.5 space-y-0.5">
                  {features.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground">• {f}</li>
                  ))}
                </ul>
              </div>
            </label>
          ))}
        </RadioGroup>
        <Button className="w-full">
          Get started with {plans.find((p) => p.value === plan)?.name}
        </Button>
      </div>
    );
  },
};
