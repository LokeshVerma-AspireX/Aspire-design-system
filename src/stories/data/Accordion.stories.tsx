import type { Meta, StoryObj } from "@storybook/react"
import { within, userEvent, expect } from "storybook/test"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ShieldCheck,
  Bell,
  Globe,
  ChevronRight,
  Settings,
  CreditCard,
  Users,
  HelpCircle,
  Megaphone,
  BarChart3,
  Sliders,
} from "lucide-react"
import type { ElementType } from "react"

/**
 * # Accordion
 *
 * A vertically stacked set of interactive headings that each reveal a section
 * of content. Built on top of Radix UI Accordion primitive with smooth
 * expand/collapse animations.
 *
 * ## When to Use
 * - To organize related content into collapsible sections (FAQ, settings, details)
 * - To progressively disclose information without navigating away
 * - To reduce visual clutter on content-heavy pages
 * - For grouped form sections or configuration panels
 *
 * ## When NOT to Use
 * - For navigation menus -- use NavigationMenu or SideNav instead
 * - For switching between mutually exclusive views -- use Tabs instead
 * - When all content should be visible at once -- use a plain list or cards
 * - For a single collapsible section -- use Collapsible instead
 *
 * ## Accessibility
 * - Implements WAI-ARIA Accordion pattern with proper `role="region"` and `aria-expanded`
 * - Full keyboard navigation: Arrow Up/Down to move between triggers, Enter/Space to toggle
 * - Focus ring visible on keyboard navigation
 * - Screen readers announce expanded/collapsed state
 *
 * ## Import
 * ```tsx
 * import {
 *   Accordion,
 *   AccordionItem,
 *   AccordionTrigger,
 *   AccordionContent,
 * } from '@/components/ui/accordion'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section Title</AccordionTrigger>
 *     <AccordionContent>Section content here.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
const meta: Meta<typeof Accordion> = {
  title: "4. Components/Data Display/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Collapsible sections built on Radix Accordion. Use `type=\"single\"` to allow one open at a time, `type=\"multiple\"` for independent toggle.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description:
        'Determines whether one or multiple items can be opened at the same time. `"single"` allows only one, `"multiple"` allows many.',
      table: {
        type: { summary: '"single" | "multiple"' },
        defaultValue: { summary: "single" },
        category: "Behavior",
      },
    },
    collapsible: {
      control: "boolean",
      description:
        'When `type="single"`, allows closing the open item by clicking its trigger again. Has no effect when `type="multiple"`.',
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Behavior",
      },
    },
    defaultValue: {
      control: "text",
      description:
        "The value of the item(s) to expand by default (uncontrolled). Use a string for single, an array for multiple.",
      table: {
        type: { summary: "string | string[]" },
        category: "State",
      },
    },
    value: {
      control: "text",
      description:
        "The controlled value of the expanded item(s). Use with `onValueChange`.",
      table: {
        type: { summary: "string | string[]" },
        category: "State",
      },
    },
    disabled: {
      control: "boolean",
      description:
        "When true, prevents all items from being expanded or collapsed.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes merged via `cn()` utility.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

// ─── CORE VARIANTS ─────────────────────────────────

/**
 * Single-type accordion. Only one item can be open at a time.
 * The `collapsible` prop allows the open item to be closed again.
 *
 * ```tsx
 * <Accordion type="single" collapsible className="w-80">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
 *     <AccordionContent>
 *       A collection of re-usable components...
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Single: Story = {
  name: "Single (one open at a time)",
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="a">
        <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
        <AccordionContent>
          shadcn/ui is a collection of re-usable components built on Radix UI
          and styled with Tailwind CSS. Not a component library -- you own the
          code.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. All components follow WAI-ARIA design patterns and are tested
          with screen readers and keyboard navigation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Can I use it with TypeScript?</AccordionTrigger>
        <AccordionContent>
          Absolutely. Components are available in both JSX and TSX formats. Type
          safety is fully supported.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Multiple-type accordion. Items toggle independently so more
 * than one section can be open simultaneously.
 *
 * ```tsx
 * <Accordion type="multiple" defaultValue={["a", "c"]}>
 *   <AccordionItem value="a">...</AccordionItem>
 *   <AccordionItem value="b">...</AccordionItem>
 *   <AccordionItem value="c">...</AccordionItem>
 * </Accordion>
 * ```
 */
