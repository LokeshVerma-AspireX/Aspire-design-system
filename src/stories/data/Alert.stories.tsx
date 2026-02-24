import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  AlertTriangle,
  CheckCircle2,
  Info,
  AlertCircle,
  Bell,
  Megaphone,
  X,
  ShieldAlert,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type AlertType = "default" | "info" | "success" | "warning" | "error";

type AlertIconOption =
  | "auto"
  | "none"
  | "terminal"
  | "info"
  | "check"
  | "warning"
  | "error"
  | "bell"
  | "megaphone"
  | "shield";

type CloseIconOption = "x-icon" | "text";

// ─────────────────────────────────────────────────────────────────────────────
// MAPS
// ─────────────────────────────────────────────────────────────────────────────

/** Maps alert type → shadcn variant name */
const TYPE_TO_VARIANT: Record<AlertType, string> = {
  default: "default",
  info: "info",
  success: "success",
  warning: "warning",
  error: "destructive",
};

/** Default icon per type (used when icon = "auto" and showIcon = true) */
const TYPE_TO_ICON: Record<AlertType, React.ElementType> = {
  default: Terminal,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

/** All selectable icons for the `icon` control */
const ICON_MAP: Record<AlertIconOption, React.ElementType | null> = {
  auto: null, // resolved via type
  none: null,
  terminal: Terminal,
  info: Info,
  check: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  bell: Bell,
  megaphone: Megaphone,
  shield: ShieldAlert,
};

// ─────────────────────────────────────────────────────────────────────────────
// DEMO WRAPPER PROPS — combines AntD + fresh.aspire.io + shadcn props
// ─────────────────────────────────────────────────────────────────────────────

interface AlertDemoProps {
  // ── CONTENT ─────────────────────────────────────────────────────────────
  /** Primary alert text. Displayed as the alert title. (AntD: message / title) */
  message: string;
  /** Supporting detail below the message. Leave empty for compact single-line alerts. */
  description?: string;
  /**
   * Action slot — renders a button next to or below the content.
   * In this demo, provide the button label; in production pass any ReactNode.
   */
  action?: string;
  /**
   * When true, the action button is placed BELOW the description rather than inline.
   * (fresh.aspire.io: subAction)
   */
  subAction?: boolean;

  // ── APPEARANCE ───────────────────────────────────────────────────────────
  /** Visual intent — drives color scheme and auto icon. */
  type?: AlertType;
  /**
   * Show an icon alongside the message.
   * Defaults to the icon matching the `type`. Combine with `icon` to override.
   */
  showIcon?: boolean;
  /**
   * Choose a specific icon. "auto" uses the type default; "none" forces no icon
   * even when `showIcon` is true.
   */
  icon?: AlertIconOption;
  /**
   * Renders as a full-width page banner — removes border-radius and side borders.
   * Automatically sets showIcon to true.
   */
  banner?: boolean;

  // ── CLOSE BEHAVIOR ───────────────────────────────────────────────────────
  /** Show a dismiss control — use `closeIcon` and `closeText` to customize it. */
  closable?: boolean;
  /**
   * How the close control is rendered.
   * "x-icon" = × icon button (default). "text" = use closeText string instead.
   */
  closeIcon?: CloseIconOption;
  /**
   * Text shown as the close trigger when closeIcon is set to "text".
   */
  closeText?: string;

  // ── EVENTS ───────────────────────────────────────────────────────────────
  /** Fired immediately when the × button is clicked. */
  onClose?: () => void;
  /** Fired after the close/exit animation completes. */
  afterClose?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// DEMO COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function AlertDemo({
  message,
  description,
  action,
  subAction = false,
  type = "default",
  showIcon = false,
  icon = "auto",
  banner = false,
  closable = false,
  closeIcon = "x-icon",
  closeText = "Close",
  onClose,
  afterClose,
}: AlertDemoProps) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    setVisible(true);
  }, [
    message,
    type,
    closable,
    banner,
    icon,
    showIcon,
    description,
    action,
    subAction,
    closeIcon,
    closeText,
  ]);

  if (!visible) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Alert dismissed.{" "}
        <button
          type="button"
          className="underline hover:no-underline"
          onClick={() => setVisible(true)}
        >
          Show again
        </button>
      </p>
    );
  }

  // ── Resolve icon ────────────────────────────────────────────────────────
  const effectiveShowIcon = banner ? true : showIcon;
  let IconComponent: React.ElementType | null = null;
  if (effectiveShowIcon) {
    if (icon === "none") {
      IconComponent = null;
    } else if (icon === "auto") {
      IconComponent = TYPE_TO_ICON[type];
    } else {
      IconComponent = ICON_MAP[icon];
    }
  }

  // ── Resolve variant ─────────────────────────────────────────────────────
  const variant = TYPE_TO_VARIANT[type] as any;

  // ── Derived state ───────────────────────────────────────────────────────
  const hasDescription = !!description;
  const hasInlineAction = !subAction && !!action;
  const hasControls = hasInlineAction || closable;

  // ── Action button ───────────────────────────────────────────────────────
  const actionButton = action ? (
    <Button
      variant="outline"
      size="sm"
      onClick={() => console.log("action clicked")}
    >
      {action}
    </Button>
  ) : null;

  // ── Close control ───────────────────────────────────────────────────────
