import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import type { Event } from "@/data/events";
import InteractiveTilt from "@/components/InteractiveTilt";
import tripPosterCard from "@/assets/trip-poster-card.png";

interface EventPosterCardProps {
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

function MicroQr() {
  // Smaller QR-ish decorative blocks (pure CSS, no images)
  return (
    <div
      aria-hidden
      className="grid h-14 w-14 grid-cols-7 gap-[2px] p-[2px]"
      style={{
        clipPath:
          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        border: "1px solid hsl(var(--border) / 0.9)",
        background: "hsl(var(--foreground) / 0.06)",
      }}
    >
      {Array.from({ length: 49 }).map((_, i) => (
        <div
          key={i}
          style={{
            background:
              i % 9 === 0 ||
              i % 7 === 0 ||
              i % 7 === 6 ||
              Math.floor(i / 7) === 0 ||
              Math.floor(i / 7) === 6
                ? "hsl(var(--foreground) / 0.55)"
                : "hsl(var(--foreground) / 0.10)",
          }}
        />
      ))}
    </div>
  );
}

export default function EventPosterCard({ event, index }: EventPosterCardProps) {
  const accentVar = neonVars[event.neonColor];

  const outerClip =
    "polygon(26px 0, calc(100% - 26px) 0, 100% 26px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 26px), 0 26px)";
  const innerClip =
    "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 20px), 0 20px)";

  // No event date data exists; keep a consistent, reference-like "ticket" detail.
  const pseudoDate = `${String((index % 28) + 1).padStart(2, "0")}–${String(
    ((index + 6) % 28) + 1
  ).padStart(2, "0")}`;

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
              // card-local channels
              ["--event-accent" as never]: `var(${accentVar})`,
            }}
          >
            {/* Transparent outside; all structure is in the frame + plate */}
            <div
              className="relative h-full overflow-hidden"
              style={{
                clipPath: outerClip,
                boxShadow:
                  "0 0 0 1px hsl(var(--event-accent) / 0.55), 0 26px 70px -42px hsl(var(--event-accent) / 0.45)",
              }}
            >
              {/* Inner plate (light, poster-like) */}
              <div
                className="relative h-full"
                style={{
                  clipPath: innerClip,
                  background:
                    "linear-gradient(180deg, hsl(var(--foreground) / 0.10) 0%, hsl(var(--foreground) / 0.06) 35%, hsl(var(--foreground) / 0.04) 100%)",
                }}
              >
                {/* Plate border line */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[10px]"
                  style={{
                    clipPath:
                      "polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 16px), 0 16px)",
                    boxShadow: "0 0 0 1px hsl(var(--border) / 0.85)",
                  }}
                />

                {/* Poster micro-grid + subtle tech marks */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "linear-gradient(hsl(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.04) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(500px circle at 25% 20%, hsl(var(--event-accent) / 0.12), transparent 55%), radial-gradient(520px circle at 85% 70%, hsl(var(--secondary) / 0.10), transparent 60%)",
                  }}
                />

                {/* Content layout */}
                <div className="relative z-10 grid h-full grid-cols-[1.05fr_0.95fr] gap-0">
                  {/* LEFT INFO */}
                  <div className="relative p-5">
                    {/* Top line: big title + small label */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-display text-[44px] leading-[0.9] tracking-[0.08em] text-foreground/85">
                          {event.name.slice(0, 4).toUpperCase()}
                        </div>
                        <div
                          className="mt-1 font-display text-[12px] tracking-[0.35em] text-foreground/60"
                          style={{
                            textShadow: "0 0 18px hsl(var(--event-accent) / 0.12)",
                          }}
                        >
                          {event.keywords?.[0] ? `${event.keywords[0]} SESSION` : "MUSIC SESSION"}
                        </div>
                      </div>

                      {/* barcode-ish */}
                      <div
                        aria-hidden
                        className="mt-2 h-10 w-[92px]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(90deg, hsl(var(--foreground) / 0.35) 0 2px, transparent 2px 5px)",
                          opacity: 0.8,
                          maskImage:
                            "linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)",
                        }}
                      />
                    </div>

                    {/* Sub date block */}
                    <div className="mt-4">
                      <div className="flex items-end gap-2">
                        <div className="font-display text-2xl font-black tracking-[0.12em] text-foreground/80">
                          {pseudoDate}
                        </div>
                        <div className="pb-1 text-[12px] font-display tracking-[0.22em] text-foreground/55">
                          CYCLE
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        {[0, 1].map((i) => (
                          <div key={i} className="space-y-1">
                            <div className="text-[10px] font-display tracking-[0.3em] text-foreground/55">
                              {String((index + i * 2) % 30).padStart(2, "0")}–{String(
                                ((index + i * 2 + 2) % 30) + 1
                              ).padStart(2, "0")}
                            </div>
                            <div className="text-[11px] leading-tight text-foreground/65">
                              {i === 0 ? "TRIP MUSIC SESSION" : "TRIP MUSIC FESTIVAL"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* QR + tiny guest list (stylized) */}
                    <div className="mt-5 grid grid-cols-[auto_1fr] gap-4">
                      <MicroQr />
                      <div>
                        <div className="text-[10px] font-display tracking-[0.28em] text-foreground/55">
                          INVITED
                        </div>
                        <div className="mt-2 text-[10px] leading-relaxed text-foreground/55">
                          {event.keywords.slice(0, 8).join(" · ")}
                        </div>
                      </div>
                    </div>

                    {/* Bottom panel (ticket strip) */}
                    <div
                      className="mt-5"
                      style={{
                        clipPath:
                          "polygon(18px 0, calc(100% - 42px) 0, 100% 42px, 100% 100%, 0 100%, 0 18px)",
                        border: "1px solid hsl(var(--border) / 0.9)",
                        background:
                          "linear-gradient(90deg, hsl(var(--foreground) / 0.06), hsl(var(--foreground) / 0.03))",
                      }}
                    >
                      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3">
                        <div
                          className="inline-flex h-10 w-10 items-center justify-center"
                          style={{
                            clipPath:
                              "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
                            border: "1px solid hsl(var(--event-accent) / 0.35)",
                            background: "hsl(var(--event-accent) / 0.05)",
                          }}
                        >
                          <span
                            className="font-display text-sm font-black"
                            style={{ color: "hsl(var(--event-accent) / 0.85)" }}
                          >
                            {String((index % 9) + 1)}
                          </span>
                        </div>

                        <div>
                          <div className="text-[10px] font-display tracking-[0.3em] text-foreground/55">
                            {event.icon} {event.tagline.slice(0, 26).toUpperCase()}
                          </div>
                          <div className="mt-1 text-[11px] text-foreground/60">
                            PRAKARSH // ACCESS PASS
                          </div>
                        </div>

                        <motion.div
                          className="inline-flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100"
                          initial={{ x: -8 }}
                          whileHover={{ x: 0 }}
                        >
                          <span
                            className="text-[10px] font-display tracking-[0.35em]"
                            style={{ color: "hsl(var(--event-accent) / 0.9)" }}
                          >
                            OPEN
                          </span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "hsl(var(--event-accent) / 0.9)" }}
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

                  {/* RIGHT VISUAL */}
                  <div className="relative">
                    {/* Image window (no black background baked into card: we mask/fade edges and keep outer transparent) */}
                    <div className="absolute inset-0">
                      <img
                        src={tripPosterCard}
                        alt="Futuristic poster visual"
                        className="h-full w-full object-cover"
                        loading="lazy"
                        style={{
                          filter: "saturate(1.05) contrast(1.05)",
                          maskImage:
                            "linear-gradient(90deg, transparent 0%, black 20%, black 100%)",
                        }}
                      />
                    </div>

                    {/* Glass overlay and right-side glyphs */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg, hsl(var(--background) / 0.18), transparent 55%), radial-gradient(420px circle at 70% 30%, hsl(var(--event-accent) / 0.14), transparent 55%)",
                      }}
                    />

                    {/* Vertical tech marks */}
                    <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                      <div
                        className="h-2 w-10"
                        style={{ background: "hsl(var(--foreground) / 0.10)" }}
                      />
                      <div
                        className="h-2 w-6"
                        style={{ background: "hsl(var(--foreground) / 0.10)" }}
                      />
                      <div
                        className="h-2 w-8"
                        style={{ background: "hsl(var(--foreground) / 0.10)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </InteractiveTilt>
      </Link>
    </motion.div>
  );
}
