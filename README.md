# Aspire Design Story

<div align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-E3F1BB?style=for-the-badge&labelColor=16282D" alt="version" />
  <img src="https://img.shields.io/badge/storybook-10.2.9-FF4785?style=for-the-badge&logo=storybook&logoColor=white" alt="storybook" />
  <img src="https://img.shields.io/badge/react-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="react" />
  <img src="https://img.shields.io/badge/typescript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
  <img src="https://img.shields.io/badge/tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwind" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=for-the-badge" alt="shadcn" />
</div>

<br />

<div align="center">
  <p>The official component library and design system for the <a href="https://aspire.io">Aspire</a> influencer marketing platform.</p>
  <p>Built for developers. Documented for AI agents.</p>
</div>

---

## What's Inside

60+ production-ready components, 80+ Storybook stories, and full design token coverage — everything a developer needs to build consistent Aspire product experiences.

```
225+ source files  ·  60+ components  ·  80+ stories  ·  5 feature domains
```

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/aspireiq/aspire-design-story.git
cd aspire-design-story

# Install dependencies
npm install

# Start Storybook
npm run storybook
# → Opens at http://localhost:6006

# Start Next.js dev server
npm run dev
# → Opens at http://localhost:3000
```

---

## Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Next.js](https://nextjs.org) | 16.x | Framework |
| [React](https://react.dev) | 19.x | UI library |
| [TypeScript](https://typescriptlang.org) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Styling |
| [shadcn/ui](https://ui.shadcn.com) | latest | Component primitives |
| [shadcn Studio](https://shadcnstudio.com) | Pro | Enhanced components & blocks |
| [Storybook](https://storybook.js.org) | 10.2.9 | Component documentation |
| [Lucide React](https://lucide.dev) | latest | Icons |
| [Recharts](https://recharts.org) | latest | Data visualization |

---

## Project Structure

```
aspire-design-story/
├── .storybook/
│   ├── main.js              # Storybook config, webpack aliases, addons
│   ├── preview.tsx          # Global decorators, dark mode, theme
│   └── manager.ts           # Aspire-branded sidebar theme
│
├── src/
│   ├── app/
│   │   ├── globals.css      # ← All design tokens live here (HSL CSS variables)
│   │   └── layout.tsx       # Root layout
│   │
│   ├── components/
│   │   ├── ui/              # shadcn/ui base primitives (43 components)
│   │   ├── layout/          # AppShell, AppSidebar, PageHeader, AspireLogo
│   │   ├── shared/          # Reusable Aspire components (DataTable, FilterBar, etc.)
│   │   │   └── wizard/      # Reusable multi-step creation wizard
│   │   ├── analytics/       # Analytics page + charts + MetricCard
│   │   ├── campaigns/       # Campaigns page + CampaignCard + CreateCampaignWizard
│   │   ├── contact-detail/  # 5-tab creator profile page
│   │   ├── contacts/        # CRM contacts table page
│   │   ├── inbox/           # Split-pane messaging
│   │   ├── offers/          # Offers page + CreateOfferWizard
│   │   └── settings/        # All settings sections (profile, billing, etc.)
│   │
│   ├── hooks/
│   │   ├── use-sortable.ts       # Reusable table sorting
│   │   ├── use-search-filter.ts  # Reusable search/filter
│   │   └── use-pagination.ts     # Reusable pagination
│   │
│   ├── lib/
│   │   ├── utils.ts              # cn() helper
│   │   ├── formatters.ts         # formatK(), formatRelativeTime()
│   │   └── constants/
│   │       └── platforms.ts      # Platform type + color maps
│   │
│   └── stories/                  # Storybook stories (mirrors component structure)
│       ├── 1. getting-started/
│       ├── 2. foundations/
│       ├── 3. primitives/
│       ├── 4. components/
│       ├── 5. layout/
│       ├── 6. pages/
│       └── 7. patterns/
│
├── CLAUDE.md                # AI agent instructions for this codebase
├── components.json          # shadcn/ui config + studio registries
└── package.json
```

---

## Using Components

### Import Pattern

```tsx
// shadcn/ui primitives → from @/components/ui/
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

// Aspire shared components → from @/components/shared/
import { DataTable } from '@/components/shared/DataTable'
import { FilterBar } from '@/components/shared/FilterBar'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusDot } from '@/components/shared/StatusDot'
import { MetricCard } from '@/components/analytics/MetricCard'

// Layout → from @/components/layout/
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
```

### Common Patterns

#### Page with Table

```tsx
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { FilterBar } from '@/components/shared/FilterBar'
import { TableActionBar } from '@/components/shared/TableActionBar'
import { DataTable } from '@/components/shared/DataTable'
import { Pagination } from '@/components/shared/Pagination'
import { Button } from '@/components/ui/button'

export function ContactsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Contacts"
        action={<Button>New Creator</Button>}
      />
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <TableActionBar actions={bulkActions} />
      <DataTable data={creators} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </AppShell>
  )
}
```

#### Page with Cards + View Toggle

```tsx
import { ViewToggle } from '@/components/shared/ViewToggle'
import { CampaignCard } from '@/components/campaigns/CampaignCard'

