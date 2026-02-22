import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { InboxPage } from "@/components/inbox/InboxPage"
import { PageShell } from "@/components/layout/PageShell"
import { THREADS, SELECTED_THREAD } from "./sampleData"

const meta = {
  title: "Inbox/InboxPage",
  component: InboxPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full split-pane inbox page. Left pane: searchable thread list with unread indicators. Right pane: full email-style thread detail with header, messages, and reply composer.",
      },
    },
  },
} satisfies Meta<typeof InboxPage>

export default meta
type Story = StoryObj<typeof meta>

export const WithThreadSelected: Story = {
  args: {
    threads: THREADS,
    defaultSelectedThreadId: SELECTED_THREAD.id,
  },
  render: (args) => (
    <div className="h-screen">
      <InboxPage {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default view — 6 threads in the left pane, 'Collaboration Brief Terms' (4 messages, 2 assignees) open on the right.",
      },
    },
  },
}

export const NoThreadSelected: Story = {
  args: {
    threads: THREADS,
    defaultSelectedThreadId: undefined,
  },
  render: (args) => (
    <div className="h-screen">
      <InboxPage {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Thread list visible but no conversation selected — right pane shows the empty-state placeholder.",
      },
    },
  },
}

export const EmptyInbox: Story = {
  args: {
    threads: [],
  },
  render: (args) => (
    <div className="h-screen">
      <InboxPage {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Zero threads — left pane shows empty state, right pane shows the select-a-conversation prompt.",
      },
    },
  },
}

export const WithSidebar: Story = {
  args: {
    threads: THREADS,
    defaultSelectedThreadId: SELECTED_THREAD.id,
  },
  render: (args) => (
    <PageShell
      activeHref="/inbox"
      user={{ name: "Jason Roh", initials: "JR" }}
      badgeCounts={{ messages: 3 }}
      defaultCollapsed
    >
      <InboxPage {...args} />
    </PageShell>
  ),
  parameters: {
    docs: {
      description: {
        story: "Full Aspire app frame with collapsed sidebar — badge count on the Messages nav item matches unread threads.",
      },
    },
  },
}

export const UnreadOnly: Story = {
  args: {
    threads: THREADS.filter((t) => t.unread),
    defaultSelectedThreadId: THREADS.find((t) => t.unread)?.id,
  },
  render: (args) => (
    <div className="h-screen">
      <InboxPage {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Filtered to show only the 3 unread threads.",
      },
    },
  },
}
