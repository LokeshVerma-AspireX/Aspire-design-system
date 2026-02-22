import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const meta = {
  title: "Core/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible checkbox with indeterminate state support. Built on Radix UI Checkbox.",
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: { id: "cb-unchecked" },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="cb-unchecked">Unchecked</Label>
    </div>
  ),
};

export const Checked: Story = {
  args: { id: "cb-checked", checked: true, onCheckedChange: () => {} },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="cb-checked">Checked</Label>
    </div>
  ),
};

export const Disabled: Story = {
  args: { id: "cb-disabled", disabled: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="cb-disabled" className="text-muted-foreground">
        Disabled option
      </Label>
    </div>
  ),
};

export const DisabledChecked: Story = {
  name: "Disabled + Checked",
  args: { id: "cb-dis-chk", disabled: true, checked: true, onCheckedChange: () => {} },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="cb-dis-chk" className="text-muted-foreground">
        Enabled by default (locked)
      </Label>
    </div>
  ),
};

export const Indeterminate: Story = {
  name: "Indeterminate State",
  render: () => {
    const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate");
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="cb-indeterminate"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="cb-indeterminate">Select all</Label>
      </div>
    );
  },
};

export const TermsAcceptance: Story = {
  name: "Real World — Terms & Conditions",
  render: () => {
    const [agreed, setAgreed] = useState(false);
    return (
      <div className="w-80 space-y-4 rounded-lg border bg-card p-6">
        <div>
          <h3 className="font-semibold">Create account</h3>
          <p className="text-sm text-muted-foreground">
            Fill out the form and accept our terms
          </p>
        </div>
        <Separator />
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(v === true)}
            className="mt-0.5"
          />
          <Label htmlFor="terms" className="font-normal leading-snug">
            I agree to the{" "}
            <span className="font-medium text-primary underline-offset-4 hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-medium text-primary underline-offset-4 hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </Label>
        </div>
        <Button disabled={!agreed} className="w-full">
          Create Account
        </Button>
      </div>
    );
  },
};

export const PermissionsGroup: Story = {
  name: "Real World — Permission Settings",
  render: () => {
    const perms = [
      { id: "read", label: "Read", description: "View content and data" },
      { id: "write", label: "Write", description: "Create and edit content" },
      { id: "delete", label: "Delete", description: "Remove content permanently" },
      { id: "admin", label: "Admin", description: "Full system access" },
    ];
    const [selected, setSelected] = useState(["read", "write"]);

    const toggle = (id: string) =>
      setSelected((s) =>
        s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
      );

    return (
      <div className="w-80 space-y-2 rounded-lg border bg-card p-4">
        <p className="text-sm font-medium">Permissions</p>
        <Separator />
        {perms.map(({ id, label, description }) => (
          <div key={id} className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <Checkbox
              id={`perm-${id}`}
              checked={selected.includes(id)}
              onCheckedChange={() => toggle(id)}
            />
          </div>
        ))}
      </div>
    );
  },
};
