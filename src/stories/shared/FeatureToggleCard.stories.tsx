import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import {
  Shield,
  Globe,
  Tag,
  Bell,
  Zap,
  Mail,
  Eye,
  Users,
  Link2,
} from "lucide-react"
import { FeatureToggleCard } from "@/components/shared/FeatureToggleCard"

/**
 * # FeatureToggleCard
 *
 * A feature configuration card with an optional icon, title, description,
 * "Recommended" badge, Switch toggle, optional checklist of sub-features,
 * and an optional footer link. The card highlights with a primary-tinted
 * border and background when toggled on.
 *
 * ## When to Use
 * - Feature configuration in wizard steps (e.g. offer creation)
 * - Enabling/disabling optional capabilities (tracking, auto-approval, etc.)
 * - Settings pages where features need description and toggle control
 * - Any binary feature selection with supporting context
 *
 * ## When NOT to Use
 * - Simple on/off toggles without context -- use a Switch directly
 * - Multi-select feature lists -- use Checkbox groups
 * - Feature comparisons across plans -- use a pricing table
 * - Non-togglable informational cards -- use a Card component
 *
 * ## Accessibility
 * - The Switch component handles `role="switch"` and `aria-checked` internally
 * - Disabled state prevents toggle interaction and dims the switch
 * - Checklist items use semantic `<ul>` / `<li>` markup
 * - Footer links are keyboard-accessible `<button>` elements
 *
 * ## Import
 * ```tsx
 * import { FeatureToggleCard } from '@/components/shared/FeatureToggleCard'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <FeatureToggleCard
 *   icon={<Tag className="size-4" />}
 *   title="Generate promo codes"
 *   description="Create unique promo codes for each creator."
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 * />
 * ```
 */
const meta: Meta<typeof FeatureToggleCard> = {
  title: "4. Components/Forms/FeatureToggleCard",
  component: FeatureToggleCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Feature card with icon, title, optional 'Recommended' badge, description, Switch toggle, optional checklist items, and footer link. Highlights with a primary border when toggled on.",
      },
    },
  },
  argTypes: {
    icon: {
      control: false,
      description:
        "Optional icon rendered in a bordered container to the left of the title. Typically a Lucide icon at `size-4`.",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
        category: "Content",
      },
    },
    title: {
      control: "text",
      description: "Primary label for the feature. Rendered as bold text.",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },
    description: {
      control: "text",
      description:
        "Supporting text explaining what the feature does. Rendered in muted foreground below the title.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Content",
      },
    },
    recommended: {
      control: "boolean",
      description:
        'When true, displays a "Recommended" badge pill next to the title in the primary color.',
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Appearance",
      },
    },
    checked: {
      control: "boolean",
      description:
        "Controlled checked state of the Switch. When true, the card gets a primary-tinted border and background.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
        category: "State",
      },
    },
    onCheckedChange: {
      action: "checkedChange",
      description:
        "Callback fired when the Switch is toggled. Receives the new boolean value.",
      table: {
        type: { summary: "(checked: boolean) => void" },
        category: "Events",
      },
    },
    checklistItems: {
      control: "object",
      description:
        "Array of string labels rendered as a checklist below the description. Each item shows a green checkmark icon.",
      table: {
        type: { summary: "string[]" },
        defaultValue: { summary: "undefined" },
        category: "Content",
      },
    },
    footerLink: {
      control: "object",
      description:
        "Optional link rendered below the checklist. Contains a `label` string and an optional `onClick` handler.",
      table: {
        type: { summary: '{ label: string; href?: string; onClick?: () => void }' },
        defaultValue: { summary: "undefined" },
        category: "Content",
      },
    },
    disabled: {
      control: "boolean",
      description:
        "Disables the Switch, preventing toggle interaction. Used for plan-gated or unavailable features.",
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
  args: {
    onCheckedChange: fn(),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FeatureToggleCard>

// ─── CORE VARIANTS ────────────────────────────────

/**
 * Basic feature toggle with icon, title, and description.
 *
 * ```tsx
 * <FeatureToggleCard
 *   icon={<Tag className="size-4" />}
 *   title="Generate promo codes for this offer"
 *   description="Automatically create unique promo codes that creators can share."
 * />
 * ```
 */
export const Default: Story = {
  args: {
    icon: <Tag className="size-4" />,
    title: "Generate promo codes for this offer",
    description:
      "Automatically create unique promo codes that creators can share with their audience to track conversions.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic feature toggle card with an icon, title, and description. The Switch is unchecked by default.",
      },
    },
  },
}

/**
 * Card with icon displayed in a bordered container.
 *
 * ```tsx
 * <FeatureToggleCard
 *   icon={<Eye className="size-4" />}
 *   title="Enable tracking pixel"
 *   description="Track conversions across creator content."
 * />
 * ```
 */
