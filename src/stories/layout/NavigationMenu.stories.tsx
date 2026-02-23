import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Code2,
  Layers,
  Palette,
  Zap,
  BarChart,
  Users,
  Megaphone,
  Gift,
  Inbox,
  Settings,
  CreditCard,
  Shield,
  Bell,
  UserCog,
  Globe,
  FileText,
  HelpCircle,
  Layout,
  Sparkles,
  Lightbulb,
} from "lucide-react"

/**
 * # NavigationMenu
 *
 * A horizontal navigation component with optional dropdown panels for rich
 * content. Built on Radix UI NavigationMenu with animated viewport transitions,
 * hover-triggered dropdowns, and full keyboard support.
 *
 * ## When to Use
 * - For top-level site or app navigation bars
 * - When navigation items need dropdown panels with rich content (mega menus)
 * - For primary navigation that is always visible on the page
 * - For settings or product navigation with grouped links
 *
 * ## When NOT to Use
 * - For page-level tab navigation -- use Tabs instead
 * - For sidebar navigation -- use a sidebar layout component
 * - For action menus or context menus -- use DropdownMenu or ContextMenu
 * - For mobile-first navigation -- consider Sheet-based mobile nav
 *
 * ## Accessibility
 * - Full keyboard navigation: Tab between items, Enter/Space to open triggers
 * - Arrow keys navigate between items when focused
 * - Escape closes open dropdown panels
 * - `NavigationMenuLink` supports `data-active` for current page indication
 * - Viewport animations respect `prefers-reduced-motion`
 * - `navigationMenuTriggerStyle` utility ensures consistent focus ring styles
 *
 * ## Import
 * ```tsx
 * import {
 *   NavigationMenu,
 *   NavigationMenuContent,
 *   NavigationMenuIndicator,
 *   NavigationMenuItem,
 *   NavigationMenuLink,
 *   NavigationMenuList,
 *   NavigationMenuTrigger,
 *   NavigationMenuViewport,
 *   navigationMenuTriggerStyle,
 * } from '@/components/ui/navigation-menu'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/dashboard" className={navigationMenuTriggerStyle()}>
 *         Dashboard
 *       </NavigationMenuLink>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <ul className="grid w-[400px] gap-3 p-4">
 *           <li><NavigationMenuLink href="/analytics">Analytics</NavigationMenuLink></li>
 *         </ul>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
const meta: Meta<typeof NavigationMenu> = {
  title: "5. Layout/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Horizontal navigation with optional dropdown content panels. Supports rich mega-menu layouts, icons, descriptions, and animated viewport transitions.",
      },
    },
  },
  argTypes: {
    viewport: {
      control: "boolean",
      description:
        "Whether to render the animated viewport container for dropdown content. Set to `false` to render content inline (useful for custom positioning).",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Behavior",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the root NavigationMenu.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Appearance",
      },
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the navigation menu.",
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: "horizontal" },
        category: "Layout",
      },
    },
    delayDuration: {
      control: "number",
      description:
        "The duration in milliseconds from when the mouse enters a trigger until the content opens.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "200" },
        category: "Behavior",
      },
    },
    children: {
      control: false,
      description:
        "Must contain NavigationMenuList with NavigationMenuItem children.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── HELPER COMPONENT ─────────────────────────────

const ListItem = ({
  title,
  children,
  href = "#",
  icon: Icon,
  badge,
  className,
}: {
  title: string
  children: React.ReactNode
  href?: string
  icon?: React.ElementType
  badge?: string
  className?: string
}) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        href={href}
        className={cn(
          "flex select-none gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
      >
        {Icon && (
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium leading-none">{title}</span>
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </div>
      </a>
    </NavigationMenuLink>
  </li>
)

// ─── BASIC LINKS ──────────────────────────────────

/**
 * Simple navigation with plain links styled using `navigationMenuTriggerStyle()`.
 * No dropdown panels -- just a horizontal row of links.
 *
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/dashboard" className={navigationMenuTriggerStyle()}>
 *         Dashboard
 *       </NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
export const BasicLinks: Story = {
  name: "Basic Links",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Creators
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Campaigns
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Analytics
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={cn(
              navigationMenuTriggerStyle(),
              "text-muted-foreground"
            )}
          >
            Help
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

// ─── WITH DROPDOWNS ───────────────────────────────

/**
 * Navigation items with dropdown panels containing lists of links.
 * Hover or click a trigger to open the dropdown content panel.
 *
 * ```tsx
 * <NavigationMenuItem>
 *   <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *   <NavigationMenuContent>
 *     <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
 *       <ListItem title="Analytics">Track performance</ListItem>
 *       <ListItem title="Automation">Build workflows</ListItem>
 *     </ul>
 *   </NavigationMenuContent>
 * </NavigationMenuItem>
 * ```
 */
