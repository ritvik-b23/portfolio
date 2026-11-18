import * as React from "react"
import { ArrowDownRight, ArrowUpRight, Briefcase, Download, FolderOpen } from "lucide-react"
import { LiquidNavbar, NimbusIcons } from "@/components/ui/liquid-glass-navbar"
import GlassFolder from "@/components/ui/glass-folder-cards"
import { CoverFlow } from "@/components/ui/cover-flow"
import { certifications, education, experience, folders, profile, projects, skills, type Project } from "@/data"

const ico = { size: 18, strokeWidth: 1.8 }
const NAV = [
  { id: "home", label: "Home", icon: NimbusIcons.home, fx: "none" as const },
  { id: "work", label: "Work", icon: <FolderOpen {...ico} />, fx: "none" as const },
  { id: "experience", label: "Experience", icon: <Briefcase {...ico} />, fx: "none" as const },
  { id: "about", label: "About", icon: NimbusIcons.user, fx: "none" as const },
  { id: "contact", label: "Contact", icon: NimbusIcons.plane, fx: "none" as const },
]

/* ---------- hooks ---------- */

function useActiveSection(lockRef: React.RefObject<number>) {
  const [active, setActive] = React.useState(0)
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockRef.current) return // ignore sections passed during a nav click's smooth scroll
        for (const e of entries) if (e.isIntersecting) setActive(NAV.findIndex((n) => n.id === e.target.id))
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [lockRef])
  return [active, setActive] as const
}

function useReveal() {
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }),
      { threshold: 0.12 },
    )
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useDubaiTime() {
  const fmt = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit" }).format(new Date())
  const [t, setT] = React.useState(fmt)
  React.useEffect(() => { const id = setInterval(() => setT(fmt()), 20_000); return () => clearInterval(id) }, [])
  return t
}

function useFolderWidth() {
  // innerWidth can read 0 in a hidden tab at mount, so clamp to a sane minimum
  const get = () => Math.max(280, Math.min(340, window.innerWidth - 40))
  const [w, setW] = React.useState(get)
  React.useEffect(() => { const on = () => setW(get()); window.addEventListener("resize", on); return () => window.removeEventListener("resize", on) }, [])
  return w
}

/* ---------- small pieces ---------- */

