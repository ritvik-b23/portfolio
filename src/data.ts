// All portfolio content lives here. Edit this file, not the components.

export const profile = {
  name: "Ritvik Bhatnagar",
  role: "AI Security Engineer",
  location: "Dubai, UAE",
  email: "ritvikbhatnagar6@gmail.com",
  // Fill these in — links with an empty URL are hidden.
  linkedin: "https://www.linkedin.com/in/ritvik-bhatnagar",
  github: "",
  cv: "/Ritvik-Bhatnagar-CV.pdf",
}

export type Project = {
  id: string
  title: string
  kind: string
  year: string
  summary: string
  points: string[]
  stack: string[]
  stat?: { value: string; label: string }
  /** shown large in the index; everything else goes to "Other work" */
  featured?: boolean
  /** screenshots in /public/shots, shown in a cover flow */
  shots?: { src: string; label: string }[]
  repo?: string
  caseStudy?: string
}

export const projects: Project[] = [
  {
    id: "breachly",
    featured: true,
    shots: [{ src: "/shots/breachly-1.png", label: "Test planner" }, { src: "/shots/breachly-2.png", label: "Pentest" }, { src: "/shots/breachly-3.png", label: "Landing" }],
    caseStudy: "/breachly.html",
    title: "Breachly",
    kind: "AI Red Teaming Platform",
    year: "2026",
    summary:
      "Connect any AI endpoint, fire attack and safe prompts at it, and see exactly where it held and where it broke.",
    points: [
      "Connectors for 8 LLM providers, custom chatbots and AI firewalls — keys encrypted before they touch the database.",
      "Guardrail suites: 16 core categories, 7 agentic-AI risks and 30 industry policies across 10 sectors.",
      "Compliance view against OWASP LLM Top 10, MITRE ATLAS, NIST AI RMF and the EU AI Act, plus a 15-check pentest.",
    ],
    stack: ["Python", "FastAPI", "MongoDB", "Next.js", "Ollama", "JWT / PBKDF2"],
    stat: { value: "53", label: "guardrail suites" },
  },
  {
    id: "qml-ids",
    featured: true,
    title: "Quantum ML Intrusion Detection",
    kind: "Research · IoT Security",
    year: "2025",
    summary:
      "Anomaly-based intrusion and malware detection for IoT traffic, using a hybrid quantum–classical ensemble.",
    points: [
      "QSVM + QNN + Random Forest ensemble reaching 99.3% detection accuracy.",
      "Evaluated on TON_IoT and CICIDS2017, with runs on real quantum hardware.",
      "Feature selection, attack classification and publication-ready metric tables.",
    ],
    stack: ["PennyLane", "PyTorch", "Scikit-learn", "Databricks"],
    stat: { value: "99.3%", label: "detection accuracy" },
  },
  {
    id: "erc1155",
    featured: true,
    shots: [{ src: "/shots/erc1155-1.png", label: "Overview" }, { src: "/shots/erc1155-2.png", label: "Permissions" }, { src: "/shots/erc1155-3.png", label: "Audit log" }],
    title: "Cross-Platform Asset Interoperability",
    kind: "Research · Blockchain",
    year: "2025",
    summary:
      "An ERC-1155 framework for secure, verifiable asset transfer between platforms — proven on a healthcare records system.",
    points: [
      "Patient and provider portals minting and sharing medical records as on-chain assets.",
      "Paper accepted for presentation at IEEE GLOBECOM 2026.",
      "Since grown into a permission ledger API: data released only under a valid, purpose-bound consent, with a signed, hash-chained audit log and per-agent access control for AI.",
    ],
    stack: ["Solidity", "Hardhat", "TypeScript", "PostgreSQL", "ethers.js"],
    stat: { value: "IEEE", label: "GLOBECOM 2026" },
  },
  {
    id: "canvascode",
    featured: true,
    shots: [{ src: "/shots/canvascode-1.png", label: "Canvas" }, { src: "/shots/canvascode-2.png", label: "New worktree" }, { src: "/shots/canvascode-3.png", label: "Worktrees" }],
    title: "CanvasCode",
    kind: "Desktop App",
    year: "2026",
    summary:
      "A Figma-style infinite canvas where every frame is a live terminal running an AI coding agent in its own git worktree.",
    points: [
      "Real PTY terminals on a pan/zoom canvas, with named layouts persisted in SQLite.",
      "Per-frame worktrees with branch, dirty and ahead/behind indicators.",
    ],
    stack: ["Tauri 2", "Rust", "React", "TypeScript", "xterm.js", "Supabase"],
  },
  {
    id: "index-trader",
    featured: true,
    shots: [{ src: "/shots/index-trader-1.png", label: "Overview" }, { src: "/shots/index-trader-2.png", label: "SPY" }, { src: "/shots/index-trader-3.png", label: "Signals" }],
    title: "Index Trader",
    kind: "Market Intelligence",
    year: "2026",
    summary:
      "Evidence-based decision support for index ETFs and metals — regimes, risk, factors and backtests, with live trading deliberately disabled.",
    points: [
      "Analytics engine for regime detection, order-flow proxies, sentiment and scenario analysis.",
      "47+ deterministic tests, CI, and a one-command Docker stack.",
    ],
    stack: ["FastAPI", "Next.js", "Postgres / Timescale", "Docker", "Playwright"],
  },
  {
    id: "founder-crm",
    featured: true,
    shots: [{ src: "/shots/founder-crm-1.png", label: "Overview" }, { src: "/shots/founder-crm-2.png", label: "Outreach" }, { src: "/shots/founder-crm-3.png", label: "Opportunities" }],
    title: "Founder Discovery CRM",
    kind: "Product Research Tool",
    year: "2026",
    summary:
      "A local-first, human-in-the-loop CRM for finding a problem real companies will pay to have solved.",
    points: [
      "Extracts problems from conversations and checks every quote appears verbatim.",
      "Transparent 10-factor opportunity scoring; a test fails the build if LinkedIn automation creeps in.",
    ],
    stack: ["Next.js", "Prisma", "SQLite", "Claude API"],
  },
  {
    id: "anomaly",
    title: "Network Anomaly Detection",
    kind: "Machine Learning",
    year: "2024",
    summary: "Unsupervised detection of anomalous network traffic, served behind a Flask API.",
    points: ["Isolation Forest tuned with Optuna and validated with k-fold cross-validation."],
    stack: ["Scikit-learn", "Optuna", "Flask"],
  },
  {
    id: "fake-news",
    title: "Fake News Detection",
    kind: "Machine Learning",
    year: "2024",
    summary: "An ensemble classifier for misinformation, trained on the WELFake corpus.",
    points: ["LightGBM, logistic regression, random forest and naive Bayes, combined into one ensemble."],
    stack: ["PyTorch", "Transformers", "NLTK", "LightGBM"],
  },
  {
    id: "security-graph",
    title: "AI Security Graph",
    kind: "Concept · In design",
    year: "Next",
    summary:
      "Map a codebase as a graph and show the exact path from user input to the vulnerable line — not just that a bug exists.",
    points: ["Routes, services, middleware, auth and data stores as one navigable exploit map."],
    stack: ["Static analysis", "LLMs", "Graph UI"],
  },
]

