/* V-Safe Navbar — Clean Signal design system
 * Transparent on hero, transitions to white/blur on scroll
 * Navy primary, teal accent
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const LOGO_DARK = "/manus-storage/vsafe-logo-dark_e44422cd.png";
const LOGO_PRIMARY = "/manus-storage/vsafe-logo-primary_510e0c45.png";

const navLinks = [
  { label: "Product", href: "/" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
];

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
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={isDark ? LOGO_DARK : LOGO_PRIMARY}
              alt="V-Safe"
              className="h-9 w-auto object-contain"
            />
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
