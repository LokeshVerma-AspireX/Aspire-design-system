import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Terminal,
  AlertTriangle,
  X,
  CreditCard,
  Wifi,
  Megaphone,
  ShieldAlert,
  Clock,
} from "lucide-react"

/**
 * # Alert
 *
 * A banner-style notification component used to display inline messages.
 * Supports an optional icon, title, and description with two built-in
 * variants: `default` and `destructive`.
 *
 * ## When to Use
 * - To show inline page-level feedback (success, error, warning, info)
 * - For form validation error summaries
 * - For system status messages or announcements
 * - To communicate non-blocking information that does not require immediate action
 *
 * ## When NOT to Use
 * - For blocking confirmations -- use AlertDialog instead
 * - For transient notifications -- use Toast instead
 * - For inline field-level validation -- use helper text below the input
 * - For global navigation banners -- use a dedicated banner component
 *
 * ## Accessibility
 * - Renders with `role="alert"` which announces content to screen readers
 * - Icons are decorative and hidden from assistive technology via the grid layout
 * - Use semantic variants (`destructive`) to communicate severity; do not rely on color alone
 * - Pair with descriptive text so the message is clear without visual cues
 *
 * ## Import
 * ```tsx
 * import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Alert>
 *   <Terminal className="h-4 w-4" />
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>
 *     You can add components using the CLI.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
const meta: Meta<typeof Alert> = {
  title: "4. Components/Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Banner-style notification with icon, title, and description. Use for inline page messages. Supports `default` and `destructive` variants.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description:
        'Visual style of the alert. `"default"` for neutral/info messages, `"destructive"` for errors.',
      table: {
        type: { summary: '"default" | "destructive"' },
        defaultValue: { summary: "default" },
        category: "Appearance",
      },
    },
    className: {
      control: "text",
      description:
        "Additional CSS classes merged via `cn()`. Use to apply custom color schemes for success, warning, or info styles.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    children: {
      control: false,
      description:
        "Alert content. Typically includes an icon (SVG), AlertTitle, and AlertDescription.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── CORE VARIANTS ─────────────────────────────────

/**
 * Default alert variant. Used for general information and neutral messages.
 *
 * ```tsx
 * <Alert>
 *   <Terminal className="h-4 w-4" />
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>
 *     You can add components to your app using the CLI.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * Destructive variant for error messages and critical failures.
 *
 * ```tsx
 * <Alert variant="destructive">
 *   <AlertCircle className="h-4 w-4" />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>
 *     Your session has expired. Please log in again.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
}

// ─── ICON VARIANTS ─────────────────────────────────

/**
 * Info-style alert using `default` variant with custom blue styling.
 *
 * ```tsx
 * <Alert className="border-blue-500/50 bg-blue-50 text-blue-800 [&>svg]:text-blue-600">
 *   <Info className="h-4 w-4" />
 *   <AlertTitle>New feature available</AlertTitle>
 *   <AlertDescription>...</AlertDescription>
 * </Alert>
 * ```
 */
