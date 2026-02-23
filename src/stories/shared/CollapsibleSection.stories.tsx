import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import { CollapsibleSection } from "@/components/shared/CollapsibleSection"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

// ─── Meta ─────────────────────────────────────────────────────────────────────

/**
 * # CollapsibleSection
 *
 * An expand/collapse container with a title row and animated chevron toggle.
 * Used to organize secondary or advanced content into collapsible groups,
 * keeping forms and settings pages clean.
 *
 * ## When to Use
 * - For advanced settings that most users do not need to see
 * - To group related form fields in wizard steps (e.g. "Purchase Restrictions")
 * - For FAQ or help sections with expandable answers
 * - When page content needs progressive disclosure to avoid overwhelming users
 *
 * ## When NOT to Use
 * - For primary form fields that are always required -- keep them visible
 * - For navigation or tab-style content -- use Tabs or Accordion instead
 * - For single toggle actions -- use Switch or Checkbox instead
 * - For modal content -- use Dialog or Sheet instead
 *
 * ## Accessibility
 * - Toggle button uses `aria-expanded` to communicate open/closed state
 * - The button element is keyboard focusable and activates on Enter/Space
 * - Chevron icon rotates 180 degrees when expanded for visual indication
 * - Content is removed from the DOM when collapsed (not just hidden)
 *
 * ## Import
 * ```tsx
 * import { CollapsibleSection } from '@/components/shared/CollapsibleSection'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <CollapsibleSection title="Advanced Settings" defaultOpen={false}>
 *   <p>Content goes here</p>
 * </CollapsibleSection>
 * ```
 */
const meta: Meta<typeof CollapsibleSection> = {
  title: "4. Components/Data Display/CollapsibleSection",
  component: CollapsibleSection,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Expand/collapse container with a title row and chevron toggle. Used for advanced settings sections in wizard steps and form groupings.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "The heading text displayed in the toggle button row.",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the section starts expanded. Uncontrolled -- only affects initial render.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    children: {
      description: "Content rendered inside the collapsible body when expanded.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the outer container.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-lg space-y-2">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

// ─── OPEN BY DEFAULT ─────────────────────────────────────────────────────────

/**
 * Section starts expanded, showing its content immediately.
 * Use when the content is important enough to be visible on load.
 *
 * ```tsx
 * <CollapsibleSection title="Purchase Restrictions" defaultOpen>
 *   <div className="space-y-3">
 *     <div className="space-y-1.5">
 *       <Label>Minimum Order Value</Label>
 *       <Input type="number" placeholder="e.g. 25" />
 *     </div>
 *   </div>
 * </CollapsibleSection>
 * ```
 */
export const OpenByDefault: Story = {
  name: "Open by Default",
  args: {
    title: "Purchase Restrictions",
    defaultOpen: true,
    children: (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label>Minimum Order Value</Label>
          <Input type="number" placeholder="e.g. 25" />
        </div>
        <div className="space-y-1.5">
          <Label>Maximum Uses Per Code</Label>
          <Input type="number" placeholder="e.g. 100" />
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Section starts expanded with form fields visible. The chevron points upward, and clicking it collapses the section.",
      },
    },
  },
}

// ─── CLOSED BY DEFAULT ───────────────────────────────────────────────────────

/**
 * Section starts collapsed. Click the title row to reveal content.
 * This is the default behavior.
 *
 * ```tsx
 * <CollapsibleSection title="Link Redirect">
 *   <p>Configure where customers are redirected after clicking the link.</p>
 * </CollapsibleSection>
 * ```
 */
export const ClosedByDefault: Story = {
  name: "Closed by Default",
  args: {
    title: "Link Redirect",
    defaultOpen: false,
    children: (
      <p className="text-sm text-muted-foreground">
        Configure where customers are redirected after clicking the creator's
        affiliate link. Leave blank to use the default landing page.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Section starts collapsed. Only the title and chevron are visible. Click to expand and reveal the content.",
      },
    },
  },
}

// ─── WITH RICH CONTENT ───────────────────────────────────────────────────────

