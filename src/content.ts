// ============================================================
//  All site copy lives here so it's easy to edit in one place.
//  Content mirrors the print portfolio (Apple Developer Academy 2026).
// ============================================================

export const site = {
  name: "Akbar Jaya Pratama Putra",
  nameLead: "Akbar Jaya Pratama", // serif, regular
  nameAccent: "Putra", // serif italic, terracotta
  role: "Full-Stack Developer · Aspiring iOS",
  eyebrow: "Portfolio · Apple Developer Academy 2026",
  tagline:
    "A selection of work spanning AI-powered tools, full-stack development, game design, and data-driven systems — built to solve real problems.",
  meta: [
    { label: "Discipline", value: "Full-Stack Dev · Aspiring iOS" },
    { label: "Education", value: "B.Sc Informatics, AMIKOM ’24" },
    { label: "Based in", value: "Yogyakarta, Indonesia" },
  ],
};

// The 4 identity beats synced to the pinned 3D scroll-stage (progress 0→1).
export const steps = [
  {
    no: "01",
    title: "Full-Stack Foundation",
    body: "I build across the stack — database, server logic, and interface — and take a system from idea to a working product.",
  },
  {
    no: "02",
    title: "AI into real products",
    body: "Lately I wire AI into things people actually use: transcription, LLM judgement calls, and automated media pipelines.",
  },
  {
    no: "03",
    title: "Systems, Risk & Probability",
    body: "Years of trading taught me to act on incomplete information, manage downside, and let data — not emotion — decide.",
  },
  {
    no: "04",
    title: "Built to ship",
    body: "Honest progress states, graceful fallback, edge cases handled. The closest I’ve come to shipping real products.",
  },
];

export const about = {
  statementLead: "I build things on the web, and I think in",
  statementAccent: "systems, risk, and probability.",
  paragraphs: [
    "I’m a 2024 Informatics graduate from AMIKOM University of Yogyakarta. My core craft is full-stack web development — and lately, wiring AI into real products — but what shapes how I work is years spent actively trading forex, where every decision is a bet weighed against risk.",
    "That combination is unusual. From development I bring structure, logic, and the patience to debug a problem until it yields. From trading I bring something most developers never train: the discipline to act on incomplete information, manage downside, and let data — not emotion — drive the next move.",
    "I’m applying to the Apple Developer Academy because I want to point both of those instincts at something new: building iOS products that are technically sound and genuinely useful. The five projects that follow show where I’ve been — and how I think.",
  ],
  note: "All projects are individual / self-initiated unless stated otherwise. Where a project was part of a bootcamp or coursework, I’ve noted it and described my specific role.",
};

export const skills = {
  strengths: ["Problem Solving", "Analytical Thinking", "Collaboration"],
  tech: [
    "PHP / Laravel", "Node.js", "React", "FastAPI", "AI · LLM",
    "JavaScript", "Go", "Python", "MySQL", "Figma", "Git",
  ],
};

export type ProjectImage = { src: string | null; caption: string };
export type Project = {
  id: string;
  no: string;
  kind: "featured" | "earlier";
  cap: string; // section eyebrow
  title: string;
  titleAccent?: string;
  tagline: string;
  meta: { label: string; value: string }[];
  body: string;
  images?: ProjectImage[];
  built?: string[]; // "what I built" bullets
  impact?: string[];
  builtWith?: string[];
  builtWithLabel?: string;
  repo?: string;
  stats?: { num: string; label: string }[];
  pipeline?: { no: string; k: string; v: string }[];
  pipelineCaption?: string;
};

