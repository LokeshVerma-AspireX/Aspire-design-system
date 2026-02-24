import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ProfileTab } from "@/components/contact-detail/ProfileTab"

/**
 * # ProfileTab
 *
 * Two-column creator profile layout displaying content highlights, tag pills, bio, rates,
 * brand collaborations, social stats, engagement metrics, and audience demographics.
 *
 * ## Components Used
 * - `ContentHighlights` -- grid of recent posts / branded content / portfolio thumbnails
 * - `TagPillGroup` -- coloured pill groups for brand partnerships, opportunities, interests
 * - `ContentRatesTable` -- platform + content type rate table
 * - `BrandCollaborationCard` -- card showing brand name, metric, and date
 * - `SocialStatsCards` -- stat cards with trend indicators
 * - `AudienceDemographicsChart` -- age group bar chart and geo data rows
 *
 * ## Data Requirements
 * - `bio` (string) -- creator bio text
 * - `socialStats` (StatCard[]) -- label, value, trend direction, optional trend label
 * - `contentRates` (RateRow[]) -- platform, content type, rate range strings
 * - `ageGroups` (AgeGroup[]) -- label + percentage for audience age distribution
 * - `geoData` (GeoRow[]) -- name, percentage, type (city/country) for audience location
 * - `brandPartnerships`, `campaignOpportunities`, `interestsCategories` (Pill[]) -- tag arrays
 * - `brandCollaborations` (BrandCollaborationCardProps[]) -- brand name, metric, label, date
 * - `recentPosts` (ContentPost[]) -- array of post objects for the content grid
 *
 * ## Customization
 * - All pill groups are optional and independently configurable
 * - Social stats and reels stats can show any number of cards
 * - Age groups and geo data drive the demographics section dynamically
 * - Content rates table rows are fully configurable per platform
 * - Brand collaborations list can be any length
 *
 * ```tsx
 * import { ProfileTab } from "@/components/contact-detail/ProfileTab"
 * ```
 */
