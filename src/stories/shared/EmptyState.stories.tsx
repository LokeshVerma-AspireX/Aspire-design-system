import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import {
  Users,
  FileText,
  Inbox,
  BarChart2,
  Tag,
  Search,
  ShoppingBag,
  Megaphone,
  ImageIcon,
} from "lucide-react"
import { EmptyState } from "@/components/shared/EmptyState"

/**
 * # EmptyState
 *
 * A centered placeholder shown when a page, section, or list has no content
 * to display. It features an optional icon rendered inside a bordered circle,
 * a title, an optional description, a primary CTA button, and an optional
 * "Learn more" text link. The component guides the user toward a productive
 * next step rather than leaving them stranded on a blank screen.
 *
 * ## When to Use
 * - A data table or list has no rows (no creators, no campaigns, no offers)
 * - A search or filter returns zero results
 * - A feature section has not been configured yet
 * - An inbox or feed has no messages or activity
 *
 * ## When NOT to Use
 * - For loading states — use Skeleton instead
 * - For error states with retry — use an error boundary or Alert
 * - For success confirmation — use a toast or success banner
 * - For in-line empty hints (e.g., empty table cell) — use placeholder text
 *
 * ## Accessibility
 * - The title is rendered as an `<h3>` element for proper heading hierarchy
 * - The primary CTA is a `<Button>` with full keyboard support
 * - The "Learn more" link is a `<button>` that receives focus and fires on Enter/Space
 * - The icon container is presentational; the icon itself provides visual context
 * - Ensure the `title` prop is descriptive enough for screen readers to convey meaning
 *
 * ## Import
 * ```tsx
 * import { EmptyState } from '@/components/shared/EmptyState'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <EmptyState
 *   icon={<Users className="size-6" />}
 *   title="No creators yet"
 *   description="Add your first creator to start building your roster."
 *   actionLabel="Add Creator"
 *   onAction={() => openCreateDialog()}
 * />
 * ```
 */
