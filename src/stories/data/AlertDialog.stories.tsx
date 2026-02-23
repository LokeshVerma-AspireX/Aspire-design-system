import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Trash2,
  LogOut,
  AlertTriangle,
  UserMinus,
  FileX,
  Save,
  ShieldAlert,
  Megaphone,
} from "lucide-react"

/**
 * # AlertDialog
 *
 * A modal dialog that interrupts the user with important content and expects
 * a response. Built on Radix UI AlertDialog primitive with overlay, animation,
 * and focus trapping.
 *
 * ## When to Use
 * - To confirm destructive or irreversible actions (delete, remove, discard)
 * - When the user must acknowledge important information before proceeding
 * - For actions that have significant consequences and need explicit confirmation
 *
 * ## When NOT to Use
 * - For non-blocking information -- use Alert (inline) or Toast instead
 * - For forms or complex interactions -- use Dialog instead
 * - For simple choices -- use a dropdown or inline buttons
 * - For navigation confirmations -- use the browser's built-in `beforeunload`
 *
 * ## Accessibility
 * - Traps focus within the dialog when open
 * - Escape key closes the dialog (via Cancel action)
 * - Background overlay prevents interaction with the rest of the page
 * - `AlertDialogTitle` and `AlertDialogDescription` are announced by screen readers
 * - Cancel button receives initial focus by default
 *
 * ## Import
 * ```tsx
 * import {
 *   AlertDialog,
 *   AlertDialogAction,
 *   AlertDialogCancel,
 *   AlertDialogContent,
 *   AlertDialogDescription,
 *   AlertDialogFooter,
 *   AlertDialogHeader,
 *   AlertDialogTitle,
 *   AlertDialogTrigger,
 * } from '@/components/ui/alert-dialog'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger asChild>
 *     <Button variant="outline">Open</Button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         This action cannot be undone.
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Continue</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
const meta: Meta<typeof AlertDialog> = {
  title: "4. Components/Feedback/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modal dialog that interrupts the user with important content requiring acknowledgment. Use for destructive or irreversible actions like delete, remove, or discard.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description:
        "Controlled open state. Use with `onOpenChange` for controlled usage.",
      table: {
        type: { summary: "boolean" },
        category: "State",
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "The default open state for uncontrolled usage.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback fired when the open state changes.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Events",
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
 * Basic confirmation dialog with neutral action buttons.
 *
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger asChild>
 *     <Button variant="outline">Open Alert</Button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         This action cannot be undone.
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Continue</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open Alert</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/**
 * Destructive delete confirmation with a red action button.
 * The action button uses `variant="destructive"` to signal danger.
 *
 * ```tsx
 * <AlertDialogAction variant="destructive">
 *   Yes, delete everything
 * </AlertDialogAction>
 * ```
 */
