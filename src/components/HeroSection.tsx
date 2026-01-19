import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Hex grid overlay */}
      <div className="absolute inset-0 hex-grid opacity-40" />
      
      {/* Grid lines */}
      <div className="absolute inset-0 grid-overlay opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 mb-10 border border-primary/30 bg-primary/5 backdrop-blur-sm"
          style={{
            clipPath: "polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-sm font-display font-medium text-primary tracking-widest uppercase">
            Tech Festival 2026
          </span>
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tight">
            <span className="text-gradient-primary">PRAKARSH</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-primary" />
            <span className="font-display text-4xl md:text-6xl font-bold text-foreground/90">'26</span>
            <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-accent" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-8 left-1/4 w-3 h-3 border-2 border-neon-orange rotate-45" />
          <div className="absolute -bottom-4 right-1/3 w-2 h-2 bg-neon-green" />
          <div className="absolute top-1/2 -right-4 w-4 h-4 border border-accent rounded-full" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The ultimate tech extravaganza. <span className="text-primary">16 mind-bending events</span> across AI, cybersecurity, 
          design, gaming, and beyond. Are you ready to push the boundaries?
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-4 font-display font-bold text-lg overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, hsl(195 100% 44%) 0%, hsl(330 100% 61%) 50%, hsl(270 65% 46%) 100%)",
              clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
              boxShadow: "0 0 30px hsl(195 100% 44% / 0.4), 0 0 60px hsl(330 100% 61% / 0.2)",
            }}
          >
            <span className="relative z-10 text-primary-foreground">View All Events</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-4 font-display font-medium text-lg border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 transition-all"
            style={{
              clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            }}
          >
            Learn More
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-8 md:gap-16 mt-20"
        >
          {[
            { value: "16", label: "Events", color: "text-primary" },
            { value: "1000+", label: "Participants", color: "text-accent" },
            { value: "50K+", label: "Prize Pool", color: "text-secondary" },
          ].map((stat, index) => (
            <div key={index} className="text-center relative">
              <div className={`font-display text-4xl md:text-5xl font-black ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-display tracking-wider uppercase mt-1">{stat.label}</div>
              {index < 2 && (
                <div className="absolute top-1/2 -right-4 md:-right-8 w-[1px] h-8 bg-border hidden md:block" />
              )}
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
            <span className="text-xs text-muted-foreground font-display tracking-widest uppercase">Scroll to explore</span>
            <div 
              className="w-6 h-12 border-2 border-primary/30 flex items-start justify-center p-2"
              style={{ clipPath: "polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))" }}
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-primary"
                style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
