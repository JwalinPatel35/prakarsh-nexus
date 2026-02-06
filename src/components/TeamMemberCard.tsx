import { motion } from "framer-motion";

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

function DnaStrip() {
  return (
    <div
      aria-hidden
      className="flex flex-col items-center gap-[3px] py-2"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-[2px]"
        >
          <div
            className="h-[3px] rounded-full"
            style={{
              width: i % 3 === 0 ? 8 : i % 2 === 0 ? 5 : 3,
              background: i % 4 === 0 ? COLORS.peach : `${COLORS.peach}50`,
            }}
          />
          <div
            className="h-[3px] rounded-full"
            style={{
              width: i % 3 === 1 ? 8 : i % 2 === 1 ? 5 : 3,
              background: i % 3 === 0 ? COLORS.peach : `${COLORS.peach}40`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isTop = position.startsWith("t");
  const isLeft = position.endsWith("l");

  return (
    <div
      className="absolute"
      style={{
        top: isTop ? 0 : "auto",
        bottom: !isTop ? 0 : "auto",
        left: isLeft ? 0 : "auto",
        right: !isLeft ? 0 : "auto",
      }}
    >
      <div
        className="h-5 w-5"
        style={{
          borderTop: isTop ? `2px solid ${COLORS.peach}` : "none",
          borderBottom: !isTop ? `2px solid ${COLORS.peach}` : "none",
          borderLeft: isLeft ? `2px solid ${COLORS.peach}` : "none",
          borderRight: !isLeft ? `2px solid ${COLORS.peach}` : "none",
        }}
      />
    </div>
  );
}

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const serialNum = `PRK-${String(index + 1).padStart(3, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group"
    >
      <motion.div
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-full"
      >
        {/* Card shell */}
        <div
          className="relative h-full overflow-hidden"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))",
            boxShadow: `0 0 0 1px ${COLORS.peach}, 0 0 40px -15px ${COLORS.peach}30`,
            background: COLORS.accent,
          }}
        >
          {/* Inner border echo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[8px]"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
              boxShadow: `0 0 0 1px ${COLORS.peach}30`,
            }}
          />

          <div className="relative z-10 grid grid-rows-[auto_1fr_auto] h-full">
            {/* Header strip */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{
                borderBottom: `1px solid ${COLORS.peach}40`,
              }}
            >
              <div className="flex items-center gap-2">
                {/* Status dot */}
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: COLORS.peach,
                    boxShadow: `0 0 6px ${COLORS.peach}`,
                  }}
                />
                <span
                  className="text-[9px] font-display tracking-[0.35em]"
                  style={{ color: `${COLORS.white}80` }}
                >
                  PERSONNEL
                </span>
              </div>
              <span
                className="text-[10px] font-display tracking-[0.25em] font-bold"
                style={{ color: COLORS.peach }}
              >
                {serialNum}
              </span>
            </div>

            {/* Body: photo + side strip */}
            <div className="flex">
              {/* Side strip */}
              <div
                className="flex flex-col items-center justify-between py-3 px-2"
                style={{
                  borderRight: `1px solid ${COLORS.peach}30`,
                  minWidth: 32,
                }}
              >
                <DnaStrip />
                <div
                  className="font-display text-[8px] tracking-[0.3em]"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    color: `${COLORS.peach}70`,
                  }}
                >
                  PRAKARSH.26
                </div>
              </div>

              {/* Photo window */}
              <div className="flex-1 p-3">
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "4 / 5",
                    clipPath:
                      "polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)",
                    background: `${COLORS.accent}`,
                    boxShadow: `inset 0 0 30px -10px ${COLORS.peach}20`,
                  }}
                >
                  {/* Corner brackets */}
                  <div className="absolute inset-2 z-20 pointer-events-none">
                    <CornerBracket position="tl" />
                    <CornerBracket position="tr" />
                    <CornerBracket position="bl" />
                    <CornerBracket position="br" />
                  </div>

                  {/* Hex grid background */}
                  <div className="absolute inset-0 hex-grid opacity-10" />

                  {/* Photo or placeholder initial */}
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div
                        className="text-7xl font-display font-black"
                        style={{ color: `${COLORS.peach}25` }}
                      >
                        {member.name.charAt(0)}
                      </div>
                    </div>
                  )}

                  {/* Scan line on hover */}
                  <div className="absolute inset-0 z-30 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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

                  {/* Classification label */}
                  <div
                    className="absolute bottom-3 left-3 z-20 px-2 py-1"
                    style={{
                      background: `${COLORS.accent}CC`,
                      border: `1px solid ${COLORS.peach}40`,
                    }}
                  >
                    <span
                      className="text-[8px] font-display tracking-[0.3em]"
                      style={{ color: `${COLORS.white}90` }}
                    >
                      CLASSIFIED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer info panel */}
            <div
              className="px-4 py-3 space-y-2"
              style={{
                borderTop: `1px solid ${COLORS.peach}40`,
              }}
            >
              {/* Name */}
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="text-[9px] font-display tracking-[0.3em] mb-1"
                    style={{ color: `${COLORS.white}60` }}
                  >
                    NAME
                  </div>
                  <h3
                    className="font-display text-lg font-bold tracking-[0.12em] uppercase leading-tight"
                    style={{ color: COLORS.white }}
                  >
                    {member.name}
                  </h3>
                </div>

                {/* Octagon mark */}
                <div
                  className="h-9 w-9 flex items-center justify-center flex-shrink-0"
                  style={{
                    clipPath:
                      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                    border: `1px solid ${COLORS.peach}`,
                    background: COLORS.accent,
                  }}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      boxShadow: `0 0 0 2px ${COLORS.peach}`,
                    }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.peach}60, ${COLORS.peach}20, transparent)`,
                }}
              />

              {/* Role row */}
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="text-[9px] font-display tracking-[0.3em] mb-0.5"
                    style={{ color: `${COLORS.white}60` }}
                  >
                    DESIGNATION
                  </div>
                  <p
                    className="text-sm font-body tracking-wide"
                    style={{ color: COLORS.peach }}
                  >
                    {member.role}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="h-[2px] w-6"
                    style={{ background: `${COLORS.peach}50` }}
                  />
                  <span
                    className="text-[8px] font-display tracking-[0.3em]"
                    style={{ color: `${COLORS.peach}70` }}
                  >
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hover glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
            style={{
              boxShadow: `inset 0 0 40px -15px ${COLORS.peach}30, 0 0 50px -20px ${COLORS.peach}25`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
