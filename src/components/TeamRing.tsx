import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface TeamRingProps {
  members: TeamMember[];
}

/* ── Prakarsh poster palette ── */
const C = {
  cardBg: "#1A0E2E",
  cardBgLight: "#2D1B4E",
  purple: "#6B3FA0",
  pink: "#E84FAA",
  blue: "#4A90D9",
  cyan: "#6CB4EE",
  gold: "#D4A574",
  peach: "#F1B5A2",
  white: "#FFFFFF",
  statsBg: "#140B24",
} as const;

/* ── Individual ring card — NFT style ── */
function RingCard({
  member,
  index,
  isActive,
}: {
  member: TeamMember;
  index: number;
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const serialNum = `PRK-${String(index + 1).padStart(3, "0")}`;
  const sectorNum = String(index + 1).padStart(2, "0");

  return (
    <div
      className="w-full h-full relative select-none"
      style={{ backfaceVisibility: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-[2px] rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: hovered || isActive ? 1 : 0,
          background: `linear-gradient(135deg, ${C.pink}, ${C.blue}, ${C.purple})`,
          filter: "blur(8px)",
        }}
      />

      {/* Card body */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: `linear-gradient(180deg, ${C.cardBgLight} 0%, ${C.cardBg} 100%)`,
          border: `1.5px solid ${hovered || isActive ? `${C.pink}90` : `${C.purple}50`}`,
          transition: "border-color 0.4s ease, transform 0.35s ease",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          boxShadow: hovered
            ? `0 0 40px -10px ${C.pink}60, 0 8px 30px -5px rgba(0,0,0,0.5)`
            : `0 4px 20px -8px rgba(0,0,0,0.6)`,
        }}
      >
        {/* ── Top badge (role) ── */}
        <div className="flex justify-center pt-3 pb-2 relative z-10">
          <div
            className="px-4 py-1 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase"
            style={{
              background: `linear-gradient(135deg, ${C.blue}DD, ${C.purple}DD)`,
              color: C.white,
              boxShadow: `0 2px 10px ${C.blue}40`,
              transition: "box-shadow 0.3s ease",
              ...(hovered ? { boxShadow: `0 2px 18px ${C.blue}70` } : {}),
            }}
          >
            {member.role}
          </div>
        </div>

        {/* ── Image area ── */}
        <div className="relative mx-3 flex-1 min-h-0" style={{ maxHeight: "55%" }}>
          {/* Gradient border wrapper */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `linear-gradient(160deg, ${C.pink}80, ${C.blue}80, ${C.purple}80)`,
              padding: "2px",
            }}
          >
            <div
              className="w-full h-full rounded-xl overflow-hidden relative"
              style={{ background: C.cardBg }}
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                  style={{
                    transition: "transform 0.5s ease",
                    transform: hovered ? "scale(1.08)" : "scale(1)",
                  }}
                />
              ) : (
                /* Placeholder with decorative pattern */
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  {/* Background gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${C.purple}60 0%, ${C.cardBg} 70%)`,
                    }}
                  />
                  {/* Floating decorative circles */}
                  <div
                    className="absolute w-24 h-24 rounded-full opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${C.pink}, ${C.blue})`,
                      top: "15%",
                      left: "10%",
                      transition: "transform 0.5s ease",
                      transform: hovered ? "translate(5px, -5px) scale(1.1)" : "translate(0, 0)",
                    }}
                  />
                  <div
                    className="absolute w-16 h-16 rounded-full opacity-15"
                    style={{
                      background: `linear-gradient(135deg, ${C.blue}, ${C.cyan})`,
                      bottom: "20%",
                      right: "15%",
                      transition: "transform 0.5s ease",
                      transform: hovered ? "translate(-5px, 3px) scale(1.15)" : "translate(0, 0)",
                    }}
                  />
                  <div
                    className="absolute w-10 h-10 rounded-full opacity-10"
                    style={{
                      background: C.gold,
                      top: "40%",
                      right: "25%",
                      transition: "transform 0.5s ease",
                      transform: hovered ? "translate(-3px, -6px)" : "translate(0, 0)",
                    }}
                  />
                  {/* Big letter */}
                  <div
                    className="relative text-7xl font-bold select-none"
                    style={{
                      color: `${C.purple}40`,
                      transition: "color 0.4s ease",
                      ...(hovered ? { color: `${C.pink}50` } : {}),
                    }}
                  >
                    {member.name.charAt(0)}
                  </div>
                </div>
              )}

              {/* Hover scan line */}
              {(hovered || isActive) && (
                <motion.div
                  className="absolute left-0 right-0 h-[1px] pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${C.pink}80, ${C.cyan}80, transparent)`,
                  }}
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}

              {/* Small icon badge (bottom right) */}
              <div
                className="absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
                  border: `1.5px solid ${C.cyan}60`,
                  fontSize: "10px",
                  color: C.white,
                  fontWeight: 700,
                  opacity: hovered ? 1 : 0.7,
                  transition: "opacity 0.3s ease",
                }}
              >
                P
              </div>
            </div>
          </div>
        </div>

        {/* ── Info section ── */}
        <div className="px-3.5 pt-2.5 pb-1.5 flex flex-col gap-0.5 relative z-10">
          {/* Member ID */}
          <div
            className="text-[9px] font-semibold tracking-[0.15em] uppercase"
            style={{ color: C.gold }}
          >
            {serialNum}
          </div>

          {/* Name */}
          <h3
            className="text-sm font-extrabold tracking-[0.06em] uppercase leading-tight"
            style={{ color: C.white }}
          >
            {member.name}
          </h3>

          {/* Subtitle row */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${C.purple}, ${C.pink}80)`,
              }}
            >
              <span className="text-[8px] font-bold" style={{ color: C.white }}>
                P
              </span>
            </div>
            <span
              className="text-[9px] font-semibold tracking-[0.12em] uppercase"
              style={{ color: `${C.white}80` }}
            >
              PRAKARSH '26
            </span>
          </div>
        </div>

        {/* ── Stats footer ── */}
        <div
          className="mx-3 mb-3 mt-1.5 rounded-lg px-3 py-2 flex items-center justify-between"
          style={{
            background: C.statsBg,
            border: `1px solid ${C.purple}40`,
          }}
        >
          <div className="flex flex-col">
            <span
              className="text-[7px] tracking-[0.2em] uppercase"
              style={{ color: `${C.white}50` }}
            >
              Sector
            </span>
            <span
              className="text-xs font-bold"
              style={{ color: C.white }}
            >
              {sectorNum}
            </span>
          </div>

          <div
            className="w-[1px] h-6"
            style={{ background: `${C.purple}50` }}
          />

          <div className="flex flex-col items-end">
            <span
              className="text-[7px] tracking-[0.2em] uppercase"
              style={{ color: `${C.white}50` }}
            >
              Clearance
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: C.pink }}
                />
                <span className="text-[9px] font-bold" style={{ color: C.white }}>
                  A
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: C.blue }}
                />
                <span className="text-[9px] font-bold" style={{ color: C.white }}>
                  B
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main 3D ring carousel ── */
export default function TeamRing({ members }: TeamRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentRotation = useRef(180);
  const [rotation, setRotation] = useState(180);
  const [activeIndex, setActiveIndex] = useState(0);
  const animationRef = useRef<number>();

  const numItems = members.length;
  const anglePerItem = 360 / numItems;
  const radius = Math.max(400, numItems * 32);

  const getActiveIndex = useCallback(
    (rot: number) => {
      const normalized = ((rot % 360) + 360) % 360;
      const idx = Math.round(normalized / anglePerItem) % numItems;
      return idx;
    },
    [anglePerItem, numItems]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      if (containerRef.current) containerRef.current.style.cursor = "grabbing";
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current;
      const newRotation = currentRotation.current - dx * 0.3;
      setRotation(newRotation);
      setActiveIndex(getActiveIndex(newRotation));
      startX.current = e.clientX;
      currentRotation.current = newRotation;
    },
    [getActiveIndex]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = "grab";

    const snapAngle =
      Math.round(currentRotation.current / anglePerItem) * anglePerItem;
    const startRot = currentRotation.current;
    const diff = snapAngle - startRot;
    const duration = 400;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const newRot = startRot + diff * eased;
      setRotation(newRot);
      currentRotation.current = newRot;
      setActiveIndex(getActiveIndex(newRot));
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
  }, [anglePerItem, getActiveIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].clientX;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - startX.current;
      const newRotation = currentRotation.current - dx * 0.3;
      setRotation(newRotation);
      setActiveIndex(getActiveIndex(newRotation));
      startX.current = e.touches[0].clientX;
      currentRotation.current = newRotation;
    };

    const onTouchEnd = () => {
      handlePointerUp();
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [getActiveIndex, handlePointerUp]);

  const activeMember = members[activeIndex] || members[0];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Active member info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMember.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8 min-h-[80px]"
        >
          <div
            className="text-[10px] font-semibold tracking-[0.4em] mb-2"
            style={{ color: `${C.gold}90` }}
          >
            SECTOR {String(activeIndex + 1).padStart(2, "0")} // PERSONNEL
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-[0.08em] uppercase"
            style={{
              background: `linear-gradient(135deg, ${C.white}, ${C.peach})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {activeMember.name}
          </h2>
          <div className="mt-2 flex justify-center">
            <div
              className="px-5 py-1.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase"
              style={{
                background: `linear-gradient(135deg, ${C.purple}60, ${C.pink}40)`,
                border: `1px solid ${C.pink}50`,
                color: C.peach,
              }}
            >
              {activeMember.role}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 3D Ring */}
      <div
        ref={containerRef}
        className="relative w-full select-none"
        style={{
          height: "440px",
          perspective: "1200px",
          cursor: "grab",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: "240px",
            height: "360px",
            transform: `translate(-50%, -50%) rotateY(${-rotation}deg)`,
            transformStyle: "preserve-3d",
            transition: isDragging.current ? "none" : undefined,
          }}
        >
          {members.map((member, i) => {
            const angle = i * anglePerItem;
            return (
              <div
                key={member.id}
                className="absolute inset-0"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <RingCard
                  member={member}
                  index={i}
                  isActive={i === activeIndex}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Drag hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 flex items-center gap-3"
      >
        <div
          className="h-px w-12"
          style={{
            background: `linear-gradient(90deg, transparent, ${C.pink}50)`,
          }}
        />
        <span
          className="text-[10px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: `${C.peach}60` }}
        >
          Drag to rotate
        </span>
        <div
          className="h-px w-12"
          style={{
            background: `linear-gradient(90deg, ${C.pink}50, transparent)`,
          }}
        />
      </motion.div>
    </div>
  );
}
