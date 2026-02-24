import type { Meta, StoryObj } from "@storybook/nextjs-vite"

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
      <code>{children}</code>
    </pre>
  )
}

function HowToUsePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">How to Use</h1>
        <p className="text-lg text-muted-foreground">
          Import patterns, theming guide, and dark mode usage for Aspire Design
          Story components.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Importing Components</h2>
        <p className="text-sm text-muted-foreground">
          All primitives and UI components are located under{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
            @/components/ui/
          </code>
          . Shared components live under{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
            @/components/shared/
          </code>
          .
        </p>
        <CodeBlock>
          {`// Primitives
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Shared components
import { FilterBar } from "@/components/shared/FilterBar"
import { Pagination } from "@/components/shared/Pagination"
import { DataTable } from "@/components/shared/DataTable"

// Layout
import { AppShell } from "@/components/layout/AppShell"
import { AppSidebar } from "@/components/layout/AppSidebar"`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Theme Customization</h2>
        <p className="text-sm text-muted-foreground">
          Aspire uses CSS custom properties (design tokens) for theming. All
          tokens are defined in{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
            globals.css
          </code>{" "}
          and follow the shadcn/ui convention.
        </p>
        <CodeBlock>
          {`/* Key design tokens */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.965 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --border: oklch(0.922 0 0);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark overrides */
}`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Dark Mode</h2>
        <p className="text-sm text-muted-foreground">
          Dark mode is activated by adding the{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">dark</code>{" "}
          class to a parent element. In Storybook, use the theme toggle in the
          toolbar.
        </p>
        <CodeBlock>
          {`// Wrap your app or a section with the dark class
<div className="dark">
  <div className="bg-background text-foreground">
    {/* Components automatically adapt */}
    <Button>I'm dark themed</Button>
  </div>
</div>`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Component Variants</h2>
        <p className="text-sm text-muted-foreground">
          Most components support variant props powered by{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
            class-variance-authority
          </code>
          . Check each component's story for available variants.
        </p>
        <CodeBlock>
          {`<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>`}
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Design System Hierarchy</h2>
        <div className="rounded-lg border p-5 space-y-3">
          <div className="grid gap-2 text-sm">
            <div className="flex gap-3">
              <span className="font-mono text-muted-foreground w-24 shrink-0">
                Foundations
              </span>
              <span>Tokens, colors, typography, brand</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-muted-foreground w-24 shrink-0">
                Primitives
              </span>
              <span>Atomic UI elements (Button, Input, Badge...)</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-muted-foreground w-24 shrink-0">
                Components
              </span>
              <span>Composed molecules (DataTable, FilterBar, Dialog...)</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-muted-foreground w-24 shrink-0">
                Layout
              </span>
              <span>App shell, sidebar, page headers</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-muted-foreground w-24 shrink-0">
                Pages
              </span>
              <span>Full page compositions and flows</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: "1. Getting Started/How to Use",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Guide covering import patterns, theming, dark mode, and component variant usage in Aspire Design Story.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "How to Use",
  render: () => <HowToUsePage />,
}
