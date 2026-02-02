import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getEventById } from "@/data/events";
import ParticleField from "@/components/ParticleField";

const neonVars = {
  lavender: "--neon-cyan",
  purple: "--neon-purple",
  pink: "--neon-pink",
  peach: "--neon-orange",
} as const;

const neonTextClasses = {
  lavender: "text-neon-cyan",
  purple: "text-neon-purple",
  pink: "text-neon-pink",
  peach: "text-neon-orange",
};

function ChunkyQr({ size = "lg" }: { size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "h-20 w-20" : "h-14 w-14";
  return (
    <div
      aria-hidden
      className={`grid ${dim} grid-cols-7 gap-[2px] p-[2px]`}
      style={{
        clipPath:
          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        border: "1px solid hsl(var(--event-accent) / 0.55)",
        background: "hsl(var(--background) / 0.15)",
      }}
    >
      {Array.from({ length: 49 }).map((_, i) => (
        <div
          key={i}
          style={{
            background:
              i % 7 === 0 ||
              i % 7 === 6 ||
              Math.floor(i / 7) % 7 === 0 ||
              Math.floor(i / 7) % 7 === 6 ||
              i % 11 === 0
                ? "hsl(var(--event-accent) / 0.9)"
                : "hsl(var(--event-accent) / 0.08)",
          }}
        />
      ))}
    </div>
  );
}

const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = getEventById(eventId || "");

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">
            Event Not Found
          </h1>
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const accentVar = neonVars[event.neonColor];

  return (
    <div
      className="min-h-screen relative"
      style={{ ["--event-accent" as never]: `var(${accentVar})` }}
    >
      <ParticleField />

      {/* Background decorations */}
      <div className="absolute inset-0 hex-grid opacity-20" />
      <div
        className="absolute top-0 left-0 right-0 h-[60vh]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, hsl(var(--event-accent) / 0.15), transparent 60%)",
        }}
      />

      {/* Back button - ID card style */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          to="/"
          className="group flex items-center gap-2 px-5 py-2.5 transition-all"
          style={{
            clipPath:
              "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
            border: "1px solid hsl(var(--event-accent) / 0.55)",
            background:
              "linear-gradient(135deg, hsl(var(--background) / 0.80), hsl(var(--card) / 0.60))",
            backdropFilter: "blur(12px)",
          }}
        >
          <ArrowLeft
            size={18}
            style={{ color: "hsl(var(--event-accent))" }}
          />
          <span
            className="text-sm font-display tracking-wider"
            style={{ color: "hsl(var(--event-accent))" }}
          >
            BACK
          </span>
        </Link>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main ID Card Frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
            style={{
              clipPath:
                "polygon(30px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 22px 100%, 0 calc(100% - 22px), 0 30px)",
              boxShadow:
                "0 0 0 1px hsl(var(--event-accent) / 0.75), 0 40px 100px -50px hsl(var(--event-accent) / 0.50)",
            }}
          >
            {/* Inner frame line */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[10px]"
              style={{
                clipPath:
                  "polygon(22px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 28px), calc(100% - 28px) 100%, 16px 100%, 0 calc(100% - 16px), 0 22px)",
                boxShadow: "0 0 0 1px hsl(var(--event-accent) / 0.35)",
              }}
            />

            {/* Ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(800px circle at 30% 15%, hsl(var(--event-accent) / 0.22), transparent 55%), radial-gradient(600px circle at 80% 90%, hsl(var(--secondary) / 0.12), transparent 60%)",
              }}
            />

            {/* Left side tab */}
            <div
              className="absolute left-0 top-1/3 -translate-y-1/2 hidden md:block"
              style={{
                clipPath:
                  "polygon(0 0, 100% 10px, 100% calc(100% - 10px), 0 100%)",
                border: "1px solid hsl(var(--event-accent) / 0.55)",
                background:
                  "linear-gradient(180deg, hsl(var(--event-accent) / 0.10), hsl(var(--background) / 0.10))",
              }}
            >
              <div className="px-3 py-16">
                <div
                  className="font-display text-[10px] tracking-[0.35em]"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    color: "hsl(var(--event-accent) / 0.9)",
                  }}
                >
                  PRAKARSH '26 EVENT
                </div>
              </div>
            </div>

            {/* Top-left perforation dots */}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  boxShadow: "0 0 0 1px hsl(var(--event-accent) / 0.55)",
                  background: "hsl(var(--background) / 0.20)",
                }}
              />
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  boxShadow: "0 0 0 1px hsl(var(--event-accent) / 0.55)",
                  background: "hsl(var(--background) / 0.20)",
                }}
              />
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  boxShadow: "0 0 0 1px hsl(var(--event-accent) / 0.55)",
                  background: "hsl(var(--background) / 0.20)",
                }}
              />
            </div>

            {/* Content grid */}
            <div className="relative z-10 p-6 md:p-10">
              {/* Header row */}
              <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <ChunkyQr size="lg" />
                  <div
                    className="h-20 w-14"
                    style={{
                      clipPath:
                        "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                      border: "1px solid hsl(var(--border))",
                      background:
                        "linear-gradient(135deg, hsl(var(--event-accent) / 0.12), hsl(var(--secondary) / 0.08))",
                    }}
                  />
                </div>

                <div className="text-left md:text-right">
                  <div className="text-[10px] font-display tracking-[0.3em] text-foreground/55">
                    ID NUMBER
                  </div>
                  <div
                    className="mt-1 font-display text-sm font-black tracking-[0.22em]"
                    style={{ color: "hsl(var(--event-accent) / 0.9)" }}
                  >
                    PKR-{event.id.toUpperCase().slice(0, 8)}
                  </div>
                  <div className="mt-2 text-[10px] font-display tracking-[0.3em] text-foreground/55">
                    STATUS
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full animate-pulse"
                      style={{ background: "hsl(var(--event-accent))" }}
                    />
                    <span
                      className="text-xs font-display tracking-widest"
                      style={{ color: "hsl(var(--event-accent))" }}
                    >
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Event name header panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative overflow-hidden mb-8"
                style={{
                  clipPath:
                    "polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px)",
                  border: "1px solid hsl(var(--event-accent) / 0.45)",
                  background:
                    "linear-gradient(135deg, hsl(var(--card) / 0.10), hsl(var(--background) / 0.02))",
                  boxShadow:
                    "inset 0 0 0 1px hsl(var(--event-accent) / 0.10), 0 14px 40px -30px hsl(var(--event-accent) / 0.55)",
                }}
              >
                <div className="absolute inset-0 hex-grid opacity-25 mix-blend-screen" />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-80"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 25% 20%, hsl(var(--event-accent) / 0.28), transparent 60%), radial-gradient(circle at 75% 80%, hsl(var(--neon-pink) / 0.10), transparent 60%)",
                  }}
                />
                {/* diagonal highlight */}
                <div
                  aria-hidden
                  className="absolute -left-24 top-10 h-16 w-[140%] rotate-[-14deg]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, hsl(var(--event-accent) / 0.18) 30%, transparent 70%)",
                  }}
                />

                <div className="relative z-10 p-6 md:p-8">
                  <div className="text-[10px] font-display tracking-[0.3em] text-foreground/55 mb-2">
                    EVENT NAME
                  </div>
                  <h1
                    className={
                      "font-display text-4xl md:text-6xl font-black tracking-[0.1em] uppercase " +
                      neonTextClasses[event.neonColor]
                    }
                  >
                    {event.name}
                  </h1>
                  <div className="mt-4 text-[11px] text-foreground/60">
                    <span className="font-display tracking-[0.22em]">
                      MISSION
                    </span>{" "}
                    <span style={{ color: "hsl(var(--neon-pink) / 0.9)" }}>
                      #{event.id}
                    </span>
                  </div>
                  <p className="mt-4 text-lg md:text-xl text-foreground/80 font-medium max-w-2xl">
                    {event.tagline}
                  </p>
                </div>
              </motion.div>

              {/* Keywords */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {event.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-4 py-2 text-sm font-display font-medium tracking-wider"
                    style={{
                      clipPath:
                        "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                      border: "1px solid hsl(var(--event-accent) / 0.55)",
                      color: "hsl(var(--event-accent))",
                      background: "hsl(var(--event-accent) / 0.08)",
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </motion.div>

              {/* Description panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative mb-6"
                style={{
                  clipPath:
                    "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 20px)",
                  border: "1px solid hsl(var(--event-accent) / 0.35)",
                  background:
                    "linear-gradient(135deg, hsl(var(--card) / 0.08), hsl(var(--background) / 0.04))",
                }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-2 h-6"
                      style={{ background: "hsl(var(--event-accent))" }}
                    />
                    <h2 className="font-display text-xl font-bold text-foreground tracking-wider">
                      ABOUT THE EVENT
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {event.description.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-foreground/75 leading-relaxed text-base md:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Highlights panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative mb-6"
                style={{
                  clipPath:
                    "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 20px)",
                  border: "1px solid hsl(var(--border) / 0.5)",
                  background:
                    "linear-gradient(135deg, hsl(var(--background) / 0.06), hsl(var(--card) / 0.04))",
                }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-6 bg-accent" />
                    <h2 className="font-display text-xl font-bold text-foreground tracking-wider">
                      EVENT HIGHLIGHTS
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {event.posterElements.map((element, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <span
                          className="w-2 h-2 mt-2 flex-shrink-0 rotate-45"
                          style={{
                            background: "hsl(var(--event-accent))",
                          }}
                        />
                        <span className="text-foreground/70 leading-relaxed">
                          {element}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Theme panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative mb-8"
                style={{
                  clipPath:
                    "polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%, 0 15px)",
                  border: "1px solid hsl(var(--border) / 0.3)",
                  background: "hsl(var(--background) / 0.04)",
                }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-5 bg-secondary" />
                    <h2 className="font-display text-lg font-bold text-foreground tracking-wider">
                      THEME & AESTHETICS
                    </h2>
                  </div>
                  <p className="text-foreground/70">{event.colors}</p>
                </div>
              </motion.div>

              {/* Footer strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4"
                style={{
                  clipPath:
                    "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 20px)",
                  border: "1px solid hsl(var(--event-accent) / 0.45)",
                  background:
                    "linear-gradient(90deg, hsl(var(--event-accent) / 0.10), hsl(var(--background) / 0.10))",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
                  <span className="text-[10px] font-display tracking-[0.35em] text-foreground/55">
                    PRAKARSH.26 // FIGHTER
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 py-3 font-display font-bold text-sm tracking-wider overflow-hidden group"
                  style={{
                    clipPath:
                      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                    border: "1px solid hsl(var(--event-accent) / 0.75)",
                    color: "hsl(var(--event-accent))",
                    background: "hsl(var(--event-accent) / 0.08)",
                  }}
                >
                  <span className="relative z-10">REGISTER NOW</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                    style={{ background: "hsl(var(--event-accent))" }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
