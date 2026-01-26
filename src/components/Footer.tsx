import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="about" className="relative py-20 px-6">
      {/* Background */}
      <div className="absolute inset-0 hex-grid opacity-10" />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Main footer frame */}
        <div className="relative p-8 md:p-12">
          {/* Outer notched border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath:
                "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)",
              border: "1px solid hsl(var(--border) / 0.3)",
              background: "hsl(var(--background) / 0.4)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent/50" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent/50" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/50" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 flex items-center justify-center font-display font-bold text-lg text-primary-foreground"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                    clipPath:
                      "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)",
                  }}
                >
                  P
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gradient-primary">
                    PRAKARSH '26
                  </h3>
                  <p className="text-xs text-neon-green font-display tracking-widest">
                    TECH FESTIVAL
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                The annual tech fest bringing together the brightest minds for
                innovation, competition, and collaboration.
              </p>

              {/* Data lines decoration */}
              <div className="flex gap-2 mt-6">
                <div className="h-[2px] w-12 bg-primary/50" />
                <div className="h-[2px] w-6 bg-accent/50" />
                <div className="h-[2px] w-3 bg-neon-green/50" />
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-display font-bold text-lg mb-6 text-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-primary" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "Technical Events", href: "/category/technical" },
                  { label: "Non-Technical Events", href: "/category/non-technical" },
                  { label: "Workshops", href: "/category/workshop" },
                  { label: "Esports", href: "/category/esports" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <span className="w-0 h-[1px] bg-primary group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Event Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-display font-bold text-lg mb-6 text-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-accent" />
                Event Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Technical", color: "primary", href: "/category/technical" },
                  { name: "Non-Technical", color: "accent", href: "/category/non-technical" },
                  { name: "Workshops", color: "secondary", href: "/category/workshop" },
                  { name: "Esports", color: "neon-green", href: "/category/esports" },
                ].map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    className={`px-3 py-1.5 text-xs font-display font-medium tracking-wider border border-${category.color}/40 text-${category.color} hover:bg-${category.color}/10 transition-colors cursor-pointer`}
                    style={{
                      clipPath:
                        "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
                    }}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-neon-green animate-pulse" />
            <p className="text-sm text-muted-foreground font-display tracking-wide">
              © 2026 Prakarsh Tech Fest. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <div className="w-1 h-1 bg-border" />
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
