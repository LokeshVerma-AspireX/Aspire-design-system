import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ThreadDetail } from "@/components/inbox/ThreadDetail"
import { THREADS, SELECTED_THREAD, SINGLE_MESSAGE_THREAD } from "./sampleData"

const meta = {
  title: "Inbox/ThreadDetail",
  component: ThreadDetail,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Right-pane thread detail. Renders ThreadHeader (subject, message count, assignee chips) above a scrollable list of MessageItems, with ReplyComposer pinned at the bottom.",
      },
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
          "'Collaboration Brief Terms' — 4 messages, 2 assignees. Demonstrates scrollable message list and fully populated header.",
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
        story: "'Payment & Invoice #1042' — 3 messages, shows the separator between messages clearly.",
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
        story: "'TikTok Reel Approval' — 2 assignees shown in the header chips.",
      },
    },
  },
}
