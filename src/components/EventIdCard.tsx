import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import type { Event } from "@/data/events";
import InteractiveTilt from "@/components/InteractiveTilt";

interface EventIdCardProps {
  event: Event;
  index: number;
}

// Flat color palette - no gradients
const COLORS = {
  white: "#FFFFFF",
  peach: "#F1B5A2",
  accent: "#3C2A56",
} as const;

function ChunkyQr() {
  return (
    <div
      aria-hidden
      className="grid h-16 w-16 grid-cols-7 gap-[2px] p-[2px]"
      style={{
        clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        border: `1px solid ${COLORS.peach}`,
        background: COLORS.accent,
      }}
    >
      {Array.from({ length: 49 }).map((_, i) => (
        <div
          key={i}
          style={{
            background:
              (i % 7 === 0 || i % 7 === 6 || (Math.floor(i / 7) % 7 === 0) || (Math.floor(i / 7) % 7 === 6) || (i % 11 === 0))
                ? COLORS.peach
                : COLORS.accent,
          }}
        />
      ))}
    </div>
  );
}

export default function EventIdCard({ event, index }: EventIdCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/event/${event.id}`} className="block h-full">
        <InteractiveTilt accentVar="--neon-orange" className="group h-full">
          <motion.div
            whileTap={{ scale: 0.985 }}
            className="relative h-full"
          >
            {/* Card base */}
            <div
              className="relative h-full overflow-hidden"
              style={{
                clipPath:
                  "polygon(30px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 22px 100%, 0 calc(100% - 22px), 0 30px)",
                boxShadow: `0 0 0 1px ${COLORS.peach}, 0 0 30px -10px ${COLORS.peach}40`,
                background: COLORS.accent,
              }}
            >
              {/* Inner frame line */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[10px]"
                style={{
                  clipPath:
                    "polygon(22px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 28px), calc(100% - 28px) 100%, 16px 100%, 0 calc(100% - 16px), 0 22px)",
                  boxShadow: `0 0 0 1px ${COLORS.peach}50`,
                }}
              />

              {/* Left side tab */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2"
                style={{
                  clipPath: "polygon(0 0, 100% 10px, 100% calc(100% - 10px), 0 100%)",
                  border: `1px solid ${COLORS.peach}`,
                  background: COLORS.accent,
                }}
              >
                <div className="px-3 py-10">
                  <div
                    className="font-display text-[10px] tracking-[0.35em]"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      color: COLORS.peach,
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
                    boxShadow: `0 0 0 1px ${COLORS.peach}`,
                    background: COLORS.accent,
                  }}
                />
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    boxShadow: `0 0 0 1px ${COLORS.peach}`,
                    background: COLORS.accent,
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
                        border: `1px solid ${COLORS.peach}50`,
                        background: COLORS.accent,
                      }}
                    />
                  </div>

                  <div className="text-right">
                    <div 
                      className="text-[10px] font-display tracking-[0.3em]"
                      style={{ color: `${COLORS.white}90` }}
                    >
                      ID NUMBER
                    </div>
                    <div
                      className="mt-1 font-display text-xs font-black tracking-[0.22em]"
                      style={{ color: COLORS.peach }}
                    >
                      PKR-{String(1000 + index * 7)}
                    </div>
                  </div>
                </div>

                {/* Portrait window */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px)",
                    border: `1px solid ${COLORS.peach}`,
                    background: COLORS.accent,
                    boxShadow: `inset 0 0 30px -15px ${COLORS.peach}30`,
                  }}
                >
                  <div className="absolute inset-0 hex-grid opacity-15" />

                  <div className="relative z-10 flex h-full min-h-[240px] items-end justify-between p-4">
                    <div>
                      <div 
                        className="text-[10px] font-display tracking-[0.3em]"
                        style={{ color: `${COLORS.white}90` }}
                      >
                        NAME
                      </div>
                      <div
                        className="mt-1 font-display text-3xl font-black tracking-[0.18em] uppercase"
                        style={{ color: COLORS.white }}
                      >
                        {event.name}
                      </div>
                      <div className="mt-2 text-[11px]" style={{ color: `${COLORS.white}99` }}>
                        <span className="font-display tracking-[0.22em]">MISSION</span>{" "}
                        <span style={{ color: COLORS.peach }}>#{event.id}</span>
                      </div>
                    </div>

                    {/* Mark */}
                    <div className="text-right">
                      <div
                        className="inline-flex h-14 w-14 items-center justify-center"
                        style={{
                          clipPath:
                            "polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)",
                          border: `1px solid ${COLORS.peach}`,
                          background: COLORS.accent,
                        }}
                      >
                        <div
                          className="h-7 w-7"
                          style={{
                            clipPath:
                              "polygon(50% 0, 88% 12%, 100% 50%, 88% 88%, 50% 100%, 12% 88%, 0 50%, 12% 12%)",
                            boxShadow: `0 0 0 2px ${COLORS.peach}`,
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
                    border: `1px solid ${COLORS.peach}`,
                    background: COLORS.accent,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-[2px] w-10" 
                      style={{ background: COLORS.peach }}
                    />
                    <span 
                      className="text-[10px] font-display tracking-[0.35em]"
                      style={{ color: `${COLORS.white}90` }}
                    >
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
                      style={{ color: COLORS.peach }}
                    >
                      OPEN
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: COLORS.peach }}
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
