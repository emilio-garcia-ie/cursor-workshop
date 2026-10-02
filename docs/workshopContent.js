export const WORKSHOP = [
  {
    n: 1,
    title: "Day One: Meet the Team",
    pts: 5,
    group: "Core steps",
    desc: "New company, new codebase, first day. Let's meet the team and how they work.",
    tabs: [
      { name: "The project", body: `Northwind Payments moves money for small businesses — coffee roasters, bookshops, bike stores. The merchant console is the internal tool staff use to trace money: did a payment go through, where did a refund go, when does the business get paid. Real working web app, hosted copy for looking around, data generated, fictional.

- Overview — how much money moved this month, at a glance
- Payments — every payment, searchable, with export. First ticket lives here
- Disputes — when a customer says "that charge wasn't me"
- Payouts — when each business actually gets its money
- Cards — does not exist yet. Building it is the Build Battle
- Open the live console` },
      { name: "Implement", body: `Welcome to Northwind Payments. Team owns the merchant console.

- Marcus Bell, engineering lead. Hands you a ticket day one, expects shipment. Particular about PR format.
- Dana Whitfield, ops lead. Her team lives in the console.
- How this team works: use Claude Code, read CLAUDE.md at repo root then merchant-console/CLAUDE.md, tickets in docs/tickets/, yours has your name on it.
- [Mark Complete]` },
    ],
  },
  {
    n: 2,
    title: "Clone It and Run It",
    pts: 30,
    group: "Core steps",
    desc: "Your first ticket just landed. Let's get the code, run the app, and get our bearings.",
    tabs: [
      { name: "Learn", body: `The Northwind merchant console
* Cloning a **repository** and executing its setup are separate decisions. Reviewing manifests, lockfiles, scripts, hooks, and configuration gives you a chance to understand what installation and startup will do before you approve them.
* This project is a **Next.js** app in TypeScript with **Tailwind** and Tremor components. Data lives in an in-memory store seeded deterministically at boot, so every person in the room gets identical records and identical bugs, and setup stays one install and one command. Anything you create lasts until the **dev server** restarts.
* Two conventions explain most of the code, and both are written down in the project's CLAUDE.md: money is integer minor units, and storage and bucketing are UTC. Every bug planted in here breaks one of them.` },
      { name: "Implement", body: `* Your first **ticket** is **NWP-101**. Three things stand between you and it: the code, a **branch**, and a running app.

#### **1. Fork, clone, branch**
* You need your own copy of the **repo** on GitHub — a **fork**. You will push to your fork, and your **pull request** comes back to ours. Nobody pushes to the workshop repo directly.
\`\`\`
Fork https://github.com/JJFromTenex/claude-code-training to my GitHub account and clone the fork: run gh repo fork JJFromTenex/claude-code-training --clone. Then open the project folder and create a branch called NWP-101-export-options.
\`\`\`
* *Buttons:* \`Explain this command\`, \`Copy\`
* The branch is named after the ticket — that is how work gets traced from request to pull request. \`main\` stays untouched, which is what makes it safe to let an agent edit files at all.
* **Pro Tip:** This needs the GitHub command line tool, signed in. Check with \`gh auth status\`. Missing? \`brew install gh\`, then \`gh auth login\`.

#### **2. Install and run**
\`\`\`
Install the dependencies in build-battle/merchant-console and start the dev server in the background. When it is up, open http://localhost:3000 in my browser.
\`\`\`
* *Buttons:* \`Explain this command\`, \`Copy\`
* You saw this app in **The project** tab. Now click through it for real — all five screens. Notice what is missing: **Cards**. Ops still asks the platform team for those by hand. Remember that for the end of the day.

#### **3. Read the ticket**
\`\`\`
Read docs/tickets/NWP-101.md and summarize it in three lines: what it asks for, and what the notes at the bottom warn about.
\`\`\`
* *Buttons:* \`Explain this command\`, \`Copy\`
* Read it yourself too. The notes exist because someone already lost an afternoon to the trap they describe.

#### **4. Get your bearings**
* You have never seen this codebase. Have Claude map it for you:
\`\`\`
I want to understand this codebase. Investigate the project and create a simple HTML architecture page: what the app does, the tech stack, how src is organized, and where the payments export flows end to end. Open it in my browser when done.
\`\`\`
* *Buttons:* \`Explain this command\`, \`Copy\`
* Two minutes, and you have a map you can open in a browser. This is how Claude onboards you to any unfamiliar repo.
* When you've finished the hands-on steps above, mark this step complete.
* *Button:* \`Mark Complete\`` },
      { name: "Pro tips", body: `Habits worth stealing
* Four things experienced engineers do before and just after cloning something they did not write.
* **Ask for a security read before you install, not after**
* Installing runs scripts. Ask what \`npm install\` will execute, what network access it needs, and whether any postinstall hook exists. Thirty seconds, and it is the only moment where the answer still costs you nothing.
* **Code Block:** \`git switch -c NWP-101-export-options\`
* **Branch before the first edit, always**
* Name it for the ticket. A branch you can throw away is what makes it safe to let Claude work fast — and it keeps \`main\` reviewable.
* **Code Block:** \`Read docs/tickets/NWP-101.md\`
* **Point at the source of truth instead of retyping it**
* Pasting a ticket loses the formatting and invites you to paraphrase. \`@\` gives Claude the file itself, and the acceptance criteria stay exact.
* **Read the repo's own CLAUDE.md before you prompt**
* A good repository tells you its conventions in writing. Two minutes there saves you from the class of mistake that looks fine in review and breaks in **production**.
* **Code Block:** \`git log --oneline -20\`
* **Skim the recent history**
* How this team writes **commits** tells you how they expect yours to look, and recent churn shows you which parts of the codebase are actually alive.
* Everything above takes about five minutes total, once. It is the difference between joining a codebase and guessing at one.` },
      { name: "Advanced", body: `* **The onboarding use case:** Notice what just happened — you described an outcome ("install and run") and Claude figured out the commands. A new engineer can get an unfamiliar project running without first memorizing its toolchain. That is the onboarding story most teams feel immediately: time-to-first-run drops from a morning to a few minutes.
* **The reviewable part matters more.** The prompt before it asked what installation would execute, and you read the answer before approving. At an organization scale that habit is the difference between an agent that accelerates your team and one that runs arbitrary code from an unreviewed dependency. Pair it with a lockfile policy and an internal registry, and the speed comes without widening the supply-chain surface.` },
    ],
  },
  {
    n: 3,
    title: "CLAUDE.md: Set Up & Customize",
    pts: 20,
    group: "Core steps",
    desc: "The team already wrote down how they work. Let's read it, then add what they left out.",
    tabs: [
      { name: "Learn", body: `#### **Engineering Sub-Tab**
**The CLAUDE.md hierarchy**

You can have more than one CLAUDE.md, and they stack. The root file is read at the start of every session, so it holds the big picture: system overview, shared commands, org-wide standards, and the parts of the codebase nobody should touch. A CLAUDE.md inside a subdirectory is only pulled in when Claude starts working in that folder, so services/api can carry API and database rules without spending context on every frontend session. Your own ~/.claude/CLAUDE.md rides along on every project you open, and CLAUDE.local.md keeps repo-specific personal notes out of git.

That layering is how a team enforces standards without slowing anyone down. The platform team owns the root file. Service teams own their own. Each engineer keeps their preferences to themselves. Everyone gets the right context at the right scope, and the file is reviewed in a PR like any other code.

Explore the tree below. Click any file to read a real example and see what belongs at that level and what does not.

**The CLAUDE.md hierarchy, in this repo**

This is the context layout of the repository you cloned. Files stack from broadest to narrowest: the root loads every session, the app file loads once Claude works in the console, and a rule loads only when Claude opens a file its paths match. Click any highlighted file to read it and see what belongs at that level.

**PROJECT STRUCTURE**
*Click any highlighted file to read it*
- \`~/.claude/\` (Your machine)
  - \`CLAUDE.md\` (User - every project) [Inspect]
- \`claude-code-training/\` (Repository root)
  - \`CLAUDE.md\` (Team - every session) [Inspect]
  - \`CLAUDE.local.md\` (Personal - gitignored) [Inspect]
  - \`docs/\` (The board)
    - \`tickets/\` (What you were asked to do)
    - \`epics/\` (What you decided to do about it)
  - \`build-battle/\` (Exercise wrapper)
    - \`CLAUDE.md\` (Exercise scope only)
    - \`merchant-console/\` (The application)
      - \`CLAUDE.md\` (App - loads when Claude works here) [Inspect]
      - \`.claude/rules/\` (Loads only on a match)
        - \`money.md\` (Governs lib, api, and data) [Inspect]
        - \`api-routes.md\` (Governs route handlers) [Inspect]
        - \`cards.md\` (Governs card files) [Inspect]
        - \`components.md\` (Governs UI)
      - \`src/\`
        - \`lib/money.ts\` (money.md applies here)
        - \`app/api/payments/route.ts\` (money.md + api-routes.md)
        - \`components/Table.tsx\` (components.md applies here)
        - \`package.json\`

The greyed files at the bottom are governed by the rule above them. Notice that none of that detail is in CLAUDE.md — it would be paid for on every turn, including the ones that never touch money.

#### **Marketing Sub-Tab**
**The CLAUDE.md hierarchy, in this repo**

The same hierarchy, in a repo with no code in it. A marketing team layers context exactly like an engineering team does: broad rules at the root, task skills that load when the task matches, and one folder per channel carrying only what is true there. Click any highlighted file to read it.

**PROJECT STRUCTURE**
*Click any highlighted file to read it*
- \`marketing/\` (Repository root)
  - \`CLAUDE.md\` (Team - every session) [Inspect]
  - \`.claude/\` (Shared skills)
    - \`skills/\`
      - \`brand-voice/\`
        - \`SKILL.md\` (How we sound, everywhere) [Inspect]
      - \`ppc-ads/\`
        - \`SKILL.md\` (Paid ads) [Inspect]
      - \`seo/\`
        - \`SKILL.md\` (Search) [Inspect]
  - \`channels/\` (One folder per channel)
    - \`linkedin/\` (LinkedIn)
      - \`CLAUDE.md\` (Channel - loads in this folder) [Inspect]
      - \`.claude/skills/\`
        - \`linkedin-voice/\`
          - \`SKILL.md\` (Voice for this channel) [Inspect]
      - \`references/\` (Posts that worked)
        - \`top-performers.md\` (Example with real numbers) [Inspect]
    - \`x/\` (X)
      - \`CLAUDE.md\` (Channel - loads in this folder) [Inspect]
      - \`.claude/skills/\`
        - \`x-voice/\`
          - \`SKILL.md\` (Voice for this channel) [Inspect]
      - \`references/\` (Posts that worked)
        - \`top-performers.md\` (Example with real numbers) [Inspect]
    - \`youtube/\` (YouTube)
      - \`CLAUDE.md\` (Channel - loads in this folder) [Inspect]
      - \`.claude/skills/\`
        - \`youtube-voice/\`
          - \`SKILL.md\` (Voice for this channel) [Inspect]
      - \`references/\` (Posts that worked)
        - \`titles-that-worked.md\` (Example with real numbers) [Inspect]
      - \`references/\`
        - \`claims.md\` (Sourced numbers) [Inspect]

Look at what is not in the root CLAUDE.md: no post formats, no voice guide, no channel rules. Voice is a skill because it is long and reused. Channel rules sit in the channel folder because they are only true there. That is the same decision you just made about merchant-console/ and its rule files.` },
      { name: "Implement", body: `CLAUDE.md is onboarding notes for Claude: standards, layout, what not to touch. It loads at the start of every session.

#### **1. Read the one that already exists**
This repository ships its own context, because a real codebase would. Read it before you write anything — the @ syntax pulls any file into the conversation, and works for any file in your project:

\`\`\`
Read build-battle/merchant-console/CLAUDE.md and give me the three rules most likely to bite someone new to this codebase.
\`\`\`

Two conventions explain most of this codebase: money is integer minor units, and everything is stored in UTC. Most of what is broken in the console breaks one of those two.

#### **2. See what /init does**
\`/init\` drafts a CLAUDE.md from the codebase. Run it here and see what it suggests adding to the one that exists.

\`\`\`
/init
\`\`\`

Read its suggestions critically. A generated CLAUDE.md is a starting point, never a finished one: it describes what the code is, and the valuable half is what the code should be.

#### **3. Customize it**
Ask Claude to add your team's standards:

\`\`\`
Edit my CLAUDE.md to add a new section called Release Standards with these rules: all changes need test evidence before merging, no direct commits to main, and every PR must include a one-line business impact summary.
\`\`\`

You can also open CLAUDE.md directly in your text editor (VS Code or vim) to make changes.

#### **CLAUDE.md file hierarchy**
You can have multiple CLAUDE.md files that stack — each scoped to a different level:

| File | Scope |
| :--- | :--- |
| \`./CLAUDE.md\` | Project (shared via git) |
| \`./.claude/rules/*.md\` | Topic-specific rules |
| \`./CLAUDE.local.md\` | Personal, this project only |

**Pro Tip**
Whatever you'd tell a new senior engineer on day one — how you structure services, your testing philosophy, architectural choices, what not to touch — put it in CLAUDE.md. \`/init\` gives you a great starting point, but the real value comes when your team refines it with institutional knowledge.` },
      { name: "Pro tips", body: `**Keep project instructions cheap**

CLAUDE.md loads at the start of every session, so every line is a line you pay for all day. Claude also keeps its own memory alongside it, and the two are saved in different ways.

- **\`/init\` (Generate a first draft)**
  Run it once in a new repo, then edit down. If a CLAUDE.md already exists, \`/init\` suggests improvements instead of overwriting it.

- **\`remember that…\` (Just say what you want remembered)**
  Saying *"remember that the API tests need a local Redis instance"* saves it to Claude's auto memory, a per-repository set of notes Claude writes for itself. It is on by default.

- **\`add this to CLAUDE.md\` (Say where it should go)**
  Auto memory is Claude's notes; CLAUDE.md is your team's instructions. Naming the file is what sends it to the shared one.

- **\`/memory\` (Browse and edit every memory file)**
  Lists your CLAUDE.md, CLAUDE.local.md, and the auto-memory folder, and lets you open any of them. Also where you toggle auto memory off.

- **\`/context\` (Confirm what actually loaded)**
  Check the Memory files list. If a file is not there, Claude cannot see it, no matter what it says.

- **Keep it under about 200 lines**
  Anthropic's own guidance: longer files consume more context and reduce how closely Claude follows them.

- **\`@\` (Point at files instead of pasting them)**
  \`@path/to/file\` in a prompt beats restating a file inside CLAUDE.md.

- **Set compaction instructions once**
  A \`# Compact instructions\` section in CLAUDE.md tells Claude what to preserve every time it compacts.

Auto memory is machine-local and lives outside the repo, so it never reaches your teammates. Anything the team needs belongs in CLAUDE.md, which is checked into git.` },
      { name: "Advanced", body: `**Who owns CLAUDE.md?** Treat it like your CI config or linting rules — it lives in the repo, is reviewed in PRs, and has a clear owner. In most organizations, the platform or DevEx team owns the root-level CLAUDE.md with org-wide policies (security requirements, testing standards, deployment procedures). Individual service teams customize at the repo level for their specific architecture and conventions.

**What to put in it:** Whatever you would tell a senior engineer on day one. How services communicate. Which patterns are approved vs. deprecated. Where the bodies are buried (legacy systems, known tech debt, things not to touch). Compliance requirements that apply to all code changes. The more institutional knowledge you encode, the more consistently Claude behaves across your organization.

**The hierarchy in practice:** For a monorepo, the root CLAUDE.md sets org-wide rules. Each service directory gets its own CLAUDE.md for service-specific patterns. Engineers add CLAUDE.local.md for personal preferences (editor conventions, commit style). This mirrors how you already layer eslint configs or Terraform variables.

**Governance:** Review CLAUDE.md changes in PRs just like code changes. When a standard changes (new testing framework, new API pattern), update the CLAUDE.md and every engineer gets the new guidance automatically on their next session. No Slack announcement, no wiki page to find — it is in the repo where the work happens.` },
    ],
  },
  {
    n: 4,
    title: "Context: What Claude Remembers",
    pts: 15,
    group: "Core steps",
    desc: "Claude's memory has a size. Let's see what fills it and how to keep it lean.",
    tabs: [
      { name: "Learn", body: `### What fills the window
Everything competes for the same room: your instructions, every file Claude reads, every command result, every reply. Click through the meter — each segment is one kind of tenant.

### Read a /context report
This is what \`/context\` reports partway through a real session. Click any category to see what fills it and how to keep it small. Switch to **After /compact** to see what compaction actually changes.

#### Context Usage by Category (Now)
*   **System prompt**: 3.0k (1.5%)
*   **System tools**: 17.4k (8.7%)
*   **MCP tools**: 3.6k (1.8%)
*   **Custom agents**: 0.5k (0.3%)
*   **Skills**: 1.2k (0.6%)
*   **Messages**: 89.3k (44.7%)
*   **Free space**: 51.8k (25.9%)
*   **Autocompact buffer**: 33.0k (16.5%)

#### Context Usage by Category (After /compact)
*   **System prompt**: 3.0k (1.5%)
*   **System tools**: 17.4k (8.7%)
*   **MCP tools**: 3.6k (1.8%)
*   **Custom agents**: 0.5k (0.3%)
*   **Skills**: 1.2k (0.6%)
*   **Messages**: 12.1k (6.1%)
*   **Free space**: 129.0k (64.5%)
*   **Autocompact buffer**: 33.0k (16.5%)


### Category Details

#### System prompt
Claude Code's own instructions, loaded before you type anything. You do not control this one.
*   **Do**: Treat it as fixed overhead when you budget the rest of the window.
*   **Don't**: Do not try to shrink it; your CLAUDE.md is the part you own.

#### System tools
The built-in tools: read, edit, bash, glob, grep, and the rest. Always loaded, and the single largest fixed cost in most sessions.
*   **Do**: Expect this before you add anything of your own.
*   **Don't**: Do not read it as waste; these are the tools doing the work.

#### MCP tools
Tool definitions from your connected MCP servers. Tool search is on by default, so only tool names and each server's instructions load at session start; a full schema enters context only when Claude actually reaches for that tool.
*   **Do**:
*   Run \`/context\` after adding a server, so you know its real cost rather than guessing.
*   Prefer a CLI when one exists (gh, aws, sentry-cli); it adds no per-tool listing at all.
*   Toggle servers you are not using off in \`/mcp\` — a connected server still costs names and instructions.
*   **Don't**:
*   Do not turn tool search off (ENABLE_TOOL_SEARCH=false) without checking \`/context\` first; that loads every schema upfront and this line grows fast.
*   Do not assume a heavy server is safe to leave connected because it is idle.

#### Custom agents
Your subagent definitions. Only each agent's name and description sit in context until one is actually invoked, so they stay cheap.
*   **Do**: Write tight descriptions; that is the part that is always loaded.

#### Skills
Your skills. Only each skill's name and description are loaded up front; the body is read on demand.
*   **Do**: Keep the frontmatter description sharp so Claude knows when to open it.
*   **Don't**: Do not paste a whole skill body into CLAUDE.md to be safe; that turns an on-demand cost into a permanent one.

#### Messages
The conversation itself: your prompts, Claude's replies, and every file and command result read along the way. This is the part that grows.
*   **Do**:
*   Start a fresh session per task so old work does not ride along.
*   Point Claude at specific files instead of asking it to explore broadly.
*   Compact when this crosses roughly half the window.
*   **Don't**:
*   Do not paste large files into chat when Claude can read them itself.
*   Do not keep one session running all day across unrelated tasks.

#### Free space
What is left for the work ahead. When this gets thin, quality drops before anything visibly breaks.
*   **Do**:
*   Check it before starting anything large.
*   Compact or clear while you still have room to work.
*   **Don't**: Do not wait for autocompact to rescue a session you already know is full.

#### Autocompact buffer
Reserved headroom so Claude Code can summarize on its own before it runs out. It is held back, not available to you.
*   **Do**: Read it as the floor, and count only free space as usable.
*   **Don't**: Do not treat autocompact as your strategy; a compaction you trigger with instructions keeps more of what matters.` },
      { name: "Implement", body: `Everything you and Claude do — files read, commands run, replies — piles into one **context window**. It is working memory, not knowledge: when it fills, the oldest parts get summarized away.

### See it and manage it
*   \`/context\` — what is taking up space right now
*   \`/compact\` — squeeze the history down, keeping what matters
*   \`New task, new session\` — the cheapest context management there is

#### Command Block:
\`\`\`bash
/context
\`\`\`

Run it now, after the exploring you just did. Look at what the tour cost — then explore the meter in the Learn tab to see how a long session fills up.

When you've finished the hands-on steps above, mark this step complete.

**Button**: Mark Complete` },
      { name: "Pro tips", body: `### Manage context before it manages you
Context is the budget you spend all session. These commands are how you watch it and take it back.

#### Command Block:
\`\`\`bash
/context
\`\`\`
*   **See where your context went**
*   Run it at startup and after adding any MCP server, so you learn what things actually cost.

#### Command Block:
\`\`\`bash
/compact Keep the file paths we changed
\`\`\`
*   **Compact with instructions**
*   Plain \`/compact\` summarises; adding instructions tells it what to keep.

#### Command Block:
\`\`\`bash
/clear
\`\`\`
*   **Start clean between unrelated tasks**
*   Cheaper than compacting. Stale context is paid for on every later message.

#### Command Block:
\`\`\`bash
/rename
\`\`\`
*   **Name a session before you leave it**
*   Then \`/resume\` to come back to it later instead of keeping it open all day.

#### Command Block:
\`\`\`bash
/usage
\`\`\`
*   **Check token usage and plan limits**
*   Shows usage by skill, subagent, plugin, and MCP server, so you can see what is expensive.

### Show context usage in your status line
Configure your status line to display it continuously, so you never have to guess.

*A long-running session costs more than it looks: the full conversation is re-sent with every request, so clearing between tasks is the highest-leverage habit here.*` },
      { name: "Advanced", body: `*   **Onboarding artifact:** The HTML architecture output is a real artifact your team can use. Imagine a new engineer joins and runs one prompt to get an interactive architecture diagram of a service they have never seen — the tech stack, data flow, service boundaries, all generated from the actual code rather than an out-of-date wiki page.
*   **Context and cost management:** Longer sessions consume more tokens, which directly affects your budget. Teaching your team to use \`/compact\` regularly is like teaching them to close unused browser tabs — it keeps things fast and reduces spend. Set a team guideline: compact after every major task, clear between unrelated work. Engineers who manage context well can be 2–3x more cost-efficient than those who let sessions grow unbounded.
*   **Context budget breakdown:** When an engineer runs \`/context\`, they see exactly where their tokens are going — system prompt, MCP tool definitions, conversation history, and free space. MCP-heavy sessions (browser testing, database queries) consume context faster. This visibility helps engineers make informed decisions about when to start fresh vs. continue.
*   **Legacy codebase use case:** This exploration pattern is particularly powerful for legacy codebases — systems with 500K+ lines that no single person fully understands. Claude can read across modules and produce cross-cutting views (data flow, dependency graphs, auth boundaries) that would take a human days to compile.` },
    ],
  },
  {
    n: 5,
    title: "Build a Feature",
    pts: 30,
    group: "Core steps",
    desc: "We know the codebase and we have the ticket. Let's plan it, then build it.",
    tabs: [
      { name: "Learn", body: `#### **Request, ticket, plan mode**
Three words that sound alike and are not.

A **request** is what someone wants, in their words — Dana saying the export pulls card digits. A **ticket** is that request written down with acceptance criteria, so "done" is checkable. And **Plan Mode** is where the ticket becomes a plan: what the code does today, which files will change, and how you will know it worked — proposed by Claude, approved by you, before any code.

The plan is where cheap corrections live: a wrong sentence in it costs a sentence. The same mistake found in a 400-line **diff** costs the afternoon.` },
      { name: "Implement", body: `This is the core of the workshop. You are going to take a ticket from the board and deliver it, the way you would at work: read it, build the context, plan, then build.

#### **1. Plan it in Plan Mode**
The export ops relies on is fixed: one column set, no options, card digits in every file. Before writing code, plan. Press **Shift+Tab twice** (or use the mode selector next to the prompt box) to enter **Plan Mode**: Claude reads and proposes, but cannot touch a file until you approve. While you are at it, run \`/model\` and switch to **Fable** — Anthropic's most capable model, and planning is where it earns its keep.

**Task / Command Block:**
\`\`\`text
Read docs/tickets/NWP-101.md and propose a plan: what the export code does today, which files you will change in what order, and how we will know it worked.

Once the plan is approved, build it with tests. Start with the route handler and its validation, then the dialog. Run npm test, add tests to src/lib/csv.test.ts for the new column selection — a subset of columns in the requested order, last four excluded by default, and an empty selection — then run npm test again and show me the summary.
\`\`\`
*(Buttons: "Explain this command", "Copy")*

Claude answers with a plan, not a diff. Read it and correct it before you approve — a wrong sentence here is cheap; the same mistake in a 400-line diff is not.

One decision matters most: the table is paginated, so a browser-built export only captures the visible page. The fix belongs on the server, reusing the **query builder** behind \`GET /api/payments\`. If the plan does not say that, say it before approving.

**Pro Tip:**
Good moment for a break while Claude works. When you come back, review the diff rather than the summary — the summary is what Claude believes it did.

Green is the floor: passing tests mean it runs, not that it matches the ticket. Check the acceptance boxes yourself.

#### **2. Check your work**
**Command Block:**
\`\`\`text
/ship-ready
\`\`\`
*(Buttons: "Explain this command", "Copy")*

When you've finished the hands-on steps above, mark this step complete.

*(Button: "Mark Complete")*` },
      { name: "Pro tips", body: `#### **Steer a build in progress**
Most of the value here is stopping early. These are the controls for that.

* **Shift + Tab**
* Cycle permission modes, including plan mode
* Terminal only; the desktop app and VS Code have a mode selector next to the prompt box. Plan first on anything non-trivial: Claude proposes an approach before it edits.
* **Esc**
* Stop Claude immediately
* Use it the moment the direction is wrong, rather than waiting to see how it turns out.
* **Esc Esc**
* Rewind conversation and code to a checkpoint
* Double-tap Escape, or run \`/rewind\`. This undoes file changes too, not just the chat.
* **Ctrl + T**
* Toggle Claude's task checklist
* Watch the plan tick down while a long task runs.
* **Ctrl + B**
* Background a running task
* Keep working while a long command finishes.
* **Ctrl + V**
* Paste a screenshot straight in
* On iTerm2 use \`Cmd+V\`; on Windows and WSL use \`Alt+V\`. Good for UI bugs and error dialogs.` },
      { name: "Advanced", body: `* **Plan Mode as a design review:** Plan Mode is where Claude Code shifts from assistant to thought partner. For your teams, this is the difference between "Claude wrote some code" and "Claude helped us think through the architecture before writing code." The plan itself becomes a lightweight design document — reviewable, debatable, and improvable before a single line changes.
* **Impact on team seniority mix:** Senior engineers use Plan Mode for anything that spans multiple files or modules — it catches wrong abstractions early. Junior engineers use it to learn — the plan is a teaching artifact that shows how an experienced developer would decompose a problem. This is where you see the biggest multiplier: junior engineers producing senior-quality design decisions because Claude surfaces the tradeoffs.
* **Iterative prompting as product development:** Notice how the prompts in this step are product-shaped — budget constraints, data **dependencies**, cross-module integration. This mirrors how product managers describe features to engineers. Claude can translate product language into technical plans, which means your PMs and engineers can collaborate more directly. The plan becomes the bridge between "what we want" and "how we will build it."
* **ROI framing:** The biggest cost in software is not writing code — it is writing the wrong code. Plan Mode reduces rework by catching misaligned assumptions before implementation. Teams using Plan Mode for cross-module features report 30–50% fewer "oh wait, that is not what we meant" cycles.` },
    ],
  },
  {
    n: 6,
    title: "MCP: Connect GitHub",
    pts: 20,
    group: "Core steps",
    desc: "The feature is done and needs a review. Let's connect GitHub and open the PR from here.",
    tabs: [
      { name: "Learn", body: `#### **What is MCP?**
**Model Context Protocol (MCP)** is a standard way to connect Claude to things outside your files — browsers, databases, ticketing systems, internal APIs. Each server exposes actions Claude can call, with your approval.

You install only one here because the choice itself is the lesson. Every MCP server you ever add is one of two shapes.

**Local servers** run as a process on your own machine and talk to Claude Code the way a command-line tool does. There is no account, so there is nothing to authenticate. Playwright is one: it launches a real browser, so "test this flow" becomes something Claude executes rather than only suggests.

**Remote servers** run on someone else's infrastructure. Claude Code reaches them over HTTP and has to prove who you are, usually with a token you create and scope yourself. GitHub is one, and this is what nearly every business system looks like. It also fails in a way a local server cannot: a wrong or expired token saves fine and only breaks when you use it.

GitHub MCP earns its place because most of the work around a change does not live in your editor. The issue that explains why, the review comments, the CI result — without a connection, all of that arrives by copy and paste, and the session loses the thread every time you leave.

One caution either way: check whether a command-line tool already does the job first. \`gh\`, \`aws\`, and \`gcloud\` cost no context at all, because Claude can simply run them.` },
      { name: "Implement", body: `NWP-101 is built and passing. Now you need it in front of Marcus, which means a **pull request** — and right now that means leaving your session, opening a browser, and copying things across by hand.

An **MCP server** gives Claude reach beyond your files. Connect GitHub, and Claude can open the pull request and read the review comments without you switching windows.

#### **1. Add the server**

##### **Two shapes of MCP server**
You are installing GitHub. Playwright is here for contrast, because between them they cover how almost every server is wired up.

\`/MCP\`
Click a server:
* **Playwright** (1)
* **GitHub** (2)

Playwright needs a **command to run**. GitHub needs an **address and a token**. That is the whole difference.

##### **GitHub**
* Workshop default
* remote · http + token
* needs a personal access token

Runs on **GitHub's servers**. Claude Code reaches it over HTTP and proves who you are with a token you create. It covers the work around the code: issues, pull requests, review comments, CI.

**How it is added:** an address, then a sign-in. The steps below walk you through it — this is the one you are installing.

Claude Code ships with a GitHub connector. Add it and authenticate:
\`\`\`bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
\`\`\`
*(Buttons: [Explain this command] [Copy])*

Then, inside a session, type \`/mcp\`, pick the GitHub server, and follow the sign-in. Authenticating from the panel means the token lives in Claude Code's own credential store rather than in a file in your **repo**.

#### **2. Verify before you trust it**
\`/mcp\` should now show GitHub as **connected**. Adding a server saves the configuration without testing it, so a bad token looks perfectly healthy until the first call fails. Prove it works:
\`\`\`text
Using the GitHub connection, show me the open pull requests on this repository and who they are assigned to.
\`\`\`
*(Buttons: [Explain this command] [Copy])*

#### **3. Check what it cost you**
Every server adds to what Claude carries. Type \`/context\` and look at the **MCP tools** line. Connect what the project needs; disconnect the rest with \`/mcp\`.

#### **4. Open the pull request**
This is what you connected it for. You cloned the repo read-only, so your **branch** travels by **fork** — Claude forks it under your account, pushes there, and opens the **PR** back against the shared main. Standard open-source flow.

\`\`\`text
Push NWP-101-export-options and open a pull request against main on JJFromTenex/claude-code-training, using the repository pull request template. I do not have push access to that repo, so fork it with gh first, push my branch to the fork, and open the PR cross-repo. Title it "NWP-101: add export options". Fill in what changed and how I verified it from what we actually did — the test run and what I clicked. Leave anything you cannot verify blank rather than guessing.
\`\`\`
*(Buttons: [Explain this command] [Copy])*

Read what it wrote — your name is on it. A description that claims a verification you never ran is worse than one that admits a gap.

**Pro Tip**
A CLI you already have beats an MCP server when both would do. \`gh\` adds nothing to context at all. Reach for MCP when you want Claude to work with a system conversationally across many calls, not to replace a single command.

When you've finished the hands-on steps above, mark this step complete.
*(Button: [Mark Complete])*` },
      { name: "Pro tips", body: `#### **Keep MCP servers useful and cheap**
Tool search is on by default, so connected servers are cheaper than they used to be. These keep it that way.

* \`/mcp\`
**See connection status and sign in**
Each server shows connected, needs authentication, or failed. A failed server includes the HTTP status it returned, so a 401 points at the token rather than the config.

* \`/context\`
**Check the cost right after adding one**
The MCP tools line tells you what that server actually charged you.

* **Prefer a CLI where one exists**
\`gh\`, \`aws\`, \`gcloud\`, and \`sentry-cli\` add no per-tool listing at all. Claude can run them directly.

* **Scope tokens to the repos you mean**
A fine-grained GitHub token limits which repositories Claude can reach. Give it the narrowest access that still does the job.

* **Toggle a server off instead of deleting it**
Toggling in \`/mcp\` keeps the configuration but stops Claude Code connecting, which is the fastest way to test whether a server is worth its context.

* **Raise the output cap only when needed**
Claude Code warns above 10,000 tokens of MCP output and truncates at 25,000. Set \`MAX_MCP_OUTPUT_TOKENS\` if a tool genuinely needs more.` },
      { name: "Advanced", body: `* **MCP as your integration layer:** Model Context Protocol is an open standard for connecting Claude to external tools — databases, browsers, ticketing systems, internal APIs. It is how Claude goes from "reading and writing files" to "interacting with your entire development ecosystem."

* **Integrations your teams will want first:**
* **Playwright** — browser testing (what we are doing here)
* **GitHub/GitLab** — PR creation, issue management, code review
* **Database** — query staging/production data safely with read-only access
* **Slack** — post deployment notifications, incident updates
* **Jira/Linear** — update tickets, pull context from issue descriptions
* **Internal APIs** — connect to your proprietary services

* **Permission model:** Each MCP integration runs with developer-approved permissions. Claude asks before using a tool, and you can restrict which integrations are available per project via \`.mcp.json\` (committed to the repo) or per-user settings. For security-sensitive environments, this means you control exactly what Claude can access — a developer working on a payments service might have database read access but no Slack posting.

* **Build your own MCP servers:** MCP is an open protocol. Your platform team can build internal MCP servers that expose your proprietary APIs, internal tools, or compliance-checking services to Claude. This is how organizations extend Claude to understand their unique infrastructure.` },
    ],
  },
  {
    n: 7,
    title: "Your First Skill: The PR Format",
    pts: 15,
    group: "Core steps",
    desc: "Marcus bounced our PR over the description. Let's turn his format into a skill.",
    tabs: [
      { name: "Learn", body: `**What is a Skill?**
A Skill is an organized collection of files - instructions, executable code, and assets - that gives Claude everything it needs for a specific task. Custom slash commands are merged into Skills; older \`.claude/commands/\` files still work, but Skills add multi-file support, frontmatter control, and automatic discovery.

Two common kinds: capabilities Claude does not reliably cover out of the box, such as generating PDFs, Excel, or PowerPoint with your own scripts and templates; and org or stack knowledge, such as brand styling, internal standards, or your team's Definition of Done.

The part worth learning is the shape. \`SKILL.md\` is the only required file. Its name and description sit in context permanently, so the description is what decides whether the skill ever gets used. The body loads when the skill triggers. Everything under \`references/\`, \`scripts/\`, and \`assets/\` loads only when a particular run needs it - which is how a skill can carry a lot of detail without costing you context on every session.

Explore the folder below. Click any highlighted file to read it and see what belongs there.

**Anatomy of a good skill**
This is the workshop repository. Three skills and a subagent already ship with it, so read those before writing your own — the skill you build in this step goes right beside them. \`SKILL.md\` is the only required file; everything else exists so Claude can reach for detail only when it needs it. Click any highlighted file to read it.

**PROJECT STRUCTURE**
*Click any highlighted file to read it*
* \`claude-code-training/\` (Your project)
* \`.claude/\` (Ships with the repo)
* \`skills/\` (Team - shared in git)
* \`spec/SKILL.md\` (Ships with the repo) [Inspect]
* \`pr/SKILL.md\` (Ships with the repo) [Inspect]
* \`ship-ready/SKILL.md\` (Ships with the repo) [Inspect]
* \`northwind-pr/\` (The skill you build in this step)
* \`SKILL.md\` (Required - the entry point) [Inspect]
* \`references/\` (Loaded on demand)
* \`pr-format.md\` (Reference - the house rules) [Inspect]
* \`verification.md\` (Reference - read before writing that section) [Inspect]
* \`scripts/\` (Executable, not read)
* \`changed_files.sh\` (Script - deterministic work) [Inspect]
* \`/content/workshops/claude-code-for-devs/v1/assets/\` (Used in the output)
* \`pr-body.md\` (Asset - the output template) [Inspect]
* \`evals/\` (How you know it works)
* \`evals.json\` (Test prompts) [Inspect]
* \`agents/\` (Subagents)
* \`bug-investigator.md\` (Read-only) [Inspect]
* \`src/\`
* \`CLAUDE.md\`
* \`~/.claude/skills/\` (Personal - every project)
* \`commit-style/\`
* \`SKILL.md\` (One file is a complete skill) [Inspect]

Three loading levels: the name and description sit in context all the time, the \`SKILL.md\` body loads when the skill triggers, and references, scripts, and assets load only when that run actually needs them. That is why a thin \`SKILL.md\` with good pointers beats one long file.` },
      { name: "Implement", body: `The pull request is open. Marcus sends it straight back within the hour — not the code, the description.

Marcus has a house format: ticket ID in the title, what changed in plain language, how you verified it with real commands, criteria ticked honestly, and anything you left out.

Everyone retypes it from memory and gets it slightly wrong. You are about to automate it — and use it on every PR from here on, starting with the one he bounced.

#### **1. Give the skill its own worktree**
The skill is not part of NWP-101. It deserves its own branch and its own PR, so the reviewer of each sees one thing. A worktree gives you a second folder on its own branch while your feature branch keeps running untouched.

**Command to run:**
\`\`\`bash
Create a git worktree at ../northwind-pr-skill on a new branch called tooling/northwind-pr-skill, branched from main. I am going to build a team skill there so it ships as its own clean PR.
\`\`\`

Then open a new terminal, \`cd ../northwind-pr-skill\`, and start claude there. Skills load from the folder where you start Claude — build it where it lives.

#### **2. Read a good one first**
Before writing a skill, read one. The repository already has three, and the closest to what you need is \`/pr\`:

**Command to run:**
\`\`\`bash
Read .claude/skills/pr/SKILL.md and walk me through its shape: when it triggers, what its steps are, and what its rules section forbids.
\`\`\`

Notice its shape: a description that says when to use it, numbered steps for what to do, and a short rules section. That is a skill — instructions Claude can follow, saved in a file, invoked by name.

#### **3. Scaffold your own**
Now build one that encodes Marcus's specifics rather than the generic version:

**Command to run:**
\`\`\`text
Create a skill called northwind-pr in .claude/skills/northwind-pr/.

It writes a pull request description in our team's required format:
- Title: "<TICKET-ID>: <what it does>"
- What changed: one plain-language paragraph, not a file list
- How I verified it: the actual commands run and what they output
- Acceptance criteria: the ticket's checkboxes, ticked honestly, with a note on any that are partial
- Deliberately not done: anything out of scope or left for a follow-up

It should read the branch diff, the git log, and the ticket in docs/tickets/ before writing anything. It must never claim a verification step that was not actually run.
\`\`\`

Claude will create \`SKILL.md\` with frontmatter and a body. Open it and read what it wrote — you are the reviewer here, and the description field is the part that decides whether the skill ever gets used.

#### **4. Test it on your latest work**
**Command to run:**
\`\`\`text
/northwind-pr — write the description for the NWP-101-export-options branch, our latest work. Worktrees share one repository, so that branch is right here.
\`\`\`

It should produce a description for the feature PR you could paste into GitHub as-is. If it invented a verification step you never ran, that is the most important thing to fix — say so in the skill file, not just in this conversation.

**Pro Tip**
The best skill candidates are not clever. They are the things your team already retypes: a PR format, a release checklist, a triage template, the way you like commits worded. If someone has explained it twice, it should be a skill.

When you've finished the hands-on steps above, mark this step complete.` },
      { name: "Pro tips", body: `**Ship skills that actually get used**
A skill only earns its place if Claude reaches for it at the right moment.

**New skill files are picked up automatically**
No restart needed. Save the file and the skill is available in the same session.

**Write the frontmatter description for the trigger, not the reader**
Only the name and description sit in context; the body loads on demand. The description is what decides whether Claude opens it at all.

**\`/context\`**
Check what your skills cost. The Skills line shows the standing cost of every description you have loaded.` },
      { name: "Advanced", body: `A skill is a standard that travels. Checked into \`.claude/skills/\`, Marcus's PR format stops being tribal knowledge that new hires learn by getting a PR rejected. It ships with the repo, and everyone's output converges on it without anyone policing a wiki page.

Prefer the boring ones first. Teams reach for impressive skills and skip the repetitive ones, which is backwards. The highest-return skill in most repositories is the one that encodes something people already do by hand every day, badly and inconsistently.

Watch the description field. It is the only part loaded into context until the skill runs, so it is what decides whether Claude reaches for it at the right moment. A vague description produces a skill nobody benefits from because it never triggers.` },
    ],
  },
  {
    n: 8,
    title: "Subagents: Your Org-Standards Reviewer",
    pts: 15,
    group: "Core steps",
    desc: "The built-in review is free. Let's run it, then build the reviewer that knows our rules.",
    tabs: [
      { name: "Learn", body: `#### **Why subagents?**
Imagine you are managing a project and you send a colleague to investigate a problem — they go away, do the research, and come back with a report. That is what a **subagent** does. It is a separate Claude session that handles a specific task without cluttering your main conversation.

**Why use them?**
* **Focus:** Your main session stays clean. The subagent does the deep-dive and brings back only the findings.
* **Specialization:** Each subagent can be set up for a specific job — investigating bugs, reviewing security, exploring code — with instructions tailored to that task.
* **Safety:** You can limit what a subagent is allowed to do. A bug investigator can read files but not change them, so there is no risk of accidental edits.

A subagent is a file in \`.claude/agents/\`. Describe the job and Claude writes the definition — and what it should (or should not) be allowed to touch.` },
      { name: "Implement", body: `The PR is open and the description is right. Before Marcus reads it, find the problems yourself — landing clean the first time is how reputations get built.

#### **Free first: the built-ins**
Claude Code ships review commands. \`/code-review\` reads your diff for bugs; \`/security-review\` hunts vulnerabilities. Never build what you get for free — run one now:

\`\`\`bash
/code-review
\`\`\`

Read what it flags. Useful — and generic. It has no idea Northwind stores money as integer minor units or buckets in UTC. Your org's rules need an org's reviewer.

#### **Why a subagent**
A **subagent** runs in its own context with its own permissions. It does the reading elsewhere and hands back the report. Yours is **read-only** — it can inspect anything and change nothing, which is why you can trust it.

#### **1. Create it**
A subagent is just a file in \`.claude/agents/\` — the repo already ships one, \`bug-investigator\`. The standards it should enforce are written down too, in \`docs/ORG-STANDARDS.md\`. Point Claude at both:

\`\`\`text
Read docs/ORG-STANDARDS.md and .claude/agents/bug-investigator.md. Then create a subagent at .claude/agents/org-standards.md: a read-only reviewer that audits code against every numbered item in the standards doc. Each finding cites the item number, the file, the line, and a suggested fix. Give it Read, Grep, and Glob only — no editing, no commands.
\`\`\`

Open what it wrote. The \`tools:\` line in the frontmatter is the permission boundary — that, not good intentions, is what makes it read-only. And because the standards live in the doc, updating the doc updates the reviewer.

#### **2. Run it on your own work**

\`\`\`text
Use the org-standards subagent to review the changes on this branch against our standards.
\`\`\`

When you agree with a finding, fix it in the **main** session. The reviewer diagnoses; you operate.

#### **Pro Tip**
Notice what you did not spend: your own context. The subagent read the whole diff and the standards, and handed you back a page. That separation is the entire point — a second opinion that costs you a summary instead of forty files.

When you've finished the hands-on steps above, mark this step complete.` },
      { name: "Pro tips", body: `#### **Run subagents without losing the thread**
Subagents keep verbose work out of your main context. The trick is knowing what they cost and how to stop them.

* **Agents are files in \`.claude/agents/\`**
Only the name and description sit in context until one is used; the body loads on demand. Edit the file, and the agent changes for everyone who pulls.

* **Give simple subagents a cheap model**
Set \`model: haiku\` in the subagent configuration for narrow, mechanical work.

* **Ctrl + X Ctrl + K**
**Stop all background subagents**
Your kill switch when a background run goes long.

* **Delegate the verbose operations**
Test runs, log processing, and doc fetching belong in a subagent, so only the summary comes back to you.` },
      { name: "Advanced", body: `* **This is where written standards stop being decoration.** Most engineering organizations have a standards page nobody reads after week one. Encoded as a read-only reviewer checked into the repo, the same rules get applied to every diff without a human remembering to apply them.

* **Read-only is a design decision, not a limitation.** A reviewer that can edit is a reviewer whose findings you have to re-verify. One that provably could not touch the code gives you a report you can act on directly.

* **Context isolation is the scaling property.** Each subagent gets its own window, so a deep review does not consume the session doing the work. That is what makes it viable to run several specialists — security, performance, standards — against the same change.` },
    ],
  },
  {
    n: 9,
    title: "Hooks: Make the Review Non-Optional",
    pts: 15,
    group: "Core steps",
    desc: "A review only helps if we remember to run it. Let's make it fire before every push.",
    tabs: [
      { name: "Learn", body: `#### **Why hooks belong before release**
A **hook** is a check that runs on its own at a set moment. Like spell-check before an email: you never remember to run it, it just happens.

**Two kinds:**
* **PreToolUse** runs *before* an action, and can stop it. Run the tests before a deploy, and block the deploy if they fail.
* **PostToolUse** runs *after* an action. Check a document against your style guide once it has been edited.

**Not just for code:**
* Scan for passwords or API keys before a file is saved
* Check license headers before a commit
* Warn on the cost before an expensive operation runs

People skip routine checks when they are in a hurry. A hook cannot. It runs first, every time.

#### **Run the same deploy eight times**
Both lanes want the same thing: no push until the build passes. One asks Claude to remember. The other takes the decision away from Claude. Click **Run the deploy** and watch the difference. These results are authored to make the point, not measured.

[Run the deploy] [Reset]
0 of 8 runs

#### **A CLAUDE.md instruction**
*guidance*
\`\`\`
Always run the build before you push.
\`\`\`
0 of 0 runs enforced

CLAUDE.md is context, not enforced configuration. Claude reads it and usually follows it, and **usually** is the problem: the misses cluster exactly where you least want them, in long sessions, after a compaction, under time pressure.

#### **A PreToolUse hook**
*enforcement*
\`\`\`
Block git push unless the build passes.
\`\`\`
0 of 0 runs enforced

The hook is a shell command wired to a fixed event. It runs before the tool call, every time, and blocks it on a non-zero exit. Nothing about the model's judgement, the session length, or the phrasing of your prompt changes that.

Instructions scale with judgement; hooks scale with certainty. Write the rule in CLAUDE.md when a thoughtful colleague could reasonably do it another way, and write a hook when there is no acceptable run where it gets skipped.` },
      { name: "Implement", body: `Your org-standards reviewer works. One problem: it only helps when someone remembers to run it, and at 4pm on a Friday nobody remembers.

So stop relying on memory. A **hook** is a command that fires automatically at a specific moment, whether or not Claude thinks it is a good idea.

#### **Guidance versus enforcement**
Everything you have built today is advice. CLAUDE.md is advice loaded every session. A skill is advice you can invoke. A subagent is advice from a second opinion. Claude reads all of it and then decides what to do.

A hook is different. Your command runs on the event, and if it fails, the action does not happen. It is the only one Claude cannot talk its way past.

#### **1. Open the hooks manager**
\`\`\`
/hooks
\`\`\`

#### **2. Add a PreToolUse hook on push**
**PreToolUse** fires before a tool runs and can block it. Ask Claude to wire the standards check to any push:
\`\`\`
Create a PreToolUse hook on the Bash tool that guards pushes.

When the command is a git push:
1. Run the project's tests and the build.
2. If either fails, block the push and print which one failed and how to see the output.
3. If both pass, allow it through.

Write the script to .claude/hooks/pre-push-check.sh, make it executable, and register the hook in settings so it applies to this project.
\`\`\`

#### **3. Prove it actually blocks**
A hook you have not seen fire is a hook you do not have. Break something on purpose and watch it stop you:
\`\`\`
Temporarily break one of the money tests, then try to push. Show me what the hook does. Then restore the test.
\`\`\`
You should see the push refused with the reason. That is the difference between a standard people agree with and a standard that holds at 4pm on a Friday.

#### **Pro Tip**
Hooks are not only for tests. Format on save, block edits to generated files, log every command to an audit file, notify a channel on deploy. Anything you would otherwise write in a wiki page beginning "please remember to..." is a candidate.

When you've finished the hands-on steps above, mark this step complete.
[Mark Complete]` },
      { name: "Advanced", body: `**Advice does not survive deadline pressure; enforcement does.** The value of a hook is not that it is clever, it is that it is not optional. That makes it the right home for the small number of rules your organization genuinely cannot flex on.

**Choose the layer deliberately.** Guidance in CLAUDE.md keeps the agent aligned without adding friction. Enforcement in hooks adds friction on purpose. Putting everything in hooks makes an unusable environment; putting nothing there makes standards a suggestion. Most teams need three or four hooks and no more.

**Hooks are auditable in a way prompts are not.** A shell command in version control is reviewable, testable, and identical for every engineer, which is what compliance functions ask for when they ask how you control an agent.` },
    ],
  },
  {
    n: 10,
    title: "Choosing the Right Abstraction",
    pts: 5,
    group: "Core steps",
    desc: "We built five different things today. Let's work out when to reach for which.",
    tabs: [
      { name: "Learn", body: `We built five different things today. Let's work out when to reach for which

**When to use which feature**

*   **CLAUDE.md** — Used when you need project-related context and instructions so you are not repeating the same rules every session. Examples: use pnpm not npm; run tests with pytest; follow PEP8.
*   **Skills** — Used when you need specialized task expertise that loads on demand and should persist across conversations. Examples: organizational context, standardized mechanisms, packaged workflows.
*   **MCP (Model Context Protocol)** — Used when you need access to external tools, databases, and APIs through a standard protocol. Examples: query a database; fetch from GitHub; send Slack messages; use Google Drive.
*   **Hooks** — Used when you need deterministic automation that must always run at specific lifecycle events. Examples: auto-format on save; run tests after edits; block deploys that skip quality checks.
*   **Subagents** — Used when you need isolated investigation with separate context and permissions. Examples: read-only bug triage, security review, parallel exploration of different areas.

*Button:* Continue to Implementation` },
      { name: "Implement", body: `We built five different things today. Let's work out when to reach for which

You have now used CLAUDE.md, Skills, MCP, Subagents, and Hooks — all the major building blocks. Open the Learn tab to see how they compare — this is the decision framework for choosing the right layer.

You now own the same checklist in three shapes. \`/ship-ready\` is a skill — instructions that run in your context. \`org-standards\` is a subagent — the same rules with their own context and read-only permissions. \`/code-review\` is the built-in — generic, no org knowledge. Same job, three costs, three guarantees. That trade-off is this whole step.

Reflect on what you built: which feature would you reach for first in your own codebase? Which would have the most impact on your team? This is a reading step with nothing to implement: mark it complete once you have read the Learn tab.

When you've finished the hands-on steps above, mark this step complete.

*Button:* Mark Complete` },
      { name: "Advanced", body: `We built five different things today. Let's work out when to reach for which

**Rollout playbook — what we recommend:**

*   **Day 1:** Set up CLAUDE.md in your key repositories. Have your most senior engineer write the initial version — think of it as onboarding notes for an AI colleague.
*   **Week 1:** Add MCP integrations to bring in all the data and services your team needs — GitHub, databases, Slack, internal APIs.
*   **Week 2:** Begin customization with hooks and skills to unlock added growth. Hooks automate your quality checks; skills encode your team's best practices.
*   **Week 3:** Begin building subagents to expand your team — specialized investigators for security, performance, accessibility.
*   **Ongoing:** Just like your code, this is living and breathing. The real unlock happens when everyone on your team gets to the point of creating their own skills, plugins, and hooks — whether at the org level or in their local repo. With a process in place to share and adopt org-wide, you will find exponential growth in efficiency with AI.

**Success metrics to track:**
*   Time-to-first-commit for new engineers (onboarding)
*   PR cycle time from open to merge
*   Bugs caught pre-CI vs. in CI vs. in production
*   Token spend per engineer per month (budget)
*   Developer satisfaction (quarterly survey)` },
    ],
  },
  {
    n: 11,
    title: "Review, Commit & Ship",
    pts: 25,
    group: "Core steps",
    desc: "Two kinds of work sitting on one branch. Let's decide how they ship, then get NWP-101 to Done.",
    tabs: [
      { name: "Learn", body: `**Closing the loop on a change**

You have built the change. Shipping it is a separate discipline: prove it works, record it clearly, put it in front of a human, and know how to undo it. That sequence is what separates a change that lands from one that gets reverted on Monday. Every term used below is defined in the Terminology tab.

The dry run comes first. Building, starting the server, and running the checks locally catches integration and packaging mistakes while the stakes are still low. A failure here costs you a minute; the same failure after a deploy costs the team an afternoon.

Claude does the tedious half, you keep the judgement. It reads every file it touched, groups the changes into commits that tell one story each, and writes a message that says what changed and why rather than "updates". That is the part engineers skip when they are tired, and it is exactly the part that a reviewer relies on six months later. Your job stays the same: read the diff and the message before you approve. Claude proposes, you decide.

This is also where your team's standards stop being a wiki page. The conventions you wrote in CLAUDE.md shape the commit message; a hook can refuse the push outright when the build fails. The rules travel with the repository instead of living in the head of whoever reviews most often, so a new contributor gets them on day one.

A first-pass review changes the economics. Claude catches what humans skim past in a large diff: inconsistent patterns, an untested edge case, a security oversight. It does not replace human judgement, it raises the floor, so senior engineers spend their review time on design rather than on typos.

Write the rollback before you need it. Naming the signals, the trigger, and who owns the call is a five-minute job when nothing is wrong, and an impossible one at 2am.` },
      { name: "Implement", body: `**Decide: what ships together?**

Stop before you commit. You made two very different kinds of thing today:

* **The feature** — the export options in NWP-101. Requested, ticketed, reviewed against acceptance criteria
* **The tooling** — the org-standards subagent and the pre-push hook. Nobody asked for these. They are not part of the ticket, and they change how the whole team works. (The northwind-pr skill already lives on its own worktree — that call is made)

You are on \`NWP-101-export-options\`. How do you ship both? Pick one before you read on:

* **A** — One pull request. It is all your work from today, and it is faster
* **B** — Two. Feature on the ticket branch, tooling on its own branch and its own PR
* **C** — Feature now, tooling never. It works on your machine; leave it there

**B is the answer**, because of the reviewer. A mixed PR asks one person to judge two unrelated things: does the export behave, and should the whole team adopt this workflow. You already made this call once — the skill went to its own worktree in step 7. The subagent and hook are still mixed into your feature branch.

**C is the common mistake.** Tooling that stays on your laptop helps exactly one engineer. The skill and the subagent are worth more to the team than the export is, and they only count if they are checked in.

So finish the split. Your feature branch keeps only the feature:

Move the tooling still on this branch into the skill worktree at \`../northwind-pr-skill\`, onto its \`tooling/northwind-pr-skill\` branch:
* the org-standards subagent definition
* \`.claude/hooks/pre-push-check.sh\` and its settings entry

Keep on \`NWP-101-export-options\` only the export feature and its tests. Show me the diff on each branch before you commit anything.

Review both diffs. The feature branch should read like the ticket. The tooling branch should read like a proposal to your team, because that is what it is.

Now finish it the way you would at work: review, verify, commit. One prompt does all three, and it stops if anything is red.

#### **1. Review, dry-run, commit**
\`\`\`text
Review all the changes on this branch compared to main. For each file changed, summarize what was modified and why, and flag any risks or areas that need testing.

Then run the checks a reviewer would run: npm test, npm run build, npm run lint. Report exactly what passed and what did not.

If everything is green, commit with a descriptive message that summarizes what we built, and show me the message before you commit. If anything fails, stop and show me the output before you change anything.
\`\`\`

Claude diffs against main, reads every changed file, runs the checks, and proposes the commit. Read the message before approving — you own the branch.

#### **2. From feature branch to production**

Here's how changes actually get to production in most teams:

* **Commit** — You just did this. Your changes are saved on your ticket branch (\`NWP-101-export-options\`)
* **Push** — Upload your branch to your fork on GitHub (\`git push -u origin NWP-101-export-options\`)
* **Pull Request (PR)** — Propose merging your branch into the workshop repo's main. \`/submit\` does the push and opens the PR in one go. Teammates review, comment, and approve
* **Merge** — Once approved, the PR is merged into main — your changes are now part of the official codebase
* **Deploy** — The updated main branch is deployed to production (often automatically via CI/CD)

#### **3. If something goes wrong: rollback**

Before any deployment, know how to undo it. Ask Claude:

\`\`\`text
What are the rollback options if our changes cause issues after deploying? Show me the git commands to revert to the previous working state.
\`\`\`

Know the undo before you need it. There is no production deploy today — the PR from step 6 is as far as it goes. Now open the Build Battle tab on the left. Everything you built is about to get used.

When you've finished the hands-on steps above, mark this step complete.` },
      { name: "Terminology", body: `**The words in this workflow**

Shipping has its own vocabulary, and most of it is only ever explained once. Here is what each word actually means, and where it shows up in the step you just ran.

#### **Commit**
\`git commit\`

A permanent snapshot of your changes, with a message explaining what changed and why.

Think of it as an entry in the project logbook. It records the state of the files, so you can return to this exact point later no matter what happens afterwards. A commit lives only on your machine until you push it.

#### **Push**
\`git push\`

Sending your commits from your machine up to the shared repository, so other people can see them.

Committing is private; pushing is public. This is the step that makes your work visible to the team, which is why a quality check belongs in front of it.

#### **Pull request**
\`PR\`

A request to merge your branch into the main branch, opened for review before anything is combined.

Often shortened to PR. It is where the conversation happens: teammates read the diff, ask questions, and approve or request changes. Nothing lands on the main branch until it is approved and merged.

#### **Worktree**
\`git worktree add\`

A second working folder checked out from the same repository, so you can have two branches open at once.

Normally a repository gives you one folder on one branch, so switching branches disturbs whatever you were doing. A worktree gives you another folder with its own branch, sharing the same history. It is how you review one change while another is still in progress, and how parallel Claude Code sessions stay out of each other's way.

#### **Diff**

The line-by-line comparison of what changed, additions on one side and removals on the other.

It is the thing you actually read before approving anything. When Claude proposes a commit, the diff is your evidence.

#### **Staging**
\`git add\`

Choosing which changes go into the next commit.

You can have twenty edited files and commit only three of them. Staging is that selection step, and it is why a commit can tell one clean story instead of a pile of unrelated work.

*If you only remember one thing: commit records, push shares, and a pull request asks for review. Everything else is detail around those three.*` },
      { name: "Advanced", body: `* **AI-assisted code review economics:** Claude as a first-pass reviewer changes the math on your engineering org. Senior engineers spend less time on routine reviews — they review Claude's summary and focus on architecture and business logic rather than style nits and pattern consistency. Junior engineers get immediate, structured feedback instead of waiting hours for a senior engineer's availability.
* **Two-layer quality gate:** Pair this with Hooks (Step 9) — the PreToolUse hook catches build failures before deploy, and the code review step catches logic and design issues before commit. Together, they create a pre-CI quality gate that catches the majority of issues before code enters your pipeline.
* **Fits your existing workflow:** The commit → PR → merge → deploy flow you see here maps directly to your existing CI/CD pipeline. Claude Code does not replace your pipeline — it improves the quality of what enters it. Your branch protections, required reviewers, and CI checks all still apply. Claude is the first reviewer, not the final approver.
* **Audit trail:** Every change Claude makes is visible in the git diff. The commit message Claude writes becomes part of your permanent history. There is no black box — if you want to understand what Claude did and why, git log and git diff tell the full story.
* **Rollback confidence:** Claude can generate rollback plans proactively. Before any deployment, ask Claude to document what changed, what could break, and how to revert. This pre-incident planning dramatically reduces MTTR when issues do occur.` },
    ],
  },
  {
    n: 13,
    title: "Bonus: Loops & Goals",
    pts: 10,
    group: "Bonus steps",
    desc: "The day is shipped. Let's leave something running that works while you don't.",
    tabs: [
      { name: "Learn", body: `Everything so far ended when you hit Enter and read the answer. Some work does not fit in one turn — watching a **test suite** (The project's automated checks. Green means everything passes.), grinding through a backlog, babysitting a deploy. That is what **loops** and **goals** are for.

### What a goal is
A **goal** is a standing objective with a definition of done. Instead of prompting one task at a time, you describe the finish line and let Claude decide the next step, check its own progress, and keep going until it gets there — or until it genuinely needs you.

### What a loop is
A **loop** re-runs a prompt on a rhythm. \`/loop 15m <prompt>\` fires it every fifteen minutes; leave the interval off and Claude paces itself. A loop is how a goal survives across time — check, act, sleep, check again.

### Set one up
Give it the goal and the loop in one shot. Try this on the merchant console:

\`\`\`
/loop 15m Goal: the merchant console test suite stays green. Run npm test in build-battle/merchant-console. If anything fails, diagnose it, fix it on a branch called maintenance/test-health, and rerun until green. If the suite is already green, reply "green" and do nothing else. Stop the loop after three green checks in a row.
\`\`\`

Note what makes that prompt safe to leave alone: a definition of done, a **branch** (Your own working line of changes inside the repo. main stays safe while you work on a branch.) so \`main\` is never touched, and a quiet no-op when there is nothing to do. A goal without a finish line runs forever; a loop without a no-op burns tokens saying nothing.

### Pro Tip
The habit transfers: nightly triage of new issues, a docs check after every **merge** (Fold one branch's changes into another.), a morning summary of what changed. If you would set a reminder for it, you can probably set a loop for it.

### Long-running agents at work
* **Loops are the local version.** For work that should run when your laptop is closed, scheduled cloud agents run the same shape of prompt on a cron schedule on Anthropic's infrastructure.
* **The guardrails matter more than the schedule.** An unattended agent needs the same things this workshop kept teaching: a branch instead of main, a hook that blocks a bad push, and a definition of done it cannot talk its way past. Autonomy is earned by the fences around it.

When you've finished the hands-on steps above, mark this step complete.` },
    ],
  },
  {
    n: 14,
    title: "Bonus: Dynamic Workflows",
    pts: 10,
    group: "Bonus steps",
    desc: "One agent reads a file. A workflow sends out twenty. Let's see when that's worth it.",
    tabs: [
      { name: "Learn", body: `**One agent versus a team**
Your org-standards subagent is one reviewer with one context. A **dynamic workflow** is the next size up: Claude acts as a manager — it writes a plan, sends out many copies of itself at once, and combines what they bring back. Three moves, every time:
* **Fan out.** The job splits across agents running in parallel — one per file, one per symptom, one per search angle.
* **Verify.** Findings go to fresh skeptic agents told to refute them. Only what survives gets reported.
* **Synthesize.** One agent merges the survivors into a single answer.

Workflows can spend serious tokens, so Claude only runs one when you ask in your own words — say "use a workflow." Watch it live with \`/workflows\`.

**When to use one — three honest tests.**
* **The job splits:** if you'd assign it to a team of people, it fits a workflow.
* **Being wrong is expensive:** the refute round means findings get attacked before you see them, so fewer false alarms.
* **One pass keeps missing things:** bug hunts and audits where "I looked and it seemed fine" hasn't been true.

When none of the three apply — a normal diff, a single file, a quick question — one agent is the right size. More eyes, use a workflow. More time, use a loop. Neither, just ask.` },
      { name: "Implement", body: `NWP-102 is still open: three merchants, mismatched totals, and support cannot reproduce it. In extra credit one \`bug-investigator\` worked it alone. Send a team:

**Task / Command:**
\`\`\`
Use a workflow to investigate NWP-102 — three merchants say their daily totals do not match their settlement statements. Read docs/tickets/NWP-102.md, then fan out investigators along different angles: one per reported symptom, one on timezone handling, one on how amounts are accumulated, one on what refunds do to totals. Have a second round of agents try to refute each suspected root cause against the actual code. Report only the causes that survive, with file, line, and which of the three symptoms each one explains. Do not change any code.
\`\`\`

Watch the progress with \`/workflows\`. Every angle gets its own investigator, and nothing is reported until a skeptic fails to knock it down — more eyes, fewer false alarms, at a real cost in time and tokens.

**Pro Tip**
Reach for a workflow when coverage matters more than speed: a full audit, a migration touching fifty files, a bug hunt where one pass keeps missing things. For a normal diff, your subagent is the right size.

When you've finished the hands-on steps above, mark this step complete.` },
    ],
  },
  {
    n: 12,
    title: "Extra Credit: The Bug Nobody Reported",
    pts: 20,
    group: "Expert challenge",
    desc: "Something is off in prod, but no one has mentioned it. Let's figure out what's going on.",
    tabs: [
      { name: "Learn", body: `**How to investigate a bug you cannot see**

* **Bugs like this one hide because nothing throws.** A sort that compares amounts as text still returns rows, still renders, still looks like a working table. There is no stack trace and no error in the console — only a result that is quietly wrong. That is why it survived: the only way to catch it was to read the output and check it against what it should have been.
* **Reproduce before you prompt.** Hit the endpoint, read the actual response, and write down what you expected versus what you got. Two minutes here is worth more than any amount of prompting, because it converts a vague feeling into evidence Claude can act on.
* **Describe the symptom, not the fix.** "Sorting by amount descending ranks small amounts above large ones" gives Claude something to trace. "Change the comparator to subtract the numbers" gives it an instruction, and if your guess is wrong you have just talked it out of finding the real cause. Let it read \`src/data/queries.ts\` and tell you what it found.
* **Then ask the second question: where else?** Most defects of this shape are a habit, not an accident. The same mistake usually appears more than once — a second comparator, a second bucketing call, a second place that adds instead of subtracts. Asking "does anything else in the codebase do the same thing" is how one fix becomes three.
* **Prove it with a test that would have failed.** A fix with no test is a claim. A test that fails on the old comparator and passes on the new one is evidence, and it is what stops the same bug from coming back in six months when someone refactors the **query builder** (Glossary: The one shared piece of code that turns filters into a data lookup, so nobody writes a second version.).

**Button:** Continue to Implementation` },
      { name: "Implement", body: `Your **ticket** (Glossary: One unit of work from the team's board — a bug to fix or a feature to build.) is done. You have a few minutes before the end of the day.

Dana mentioned something in passing that never became a ticket: **to find the largest payments, she has to eyeball the table.** No sort by amount. She has worked around it for months.

Nothing on the board says to fix this. That is what makes it worth doing.

**1. Give ops what they asked for**
The payments API already supports sorting; the table just never exposed it. Try it directly:
\`curl "http://localhost:3000/api/payments?sort=amount&direction=desc" | head -40\`

Look at the first few amounts that come back. They are supposed to be the largest payments in the system. Read them carefully before continuing — the bug is right there, and it is the kind that looks fine until you actually check.

**2. Find out why, fix it, prove it**
Do not prescribe the fix. Describe what you saw and let Claude trace it, then fix it with a test that would have caught it:
\`Sorting payments by amount descending returns the wrong rows: small amounts are ranking above large ones.

First, find the root cause. Tell me the file and line, why it produces this result, and whether anything else in the codebase does the same thing.

Then fix the root cause, add a unit test that fails on the old comparator and passes on the new one, and show me the top five payments by amount so I can check them myself.\`

You are looking for a comparison that treats amounts as text, so \`9.00\` outranks \`100.00\`. One line, in **production** (Glossary: The live version of the software that real users touch.) the whole time, caught by no test.

**3. Ship it unasked**
Open a small **pull request** (Glossary: A request to merge your branch into main, where teammates review the changes first. "PR" for short.) of its own with \`/northwind-pr\` — the skill you built. There is no ticket ID for this one, so the description does the work: what you found, how you found it, and why it mattered.

**Pro Tip**
This is the difference between closing tickets and being the person a team trusts. Anyone can work the queue. Finding the defect nobody filed, tracing it to a line, and shipping the fix with a test is how you get handed the interesting work next sprint.

**If you still have time: NWP-102**
One more sits in triage: three merchants say their daily totals do not match their statements. The ticket asks for **a written diagnosis, no fix in the same session**. Use the \`bug-investigator\` subagent — it can read but not edit, so it cannot quietly "fix" what you have not understood.
\`Read docs/tickets/NWP-102.md, then use the bug-investigator subagent on it. For each of the three reported symptoms, tell me the file and line, the root cause, and whether any of them share one. Do not change any code.\`

When you've finished the hands-on steps above, mark this step complete.

**Button:** Mark Complete` },
      { name: "Advanced", body: `* **Most defects are never reported.** Users route around them. Dana did not file a ticket about sorting; she just stopped expecting it to work, which is how a product quietly gets worse without a single bug report to show for it.
* **An agent changes the economics of investigation.** The reason these go unfixed is rarely difficulty — it is that tracing a vague symptom to a line costs more attention than a busy engineer has spare. When that cost drops to a few minutes, the class of bug that was never worth chasing becomes worth chasing.
* **Make the finding reviewable.** A fix shipped with a failing-then-passing test and a description of how it was found is a contribution. The same fix pushed quietly with no explanation is a mystery **diff** (Glossary: The line-by-line view of exactly what changed.) that the next reviewer has to reverse-engineer.` },
    ],
  },
];
