import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AspireAlert, type AspireAlertProps } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// ─────────────────────────────────────────────────────────────────────────────
// META
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta<AspireAlertProps> = {
  title: "3. Primitives/Alert",
  component: AspireAlert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Displays a brief, important message without interrupting the user's current flow.

---

### Component architecture

\`\`\`
AspireAlert                 ← your props API (this component)
└── <Alert>                 ← shadcn primitive  · color, border via CSS vars
    ├── <AlertTitle>        ← shadcn primitive  · font-medium, spacing
    ├── <AlertDescription>  ← shadcn primitive  · text-sm, muted foreground
    └── <Button>            ← shadcn primitive  · action + close button
\`\`\`

**AspireAlert is a wrapper — not a replacement.**
The raw shadcn primitives (\`Alert\`, \`AlertTitle\`, \`AlertDescription\`) are still exported
and available for cases needing full layout control. Use \`AspireAlert\` for all standard use cases.

All styling inherits from your design tokens — color, radius, typography, spacing —
so theme changes apply automatically.

---

### When to use

| Situation | Component |
|---|---|
| Persistent contextual message | **AspireAlert** ✅ |
| Transient feedback (auto-dismiss) | Toast / Sonner |
| Blocking confirmation required | AlertDialog |
| Inline form field error | Field-level validation |

---

### Accessibility

Renders with \`role="alert"\` — screen readers announce the message immediately on mount.
Use \`closable\` only when dismissal is a meaningful user action, not just to reduce clutter.
        `.trim(),
      },
    },
  },

  argTypes: {
    // ── CONTENT ──────────────────────────────────────────────────────────────
    message: {
      control: "text",
      description: "Primary text of the alert. Rendered as the title. Keep to one sentence.",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },
    description: {
      control: "text",
      description: "Supporting detail below the message. Omit for compact single-line alerts.",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },
    action: {
      control: "text",
      description:
        "Action rendered alongside or below the alert content. Pass a `<Button>` or any ReactNode. In the controls panel, type a label to preview with a default button.",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },
    subAction: {
      control: "boolean",
      description:
        "When `true`, the action is placed **below** the description. Use when the action label or description is long.",
      table: {
        category: "Content",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    // ── APPEARANCE ────────────────────────────────────────────────────────────
    type: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
      description:
        "Sets the visual intent. Drives the color scheme and the default icon when `showIcon` is true. **Choose based on semantic meaning, not color preference.**",
      table: {
        category: "Appearance",
        type: { summary: `"default" | "info" | "success" | "warning" | "error"` },
        defaultValue: { summary: `"default"` },
      },
    },
    showIcon: {
      control: "boolean",
      description:
        "Show an icon that reinforces the alert type. Automatically set to `true` when `banner` is enabled.",
      table: {
        category: "Appearance",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      control: "select",
      options: ["auto", "none", "terminal", "info", "check", "warning", "error", "bell", "megaphone", "shield"],
      description:
        '`"auto"` uses the icon matching `type`. `"none"` suppresses the icon even when `showIcon` is true. In production, pass any Lucide icon component.',
      table: {
        category: "Appearance",
        type: { summary: `"auto" | "none" | ReactNode` },
        defaultValue: { summary: `"auto"` },
      },
    },
    banner: {
      control: "boolean",
      description:
        "Renders as a full-width page banner — removes border-radius and side borders. Forces `showIcon` to true. Place outside the main content container at the top of the page layout.",
      table: {
        category: "Appearance",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    // ── CLOSE ─────────────────────────────────────────────────────────────────
    closable: {
      control: "boolean",
      description: "Show a dismiss control. Alert unmounts when activated.",
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
        '`"x-icon"` renders a small × button. `"text"` renders the `closeText` string as a clickable link — more accessible in dense layouts.',
      table: {
        category: "Close",
        type: { summary: `"x-icon" | "text"` },
        defaultValue: { summary: `"x-icon"` },
      },
      if: { arg: "closable", truthy: true },
    },
    closeText: {
      control: "text",
      description: 'Text used as the dismiss trigger when `closeIcon` is `"text"`.',
      table: {
        category: "Close",
        type: { summary: "string" },
        defaultValue: { summary: `"Close"` },
      },
      if: { arg: "closeIcon", eq: "text" },
    },

    // ── EVENTS ────────────────────────────────────────────────────────────────
    onClose: {
      action: "onClose",
      description: "Fired immediately when the dismiss control is activated.",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },
    afterClose: {
      action: "afterClose",
      description: "Fired after the close animation completes. Use to remove the component from the DOM.",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<AspireAlertProps>;

// ─────────────────────────────────────────────────────────────────────────────
// STORY HELPER — renders action as Button when a string label is passed via controls
// ─────────────────────────────────────────────────────────────────────────────

function withButtonAction(args: AspireAlertProps) {
  return {
    ...args,
    action: args.action
      ? typeof args.action === "string"
        ? <Button variant="outline" size="sm">{args.action as string}</Button>
        : args.action
      : undefined,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// STORY HELPER — wraps a closable alert with a Reset button after dismissal
// ─────────────────────────────────────────────────────────────────────────────

function ClosableDemo(props: AspireAlertProps) {
  const [key, setKey] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Alert dismissed.</span>
        <button
          className="underline hover:no-underline"
          onClick={() => { setDismissed(false); setKey(k => k + 1); }}
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <AspireAlert
      key={key}
      {...props}
      afterClose={() => {
        props.afterClose?.();
        setDismissed(true);
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIMARY — interactive controls
// ─────────────────────────────────────────────────────────────────────────────

export const Primary: Story = {
  name: "Alert",
  render: (args) => (
    <AspireAlert
      key={`${args.type}-${String(args.closable)}-${String(args.banner)}`}
      {...withButtonAction(args)}
    />
  ),
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
  parameters: {
    docs: {
      source: {
        language: "tsx",
        code: `import { AspireAlert as Alert } from "@/components/ui/alert";

// Minimal
<Alert message="Heads up!" />

// With description
<Alert
  message="Heads up!"
  description="You can add components to your app using the CLI."
/>

// With icon
<Alert
  type="info"
  message="Heads up!"
  description="You can add components to your app using the CLI."
  showIcon
/>`,
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// NAMED STORIES
// ─────────────────────────────────────────────────────────────────────────────

export const Types: Story = {
  name: "All Types",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Choose `type` based on **semantic meaning**, not the desired color. Screen readers and assistive tools rely on the semantic intent to communicate urgency to users.",
      },
      source: {
        language: "tsx",
        code: `import { AspireAlert as Alert } from "@/components/ui/alert";

<Alert type="default" message="Default — neutral system information" showIcon />
<Alert type="info"    message="Info — something you should be aware of" showIcon />
<Alert type="success" message="Success — action completed successfully" showIcon />
<Alert type="warning" message="Warning — proceed with caution" showIcon />
<Alert type="error"   message="Error — action could not be completed" showIcon />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <AspireAlert type="default" message="Default — neutral system information" showIcon />
      <AspireAlert type="info"    message="Info — something you should be aware of" showIcon />
      <AspireAlert type="success" message="Success — action completed successfully" showIcon />
      <AspireAlert type="warning" message="Warning — proceed with caution" showIcon />
      <AspireAlert type="error"   message="Error — action could not be completed" showIcon />
    </div>
  ),
};

export const WithDescription: Story = {
  name: "With Description",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `description` for supporting context. Keep `message` to one line — put elaboration and next steps in `description`.",
      },
      source: {
        language: "tsx",
        code: `import { AspireAlert as Alert } from "@/components/ui/alert";

<Alert
  type="warning"
  message="Your trial expires in 3 days"
  description="Upgrade to a paid plan to keep access to all features and avoid losing your data and campaign history."
  showIcon
/>

<Alert
  type="error"
  message="Payment failed"
  description="We couldn't charge your card ending in 4242. Please update your payment method to avoid service interruption."
  showIcon
/>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <AspireAlert
        type="warning"
        message="Your trial expires in 3 days"
        description="Upgrade to a paid plan to keep access to all features and avoid losing your data and campaign history."
        showIcon
      />
      <AspireAlert
        type="error"
        message="Payment failed"
        description="We couldn't charge your card ending in 4242. Please update your payment method to avoid service interruption."
        showIcon
      />
    </div>
  ),
};

export const WithAction: Story = {
  name: "With Action",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `action` for a clear next step. Use `subAction` to place the button below the description when the label or content is long.",
      },
      source: {
        language: "tsx",
        code: `import { AspireAlert as Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

{/* Inline action */}
<Alert
  type="info"
  message="New version available"
  description="v2.4.0 is ready with performance improvements and bug fixes."
  showIcon
  action={<Button variant="outline" size="sm">Update now</Button>}
  closable
/>

{/* Sub-action — button below description */}
<Alert
  type="warning"
  message="Creator limit reached"
  description="Your current plan supports up to 50 active creators. You've reached the limit for this billing cycle."
  showIcon
  action={<Button variant="outline" size="sm">Upgrade plan</Button>}
  subAction
/>

{/* Success with undo */}
<Alert
  type="success"
  message="Campaign published"
  description="Summer Glow is now live and visible to creators."
  showIcon
  action={<Button variant="ghost" size="sm">Undo</Button>}
  closable
/>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <ClosableDemo
        type="info"
        message="New version available"
        description="v2.4.0 is ready with performance improvements and bug fixes."
        showIcon
        action={<Button variant="outline" size="sm">Update now</Button>}
        closable
      />
      <AspireAlert
        type="warning"
        message="Creator limit reached"
        description="Your current plan supports up to 50 active creators. You've reached the limit for this billing cycle."
        showIcon
        action={<Button variant="outline" size="sm">Upgrade plan</Button>}
        subAction
      />
      <ClosableDemo
        type="success"
        message="Campaign published"
        description="Summer Glow is now live and visible to creators."
        showIcon
        action={<Button variant="ghost" size="sm">Undo</Button>}
        closable
      />
    </div>
  ),
};

export const Banner: Story = {
  name: "As Banner",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Set `banner` for a full-width strip. Place outside the main content container at the top of the page layout. `showIcon` is forced `true` in banner mode.",
      },
      source: {
        language: "tsx",
        code: `import { AspireAlert as Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

{/* Placed at root layout level, outside main content padding */}
<Alert
  type="warning"
  message="Scheduled maintenance Feb 28 at 2:00 AM UTC — the platform will be unavailable for ~30 min."
  action={<Button variant="outline" size="sm">Learn more</Button>}
  closable
  banner
/>`,
      },
    },
  },
  render: () => (
    <div className="w-full">
      <ClosableDemo
        type="warning"
        message="Scheduled maintenance Feb 28 at 2:00 AM UTC — the platform will be unavailable for ~30 min."
        action={<Button variant="outline" size="sm">Learn more</Button>}
        closable
        banner
      />
    </div>
  ),
};

export const Closable: Story = {
  name: "Closable",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `closable` when the alert is informational and dismissal is a meaningful action. Use `closeIcon=\"text\"` with `closeText` for a more accessible dismiss trigger.",
      },
      source: {
        language: "tsx",
        code: `import { AspireAlert as Alert } from "@/components/ui/alert";

{/* Icon dismiss */}
<Alert
  type="info"
  message="Tips are available in the sidebar"
  showIcon
  closable
  onClose={() => console.log("dismissed")}
/>

{/* Text dismiss */}
<Alert
  type="warning"
  message="Your session expires in 5 minutes"
  description="Save your work to avoid losing any unsaved changes."
  showIcon
  closable
  closeIcon="text"
  closeText="Dismiss"
  onClose={() => console.log("dismissed")}
  afterClose={() => console.log("animation done")}
/>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <ClosableDemo
        type="info"
        message="Tips are available in the sidebar"
        showIcon
        closable
      />
      <ClosableDemo
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

export const ErrorStates: Story = {
  name: "Error States",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `type=\"error\"` for blocking failures. Always explain **what went wrong** in `description` and provide an `action` for **what to do next**. Avoid generic messages.",
      },
      source: {
        language: "tsx",
        code: `import { AspireAlert as Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

{/* Blocking error with retry */}
<Alert
  type="error"
  message="Could not load campaign data"
  description="We're having trouble connecting to the server. Check your connection and try again."
  showIcon
  action={<Button variant="outline" size="sm">Retry</Button>}
  closable
/>

{/* Form-level validation summary */}
<Alert
  type="error"
  message="3 fields need your attention"
  description="Campaign name is required. End date must be after start date. At least one creator must be selected."
  showIcon
/>

{/* Irreversible action warning */}
<Alert
  type="warning"
  message="This action cannot be undone"
  description="Deleting this campaign will permanently remove all associated content, offers, and reporting data."
  showIcon
  action={<Button variant="destructive" size="sm">Delete anyway</Button>}
  closable
/>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <ClosableDemo
        type="error"
        message="Could not load campaign data"
        description="We're having trouble connecting to the server. Check your connection and try again."
        showIcon
        action={<Button variant="outline" size="sm">Retry</Button>}
        closable
      />
      <AspireAlert
        type="error"
        message="3 fields need your attention"
        description="Campaign name is required. End date must be after start date. At least one creator must be selected."
        showIcon
      />
      <ClosableDemo
        type="warning"
        message="This action cannot be undone"
        description="Deleting this campaign will permanently remove all associated content, offers, and reporting data."
        showIcon
        action={<Button variant="destructive" size="sm">Delete anyway</Button>}
        closable
      />
    </div>
  ),
};
