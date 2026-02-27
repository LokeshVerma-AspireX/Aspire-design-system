# Aspire Design System — AI Agent Guide

> **For AI assistants (Claude, Copilot, Cursor, etc.)**: Follow this guide precisely.
> Never invent new components, patterns, or design tokens.
> Always use what already exists in this codebase.

---

## 1. Stack At a Glance

| Concern | Tool |
|---|---|
| Framework | React 19 + Next.js 16 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Component base | shadcn/ui ("new-york" style) |
| Icons | Lucide React — **no other icon library** |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Dates | date-fns |
| Toasts | Sonner (`<Toaster />`) |
| Stories | Storybook 10 |

---

## 2. Absolute Rules

1. **Only use components that already exist.** Do not install new UI libraries.
2. **Never write raw hex colors.** Use CSS tokens (`text-foreground`, `bg-muted`, `hsl(var(--primary))`, etc.).
3. **Never modify** `src/components/ui/` unless you are extending a primitive for a specific documented reason.
4. **Always use `cn()`** from `@/lib/utils` to merge class names.
5. **Always use Lucide React** for icons: `import { IconName } from "lucide-react"`.
6. **Dark mode is mandatory** — use `dark:` Tailwind modifier or CSS variables that already switch automatically.
7. **`"use client"`** must appear at the top of any component using state, effects, or browser APIs.

---

## 3. Import Paths

```ts
// shadcn/ui primitives (DO NOT modify these files)
import { Button }        from "@/components/ui/button"
import { Input }         from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge }          from "@/components/ui/badge"
import { Checkbox }       from "@/components/ui/checkbox"
import { Switch }         from "@/components/ui/switch"
import { Textarea }       from "@/components/ui/textarea"
import { Label }          from "@/components/ui/label"
import { Separator }      from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea }     from "@/components/ui/scroll-area"
import { Skeleton }       from "@/components/ui/skeleton"
import { Progress }       from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Aspire shared components
import { DataTable }          from "@/components/shared/DataTable"
import { FilterBar }          from "@/components/shared/FilterBar"
import { TableActionBar }     from "@/components/shared/TableActionBar"
import { Pagination }         from "@/components/shared/Pagination"
import { EmptyState }         from "@/components/shared/EmptyState"
import { StatusDot }          from "@/components/shared/StatusDot"
import { TagPillGroup, TagPill } from "@/components/shared/TagPillGroup"
import { ViewToggle }         from "@/components/shared/ViewToggle"
import { DateRangePicker }    from "@/components/shared/DateRangePicker"
import { CollapsibleSection } from "@/components/shared/CollapsibleSection"
import { CopyButton }         from "@/components/shared/CopyButton"
import { DiscountValueInput } from "@/components/shared/DiscountValueInput"
import { FeatureToggleCard }  from "@/components/shared/FeatureToggleCard"
import { FormFooter }         from "@/components/shared/FormFooter"
import { ImageUploadArea }    from "@/components/shared/ImageUploadArea"
import { StepperSidebar }     from "@/components/shared/StepperSidebar"

// Wizard (multi-step flows)
import { CreationWizard }     from "@/components/shared/wizard/CreationWizard"

// Layout
import { AppShell }    from "@/components/layout/AppShell"
import { AppSidebar }  from "@/components/layout/AppSidebar"
import { PageHeader }  from "@/components/layout/PageHeader"
import { AstraButton } from "@/components/layout/AstraButton"
import { AspireLogo }  from "@/components/layout/AspireLogo"

// Typography
import { H1, H2, H3, H4 } from "@/components/typography"
import { P, Lead, Large, Small, Muted, InlineCode } from "@/components/typography"

// Utilities
import { cn } from "@/lib/utils"
import { formatK, formatRelativeTime } from "@/lib/formatters"
```

---

## 4. Design Tokens Reference

### Colors (CSS Variables — always use these, never raw hex)

```css
/* Backgrounds */
--background          /* page background */
--foreground          /* primary text */
--muted               /* subtle backgrounds, disabled areas */
--muted-foreground    /* secondary / helper text */
--border              /* dividers, input borders */
--input               /* input border */
--ring                /* focus ring */

/* Brand */
--primary             /* hsl(194, 37%, 13%) — dark teal, brand primary */
--primary-foreground  /* white text on primary */
--accent              /* hsl(78, 68%, 84%) — lime green, highlights */
--accent-foreground   /* dark teal text on accent */

/* Semantic */
--destructive         /* red, error/danger actions */
--secondary           /* light grey, secondary surfaces */
--secondary-foreground

/* Charts */
--chart-1 through --chart-5

/* Sidebar */
--sidebar, --sidebar-foreground, --sidebar-accent, --sidebar-border, --sidebar-ring
```

