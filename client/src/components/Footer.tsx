/* V-Safe Footer — Clean Signal design system
 * Dark navy background, teal accents
 */
import { Link } from "wouter";
import { Shield, ExternalLink } from "lucide-react";

const LOGO_DARK = "/manus-storage/vsafe-logo-dark_e44422cd.png";

export default function Footer() {
  return (
    <footer style={{ background: "#0F1F4B" }} className="text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={LOGO_DARK} alt="V-Safe" className="h-9 w-auto mb-4" />
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
            8 signal layers · 19 data sources · live primary data
          </p>
        </div>
      </div>
    </footer>
  );
}
