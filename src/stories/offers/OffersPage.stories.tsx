import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { OffersPage, type Offer } from "@/components/offers/OffersPage"
import { PageShell } from "@/components/layout/PageShell"

// ─── Sample data ─────────────────────────────────────────────────────────────

const SAMPLE_OFFERS: Offer[] = [
  {
    id: "1",
    name: "Summer Sale 25% Off",
    connectedTo: "Summer Campaign",
    landingPage: "https://go.brand.com/summer25",
    memberCount: 142,
    status: "active",
  },
  {
    id: "2",
    name: "Welcome Discount",
    connectedTo: "Onboarding Flow",
    landingPage: "https://go.brand.com/welcome",
    memberCount: 89,
    status: "active",
  },
  {
    id: "3",
    name: "Creator Exclusive 30%",
    connectedTo: "Creator Program",
    landingPage: "https://go.brand.com/creator30",
    memberCount: 56,
    status: "active",
  },
  {
    id: "4",
    name: "Holiday Bundle Deal",
    landingPage: "https://go.brand.com/holiday",
    memberCount: 210,
    status: "paused",
  },
  {
    id: "5",
    name: "Spring Collection Preview",
    connectedTo: "Spring Launch",
    landingPage: "https://go.brand.com/spring",
    memberCount: 34,
    status: "draft",
  },
  {
    id: "6",
    name: "Free Shipping Weekend",
    connectedTo: "Weekend Promo",
    landingPage: "https://go.brand.com/freeship",
    memberCount: 178,
    status: "active",
  },
  {
    id: "7",
    name: "VIP Early Access",
    landingPage: "https://go.brand.com/vip",
    memberCount: 23,
    status: "draft",
  },
  {
    id: "8",
    name: "Back to School 20%",
    connectedTo: "BTS Campaign",
    landingPage: "https://go.brand.com/bts20",
    memberCount: 95,
    status: "expired",
  },
  {
    id: "9",
    name: "Loyalty Reward 15%",
    connectedTo: "Loyalty Program",
    landingPage: "https://go.brand.com/loyalty15",
    memberCount: 312,
    status: "active",
  },
]

const DEFAULT_PROPS = {
  offers: SAMPLE_OFFERS,
  activeTab: "offers" as const,
  currentPage: 1,
  totalPages: 3,
  totalItems: 27,
  pageSize: 10,
}

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: "Offers/OffersPage",
  component: OffersPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full-page offers listing with tabs, filters, data table (checkbox selection, soft badges, status dots), toolbar with primary CTA + search, and pagination. Matches the Figma Offers screen.",
      },
    },
  },
  args: DEFAULT_PROPS,
} satisfies Meta<typeof OffersPage>

export default meta
type Story = StoryObj

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default view inside the PageShell — matches the Figma layout. */
export const Default: Story = {
  render: () => (
    <PageShell activeHref="/offers" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <OffersPage {...DEFAULT_PROPS} />
    </PageShell>
  ),
}

/** Standalone page without the sidebar shell. */
export const Standalone: Story = {
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
}

/** Page with several rows selected. */
export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Set<string>>(
      new Set(["1", "3", "6"])
    )
    return (
      <PageShell activeHref="/offers" user={{ name: "Lokesh Verma", initials: "LV" }}>
        <OffersPage
          {...DEFAULT_PROPS}
          selectedIds={selected}
          onSelectId={(id, checked) => {
            setSelected((prev) => {
              const next = new Set(prev)
              if (checked) next.add(id)
              else next.delete(id)
              return next
            })
          }}
          onSelectAll={(checked) => {
            setSelected(
              checked ? new Set(SAMPLE_OFFERS.map((o) => o.id)) : new Set()
            )
          }}
        />
      </PageShell>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive selection — three rows pre-selected. Toggle individual rows or use the header checkbox.",
      },
    },
  },
}

/** Empty state when no offers exist. */
export const Empty: Story = {
  render: () => (
    <PageShell activeHref="/offers" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <OffersPage {...DEFAULT_PROPS} offers={[]} totalItems={0} totalPages={1} />
    </PageShell>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty table with "No offers found." message.',
      },
    },
  },
}

/** Pagination on page 3 — matching the Figma's selected page state. */
export const Page3: Story = {
  render: () => (
    <PageShell activeHref="/offers" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <OffersPage {...DEFAULT_PROPS} currentPage={3} />
    </PageShell>
  ),
}
