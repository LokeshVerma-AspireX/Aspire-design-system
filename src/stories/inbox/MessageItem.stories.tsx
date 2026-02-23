import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { MessageItem } from "@/components/inbox/MessageItem"
import { SELECTED_THREAD, THREADS } from "./sampleData"

/**
 * # MessageItem
 *
 * Single email message row within a thread. Shows avatar, sender name and email address,
 * formatted timestamp, a separator, and the full message body rendered as paragraphs
 * (split on double-newline).
 *
 * ## Components Used
 * - `Avatar` / `AvatarFallback` / `AvatarImage` -- sender avatar with initials fallback
 * - `Separator` -- visual divider (when used in a thread list context)
 *
 * ## Data Requirements
 * - `message` (Message) -- single message object containing:
 *   - `id` (string) -- unique message identifier
 *   - `sender` (Participant) -- object with name, email, initials, and optional avatarUrl
 *   - `sentAt` (string) -- ISO date string formatted for display
 *   - `content` (string) -- message body text, split on double-newline for paragraphs
 *
 * ## Customization
 * - Message body supports multi-paragraph text via double-newline splitting
 * - Avatar falls back to initials when no avatarUrl is provided
 * - Timestamp formatting is handled internally using toLocaleString
 * - Spacing and layout are controlled via className prop
 * - When stacked in a thread, Separator components are placed between items
 *
 * ```tsx
 * import { MessageItem } from "@/components/inbox/MessageItem"
 * ```
 */
const meta = {
  title: "6. Pages/Inbox/MessageItem",
  component: MessageItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    message: {
      control: "object",
      description: "Message object with sender, sentAt, and content fields.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the message row container.",
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
// MessageItem has required props (message) and stories use render() -- use bare StoryObj
type Story = StoryObj

// First message from the 4-message thread (sent by team)
export const TeamMessage: Story = {
  render: () => <MessageItem message={SELECTED_THREAD.messages[0]} />,
  parameters: {
    docs: {
      description: {
        story: "Outbound message from the Aspire team (Jason Roh) -- long multi-paragraph collaboration brief.",
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
        story: "Inbound reply from creator Jane Doe -- bulleted questions about exclusivity, revisions, and deadline.",
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
        story: "Most recent message -- Jane asking about the payment split schedule.",
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
        story: "Short approval message -- Jason approving Lily's TikTok reel with posting instructions.",
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
        story: "Two consecutive messages as rendered in ThreadDetail -- separator between them.",
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
