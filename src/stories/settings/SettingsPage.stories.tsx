import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { SettingsPage, type SettingsSection } from "@/components/settings/SettingsPage"
import { ProfileSettings } from "@/components/settings/ProfileSettings"
import { NotificationSettings } from "@/components/settings/NotificationSettings"
import { SecuritySettings } from "@/components/settings/SecuritySettings"
import { MembersSettings } from "@/components/settings/MembersSettings"
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings"
import { BillingSettings } from "@/components/settings/BillingSettings"
import { BrandKitSettings } from "@/components/settings/BrandKitSettings"
import { AppShell } from "@/components/layout/AppShell"

const SECTIONS: Record<string, React.ReactNode> = {
  profile: <ProfileSettings />,
  notifications: <NotificationSettings />,
  security: <SecuritySettings />,
  members: <MembersSettings />,
  integrations: <IntegrationsSettings />,
  billing: <BillingSettings />,
  "brand-kit": <BrandKitSettings />,
}

/**
 * # SettingsPage
 *
 * Full settings experience inside the app shell. Vertical tab navigation on desktop,
 * dropdown select on mobile. Includes Profile, Notifications, Security, Members,
 * Integrations, Billing, and Brand Kit sections.
 *
 * ## Components Used
 * - `SettingsPage` — main layout with vertical `Tabs` navigation
 * - `ProfileSettings` / `NotificationSettings` / `SecuritySettings` — account sections
 * - `MembersSettings` / `IntegrationsSettings` / `BillingSettings` / `BrandKitSettings` — workspace sections
 * - `AppShell` — application shell decorator providing the sidebar
 * - `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — section switching
 * - `Select`, `SelectTrigger`, `SelectContent`, `SelectItem` — mobile navigation
 * - `Breadcrumb` — contextual breadcrumb trail
 *
 * ## Data Requirements
 * - `sections` — `Partial<Record<SettingsSection, React.ReactNode>>` mapping section IDs to rendered content
 * - `activeSection` (optional) — controlled section ID (`"profile"`, `"notifications"`, etc.)
 * - `onNavigate` (optional) — callback when user switches sections
 *
 * ## Customization
 * - Swap any section content by changing the `sections` map
 * - Add or remove sections by editing `NAV_GROUPS` in the component source
 * - Control navigation externally via `activeSection` + `onNavigate`
 * - Wrap in `AppShell` or use standalone without a sidebar
 *
 * ```tsx
 * import { SettingsPage } from "@/components/settings/SettingsPage"
 * ```
 */
const meta = {
  title: "6. Pages/Settings/SettingsPage",
  component: SettingsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <AppShell
        activeHref="/settings"
        user={{ name: "Jason Roh", initials: "JR" }}
        badgeCounts={{ messages: 2 }}
        defaultCollapsed
      >
        <Story />
      </AppShell>
    ),
  ],
  args: {
    sections: SECTIONS,
  },
} satisfies Meta<typeof SettingsPage>

export default meta
type Story = StoryObj<typeof meta>

/** Profile settings section — avatar, display name, email, and bio. */
export const Profile: Story = {
  args: { activeSection: "profile" },
}

/** Notification preferences — email digests, push settings, and frequency. */
export const Notifications: Story = {
  args: { activeSection: "notifications" },
}

/** Security settings — password change, two-factor auth, and sessions. */
export const Security: Story = {
  args: { activeSection: "security" },
}

/** Team members list — invite, roles, and removal. */
export const Members: Story = {
  args: { activeSection: "members" },
}

/** Connected integrations — third-party app connections. */
export const Integrations: Story = {
  args: { activeSection: "integrations" },
}

/** Billing settings — plan, invoices, and payment method. */
export const Billing: Story = {
  args: { activeSection: "billing" },
}

/** Brand Kit — logos, colors, and font configuration. */
export const BrandKit: Story = {
  args: { activeSection: "brand-kit" },
}

/** Interactive mode — click the vertical tabs to switch between settings sections. */
export const Interactive: Story = {
  args: { activeSection: undefined },
}