export const WithIcon: Story = {
  name: "With Icon",
  args: {
    icon: <Eye className="size-4" />,
    title: "Enable tracking pixel",
    description:
      "Track conversions across creator content with a lightweight pixel snippet.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The icon is rendered in a bordered square container aligned with the title text.",
      },
    },
  },
}

/**
 * Card with the "Recommended" badge displayed next to the title.
 *
 * ```tsx
 * <FeatureToggleCard
 *   icon={<Shield className="size-4" />}
 *   title="Enable SecureCodes"
 *   recommended
 *   description="Each creator gets a unique, tamper-proof promo code."
 * />
 * ```
 */
export const WithRecommendedBadge: Story = {
  name: "With Recommended Badge",
  args: {
    icon: <Shield className="size-4" />,
    title: "Enable SecureCodes\u2122",
    description:
      "Each creator gets a unique, tamper-proof promo code that prevents sharing or unauthorized use.",
    recommended: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a "Recommended" pill badge in the primary color next to the title. Use for features you want to nudge users toward.',
      },
    },
  },
}

/**
 * Card with a checklist of sub-features below the description.
 *
 * ```tsx
 * <FeatureToggleCard
 *   icon={<Shield className="size-4" />}
 *   title="Enable SecureCodes"
 *   recommended
 *   checklistItems={["Unique code per creator", "Fraud-resistant", "Real-time tracking"]}
 *   footerLink={{ label: "How SecureCodes Work?", onClick: () => {} }}
 * />
 * ```
 */
export const WithChecklist: Story = {
  name: "With Checklist Items",
  args: {
    icon: <Shield className="size-4" />,
    title: "Enable SecureCodes\u2122",
    description:
      "Each creator gets a unique, tamper-proof promo code that prevents sharing or unauthorized use.",
    recommended: true,
    checked: false,
    checklistItems: [
      "Unique code per creator",
      "Fraud-resistant & non-transferable",
      "Real-time usage tracking",
    ],
    footerLink: { label: "How SecureCodes\u2122 Work?", onClick: fn() },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checklist items are rendered as a vertical list with green checkmark icons. Each item describes a sub-feature or benefit.",
      },
    },
  },
}

/**
 * Card with a clickable footer link for additional information.
 *
 * ```tsx
 * <FeatureToggleCard
 *   icon={<Link2 className="size-4" />}
 *   title="Enable affiliate tracking"
 *   footerLink={{ label: "Learn about affiliate tracking", onClick: () => {} }}
 * />
 * ```
 */
export const WithFooterLink: Story = {
  name: "With Footer Link",
  args: {
    icon: <Link2 className="size-4" />,
    title: "Enable affiliate tracking",
    description:
      "Track affiliate conversions and attribute sales to specific creators.",
    footerLink: { label: "Learn about affiliate tracking", onClick: fn() },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Footer link rendered below the card content. Use for documentation, help articles, or detailed feature pages.",
      },
    },
  },
}

// ─── STATES ───────────────────────────────────────

/**
 * Toggled on state — card has primary-tinted border and background.
 *
 * ```tsx
 * <FeatureToggleCard
 *   icon={<Globe className="size-4" />}
 *   title="Create Offer Landing Page"
 *   checked={true}
 * />
 * ```
 */
export const Checked: Story = {
  args: {
    icon: <Globe className="size-4" />,
    title: "Create Offer Landing Page",
    description:
      "Generate a branded landing page creators can share with their audience directly.",
    recommended: true,
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Toggled on state. The card border transitions to the primary color and the background gets a subtle tint.",
      },
    },
  },
}

/**
 * Toggled off state — neutral card border and background.
 *
 * ```tsx
 * <FeatureToggleCard
 *   icon={<Globe className="size-4" />}
 *   title="Create Offer Landing Page"
 *   checked={false}
 * />
 * ```
 */
export const Unchecked: Story = {
  args: {
    icon: <Globe className="size-4" />,
    title: "Create Offer Landing Page",
    description:
      "Generate a branded landing page creators can share with their audience directly.",
    recommended: true,
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Toggled off state. The card has the default neutral border and background.",
      },
    },
  },
}

/**
 * Disabled state — the Switch is non-interactive. Used for plan-gated features.
 *
 * ```tsx
 * <FeatureToggleCard
 *   icon={<Zap className="size-4" />}
 *   title="Advanced Attribution"
 *   description="Requires a premium plan."
 *   disabled
 * />
 * ```
 */
export const Disabled: Story = {
  args: {
    icon: <Zap className="size-4" />,
    title: "Advanced Attribution",
    description:
      "Enable multi-touch attribution windows. Requires a premium plan.",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Switch disabled state. Used for features that require a plan upgrade or are temporarily unavailable.",
      },
    },
  },
}

