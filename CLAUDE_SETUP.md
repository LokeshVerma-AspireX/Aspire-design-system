# Aspire Design Story — Claude Automated Setup Guide

> **Who this is for:** Designers and non-developers who want to run and contribute to the Aspire Design System on their own computer.
>
> **How to use it:** Open the Claude desktop app, select this project folder, then say:
> _"Please read CLAUDE_SETUP.md and set up this project on my system."_
>
> Claude will handle everything automatically — including creating a personal branch, installing tools, and launching Storybook.

---

## How Claude Should Read This File

Claude: Read every section carefully before taking any action. Execute each step in order. After each command, check its output. If something fails, follow the **Diagnosis & Fix** notes for that step. Keep a running log in your response so the user can see what succeeded, what failed, and what was fixed. Do **not** skip steps or assume success — always verify.

---

## 0. Pre-Flight: What Claude Must Know Before Starting

```
Project repo: https://github.com/LokeshVerma-AspireX/Aspire-design-system.git
Primary branch: main
Node version required: 18 or higher (20 LTS recommended)
Package manager: npm
Key ports: 6006 (Storybook), 3000 (Next.js)
```

Claude: Before running any commands, confirm the following with the user by asking **one grouped question**:

> "Before I start setting up the project, I need a couple of quick things:
>
> 1. **Your name or GitHub username** — I'll create a personal branch named `setup/[your-name]` so your work stays separate from main.
> 2. **shadcn Studio credentials (optional)** — If you have a shadcn Studio Pro license (email + license key), please share them now so I can configure the `.env` file. If you don't have them, that's fine — everything except shadcn Studio Pro components will still work."

Store the user's answers as:
- `BRANCH_NAME` = `setup/[name they provide, lowercased, spaces replaced with dashes]`
- `SHADCN_EMAIL` = their email if provided, otherwise leave blank
- `SHADCN_LICENSE_KEY` = their license key if provided, otherwise leave blank

---

## 1. System Requirements Check

Claude: Run the following checks and log each result clearly.

### 1a. Check Git

```bash
git --version
```

**Expected:** `git version 2.x.x` or higher
**If missing (macOS):** Run `xcode-select --install` — a system dialog will appear, ask the user to click Install and wait for it to finish, then re-check.
**If missing (Windows):** Tell the user to download and install Git from https://git-scm.com/download/win, then restart Claude.
**If missing (Linux):** Run `sudo apt-get install git -y` or `sudo dnf install git -y` depending on distro.

Log: `✅ Git [version] — OK` or `❌ Git not found — [action taken]`

---

### 1b. Check Node.js

```bash
node --version
```

**Expected:** `v18.x.x` or higher. v20 LTS is ideal.
**If missing or too old:** Inform the user:
> "Node.js [version found / not found] is on your system. The project needs Node 18+. I'll guide you to install it."
>
> Direct them to https://nodejs.org — tell them to download the **LTS** version and run the installer, then restart their terminal and tell Claude to continue.

**If nvm is available** (check with `nvm --version`), Claude can install Node automatically:
```bash
nvm install 20
nvm use 20
```

Log: `✅ Node [version] — OK` or `❌ Node [version] too old / not found — [action taken]`

---

### 1c. Check npm

```bash
npm --version
```

**Expected:** `9.x.x` or higher
**If missing:** npm ships with Node, so if Node is installed and npm is missing, run:
```bash
npm install -g npm@latest
```

Log: `✅ npm [version] — OK` or `❌ npm not found — [action taken]`

---

### 1d. Check available ports

```bash
# macOS / Linux
lsof -i :6006 2>/dev/null | head -5
lsof -i :3000 2>/dev/null | head -5
```

```powershell
# Windows
netstat -an | findstr ":6006"
netstat -an | findstr ":3000"
```

**If a port is in use:** Tell the user which app is using it and ask:
> "Port [6006/3000] is already in use by [process name]. Would you like me to stop it, or use a different port for [Storybook/Next.js]?"
>
> If they want to stop it: `kill -9 [PID]` (macOS/Linux) or `taskkill /PID [PID] /F` (Windows).
> If they want a different port: note it and use `-p [port]` flag when starting Storybook, or set `PORT=[port]` env variable for Next.js.

Log: `✅ Port 6006 free` / `⚠️ Port 6006 in use by [name] — resolved by [action]`

---

