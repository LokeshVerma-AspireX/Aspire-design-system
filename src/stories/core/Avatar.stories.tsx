import type { Meta, StoryObj } from "@storybook/react"
import { within, userEvent, expect } from "storybook/test"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, Check, Minus, UserPlus } from "lucide-react"

const AVATAR_URLS = {
  creator1: "https://i.pravatar.cc/150?u=creator1",
  creator2: "https://i.pravatar.cc/150?u=creator2",
  creator3: "https://i.pravatar.cc/150?u=creator3",
  creator4: "https://i.pravatar.cc/150?u=creator4",
  creator5: "https://i.pravatar.cc/150?u=creator5",
  brand1: "https://i.pravatar.cc/150?u=brand1",
}

/**
 * # Avatar
 *
 * Displays a user profile image with an automatic fallback to initials when no
 * image is available or while the image is loading. Supports status badges,
 * size variants, and group layouts for stacked avatar displays.
 *
 * ## When to Use
 * - To represent a user, creator, or brand visually in lists, headers, and cards
 * - For team member displays and assignee indicators
 * - In comment threads, activity feeds, and conversation lists
 * - Alongside names in tables and detail views
 *
 * ## When NOT to Use
 * - For decorative images unrelated to a person or entity — use `<img>` or `next/image`
 * - For company logos in navigation — use a dedicated logo component
 * - When the image is the primary content (e.g. gallery) — use AspectRatio or Image
 *
 * ## Accessibility
 * - `AvatarImage` requires an `alt` attribute describing the person
 * - `AvatarFallback` renders initials when the image fails or is absent
 * - `AvatarBadge` is decorative; pair with `aria-label` on the parent if the
 *   status needs to be announced to screen readers
 * - In `AvatarGroup`, each avatar should have a unique `alt`
 *
 * ## Import
 * ```tsx
 * import {
 *   Avatar,
 *   AvatarImage,
 *   AvatarFallback,
 *   AvatarBadge,
 *   AvatarGroup,
 *   AvatarGroupCount,
 * } from '@/components/ui/avatar'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/photo.jpg" alt="Jane Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const meta: Meta<typeof Avatar> = {
  title: "3. Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "User avatar with automatic fallback to initials when no image is provided. Supports sizes, status badges, and group layouts.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description:
        "Size variant. `sm` renders size-6 (24px), `default` renders size-8 (32px), `lg` renders size-10 (40px).",
      table: {
        type: { summary: '"sm" | "default" | "lg"' },
        defaultValue: { summary: "default" },
        category: "Appearance",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes merged onto the root element.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    children: {
      control: false,
      description:
        "Compose with `AvatarImage`, `AvatarFallback`, and optionally `AvatarBadge`.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

// ─── CORE VARIANTS ─────────────────────────────────

/**
 * Avatar displaying an image with a fallback. The fallback is only shown
 * while the image loads or if it fails.
 *
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="https://i.pravatar.cc/150?u=creator1" alt="Sarah Chen" />
 *   <AvatarFallback>SC</AvatarFallback>
 * </Avatar>
 * ```
 */
export const WithImage: Story = {
  name: "With Image",
  render: () => (
    <Avatar>
      <AvatarImage src={AVATAR_URLS.creator1} alt="Sarah Chen" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
}

/**
 * When the image `src` is missing or fails to load, the fallback initials
 * are displayed on a muted background.
 *
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/broken-image.jpg" alt="Mike Rivera" />
 *   <AvatarFallback>MR</AvatarFallback>
 * </Avatar>
 * ```
 */
export const WithFallback: Story = {
  name: "Initials Fallback",
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.jpg" alt="Mike Rivera" />
      <AvatarFallback>MR</AvatarFallback>
    </Avatar>
  ),
}

// ─── SIZES ─────────────────────────────────────────

/**
 * All three size variants side by side: `sm` (24px), `default` (32px), `lg` (40px).
 *
 * ```tsx
 * <Avatar size="sm">…</Avatar>
 * <Avatar size="default">…</Avatar>
 * <Avatar size="lg">…</Avatar>
 * ```
 */
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-1">
        <Avatar size="sm">
          <AvatarImage src={AVATAR_URLS.creator1} alt="Small avatar" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">sm (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar size="default">
          <AvatarImage src={AVATAR_URLS.creator2} alt="Default avatar" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">default (32px)</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar size="lg">
          <AvatarImage src={AVATAR_URLS.creator3} alt="Large avatar" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">lg (40px)</span>
      </div>
    </div>
  ),
}