### Tailwind Token Classes (preferred over arbitrary values)

```
text-foreground       text-muted-foreground   text-primary
bg-background         bg-muted                bg-accent
border-border         border-input
ring-ring
rounded-sm (6px)      rounded-md (8px)        rounded-lg (10px)
```

### Spacing Scale
Use only: `gap-1`, `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8` (4px increments).
Padding/margin: `p-4`, `p-6`, `px-6 py-4`, `py-16`, etc.

### Typography Scale

| Element | Classes |
|---|---|
| Page title (h1) | `text-xl font-semibold tracking-tight text-foreground` |
| Section heading (h2) | `text-base font-semibold text-foreground` |
| Body | `text-sm text-foreground` |
| Helper/secondary | `text-sm text-muted-foreground` |
| Tiny label | `text-xs text-muted-foreground` |
| Mono/code | `font-mono text-xs` |

---

## 5. Page Structure Pattern

Every page must follow this structure exactly:

```tsx
// src/components/[feature]/MyFeaturePage.tsx
"use client"

import { AppShell } from "@/components/layout/AppShell"
import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"

export function MyFeaturePage() {
  return (
    <AppShell>
      <PageHeader
        title="Page Title"
        description="Optional subtitle"           // optional
        breadcrumbs={[                            // optional
          { label: "Parent", href: "/parent" },
          { label: "Current Page" },
        ]}
        actions={                                 // optional, right-aligned CTAs
          <Button size="sm">Primary Action</Button>
        }
        showAstra={true}                          // default: true (Astra AI button)
      />

      {/* Page body */}
      <div className="flex flex-col gap-6 p-6">
        {/* content */}
      </div>
    </AppShell>
  )
}
```

---

## 6. Component Decision Guide

### When to use what — choose EXACTLY one option per use case:

#### Displaying item status
```tsx
// ✅ CORRECT — always use StatusDot for inline status
<StatusDot status="active" />           // → green dot + "Active"
<StatusDot status="paused" />           // → grey dot + "Paused"
<StatusDot status="deactivated" />      // → orange dot + "Deactivated"
<StatusDot status="error" />            // → red dot + "Error"
<StatusDot status="active" showLabel={false} />   // dot only, no text

// ❌ WRONG — do not use Badge for live status
<Badge>Active</Badge>
```

#### Displaying category tags / labels
```tsx
// ✅ CORRECT — TagPillGroup for multi-tag display
<TagPillGroup pills={[
  { label: "Fashion", color: "teal" },
  { label: "Beauty", color: "purple" },
  { label: "Lifestyle", color: "amber" },
]} />

// Available colors: teal | purple | amber | blue | rose | lime | orange | sky | default
// ❌ WRONG — do not create custom colored spans
```

#### Confirmation / destructive action prompt
```tsx
// ✅ CORRECT — AlertDialog (blocks interaction, required acknowledgment)
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

#### Form / create modal
```tsx
// ✅ CORRECT — Dialog (non-blocking form overlay)
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Campaign</DialogTitle>
    </DialogHeader>
    {/* form content */}
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button>Create</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Detail panel / drawer
```tsx
// ✅ CORRECT — Sheet (slides in from the right, shows detail without navigation)
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Creator Profile</SheetTitle>
    </SheetHeader>
    {/* detail content */}
  </SheetContent>
</Sheet>
```

#### Multi-step creation flow
```tsx
// ✅ CORRECT — CreationWizard with WizardStep array
import { CreationWizard } from "@/components/shared/wizard/CreationWizard"

const steps = [
  { id: "basics",   label: "Basics",   component: <BasicsStep /> },
  { id: "settings", label: "Settings", component: <SettingsStep /> },
  { id: "review",   label: "Review",   component: <ReviewStep /> },
]

<CreationWizard steps={steps} onComplete={handleComplete} onCancel={handleCancel} />
```

#### Tables with data
```tsx
// ✅ CORRECT — DataTable + FilterBar + TableActionBar + Pagination
// Always compose all four for list pages
<div className="flex flex-col gap-4">
  <FilterBar
    quickFilters={[{ id: "status", label: "Status", options: statusOptions }]}
    onAddFilter={handleAddFilter}
  />
  {selectedIds.size > 0 && (
    <TableActionBar
      selectedCount={selectedIds.size}
      actions={[{ label: "Archive", onClick: handleArchive }]}
      onClearSelection={() => setSelectedIds(new Set())}
    />
  )}
  <DataTable
    data={rows}
    columns={columns}
    selectedIds={selectedIds}
    onSelectId={handleSelectId}
    onSelectAll={handleSelectAll}
    rowActions={rowActions}
  />
  <Pagination
    page={page}
    pageSize={pageSize}
    total={total}
    onPageChange={setPage}
  />
</div>
```

