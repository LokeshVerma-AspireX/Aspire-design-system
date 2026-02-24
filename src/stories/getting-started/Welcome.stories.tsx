import type { Meta, StoryObj } from "@storybook/nextjs-vite"

function WelcomePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Aspire Design Story
        </h1>
        <p className="text-lg text-muted-foreground">
          The design system and component library powering the Aspire platform.
          Built with React, Tailwind CSS, and shadcn/ui.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border p-5 space-y-2">
          <h3 className="font-semibold">Foundations</h3>
          <p className="text-sm text-muted-foreground">
            Design tokens, colors, typography, and brand assets that form the
            visual language of Aspire.
          </p>
        </div>

        <div className="rounded-lg border p-5 space-y-2">
          <h3 className="font-semibold">Primitives</h3>
          <p className="text-sm text-muted-foreground">
            Low-level UI building blocks: buttons, inputs, checkboxes, badges,
            and other atomic elements.
          </p>
        </div>

        <div className="rounded-lg border p-5 space-y-2">
          <h3 className="font-semibold">Components</h3>
          <p className="text-sm text-muted-foreground">
            Composed UI elements organized by function: data display, forms,
            feedback, navigation, tables, and charts.
          </p>
        </div>

        <div className="rounded-lg border p-5 space-y-2">
          <h3 className="font-semibold">Pages</h3>
          <p className="text-sm text-muted-foreground">
            Full page compositions for Contacts, Offers, Analytics, Inbox,
            Settings, and more.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>
            <strong className="text-foreground">React 19</strong> with Next.js
            App Router
          </li>
          <li>
            <strong className="text-foreground">Tailwind CSS v4</strong> for
            utility-first styling
          </li>
          <li>
            <strong className="text-foreground">shadcn/ui</strong> for
            accessible, customizable primitives
          </li>
          <li>
            <strong className="text-foreground">Radix UI</strong> headless
            primitives under the hood
          </li>
          <li>
            <strong className="text-foreground">Lucide</strong> icon set
          </li>
          <li>
            <strong className="text-foreground">Storybook 8</strong> for
            interactive documentation
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">Quick Navigation</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="/?path=/story/1-getting-started-component-index--gallery"
            className="block p-5 rounded-xl border border-stone-200 hover:border-[#16282D]
                       hover:shadow-md transition-all group"
          >
            <p className="text-2xl mb-2">{"🧩"}</p>
            <p className="font-semibold text-stone-900 group-hover:text-[#16282D]">Component Gallery</p>
            <p className="text-sm text-muted-foreground mt-1">Browse all components with live previews</p>
          </a>
          <a
            href="/?path=/docs/2-foundations-design-tokens--documentation"
            className="block p-5 rounded-xl border border-stone-200 hover:border-[#16282D]
                       hover:shadow-md transition-all group"
          >
            <p className="text-2xl mb-2">{"🎨"}</p>
            <p className="font-semibold text-stone-900 group-hover:text-[#16282D]">Design Tokens</p>
            <p className="text-sm text-muted-foreground mt-1">Colors, typography, spacing, and brand assets</p>
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          Use the sidebar to browse components by category. Toggle dark mode
          using the theme switcher in the toolbar above.
        </p>
      </div>
    </div>
  )
}

const meta = {
  title: "1. Getting Started/Welcome",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Introduction to Aspire Design Story — the component library and design system for the Aspire platform.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Welcome",
  render: () => <WelcomePage />,
}
