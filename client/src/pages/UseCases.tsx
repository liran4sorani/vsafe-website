import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Shield, Landmark, Search, Bot, BarChart2, ArrowRight } from "lucide-react";

const useCases = [
  {
    icon: Shield,
    title: "Compliance & KYB Teams",
    subtitle: "Screen new counterparties before onboarding",
    body: "V-Safe gives compliance and AML teams a single, auditable verdict on any Israeli company — covering registry status, insolvency, banking restrictions, sanctions, adverse media, and more. Every score comes with linked evidence and a confidence figure, so your decision is defensible and documented.",
    bullets: ["Auditable evidence trail for every decision", "Sanctions, PEP & terror screening included", "Covers Israeli government sources others can't reach", "Entity-level (company) screening — not individual consumer data"],
  },
  {
    icon: Landmark,
    title: "Lenders, Fintechs & Payment Platforms",
    subtitle: "Score business applicants in seconds during underwriting",
    body: "Integrate V-Safe into your onboarding or underwriting flow to get a structured risk verdict on any Israeli business applicant before you extend credit or open an account. Fast, cacheable Quick Checks for high-volume screening; Full Risk Scores for detailed due diligence.",
    bullets: ["Seconds to a structured risk verdict", "Two tiers: Quick Check for volume, Full Score for depth", "Same JSON schema — easy to integrate into any workflow", "Graceful degradation — missing sources never break the call"],
  },
  {
    icon: Search,
    title: "Due Diligence & Risk Analysts",
    subtitle: "Fast pre-deal, vendor, and supplier checks",
    body: "Run rapid due diligence on Israeli entities before deals, vendor onboarding, or supplier qualification. V-Safe surfaces insolvency proceedings, adverse media, banking restrictions, and sanctions in one structured call — saving hours of manual research.",
    bullets: ["8 independent risk layers in one call", "Hebrew-language adverse media, AI-scored", "Market distress signals for listed companies", "Legal-entity identity cross-walk (LEI)"],
  },
  {
    icon: Bot,
    title: "AI Agents & Automation Builders",
    subtitle: "Give your LLM agent a live, structured risk tool over MCP",
    body: "V-Safe is MCP-native — drop it into your LangChain, CrewAI, or custom agent and it just works. No scraping, no glue code, no custom parsing. The output is schema-strict and standards-aligned so your agent can reason over the structured result immediately.",
    bullets: ["MCP tool exposure for LLM agents", "Schema-strict JSON — no parsing required", "Standards-aligned (FollowTheMoney + schema.org)", "Works in Hebrew and English"],
  },
  {
    icon: BarChart2,
    title: "RevOps, Sales & Procurement",
    subtitle: "Enrich CRM records and vendor lists with a risk flag",
    body: "Automatically enrich your CRM or vendor management system with a risk flag on every Israeli company in your pipeline. Catch high-risk counterparties before they become problems — not after.",
    bullets: ["Lightweight Quick Check for bulk enrichment", "Risk band (LOW / MEDIUM / HIGH) for easy filtering", "Integrate via REST API into any CRM or workflow tool", "No procurement overhead — API key and go"],
  },
];

export default function UseCases() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="section-label mb-3">Use Cases</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F1F4B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Who uses V-Safe — and why
            </h1>
            <p className="text-lg text-gray-600">
              V-Safe is built for any team that needs to assess the risk of an Israeli company — from compliance officers to AI builders.
            </p>
          </div>

          <div className="space-y-8">
            {useCases.map((uc, i) => (
              <div key={uc.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#0F1F4B]/5 flex items-center justify-center">
                        <uc.icon size={20} className="text-[#0D9488]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#0F1F4B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{uc.title}</h2>
                        <p className="text-sm text-[#0D9488] font-medium">{uc.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">{uc.body}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Key benefits</h4>
                    <ul className="space-y-2">
                      {uc.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-[#0D9488] mt-0.5">✓</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-gray-500 mb-6">Ready to see V-Safe in action for your use case?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs" className="btn-primary inline-flex">Get an API key <ArrowRight size={16} /></Link>
              <Link href="/contact" className="btn-teal inline-flex">Book a demo <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
