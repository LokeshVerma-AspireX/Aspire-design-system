import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Mail,
  Plus,
  Trash2,
  ChevronRight,
  Send,
  Github,
  Save,
} from "lucide-react";

const meta = {
  title: "Core/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Versatile button component with multiple variants and sizes. Built on shadcn/ui with Tailwind CSS.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Button size",
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Button", variant: "default", size: "default" },
};

export const Destructive: Story = {
  args: { children: "Delete Account", variant: "destructive" },
};

export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
};

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Ghost", variant: "ghost" },
};

export const LinkVariant: Story = {
  name: "Link",
  args: { children: "Visit documentation →", variant: "link" },
};

export const Small: Story = {
  args: { children: "Small", size: "sm" },
};

export const Large: Story = {
  args: { children: "Get started", size: "lg" },
};

export const Icon: Story = {
  args: {
    size: "icon",
    "aria-label": "Add item",
    children: <Plus className="h-4 w-4" />,
  },
};

export const Disabled: Story = {
  args: { children: "Not available", disabled: true },
};

export const Loading: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    return (
      <Button disabled={loading} onClick={() => setLoading(true)}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving…
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </>
        )}
      </Button>
    );
  },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

export const LoginActions: Story = {
  name: "Real World — Login Actions",
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Button className="w-full">
        <Mail className="mr-2 h-4 w-4" />
        Continue with Email
      </Button>
      <Button variant="outline" className="w-full">
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
      <Button variant="ghost" className="w-full text-muted-foreground">
        Forgot password?
      </Button>
    </div>
  ),
};

export const ActionGroup: Story = {
  name: "Real World — Action Group",
  render: () => (
    <div className="flex items-center gap-2">
      <Button variant="destructive" size="sm">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
      <Button variant="outline" size="sm">
        Cancel
      </Button>
      <Button size="sm">
        Publish
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  ),
};

export const InboxCompose: Story = {
  name: "Real World — Compose Email",
  render: () => (
    <div className="flex items-center gap-2">
      <Button>
        <Send className="mr-2 h-4 w-4" />
        Send
      </Button>
      <Button variant="outline">Save Draft</Button>
      <Button variant="ghost" size="icon" aria-label="Attach file">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};
