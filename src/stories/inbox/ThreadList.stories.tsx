import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ThreadList } from "@/components/inbox/ThreadList"
import { THREADS } from "./sampleData"

const meta = {
  title: "Inbox/ThreadList",
  component: ThreadList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Left-pane thread list. Includes an 'Inbox' header with unread badge, a live search input, and a scrollable list of ThreadItems. Unread threads show bold text and a blue dot.",
      },
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
        story: "6 threads — 3 unread (bold + blue dot) at top, 3 read below. Unread badge shows count 3.",
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
        story: "Only 3 unread threads — all items bold, blue dots visible.",
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
        story: "Only read threads — no blue dots, no unread badge.",
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
        story: "Zero threads — shows the 'Your inbox is empty' empty state.",
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