## 2. Clone the Repository

Claude: Check if the project folder already exists before cloning.

```bash
# Check if we're already inside the project
ls package.json 2>/dev/null && echo "ALREADY_IN_PROJECT" || echo "NOT_IN_PROJECT"
```

**If `ALREADY_IN_PROJECT`:** Skip cloning. Tell the user:
> "Great — I can see the project files are already here. Skipping clone."

**If `NOT_IN_PROJECT`:** Ask the user where they want the project saved:
> "Where would you like me to save the project? For example: Desktop, Documents, or a specific folder path."
> Then clone into that location:

```bash
cd [user-chosen-directory]
git clone https://github.com/LokeshVerma-AspireX/Aspire-design-system.git aspire-design-story
cd aspire-design-story
```

**If clone fails (auth error):** The repo is public — if auth is requested, tell the user to make sure they're connected to the internet, then retry with HTTPS, not SSH.

**If clone fails (network error):** Retry once. If it fails again, tell the user to check their internet connection.

Log: `✅ Repository cloned to [path]` or `✅ Already in project directory`

---

## 3. Create a Personal Branch

Claude: **Never commit directly to `main`.** Always create and switch to a personal branch first.

```bash
# Make sure we're on an up-to-date main
git checkout main
git pull origin main

# Create and switch to the personal branch
git checkout -b BRANCH_NAME
```

Replace `BRANCH_NAME` with the value collected in Step 0 (e.g., `setup/sarah-kim`).

**If branch already exists** (user ran setup before):
```bash
git checkout BRANCH_NAME
git pull origin main --rebase
```

**Verify the branch:**
```bash
git branch --show-current
```

Expected output: the branch name you just created.

Log: `✅ On branch [branch-name] — ready to work`

---

## 4. Configure Environment Variables

Claude: The project uses a `.env.local` file for secrets. This file is never committed to git.

```bash
# Check if .env.local already exists
ls .env.local 2>/dev/null && echo "EXISTS" || echo "MISSING"
```

**If MISSING:** Create it:

```bash
cat > .env.local << 'EOF'
# shadcn Studio Pro credentials (optional)
# If you have a license, fill in your email and license key below.
# Leave blank if you don't have a license — everything else will still work.
EMAIL=SHADCN_EMAIL_PLACEHOLDER
LICENSE_KEY=SHADCN_LICENSE_KEY_PLACEHOLDER
EOF
```

Then replace `SHADCN_EMAIL_PLACEHOLDER` and `SHADCN_LICENSE_KEY_PLACEHOLDER` with the values from Step 0. If the user didn't provide them, leave the values blank (keep the `EMAIL=` and `LICENSE_KEY=` keys, just with no value after the `=`).

**If EXISTS:** Read it to confirm credentials are present, and offer to update it if the user wants to add credentials now.

**Verify:**
```bash
cat .env.local
```

Make sure the file exists and has the correct format.

Log: `✅ .env.local configured` or `⚠️ .env.local already existed — left unchanged`

---

## 5. Install Dependencies

Claude: This is the most critical step. Run it and watch the output carefully.

```bash
npm install
```

**Expected:** Ends with `added X packages` — no errors. There may be some warnings (deprecation notices) — these are normal and can be ignored.

**If it fails with `EACCES` (permission denied on macOS/Linux):**
```bash
# Fix npm global permissions — do NOT use sudo with npm install
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install
```

Then tell the user to add `export PATH=~/.npm-global/bin:$PATH` to their shell profile (`~/.zshrc` or `~/.bash_profile`).

**If it fails with `ERESOLVE` (peer dependency conflict):**
```bash
npm install --legacy-peer-deps
```

Log this: `⚠️ Peer dependency conflict detected — resolved with --legacy-peer-deps`

**If it fails with `ENOTFOUND` (network error):**
> "I couldn't connect to the npm registry. Please check your internet connection and let me know when you're back online."

**If `node_modules` folder already exists** (project was set up before):
```bash
# Check if node_modules is up to date with package.json
npm ci
```

Use `npm ci` instead of `npm install` when `node_modules` already exists to ensure a clean, reproducible install.

Log: `✅ Dependencies installed (X packages)` or `❌ Install failed — [error] — [fix applied]`

---

## 6. Verify the Installation

Claude: Run a quick sanity check to confirm everything installed correctly.

