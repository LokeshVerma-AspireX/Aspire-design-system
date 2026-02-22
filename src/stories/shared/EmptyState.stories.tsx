import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Users,
  FileText,
  Inbox,
  BarChart2,
  Tag,
  Search,
  ShoppingBag,
} from "lucide-react"
import { EmptyState } from "@/components/shared/EmptyState"

const meta = {
  title: "Shared/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Centered empty content placeholder. Icon in a bordered circle, title, description, primary CTA button (black), and an optional 'Learn more' text link.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="rounded-xl border border-border min-h-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const NoContacts: Story = {
  args: {
    icon: <Users className="size-6" />,
    title: "No creators yet",
    description: "Add your first creator to start building your influencer roster.",
    actionLabel: "Add Creator",
    onAction: () => {},
    onLearnMore: () => {},
  },
}

export const NoContent: Story = {
  args: {
    icon: <FileText className="size-6" />,
    title: "No content submitted",
    description: "Once a creator submits content for review, it will appear here.",
    actionLabel: "Request Content",
    onAction: () => {},
  },
}

export const EmptyInbox: Story = {
  args: {
    icon: <Inbox className="size-6" />,
    title: "No messages yet",
    description: "Start a conversation with a creator or wait for their reply.",
    actionLabel: "New Message",
    onAction: () => {},
  },
}

export const NoResults: Story = {
  args: {
    icon: <Search className="size-6" />,
    title: "No results found",
    description: "Try adjusting your filters or search term.",
  },
}

export const NoOffers: Story = {
  args: {
    icon: <Tag className="size-6" />,
    title: "No offers created",
    description: "Create your first offer to start giving creators shareable promo codes and links.",
    actionLabel: "Create Offer",
    onAction: () => {},
    onLearnMore: () => {},
  },
}

export const NoAnalytics: Story = {
  args: {
    icon: <BarChart2 className="size-6" />,
    title: "Analytics not available",
    description: "Once your campaign starts receiving traffic, performance metrics will appear here.",
  },
}

export const NoOrders: Story = {
  args: {
    icon: <ShoppingBag className="size-6" />,
    title: "No orders tracked",
    description: "Orders will appear once a customer completes a purchase using a creator's promo code.",
    onLearnMore: () => {},
    learnMoreLabel: "How tracking works →",
  },
}
