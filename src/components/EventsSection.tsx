import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EventIdCard from "./EventIdCard";
import TerminalCard from "./cards/TerminalCard";
import DataCard from "./cards/DataCard";
import BadgeCard from "./cards/BadgeCard";
import { events, categoryInfo, EventCategory } from "@/data/events";

const categories: { key: EventCategory; color: string }[] = [
  { key: "technical", color: "cyan" },
  { key: "non-technical", color: "pink" },
  { key: "workshop", color: "purple" },
  { key: "esports", color: "green" },
];

// Card components to rotate through
const cardVariants = [EventIdCard, TerminalCard, DataCard, BadgeCard];

const EventsSection = () => {
  return (
    <section id="events" className="relative py-28 px-6">
      {/* Background decorations */}
      <div className="absolute inset-0 hex-grid opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-accent/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30" />

      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 text-center"
        >
          {/* Header frame */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath:
                "polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)",
              border: "1px solid hsl(var(--border) / 0.2)",
              background: "hsl(var(--background) / 0.3)",
              backdropFilter: "blur(4px)",
            }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-3 px-5 py-2 mb-6 border border-accent/30 bg-accent/5">
              <div className="w-2 h-2 bg-neon-orange" />
              <span className="text-sm font-display font-medium text-accent tracking-widest uppercase">
                Tech Events
              </span>
              <div className="w-2 h-2 bg-neon-orange" />
            </div>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="text-gradient-primary">16 Events.</span>{" "}
              <span className="text-foreground">Infinite Possibilities.</span>
            </h2>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-primary" />
              <div className="w-3 h-3 rotate-45 border-2 border-neon-green" />
              <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-accent" />
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              From AI challenges to cybersecurity showdowns, from design battles to
              VR experiences.
              <span className="text-primary"> Choose your arena.</span>
            </p>

            {/* Category quick links */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.key}
                  to={`/category/${cat.key}`}
                  className="group relative px-4 py-2 font-display text-xs font-medium tracking-wider transition-all hover:scale-105"
                  style={{
                    border: `1px solid hsl(var(--neon-${cat.color}) / 0.4)`,
                    color: `hsl(var(--neon-${cat.color}))`,
                    clipPath:
                      "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
                  }}
                >
                  <span className="relative z-10">{categoryInfo[cat.key].label}</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{ background: `hsl(var(--neon-${cat.color}))` }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Events grid */}
      <div className="max-w-7xl mx-auto relative">
        {/* Grid background lines */}
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
          {events.map((event, index) => {
            const CardComponent = cardVariants[index % cardVariants.length];
            return <CardComponent key={event.id} event={event} index={index} />;
          })}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
};

export default EventsSection;
