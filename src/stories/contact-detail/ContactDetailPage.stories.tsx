import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ContactDetailHeader } from "@/components/contact-detail/ContactDetailHeader"
import { ContactDetailTabs } from "@/components/contact-detail/ContactDetailTabs"
import { OverviewTab } from "@/components/contact-detail/OverviewTab"
import { ProfileTab } from "@/components/contact-detail/ProfileTab"
import { ContentTab } from "@/components/contact-detail/ContentTab"
import { InboxTab } from "@/components/contact-detail/InboxTab"
import { PageShell } from "@/components/layout/PageShell"
import type { DetailTab } from "@/components/contact-detail/ContactDetailTabs"

// ─── Jane Doe sample data ─────────────────────────────────────────────────────

const JANE = {
  name: "Jane Doe",
  initials: "JD",
  email: "jane@janedoe.com",
  phone: "+1 (555) 234-5678",
  profileType: "Personal Profile",
  profileTypeOptions: [
    { label: "Personal Profile",   value: "personal" },
    { label: "Business Profile",   value: "business" },
    { label: "Talent Manager",     value: "talent" },
  ],
  actionItems: [
    { label: "Add to Campaign",    onClick: () => {} },
    { label: "Send Message",       onClick: () => {} },
    { label: "Export Profile",     onClick: () => {} },
    { label: "Deactivate Creator", onClick: () => {}, variant: "destructive" as const },
  ],
}

const OVERVIEW_DATA = {
  talentManagers: [
    { name: "Lokesh Verma",  email: "collin@agencyco.com", phone: "+1 (555) 876-5432" },
    { name: "Mia Tanaka",   email: "mia@agencyco.com" },
  ],
  socialAccounts: [
    { platform: "instagram" as const, handle: "@janedoe",        followers: 245000 },
    { platform: "tiktok"    as const, handle: "@janedoe.creates", followers: 189000 },
    { platform: "youtube"   as const, handle: "@JaneDoeTV",       followers:  52000 },
  ],
  shippingAddress: "1234 Sunset Blvd\nLos Angeles, CA 90028\nUnited States",
  campaigns: [
    { label: "Petfluencer Perks",       color: "teal"   as const },
    { label: "VIP Marketing List 2026", color: "purple" as const },
    { label: "Coffee Campaign Brief",   color: "amber"  as const },
    { label: "Summer Skincare Drop",    color: "rose"   as const },
  ],
  groups: [
    { label: "Macro Influencers", color: "lime"  as const },
    { label: "LA Creators",       color: "sky"   as const },
    { label: "Fitness & Health",  color: "orange" as const },
  ],
  tags: [
    { label: "ugc",          color: "default" as const },
    { label: "fashion",      color: "default" as const },
    { label: "lifestyle",    color: "default" as const },
    { label: "paid-partner", color: "default" as const },
  ],
  activities: [
    {
      type: "content_submitted" as const,
      title: "Jane submitted 3 Instagram Reels",
      description: "For Coffee Campaign Brief",
      thumbnails: ["", "", ""],
      timestamp: "9 hrs ago",
      actionLabel: "Review",
      onAction: () => {},
    },
    {
      type: "brief_signed" as const,
      title: "Jane signed the collaboration brief",
      description: "Coffee Campaign Brief · Signed digitally",
      timestamp: "1 day ago",
      actionLabel: "View",
      onAction: () => {},
    },
    {
      type: "comment_added" as const,
      title: "Jason Roh added a comment",
      comment: "The first draft looks great! Could you adjust the lighting on the second clip and resubmit?",
      timestamp: "2 days ago",
    },
    {
      type: "brief_edit_requested" as const,
      title: "Brand requested brief edits",
      description: "Petfluencer Perks — 2 change requests",
      timestamp: "3 days ago",
      actionLabel: "View Changes",
      onAction: () => {},
    },
    {
      type: "new_applicant" as const,
      title: "Jane applied to Petfluencer Perks",
      description: "Application status: Under Review",
      timestamp: "5 days ago",
    },
  ],
}

// ─── Full page component ──────────────────────────────────────────────────────

