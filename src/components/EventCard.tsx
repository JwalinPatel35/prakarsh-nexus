import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Event } from "@/data/events";
import InteractiveTilt from "@/components/InteractiveTilt";

interface EventCardProps {
  event: Event;
  index: number;
}

const neonVars = {
  cyan: "--neon-cyan",
  blue: "--neon-blue",
  purple: "--neon-purple",
  pink: "--neon-pink",
  green: "--neon-green",
  orange: "--neon-orange",
  red: "--neon-red",
} as const;

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
  const accentVar = neonVars[event.neonColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/event/${event.id}`} className="block h-full">
        <InteractiveTilt
          accentVar={accentVar}
          className="group h-full"
        >
          <motion.div
            whileTap={{ scale: 0.985 }}
            className="relative h-full"
            style={{
              // Card-specific semantic tokens (HSL channels only)
              ["--event-accent" as never]: `var(${accentVar})`,
            }}
          >
            {/* Outer frame */}
            <div
              className="relative h-full overflow-hidden bg-card/70 backdrop-blur-xl"
              style={{
                clipPath:
                  "polygon(26px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 26px), calc(100% - 26px) 100%, 14px 100%, 0 calc(100% - 14px), 0 26px)",
                boxShadow:
                  "0 0 0 1px hsl(var(--event-accent) / 0.75), 0 22px 50px -28px hsl(var(--event-accent) / 0.60)",
              }}
            >
              {/* Inner border */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[10px]"
                style={{
                  clipPath:
                    "polygon(18px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 10px 100%, 0 calc(100% - 10px), 0 18px)",
                  boxShadow: "0 0 0 1px hsl(var(--event-accent) / 0.45)",
                }}
              />

              {/* Subtle circuit/hex overlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-screen">
                <div className="absolute inset-0 hex-grid" />
              </div>

              {/* Top label strip */}
              <div className="relative z-10 flex items-center justify-between px-4 pt-4">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-display tracking-[0.25em] uppercase"
                  style={{
                    clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                    border: "1px solid hsl(var(--event-accent) / 0.7)",
                    background: "hsl(var(--event-accent) / 0.08)",
                    color: "hsl(var(--event-accent))",
                  }}
                >
                  {"FIGHTER"}
                  <span className="text-foreground/60">//</span>
                  <span className="text-foreground/70">PRAKARSH</span>
                </div>

                <div className="text-[10px] font-display tracking-[0.35em] text-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Main holo panel (no imagery) */}
              <div className="relative z-10 px-4 pt-4">
                <div
                  className="relative h-40 overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%, 0 18px)",
                    background:
                      "linear-gradient(135deg, hsl(var(--event-accent) / 0.10) 0%, hsl(var(--secondary) / 0.10) 40%, hsl(var(--accent) / 0.08) 100%)",
                    border: "1px solid hsl(var(--event-accent) / 0.45)",
                  }}
                >
                  {/* diagonal scan accents */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        "linear-gradient(115deg, transparent 0 42%, hsl(var(--event-accent) / 0.25) 42% 44%, transparent 44% 100%), linear-gradient(115deg, transparent 0 70%, hsl(var(--neon-green) / 0.16) 70% 71%, transparent 71% 100%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 30%, hsl(var(--event-accent) / 0.24), transparent 55%), radial-gradient(circle at 80% 70%, hsl(var(--neon-orange) / 0.12), transparent 60%)",
                    }}
                  />

                  {/* Corner numbers (reference-style) */}
                  <div className="absolute left-3 top-2 text-3xl font-display font-black text-foreground/90 drop-shadow-[0_0_12px_hsl(var(--event-accent)/0.35)]">
                    {String((index % 9) + 1)}
                  </div>
                  <div
                    className="absolute right-3 bottom-2 text-3xl font-display font-black"
                    style={{ color: "hsl(var(--event-accent) / 0.85)" }}
                  >
                    {String(((index + 3) % 9) + 1)}
                  </div>

                  {/* tiny top-right HUD */}
                  <div className="absolute right-3 top-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-neon-green" />
                    <div className="h-px w-10 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="relative z-10 px-4 pt-5 text-center">
                <h3
                  className={
                    "font-display text-2xl font-black tracking-[0.22em] uppercase " +
                    neonTextClasses[event.neonColor] +
                    " group-hover:animate-flicker"
                  }
                >
                  {event.name}
                </h3>
              </div>

              {/* Description panel */}
              <div className="relative z-10 px-4 pt-4 pb-4">
                <div
                  className="relative p-4 text-sm leading-relaxed text-foreground/75"
                  style={{
                    clipPath:
                      "polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)",
                    border: "1px solid hsl(var(--border))",
                    background:
                      "linear-gradient(180deg, hsl(var(--background) / 0.35), hsl(var(--background) / 0.65))",
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, transparent 0 18%, hsl(var(--event-accent) / 0.20) 18% 18.5%, transparent 18.5% 100%)",
                    }}
                  />
                  <p className="relative z-10 max-h-[3.9em] overflow-hidden">{event.tagline}</p>
                </div>

                {/* Bottom stats strip */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "SPD", value: String(((index + 5) % 9) + 1) },
                    { label: "SYS", value: String(((index + 2) % 9) + 1) },
                    { label: "PRC", value: String(((index + 7) % 9) + 1) },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="relative px-3 py-2"
                      style={{
                        clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                        border: "1px solid hsl(var(--event-accent) / 0.45)",
                        background: "hsl(var(--event-accent) / 0.06)",
                      }}
                    >
                      <div className="text-[10px] font-display tracking-[0.3em] text-foreground/60">
                        {s.label}
                      </div>
                      <div
                        className="mt-1 text-2xl font-display font-black leading-none"
                        style={{ color: "hsl(var(--event-accent) / 0.9)" }}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
                    <span className="text-[10px] font-display tracking-[0.35em] text-foreground/45">
                      PRAKARSH.26
                    </span>
                  </div>

                  <motion.div
                    className="inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -8 }}
                    whileHover={{ x: 0 }}
                  >
                    <span
                      className="text-[10px] font-display tracking-[0.35em]"
                      style={{ color: "hsl(var(--event-accent))" }}
                    >
                      OPEN
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "hsl(var(--event-accent))" }}
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </InteractiveTilt>
      </Link>
    </motion.div>
  );
};

export default EventCard;