export function CampaignsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <AppShell>
      <PageHeader title="Campaigns" action={<Button>Create Campaign</Button>} />
      <div className="flex justify-end">
        <ViewToggle value={view} onChange={setView} />
      </div>
      {view === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {campaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
        </div>
      ) : (
        <DataTable data={campaigns} columns={campaignColumns} />
      )}
    </AppShell>
  )
}
```

#### Multi-Step Creation Wizard

```tsx
import { CreationWizard } from '@/components/shared/wizard/CreationWizard'
import type { WizardStep } from '@/components/shared/wizard/CreationWizard'

const steps: WizardStep[] = [
  { id: 'basics',   label: 'Campaign Basics',       component: CampaignBasicsStep   },
  { id: 'creators', label: 'Creator Requirements',  component: CreatorRequirementsStep },
  { id: 'terms',    label: 'Compensation & Terms',  component: CompensationStep     },
  { id: 'advanced', label: 'Advanced Settings',     component: AdvancedStep         },
  { id: 'review',   label: 'Review & Create',       component: ReviewStep           },
]

export function CreateCampaignPage() {
  return (
    <CreationWizard
      title="Create New Campaign"
      steps={steps}
      onComplete={(data) => createCampaign(data)}
      onCancel={() => router.back()}
    />
  )
}
```

#### Status Indicators

```tsx
import { StatusDot } from '@/components/shared/StatusDot'

// Small colored dot with label — use this instead of Badge for row-level status
<StatusDot status="active" />      // green dot + "Active"
<StatusDot status="paused" />      // orange dot + "Paused"
<StatusDot status="error" />       // red dot + "Error"
<StatusDot status="draft" />       // gray dot + "Draft"
<StatusDot status="completed" />   // blue dot + "Completed"
```

#### Metric Cards

```tsx
import { MetricCard } from '@/components/analytics/MetricCard'

<MetricCard
  label="Total Impressions"
  value="1.2M"
  trend={+12.5}          // positive = green ↑, negative = red ↓
  sparklineData={weeklyData}
/>
```

#### Tag Pills

```tsx
import { TagPillGroup } from '@/components/shared/TagPillGroup'

// Campaign tags (colored)
<TagPillGroup
  tags={['Petfluencer Perks', 'Summer Launch']}
  variant="campaign"
/>

// Group tags (colored, different palette)
<TagPillGroup
  tags={['Brand Ambassadors', 'VIP']}
  variant="group"
/>

// Generic tags (gray)
<TagPillGroup
  tags={['Partnership', 'Sponsored', 'Giveaway']}
  variant="tag"
/>
```

#### Empty States

```tsx
import { EmptyState } from '@/components/shared/EmptyState'
import { Tag } from 'lucide-react'

<EmptyState
  icon={Tag}
  title="No Offers Yet"
  description="Create your first offer to start tracking affiliate performance."
  action={{ label: 'Create Offer', onClick: handleCreate }}
  learnMoreHref="https://help.aspire.io/offers"
/>
```

---

## Design Tokens

All tokens are in `src/app/globals.css` as HSL CSS custom properties.

### Colors

```css
/* Usage: hsl(var(--token-name)) */

--background          /* Page background: white / dark: near-black     */
--foreground          /* Primary text: warm stone dark                  */
--primary             /* Deep dark teal #16282D — buttons, active states */
--primary-foreground  /* White #ffffff — text on primary bg              */
--accent              /* Lime green #E3F1BB — highlights, tags, active nav */
--accent-foreground   /* Deep dark teal #16282D — text on accent bg      */
--secondary           /* Subtle backgrounds                             */
--muted               /* Muted text, disabled states                    */
--border              /* Card borders, dividers: light gray             */
--destructive         /* Error, delete: red #dc2626                     */
--info                /* Informational: teal #0d9488                    */
--success             /* Success: green #059669                         */
--warning             /* Warning: amber #eab308                         */
```

### Typography

```tsx
// Font families
font-sans   → Inter
font-mono   → Geist Mono

// Common text styles used across the system
text-xs     → 12px  (timestamps, helper text)
text-sm     → 14px  (body text, labels, table content)
text-base   → 16px  (card titles, nav labels)
text-lg     → 18px  (section headers)
text-xl     → 20px  (page sub-headings)
text-2xl    → 24px  (page titles)
text-3xl    → 30px  (hero headings)
```

### Border Radius

```tsx
rounded-sm   → 6px   (tags, small badges)
rounded-md   → 8px   (inputs, buttons)
rounded-lg   → 10px  (cards, dialogs, dropdowns)
rounded-xl   → 14px  (large panels, sheets)
rounded-full → 9999px (avatar circles, pill badges)
```

### Dark Mode

Dark mode is applied via the `.dark` class on the root element. All tokens automatically switch — no additional configuration needed.

```tsx
// In your story or component:
<div className="dark">
  <YourComponent />
</div>
```

---

## Icons

All icons use [Lucide React](https://lucide.dev). Convention: `20px` size, `1.5px` stroke.

```tsx
import { Users, Megaphone, BarChart3, Tag, Image, Settings } from 'lucide-react'

