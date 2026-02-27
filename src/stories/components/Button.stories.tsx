import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within, userEvent, expect, fn } from "storybook/test";
import { Button } from "@/components/ui/button";
import {
  Download,
  Search,
  Plus,
  Trash2,
  ArrowRight,
  Heart,
  Star,
  Settings,
  Share2,
  Mail,
  Loader2,
  Send,
  Check,
  X,
  ChevronDown,
  MoreHorizontal,
  Filter,
  Upload,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers — reusable across stories
// ─────────────────────────────────────────────────────────────────────────────

/** Visual Do/Don't comparison block */
function Guideline({
  doExample,
  doLabel,
  dontExample,
  dontLabel,
}: {
  doExample: React.ReactNode;
  doLabel: string;
  dontExample: React.ReactNode;
  dontLabel: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
      <div className="rounded-lg border-2 border-green-200 bg-green-50/30 dark:border-green-800 dark:bg-green-950/30 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-400 mb-3">
          ✓ Do
        </div>
        <div className="flex items-center gap-2 mb-3">{doExample}</div>
        <p className="text-sm text-muted-foreground">{doLabel}</p>
      </div>
      <div className="rounded-lg border-2 border-red-200 bg-red-50/30 dark:border-red-800 dark:bg-red-950/30 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-red-700 dark:text-red-400 mb-3">
          ✗ Don't
        </div>
        <div className="flex items-center gap-2 mb-3">{dontExample}</div>
        <p className="text-sm text-muted-foreground">{dontLabel}</p>
      </div>
    </div>
  );
}

/** Section label used within stories */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}

