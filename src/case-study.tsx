import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import "./index.css"
import { profile } from "@/data"

const facts = [
  ["Role", "Design & engineering"],
  ["Year", "2026"],
  ["Stack", "FastAPI · MongoDB · Next.js · Ollama"],
  ["Tests", "Pytest suite across auth, runs, scoring, compliance"],
]

const flow = [
  ["Connect", "An LLM API from 8 providers, a custom chatbot, or an AI firewall that returns a verdict."],
  ["Plan", "Pick guardrails and a sample size. A preview shows exactly which prompts will be sent."],
  ["Send", "Attack and safe prompts go out — each up to five times, for confidence ranges."],
  ["Judge", "Refusal phrases or a local model decide blocked vs. answered; unsure replies go to review."],
  ["Report", "Attacks held, over-refusal, F1 and latency, per category and per technique."],
  ["Map", "Results roll up into eight frameworks, snapshotted every time a run finishes."],
]

const decisions = [
  {
    title: "Measure both failure modes",
    body: "A guardrail that blocks everything scores perfectly on attacks and is useless in production. Every run sends safe prompts alongside attack prompts, so the report shows over-refusal next to attacks held — and F1 ties the two together.",
  },
  {
    title: "Treat a single result as a sample, not a fact",
    body: "LLM replies vary between calls. Each prompt can be sent up to five times, results carry 95% confidence ranges, and replies the judge isn’t sure about are queued for a human instead of being silently counted.",
  },
  {
    title: "Secrets never sit in the database in the clear",
    body: "Connector API keys are encrypted before they are stored. Passwords are PBKDF2-SHA256 hashes, sessions use JWTs with peppered refresh tokens, and logins are rate-limited with lockouts.",
  },
  {
    title: "Evidence, not a certificate",
    body: "The compliance view maps each control to the tests behind it across OWASP LLM Top 10, MITRE ATLAS, NIST AI RMF, the EU AI Act and more. It is labelled as test evidence, keeps history, and raises an alert when a control gets worse.",
  },
]

const numbers = [
  ["8", "LLM providers"],
  ["53", "guardrail suites"],
  ["8", "compliance frameworks"],
  ["15", "pentest checks"],
]

const features = [
  ["Pentest", "Fifteen checks against a connector: prompt leakage, personal data, goal hijacking, document injection, weak auth, rate limiting and known CVEs."],
  ["Prompt generator", "Writes attack and safe prompts for any guardrail with a local model, has a second model check each one, and can mutate attacks before storing them."],
  ["Schedules & CI", "Repeat runs on a cron, and gate a pipeline with a CLI that exits non-zero when a threshold is missed."],
  ["Model research", "A catalogue of security-relevant models gathered for red-teaming work."],
]

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{children}</p>
}

function CaseStudy() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }),
      { threshold: 0.12 },
    )
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="grain">
      <header className="sticky top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
        <div className="flex items-center justify-between px-5 py-4 md:px-10">
          <a href="/#p-breachly" className="group inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink">
            <ArrowLeft className="size-4 transition group-hover:-translate-x-1" /> {profile.name}
          </a>
          <a href={"mailto:" + profile.email} className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition hover:text-ink">
            Get in touch
          </a>
        </div>
      </header>

      <main className="px-5 md:px-10">
        <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
          <div aria-hidden className="orb pointer-events-none absolute -right-[15%] -top-[30%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,61,.28),transparent)] blur-2xl" />
          <div className="relative">
            <p className="reveal font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">Case study</span> — AI red teaming
            </p>
            <h1 className="reveal mt-6 text-[clamp(3.4rem,11vw,10rem)] font-medium leading-[0.86] tracking-[-0.055em]">
              Breachly<span className="text-accent">.</span>
            </h1>
            <p className="reveal mt-8 max-w-3xl font-serif text-3xl leading-tight text-ink/90 md:text-5xl">
              Find out what gets past your AI <em>before someone else does.</em>
            </p>
            <dl className="reveal mt-14 grid grid-cols-2 border-t border-line md:grid-cols-4">
              {facts.map(([k, v], i) => (
                <div key={k} className={"py-5 pr-4 " + (i % 2 ? "pl-4 md:pl-5 " : "") + (i ? "md:border-l md:border-line md:pl-5" : "")}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{k}</dt>
                  <dd className="mt-1.5 text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <figure className="reveal overflow-hidden rounded-2xl border border-line bg-[#121214] shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)]">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            {[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-white/10" />)}
            <span className="ml-3 font-mono text-[11px] text-muted">localhost:3000 — Breachly</span>
          </div>
          <img src="/shots/breachly-1.png" alt="Breachly's new test run planner in dark mode: connector, prompts per category, attack-to-safe ratio and guardrail categories selected." className="block w-full" />
        </figure>

        <section className="grid gap-10 py-28 md:grid-cols-12">
          <div className="md:col-span-4"><Label>01 — The problem</Label></div>
          <div className="reveal space-y-6 text-xl leading-relaxed text-ink/85 md:col-span-7">
            <p>
              Teams ship LLM features behind guardrails and firewalls that nobody measures. “We tried a few jailbreaks
              and it refused” isn’t evidence — and a guardrail tuned only against attacks quietly starts refusing
              legitimate users.
            </p>
            <p className="text-muted">
              I wanted a tool that turns red teaming into numbers a team can track: what got through, what was wrongly
              blocked, how sure we are, and which compliance controls that affects.
            </p>
          </div>
        </section>

        <section className="border-t border-line py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4"><Label>02 — How a run works</Label></div>
            <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 md:col-span-8 lg:grid-cols-3">
              {flow.map(([t, d], i) => (
                <li key={t} className="reveal bg-bg p-7" style={{ "--d": i * 70 + "ms" } as React.CSSProperties}>
                  <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-4 text-2xl font-medium tracking-tight">{t}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4"><Label>03 — Decisions that mattered</Label></div>
            <div className="md:col-span-8">
              {decisions.map((d) => (
                <article key={d.title} className="reveal border-b border-line py-8 first:pt-0">
                  <h3 className="font-serif text-3xl leading-tight md:text-4xl">{d.title}</h3>
                  <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">{d.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {numbers.map(([v, l]) => (
            <div key={l} className="bg-bg p-8 md:p-10">
              <p className="font-serif text-6xl italic text-accent md:text-7xl">{v}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{l}</p>
            </div>
          ))}
        </section>

        <section className="py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4"><Label>04 — Around the core</Label></div>
            <div className="grid gap-10 sm:grid-cols-2 md:col-span-8">
              {features.map(([t, d]) => (
                <div key={t} className="reveal border-t border-line pt-6">
                  <p className="text-xl font-medium tracking-tight">{t}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line pb-10 pt-24">
          <p className="font-serif text-[clamp(2.4rem,7vw,6rem)] leading-[0.95] tracking-tight">
            Want the full walkthrough? <em className="text-accent">Let’s talk.</em>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={"mailto:" + profile.email} className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition hover:bg-white">
              {profile.email} <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
            </a>
            <a href="/#work" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm transition hover:border-white/40 hover:bg-white/5">
              More work
            </a>
          </div>
          <footer className="mt-24 flex flex-col justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:flex-row">
            <span>© 2026 {profile.name}</span>
            <a href="/" className="transition hover:text-ink">Back to portfolio ↑</a>
          </footer>
        </section>
      </main>
    </div>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CaseStudy />
  </StrictMode>,
)
