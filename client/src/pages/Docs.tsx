import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";

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

export default function Docs() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="section-label mb-3">Documentation</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              API Reference
            </h1>
            <p className="text-lg text-gray-600 mb-12">
              V-Safe is a token-secured REST API. One endpoint, one call, one structured verdict.
            </p>

            {/* Authentication */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Authentication</h2>
              <p className="text-gray-600 mb-4">Obtain a JWT token using your API key, then include it as a Bearer token in subsequent requests.</p>
              <CodeBlock language="bash" code={`curl -X POST https://api.vsafe.io/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"api_key": "your_api_key_here"}'

# Response:
# { "access_token": "eyJ...", "token_type": "Bearer", "expires_in": 3600 }`} />
            </div>

            {/* Check endpoint */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>POST /api/v1/check</h2>
              <p className="text-gray-600 mb-4">Run a risk check on an Israeli company. Returns a 0–100 risk score with full evidence trail.</p>

              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
                <h3 className="text-sm font-bold text-[#0F1F4B] mb-4 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Request body</h3>
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

            {/* Response */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Response schema</h2>
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

            {/* MCP */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MCP — AI Agent Integration</h2>
              <p className="text-gray-600 mb-4">V-Safe is exposed as an MCP tool for LLM agents. Drop it into your agent framework and it just works.</p>
              <CodeBlock language="python — LangChain / CrewAI" code={`from vsafe_mcp import VSafeTool

# Add V-Safe as a tool to your agent
tools = [VSafeTool(api_key="your_api_key")]

# The agent can now call:
# vsafe_check(registration_number="512345678", tier="full")
# → Returns structured risk JSON the agent can reason over`} />
            </div>

            <div className="bg-[#0F1F4B] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready to get started?</h3>
              <p className="text-white/70 mb-6">Get an API key and run your first check in minutes.</p>
              <a href="/contact" className="btn-teal inline-flex">
                Get an API key <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
