import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { WORKSHOP } from "./workshopContent.js";

const TABS = ["Workshop", "My Build", "Progress", "FAQ", "Q&A", "Build Battle", "Resources", "Feedback", "Admin"];
const GROUPS = ["Core steps", "Bonus steps", "Expert challenge"];

const mdComponents = {
  h1: ({ children }) => <h1 className="mb-2 font-serif text-xl">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-1.5 mt-4 font-serif text-lg">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-1 mt-3 text-sm font-bold uppercase tracking-widest text-[#c15f3c]">{children}</h3>,
  h4: ({ children }) => <h4 className="mb-1 mt-3 text-sm font-bold">{children}</h4>,
  p: ({ children }) => <p className="my-1.5 text-sm leading-relaxed text-stone-700">{children}</p>,
  ul: ({ children }) => <ul className="my-1.5 list-disc space-y-1 pl-5 text-sm text-stone-700">{children}</ul>,
  ol: ({ children }) => <ol className="my-1.5 list-decimal space-y-1 pl-5 text-sm text-stone-700">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-stone-900">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-4 border-[#c15f3c]/40 bg-stone-900/[0.03] px-3 py-2 text-sm text-stone-700">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-stone-900/[0.07] px-1.5 py-0.5 font-mono text-[13px] text-stone-900">
      {children}
    </code>
  ),
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  a: ({ href, children }) => (
    <a href={href} className="text-[#c15f3c] underline underline-offset-2 hover:text-[#a94e2f]">
      {children}
    </a>
  ),
  hr: () => <hr className="my-3 border-stone-900/10" />,
};

function CodeBlock({ children }) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-2 w-full max-w-full min-w-0">
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 z-10 rounded-lg bg-white/10 px-2.5 py-1 font-mono text-xs font-semibold text-white backdrop-blur hover:bg-white/20"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        ref={ref}
        className="w-full max-w-full overflow-x-auto rounded-lg bg-stone-900 p-3 pr-20 font-mono text-[13px] leading-relaxed text-white [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-white"
      >
        {children}
      </pre>
    </div>
  );
}

