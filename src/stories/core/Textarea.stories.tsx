import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

/**
 * # Textarea
 *
 * A styled wrapper around the native HTML `<textarea>` element. It provides
 * consistent Aspire Design System styling, focus rings, and built-in support
 * for `aria-invalid` error states. The component uses CSS `field-sizing: content`
 * for automatic height adjustment based on content.
 *
 * ## When to Use
 * - Multi-line text entry (bios, descriptions, campaign briefs)
 * - Message or comment composition
 * - Feedback forms requiring longer responses
 * - Any form field where the user may type more than a single line
 *
 * ## When NOT to Use
 * - Single-line inputs (name, email) — use **Input** instead
 * - Rich text with formatting — use a dedicated rich-text editor
 * - Code editing — use a code editor component
 * - Selecting from options — use **Select** or **Combobox**
 *
 * ## Accessibility
 * - Always pair with a `<Label>` using matching `htmlFor` / `id` attributes
 * - Use `aria-describedby` to link helper or error text
 * - Use `aria-invalid="true"` to signal validation errors (built-in styling)
 * - Set `maxLength` when a character limit is required so assistive technology announces it
 * - Disabled textareas are removed from the tab order automatically
 *
 * ## Import
 * ```tsx
 * import { Textarea } from '@/components/ui/textarea'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Textarea placeholder="Describe your campaign brief..." rows={4} />
 * ```
 */
const meta: Meta<typeof Textarea> = {
  title: "3. Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-line text input for longer content like messages, descriptions, and bios. Supports field-sizing for auto-grow behaviour.",
      },
    },
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text displayed when the textarea is empty.",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },
    rows: {
      control: { type: "number", min: 1, max: 20 },
      description:
        "Number of visible text lines. The textarea may still auto-grow beyond this via `field-sizing: content`.",
      table: {
        type: { summary: "number" },
        category: "Appearance",
      },
    },
    disabled: {
      control: "boolean",
      description:
        "Disables the textarea, preventing interaction and reducing opacity to 50%.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    readOnly: {
      control: "boolean",
      description:
        "Makes the textarea read-only. Value is submitted with the form but cannot be edited.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    maxLength: {
      control: { type: "number", min: 0 },
      description:
        "Maximum number of characters allowed. The browser prevents further input once the limit is reached.",
      table: {
        type: { summary: "number" },
        category: "Validation",
      },
    },
    defaultValue: {
      control: "text",
      description: "The initial uncontrolled value of the textarea.",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes merged via `cn()` utility.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    onChange: {
      action: "changed",
      description: "Fires when the textarea value changes.",
      table: {
        type: { summary: "(e: ChangeEvent<HTMLTextAreaElement>) => void" },
        category: "Events",
      },
    },
    onFocus: {
      action: "focused",
      description: "Fires when the textarea receives focus.",
      table: {
        type: { summary: "(e: FocusEvent<HTMLTextAreaElement>) => void" },
        category: "Events",
      },
    },
    onBlur: {
      action: "blurred",
      description: "Fires when the textarea loses focus.",
      table: {
        type: { summary: "(e: FocusEvent<HTMLTextAreaElement>) => void" },
        category: "Events",
      },
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

// ─── CORE VARIANTS ────────────────────────────────

/**
 * Default textarea with placeholder. Uses CSS `field-sizing: content`
 * so it auto-grows with content.
 *
 * ```tsx
 * <Textarea placeholder="Enter your message..." />
 * ```
 */
export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
  },
}

/**
 * Textarea with an explicit row count. Sets the initial visible height.
 *
 * ```tsx
 * <Textarea placeholder="Campaign brief..." rows={6} />
 * ```
 */
export const CustomRows: Story = {
  name: "Custom Row Count (6 rows)",
  args: {
    placeholder: "Campaign brief...",
    rows: 6,
  },
}

/**
 * Small textarea (2 rows) for compact layouts.
 *
 * ```tsx
 * <Textarea placeholder="Short note..." rows={2} />
 * ```
 */
export const SmallRows: Story = {
  name: "Small (2 rows)",
  args: {
    placeholder: "Short note...",
    rows: 2,
  },
}

/**
 * Large textarea (10 rows) for long-form content.
 *
 * ```tsx
 * <Textarea placeholder="Write your article..." rows={10} />
 * ```
 */
export const LargeRows: Story = {
  name: "Large (10 rows)",
  args: {
    placeholder: "Write your article...",
    rows: 10,
  },
}

// ─── STATES ───────────────────────────────────────

/**
 * Textarea with a pre-filled value.
 *
 * ```tsx
 * <Textarea defaultValue="We're looking for lifestyle creators..." rows={4} />
 * ```
 */
