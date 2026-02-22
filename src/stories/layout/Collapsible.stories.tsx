import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronsUpDown, GitBranch, Bell, ChevronRight } from "lucide-react";

const meta = {
  title: "Layout/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An interactive component which expands/collapses content. Built on Radix UI Collapsible.",
      },
    },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-72 space-y-2">
        <div className="flex items-center justify-between rounded-md border px-4 py-2">
          <p className="text-sm font-medium">@shadcn starred 3 repos</p>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 text-sm font-mono">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 text-sm font-mono">@radix-ui/colors</div>
          <div className="rounded-md border px-4 py-2 text-sm font-mono">@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const WithChevron: Story = {
  name: "With Animated Chevron",
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-72">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
            Advanced Options
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-none">
          <div className="space-y-2 px-3 pb-3 pt-1">
            {["Enable caching", "Debug mode", "Verbose logging", "Custom headers"].map((opt) => (
              <div key={opt} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{opt}</span>
                <div className="h-4 w-8 rounded-full bg-muted border" />
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const BranchList: Story = {
  name: "Real World — Git Branch List",
  render: () => {
    const branches = {
      active: ["main", "develop", "feature/design-tokens"],
      merged: ["fix/nav-overflow", "feat/dark-mode", "chore/deps-update"],
    };
    const [showMerged, setShowMerged] = useState(false);

    return (
      <div className="w-72 rounded-lg border bg-card overflow-hidden">
        <div className="border-b px-4 py-3 flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Branches</span>
          <Badge variant="secondary" className="ml-auto text-xs">
            {branches.active.length + branches.merged.length}
          </Badge>
        </div>
        <div className="divide-y">
          {branches.active.map((b) => (
            <div key={b} className="flex items-center gap-2 px-4 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-mono">{b}</span>
            </div>
          ))}
        </div>
        <Collapsible open={showMerged} onOpenChange={setShowMerged}>
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center gap-2 border-t px-4 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors">
              <ChevronRight
                className={`h-3.5 w-3.5 transition-transform ${showMerged ? "rotate-90" : ""}`}
              />
              {branches.merged.length} merged branches
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="divide-y border-t">
              {branches.merged.map((b) => (
                <div key={b} className="flex items-center gap-2 px-4 py-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                  <span className="text-sm font-mono text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const NotificationSettings: Story = {
  name: "Real World — Notification Group",
  render: () => {
    const [open, setOpen] = useState(true);
    const notifications = [
      { label: "New comments", count: 3 },
      { label: "Mentions", count: 1 },
      { label: "PR reviews", count: 0 },
    ];

    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-72 rounded-lg border bg-card">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium flex-1 text-left">Notifications</span>
            <Badge variant="destructive" className="text-xs">
              {notifications.reduce((s, n) => s + n.count, 0)}
            </Badge>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t divide-y">
            {notifications.map(({ label, count }) => (
              <div key={label} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-sm">{label}</span>
                {count > 0 ? (
                  <Badge variant="secondary" className="text-xs">{count}</Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">None</span>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
