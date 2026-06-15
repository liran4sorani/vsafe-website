import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Globe, Shield, Eye, Bot, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container">
          {/* Hero */}
          <div className="max-w-3xl mb-16">
            <p className="section-label mb-3">About V-Safe</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F1F4B] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Built to answer one hard question: how risky is this Israeli company?
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-4">
              V-Safe is an Israeli company risk-scoring API — purpose-built for the Israeli market, with access to government sources that foreign providers structurally cannot reach.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We built V-Safe because existing KYB tools treat Israel as an afterthought. They miss the insolvency register. They can't read Hebrew press. They don't know about banking restrictions. We built the tool we wished existed — and then made it available as an API.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { icon: Globe, title: "Israeli-native infrastructure", body: "We run on Israeli cloud infrastructure. This isn't a preference — it's what enables us to query IP-restricted government sources that no foreign provider can reach." },
              { icon: Eye, title: "Evidence over assertion", body: "Every score we return comes with its receipts. Linked source URLs, publisher, snippet, timestamp. You should always be able to see why a score is what it is." },
              { icon: Shield, title: "Honest about uncertainty", body: "If a source is unavailable, we say so. We mark the layer unavailable and exclude it from the score. We never fabricate a 'clean' result to make the coverage figure look better." },
              { icon: Bot, title: "Built for the AI era", body: "We designed V-Safe to be consumed by AI agents from day one — schema-strict output, MCP exposure, standards-aligned JSON. Risk intelligence should be a tool an LLM can call, not a PDF it has to read." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-[#0D9488]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0F1F4B] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-12 max-w-2xl">
            <h3 className="text-sm font-bold text-[#0F1F4B] mb-2 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A note on what V-Safe is — and isn't</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              V-Safe provides decision-support intelligence, not legal or regulatory advice. Our scores are based on publicly available and authoritative sources, but they are not a substitute for professional legal, compliance, or financial advice. V-Safe screens companies (entities), not individuals — this is a deliberate design choice that also protects individual privacy.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary inline-flex">Contact us <ArrowRight size={16} /></Link>
            <Link href="/docs" className="btn-teal inline-flex">Read the docs <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
