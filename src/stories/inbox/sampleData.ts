import type { Thread, Message, Participant, Assignee } from "@/components/inbox/InboxPage"

// ---------------------------------------------------------------------------
// Helpers — timestamps relative to when the story renders
// ---------------------------------------------------------------------------

function ago(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString()
}

// ---------------------------------------------------------------------------
// Participants
// ---------------------------------------------------------------------------

const TEAM_JASON: Participant = {
  name: "Jason Roh",
  email: "jason.roh@aspire.io",
  initials: "JR",
}

const TEAM_COLLIN: Participant = {
  name: "Lokesh Verma",
  email: "collin.fall@aspire.io",
  initials: "LV",
}

const CREATOR_JANE: Participant = {
  name: "Jane Doe",
  email: "jane.doe@creator.co",
  initials: "JD",
}

const CREATOR_ALEX: Participant = {
  name: "Alex Kim",
  email: "alex.kim@creator.co",
  initials: "AK",
}

const CREATOR_KAI: Participant = {
  name: "Kai Nguyen",
  email: "kai.nguyen@creator.co",
  initials: "KN",
}

const CREATOR_MIA: Participant = {
  name: "Mia Tanaka",
  email: "mia.tanaka@creator.co",
  initials: "MT",
}

const CREATOR_SAM: Participant = {
  name: "Sam Park",
  email: "sam.park@creator.co",
  initials: "SP",
}

const CREATOR_LILY: Participant = {
  name: "Lily Chen",
  email: "lily.chen@creator.co",
  initials: "LC",
}

// ---------------------------------------------------------------------------
// Assignees
// ---------------------------------------------------------------------------

const ASSIGNEE_JASON: Assignee = { name: "Jason Roh", initials: "JR" }
const ASSIGNEE_COLLIN: Assignee = { name: "Lokesh Verma", initials: "LV" }

// ---------------------------------------------------------------------------
// Thread 1 — "Collaboration Brief Terms" (UNREAD, 1 min ago, 4 messages)
// This is the primary selected thread matching the Figma spec.
// ---------------------------------------------------------------------------

const THREAD_1_MESSAGES: Message[] = [
  {
    id: "m1-1",
    sender: TEAM_JASON,
    sentAt: ago(60 * 24 * 3 + 45), // ~3 days ago
    content: `Hi Jane,

Hope you're doing well! We're thrilled to have you on board for the Spring Launch campaign. Attached below is the collaboration brief outlining the deliverables, timeline, and compensation structure.

Please review the following key points:

— 2× Instagram feed posts (static or carousel) + 3× Stories
— 1× TikTok video (15–60 sec, campaign hashtag required)
— Posts go live between March 10–17, 2026
— Usage rights: Aspire Brand retains 30-day paid amplification rights across Meta

Compensation: $4,200 flat fee + $250 bonus for posts exceeding 500K impressions.

Let me know if you have any questions or need clarification before signing. Looking forward to working with you!

Best,
Jason`,
  },
  {
    id: "m1-2",
    sender: CREATOR_JANE,
    sentAt: ago(60 * 24 * 2 + 30), // ~2.5 days ago
    content: `Hi Jason,

Thank you for sending over the brief — everything looks great! I have a couple of questions before I sign off.

1. Exclusivity clause: The brief mentions a 14-day exclusivity window. Does this apply to all competing brands in the beauty vertical, or just direct competitors? I have a pre-existing partnership with a skincare brand that would overlap slightly.

2. Revision rounds: How many rounds of content revisions are included? I want to make sure we're aligned on the review process before I start production.

3. Contract timing: Can we push the contract signing deadline from Feb 25 to Feb 28? I'm traveling next week and need a few extra days to review with my manager.

Everything else looks perfect. Looking forward to getting this locked in!

Thanks,
Jane`,
  },
  {
    id: "m1-3",
    sender: TEAM_COLLIN,
    sentAt: ago(60 * 24 + 10), // ~25 hours ago
    content: `Hi Jane,

Great questions — happy to clarify!

1. Exclusivity: The 14-day window applies only to direct competitors (defined in Exhibit A of the contract as brands in the same product category with overlapping target demographics). Your skincare partner sounds like it would fall outside that scope, but send me their brand name and I can confirm with our legal team by EOD tomorrow.

2. Revisions: The standard package includes two rounds of revisions per deliverable. If additional rounds are needed, we can discuss case by case — we want to make sure you're proud of what goes out.

3. Deadline extension: Absolutely, Feb 28 works for us. I've updated the deadline on our end.

I'll have Collin send over the updated contract today. Let us know if there's anything else!

Best,
Jason & Collin`,
  },
  {
    id: "m1-4",
    sender: CREATOR_JANE,
    sentAt: ago(1), // 1 minute ago
    content: `Hi Jason and Collin,

Perfect, thank you both for the quick responses! The skincare brand is Lumière — it's a French luxury brand targeting a completely different price point, so I imagine it should be fine.

On the payment schedule: the brief mentions net-30 after final deliverable approval. Is there any flexibility for a split payment — 50% upfront and 50% on completion? I'm investing in some production costs for this campaign and the split would really help with cash flow.

Happy to jump on a quick call this week if it's easier to align on the last few details verbally. Just let me know what works for your schedule.

Thanks again — really excited about this one!

Jane`,
  },
]

