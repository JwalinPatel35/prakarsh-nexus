import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Event } from "@/data/events";
import InteractiveTilt from "@/components/InteractiveTilt";

interface TerminalCardProps {
  event: Event;
  index: number;
}

const COLORS = {
  white: "#FFFFFF",
  peach: "#F1B5A2",
  accent: "#3C2A56",
} as const;

export default function TerminalCard({ event, index }: TerminalCardProps) {
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
            {/* Card base - terminal style */}
            <div
              className="relative h-full overflow-hidden"
              style={{
                clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                boxShadow: `0 0 0 1px ${COLORS.peach}, 0 0 25px -8px ${COLORS.peach}50`,
                background: COLORS.accent,
              }}
            >
              {/* Terminal header bar */}
              <div
                className="flex items-center justify-between px-4 py-2"
                style={{
                  borderBottom: `1px solid ${COLORS.peach}50`,
                  background: COLORS.accent,
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: COLORS.peach }} />
                  <div className="h-2 w-2 rounded-full" style={{ border: `1px solid ${COLORS.peach}` }} />
                  <div className="h-2 w-2 rounded-full" style={{ border: `1px solid ${COLORS.peach}` }} />
                </div>
                <div
                  className="font-display text-[9px] tracking-[0.4em]"
                  style={{ color: COLORS.peach }}
                >
                  TERMINAL.{String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Terminal content */}
              <div className="p-4 space-y-4">
                {/* Command line */}
                <div className="flex items-start gap-2">
                  <span style={{ color: COLORS.peach }} className="font-display text-xs">{">"}</span>
                  <div>
                    <span style={{ color: `${COLORS.white}70` }} className="text-xs font-display tracking-wider">
                      LOAD_EVENT --id=
                    </span>
                    <span style={{ color: COLORS.peach }} className="text-xs font-display">
                      {event.id}
                    </span>
                  </div>
                </div>

                {/* Main content area */}
                <div
                  className="relative min-h-[220px] p-4"
                  style={{
                    border: `1px solid ${COLORS.peach}40`,
                    background: COLORS.accent,
                  }}
                >
                  {/* Scanlines effect */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${COLORS.white}08 2px, ${COLORS.white}08 4px)`,
                    }}
                  />

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Event name */}
                    <div>
                      <div
                        className="text-[10px] font-display tracking-[0.3em] mb-1"
                        style={{ color: `${COLORS.white}60` }}
                      >
                        EVENT_NAME:
                      </div>
                      <div
                        className="font-display text-2xl font-black tracking-[0.15em] uppercase"
                        style={{ color: COLORS.white }}
                      >
                        {event.name}
                      </div>
                    </div>

                    {/* Data blocks */}
                    <div className="space-y-3 mt-6">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] font-display tracking-[0.2em]"
                          style={{ color: `${COLORS.white}60` }}
                        >
                          STATUS
                        </span>
                        <span
                          className="text-[10px] font-display tracking-[0.15em]"
                          style={{ color: COLORS.peach }}
                        >
                          ACTIVE
                        </span>
                      </div>
                      <div
                        className="h-[1px] w-full"
                        style={{ background: `${COLORS.peach}30` }}
                      />
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] font-display tracking-[0.2em]"
                          style={{ color: `${COLORS.white}60` }}
                        >
                          CATEGORY
                        </span>
                        <span
                          className="text-[10px] font-display tracking-[0.15em] uppercase"
                          style={{ color: COLORS.peach }}
                        >
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar decoration */}
                    <div className="mt-6">
                      <div
                        className="h-1 w-full"
                        style={{ background: `${COLORS.peach}20` }}
                      >
                        <motion.div
                          className="h-full"
                          style={{ background: COLORS.peach, width: "65%" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: "65%" }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer command */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span style={{ color: COLORS.peach }} className="font-display text-xs">{">"}</span>
                    <span
                      className="text-[10px] font-display tracking-[0.2em]"
                      style={{ color: `${COLORS.white}50` }}
                    >
                      PRAKARSH.26
                    </span>
                  </div>
                  <motion.span
                    className="text-[10px] font-display tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: COLORS.peach }}
                  >
                    EXECUTE →
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
