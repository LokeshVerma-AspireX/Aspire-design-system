import type { Meta, StoryObj } from "@storybook/react"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import { CopyButton } from "@/components/shared/CopyButton"

/**
 * # CopyButton
 *
 * A small icon button that copies a given string value to the clipboard.
 * On click it swaps the Copy icon for a green Check icon and shows a
 * "Copied!" tooltip for 2 seconds before reverting. The component
 * includes a fallback for environments where `navigator.clipboard` is
 * not available.
 *
 * ## When to Use
 * - Next to tracking links, affiliate URLs, or offer links
 * - Next to promo codes in offer detail pages
 * - Next to creator emails or contact information
 * - In code blocks or configuration snippets
 * - Anywhere a user needs to quickly copy text to their clipboard
 *
 * ## When NOT to Use
 * - For downloading files — use a download button instead
 * - For sharing via social media — use share buttons
 * - For form submissions — use a standard submit button
 * - When the value to copy is editable — use an input with a copy action
 *
 * ## Accessibility
 * - The button has `aria-label="Copy to clipboard"` by default
 * - After copying, the `aria-label` switches to the `copiedLabel` value
 * - The button is keyboard-focusable and activates on Enter/Space
 * - The tooltip provides visual confirmation; the `aria-label` change
 *   provides the same feedback to screen readers
 * - Uses `type="button"` to prevent accidental form submissions
 *
 * ## Import
 * ```tsx
 * import { CopyButton } from '@/components/shared/CopyButton'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <CopyButton value="https://aspire.io/offer/summer10" />
 * <CopyButton value="PROMO20" copiedLabel="Code copied!" />
 * ```
 */
const meta: Meta<typeof CopyButton> = {
  title: "4. Components/Utilities/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Copy-to-clipboard button. Shows a Copy icon; on click switches to a green Check icon and displays a 'Copied!' tooltip for 2 seconds before reverting.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description:
        "The string value that will be copied to the clipboard when the button is clicked.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "-" },
        category: "Core",
      },
    },
    copiedLabel: {
      control: "text",
      description:
        'The tooltip text and `aria-label` shown after a successful copy. Reverts after 2 seconds.',
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Copied!"' },
        category: "Content",
      },
    },
    className: {
      control: "text",
      description:
        "Additional CSS classes merged on the outer `<button>` element via `cn()`.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    iconClassName: {
      control: "text",
      description:
        "Additional CSS classes merged on the inner icon (`<Copy>` or `<Check>`) via `cn()`. Use to override icon sizing.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Appearance",
      },
    },
  },
  args: {
    value: "https://aspire.io/offer/summer-skincare?creator=janedoe",
  },
}

export default meta
type Story = StoryObj<typeof CopyButton>

// ─── CORE VARIANTS ────────────────────────────────

/**
 * Default copy button with the standard "Copied!" feedback. Click to
 * see the icon swap and tooltip animation.
 *
 * ```tsx
 * <CopyButton value="https://aspire.io/offer/summer-skincare" />
 * ```
 */
export const Default: Story = {}

/**
 * Custom copied label — replaces the default "Copied!" tooltip text
 * with a more specific message.
 *
 * ```tsx
 * <CopyButton value="SUMMER10" copiedLabel="Code copied!" />
 * ```
 */
export const CustomCopiedLabel: Story = {
  name: "Custom Copied Label",
  args: {
    value: "SUMMER10",
    copiedLabel: "Code copied!",
  },
}

/**
 * Larger icon variant using `iconClassName` to override the default icon size.
 *
 * ```tsx
 * <CopyButton value="https://aspire.io" iconClassName="size-5" className="size-9" />
 * ```
 */
export const LargerIcon: Story = {
  name: "Larger Icon",
  args: {
    value: "https://aspire.io/offer/summer-skincare",
    iconClassName: "size-5",
    className: "size-9",
  },
}

// ─── IN-CONTEXT COMPOSITIONS ──────────────────────

