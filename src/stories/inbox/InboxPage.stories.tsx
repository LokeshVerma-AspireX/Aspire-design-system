import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { InboxPage } from "@/components/inbox/InboxPage"
import { AppShell } from "@/components/layout/AppShell"
import { THREADS, SELECTED_THREAD } from "./sampleData"

/**
 * # InboxPage
 *
 * Full split-pane inbox page. Left pane contains a searchable thread list with unread indicators.
 * Right pane shows the full email-style thread detail with header, messages, and reply composer.
 *
 * ## Components Used
 * - `AppShell` -- application layout shell with sidebar
 * - `ThreadList` -- left-pane searchable thread list with "Inbox" header, unread badge, and ThreadItems
 * - `ThreadDetail` -- right-pane thread view with ThreadHeader, scrollable MessageItem list, ReplyComposer
 * - `ThreadItem` -- individual thread row with avatar, sender name, subject, snippet, timestamp, unread dot
 * - `ThreadHeader` -- subject line, message count, assignee chips
 * - `MessageItem` -- single message row with avatar, sender, email, timestamp, and body paragraphs
 * - `ReplyComposer` -- text input and send button pinned at the bottom
 *
 * ## Data Requirements
 * - `threads` (Thread[]) -- array of thread objects with id, subject, unread flag, lastMessageAt,
 *   snippet, senderName, senderInitials, assignees, and messages array
 * - Each `Message` has id, sender (Participant with name/email/initials), sentAt (ISO string), content
 * - `defaultSelectedThreadId` (string, optional) -- thread to show on initial render
 *
 * ## Customization
 * - Thread selection is managed internally; `defaultSelectedThreadId` sets the initial state
 * - Thread list supports client-side search filtering
 * - Unread count badge is computed automatically from thread data
 * - Reply composer fires `onSend` callback
 * - Can be embedded in AppShell or rendered standalone
 *
 * ```tsx
 * import { InboxPage } from "@/components/inbox/InboxPage"
 * ```
 */
const meta = {
  title: "6. Pages/Inbox/InboxPage",
  component: InboxPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    threads: {
      control: "object",
      description: "Array of Thread objects populating the left-pane thread list.",
    },
    defaultSelectedThreadId: {
      control: "text",
      description: "ID of the thread to select on initial render. Defaults to first thread.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the root container.",
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
          "Default view -- 6 threads in the left pane, 'Collaboration Brief Terms' (4 messages, 2 assignees) open on the right.",
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
          "Thread list visible but no conversation selected -- right pane shows the empty-state placeholder.",
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
        story: "Zero threads -- left pane shows empty state, right pane shows the select-a-conversation prompt.",
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
    <AppShell
      activeHref="/inbox"
      user={{ name: "Jason Roh", initials: "JR" }}
      badgeCounts={{ messages: 3 }}
      defaultCollapsed
    >
      <InboxPage {...args} />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story: "Full Aspire app frame with collapsed sidebar -- badge count on the Messages nav item matches unread threads.",
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
