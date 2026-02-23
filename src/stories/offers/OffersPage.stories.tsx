import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { OffersPage, type Offer } from "@/components/offers/OffersPage"
import { AppShell } from "@/components/layout/AppShell"

/**
 * # OffersPage
 *
 * Full-page offers listing with tab navigation, filter bar, data table with checkbox selection
 * and status dots, toolbar with primary CTA and search, and pagination footer.
 *
 * ## Components Used
 * - `AppShell` -- application layout shell with sidebar
 * - `PageHeader` -- page title with action buttons
 * - `Tabs` / `TabsList` / `TabsTrigger` -- Offers / Analytics tab navigation
 * - `FilterBar` -- saved views and quick-filter dropdowns
 * - `DataTable` -- sortable, selectable table with status dots and row actions
 * - `StatusDot` -- coloured status indicator (active, paused, draft, expired)
 * - `Pagination` -- page navigation footer
 * - `Input` -- search input in the toolbar
 * - `Button` -- "Create Offer" and "Send Payment" CTAs
 *
 * ## Data Requirements
 * - `offers` (Offer[]) -- array of offer objects with id, name, optional imageUrl,
 *   connectedTo (campaign name), landingPage URL, memberCount, and status
 * - `activeTab` (string) -- currently selected tab ("offers" or "analytics")
 * - `currentPage`, `totalPages`, `totalItems`, `pageSize` -- pagination state
 * - `selectedIds` (Set<string>, optional) -- set of selected offer IDs
 * - `sortKey` / `sortDirection` (optional) -- current table sort state
 *
 * ## Customization
 * - Tab set is configurable (Offers, Analytics, or custom)
 * - Table columns and row actions are defined internally but sort and selection are controllable
 * - Pagination page size and total items drive the footer
 * - "Create Offer" and "Send Payment" callbacks are configurable
 * - Search and column settings callbacks are provided
 *
 * ```tsx
 * import { OffersPage } from "@/components/offers/OffersPage"
 * ```
 */

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
  title: "6. Pages/Offers/OffersPage",
  component: OffersPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    offers: {
      control: "object",
      description: "Array of Offer objects populating the data table.",
    },
    activeTab: {
      control: "text",
      description: "Currently active tab (e.g. 'offers' or 'analytics').",
    },
    currentPage: {
      control: "number",
      description: "Current page number for pagination.",
    },
    totalPages: {
      control: "number",
      description: "Total number of pages.",
    },
    totalItems: {
      control: "number",
      description: "Total number of offer items across all pages.",
    },
    pageSize: {
      control: "number",
      description: "Number of items displayed per page.",
    },
    searchValue: {
      control: "text",
      description: "Current value of the search input.",
    },
    onCreateOffer: {
      action: "onCreateOffer",
      description: "Callback fired when the 'Create Offer' button is clicked.",
    },
    onSendPayment: {
      action: "onSendPayment",
      description: "Callback fired when the 'Send Payment' button is clicked.",
    },
  },
  args: DEFAULT_PROPS,
} satisfies Meta<typeof OffersPage>

export default meta
type Story = StoryObj

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default view inside the AppShell -- matches the Figma layout. */
export const Default: Story = {
  render: () => (
    <AppShell activeHref="/offers" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <OffersPage {...DEFAULT_PROPS} />
    </AppShell>
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
      <AppShell activeHref="/offers" user={{ name: "Lokesh Verma", initials: "LV" }}>
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
      </AppShell>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive selection -- three rows pre-selected. Toggle individual rows or use the header checkbox.",
      },
    },
  },
}

/** Empty state when no offers exist. */
export const Empty: Story = {
  render: () => (
    <AppShell activeHref="/offers" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <OffersPage {...DEFAULT_PROPS} offers={[]} totalItems={0} totalPages={1} />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty table with "No offers found." message.',
      },
    },
  },
}

/** Pagination on page 3 -- matching the Figma's selected page state. */
export const Page3: Story = {
  render: () => (
    <AppShell activeHref="/offers" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <OffersPage {...DEFAULT_PROPS} currentPage={3} />
    </AppShell>
  ),
}
