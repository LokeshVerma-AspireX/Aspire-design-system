"use client"

import * as React from "react"
import {
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  House,
  ImagePlay,
  Inbox,
  Megaphone,
  Search,
  Settings,
  Tags,
  UserPlus,
  UsersRound,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { NavItem } from "./NavItem"
import { AspireLogo } from "./AspireLogo"

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserInfo {
  name: string
  avatarUrl?: string
  initials?: string
}

interface BadgeCounts {
  messages?: number
  [key: string]: number | undefined
}

interface SideNavProps {
  activeHref?: string
  user?: UserInfo
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  onNavigate?: (href: string) => void
  badgeCounts?: BadgeCounts
  className?: string
}

// ─── Nav definitions ─────────────────────────────────────────────────────────

const mainNavItems = [
  { icon: House,       label: "Home",      href: "/"          },
  { icon: UserPlus,    label: "Recruit",   href: "/recruit"   },
  { icon: UsersRound,  label: "Contacts",  href: "/contacts"  },
  { icon: Megaphone,   label: "Campaigns", href: "/campaigns" },
  { icon: ImagePlay,   label: "Content",   href: "/content"   },
  { icon: Tags,        label: "Offers",    href: "/offers"    },
  { icon: ChartColumn, label: "Reporting", href: "/reporting" },
] as const

const bottomNavItems = [
  { icon: Search,   label: "Search",      href: "/search"      },
  { icon: Zap,      label: "Automations", href: "/automations" },
  { icon: Inbox,    label: "Messages",    href: "/messages", badgeKey: "messages" as const },
  { icon: Settings, label: "Settings",    href: "/settings"    },
] as const

// ─── UserAvatar ──────────────────────────────────────────────────────────────

function UserAvatar({ user, collapsed }: { user: UserInfo; collapsed: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        collapsed ? "h-10 w-10 justify-center p-1.5" : "px-1.5"
      )}
    >
      <div className="size-7 shrink-0 rounded-full bg-sidebar-accent flex items-center justify-center overflow-hidden">
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatarUrl} alt={user.name} className="size-full object-cover" />
        ) : (
          <span className="text-xs font-medium text-sidebar-foreground">
            {user.initials ?? user.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      {!collapsed && (
        <span className="truncate text-sm font-medium text-sidebar-foreground">
          {user.name}
        </span>
      )}
    </div>
  )
}

// ─── SideNav ─────────────────────────────────────────────────────────────────

function SideNav({
  activeHref = "/",
  user,
  collapsed = true,
  onCollapsedChange,
  onNavigate,
  badgeCounts = {},
  className,
}: SideNavProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <nav
        data-sidebar="sidebar"
        data-collapsed={collapsed}
        className={cn(
          "relative flex h-full flex-col border-r border-sidebar-border bg-sidebar py-3",
          "transition-[width] duration-200 ease-in-out",
          collapsed ? "w-20 items-center justify-between px-1" : "w-60",
          className
        )}
      >
        {/* ── Top section: logo + main nav ─────────────────────────── */}
        <div
          className={cn(
            "flex flex-col gap-4",
            collapsed ? "items-center w-full" : "w-full"
          )}
        >
          {/* ── Logo ───────────────────────────────────────────────── */}
          <div
            className={cn(
              "flex shrink-0 items-center",
              collapsed ? "justify-center" : "px-4"
            )}
          >
            <AspireLogo
              variant={collapsed ? "mark" : "full"}
              size={collapsed ? "lg" : "md"}
              className="text-sidebar-foreground"
            />
          </div>

          {/* ── Main navigation ────────────────────────────────────── */}
          <div
            data-sidebar="menu"
            className={cn(
              "flex flex-col overflow-y-auto",
              collapsed ? "w-full items-center gap-1" : "gap-0.5 px-2"
            )}
          >
            {mainNavItems.map((item) => (
              <NavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                isActive={activeHref === item.href}
                collapsed={collapsed}
                stacked={collapsed}
                onClick={() => onNavigate?.(item.href)}
              />
            ))}
          </div>
        </div>

        {/* ── Spacer (only when expanded — collapsed uses justify-between) */}
        {!collapsed && <div className="flex-1" />}

        {/* ── Bottom section: footer nav + avatar ──────────────────── */}
        <div
          className={cn(
            "flex flex-col items-center",
            collapsed ? "gap-3 w-full" : "gap-1 px-2"
          )}
        >
          {/* ── Footer navigation ──────────────────────────────────── */}
          <div
            data-sidebar="menu"
            className={cn(
              "flex flex-col items-center",
              collapsed ? "gap-3" : "w-full gap-0.5"
            )}
          >
            {bottomNavItems.map((item) => (
              <NavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                isActive={activeHref === item.href}
                collapsed={collapsed}
                badge={"badgeKey" in item ? badgeCounts[item.badgeKey] : undefined}
                onClick={() => onNavigate?.(item.href)}
              />
            ))}
          </div>

          {/* ── User avatar ────────────────────────────────────────── */}
          {user && <UserAvatar user={user} collapsed={collapsed} />}
        </div>

        {/* ── Collapse toggle ──────────────────────────────────────── */}
        {onCollapsedChange && (
          <button
            onClick={() => onCollapsedChange(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "absolute -right-3 top-16 flex size-6 items-center justify-center",
              "rounded-full border border-sidebar-border bg-sidebar shadow-sm",
              "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              "transition-colors",
              "outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            )}
          >
            {collapsed ? (
              <ChevronRight className="size-3" />
            ) : (
              <ChevronLeft className="size-3" />
            )}
          </button>
        )}
      </nav>
    </TooltipProvider>
  )
}

export { SideNav, type SideNavProps, type UserInfo, type BadgeCounts }
