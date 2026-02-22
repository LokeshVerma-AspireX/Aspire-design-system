import type { Meta, StoryObj } from "@storybook/react"
import { Plus, Download, Filter } from "lucide-react"
import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Page-level header with title, optional breadcrumbs, description, and action slots. AstraButton is shown by default on the right.",
      },
    },
  },
  args: {
    title: "Campaigns",
    showAstra: true,
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  parameters: {
    docs: {
      description: { story: "Title only — the minimal header." },
    },
  },
}

export const WithDescription: Story = {
  args: {
    description: "Manage and track all your influencer campaigns in one place.",
  },
}

export const WithBreadcrumbs: Story = {
  args: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Campaigns", href: "/campaigns" },
      { label: "Summer Drop 2025" },
    ],
    title: "Summer Drop 2025",
  },
}

export const WithActions: Story = {
  args: {
    actions: (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download />
          Export
        </Button>
        <Button size="sm">
          <Plus />
          New Campaign
        </Button>
      </div>
    ),
  },
}

export const FullConfig: Story = {
  args: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Campaigns", href: "/campaigns" },
    ],
    title: "Campaigns",
    description: "Manage and track all your influencer campaigns.",
    actions: (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Filter />
          Filter
        </Button>
        <Button size="sm">
          <Plus />
          New Campaign
        </Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "All options enabled — breadcrumbs, description, actions, and Astra.",
      },
    },
  },
}

export const NoAstra: Story = {
  args: {
    title: "Settings",
    description: "Manage your account and workspace preferences.",
    showAstra: false,
  },
  parameters: {
    docs: {
      description: { story: "Astra button hidden — suitable for utility pages like Settings." },
    },
  },
}
