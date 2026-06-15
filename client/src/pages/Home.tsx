/* V-Safe Home Page — Clean Signal design system
 * Sections: Hero, Problem, Value Pillars, Coverage, How It Works,
 *           Features, Comparison, AI/MCP, Tiers, Developer, Trust, CTA
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Shield, Layers, Eye, Bot, CheckCircle2, Building2,
  AlertTriangle, Globe, Landmark, Newspaper, Wifi, Fingerprint,
  TrendingDown, ArrowRight, Copy, Check, ChevronRight, Zap,
  Lock, Database, Code2, Terminal
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Score Card Component ────────────────────────────────────────────────────
function ScoreCard() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const score = 72;
  const radius = 54;
  const circumference = Math.PI * radius; // half circle
  const dashOffset = circumference - (animated ? (score / 100) * circumference : circumference);

  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-0.5">Risk Assessment</p>
          <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Example Company Ltd
          </p>
        </div>
        <span className="risk-chip-high">HIGH</span>
      </div>

      {/* Gauge */}
      <div className="flex flex-col items-center my-4">
        <div className="relative w-36 h-20 overflow-hidden">
          <svg viewBox="0 0 130 70" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 10 65 A 55 55 0 0 1 120 65"
              fill="none" stroke="#f1f5f9" strokeWidth="10" strokeLinecap="round"
            />
            {/* Green segment */}
            <path
              d="M 10 65 A 55 55 0 0 1 120 65"
              fill="none" stroke="url(#riskGrad)" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.23,1,0.32,1)" }}
            />
            <defs>
              <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="45%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            {/* Score text */}
            <text x="65" y="62" textAnchor="middle" fontSize="22" fontWeight="700"
              fill="#0F1F4B" fontFamily="Space Grotesk, sans-serif">
              {animated ? score : 0}
            </text>
          </svg>
        </div>
        <div className="flex justify-between w-full text-xs text-gray-400 mt-1 px-1">
          <span>LOW</span><span>MEDIUM</span><span>HIGH</span>
        </div>
      </div>

      {/* Drivers */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Key Drivers</p>
        <div className="flex flex-wrap gap-1.5">
          {["insolvency proceedings", "severe adverse media"].map((d) => (
            <span key={d} className="text-xs bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full">
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Layer breakdown */}
      <div className="space-y-1.5">
        {[
          { name: "Corporate Registry", score: 12, color: "#22C55E" },
          { name: "Insolvency", score: 90, color: "#EF4444" },
          { name: "Banking Restrictions", score: 20, color: "#22C55E" },
          { name: "Sanctions & PEP", score: 15, color: "#22C55E" },
          { name: "Adverse Media", score: 78, color: "#EF4444" },
        ].map((layer) => (
          <div key={layer.name} className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-36 shrink-0">{layer.name}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: animated ? `${layer.score}%` : "0%",
                  background: layer.color,
                  transitionDelay: "400ms"
                }}
              />
            </div>
            <span className="text-xs font-mono text-gray-400 w-6 text-right">{layer.score}</span>
          </div>
        ))}
      </div>

      {/* Confidence */}
      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <span className="text-xs text-gray-400">Confidence</span>
        <span className="text-xs font-semibold text-gray-600">86% · Coverage 95%</span>
      </div>
    </div>
  );
}