#### Empty list state
```tsx
// ✅ CORRECT — EmptyState component
import { PackageSearch } from "lucide-react"

<EmptyState
  icon={<PackageSearch className="size-6" />}
  title="No campaigns yet"
  description="Create your first campaign to start reaching creators."
  actionLabel="Create Campaign"
  onAction={handleCreate}
  onLearnMore={handleLearnMore}  // optional
/>
```

#### System notifications / feedback banners
```tsx
// ✅ CORRECT — Alert component with semantic variants
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

<Alert variant="info">
  <Info />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Your campaign goes live in 24 hours.</AlertDescription>
</Alert>

// Variants: default | info | success | warning | error | destructive
```

#### Toast notifications (transient feedback)
```tsx
// ✅ CORRECT — Sonner toast (not Alert)
import { toast } from "sonner"

toast.success("Campaign created!")
toast.error("Something went wrong.")
toast("Campaign updated.", { description: "Changes saved successfully." })
```

#### Inline info on hover
```tsx
// ✅ CORRECT — Tooltip
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon-sm"><Info className="size-4" /></Button>
    </TooltipTrigger>
    <TooltipContent>Explain something in one line</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### Tabbed page sections
```tsx
// ✅ CORRECT — Tabs from shadcn/ui
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="content">Content</TabsTrigger>
  </TabsList>
  <TabsContent value="overview"><OverviewTab /></TabsContent>
  <TabsContent value="content"><ContentTab /></TabsContent>
</Tabs>
```

---

## 7. Button Variants Guide

```tsx
import { Button } from "@/components/ui/button"

// Primary action (one per section/modal)
<Button>Create Campaign</Button>                  // variant="default"

// Danger / irreversible action
<Button variant="destructive">Delete</Button>

// Secondary / cancel
<Button variant="outline">Cancel</Button>

// Tertiary / contextual
<Button variant="ghost">Edit</Button>

// Navigation link-style
<Button variant="link">View details</Button>

// Subdued (less emphasis than ghost)
<Button variant="secondary">Export</Button>

// Sizes
<Button size="xs">Tiny</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus className="size-4" /></Button>
<Button size="icon-sm"><MoreHorizontal className="size-4" /></Button>

// With icon (always left-aligned icon)
<Button><Plus className="size-4" />Add Item</Button>

// As link (renders <a> tag)
<Button asChild><a href="/campaigns">Go to Campaigns</a></Button>
```

---

## 8. Form Pattern

Always use React Hook Form + Zod + shadcn Form components:

```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
})

type FormValues = z.infer<typeof schema>

