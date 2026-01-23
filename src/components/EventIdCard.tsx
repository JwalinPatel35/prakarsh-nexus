import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import type { Event } from "@/data/events";
import InteractiveTilt from "@/components/InteractiveTilt";

interface EventIdCardProps {
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

function ChunkyQr() {
  // QR-ish decorative blocks (pure CSS, no images)
  return (
    <div
      aria-hidden
      className="grid h-16 w-16 grid-cols-7 gap-[2px] p-[2px]"
      style={{
        clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        border: "1px solid hsl(var(--event-accent) / 0.55)",
        background: "hsl(var(--background) / 0.15)",
      }}
    >
      {Array.from({ length: 49 }).map((_, i) => (
        <div
          // deterministic pattern
          key={i}
          className=""
          style={{
            background:
              (i % 7 === 0 || i % 7 === 6 || (Math.floor(i / 7) % 7 === 0) || (Math.floor(i / 7) % 7 === 6) || (i % 11 === 0))
                ? "hsl(var(--event-accent) / 0.9)"
                : "hsl(var(--event-accent) / 0.08)",
          }}
        />
      ))}
    </div>
  );
}

export default function EventIdCard({ event, index }: EventIdCardProps) {
  const accentVar = neonVars[event.neonColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/event/${event.id}`} className="block h-full">
        <InteractiveTilt accentVar={accentVar} className="group h-full">
          <motion.div
            whileTap={{ scale: 0.985 }}
            className="relative h-full"
            style={{
              ["--event-accent" as never]: `var(${accentVar})`,
            }}
          >
            {/* Transparent base: only frame + floating panels */}
            <div
              className="relative h-full overflow-hidden"
              style={{
                clipPath:
                  "polygon(30px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 22px 100%, 0 calc(100% - 22px), 0 30px)",
                boxShadow:
                  "0 0 0 1px hsl(var(--event-accent) / 0.75), 0 26px 70px -42px hsl(var(--event-accent) / 0.60)",
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

              {/* Ambient glow (keeps center transparent) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(800px circle at 40% 25%, hsl(var(--event-accent) / 0.22), transparent 55%), radial-gradient(600px circle at 80% 90%, hsl(var(--secondary) / 0.12), transparent 60%)",
                }}
              />

              {/* Left side tab */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2"
                style={{
                  clipPath: "polygon(0 0, 100% 10px, 100% calc(100% - 10px), 0 100%)",
                  border: "1px solid hsl(var(--event-accent) / 0.55)",
                  background:
                    "linear-gradient(180deg, hsl(var(--event-accent) / 0.10), hsl(var(--background) / 0.10))",
                }}
              >
                <div className="px-3 py-10">
                  <div
                    className="font-display text-[10px] tracking-[0.35em]"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      color: "hsl(var(--event-accent) / 0.9)",
                    }}
                  >
                    {event.name}
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
              </div>

              {/* Content grid */}
              <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-4 p-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <ChunkyQr />
                    <div
                      className="h-16 w-12"
                      style={{
                        clipPath:
                          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                        border: "1px solid hsl(var(--border))",
                        background:
                          "linear-gradient(135deg, hsl(var(--event-accent) / 0.12), hsl(var(--secondary) / 0.08))",
                      }}
                    />
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-display tracking-[0.3em] text-foreground/55">
                      ID NUMBER
                    </div>
                    <div
                      className="mt-1 font-display text-xs font-black tracking-[0.22em]"
                      style={{ color: "hsl(var(--event-accent) / 0.9)" }}
                    >
                      PKR-{String(1000 + index * 7)}
                    </div>
                  </div>
                </div>

                {/* Portrait window (transparent base, floating glass panel) */}
                <div
                  className="relative overflow-hidden"
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
                        "radial-gradient(circle at 25% 20%, hsl(var(--event-accent) / 0.28), transparent 60%), radial-gradient(circle at 75% 80%, hsl(var(--neon-green) / 0.10), transparent 60%)",
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

                  <div className="relative z-10 flex h-full min-h-[240px] items-end justify-between p-4">
                    <div>
                      <div className="text-[10px] font-display tracking-[0.3em] text-foreground/55">
                        NAME
                      </div>
                      <div
                        className={
                          "mt-1 font-display text-3xl font-black tracking-[0.18em] uppercase " +
                          neonTextClasses[event.neonColor]
                        }
                      >
                        {event.name}
                      </div>
                      <div className="mt-2 text-[11px] text-foreground/60">
                        <span className="font-display tracking-[0.22em]">MISSION</span>{" "}
                        <span style={{ color: "hsl(var(--neon-green) / 0.9)" }}>#{event.id}</span>
                      </div>
                    </div>

                    {/* Mark */}
                    <div className="text-right">
                      <div
                        className="inline-flex h-14 w-14 items-center justify-center"
                        style={{
                          clipPath:
                            "polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)",
                          border: "1px solid hsl(var(--event-accent) / 0.55)",
                          background: "hsl(var(--event-accent) / 0.06)",
                        }}
                      >
                        <div
                          className="h-7 w-7"
                          style={{
                            clipPath:
                              "polygon(50% 0, 88% 12%, 100% 50%, 88% 88%, 50% 100%, 12% 88%, 0 50%, 12% 12%)",
                            boxShadow: "0 0 0 2px hsl(var(--event-accent) / 0.55)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer strip */}
                <div
                  className="relative flex items-center justify-between gap-4 px-4 py-3"
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
                      PRAKARSH.26
                    </span>
                  </div>
                  <motion.div
                    className="inline-flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100"
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
}
