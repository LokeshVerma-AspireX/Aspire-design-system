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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeHref?: string
  user?: UserInfo
  onNavigate?: (href: string) => void
  badgeCounts?: BadgeCounts
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

// ─── Shared class overrides ──────────────────────────────────────────────────

/** Override active/hover to keep text-sidebar-foreground in all states (Aspire uses bg-only active). */
const aspireMenuButtonBase = [
  "text-sidebar-foreground",
  "hover:bg-sidebar-accent hover:text-sidebar-foreground",
  "active:text-sidebar-foreground",
  "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground data-[active=true]:font-medium",
] as const

/** Main nav items: stacked icon+label when collapsed. */
const mainNavClasses = cn(
  ...aspireMenuButtonBase,
  "gap-2.5 rounded-lg px-3 py-2",
  // Collapsed: stacked layout overriding SidebarMenuButton defaults
  "group-data-[collapsible=icon]:h-auto!",
  "group-data-[collapsible=icon]:w-full!",
  "group-data-[collapsible=icon]:flex-col",
  "group-data-[collapsible=icon]:gap-1!",
  "group-data-[collapsible=icon]:rounded-lg",
  "group-data-[collapsible=icon]:px-1!",
  "group-data-[collapsible=icon]:py-2!",
  "[&>svg]:size-5 [&>svg]:shrink-0",
  "group-data-[collapsible=icon]:[&>svg]:size-5!",
)

/** Footer nav items: icon-only 40×40 when collapsed. */
const footerNavClasses = cn(
  ...aspireMenuButtonBase,
  "gap-2.5 rounded-lg px-3 py-2",
  // Collapsed: 40×40 icon button
  "group-data-[collapsible=icon]:size-10!",
  "group-data-[collapsible=icon]:rounded!",
  "group-data-[collapsible=icon]:p-3!",
  "[&>svg]:size-5 [&>svg]:shrink-0",
  "group-data-[collapsible=icon]:[&>svg]:size-[18px]!",
)

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

// ─── AppSidebar ──────────────────────────────────────────────────────────────

function AppSidebar({
  activeHref = "/",
  user,
  onNavigate,
  badgeCounts = {},
  className,
  ...props
}: AppSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar
      collapsible="icon"
      className={cn("border-r border-sidebar-border", className)}
      {...props}
    >
      {/* ── Logo ─────────────────────────────────────────────── */}
      <SidebarHeader className={cn("py-3", isCollapsed ? "items-center px-0" : "px-4")}>
        <AspireLogo
          variant={isCollapsed ? "mark" : "full"}
          size={isCollapsed ? "lg" : "md"}
          className="text-sidebar-foreground"
        />
      </SidebarHeader>

      {/* ── Main navigation ──────────────────────────────────── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:gap-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={activeHref === item.href}
                    onClick={() => onNavigate?.(item.href)}
                    className={mainNavClasses}
                  >
                    <item.icon strokeWidth={1.5} />
                    <span
                      className={cn(
                        "truncate",
                        "group-data-[collapsible=icon]:max-w-full",
                        "group-data-[collapsible=icon]:truncate",
                        "group-data-[collapsible=icon]:text-center",
                        "group-data-[collapsible=icon]:text-[11px]",
                        "group-data-[collapsible=icon]:font-normal",
                        "group-data-[collapsible=icon]:leading-tight",
                        "group-data-[collapsible=icon]:overflow-visible",
                        "group-data-[collapsible=icon]:[text-overflow:unset]",
                      )}
                    >
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: utility nav + user avatar ────────────────── */}
      <SidebarFooter className={cn("gap-2", isCollapsed ? "items-center" : "")}>
        <SidebarMenu className={cn(isCollapsed ? "items-center gap-3" : "gap-0.5")}>
          {bottomNavItems.map((item) => {
            const badge = "badgeKey" in item ? badgeCounts[item.badgeKey] : undefined
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={activeHref === item.href}
                  tooltip={item.label}
                  onClick={() => onNavigate?.(item.href)}
                  className={footerNavClasses}
                >
                  <item.icon strokeWidth={1.5} />
                  <span>{item.label}</span>
                  {badge != null && badge > 0 && (
                    <>
                      {/* Expanded: inline pill */}
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1 text-[10px] font-semibold text-sidebar-primary-foreground group-data-[collapsible=icon]:hidden">
                        {badge > 99 ? "99+" : badge}
                      </span>
                      {/* Collapsed: absolute dot */}
                      <span className="absolute top-0.5 right-0.5 hidden h-3.5 min-w-3.5 items-center justify-center rounded-full bg-sidebar-primary px-0.5 text-[8px] font-semibold text-sidebar-primary-foreground leading-none group-data-[collapsible=icon]:flex">
                        {badge > 99 ? "99+" : badge}
                      </span>
                    </>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>

        {user && <UserAvatar user={user} collapsed={isCollapsed} />}
      </SidebarFooter>

      {/* ── Rail toggle ──────────────────────────────────────── */}
      <SidebarRail />
    </Sidebar>
  )
}

export { AppSidebar, type AppSidebarProps, type UserInfo, type BadgeCounts }
