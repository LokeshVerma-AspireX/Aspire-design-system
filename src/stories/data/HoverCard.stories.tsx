import type { Meta, StoryObj } from "@storybook/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Link, Users } from "lucide-react";

const meta = {
  title: "Data/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Sighted users can preview content behind a link before navigating. Appears on hover after a short delay.",
      },
    },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@aspiredesign</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@aspiredesign</h4>
            <p className="text-sm text-muted-foreground">
              Building design systems that scale. Open source advocate.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">Joined January 2023</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const UserProfile: Story = {
  name: "Real World — User Profile Preview",
  render: () => (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      Designed by{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="h-auto p-0 text-sm">
            Sarah Johnson
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" alt="Sarah Johnson" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Sarah Johnson</p>
                </div>
                <p className="text-xs text-muted-foreground">@sarah_j</p>
                <Badge variant="secondary" className="mt-1 text-xs">Lead Designer</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Building design systems that scale. Open source contributor and workshop facilitator.
            </p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1.5">
                <Link className="h-3.5 w-3.5" />
                aspiredesign.io
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Joined March 2021
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span><strong className="text-foreground">2.4k</strong> followers · <strong className="text-foreground">318</strong> following</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const TechBadge: Story = {
  name: "Real World — Tech Stack Preview",
  render: () => {
    const techs = [
      {
        name: "React",
        tag: "v19",
        desc: "A JavaScript library for building user interfaces with a component-based approach.",
        color: "bg-blue-100 text-blue-700",
      },
      {
        name: "TypeScript",
        tag: "v5",
        desc: "A strongly typed programming language that builds on JavaScript.",
        color: "bg-violet-100 text-violet-700",
      },
      {
        name: "Tailwind",
        tag: "v4",
        desc: "A utility-first CSS framework for rapidly building custom user interfaces.",
        color: "bg-cyan-100 text-cyan-700",
      },
    ];

    return (
      <div className="flex items-center gap-2">
        {techs.map(({ name, tag, desc, color }) => (
          <HoverCard key={name} openDelay={200}>
            <HoverCardTrigger asChild>
              <Badge
                variant="outline"
                className="cursor-pointer gap-1"
              >
                {name}
                <span className={`rounded px-1 text-[10px] ${color}`}>{tag}</span>
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-56" side="top">
              <p className="text-sm font-medium">{name} {tag}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    );
  },
};