const meta = {
  title: "6. Pages/Contacts/ProfileTab",
  component: ProfileTab,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    bio: {
      control: "text",
      description: "Creator bio text displayed in the about section.",
    },
    location: {
      control: "text",
      description: "Creator location string (e.g. 'Los Angeles, CA').",
    },
    primaryGender: {
      control: "text",
      description: "Primary audience gender breakdown string.",
    },
    primaryEthnicity: {
      control: "text",
      description: "Primary audience ethnicity label.",
    },
    brandPartnerships: {
      control: "object",
      description: "Array of Pill objects for brand partnership tags.",
    },
    campaignOpportunities: {
      control: "object",
      description: "Array of Pill objects for campaign opportunity tags.",
    },
    interestsCategories: {
      control: "object",
      description: "Array of Pill objects for interest/category tags.",
    },
    socialStats: {
      control: "object",
      description: "Array of stat cards with label, value, trend, and optional trendLabel.",
    },
    contentRates: {
      control: "object",
      description: "Array of rate rows with platform, contentType, and rateRange.",
    },
    ageGroups: {
      control: "object",
      description: "Array of age groups with label and percentage for demographics chart.",
    },
    geoData: {
      control: "object",
      description: "Array of geo rows with name, percentage, and type (city/country).",
    },
  },
  args: {
    bio: "Lifestyle and fashion content creator based in Los Angeles. I create authentic content that resonates with my audience — from daily outfit inspiration to sustainable living tips.",
    location: "Los Angeles, CA",
    instagram: "@janedoe",
    tiktok: "@janedoe.creates",
    youtube: "@JaneDoeTV",
    brandPartnerships: [
      { label: "Lululemon",  color: "purple" as const },
      { label: "Glossier",   color: "rose" as const },
      { label: "Allbirds",   color: "lime" as const },
      { label: "Everlane",   color: "teal" as const },
    ],
    campaignOpportunities: [
      { label: "UGC",            color: "blue" as const },
      { label: "Ads",            color: "amber" as const },
      { label: "Product Reviews", color: "teal" as const },
      { label: "Gifting",        color: "rose" as const },
    ],
    interestsCategories: [
      { label: "Fashion",     color: "default" as const },
      { label: "Beauty",      color: "default" as const },
      { label: "Sustainable", color: "default" as const },
      { label: "Lifestyle",   color: "default" as const },
      { label: "Travel",      color: "default" as const },
    ],
    favoriteBrands: [
      { label: "Nike",     color: "default" as const },
      { label: "Glossier", color: "default" as const },
      { label: "Away",     color: "default" as const },
    ],
    contentRates: [
      { platform: "Instagram", contentType: "Static Post",   rateRange: "$500–$1,000" },
      { platform: "Instagram", contentType: "Story (x5)",    rateRange: "$250–$500" },
      { platform: "Instagram", contentType: "Reel",          rateRange: "$800–$1,500" },
      { platform: "TikTok",    contentType: "Video",         rateRange: "$300–$800" },
      { platform: "YouTube",   contentType: "Integration",   rateRange: "$2,000–$5,000" },
    ],
    brandCollaborations: [
      { brandName: "Lululemon",  metric: "142K",  metricLabel: "Engagements", date: "Nov 2025" },
      { brandName: "Glossier",   metric: "98K",   metricLabel: "Reach",       date: "Sep 2025" },
      { brandName: "Allbirds",   metric: "5.2%",  metricLabel: "Eng. Rate",   date: "Jul 2025" },
      { brandName: "Everlane",   metric: "210K",  metricLabel: "Impressions", date: "Jun 2025" },
    ],
    demographics: [
      { label: "Age Range",    value: "25–34 (primary)" },
      { label: "Gender",       value: "72% Female" },
      { label: "Ethnicity",    value: "Multicultural" },
      { label: "Location Type", value: "Urban" },
    ],
    socialStats: [
      { label: "Engagements",    value: "123K", trend: "up"   as const, trendLabel: "↗ +12% vs last month" },
      { label: "Reach",          value: "456K", trend: "up"   as const, trendLabel: "↗ +8% vs last month" },
      { label: "Impressions",    value: "2.8M", trend: "up"   as const, trendLabel: "Last 30 days" },
      { label: "Avg. Eng. Rate", value: "5.1%", trend: "neutral" as const },
    ],
    reelsStats: [
      { label: "Reels Engagement Rate", value: "5.1%", trend: "up" as const },
      { label: "Reels Hook Rate",       value: "7.8%", trend: "up" as const },
      { label: "Reels Views",           value: "890K", trend: "up" as const },
    ],
    ageGroups: [
      { label: "18–24", percentage: 28 },
      { label: "25–34", percentage: 42 },
      { label: "35–44", percentage: 18 },
      { label: "45–54", percentage: 8 },
      { label: "55+",   percentage: 4 },
    ],
    geoData: [
      { name: "Los Angeles",  percentage: 22, type: "city"    as const },
      { name: "New York",     percentage: 14, type: "city"    as const },
      { name: "Chicago",      percentage: 9,  type: "city"    as const },
      { name: "United States", percentage: 68, type: "country" as const },
      { name: "Canada",       percentage: 12, type: "country" as const },
      { name: "Australia",    percentage: 8,  type: "country" as const },
    ],
    primaryGender: "72% Female",
    primaryEthnicity: "Multicultural",
    recentPosts: Array.from({ length: 9 }, (_, i) => ({ id: String(i) })),
  },
} satisfies Meta<typeof ProfileTab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Minimal: Story = {
  args: {
    bio: "Content creator based in LA.",
    socialStats: [
      { label: "Engagements", value: "12K", trend: "up" as const },
      { label: "Reach",       value: "45K", trend: "up" as const },
    ],
    contentRates: [
      { platform: "Instagram", contentType: "Post", rateRange: "$300–$600" },
    ],
    ageGroups: [
      { label: "18–24", percentage: 45 },
      { label: "25–34", percentage: 35 },
      { label: "35+",   percentage: 20 },
    ],
  },
}
