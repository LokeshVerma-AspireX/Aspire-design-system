import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Core/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible form label associated with a control. Clicking the label focuses the related input.",
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="email-default">Email</Label>
      <Input type="email" id="email-default" placeholder="you@example.com" className="w-64" />
    </div>
  ),
};

export const WithAsterisk: Story = {
  name: "Required Field",
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="email-req">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input type="email" id="email-req" placeholder="you@example.com" className="w-64" />
    </div>
  ),
};

export const WithHint: Story = {
  name: "With Hint Text",
  render: () => (
    <div className="grid gap-1.5 w-64">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="john_doe" />
      <p className="text-xs text-muted-foreground">Only letters, numbers, and underscores.</p>
    </div>
  ),
};

export const WithBadge: Story = {
  name: "With Optional Badge",
  render: () => (
    <div className="grid gap-1.5 w-64">
      <div className="flex items-center gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Badge variant="outline" className="text-xs font-normal py-0">Optional</Badge>
      </div>
      <Input id="bio" placeholder="Tell us about yourself" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  name: "With Checkbox",
  render: () => (
    <div className="flex items-start gap-2">
      <Checkbox id="terms" className="mt-0.5" />
      <div className="grid gap-1">
        <Label htmlFor="terms" className="cursor-pointer">
          I agree to the Terms of Service
        </Label>
        <p className="text-xs text-muted-foreground">
          By checking this box, you acknowledge our privacy policy.
        </p>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  name: "Disabled State",
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="disabled-input" className="opacity-50">
        Disabled field
      </Label>
      <Input id="disabled-input" disabled placeholder="Not editable" className="w-64" />
    </div>
  ),
};

export const FormGroup: Story = {
  name: "Real World — Full Form Group",
  render: () => (
    <div className="w-80 space-y-4 rounded-lg border bg-card p-5">
      <h3 className="font-semibold text-sm">Personal Information</h3>
      <div className="grid gap-1.5">
        <Label htmlFor="full-name">
          Full name <span className="text-destructive">*</span>
        </Label>
        <Input id="full-name" placeholder="Sarah Johnson" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="work-email">
          Work email <span className="text-destructive">*</span>
        </Label>
        <Input id="work-email" type="email" placeholder="sarah@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label>Preferred contact</Label>
        <RadioGroup defaultValue="email" className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <RadioGroupItem value="email" id="contact-email" />
            <Label htmlFor="contact-email" className="font-normal cursor-pointer">Email</Label>
          </div>
          <div className="flex items-center gap-1.5">
            <RadioGroupItem value="phone" id="contact-phone" />
            <Label htmlFor="contact-phone" className="font-normal cursor-pointer">Phone</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};
