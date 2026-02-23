# Refine UI with Shadcn Studio (/rui)

Refine, edit, or update existing Shadcn blocks with new component variants from the registry.

## Instructions

1. First, call the `mcp__shadcn-studio-mcp__get-refine-instructions` tool to load the full Refine UI workflow instructions.
2. Follow those instructions exactly, step by step.

## Workflow Summary

1. Understand user requirements → identify all components to update/add
2. Review existing code to understand current state
3. For each component: `get-component-meta-content` → select best variant → `collect_selected_components` (action='add')
4. Collect ALL components before generating any install command
5. `get_add_command_for_components` → execute installation
6. Implement changes using installed components, custom code, or mixed approach
7. Ensure consistency, responsiveness, and accessibility

## Key Rules

- Use ONLY these tools: `get-component-meta-content`, `collect_selected_components`, `get_add_command_for_components`
- Do NOT use `get-component-content`, `get-block-meta-content`, or `get-blocks-metadata`
- Use raw component names (e.g., `button` not `shimmer-button`)
- Collect ALL components first, then install in one batch
- Three implementation paths: registry components, custom components, or mixed
- Review existing code before making modifications
- Maintain design consistency with the project theme

## User Query

$ARGUMENTS