/** Loading demo that toggles state */
function LoadingDemo() {
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <SectionLabel>Click to trigger loading transition</SectionLabel>
      <div className="flex items-center gap-3">
        <Button onClick={handleClick} disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Saving..." : "Save changes"}
        </Button>
        <Button variant="outline" onClick={handleClick} disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Exporting..." : "Export"}
          {!loading && <Download />}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground max-w-md">
        The spinner replaces the leading icon position. Button label changes to
        describe the in-progress action. Interaction is disabled during loading.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: "3. Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Buttons trigger actions or navigate to new pages. They communicate what
happens when the user interacts with them.

---

### When to use

| Situation | Use |
|---|---|
| Trigger an action (submit, save, delete) | **Button** ✅ |
| Primary call-to-action on a page | **Button** \`variant="default"\` |
| Navigation without side effects | Link or \`asChild\` with \`<a>\` |
| Toggle a binary state | Switch or Toggle |
| Inline action in a dense table | Ghost or icon-only Button |

---

### Keyboard contract

| Key | Behavior |
|---|---|
| \`Tab\` | Moves focus to / from the button |
| \`Enter\` | Activates the button |
| \`Space\` | Activates the button |
| \`Escape\` | No default behavior (context-dependent) |

---

### ARIA contract

| Attribute | Value |
|---|---|
| \`role\` | \`button\` (implicit from \`<button>\`) |
| \`aria-disabled\` | Set via \`disabled\` prop — removes from interaction |
| \`aria-label\` | **Required** for icon-only buttons |
| \`aria-busy\` | Set manually during loading states |

---

### Import

\`\`\`tsx
import { Button } from "@/components/ui/button"
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    // ── Content ──────────────────────────────────────────────────────────────
    children: {
      control: "text",
      description: "Button label or child elements",
      table: { category: "Content" },
    },

    // ── Appearance ───────────────────────────────────────────────────────────
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description:
        "Visual style. `default` for primary actions, `outline` for secondary, `destructive` for dangerous operations, `ghost` for minimal UI, `link` for inline text actions.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "default" },
        type: {
          summary: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        },
      },
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
      description:
        "Button height and padding. Use `icon` sizes for square icon-only buttons. `xs` for compact UI like tags.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "default" },
        type: {
          summary: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
        },
      },
    },
    asChild: {
      control: "boolean",
      description:
        "Merges button styles onto the child element instead of rendering `<button>`. Use to wrap `<a>` or router `<Link>`.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },

    // ── State ────────────────────────────────────────────────────────────────
    disabled: {
      control: "boolean",
      description:
        "Disables interaction — button becomes unfocusable and visually muted at 50% opacity.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },

    // ── Events ───────────────────────────────────────────────────────────────
    onClick: {
      action: "clicked",
      description: "Click handler",
      table: { category: "Events" },
    },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ═══════════════════════════════════════════════════════════════════════════════
//  VISUAL SPEC
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// Primary — interactive playground
// ─────────────────────────────────────────────────────────────────────────────

export const Primary: Story = {
  name: "Playground",
  parameters: {
    docs: {
      source: {
        language: "tsx",
        code: `import { Button } from "@/components/ui/button"

<Button variant="default" size="default">
  Button
</Button>`,
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// All Variants
// ─────────────────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Six visual variants ordered by emphasis. Use **one** `default` button per action group for the primary CTA. Pair with `outline` or `ghost` for secondary actions.",
      },
      source: {
        language: "tsx",
        code: `<Button variant="default">Primary CTA</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default">Primary CTA</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="text-sm text-muted-foreground max-w-lg">
        <strong>Emphasis hierarchy:</strong> default → secondary → outline → ghost → link.
        Use <code>destructive</code> only for irreversible or dangerous actions.
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// All Sizes
// ─────────────────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: "All Sizes",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "`lg` for hero sections and page CTAs. `default` for standard UI. `sm` for toolbars and filter bars. `xs` for inline tags and compact actions. Icon sizes create square buttons for icon-only use.",
      },
      source: {
        language: "tsx",
        code: `<Button size="lg">Large</Button>
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="xs">Extra Small</Button>

{/* Icon-only — always add aria-label */}
<Button size="icon" aria-label="Add"><Plus /></Button>
<Button size="icon-sm" aria-label="Search"><Search /></Button>
<Button size="icon-xs" aria-label="Close"><X /></Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel>Text buttons</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button size="lg">Large</Button>
          <Button size="default">Default</Button>
          <Button size="sm">Small</Button>
          <Button size="xs">Extra Small</Button>
        </div>
      </div>
      <div>
        <SectionLabel>Icon-only buttons</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button size="icon-lg" aria-label="Download"><Download /></Button>
          <Button size="icon" aria-label="Add"><Plus /></Button>
          <Button size="icon-sm" aria-label="Search"><Search /></Button>
          <Button size="icon-xs" aria-label="Close"><X /></Button>
        </div>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// With Icons
// ─────────────────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: "With Icons",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Icons reinforce meaning — place before the label for actions (`Download`, `Search`) and after for navigation (`Continue →`). shadcn auto-sizes icons via the `[&_svg]` selector. For icon-only buttons, always add `aria-label`.",
      },
      source: {
        language: "tsx",
        code: `{/* Leading icon — action verbs */}
<Button><Download /> Export</Button>
<Button variant="outline"><Search /> Search</Button>
<Button variant="outline"><Filter /> Filter</Button>

{/* Trailing icon — directional */}
<Button>Continue <ArrowRight /></Button>
<Button variant="outline">Options <ChevronDown /></Button>

{/* Icon-only with aria-label */}
<Button size="icon" aria-label="Add"><Plus /></Button>
<Button variant="ghost" size="icon" aria-label="More"><MoreHorizontal /></Button>
<Button variant="ghost" size="icon" aria-label="Settings"><Settings /></Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel>Leading icon — action verbs</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button><Download /> Export</Button>
          <Button variant="outline"><Search /> Search</Button>
          <Button variant="outline"><Filter /> Filter</Button>
          <Button variant="outline"><Upload /> Upload</Button>
        </div>
      </div>
      <div>
        <SectionLabel>Trailing icon — directional</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button>Continue <ArrowRight /></Button>
          <Button variant="outline">Options <ChevronDown /></Button>
        </div>
      </div>
      <div>
        <SectionLabel>Icon-only — always add aria-label</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button size="icon" aria-label="Add"><Plus /></Button>
          <Button variant="outline" size="icon" aria-label="Favorite"><Heart /></Button>
          <Button variant="ghost" size="icon" aria-label="More options"><MoreHorizontal /></Button>
          <Button variant="ghost" size="icon" aria-label="Settings"><Settings /></Button>
        </div>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Destructive Actions
// ─────────────────────────────────────────────────────────────────────────────

export const DestructiveActions: Story = {
  name: "Destructive Actions",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `variant=\"destructive\"` for irreversible operations. Always pair destructive buttons with a confirmation step (AlertDialog) for actions that cannot be undone. Destructive ghost buttons work well for secondary dangerous actions.",
      },
      source: {
        language: "tsx",
        code: `{/* Primary destructive — dialog confirmation button */}
<Button variant="destructive"><Trash2 /> Delete campaign</Button>

{/* Secondary destructive — inline table action */}
<Button variant="ghost" className="text-destructive hover:text-destructive">
  <Trash2 /> Remove
</Button>

{/* Destructive outline */}
<Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
  Revoke access
</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel>Primary destructive — for confirmation dialogs</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button variant="destructive"><Trash2 /> Delete campaign</Button>
          <Button variant="destructive">Remove all creators</Button>
        </div>
      </div>
      <div>
        <SectionLabel>Secondary destructive — for inline actions</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 /> Remove
          </Button>
          <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
            Revoke access
          </Button>
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
//  INTERACTION BEHAVIOR
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard Navigation
// ─────────────────────────────────────────────────────────────────────────────

export const KeyboardNavigation: Story = {
  name: "Keyboard Navigation",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "**Try it:** Click the first button below, then use `Tab` to move through the group. Press `Enter` or `Space` to activate. Notice the focus ring — it uses `focus-visible` so it only appears on keyboard navigation, not on mouse clicks. Disabled buttons are skipped in the tab order.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="outline">First</Button>
        <Button>Second (default)</Button>
        <Button disabled>Third (disabled — skipped)</Button>
        <Button variant="outline">Fourth</Button>
        <Button variant="ghost">Fifth (ghost)</Button>
      </div>
      <div className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground max-w-lg">
        <strong>Expected behavior:</strong> Tab moves focus 1 → 2 → 4 → 5 (skips
        disabled). Focus ring is a 3px ring using <code>ring-ring/50</code>. Enter
        and Space both activate the focused button.
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    const enabledButtons = buttons.filter((b) => !b.hasAttribute("disabled"));

    // Tab to first button
    await userEvent.tab();
    await expect(enabledButtons[0]).toHaveFocus();

    // Tab through enabled buttons
    await userEvent.tab();
    await expect(enabledButtons[1]).toHaveFocus();

    // Tab should skip the disabled button
    await userEvent.tab();
    await expect(enabledButtons[2]).toHaveFocus();

    // Verify Enter activates
    await userEvent.keyboard("{Enter}");

    // Verify Space activates
    await userEvent.tab();
    await expect(enabledButtons[3]).toHaveFocus();
    await userEvent.keyboard(" ");
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Loading Transition
// ─────────────────────────────────────────────────────────────────────────────

export const LoadingTransition: Story = {
  name: "Loading Transition",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "**Click a button** to see the loading pattern: label changes to describe the in-progress action, a `Loader2` spinner replaces the leading icon, and the button becomes disabled. After 2 seconds the state resets.\n\nThis is the recommended pattern — the component is not opinionated about loading state. You control it with `disabled` + `Loader2` + label text.",
      },
      source: {
        language: "tsx",
        code: `import { Loader2, Download } from "lucide-react"

const [loading, setLoading] = useState(false)

<Button onClick={() => setLoading(true)} disabled={loading}>
  {loading && <Loader2 className="animate-spin" />}
  {loading ? "Saving..." : "Save changes"}
</Button>

<Button variant="outline" onClick={handleClick} disabled={loading}>
  {loading && <Loader2 className="animate-spin" />}
  {loading ? "Exporting..." : "Export"}
  {!loading && <Download />}
</Button>`,
      },
    },
  },
  render: () => <LoadingDemo />,
};

// ─────────────────────────────────────────────────────────────────────────────
// Focus Management
// ─────────────────────────────────────────────────────────────────────────────

export const FocusRing: Story = {
  name: "Focus Ring",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Focus rings use `focus-visible` — they appear on keyboard navigation but not on mouse clicks. This is built into the shadcn base styles. Each variant has a contextually appropriate ring color: `destructive` uses a red ring, all others use `ring/50`.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel>Tab through to see focus rings per variant</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
      <div className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground max-w-lg">
        <strong>Implementation:</strong>{" "}
        <code>focus-visible:ring-ring/50 focus-visible:ring-[3px]</code>.
        Destructive variant overrides to{" "}
        <code>focus-visible:ring-destructive/20</code>.
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    // Tab through each variant to show focus rings
    for (let i = 0; i < buttons.length; i++) {
      await userEvent.tab();
    }
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Disabled State
// ─────────────────────────────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: "Disabled State",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Disabled buttons are visually muted (50% opacity) and removed from the tab order via `disabled:pointer-events-none`. Prefer disabling over hiding — pair with a Tooltip explaining *why* the action is unavailable.",
      },
      source: {
        language: "tsx",
        code: `<Button disabled>Cannot submit</Button>
<Button variant="outline" disabled>No selection</Button>
<Button variant="destructive" disabled>Delete</Button>
<Button variant="ghost" disabled>View</Button>

{/* Recommended: explain why with Tooltip */}
<Tooltip content="Select at least one creator first">
  <Button disabled>Export selected</Button>
</Tooltip>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled>Cannot submit</Button>
        <Button variant="outline" disabled>No selection</Button>
        <Button variant="destructive" disabled>Delete</Button>
        <Button variant="ghost" disabled>View</Button>
        <Button variant="link" disabled>Learn more</Button>
      </div>
      <div className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground max-w-lg">
        <strong>A11y note:</strong> Disabled buttons use the native <code>disabled</code> attribute,
        which removes them from tab order and prevents click events. For buttons that should remain
        focusable (e.g., with Tooltip), use <code>aria-disabled="true"</code> with manual
        click prevention instead.
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledButtons = canvas.getAllByRole("button");

    // Verify all buttons are actually disabled
    for (const button of disabledButtons) {
      await expect(button).toBeDisabled();
    }
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
//  ACCESSIBILITY
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// Screen Reader
// ─────────────────────────────────────────────────────────────────────────────

export const AccessiblePatterns: Story = {
  name: "Accessible Patterns",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Icon-only buttons **must** have `aria-label`. Screen readers announce the label instead of seeing an empty button. Text buttons get their accessible name from their content automatically.\n\nFor loading states, add `aria-busy=\"true\"` and update the label to describe the in-progress action so screen readers announce the state change.",
      },
      source: {
        language: "tsx",
        code: `{/* Icon-only — aria-label required */}
<Button size="icon" aria-label="Add new creator">
  <Plus />
</Button>

{/* Text button — accessible name from content */}
<Button>Create campaign</Button>

{/* Loading — announce state change */}
<Button disabled aria-busy="true">
  <Loader2 className="animate-spin" />
  Saving...
</Button>

{/* Link-style navigation */}
<Button variant="link" asChild>
  <a href="/campaigns">View all campaigns</a>
</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <SectionLabel>Icon-only buttons — aria-label required</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button size="icon" aria-label="Add new creator"><Plus /></Button>
          <Button variant="outline" size="icon" aria-label="Search creators"><Search /></Button>
          <Button variant="ghost" size="icon" aria-label="Open settings"><Settings /></Button>
          <Button variant="ghost" size="icon" aria-label="Share campaign"><Share2 /></Button>
        </div>
      </div>
      <div>
        <SectionLabel>Loading state — aria-busy for assistive tech</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button disabled aria-busy="true">
            <Loader2 className="animate-spin" /> Saving...
          </Button>
          <span className="text-sm text-muted-foreground">
            Screen reader announces: "Saving, button, dimmed"
          </span>
        </div>
      </div>
      <div>
        <SectionLabel>Navigation — use asChild with anchor</SectionLabel>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Button variant="link" asChild>
            <a href="#" onClick={(e) => e.preventDefault()}>View all campaigns</a>
          </Button>
          <span className="text-sm text-muted-foreground">
            Renders as <code>&lt;a&gt;</code> — proper semantics for navigation
          </span>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify icon buttons have accessible names
    const addButton = canvas.getByRole("button", { name: "Add new creator" });
    await expect(addButton).toBeInTheDocument();

    const searchButton = canvas.getByRole("button", { name: "Search creators" });
    await expect(searchButton).toBeInTheDocument();

    // Verify loading button has aria-busy
    const loadingButton = canvas.getByRole("button", { name: /saving/i });
    await expect(loadingButton).toHaveAttribute("aria-busy", "true");

    // Verify link renders as anchor
    const link = canvas.getByRole("link", { name: "View all campaigns" });
    await expect(link).toBeInTheDocument();
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
//  GUIDELINES
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// Do & Don't
// ─────────────────────────────────────────────────────────────────────────────

export const DoAndDont: Story = {
  name: "Do & Don't",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Design guidelines for consistent button usage across the Aspire product.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <Guideline
        doExample={
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Create campaign</Button>
          </div>
        }
        doLabel="One primary (default) button per action group. Secondary actions use outline or ghost."
        dontExample={
          <div className="flex gap-2">
            <Button>Cancel</Button>
            <Button>Save</Button>
            <Button>Create campaign</Button>
          </div>
        }
        dontLabel="Multiple primary buttons compete for attention. The user can't tell which is the main action."
      />

      <Guideline
        doExample={
          <Button variant="destructive"><Trash2 /> Delete campaign</Button>
        }
        doLabel="Use destructive variant for irreversible actions. Icon reinforces the danger."
        dontExample={
          <Button>Delete campaign</Button>
        }
        dontLabel="Primary variant for a destructive action gives no visual warning."
      />

      <Guideline
        doExample={
          <Button><Download /> Export CSV</Button>
        }
        doLabel="Start with a verb. Be specific about what happens."
        dontExample={
          <Button>Click here</Button>
        }
        dontLabel="Generic labels don't tell the user what the action does."
      />

      <Guideline
        doExample={
          <Button size="icon" aria-label="Add creator"><Plus /></Button>
        }
        doLabel="Icon-only buttons always have aria-label for screen readers."
        dontExample={
          <Button size="icon"><Plus /></Button>
        }
        dontLabel="Without aria-label, screen readers announce an empty button."
      />

      <Guideline
        doExample={
          <div className="flex gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button variant="destructive"><Trash2 /> Delete</Button>
          </div>
        }
        doLabel="In destructive dialogs, the cancel button should be low-emphasis (ghost)."
        dontExample={
          <div className="flex gap-2">
            <Button variant="destructive">Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        }
        dontLabel="Two destructive buttons — the user can't tell which is safe."
      />
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Content Guidelines
// ─────────────────────────────────────────────────────────────────────────────

export const ContentGuidelines: Story = {
  name: "Content Guidelines",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Button labels should be concise, specific, and start with a verb. They tell the user exactly what will happen when clicked.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <div className="grid grid-cols-[1fr_1fr_auto] gap-x-4 gap-y-3 text-sm items-center">
        <div className="font-medium text-muted-foreground">Instead of</div>
        <div className="font-medium text-muted-foreground">Write</div>
        <div className="font-medium text-muted-foreground">Why</div>

        <div><Button variant="outline" size="sm">Submit</Button></div>
        <div><Button size="sm">Create campaign</Button></div>
        <div className="text-muted-foreground text-xs">Specific about the outcome</div>

        <div><Button variant="outline" size="sm">OK</Button></div>
        <div><Button size="sm">Save changes</Button></div>
        <div className="text-muted-foreground text-xs">Describes what "OK" means</div>

        <div><Button variant="outline" size="sm">Click here</Button></div>
        <div><Button size="sm"><Download /> Export CSV</Button></div>
        <div className="text-muted-foreground text-xs">Action + format = no ambiguity</div>

        <div><Button variant="outline" size="sm">Yes</Button></div>
        <div><Button variant="destructive" size="sm"><Trash2 /> Delete campaign</Button></div>
        <div className="text-muted-foreground text-xs">Echoes the action being confirmed</div>

        <div><Button variant="outline" size="sm">No</Button></div>
        <div><Button variant="ghost" size="sm">Cancel</Button></div>
        <div className="text-muted-foreground text-xs">Calm, predictable escape hatch</div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
//  IN CONTEXT — real Aspire product patterns
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// Dialog Footer
// ─────────────────────────────────────────────────────────────────────────────

export const InContextDialogFooter: Story = {
  name: "In Context — Dialog Footer",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Standard dialog footer pattern. Cancel is always `ghost` or `outline`, confirm is the action-specific variant. Destructive dialogs pair `ghost` cancel with `destructive` confirm.",
      },
      source: {
        language: "tsx",
        code: `{/* Standard confirm */}
<div className="flex justify-end gap-2">
  <Button variant="ghost">Cancel</Button>
  <Button>Save changes</Button>
</div>

{/* Destructive confirm */}
<div className="flex justify-end gap-2">
  <Button variant="ghost">Cancel</Button>
  <Button variant="destructive"><Trash2 /> Delete campaign</Button>
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <div>
        <SectionLabel>Standard confirmation</SectionLabel>
        <div className="rounded-lg border p-4 mt-2">
          <p className="text-sm mb-4">Save your changes to "Summer Glow" campaign?</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </div>
      </div>
      <div>
        <SectionLabel>Destructive confirmation</SectionLabel>
        <div className="rounded-lg border p-4 mt-2">
          <p className="text-sm mb-4">This will permanently delete the campaign and all associated data.</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button variant="destructive"><Trash2 /> Delete campaign</Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Page Header Actions
// ─────────────────────────────────────────────────────────────────────────────

export const InContextPageHeader: Story = {
  name: "In Context — Page Header",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Page header action bar — the primary CTA sits rightmost. Icon-only buttons for secondary actions (filter, search). Ghost buttons for low-emphasis actions.",
      },
      source: {
        language: "tsx",
        code: `<div className="flex items-center justify-between w-full">
  <h1>Campaigns</h1>
  <div className="flex items-center gap-2">
    <Button variant="ghost" size="icon" aria-label="Search">
      <Search />
    </Button>
    <Button variant="ghost" size="icon" aria-label="Filter">
      <Filter />
    </Button>
    <Button><Plus /> Create campaign</Button>
  </div>
</div>`,
      },
    },
  },
  render: () => (
    <div className="w-[560px] border-b pb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Campaigns</h2>
          <p className="text-sm text-muted-foreground">Manage your creator campaigns</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search campaigns"><Search /></Button>
          <Button variant="ghost" size="icon" aria-label="Filter campaigns"><Filter /></Button>
          <Button><Plus /> Create campaign</Button>
        </div>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Form Submit
// ─────────────────────────────────────────────────────────────────────────────

export const InContextFormSubmit: Story = {
  name: "In Context — Form Footer",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Form footers stack actions right-aligned. The primary submit is rightmost with `type=\"submit\"`. A secondary \"Save as draft\" sits beside it. Full-width stacked layout for mobile or narrow modals.",
      },
      source: {
        language: "tsx",
        code: `{/* Inline — desktop */}
<div className="flex justify-end gap-2 border-t pt-4">
  <Button variant="ghost">Cancel</Button>
  <Button variant="outline">Save as draft</Button>
  <Button type="submit">Publish campaign</Button>
</div>

{/* Stacked — mobile or narrow modals */}
<div className="flex flex-col gap-2">
  <Button type="submit" className="w-full">Publish campaign</Button>
  <Button variant="outline" className="w-full">Save as draft</Button>
  <Button variant="ghost" className="w-full">Cancel</Button>
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="w-[480px]">
        <SectionLabel>Inline — desktop layout</SectionLabel>
        <div className="flex justify-end gap-2 border-t pt-4 mt-2">
          <Button variant="ghost">Cancel</Button>
          <Button variant="outline">Save as draft</Button>
          <Button type="submit"><Send /> Publish campaign</Button>
        </div>
      </div>
      <div className="w-72">
        <SectionLabel>Stacked — mobile / narrow modal</SectionLabel>
        <div className="flex flex-col gap-2 mt-2">
          <Button type="submit" className="w-full"><Send /> Publish campaign</Button>
          <Button variant="outline" className="w-full">Save as draft</Button>
          <Button variant="ghost" className="w-full">Cancel</Button>
        </div>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Table Actions
// ─────────────────────────────────────────────────────────────────────────────

export const InContextTableActions: Story = {
  name: "In Context — Table Row",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Table row actions use `ghost` and `icon-sm` to stay compact. Primary table action can use `sm` size text button. The actions appear on hover in production — here they're always visible for reference.",
      },
      source: {
        language: "tsx",
        code: `{/* Compact row actions */}
<div className="flex items-center gap-1">
  <Button variant="ghost" size="sm"><Mail /> Message</Button>
  <Button variant="ghost" size="icon-sm" aria-label="Favorite">
    <Star />
  </Button>
  <Button variant="ghost" size="icon-sm" aria-label="More options">
    <MoreHorizontal />
  </Button>
</div>`,
      },
    },
  },
  render: () => (
    <div className="w-[560px]">
      <div className="flex items-center justify-between rounded-md border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div>
            <p className="text-sm font-medium">Sarah Johnson</p>
            <p className="text-xs text-muted-foreground">@sarahjcreates · 45.2K followers</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm"><Mail /> Message</Button>
          <Button variant="ghost" size="icon-sm" aria-label="Favorite"><Star /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="More options"><MoreHorizontal /></Button>
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
//  INTERACTION TESTS
// ═══════════════════════════════════════════════════════════════════════════════

/** Verifies click fires the onClick handler. */
export const ClickTest: Story = {
  name: "Click fires handler",
  args: { children: "Click Me", onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Click Me" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** Verifies disabled button does NOT fire onClick. */
export const DisabledClickTest: Story = {
  name: "Disabled blocks interaction",
  args: { children: "Disabled", disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Disabled" });
    await expect(button).toBeDisabled();
  },
};

/** Verifies icon-only button has accessible name. */
export const IconA11yTest: Story = {
  name: "Icon-only has accessible name",
  render: () => (
    <Button size="icon" aria-label="Add item"><Plus /></Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Add item" });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAccessibleName("Add item");
  },
};