const THREAD_1: Thread = {
  id: "t1",
  subject: "Collaboration Brief Terms",
  unread: true,
  lastMessageAt: ago(1),
  snippet: "On the payment schedule: the brief mentions net-30 after final…",
  senderName: "Jane Doe",
  senderInitials: "JD",
  assignees: [ASSIGNEE_JASON, ASSIGNEE_COLLIN],
  messages: THREAD_1_MESSAGES,
}

// ---------------------------------------------------------------------------
// Thread 2 — "Spring Campaign Content Review" (UNREAD, 45 min ago)
// ---------------------------------------------------------------------------

const THREAD_2: Thread = {
  id: "t2",
  subject: "Spring Campaign Content Review",
  unread: true,
  lastMessageAt: ago(45),
  snippet: "I've uploaded the first draft of the TikTok video to the shared…",
  senderName: "Alex Kim",
  senderInitials: "AK",
  assignees: [ASSIGNEE_JASON],
  messages: [
    {
      id: "m2-1",
      sender: TEAM_JASON,
      sentAt: ago(60 * 4),
      content: `Hi Alex,

Just a reminder that we need your first-round content submissions by end of this week. Please upload drafts to the shared drive folder labeled "Spring2026_Submissions" and ping me once they're in.

For the TikTok video, remember:
— Hook in the first 3 seconds
— Include the hashtag #AspireSpring26 in the caption
— Tag @AspireBrand in the video

Let me know if you're on track!

Jason`,
    },
    {
      id: "m2-2",
      sender: CREATOR_ALEX,
      sentAt: ago(45),
      content: `Hey Jason,

Great news — I'm ahead of schedule! I've uploaded the first draft of the TikTok video to the shared drive. The hook is a POV "get ready with me" opening that tested really well with my audience on a previous campaign, so I'm confident in the format.

One note: I added a transition effect at the 0:12 mark that's not in the original brief. I think it elevates the quality significantly — let me know if the brand team has any objections.

The Instagram carousel is about 80% done. I'll have that uploaded by Thursday morning.

Can you let me know turnaround time on feedback so I can plan my revision window?

Alex`,
    },
  ],
}

// ---------------------------------------------------------------------------
// Thread 3 — "Product Seeding Confirmation" (UNREAD, 3 hours ago)
// ---------------------------------------------------------------------------

