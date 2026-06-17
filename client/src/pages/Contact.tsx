import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Mail, Calendar, ArrowRight, Check } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", type: "demo" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link with form data
    const subject = encodeURIComponent(`V-Safe Inquiry: ${form.type === 'demo' ? 'Book a Demo' : form.type === 'api' ? 'Get API Key' : form.type === 'enterprise' ? 'Enterprise Pricing' : form.type === 'technical' ? 'Technical Question' : 'General Inquiry'}`);
    const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:sales@socalytix.io?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl">
            {/* Left */}
            <div>
              <p className="section-label mb-3">Contact</p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0F1F4B] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Let's talk risk intelligence.
              </h1>
              <p className="text-lg text-gray-600 mb-10">
                Whether you want to book a demo, get an API key, or discuss an enterprise plan — we're here.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0F1F4B]/5 flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1F4B] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Book a demo</h3>
                    <p className="text-sm text-gray-600">See V-Safe run a live check on a real Israeli company. 30-minute call, no commitment.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0F1F4B]/5 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1F4B] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Get in touch</h3>
                    <p className="text-sm text-gray-600">Questions about pricing, enterprise plans, or technical integration? Send us a message.</p>
                    <a href="mailto:sales@socalytix.io" className="inline-block mt-2 text-sm font-semibold text-[#0D9488] hover:underline">sales@socalytix.io</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[#0D9488]/10 flex items-center justify-center mb-4">
                    <Check size={28} className="text-[#0D9488]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F1F4B] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Message received</h3>
                  <p className="text-gray-600">We'll be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Request type</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488]"
                    >
                      <option value="demo">Book a demo</option>
                      <option value="api">Get an API key</option>
                      <option value="enterprise">Enterprise / volume pricing</option>
                      <option value="technical">Technical question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                      <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                      <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Work email</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Tell us about your use case..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] resize-none" />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    Send message <ArrowRight size={16} />
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    V-Safe provides decision-support intelligence, not legal advice. We screen companies, not individuals.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
