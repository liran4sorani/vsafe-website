import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Copy, Check, ArrowRight, Zap, Shield, Bot, Globe } from "lucide-react";

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10" style={{ background: "#0d1117" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8" style={{ background: "#161b22" }}>
        <span className="text-xs text-white/30 font-mono">{language}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors">
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed whitespace-pre-wrap"><code>{code}</code></pre>
    </div>
  );
}

function SectionAnchor({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-28">
      {children}
    </div>
  );
}

const navItems = [
  { id: "rest-api", label: "REST API" },
  { id: "authentication", label: "Authentication" },
  { id: "check-endpoint", label: "POST /api/v1/check" },
  { id: "response-schema", label: "Response schema" },
  { id: "mcp", label: "MCP — AI Agents" },
  { id: "mcp-endpoint", label: "Live endpoint" },
  { id: "mcp-tools", label: "Tools" },
  { id: "mcp-flow", label: "Request/response flow" },
  { id: "mcp-clients", label: "Client setup" },
  { id: "mcp-network", label: "Network path" },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState("rest-api");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container">
          <div className="flex gap-12">
            {/* Sidebar nav */}
            <aside className="hidden lg:block w-52 shrink-0">
              <div className="sticky top-28">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">On this page</p>
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setActiveSection(item.id)}
                      className={`block text-sm py-1 px-3 rounded-lg transition-colors ${
                        item.id === "mcp" || item.id === "rest-api"
                          ? "font-semibold text-[#0F1F4B] mt-3"
                          : "text-gray-500 hover:text-[#0D9488] pl-5"
                      } ${activeSection === item.id ? "text-[#0D9488] bg-[#0D9488]/5" : ""}`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 max-w-3xl">
              <p className="section-label mb-3">Documentation</p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                API Reference
              </h1>
              <p className="text-lg text-gray-600 mb-12">
                V-Safe offers two integration paths: a token-secured <strong>REST API</strong> and a live <strong>MCP server</strong> for AI agents.
              </p>

              {/* ── REST API ─────────────────────────────────────────────── */}
              <SectionAnchor id="rest-api">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-lg bg-[#0F1F4B]/5 flex items-center justify-center">
                    <Globe size={18} className="text-[#0D9488]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F1F4B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>REST API</h2>
                </div>
              </SectionAnchor>

              <SectionAnchor id="authentication">
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-[#0F1F4B] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Authentication</h3>
                  <p className="text-gray-600 mb-4">Obtain a JWT token using your API key, then include it as a Bearer token in subsequent requests.</p>
                  <CodeBlock language="bash" code={`curl -X POST https://api.vsafe.io/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"api_key": "your_api_key_here"}'

# Response:
# { "access_token": "eyJ...", "token_type": "Bearer", "expires_in": 3600 }`} />
                </div>
              </SectionAnchor>

              <SectionAnchor id="check-endpoint">
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-[#0F1F4B] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>POST /api/v1/check</h3>
                  <p className="text-gray-600 mb-4">Run a risk check on an Israeli company. Returns a 0–100 risk score with full evidence trail.</p>

                  <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
                    <h4 className="text-sm font-bold text-[#0F1F4B] mb-4 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Request body</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left py-2 text-gray-500 font-medium">Parameter</th>
                          <th className="text-left py-2 text-gray-500 font-medium">Type</th>
                          <th className="text-left py-2 text-gray-500 font-medium">Required</th>
                          <th className="text-left py-2 text-gray-500 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["registration_number", "string", "✅ Yes", "9-digit Israeli company number (ח.פ)"],
                          ["company_name", "string", "Optional", "Company name for fuzzy matching"],
                          ["website", "string", "Optional", "Company website/domain for cyber hygiene check"],
                          ["tier", "string", "Optional", '"quick" or "full" (default: "full")'],
                          ["lei", "string", "Optional", "Legal Entity Identifier for identity cross-walk"],
                          ["duns", "string", "Optional", "D-U-N-S number"],
                          ["vat", "string", "Optional", "VAT registration number"],
                        ].map(([param, type, req, desc]) => (
                          <tr key={param} className="border-b border-gray-50">
                            <td className="py-2.5 font-mono text-[#0D9488] text-xs">{param}</td>
                            <td className="py-2.5 text-gray-500 text-xs">{type}</td>
                            <td className="py-2.5 text-xs">{req}</td>
                            <td className="py-2.5 text-gray-600 text-xs">{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <CodeBlock language="bash — example request" code={`curl -X POST https://api.vsafe.io/api/v1/check \\
  -H "Authorization: Bearer <your_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "registration_number": "512345678",
    "company_name": "Example Company Ltd",
    "website": "example.co.il",
    "tier": "full"
  }'`} />
                </div>
              </SectionAnchor>

              <SectionAnchor id="response-schema">
                <div className="mb-16">
                  <h3 className="text-xl font-bold text-[#0F1F4B] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Response schema</h3>
                  <p className="text-gray-600 mb-4">Standards-aligned JSON following the FollowTheMoney entity model and schema.org AggregateRating.</p>
                  <CodeBlock language="json — response" code={`{
  "caption": "Example Company Ltd",
  "schema": "Company",
  "risk_score": {
    "ratingValue": 72,
    "band": "HIGH",
    "bestRating": 100,
    "worstRating": 0,
    "confidence": 0.86,
    "coverage": 0.95,
    "drivers": ["insolvency proceedings", "severe adverse media"]
  },
  "layers": [
    {
      "layer": "insolvency",
      "availability": "live",
      "sub_score": { "ratingValue": 90, "bestRating": 100, "worstRating": 0 },
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
}`} />
                </div>
              </SectionAnchor>

              {/* ── MCP ──────────────────────────────────────────────────── */}
              <div className="border-t border-gray-200 pt-12 mb-8">
                <SectionAnchor id="mcp">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
                      <Bot size={18} className="text-[#0D9488]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0F1F4B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MCP — AI Agent Integration</h2>
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="text-gray-600 mb-8">
                    V-Safe is available as a live MCP server at <code className="text-[#0D9488] bg-[#0D9488]/5 px-1.5 py-0.5 rounded text-sm">mcp.v-safe.ai</code>. Add it to any MCP-compatible agent and your agent gets Israeli company risk intelligence as a native tool — no REST wrappers, no parsing.
                  </p>
                </SectionAnchor>
              </div>

              <SectionAnchor id="mcp-endpoint">
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Live endpoint</h3>
                  <div className="bg-[#0F1F4B] rounded-xl p-5 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-white/50 uppercase tracking-wide font-semibold">Production</span>
                    </div>
                    <code className="text-[#2DD4BF] text-base font-mono">https://mcp.v-safe.ai/mcp</code>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white/50">
                      <div><span className="text-white/30">Protocol</span><br />JSON-RPC 2.0 over HTTP POST</div>
                      <div><span className="text-white/30">Transport</span><br />SSE (text/event-stream)</div>
                      <div><span className="text-white/30">Auth</span><br />Authorization: Bearer &lt;jwt&gt;</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    The server runs behind Cloudflare Tunnel (TLS termination at the edge) → cloudflared on an Israeli-hosted box → FastMCP server on port 8001. Bearer JWTs are mapped to per-tenant quota (daily/monthly metering).
                  </p>
                </div>
              </SectionAnchor>

              <SectionAnchor id="mcp-tools">
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Tools</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-xl border border-gray-100 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield size={16} className="text-[#0D9488]" />
                        <code className="text-sm font-mono font-bold text-[#0F1F4B]">check_israeli_company</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Full V-Safe risk assessment — all 8 layers including sanctions, adverse media (AI-scored), legal-entity identity, and market distress. ~20s latency.</p>
                      <div className="text-xs text-gray-400 font-mono bg-gray-50 rounded-lg p-3">
                        registration_number: string (required)<br />
                        company_name?: string<br />
                        website?: string
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={16} className="text-[#0D9488]" />
                        <code className="text-sm font-mono font-bold text-[#0F1F4B]">quick_check</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Fast pre-screen — registry + insolvency + banking restrictions + domain hygiene. Ideal for high-volume screening pipelines.</p>
                      <div className="text-xs text-gray-400 font-mono bg-gray-50 rounded-lg p-3">
                        registration_number: string (required)<br />
                        company_name?: string
                      </div>
                    </div>
                  </div>
                </div>
              </SectionAnchor>

              <SectionAnchor id="mcp-flow">
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Request / response flow</h3>
                  <p className="text-sm text-gray-500 mb-4">The following is the validated end-to-end flow, captured live against the production server.</p>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">① No token → 401 (auth enforced)</div>
                      <CodeBlock language="HTTP" code={`POST https://mcp.v-safe.ai/mcp
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}

← HTTP 401
{"error":"missing or invalid bearer token"}`} />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">② initialize with Bearer token → handshake</div>
                      <CodeBlock language="HTTP" code={`POST https://mcp.v-safe.ai/mcp
Authorization: Bearer <jwt>
{"jsonrpc":"2.0","id":1,"method":"initialize",
 "params":{"protocolVersion":"2024-11-05",
           "clientInfo":{"name":"demo"},"capabilities":{}}}

← HTTP 200  (text/event-stream)
data: {"jsonrpc":"2.0","id":1,"result":{
        "protocolVersion":"2024-11-05",
        "serverInfo":{"name":"vsafe-risk","version":"1.27.2"},
        "capabilities":{"tools":{"listChanged":false}}}}`} />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">③ tools/list → the two advertised tools</div>
                      <CodeBlock language="JSON-RPC" code={`{"jsonrpc":"2.0","id":2,"method":"tools/list"}

← check_israeli_company  — Full V-Safe risk assessment (all 8 layers, ~20s)
← quick_check            — Fast pre-screen (registry + insolvency + banking + domain)`} />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">④ tools/call → live result (Teva Pharmaceutical, real data)</div>
                      <CodeBlock language="JSON-RPC" code={`{"jsonrpc":"2.0","id":3,"method":"tools/call",
 "params":{"name":"quick_check",
           "arguments":{"registration_number":"520013954"}}}

← caption   : תעשיות פרמצבטיות טבע בע"מ  (Teva Pharmaceutical Industries Ltd)
← band      : LOW    score: 0.0
← confidence: 0.82   coverage: 0.82
← layers    : registry ✅  insolvency ✅  boi_restricted ✅
← usage     : { plan: "trial", day: "3/50", month: "3/500" }`} />
                      <p className="text-xs text-gray-400 mt-2">The Hebrew company name confirms the full chain executed: auth → quota metering → live query to Israeli registry/insolvency/BoI sources → schema-strict result.</p>
                    </div>
                  </div>
                </div>
              </SectionAnchor>

              <SectionAnchor id="mcp-clients">
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Client setup</h3>

                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-[#0F1F4B] mb-2">Claude Desktop</p>
                      <CodeBlock language="json — claude_desktop_config.json" code={`{
  "mcpServers": {
    "vsafe": {
      "url": "https://mcp.v-safe.ai/mcp",
      "headers": {
        "Authorization": "Bearer <your_token>"
      }
    }
  }
}`} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#0F1F4B] mb-2">Cursor</p>
                      <CodeBlock language="json — .cursor/mcp.json" code={`{
  "mcpServers": {
    "vsafe": {
      "url": "https://mcp.v-safe.ai/mcp",
      "headers": {
        "Authorization": "Bearer <your_token>"
      }
    }
  }
}`} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#0F1F4B] mb-2">LangChain / CrewAI (Python)</p>
                      <CodeBlock language="python" code={`from langchain_mcp_adapters.client import MultiServerMCPClient

client = MultiServerMCPClient({
    "vsafe": {
        "url": "https://mcp.v-safe.ai/mcp",
        "transport": "streamable_http",
        "headers": {"Authorization": "Bearer <your_token>"}
    }
})

tools = await client.get_tools()
# tools now includes check_israeli_company and quick_check
# Pass them to any LangChain agent or CrewAI crew`} />
                    </div>
                  </div>
                </div>
              </SectionAnchor>

              <SectionAnchor id="mcp-network">
                <div className="mb-12">
                  <h3 className="text-lg font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Network path</h3>
                  <div className="bg-[#0F1F4B] rounded-xl p-6 font-mono text-sm text-white/70 leading-loose">
                    <div className="text-white/40 text-xs uppercase tracking-wide mb-4">Each request travels:</div>
                    <div>MCP client (Claude / Cursor / LangChain)</div>
                    <div className="text-[#2DD4BF] pl-4">│  HTTPS POST https://mcp.v-safe.ai/mcp</div>
                    <div className="pl-4">▼</div>
                    <div>Cloudflare edge — TLS termination, proxy</div>
                    <div className="text-[#2DD4BF] pl-4">│  Cloudflare Tunnel (outbound-only, no open ports)</div>
                    <div className="pl-4">▼</div>
                    <div>cloudflared on Israeli-hosted box (185.47.173.220)</div>
                    <div className="text-[#2DD4BF] pl-4">│  http://localhost:8001/mcp</div>
                    <div className="pl-4">▼</div>
                    <div>MCP server (FastMCP, Streamable-HTTP)</div>
                    <div className="text-[#2DD4BF] pl-4">│  AuthMiddleware: Bearer JWT → tenant</div>
                    <div className="text-[#2DD4BF] pl-4">│  quota.consume() → daily/monthly metering</div>
                    <div className="pl-4">▼</div>
                    <div>engine.build_result() → <span className="text-green-400">live data.gov.il / BoI queries</span></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    The Israeli-hosted infrastructure is the structural moat — government portals that reject foreign/datacenter IPs are queried directly from within Israel.
                  </p>
                </div>
              </SectionAnchor>

              {/* CTA */}
              <div className="bg-[#0F1F4B] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready to integrate?</h3>
                <p className="text-white/70 mb-6">Request an MCP token or get a REST API key — both are available via the same onboarding.</p>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:sales@socalytix.io?subject=V-Safe MCP Token Request" className="btn-teal inline-flex">
                    Request MCP token <ArrowRight size={16} />
                  </a>
                  <a href="/contact" className="btn-outline-white inline-flex text-sm">
                    Book a demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