const THREAD_3: Thread = {
  id: "t3",
  subject: "Product Seeding Confirmation",
  unread: true,
  lastMessageAt: ago(60 * 3),
  snippet: "Quick update — I received the package yesterday and everything…",
  senderName: "Kai Nguyen",
  senderInitials: "KN",
  assignees: [ASSIGNEE_COLLIN],
  messages: [
    {
      id: "m3-1",
      sender: TEAM_COLLIN,
      sentAt: ago(60 * 48),
      content: `Hi Kai,

We've shipped your product seeding package via FedEx Priority! Your tracking number is: 7489 3821 0044 1729.

Expected delivery: Feb 20–21.

The package includes:
— Full-size Luminate Serum (3 units)
— Travel-size Glow Mist (2 units)
— Brand card with usage instructions + suggested caption angles

Please confirm receipt when it arrives and feel free to reach out with any questions about the products before you start filming.

Collin`,
    },
    {
      id: "m3-2",
      sender: CREATOR_KAI,
      sentAt: ago(60 * 3),
      content: `Hi Collin,

Quick update — I received the package yesterday and everything arrived in perfect condition. The packaging presentation is gorgeous by the way, my audience is going to love the unboxing moment.

I've been testing the Luminate Serum for the past day and I'm genuinely impressed with the results — it'll be easy to give an authentic review.

Planning to film this weekend and have my rough cut ready for review by Tuesday. Should I send the cut to you directly, or upload to the shared portal?

Also — is there a specific shade/skin tone range I should highlight in the demo, or can I feature what works best for my complexion?

Thanks,
Kai`,
    },
  ],
}

// ---------------------------------------------------------------------------
// Thread 4 — "Payment & Invoice #1042" (READ, 2 hours ago)
// ---------------------------------------------------------------------------

const THREAD_4: Thread = {
  id: "t4",
  subject: "Payment & Invoice #1042",
  unread: false,
  lastMessageAt: ago(60 * 2),
  snippet: "Hi Collin, I've reattached the corrected invoice with the updated…",
  senderName: "Mia Tanaka",
  senderInitials: "MT",
  assignees: [ASSIGNEE_COLLIN],
  messages: [
    {
      id: "m4-1",
      sender: CREATOR_MIA,
      sentAt: ago(60 * 72),
      content: `Hi Collin,

I hope this message finds you well. I'm following up on Invoice #1042 for the Winter Glow campaign deliverables submitted on January 28th.

The invoice total is $3,800 (net-30 from delivery, due Feb 27). I just wanted to make sure it was received on your end and is being processed.

Please let me know if you need any additional documentation or if there are any issues with the invoice.

Thank you!
Mia`,
    },
    {
      id: "m4-2",
      sender: TEAM_COLLIN,
      sentAt: ago(60 * 50),
      content: `Hi Mia,

Thanks for following up. I pulled up the invoice and noticed a small discrepancy — the PO number listed (PO-2025-118) doesn't match the one in our system (PO-2026-042). This is likely just a typo on the date, but our AP team needs the numbers to match exactly before processing.

Could you reissue the invoice with the corrected PO number? Once that's in, I'll get it approved and sent to AP right away.

Sorry for the extra step — we're doing everything we can to make sure this goes through without delay.

Collin`,
    },
    {
      id: "m4-3",
      sender: CREATOR_MIA,
      sentAt: ago(60 * 2),
      content: `Hi Collin,

Of course — my apologies for the error! I've reattached the corrected invoice with the updated PO number (PO-2026-042).

Please let me know once it's confirmed on your end. If AP needs anything else from me to process this faster, I'm happy to provide it.

Thanks for flagging so quickly!
Mia`,
    },
  ],
}

// ---------------------------------------------------------------------------
// Thread 5 — "Exclusive Launch Post Details" (READ, 2 days ago)
// ---------------------------------------------------------------------------

