import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getEventById } from "@/data/events";
import ParticleField from "@/components/ParticleField";

const neonColorClasses = {
  cyan: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
  blue: "text-neon-blue border-neon-blue/30 bg-neon-blue/10",
  purple: "text-neon-purple border-neon-purple/30 bg-neon-purple/10",
  pink: "text-neon-pink border-neon-pink/30 bg-neon-pink/10",
  green: "text-neon-green border-neon-green/30 bg-neon-green/10",
  orange: "text-neon-orange border-neon-orange/30 bg-neon-orange/10",
  red: "text-neon-red border-neon-red/30 bg-neon-red/10",
};

const neonGradientClasses = {
  cyan: "from-neon-cyan/20 via-neon-cyan/5 to-transparent",
  blue: "from-neon-blue/20 via-neon-blue/5 to-transparent",
  purple: "from-neon-purple/20 via-neon-purple/5 to-transparent",
  pink: "from-neon-pink/20 via-neon-pink/5 to-transparent",
  green: "from-neon-green/20 via-neon-green/5 to-transparent",
  orange: "from-neon-orange/20 via-neon-orange/5 to-transparent",
  red: "from-neon-red/20 via-neon-red/5 to-transparent",
};

const neonGlowClasses = {
  cyan: "shadow-[0_0_60px_hsl(195,100%,44%,0.3)]",
  blue: "shadow-[0_0_60px_hsl(210,100%,60%,0.3)]",
  purple: "shadow-[0_0_60px_hsl(270,65%,46%,0.3)]",
  pink: "shadow-[0_0_60px_hsl(330,100%,61%,0.3)]",
  green: "shadow-[0_0_60px_hsl(160,100%,53%,0.3)]",
  orange: "shadow-[0_0_60px_hsl(20,95%,55%,0.3)]",
  red: "shadow-[0_0_60px_hsl(0,100%,55%,0.3)]",
};

const neonBorderColors = {
  cyan: "hsl(195, 100%, 44%)",
  blue: "hsl(210, 100%, 60%)",
  purple: "hsl(270, 65%, 46%)",
  pink: "hsl(330, 100%, 61%)",
  green: "hsl(160, 100%, 53%)",
  orange: "hsl(20, 95%, 55%)",
  red: "hsl(0, 100%, 55%)",
};

const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = getEventById(eventId || "");

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Event Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const borderColor = neonBorderColors[event.neonColor];

  return (
    <div className="min-h-screen relative">
      <ParticleField />

      {/* Background decorations */}
      <div className="absolute inset-0 hex-grid opacity-20" />
      <div className={`absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b ${neonGradientClasses[event.neonColor]}`} />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 bg-background/80 backdrop-blur-xl border border-border text-foreground hover:text-primary hover:border-primary/50 transition-all"
          style={{
            clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
          }}
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-display tracking-wider">BACK</span>
        </Link>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Event header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Status badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 border"
              style={{ borderColor: borderColor, backgroundColor: `${borderColor}10` }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: borderColor }} />
              <span className="text-xs font-display tracking-widest uppercase" style={{ color: borderColor }}>
                PRAKARSH '26 EVENT
              </span>
            </div>

            {/* Event name */}
            <h1 className={`font-display text-5xl md:text-7xl font-black mb-6 ${neonColorClasses[event.neonColor].split(" ")[0]}`}>
              {event.name}
            </h1>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[2px] w-20" style={{ background: `linear-gradient(to right, transparent, ${borderColor})` }} />
              <div className="w-3 h-3 rotate-45" style={{ border: `2px solid ${borderColor}` }} />
              <div className="h-[2px] w-20" style={{ background: `linear-gradient(to left, transparent, ${borderColor})` }} />
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-foreground/80 font-medium mb-10 max-w-2xl mx-auto">
              {event.tagline}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap justify-center gap-3">
              {event.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-4 py-2 text-sm font-display font-medium tracking-wider"
                  style={{
                    border: `1px solid ${borderColor}`,
                    color: borderColor,
                    backgroundColor: `${borderColor}10`,
                    clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Event description card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative p-8 md:p-12 bg-background/80 backdrop-blur-xl border mb-8 ${neonGlowClasses[event.neonColor]}`}
            style={{
              borderColor: `${borderColor}50`,
              clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
            }}
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor }} />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2" style={{ borderColor }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2" style={{ borderColor }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor }} />
            
            <h2 className="font-display text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
              <div className="w-2 h-6" style={{ backgroundColor: borderColor }} />
              About the Event
            </h2>
            <div className="space-y-4">
              {event.description.map((paragraph, index) => (
                <p key={index} className="text-foreground/80 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Poster elements */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative p-8 md:p-12 bg-background/60 backdrop-blur-xl border border-border/30 mb-8"
            style={{
              clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
            }}
          >
            <h2 className="font-display text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
              <div className="w-2 h-6 bg-accent" />
              Event Highlights
            </h2>
            <ul className="space-y-4">
              {event.posterElements.map((element, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span 
                    className="w-2 h-2 mt-2 flex-shrink-0 rotate-45"
                    style={{ backgroundColor: borderColor }}
                  />
                  <span className="text-foreground/70 leading-relaxed">{element}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Theme colors info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-8 bg-background/40 backdrop-blur-xl border border-border/20"
            style={{
              clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            }}
          >
            <h2 className="font-display text-xl font-bold mb-4 text-foreground flex items-center gap-3">
              <div className="w-2 h-5 bg-secondary" />
              Theme & Aesthetics
            </h2>
            <p className="text-foreground/70">{event.colors}</p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-12 py-4 font-display font-bold text-lg overflow-hidden group"
              style={{
                border: `2px solid ${borderColor}`,
                color: borderColor,
                clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
              }}
            >
              <span className="relative z-10">Register Now</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: borderColor }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
