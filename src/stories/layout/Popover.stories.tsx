import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  SlidersHorizontal,
  Check,
  MapPin,
  Mail,
  ExternalLink,
} from "lucide-react";

const meta = {
  title: "Layout/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Floating contextual overlay triggered by a button. Lighter than Dialog — no backdrop.",
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Info className="mr-2 h-4 w-4" />
          Open Popover
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-sm">
          This is a basic popover with some helpful information.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  name: "With Form Content",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Quick Edit</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold">Quick Edit</p>
            <p className="text-xs text-muted-foreground">
              Update key details without opening the full editor.
            </p>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="pop-name" className="text-xs">Name</Label>
              <Input id="pop-name" defaultValue="Aspire Design" className="h-8 text-sm" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="pop-url" className="text-xs">URL</Label>
              <Input id="pop-url" defaultValue="/aspire" className="h-8 text-sm" />
            </div>
          </div>
          <Button size="sm" className="w-full">Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const FilterOptions: Story = {
  name: "Real World — Filter Options",
  render: () => {
    const [filters, setFilters] = useState({
      active: true,
      pending: false,
      archived: false,
    });
    const activeCount = Object.values(filters).filter(Boolean).length;
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <Badge className="ml-1 h-5 min-w-5 px-1 text-xs">
                {activeCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="space-y-3">
            <p className="text-sm font-medium">Filter by status</p>
            <Separator />
            {(Object.entries(filters) as Array<[keyof typeof filters, boolean]>).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={`f-${key}`} className="font-normal capitalize">
                  {key}
                </Label>
                <Switch
                  id={`f-${key}`}
                  checked={value}
                  onCheckedChange={(v) =>
                    setFilters((s) => ({ ...s, [key]: v }))
                  }
                />
              </div>
            ))}
            <Separator />
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() =>
                setFilters({ active: false, pending: false, archived: false })
              }
            >
              Clear all
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const UserProfileCard: Story = {
  name: "Real World — User Mention Card",
  render: () => (
    <div className="text-sm text-muted-foreground">
      Assigned to{" "}
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline">
            @sarahj
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="Sarah" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold">Sarah Johnson</p>
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Lead Product Designer</p>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              sarah@example.com
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              San Francisco, CA
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-3 w-full gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" />
            View profile
          </Button>
        </PopoverContent>
      </Popover>{" "}
      on Feb 18, 2026.
    </div>
  ),
};
