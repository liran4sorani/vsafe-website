/* V-Safe Navbar — Clean Signal design system
 * Transparent on hero, transitions to white/blur on scroll
 * Navy primary, teal accent
 * Logo: inline SVG — works on dark hero AND white scrolled nav
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Product", href: "/" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
];

/** Inline SVG logo — shield + V mark + risk gauge arc + wordmark
 *  wordmarkColor adapts to background so it's always legible
 */
function VSafeLogo({ isDark }: { isDark: boolean }) {
  const wordmark = isDark ? "#FFFFFF" : "#0F1F4B";
  return (
    <svg
      viewBox="0 0 220 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-11 w-auto"
      aria-label="V-Safe"
    >
      {/* ── Shield body ── */}
      <path
        d="M26 4 L46 10 L46 28 C46 38 36 46 26 49 C16 46 6 38 6 28 L6 10 Z"
        fill="#0F1F4B"
      />
      {/* ── V mark in teal ── */}
      <path
        d="M14 14 L26 36 L38 14"
        stroke="#2DD4BF"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* ── Risk gauge arc (green → amber → red) ── */}
      <path d="M13 43 Q26 38 39 43" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M22 45.5 Q26 43 30 45.5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M30 45.5 Q34 43 39 43" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* ── Wordmark ── */}
      <text
        x="56"
        y="34"
        fontFamily="'Space Grotesk', 'Inter', system-ui, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill={wordmark}
        letterSpacing="-0.5"
      >
        V-Safe
      </text>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = isHomePage && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <VSafeLogo isDark={isDark} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 ${
                  isDark
                    ? "text-white/80 hover:text-white"
                    : "text-gray-600 hover:text-[#0F1F4B]"
                } ${location === link.href ? (isDark ? "text-white" : "text-[#0F1F4B]") : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className={`text-sm font-semibold transition-colors ${
                isDark ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-[#0F1F4B]"
              }`}
            >
              Book a demo
            </Link>
            <Link
              href="/docs"
              className={`text-sm font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
                isDark
                  ? "bg-white text-[#0F1F4B] hover:bg-white/90"
                  : "bg-[#0F1F4B] text-white hover:bg-[#1a2f6b]"
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Get API Key
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 rounded-md ${isDark ? "text-white" : "text-[#0F1F4B]"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-2 text-sm font-medium text-gray-700 hover:text-[#0F1F4B] border-b border-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Link
                href="/contact"
                className="py-2.5 text-center text-sm font-semibold text-[#0F1F4B] border border-[#0F1F4B] rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                Book a demo
              </Link>
              <Link
                href="/docs"
                className="py-2.5 text-center text-sm font-semibold bg-[#0F1F4B] text-white rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                Get API Key
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
