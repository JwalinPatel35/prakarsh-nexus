import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Hex grid overlay */}
      <div className="absolute inset-0 hex-grid opacity-30" />

      {/* Grid lines */}
      <div className="absolute inset-0 grid-overlay opacity-20" />

      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Main HUD Frame Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative p-8 md:p-12 lg:p-16"
        >
          {/* Outer notched border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath:
                "polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)",
              border: "1px solid hsl(var(--primary) / 0.25)",
              background: "hsl(var(--background) / 0.4)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />

          {/* Top label strip */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative px-6 py-2"
              style={{
                background: "hsl(var(--background) / 0.8)",
                border: "1px solid hsl(var(--neon-green) / 0.5)",
                clipPath:
                  "polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs font-display font-medium text-neon-green tracking-widest uppercase">
                  Tech Festival 2026
                </span>
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative">
            {/* Main title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tight">
                <span className="text-gradient-primary">PRAKARSH</span>
              </h1>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-primary" />
                <span className="font-display text-3xl md:text-5xl font-bold text-foreground/90">
                  '26
                </span>
                <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-accent" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              The ultimate tech extravaganza.{" "}
              <span className="text-primary">16 mind-bending events</span> across
              AI, cybersecurity, design, gaming, and beyond.
            </motion.p>

            {/* Category Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {[
                { label: "Technical", href: "/category/technical", color: "cyan" },
                {
                  label: "Non-Technical",
                  href: "/category/non-technical",
                  color: "pink",
                },
                { label: "Workshops", href: "/category/workshop", color: "purple" },
                { label: "Esports", href: "/category/esports", color: "green" },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.href}
                  className="group relative px-5 py-2.5 font-display text-sm font-medium tracking-wider transition-all hover:scale-105"
                  style={{
                    border: `1px solid hsl(var(--neon-${cat.color}) / 0.4)`,
                    color: `hsl(var(--neon-${cat.color}))`,
                    clipPath:
                      "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                  }}
                >
                  <span className="relative z-10">{cat.label}</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{ background: `hsl(var(--neon-${cat.color}))` }}
                  />
                </Link>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#events"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-4 font-display font-bold text-lg overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--secondary)) 100%)",
                  clipPath:
                    "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                  boxShadow:
                    "0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--accent) / 0.2)",
                }}
              >
                <span className="relative z-10 text-primary-foreground">
                  View All Events
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-4 font-display font-medium text-lg text-foreground transition-all"
                style={{
                  border: "1px solid hsl(var(--primary) / 0.4)",
                  clipPath:
                    "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
                }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats - Outside main frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center gap-6 md:gap-12 mt-12"
        >
          {[
            { value: "16", label: "Events", color: "primary" },
            { value: "1000+", label: "Participants", color: "accent" },
            { value: "50K+", label: "Prize Pool", color: "secondary" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative px-6 py-4"
              style={{
                border: "1px solid hsl(var(--border) / 0.3)",
                clipPath:
                  "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
              }}
            >
              <div
                className={`font-display text-3xl md:text-4xl font-black text-${stat.color}`}
              >
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-display tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs text-muted-foreground font-display tracking-widest uppercase">
              Scroll to explore
            </span>
            <div
              className="w-6 h-10 border border-primary/30 flex items-start justify-center p-2"
              style={{
                clipPath:
                  "polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))",
              }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-2 bg-primary"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
