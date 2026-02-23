import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ActivityFeed } from "@/components/contact-detail/ActivityFeed"
import type { ActivityItemData } from "@/components/contact-detail/ActivityFeed"

/**
 * # ActivityFeed
 *
 * Dot-timeline of creator activity events. Supports content submission thumbnails,
 * quoted comments, action links, and filter dropdowns for campaign and activity type.
 *
 * ## Components Used
 * - `ActivityItem` -- individual timeline row with dot indicator, title, description, optional thumbnails/comment
 * - `Button` -- "New Activity" CTA
 * - `Select` -- campaign filter and activity type filter dropdowns
 * - `DropdownMenu` -- additional actions menu
 *
 * ## Data Requirements
 * - `activities` (ActivityItemData[]) -- array of activity events, each with:
 *   - `type` -- one of "content_submitted", "brief_signed", "comment_added",
 *     "brief_edit_requested", "new_applicant", "payment_sent"
 *   - `title` (string) -- primary display text
 *   - `description` (string, optional) -- secondary text
 *   - `comment` (string, optional) -- quoted comment body for comment_added type
 *   - `thumbnails` (string[], optional) -- thumbnail URLs for content_submitted type
 *   - `timestamp` (string) -- relative time string
 *   - `actionLabel` / `onAction` (optional) -- link label and callback
 * - `campaignOptions` (Array<{label, value}>) -- options for campaign filter dropdown
 * - `activityTypeOptions` (Array<{label, value}>) -- options for activity type filter dropdown
 *
 * ## Customization
 * - Activity types are extensible; each type renders a different dot colour and layout
 * - Campaign and activity type filters are optional
 * - "New Activity" button is shown when `onNewActivity` callback is provided
 * - Individual activity items can have action links or not
 *
 * ```tsx
 * import { ActivityFeed } from "@/components/contact-detail/ActivityFeed"
 * ```
 */

const CAMPAIGN_OPTIONS = [
  { label: "Petfluencer Perks",    value: "petfluencer" },
  { label: "Coffee Campaign Brief", value: "coffee" },
  { label: "Summer Skincare Drop", value: "skincare" },
]

const ACTIVITY_TYPE_OPTIONS = [
  { label: "Content Submitted",     value: "content_submitted" },
  { label: "Brief Signed",          value: "brief_signed" },
  { label: "Comment Added",         value: "comment_added" },
  { label: "Brief Edit Requested",  value: "brief_edit_requested" },
  { label: "New Applicant",         value: "new_applicant" },
]

const ALL_ACTIVITIES: ActivityItemData[] = [
  {
    type: "content_submitted",
    title: "Jane submitted 3 Instagram Reels",
    description: "For Coffee Campaign Brief",
    thumbnails: ["", "", ""],
    timestamp: "9 hrs ago",
    actionLabel: "Review",
    onAction: () => {},
  },
  {
    type: "brief_signed",
    title: "Jane signed the collaboration brief",
    description: "Coffee Campaign Brief · Signed digitally",
    timestamp: "1 day ago",
    actionLabel: "View",
    onAction: () => {},
  },
  {
    type: "comment_added",
    title: "Jason Roh added a comment",
    comment: "The first draft looks great! Could you adjust the lighting on the second clip and resubmit?",
    timestamp: "2 days ago",
  },
  {
    type: "brief_edit_requested",
    title: "Brand requested brief edits",
    description: "Petfluencer Perks — 2 change requests",
    timestamp: "3 days ago",
    actionLabel: "View Changes",
    onAction: () => {},
  },
  {
    type: "new_applicant",
    title: "Jane applied to Petfluencer Perks",
    description: "Application status: Under Review",
    timestamp: "5 days ago",
  },
  {
    type: "payment_sent",
    title: "Payment of $1,200 sent",
    description: "Coffee Campaign Brief — partial milestone",
    timestamp: "1 week ago",
  },
]

const meta = {
  title: "6. Pages/Contacts/ActivityFeed",
  component: ActivityFeed,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    activities: {
      control: "object",
      description: "Array of activity event objects rendered in the timeline.",
    },
    campaignOptions: {
      control: "object",
      description: "Options for the campaign filter dropdown.",
    },
    activityTypeOptions: {
      control: "object",
      description: "Options for the activity type filter dropdown.",
    },
    campaignFilter: {
      control: "text",
      description: "Currently selected campaign filter value.",
    },
    activityTypeFilter: {
      control: "text",
      description: "Currently selected activity type filter value.",
    },
    onNewActivity: {
      action: "onNewActivity",
      description: "Callback fired when the 'New Activity' button is clicked.",
    },
  },
  args: {
    campaignOptions: CAMPAIGN_OPTIONS,
    activityTypeOptions: ACTIVITY_TYPE_OPTIONS,
    onNewActivity: () => alert("New Activity"),
  },
} satisfies Meta<typeof ActivityFeed>

export default meta
type Story = StoryObj<typeof meta>

export const AllActivityTypes: Story = {
  args: { activities: ALL_ACTIVITIES },
  parameters: {
    docs: {
      description: { story: "Every activity type in the timeline: content submitted, brief signed, comment, edit request, applicant, payment." },
    },
  },
}

export const ContentSubmittedOnly: Story = {
  args: {
    activities: ALL_ACTIVITIES.filter((a) => a.type === "content_submitted"),
  },
}

export const WithComment: Story = {
  args: {
    activities: ALL_ACTIVITIES.filter(
      (a) => a.type === "comment_added" || a.type === "brief_signed"
    ),
  },
}

export const Empty: Story = {
  args: { activities: [] },
  parameters: { docs: { description: { story: "Empty state." } } },
}