/** Small avatar — ideal for compact lists, table rows, and inline mentions. */
export const SizeSmall: Story = {
  name: "Size: Small",
  render: () => (
    <Avatar size="sm">
      <AvatarImage src={AVATAR_URLS.creator1} alt="Small creator" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
}

/** Default avatar — the standard size for most UI contexts. */
export const SizeDefault: Story = {
  name: "Size: Default",
  render: () => (
    <Avatar size="default">
      <AvatarImage src={AVATAR_URLS.creator2} alt="Default creator" />
      <AvatarFallback>DC</AvatarFallback>
    </Avatar>
  ),
}

/** Large avatar — use in profile headers, detail pages, and hero sections. */
export const SizeLarge: Story = {
  name: "Size: Large",
  render: () => (
    <Avatar size="lg">
      <AvatarImage src={AVATAR_URLS.creator3} alt="Large creator" />
      <AvatarFallback>LC</AvatarFallback>
    </Avatar>
  ),
}

// ─── WITH BADGE ────────────────────────────────────

/**
 * AvatarBadge adds a small status indicator in the bottom-right corner.
 * The badge automatically scales with the avatar size.
 *
 * ```tsx
 * <Avatar size="lg">
 *   <AvatarImage src="/photo.jpg" alt="Creator" />
 *   <AvatarFallback>CR</AvatarFallback>
 *   <AvatarBadge className="bg-emerald-500" />
 * </Avatar>
 * ```
 */
export const WithBadge: Story = {
  name: "With Status Badge",
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="sm">
          <AvatarImage src={AVATAR_URLS.creator1} alt="Online (sm)" />
          <AvatarFallback>ON</AvatarFallback>
          <AvatarBadge className="bg-emerald-500" />
        </Avatar>
        <span className="text-xs text-muted-foreground">Online (sm)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="default">
          <AvatarImage src={AVATAR_URLS.creator2} alt="Away (default)" />
          <AvatarFallback>AW</AvatarFallback>
          <AvatarBadge className="bg-amber-500" />
        </Avatar>
        <span className="text-xs text-muted-foreground">Away</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src={AVATAR_URLS.creator3} alt="Offline (lg)" />
          <AvatarFallback>OF</AvatarFallback>
          <AvatarBadge className="bg-muted-foreground" />
        </Avatar>
        <span className="text-xs text-muted-foreground">Offline (lg)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src={AVATAR_URLS.creator4} alt="Busy (lg)" />
          <AvatarFallback>BS</AvatarFallback>
          <AvatarBadge className="bg-destructive" />
        </Avatar>
        <span className="text-xs text-muted-foreground">Busy</span>
      </div>
    </div>
  ),
}

/**
 * AvatarBadge can contain an icon (visible at `default` and `lg` sizes).
 * At `sm` size, the icon is hidden and only the dot is shown.
 *
 * ```tsx
 * <Avatar size="lg">
 *   <AvatarImage src="/photo.jpg" alt="Verified creator" />
 *   <AvatarFallback>VC</AvatarFallback>
 *   <AvatarBadge className="bg-emerald-500">
 *     <Check />
 *   </AvatarBadge>
 * </Avatar>
 * ```
 */
export const BadgeWithIcon: Story = {
  name: "Badge with Icon",
  render: () => (
    <div className="flex items-end gap-6">
      <Avatar size="default">
        <AvatarImage src={AVATAR_URLS.creator1} alt="Verified" />
        <AvatarFallback>VR</AvatarFallback>
        <AvatarBadge className="bg-emerald-500 text-white">
          <Check />
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={AVATAR_URLS.creator2} alt="Do Not Disturb" />
        <AvatarFallback>DN</AvatarFallback>
        <AvatarBadge className="bg-destructive text-white">
          <Minus />
        </AvatarBadge>
      </Avatar>
    </div>
  ),
}

// ─── AVATAR GROUP ──────────────────────────────────

/**
 * AvatarGroup stacks multiple avatars with `-space-x-2` overlap and ring borders.
 *
 * ```tsx
 * <AvatarGroup>
 *   <Avatar>
 *     <AvatarImage src="/user1.jpg" alt="User 1" />
 *     <AvatarFallback>U1</AvatarFallback>
 *   </Avatar>
 *   <Avatar>
 *     <AvatarImage src="/user2.jpg" alt="User 2" />
 *     <AvatarFallback>U2</AvatarFallback>
 *   </Avatar>
 * </AvatarGroup>
 * ```
 */
export const GroupBasic: Story = {
  name: "Avatar Group",
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src={AVATAR_URLS.creator1} alt="Sarah Chen" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={AVATAR_URLS.creator2} alt="Mike Rivera" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={AVATAR_URLS.creator3} alt="Alex Kim" />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
}