// Standard usage
<Users className="h-5 w-5" />          // 20px
<Megaphone className="h-4 w-4" />      // 16px (inline / table)
<Settings className="h-6 w-6" />       // 24px (nav icons)

// With color
<Users className="h-5 w-5 text-muted-foreground" />
```

---

## Utility Functions

```tsx
import { cn } from '@/lib/utils'
import { formatK, formatRelativeTime } from '@/lib/formatters'
import { PLATFORM_COLORS, Platform } from '@/lib/constants/platforms'

// Merge classNames (handles conditional classes)
cn('text-sm font-medium', isActive && 'text-primary')

// Format large numbers
formatK(1234567)   // → "1.2M"
formatK(45300)     // → "45.3K"
formatK(890)       // → "890"

// Relative timestamps
formatRelativeTime(new Date())             // → "just now"
formatRelativeTime(new Date(Date.now() - 3600000))  // → "1 hrs ago"

// Platform colors
PLATFORM_COLORS['instagram']  // → "#E1306C"
PLATFORM_COLORS['tiktok']     // → "#000000"
PLATFORM_COLORS['youtube']    // → "#FF0000"
```

---

## Custom Hooks

```tsx
import { useSortable } from '@/hooks/use-sortable'
import { useSearchFilter } from '@/hooks/use-search-filter'
import { usePagination } from '@/hooks/use-pagination'

// Sorting
const { sorted, sortKey, sortDirection, toggleSort } = useSortable(data)

// Search + filter
const { filtered } = useSearchFilter(creators, ['name', 'handle', 'email'])

// Pagination
const { paginated, currentPage, totalPages, setPage } = usePagination(data, 50)
```

---

## Storybook Structure

```
1. Getting Started    → Welcome, How to Use, Component Index
2. Foundations        → Design Tokens, Typography, Colors, Icons, Brand
3. Primitives         → Button, Input, Badge, Avatar, Switch... (17 components)
4. Components         → DataTable, FilterBar, Charts, EmptyState... (30+ components)
   ├── Data Display
   ├── Forms
   ├── Feedback
   ├── Navigation
   ├── Tables
   ├── Charts
   └── Utilities
5. Layout             → AppShell, AppSidebar, PageHeader, AspireLogo
6. Pages              → Full page compositions with realistic data
   ├── Contacts & Contact Detail
   ├── Campaigns
   ├── Offers
   ├── Analytics
   ├── Inbox
   └── Settings (8 sections)
7. Patterns           → Form Patterns, Table Patterns, Empty States
```

Each story has:
- **Docs tab** — full JSDoc, props table, code snippets, usage guidelines
- **Story tab** — interactive component with controls panel
- **Source tab** — copy-paste ready component code

---

## For AI Agents

See `CLAUDE.md` in the project root for complete AI agent instructions, including component APIs, import paths, common patterns, and design token references.

**Quick reference for agents:**

```
Base primitives:    @/components/ui/*
Aspire components:  @/components/shared/*
Layout:             @/components/layout/*
Feature pages:      @/components/[feature]/*
Utilities:          @/lib/utils, @/lib/formatters, @/lib/constants/*
Hooks:              @/hooks/*
Tokens:             src/app/globals.css (CSS custom properties)
```

---

## Development Scripts

```bash
npm run dev          # Next.js dev server (port 3000)
npm run storybook    # Storybook (port 6006)
npm run build        # Production build
npm run build-storybook  # Build Storybook for deployment
npm run lint         # ESLint
npm run type-check   # TypeScript check (tsc --noEmit)
```

---

## Adding a New Component

1. Create the component in the appropriate directory:
   ```bash
   # For a new shared component
   touch src/components/shared/MyComponent.tsx

   # For a new feature component
   touch src/components/campaigns/MyComponent.tsx
   ```

2. Add it to the barrel export (if one exists):
   ```ts
   // src/components/shared/index.ts
   export { MyComponent } from './MyComponent'
   ```

3. Create the story:
   ```bash
   touch src/stories/4.\ components/MyCategory/MyComponent.stories.tsx
   ```

4. Follow the story template in `src/stories/3. primitives/Button.stories.tsx`

---

## Adding New shadcn/ui Components

```bash
# Add a single component
npx shadcn@latest add [component-name]

# From shadcn Studio Pro registry (requires .env with credentials)
npx shadcn@latest add @ss-components/[component-name]
npx shadcn@latest add @ss-blocks/[block-name]
```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |

---

## Contributing

1. Follow existing component patterns (see Button as reference)
2. Write TypeScript — no `any` types
3. Add a story for every new component
4. Support dark mode with Tailwind `dark:` modifier
5. Use Aspire CSS tokens, not raw hex values
6. Test in both light and dark mode before submitting

---

<div align="center">
  <p>Built with ❤️ by Lokesh Verma (Product Designer)</p>
  <p>
    <a href="https://aspire.io">aspire.io</a> ·
    <a href="https://help.aspire.io">Help Center</a> ·
    <a href="mailto:lokesh.verma@aspireiq.com">Contact</a>
  </p>
</div>
