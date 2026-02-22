import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Pagination } from "@/components/shared/Pagination"

const meta = {
  title: "Shared/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Table pagination bar. Left: 'Showing X–Y of Z entries'. Right: Previous, numbered page buttons with ellipsis, Next. Active page uses filled black button.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="rounded-lg border border-border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Pagination>

export default meta
// all Pagination props are required; render-only stories use StoryObj without generic
type Story = StoryObj

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: 487,
    pageSize: 50,
    onPageChange: () => {},
  },
  parameters: { docs: { description: { story: "First page — Previous button disabled." } } },
}

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    totalItems: 487,
    pageSize: 50,
    onPageChange: () => {},
  },
  parameters: { docs: { description: { story: "Middle page — ellipsis on both sides of current page." } } },
}

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    totalItems: 487,
    pageSize: 50,
    onPageChange: () => {},
  },
  parameters: { docs: { description: { story: "Last page — Next button disabled." } } },
}

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    totalItems: 42,
    pageSize: 10,
    onPageChange: () => {},
  },
  parameters: { docs: { description: { story: "7 or fewer pages — no ellipsis, all page numbers shown." } } },
}

export const Controlled: Story = {
  render: () => {
    const [page, setPage] = React.useState(1)
    return (
      <div className="rounded-lg border border-border">
        <Pagination
          currentPage={page}
          totalPages={12}
          totalItems={580}
          pageSize={50}
          onPageChange={setPage}
        />
      </div>
    )
  },
  parameters: { docs: { description: { story: "Interactive — click page buttons to navigate." } } },
}