/**
 * Copy button paired with a URL display — the most common pattern in
 * Aspire for copying tracking links and offer URLs.
 *
 * ```tsx
 * <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
 *   <code className="flex-1 truncate text-xs font-mono">{url}</code>
 *   <CopyButton value={url} />
 * </div>
 * ```
 */
export const InUrlDisplay: Story = {
  name: "In URL Display",
  render: (args) => (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground">
      <code className="flex-1 truncate text-xs text-muted-foreground font-mono">
        {args.value}
      </code>
      <CopyButton {...args} />
    </div>
  ),
}

/**
 * Copy button inside a promo code display — bold code text with
 * custom copied label.
 *
 * ```tsx
 * <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
 *   <code className="flex-1 font-mono text-sm font-bold">SUMMER10</code>
 *   <CopyButton value="SUMMER10" copiedLabel="Code copied!" />
 * </div>
 * ```
 */
export const PromoCode: Story = {
  name: "In Promo Code Block",
  args: {
    value: "SUMMER10",
    copiedLabel: "Code copied!",
  },
  render: (args) => (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground">
      <code className="flex-1 font-mono text-sm font-bold">{args.value}</code>
      <CopyButton {...args} />
    </div>
  ),
}

/**
 * Copy button in a code block context — for API keys, embed codes,
 * or configuration snippets.
 *
 * ```tsx
 * <div className="relative rounded-lg border bg-slate-950 p-4">
 *   <CopyButton value={code} className="absolute top-2 right-2" />
 *   <pre className="text-sm text-slate-200 font-mono">{code}</pre>
 * </div>
 * ```
 */
export const InCodeBlock: Story = {
  name: "In Code Block",
  args: {
    value: `<script src="https://cdn.aspire.io/tracking.js" data-offer="summer10"></script>`,
    className:
      "absolute top-2 right-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800",
  },
  render: (args) => (
    <div className="relative w-[500px] rounded-lg border border-slate-700 bg-slate-950 p-4 pr-10">
      <CopyButton {...args} />
      <pre className="text-sm text-slate-200 font-mono whitespace-pre-wrap break-all">
        {args.value}
      </pre>
    </div>
  ),
}

// ─── TABLE ROW CONTEXT ────────────────────────────

/**
 * Copy buttons in a table row — typical layout for the Offers table where
 * each row has a tracking link or promo code that can be copied.
 */