/**
 * Collapsible section containing a complex form with multiple field types.
 * Demonstrates using Labels, Inputs, and Switches inside the section.
 *
 * ```tsx
 * <CollapsibleSection title="Discount Settings" defaultOpen>
 *   <div className="space-y-4">
 *     <div className="space-y-1.5">
 *       <Label htmlFor="code-prefix">Code Prefix</Label>
 *       <Input id="code-prefix" placeholder="e.g. SUMMER" />
 *     </div>
 *     <div className="flex items-center justify-between">
 *       <Label htmlFor="single-use">Single Use Only</Label>
 *       <Switch id="single-use" />
 *     </div>
 *   </div>
 * </CollapsibleSection>
 * ```
 */
export const WithRichContent: Story = {
  name: "With Rich Content",
  args: {
    title: "Discount Settings",
    defaultOpen: true,
    children: (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="code-prefix">Code Prefix</Label>
          <Input id="code-prefix" placeholder="e.g. SUMMER" />
          <p className="text-xs text-muted-foreground">
            All generated codes will start with this prefix.
          </p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="max-uses">Maximum Redemptions</Label>
          <Input id="max-uses" type="number" placeholder="Unlimited" />
        </div>
        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <div className="space-y-0.5">
            <Label htmlFor="single-use">Single Use Only</Label>
            <p className="text-xs text-muted-foreground">Each code can only be used once.</p>
          </div>
          <Switch id="single-use" />
        </div>
        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <div className="space-y-0.5">
            <Label htmlFor="auto-expire">Auto-expire Codes</Label>
            <p className="text-xs text-muted-foreground">Codes expire 30 days after creation.</p>
          </div>
          <Switch id="auto-expire" />
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "A rich form layout inside the collapsible body including text inputs, number inputs, helper text, and toggle switches. Represents a real Aspire offer configuration section.",
      },
    },
  },
}

// ─── NESTED SECTIONS ─────────────────────────────────────────────────────────

/**
 * CollapsibleSections can be nested for multi-level organization.
 * The parent section contains child sections, each independently
 * expandable.
 *
 * ```tsx
 * <CollapsibleSection title="Campaign Settings" defaultOpen>
 *   <div className="space-y-2">
 *     <CollapsibleSection title="Tracking">...</CollapsibleSection>
 *     <CollapsibleSection title="Notifications">...</CollapsibleSection>
 *   </div>
 * </CollapsibleSection>
 * ```
 */
export const NestedSections: Story = {
  name: "Nested Sections",
  render: () => (
    <div className="max-w-lg">
      <CollapsibleSection title="Campaign Settings" defaultOpen>
        <div className="space-y-2">
          <CollapsibleSection title="Tracking & Attribution">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label>UTM Source</Label>
                <Input placeholder="aspire" />
              </div>
              <div className="space-y-1.5">
                <Label>UTM Medium</Label>
                <Input placeholder="influencer" />
              </div>
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Notification Preferences">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Email on new submission</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Weekly summary digest</Label>
                <Switch />
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Nested collapsible sections for multi-level settings organization. The outer 'Campaign Settings' section starts open, revealing two nested subsections that can be independently expanded.",
      },
    },
  },
}

// ─── IN SETTINGS FORM ────────────────────────────────────────────────────────

/**
 * Multiple collapsible sections stacked in a settings page layout.
 * The middle section starts open to guide user attention.
 *
 * ```tsx
 * <div className="space-y-2">
 *   <CollapsibleSection title="Link Redirect">...</CollapsibleSection>
 *   <CollapsibleSection title="Purchase Restrictions" defaultOpen>...</CollapsibleSection>
 *   <CollapsibleSection title="Code Management">...</CollapsibleSection>
 * </div>
 * ```
 */
