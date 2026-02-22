import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Shield, Globe, Tag, Zap } from "lucide-react"
import { FeatureToggleCard } from "@/components/shared/FeatureToggleCard"

const meta = {
  title: "Offers/Create/FeatureToggleCard",
  component: FeatureToggleCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Feature card with icon, title, optional 'Recommended' badge, description, Switch toggle, optional checklist items, and a footer link. Used in the Configure Discount step.",
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
type Story = StoryObj<typeof meta>

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
    checklistItems: [
      "Unique code per creator",
      "Fraud-resistant & non-transferable",
      "Real-time usage tracking",
    ],
    footerLink: { label: "How SecureCodes™ Work?", onClick: () => {} },
  },
}

export const ToggledOn: Story = {
  args: {
    icon: <Globe className="size-4" />,
    title: "Create Offer Landing Page",
    description: "Generate a branded landing page creators can share with their audience directly.",
    recommended: true,
    checked: true,
  },
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
}

export const NoIcon: Story = {
  args: {
    title: "Send weekly summary emails",
    description: "Creators receive a weekly performance digest for this offer.",
    recommended: false,
  },
}
