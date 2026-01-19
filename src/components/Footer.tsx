import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer id="about" className="relative py-20 px-6 border-t border-border/30">
      {/* Background */}
      <div className="absolute inset-0 hex-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 flex gap-1">
        <div className="w-6 h-[2px] bg-primary" />
        <div className="w-2 h-[2px] bg-accent" />
      </div>
      <div className="absolute top-8 right-8 flex gap-1">
        <div className="w-2 h-[2px] bg-accent" />
        <div className="w-6 h-[2px] bg-primary" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-14 h-14 flex items-center justify-center font-display font-bold text-xl text-primary-foreground"
                style={{
                  background: "linear-gradient(135deg, hsl(195 100% 44%) 0%, hsl(270 65% 46%) 100%)",
                  clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)",
                }}
              >
                P
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-gradient-primary">
                  PRAKARSH '26
                </h3>
                <p className="text-xs text-neon-green font-display tracking-widest">TECH FESTIVAL</p>
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
              {["Home", "Events", "Schedule", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-0 h-[1px] bg-primary group-hover:w-4 transition-all duration-300" />
                    {link}
                  </a>
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
                { name: "AI/ML", color: "border-primary text-primary" },
                { name: "Cybersecurity", color: "border-accent text-accent" },
                { name: "Design", color: "border-secondary text-secondary" },
                { name: "Gaming", color: "border-neon-green text-neon-green" },
                { name: "Hardware", color: "border-neon-orange text-neon-orange" },
                { name: "Finance", color: "border-primary text-primary" },
              ].map((category) => (
                <span
                  key={category.name}
                  className={`px-3 py-1.5 text-xs font-display font-medium tracking-wider border bg-transparent hover:bg-current/10 transition-colors cursor-pointer ${category.color}`}
                  style={{
                    clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
                  }}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
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
