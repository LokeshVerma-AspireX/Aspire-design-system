import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Home,
  Settings,
  User,
  FileText,
  Search,
  Mail,
  Bell,
  BarChart,
  LogOut,
  Plus,
  Keyboard,
} from "lucide-react";
import type { ElementType } from "react";

const meta = {
  title: "Layout/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Fast command palette with keyboard navigation. Powers search + navigation experiences.",
      },
    },
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithGroups: Story = {
  name: "With Multiple Groups",
  render: () => (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder="Search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem>
            <Home className="mr-2 h-4 w-4" />
            Dashboard
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
            <CommandShortcut>⌘A</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <Plus className="mr-2 h-4 w-4" />
            New Project
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Mail className="mr-2 h-4 w-4" />
            Send Invite
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
          <CommandItem className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const CommandPalette: Story = {
  name: "Real World — Command Palette (⌘K)",
  render: () => {
    const [open, setOpen] = useState(false);

    const groups: Array<{
      heading: string;
      items: Array<{ icon: ElementType; label: string; shortcut?: string }>;
    }> = [
      {
        heading: "Navigation",
        items: [
          { icon: Home, label: "Go to Dashboard", shortcut: "⌘H" },
          { icon: BarChart, label: "Go to Analytics", shortcut: "⌘A" },
          { icon: Bell, label: "Notifications", shortcut: "⌘B" },
          { icon: User, label: "My Profile" },
        ],
      },
      {
        heading: "Create",
        items: [
          { icon: Plus, label: "New Project", shortcut: "⌘N" },
          { icon: FileText, label: "New Document" },
          { icon: Mail, label: "Compose Message" },
        ],
      },
      {
        heading: "Account",
        items: [
          { icon: Settings, label: "Settings", shortcut: "⌘," },
          { icon: LogOut, label: "Sign out" },
        ],
      },
    ];

    return (
      <div className="flex flex-col items-center gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              <span className="text-muted-foreground">Search or jump to…</span>
              <kbd className="ml-2 flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-xs">
                <Keyboard className="h-3 w-3" />K
              </kbd>
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 sm:max-w-md">
            <Command>
              <CommandInput placeholder="Search commands…" />
              <CommandList className="max-h-80">
                <CommandEmpty>No results found.</CommandEmpty>
                {groups.map(({ heading, items }, gi) => (
                  <div key={heading}>
                    {gi > 0 && <CommandSeparator />}
                    <CommandGroup heading={heading}>
                      {items.map(({ icon: Icon, label, shortcut }) => (
                        <CommandItem
                          key={label}
                          onSelect={() => setOpen(false)}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {label}
                          {shortcut && (
                            <CommandShortcut>{shortcut}</CommandShortcut>
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </div>
                ))}
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
        <p className="text-xs text-muted-foreground">Click the button to open the command palette</p>
      </div>
    );
  },
};