export const InSettingsForm: Story = {
  name: "In Settings Form",
  render: () => (
    <div className="space-y-2 max-w-lg">
      <CollapsibleSection title="Link Redirect">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Redirect URL</Label>
            <Input type="url" placeholder="https://yourbrand.com/shop" />
          </div>
          <p className="text-xs text-muted-foreground">
            Where customers go after clicking the creator's unique link.
          </p>
        </div>
      </CollapsibleSection>
      <CollapsibleSection title="Purchase Restrictions" defaultOpen>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Minimum Order Value</Label>
            <Input type="number" placeholder="e.g. 25" />
          </div>
          <div className="space-y-1.5">
            <Label>Maximum Uses Per Code</Label>
            <Input type="number" placeholder="e.g. 100" />
          </div>
        </div>
      </CollapsibleSection>
      <CollapsibleSection title="Code Management">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Code Prefix</Label>
            <Input placeholder="e.g. SUMMER" />
          </div>
          <div className="flex items-center justify-between">
            <Label>Auto-generate codes</Label>
            <Switch defaultChecked />
          </div>
        </div>
      </CollapsibleSection>
      <CollapsibleSection title="Expiration Settings">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Expiration Date</Label>
            <Input type="date" />
          </div>
          <div className="flex items-center justify-between">
            <Label>Notify creators before expiry</Label>
            <Switch defaultChecked />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple stacked collapsible sections typical of an Aspire offer wizard advanced settings page. 'Purchase Restrictions' starts open; others start collapsed.",
      },
    },
  },
}

// ─── ASPIRE: CAMPAIGN SETTINGS ───────────────────────────────────────────────

/**
 * Real-world example of campaign settings in the Aspire offer creation wizard.
 */
export const CampaignSettings: Story = {
  name: "Real World -- Campaign Settings",
  render: () => (
    <div className="space-y-2 max-w-lg">
      <CollapsibleSection title="Creator Requirements" defaultOpen>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Minimum Followers</Label>
            <Input type="number" placeholder="e.g. 10000" />
          </div>
          <div className="space-y-1.5">
            <Label>Required Platforms</Label>
            <Input placeholder="Instagram, TikTok" />
          </div>
          <div className="flex items-center justify-between">
            <Label>Verified accounts only</Label>
            <Switch />
          </div>
        </div>
      </CollapsibleSection>
      <CollapsibleSection title="Content Guidelines">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Required hashtags</Label>
            <Input placeholder="#sponsored #ad" />
          </div>
          <div className="space-y-1.5">
            <Label>Mention handle</Label>
            <Input placeholder="@yourbrand" />
          </div>
        </div>
      </CollapsibleSection>
      <CollapsibleSection title="Advanced Options">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Auto-approve submissions</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Allow re-submissions</Label>
            <Switch defaultChecked />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Campaign settings grouped into 'Creator Requirements' (open), 'Content Guidelines', and 'Advanced Options' sections. Typical layout for the Aspire campaign creation wizard.",
      },
    },
  },
}

// ─── INTERACTION TESTS ───────────────────────────────────────────────────────

/**
 * Verifies that clicking the collapsed section title expands it and reveals content.
 */
export const ExpandTest: Story = {
  name: "Test: Expand Collapsed Section",
  args: {
    title: "Test Section",
    defaultOpen: false,
    children: (
      <p data-testid="section-content">This content should appear after expanding.</p>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // The toggle button should show aria-expanded="false" initially
    const toggle = canvas.getByRole("button", { name: "Test Section" })
    await expect(toggle).toHaveAttribute("aria-expanded", "false")
    // Content should not be visible
    expect(canvas.queryByTestId("section-content")).not.toBeInTheDocument()
    // Click the toggle to expand
    await userEvent.click(toggle)
    // Now content should be visible and aria-expanded should be "true"
    await expect(toggle).toHaveAttribute("aria-expanded", "true")
    await expect(canvas.getByTestId("section-content")).toBeInTheDocument()
  },
}

/**
 * Verifies that a section with `defaultOpen={true}` starts expanded
 * and can be collapsed by clicking the toggle.
 */
export const CollapseTest: Story = {
  name: "Test: Collapse Open Section",
  args: {
    title: "Open Section",
    defaultOpen: true,
    children: (
      <p data-testid="open-content">Visible initially, hidden after collapse.</p>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Initially expanded
    const toggle = canvas.getByRole("button", { name: "Open Section" })
    await expect(toggle).toHaveAttribute("aria-expanded", "true")
    await expect(canvas.getByTestId("open-content")).toBeInTheDocument()
    // Click to collapse
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-expanded", "false")
    expect(canvas.queryByTestId("open-content")).not.toBeInTheDocument()
  },
}
