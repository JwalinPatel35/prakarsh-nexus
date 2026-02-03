import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Event } from "@/data/events";
import InteractiveTilt from "@/components/InteractiveTilt";

interface BadgeCardProps {
  event: Event;
  index: number;
}

const COLORS = {
  white: "#FFFFFF",
  peach: "#F1B5A2",
  accent: "#3C2A56",
} as const;

export default function BadgeCard({ event, index }: BadgeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/event/${event.id}`} className="block h-full">
        <InteractiveTilt accentVar="--neon-orange" className="group h-full">
          <motion.div whileTap={{ scale: 0.985 }} className="relative h-full">
            {/* Card base - badge/pass style */}
            <div
              className="relative h-full overflow-hidden"
              style={{
                clipPath: "polygon(50% 0, 100% 12px, 100% 100%, 0 100%, 0 12px)",
                boxShadow: `0 0 0 1px ${COLORS.peach}, 0 0 25px -8px ${COLORS.peach}50`,
                background: COLORS.accent,
              }}
            >
              {/* Top lanyard hole */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2">
                <div
                  className="w-8 h-4 rounded-full"
                  style={{
                    border: `2px solid ${COLORS.peach}`,
                    background: COLORS.accent,
                  }}
                />
              </div>

              {/* Decorative lines from hole */}
              <div
                className="absolute top-5 left-1/2 w-[1px] h-6"
                style={{ background: `${COLORS.peach}40` }}
              />

              {/* Content */}
              <div className="relative z-10 h-full p-5 pt-14 flex flex-col">
                {/* Event ID header */}
                <div className="text-center mb-4">
                  <div
                    className="inline-block px-4 py-1"
                    style={{
                      border: `1px solid ${COLORS.peach}`,
                      background: COLORS.accent,
                    }}
                  >
                    <span
                      className="font-display text-[10px] tracking-[0.4em]"
                      style={{ color: COLORS.peach }}
                    >
                      PKR-{String(2026 + index).slice(-3)}
                    </span>
                  </div>
                </div>

                {/* Photo placeholder area */}
                <div className="flex justify-center mb-4">
                  <div
                    className="relative w-28 h-32"
                    style={{
                      border: `2px solid ${COLORS.peach}`,
                      background: COLORS.accent,
                    }}
                  >
                    {/* Cross pattern inside */}
                    <div
                      className="absolute top-1/2 left-0 right-0 h-[1px]"
                      style={{ background: `${COLORS.peach}30` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 left-1/2 w-[1px]"
                      style={{ background: `${COLORS.peach}30` }}
                    />
                    {/* Corner dots */}
                    <div
                      className="absolute top-2 left-2 w-2 h-2"
                      style={{ background: COLORS.peach }}
                    />
                    <div
                      className="absolute top-2 right-2 w-2 h-2"
                      style={{ background: COLORS.peach }}
                    />
                    <div
                      className="absolute bottom-2 left-2 w-2 h-2"
                      style={{ background: COLORS.peach }}
                    />
                    <div
                      className="absolute bottom-2 right-2 w-2 h-2"
                      style={{ background: COLORS.peach }}
                    />
                  </div>
                </div>

                {/* Event name */}
                <div className="text-center flex-1">
                  <div
                    className="font-display text-2xl font-black tracking-[0.1em] uppercase mb-2"
                    style={{ color: COLORS.white }}
                  >
                    {event.name}
                  </div>
                  <div
                    className="text-[10px] font-display tracking-[0.3em] uppercase"
                    style={{ color: `${COLORS.white}60` }}
                  >
                    {event.category}
                  </div>
                </div>

                {/* Barcode decoration */}
                <div className="mt-4">
                  <div className="flex justify-center gap-[2px] mb-2">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-8"
                        style={{
                          width: i % 4 === 0 ? "3px" : "1px",
                          background: i % 5 === 0 ? COLORS.peach : `${COLORS.white}80`,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    className="text-center text-[8px] font-display tracking-[0.5em]"
                    style={{ color: `${COLORS.white}50` }}
                  >
                    {event.id.toUpperCase()}
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="flex items-center justify-between pt-4 mt-4"
                  style={{ borderTop: `1px solid ${COLORS.peach}30` }}
                >
                  <span
                    className="text-[9px] font-display tracking-[0.25em]"
                    style={{ color: `${COLORS.white}50` }}
                  >
                    PRAKARSH '26
                  </span>
                  <motion.span
                    className="text-[10px] font-display tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: COLORS.peach }}
                  >
                    ENTER →
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        </InteractiveTilt>
      </Link>
    </motion.div>
  );
}
