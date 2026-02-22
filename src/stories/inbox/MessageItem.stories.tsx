import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { MessageItem } from "@/components/inbox/MessageItem"
import { SELECTED_THREAD, THREADS } from "./sampleData"

const meta = {
  title: "Inbox/MessageItem",
  component: MessageItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Single email message row. Shows avatar, sender name + email address, formatted timestamp, a separator, and the full message body rendered as paragraphs (split on double-newline).",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-3xl border border-border rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageItem>

export default meta
// MessageItem has required props (message) and stories use render() — use bare StoryObj
type Story = StoryObj

// First message from the 4-message thread (sent by team)
export const TeamMessage: Story = {
  render: () => <MessageItem message={SELECTED_THREAD.messages[0]} />,
  parameters: {
    docs: {
      description: {
        story: "Outbound message from the Aspire team (Jason Roh) — long multi-paragraph collaboration brief.",
      },
    },
  },
}

// Creator reply
export const CreatorReply: Story = {
  render: () => <MessageItem message={SELECTED_THREAD.messages[1]} />,
  parameters: {
    docs: {
      description: {
        story: "Inbound reply from creator Jane Doe — bulleted questions about exclusivity, revisions, and deadline.",
      },
    },
  },
}

// Latest message (most recent, also creator)
export const LatestMessage: Story = {
  render: () => (
    <MessageItem message={SELECTED_THREAD.messages[SELECTED_THREAD.messages.length - 1]} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Most recent message — Jane asking about the payment split schedule.",
      },
    },
  },
}

// Short message
export const ShortMessage: Story = {
  render: () => <MessageItem message={THREADS[5].messages[1]} />,
  parameters: {
    docs: {
      description: {
        story: "Short approval message — Jason approving Lily's TikTok reel with posting instructions.",
      },
    },
  },
}

// Side-by-side: two messages as they appear in a thread
export const TwoMessagesInThread: Story = {
  render: () => (
    <div className="divide-y divide-border">
      {SELECTED_THREAD.messages.slice(0, 2).map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Two consecutive messages as rendered in ThreadDetail — separator between them.",
      },
    },
  },
}

// Full 4-message conversation
export const FullConversation: Story = {
  render: () => (
    <div className="divide-y divide-border">
      {SELECTED_THREAD.messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All 4 messages in the 'Collaboration Brief Terms' thread stacked vertically.",
      },
    },
  },
}
