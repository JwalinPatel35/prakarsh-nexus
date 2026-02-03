import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Event } from "@/data/events";
import InteractiveTilt from "@/components/InteractiveTilt";

interface DataCardProps {
  event: Event;
  index: number;
}

const COLORS = {
  white: "#FFFFFF",
  peach: "#F1B5A2",
  accent: "#3C2A56",
} as const;

function DataGrid() {
  return (
    <div className="grid grid-cols-4 gap-1" aria-hidden>
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="h-3 w-3"
          style={{
            background: i % 3 === 0 ? COLORS.peach : `${COLORS.peach}20`,
          }}
        />
      ))}
    </div>
  );
}

export default function DataCard({ event, index }: DataCardProps) {
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
            {/* Card base - data panel style */}
            <div
              className="relative h-full overflow-hidden"
              style={{
                clipPath: "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))",
                boxShadow: `0 0 0 1px ${COLORS.peach}, 0 0 30px -10px ${COLORS.peach}40`,
                background: COLORS.accent,
              }}
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: COLORS.peach }} />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: COLORS.peach }} />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: COLORS.peach }} />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: COLORS.peach }} />

              {/* Content */}
              <div className="relative z-10 h-full p-6 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <DataGrid />
                  <div className="text-right">
                    <div
                      className="text-[9px] font-display tracking-[0.4em]"
                      style={{ color: `${COLORS.white}60` }}
                    >
                      DATA.NODE
                    </div>
                    <div
                      className="font-display text-sm font-bold tracking-[0.2em] mt-1"
                      style={{ color: COLORS.peach }}
                    >
                      #{String(index + 1).padStart(3, "0")}
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Hexagon badge */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="relative w-20 h-20 flex items-center justify-center"
                      style={{
                        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        background: COLORS.accent,
                        boxShadow: `0 0 0 2px ${COLORS.peach}`,
                      }}
                    >
                      <div
                        className="w-14 h-14"
                        style={{
                          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          background: `${COLORS.peach}15`,
                          border: `1px solid ${COLORS.peach}50`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Event name */}
                  <div className="text-center">
                    <div
                      className="text-[10px] font-display tracking-[0.35em] mb-2"
                      style={{ color: `${COLORS.white}60` }}
                    >
                      IDENTIFIER
                    </div>
                    <div
                      className="font-display text-2xl font-black tracking-[0.12em] uppercase"
                      style={{ color: COLORS.white }}
                    >
                      {event.name}
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <div className="text-center">
                      <div
                        className="font-display text-lg font-bold"
                        style={{ color: COLORS.peach }}
                      >
                        {event.id.length}
                      </div>
                      <div
                        className="text-[8px] font-display tracking-[0.3em]"
                        style={{ color: `${COLORS.white}50` }}
                      >
                        CHARS
                      </div>
                    </div>
                    <div
                      className="w-[1px] h-8"
                      style={{ background: `${COLORS.peach}40` }}
                    />
                    <div className="text-center">
                      <div
                        className="font-display text-lg font-bold uppercase"
                        style={{ color: COLORS.peach }}
                      >
                        {event.category.slice(0, 4)}
                      </div>
                      <div
                        className="text-[8px] font-display tracking-[0.3em]"
                        style={{ color: `${COLORS.white}50` }}
                      >
                        TYPE
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="flex items-center justify-between pt-4 mt-auto"
                  style={{ borderTop: `1px solid ${COLORS.peach}30` }}
                >
                  <span
                    className="text-[9px] font-display tracking-[0.3em]"
                    style={{ color: `${COLORS.white}50` }}
                  >
                    PRAKARSH.26
                  </span>
                  <motion.span
                    className="text-[10px] font-display tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: COLORS.peach }}
                  >
                    ACCESS →
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