function ContactDetailPage() {
  const [activeTab, setActiveTab] = React.useState<DetailTab>("overview")

  const contentMap: Partial<Record<DetailTab, React.ReactNode>> = {
    overview: (
      <OverviewTab
        name={JANE.name}
        email={JANE.email}
        phone={JANE.phone}
        talentManagers={OVERVIEW_DATA.talentManagers}
        socialAccounts={OVERVIEW_DATA.socialAccounts}
        shippingAddress={OVERVIEW_DATA.shippingAddress}
        campaigns={OVERVIEW_DATA.campaigns}
        groups={OVERVIEW_DATA.groups}
        tags={OVERVIEW_DATA.tags}
        activities={OVERVIEW_DATA.activities}
        campaignFilterOptions={[
          { label: "Petfluencer Perks",    value: "petfluencer" },
          { label: "Coffee Campaign Brief", value: "coffee" },
        ]}
        activityTypeOptions={[
          { label: "Content Submitted",    value: "content_submitted" },
          { label: "Brief Signed",         value: "brief_signed" },
          { label: "Comment Added",        value: "comment_added" },
        ]}
        onNewActivity={() => alert("New Activity")}
      />
    ),
    profile: (
      <ProfileTab
        bio="Lifestyle and fashion content creator based in LA. I create authentic content that resonates with my audience."
        location="Los Angeles, CA"
        brandPartnerships={[
          { label: "Lululemon", color: "purple" as const },
          { label: "Glossier",  color: "rose"   as const },
          { label: "Allbirds",  color: "lime"   as const },
        ]}
        campaignOpportunities={[
          { label: "UGC",             color: "blue"  as const },
          { label: "Ads",             color: "amber" as const },
          { label: "Product Reviews", color: "teal"  as const },
        ]}
        interestsCategories={[
          { label: "Fashion",   color: "default" as const },
          { label: "Beauty",    color: "default" as const },
          { label: "Lifestyle", color: "default" as const },
        ]}
        contentRates={[
          { platform: "Instagram", contentType: "Static Post", rateRange: "$500–$1,000" },
          { platform: "Instagram", contentType: "Reel",        rateRange: "$800–$1,500" },
          { platform: "TikTok",   contentType: "Video",        rateRange: "$300–$800" },
        ]}
        socialStats={[
          { label: "Engagements",    value: "123K", trend: "up"      as const, trendLabel: "↗ +12%" },
          { label: "Reach",          value: "456K", trend: "up"      as const, trendLabel: "↗ +8%" },
          { label: "Impressions",    value: "2.8M", trend: "up"      as const },
          { label: "Avg. Eng. Rate", value: "5.1%", trend: "neutral" as const },
        ]}
        reelsStats={[
          { label: "Reels Engagement Rate", value: "5.1%", trend: "up" as const },
          { label: "Reels Hook Rate",       value: "7.8%", trend: "up" as const },
        ]}
        ageGroups={[
          { label: "18–24", percentage: 28 },
          { label: "25–34", percentage: 42 },
          { label: "35–44", percentage: 18 },
          { label: "45+",   percentage: 12 },
        ]}
        geoData={[
          { name: "Los Angeles",   percentage: 22, type: "city"    as const },
          { name: "New York",      percentage: 14, type: "city"    as const },
          { name: "United States", percentage: 68, type: "country" as const },
          { name: "Canada",        percentage: 12, type: "country" as const },
        ]}
        primaryGender="72% Female"
        primaryEthnicity="Multicultural"
        recentPosts={Array.from({ length: 9 }, (_, i) => ({ id: String(i) }))}
        brandCollaborations={[
          { brandName: "Lululemon", metric: "142K", metricLabel: "Engagements", date: "Nov 2025" },
          { brandName: "Glossier",  metric: "98K",  metricLabel: "Reach",       date: "Sep 2025" },
        ]}
      />
    ),
    content: (
      <ContentTab
        briefGroups={[
          {
            briefName: "Coffee Campaign Brief",
            signedDate: "Feb 2, 2026",
            campaignName: "Petfluencer Perks",
            content: Array.from({ length: 4 }, (_, i) => ({
              creatorName: "Jane Doe",
              creatorInitials: "JD",
              date: `Feb ${10 + i}, 2026`,
              status: (i === 0 ? "approved" : i === 1 ? "in_review" : "pending") as "approved" | "pending" | "in_review",
              hasAdRights: i === 0,
              tagCount: i + 1,
            })),
            onViewBrief: () => {},
            onViewCampaign: () => {},
          },
          {
            briefName: "Summer Skincare Brief",
            signedDate: "Jan 15, 2026",
            content: Array.from({ length: 3 }, (_, i) => ({
              creatorName: "Jane Doe",
              creatorInitials: "JD",
              date: `Jan ${20 + i}, 2026`,
              status: "approved" as const,
              tagCount: i + 1,
            })),
            onViewBrief: () => {},
            onViewCampaign: () => {},
          },
        ]}
      />
    ),
    inbox: (
      <InboxTab
        threads={[
          {
            id: "t1",
            author: "Jane Doe",
            initials: "JD",
            subject: "Collaboration Brief Terms",
            preview: "Hey, I had a few questions about the deliverables...",
            timestamp: "1 min ago",
            unreadCount: 2,
          },
          {
            id: "t2",
            author: "Jason Roh",
            initials: "JR",
            subject: "Content feedback — Coffee Brief",
            preview: "Loved the first reel! A few tweaks needed on...",
            timestamp: "Yesterday",
            unreadCount: 1,
          },
        ]}
        activeThreadId="t1"
        subject="Collaboration Brief Terms"
        messageCount={4}
        assignedTo={["Jason Roh", "Lokesh Verma"]}
        messages={[
          {
            id: "m1",
            author: "Jane Doe",
            initials: "JD",
            timestamp: "Feb 20, 10:14 AM",
            body: "Hi! I had a few questions about the collaboration brief. Could you clarify the usage rights section?",
          },
          {
            id: "m2",
            author: "Jason Roh",
            initials: "JR",
            timestamp: "Feb 20, 11:02 AM",
            body: "Hi Jane! The usage rights in section 4 are limited to organic social posts for 12 months. You retain full ownership of the creative assets.",
            isOwn: true,
          },
        ]}
      />
    ),
    analytics: (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground text-sm">
        Analytics tab — coming soon
      </div>
    ),
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ContactDetailHeader
        name={JANE.name}
        initials={JANE.initials}
        profileType={JANE.profileType}
        profileTypeOptions={JANE.profileTypeOptions}
        actionItems={JANE.actionItems}
        onBack={() => {}}
      />
      <ContactDetailTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        contentMap={contentMap}
      />
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Contact Detail/ContactDetailPage",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full creator profile page — back link, avatar header, profile type dropdown, Actions button, 5 underline tabs (Overview / Profile / Content / Inbox / Analytics).",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const WithSidebar: Story = {
  render: () => (
    <PageShell
      activeHref="/contacts"
      user={{ name: "Jason Roh", initials: "JR" }}
      badgeCounts={{ messages: 2 }}
      defaultCollapsed={true}
    >
      <ContactDetailPage />
    </PageShell>
  ),
  parameters: {
    docs: {
      description: {
        story: "Full Aspire app frame. Switch between tabs to see Overview, Profile, Content, and Inbox.",
      },
    },
  },
}

export const PageOnly: Story = {
  render: () => (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <ContactDetailPage />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Contact detail page without sidebar." } },
  },
}

export const OverviewTabOnly: Story = {
  render: () => (
    <div className="border rounded-xl overflow-hidden">
      <ContactDetailHeader
        name="Jane Doe"
        initials="JD"
        profileType="Personal Profile"
        profileTypeOptions={JANE.profileTypeOptions}
        actionItems={JANE.actionItems}
        onBack={() => {}}
      />
      <ContactDetailTabs activeTab="overview" contentMap={{
        overview: (
          <OverviewTab
            name="Jane Doe"
            email="jane@janedoe.com"
            phone="+1 (555) 234-5678"
            talentManagers={OVERVIEW_DATA.talentManagers}
            socialAccounts={OVERVIEW_DATA.socialAccounts}
            campaigns={OVERVIEW_DATA.campaigns}
            groups={OVERVIEW_DATA.groups}
            tags={OVERVIEW_DATA.tags}
            activities={OVERVIEW_DATA.activities}
          />
        ),
      }} />
    </div>
  ),
}
