/**
 * DocBlocks — premium shared documentation components for the Aspire Design Story.
 *
 * Used in .mdx component docs pages to render:
 *   • ComponentHeader  — hero section at the top of each docs page
 *   • SpecSection      — color-coded section dividers separating spec areas
 *   • KeyboardTable    — styled keyboard interaction reference
 *   • AriaTable        — styled ARIA contract reference
 *   • DemoNote         — instructional callout for interactive demos
 *   • PropBadge        — inline type / default-value chips
 */

import * as React from "react"
import {
  Layers,
  MousePointerClick,
  Accessibility,
  BookOpen,
  Layout,
  FlaskConical,
  Check,
  X,
  Package,
  Sparkles,
  Clock,
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type SpecAccent = "blue" | "violet" | "emerald" | "amber" | "stone" | "rose"

export type StatusType = "stable" | "beta" | "new" | "deprecated"

// ─────────────────────────────────────────────────────────────────────────────
// Accent token map — all hardcoded to avoid Tailwind dynamic-class issues
// ─────────────────────────────────────────────────────────────────────────────

const ACCENT: Record<SpecAccent, { bg: string; border: string; text: string; iconColor: string }> = {
  blue: {
    bg: "#eff6ff",
    border: "#bfdbfe",
    text: "#1d4ed8",
    iconColor: "#3b82f6",
  },
  violet: {
    bg: "#f5f3ff",
    border: "#ddd6fe",
    text: "#6d28d9",
    iconColor: "#8b5cf6",
  },
  emerald: {
    bg: "#ecfdf5",
    border: "#a7f3d0",
    text: "#065f46",
    iconColor: "#10b981",
  },
  amber: {
    bg: "#fffbeb",
    border: "#fde68a",
    text: "#92400e",
    iconColor: "#f59e0b",
  },
  stone: {
    bg: "#f5f5f4",
    border: "#e7e5e4",
    text: "#44403c",
    iconColor: "#78716c",
  },
  rose: {
    bg: "#fff1f2",
    border: "#fecdd3",
    text: "#9f1239",
    iconColor: "#f43f5e",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Section icon mapping
// ─────────────────────────────────────────────────────────────────────────────

const SECTION_ICONS: Record<string, React.ElementType> = {
  "Visual Spec": Layers,
  "Interaction": MousePointerClick,
  "Accessibility": Accessibility,
  "Guidelines": BookOpen,
  "In Context": Layout,
  "Tests": FlaskConical,
}

// ─────────────────────────────────────────────────────────────────────────────
// Status badge config
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<StatusType, { label: string; bg: string; text: string; border: string; Icon: React.ElementType }> = {
  stable: {
    label: "Stable",
    bg: "#ecfdf5",
    text: "#065f46",
    border: "#a7f3d0",
    Icon: Check,
  },
  beta: {
    label: "Beta",
    bg: "#fffbeb",
    text: "#92400e",
    border: "#fde68a",
    Icon: Clock,
  },
  new: {
    label: "New",
    bg: "#f5f3ff",
    text: "#6d28d9",
    border: "#ddd6fe",
    Icon: Sparkles,
  },
  deprecated: {
    label: "Deprecated",
    bg: "#fff1f2",
    text: "#9f1239",
    border: "#fecdd3",
    Icon: X,
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// ComponentHeader
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentHeaderProps {
  /** e.g. "Components", "Primitives", "Patterns" */
  category?: string
  /** Component display name */
  name: string
  /** One-sentence description shown below the name */
  description: string
  /** Lifecycle status badge */
  status?: StatusType
  /** Import path shown in the code block */
  importPath?: string
  /** Named exports shown in the import snippet */
  namedExports?: string[]
}

export function ComponentHeader({
  category = "Components",
  name,
  description,
  status = "stable",
  importPath,
  namedExports,
}: ComponentHeaderProps) {
  const statusCfg = STATUS_CONFIG[status]
  const StatusIcon = statusCfg.Icon
  const defaultImportPath = importPath ?? `@/components/ui/${name.toLowerCase()}`
  const defaultExports = namedExports ?? [name]
  const importLine = `import { ${defaultExports.join(", ")} } from "${defaultImportPath}"`

  return (
    <div
      style={{
        borderBottom: "1px solid var(--color-border, #e7e5e4)",
        paddingBottom: "2rem",
        marginBottom: "0.5rem",
      }}
    >
      {/* Category + status row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#7cad2f",
            background: "#f3f9e6",
            border: "1px solid #c6e48b",
            padding: "2px 8px",
            borderRadius: "999px",
          }}
        >
          <Package style={{ width: 10, height: 10 }} />
          {category}
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "11px",
            fontWeight: 500,
            color: statusCfg.text,
            background: statusCfg.bg,
            border: `1px solid ${statusCfg.border}`,
            padding: "2px 8px",
            borderRadius: "999px",
          }}
        >
          <StatusIcon style={{ width: 10, height: 10 }} />
          {statusCfg.label}
        </span>
      </div>

      {/* Component name */}
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "var(--color-foreground, #1c1917)",
          margin: "0 0 0.625rem",
        }}
      >
        {name}
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: "1.0625rem",
          color: "var(--color-muted-foreground, #78716c)",
          lineHeight: 1.65,
          maxWidth: "54ch",
          margin: "0 0 1.5rem",
        }}
      >
        {description}
      </p>

      {/* Import code block */}
      <div
        style={{
          background: "#1c1917",
          borderRadius: "8px",
          padding: "12px 16px",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          maxWidth: "100%",
        }}
      >
        <span style={{ fontSize: "11px", color: "#78716c", flexShrink: 0 }}>tsx</span>
        <span
          style={{
            fontFamily: "'Geist Mono', 'Fira Code', monospace",
            fontSize: "13px",
            color: "#e7e5e4",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span style={{ color: "#a78bfa" }}>import</span>
          <span style={{ color: "#e7e5e4" }}> {"{ "}</span>
          <span style={{ color: "#6ee7b7" }}>{defaultExports.join(", ")}</span>
          <span style={{ color: "#e7e5e4" }}>{" }"}</span>
          <span style={{ color: "#a78bfa" }}> from </span>
          <span style={{ color: "#fcd34d" }}>"{defaultImportPath}"</span>
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SpecSection
// ─────────────────────────────────────────────────────────────────────────────

export interface SpecSectionProps {
  /** Section title — also determines the default icon */
  title: string
  /** Short description of what this section covers */
  description?: string
  /** Color accent theme */
  accent: SpecAccent
  /** Override the auto-selected icon */
  icon?: React.ElementType
}

export function SpecSection({ title, description, accent, icon }: SpecSectionProps) {
  const colors = ACCENT[accent]
  const Icon = icon ?? SECTION_ICONS[title] ?? Layers

  return (
    <div
      style={{
        display: "flex",
        alignItems: description ? "flex-start" : "center",
        gap: "0.75rem",
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: "10px",
        padding: "12px 16px",
        marginTop: "2.5rem",
        marginBottom: "1.25rem",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "6px",
          background: colors.iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon style={{ width: 14, height: 14, color: "#fff" }} />
      </div>
      <div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: colors.text,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted-foreground, #78716c)",
              marginTop: "2px",
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// KeyboardTable
// ─────────────────────────────────────────────────────────────────────────────

export interface KeyboardRow {
  key: string
  behavior: string
}

export function KeyboardTable({ rows }: { rows: KeyboardRow[] }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border, #e7e5e4)",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "1.5rem",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr style={{ background: "#f5f5f4" }}>
            <th
              style={{
                padding: "8px 14px",
                textAlign: "left",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#78716c",
                borderBottom: "1px solid #e7e5e4",
                width: "30%",
              }}
            >
              Key
            </th>
            <th
              style={{
                padding: "8px 14px",
                textAlign: "left",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#78716c",
                borderBottom: "1px solid #e7e5e4",
              }}
            >
              Behavior
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 0 ? "#fff" : "#fafaf9",
                borderBottom: i < rows.length - 1 ? "1px solid #f5f5f4" : "none",
              }}
            >
              <td style={{ padding: "9px 14px", verticalAlign: "middle" }}>
                <kbd
                  style={{
                    fontFamily: "'Geist Mono', 'Fira Code', monospace",
                    fontSize: "12px",
                    background: "#f5f5f4",
                    border: "1px solid #d6d3d1",
                    borderRadius: "4px",
                    padding: "1px 7px",
                    boxShadow: "0 1px 0 #d6d3d1",
                    color: "#44403c",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.key}
                </kbd>
              </td>
              <td
                style={{
                  padding: "9px 14px",
                  color: "var(--color-foreground, #1c1917)",
                  lineHeight: 1.5,
                }}
              >
                {row.behavior}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AriaTable
// ─────────────────────────────────────────────────────────────────────────────

export interface AriaRow {
  attribute: string
  value: string
  notes?: string
}

export function AriaTable({ rows }: { rows: AriaRow[] }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border, #e7e5e4)",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "1.5rem",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr style={{ background: "#f5f5f4" }}>
            <th
              style={{
                padding: "8px 14px",
                textAlign: "left",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#78716c",
                borderBottom: "1px solid #e7e5e4",
                width: "35%",
              }}
            >
              Attribute
            </th>
            <th
              style={{
                padding: "8px 14px",
                textAlign: "left",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#78716c",
                borderBottom: "1px solid #e7e5e4",
                width: rows.some((r) => r.notes) ? "30%" : "65%",
              }}
            >
              Value
            </th>
            {rows.some((r) => r.notes) && (
              <th
                style={{
                  padding: "8px 14px",
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#78716c",
                  borderBottom: "1px solid #e7e5e4",
                }}
              >
                Notes
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 0 ? "#fff" : "#fafaf9",
                borderBottom: i < rows.length - 1 ? "1px solid #f5f5f4" : "none",
              }}
            >
              <td style={{ padding: "9px 14px", verticalAlign: "top" }}>
                <code
                  style={{
                    fontFamily: "'Geist Mono', 'Fira Code', monospace",
                    fontSize: "12px",
                    background: "#f0fdf4",
                    color: "#166534",
                    borderRadius: "4px",
                    padding: "1px 6px",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  {row.attribute}
                </code>
              </td>
              <td
                style={{
                  padding: "9px 14px",
                  color: "var(--color-foreground, #1c1917)",
                  lineHeight: 1.5,
                  verticalAlign: "top",
                }}
              >
                {row.value}
              </td>
              {rows.some((r) => r.notes) && (
                <td
                  style={{
                    padding: "9px 14px",
                    color: "var(--color-muted-foreground, #78716c)",
                    fontSize: "12px",
                    lineHeight: 1.5,
                    verticalAlign: "top",
                  }}
                >
                  {row.notes ?? "—"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DemoNote
// ─────────────────────────────────────────────────────────────────────────────

export function DemoNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.625rem",
        background: "#eff6ff",
        border: "1px solid #bfdbfe",
        borderRadius: "8px",
        padding: "10px 14px",
        marginBottom: "1rem",
        fontSize: "13px",
        lineHeight: 1.55,
        color: "#1e40af",
      }}
    >
      <svg
        style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1 }}
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 3a.75.75 0 1 1 0 1.5A.75.75 0 0 1 8 4Zm-.25 3h1.5v4.5h-1.5V7Z" />
      </svg>
      <span>{children}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SectionDivider — thin line between subsections within a SpecSection
// ─────────────────────────────────────────────────────────────────────────────

export function SectionDivider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--color-border, #e7e5e4)",
        margin: "2rem 0",
      }}
    />
  )
}
