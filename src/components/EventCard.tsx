import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  index: number;
}

const neonColors = {
  cyan: { border: "hsl(195, 100%, 44%)", glow: "hsl(195, 100%, 44%, 0.4)" },
  blue: { border: "hsl(210, 100%, 60%)", glow: "hsl(210, 100%, 60%, 0.4)" },
  purple: { border: "hsl(270, 65%, 46%)", glow: "hsl(270, 65%, 46%, 0.4)" },
  pink: { border: "hsl(330, 100%, 61%)", glow: "hsl(330, 100%, 61%, 0.4)" },
  green: { border: "hsl(160, 100%, 53%)", glow: "hsl(160, 100%, 53%, 0.4)" },
  orange: { border: "hsl(20, 95%, 55%)", glow: "hsl(20, 95%, 55%, 0.4)" },
  red: { border: "hsl(0, 100%, 55%)", glow: "hsl(0, 100%, 55%, 0.4)" },
};

const neonTextClasses = {
  cyan: "text-neon-cyan",
  blue: "text-neon-blue",
  purple: "text-neon-purple",
  pink: "text-neon-pink",
  green: "text-neon-green",
  orange: "text-neon-orange",
  red: "text-neon-red",
};

const EventCard = ({ event, index }: EventCardProps) => {
  const colors = neonColors[event.neonColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/event/${event.id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="relative h-full group cursor-pointer"
          style={{
            filter: `drop-shadow(0 0 20px ${colors.glow})`,
          }}
        >
          {/* Main card with clip-path for notched corners */}
          <div
            className="relative h-full bg-background/95 backdrop-blur-xl p-6 overflow-hidden"
            style={{
              clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
              border: `2px solid ${colors.border}`,
            }}
          >
            {/* Corner decorations - Top Left */}
            <div className="absolute top-0 left-0">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M0 20 L20 0" stroke={colors.border} strokeWidth="2" />
                <circle cx="8" cy="8" r="3" fill={colors.border} />
                <path d="M0 35 L0 25" stroke={colors.border} strokeWidth="2" />
                <path d="M25 0 L35 0" stroke={colors.border} strokeWidth="2" />
              </svg>
            </div>

            {/* Corner decorations - Top Right */}
            <div className="absolute top-0 right-0">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M60 25 L60 35" stroke={colors.border} strokeWidth="2" />
                <path d="M25 0 L35 0" stroke={colors.border} strokeWidth="2" />
                <circle cx="52" cy="8" r="3" fill={colors.border} />
                <circle cx="52" cy="8" r="6" stroke={colors.border} strokeWidth="1" fill="none" />
              </svg>
            </div>

            {/* Corner decorations - Bottom Right */}
            <div className="absolute bottom-0 right-0">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M60 40 L40 60" stroke={colors.border} strokeWidth="2" />
                <path d="M60 25 L60 35" stroke={colors.border} strokeWidth="2" />
                <path d="M25 60 L35 60" stroke={colors.border} strokeWidth="2" />
              </svg>
            </div>

            {/* Corner decorations - Bottom Left */}
            <div className="absolute bottom-0 left-0">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M0 25 L0 35" stroke={colors.border} strokeWidth="2" />
                <path d="M25 60 L35 60" stroke={colors.border} strokeWidth="2" />
                <circle cx="8" cy="52" r="3" fill={colors.border} />
              </svg>
            </div>

            {/* Badge at top */}
            <div 
              className="absolute -top-px left-1/2 transform -translate-x-1/2 px-4 py-1 text-xs font-display font-bold tracking-wider"
              style={{
                backgroundColor: colors.border,
                color: "hsl(240, 15%, 3%)",
                clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)",
              }}
            >
              EVENT
            </div>

            {/* Hexagon pattern overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg width="100%" height="100%">
                <pattern id={`hex-${event.id}`} width="30" height="26" patternUnits="userSpaceOnUse">
                  <polygon 
                    points="15,0 30,7.5 30,22.5 15,30 0,22.5 0,7.5" 
                    fill="none" 
                    stroke={colors.border} 
                    strokeWidth="0.5"
                    transform="translate(0, -2)"
                  />
                </pattern>
                <rect width="100%" height="100%" fill={`url(#hex-${event.id})`} />
              </svg>
            </div>

            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div 
                className="absolute w-full h-[2px] animate-scan"
                style={{ backgroundColor: colors.border }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 pt-4">
              {/* Event name */}
              <h3 
                className={`font-display text-xl font-bold mb-3 uppercase tracking-wider ${neonTextClasses[event.neonColor]} group-hover:animate-flicker`}
              >
                {event.name}
              </h3>

              {/* Horizontal line decoration */}
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="h-[2px] flex-1"
                  style={{ backgroundColor: colors.border }}
                />
                <div 
                  className="w-2 h-2 rotate-45"
                  style={{ backgroundColor: colors.border }}
                />
              </div>

              {/* Tagline */}
              <p className="text-foreground/80 text-sm leading-relaxed mb-4 font-body">
                {event.tagline}
              </p>

              {/* Status indicator */}
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.border }}
                />
                <div className="flex gap-[2px]">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-3 animate-pulse"
                      style={{
                        backgroundColor: colors.border,
                        animationDelay: `${i * 0.1}s`,
                        opacity: 0.3 + i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-2">
                {event.keywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 text-xs font-display font-medium uppercase tracking-wider"
                    style={{
                      border: `1px solid ${colors.border}`,
                      color: colors.border,
                      backgroundColor: `${colors.border}10`,
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Bottom tech decoration */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-foreground/10">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 border-2 rotate-45"
                    style={{ borderColor: colors.border }}
                  />
                  <span className="text-xs text-foreground/50 font-display tracking-widest">
                    PRAKARSH.26
                  </span>
                </div>
                <motion.div
                  className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="text-xs font-display tracking-wider" style={{ color: colors.border }}>
                    ENTER
                  </span>
                  <span style={{ color: colors.border }}>→</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