export const WithValue: Story = {
  name: "With Value",
  args: {
    defaultValue:
      "We're looking for lifestyle creators with 10K+ followers to promote our new skincare line. Content should feel authentic and align with a clean aesthetic.",
    rows: 4,
  },
}

/**
 * Disabled state. Pointer events are blocked and opacity is reduced.
 *
 * ```tsx
 * <Textarea disabled defaultValue="This brief has been finalized." rows={3} />
 * ```
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "This brief has been finalized and cannot be edited.",
    rows: 3,
  },
}

/**
 * Read-only state. Value is visible and selectable but not editable.
 *
 * ```tsx
 * <Textarea readOnly defaultValue="Terms and conditions text..." rows={4} />
 * ```
 */
export const ReadOnly: Story = {
  name: "Read Only",
  args: {
    readOnly: true,
    defaultValue:
      "By participating in this campaign, you agree to post at least 2 Instagram Reels and 1 Story within the campaign period. All content must be approved before publishing.",
    rows: 4,
  },
}

/**
 * Error state using `aria-invalid`. The component has built-in destructive
 * ring and border styling.
 *
 * ```tsx
 * <Textarea aria-invalid="true" placeholder="Required field" rows={4} />
 * ```
 */
export const ErrorState: Story = {
  name: "Error State (aria-invalid)",
  args: {
    "aria-invalid": "true",
    placeholder: "Required field",
    rows: 4,
  },
}

/**
 * Textarea with `resize-none` to prevent manual resizing.
 *
 * ```tsx
 * <Textarea placeholder="No resize allowed..." rows={4} className="resize-none" />
 * ```
 */
export const NoResize: Story = {
  name: "No Resize",
  args: {
    placeholder: "No resize allowed...",
    rows: 4,
    className: "resize-none",
  },
}

// ─── COMPOSITIONS ─────────────────────────────────

/**
 * Textarea paired with a Label.
 *
 * ```tsx
 * <div className="grid w-80 gap-1.5">
 *   <Label htmlFor="bio">Creator bio</Label>
 *   <Textarea id="bio" placeholder="Tell brands about yourself..." rows={4} />
 * </div>
 * ```
 */
export const WithLabel: Story = {
  name: "With Label",
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="bio">Creator bio</Label>
      <Textarea
        id="bio"
        placeholder="Tell brands about yourself..."
        rows={4}
      />
    </div>
  ),
}

/**
 * Textarea with Label, helper text, and `aria-describedby`.
 *
 * ```tsx
 * <div className="grid w-80 gap-1.5">
 *   <Label htmlFor="brief">Campaign brief</Label>
 *   <Textarea id="brief" placeholder="Describe deliverables..." rows={5} aria-describedby="brief-hint" />
 *   <p id="brief-hint" className="text-xs text-muted-foreground">
 *     Include deliverable types, timeline, and brand guidelines.
 *   </p>
 * </div>
 * ```
 */
export const WithLabelAndHelper: Story = {
  name: "With Label + Helper Text",
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="brief">Campaign brief</Label>
      <Textarea
        id="brief"
        placeholder="Describe deliverables, timeline, and guidelines..."
        rows={5}
        aria-describedby="brief-hint"
      />
      <p id="brief-hint" className="text-xs text-muted-foreground">
        Include deliverable types, timeline, and brand guidelines.
      </p>
    </div>
  ),
}

/**
 * Validation error with destructive label, `aria-invalid`, and error text.
 *
 * ```tsx
 * <div className="grid w-80 gap-1.5">
 *   <Label htmlFor="ta-err" className="text-destructive">Description</Label>
 *   <Textarea id="ta-err" aria-invalid="true" aria-describedby="ta-err-msg" rows={4} />
 *   <p id="ta-err-msg" className="text-sm text-destructive">Description is required.</p>
 * </div>
 * ```
 */
export const WithError: Story = {
  name: "With Validation Error",
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="ta-err" className="text-destructive">
        Description
      </Label>
      <Textarea
        id="ta-err"
        aria-invalid="true"
        placeholder="Required field"
        rows={4}
        aria-describedby="ta-err-msg"
      />
      <p id="ta-err-msg" className="text-sm text-destructive">
        Description is required.
      </p>
    </div>
  ),
}

/**
 * Character counter pattern with live word count and remaining characters.
 * The border color shifts to amber when nearing the limit.
 *
 * ```tsx
 * const MAX = 280
 * const [value, setValue] = useState("")
 * const remaining = MAX - value.length
 *
 * <Textarea value={value} onChange={e => setValue(e.target.value)} maxLength={MAX} />
 * <span>{remaining} remaining</span>
 * ```
 */