export const InTableRow: Story = {
  name: "In Table Row",
  render: () => (
    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
      <thead className="bg-muted/40">
        <tr>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Creator
          </th>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Tracking Link
          </th>
          <th className="px-4 py-2 text-left font-medium text-muted-foreground">
            Promo Code
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {[
          {
            name: "Jane Doe",
            link: "https://aspire.io/t/jane-summer10",
            code: "JANE10",
          },
          {
            name: "Alex Kim",
            link: "https://aspire.io/t/alex-fit20",
            code: "ALEXFIT20",
          },
          {
            name: "Mia Tanaka",
            link: "https://aspire.io/t/mia-beauty15",
            code: "MIA15",
          },
        ].map((row) => (
          <tr key={row.name} className="bg-background">
            <td className="px-4 py-2 font-medium">{row.name}</td>
            <td className="px-4 py-2">
              <div className="flex items-center gap-1.5">
                <code className="truncate max-w-48 text-xs text-muted-foreground font-mono">
                  {row.link}
                </code>
                <CopyButton value={row.link} />
              </div>
            </td>
            <td className="px-4 py-2">
              <div className="flex items-center gap-1.5">
                <code className="text-xs font-mono font-medium">
                  {row.code}
                </code>
                <CopyButton value={row.code} copiedLabel="Code copied!" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}

// ─── REAL-WORLD ASPIRE SCENARIOS ──────────────────

/**
 * Copy tracking link — the primary use case in the Offer Detail page
 * where a brand manager copies a creator's unique tracking URL.
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <span className="text-sm font-medium">Tracking Link</span>
 *   <code className="text-xs font-mono">{trackingUrl}</code>
 *   <CopyButton value={trackingUrl} />
 * </div>
 * ```
 */
export const CopyTrackingLink: Story = {
  name: "Real World — Copy Tracking Link",
  args: {
    value: "https://aspire.io/t/janedoe-summer-skincare-2026",
  },
  render: (args) => (
    <div className="w-96 rounded-lg border border-border bg-card p-4 space-y-2">
      <div className="text-sm font-semibold text-foreground">Tracking Link</div>
      <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2">
        <code className="flex-1 truncate text-xs text-muted-foreground font-mono">
          {args.value}
        </code>
        <CopyButton {...args} />
      </div>
      <p className="text-xs text-muted-foreground">
        Share this link with the creator. Clicks and conversions will be tracked
        automatically.
      </p>
    </div>
  ),
}

/**
 * Copy promo code — used in offer cards and the offers table to let
 * users quickly copy discount codes.
 */
export const CopyPromoCode: Story = {
  name: "Real World — Copy Promo Code",
  args: {
    value: "SUMMERGLOW20",
    copiedLabel: "Promo code copied!",
  },
  render: (args) => (
    <div className="w-72 rounded-lg border border-border bg-card p-4 space-y-2">
      <div className="text-sm font-semibold text-foreground">Promo Code</div>
      <div className="flex items-center justify-between rounded-md border border-dashed border-border bg-muted/30 px-4 py-3">
        <span className="font-mono text-lg font-bold tracking-wider text-foreground">
          {args.value}
        </span>
        <CopyButton {...args} />
      </div>
      <p className="text-xs text-muted-foreground">20% off — Summer Glow Campaign</p>
    </div>
  ),
}

/**
 * Copy creator email — used in the Contact Detail page to copy a
 * creator's email address for outreach.
 */
export const CopyCreatorEmail: Story = {
  name: "Real World — Copy Creator Email",
  args: {
    value: "jane.doe@example.com",
    copiedLabel: "Email copied!",
  },
  render: (args) => (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
      <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
        JD
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">Jane Doe</p>
        <p className="text-xs text-muted-foreground truncate">{args.value}</p>
      </div>
      <CopyButton {...args} />
    </div>
  ),
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that the copy button renders with the correct initial aria-label
 * and that clicking it changes the aria-label to the copied state.
 */
export const CopyButtonClickTest: Story = {
  name: "Test: Click changes aria-label to copied state",
  args: {
    value: "test-value-to-copy",
    copiedLabel: "Copied!",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Before click: aria-label should be "Copy to clipboard"
    const button = canvas.getByRole("button", { name: "Copy to clipboard" })
    await expect(button).toBeInTheDocument()
    // Click the button
    await userEvent.click(button)
    // After click: aria-label changes asynchronously (clipboard API is async)
    const copiedButton = await canvas.findByRole("button", { name: "Copied!" }, { timeout: 3000 })
    await expect(copiedButton).toBeInTheDocument()
  },
}

/**
 * Verifies that a custom `copiedLabel` is applied as the aria-label
 * after clicking the copy button.
 */
export const CustomCopiedLabelTest: Story = {
  name: "Test: Custom copiedLabel applied after click",
  args: {
    value: "PROMO-CODE-123",
    copiedLabel: "Code copied!",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Copy to clipboard" })
    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    // Custom copiedLabel should now be the aria-label (async clipboard API)
    const copiedButton = await canvas.findByRole("button", { name: "Code copied!" }, { timeout: 3000 })
    await expect(copiedButton).toBeInTheDocument()
  },
}

/**
 * Verifies that the button is keyboard-accessible and can be
 * activated via keyboard.
 */
export const KeyboardAccessibilityTest: Story = {
  name: "Test: Keyboard activation",
  args: {
    value: "keyboard-test-value",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Copy to clipboard" })
    // Focus the button via tab
    await userEvent.tab()
    await expect(button).toHaveFocus()
    // Activate via Enter key
    await userEvent.keyboard("{Enter}")
    // After activation, aria-label changes asynchronously (clipboard API is async)
    const copiedButton = await canvas.findByRole("button", { name: "Copied!" }, { timeout: 3000 })
    await expect(copiedButton).toBeInTheDocument()
  },
}
