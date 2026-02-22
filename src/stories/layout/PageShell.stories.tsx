import type { Meta, StoryObj } from "@storybook/react"
import { Plus } from "lucide-react"
import { PageShell } from "@/components/layout/PageShell"
import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Layout/PageShell",
  component: PageShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Root layout wrapper combining SideNav + main content area. Manages the sidebar collapse state internally. Use this as the outermost shell for every Aspire page.",
      },
    },
  },
  args: {
    activeHref: "/campaigns",
    user: {
      name: "Sarah Chen",
      initials: "SC",
    },
    badgeCounts: { messages: 5 },
    defaultCollapsed: true,
  },
} satisfies Meta<typeof PageShell>

export default meta
// `children` is a required ReactNode — using unparameterized StoryObj avoids
// Storybook requiring children in args since all stories supply their own render function.
type Story = StoryObj

function PlaceholderContent({ rows = 6 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3 p-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-12 rounded-lg bg-muted/40 animate-pulse"
          style={{ width: `${75 + (i % 3) * 8}%` }}
        />
      ))}
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <PageShell {...args}>
      <PageHeader
        title="Campaigns"
        description="Manage all your influencer campaigns."
        actions={
          <Button size="sm">
            <Plus />
            New Campaign
          </Button>
        }
      />
      <PlaceholderContent />
    </PageShell>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default shell with collapsed sidebar, PageHeader, and placeholder content rows.",
      },
    },
  },
}

export const ExpandedSidebar: Story = {
  render: (args) => (
    <PageShell {...args}>
      <PageHeader
        title="Contacts"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contacts" }]}
      />
      <PlaceholderContent rows={8} />
    </PageShell>
  ),
  args: {
    defaultCollapsed: false,
    activeHref: "/contacts",
  },
  parameters: {
    docs: {
      description: {
        story: "Shell with the sidebar pre-expanded.",
      },
    },
  },
}

export const ReportingPage: Story = {
  render: (args) => (
    <PageShell {...args}>
      <PageHeader
        title="Reporting"
        description="Track campaign performance and influencer ROI."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reporting" }]}
        actions={
          <Button variant="outline" size="sm">
            Export CSV
          </Button>
        }
      />
      <PlaceholderContent rows={10} />
    </PageShell>
  ),
  args: {
    activeHref: "/reporting",
  },
}

export const MessagesPage: Story = {
  render: (args) => (
    <PageShell {...args}>
      <PageHeader
        title="Messages"
        showAstra={false}
      />
      <PlaceholderContent rows={12} />
    </PageShell>
  ),
  args: {
    activeHref: "/messages",
    badgeCounts: { messages: 5 },
  },
}

export const NoUser: Story = {
  render: (args) => (
    <PageShell {...args}>
      <PageHeader title="Dashboard" />
      <PlaceholderContent />
    </PageShell>
  ),
  args: {
    user: undefined,
    activeHref: "/",
  },
  parameters: {
    docs: {
      description: { story: "Shell without a logged-in user — hides the avatar area." },
    },
  },
}