export function MyForm({ onSubmit }: { onSubmit: (values: FormValues) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl><Input placeholder="Enter name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  )
}
```

---

## 9. Card Layouts

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

// Basic metric/stat card
<Card>
  <CardHeader className="pb-2">
    <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-bold text-foreground">4.2M</p>
    <p className="text-xs text-muted-foreground">+12% from last month</p>
  </CardContent>
</Card>

// Content card with actions
<Card>
  <CardHeader className="flex flex-row items-center justify-between">
    <h3 className="text-base font-semibold text-foreground">Section Title</h3>
    <Button variant="ghost" size="sm">Edit</Button>
  </CardHeader>
  <CardContent className="flex flex-col gap-4">
    {/* content */}
  </CardContent>
  <CardFooter className="border-t pt-4">
    <Button variant="outline" size="sm">View All</Button>
  </CardFooter>
</Card>
```

---

## 10. Typography Usage

Use the Typography components from `@/components/typography` for prose sections only.
For UI elements (page titles, card headers, labels), use raw Tailwind classes inline.

```tsx
import { H1, H2, H3, Lead, P, Muted, Small, InlineCode } from "@/components/typography"

// Documentation / prose
<H1>Getting Started</H1>
<Lead>This guide walks you through the basics.</Lead>
<P>Here is a paragraph of body text.</P>
<Muted>Secondary helper text below a field.</Muted>
<Small>Fine print or footnote.</Small>
<InlineCode>npm run storybook</InlineCode>

// UI page header — use raw classes instead
<h1 className="text-xl font-semibold tracking-tight text-foreground">Campaigns</h1>
<p className="text-sm text-muted-foreground">Manage all your influencer campaigns.</p>
```

---

## 11. Icon Usage

Only Lucide React. Always size with `size-*` class (not `w-* h-*`):

```tsx
import { Plus, Search, MoreHorizontal, ChevronDown, X, Check } from "lucide-react"

// In buttons
<Button><Plus className="size-4" />Add</Button>
<Button size="icon"><MoreHorizontal className="size-4" /></Button>

// Decorative / inline
<Search className="size-4 text-muted-foreground" />

// EmptyState icon (larger)
<PackageSearch className="size-6" />
```

---

## 12. File & Naming Conventions

```
src/
  components/
    ui/                     # shadcn primitives — DO NOT touch
    shared/                 # Aspire reusable components (DataTable, FilterBar, etc.)
    layout/                 # AppShell, Sidebar, PageHeader
    typography/             # Typography primitives
    [feature]/              # Feature folder (campaigns/, offers/, analytics/, etc.)
      [Feature]Page.tsx     # Top-level page component
      [Feature]Card.tsx     # List item card
      [Feature]DetailPage.tsx
      tabs/                 # Tab content components
        OverviewTab.tsx
        ContentTab.tsx
      steps/                # Wizard step components
        BasicsStep.tsx
        ReviewStep.tsx
  stories/
    [feature]/              # Mirror component structure
      [Feature]Page.stories.tsx
  lib/
    utils.ts                # cn() utility
    formatters.ts           # formatK(), formatRelativeTime()
  hooks/
    use-breakpoint.ts
    use-mobile.ts
```

**Naming rules:**
- Components: `PascalCase` (e.g., `CampaignCard.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `use-mobile.ts`)
- Utilities: `camelCase.ts` (e.g., `formatters.ts`)
- Story files: `[ComponentName].stories.tsx`
- One component per file (small helpers can be co-located)

---

## 13. Storybook Story Pattern

Every new component needs a story:

```tsx
// src/stories/[feature]/MyComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { MyComponent } from "@/components/[feature]/MyComponent"

const meta: Meta<typeof MyComponent> = {
  title: "[Section] / MyComponent",   // e.g., "Shared / StatusDot"
  component: MyComponent,
  parameters: {
    layout: "padded",                  // "centered" | "padded" | "fullscreen"
  },
}
export default meta

type Story = StoryObj<typeof MyComponent>

export const Default: Story = {
  args: {
    // default props
  },
}

export const Variant: Story = {
  args: {
    // variant props
  },
}
```

---

## 14. Anti-Patterns — Never Do These

```tsx
// ❌ Raw hex colors
<div style={{ color: "#0d4a5a" }}>                          // use text-primary
<div className="text-[#0d4a5a]">                            // use text-primary

// ❌ Arbitrary spacing not on the 4px scale
<div className="p-[13px] gap-[7px]">                        // use p-3 gap-2

// ❌ Badge for status
<Badge variant="default">Active</Badge>                     // use StatusDot

// ❌ Custom colored div instead of TagPill
<span className="bg-blue-200 text-blue-900 rounded px-2">   // use TagPillGroup

// ❌ Custom status indicator
<span className="w-2 h-2 rounded-full bg-green-500 inline-block" />  // use StatusDot

// ❌ Hardcoded font sizes
<p className="text-[15px]">                                 // use text-sm or text-base

// ❌ Installing new icon library
import { FaCheck } from "react-icons/fa"                    // use lucide-react

// ❌ Custom modal div with z-index
<div className="fixed inset-0 z-50 bg-black/50">            // use Dialog or Sheet

// ❌ Multiple primary CTAs in one view
<Button>Save</Button><Button>Publish</Button><Button>Export</Button>
// ✅ One primary, rest outline/ghost
<Button>Save</Button><Button variant="outline">Export</Button>

// ❌ Omitting "use client" on interactive component
export function MyForm() { const [s, setS] = useState(...)  // needs "use client"

// ❌ Alert for transient feedback
<Alert variant="success">Saved!</Alert>                     // use toast() from sonner

// ❌ Inline SVG or custom icon
<svg viewBox="0 0 24 24"><path d="..." /></svg>             // use lucide-react icon

// ❌ Creating a new Button variant
<button className="bg-lime-400 text-black rounded-lg px-4"> // use Button from ui/button
```

---

## 15. Existing Feature Components Reference

When building pages in these sections, always extend the existing components:

### Campaigns
- `CampaignsPage` — list page with DataTable
- `CampaignDetailPage` — detail with tabs
- `CampaignSettingsPage` — settings form
- `CampaignCard` — card for grid view
- `CreateCampaignWizard` — wizard flow
- `CampaignCreationFlow` — horizontal stepper flow
- `CreatorDetailDrawer` — Sheet drawer
- `InviteCreatorsDialog` — Dialog
- Tabs: `OverviewTab`, `ContentTab`, `LinksTab`, `OffersTab`, `InboxTab`, `TasksTab`, `ReportingTab`, `SettingsTab`
- Steps: `CampaignBasicsStep`, `CompensationStep`, `CreatorRequirementsStep`, `CampaignAdvancedStep`, `CampaignReviewStep`

### Offers
- `OffersPage` — list page
- `CreateOfferWizard` — full wizard
- Steps: `OfferBasicsWizardStep`, `ConfigureDiscountWizardStep`, `CreatorEarningsWizardStep`, `AdvanceConfigWizardStep`, `OfferReviewWizardStep`

### Contacts
- `ContactsPageHeader`, `ContactsTabs`
- Detail: `ContactDetailHeader`, `ContactDetailTabs`, `ContactDetailsCard`, `SocialStatsCards`, `AudienceDemographicsChart`
- Tabs: `OverviewTab`, `ProfileTab`, `ContentTab`, `InboxTab`

### Analytics
- `AnalyticsPage`, `MetricCard`, `PerformanceLineChart`, `PlatformBarChart`, `CreatorScatterChart`, `PostsGrid`, `CreatorPerformanceTable`

### Inbox
- `InboxPage`, `ThreadList`, `ThreadItem`, `ThreadDetail`, `MessageItem`, `ReplyComposer`

### Settings
- `SettingsPage` with: `ProfileSettings`, `BillingSettings`, `MembersSettings`, `BrandKitSettings`, `IntegrationsSettings`, `NotificationSettings`, `SecuritySettings`

---

## 16. DataTable Column Definition Pattern

```tsx
import type { ColumnDef } from "@/components/shared/DataTable" // ← uses the local type

const columns: ColumnDef<Campaign>[] = [
  {
    id: "name",
    header: "Campaign Name",
    sortable: true,
    cell: (row) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{row.name}</span>
        <span className="text-xs text-muted-foreground">{row.brand}</span>
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => <StatusDot status={row.status} />,
  },
  {
    id: "tags",
    header: "Tags",
    cell: (row) => (
      <TagPillGroup pills={row.tags.map((t) => ({ label: t, color: "teal" }))} />
    ),
  },
]
```

---

## 17. Dark Mode Checklist

Every component you write must work in both modes:

- Use `text-foreground` not `text-black` or `text-gray-900`
- Use `text-muted-foreground` not `text-gray-500`
- Use `bg-background` not `bg-white`
- Use `bg-muted` not `bg-gray-100`
- Use `border-border` not `border-gray-200`
- When using Tailwind color classes directly (e.g., for TagPillGroup), always pair with `dark:` variant
- Test every UI state: default, hover, focus, disabled, selected

---

## 18. Utility Functions

```ts
import { cn } from "@/lib/utils"
// Merge class names (handles Tailwind conflicts)
const cls = cn("text-sm text-foreground", isActive && "font-semibold", className)

import { formatK, formatRelativeTime } from "@/lib/formatters"
formatK(4200000)          // → "4.2M"
formatK(12500)            // → "12.5K"
formatRelativeTime(date)  // → "2 hrs ago", "3 days ago"
```

---

## Quick Reference Card

| Need | Use |
|---|---|
| Page wrapper | `AppShell` |
| Page title bar | `PageHeader` |
| Table of data | `DataTable` + `FilterBar` + `TableActionBar` + `Pagination` |
| No data | `EmptyState` |
| Status indicator | `StatusDot` (active/paused/deactivated/error) |
| Category tags | `TagPillGroup` with color variant |
| Confirm dangerous action | `AlertDialog` |
| Form in overlay | `Dialog` |
| Detail slide-in | `Sheet` |
| Multi-step creation | `CreationWizard` |
| Persistent banner | `Alert` |
| Transient toast | `toast()` from sonner |
| Hover info | `Tooltip` |
| Collapsible section | `CollapsibleSection` |
| Date range input | `DateRangePicker` |
| View switch (grid/list) | `ViewToggle` |
| Copy to clipboard | `CopyButton` |
| Image upload | `ImageUploadArea` |
| Feature toggle | `FeatureToggleCard` |
| Form submit/cancel bar | `FormFooter` |
| Sidebar stepper | `StepperSidebar` |
