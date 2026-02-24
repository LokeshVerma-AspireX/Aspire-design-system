import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  ActivityIcon,
  BellIcon,
  SearchIcon,
  Share2Icon,
  LanguagesIcon,
} from "lucide-react"

import { OffersPage, type Offer } from "@/components/offers/OffersPage"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import SearchDialog from "@/components/shadcn-studio/blocks/dialog-search"
import ShareDropdown from "@/components/shadcn-studio/blocks/dropdown-share"
import LanguageDropdown from "@/components/shadcn-studio/blocks/dropdown-language"
import ActivityDialog from "@/components/shadcn-studio/blocks/dialog-activity"
import NotificationDropdown from "@/components/shadcn-studio/blocks/dropdown-notification"
import ProfileDropdown from "@/components/shadcn-studio/blocks/dropdown-profile"

// ─── Sample data (shared with OffersPage.stories) ────────────────────────────

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

const shareData = [
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png",
    name: "John Garrett",
    email: "john@example.com",
    role: "admin",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png",
    name: "Laura Perez",
    email: "laura@example.com",
    role: "can-view",
  },
]

const morePeople = [
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png",
    name: "Daisy Mitchell",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png",
    name: "Stephen Adams",
  },
]

// ─── AppShellV2 — Application Shell 07 pattern with Aspire sidebar ──────────

function AppShellV2({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "15rem",
            "--sidebar-width-icon": "5rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar
          activeHref="/offers"
          user={{ name: "Lokesh Verma", initials: "LV" }}
          badgeCounts={{ messages: 5 }}
        />
        <SidebarInset>
          {/* ── Header bar (from Application Shell 07) ──────────── */}
          <header className="sticky top-0 z-50 flex items-center justify-between gap-6 border-b border-border bg-background px-4 py-2 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="[&_svg]:!size-5" />
              <Separator
                orientation="vertical"
                className="hidden !h-4 sm:block"
              />
              <SearchDialog
                trigger={
                  <>
                    <Button
                      variant="ghost"
                      className="hidden !bg-transparent px-1 py-0 font-normal sm:block"
                    >
                      <div className="text-muted-foreground hidden items-center gap-1.5 text-sm sm:flex">
                        <SearchIcon />
                        <span>Type to search...</span>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="sm:hidden"
                    >
                      <SearchIcon />
                      <span className="sr-only">Search</span>
                    </Button>
                  </>
                }
              />
            </div>
            <div className="flex items-center gap-1.5">
              <ShareDropdown
                data={shareData}
                morePeople={morePeople}
                trigger={
                  <Button variant="ghost" size="icon">
                    <Share2Icon />
                  </Button>
                }
              />
              <LanguageDropdown
                trigger={
                  <Button variant="ghost" size="icon">
                    <LanguagesIcon />
                  </Button>
                }
              />
              <ActivityDialog
                trigger={
                  <Button variant="ghost" size="icon">
                    <ActivityIcon />
                  </Button>
                }
              />
              <NotificationDropdown
                trigger={
                  <Button variant="ghost" size="icon" className="relative">
                    <BellIcon />
                    <span className="bg-destructive absolute top-2 right-2.5 size-2 rounded-full" />
                  </Button>
                }
              />
              <ProfileDropdown
                trigger={
                  <Button variant="ghost" size="icon" className="size-9.5">
                    <Avatar className="size-9.5 rounded-md">
                      <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                      <AvatarFallback>LV</AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
            </div>
          </header>

          {/* ── Main content ────────────────────────────────────── */}
          <main className="flex flex-1 flex-col">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: "6. Pages/Offers/OffersPageV2",
  component: OffersPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Offers page using Application Shell 07 pattern — Aspire sidebar + header bar with search, share, language, activity, notifications, and profile dropdowns. Compare with Offers/OffersPage for the simpler AppShell version.",
      },
    },
  },
  args: DEFAULT_PROPS,
} satisfies Meta<typeof OffersPage>

export default meta
type Story = StoryObj

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default view with Application Shell 07 header bar + Aspire sidebar. */
export const Default: Story = {
  render: () => (
    <AppShellV2>
      <OffersPage {...DEFAULT_PROPS} />
    </AppShellV2>
  ),
}

/** Page with several rows selected. */
export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Set<string>>(
      new Set(["1", "3", "6"])
    )
    return (
      <AppShellV2>
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
      </AppShellV2>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive selection — three rows pre-selected. Toggle individual rows or use the header checkbox.",
      },
    },
  },
}

/** Empty state when no offers exist. */
export const Empty: Story = {
  render: () => (
    <AppShellV2>
      <OffersPage {...DEFAULT_PROPS} offers={[]} totalItems={0} totalPages={1} />
    </AppShellV2>
  ),
}

/** Pagination on page 3. */
export const Page3: Story = {
  render: () => (
    <AppShellV2>
      <OffersPage {...DEFAULT_PROPS} currentPage={3} />
    </AppShellV2>
  ),
}