export const WithDropdowns: Story = {
  name: "With Dropdowns",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <Layers className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Aspire Design
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A complete design system built with shadcn/ui and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem title="Introduction" href="#">
                Re-usable components built with Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem title="Installation" href="#">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem title="Typography" href="#">
                Styles for headings, paragraphs, lists, and more.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem title="Core" icon={Code2} href="#">
                Button, Input, Select, Checkbox, and more.
              </ListItem>
              <ListItem title="Layout" icon={Layers} href="#">
                Dialog, Sheet, Tabs, Accordion, and more.
              </ListItem>
              <ListItem title="Data" icon={Palette} href="#">
                Table, Progress, Skeleton, and more.
              </ListItem>
              <ListItem title="Foundations" icon={BookOpen} href="#">
                Colors, Typography, Spacing, and more.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

// ─── WITH MEGA MENU CONTENT ───────────────────────

/**
 * A mega-menu style dropdown with a large grid of items, icons, and descriptions.
 * Use for product suites or feature-rich navigation.
 */
export const WithMegaMenu: Story = {
  name: "With Mega Menu Content",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-2 p-4 md:grid-cols-3">
              <ListItem title="Creator Discovery" icon={Users} href="#">
                Find and vet creators at scale.
              </ListItem>
              <ListItem title="Campaign Management" icon={Megaphone} href="#">
                End-to-end campaign workflows.
              </ListItem>
              <ListItem title="Analytics" icon={BarChart} href="#">
                Measure ROI and performance.
              </ListItem>
              <ListItem title="Marketplace" icon={Gift} href="#">
                Product seeding and gifting.
              </ListItem>
              <ListItem title="Inbox" icon={Inbox} href="#">
                Centralized creator communication.
              </ListItem>
              <ListItem title="Storefronts" icon={Globe} href="#">
                Branded creator storefronts.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:grid-cols-2">
              <ListItem title="Blog" icon={FileText} href="#">
                Industry insights and tips.
              </ListItem>
              <ListItem title="Case Studies" icon={Lightbulb} href="#">
                Learn from top brands.
              </ListItem>
              <ListItem title="Help Center" icon={HelpCircle} href="#">
                Guides and documentation.
              </ListItem>
              <ListItem title="API Docs" icon={Code2} href="#">
                Integrate with our platform.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

// ─── WITH ICONS AND DESCRIPTIONS ──────────────────

/**
 * Each navigation link can include an icon and a description line to help
 * users understand where the link leads.
 */
export const WithIconsAndDescriptions: Story = {
  name: "With Icons & Descriptions",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[500px] gap-2 p-4 md:grid-cols-2">
              <ListItem
                title="AI-Powered Matching"
                icon={Sparkles}
                badge="New"
                href="#"
              >
                Automatically match creators to your brand using AI.
              </ListItem>
              <ListItem
                title="Campaign Analytics"
                icon={BarChart}
                href="#"
              >
                Real-time dashboards for campaign performance.
              </ListItem>
              <ListItem
                title="Creator CRM"
                icon={Users}
                href="#"
              >
                Manage relationships with a built-in CRM.
              </ListItem>
              <ListItem
                title="Automated Workflows"
                icon={Zap}
                badge="Beta"
                href="#"
              >
                Build no-code automations for outreach and follow-ups.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Enterprise
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

// ─── WITH BADGES ──────────────────────────────────

/**
 * Add `Badge` components inside navigation items to highlight new features,
 * beta status, or item counts.
 */
export const WithBadges: Story = {
  name: "With Badges",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[360px] gap-2 p-3">
              <ListItem title="Analytics" icon={BarChart} href="#">
                Track performance and user behaviour.
              </ListItem>
              <ListItem
                title="Automation"
                icon={Zap}
                badge="New"
                href="#"
              >
                Build powerful no-code workflows.
              </ListItem>
              <ListItem title="Integrations" icon={Layout} href="#">
                Connect your favourite tools.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={cn(
              navigationMenuTriggerStyle(),
              "text-muted-foreground"
            )}
          >
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

// ─── WITHOUT VIEWPORT ─────────────────────────────

/**
 * Set `viewport={false}` to render dropdown content inline without the
 * animated viewport container. Useful for custom layouts or when you need
 * more control over positioning.
 *
 * ```tsx
 * <NavigationMenu viewport={false}>
 *   ...
 * </NavigationMenu>
 * ```
 */
export const WithoutViewport: Story = {
  name: "Without Viewport (Inline)",
  render: () => (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-2 p-3">
              <ListItem title="Analytics" icon={BarChart} href="#">
                Track performance metrics.
              </ListItem>
              <ListItem title="Campaigns" icon={Megaphone} href="#">
                Manage creator campaigns.
              </ListItem>
              <ListItem title="Creators" icon={Users} href="#">
                Discover and vet creators.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

// ─── ASPIRE: MAIN NAVIGATION ──────────────────────

/**
 * Aspire-specific example: the main application header navigation bar
 * with links to all primary sections and a mega-menu for the platform features.
 */
export const AspireMainNavigation: Story = {
  name: "Aspire -- Main Navigation",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[500px] gap-2 p-4 md:grid-cols-2">
              <ListItem title="Creators" icon={Users} href="#">
                Discover, vet, and manage creator relationships.
              </ListItem>
              <ListItem title="Campaigns" icon={Megaphone} href="#">
                Create and manage influencer campaigns.
              </ListItem>
              <ListItem title="Analytics" icon={BarChart} href="#">
                Track ROI, reach, and engagement metrics.
              </ListItem>
              <ListItem title="Offers" icon={Gift} href="#">
                Set up product seeding and gifting offers.
              </ListItem>
              <ListItem title="Inbox" icon={Inbox} href="#">
                Centralized messaging with creators.
              </ListItem>
              <ListItem
                title="AI Matching"
                icon={Sparkles}
                badge="New"
                href="#"
              >
                AI-powered creator-brand matching.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Inbox
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Reports
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

// ─── ASPIRE: SETTINGS NAVIGATION ──────────────────

/**
 * Aspire-specific example: settings page navigation with grouped links
 * for account, workspace, and billing settings.
 */
export const AspireSettingsNavigation: Story = {
  name: "Aspire -- Settings Navigation",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[380px] gap-2 p-4">
              <ListItem title="Profile" icon={UserCog} href="#">
                Update your personal information and avatar.
              </ListItem>
              <ListItem title="Security" icon={Shield} href="#">
                Manage password, 2FA, and sessions.
              </ListItem>
              <ListItem title="Notifications" icon={Bell} href="#">
                Configure email and in-app notification preferences.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[380px] gap-2 p-4">
              <ListItem title="General" icon={Settings} href="#">
                Workspace name, URL, and defaults.
              </ListItem>
              <ListItem title="Team Members" icon={Users} href="#">
                Invite and manage team members and roles.
              </ListItem>
              <ListItem title="Integrations" icon={Layout} href="#">
                Connect Shopify, Slack, and other tools.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that the navigation menu renders all link items correctly
 * and they are visible and accessible.
 */
export const LinksRenderTest: Story = {
  name: "Interaction: Links Render Correctly",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
            data-testid="nav-dashboard"
          >
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
            data-testid="nav-creators"
          >
            Creators
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
            data-testid="nav-campaigns"
          >
            Campaigns
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const dashboard = canvas.getByTestId("nav-dashboard")
    const creators = canvas.getByTestId("nav-creators")
    const campaigns = canvas.getByTestId("nav-campaigns")
    await expect(dashboard).toBeVisible()
    await expect(creators).toBeVisible()
    await expect(campaigns).toBeVisible()
    await expect(dashboard).toHaveTextContent("Dashboard")
    await expect(creators).toHaveTextContent("Creators")
    await expect(campaigns).toHaveTextContent("Campaigns")
  },
}

/**
 * Verifies that clicking a NavigationMenuTrigger opens the dropdown content
 * and the content panel items are visible.
 */
export const DropdownOpenTest: Story = {
  name: "Interaction: Trigger Opens Dropdown",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-testid="nav-trigger">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-2 p-3">
              <ListItem title="Analytics" href="#">
                Track performance metrics.
              </ListItem>
              <ListItem title="Campaigns" href="#">
                Manage your campaigns.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
          >
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByTestId("nav-trigger")
    await expect(trigger).toBeVisible()
    // Click the trigger to open dropdown
    await userEvent.click(trigger)
    // Check that dropdown content is rendered
    const analyticsLink = await canvas.findByText("Analytics")
    await expect(analyticsLink).toBeVisible()
    const campaignsLink = canvas.getByText("Campaigns")
    await expect(campaignsLink).toBeVisible()
  },
}

/**
 * Verifies that keyboard Tab navigation moves focus between navigation items.
 */
export const KeyboardNavigationTest: Story = {
  name: "Interaction: Keyboard Tab Navigation",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
            data-testid="nav-kb-first"
          >
            First
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
            data-testid="nav-kb-second"
          >
            Second
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            className={navigationMenuTriggerStyle()}
            data-testid="nav-kb-third"
          >
            Third
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const firstLink = canvas.getByTestId("nav-kb-first")
    const secondLink = canvas.getByTestId("nav-kb-second")
    // All links should be visible
    await expect(firstLink).toBeVisible()
    await expect(secondLink).toBeVisible()
    // Tab to navigate to the first link
    await userEvent.tab()
    await expect(firstLink).toHaveFocus()
  },
}