/**
 * Card without an icon — title and description only.
 *
 * ```tsx
 * <FeatureToggleCard
 *   title="Send weekly summary emails"
 *   description="Creators receive a weekly performance digest for this offer."
 * />
 * ```
 */
export const NoIcon: Story = {
  name: "No Icon",
  args: {
    title: "Send weekly summary emails",
    description:
      "Creators receive a weekly performance digest for this offer.",
  },
  parameters: {
    docs: {
      description: {
        story: "Without an icon, the title and description align to the left edge of the card.",
      },
    },
  },
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Enable Tracking — typical feature card from the Aspire offer creation flow.
 */
export const EnableTracking: Story = {
  name: "Real World — Enable Tracking",
  args: {
    icon: <Eye className="size-4" />,
    title: "Enable conversion tracking",
    description:
      "Install a lightweight pixel to track creator-driven conversions on your site.",
    recommended: true,
    checked: true,
    checklistItems: [
      "Track page views and purchases",
      "Attribute conversions to creators",
      "7-day attribution window",
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Conversion tracking toggle as used in the Aspire offer configuration wizard.",
      },
    },
  },
}

/**
 * Auto-Approval feature card from the campaign settings.
 */
export const AutoApproval: Story = {
  name: "Real World — Auto-Approval",
  args: {
    icon: <Users className="size-4" />,
    title: "Auto-approve creator applications",
    description:
      "Automatically approve creators who meet your campaign criteria without manual review.",
    checked: false,
    checklistItems: [
      "Reduces approval time to zero",
      "Criteria-based matching",
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Auto-approval toggle from the Aspire campaign settings page.",
      },
    },
  },
}

/**
 * Content moderation feature card.
 */
export const ContentModeration: Story = {
  name: "Real World — Content Moderation",
  args: {
    icon: <Shield className="size-4" />,
    title: "Content moderation",
    description:
      "Require content approval before creators can publish sponsored posts.",
    recommended: true,
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Content moderation toggle from the Aspire brand safety settings.",
      },
    },
  },
}

/**
 * Stacked cards — typical layout from the configure discount step in the
 * Aspire offer creation wizard.
 */
export const StackedCards: Story = {
  name: "Real World — Stacked Configuration",
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <FeatureToggleCard
        icon={<Shield className="size-4" />}
        title="Enable SecureCodes\u2122"
        description="Tamper-proof promo codes per creator."
        recommended
        checked
        checklistItems={["Unique per creator", "Non-transferable"]}
        footerLink={{ label: "How SecureCodes\u2122 Work?", onClick: () => {} }}
      />
      <FeatureToggleCard
        icon={<Globe className="size-4" />}
        title="Create Offer Landing Page"
        description="Branded landing page for creator links."
        recommended
      />
      <FeatureToggleCard
        icon={<Mail className="size-4" />}
        title="Email creators upon sign-up"
        description="Send a welcome email when a creator joins this offer."
      />
      <FeatureToggleCard
        icon={<Bell className="size-4" />}
        title="Creator application notifications"
        description="Get notified when a new creator applies to your campaign."
        checked
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Four stacked feature toggle cards as seen in the configure-discount wizard step. Mix of checked, unchecked, recommended, and standard cards.",
      },
    },
  },
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that clicking the Switch fires the onCheckedChange callback.
 */
export const ToggleTest: Story = {
  name: "Test: Toggle fires onCheckedChange",
  args: {
    icon: <Tag className="size-4" />,
    title: "Generate promo codes",
    description: "Create unique promo codes for each creator.",
    checked: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole("switch")
    await expect(switchEl).toBeInTheDocument()
    await userEvent.click(switchEl)
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(1)
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test verifying that clicking the Switch element fires the `onCheckedChange` callback.",
      },
    },
  },
}

/**
 * Verifies that a disabled Switch does not fire onCheckedChange when clicked.
 */
export const DisabledToggleTest: Story = {
  name: "Test: Disabled Switch prevents toggle",
  args: {
    icon: <Zap className="size-4" />,
    title: "Advanced Attribution",
    description: "Requires a premium plan.",
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole("switch")
    await expect(switchEl).toBeDisabled()
    await userEvent.click(switchEl)
    await expect(args.onCheckedChange).not.toHaveBeenCalled()
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test verifying that a disabled Switch element does not fire the `onCheckedChange` callback.",
      },
    },
  },
}

/**
 * Verifies that the recommended badge is rendered when the prop is set.
 */
export const RecommendedBadgeTest: Story = {
  name: "Test: Recommended badge renders",
  args: {
    icon: <Shield className="size-4" />,
    title: "Enable SecureCodes",
    recommended: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText("Recommended")
    await expect(badge).toBeInTheDocument()
    const title = canvas.getByText("Enable SecureCodes")
    await expect(title).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test verifying that the "Recommended" badge text is rendered when the `recommended` prop is true.',
      },
    },
  },
}