const THREAD_5: Thread = {
  id: "t5",
  subject: "Exclusive Launch Post Details",
  unread: false,
  lastMessageAt: ago(60 * 24 * 2),
  snippet: "Perfect — I'll keep March 12 locked in my calendar. Should I…",
  senderName: "Sam Park",
  senderInitials: "SP",
  assignees: [ASSIGNEE_JASON],
  messages: [
    {
      id: "m5-1",
      sender: TEAM_JASON,
      sentAt: ago(60 * 24 * 4),
      content: `Hi Sam,

Exciting news — we'd love for you to be one of our exclusive launch partners for the Glow Elixir product launch! You'd be one of only 8 creators going live on launch day.

Launch date: March 12, 2026 at 9:00 AM PST.

What this means for you:
— Embargoed product (arriving Feb 22) to test in advance
— Exclusive early-access badge on your post
— 15% affiliate commission on all tracked sales for 60 days
— Featured placement in our launch day email to 220K subscribers

You'll need to keep the product under embargo until your post goes live on March 12. Are you in?

Jason`,
    },
    {
      id: "m5-2",
      sender: CREATOR_SAM,
      sentAt: ago(60 * 24 * 2),
      content: `Hi Jason,

Count me in — this sounds like an incredible opportunity! I've been following Glow Elixir's development and I'm genuinely excited to be part of the launch.

Perfect — I'll keep March 12 locked in my calendar. Should I reach out to you or someone else for the embargo package arrival confirmation on Feb 22?

Also — for the post itself, am I free to write my own caption or is there a required script? I always perform better with authentic language, but happy to incorporate key messaging points if you provide them.

Looking forward to it!
Sam`,
    },
  ],
}

// ---------------------------------------------------------------------------
// Thread 6 — "TikTok Reel Approval" (READ, 5 days ago)
// ---------------------------------------------------------------------------

const THREAD_6: Thread = {
  id: "t6",
  subject: "TikTok Reel Approval",
  unread: false,
  lastMessageAt: ago(60 * 24 * 5),
  snippet: "Thanks for the quick turnaround! The reel looks amazing. Approved…",
  senderName: "Lily Chen",
  senderInitials: "LC",
  assignees: [ASSIGNEE_JASON, ASSIGNEE_COLLIN],
  messages: [
    {
      id: "m6-1",
      sender: CREATOR_LILY,
      sentAt: ago(60 * 24 * 6),
      content: `Hi Jason,

I've finished editing the TikTok reel and it's ready for review! I'm really proud of how it turned out — the transitions are smooth and I think the energy matches the brand vibe perfectly.

Submission link: [Reel_LilyC_Draft1.mp4 — shared drive]

A few notes on my creative choices:
— I used a trending audio track (Florentino - "Elevation" edit). Let me know if you need me to swap for royalty-free.
— The CTA appears at 0:38 (just before the last beat drop) — it felt more natural there than at the very end.
— Total runtime: 0:52

Please review and let me know if you need any changes! I can turn around a revision within 24 hours.

Lily`,
    },
    {
      id: "m6-2",
      sender: TEAM_JASON,
      sentAt: ago(60 * 24 * 5),
      content: `Hi Lily,

Thanks for the quick turnaround! The reel looks amazing. Approved as-is — the audio choice is perfect and I love the CTA placement.

A couple of small notes for when you post:
1. Caption must include #GlowElixir and #AspirePartner (FTC disclosure)
2. Please tag @AspireBrand and @GlowElixirOfficial in the video

You're cleared to post anytime after 9:00 AM PST on Feb 17. Let me know once it's live so we can start amplification!

Great work, Lily.

Jason`,
    },
  ],
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/** All 6 threads ordered by recency */
export const THREADS: Thread[] = [
  THREAD_1,
  THREAD_2,
  THREAD_3,
  THREAD_4,
  THREAD_5,
  THREAD_6,
]

/** The primary selected thread (4-message "Collaboration Brief Terms") */
export const SELECTED_THREAD = THREAD_1

/** Thread with only one message */
export const SINGLE_MESSAGE_THREAD = THREAD_5