export const WithCharacterCounter: Story = {
  name: "With Character Counter",
  render: () => {
    const MAX = 280
    const [value, setValue] = useState("")
    const remaining = MAX - value.length
    return (
      <div className="grid w-80 gap-1.5">
        <Label htmlFor="post-caption">Post caption</Label>
        <Textarea
          id="post-caption"
          placeholder="Write a compelling caption for your post..."
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={MAX}
          className={
            remaining < 30
              ? "border-amber-400 focus-visible:ring-amber-400"
              : ""
          }
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {value.length > 0
              ? `${value.split(/\s+/).filter(Boolean).length} words`
              : "Start typing..."}
          </span>
          <span
            className={remaining < 30 ? "font-medium text-amber-500" : ""}
          >
            {remaining} / {MAX}
          </span>
        </div>
      </div>
    )
  },
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Comment box pattern with avatar, textarea, and action buttons.
 *
 * ```tsx
 * <div className="flex gap-3">
 *   <Avatar className="h-8 w-8">...</Avatar>
 *   <div className="flex-1 space-y-2">
 *     <Textarea placeholder="Add a comment..." rows={3} className="resize-none" />
 *     <div className="flex justify-end gap-2">
 *       <Button variant="ghost" size="sm">Cancel</Button>
 *       <Button size="sm"><Send /> Comment</Button>
 *     </div>
 *   </div>
 * </div>
 * ```
 */
export const CommentBox: Story = {
  name: "Real World — Comment Box",
  render: () => {
    const [comment, setComment] = useState("")
    return (
      <div className="w-96 space-y-3 rounded-lg border bg-card p-4">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Emma Rodriguez"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment on this creator's content..."
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setComment("")}
                disabled={!comment}
              >
                Cancel
              </Button>
              <Button size="sm" disabled={!comment.trim()}>
                <Send className="mr-2 h-3 w-3" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Campaign feedback form with subject input and message textarea.
 */
export const FeedbackForm: Story = {
  name: "Real World — Campaign Feedback",
  render: () => (
    <div className="w-96 space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h3 className="font-semibold">Campaign Feedback</h3>
        <p className="text-sm text-muted-foreground">
          Share your experience with this campaign
        </p>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fb-subject">Subject</Label>
        <input
          id="fb-subject"
          className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs"
          placeholder="e.g. Content approval delay"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fb-body">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="fb-body"
          placeholder="Describe what went well or what could be improved..."
          rows={5}
          className="resize-none"
        />
      </div>
      <Button className="w-full">Submit Feedback</Button>
    </div>
  ),
}

/**
 * Campaign brief editor with a large textarea for detailed content.
 */
export const CampaignBrief: Story = {
  name: "Real World — Campaign Brief Editor",
  render: () => {
    const [brief, setBrief] = useState(
      "We are looking for micro-influencers (10K-50K followers) in the beauty and skincare niche. Content should highlight our new vitamin C serum with before/after visuals."
    )
    return (
      <div className="w-[480px] space-y-4 rounded-lg border bg-card p-6">
        <div>
          <h3 className="font-semibold">Campaign Brief</h3>
          <p className="text-sm text-muted-foreground">
            Summer Glow 2025 — Edit the brief below
          </p>
        </div>
        <div className="grid gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="brief-editor">Brief content</Label>
            <span className="text-xs text-muted-foreground">
              {brief.length} characters
            </span>
          </div>
          <Textarea
            id="brief-editor"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={8}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Publish Brief</Button>
        </div>
      </div>
    )
  },
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that typing into the textarea updates the value and fires onChange.
 */
export const TypingTest: Story = {
  name: "Test: Typing fires onChange",
  args: {
    placeholder: "Type here...",
    rows: 3,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByPlaceholderText("Type here...")
    await userEvent.click(textarea)
    await userEvent.type(textarea, "Hello from Aspire!")
    await expect(textarea).toHaveValue("Hello from Aspire!")
    await expect(args.onChange).toHaveBeenCalled()
  },
}

/**
 * Verifies that focus and blur events fire correctly.
 */
export const FocusBlurTest: Story = {
  name: "Test: Focus and Blur events",
  args: {
    placeholder: "Focus me...",
    rows: 3,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByPlaceholderText("Focus me...")
    await userEvent.click(textarea)
    await expect(args.onFocus).toHaveBeenCalledTimes(1)
    await userEvent.tab()
    await expect(args.onBlur).toHaveBeenCalledTimes(1)
  },
}

/**
 * Verifies that a disabled textarea cannot receive input.
 */
export const DisabledInteractionTest: Story = {
  name: "Test: Disabled prevents input",
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
    rows: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByPlaceholderText("Disabled textarea")
    await expect(textarea).toBeDisabled()
  },
}
