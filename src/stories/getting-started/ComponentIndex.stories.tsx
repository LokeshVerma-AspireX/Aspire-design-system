import type { Meta, StoryObj } from "@storybook/react"

/**
 * # Component Index
 *
 * Complete reference of all Aspire Design System components.
 * This page is designed to be readable by both humans and AI agents.
 *
 * ---
 *
 * ## Primitives (Base UI Elements)
 *
 * | Component | Import | Description | Key Props |
 * |-----------|--------|-------------|-----------|
 * | Button | `import { Button } from '@/components/ui/button'` | Triggers actions | `variant`, `size`, `disabled`, `asChild` |
 * | Input | `import { Input } from '@/components/ui/input'` | Text input field | `type`, `placeholder`, `disabled` |
 * | Textarea | `import { Textarea } from '@/components/ui/textarea'` | Multi-line text input | `placeholder`, `rows`, `disabled` |
 * | Select | `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'` | Dropdown selection | `value`, `onValueChange`, `placeholder` |
 * | Checkbox | `import { Checkbox } from '@/components/ui/checkbox'` | Boolean toggle | `checked`, `onCheckedChange`, `disabled` |
 * | RadioGroup | `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'` | Single selection from options | `value`, `onValueChange`, `disabled` |
 * | Switch | `import { Switch } from '@/components/ui/switch'` | On/off toggle | `checked`, `onCheckedChange`, `size` |
 * | Toggle | `import { Toggle } from '@/components/ui/toggle'` | Pressable toggle button | `variant`, `size`, `pressed`, `onPressedChange` |
 * | Label | `import { Label } from '@/components/ui/label'` | Form field label | `htmlFor`, `children` |
 * | Separator | `import { Separator } from '@/components/ui/separator'` | Visual divider line | `orientation`, `decorative` |
 * | Avatar | `import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'` | User photo with fallback | `size`, `src`, `alt`, fallback text |
 * | Badge | `import { Badge } from '@/components/ui/badge'` | Status/category label | `variant: default/secondary/destructive/outline/ghost/link` |
 * | Tooltip | `import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'` | Hover hint | `content`, `side`, `align` |
 * | Card | `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@/components/ui/card'` | Content container | `children` |
 *
 * ## Data Display Components
 *
 * | Component | Import | Description | Key Props |
 * |-----------|--------|-------------|-----------|
 * | Calendar | `import { Calendar } from '@/components/ui/calendar'` | Date picker | `mode`, `selected`, `onSelect`, `disabled` |
 * | Progress | `import { Progress } from '@/components/ui/progress'` | Progress bar | `value` (0-100) |
 * | Skeleton | `import { Skeleton } from '@/components/ui/skeleton'` | Loading placeholder | `className` (controls shape) |
 * | ScrollArea | `import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'` | Custom scrollbar container | `orientation` |
 * | Accordion | `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'` | Expandable sections | `type: single/multiple`, `collapsible` |
 * | Carousel | `import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'` | Swipeable content | `orientation`, `opts` |
 * | HoverCard | `import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'` | Rich hover popup | `align`, `sideOffset` |
 * | Table | `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'` | Basic HTML table | standard table props |
 * | AspectRatio | `import { AspectRatio } from '@/components/ui/aspect-ratio'` | Fixed aspect container | `ratio` |
 * | Collapsible | `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'` | Toggle visibility | `open`, `onOpenChange` |
 * | MetricCard | `import { MetricCard } from '@/components/analytics/MetricCard'` | KPI display card | `label`, `value`, `change`, `sparklineData` |
 * | StatusDot | `import { StatusDot } from '@/components/shared/StatusDot'` | Colored status indicator | `status: active/deactivated/paused/error` |
 * | TagPillGroup | `import { TagPillGroup } from '@/components/shared/TagPillGroup'` | Colored tag pills | `pills` array with `label` and `color` |
 * | CollapsibleSection | `import { CollapsibleSection } from '@/components/shared/CollapsibleSection'` | Titled collapsible | `title`, `defaultOpen`, `children` |
 * | CopyButton | `import { CopyButton } from '@/components/shared/CopyButton'` | Copy-to-clipboard | `value`, `copiedLabel` |
 *
 * ## Feedback Components
 *
 * | Component | Import | Description | Key Props |
 * |-----------|--------|-------------|-----------|
 * | Alert | `import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'` | Inline notification | `variant: default/destructive` |
 * | AlertDialog | `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, ... } from '@/components/ui/alert-dialog'` | Confirmation modal | `size: default/sm` |
 * | Dialog | `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, ... } from '@/components/ui/dialog'` | Modal overlay | `showCloseButton` |
 * | Sheet | `import { Sheet, SheetTrigger, SheetContent, ... } from '@/components/ui/sheet'` | Slide-out panel | `side: top/right/bottom/left` |
 * | Popover | `import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'` | Floating content | `align`, `sideOffset` |
 * | EmptyState | `import { EmptyState } from '@/components/shared/EmptyState'` | No-data placeholder | `icon`, `title`, `description`, `actionLabel`, `onAction` |
 *
 * ## Form Components
 *
 * | Component | Import | Description | Key Props |
 * |-----------|--------|-------------|-----------|
 * | ImageUploadArea | `import { ImageUploadArea } from '@/components/shared/ImageUploadArea'` | Drag & drop image upload | `previewUrl`, `onFileSelect`, `onRemove` |
 * | FeatureToggleCard | `import { FeatureToggleCard } from '@/components/shared/FeatureToggleCard'` | Feature toggle with card | `title`, `checked`, `onCheckedChange`, `checklistItems` |
 * | DiscountValueInput | `import { DiscountValueInput } from '@/components/shared/DiscountValueInput'` | Flat/percent toggle input | `mode: flat/percent`, `value`, `onChange` |
 * | FormFooter | `import { FormFooter } from '@/components/shared/FormFooter'` | Wizard/form footer | `onNext`, `onPrevious`, `onClose`, `nextLabel` |
 *
 * ## Navigation Components
 *
 * | Component | Import | Description | Key Props |
 * |-----------|--------|-------------|-----------|
 * | Breadcrumb | `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@/components/ui/breadcrumb'` | Page location trail | `asChild` on BreadcrumbLink |
 * | Command | `import { Command, CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem } from '@/components/ui/command'` | Command palette | `title`, `description` |
 * | ContextMenu | `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '@/components/ui/context-menu'` | Right-click menu | `variant: default/destructive` |
 * | DropdownMenu | `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'` | Click dropdown | `sideOffset`, `variant` |
 * | NavigationMenu | `import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu'` | Top nav bar | `viewport` |
 * | Tabs | `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'` | Tab navigation | `variant: default/line`, `orientation` |
 * | StepperSidebar | `import { StepperSidebar } from '@/components/shared/StepperSidebar'` | Wizard step indicator | `steps`, `activeStep` |
 *
 * ## Table Components
 *
 * | Component | Import | Description | Key Props |
 * |-----------|--------|-------------|-----------|
 * | DataTable | `import { DataTable } from '@/components/shared/DataTable'` | Advanced data table | `data`, `columns`, `selectable`, `sortColumn`, `rowActions` |
 * | FilterBar | `import { FilterBar } from '@/components/shared/FilterBar'` | Filter controls | `savedViews`, `quickFilters`, `appliedFilters` |
 * | TableActionBar | `import { TableActionBar } from '@/components/shared/TableActionBar'` | Table toolbar | `actions`, `searchValue`, `onExport`, `view` |
 * | Pagination | `import { Pagination } from '@/components/shared/Pagination'` | Page navigation | `currentPage`, `totalPages`, `onPageChange` |
 * | ViewToggle | `import { ViewToggle } from '@/components/shared/ViewToggle'` | Grid/list switcher | `value: grid/list`, `onChange` |
 *
 * ## Layout Components
 *
 * | Component | Import | Description |
 * |-----------|--------|-------------|
 * | AppShell | `import { AppShell } from '@/components/layout/AppShell'` | Full page layout with sidebar |
 * | AppSidebar | `import { AppSidebar } from '@/components/layout/AppSidebar'` | Navigation sidebar |
 * | PageHeader | `import { PageHeader } from '@/components/layout/PageHeader'` | Page title + breadcrumbs + actions |
 * | AspireLogo | `import { AspireLogo } from '@/components/layout/AspireLogo'` | Brand logo (mark, circle, full) |
 * | AstraButton | `import { AstraButton } from '@/components/layout/AstraButton'` | AI assistant button |
 *
 * ## Wizard / Multi-Step Components
 *
 * | Component | Import | Description | Key Props |
 * |-----------|--------|-------------|-----------|
 * | CreationWizard | `import { CreationWizard } from '@/components/shared/wizard'` | Multi-step form wizard | `title`, `steps`, `onComplete`, `onCancel` |
 * | WizardStepper | `import { WizardStepper } from '@/components/shared/wizard'` | Step progress sidebar | `steps`, `currentStep` |
 * | WizardHeader | `import { WizardHeader } from '@/components/shared/wizard'` | Step counter header | `title`, `currentStep`, `totalSteps` |
 * | WizardFooter | `import { WizardFooter } from '@/components/shared/wizard'` | Navigation footer | `onNext`, `onPrevious`, `onClose` |
 *
 * ---
 *
 * ## Common Patterns
 *
 * ### Page with Table
 * ```tsx
 * <AppShell activeHref="/contacts" user={user}>
 *   <PageHeader title="Contacts" actions={<Button>New Creator</Button>} />
 *   <Tabs defaultValue="creators">
 *     <TabsList>
 *       <TabsTrigger value="creators">Creators</TabsTrigger>
 *       <TabsTrigger value="analytics">Analytics</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="creators">
 *       <TableActionBar searchValue={search} onSearchChange={setSearch} />
 *       <FilterBar filters={filters} onFilterChange={setFilters} />
 *       <DataTable data={creators} columns={columns} />
 *       <Pagination currentPage={1} totalPages={10} totalItems={100} pageSize={10} onPageChange={setPage} />
 *     </TabsContent>
 *   </Tabs>
 * </AppShell>
 * ```
 *
 * ### Page with Cards
 * ```tsx
 * <AppShell activeHref="/campaigns" user={user}>
 *   <PageHeader title="Campaigns" actions={<Button>Create Campaign</Button>} />
 *   <TableActionBar view="grid" onViewChange={setView} />
 *   <FilterBar savedViews={views} />
 *   <div className="grid grid-cols-3 gap-4">
 *     {campaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
 *   </div>
 *   <Pagination currentPage={1} totalPages={5} totalItems={50} pageSize={10} onPageChange={setPage} />
 * </AppShell>
 * ```
 *
 * ### Multi-Step Creation
 * ```tsx
 * <CreationWizard
 *   title="Create New Campaign"
 *   steps={[
 *     { id: 'basics', label: 'Campaign Basics', component: BasicsStep },
 *     { id: 'creators', label: 'Creator Requirements', component: CreatorsStep },
 *     { id: 'review', label: 'Review & Create', component: ReviewStep },
 *   ]}
 *   onComplete={(data) => createCampaign(data)}
 *   onCancel={() => router.back()}
 * />
 * ```
 *
 * ### Form in Dialog
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Invite Member</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Invite Team Member</DialogTitle>
 *     </DialogHeader>
 *     <form className="space-y-4">
 *       <div>
 *         <Label htmlFor="email">Email</Label>
 *         <Input id="email" placeholder="team@aspire.io" />
 *       </div>
 *       <Select>
 *         <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
 *         <SelectContent>
 *           <SelectItem value="admin">Admin</SelectItem>
 *           <SelectItem value="member">Member</SelectItem>
 *         </SelectContent>
 *       </Select>
 *       <Button type="submit" className="w-full">Send Invite</Button>
 *     </form>
 *   </DialogContent>
 * </Dialog>
 * ```
 *
 * ### Detail Panel with Sheet
 * ```tsx
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button variant="ghost">View Details</Button>
 *   </SheetTrigger>
 *   <SheetContent side="right">
 *     <SheetHeader>
 *       <SheetTitle>Creator Details</SheetTitle>
 *     </SheetHeader>
 *     <div className="space-y-4">
 *       <Avatar><AvatarImage src={creator.avatar} /><AvatarFallback>{creator.initials}</AvatarFallback></Avatar>
 *       <h3>{creator.name}</h3>
 *       <StatusDot status={creator.status} showLabel />
 *       <TagPillGroup pills={creator.tags} />
 *     </div>
 *   </SheetContent>
 * </Sheet>
 * ```
 *
 * ---
 *
 * ## Theme Tokens
 *
 * All components use CSS custom properties from `globals.css`:
 * - `--primary` (lime green) — Primary actions, active states
 * - `--destructive` — Delete, error states
 * - `--muted` — Disabled, placeholder text
 * - `--border` — Card borders, dividers
 * - `--radius` — Border radius: `rounded-sm` (6px), `rounded-md` (8px), `rounded-lg` (10px), `rounded-xl` (14px)
 *
 * Dark mode: Add `.dark` class to parent element. All components support dark mode automatically.
 *
 * ## Icon Library
 *
 * All icons come from **Lucide React**:
 * ```tsx
 * import { IconName } from 'lucide-react'
 * ```
 *
 * Common icons used: `Plus`, `Search`, `Filter`, `Download`, `Trash2`, `ChevronRight`,
 * `ChevronDown`, `Mail`, `Send`, `Settings`, `User`, `BarChart3`, `Loader2`
 */