export const DestructiveDelete: Story = {
  name: "Destructive Delete",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete account permanently?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium text-foreground">
              This is irreversible.
            </span>{" "}
            All your projects, data, and preferences will be permanently
            deleted. You will not be able to recover them.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep account</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Yes, delete everything
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/**
 * AlertDialog with a media slot. Use `AlertDialogMedia` to display
 * an icon or illustration above the title.
 *
 * ```tsx
 * <AlertDialogHeader>
 *   <AlertDialogMedia>
 *     <ShieldAlert className="text-destructive" />
 *   </AlertDialogMedia>
 *   <AlertDialogTitle>Security Alert</AlertDialogTitle>
 *   <AlertDialogDescription>...</AlertDialogDescription>
 * </AlertDialogHeader>
 * ```
 */
export const WithMedia: Story = {
  name: "With Media",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Security Alert</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10">
            <ShieldAlert className="text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>Suspicious login detected</AlertDialogTitle>
          <AlertDialogDescription>
            We detected a login attempt from an unrecognized device in Berlin,
            Germany. If this was not you, secure your account immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>It was me</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Secure account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/**
 * Small-size dialog variant. Best for brief confirmations.
 * Uses `size="sm"` on `AlertDialogContent` which sets `max-w-xs`
 * and centers the header text.
 *
 * ```tsx
 * <AlertDialogContent size="sm">
 *   ...
 * </AlertDialogContent>
 * ```
 */
export const SmallSize: Story = {
  name: "Small Size",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          Sign out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign back in to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/**
 * Dialog with custom action button variants. Both `AlertDialogAction`
 * and `AlertDialogCancel` accept button `variant` and `size` props.
 *
 * ```tsx
 * <AlertDialogCancel variant="ghost">Nevermind</AlertDialogCancel>
 * <AlertDialogAction variant="secondary">Save Draft</AlertDialogAction>
 * <AlertDialogAction>Publish</AlertDialogAction>
 * ```
 */
export const CustomActions: Story = {
  name: "Custom Actions",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Save Changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes to this campaign. What would you like to
            do?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost">Discard</AlertDialogCancel>
          <AlertDialogAction variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </AlertDialogAction>
          <AlertDialogAction>Publish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// ─── ASPIRE / REAL-WORLD COMPOSITIONS ──────────────

/**
 * Delete campaign confirmation dialog. Common pattern on the Campaigns page.
 *
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger asChild>
 *     <Button variant="destructive" size="sm">
 *       <Trash2 className="mr-2 h-4 w-4" />
 *       Delete Campaign
 *     </Button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Delete "Summer Glow 2025"?</AlertDialogTitle>
 *       ...
 *     </AlertDialogHeader>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
export const DeleteCampaign: Story = {
  name: 'Aspire -- Delete Campaign',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Campaign
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10">
            <Megaphone className="text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Delete &ldquo;Summer Glow 2025&rdquo;?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the campaign, including all creator
            applications, content submissions, and analytics data. Active
            offers will be cancelled. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Campaign</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Campaign
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/**
 * Remove creator from campaign. Asks for confirmation before removing
 * a creator from an active campaign.
 */
export const RemoveCreator: Story = {
  name: "Aspire -- Remove Creator",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserMinus className="mr-2 h-4 w-4" />
          Remove Creator
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove creator from campaign?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove <span className="font-medium text-foreground">Emma Rodriguez</span> from
            the &ldquo;Summer Glow 2025&rdquo; campaign. Any pending deliverables will be
            cancelled and the creator will be notified. You can re-invite them
            later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Creator</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            <UserMinus className="mr-2 h-4 w-4" />
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/**
 * Discard unsaved changes dialog. Shown when navigating away from an
 * unsaved form.
 */
export const DiscardChanges: Story = {
  name: "Aspire -- Discard Changes",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <FileX className="mr-2 h-4 w-4" />
          Leave Page
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes to your offer settings. If you leave now,
            all changes since your last save will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue Editing</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Discard Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/**
 * Confirm by typing pattern. Requires the user to type a specific phrase
 * before the destructive action is enabled.
 *
 * ```tsx
 * const [value, setValue] = useState("")
 * <AlertDialogAction disabled={value !== "delete my workspace"}>
 *   Delete workspace
 * </AlertDialogAction>
 * ```
 */
export const ConfirmByTyping: Story = {
  name: "Aspire -- Confirm by Typing",
  render: () => {
    const [value, setValue] = useState("")
    const CONFIRM_TEXT = "delete my workspace"

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete workspace
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <span>
                This will permanently delete the{" "}
                <strong>Aspire Design</strong> workspace, including all
                campaigns, creators, and billing data.
              </span>
              <span className="block pt-1">
                Type{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                  {CONFIRM_TEXT}
                </code>{" "}
                to confirm.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Label htmlFor="confirm-input" className="sr-only">
              Confirm deletion
            </Label>
            <Input
              id="confirm-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={CONFIRM_TEXT}
              className="text-sm"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setValue("")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={value !== CONFIRM_TEXT}
            >
              Delete workspace
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  },
}

/**
 * Sign out confirmation with small-size dialog.
 */
export const SignOut: Story = {
  name: "Aspire -- Sign Out Confirmation",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign back in to access your Aspire account and
            campaigns.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay signed in</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that clicking the trigger opens the dialog and its content is visible.
 */
export const OpenTest: Story = {
  name: "Test: Open dialog on trigger click",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open Test Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Test Dialog Title</AlertDialogTitle>
          <AlertDialogDescription>
            This dialog should be visible after clicking the trigger.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Click the trigger button
    const trigger = canvas.getByRole("button", { name: "Open Test Dialog" })
    await userEvent.click(trigger)

    // Dialog content should now be visible in the document
    const body = within(document.body)
    await expect(body.getByText("Test Dialog Title")).toBeVisible()
    await expect(
      body.getByText(
        "This dialog should be visible after clicking the trigger."
      )
    ).toBeVisible()
  },
}

/**
 * Verifies that clicking the Cancel button closes the dialog.
 */
export const CancelCloseTest: Story = {
  name: "Test: Cancel closes dialog",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open Cancel Test</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Test</AlertDialogTitle>
          <AlertDialogDescription>
            Clicking Cancel should close this dialog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Open the dialog
    const trigger = canvas.getByRole("button", { name: "Open Cancel Test" })
    await userEvent.click(trigger)

    // Verify dialog is open
    const body = within(document.body)
    await expect(body.getByText("Cancel Test")).toBeVisible()

    // Click Cancel
    const cancelButton = body.getByRole("button", { name: "Cancel" })
    await userEvent.click(cancelButton)

    // Dialog should be closed
    await expect(body.queryByText("Cancel Test")).not.toBeInTheDocument()
  },
}
