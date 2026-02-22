export interface Participant {
  name: string
  email: string
  initials: string
  avatarUrl?: string
}

export interface Assignee {
  name: string
  initials: string
  avatarUrl?: string
}

export interface Message {
  id: string
  sender: Participant
  sentAt: string // ISO 8601
  content: string // double-newline separated paragraphs
}

export interface Thread {
  id: string
  subject: string
  unread: boolean
  lastMessageAt: string // ISO 8601
  snippet: string
  senderName: string
  senderInitials: string
  senderAvatarUrl?: string
  assignees: Assignee[]
  messages: Message[]
}
