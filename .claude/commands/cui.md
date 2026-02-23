# Create UI with Shadcn Studio (/cui)

Create new UI blocks/pages using existing blocks from the Shadcn Studio registry.

## Instructions

1. First, call the `mcp__shadcn-studio-mcp__get-create-instructions` tool to load the full Create UI workflow instructions.
2. Follow those instructions exactly, step by step.
3. This is a FULLY AUTOMATED workflow — do not stop to ask for user confirmation during block collection or installation.

## Workflow Summary

1. Analyze user query → identify all required blocks
2. For each block: `get-blocks-metadata` → `get-block-meta-content` → `collect_selected_blocks` (action='add')
3. Collect ALL blocks before generating any install command
4. `get_add_command_for_items` → execute installation
5. Automatically customize content (text, images) to match user's requirements
6. Create page.tsx route importing the installed blocks

## Key Rules

- Use ONLY these tools: `get-blocks-metadata`, `get-block-meta-content`, `collect_selected_blocks`, `get_add_command_for_items`
- Collect ALL blocks first, then install in one batch
- After installation, MUST proceed to content customization automatically
- Use Lucide icons for logos, Unsplash URLs for images
- Avatar API: `https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-[1-20].png`
- Maintain component structure — only update content, not layout
- Import block data from each block's `app/{block-name}/page.tsx`

## User Query

$ARGUMENTS