export const folders = [
  { label: "Security", art: "ember" as const, tone: "dark" as const, ids: ["breachly", "security-graph", "anomaly"] },
  { label: "Research", art: "aurora" as const, tone: "light" as const, ids: ["qml-ids", "erc1155", "fake-news"] },
  { label: "Products", art: "verdant" as const, tone: "dark" as const, ids: ["canvascode", "index-trader", "founder-crm"] },
]

export const experience = [
  {
    period: "Jan 2026 — Now",
    role: "Junior AI Generalist",
    org: "LockThreat",
    focus: "AI Security & Security Testing",
    points: [
      "Engineered an adversarial security-testing pipeline evaluating 50,000+ benign and adversarial cases across 16 categories — generation, execution, classification and reporting, fully automated.",
      "Built an AI model discovery module aggregating security-relevant models from Hugging Face, GitHub and OpenRouter for LLM red teaming.",
      "Ran adversarial testing, control validation and regression analysis on evasion, latency, false positives and detection failures.",
      "Owned end-to-end QA of the LockThreat security console across frontend and backend.",
    ],
  },
  {
    period: "Jun — Aug 2024",
    role: "Software Developer Intern",
    org: "Codelattice Digital Solutions",
    focus: "Full-stack",
    points: [
      "Developed and debugged a full-stack Flask application with REST APIs and AI integration, from API design to deployment.",
    ],
  },
]

export const skills = [
  {
    group: "Security",
    items: ["Adversarial testing", "LLM red teaming", "Vulnerability assessment", "Intrusion detection", "Malware detection", "Detection engineering"],
  },
  {
    group: "AI / ML",
    items: ["PyTorch", "Scikit-learn", "Hugging Face", "LangChain", "FAISS · RAG", "Model evaluation"],
  },
  {
    group: "Backend",
    items: ["Python", "FastAPI", "REST APIs", "SQL", "MongoDB", "Concurrent processing"],
  },
  {
    group: "Systems",
    items: ["Linux", "Docker", "TCP/IP · DNS", "Network security", "AWS", "Git"],
  },
]

export const education = [
  { period: "2022 — 2026", title: "B.E. Computer Science", org: "BITS Pilani, Dubai", note: "CGPA 8.49 / 10" },
  { period: "2022", title: "Higher Secondary", org: "GEMS New Millennium School", note: "88%" },
]

export const certifications = [
  "IBM — Cybersecurity Fundamentals",
  "Mastercard — Cybersecurity Job Simulation",
  "J.P. Morgan — AWS Solutions Architecture",
  "Google Cloud — Introduction to Generative AI",
  "Autodesk — UAE AI Camp",
]
