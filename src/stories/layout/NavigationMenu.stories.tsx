import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookOpen, Code2, Layers, Palette, Zap } from "lucide-react";

const meta = {
  title: "Layout/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A collection of links for navigating websites. Supports dropdown menus with rich content panels.",
      },
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <Layers className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">Aspire Design</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A complete design system built with shadcn/ui and Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {[
                { href: "#", title: "Introduction", desc: "Re-usable components built with Radix UI." },
                { href: "#", title: "Installation", desc: "How to install dependencies and structure your app." },
                { href: "#", title: "Typography", desc: "Styles for headings, paragraphs, lists and more." },
              ].map(({ href, title, desc }) => (
                <li key={title}>
                  <NavigationMenuLink asChild>
                    <a
                      href={href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{desc}</p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {[
                { icon: Code2, title: "Core", desc: "Button, Input, Select, Checkbox…" },
                { icon: Layers, title: "Layout", desc: "Dialog, Sheet, Tabs, Accordion…" },
                { icon: Palette, title: "Data", desc: "Table, Progress, Skeleton…" },
                { icon: BookOpen, title: "Foundations", desc: "Colors, Typography, Spacing…" },
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title}>
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="flex select-none gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Icon className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{title}</div>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithBadge: Story = {
  name: "Real World — App Header Nav",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[360px] gap-2 p-3">
              {[
                { title: "Analytics", desc: "Track performance and user behaviour", badge: null },
                { title: "Automation", desc: "Build powerful no-code workflows", badge: "New" },
                { title: "Integrations", desc: "Connect your favourite tools", badge: null },
              ].map(({ title, desc, badge }) => (
                <li key={title}>
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent"
                    >
                      <Zap className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{title}</span>
                          {badge && <Badge variant="secondary" className="text-xs">{badge}</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={cn(navigationMenuTriggerStyle(), "text-muted-foreground")}>
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
