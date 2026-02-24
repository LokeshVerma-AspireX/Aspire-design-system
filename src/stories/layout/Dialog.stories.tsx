import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Trash2,
  AlertTriangle,
  Edit,
  UserPlus,
  Copy,
  Settings,
} from "lucide-react"

/**
 * # Dialog
 *
 * A modal overlay that demands user attention. Renders on top of the page with
 * a backdrop that blocks interaction with the rest of the UI. Use for
 * confirmations, short forms, and critical alerts.
 *
 * ## When to Use
 * - To confirm a destructive action (delete, discard changes)
 * - To collect a small amount of input (invite member, rename item)
 * - For alerts or critical information that requires acknowledgment
 * - When the user must complete or dismiss the task before continuing
 *
 * ## When NOT to Use
 * - For lightweight contextual info -- use Popover instead
 * - For side panels with long forms -- use Sheet instead
 * - For non-blocking notifications -- use Toast instead
 * - For inline editing -- use editable fields directly
 *
 * ## Accessibility
 * - Focus is trapped inside the dialog while open
 * - Pressing Escape closes the dialog
 * - `DialogTitle` is announced by screen readers as the dialog label
 * - `DialogDescription` provides additional context for assistive technology
 * - Close button includes `sr-only` label for screen readers
 * - Returns focus to the trigger element on close
 *
 * ## Import
 * ```tsx
 * import {
 *   Dialog,
 *   DialogContent,
 *   DialogDescription,
 *   DialogFooter,
 *   DialogHeader,
 *   DialogTitle,
 *   DialogTrigger,
 * } from '@/components/ui/dialog'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Open</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *       <DialogDescription>Description text.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <Button>Confirm</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const meta: Meta<typeof Dialog> = {
  title: "4. Components/Feedback/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal dialog for confirmations, forms, and alerts that require user attention. Renders with a backdrop overlay and traps focus.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description:
        "Controlled open state. When provided, the dialog becomes controlled and `onOpenChange` is required.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
        category: "State",
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "The initial open state for uncontrolled usage.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    onOpenChange: {
      description:
        "Callback fired when the open state changes. Required for controlled mode.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Events",
      },
    },
    modal: {
      control: "boolean",
      description:
        "When true (default), interaction with outside elements is disabled and only dialog content is visible to screen readers.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Behavior",
      },
    },
  },
  args: {
    onOpenChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── CORE VARIANTS ─────────────────────────────────

/**
 * Basic dialog with a title, description, and a single action button.
 *
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button variant="outline">Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Simple Dialog</DialogTitle>
 *       <DialogDescription>A basic dialog example.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <Button>Got it</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simple Dialog</DialogTitle>
          <DialogDescription>
            This is a basic dialog with a title and description. Use it as a
            starting point.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Dialog containing a form with input fields. Common pattern for collecting
 * user data without navigating away from the current page.
 *
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Edit profile</DialogTitle>
 *   </DialogHeader>
 *   <div className="grid gap-4 py-2">
 *     <Label htmlFor="name">Name</Label>
 *     <Input id="name" defaultValue="Sarah Johnson" />
 *   </div>
 *   <DialogFooter>
 *     <Button variant="outline">Cancel</Button>
 *     <Button>Save changes</Button>
 *   </DialogFooter>
 * </DialogContent>
 * ```
 */
