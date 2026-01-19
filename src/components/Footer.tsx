import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer id="about" className="relative py-16 px-6 border-t border-border/30">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-neon-purple flex items-center justify-center font-display font-bold text-xl text-primary-foreground">
                P
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-gradient-primary">
                  PRAKARSH '26
                </h3>
                <p className="text-xs text-muted-foreground">Tech Festival</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The annual tech fest bringing together the brightest minds for 
              innovation, competition, and collaboration.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display font-bold text-lg mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "Events", "Schedule", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
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
            <h4 className="font-display font-bold text-lg mb-4 text-foreground">
              Event Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {["AI/ML", "Cybersecurity", "Design", "Gaming", "Hardware", "Finance"].map(
                (category) => (
                  <span
                    key={category}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {category}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Prakarsh Tech Fest. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
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