const meta: Meta<typeof EmptyState> = {
  title: "4. Components/Feedback/EmptyState",
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
  argTypes: {
    icon: {
      control: false,
      description:
        "A React node (typically a Lucide icon at `size-6`) rendered inside a circular bordered container above the title.",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
        category: "Content",
      },
    },
    title: {
      control: "text",
      description:
        "The primary heading text. Rendered as an `<h3>` element. Should clearly state what is missing or empty.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "-" },
        category: "Content",
      },
    },
    description: {
      control: "text",
      description:
        "Optional supporting text below the title. Provides context or guidance on what the user can do next. Max width is `max-w-sm`.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Content",
      },
    },
    actionLabel: {
      control: "text",
      description:
        "Label for the primary CTA button. The button only renders when this prop is provided.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Actions",
      },
    },
    onAction: {
      action: "onAction",
      description:
        "Click handler for the primary CTA button. Only relevant when `actionLabel` is provided.",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    learnMoreLabel: {
      control: "text",
      description:
        'Label text for the secondary "Learn more" link. Defaults to "Learn more →".',
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Learn more →"' },
        category: "Actions",
      },
    },
    onLearnMore: {
      action: "onLearnMore",
      description:
        "Click handler for the learn-more text link. The link only renders when this prop is provided.",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes merged on the outer container via `cn()`.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    onAction: fn(),
    onLearnMore: fn(),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="rounded-xl border border-border min-h-64">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

// ─── BASIC VARIANTS ───────────────────────────────

/**
 * The simplest empty state — title only, no icon, description, or actions.
 *
 * ```tsx
 * <EmptyState title="Nothing here yet" />
 * ```
 */
export const Basic: Story = {
  args: {
    title: "Nothing here yet",
    onAction: undefined,
    onLearnMore: undefined,
  },
}

/**
 * Empty state with an icon providing visual context about what is missing.
 *
 * ```tsx
 * <EmptyState
 *   icon={<Users className="size-6" />}
 *   title="No creators yet"
 * />
 * ```
 */
export const WithIcon: Story = {
  name: "With Icon",
  args: {
    icon: <Users className="size-6" />,
    title: "No creators yet",
    onAction: undefined,
    onLearnMore: undefined,
  },
}

/**
 * Icon and description but no action button — for informational-only
 * empty states where the user cannot take immediate action.
 *
 * ```tsx
 * <EmptyState
 *   icon={<BarChart2 className="size-6" />}
 *   title="Analytics not available"
 *   description="Once your campaign starts receiving traffic, performance metrics will appear here."
 * />
 * ```
 */
export const WithDescription: Story = {
  name: "With Icon + Description",
  args: {
    icon: <BarChart2 className="size-6" />,
    title: "Analytics not available",
    description:
      "Once your campaign starts receiving traffic, performance metrics will appear here.",
    onAction: undefined,
    onLearnMore: undefined,
  },
}

/**
 * Includes a primary CTA button that prompts the user to take action.
 *
 * ```tsx
 * <EmptyState
 *   icon={<Users className="size-6" />}
 *   title="No creators yet"
 *   description="Add your first creator to start building your influencer roster."
 *   actionLabel="Add Creator"
 *   onAction={() => openDialog()}
 * />
 * ```
 */
export const WithAction: Story = {
  name: "With Action Button",
  args: {
    icon: <Users className="size-6" />,
    title: "No creators yet",
    description:
      "Add your first creator to start building your influencer roster.",
    actionLabel: "Add Creator",
    onLearnMore: undefined,
  },
}

/**
 * Includes a "Learn more" link below the CTA for documentation or help.
 *
 * ```tsx
 * <EmptyState
 *   icon={<Tag className="size-6" />}
 *   title="No offers created"
 *   description="Create your first offer to start giving creators shareable promo codes."
 *   actionLabel="Create Offer"
 *   onAction={() => {}}
 *   onLearnMore={() => {}}
 * />
 * ```
 */
export const WithLearnMore: Story = {
  name: "With Learn More Link",
  args: {
    icon: <Tag className="size-6" />,
    title: "No offers created",
    description:
      "Create your first offer to start giving creators shareable promo codes and links.",
    actionLabel: "Create Offer",
  },
}

/**
 * Full-featured empty state with icon, title, description, primary CTA,
 * and a custom learn-more label.
 *
 * ```tsx
 * <EmptyState
 *   icon={<ShoppingBag className="size-6" />}
 *   title="No orders tracked"
 *   description="Orders will appear once a customer completes a purchase using a creator's promo code."
 *   actionLabel="View Setup Guide"
 *   onAction={() => {}}
 *   learnMoreLabel="How tracking works →"
 *   onLearnMore={() => {}}
 * />
 * ```
 */
export const FullFeatured: Story = {
  name: "Full Featured",
  args: {
    icon: <ShoppingBag className="size-6" />,
    title: "No orders tracked",
    description:
      "Orders will appear once a customer completes a purchase using a creator's promo code.",
    actionLabel: "View Setup Guide",
    learnMoreLabel: "How tracking works →",
  },
}

/**
 * Learn-more link only (no primary CTA button). Useful when the only
 * action is to read documentation.
 */
export const LearnMoreOnly: Story = {
  name: "Learn More Only (No CTA)",
  args: {
    icon: <BarChart2 className="size-6" />,
    title: "Analytics not available",
    description:
      "Performance data will appear once your campaign receives traffic.",
    learnMoreLabel: "Learn about analytics →",
    onAction: undefined,
  },
}

// ─── NO DESCRIPTION ───────────────────────────────

/**
 * Title and action only — skipping the description for a more compact layout.
 */
export const NoDescription: Story = {
  name: "No Description",
  args: {
    icon: <Megaphone className="size-6" />,
    title: "No campaigns",
    actionLabel: "Create Campaign",
    onLearnMore: undefined,
  },
}

// ─── CUSTOM ICON ──────────────────────────────────

/**
 * Any React node can be passed as the icon — here we use a custom
 * emoji-style icon inside the circle.
 */
export const CustomIcon: Story = {
  name: "Custom Icon",
  args: {
    icon: <ImageIcon className="size-6" />,
    title: "No images uploaded",
    description: "Upload product images to use in your offer landing pages.",
    actionLabel: "Upload Images",
    onLearnMore: undefined,
  },
}

// ─── REAL-WORLD ASPIRE SCENARIOS ──────────────────

/**
 * No Campaigns — the empty state shown on the Campaigns page before
 * the user creates their first campaign.
 */
export const NoCampaigns: Story = {
  name: "Real World — No Campaigns",
  args: {
    icon: <Megaphone className="size-6" />,
    title: "No campaigns yet",
    description:
      "Launch your first influencer campaign to start connecting with creators and tracking performance.",
    actionLabel: "Create Campaign",
  },
}

/**
 * No Creators Found — shown when a search or filter on the Contacts
 * page returns zero results.
 */
export const NoCreatorsFound: Story = {
  name: "Real World — No Creators Found",
  args: {
    icon: <Search className="size-6" />,
    title: "No results found",
    description: "Try adjusting your filters or search term.",
    onAction: undefined,
    onLearnMore: undefined,
  },
}

/**
 * Empty Inbox — shown when there are no messages in the Inbox.
 */
export const EmptyInbox: Story = {
  name: "Real World — Empty Inbox",
  args: {
    icon: <Inbox className="size-6" />,
    title: "No messages yet",
    description:
      "Start a conversation with a creator or wait for their reply.",
    actionLabel: "New Message",
    onLearnMore: undefined,
  },
}

/**
 * No Analytics Data — shown on the Analytics page when there is no
 * campaign data to display.
 */
export const NoAnalyticsData: Story = {
  name: "Real World — No Analytics Data",
  args: {
    icon: <BarChart2 className="size-6" />,
    title: "Analytics not available",
    description:
      "Once your campaign starts receiving traffic, performance metrics will appear here.",
    onAction: undefined,
    onLearnMore: undefined,
  },
}

/**
 * No Content Submitted — shown on a creator's Content tab when
 * no content has been submitted for review.
 */
export const NoContentSubmitted: Story = {
  name: "Real World — No Content Submitted",
  args: {
    icon: <FileText className="size-6" />,
    title: "No content submitted",
    description:
      "Once a creator submits content for review, it will appear here.",
    actionLabel: "Request Content",
    onLearnMore: undefined,
  },
}

/**
 * No Offers Created — shown on the Offers page before the user
 * creates their first offer.
 */
export const NoOffers: Story = {
  name: "Real World — No Offers",
  args: {
    icon: <Tag className="size-6" />,
    title: "No offers created",
    description:
      "Create your first offer to start giving creators shareable promo codes and links.",
    actionLabel: "Create Offer",
  },
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that clicking the primary CTA button fires the `onAction` callback.
 */
export const ActionClickTest: Story = {
  name: "Test: Action button fires onAction",
  args: {
    icon: <Users className="size-6" />,
    title: "No creators yet",
    description: "Add your first creator.",
    actionLabel: "Add Creator",
    onLearnMore: undefined,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Add Creator" })
    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    await expect(args.onAction).toHaveBeenCalledTimes(1)
  },
}

/**
 * Verifies that clicking the "Learn more" link fires the `onLearnMore` callback.
 */
export const LearnMoreClickTest: Story = {
  name: "Test: Learn more fires onLearnMore",
  args: {
    icon: <Tag className="size-6" />,
    title: "No offers created",
    description: "Create your first offer.",
    actionLabel: "Create Offer",
    learnMoreLabel: "How it works →",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // Click the learn more link
    const learnMore = canvas.getByText("How it works →")
    await expect(learnMore).toBeInTheDocument()
    await userEvent.click(learnMore)
    await expect(args.onLearnMore).toHaveBeenCalledTimes(1)
  },
}

/**
 * Verifies that when no `actionLabel` is provided, no button renders,
 * and when no `onLearnMore` is provided, no learn-more link renders.
 */
export const NoActionsRenderTest: Story = {
  name: "Test: No actions render when props omitted",
  args: {
    icon: <Search className="size-6" />,
    title: "No results found",
    description: "Try adjusting your search.",
    onAction: undefined,
    onLearnMore: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Title should be present
    await expect(canvas.getByText("No results found")).toBeInTheDocument()
    // Description should be present
    await expect(canvas.getByText("Try adjusting your search.")).toBeInTheDocument()
    // No button should be rendered
    const buttons = canvas.queryAllByRole("button")
    await expect(buttons.length).toBe(0)
  },
}
