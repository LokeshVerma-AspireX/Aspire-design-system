import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import { useState } from "react"
import { Pagination } from "@/components/shared/Pagination"

/**
 * # Pagination
 *
 * A table pagination bar showing entry counts on the left and page navigation
 * buttons on the right. Supports ellipsis for large page ranges and disables
 * Previous/Next at the boundaries.
 *
 * ## When to Use
 * - Below data tables that display paginated results
 * - When the user needs to see "Showing X-Y of Z entries" context
 * - Alongside server-side or client-side pagination logic
 * - In list pages like Contacts, Campaigns, Offers, and Analytics
 *
 * ## When NOT to Use
 * - For infinite scroll lists -- use an IntersectionObserver-based loader
 * - For simple "Load more" patterns -- use a single button instead
 * - When the total count is unknown -- omit the entry count or use a skeleton
 * - Inside small widgets or cards with fewer than 10 items
 *
 * ## Accessibility
 * - Wrapped in a `<nav>` element with `aria-label="Pagination"`
 * - Each page button has `aria-label="Page N"`
 * - The current page button has `aria-current="page"`
 * - Previous/Next buttons are `disabled` at the boundaries and
 *   removed from the tab order when disabled
 * - Focus ring is visible on keyboard navigation
 *
 * ## Import
 * ```tsx
 * import { Pagination } from '@/components/shared/Pagination'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   totalItems={487}
 *   pageSize={50}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
const meta: Meta<typeof Pagination> = {
  title: "4. Components/Tables/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Table pagination bar. Left side shows 'Showing X-Y of Z entries'. Right side shows Previous, numbered page buttons with ellipsis, and Next. Active page uses a filled background.",
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
  argTypes: {
    currentPage: {
      description:
        "The currently active page number (1-indexed). Controls which page button receives the active style and `aria-current=\"page\"`.",
      control: { type: "number", min: 1 },
      table: {
        type: { summary: "number" },
        category: "Data",
      },
    },
    totalPages: {
      description:
        "Total number of pages. When 7 or fewer, all page numbers are shown; otherwise ellipsis appears.",
      control: { type: "number", min: 1 },
      table: {
        type: { summary: "number" },
        category: "Data",
      },
    },
    totalItems: {
      description:
        'Total number of items across all pages. Displayed in the "Showing X-Y of Z entries" text.',
      control: { type: "number", min: 0 },
      table: {
        type: { summary: "number" },
        category: "Data",
      },
    },
    pageSize: {
      description:
        "Number of items per page. Used to compute the from/to range in the entry count.",
      control: { type: "number", min: 1 },
      table: {
        type: { summary: "number" },
        category: "Data",
      },
    },
    onPageChange: {
      description:
        "Callback fired when the user clicks a page button, Previous, or Next. Receives the new page number.",
      table: {
        type: { summary: "(page: number) => void" },
        category: "Events",
      },
    },
    className: {
      description: "Additional CSS classes merged via `cn()` utility.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Appearance",
      },
    },
  },
  args: {
    onPageChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

// ─── CORE STORIES ─────────────────────────────────

/**
 * First page state. The Previous button is disabled because there is no
 * earlier page to navigate to.
 *
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   totalItems={487}
 *   pageSize={50}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export const FirstPage: Story = {
  name: "First Page",
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: 487,
    pageSize: 50,
  },
  parameters: {
    docs: { description: { story: "First page -- Previous button is disabled." } },
  },
}

/**
 * Middle page state. Ellipsis appears on both sides of the current page
 * to indicate truncated ranges.
 *
 * ```tsx
 * <Pagination
 *   currentPage={5}
 *   totalPages={10}
 *   totalItems={487}
 *   pageSize={50}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export const MiddlePage: Story = {
  name: "Middle Page",
  args: {
    currentPage: 5,
    totalPages: 10,
    totalItems: 487,
    pageSize: 50,
  },
  parameters: {
    docs: { description: { story: "Middle page -- ellipsis on both sides of the current page." } },
  },
}

/**
 * Last page state. The Next button is disabled because there are no
 * further pages.
 *
 * ```tsx
 * <Pagination
 *   currentPage={10}
 *   totalPages={10}
 *   totalItems={487}
 *   pageSize={50}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export const LastPage: Story = {
  name: "Last Page",
  args: {
    currentPage: 10,
    totalPages: 10,
    totalItems: 487,
    pageSize: 50,
  },
  parameters: {
    docs: { description: { story: "Last page -- Next button is disabled." } },
  },
}

/**
 * Single page -- both Previous and Next are disabled. No page number
 * buttons are needed beyond page 1.
 *
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={1}
 *   totalItems={8}
 *   pageSize={50}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export const SinglePage: Story = {
  name: "Single Page",
  args: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 8,
    pageSize: 50,
  },
  parameters: {
    docs: { description: { story: "Only one page -- both navigation buttons are disabled." } },
  },
}

/**
 * Many pages (20+). Demonstrates the ellipsis logic when the total
 * page count is large and the current page is near the beginning.
 *
 * ```tsx
 * <Pagination
 *   currentPage={3}
 *   totalPages={20}
 *   totalItems={985}
 *   pageSize={50}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export const ManyPages: Story = {
  name: "Many Pages (with Ellipsis)",
  args: {
    currentPage: 3,
    totalPages: 20,
    totalItems: 985,
    pageSize: 50,
  },
  parameters: {
    docs: { description: { story: "20 pages, current page near the start -- trailing ellipsis shown." } },
  },
}

/**
 * Many pages with current page near the end. Shows leading ellipsis
 * and trailing page numbers.
 *
 * ```tsx
 * <Pagination
 *   currentPage={18}
 *   totalPages={20}
 *   totalItems={985}
 *   pageSize={50}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export const ManyPagesNearEnd: Story = {
  name: "Many Pages (Near End)",
  args: {
    currentPage: 18,
    totalPages: 20,
    totalItems: 985,
    pageSize: 50,
  },
  parameters: {
    docs: { description: { story: "20 pages, current page near the end -- leading ellipsis shown." } },
  },
}

/**
 * Few pages (5 or fewer). All page numbers are displayed without ellipsis.
 *
 * ```tsx
 * <Pagination
 *   currentPage={2}
 *   totalPages={5}
 *   totalItems={42}
 *   pageSize={10}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export const FewPages: Story = {
  name: "Few Pages (No Ellipsis)",
  args: {
    currentPage: 2,
    totalPages: 5,
    totalItems: 42,
    pageSize: 10,
  },
  parameters: {
    docs: { description: { story: "7 or fewer pages -- all page numbers shown without ellipsis." } },
  },
}

// ─── ASPIRE REAL-WORLD EXAMPLES ──────────────────

/**
 * Creators list pagination in a typical Contacts page context.
 * Page size 25, large dataset.
 *
 * ```tsx
 * <Pagination
 *   currentPage={3}
 *   totalPages={48}
 *   totalItems={1192}
 *   pageSize={25}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export const CreatorsListPagination: Story = {
  name: "Real World -- Creators List",
  args: {
    currentPage: 3,
    totalPages: 48,
    totalItems: 1192,
    pageSize: 25,
  },
  parameters: {
    docs: { description: { story: "Contacts page pagination -- 1,192 creators, 25 per page, on page 3." } },
  },
}

/**
 * Campaigns list pagination with a smaller dataset.
 *
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={4}
 *   totalItems={37}
 *   pageSize={10}
 *   onPageChange={handlePageChange}
 * />
 * ```
 */
