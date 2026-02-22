import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const TAGS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
  "shadcn/ui", "Radix UI", "Storybook", "Vite", "ESLint",
  "Prettier", "Jest", "Vitest", "Testing Library", "Cypress",
  "GraphQL", "REST API", "Prisma", "PostgreSQL", "Supabase",
  "Vercel", "GitHub Actions", "Docker", "Figma", "Framer Motion",
];

const MESSAGES = [
  { user: "Sarah", text: "Just shipped the new design tokens! Check it out.", time: "9:01 AM", initials: "SJ" },
  { user: "Mike", text: "Looks great 🎉 The color palette is so much better.", time: "9:03 AM", initials: "MC" },
  { user: "Alex", text: "One question — did we finalize the spacing scale?", time: "9:07 AM", initials: "AR" },
  { user: "Sarah", text: "Yes! 4px base, multiples of 4. Full doc in Notion.", time: "9:08 AM", initials: "SJ" },
  { user: "Emma", text: "Perfect. I'll update the Figma variables today.", time: "9:12 AM", initials: "EW" },
  { user: "Mike", text: "Should we do a quick sync at 2pm to walk everyone through?", time: "9:15 AM", initials: "MC" },
  { user: "Sarah", text: "Sure, I'll send a calendar invite.", time: "9:16 AM", initials: "SJ" },
  { user: "Alex", text: "Added to my calendar. Sharing my screen for the token walkthrough.", time: "9:20 AM", initials: "AR" },
  { user: "Emma", text: "Also — can we add motion tokens in the same sprint?", time: "9:22 AM", initials: "EW" },
  { user: "Sarah", text: "Definitely. I'll create tickets for animation duration and easing.", time: "9:25 AM", initials: "SJ" },
];

const meta = {
  title: "Data/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Custom-styled scrollable area with cross-browser consistent scrollbar. Wraps content with overflow control.",
      },
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalList: Story = {
  name: "Vertical Scroll",
  render: () => (
    <ScrollArea className="h-64 w-56 rounded-md border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-semibold">Components</h4>
        {Array.from({ length: 20 }, (_, i) => `Component ${i + 1}`).map((c) => (
          <div key={c}>
            <p className="py-1.5 text-sm">{c}</p>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  name: "Horizontal Scroll",
  render: () => (
    <ScrollArea className="w-72 whitespace-nowrap rounded-md border">
      <div className="flex p-4 gap-3">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex h-20 w-24 shrink-0 flex-col items-center justify-center rounded-lg border bg-muted/50 text-sm"
          >
            <span className="text-xl font-bold text-muted-foreground">{i + 1}</span>
            <span className="text-xs text-muted-foreground">Item</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const TagSelector: Story = {
  name: "Real World — Tag Selector",
  render: () => {
    const [selected, setSelected] = useState(["React", "Next.js", "Tailwind CSS"]);
    const [query, setQuery] = useState("");

    const filtered = TAGS.filter((t) =>
      t.toLowerCase().includes(query.toLowerCase())
    );
    const toggle = (tag: string) =>
      setSelected((s) =>
        s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag]
      );

    return (
      <div className="w-72 space-y-2 rounded-lg border bg-card p-3">
        <p className="text-sm font-medium">Select technologies</p>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {selected.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="cursor-pointer gap-1 pr-1"
                onClick={() => toggle(t)}
              >
                {t}
                <span className="text-muted-foreground hover:text-foreground">×</span>
              </Badge>
            ))}
          </div>
        )}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-8 pl-8 text-sm"
            placeholder="Search tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-40 rounded-md border">
          <div className="p-2 space-y-0.5">
            {filtered.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">No tags found</p>
            ) : (
              filtered.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggle(tag)}
                  className={`flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                    selected.includes(tag)
                      ? "font-medium text-primary"
                      : "text-foreground"
                  }`}
                >
                  {tag}
                  {selected.includes(tag) && (
                    <span className="text-primary">✓</span>
                  )}
                </button>
              ))
            )}
          </div>
        </ScrollArea>
        <p className="text-xs text-muted-foreground">
          {selected.length} tag{selected.length !== 1 ? "s" : ""} selected
        </p>
      </div>
    );
  },
};

export const MessageList: Story = {
  name: "Real World — Chat Message List",
  render: () => (
    <div className="w-96 rounded-lg border bg-card flex flex-col">
      <div className="border-b px-4 py-3">
        <p className="font-semibold text-sm">design-system</p>
        <p className="text-xs text-muted-foreground">10 messages</p>
      </div>
      <ScrollArea className="h-72">
        <div className="space-y-4 p-4">
          {MESSAGES.map(({ user, text, time, initials }, i) => (
            <div key={i} className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium">{user}</span>
                  <span className="text-xs text-muted-foreground">{time}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-3">
        <div className="flex gap-2">
          <Input placeholder="Message #design-system" className="h-8 text-sm" />
          <Button size="sm" className="shrink-0">Send</Button>
        </div>
      </div>
    </div>
  ),
};
