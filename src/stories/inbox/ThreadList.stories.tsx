import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ThreadList } from "@/components/inbox/ThreadList"
import { THREADS } from "./sampleData"

/**
 * # ThreadList
 *
 * Left-pane thread list for the inbox. Includes an "Inbox" header with unread count badge,
 * a live search input, and a scrollable list of ThreadItems. Unread threads show bold text
 * and a blue dot indicator.
 *
 * ## Components Used
 * - `ThreadItem` -- individual thread row with avatar, sender name, subject, snippet, timestamp, unread dot
 * - `Input` -- search input with magnifying glass icon
 * - `ScrollArea` -- scrollable container for the thread list
 * - `Avatar` / `AvatarFallback` -- sender avatar with initials fallback
 *
 * ## Data Requirements
 * - `threads` (Thread[]) -- array of thread objects with id, subject, unread flag, lastMessageAt,
 *   snippet, senderName, senderInitials, assignees, and messages
 * - `selectedThreadId` (string, optional) -- id of the currently selected thread for highlight
 * - `onSelectThread` (function, optional) -- callback when a thread row is clicked
 *
 * ## Customization
 * - Search filtering is handled internally on subject, sender name, and snippet
 * - Unread badge count is computed automatically from thread data
 * - Selected thread gets a muted background highlight
 * - Empty state message is shown when no threads exist
 * - Width is typically constrained by parent (e.g. w-80 in InboxPage)
 *
 * ```tsx
 * import { ThreadList } from "@/components/inbox/ThreadList"
 * ```
 */
const meta = {
  title: "6. Pages/Inbox/ThreadList",
  component: ThreadList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    threads: {
      control: "object",
      description: "Array of Thread objects to render in the list.",
    },
    selectedThreadId: {
      control: "text",
      description: "ID of the currently selected thread (highlighted row).",
    },
    onSelectThread: {
      action: "onSelectThread",
      description: "Callback fired with the thread ID when a row is clicked.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the root container.",
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="h-[600px] w-80 border border-border rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ThreadList>

export default meta
type Story = StoryObj<typeof meta>

export const AllThreads: Story = {
  args: {
    threads: THREADS,
  },
  parameters: {
    docs: {
      description: {
        story: "6 threads -- 3 unread (bold + blue dot) at top, 3 read below. Unread badge shows count 3.",
      },
    },
  },
}

export const WithSelection: Story = {
  args: {
    threads: THREADS,
    selectedThreadId: THREADS[0].id,
  },
  parameters: {
    docs: {
      description: {
        story: "First thread is active/selected (muted background highlight).",
      },
    },
  },
}

export const UnreadThreadsOnly: Story = {
  args: {
    threads: THREADS.filter((t) => t.unread),
  },
  parameters: {
    docs: {
      description: {
        story: "Only 3 unread threads -- all items bold, blue dots visible.",
      },
    },
  },
}

export const ReadThreadsOnly: Story = {
  args: {
    threads: THREADS.filter((t) => !t.unread),
  },
  parameters: {
    docs: {
      description: {
        story: "Only read threads -- no blue dots, no unread badge.",
      },
    },
  },
}

export const Empty: Story = {
  args: {
    threads: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Zero threads -- shows the 'Your inbox is empty' empty state.",
      },
    },
  },
}

export const SingleThread: Story = {
  args: {
    threads: [THREADS[0]],
    selectedThreadId: THREADS[0].id,
  },
  parameters: {
    docs: {
      description: {
        story: "Single unread thread, selected.",
      },
    },
  },
}