export const CampaignsPagination: Story = {
  name: "Real World -- Campaigns List",
  args: {
    currentPage: 1,
    totalPages: 4,
    totalItems: 37,
    pageSize: 10,
  },
  parameters: {
    docs: { description: { story: "Campaigns page pagination -- 37 campaigns, 10 per page." } },
  },
}

// ─── INTERACTIVE CONTROLLED EXAMPLE ──────────────

/**
 * Fully interactive pagination. Click page buttons or Previous/Next
 * to navigate through the pages.
 */
export const Controlled: Story = {
  render: () => {
    const [page, setPage] = useState(1)
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
  parameters: {
    docs: { description: { story: "Interactive -- click page buttons to navigate. State is managed internally." } },
  },
}

// ─── ALL VARIANTS GALLERY ────────────────────────

/** Side-by-side comparison of first, middle, last, single, few, and many-page states. */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-col gap-4">
      {(
        [
          { label: "First Page", currentPage: 1, totalPages: 10, totalItems: 487, pageSize: 50 },
          { label: "Middle Page", currentPage: 5, totalPages: 10, totalItems: 487, pageSize: 50 },
          { label: "Last Page", currentPage: 10, totalPages: 10, totalItems: 487, pageSize: 50 },
          { label: "Single Page", currentPage: 1, totalPages: 1, totalItems: 8, pageSize: 50 },
          { label: "Few Pages", currentPage: 2, totalPages: 5, totalItems: 42, pageSize: 10 },
          { label: "Many Pages", currentPage: 12, totalPages: 20, totalItems: 985, pageSize: 50 },
        ] as const
      ).map(({ label, ...props }) => (
        <div key={label}>
          <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <div className="rounded-lg border border-border">
            <Pagination {...props} onPageChange={fn()} />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gallery showing all major pagination states stacked vertically.",
      },
    },
  },
}

// ─── INTERACTION TESTS ───────────────────────────

/**
 * Verifies clicking the Next button fires `onPageChange` with the
 * correct next page number.
 */
export const NextPageClickTest: Story = {
  name: "Test: Next Page Click",
  args: {
    currentPage: 3,
    totalPages: 10,
    totalItems: 487,
    pageSize: 50,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const nextButton = canvas.getByRole("button", { name: /next page/i })
    await userEvent.click(nextButton)
    await expect(args.onPageChange).toHaveBeenCalledWith(4)
  },
}

/**
 * Verifies the Previous button is disabled on the first page and does
 * not fire `onPageChange` when clicked.
 */
export const PreviousDisabledOnFirstPageTest: Story = {
  name: "Test: Previous Disabled on First Page",
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: 487,
    pageSize: 50,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prevButton = canvas.getByRole("button", { name: /previous page/i })
    await expect(prevButton).toBeDisabled()
  },
}

/**
 * Verifies clicking a specific page number fires `onPageChange` with
 * the correct page value.
 */
export const PageNumberClickTest: Story = {
  name: "Test: Page Number Click",
  args: {
    currentPage: 1,
    totalPages: 5,
    totalItems: 42,
    pageSize: 10,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const page3Button = canvas.getByRole("button", { name: "Page 3" })
    await userEvent.click(page3Button)
    await expect(args.onPageChange).toHaveBeenCalledWith(3)
  },
}
