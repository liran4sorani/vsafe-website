import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Check, ArrowRight } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="section-label mb-3">Pricing</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Simple, usage-based pricing
            </h1>
            <p className="text-lg text-gray-600">
              Pay per check. No monthly minimums for getting started. Volume pricing available for enterprise teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {/* Quick Check */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0F1F4B] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Quick Check</h3>
                <p className="text-sm text-gray-500">High-volume fast screening</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#0F1F4B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>From $X</span>
                <span className="text-sm text-gray-400"> / check</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Corporate Registry", "Insolvency & Liquidation", "Banking Restrictions", "Domain & Cyber Hygiene", "Same structured JSON output", "Confidence + coverage figures"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={15} className="text-[#0D9488] mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/docs" className="block text-center py-3 px-6 border-2 border-[#0F1F4B] text-[#0F1F4B] rounded-lg font-semibold text-sm hover:bg-[#0F1F4B] hover:text-white transition-all duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                <p className="text-sm text-white/50">Onboarding, due diligence, compliance</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>From $X</span>
                <span className="text-sm text-white/40"> / check</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["All 8 signal layers", "Sanctions, PEP & terror screening", "Adverse media (AI-scored by Claude)", "Legal-entity identity (LEI)", "Market distress for public companies", "Full evidence trail + confidence"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <Check size={15} className="text-[#2DD4BF] mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/docs" className="block text-center py-3 px-6 bg-[#0D9488] text-white rounded-lg font-semibold text-sm hover:bg-[#0b8075] transition-all duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Get API key
              </Link>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-500 mb-6">Need volume pricing or a custom enterprise plan?</p>
            <Link href="/contact" className="btn-primary inline-flex">
              Contact us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
