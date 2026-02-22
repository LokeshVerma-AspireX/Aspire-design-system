import type { Meta, StoryObj } from "@storybook/react"
import { InboxTab } from "@/components/contact-detail/InboxTab"
import type { ThreadPreview } from "@/components/contact-detail/ThreadList"
import type { ThreadMessage } from "@/components/contact-detail/ThreadDetail"

const THREADS: ThreadPreview[] = [
  {
    id: "t1",
    author: "Jane Doe",
    initials: "JD",
    subject: "Collaboration Brief Terms",
    preview: "Hey, I had a few questions about the deliverables...",
    timestamp: "1 min ago",
    unreadCount: 2,
  },
  {
    id: "t2",
    author: "Aspire Support",
    initials: "AS",
    subject: "Re: Payment confirmation",
    preview: "Your payment of $1,200 has been processed.",
    timestamp: "3 hrs ago",
  },
  {
    id: "t3",
    author: "Jason Roh",
    initials: "JR",
    subject: "Content feedback — Coffee Brief",
    preview: "Loved the first reel! A few tweaks needed on...",
    timestamp: "Yesterday",
    unreadCount: 1,
  },
  {
    id: "t4",
    author: "Lokesh Verma",
    initials: "LV",
    subject: "Onboarding checklist",
    preview: "Please complete the W-9 form before your first payment.",
    timestamp: "2 days ago",
  },
  {
    id: "t5",
    author: "Jane Doe",
    initials: "JD",
    subject: "Portfolio link updated",
    preview: "I've updated my portfolio with recent work.",
    timestamp: "3 days ago",
  },
]

const MESSAGES: ThreadMessage[] = [
  {
    id: "m1",
    author: "Jane Doe",
    email: "jane@janedoe.com",
    initials: "JD",
    timestamp: "Feb 20, 10:14 AM",
    body: "Hi! I had a few questions about the collaboration brief. Could you clarify the usage rights section? I want to make sure I understand the licensing terms before signing.",
  },
  {
    id: "m2",
    author: "Jason Roh",
    email: "jason@aspire.io",
    initials: "JR",
    timestamp: "Feb 20, 11:02 AM",
    body: "Hi Jane! Great question. The usage rights in section 4 are limited to organic social posts for 12 months. You retain full ownership of the creative assets.",
    isOwn: true,
  },
  {
    id: "m3",
    author: "Jane Doe",
    email: "jane@janedoe.com",
    initials: "JD",
    timestamp: "Feb 20, 11:30 AM",
    body: "That makes sense, thank you! One more thing — what's the deadline for the first draft submission?",
  },
  {
    id: "m4",
    author: "Lokesh Verma",
    email: "collin@aspire.io",
    initials: "LV",
    timestamp: "Feb 20, 12:05 PM",
    body: "The first draft is due March 5th. Let us know if you need any extensions and we can check with the brand.",
    isOwn: true,
  },
]

const meta = {
  title: "Contact Detail/InboxTab",
  component: InboxTab,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Split-pane messaging inbox. Left: thread list with search and unread badges. Right: thread detail with full message history and reply input.",
      },
    },
  },
  args: {
    threads: THREADS,
    activeThreadId: "t1",
    subject: "Collaboration Brief Terms",
    messageCount: 4,
    assignedTo: ["Jason Roh", "Lokesh Verma"],
    messages: MESSAGES,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="h-[600px] border rounded-xl overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InboxTab>

export default meta
type Story = StoryObj<typeof meta>

export const ActiveConversation: Story = {
  parameters: {
    docs: {
      description: { story: "Thread t1 active. 4 messages, 2 participants. Reply input at bottom." },
    },
  },
}

export const NoSelection: Story = {
  args: { activeThreadId: undefined },
  parameters: {
    docs: { description: { story: "No thread selected — shows placeholder." } },
  },
}

export const SingleThread: Story = {
  args: {
    threads: [THREADS[0]],
    messages: MESSAGES,
  },
}
