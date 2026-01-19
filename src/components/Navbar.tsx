import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-neon-purple flex items-center justify-center font-display font-bold text-primary-foreground">
                P
              </div>
              <div className="absolute inset-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-neon-purple opacity-50 blur-lg group-hover:opacity-80 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-gradient-primary">
                PRAKARSH
              </span>
              <span className="text-xs text-muted-foreground -mt-1">2026</span>
            </div>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <a
              href="#events"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              Events
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              About
            </a>
          </div>

          {/* CTA Button */}
          <motion.a
            href="#events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-neon-blue text-primary-foreground font-display text-sm font-medium glow-primary"
          >
            Explore Events
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;