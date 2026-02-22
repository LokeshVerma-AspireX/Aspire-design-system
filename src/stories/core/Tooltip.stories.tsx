import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Info,
  HelpCircle,
  Copy,
  Download,
  Trash2,
  Settings,
  Share2,
} from "lucide-react";

const meta = {
  title: "Core/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible tooltip that appears on hover/focus. Wraps any trigger element.",
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Sides: Story = {
  name: "All Sides",
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-8">
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Appears on top</TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Appears on left</TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Appears on right</TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Appears on bottom</TooltipContent>
      </Tooltip>
      <div />
    </div>
  ),
};

export const IconTooltips: Story = {
  name: "Icon Button Tooltips",
  render: () => (
    <div className="flex items-center gap-1">
      {[
        { icon: Copy, label: "Copy to clipboard" },
        { icon: Download, label: "Download" },
        { icon: Share2, label: "Share" },
        { icon: Settings, label: "Settings" },
        { icon: Trash2, label: "Delete permanently" },
      ].map(({ icon: Icon, label }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={label}>
              <Icon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const FormHelp: Story = {
  name: "Real World — Form Help Tooltips",
  render: () => (
    <div className="w-80 space-y-4">
      {[
        {
          id: "api-key",
          label: "API Key",
          type: "text",
          placeholder: "sk-••••••••••••••••",
          tip: "Find your API key in Settings → Developer → API Keys",
        },
        {
          id: "webhook",
          label: "Webhook URL",
          type: "url",
          placeholder: "https://your-app.com/webhook",
          tip: "We'll send POST requests to this URL for events",
        },
      ].map(({ id, label, type, placeholder, tip }) => (
        <div key={id} className="grid gap-1.5">
          <div className="flex items-center gap-1.5">
            <Label htmlFor={id}>{label}</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3.5 w-3.5 cursor-help text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-52">{tip}</TooltipContent>
            </Tooltip>
          </div>
          <Input id={id} type={type} placeholder={placeholder} />
        </div>
      ))}
    </div>
  ),
};

export const DisabledButtonTooltip: Story = {
  name: "Real World — Disabled Action Explanation",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0}>
          <Button disabled className="pointer-events-none">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Project
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          You need Admin access to delete projects
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};