export const InfoStyle: Story = {
  name: "Info Style",
  render: () => (
    <Alert className="w-96 border-blue-500/50 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-blue-400 [&>svg]:text-blue-600">
      <Info className="h-4 w-4" />
      <AlertTitle>New feature available</AlertTitle>
      <AlertDescription>
        Dark mode is now available. Toggle it in Settings &rarr; Appearance.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * Success-style alert using `default` variant with custom green styling
 * and a CheckCircle2 icon.
 *
 * ```tsx
 * <Alert className="border-emerald-500/50 bg-emerald-50 text-emerald-800 [&>svg]:text-emerald-600">
 *   <CheckCircle2 className="h-4 w-4" />
 *   <AlertTitle>Success!</AlertTitle>
 *   <AlertDescription>...</AlertDescription>
 * </Alert>
 * ```
 */
export const SuccessStyle: Story = {
  name: "Success Style",
  render: () => (
    <Alert className="w-96 border-emerald-500/50 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-400 [&>svg]:text-emerald-600">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * Warning-style alert using custom amber styling.
 *
 * ```tsx
 * <Alert className="border-amber-500/50 bg-amber-50 text-amber-800 [&>svg]:text-amber-600">
 *   <AlertTriangle className="h-4 w-4" />
 *   <AlertTitle>Warning</AlertTitle>
 *   <AlertDescription>...</AlertDescription>
 * </Alert>
 * ```
 */
export const WarningStyle: Story = {
  name: "Warning Style",
  render: () => (
    <Alert className="w-96 border-amber-500/50 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-400 [&>svg]:text-amber-600">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your subscription will expire in 3 days. Renew now to avoid
        interruption.
      </AlertDescription>
    </Alert>
  ),
}

// ─── COMPOSITION VARIANTS ──────────────────────────

/**
 * Alert without a title. Useful for brief inline messages.
 *
 * ```tsx
 * <Alert>
 *   <Info className="h-4 w-4" />
 *   <AlertDescription>
 *     Campaign data is refreshed every 15 minutes.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
export const WithoutTitle: Story = {
  name: "Without Title",
  render: () => (
    <Alert className="w-96">
      <Info className="h-4 w-4" />
      <AlertDescription>
        Campaign data is refreshed every 15 minutes.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * Alert without a description. Use when the title is self-explanatory.
 *
 * ```tsx
 * <Alert>
 *   <CheckCircle2 className="h-4 w-4" />
 *   <AlertTitle>Changes saved successfully.</AlertTitle>
 * </Alert>
 * ```
 */
export const WithoutDescription: Story = {
  name: "Without Description",
  render: () => (
    <Alert className="w-96 border-emerald-500/50 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-400 [&>svg]:text-emerald-600">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Changes saved successfully.</AlertTitle>
    </Alert>
  ),
}

/**
 * Alert without any icon. Falls back to single-column grid layout.
 *
 * ```tsx
 * <Alert>
 *   <AlertTitle>Note</AlertTitle>
 *   <AlertDescription>
 *     This alert has no icon, so the layout adjusts automatically.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
export const WithoutIcon: Story = {
  name: "Without Icon",
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        This alert has no icon, so the layout adjusts automatically to a
        single-column grid.
      </AlertDescription>
    </Alert>
  ),
}

// ─── ALL VARIANTS GALLERY ──────────────────────────

/** Side-by-side comparison of all alert styles. */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="w-[520px] space-y-3">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Neutral informational alert.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>Error or critical failure alert.</AlertDescription>
      </Alert>
      <Alert className="border-blue-500/50 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-blue-400 [&>svg]:text-blue-600">
        <Info className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          Informational message with custom styling.
        </AlertDescription>
      </Alert>
      <Alert className="border-emerald-500/50 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-400 [&>svg]:text-emerald-600">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Action completed successfully.</AlertDescription>
      </Alert>
      <Alert className="border-amber-500/50 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-400 [&>svg]:text-amber-600">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Caution or attention needed.</AlertDescription>
      </Alert>
    </div>
  ),
}

// ─── ASPIRE / REAL-WORLD COMPOSITIONS ──────────────

/**
 * Campaign published success notification.
 *
 * ```tsx
 * <Alert className="border-emerald-500/50 bg-emerald-50 ...">
 *   <CheckCircle2 className="h-4 w-4" />
 *   <AlertTitle>Campaign published!</AlertTitle>
 *   <AlertDescription>
 *     "Summer Glow 2025" is now live and accepting creator applications.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
export const CampaignPublished: Story = {
  name: "Aspire -- Campaign Published",
  render: () => (
    <Alert className="w-[480px] border-emerald-500/50 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-400 [&>svg]:text-emerald-600">
      <Megaphone className="h-4 w-4" />
      <AlertTitle>Campaign published!</AlertTitle>
      <AlertDescription>
        &ldquo;Summer Glow 2025&rdquo; is now live and accepting creator
        applications. Creators will be notified based on your targeting
        settings.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * Payment failure alert for the billing section.
 *
 * ```tsx
 * <Alert variant="destructive">
 *   <CreditCard className="h-4 w-4" />
 *   <AlertTitle>Payment failed</AlertTitle>
 *   <AlertDescription>...</AlertDescription>
 * </Alert>
 * ```
 */
export const PaymentFailed: Story = {
  name: "Aspire -- Payment Failed",
  render: () => (
    <Alert variant="destructive" className="w-[480px]">
      <CreditCard className="h-4 w-4" />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>
          Your Visa ending in 4242 was declined. Update your payment method to
          continue.
        </span>
        <Button
          size="sm"
          variant="outline"
          className="ml-3 shrink-0 h-7 border-destructive/30 text-destructive"
        >
          Update
        </Button>
      </AlertDescription>
    </Alert>
  ),
}

/**
 * API rate limit warning alert.
 */
export const APIRateLimit: Story = {
  name: "Aspire -- API Rate Limit",
  render: () => (
    <Alert className="w-[480px] border-amber-500/50 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-400 [&>svg]:text-amber-600">
      <ShieldAlert className="h-4 w-4" />
      <AlertTitle>API rate limit approaching</AlertTitle>
      <AlertDescription>
        You have used 4,800 of your 5,000 monthly API requests. Consider
        upgrading your plan or optimizing your integration to avoid service
        interruption.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * Form validation error summary. Lists multiple errors in a destructive alert.
 *
 * ```tsx
 * <Alert variant="destructive">
 *   <AlertCircle className="h-4 w-4" />
 *   <AlertTitle>Fix the following errors</AlertTitle>
 *   <AlertDescription>
 *     <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
 *       <li>Campaign name is required</li>
 *       <li>Budget must be greater than $0</li>
 *     </ul>
 *   </AlertDescription>
 * </Alert>
 * ```
 */
export const FormValidation: Story = {
  name: "Aspire -- Form Validation Errors",
  render: () => (
    <div className="w-96 space-y-4 rounded-lg border bg-card p-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Fix the following errors</AlertTitle>
        <AlertDescription>
          <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
            <li>Campaign name is required</li>
            <li>Budget must be greater than $0</li>
            <li>At least one platform must be selected</li>
          </ul>
        </AlertDescription>
      </Alert>
      <div className="space-y-2">
        <div className="h-9 rounded-md border border-destructive bg-background px-3 flex items-center">
          <span className="text-sm text-muted-foreground">
            Campaign name...
          </span>
        </div>
        <div className="h-9 rounded-md border border-destructive bg-background px-3 flex items-center">
          <span className="text-sm text-muted-foreground">$0.00</span>
        </div>
      </div>
      <Button className="w-full">Try Again</Button>
    </div>
  ),
}

/**
 * Dismissible alert with close button and show-again functionality.
 *
 * ```tsx
 * const [visible, setVisible] = useState(true)
 * {visible && (
 *   <Alert>
 *     <AlertTitle>
 *       Update available
 *       <button onClick={() => setVisible(false)} aria-label="Dismiss">
 *         <X className="h-4 w-4" />
 *       </button>
 *     </AlertTitle>
 *     <AlertDescription>...</AlertDescription>
 *   </Alert>
 * )}
 * ```
 */
export const Dismissible: Story = {
  name: "Dismissible Alert",
  render: () => {
    const [visible, setVisible] = useState(true)
    return (
      <div className="w-96">
        {visible ? (
          <Alert className="border-blue-500/50 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-blue-400 [&>svg]:text-blue-600">
            <Info className="h-4 w-4" />
            <AlertTitle className="flex items-start justify-between">
              Creator onboarding tip
              <button
                onClick={() => setVisible(false)}
                className="ml-4 shrink-0 text-blue-600 hover:text-blue-800"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </AlertTitle>
            <AlertDescription>
              Complete your brand profile to get better creator recommendations.
              Go to{" "}
              <span className="font-medium cursor-pointer underline">
                Settings &rarr; Brand Profile
              </span>
              .
            </AlertDescription>
          </Alert>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            Alert dismissed.{" "}
            <button
              className="ml-1 text-primary underline"
              onClick={() => setVisible(true)}
            >
              Show again
            </button>
          </div>
        )}
      </div>
    )
  },
}

/**
 * System status alerts stacked together. Common pattern for a status page
 * or system health section.
 */
export const SystemStatus: Story = {
  name: "Aspire -- System Status Alerts",
  render: () => (
    <div className="w-[520px] space-y-3">
      <Alert className="border-amber-500/50 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-400 [&>svg]:text-amber-600">
        <Wifi className="h-4 w-4" />
        <AlertTitle>Degraded performance</AlertTitle>
        <AlertDescription>
          We are experiencing increased latency in the EU region. Our team is
          investigating.{" "}
          <span className="cursor-pointer font-medium underline">
            Check status page
          </span>
        </AlertDescription>
      </Alert>
      <Alert className="border-emerald-500/50 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-400 [&>svg]:text-emerald-600">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>All systems operational</AlertTitle>
        <AlertDescription>
          API, dashboard, and webhooks are running normally.
        </AlertDescription>
      </Alert>
      <Alert className="border-blue-500/50 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-blue-400 [&>svg]:text-blue-600">
        <Clock className="h-4 w-4" />
        <AlertTitle>Scheduled maintenance</AlertTitle>
        <AlertDescription>
          Platform maintenance is scheduled for Saturday, March 1, 2:00-4:00 AM
          UTC. Expect brief downtime.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that the alert renders with the correct role and content is visible.
 */
export const RoleTest: Story = {
  name: "Test: Alert has role=alert",
  render: () => (
    <Alert className="w-96">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Verification Alert</AlertTitle>
      <AlertDescription>
        This alert should have role=alert for screen readers.
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const alert = canvas.getByRole("alert")
    await expect(alert).toBeInTheDocument()
    await expect(
      canvas.getByText("Verification Alert")
    ).toBeVisible()
    await expect(
      canvas.getByText(
        "This alert should have role=alert for screen readers."
      )
    ).toBeVisible()
  },
}

/**
 * Verifies that the dismissible alert can be closed by clicking the dismiss button.
 */
export const DismissTest: Story = {
  name: "Test: Dismiss button hides alert",
  render: () => {
    const [visible, setVisible] = useState(true)
    return (
      <div className="w-96">
        {visible ? (
          <Alert data-testid="dismissible-alert">
            <Info className="h-4 w-4" />
            <AlertTitle className="flex items-start justify-between">
              Dismissible Test
              <button
                onClick={() => setVisible(false)}
                aria-label="Dismiss"
                className="ml-4 shrink-0 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </AlertTitle>
            <AlertDescription>
              Click the X to dismiss this alert.
            </AlertDescription>
          </Alert>
        ) : (
          <p data-testid="dismissed-message">Alert dismissed.</p>
        )}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Alert should be visible initially
    await expect(canvas.getByText("Dismissible Test")).toBeVisible()

    // Click dismiss button
    const dismissButton = canvas.getByLabelText("Dismiss")
    await userEvent.click(dismissButton)

    // Alert should be gone, dismissed message should appear
    await expect(canvas.queryByText("Dismissible Test")).not.toBeInTheDocument()
    await expect(canvas.getByText("Alert dismissed.")).toBeVisible()
  },
}