/**
 * Use `AvatarGroupCount` to show how many additional users are not displayed.
 *
 * ```tsx
 * <AvatarGroup>
 *   <Avatar>…</Avatar>
 *   <Avatar>…</Avatar>
 *   <AvatarGroupCount>+12</AvatarGroupCount>
 * </AvatarGroup>
 * ```
 */
export const GroupWithCount: Story = {
  name: "Avatar Group with Overflow Count",
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src={AVATAR_URLS.creator1} alt="Sarah Chen" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={AVATAR_URLS.creator2} alt="Mike Rivera" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={AVATAR_URLS.creator3} alt="Alex Kim" />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+12</AvatarGroupCount>
    </AvatarGroup>
  ),
}

/** Avatar group using the large size variant. */
export const GroupLarge: Story = {
  name: "Avatar Group (Large)",
  render: () => (
    <AvatarGroup>
      <Avatar size="lg">
        <AvatarImage src={AVATAR_URLS.creator1} alt="Sarah Chen" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={AVATAR_URLS.creator2} alt="Mike Rivera" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  ),
}

// ─── LOADING / BROKEN IMAGE ────────────────────────

/**
 * When the image source is invalid, the fallback initials are rendered.
 * This is the default resilience behavior of Radix Avatar.
 */
export const BrokenImage: Story = {
  name: "Broken Image (Fallback)",
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://broken-link.invalid/photo.jpg" alt="Broken" />
        <AvatarFallback>BR</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="" alt="Empty src" />
        <AvatarFallback>EM</AvatarFallback>
      </Avatar>
    </div>
  ),
}

// ─── ALL VARIANTS GALLERY ──────────────────────────

/** Side-by-side comparison of all avatar configurations. */
export const AllVariants: Story = {
  name: "All Variants Gallery",
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="flex items-end gap-4">
          <Avatar size="sm">
            <AvatarImage src={AVATAR_URLS.creator1} alt="sm" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage src={AVATAR_URLS.creator2} alt="default" />
            <AvatarFallback>DF</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={AVATAR_URLS.creator3} alt="lg" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">With Badges</p>
        <div className="flex items-end gap-4">
          <Avatar size="default">
            <AvatarFallback>ON</AvatarFallback>
            <AvatarBadge className="bg-emerald-500" />
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>AW</AvatarFallback>
            <AvatarBadge className="bg-amber-500" />
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>OF</AvatarFallback>
            <AvatarBadge className="bg-muted-foreground" />
          </Avatar>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Group</p>
        <AvatarGroup>
          <Avatar>
            <AvatarImage src={AVATAR_URLS.creator1} alt="User 1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src={AVATAR_URLS.creator2} alt="User 2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+8</AvatarGroupCount>
        </AvatarGroup>
      </div>
    </div>
  ),
}

// ─── REAL-WORLD COMPOSITIONS ───────────────────────

/**
 * Creator profile header as seen on the contact detail page in Aspire.
 *
 * ```tsx
 * <div className="flex items-center gap-4">
 *   <Avatar size="lg">
 *     <AvatarImage src="/creator.jpg" alt="Sarah Chen" />
 *     <AvatarFallback>SC</AvatarFallback>
 *     <AvatarBadge className="bg-emerald-500" />
 *   </Avatar>
 *   <div>
 *     <p className="font-semibold">Sarah Chen</p>
 *     <p className="text-sm text-muted-foreground">@sarahcreates</p>
 *   </div>
 * </div>
 * ```
 */
export const CreatorProfileHeader: Story = {
  name: "Real World — Creator Profile Header",
  render: () => (
    <div className="flex w-80 items-center gap-4 rounded-lg border bg-card p-4">
      <Avatar size="lg">
        <AvatarImage src={AVATAR_URLS.creator1} alt="Sarah Chen" />
        <AvatarFallback>SC</AvatarFallback>
        <AvatarBadge className="bg-emerald-500" />
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold truncate">Sarah Chen</p>
          <Badge variant="secondary" className="shrink-0 text-xs">Pro</Badge>
        </div>
        <p className="text-sm text-muted-foreground">@sarahcreates</p>
        <p className="text-xs text-muted-foreground">124K followers</p>
      </div>
    </div>
  ),
}

/**
 * Campaign team members list showing assigned creators with status badges.
 */
