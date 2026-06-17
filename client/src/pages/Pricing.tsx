import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Check, ArrowRight, Shield, Globe, Landmark, Newspaper } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container">

          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 border border-[#0D9488]/20 rounded-full px-4 py-1.5 mb-6">
              <Shield size={14} className="text-[#0D9488]" />
              <span className="text-xs font-semibold text-[#0D9488]">Israel-specialist · No global KYB can match our depth here</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F1F4B] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              The only risk API built exclusively for the Israeli market
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              V-Safe queries sources that foreign providers structurally cannot reach — Israeli government portals, Hebrew press, national banking restrictions — and returns a single, normalized 0–100 score with full evidence. Pay per check. No monthly minimums to get started.
            </p>
          </div>

          {/* Why we're different callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
            {[
              {
                icon: Globe,
                title: "Native Israeli infrastructure",
                body: "We run on Israeli cloud. Key government sources — including the insolvency register — block foreign IPs. We reach them directly. Global KYB tools cannot.",
              },
              {
                icon: Newspaper,
                title: "Hebrew-first adverse media",
                body: "Company names, financial press, and court records are in Hebrew. We read them natively. Transliteration-based matching misses critical signals.",
              },
              {
                icon: Landmark,
                title: "Hundreds of data sources",
                body: "8 independent signal layers fan out across hundreds of underlying sources — registries, courts, banks, sanctions lists, news aggregators, cyber feeds, and more.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-[#0D9488]/10 flex items-center justify-center mb-3">
                  <item.icon size={18} className="text-[#0D9488]" />
                </div>
                <h3 className="text-sm font-semibold text-[#0F1F4B] mb-1.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Tier cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
            {/* Quick Check */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0F1F4B] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Quick Check</h3>
                <p className="text-sm text-gray-500">High-volume screening · fastest response</p>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold text-[#0F1F4B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>$2.50</span>
                <span className="text-sm text-gray-400"> / check</span>
              </div>
              <p className="text-xs text-[#0D9488] font-semibold mb-6">Down to $1.50/check on volume</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Corporate Registry — active, in good standing?",
                  "Insolvency & Liquidation — court proceedings?",
                  "Banking Restrictions — national bank flags?",
                  "Domain & Cyber Hygiene — digital red flags?",
                  "Same structured JSON output as Full tier",
                  "Confidence + coverage figures included",
                  "Cacheable — ideal for bulk screening",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={15} className="text-[#0D9488] mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block text-center py-3 px-6 border-2 border-[#0F1F4B] text-[#0F1F4B] rounded-lg font-semibold text-sm hover:bg-[#0F1F4B] hover:text-white transition-all duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Get started
              </Link>
            </div>

            {/* Full Risk Score */}
            <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: "#0F1F4B" }}>
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold bg-[#0D9488] text-white px-3 py-1 rounded-full" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>RECOMMENDED</span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Full Risk Score</h3>
                <p className="text-sm text-white/50">Onboarding · due diligence · compliance</p>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>$6.50</span>
                <span className="text-sm text-white/40"> / check</span>
              </div>
              <p className="text-xs text-[#2DD4BF] font-semibold mb-6">Down to $4.00/check on volume</p>
              <ul className="space-y-3 mb-8">
                {[
                  "All 8 signal layers — complete Israeli coverage",
                  "Sanctions, PEP & terror screening",
                  "Adverse media — Hebrew + global, AI-scored by Claude",
                  "Legal-entity identity (LEI cross-walk)",
                  "Market distress for public companies",
                  "Full evidence trail + per-finding confidence",
                  "MCP-native for AI agent integration",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <Check size={15} className="text-[#2DD4BF] mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block text-center py-3 px-6 bg-[#0D9488] text-white rounded-lg font-semibold text-sm hover:bg-[#0b8075] transition-all duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Get API key
              </Link>
            </div>
          </div>

          {/* Volume pricing table */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-center text-xl font-bold text-[#0F1F4B] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Volume pricing — the more you check, the less you pay
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-sm">
                <thead>
                  <tr style={{ background: "#0F1F4B" }}>
                    <th className="text-left px-6 py-3.5 text-xs font-bold text-white/60 uppercase tracking-wide">Monthly volume</th>
                    <th className="text-center px-6 py-3.5 text-xs font-bold text-white/60 uppercase tracking-wide">Quick Check</th>
                    <th className="text-center px-6 py-3.5 text-xs font-bold text-[#2DD4BF] uppercase tracking-wide">Full Risk Score</th>
                    <th className="text-center px-6 py-3.5 text-xs font-bold text-white/60 uppercase tracking-wide">Savings vs PAYG</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Pay-as-you-go", "$2.50", "$6.50", "—"],
                    ["500 checks / mo", "$2.00", "$5.50", "Up to 20% off"],
                    ["2,000 checks / mo", "$1.75", "$4.75", "Up to 30% off"],
                    ["10,000+ checks / mo", "$1.50", "$4.00", "Up to 40% off"],
                    ["Enterprise / custom", "Contact us", "Contact us", "Annual contracts available"],
                  ].map(([vol, quick, full, saving], i) => (
                    <tr key={vol} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-3.5 font-medium text-gray-800">{vol}</td>
                      <td className="px-6 py-3.5 text-center text-gray-600">{quick}</td>
                      <td className="px-6 py-3.5 text-center font-semibold text-[#0D9488]">{full}</td>
                      <td className="px-6 py-3.5 text-center text-xs text-gray-400">{saving}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">All prices per API call. Billed monthly. No setup fees.</p>
          </div>

          {/* vs competition callout */}
          <div className="max-w-3xl mx-auto mb-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-lg font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              How V-Safe compares to alternatives
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2.5 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Provider</th>
                    <th className="text-center py-2.5 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Price range</th>
                    <th className="text-center py-2.5 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Israeli gov sources</th>
                    <th className="text-center py-2.5 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Hebrew media</th>
                    <th className="text-center py-2.5 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Normalized score</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Dun & Bradstreet / Coface", "$15–$40/check", "✗", "✗", "Proprietary"],
                    ["Generic global KYB APIs", "$2–$8/check", "✗ (blocked)", "Weak", "Varies"],
                    ["DIY build", "High eng. cost", "Possible", "You build it", "Raw data"],
                    ["V-Safe", "$2.50–$6.50/check", "✅ Native", "✅ Native", "✅ 0–100 open schema"],
                  ].map(([provider, price, isr, heb, score], i) => (
                    <tr key={provider} className={`border-b border-gray-50 ${i === 3 ? "bg-[#0D9488]/5" : ""}`}>
                      <td className={`py-3 pr-4 font-medium ${i === 3 ? "text-[#0D9488] font-bold" : "text-gray-700"}`}>{provider}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{price}</td>
                      <td className="py-3 px-4 text-center">{isr}</td>
                      <td className="py-3 px-4 text-center">{heb}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#0F1F4B] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to get started?
            </h2>
            <p className="text-gray-500 mb-6">Book a 30-minute demo and see V-Safe run a live check on a real Israeli company — no commitment required.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary inline-flex">
                Book a demo <ArrowRight size={16} />
              </Link>
              <Link href="/docs" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0F1F4B] text-[#0F1F4B] rounded-lg font-semibold text-sm hover:bg-[#0F1F4B] hover:text-white transition-all duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Read the docs
              </Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