function StepBody({ text }) {
  return (
    <div className="mt-3 max-h-[60vh] w-full max-w-full min-w-0 overflow-auto rounded-xl bg-[#faf7f1] p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default function WorkshopReplica() {
  const [activeStep, setActiveStep] = useState(1);
  const [tabSel, setTabSel] = useState({});

  return (
    <div className="min-h-screen bg-[#f4efe7] text-stone-900 antialiased">
      <header className="border-b border-stone-900/10 bg-[#f4efe7]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <a
            href="https://www.anthropic-training.com/workshops/claude-code/virtual"
            className="text-sm font-medium text-stone-500 underline-offset-4 hover:underline"
          >
            All sessions
          </a>
          <nav aria-label="Workshop sections" className="flex flex-1 flex-wrap items-center gap-1">
            {TABS.map((tab, i) => (
              <span
                key={tab}
                className={`rounded-full px-3 py-1 text-sm ${
                  i === 0 ? "bg-stone-900 font-semibold text-white" : "text-stone-600"
                }`}
              >
                {tab}
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-900 font-bold text-white">
              E
            </span>
            <span className="font-medium">emilio</span>
            <span className="rounded-full border border-stone-900/15 px-2.5 py-1 font-mono text-xs">
              0 / 235 pts
            </span>
            <button type="button" className="font-medium text-stone-600 hover:text-stone-900">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c15f3c]">
            Claude Code &middot; Virtual — Presented by Anthropic and Tenex
          </p>
          <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">
            Virtual, let&apos;s build with Claude Code.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-stone-600">
            Claude Code for Developers. A real codebase, a real ticket, and everything you build
            along the way.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="font-serif text-xl">0 of 11 core steps</p>
            <p className="font-mono text-sm text-stone-500">0 / 235 pts</p>
          </div>
          <div className="mt-2 h-2 max-w-md overflow-hidden rounded-full bg-stone-900/10">
            <div className="h-full w-0 bg-[#c15f3c]" />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0 space-y-4">
            {GROUPS.map((g) => (
              <div key={g} className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-stone-500">{g}</h2>
                {WORKSHOP.filter((s) => s.group === g).map((s) => (
                  <article
                    key={s.n}
                    className={`min-w-0 rounded-2xl border bg-white p-5 shadow-sm ${
                      activeStep === s.n ? "border-stone-900" : "border-stone-900/10"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep === s.n ? 0 : s.n)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <span>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                          Step {s.n}
                        </span>
                        <span className="block font-serif text-xl">{s.title}</span>
                        <span className="mt-1 block text-sm text-stone-600">{s.desc}</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-stone-900/5 px-2.5 py-1 font-mono text-xs">
                        {s.pts} pts
                      </span>
                    </button>
                    {activeStep === s.n && (
                      <div className="mt-3 border-t border-stone-900/10 pt-3">
                        <div className="flex flex-wrap gap-2">
                          {s.tabs.map((t) => (
                            <button
                              key={t.name}
                              type="button"
                              onClick={() => setTabSel({ ...tabSel, [s.n]: t.name })}
                              className={`rounded-full px-3 py-1 text-sm ${
                                (tabSel[s.n] || s.tabs[0].name) === t.name
                                  ? "bg-stone-900 font-semibold text-white"
                                  : "bg-stone-900/5 text-stone-600"
                              }`}
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                        <StepBody
                          text={
                            (s.tabs.find((t) => t.name === (tabSel[s.n] || s.tabs[0].name)) ||
                              s.tabs[0]).body
                          }
                        />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-900/10 bg-white p-5 shadow-sm">
              <h2 className="font-serif text-xl">Your Build Plan</h2>
              <p className="mt-1 text-sm text-stone-600">Your personalized build plan is here whenever you need it. Not ready yet — finish the quick setup questions after login.</p>
            </div>
            <div className="rounded-2xl border border-stone-900/10 bg-white p-5 shadow-sm">
              <h2 className="font-serif text-xl">Progress</h2>
              <p className="mt-1 text-sm text-stone-600">Live leaderboard: Rank, Name, Steps, Points.</p>
            </div>
            <div className="rounded-2xl border border-stone-900/10 bg-white p-5 shadow-sm">
              <h2 className="font-serif text-xl">FAQ</h2>
              <p className="mt-1 text-sm text-stone-600">Search the knowledge base or ask the assistant below. List currently empty.</p>
              <input type="search" placeholder="Search FAQs..." className="mt-3 w-full rounded-xl border border-stone-900/15 bg-[#faf7f1] px-3 py-2 outline-none" />
            </div>
            <div className="rounded-2xl border border-stone-900/10 bg-white p-5 shadow-sm">
              <h2 className="font-serif text-xl">Q&amp;A</h2>
              <p className="mt-1 text-sm text-stone-600">Available when you sign in via the cohort dashboard.</p>
            </div>
            <div className="rounded-2xl border border-stone-900/10 bg-white p-5 shadow-sm">
              <h2 className="font-serif text-xl">Build Battle</h2>
              <p className="mt-1 text-sm text-stone-600">Cards does not exist yet — building it is the end-of-day battle. Board currently empty.</p>
            </div>
            <div className="rounded-2xl border border-stone-900/10 bg-white p-5 shadow-sm">
              <h2 className="font-serif text-xl">Resources</h2>
              <p className="mt-1 text-sm text-stone-600">Download the files you need for this workshop. Coming soon for this cohort.</p>
              <p className="mt-3 text-sm"><span className="rounded-full bg-stone-900/5 px-3 py-1 font-medium">All</span> <span className="rounded-full bg-stone-900/5 px-3 py-1 font-medium">Plugins</span></p>
            </div>
            <div className="rounded-2xl border border-stone-900/10 bg-white p-5 shadow-sm">
              <h2 className="font-serif text-xl">Feedback</h2>
              <p className="mt-1 text-sm text-stone-600">Google Form “Claude Code Workshop Seattle - Feedback”: recommendation likelihood, most useful parts, improvements, business use-case interest.</p>
            </div>
            <div className="rounded-2xl border border-stone-900/10 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500">Help</h3>
              <p className="mt-2 text-sm text-stone-600">Claude Code tips and troubleshooting. For logistics or accounts, ask your facilitator.</p>
              <p className="mt-2 text-sm text-stone-600">Hey! I&apos;m your workshop assistant. Ask me anything about the steps, Cowork, plugins, or connectors.</p>
            </div>
            <div className="rounded-2xl border border-stone-900/10 bg-white p-5 shadow-sm">
              <h2 className="font-serif text-xl">Workshop Admin</h2>
              <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-stone-500">Participants</h3>
              <h3 className="mt-4 font-mono text-sm font-bold uppercase tracking-widest text-stone-500">CLAUDE.md</h3>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
