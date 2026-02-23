import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

const meta = {
  title: "2. Foundations/Design Tokens",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Core design tokens for the Aspire Design System. All tokens are CSS custom properties (HSL) mapped into Tailwind v4 via `@theme inline` in `globals.css`. The lime-green primary (`#e3f1bb`) and warm stone neutrals are the brand palette anchors. Toggle the **Theme** toolbar above to preview dark-mode variants.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

function Swatch({
  label,
  sub,
  className,
  style,
}: {
  label: string
  sub?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div
        className={`h-14 w-full rounded-lg border border-border/50 ${className ?? ""}`}
        style={style}
      />
      <div>
        <p className="text-xs font-medium leading-tight text-foreground">{label}</p>
        {sub && (
          <p className="mt-0.5 font-mono text-[10px] leading-tight text-muted-foreground">
            {sub}
          </p>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Story 1 — Colors
// ---------------------------------------------------------------------------

export const Colors: Story = {
  name: "Colors",
  render: () => (
    <div className="max-w-3xl space-y-10">
      <Section
        title="Brand — Aspire Lime-Green"
        description="Primary lime-green drives CTAs, focus rings, active nav states, and highlights."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Swatch label="Primary"            sub="--primary · hsl(78 68% 85%)"    className="bg-primary" />
          <Swatch label="Primary Foreground" sub="--primary-foreground"            className="bg-primary-foreground border border-border" />
          <Swatch label="Accent"             sub="--accent · tint of primary"      className="bg-accent" />
          <Swatch label="Accent Foreground"  sub="--accent-foreground"             className="bg-accent-foreground" />
        </div>
      </Section>

      <Section
        title="Semantic — Backgrounds & Surfaces"
        description="Warm stone-based neutrals. Background is white in light / stone-950 in dark."
      >
        <div className="grid grid-cols-4 gap-3">
          <Swatch label="Background"        sub="--background"       className="bg-background" />
          <Swatch label="Foreground"        sub="--foreground"       className="bg-foreground" />
          <Swatch label="Card"              sub="--card"             className="bg-card" />
          <Swatch label="Card Foreground"   sub="--card-foreground"  className="bg-card-foreground" />
          <Swatch label="Muted"             sub="--muted"            className="bg-muted" />
          <Swatch label="Muted Foreground"  sub="--muted-foreground" className="bg-muted-foreground" />
          <Swatch label="Border"            sub="--border"           className="bg-border" />
          <Swatch label="Input"             sub="--input"            className="bg-input" />
        </div>
      </Section>

      <Section
        title="Status"
        description="Functional colours for feedback and state indicators. Tailwind utilities — no CSS custom property needed."
      >
        <div className="grid grid-cols-4 gap-3">
          <Swatch label="Destructive" sub="--destructive · red"  className="bg-destructive" />
          <Swatch label="Success"     sub="emerald-500"           className="bg-emerald-500" />
          <Swatch label="Warning"     sub="amber-400"             className="bg-amber-400" />
          <Swatch label="Info"        sub="blue-500"              className="bg-blue-500" />
        </div>
      </Section>

      <Section
        title="Chart Palette"
        description="Recharts series colours across PerformanceLineChart, PlatformBarChart, and CreatorScatterChart."
      >
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: "Impressions", sub: "#84cc16 · lime-500",   hex: "#84cc16" },
            { label: "Reach",       sub: "#0ea5e9 · sky-500",    hex: "#0ea5e9" },
            { label: "Engagement",  sub: "#ec4899 · pink-500",   hex: "#ec4899" },
            { label: "TMV",         sub: "#f97316 · orange-500", hex: "#f97316" },
            { label: "Revenue",     sub: "#a855f7 · purple-500", hex: "#a855f7" },
          ].map(({ label, sub, hex }) => (
            <Swatch key={label} label={label} sub={sub} style={{ backgroundColor: hex }} />
          ))}
        </div>
      </Section>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Story 2 — Typography
// ---------------------------------------------------------------------------

export const Typography: Story = {
  name: "Typography",
  render: () => (
    <div className="max-w-2xl space-y-10">
      <Section
        title="Type Scale — Inter"
        description="Inter is loaded via Google Fonts (preview-head.html → --font-geist-sans). All sizes use Tailwind rem utilities on a 4px grid."
      >
        <div className="overflow-hidden rounded-xl border bg-card">
          {[
            { name: "Display", cls: "text-4xl font-bold",     size: "2.25rem · 36px", sample: "Aspire Design System" },
            { name: "H1",      cls: "text-3xl font-bold",     size: "1.875rem · 30px",sample: "Influencer Analytics" },
            { name: "H2",      cls: "text-2xl font-semibold", size: "1.5rem · 24px",  sample: "Campaign Overview" },
            { name: "H3",      cls: "text-xl font-semibold",  size: "1.25rem · 20px", sample: "Top Performing Posts" },
            { name: "H4",      cls: "text-lg font-medium",    size: "1.125rem · 18px",sample: "Creator Rankings" },
            { name: "Body LG", cls: "text-base font-normal",  size: "1rem · 16px",    sample: "Build consistent UIs at scale." },
            { name: "Body",    cls: "text-sm font-normal",    size: "0.875rem · 14px",sample: "Design tokens power every component in this library." },
            { name: "Caption", cls: "text-xs font-normal",    size: "0.75rem · 12px", sample: "Helper text, timestamps, and metadata labels." },
            { name: "Micro",   cls: "text-[10px] font-semibold tracking-wide uppercase",
                                                              size: "0.625rem · 10px",sample: "Badge · Tag · Label" },
          ].map(({ name, cls, size, sample }, i, arr) => (
            <div
              key={name}
              className={`flex items-baseline gap-4 px-5 py-3.5 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="w-20 shrink-0 text-right">
                <span className="font-mono text-[10px] font-semibold uppercase text-muted-foreground">
                  {name}
                </span>
                <p className="font-mono text-[9px] text-muted-foreground/60">{size}</p>
              </div>
              <span className={cls}>{sample}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Font Weights">
        <div className="flex flex-wrap gap-8 rounded-xl border bg-card px-6 py-5">
          {[
            { w: "font-light",    label: "Light · 300" },
            { w: "font-normal",   label: "Regular · 400" },
            { w: "font-medium",   label: "Medium · 500" },
            { w: "font-semibold", label: "Semibold · 600" },
            { w: "font-bold",     label: "Bold · 700" },
          ].map(({ w, label }) => (
            <div key={w} className="text-center">
              <p className={`text-3xl leading-none text-foreground ${w}`}>Ag</p>
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Monospace — Geist Mono" description="Used for code snippets, CSS token names, and numeric data tables.">
        <div className="space-y-2 rounded-xl border bg-card px-5 py-4">
          {[
            "const engagement = (likes + comments) / reach * 100",
            "--primary: hsl(78 68.2% 84.7%);  /* #e3f1bb lime-green */",
            "23.4M impressions · $481K TMV · 6.8% eng. rate",
          ].map((line) => (
            <p key={line} className="font-mono text-sm text-foreground/80">
              {line}
            </p>
          ))}
        </div>
      </Section>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Story 3 — Spacing
// ---------------------------------------------------------------------------

export const Spacing: Story = {
  name: "Spacing",
  render: () => (
    <div className="max-w-xl space-y-6">
      <Section
        title="Spacing Scale"
        description="4px base unit. 1 Tailwind spacing unit = 4px. All padding, margin, and gap values derive from this grid."
      >
        <div className="space-y-2 rounded-xl border bg-card p-5">
          {[
            { t: "0.5", px: "2px",  tw: "p-0.5 / gap-0.5" },
            { t: "1",   px: "4px",  tw: "p-1   / gap-1" },
            { t: "2",   px: "8px",  tw: "p-2   / gap-2" },
            { t: "3",   px: "12px", tw: "p-3   / gap-3" },
            { t: "4",   px: "16px", tw: "p-4   / gap-4" },
            { t: "6",   px: "24px", tw: "p-6   / gap-6" },
            { t: "8",   px: "32px", tw: "p-8   / gap-8" },
            { t: "10",  px: "40px", tw: "p-10  / gap-10" },
            { t: "12",  px: "48px", tw: "p-12  / gap-12" },
            { t: "16",  px: "64px", tw: "p-16  / gap-16" },
            { t: "24",  px: "96px", tw: "p-24  / gap-24" },
          ].map(({ t, px, tw }) => (
            <div key={t} className="flex items-center gap-4">
              <span className="w-6 shrink-0 text-right font-mono text-xs text-muted-foreground">
                {t}
              </span>
              <div
                className="h-4 shrink-0 rounded-sm bg-primary/50"
                style={{ width: px }}
              />
              <span className="w-10 shrink-0 text-xs text-muted-foreground">{px}</span>
              <span className="ml-auto font-mono text-xs text-muted-foreground">{tw}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Story 4 — Border Radius
// ---------------------------------------------------------------------------

export const Radius: Story = {
  name: "Border Radius",
  render: () => (
    <div className="max-w-2xl space-y-6">
      <Section
        title="Radius Scale"
        description="Base: --radius: 0.5rem (8px). Derived tokens use calc(var(--radius) ± Npx). All shadcn/ui components reference these tokens."
      >
        <div className="flex flex-wrap items-end gap-8 rounded-xl border bg-card p-6">
          {[
            { label: "None",  cls: "rounded-none", value: "0px"    },
            { label: "SM",    cls: "rounded-sm",   value: "4px"    },
            { label: "MD",    cls: "rounded-md",   value: "6px"    },
            { label: "LG",    cls: "rounded-lg",   value: "8px"    },
            { label: "XL",    cls: "rounded-xl",   value: "12px"   },
            { label: "2XL",   cls: "rounded-2xl",  value: "16px"   },
            { label: "3XL",   cls: "rounded-3xl",  value: "24px"   },
            { label: "Full",  cls: "rounded-full", value: "9999px" },
          ].map(({ label, cls, value }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`size-14 border border-primary/50 bg-primary/25 ${cls}`} />
              <p className="text-xs font-medium text-foreground">{label}</p>
              <p className="font-mono text-[9px] text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Story 5 — Shadows
// ---------------------------------------------------------------------------

export const Shadows: Story = {
  name: "Shadows",
  render: () => (
    <div className="max-w-2xl space-y-6">
      <Section
        title="Shadow Scale"
        description="Tailwind shadow utilities. Components use shadow-xs (inputs, cards) through shadow-lg (popovers, modals)."
      >
        <div className="flex flex-wrap items-end gap-10 rounded-xl bg-muted/30 p-10">
          {[
            { label: "None", cls: "shadow-none" },
            { label: "XS",   cls: "shadow-xs"   },
            { label: "SM",   cls: "shadow-sm"   },
            { label: "Base", cls: "shadow"      },
            { label: "MD",   cls: "shadow-md"   },
            { label: "LG",   cls: "shadow-lg"   },
            { label: "XL",   cls: "shadow-xl"   },
            { label: "2XL",  cls: "shadow-2xl"  },
          ].map(({ label, cls }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className={`size-14 rounded-xl bg-card ${cls}`} />
              <p className="font-mono text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Story 6 — Token Reference (CSS snippet)
// ---------------------------------------------------------------------------

export const TokenReference: Story = {
  name: "Token Reference",
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div>
        <h2 className="text-base font-semibold text-foreground">CSS Custom Properties</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Defined in{" "}
          <code className="rounded bg-muted px-1 text-xs">src/app/globals.css</code>{" "}
          and consumed via Tailwind v4{" "}
          <code className="rounded bg-muted px-1 text-xs">@theme inline</code>.
          Toggle the <strong>Theme</strong> toolbar above to compare light / dark values live.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">globals.css · :root (light)</span>
          <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-foreground/70">
            Tailwind v4
          </span>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-muted-foreground">
{`:root {
  --radius: 0.5rem;

  /* ── Brand ─────────────────────────────── */
  --primary:            78 68.2% 84.7%;  /* #e3f1bb */
  --primary-foreground: 20 14.3%  9.8%;

  /* ── Surfaces (Warm Stone) ──────────────── */
  --background:          0  0%   100%;
  --foreground:         20 14.3%  4.1%;
  --card:                0  0%   100%;
  --muted:              60  4.8% 95.9%;
  --muted-foreground:   25  5.3% 44.7%;
  --border:             20  5.9% 90%;
  --input:              20  5.9% 90%;

  /* ── Interactive ────────────────────────── */
  --accent:             78 60%   91%;
  --accent-foreground:  24  9.8% 10%;
  --ring:               78 68.2% 75%;

  /* ── Status ─────────────────────────────── */
  --destructive:         0 72.2% 50.6%;
}`}
        </pre>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b bg-muted/50 px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">globals.css · .dark overrides</span>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-muted-foreground">
{`.dark {
  --background:   20 14.3%  4.1%;  /* stone-950 */
  --foreground:   60  9.1% 97.8%;  /* stone-50  */
  --card:         20 14.3%  7%;
  --muted:        12  6.5% 15.1%;
  --muted-foreground: 24 5.4% 63.9%;
  --border:       12  6.5% 15.1%;
  --input:        12  6.5% 15.1%;
  --accent:       78 30%   22%;
  --ring:         78 68.2% 84.7%;
  --destructive:   0 62.8% 40%;
}`}
        </pre>
      </div>
    </div>
  ),
}
