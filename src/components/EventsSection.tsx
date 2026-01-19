import { motion } from "framer-motion";
import EventCard from "./EventCard";
import { events } from "@/data/events";

const EventsSection = () => {
  return (
    <section id="events" className="relative py-28 px-6">
      {/* Background decorations */}
      <div className="absolute inset-0 hex-grid opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-accent/30" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent/30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30" />

      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 mb-6 border border-accent/30 bg-accent/5 backdrop-blur-sm">
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
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From AI challenges to cybersecurity showdowns, from design battles to VR experiences. 
            <span className="text-primary"> Choose your arena.</span>
          </p>
        </motion.div>
      </div>

      {/* Events grid */}
      <div className="max-w-7xl mx-auto relative">
        {/* Grid background lines */}
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
};

export default EventsSection;
