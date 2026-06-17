/* V-Safe Footer — Clean Signal design system
 * Dark navy background, teal accents
 */
import { Link } from "wouter";

function FooterLogo() {
  return (
    <svg viewBox="0 0 220 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto mb-4" aria-label="V-Safe">
      <path d="M26 4 L46 10 L46 28 C46 38 36 46 26 49 C16 46 6 38 6 28 L6 10 Z" fill="#2DD4BF" />
      <path d="M14 14 L26 36 L38 14" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M13 43 Q26 38 39 43" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M22 45.5 Q26 43 30 45.5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M30 45.5 Q34 43 39 43" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" fill="none" />
      <text x="56" y="34" fontFamily="'Space Grotesk', 'Inter', system-ui, sans-serif" fontWeight="700" fontSize="22" fill="white" letterSpacing="-0.5">V-Safe</text>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#0F1F4B" }} className="text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <FooterLogo />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              The risk-intelligence API built for Israeli companies. Evidence-backed. Agent-native. Israeli-hosted.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/50">All systems operational</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[
                { label: "How it works", href: "/#how-it-works" },
                { label: "Coverage layers", href: "/#coverage" },
                { label: "Pricing", href: "/pricing" },
                { label: "Docs & API", href: "/docs" },
                { label: "Changelog", href: "/docs" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Use Cases</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Compliance & KYB", href: "/use-cases" },
                { label: "Lenders & Fintechs", href: "/use-cases" },
                { label: "Due Diligence", href: "/use-cases" },
                { label: "AI Agents (MCP)", href: "/use-cases" },
                { label: "RevOps & Procurement", href: "/use-cases" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Book a demo", href: "/contact" },
                { label: "Privacy policy", href: "/contact" },
                { label: "Terms of service", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="mailto:sales@socalytix.io" className="text-sm text-[#2DD4BF] hover:text-white transition-colors font-medium">
                  sales@socalytix.io
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap gap-4">
            {[
              "🇮🇱 Israeli-hosted infrastructure",
              "🔒 Evidence-linked scores",
              "📊 Standards-aligned (FtM)",
              "⚡ Primary sources, queried live",
              "🤖 MCP-native for AI agents",
            ].map((badge) => (
              <span
                key={badge}
                className="text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} V-Safe. All rights reserved. V-Safe provides decision-support intelligence, not legal or regulatory advice.
          </p>
          <p className="text-xs text-white/30">
            8 signal layers · 500+ data sources · live primary data
          </p>
        </div>
      </div>
    </footer>
  );
}
