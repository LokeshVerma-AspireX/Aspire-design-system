import type { ComponentType, CSSProperties } from 'react'

import {
  ChartPieIcon,
  ChartScatterIcon,
  ChevronRightIcon,
  CircleUserIcon,
  FileChartPieIcon,
  HomeIcon,
  LinkIcon,
  ScanLineIcon,
  SettingsIcon,
  TrendingUpIcon
} from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar'

import LogoSvg from '@/assets/svg/logo'

type MenuSubItem = {
  label: string
  href: string
  badge?: string
}

type MenuItem = {
  icon: ComponentType
  label: string
} & (
  | {
      href: string
      badge?: string
      items?: never
    }
  | { href?: never; badge?: never; items: MenuSubItem[] }
)

const menuItems: MenuItem[] = [
  {
    icon: HomeIcon,
    label: 'Home',
    href: '#'
  }
]

const tradingItems: MenuItem[] = [
  {
    icon: CircleUserIcon,
    label: 'Portfolio',
    href: '#'
  },
  {
    icon: ChartPieIcon,
    label: 'Market',
    href: '#'
  },
  {
    icon: TrendingUpIcon,
    label: 'Trading',
    href: '#'
  }
]

const analyticsItems: MenuItem[] = [
  {
    icon: ChartScatterIcon,
    label: 'Stocks',
    href: '#'
  },
  {
    icon: ScanLineIcon,
    label: 'Scanner',
    href: '#'
  },
  {
    icon: FileChartPieIcon,
    label: 'Analytics',
    href: '#'
  }
]

const settingsItems: MenuItem[] = [
  {
    icon: SettingsIcon,
    label: 'Settings',
    items: [
      { label: 'Profile', href: '#' },
      { label: 'Notifications', href: '#' },
      { label: 'Security', href: '#' }
    ]
  },
  {
    icon: LinkIcon,
    label: 'Invite',
    href: '#'
  }
]

const SidebarGroupedMenuItems = ({ data, groupLabel }: { data: MenuItem[]; groupLabel?: string }) => {
  return (
    <SidebarGroup>
      {groupLabel && (
        <SidebarGroupLabel className='group-data-[collapsible=icon]:opacity-100 [[data-state=collapsed]_&]:mb-2'>
          <hr className='hidden w-full [[data-state=collapsed]_&]:block' />
          <span className='[[data-state=collapsed]_&]:hidden'>{groupLabel}</span>
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className='[[data-state=collapsed]_&]:gap-0.5'>
          {data.map(item =>
            item.items ? (
              <Collapsible className='group/collapsible' key={item.label}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className='[[data-state=collapsed]_&>span:last-child]:overflow-unset [[data-state=collapsed]_&>span:last-child]:[text-overflow=unset] truncate [[data-state=collapsed]_&]:h-auto! [[data-state=collapsed]_&]:w-14! [[data-state=collapsed]_&]:flex-col [[data-state=collapsed]_&]:gap-2.5! [[data-state=collapsed]_&>span]:text-xs [[data-state=collapsed]_&>svg]:size-5!'>
                      <item.icon />
                      <span>{item.label}</span>
                      <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 [[data-state=collapsed]_&]:hidden' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map(subItem => (
                        <SidebarMenuSubItem key={subItem.label}>
                          <SidebarMenuSubButton className='justify-between' asChild>
                            <a href={subItem.href}>
                              {subItem.label}
                              {subItem.badge && (
                                <span className='bg-primary/10 flex h-5 min-w-5 items-center justify-center rounded-full text-xs'>
                                  {subItem.badge}
                                </span>
                              )}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  className='[[data-state=collapsed]_&>span:last-child]:overflow-unset [[data-state=collapsed]_&>span:last-child]:[text-overflow=unset] [[data-state=collapsed]_&]:h-auto! [[data-state=collapsed]_&]:w-14! [[data-state=collapsed]_&]:flex-col [[data-state=collapsed]_&]:gap-2.5! [[data-state=collapsed]_&>span:last-child]:text-xs [[data-state=collapsed]_&>svg]:size-5!'
                  asChild
                >
                  <a href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
                {item.badge && <SidebarMenuBadge className='bg-primary/10 rounded-full'>{item.badge}</SidebarMenuBadge>}
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const SidebarPage = () => {
  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider defaultOpen={false} style={{ '--sidebar-width-icon': '4.5625rem' } as CSSProperties}>
        <Sidebar collapsible='icon'>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size='lg'
                  className='gap-2.5 !bg-transparent group-data-[collapsible=icon]:h-9.5! group-data-[collapsible=icon]:w-14! group-data-[collapsible=icon]:px-3! group-data-[collapsible=icon]:py-1! [&>svg]:size-8'
                  asChild
                >
                  <a href='#'>
                    <LogoSvg className='[&_rect]:fill-sidebar [&_rect:first-child]:fill-primary' />
                    <span className='text-xl font-semibold'>Trading Hub</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <ScrollArea className='h-[calc(100dvh-4rem)] [[data-state=collapsed]_&]:h-[calc(100dvh-3.375rem)]'>
            <SidebarContent>
              <SidebarGroupedMenuItems data={menuItems} />
              <SidebarGroupedMenuItems data={tradingItems} groupLabel='Trading' />
              <SidebarGroupedMenuItems data={analyticsItems} groupLabel='Analytics' />
              <SidebarGroupedMenuItems data={settingsItems} groupLabel='Settings' />
            </SidebarContent>
          </ScrollArea>
          <SidebarRail />
        </Sidebar>
        <div className='flex flex-1 flex-col'>
          <header className='bg-card sticky top-0 z-50 h-13.75 border-b'>
            <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6'>
              <div className='border-card-foreground/10 size-full bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)] max-lg:hidden' />
              <SidebarTrigger className='md:hidden' />
            </div>
          </header>
          <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
            <Card className='h-250 shadow-none'>
              <CardContent className='h-full'>
                <div className='border-card-foreground/10 h-full rounded-md border bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]' />
              </CardContent>
            </Card>
          </main>
          <footer className='bg-card h-10 border-t'>
            <div className='mx-auto size-full max-w-7xl px-4 sm:px-6'>
              <div className='border-card-foreground/10 h-full bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]' />
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default SidebarPage
