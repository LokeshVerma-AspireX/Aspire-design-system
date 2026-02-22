import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Pagination } from "@/components/shared/Pagination"

const meta = {
  title: "Contacts/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Table pagination with entry count summary and page navigation. Generates ellipsis for large page ranges.",
      },
    },
  },
  args: {
    totalItems: 2451,
    pageSize: 50,
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const FirstPage: Story = {
  args: { currentPage: 1, totalPages: 49 },
  parameters: {
    docs: { description: { story: "First page — Previous button is disabled." } },
  },
}

export const MiddlePage: Story = {
  args: { currentPage: 24, totalPages: 49 },
  parameters: {
    docs: { description: { story: "Middle of range — ellipsis on both sides of current page." } },
  },
}

export const LastPage: Story = {
  args: { currentPage: 49, totalPages: 49 },
  parameters: {
    docs: { description: { story: "Last page — Next button is disabled." } },
  },
}

export const NearStart: Story = {
  args: { currentPage: 3, totalPages: 49 },
  parameters: {
    docs: { description: { story: "Near start — shows first 5 pages, then ellipsis, then last." } },
  },
}

export const NearEnd: Story = {
  args: { currentPage: 47, totalPages: 49 },
  parameters: {
    docs: { description: { story: "Near end — shows first page, ellipsis, then last 5 pages." } },
  },
}

export const SmallDataset: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
    totalItems: 138,
    pageSize: 50,
  },
  parameters: {
    docs: { description: { story: "Few pages — shows all pages without ellipsis." } },
  },
}

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 12,
    pageSize: 50,
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = React.useState(1)
    return (
      <Pagination
        {...args}
        currentPage={page}
        totalPages={Math.ceil(args.totalItems / args.pageSize)}
        onPageChange={setPage}
      />
    )
  },
  args: { currentPage: 1, totalPages: 49 },
  parameters: {
    docs: { description: { story: "Click pages to navigate interactively." } },
  },
}
