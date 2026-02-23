import type { Meta, StoryObj } from "@storybook/react"
import { CampaignCard, type Campaign } from "@/components/campaigns/CampaignCard"

const baseCampaign: Campaign = {
  id: "1",
  name: "Summer Style Refresh 2026",
  coverImageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop",
  status: "active",
  type: "sponsored",
  startDate: "2026-01-15",
  endDate: "2026-03-30",
  creatorCount: 24,
  contentCount: 156,
  revenue: 45200,
  progress: 65,
  creators: [
    { name: "Sarah Chen", initials: "SC" },
    { name: "Mike Johnson", initials: "MJ" },
    { name: "Lisa Park", initials: "LP" },
    { name: "Alex Rivera", initials: "AR" },
  ],
}

/**
 * # CampaignCard
 *
 * Individual campaign card with cover image, status badge, type pill, stats row,
 * progress bar, and creator avatars. Used in the card grid view of the Campaigns page.
 *
 * ## Components Used
 * - `CampaignCard` — main card component
 * - `Avatar`, `AvatarFallback`, `AvatarImage` — creator avatar stack
 * - Lucide icons: `Users`, `Image`, `DollarSign`, `ArrowRight`
 *
 * ## Data Requirements
 * - `campaign` — `Campaign` object with:
 *   - `id: string` — unique identifier
 *   - `name: string` — campaign display name
 *   - `coverImageUrl?: string` — optional cover image (falls back to gradient)
 *   - `status: "active" | "draft" | "paused" | "completed"` — campaign status
 *   - `type: "sponsored" | "gifted" | "affiliate" | "ambassador"` — campaign type
 *   - `startDate: string` / `endDate: string` — ISO date strings
 *   - `creatorCount: number` / `contentCount: number` / `revenue: number` — stats
 *   - `progress: number` — 0-100 completion percentage
 *   - `creators?: CampaignCreator[]` — optional array of `{ name, avatarUrl?, initials }`
 * - `onView?: (id: string) => void` — callback when card is clicked
 *
 * ## Customization
 * - Cover image falls back to a type-specific gradient when `coverImageUrl` is omitted
 * - Status badge colors are mapped per status value
 * - Type pill colors are mapped per campaign type
 * - Width is determined by the parent container (card is flexible)
 *
 * ```tsx
 * import { CampaignCard } from "@/components/campaigns/CampaignCard"
 * ```
 */
const meta = {
  title: "6. Pages/Campaigns/CampaignCard",
  component: CampaignCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[380px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CampaignCard>

export default meta
type Story = StoryObj<typeof meta>

/** Active campaign with cover image. */
export const ActiveWithImage: Story = {
  args: { campaign: baseCampaign },
}

/** Draft campaign without a cover image — shows gradient placeholder. */
export const DraftNoImage: Story = {
  args: {
    campaign: {
      ...baseCampaign,
      id: "2",
      name: "Holiday Gift Guide",
      coverImageUrl: undefined,
      status: "draft",
      type: "sponsored",
      creatorCount: 0,
      contentCount: 0,
      revenue: 0,
      progress: 0,
      creators: [],
    },
  },
}

/** Completed campaign with full progress. */
export const Completed: Story = {
  args: {
    campaign: {
      ...baseCampaign,
      id: "3",
      name: "Fitness Challenge Q1",
      coverImageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      status: "completed",
      type: "affiliate",
      creatorCount: 120,
      contentCount: 890,
      revenue: 89300,
      progress: 100,
    },
  },
}

/** Paused campaign. */
export const Paused: Story = {
  args: {
    campaign: {
      ...baseCampaign,
      id: "4",
      name: "TikTok Launch Wave",
      coverImageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      status: "paused",
      type: "sponsored",
      creatorCount: 32,
      contentCount: 198,
      revenue: 23100,
      progress: 55,
    },
  },
}

/** Gifted campaign type. */
export const GiftedType: Story = {
  args: {
    campaign: {
      ...baseCampaign,
      id: "5",
      name: "Petfluencer Perks",
      coverImageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
      status: "active",
      type: "gifted",
      creatorCount: 48,
      contentCount: 312,
      revenue: 12800,
      progress: 40,
    },
  },
}

/** Ambassador campaign type. */
export const AmbassadorType: Story = {
  args: {
    campaign: {
      ...baseCampaign,
      id: "6",
      name: "VIP Brand Ambassadors",
      coverImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      status: "active",
      type: "ambassador",
      creatorCount: 15,
      contentCount: 78,
      revenue: 156000,
      progress: 25,
    },
  },
}