// ─── Code Block with Copy ────────────────────────────────────────────────────
function CodeBlock({ code, language = "json" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10" style={{ background: "#0d1117" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8" style={{ background: "#161b22" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-white/30 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────
function Section({ children, className = "", id = "", style }: { children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={className} style={style}>
      {children}
    </section>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const valuePillars = [
  {
    icon: Globe,
    title: "Israel-native, including sources others can't reach",
    body: "Several authoritative Israeli government sources reject foreign and datacenter traffic — they only respond to a native Israeli IP. V-Safe runs on Israeli cloud infrastructure, querying these sources directly with no proxies, no workarounds. This is a structural moat global KYB providers literally cannot cross.",
  },
  {
    icon: Layers,
    title: "One score, eight independent layers",
    body: "A single call fans out across eight independent categories of risk signal and returns a normalized 0–100 score with a LOW / MEDIUM / HIGH band. No single source can outvote the evidence; decisive signals (sanctions, insolvency) can't be averaged away by clean layers.",
  },
  {
    icon: Eye,
    title: "Evidence, not a black box",
    body: "Every layer returns linked source evidence — deep links, publisher, dataset, snippet, timestamp — and a per-finding confidence. Buyers can see why a score is what it is. Essential for audit and for defensible compliance decisions.",
  },
  {
    icon: Bot,
    title: "Built for AI agents (MCP-native)",
    body: "V-Safe is API-first and exposed for direct LLM/agent consumption over MCP. The output is schema-strict and standards-aligned, so an agent can call it as a tool and reason over the structured result with no scraping or parsing.",
  },
  {
    icon: CheckCircle2,
    title: "Honest data — no invented 'clean' scores",
    body: "Every layer queries a real, primary source at request time. If a source is unreachable, the layer is marked unavailable and excluded from the score — reported in a transparent coverage figure. V-Safe never fabricates a placeholder 'all clear.'",
  },
];

const coverageLayers = [
  { icon: Building2, layer: "Corporate Registry", what: "Is this a real, active, in-good-standing company?", detail: "Legal status, age, type, address, officers, violation flags" },
  { icon: AlertTriangle, layer: "Insolvency & Liquidation", what: "Is it failing, being wound up, or in court?", detail: "Court/voluntary liquidation, dissolution, open insolvency proceedings — including cases that still read 'active' in the registry" },
  { icon: Landmark, layer: "Banking Restrictions", what: "Has the banking system flagged this company?", detail: "Severely-restricted corporate bank accounts from the national bank's records" },
  { icon: Shield, layer: "Sanctions, PEP & Terror", what: "Is it (or its officers) on a watchlist anywhere that matters?", detail: "Global + Israeli sanctions, terror-financing designations, politically-exposed-person links" },
  { icon: Newspaper, layer: "Adverse Media", what: "What's the news saying — and how bad is it really?", detail: "Negative coverage & financial-distress signals in Hebrew and global press, AI-scored by Claude" },
  { icon: Wifi, layer: "Domain & Cyber Hygiene", what: "Is its digital footprint legitimate, or a red flag?", detail: "Domain age, DNS/email-auth hygiene, malware/phishing reputation" },
  { icon: Fingerprint, layer: "Legal-Entity Identity", what: "Does its identity reconcile against global registries?", detail: "Global legal-entity identifier (LEI) cross-walk, registered identity" },
  { icon: TrendingDown, layer: "Market Distress", what: "For public companies, is the market pricing in collapse?", detail: "52-week stock drawdown for listed companies" },
];

const sampleJson = `{
  "caption": "Example Company Ltd",
  "schema": "Company",
  "risk_score": {
    "ratingValue": 72,
    "band": "HIGH",
    "bestRating": 100,
    "worstRating": 0,
    "confidence": 0.86,
    "coverage": 0.95,
    "drivers": [
      "insolvency proceedings",
      "severe adverse media"
    ]
  },
  "layers": [
    {
      "layer": "insolvency",
      "availability": "live",
      "sub_score": {
        "ratingValue": 90,
        "bestRating": 100,
        "worstRating": 0
      },
      "confidence": 0.9,
      "evidence": [
        {
          "publisher": "Companies Registrar",
          "source_url": "https://...",
          "snippet": "Voluntary liquidation filed...",
          "retrieved_at": "2026-06-15T09:14:22Z"
        }
      ]
    }
  ]
}`;

const curlExample = `# 1. Get a token
curl -X POST https://api.vsafe.io/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"api_key": "your_api_key"}'

# 2. Run a risk check
curl -X POST https://api.vsafe.io/api/v1/check \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "registration_number": "512345678",
    "company_name": "Example Company Ltd",
    "tier": "full"
  }'

# 3. Read the score
# → risk_score.ratingValue: 72
# → risk_score.band: "HIGH"
# → risk_score.drivers: ["insolvency proceedings", ...]`;

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F1F4B 0%, #0a1535 50%, #091530 100%)" }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
        {/* Teal glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #0D9488, transparent)" }} />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  8 signal layers · 19 data sources · live primary data
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Know the risk of any Israeli company —
                <span style={{ color: "#2DD4BF" }}> in one API call.</span>
              </h1>

              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                V-Safe returns a 0–100 risk score with linked evidence and confidence — across registry, insolvency, sanctions, adverse media, cyber, and more. Built API-first and ready for AI agents.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/docs" className="btn-teal">
                  Get an API key <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="btn-outline-white">
                  Book a demo
                </Link>
                <Link href="/docs" className="btn-outline-white">
                  Read the docs
                </Link>
              </div>

              {/* Trust stats */}
              <div className="flex flex-wrap gap-6">
                {[
                  { value: "8", label: "Signal layers" },
                  { value: "19", label: "Data sources" },
                  { value: "0–100", label: "Normalized score" },
                  { value: "MCP", label: "Agent-native" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Score card */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute inset-0 blur-2xl opacity-20 rounded-2xl" style={{ background: "#0D9488" }} />
                <ScoreCard />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20L0 60Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ── PROBLEM FRAMING ───────────────────────────────────────────────── */}
      <Section className="py-20 bg-[#F8FAFC]" id="problem">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="section-label mb-3">The challenge</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1F4B] mb-5 fade-up" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Scoring an Israeli company is uniquely hard
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed fade-up stagger-1">
              Israel has a distinct regulatory and linguistic landscape that generic global KYB tools handle poorly — or not at all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Blocked at the source",
                body: "Key Israeli government portals — including the insolvency case register — reject foreign and datacenter IP addresses. Global providers structurally cannot reach them.",
              },
              {
                icon: "🔤",
                title: "Hebrew-first data",
                body: "Company names, financial press, and government records are in Hebrew. Transliteration-based matching misses critical signals. You need a system built to read the market in its own language.",
              },
              {
                icon: Database,
                title: "Fragmented records",
                body: "Risk signals are scattered across eight independent categories — registry, insolvency courts, banking restrictions, sanctions lists, news, cyber, identity, and markets. No single source tells the full story.",
              },
            ].map((item, i) => (
              <div key={item.title} className={`bg-white rounded-xl p-6 border border-gray-100 shadow-sm fade-up stagger-${i + 1}`}>
                <div className="w-10 h-10 rounded-lg bg-[#0F1F4B]/5 flex items-center justify-center mb-4">
                  {typeof item.icon === "string" ? (
                    <span className="text-xl">{item.icon}</span>
                  ) : (
                    <item.icon size={20} className="text-[#0F1F4B]" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[#0F1F4B] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── VALUE PILLARS ─────────────────────────────────────────────────── */}
      <Section className="py-20" style={{ background: "white" }} id="why-vsafe">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="section-label mb-3">Why V-Safe</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1F4B] mb-4 fade-up" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Five reasons compliance teams and AI builders choose V-Safe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuePillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className={`group p-6 rounded-xl border border-gray-100 hover:border-[#0D9488]/30 hover:shadow-md transition-all duration-300 fade-up stagger-${i + 1}`}
                style={{ background: i === 0 ? "#0F1F4B" : "white" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: i === 0 ? "rgba(45,212,191,0.15)" : "rgba(15,31,75,0.06)" }}
                >
                  <pillar.icon size={20} className={i === 0 ? "text-[#2DD4BF]" : "text-[#0D9488]"} />
                </div>
                <h3
                  className="text-base font-semibold mb-2 leading-snug"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: i === 0 ? "white" : "#0F1F4B" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: i === 0 ? "rgba(255,255,255,0.65)" : "#6b7280" }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── COVERAGE LAYERS ───────────────────────────────────────────────── */}
      <Section className="py-20 bg-[#F8FAFC]" id="coverage">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="section-label mb-3">Coverage</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1F4B] mb-4 fade-up" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Eight independent layers. One honest verdict.
            </h2>
            <p className="text-base text-gray-600 fade-up stagger-1">
              Every call fans out across eight categories of risk signal, each querying primary sources in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coverageLayers.map((layer, i) => (
              <div
                key={layer.layer}
                className={`bg-white rounded-xl p-5 border border-gray-100 hover:border-[#0D9488]/40 hover:shadow-md transition-all duration-300 group fade-up stagger-${(i % 4) + 1}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0F1F4B]/5 group-hover:bg-[#0D9488]/10 flex items-center justify-center transition-colors">
                    <layer.icon size={16} className="text-[#0D9488]" />
                  </div>
                  <span className="text-xs font-bold text-[#0F1F4B]/40 uppercase tracking-wide">Layer {i + 1}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#0F1F4B] mb-1.5 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {layer.layer}
                </h3>
                <p className="text-xs text-[#0D9488] font-medium mb-2 italic">"{layer.what}"</p>
                <p className="text-xs text-gray-500 leading-relaxed">{layer.detail}</p>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 py-6 bg-white rounded-xl border border-gray-100">
            {[
              { value: "8", label: "Signal layers" },
              { value: "19", label: "Underlying data sources" },
              { value: "Live", label: "Primary source queries" },
              { value: "Hebrew", label: "Native language support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-[#0F1F4B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <Section className="py-20" style={{ background: "white" }} id="how-it-works">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="section-label mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1F4B] mb-4 fade-up" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              From company number to risk verdict in seconds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-[#0D9488]/30 to-[#0D9488]/30" />

            {[
              {
                step: "01",
                title: "You send minimal input",
                body: "Primary key is the 9-digit Israeli company number (ח.פ). Optionally add a company name, website/domain, and global IDs (LEI / DUNS / VAT) to enrich the result.",
                icon: Terminal,
              },
              {
                step: "02",
                title: "V-Safe fans out, live",
                body: "It queries the relevant primary sources across the eight layers in real time, screens names with a fuzzy-matching engine, and (for the Full tier) runs AI sentiment over the news.",
                icon: Zap,
              },
              {
                step: "03",
                title: "You get one structured verdict",
                body: "A 0–100 score + band, a per-layer breakdown, linked evidence, confidence, and a coverage figure — as clean JSON, ready for a dashboard or an AI agent.",
                icon: CheckCircle2,
              },
            ].map((step, i) => (
              <div key={step.step} className={`relative fade-up stagger-${i + 1}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: "#0F1F4B", fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {step.step}
                  </div>
                  <div className="h-px flex-1 bg-gray-100 md:hidden" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center mb-4">
                  <step.icon size={20} className="text-[#0D9488]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0F1F4B] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── COMPARISON ────────────────────────────────────────────────────── */}
      <Section className="py-20 bg-[#F8FAFC]" id="comparison">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="section-label mb-3">Competitive positioning</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1F4B] mb-4 fade-up" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Global KYB tools treat Israel as a footnote.
              <br />V-Safe treats it as the whole job.
            </h2>
          </div>

          <div className="overflow-x-auto fade-up stagger-1">
            <table className="w-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden table-fixed">
              <colgroup>
                <col style={{ width: "22%" }} />
                <col style={{ width: "26%" }} />
                <col style={{ width: "26%" }} />
                <col style={{ width: "26%" }} />
              </colgroup>
              <thead>
                <tr style={{ background: "#0F1F4B" }}>
                  <th className="text-left px-5 py-4 text-xs font-bold text-white/60 uppercase tracking-wide">Dimension</th>
                  <th className="text-center px-5 py-4 text-xs font-bold text-white/60 uppercase tracking-wide">Generic global KYB</th>
                  <th className="text-center px-5 py-4 text-xs font-bold text-white/60 uppercase tracking-wide">DIY (build it yourself)</th>
                  <th className="text-right px-5 py-4 text-xs font-bold text-[#2DD4BF] uppercase tracking-wide">V-Safe ✓</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Israeli gov sources that block foreign IPs", "Can't reach them", "Needs Israeli hosting + per-source engineering", "Native Israeli hosting reaches them directly"],
                  ["Hebrew names & Hebrew press", "Weak / transliterated", "You build it", "Hebrew-first matching & adverse media"],
                  ["Coverage", "Broad but shallow on Israel", "Whatever you have time to build", "8 layers purpose-built for Israel"],
                  ["Output schema", "Proprietary, divergent; some emit no numeric score", "Raw, unnormalized", "Bounded 0–100 + open FtM-aligned schema"],
                  ["Evidence & confidence", "Often a black box", "Manual", "Linked evidence + per-finding confidence"],
                  ["AI-agent ready (MCP)", "Rare", "No", "MCP-native, schema-strict"],
                  ["Time to first result", "Procurement + integration weeks", "Weeks of engineering", "One API call"],
                ].map(([dim, generic, diy, vsafe], i) => (
                  <tr key={dim} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-800 align-top">{dim}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500 text-center align-top">{generic}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500 text-center align-top">{diy}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#0D9488] text-right align-top">✅ {vsafe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              "Reaches sources that reject foreign traffic — a moat global vendors can't cross.",
              "A bounded 0–100 score, deliberately normalized — not an unbounded raw number you have to interpret.",
              "Decisive risks can't be averaged away: one strong sanctions or insolvency hit drives a HIGH score on its own.",
            ].map((quote, i) => (
              <div key={i} className={`bg-white border-l-4 border-[#0D9488] rounded-r-xl px-5 py-4 shadow-sm fade-up stagger-${i + 1}`}>
                <p className="text-sm text-gray-700 italic leading-relaxed">"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── AI / MCP BAND ─────────────────────────────────────────────────── */}
      <Section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0F1F4B 0%, #0a1535 100%)" }}
        id="ai-agents"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label-light mb-3">Built for AI agents</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 fade-up" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                A risk tool your AI agent can call directly.
              </h2>
              <p className="text-white/70 leading-relaxed mb-6 fade-up stagger-1">
                V-Safe is exposed as an MCP tool for LLMs and AI agents. Drop it into your agent and it just works — no scraping, no glue code, no custom parsing. The output is schema-strict and standards-aligned so your agent can reason over the structured result immediately.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Schema-strict JSON output — no parsing required",
                  "MCP-native tool exposure for LLM agents",
                  "Standards-aligned (FollowTheMoney entity model)",
                  "Hebrew and English adverse media, AI-scored",
                  "Graceful degradation — missing sources never break the call",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/70 fade-up stagger-1">
                    <CheckCircle2 size={16} className="text-[#2DD4BF] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/docs" className="btn-teal">
                Read the MCP docs <ArrowRight size={16} />
              </Link>
            </div>

            <div className="fade-up stagger-2">
              <CodeBlock
                language="python — MCP agent example"
                code={`# Drop V-Safe into your LangChain / CrewAI agent
from vsafe_mcp import VSafeTool

agent = Agent(
    tools=[VSafeTool(api_key="...")],
    instructions="Check Israeli companies before onboarding."
)

result = agent.run(
    "Is registration number 512345678 safe to onboard?"
)

# Agent receives structured JSON:
# risk_score.band = "HIGH"
# risk_score.drivers = ["insolvency proceedings"]
# → Agent responds: "Do not onboard — HIGH risk."`}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── TIERS ─────────────────────────────────────────────────────────── */}
      <Section className="py-20 bg-[#F8FAFC]" id="pricing">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="section-label mb-3">Tiers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1F4B] mb-4 fade-up" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Two tiers. Same structured output.
            </h2>
            <p className="text-base text-gray-600 fade-up stagger-1">
              Choose the depth you need. Both tiers return the same clean JSON schema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Quick Check */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 fade-up stagger-1">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0F1F4B] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Quick Check
                </h3>
                <p className="text-sm text-gray-500">High-volume fast screening</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#0F1F4B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  From $X
                </span>
                <span className="text-sm text-gray-400"> / check</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "4 layers: Registry, Insolvency, Banking, Domain",
                  "Fastest response time",
                  "Cacheable results",
                  "No LLM processing",
                  "Same structured JSON schema",
                  "Confidence + coverage figures",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={15} className="text-[#0D9488] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/docs" className="block text-center py-3 px-6 border-2 border-[#0F1F4B] text-[#0F1F4B] rounded-lg font-semibold text-sm hover:bg-[#0F1F4B] hover:text-white transition-all duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Get started
              </Link>
            </div>

            {/* Full Risk Score */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden fade-up stagger-2"
              style={{ background: "#0F1F4B" }}
            >
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold bg-[#0D9488] text-white px-3 py-1 rounded-full" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  RECOMMENDED
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Full Risk Score
                </h3>
                <p className="text-sm text-white/50">Onboarding, due diligence, compliance</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  From $X
                </span>
                <span className="text-sm text-white/40"> / check</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "All 8 layers — complete coverage",
                  "Sanctions, PEP & terror screening",
                  "Adverse media (AI-scored by Claude)",
                  "Legal-entity identity (LEI cross-walk)",
                  "Market distress for public companies",
                  "Full evidence trail + confidence",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <Check size={15} className="text-[#2DD4BF] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/docs" className="block text-center py-3 px-6 bg-[#0D9488] text-white rounded-lg font-semibold text-sm hover:bg-[#0b8075] transition-all duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Get API key
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Volume pricing available. <Link href="/contact" className="text-[#0D9488] hover:underline">Contact us</Link> for enterprise plans.
          </p>
        </div>
      </Section>

      {/* ── DEVELOPER / API ────────────────────────────────────────────────── */}
      <Section className="py-20" style={{ background: "white" }} id="developer">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label mb-3">Developer API</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F1F4B] mb-5 fade-up" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Get started in 3 API calls.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 fade-up stagger-1">
                A token-secured REST API with a single endpoint. Send a company number, get back a structured risk verdict. No SDKs required — works with any HTTP client.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Lock, title: "Bearer-token JWT auth", body: "Obtain a token with your API key, then call the endpoint." },
                  { icon: Code2, title: "POST /api/v1/check", body: "registration_number required. Optional: company_name, website, tier, lei, duns, vat." },
                  { icon: CheckCircle2, title: "Structured JSON response", body: "FollowTheMoney entity model + schema.org AggregateRating. Standards-aligned, self-describing." },
                ].map((item, i) => (
                  <div key={item.title} className={`flex gap-4 fade-up stagger-${i + 1}`}>
                    <div className="w-9 h-9 rounded-lg bg-[#0F1F4B]/5 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={16} className="text-[#0D9488]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F1F4B] mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Link href="/docs" className="btn-primary">
                  Read the docs <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="btn-outline-white" style={{ color: "#0F1F4B", borderColor: "#0F1F4B" }}>
                  Try a sample check
                </Link>
              </div>
            </div>

            <div className="space-y-4 fade-up stagger-2">
              <CodeBlock language="bash — 3-call quickstart" code={curlExample} />
              <CodeBlock language="json — response" code={sampleJson} />
            </div>
          </div>
        </div>
      </Section>

      {/* ── TRUST BAND ────────────────────────────────────────────────────── */}
      <Section className="py-16 bg-[#F8FAFC]" id="trust">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: "Israeli-hosted", body: "Runs on Israeli cloud infrastructure, enabling direct access to IP-restricted government sources that foreign providers cannot reach." },
              { icon: Eye, title: "Evidence-linked", body: "Every score comes with its receipts — linked source URLs, publisher, snippet, and timestamp for every finding." },
              { icon: CheckCircle2, title: "Standards-aligned", body: "Output follows the open FollowTheMoney entity model and schema.org AggregateRating. No proprietary black-box schema." },
              { icon: Database, title: "Primary sources, live", body: "No stale databases. Every call queries primary sources in real time. Unavailable sources are reported, never fabricated." },
            ].map((item, i) => (
              <div key={item.title} className={`bg-white rounded-xl p-6 border border-gray-100 shadow-sm fade-up stagger-${i + 1}`}>
                <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-[#0D9488]" />
                </div>
                <h3 className="text-sm font-semibold text-[#0F1F4B] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <Section
        className="py-24"
        style={{ background: "linear-gradient(135deg, #0F1F4B 0%, #0a1535 100%)" }}
      >
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 fade-up" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to see any Israeli company's risk — in one call?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto fade-up stagger-1">
            Join compliance teams, lenders, and AI builders who use V-Safe for Israel-specific risk intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4 fade-up stagger-2">
            <Link href="/docs" className="btn-teal text-base px-8 py-3.5">
              Get an API key <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-outline-white text-base px-8 py-3.5">
              Book a demo
            </Link>
            <Link href="/docs" className="btn-outline-white text-base px-8 py-3.5">
              Read the docs
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