export const WithForm: Story = {
  name: "With Form",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your personal information. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="ep-first">First name</Label>
              <Input id="ep-first" defaultValue="Sarah" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ep-last">Last name</Label>
              <Input id="ep-last" defaultValue="Johnson" />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ep-username">Username</Label>
            <Input id="ep-username" defaultValue="@sarahj" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ep-role">Role</Label>
            <Select defaultValue="designer">
              <SelectTrigger id="ep-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="product">Product Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ep-bio">Bio</Label>
            <Textarea
              id="ep-bio"
              defaultValue="Lead Product Designer at Aspire."
              rows={3}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Dialog with explicit footer buttons -- a primary action and a cancel. This
 * is the most common footer pattern for confirmation dialogs.
 *
 * ```tsx
 * <DialogFooter>
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Confirm</Button>
 * </DialogFooter>
 * ```
 */
export const WithFooterButtons: Story = {
  name: "With Footer Buttons",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Update Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update notification settings</DialogTitle>
          <DialogDescription>
            Choose how you want to receive campaign notifications.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="ns-email">Email address</Label>
            <Input id="ns-email" type="email" defaultValue="sarah@aspire.io" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ns-freq">Frequency</Label>
            <Select defaultValue="daily">
              <SelectTrigger id="ns-freq">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="daily">Daily digest</SelectItem>
                <SelectItem value="weekly">Weekly summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Dialog without the default close (X) button. Useful when you want to force
 * the user to make an explicit choice via footer buttons.
 *
 * ```tsx
 * <DialogContent showCloseButton={false}>
 *   ...
 * </DialogContent>
 * ```
 */
export const WithoutCloseButton: Story = {
  name: "Without Close Button",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open (No X Button)</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Unsaved changes</DialogTitle>
          <DialogDescription>
            You have unsaved changes. Do you want to save before leaving?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Discard</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Dialog with scrollable body content. When content exceeds the viewport
 * height, the body area scrolls while header and footer stay fixed.
 *
 * ```tsx
 * <DialogContent className="max-h-[85vh]">
 *   <DialogHeader>...</DialogHeader>
 *   <div className="overflow-y-auto pr-2">
 *     {longContent}
 *   </div>
 *   <DialogFooter>...</DialogFooter>
 * </DialogContent>
 * ```
 */
export const ScrollableContent: Story = {
  name: "Scrollable Content",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Terms & Conditions</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please review and accept the terms before continuing.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto pr-2 flex-1 text-sm text-muted-foreground space-y-4">
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </p>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Using `DialogClose` to create custom close buttons inside the dialog body.
 * Wrap any element with `DialogClose` to turn it into a close trigger.
 *
 * ```tsx
 * <DialogClose asChild>
 *   <Button variant="outline">Close</Button>
 * </DialogClose>
 * ```
 */
export const WithDialogClose: Story = {
  name: "With DialogClose",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Copy className="mr-2 h-4 w-4" />
          Share Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Copy the link below to share this campaign with your team.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            readOnly
            defaultValue="https://app.aspire.io/campaigns/summer-2026"
            className="flex-1"
          />
          <Button size="sm" variant="secondary">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Footer with a built-in close button via `showCloseButton` prop on
 * `DialogFooter`. Renders an outline "Close" button automatically.
 *
 * ```tsx
 * <DialogFooter showCloseButton>
 *   <Button>Submit</Button>
 * </DialogFooter>
 * ```
 */
export const FooterWithCloseButton: Story = {
  name: "Footer showCloseButton",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open (Footer Close)</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Feedback submitted</DialogTitle>
          <DialogDescription>
            Thank you for your feedback. We will review it shortly.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button>Submit another</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// ─── ASPIRE REAL-WORLD EXAMPLES ─────────────────────

/**
 * Aspire invite team member dialog. Collects email, role, and an optional
 * personal message before sending an invitation.
 *
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button><UserPlus className="mr-2 h-4 w-4" />Invite Member</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Invite team member</DialogTitle>
 *     </DialogHeader>
 *     ...form fields...
 *     <DialogFooter>
 *       <Button>Send invitation</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export const AspireInviteTeamMember: Story = {
  name: "Aspire -- Invite Team Member",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
          <DialogDescription>
            Send an invitation to join your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="inv-email">Email address</Label>
            <Input
              id="inv-email"
              type="email"
              placeholder="colleague@company.com"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="inv-role">Role</Label>
            <Select defaultValue="viewer">
              <SelectTrigger id="inv-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin -- Full access</SelectItem>
                <SelectItem value="editor">Editor -- Can edit</SelectItem>
                <SelectItem value="viewer">Viewer -- Read only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="inv-msg">Personal message (optional)</Label>
            <Textarea
              id="inv-msg"
              placeholder="Hey, I'd like to invite you to collaborate on..."
              rows={3}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full">Send invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Aspire edit campaign dialog. Lets the user quickly rename a campaign and
 * update its description without leaving the list view.
 */
export const AspireEditCampaign: Story = {
  name: "Aspire -- Edit Campaign",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit campaign</DialogTitle>
          <DialogDescription>
            Update campaign details. Changes are saved immediately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="ec-name">Campaign name</Label>
            <Input id="ec-name" defaultValue="Summer Collection 2026" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ec-desc">Description</Label>
            <Textarea
              id="ec-desc"
              defaultValue="Promote the new summer collection with top-tier lifestyle creators across Instagram and TikTok."
              rows={3}
              className="resize-none"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ec-status">Status</Label>
            <Select defaultValue="active">
              <SelectTrigger id="ec-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Aspire confirm action dialog with a destructive pattern. Uses an icon and
 * warning color to clearly communicate the severity of the action.
 */
export const AspireConfirmAction: Story = {
  name: "Aspire -- Confirm Delete",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Delete campaign?</DialogTitle>
              <DialogDescription className="mt-0.5">
                "Summer Collection 2026" will be permanently deleted.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone. All campaign data, creator assignments,
          analytics, and content will be permanently removed.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Interaction test: clicks the trigger button and verifies the dialog title
 * becomes visible in the DOM.
 */
export const OpenDialogTest: Story = {
  name: "Test -- Open Dialog",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Test Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test Dialog Title</DialogTitle>
          <DialogDescription>
            This dialog is used for interaction testing.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Open Test Dialog" })
    await userEvent.click(trigger)
    // Dialog renders in a portal, so query the whole document body
    const body = within(document.body)
    const title = await body.findByText("Test Dialog Title")
    await expect(title).toBeVisible()
  },
}

/**
 * Interaction test: opens the dialog and verifies the description text is
 * rendered alongside the title.
 */
export const VerifyDescriptionTest: Story = {
  name: "Test -- Verify Description",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Description Test</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Description Test</DialogTitle>
          <DialogDescription>
            This description should be visible after opening.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", {
      name: "Open Description Test",
    })
    await userEvent.click(trigger)
    const body = within(document.body)
    const description = await body.findByText(
      "This description should be visible after opening."
    )
    await expect(description).toBeVisible()
  },
}
