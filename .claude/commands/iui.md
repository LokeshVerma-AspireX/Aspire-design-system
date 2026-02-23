# Inspire UI with Shadcn Studio (/iui)

Generate new UI blocks inspired by existing Shadcn Studio blocks, synthesizing unique designs.

## Instructions

1. First, call the `mcp__shadcn-studio-mcp__get-inspire-instructions` tool to load the full Inspire UI workflow instructions.
2. Follow those instructions exactly, step by step.

## Workflow Summary

1. Analyze user query → identify all required blocks
2. For each block: `get-blocks-metadata` → use `iuiPath` → `get-inspiration-block-content`
3. Analyze block content using the Structured Block Analysis Framework (Layout DNA, Component Arsenal, Design Patterns, UX Mechanics)
4. Create a Design Strategy — never copy blocks directly, synthesize unique designs
5. Install required dependencies (check existing ones first)
6. Generate code following the Design Strategy
7. Validate against quality gates

## Key Rules

- Use ONLY these tools: `get-blocks-metadata`, `get-inspiration-block-content`
- Analyze patterns, don't copy — adapt and improve
- Hero sections MUST be clean and simple — no floating elements or complex widgets
- Check existing dependencies in package.json before installing new ones
- Use Shadcn semantic classes and Tailwind utilities
- Use motion (motion.dev) for subtle animations only
- Use Lucide icons, Unsplash images, and shadcn Studio avatar API

## User Query

$ARGUMENTS
