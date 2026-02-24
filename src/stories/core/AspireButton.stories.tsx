import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Download,
  Search,
  Plus,
  Trash2,
  ArrowRight,
  Heart,
  Star,
  Bell,
  Settings,
  Share2,
} from "lucide-react";
import { AspireButton } from "@/components/ui/button";
import type { AspireButtonProps } from "@/components/ui/button";

// ─────────────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta<AspireButtonProps> = {
  title: "3. Primitives/Button",
  component: AspireButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A versatile button for triggering actions, submitting forms, and navigating.

\`\`\`
Button                             ← your props API (this component)
└── shadcn <Button>                ← primitive from @/components/ui/button
    └── Renders as:
        ├── <button>               ← default
        ├── <a href="...">         ← when href is provided
        └── <button type="submit"> ← when htmlType="submit"
\`\`\`

**How Button differs from raw shadcn \`<Button>\`:**

| Feature | shadcn \`<Button>\` | Aspire \`Button\` |
|---|---|---|
| Variants | 6 variant strings | \`type\` prop: \`primary \\| default \\| dashed \\| link \\| text\` |
| Sizes | 4 size strings | \`size\` prop: \`large \\| middle \\| small\` |
| Danger | manual \`variant="destructive"\` | \`danger\` boolean |
| Ghost | manual className | \`ghost\` boolean |
| Full width | manual \`className="w-full"\` | \`block\` boolean |
| Loading | manual spinner JSX | \`loading\` boolean or \`{delay: ms}\` |
| Icons | manual JSX + className | \`startIcon\` / \`endIcon\` — size auto-managed |
| Shape | manual className | \`shape\`: \`default \\| round \\| circle\` |
| Link render | manual \`asChild\` + \`<a>\` | \`href\` + \`target\` props |
| Form submit | manual \`type="submit"\` | \`htmlType\` prop |
        `.trim(),
      },
    },
  },
  argTypes: {
    // ── Content ────────────────────────────────────────────────────────────
    children: {
      control: "text",
      description: "Button label text",
      table: { category: "Content" },
    },
    startIcon: {
      control: false,
      description:
        "Icon rendered **before** the label. Pass a raw icon — no `className` needed, size is controlled by the `size` prop automatically.",
      table: { category: "Content" },
    },
    endIcon: {
      control: false,
      description:
        "Icon rendered **after** the label. Pass a raw icon — no `className` needed, size is controlled by the `size` prop automatically.",
      table: { category: "Content" },
    },

    // ── Appearance ─────────────────────────────────────────────────────────
    type: {
      control: "select",
      options: ["primary", "default", "dashed", "link", "text"],
      description: "Visual variant of the button",
      table: {
        category: "Appearance",
        defaultValue: { summary: "default" },
        type: {
          summary: "primary | default | dashed | link | text",
          detail: [
            "primary — solid filled, high emphasis (CTA)",
            "default — outlined, medium emphasis",
            "dashed  — outlined with dashed border, low emphasis",
            "link    — looks like a hyperlink",
            "text    — no border or background, lowest emphasis",
          ].join("\n"),
        },
      },
    },
    size: {
      control: "radio",
      options: ["large", "middle", "small"],
      description:
        "Button size — also determines icon size automatically (`large`→20px, `middle`→16px, `small`→14px)",
      table: { category: "Appearance", defaultValue: { summary: "middle" } },
    },
    shape: {
      control: "radio",
      options: ["default", "round", "circle"],
      description: "Button corner shape",
      table: {
        category: "Appearance",
        defaultValue: { summary: "default" },
        type: {
          summary: "default | round | circle",
          detail: [
            "default — standard border-radius",
            "round   — pill shape",
            "circle  — square aspect ratio, fully rounded (icon-only)",
          ].join("\n"),
        },
      },
    },
    danger: {
      control: "boolean",
      description: "Apply danger / destructive styling",
      table: { category: "Appearance", defaultValue: { summary: "false" } },
    },
    ghost: {
      control: "boolean",
      description: "Transparent background with inverted text and border",
      table: { category: "Appearance", defaultValue: { summary: "false" } },
    },
    block: {
      control: "boolean",
      description: "Stretch button to fill its container width",
      table: { category: "Appearance", defaultValue: { summary: "false" } },
    },

    // ── State ──────────────────────────────────────────────────────────────
    loading: {
      control: "boolean",
      description:
        "Show a loading spinner and disable interaction. Also accepts `{ delay: ms }` to delay spinner visibility.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent all interaction",
      table: { category: "State", defaultValue: { summary: "false" } },
    },

    // ── Navigation ─────────────────────────────────────────────────────────
    href: {
      control: "text",
      description: "Renders the button as an `<a>` tag with this href",
      table: { category: "Navigation" },
    },
    target: {
      control: "select",
      options: ["_self", "_blank", "_parent", "_top"],
      description: "Anchor target — only applies when href is set",
      if: { arg: "href", truthy: true },
      table: { category: "Navigation" },
    },

    // ── Form ───────────────────────────────────────────────────────────────
    htmlType: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Native HTML button type — use `submit` inside forms",
      table: { category: "Form", defaultValue: { summary: "button" } },
    },

    // ── Events ─────────────────────────────────────────────────────────────
    onClick: {
      action: "clicked",
      description: "Click handler",
      table: { category: "Events" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// Primary — interactive controls
// ─────────────────────────────────────────────────────────────────────────────

export const Primary: Story = {
  name: "Button",
  args: {
    children: "Button",
    type: "default",
    size: "middle",
    shape: "default",
    danger: false,
    ghost: false,
    block: false,
    loading: false,
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";

<Button>Button</Button>`,
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// All Types
// ─────────────────────────────────────────────────────────────────────────────

export const AllTypes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Five semantic types map to different visual weights. Use `primary` for the **one** most important action per view.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";

<Button type="primary">Primary</Button>
<Button type="default">Default</Button>
<Button type="dashed">Dashed</Button>
<Button type="text">Text</Button>
<Button type="link">Link</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <AspireButton type="primary">Primary</AspireButton>
      <AspireButton type="default">Default</AspireButton>
      <AspireButton type="dashed">Dashed</AspireButton>
      <AspireButton type="text">Text</AspireButton>
      <AspireButton type="link">Link</AspireButton>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Sizes
// ─────────────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "`large` for hero CTAs, `middle` (default) for most UI, `small` for dense tables or toolbars. Icon size adjusts automatically.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";
import { Download } from "lucide-react";

<Button size="large"  type="primary" startIcon={<Download />}>Large</Button>
<Button size="middle" type="primary" startIcon={<Download />}>Middle</Button>
<Button size="small"  type="primary" startIcon={<Download />}>Small</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <AspireButton size="large"  type="primary">Large</AspireButton>
        <AspireButton size="middle" type="primary">Middle</AspireButton>
        <AspireButton size="small"  type="primary">Small</AspireButton>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <AspireButton size="large"  type="primary" startIcon={<Download />}>Large</AspireButton>
        <AspireButton size="middle" type="primary" startIcon={<Download />}>Middle</AspireButton>
        <AspireButton size="small"  type="primary" startIcon={<Download />}>Small</AspireButton>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// With Icon
// ─────────────────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: "With Icon",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `startIcon` for icons before the label and `endIcon` for icons after. Pass a raw icon with no `className` — size is managed automatically based on the `size` prop.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";
import { Download, Search, Plus, ArrowRight, Settings } from "lucide-react";

{/* Icon before label */}
<Button type="primary" startIcon={<Download />}>Export</Button>
<Button startIcon={<Search />}>Search</Button>
<Button type="dashed" startIcon={<Plus />}>Add creator</Button>

{/* Icon after label */}
<Button type="primary" endIcon={<ArrowRight />}>Continue</Button>

{/* Icon-only — omit children */}
<Button type="primary" startIcon={<Plus />} />
<Button startIcon={<Search />} />
<Button type="text" startIcon={<Settings />} />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <AspireButton type="primary" startIcon={<Download />}>Export</AspireButton>
        <AspireButton startIcon={<Search />}>Search</AspireButton>
        <AspireButton type="dashed" startIcon={<Plus />}>Add creator</AspireButton>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <AspireButton type="primary" endIcon={<ArrowRight />}>Continue</AspireButton>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <AspireButton type="primary" startIcon={<Plus />} />
        <AspireButton startIcon={<Search />} />
        <AspireButton type="text" startIcon={<Settings />} />
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Shape
// ─────────────────────────────────────────────────────────────────────────────

export const Shape: Story = {
  name: "Shape",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "`round` gives a pill shape. `circle` enforces a square aspect ratio — ideal for icon-only buttons.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";
import { Plus, Heart, Bell } from "lucide-react";

{/* Round */}
<Button shape="round" type="primary">Primary</Button>
<Button shape="round">Default</Button>
<Button shape="round" startIcon={<Plus />}>Add</Button>

{/* Circle — icon-only */}
<Button shape="circle" type="primary" startIcon={<Plus />} />
<Button shape="circle" startIcon={<Heart />} />
<Button shape="circle" type="text" startIcon={<Bell />} />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <AspireButton shape="round" type="primary">Primary</AspireButton>
        <AspireButton shape="round">Default</AspireButton>
        <AspireButton shape="round" startIcon={<Plus />}>Add</AspireButton>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <AspireButton shape="circle" type="primary" startIcon={<Plus />} />
        <AspireButton shape="circle" startIcon={<Heart />} />
        <AspireButton shape="circle" type="text" startIcon={<Bell />} />
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Loading
// ─────────────────────────────────────────────────────────────────────────────

export const Loading: Story = {
  name: "Loading",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "`loading` shows a spinner in the `startIcon` position and disables interaction. The spinner inherits the correct size automatically. Pass `{ delay: 300 }` to avoid a flash on fast responses.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";
import { Download } from "lucide-react";

<Button type="primary" loading>Saving...</Button>
<Button loading>Processing</Button>

{/* Spinner replaces startIcon when loading */}
<Button type="primary" loading startIcon={<Download />}>Exporting...</Button>

{/* Icon-only loading */}
<Button type="primary" loading startIcon={<Download />} />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <AspireButton type="primary" loading>Saving...</AspireButton>
      <AspireButton loading>Processing</AspireButton>
      <AspireButton type="primary" loading startIcon={<Download />}>Exporting...</AspireButton>
      <AspireButton type="primary" loading startIcon={<Download />} />
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Danger
// ─────────────────────────────────────────────────────────────────────────────

export const Danger: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "`danger` signals a destructive action. Works on all types. Pair with an AlertDialog for irreversible operations.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

<Button type="primary" danger>Delete campaign</Button>
<Button type="default" danger>Remove</Button>
<Button type="dashed"  danger>Clear all</Button>
<Button type="text"    danger startIcon={<Trash2 />}>Delete</Button>
<Button type="link"    danger>Revoke access</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <AspireButton type="primary" danger>Delete campaign</AspireButton>
      <AspireButton type="default" danger>Remove</AspireButton>
      <AspireButton type="dashed" danger>Clear all</AspireButton>
      <AspireButton type="text" danger startIcon={<Trash2 />}>Delete</AspireButton>
      <AspireButton type="link" danger>Revoke access</AspireButton>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Ghost
// ─────────────────────────────────────────────────────────────────────────────

export const Ghost: Story = {
  name: "Ghost",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Ghost buttons have a transparent background — designed for placement on coloured or image backgrounds.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";

<Button type="primary" ghost>Primary ghost</Button>
<Button type="default" ghost>Default ghost</Button>
<Button type="dashed"  ghost>Dashed ghost</Button>

{/* Typical usage on a dark background */}
<div className="bg-primary p-6 rounded-lg flex gap-3">
  <Button type="primary" ghost>Ghost on dark</Button>
  <Button ghost>Secondary</Button>
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <AspireButton type="primary" ghost>Primary ghost</AspireButton>
        <AspireButton type="default" ghost>Default ghost</AspireButton>
        <AspireButton type="dashed" ghost>Dashed ghost</AspireButton>
      </div>
      <div className="bg-primary p-6 rounded-lg flex flex-wrap gap-3">
        <AspireButton type="primary" ghost>Ghost on dark</AspireButton>
        <AspireButton ghost>Secondary</AspireButton>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Block
// ─────────────────────────────────────────────────────────────────────────────

export const Block: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "`block` stretches the button to 100% of its container. Useful in forms, modals, and mobile layouts.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

<div className="w-80 flex flex-col gap-2">
  <Button type="primary" block>Create campaign</Button>
  <Button block>Save as draft</Button>
  <Button type="dashed" block startIcon={<Plus />}>Add creator</Button>
</div>`,
      },
    },
  },
  render: () => (
    <div className="w-80 flex flex-col gap-2">
      <AspireButton type="primary" block>Create campaign</AspireButton>
      <AspireButton block>Save as draft</AspireButton>
      <AspireButton type="dashed" block startIcon={<Plus />}>Add creator</AspireButton>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Disabled
// ─────────────────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Disabled buttons prevent all interaction at reduced opacity. Prefer disabling over hiding — pair with a Tooltip to explain why.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";

<Button type="primary" disabled>Primary</Button>
<Button disabled>Default</Button>
<Button type="dashed"  disabled>Dashed</Button>
<Button type="text"    disabled>Text</Button>
<Button type="link"    disabled>Link</Button>
<Button type="primary" danger disabled>Delete</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <AspireButton type="primary" disabled>Primary</AspireButton>
      <AspireButton disabled>Default</AspireButton>
      <AspireButton type="dashed" disabled>Dashed</AspireButton>
      <AspireButton type="text" disabled>Text</AspireButton>
      <AspireButton type="link" disabled>Link</AspireButton>
      <AspireButton type="primary" danger disabled>Delete</AspireButton>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// As Link
// ─────────────────────────────────────────────────────────────────────────────

export const AsLink: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Pass `href` to render a native `<a>` tag. Add `target=\"_blank\"` for external links. No router needed.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

<Button type="primary" href="/campaigns/new">New campaign</Button>

<Button
  href="https://app.aspireiq.com"
  target="_blank"
  endIcon={<Share2 />}
>
  Open in Aspire
</Button>

<Button type="link" href="/help">Learn more</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <AspireButton type="primary" href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
        New campaign
      </AspireButton>
      <AspireButton
        href="#"
        onClick={(e: React.MouseEvent) => e.preventDefault()}
        endIcon={<Share2 />}
      >
        Open in Aspire
      </AspireButton>
      <AspireButton type="link" href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
        Learn more
      </AspireButton>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Button Group
// ─────────────────────────────────────────────────────────────────────────────

export const ButtonGroup: Story = {
  name: "Button Group",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Group related actions with a flex container. At most **one** `primary` button per group.",
      },
      source: {
        language: "tsx",
        code: `import { AspireButton as Button } from "@/components/ui/button";
import { Download, Star, Trash2 } from "lucide-react";

{/* Standard action group */}
<div className="flex gap-2">
  <Button type="primary" startIcon={<Download />}>Export</Button>
  <Button startIcon={<Star />}>Shortlist</Button>
  <Button type="text" danger startIcon={<Trash2 />}>Remove</Button>
</div>

{/* Confirmation group */}
<div className="flex gap-2">
  <Button>Cancel</Button>
  <Button type="primary" danger>Delete campaign</Button>
</div>

{/* Full-width stacked — common in modals */}
<div className="w-72 flex flex-col gap-2">
  <Button type="primary" block>Save changes</Button>
  <Button block>Save as draft</Button>
  <Button type="text" danger block>Discard</Button>
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <AspireButton type="primary" startIcon={<Download />}>Export</AspireButton>
        <AspireButton startIcon={<Star />}>Shortlist</AspireButton>
        <AspireButton type="text" danger startIcon={<Trash2 />}>Remove</AspireButton>
      </div>
      <div className="flex flex-wrap gap-2">
        <AspireButton>Cancel</AspireButton>
        <AspireButton type="primary" danger>Delete campaign</AspireButton>
      </div>
      <div className="w-72 flex flex-col gap-2">
        <AspireButton type="primary" block>Save changes</AspireButton>
        <AspireButton block>Save as draft</AspireButton>
        <AspireButton type="text" danger block>Discard</AspireButton>
      </div>
    </div>
  ),
};
