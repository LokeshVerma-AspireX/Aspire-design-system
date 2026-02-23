import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ThreadDetail } from "@/components/inbox/ThreadDetail"
import { THREADS, SELECTED_THREAD, SINGLE_MESSAGE_THREAD } from "./sampleData"

/**
 * # ThreadDetail
 *
 * Right-pane thread detail view. Renders a ThreadHeader with subject, message count, and
 * assignee chips, above a scrollable list of MessageItems, with a ReplyComposer pinned
 * at the bottom.
 *
 * ## Components Used
 * - `ThreadHeader` -- subject line, message count badge, assignee avatar chips
 * - `MessageItem` -- individual message row with sender avatar, name, email, timestamp, body paragraphs
 * - `ReplyComposer` -- text input area and send button pinned at the bottom
 * - `ScrollArea` -- scrollable container for the message list
 * - `Separator` -- visual divider between messages
 * - `Avatar` / `AvatarFallback` -- sender avatars with initials
 *
 * ## Data Requirements
 * - `thread` (Thread) -- full thread object containing:
 *   - `subject` (string) -- thread subject line
 *   - `messages` (Message[]) -- array of messages with sender, sentAt, content
 *   - `assignees` (Assignee[]) -- array of team members assigned to this thread
 * - Each `Message` has id, sender (Participant with name/email/initials), sentAt (ISO string), content
 *
 * ## Customization
 * - Message list length is dynamic; the scroll area handles overflow
 * - Assignee chips are rendered from the thread's assignees array
 * - `onSend` callback fires when the reply composer submit button is clicked
 * - Height is constrained by the parent container
 *
 * ```tsx
 * import { ThreadDetail } from "@/components/inbox/ThreadDetail"
 * ```
 */
const meta = {
  title: "6. Pages/Inbox/ThreadDetail",
  component: ThreadDetail,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    thread: {
      control: "object",
      description: "Full Thread object containing subject, messages, and assignees.",
    },
    onSend: {
      action: "onSend",
      description: "Callback fired with the reply text when the send button is clicked.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the root container.",
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="h-[700px] border border-border rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ThreadDetail>

export default meta
type Story = StoryObj<typeof meta>

export const LongConversation: Story = {
  args: {
    thread: SELECTED_THREAD,
  },
  parameters: {
    docs: {
      description: {
        story:
          "'Collaboration Brief Terms' -- 4 messages, 2 assignees. Demonstrates scrollable message list and fully populated header.",
      },
    },
  },
}

export const SingleMessage: Story = {
  args: {
    thread: SINGLE_MESSAGE_THREAD,
  },
  parameters: {
    docs: {
      description: {
        story: "Two-message thread (Exclusive Launch Post). Compact view without excess whitespace.",
      },
    },
  },
}

export const ThreeMessages: Story = {
  args: {
    thread: THREADS[3], // Payment & Invoice — 3 messages
  },
  parameters: {
    docs: {
      description: {
        story: "'Payment & Invoice #1042' -- 3 messages, shows the separator between messages clearly.",
      },
    },
  },
}

export const TwoAssignees: Story = {
  args: {
    thread: THREADS[5], // TikTok Reel — 2 assignees
  },
  parameters: {
    docs: {
      description: {
        story: "'TikTok Reel Approval' -- 2 assignees shown in the header chips.",
      },
    },
  },
}
