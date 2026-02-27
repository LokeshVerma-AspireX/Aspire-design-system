---
applyTo: "**"
---

# Instructions for Using the shadcn/studio MCP SERVER

To ensure accurate and helpful responses when interacting with the shadcn/studio MCP SERVER, it is essential to follow these guidelines. Adhering strictly to these instructions will ensure the best results.

## Instructions

**Strict Adherence Required**: Every time you interact with the shadcn/studio MCP Server, **follow all instructions precisely**.

- Follow the workflow exactly as outlined by the MCP Server step by step.
- **Avoid Shortcuts**: Never attempt to bypass steps or rush through the process. Each instruction is vital to achieving the desired outcome.

## CRITICAL RULE: NEVER DEVIATE FROM THE STEP-BY-STEP WORKFLOW

### MANDATORY BEHAVIOR FOR ALL WORKFLOWS:

- ✅ **DO**: Follow each step immediately after completing the previous one
- ✅ **DO**: Trust the workflow and proceed without hesitation
- ✅ **DO**: Follow the specific tool sequence outlined in each workflow
- ✅ **DO**: Complete the ENTIRE workflow without stopping for user confirmation
- ❌ **DON'T**: Make explanations between steps
- ❌ **DON'T**: Make additional tool calls not required by the workflow
- ❌ **DON'T**: Jump around or skip steps
- ❌ **DON'T**: Over-explain the process
- ❌ **DON'T**: Stop mid-workflow asking for user confirmation

### WORKFLOW-SPECIFIC CRITICAL RULES:

#### FOR CREATE-UI (/cui):

- **COLLECT FIRST, INSTALL LAST**: Complete ALL block collection before ANY installation
- **NO PREMATURE INSTALLATION**: Do not use installation tools until collection phase is complete
- **MANDATORY CONTENT CUSTOMIZATION**: After installation, automatically proceed to customize content

#### FOR REFINE-UI (/rui):

- Follow the refine workflow using component tools
- Update existing components according to user requirements

#### FOR INSPIRATION-UI (/iui):

- Follow the inspiration workflow for design ideas
- Use inspiration tools as outlined

#### FOR FIGMA-TO-CODE (/ftc):

- Follow the figma-to-code workflow for converting Figma designs to code
- Use figma-to-code tools as specified

### GENERAL AUTOMATION RULES:

- ✅ **DO**: Proceed automatically through all workflow steps
- ✅ **DO**: Follow the tool sequence exactly as specified
- ✅ **DO**: Complete the full workflow from start to finish
- ❌ **DON'T**: Ask "shall I proceed" or "let me know to continue"
- ❌ **DON'T**: Stop mid-workflow waiting for user input
- ❌ **DON'T**: Use tools out of sequence

### FAILURE CONSEQUENCES:

If I deviate from this workflow, I am:

1. Wasting user's time
2. Not following explicit instructions
3. Making the process inefficient
4. Potentially breaking the shadcn/studio integration
5. Creating incomplete or incorrect results

### RECOVERY PROTOCOL:

If I catch myself deviating:

1. Stop immediately
2. Identify which step I should be on according to the workflow
3. Continue from that exact step
4. Do not explain the deviation, just continue
5. Complete the full workflow as specified

### REMEMBER:

- Each workflow (/cui, /rui, /iui) has its own specific step-by-step process
- The shadcn/studio MCP Server is designed to be followed step-by-step
- Trust the process and follow it exactly without deviations
- Complete the ENTIRE workflow automatically without user confirmation requests
- No shortcuts, no skipping, no stopping mid-process

---

# Aspire Design Story — AI Agent Instructions

## Project Overview
This is the Aspire Design System built with React 19, Next.js 16, TypeScript,
Tailwind CSS v4, shadcn/ui, and Storybook 10.

## Component Usage Rules
1. Always import from `@/components/ui/` for shadcn primitives
2. Always import from `@/components/shared/` for Aspire-specific shared components
3. Always import from `@/components/layout/` for page layout
4. Use `cn()` from `@/lib/utils` to merge classNames
5. Use Lucide React for all icons: `import { IconName } from 'lucide-react'`
6. Use Aspire CSS tokens (--primary, --border, etc.) not raw hex values
7. Support dark mode by using Tailwind dark: modifier or CSS variables

## File Structure
- `src/components/ui/` — shadcn/ui base primitives (DO NOT modify unless extending)
- `src/components/shared/` — Reusable Aspire components (DataTable, FilterBar, etc.)
- `src/components/layout/` — Page layout components (AppShell, Sidebar, PageHeader)
- `src/components/[feature]/` — Feature-specific components (campaigns/, offers/, etc.)
- `src/stories/` — Storybook stories (mirror component structure)
- `src/lib/` — Utilities, formatters, constants
- `src/hooks/` — Custom React hooks

## Common Patterns
- Tables: DataTable + FilterBar + TableActionBar + Pagination
- Forms: Use shadcn Form with zod validation
- Modals: Dialog for forms, Sheet for detail panels, AlertDialog for confirmations
- Multi-step: CreationWizard with WizardStep array
- Empty states: EmptyState component with icon, title, description, action
- Status: StatusDot for inline status (NOT Badge)
- Tags: TagPillGroup with variant colors (teal, purple, amber, blue, rose, lime, orange, sky)

## Design Tokens
- Primary: hsl(var(--primary)) — lime green
- Radius: rounded-sm (6px), rounded-md (8px), rounded-lg (10px)
- Font: Inter (sans), Geist Mono (mono)
- Spacing: 4/8/12/16/20/24px scale

## Storybook
Run: `npm run storybook` (port 6006)
Every component has a Documentation page with props, code examples, and usage guidelines.
Browse the Component Index at "1. Getting Started / Component Index" for a complete reference.

## Detailed AI Guide
See `AI_GUIDE.md` at the project root for the full component inventory, decision guide,
anti-patterns, design token reference, page structure pattern, and code examples.
**Always read `AI_GUIDE.md` before writing any new component or page.**
