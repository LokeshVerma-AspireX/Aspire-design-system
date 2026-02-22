import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Shield, Globe, Tag, Bell, Zap, Mail } from "lucide-react"
import { FeatureToggleCard } from "@/components/shared/FeatureToggleCard"

const meta = {
  title: "Shared/FeatureToggleCard",
  component: FeatureToggleCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Feature card with icon, title, optional 'Recommended' badge (lime), description paragraph, Switch toggle on the right, optional checklist items, and footer link. Highlights with a lime border when toggled on.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeatureToggleCard>

export default meta
// title is required; render-only stories use StoryObj without generic
type Story = StoryObj

export const Default: Story = {
  args: {
    icon: <Tag className="size-4" />,
    title: "Generate promo codes for this offer",
    description: "Automatically create unique promo codes that creators can share with their audience to track conversions.",
  },
}

export const WithRecommendedBadge: Story = {
  args: {
    icon: <Shield className="size-4" />,
    title: "Enable SecureCodes™",
    description: "Each creator gets a unique, tamper-proof promo code that prevents sharing or unauthorized use.",
    recommended: true,
    checked: false,
    checklistItems: [
      "Unique code per creator",
      "Fraud-resistant & non-transferable",
      "Real-time usage tracking",
    ],
    footerLink: { label: "How SecureCodes™ Work?", onClick: () => {} },
  },
  parameters: { docs: { description: { story: "Recommended badge + checklist sub-features + footer link." } } },
}

export const ToggledOn: Story = {
  args: {
    icon: <Globe className="size-4" />,
    title: "Create Offer Landing Page",
    description: "Generate a branded landing page creators can share with their audience directly.",
    recommended: true,
    checked: true,
  },
  parameters: { docs: { description: { story: "Toggled on — card gets lime border and tinted background." } } },
}

export const ToggledOff: Story = {
  args: {
    icon: <Globe className="size-4" />,
    title: "Create Offer Landing Page",
    description: "Generate a branded landing page creators can share with their audience directly.",
    recommended: true,
    checked: false,
  },
}

export const Disabled: Story = {
  args: {
    icon: <Zap className="size-4" />,
    title: "Advanced Attribution",
    description: "Enable multi-touch attribution windows. Requires a premium plan.",
    disabled: true,
  },
  parameters: { docs: { description: { story: "Switch disabled — used for plan-gated features." } } },
}

export const NoIcon: Story = {
  args: {
    title: "Send weekly summary emails",
    description: "Creators receive a weekly performance digest for this offer.",
  },
}

export const NotificationCard: Story = {
  args: {
    icon: <Bell className="size-4" />,
    title: "Creator application notifications",
    description: "Get notified by email whenever a new creator applies to your campaign.",
    checked: true,
  },
}

export const Stacked: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <FeatureToggleCard
        icon={<Shield className="size-4" />}
        title="Enable SecureCodes™"
        description="Tamper-proof promo codes per creator."
        recommended
        checked
        checklistItems={["Unique per creator", "Non-transferable"]}
        footerLink={{ label: "How SecureCodes™ Work?", onClick: () => {} }}
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
    </div>
  ),
  parameters: { docs: { description: { story: "Three cards stacked — typical configure-discount layout." } } },
}
