import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className="flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-xl border border-border"
          style={{
            clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="relative">
              <div 
                className="w-10 h-10 flex items-center justify-center font-display font-bold text-primary-foreground relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(195 100% 44%) 0%, hsl(270 65% 46%) 100%)",
                  clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)",
                }}
              >
                P
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div 
                className="absolute inset-0 w-10 h-10 opacity-50 blur-lg group-hover:opacity-80 transition-opacity"
                style={{ background: "linear-gradient(135deg, hsl(195 100% 44%) 0%, hsl(270 65% 46%) 100%)" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-gradient-primary">
                PRAKARSH
              </span>
              <span className="text-xs text-neon-green font-display tracking-widest -mt-1">'26</span>
            </div>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "Events", href: "#events" },
              { label: "About", href: "#about" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="relative text-sm font-medium text-foreground/70 hover:text-primary transition-colors group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-2 font-display text-sm font-medium overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, hsl(195 100% 44%) 0%, hsl(330 100% 61%) 100%)",
              clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
            }}
          >
            <span className="relative z-10 text-primary-foreground">Explore Events</span>
            <div className="absolute inset-0 bg-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
