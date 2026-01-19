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
  cyan: "shadow-[0_0_60px_hsl(185,100%,50%,0.3)]",
  blue: "shadow-[0_0_60px_hsl(210,100%,60%,0.3)]",
  purple: "shadow-[0_0_60px_hsl(270,100%,65%,0.3)]",
  pink: "shadow-[0_0_60px_hsl(320,100%,60%,0.3)]",
  green: "shadow-[0_0_60px_hsl(150,100%,50%,0.3)]",
  orange: "shadow-[0_0_60px_hsl(25,100%,55%,0.3)]",
  red: "shadow-[0_0_60px_hsl(0,100%,55%,0.3)]",
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

  return (
    <div className="min-h-screen relative">
      <ParticleField />

      {/* Hero gradient */}
      <div className={`absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b ${neonGradientClasses[event.neonColor]}`} />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 text-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
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
            className="text-center mb-12"
          >
            {/* Icon */}
            <div className="text-7xl mb-6">{event.icon}</div>

            {/* Event name */}
            <h1 className={`font-display text-5xl md:text-7xl font-black mb-4 ${neonColorClasses[event.neonColor].split(" ")[0]}`}>
              {event.name}
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-foreground/80 font-medium mb-8">
              {event.tagline}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap justify-center gap-3">
              {event.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className={`px-4 py-2 text-sm font-display font-medium rounded-full border ${neonColorClasses[event.neonColor]}`}
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
            className={`rounded-2xl p-8 md:p-12 bg-card/80 backdrop-blur-xl border border-border/50 mb-8 ${neonGlowClasses[event.neonColor]}`}
          >
            <h2 className="font-display text-2xl font-bold mb-6 text-foreground">
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
            className="rounded-2xl p-8 md:p-12 bg-card/60 backdrop-blur-xl border border-border/30 mb-8"
          >
            <h2 className="font-display text-2xl font-bold mb-6 text-foreground">
              Event Highlights
            </h2>
            <ul className="space-y-4">
              {event.posterElements.map((element, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${neonColorClasses[event.neonColor].split(" ")[0]} bg-current`} />
                  <span className="text-foreground/70">{element}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Theme colors info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl p-8 bg-card/40 backdrop-blur-xl border border-border/20"
          >
            <h2 className="font-display text-xl font-bold mb-4 text-foreground">
              Theme & Aesthetics
            </h2>
            <p className="text-foreground/70">{event.colors}</p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-4 rounded-full font-display font-bold text-lg ${neonColorClasses[event.neonColor]} border-2 hover:bg-current/10 transition-colors`}
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;