export const Multiple: Story = {
  name: "Multiple (independent toggle)",
  render: () => (
    <Accordion type="multiple" defaultValue={["a", "c"]} className="w-80">
      <AccordionItem value="a">
        <AccordionTrigger>Section 1 (open by default)</AccordionTrigger>
        <AccordionContent>
          This section starts open. Multiple sections can be open
          simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Toggle this section independently of others.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Section 3 (open by default)</AccordionTrigger>
        <AccordionContent>
          Both Section 1 and 3 start open because of{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
            defaultValue
          </code>
          .
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Collapsible accordion where the open panel can be toggled shut
 * by clicking its trigger again.
 *
 * ```tsx
 * <Accordion type="single" collapsible>
 *   ...
 * </Accordion>
 * ```
 */
export const Collapsible: Story = {
  name: "Collapsible (can close all)",
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="only">
        <AccordionTrigger>Click me to expand, then click again to collapse</AccordionTrigger>
        <AccordionContent>
          Because <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">collapsible</code> is
          set to true, clicking the trigger again will close this panel. Without
          it, at least one panel must stay open.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Accordion with an item expanded by default using `defaultValue`.
 *
 * ```tsx
 * <Accordion type="single" collapsible defaultValue="item-2">
 *   <AccordionItem value="item-1">...</AccordionItem>
 *   <AccordionItem value="item-2">...</AccordionItem>
 * </Accordion>
 * ```
 */
export const DefaultExpanded: Story = {
  name: "Default Expanded",
  render: () => (
    <Accordion type="single" collapsible defaultValue="b" className="w-80">
      <AccordionItem value="a">
        <AccordionTrigger>First Section</AccordionTrigger>
        <AccordionContent>This section starts collapsed.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second Section (expanded by default)</AccordionTrigger>
        <AccordionContent>
          This section is expanded on initial render because{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
            defaultValue=&quot;b&quot;
          </code>{" "}
          is set on the Accordion.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>This section also starts collapsed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Accordion items with rich nested content including lists, code blocks,
 * and other components.
 *
 * ```tsx
 * <AccordionContent>
 *   <ul className="list-disc pl-4 space-y-1">
 *     <li>Nested list item</li>
 *   </ul>
 * </AccordionContent>
 * ```
 */
export const NestedContent: Story = {
  name: "Nested Content",
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="requirements">
        <AccordionTrigger>Campaign Requirements</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground">
            <li>Minimum 10,000 followers on Instagram or TikTok</li>
            <li>Engagement rate above 3%</li>
            <li>Must be based in the United States</li>
            <li>
              Content categories:
              <ul className="list-disc pl-4 mt-1 space-y-1">
                <li>Beauty &amp; Skincare</li>
                <li>Lifestyle</li>
                <li>Fashion</li>
              </ul>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="deliverables">
        <AccordionTrigger>Deliverables</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div className="rounded-md border p-3">
              <p className="text-sm font-medium">Instagram Post</p>
              <p className="text-xs text-muted-foreground mt-1">
                1 in-feed photo or carousel post with product tag and branded
                hashtag.
              </p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-sm font-medium">Instagram Story</p>
              <p className="text-xs text-muted-foreground mt-1">
                3-frame story sequence with swipe-up link.
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="compensation">
        <AccordionTrigger>Compensation</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Base payment</span>
              <span className="font-medium text-foreground">$500</span>
            </div>
            <div className="flex justify-between">
              <span>Performance bonus</span>
              <span className="font-medium text-foreground">Up to $200</span>
            </div>
            <div className="flex justify-between">
              <span>Free product value</span>
              <span className="font-medium text-foreground">$150</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-medium text-foreground">
              <span>Total</span>
              <span>Up to $850</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// ─── ASPIRE / REAL-WORLD COMPOSITIONS ──────────────

/**
 * FAQ pattern commonly used on landing pages and help centers.
 * Uses single-type accordion with collapsible enabled.
 *
 * ```tsx
 * <Accordion type="single" collapsible>
 *   {faqs.map(({ q, a }, i) => (
 *     <AccordionItem key={i} value={`faq-${i}`}>
 *       <AccordionTrigger>{q}</AccordionTrigger>
 *       <AccordionContent>{a}</AccordionContent>
 *     </AccordionItem>
 *   ))}
 * </Accordion>
 * ```
 */
export const FAQ: Story = {
  name: "Aspire -- FAQ Section",
  render: () => {
    const faqs = [
      {
        q: "How do I find creators for my campaign?",
        a: "Use the Creator Marketplace to search and filter creators by niche, audience size, engagement rate, location, and more. You can also use Aspire's AI-powered recommendations based on your brand profile.",
      },
      {
        q: "What payment methods are supported?",
        a: "Aspire supports payments via ACH bank transfer, PayPal, and wire transfer. Creators can set their preferred payment method in their profile settings.",
      },
      {
        q: "How do I track campaign performance?",
        a: "Navigate to Analytics from the sidebar to view real-time metrics including impressions, engagement, conversions, and ROI. Export reports in CSV or PDF format.",
      },
      {
        q: "Can I manage multiple brands?",
        a: "Yes. Enterprise plans support unlimited brand workspaces. Switch between brands using the workspace selector in the top navigation bar.",
      },
      {
        q: "What is the creator approval workflow?",
        a: "After a creator applies to your campaign, you can review their profile, content samples, and audience demographics. Approve or decline from the Offers page, and approved creators receive an automatic notification.",
      },
    ]
    return (
      <div className="w-[560px]">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <p className="mt-1 text-muted-foreground">
            Everything you need to know about Aspire.
          </p>
        </div>
        <Accordion type="single" collapsible>
          {faqs.map(({ q, a }, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-6 rounded-lg border bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <span className="font-medium text-foreground cursor-pointer hover:underline">
              Contact support
            </span>
          </p>
        </div>
      </div>
    )
  },
}

/**
 * Campaign details accordion showing structured information sections.
 * Common pattern on the Campaign Detail page in Aspire.
 *
 * ```tsx
 * <Accordion type="multiple" defaultValue={["overview", "creators"]}>
 *   <AccordionItem value="overview">
 *     <AccordionTrigger>Campaign Overview</AccordionTrigger>
 *     <AccordionContent>...</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const CampaignDetails: Story = {
  name: "Aspire -- Campaign Details",
  render: () => (
    <div className="w-96">
      <Accordion type="multiple" defaultValue={["overview"]} className="w-full">
        <AccordionItem value="overview">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-muted-foreground" />
              Campaign Overview
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Campaign</span>
                <span className="font-medium">Summer Glow 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium">$25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>Jun 1 - Aug 31, 2025</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="creators">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Creators
              <Badge variant="secondary" className="text-xs">
                12
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Approved</span>
                <span className="font-medium text-foreground">8</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-medium text-foreground">3</span>
              </div>
              <div className="flex justify-between">
                <span>Declined</span>
                <span className="font-medium text-foreground">1</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All Creators
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="analytics">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              Performance
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Total Impressions</span>
                <span className="font-medium text-foreground">1.2M</span>
              </div>
              <div className="flex justify-between">
                <span>Engagement Rate</span>
                <span className="font-medium text-foreground">4.8%</span>
              </div>
              <div className="flex justify-between">
                <span>Conversions</span>
                <span className="font-medium text-foreground">342</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

/**
 * Advanced settings accordion with toggleable options inside each section.
 * Common pattern for configuration pages in Aspire.
 *
 * ```tsx
 * <Accordion type="single" collapsible defaultValue="security">
 *   <AccordionItem value="security">
 *     <AccordionTrigger>
 *       <div className="flex items-center gap-2">
 *         <ShieldCheck className="h-4 w-4" />
 *         Security
 *       </div>
 *     </AccordionTrigger>
 *     <AccordionContent>
 *       <Switch defaultChecked={true} />
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const AdvancedSettings: Story = {
  name: "Aspire -- Advanced Settings",
  render: () => {
    const sections: Array<{
      id: string
      icon: ElementType
      title: string
      badge: string | null
      content: Array<{ label: string; enabled: boolean }>
    }> = [
      {
        id: "security",
        icon: ShieldCheck,
        title: "Security",
        badge: null,
        content: [
          { label: "Two-factor authentication", enabled: true },
          { label: "Login alerts", enabled: true },
          { label: "Session timeout (30 min)", enabled: false },
        ],
      },
      {
        id: "notifications",
        icon: Bell,
        title: "Notifications",
        badge: "3 new",
        content: [
          { label: "Email digests", enabled: true },
          { label: "Push notifications", enabled: false },
          { label: "Browser alerts", enabled: true },
        ],
      },
      {
        id: "privacy",
        icon: Globe,
        title: "Privacy",
        badge: null,
        content: [
          { label: "Public profile", enabled: false },
          { label: "Analytics tracking", enabled: true },
          { label: "Share usage data", enabled: false },
        ],
      },
    ]
    return (
      <div className="w-96">
        <Accordion type="single" collapsible defaultValue="security">
          {sections.map(({ id, icon: Icon, title, badge, content }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {title}
                  {badge && (
                    <Badge variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  {content.map(({ label, enabled }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between"
                    >
                      <p className="text-sm">{label}</p>
                      <Switch defaultChecked={enabled} />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  },
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that clicking an accordion trigger expands the panel
 * and the content becomes visible.
 */
export const ExpandTest: Story = {
  name: "Test: Click expands panel",
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="test-item">
        <AccordionTrigger>Expandable Section</AccordionTrigger>
        <AccordionContent>
          This content should be visible after clicking the trigger.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText("Expandable Section")

    // Initially the content should not be visible
    await expect(
      canvas.queryByText(
        "This content should be visible after clicking the trigger."
      )
    ).not.toBeVisible()

    // Click to expand
    await userEvent.click(trigger)

    // Content should now be visible
    await expect(
      canvas.getByText(
        "This content should be visible after clicking the trigger."
      )
    ).toBeVisible()
  },
}

/**
 * Verifies that clicking an expanded trigger collapses the panel
 * when `collapsible` is true.
 */
export const CollapseTest: Story = {
  name: "Test: Click collapses expanded panel",
  render: () => (
    <Accordion type="single" collapsible defaultValue="test-item" className="w-80">
      <AccordionItem value="test-item">
        <AccordionTrigger>Collapsible Section</AccordionTrigger>
        <AccordionContent>
          This content starts visible and should hide after clicking.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText("Collapsible Section")

    // Initially visible because defaultValue is set
    await expect(
      canvas.getByText(
        "This content starts visible and should hide after clicking."
      )
    ).toBeVisible()

    // Click to collapse
    await userEvent.click(trigger)

    // Content should be hidden
    await expect(
      canvas.queryByText(
        "This content starts visible and should hide after clicking."
      )
    ).not.toBeVisible()
  },
}

/**
 * Verifies that in single-type accordion, opening one item closes the other.
 */
export const SingleToggleTest: Story = {
  name: "Test: Single type closes previous item",
  render: () => (
    <Accordion type="single" collapsible defaultValue="first" className="w-80">
      <AccordionItem value="first">
        <AccordionTrigger>First Panel</AccordionTrigger>
        <AccordionContent>Content of the first panel.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="second">
        <AccordionTrigger>Second Panel</AccordionTrigger>
        <AccordionContent>Content of the second panel.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // First panel should start open
    await expect(
      canvas.getByText("Content of the first panel.")
    ).toBeVisible()

    // Click second panel trigger
    await userEvent.click(canvas.getByText("Second Panel"))

    // Second panel should be visible
    await expect(
      canvas.getByText("Content of the second panel.")
    ).toBeVisible()

    // First panel should now be hidden
    await expect(
      canvas.queryByText("Content of the first panel.")
    ).not.toBeVisible()
  },
}