function SectionHead({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <div className="reveal mb-14 grid gap-6 border-t border-line pt-6 md:mb-20 md:grid-cols-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted md:col-span-3">
        <span className="text-accent">{index}</span> — {label}
      </p>
      <h2 className="font-serif text-5xl leading-[0.95] tracking-tight md:col-span-9 md:text-7xl lg:text-8xl">{children}</h2>
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">{children}</span>
}

function ProjectHead({ p, n }: { p: Project; n: number }) {
  return (
    <>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{String(n).padStart(2, "0")}</span> · {p.kind} · {p.year}
      </p>
      <h3 className="mt-4 text-4xl font-medium tracking-[-0.035em] md:text-5xl">{p.title}</h3>
      <p className="mt-5 text-lg leading-relaxed text-ink/90">{p.summary}</p>
    </>
  )
}

function ProjectPoints({ p }: { p: Project }) {
  return (
    <>
      <ul className="space-y-2.5">
        {p.points.map((pt) => (
          <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-muted">
            <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
            {pt}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap gap-2">{p.stack.map((s) => <Pill key={s}>{s}</Pill>)}</div>
      <ProjectLinks p={p} />
    </>
  )
}

function StatPanel({ p }: { p: Project }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-[radial-gradient(120%_90%_at_80%_0%,rgba(64,110,255,.22),transparent_60%),radial-gradient(90%_80%_at_0%_100%,rgba(255,106,61,.18),transparent_60%)] p-8 md:max-w-md md:p-10">
      <div aria-hidden className="absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" style={{ backgroundImage: "radial-gradient(var(--color-line) 1px,transparent 1.4px)", backgroundSize: "18px 18px" }} />
      {p.stat && (
        <p className="relative">
          <span className="block font-serif text-6xl italic leading-none text-ink md:text-7xl">{p.stat.value}</span>
          <span className="mt-3 block font-mono text-xs uppercase tracking-[0.2em] text-muted">{p.stat.label}</span>
        </p>
      )}
    </div>
  )
}

function ProjectLinks({ p }: { p: Project }) {
  if (!p.repo && !p.caseStudy) return null
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {p.caseStudy && (
        <a href={p.caseStudy} className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition hover:bg-white">
          Read the case study <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm transition hover:border-white/40 hover:bg-white/5">
          View code <ArrowUpRight className="size-4" />
        </a>
      )}
    </div>
  )
}

/* ---------- sections ---------- */

function Hero() {
  const time = useDubaiTime()
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-10 pt-32 md:px-10 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb absolute -right-[10%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,61,.38),transparent)] blur-2xl" />
        <div className="orb orb-2 absolute -left-[20%] top-[10%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(64,110,255,.26),transparent)] blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{ backgroundImage: "linear-gradient(var(--color-line) 1px,transparent 1px),linear-gradient(90deg,var(--color-line) 1px,transparent 1px)", backgroundSize: "88px 88px" }}
        />
      </div>

      <div className="relative flex flex-wrap justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>Portfolio · 2026</span>
        <span className="hidden sm:inline">25.20° N, 55.27° E</span>
        <span>Dubai — {time} GST</span>
      </div>

      <div className="relative mt-auto">
        <h1 className="reveal text-[clamp(3.6rem,14vw,14rem)] font-medium leading-[0.84] tracking-[-0.055em]">
          Ritvik
          <br />
          <span className="font-serif font-normal italic tracking-[-0.03em] text-ink/90">Bhatnagar</span>
          <span className="text-accent">.</span>
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <p className="reveal text-xl leading-snug text-ink/85 md:col-span-6 md:text-2xl" style={{ "--d": "120ms" } as React.CSSProperties}>
            AI security engineer. I break AI systems on purpose —{" "}
            <span className="font-serif italic text-ink">adversarial testing, LLM red teaming</span> and ML-driven threat
            detection — so they hold up when it matters.
          </p>
          <div className="reveal flex flex-col gap-5 md:col-span-5 md:col-start-8 md:items-end" style={{ "--d": "220ms" } as React.CSSProperties}>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative size-2 rounded-full bg-emerald-400" />
              </span>
              Open to AI security roles
            </span>
            <div className="flex flex-wrap gap-3">
              <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition hover:bg-white">
                See the work <ArrowDownRight className="size-4 transition group-hover:rotate-45" />
              </a>
              <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium transition hover:border-white/40 hover:bg-white/5">
                <Download className="size-4" /> Download CV
              </a>
            </div>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {[
            ["Currently", "LockThreat"],
            ["Studying", "BITS Pilani Dubai, ’26"],
            ["Published", "IEEE GLOBECOM 2026"],
          ].map(([k, v], i) => (
            <div key={k} className={"py-5 sm:px-5 " + (i ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0")}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{k}</dt>
              <dd className="mt-1.5 text-[15px]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Work() {
  const width = useFolderWidth()
  const byId = Object.fromEntries(projects.map((p) => [p.id, p]))
  return (
    <section id="work" className="px-5 py-28 md:px-10 md:py-40">
      <SectionHead index="01" label="Selected work">
        Things I’ve <em>built</em>, <em>broken</em> &amp; published.
      </SectionHead>

      <p className="reveal mb-16 max-w-xl text-muted">
        Nine projects across three drawers. Hover a folder to peek, click to fan it open, then pick a file — or skip
        straight to the index below.
      </p>

      <div className="grid grid-cols-1 justify-items-center gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        {folders.map((f, i) => (
          <GlassFolder
            key={f.label}
            label={f.label}
            meta={f.ids.length + " projects"}
            art={f.art}
            tone={f.tone}
            seed={i * 7 + 3}
            action="none"
            width={width}
            appearDelay={i * 140}
            files={f.ids.map((id, j) => ({
              name: byId[id].title,
              meta: byId[id].year,
              href: "#p-" + id,
              art: j === 0 ? (["dusk", "glacier", "aurora"] as const)[i] : undefined,
            }))}
          />
        ))}
      </div>

      <ol className="mt-28">
        {projects.filter((p) => p.featured).map((p, i) => (
          <li key={p.id} id={"p-" + p.id} className="reveal scroll-mt-28 border-t border-line">
            <article className="grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-14">
              <div className="lg:col-span-5">
                <ProjectHead p={p} n={i + 1} />
                <div className="mt-6"><ProjectPoints p={p} /></div>
              </div>
              <div className="min-w-0 lg:col-span-7">
                {p.shots?.length ? (
                  <CoverFlow
                    items={p.shots.map((s) => ({ title: s.label, src: s.src, alt: `${p.title}: ${s.label}` }))}
                    defaultIndex={0}
                    autoplay
                    interval={4}
                    aspect={1.6}
                    showCaptions={false}
                    bare
                    stageColor="#0a0a0b"
                    pageColor="transparent"
                    accent="#ff6a3d"
                    ariaLabel={p.title + " screenshots"}
                    style={{ aspectRatio: "2.2 / 1", minHeight: 240 }}
                  />
                ) : (
                  <StatPanel p={p} />
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>

      <div className="reveal mt-20">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Other work</p>
        <ul className="border-b border-line">
          {projects.filter((p) => !p.featured).map((p) => (
            <li key={p.id} id={"p-" + p.id} className="group scroll-mt-28 border-t border-line">
              <div className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                <h3 className="text-xl font-medium tracking-tight md:col-span-3">{p.title}</h3>
                <p className="text-[15px] text-muted md:col-span-6">{p.summary}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:col-span-2">{p.kind}</p>
                <p className="font-mono text-xs text-muted md:col-span-1 md:text-right">
                  {p.repo ? <a href={p.repo} target="_blank" rel="noreferrer" className="text-ink hover:text-accent">Code ↗</a> : p.year}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="px-5 py-28 md:px-10 md:py-40">
      <SectionHead index="02" label="Experience">
        Where the <em>work</em> happens.
      </SectionHead>

      <div className="reveal mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
        {[
          ["50,000+", "adversarial test cases"],
          ["16", "security categories"],
          ["99.3%", "IDS detection accuracy"],
          ["8.49", "CGPA at BITS Pilani"],
        ].map(([v, l]) => (
          <div key={l} className="bg-bg p-6 md:p-8">
            <p className="text-4xl font-medium tracking-[-0.04em] md:text-5xl">{v}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{l}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {experience.map((x) => (
          <article key={x.role} className="reveal grid gap-6 border-t border-line py-10 md:grid-cols-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted md:col-span-3">{x.period}</p>
            <div className="md:col-span-4">
              <h3 className="text-3xl font-medium tracking-[-0.03em]">{x.role}</h3>
              <p className="mt-2 font-serif text-xl italic text-ink/80">{x.org}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{x.focus}</p>
            </div>
            <ul className="space-y-3 md:col-span-5">
              {x.points.map((pt) => (
                <li key={pt} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-3 h-px w-3 shrink-0 bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="px-5 py-28 md:px-10 md:py-40">
      <SectionHead index="03" label="About">
        Security engineer by training, <em>builder</em> by habit.
      </SectionHead>

      <div className="grid gap-16 md:grid-cols-12">
        <div className="reveal space-y-6 text-lg leading-relaxed text-ink/85 md:col-span-5">
          <p>
            I’m a Computer Science graduate from BITS Pilani Dubai, working where machine learning meets offensive
            security. Day to day that means attacking models, measuring how detection fails, and turning the results
            into tooling a team can rerun.
          </p>
          <p className="text-muted">
            Outside work I build the tools I wish existed — a canvas for running AI agents side by side, a red-teaming
            platform, a market research engine — and publish when the research holds up.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 md:col-span-7">
          {skills.map((s, i) => (
            <div key={s.group} className="reveal bg-bg p-7" style={{ "--d": i * 80 + "ms" } as React.CSSProperties}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{s.group}</p>
              <ul className="mt-5 space-y-2">
                {s.items.map((it) => <li key={it} className="text-[15px] text-ink/85">{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Education</p>
          {education.map((e) => (
            <div key={e.title} className="reveal border-t border-line py-6">
              <p className="font-mono text-xs text-muted">{e.period}</p>
              <p className="mt-2 text-xl font-medium tracking-tight">{e.title}</p>
              <p className="mt-1 text-muted">{e.org} · <span className="text-ink/80">{e.note}</span></p>
            </div>
          ))}
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Certifications</p>
          <ul>
            {certifications.map((c) => {
              const [by, what] = c.split(" — ")
              return (
                <li key={c} className="reveal flex items-baseline justify-between gap-6 border-t border-line py-4">
                  <span className="text-[15px]">{what}</span>
                  <span className="shrink-0 font-mono text-xs text-muted">{by}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const links = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
    { label: "Résumé (PDF)", href: profile.cv },
  ].filter((l) => l.href)
  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pt-40">
      <div aria-hidden className="orb pointer-events-none absolute -bottom-[30%] left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,106,61,.22),transparent)] blur-2xl" />
      <div className="relative">
        <p className="reveal font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">04</span> — Contact
        </p>
        <h2 className="reveal mt-8 font-serif text-[clamp(3rem,10vw,9.5rem)] leading-[0.9] tracking-tight">
          Let’s make something <em className="text-accent">hold.</em>
        </h2>
        <a
          href={"mailto:" + profile.email}
          className="reveal group mt-14 inline-flex items-center gap-4 text-2xl font-medium tracking-tight md:text-4xl"
        >
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 group-hover:bg-[length:100%_1px]">
            {profile.email}
          </span>
          <ArrowUpRight className="size-7 text-accent transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
        <div className="reveal mt-10 flex flex-wrap gap-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm transition hover:border-white/40 hover:bg-white/5">
              {l.label} <ArrowUpRight className="size-4" />
            </a>
          ))}
        </div>

        <footer className="mt-32 flex flex-col justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:flex-row">
          <span>© 2026 {profile.name}</span>
          <span>Designed &amp; built in Dubai</span>
          <a href="#home" className="transition hover:text-ink">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}

export default function App() {
  const lock = React.useRef(0)
  const [active, setActive] = useActiveSection(lock)
  useReveal()
  return (
    <div className="grain">
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
        Skip to work
      </a>
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <LiquidNavbar
          className="pointer-events-auto"
          tone="dark"
          water={false}
          active={active}
          onChange={(i) => { lock.current = Date.now() + 1000; setActive(i) }}
          items={NAV.map(({ id, ...n }) => ({ ...n, href: "#" + id }))}
        />
      </header>
      <main>
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
    </div>
  )
}