export const CampaignTeamMembers: Story = {
  name: "Real World — Campaign Team",
  render: () => {
    const members = [
      { name: "Sarah Chen", handle: "@sarahcreates", initials: "SC", src: AVATAR_URLS.creator1, status: "Active", role: "Lead Creator" },
      { name: "Mike Rivera", handle: "@mikerivera", initials: "MR", src: AVATAR_URLS.creator2, status: "Pending", role: "Content Creator" },
      { name: "Alex Kim", handle: "@alexkimstyle", initials: "AK", src: AVATAR_URLS.creator3, status: "Active", role: "Brand Ambassador" },
      { name: "Emma Wilson", handle: "@emmawilson", initials: "EW", src: null, status: "Invited", role: "Micro-Influencer" },
    ]
    return (
      <div className="w-96 divide-y rounded-lg border bg-card">
        <div className="flex items-center justify-between p-3">
          <p className="text-sm font-semibold">Team Members</p>
          <AvatarGroup>
            {members.slice(0, 3).map((m) => (
              <Avatar key={m.name} size="sm">
                {m.src ? <AvatarImage src={m.src} alt={m.name} /> : null}
                <AvatarFallback>{m.initials}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+{members.length - 3}</AvatarGroupCount>
          </AvatarGroup>
        </div>
        {members.map((m) => (
          <div key={m.name} className="flex items-center gap-3 p-3">
            <Avatar>
              {m.src ? <AvatarImage src={m.src} alt={m.name} /> : null}
              <AvatarFallback>{m.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.role}</p>
            </div>
            <Badge
              variant={
                m.status === "Active" ? "default" : m.status === "Pending" ? "outline" : "secondary"
              }
              className="text-xs"
            >
              {m.status}
            </Badge>
          </div>
        ))}
      </div>
    )
  },
}

/**
 * Comment thread pattern — avatars in a conversation feed.
 */
export const CommentThread: Story = {
  name: "Real World — Comment Thread",
  render: () => {
    const comments = [
      {
        name: "Sarah Chen",
        initials: "SC",
        src: AVATAR_URLS.creator1,
        text: "Love the new campaign brief! The creative direction looks great.",
        time: "2m ago",
      },
      {
        name: "Mike Rivera",
        initials: "MR",
        src: AVATAR_URLS.creator2,
        text: "Agreed. Should we add lifestyle shots in the next batch?",
        time: "5m ago",
      },
      {
        name: "Alex Kim",
        initials: "AK",
        src: null,
        text: "Already on it. Drafts coming by Friday.",
        time: "8m ago",
      },
    ]
    return (
      <div className="w-96 space-y-4">
        {comments.map(({ name, initials, src, text, time }) => (
          <div key={name} className="flex gap-3">
            <Avatar className="shrink-0">
              {src ? <AvatarImage src={src} alt={name} /> : null}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{time}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    )
  },
}

/**
 * Brand logos displayed as avatars in a campaign overview card.
 */
export const BrandLogos: Story = {
  name: "Real World — Brand Avatar Row",
  render: () => (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center gap-1">
        <Avatar size="lg">
          <AvatarImage src={AVATAR_URLS.brand1} alt="Acme Brand" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">Acme</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar size="lg">
          <AvatarFallback className="bg-blue-100 text-blue-700">NB</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">NovaBrand</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar size="lg">
          <AvatarFallback className="bg-purple-100 text-purple-700">ZC</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">ZenCo</span>
      </div>
    </div>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that when an image fails to load, the fallback initials are
 * rendered and visible in the DOM.
 */
export const FallbackRenderTest: Story = {
  name: "Test: Fallback Renders on Broken Image",
  render: () => (
    <Avatar data-testid="test-avatar">
      <AvatarImage src="/does-not-exist.jpg" alt="Test user" />
      <AvatarFallback data-testid="test-fallback">TU</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // The fallback should be rendered since the image src is broken
    const fallback = await canvas.findByText("TU", {}, { timeout: 3000 })
    await expect(fallback).toBeVisible()
  },
}

/**
 * Verifies that the avatar image element is present in the DOM when a
 * valid `src` is provided.
 */
export const ImagePresenceTest: Story = {
  name: "Test: Image Element Present",
  render: () => (
    <Avatar>
      <AvatarImage src={AVATAR_URLS.creator1} alt="Creator avatar test" />
      <AvatarFallback>CT</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = await canvas.findByRole("img", { name: "Creator avatar test" }, { timeout: 3000 })
    await expect(img).toBeInTheDocument()
    await expect(img).toHaveAttribute("src", AVATAR_URLS.creator1)
  },
}

/**
 * Verifies avatar group renders the expected number of avatar children
 * plus the overflow count.
 */
export const GroupCountTest: Story = {
  name: "Test: Group Renders Count",
  render: () => (
    <AvatarGroup data-testid="avatar-group">
      <Avatar>
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>
      <AvatarGroupCount data-testid="group-count">+5</AvatarGroupCount>
    </AvatarGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("A1")).toBeVisible()
    await expect(canvas.getByText("A2")).toBeVisible()
    await expect(canvas.getByText("+5")).toBeVisible()
  },
}
