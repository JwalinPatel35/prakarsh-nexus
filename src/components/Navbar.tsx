import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Technical", href: "/category/technical" },
  { label: "Non-Technical", href: "/category/non-technical" },
  { label: "Workshops", href: "/category/workshop" },
  { label: "Esports", href: "/category/esports" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main navbar frame - transparent with HUD styling */}
        <div className="relative">
          {/* Outer notched border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath:
                "polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)",
              border: "1px solid hsl(var(--primary) / 0.3)",
              background: "hsl(var(--background) / 0.6)",
              backdropFilter: "blur(12px)",
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-accent" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-accent" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary" />

          {/* Inner content */}
          <div className="relative flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative">
                <div
                  className="w-10 h-10 flex items-center justify-center font-display font-bold text-primary-foreground relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                    clipPath:
                      "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)",
                  }}
                >
                  P
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div
                  className="absolute inset-0 w-10 h-10 opacity-50 blur-lg group-hover:opacity-80 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-gradient-primary">
                  PRAKARSH
                </span>
                <span className="text-xs text-accent font-display tracking-widest -mt-1">
                  '26
                </span>
              </div>
            </Link>

            {/* Desktop Navigation links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="relative px-4 py-2 text-sm font-display font-medium text-foreground/70 hover:text-primary transition-colors group"
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Hover underline */}
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <motion.a
                href="#events"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block relative px-6 py-2 font-display text-sm font-medium overflow-hidden group"
                style={{
                  border: "1px solid hsl(var(--primary) / 0.5)",
                  clipPath:
                    "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                }}
              >
                <span className="relative z-10 text-primary">Explore Events</span>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 relative"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath:
                  "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
                border: "1px solid hsl(var(--primary) / 0.3)",
                background: "hsl(var(--background) / 0.9)",
                backdropFilter: "blur(12px)",
              }}
            />
            <div className="relative p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-display font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
