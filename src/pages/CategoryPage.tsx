import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getEventsByCategory, categoryInfo, EventCategory } from "@/data/events";
import ParticleField from "@/components/ParticleField";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventIdCard from "@/components/EventIdCard";
import EventPosterCard from "@/components/EventPosterCard";

const neonColorVars: Record<string, string> = {
  cyan: "195 100% 44%",
  blue: "210 100% 60%",
  purple: "270 65% 46%",
  pink: "330 100% 61%",
  green: "160 100% 53%",
  orange: "20 95% 55%",
  red: "0 100% 55%",
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId as EventCategory;
  const info = categoryInfo[category];
  const events = getEventsByCategory(category);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Category Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const accentHsl = neonColorVars[info.neonColor];

  return (
    <div
      className="min-h-screen relative"
      style={{ "--category-accent": accentHsl } as React.CSSProperties}
    >
      <ParticleField />
      <Navbar />

      {/* Background decorations */}
      <div className="absolute inset-0 hex-grid opacity-20" />
      <div
        className="absolute top-0 left-0 right-0 h-[50vh]"
        style={{
          background: `linear-gradient(to bottom, hsl(${accentHsl} / 0.1), transparent)`,
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-foreground hover:text-primary transition-all group"
              style={{
                border: "1px solid hsl(var(--border) / 0.3)",
                clipPath:
                  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
              }}
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-display tracking-wider">BACK TO HOME</span>
            </Link>
          </motion.div>

          {/* Category Header Frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative p-8 md:p-12 text-center"
          >
            {/* Outer notched border */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath:
                  "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)",
                border: `1px solid hsl(${accentHsl} / 0.3)`,
                background: "hsl(var(--background) / 0.5)",
                backdropFilter: "blur(8px)",
              }}
            />

            {/* Corner accents */}
            <div
              className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2"
              style={{ borderColor: `hsl(${accentHsl})` }}
            />
            <div
              className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2"
              style={{ borderColor: `hsl(${accentHsl})` }}
            />
            <div
              className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2"
              style={{ borderColor: `hsl(${accentHsl})` }}
            />
            <div
              className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2"
              style={{ borderColor: `hsl(${accentHsl})` }}
            />

            {/* Top label */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div
                className="px-4 py-1.5"
                style={{
                  background: "hsl(var(--background) / 0.9)",
                  border: `1px solid hsl(${accentHsl} / 0.5)`,
                  clipPath:
                    "polygon(6px 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0 50%)",
                }}
              >
                <span
                  className="text-xs font-display tracking-widest uppercase"
                  style={{ color: `hsl(${accentHsl})` }}
                >
                  PRAKARSH '26
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="relative">
              <h1
                className="font-display text-5xl md:text-7xl font-black mb-6"
                style={{ color: `hsl(${accentHsl})` }}
              >
                {info.label}
              </h1>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div
                  className="h-[2px] w-20"
                  style={{
                    background: `linear-gradient(to right, transparent, hsl(${accentHsl}))`,
                  }}
                />
                <div
                  className="w-3 h-3 rotate-45"
                  style={{ border: `2px solid hsl(${accentHsl})` }}
                />
                <div
                  className="h-[2px] w-20"
                  style={{
                    background: `linear-gradient(to left, transparent, hsl(${accentHsl}))`,
                  }}
                />
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {info.description}
              </p>

              {/* Event count badge */}
              <div className="mt-8 inline-flex items-center gap-2">
                <div
                  className="w-2 h-2"
                  style={{ background: `hsl(${accentHsl})` }}
                />
                <span className="text-sm font-display tracking-wider text-foreground/70">
                  {events.length} EVENT{events.length !== 1 ? "S" : ""}
                </span>
                <div
                  className="w-2 h-2"
                  style={{ background: `hsl(${accentHsl})` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Grid background lines */}
          <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
            {events.map((event, index) =>
              index % 3 === 0 ? (
                <EventCard key={event.id} event={event} index={index} />
              ) : index % 3 === 1 ? (
                <EventIdCard key={event.id} event={event} index={index} />
              ) : (
                <EventPosterCard key={event.id} event={event} index={index} />
              )
            )}
          </div>

          {events.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-display">
                No events in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
