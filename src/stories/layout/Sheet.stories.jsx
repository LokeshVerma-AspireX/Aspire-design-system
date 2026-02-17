import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Menu,
  SlidersHorizontal,
  Home,
  BarChart,
  Users,
  Settings,
  FileText,
  Bell,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default {
  title: "Layout/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Slide-in panel from any edge. Ideal for navigation drawers, filter panels, and detail views.",
      },
    },
  },
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
  },
};

const navItems = [
  { icon: Home, label: "Dashboard", href: "#", active: true },
  { icon: BarChart, label: "Analytics", href: "#", badge: "New" },
  { icon: Users, label: "Team", href: "#" },
  { icon: FileText, label: "Projects", href: "#", badge: "12" },
  { icon: Bell, label: "Notifications", href: "#", badge: "3" },
  { icon: Settings, label: "Settings", href: "#" },
];

export const Right = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Right Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Panel</SheetTitle>
          <SheetDescription>
            This panel slides in from the right side.
          </SheetDescription>
        </SheetHeader>
        <p className="mt-4 text-sm text-muted-foreground">
          Add any content here — forms, details, or navigation.
        </p>
      </SheetContent>
    </Sheet>
  ),
};

export const Left = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Panel</SheetTitle>
          <SheetDescription>Slides in from the left.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const NavigationDrawer = {
  name: "Real World — Navigation Drawer",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-64 flex-col p-0">
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">A</span>
            </div>
            <div>
              <p className="text-sm font-semibold">Aspire</p>
              <p className="text-xs text-muted-foreground">Design System</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map(({ icon: Icon, label, active, badge }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              onClick={(e) => e.preventDefault()}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{label}</span>
              {badge && (
                <Badge
                  variant={active ? "secondary" : "secondary"}
                  className="text-xs"
                >
                  {badge}
                </Badge>
              )}
            </a>
          ))}
        </nav>
        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted">
            <Avatar className="h-7 w-7">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">Sarah Johnson</p>
              <p className="text-xs truncate">sarah@example.com</p>
            </div>
            <LogOut className="h-4 w-4 shrink-0" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const FilterPanel = {
  name: "Real World — Filter Panel",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Filter Results</SheetTitle>
          <SheetDescription>
            Narrow down results by applying filters.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-6 overflow-y-auto py-4">
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Search
            </Label>
            <Input placeholder="Filter by name…" />
          </div>
          <Separator />
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Status
            </Label>
            {["Active", "Pending", "Archived", "Draft"].map((s) => (
              <div key={s} className="flex items-center justify-between">
                <Label htmlFor={`filter-${s}`} className="font-normal">
                  {s}
                </Label>
                <Switch id={`filter-${s}`} defaultChecked={s === "Active"} />
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Date Range
            </Label>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="filter-from" className="text-xs">From</Label>
                <Input id="filter-from" type="date" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="filter-to" className="text-xs">To</Label>
                <Input id="filter-to" type="date" />
              </div>
            </div>
          </div>
        </div>
        <SheetFooter className="border-t pt-4">
          <Button variant="outline" className="flex-1">
            Reset
          </Button>
          <Button className="flex-1">Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