export const projects: Project[] = [
  {
    id: "clipstudio",
    no: "01",
    kind: "featured",
    cap: "AI Video Automation",
    title: "ClipStudio",
    tagline:
      "Long videos in, AI-cut vertical shorts out — transcribe, score, crop, caption, render.",
    meta: [
      { label: "Type", value: "Self-initiated" },
      { label: "Timeline", value: "May – Jun 2026" },
      { label: "Role", value: "Solo — Full Stack" },
    ],
    body: "A self-hosted web app that turns a long video — a podcast, a talk, a stream — into ready-to-post vertical shorts, automatically. Drop in a file or a YouTube link and ClipStudio transcribes it, uses an LLM to find the genuinely viral moments, crops them to 9:16 around the speaker’s face, then lets me polish each clip in a live in-browser editor before rendering finished 1080×1920 MP4s. The goal: compress the hours of manual editing behind every short into one automated pipeline.",
    images: [
      { src: "/assets/clipstudio-landing.png", caption: "Landing — turn long videos into 9:16 shorts" },
      { src: "/assets/clipstudio-pipeline.png", caption: "Live pipeline — transcribe, detect, score, cut" },
      { src: "/assets/clipstudio-results.png", caption: "Results — clips ranked by AI viral score" },
      { src: "/assets/clipstudio-editor.png", caption: "In-browser editor — subtitles, hooks, music" },
    ],
    pipeline: [
      { no: "01", k: "Ingest", v: "Upload / YouTube" },
      { no: "02", k: "Transcribe", v: "Whisper" },
      { no: "03", k: "Score moments", v: "Groq LLM" },
      { no: "04", k: "Reframe", v: "Face-track 9:16" },
      { no: "05", k: "Edit", v: "Remotion" },
      { no: "06", k: "Export", v: "WebCodecs MP4" },
    ],
    pipelineCaption:
      "End-to-end pipeline — the preview is the render: the editor and final export run the same Remotion composition.",
    built: [
      "Ingest from file upload or YouTube URL — yt-dlp + Deno solve YouTube’s JS challenges to unlock 1080p.",
      "Whisper transcribes, then Groq (Llama 3.3 70B) reads the timestamped transcript and picks 2–6 self-contained viral moments — no blind fixed-length cuts.",
      "Face-tracking 9:16 crop with MediaPipe (YOLOv8 fallback) and scene-cut awareness keeps the subject centred.",
      "Live in-browser editor: word-level animated subtitles, AI hook overlays, auto zoom / colour-grade, trim and music.",
      "Browser-side encoding via Remotion + WebCodecs — render one clip or batch “Render All”, no separate render service.",
    ],
    impact: [
      "This was my first time orchestrating several AI services into one end-to-end product — speech-to-text, an LLM making editorial judgement calls, and automated video processing — behind long-running jobs with honest progress states and graceful CPU/GPU fallback.",
      "The hardest part wasn’t any single model; it was turning a fuzzy goal — “find the good parts” — into objective rules a machine can score, and handling the messy reality of real media. It’s the closest I’ve come to shipping a real product rather than a feature.",
    ],
    builtWith: [
      "Python", "FastAPI", "faster-whisper", "Groq · Llama 3.3 70B", "MediaPipe",
      "YOLOv8", "PySceneDetect", "OpenCV", "FFmpeg", "React", "Vite", "Tailwind",
      "Remotion", "WebCodecs", "Docker",
    ],
    repo: "github.com/AP-143/clipstudio",
  },
  {
    id: "zulffaya",
    no: "02",
    kind: "featured",
    cap: "Full-Stack E-Commerce",
    title: "Zulffaya Clothing Store",
    tagline: "End-to-end e-commerce platform with live payment integration.",
    meta: [
      { label: "Type", value: "Self-initiated" },
      { label: "Timeline", value: "May – Jul 2024" },
      { label: "Role", value: "Solo — Full Stack" },
    ],
    body: "A complete online clothing store I designed and built alone — from the customer-facing storefront through to the admin dashboard and a working payment gateway. The goal was to build something that could actually take a real order and process a real payment, not just a static mockup.",
    images: [
      { src: "/assets/zulffaya-landing.jpg", caption: "Landing page — “New Arrivals” hero" },
      { src: "/assets/zulffaya-catalogue.jpg", caption: "Product catalogue with live stock" },
      { src: "/assets/zulffaya-midtrans.jpg", caption: "Midtrans payment gateway — live" },
      { src: "/assets/zulffaya-admin.jpg", caption: "Admin panel — product management" },
    ],
    built: [
      "Customer storefront: catalogue, cart, checkout flow.",
      "User authentication — register & login.",
      "Admin dashboard to add / remove products & manage stock.",
      "Order pipeline with accept / reject & status tracking.",
      "Midtrans payment gateway handling real transactions.",
    ],
    impact: [
      "This was the first time I connected every layer myself — database, server logic, frontend, and a third-party payment API. Integrating Midtrans taught me how to read external API documentation and handle the awkward edge cases that only appear when real money moves: timeouts, failed callbacks, and pending states.",
    ],
    builtWith: ["PHP", "Laravel", "JavaScript", "Bootstrap", "HTML / CSS", "MySQL", "Midtrans API"],
    repo: "github.com/AP-143/zulffaya_c",
  },
  {
    id: "backtest",
    no: "03",
    kind: "featured",
    cap: "Data & Systems",
    title: "Trading Strategy Backtest",
    tagline: "SnR Breakout + Fibonacci Retracement — a 6-month, 89-trade study.",
    meta: [
      { label: "Type", value: "Self-initiated" },
      { label: "Period tested", value: "Dec 2025 – May 2026" },
      { label: "Instrument", value: "XAUUSD (Gold)" },
    ],
    body: "I designed a rule-based trading strategy combining Support/Resistance breakouts with Fibonacci retracement entries, then backtested it across 89 trades on gold over six months. This project isn’t about trading — it’s about treating a hypothesis like an engineer: define the rules, log every trade, and let the numbers judge the system.",
    stats: [
      { num: "$7,308", label: "Total Profit" },
      { num: "89", label: "Total Trades" },
      { num: "44.9%", label: "Win Rate" },
      { num: "10,440", label: "Total Pips" },
    ],
    images: [
      { src: "/assets/backtest-equity.jpg", caption: "Equity growth curve — $5,000 → ~$12,300 over the test period" },
      { src: "/assets/backtest-dashboard.jpg", caption: "Full performance dashboard — profit, pips, risk:reward, streaks" },
      { src: "/assets/backtest-monthly.jpg", caption: "Month-by-month pip breakdown" },
    ],
    built: [
      "Defined entry / exit rules as objective, repeatable conditions.",
      "Logged all 89 trades in a structured dataset (pair, action, entry, TP, SL, outcome).",
      "Measured win rate, average risk:reward, and consecutive win/loss streaks.",
      "Visualised the equity curve to spot drawdown behaviour.",
    ],
    impact: [
      "The strategy wins less than half its trades — yet it’s strongly profitable. By keeping winners larger than losers and sizing risk consistently, a sub-50% system still compounds. Understanding why that works is exactly the kind of probabilistic thinking I bring to product decisions.",
    ],
    builtWith: ["Technical Analysis", "Data Logging", "Risk Management", "Statistical Backtesting", "Equity Modelling"],
    builtWithLabel: "Tools & methods",
  },
  {
    id: "fruittables",
    no: "04",
    kind: "earlier",
    cap: "Bootcamp Project · Front-End",
    title: "Fruittables — Fresh Market",
    tagline: "Online marketplace for fruit & vegetables.",
    meta: [
      { label: "Role", value: "Front-End Developer" },
      { label: "Where", value: "Harisenin.com" },
      { label: "When", value: "Jan – Feb 2023" },
    ],
    body: "A marketplace web app for fresh produce where my focus was the front-end — and the homepage in particular. The challenge was making a landing page that felt genuinely inviting: getting the hero, search, and visual rhythm to pull a visitor in rather than just list items. The rest of the storefront was built with my bootcamp team.",
    images: [
      { src: "/assets/fruittables-hero.jpg", caption: "Homepage hero — the part I owned" },
    ],
    impact: [
      "Impact: Turned the homepage into a storefront that actually invites you in — the part teammates pointed to as the one that felt most finished.",
      "Learned: a homepage has one job — earn the next click. Making something look effortless takes deliberate work on hierarchy and detail.",
    ],
    builtWith: ["JavaScript", "HTML / CSS", "UI Layout"],
  },
  {
    id: "cyberpixel",
    no: "05",
    kind: "earlier",
    cap: "University Coursework · Game",
    title: "Cyberpixel — 2D Game",
    tagline: "AMIKOM University · built solo.",
    meta: [
      { label: "Role", value: "Game Developer (Solo)" },
      { label: "Where", value: "AMIKOM University" },
      { label: "When", value: "Mar – Apr 2023" },
    ],
    body: "A 2D pixel-art game with a cyberpunk theme that I designed and built entirely on my own. I handled everything — game logic, level design, and sprite integration — my first real taste of building something interactive and playable rather than purely functional. (Original files lived on an old laptop I no longer have access to, so screenshots aren’t available.)",
    impact: [
      "Impact: Took a game from empty project to fully playable on my own — my first proof I could own something end-to-end without a template or a team.",
      "Learned: interactive design thinking — in a game, the player’s experience drives every single decision.",
    ],
    builtWith: ["Solo Build", "Game Logic", "Game Design", "Pixel Art"],
  },
];

export const closing = {
  eyebrow: "In closing",
  titleLead: "Why the",
  titleAccent: "Academy,",
  titleTail: "and why now.",
  paragraphs: [
    "I have the foundation: I can build across the stack, I can take a system from idea to working product, and I’ve trained myself to think in terms of risk, evidence, and probability.",
    "What I want now is depth — to go from someone who can build web and AI tools to someone who builds genuinely excellent iOS products, surrounded by people who push me. The Apple Developer Academy is where I want to make that leap, and where I believe my mix of engineering and decision-making can grow into something distinctive.",
  ],
  thanks: "Thank you for taking the time to read this far.",
};

export const contact = [
  { label: "Email", value: "Akbar.j.p.putra@gmail.com", href: "mailto:Akbar.j.p.putra@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/akbaarputra", href: "https://linkedin.com/in/akbaarputra" },
  { label: "GitHub", value: "github.com/AP-143", href: "https://github.com/AP-143" },
];
