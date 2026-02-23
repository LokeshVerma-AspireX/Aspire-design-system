# Figma to Code with Shadcn Studio (/ftc)

Convert Figma designs to production code using Figma MCP and Shadcn Studio blocks.

## Instructions

1. First, call the `mcp__shadcn-studio-mcp__get-ftc-instructions` tool to load the full Figma to Code workflow instructions.
2. Follow those instructions exactly, step by step.
3. This is a FULLY AUTOMATED workflow — do not stop to ask for user confirmation.

## Workflow Summary

1. Determine method: Frame selection (user selected frame) OR Figma URL (user provides link)
2. Use Figma MCP to extract Pro Blocks / Free Blocks component instance names
3. `parse-figma-blocks` → convert names to `@ss-blocks/` format
4. Install blocks via `collect_selected_blocks` → `get_add_command_for_items`
5. Replace content from Figma (text, images, logos) — do NOT change layout/structure
6. Create page.tsx route, copying data from each block's `app/{block-name}/page.tsx`
7. Verify Next.js config for external image domains

## Key Rules

- Use ONLY Figma MCP tools + `parse-figma-blocks`, `collect_selected_blocks`, `get_add_command_for_items`
- Do NOT use `/cui`, `/iui`, or `/rui` tools (no `get-blocks-metadata`, `get-block-meta-content`, etc.)
- Replace text and images from Figma after installation
- Do NOT change layout or structure of installed components
- Copy data from block's `app/{block-name}/page.tsx` for landing pages

## User Query

$ARGUMENTS