const meta: Meta = {
  title: "1. Getting Started/Component Index",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Complete reference of all Aspire Design System components. Browse the sidebar to see individual component documentation.",
      },
    },
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
  },
}

export default meta
type Story = StoryObj

/** This is a documentation-only page. Browse the sidebar for component demos. */
export const Index: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl space-y-6 p-8">
      <h1 className="text-3xl font-bold">Aspire Design System</h1>
      <p className="text-muted-foreground">
        Welcome to the Aspire Design System component library. Use the sidebar
        to navigate to any component and see its full documentation, props
        table, interactive playground, and code examples.
      </p>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li><strong>Primitives</strong> — Button, Input, Select, Checkbox, Badge, Avatar, etc.</li>
          <li><strong>Components</strong> — DataTable, FilterBar, MetricCard, EmptyState, etc.</li>
          <li><strong>Layout</strong> — AppShell, Sidebar, PageHeader, Tabs, Breadcrumb</li>
          <li><strong>Pages</strong> — Contacts, Campaigns, Offers, Analytics, Inbox, Settings</li>
          <li><strong>Patterns</strong> — Dashboard, Auth Pages, Checkout Flow</li>
        </ul>
      </div>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">For AI Agents</h2>
        <p className="text-sm text-muted-foreground">
          Each component&apos;s Documentation page includes machine-readable metadata:
          import paths, prop types with defaults, usage guidelines, and code examples.
          See the JSDoc comments in each story file for structured component information.
        </p>
      </div>
    </div>
  ),
}
