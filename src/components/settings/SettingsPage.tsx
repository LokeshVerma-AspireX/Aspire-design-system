"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  User,
  Bell,
  Shield,
  Building2,
  Users,
  CreditCard,
  Plug,
  Key,
  Palette,
  Mail,
  ChevronRight,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// ─── Section definitions ─────────────────────────────────────────────────────

type SettingsSection =
  | "profile"
  | "notifications"
  | "security"
  | "general"
  | "members"
  | "billing"
  | "integrations"
  | "api-keys"
  | "brand-kit"
  | "email-templates"

interface NavItem {
  id: SettingsSection
  label: string
  icon: React.ElementType
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "ACCOUNT",
    items: [
      { id: "profile", label: "Profile", icon: User },
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "security", label: "Security", icon: Shield },
    ],
  },
  {
    title: "WORKSPACE",
    items: [
      { id: "general", label: "General", icon: Building2 },
      { id: "members", label: "Members", icon: Users },
      { id: "billing", label: "Billing", icon: CreditCard },
    ],
  },
  {
    title: "INTEGRATIONS",
    items: [
      { id: "integrations", label: "Connected Apps", icon: Plug },
      { id: "api-keys", label: "API Keys", icon: Key },
    ],
  },
  {
    title: "BRANDING",
    items: [
      { id: "brand-kit", label: "Brand Kit", icon: Palette },
      { id: "email-templates", label: "Email Templates", icon: Mail },
    ],
  },
]

const SECTION_LABELS: Record<SettingsSection, string> = {
  profile: "Profile",
  notifications: "Notifications",
  security: "Security",
  general: "General",
  members: "Members",
  billing: "Billing",
  integrations: "Connected Apps",
  "api-keys": "API Keys",
  "brand-kit": "Brand Kit",
  "email-templates": "Email Templates",
}

const ALL_SECTION_IDS = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id))

// ─── Settings Page ───────────────────────────────────────────────────────────

interface SettingsPageProps {
  /** Override which section is shown (controlled) */
  activeSection?: SettingsSection
  /** Callback when the user navigates */
  onNavigate?: (section: SettingsSection) => void
  /** Map of section → rendered content */
  sections: Partial<Record<SettingsSection, React.ReactNode>>
  className?: string
}

function SettingsPage({
  activeSection: controlledSection,
  onNavigate: onNavigateExternal,
  sections,
  className,
}: SettingsPageProps) {
  const [internalSection, setInternalSection] =
    React.useState<SettingsSection>("profile")
  const activeSection = controlledSection ?? internalSection

  function handleNavigate(section: string) {
    setInternalSection(section as SettingsSection)
    onNavigateExternal?.(section as SettingsSection)
  }

  return (
    <Tabs
      orientation="vertical"
      value={activeSection}
      onValueChange={handleNavigate}
      className={cn("flex-1 gap-0 overflow-hidden bg-background", className)}
    >
      {/* ── Desktop vertical tab nav — fixed left column ────────── */}
      <nav className="hidden w-56 shrink-0 flex-col gap-4 overflow-y-auto border-r border-border bg-background px-4 py-8 lg:flex">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col">
            <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {group.title}
            </p>
            <TabsList variant="line" className="w-full bg-transparent p-0">
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className="justify-start gap-2.5 px-3 py-2 text-sm"
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>
        ))}
      </nav>

      {/* ── Scrollable content area ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-6 py-8 lg:px-10">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <span className="text-muted-foreground">Settings</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="size-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {SECTION_LABELS[activeSection]}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Mobile nav — dropdown only */}
          <div className="mb-6 lg:hidden">
            <Select value={activeSection} onValueChange={handleNavigate}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NAV_GROUPS.flatMap((g) => g.items).map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Section content */}
          {ALL_SECTION_IDS.map((id) => (
            <TabsContent key={id} value={id} className="mt-0">
              <div className="animate-in fade-in slide-in-from-right-2 duration-200">
                {sections[id] ?? (
                  <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                    <p>{SECTION_LABELS[id]} settings coming soon.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </div>
      </div>
    </Tabs>
  )
}

export {
  SettingsPage,
  type SettingsPageProps,
  type SettingsSection,
  SECTION_LABELS,
  NAV_GROUPS,
}