```bash
# Check that key binaries are available
npx storybook --version 2>/dev/null && echo "STORYBOOK_OK" || echo "STORYBOOK_MISSING"
npx next --version 2>/dev/null && echo "NEXT_OK" || echo "NEXT_MISSING"
```

**If STORYBOOK_MISSING:** Run `npm install` again. If it still fails, run:
```bash
npm install storybook --save-dev
```

**If NEXT_MISSING:** Run `npm install next --save`:
```bash
npm install next@16.1.6
```

Log: `✅ Storybook [version] — ready` and `✅ Next.js [version] — ready`

---

## 7. TypeScript Check (Optional but Recommended)

Claude: This catches any code issues early. It's fast and doesn't require the dev server.

```bash
npm run typecheck 2>&1 | tail -20
```

**Expected:** No output, or output ending in `Found 0 errors`.

**If errors appear:** These are usually pre-existing issues in the codebase — **do not try to fix them automatically**. Instead, show the user the error summary:
> "TypeScript found [X] type errors in the codebase. This is likely pre-existing and won't stop Storybook from running. I'll note it in the log and continue."

Log: `✅ TypeScript — 0 errors` or `⚠️ TypeScript — X errors found (pre-existing, not blocking)`

---

## 8. Launch Storybook

Claude: This is the main destination — the visual component library.

```bash
npm run storybook
```

**Expected behavior:** After 15–30 seconds, you'll see:
```
╭───────────────────────────────────────────────────────╮
│                                                       │
│   Storybook 10.x.x for nextjs-vite started           │
│   5.XX seconds for manager and X.XX seconds for preview │
│                                                       │
│    Local:            http://localhost:6006/           │
│    On your network:  http://192.168.x.x:6006/        │
│                                                       │
╰───────────────────────────────────────────────────────╯
```

At that point, tell the user:
> "Storybook is running! Open your browser and go to **http://localhost:6006** to explore the Aspire Design System. You'll see all 60+ components organized by category in the left sidebar."

**If Storybook fails to start:**

*Error: `EADDRINUSE :6006`* — Port is in use:
```bash
npm run storybook -- --port 6007
```
Tell user to go to `http://localhost:6007` instead.

*Error: `Cannot find module`* — Run `npm install` again, then retry.

*Error related to `@storybook/nextjs-vite`* — Try:
```bash
npm install @storybook/nextjs-vite --save-dev
npm run storybook
```

*Build error with Vite/Rollup* — Often a Node.js version issue. Confirm Node is 18+:
```bash
node --version
```
If not, ask the user to upgrade Node (see Step 1b) and then retry.

**Storybook build errors (compilation):** Show the user the last 30 lines of the error and note:
> "Storybook reported a build error. This may be a pre-existing issue. Let me check if the static build already exists..."
```bash
ls storybook-static 2>/dev/null && echo "STATIC_BUILD_EXISTS" || echo "NO_STATIC_BUILD"
```
If `STATIC_BUILD_EXISTS`, offer to serve the static build instead:
```bash
npx http-server storybook-static -p 6006 --cors
```

Log: `✅ Storybook running at http://localhost:6006` or `❌ Storybook failed — [error] — [fix applied]`

---

## 9. (Optional) Launch Next.js Dev Server

Claude: Only do this if the user explicitly asks, or if they want to see the live Next.js app (separate from Storybook).

```bash
# Open a new terminal tab/window first, then:
npm run dev
```

**Expected:** Opens at `http://localhost:3000`

**If port 3000 is in use:**
```bash
PORT=3001 npm run dev
```

Tell user to go to `http://localhost:3001`.

Log: `✅ Next.js dev server running at http://localhost:3000` or `⏭️ Skipped (not requested)`

---

## 10. Git: Make the Branch Official

Claude: Push the personal branch to GitHub so the work is backed up and visible to the team.

```bash
git push -u origin BRANCH_NAME
```

Replace `BRANCH_NAME` with the branch created in Step 3.

**If push fails with auth error:** The repo may require GitHub authentication. Tell the user:
> "GitHub needs you to authenticate. The easiest way is to use the GitHub CLI:
> 1. Install it from https://cli.github.com
> 2. Run `gh auth login` and follow the prompts
> 3. Then come back and tell me to retry the push."

**If push succeeds:** Tell the user:
> "Your branch **[branch-name]** is now on GitHub. When you're ready to share your work or create components, commit your changes and push to this branch — never directly to main."

