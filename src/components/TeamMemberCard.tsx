import { motion } from "framer-motion";
import InteractiveTilt from "@/components/InteractiveTilt";

interface TeamMemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    image: string;
  };
  index: number;
}

const COLORS = {
  white: "#FFFFFF",
  peach: "#F1B5A2",
  accent: "#3C2A56",
} as const;

/* ── Topographic wave SVG background ── */
function TopoPattern() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${100 + i * 8} Q50 ${80 + i * 12},100 ${100 + i * 8} T200 ${100 + i * 8}`}
          fill="none"
          stroke={COLORS.peach}
          strokeWidth="0.8"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={`b-${i}`}
          d={`M0 ${60 + i * 10} Q80 ${40 + i * 14},160 ${70 + i * 10} T200 ${60 + i * 10}`}
          fill="none"
          stroke={COLORS.peach}
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}

/* ── Barcode decoration ── */
function Barcode({ value }: { value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-[1px]">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="h-5"
            style={{
              width: i % 3 === 0 ? "2px" : "1px",
              background:
                i % 5 === 0
                  ? COLORS.accent
                  : `${COLORS.accent}90`,
            }}
          />
        ))}
      </div>
      <span
        className="text-[7px] font-display tracking-[0.4em]"
        style={{ color: `${COLORS.accent}70` }}
      >
        {value}
      </span>
    </div>
  );
}

/* ── Lanyard clip at top ── */
function LanyardClip() {
  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
      {/* String */}
      <div
        className="w-[2px] h-4"
        style={{ background: `${COLORS.peach}80` }}
      />
      {/* Metal ring */}
      <div
        className="w-5 h-3 rounded-full"
        style={{
          border: `2px solid ${COLORS.peach}`,
          background: `${COLORS.accent}`,
        }}
      />
    </div>
  );
}

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const serialNum = `PRK-${String(index + 1).padStart(3, "0")}`;
  const matricula = String(1000000 + index * 7919)
    .slice(0, 7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="pt-4" /* room for lanyard clip */
    >
      <InteractiveTilt accentVar="--neon-orange" className="group">
        <div className="relative">
          <LanyardClip />

          {/* Card shell */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "12px",
              boxShadow: `0 0 0 1px ${COLORS.peach}60, 0 8px 40px -12px ${COLORS.accent}80`,
              background: COLORS.accent,
            }}
          >
            {/* ─── DARK UPPER SECTION ─── */}
            <div className="relative">
              {/* Header bar */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: `1px solid ${COLORS.peach}20` }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: COLORS.peach,
                      boxShadow: `0 0 8px ${COLORS.peach}80`,
                    }}
                  />
                  <span
                    className="text-[10px] font-display tracking-[0.3em] uppercase"
                    style={{ color: `${COLORS.white}70` }}
                  >
                    Prakarsh '26
                  </span>
                </div>
                {/* Octagon brand mark */}
                <div
                  className="h-8 w-8 flex items-center justify-center"
                  style={{
                    clipPath:
                      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                    border: `1.5px solid ${COLORS.peach}`,
                    background: COLORS.accent,
                  }}
                >
                  <span
                    className="font-display text-[10px] font-black"
                    style={{ color: COLORS.peach }}
                  >
                    P
                  </span>
                </div>
              </div>

              {/* Photo area */}
              <div className="relative px-5 py-4">
                <TopoPattern />

                <div className="relative flex justify-center">
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: "4 / 5",
                      maxWidth: "220px",
                      background: `${COLORS.accent}`,
                      border: `1px solid ${COLORS.peach}30`,
                      boxShadow: `0 0 30px -10px ${COLORS.peach}20`,
                    }}
                  >
                    {/* Photo or initial placeholder */}
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="hex-grid absolute inset-0 opacity-20" />
                        <div
                          className="relative text-7xl font-display font-black"
                          style={{ color: `${COLORS.peach}20` }}
                        >
                          {member.name.charAt(0)}
                        </div>
                      </div>
                    )}

                    {/* Scan line on hover */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <motion.div
                        className="absolute left-0 right-0 h-[2px]"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${COLORS.peach}, transparent)`,
                        }}
                        animate={{ top: ["0%", "100%"] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>

                    {/* Corner brackets */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l" style={{ borderColor: `${COLORS.peach}60` }} />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r" style={{ borderColor: `${COLORS.peach}60` }} />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l" style={{ borderColor: `${COLORS.peach}60` }} />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r" style={{ borderColor: `${COLORS.peach}60` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ─── LIGHT INFO PANEL ─── */}
            <div
              className="relative px-5 py-4 space-y-3"
              style={{
                background: `${COLORS.white}F2`,
              }}
            >
              {/* Role label */}
              <div
                className="px-3 py-1.5 inline-block"
                style={{
                  background: COLORS.accent,
                  clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
                }}
              >
                <span
                  className="text-[9px] font-display tracking-[0.3em] uppercase"
                  style={{ color: COLORS.peach }}
                >
                  {member.role}
                </span>
              </div>

              {/* Name and metadata row */}
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div
                    className="text-[8px] font-display tracking-[0.3em] mb-1"
                    style={{ color: `${COLORS.accent}60` }}
                  >
                    NAME
                  </div>
                  <h3
                    className="font-display text-lg font-bold tracking-[0.1em] uppercase leading-tight"
                    style={{ color: COLORS.accent }}
                  >
                    {member.name}
                  </h3>
                </div>
                {/* Sector */}
                <div className="text-right flex-shrink-0">
                  <div
                    className="text-[8px] font-display tracking-[0.3em]"
                    style={{ color: `${COLORS.accent}60` }}
                  >
                    SECTOR
                  </div>
                  <div
                    className="font-display text-lg font-bold"
                    style={{ color: COLORS.accent }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.accent}40, ${COLORS.accent}15, transparent)`,
                }}
              />

              {/* Bottom row: matricula + barcode */}
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="text-[7px] font-display tracking-[0.3em] mb-0.5"
                    style={{ color: `${COLORS.accent}50` }}
                  >
                    MATRICULA
                  </div>
                  <span
                    className="font-display text-xs font-bold tracking-[0.15em]"
                    style={{ color: COLORS.accent }}
                  >
                    {matricula}
                  </span>
                </div>

                <Barcode value={serialNum} />
              </div>
            </div>

            {/* Hover glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: `inset 0 0 50px -20px ${COLORS.peach}25, 0 0 60px -25px ${COLORS.peach}30`,
                borderRadius: "12px",
              }}
            />
          </div>
        </div>
      </InteractiveTilt>
    </motion.div>
  );
}