const closeTimerRef = React.useRef<number>();

  const handleClose = () => {
    // clear any pending timer from previous close
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    onClose?.();
    setVisible(false);
    closeTimerRef.current = window.setTimeout(() => afterClose?.(), 300);
  };

  // cleanup timer on unmount to avoid calling afterClose after component is gone
  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const closeControl = closable ? (
    closeIcon === "text" ? (
      <button
        className="text-xs underline opacity-70 hover:opacity-100 shrink-0 whitespace-nowrap"
        onClick={handleClose}
      >
        {closeText || "Close"}
      </button>
    ) : (
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 shrink-0 rounded-full opacity-60 hover:opacity-100"
        onClick={handleClose}
      >
        <X className="h-3.5 w-3.5" />
        <span className="sr-only">Dismiss</span>
      </Button>
    )
  ) : null;

  return (
    <Alert
      variant={variant}
      className={banner ? "rounded-none border-x-0" : undefined}
    >
      {/* Icon — direct SVG child so shadcn's [&>svg]:absolute positioning applies */}
      {IconComponent && <IconComponent className="h-4 w-4" />}

      {/*
        Single wrapper div targeted by [&>svg+div]:translate-y-[-3px].
        - items-center when no description → title + controls share one baseline
        - items-start  when description present → top-aligns everything
        Left indent is handled automatically by [&:has(svg)]:pl-11 on <Alert>.
      */}
      <div
        className={cn(
          "col-start-2 flex w-full gap-3",
          hasDescription ? "items-start" : "items-center"
        )}
      >
        {/* Content — grows to fill available space */}
        <div className="flex-1 min-w-0">
          {message && (
            <AlertTitle
              className={cn(!hasDescription && !subAction && "mb-0")}
            >
              {message}
            </AlertTitle>
          )}
          {description && (
            <AlertDescription>{description}</AlertDescription>
          )}
          {/* Sub-action: button placed BELOW description */}
          {subAction && actionButton && (
            <div className="mt-2">{actionButton}</div>
          )}
        </div>

        {/* Inline action + close — shrinks, never wraps */}
        {hasControls && (
          <div className="flex shrink-0 items-center gap-1.5">
            {hasInlineAction && actionButton}
            {closeControl}
          </div>
        )}
      </div>
    </Alert>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// META
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta<AlertDemoProps> = {
  title: "3. Primitives/Alert",
  component: AlertDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Displays a brief, important message without interrupting the user's current flow.

**Use Alert when:**
- Confirming a successful action (\`success\`)
- Surfacing a system notice or requirement (\`info\`)
- Warning about a potentially harmful or irreversible action (\`warning\`)
- Communicating a failure that blocks the user (\`error\`)

**Don't use Alert when:**
- The message is transient → use **Toast / Sonner**
- A decision is required before proceeding → use **AlertDialog**
- Feedback belongs to a specific form field → use inline field validation

**Accessibility:**
Renders with \`role="alert"\` so screen readers announce it immediately.
Only use \`closable\` when dismissal is a meaningful user action.
        `.trim(),
      },
    },
  },

  argTypes: {
    // ── CONTENT ─────────────────────────────────────────────────────────────
    message: {
      control: "text",
      description:
        "Primary text of the alert. Rendered as the title. Keep it short — one sentence maximum.",
      table: {
        category: "Content",
        type: { summary: "string" },
        defaultValue: { summary: '"Heads up!"' },
      },
    },
    description: {
      control: "text",
      description:
        "Supporting detail below the message. Use for elaboration or instructions. Optional — omit for compact single-line alerts.",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },
    action: {
      control: "text",
      description:
        "Label for an optional action button rendered alongside the alert. In production code, pass any `ReactNode` here (e.g. `<Button>Undo</Button>`). Leave empty to hide.",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
        defaultValue: { summary: "—" },
      },
    },
    subAction: {
      control: "boolean",
      description:
        "When `true`, the action button is placed **below** the description instead of inline. Useful when the action label is long or when both a description and action are present.",
      table: {
        category: "Content",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    // ── APPEARANCE ───────────────────────────────────────────────────────────
    type: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
      description:
        "Sets the visual intent of the alert — drives the color scheme and the automatic icon. Choose the type that best matches the **semantic meaning** of the message, not just the desired color.",
      table: {
        category: "Appearance",
        type: {
          summary: '"default" | "info" | "success" | "warning" | "error"',
        },
        defaultValue: { summary: '"default"' },
      },
    },
    showIcon: {
      control: "boolean",
      description:
        "Show an icon that reinforces the alert type. Defaults to the icon matching `type`. Use `icon` to override. Always `true` when `banner` is set.",
      table: {
        category: "Appearance",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      control: "select",
      options: [
        "auto",
        "none",
        "terminal",
        "info",
        "check",
        "warning",
        "error",
        "bell",
        "megaphone",
        "shield",
      ],
      description:
        '`"auto"` = icon matching the `type`; `"none"` = suppress icon even if `showIcon` is true. Only visible when `showIcon` is `true`. In production, pass any Lucide or custom React icon component.',
      table: {
        category: "Appearance",
        type: { summary: '"auto" | "none" | ReactNode' },
        defaultValue: { summary: '"auto"' },
      },
    },
    banner: {
      control: "boolean",
      description:
        "Render as a full-width page banner — removes border-radius and side borders so the alert spans edge to edge. Automatically enables `showIcon`. Use at the very top of a page layout.",
      table: {
        category: "Appearance",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    // ── CLOSE BEHAVIOR ───────────────────────────────────────────────────────
    closable: {
      control: "boolean",
      description:
        "Show a dismiss control. The alert hides when activated. Use `closeIcon` and `closeText` to customise the control's appearance.",
      table: {
        category: "Close",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    closeIcon: {
      control: "radio",
      options: ["x-icon", "text"],
      description:
        '`"x-icon"` renders a small × button (default). `"text"` renders the string from `closeText` as a clickable link — useful when you need a more accessible or visible dismiss label.',
      table: {
        category: "Close",
        type: { summary: '"x-icon" | "text" | ReactNode' },
        defaultValue: { summary: '"x-icon"' },
      },
      if: { arg: "closable", truthy: true },
    },
    closeText: {
      control: "text",
      description:
        'Text used as the dismiss control when `closeIcon` is `"text"`. Ignored when `closeIcon` is `"x-icon"`.',
      table: {
        category: "Close",
        type: { summary: "string" },
        defaultValue: { summary: '"Close"' },
      },
      if: { arg: "closeIcon", eq: "text" },
    },

    // ── EVENTS ───────────────────────────────────────────────────────────────
    onClose: {
      action: "onClose fired",
      description:
        "Callback fired **immediately** when the dismiss control is activated.",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },
    afterClose: {
      action: "afterClose fired",
      description:
        "Callback fired **after** the close animation completes — useful for removing the component from the DOM or resetting state.",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<AlertDemoProps>;

// ─────────────────────────────────────────────────────────────────────────────
// PRIMARY STORY — one story, all controls live
// ─────────────────────────────────────────────────────────────────────────────

export const Primary: Story = {
  name: "Alert",
  args: {
    message: "Heads up!",
    description: "You can add components to your app using the CLI.",
    type: "default",
    showIcon: false,
    icon: "auto",
    banner: false,
    closable: false,
    closeIcon: "x-icon",
    closeText: "Close",
    action: "",
    subAction: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// NAMED STORIES — structural / layout differences only
// ─────────────────────────────────────────────────────────────────────────────

/** The four semantic types — pick the one that matches the meaning of your message. */
export const Types: Story = {
  name: "All Types",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `type` to communicate the **semantic intent** of the message. Never choose a type purely for its color — screen readers and assistive tools rely on semantic meaning.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <AlertDemo type="default" message="Default — neutral system information" showIcon />
      <AlertDemo type="info"    message="Info — something you should be aware of" showIcon />
      <AlertDemo type="success" message="Success — action completed successfully" showIcon />
      <AlertDemo type="warning" message="Warning — proceed with caution" showIcon />
      <AlertDemo type="error"   message="Error — action could not be completed" showIcon />
    </div>
  ),
};

/** With both title and supporting description text. */
export const WithDescription: Story = {
  name: "With Description",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Add `description` when extra context helps the user understand the message or take the right action. Keep `message` to one line and use `description` for details.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <AlertDemo
        type="warning"
        message="Your trial expires in 3 days"
        description="Upgrade to a paid plan to keep access to all features and avoid losing your data and campaign history."
        showIcon
      />
      <AlertDemo
        type="error"
        message="Payment failed"
        description="We couldn't charge your card ending in 4242. Please update your payment method to avoid service interruption."
        showIcon
      />
    </div>
  ),
};

/** Inline action — button appears alongside the message. */
export const WithAction: Story = {
  name: "With Action",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `action` when the user should take a clear next step directly from the alert. Keep action labels short (1–3 words). Set `subAction` to place the button below the description when label or description text is long.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      {/* Inline action */}
      <AlertDemo
        type="info"
        message="New version available"
        description="v2.4.0 is ready with performance improvements and bug fixes."
        showIcon
        action="Update now"
        closable
      />
      {/* Sub-action (below description) */}
      <AlertDemo
        type="warning"
        message="Creator limit reached"
        description="Your current plan supports up to 50 active creators. You've reached the limit for this billing cycle."
        showIcon
        action="Upgrade plan"
        subAction
      />
      {/* Success with undo */}
      <AlertDemo
        type="success"
        message="Campaign published"
        description="Summer Glow is now live and visible to creators."
        showIcon
        action="Undo"
        closable
      />
    </div>
  ),
};

/** Full-width banner — typically at the top of a page or section. */
export const Banner: Story = {
  name: "As Banner",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Set `banner` to render the alert as a full-width strip — border-radius is removed and side borders are hidden. `showIcon` is forced `true` in banner mode. Place it outside the main content container at the very top of the page layout.",
      },
    },
  },
  render: () => (
    <div className="w-full space-y-0">
      <AlertDemo
        type="warning"
        message="Scheduled maintenance Feb 28 at 2:00 AM UTC — the platform will be unavailable for ~30 min."
        closable
        banner
        action="Learn more"
      />
    </div>
  ),
};

/** Closable alerts with both close styles. */
export const Closable: Story = {
  name: "Closable",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `closable` when the alert is informational and the user can safely dismiss it. Set `closeIcon=\"text\"` with a custom `closeText` when a labelled text link is preferable to an icon button — useful in high-contrast or accessibility-focused layouts.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      {/* Default × icon */}
      <AlertDemo
        type="info"
        message="Tips are available in the sidebar"
        showIcon
        closable
        closeIcon="x-icon"
      />
      {/* Text close */}
      <AlertDemo
        type="warning"
        message="Your session expires in 5 minutes"
        description="Save your work to avoid losing any unsaved changes."
        showIcon
        closable
        closeIcon="text"
        closeText="Dismiss"
      />
    </div>
  ),
};

/** Error states — how Alert behaves in failure scenarios. */
export const ErrorStates: Story = {
  name: "Error States",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `type=\"error\"` for blocking failures. Always pair with a `description` that explains **what went wrong** and an `action` that tells the user **what to do next**. Avoid vague messages like \"Something went wrong\" — be specific.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      {/* Blocking error with action */}
      <AlertDemo
        type="error"
        message="Could not load campaign data"
        description="We're having trouble connecting to the server. Check your connection and try again."
        showIcon
        action="Retry"
        closable
      />
      {/* Validation / form-level error */}
      <AlertDemo
        type="error"
        message="3 fields need your attention"
        description="Campaign name is required. End date must be after start date. At least one creator must be selected."
        showIcon
      />
      {/* Destructive warning before irreversible action */}
      <AlertDemo
        type="warning"
        message="This action cannot be undone"
        description="Deleting this campaign will permanently remove all associated content, offers, and reporting data."
        showIcon
        action="Delete anyway"
        closable
      />
    </div>
  ),
};