Log: `✅ Branch [branch-name] pushed to origin` or `⚠️ Push skipped — auth required`

---

## 11. Setup Complete — Summary

Claude: At the end, print a clean summary for the user. Use this exact format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  ASPIRE DESIGN STORY — SETUP COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂  Project location:    [absolute path to project folder]
🌿  Your branch:         [branch-name]
🎨  Storybook:           http://localhost:6006
💻  Next.js (if running): http://localhost:3000

STEP LOG:
  ✅ Git [version]
  ✅ Node [version]
  ✅ npm [version]
  ✅ Cloned / already present
  ✅ Branch [name] created
  ✅ .env.local configured
  ✅ Dependencies installed
  ✅ Storybook launched
  [any ⚠️ warnings with notes]

WHAT TO DO NEXT:
  → Open http://localhost:6006 in your browser
  → Browse components in the left sidebar
  → When you want to build something new, tell Claude which
    component or page you want to create and it will guide you

shadcn Studio Pro: [CONFIGURED / NOT CONFIGURED]
  [If not configured: "Ask Lokesh for credentials when you're ready
   to use Pro components."]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Appendix A: Restarting After Closing the Terminal

Claude: If a user comes back after closing their terminal, they'll need to restart the servers. Tell them to say:

> "Please restart Storybook for the Aspire Design Story project."

Claude should then:

1. Navigate to the project directory (use the path from the setup summary)
2. Switch to their branch: `git checkout [their-branch-name]`
3. Pull latest changes from main: `git pull origin main --rebase`
4. Run: `npm run storybook`

---

## Appendix B: Updating to Latest Changes

Claude: If Lokesh has pushed new components or fixes, the user can update their branch by saying:

> "Pull in the latest changes from the main Aspire Design Story."

Claude should:
```bash
cd [project-path]
git checkout [their-branch]
git fetch origin
git rebase origin/main
npm install   # in case new dependencies were added
```

If there are conflicts: tell the user and describe which files conflict. Don't auto-resolve — ask what they want to do.

---

## Appendix C: Committing & Sharing Work

When a designer wants to save their component work:

```bash
# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "feat: [short description of what was added]"
# Example: git commit -m "feat: add creator profile card component"

# Push to their personal branch
git push origin [their-branch-name]
```

Tell the user:
> "Your changes are saved on GitHub under **[branch-name]**. Share this branch name with Lokesh so he can review your work."

---

## Appendix D: Common Issues Quick Reference

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `command not found: node` | Node not installed | Install from nodejs.org |
| `EADDRINUSE 6006` | Storybook already running | Use `--port 6007` |
| `Cannot find module` | Incomplete install | Run `npm install` again |
| `EACCES` permission error | npm permissions | Use `--prefix ~/.npm-global` |
| White screen in Storybook | Build error | Check terminal for red errors |
| Storybook loads but no stories | Wrong directory | `cd aspire-design-story` first |
| `.env.local not found` | Step 4 skipped | Create it manually from Step 4 |
| `git: remote rejected` | Not authenticated | Use `gh auth login` |
| TypeScript errors | Pre-existing issues | Ignore, Storybook still works |
| `ERESOLVE` on npm install | Peer deps conflict | Use `--legacy-peer-deps` |

---

## Appendix E: Project Quick Reference for Designers

Once Storybook is running, here's what to explore:

| Storybook Section | What You'll Find |
|------------------|-----------------|
| **1. Getting Started** | Welcome, how to use, full component index |
| **2. Foundations** | Colors, typography, spacing, icons |
| **3. Primitives** | Buttons, inputs, badges, avatars (17 basic components) |
| **4. Components** | Tables, charts, forms, empty states (30+ components) |
| **5. Layout** | App shell, sidebar, page header |
| **6. Pages** | Full-page examples: Contacts, Campaigns, Offers, Analytics, Settings |
| **7. Patterns** | Common UI patterns and templates |

**When you want to build a new component**, tell Claude:
> "I want to create a [component name] that [what it does]. Please follow the CLAUDE.md and AI_GUIDE.md files and build it in the Aspire Design Story."

Claude will read the project's AI guides and create the component with the correct patterns, tokens, and a Storybook story automatically.

---

*Guide maintained by Lokesh Verma — lokesh.verma@aspireiq.com*
*Last updated: 2026-02-27*
