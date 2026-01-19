import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  index: number;
}

const neonColorClasses = {
  cyan: "from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/30 hover:border-neon-cyan/60 hover:shadow-[0_0_30px_hsl(185,100%,50%,0.3)]",
  blue: "from-neon-blue/20 to-neon-blue/5 border-neon-blue/30 hover:border-neon-blue/60 hover:shadow-[0_0_30px_hsl(210,100%,60%,0.3)]",
  purple: "from-neon-purple/20 to-neon-purple/5 border-neon-purple/30 hover:border-neon-purple/60 hover:shadow-[0_0_30px_hsl(270,100%,65%,0.3)]",
  pink: "from-neon-pink/20 to-neon-pink/5 border-neon-pink/30 hover:border-neon-pink/60 hover:shadow-[0_0_30px_hsl(320,100%,60%,0.3)]",
  green: "from-neon-green/20 to-neon-green/5 border-neon-green/30 hover:border-neon-green/60 hover:shadow-[0_0_30px_hsl(150,100%,50%,0.3)]",
  orange: "from-neon-orange/20 to-neon-orange/5 border-neon-orange/30 hover:border-neon-orange/60 hover:shadow-[0_0_30px_hsl(25,100%,55%,0.3)]",
  red: "from-neon-red/20 to-neon-red/5 border-neon-red/30 hover:border-neon-red/60 hover:shadow-[0_0_30px_hsl(0,100%,55%,0.3)]",
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/event/${event.id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative overflow-hidden rounded-xl p-6 
            bg-gradient-to-br ${neonColorClasses[event.neonColor]}
            border backdrop-blur-xl
            transition-all duration-300 cursor-pointer
            group h-full
          `}
        >
          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[scan_2s_linear_infinite]" />
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-current opacity-30" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-current opacity-30" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-current opacity-30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-current opacity-30" />

          {/* Icon */}
          <div className="text-4xl mb-4">{event.icon}</div>

          {/* Event name */}
          <h3 className={`font-display text-xl font-bold mb-2 ${neonTextClasses[event.neonColor]} group-hover:animate-pulse`}>
            {event.name}
          </h3>

          {/* Tagline */}
          <p className="text-foreground/80 text-sm leading-relaxed mb-4">
            {event.tagline}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2">
            {event.keywords.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  bg-background/50 border border-current/20
                  ${neonTextClasses[event.neonColor]}
                `}
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Hover arrow */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <span className={`text-2xl ${neonTextClasses[event.neonColor]}`}>→</span>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default EventCard;