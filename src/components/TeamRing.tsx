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

const COLORS = {
  white: "#FFFFFF",
  peach: "#F1B5A2",
  accent: "#3C2A56",
} as const;

function RingCard({
  member,
  index,
  isActive,
}: {
  member: TeamMember;
  index: number;
  isActive: boolean;
}) {
  const serialNum = `PRK-${String(index + 1).padStart(3, "0")}`;

  return (
    <div
      className="w-full h-full relative select-none"
      style={{ backfaceVisibility: "hidden" }}
    >
      {/* Card shell */}
      <div
        className="w-full h-full overflow-hidden relative"
        style={{
          borderRadius: "10px",
          border: `1px solid ${isActive ? COLORS.peach : `${COLORS.peach}40`}`,
          background: COLORS.accent,
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          boxShadow: isActive
            ? `0 0 40px -10px ${COLORS.peach}50, 0 0 80px -20px ${COLORS.peach}30`
            : `0 4px 20px -8px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Photo area */}
        <div className="relative w-full" style={{ height: "65%" }}>
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="hex-grid absolute inset-0 opacity-20" />
              <div
                className="relative text-8xl font-display font-black"
                style={{ color: `${COLORS.peach}18` }}
              >
                {member.name.charAt(0)}
              </div>
            </div>
          )}

          {/* Scan line on active */}
          {isActive && (
            <motion.div
              className="absolute left-0 right-0 h-[2px] pointer-events-none"
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
          )}

          {/* Corner brackets */}
          <div
            className="absolute top-2 left-2 w-3 h-3 border-t border-l"
            style={{ borderColor: `${COLORS.peach}60` }}
          />
          <div
            className="absolute top-2 right-2 w-3 h-3 border-t border-r"
            style={{ borderColor: `${COLORS.peach}60` }}
          />
          <div
            className="absolute bottom-2 left-2 w-3 h-3 border-b border-l"
            style={{ borderColor: `${COLORS.peach}60` }}
          />
          <div
            className="absolute bottom-2 right-2 w-3 h-3 border-b border-r"
            style={{ borderColor: `${COLORS.peach}60` }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${COLORS.accent} 0%, transparent 40%)`,
            }}
          />
        </div>

        {/* Info area */}
        <div
          className="relative px-4 py-3 flex flex-col justify-between"
          style={{
            height: "35%",
            background: `linear-gradient(180deg, ${COLORS.accent} 0%, ${COLORS.accent}F0 100%)`,
          }}
        >
          {/* Role chip */}
          <div
            className="inline-block self-start px-2.5 py-1"
            style={{
              background: `${COLORS.peach}15`,
              border: `1px solid ${COLORS.peach}30`,
              clipPath:
                "polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)",
            }}
          >
            <span
              className="text-[8px] font-display tracking-[0.3em] uppercase"
              style={{ color: COLORS.peach }}
            >
              {member.role}
            </span>
          </div>

          {/* Name */}
          <h3
            className="font-display text-sm font-bold tracking-[0.12em] uppercase leading-tight mt-1"
            style={{ color: COLORS.white }}
          >
            {member.name}
          </h3>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-auto">
            <span
              className="text-[8px] font-display tracking-[0.3em]"
              style={{ color: `${COLORS.peach}60` }}
            >
              {serialNum}
            </span>
            <div className="flex gap-[1px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3"
                  style={{
                    width: i % 3 === 0 ? "2px" : "1px",
                    background:
                      i % 5 === 0 ? `${COLORS.peach}50` : `${COLORS.peach}25`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const radius = Math.max(400, numItems * 32); // dynamic radius

  // Calculate which card is facing front
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
      if (containerRef.current)
        containerRef.current.style.cursor = "grabbing";
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
    if (containerRef.current)
      containerRef.current.style.cursor = "grab";

    // Snap to nearest card
    const snapAngle =
      Math.round(currentRotation.current / anglePerItem) * anglePerItem;
    const startRot = currentRotation.current;
    const diff = snapAngle - startRot;
    const duration = 400;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
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

  // Touch support
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

  // The active member info
  const activeMember = members[activeIndex] || members[0];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Active member info display */}
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
            className="text-[10px] font-display tracking-[0.4em] mb-2"
            style={{ color: `${COLORS.peach}80` }}
          >
            PERSONNEL // SECTOR {String(activeIndex + 1).padStart(2, "0")}
          </div>
          <h2
            className="font-display text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase"
            style={{ color: COLORS.white }}
          >
            {activeMember.name}
          </h2>
          <div
            className="mt-2 inline-block px-4 py-1.5"
            style={{
              border: `1px solid ${COLORS.peach}40`,
              clipPath:
                "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
            }}
          >
            <span
              className="text-xs font-display tracking-[0.3em] uppercase"
              style={{ color: COLORS.peach }}
            >
              {activeMember.role}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 3D Ring container */}
      <div
        ref={containerRef}
        className="relative w-full select-none"
        style={{
          height: "420px",
          perspective: "1200px",
          cursor: "grab",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Ring element */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: "240px",
            height: "340px",
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
            background: `linear-gradient(90deg, transparent, ${COLORS.peach}40)`,
          }}
        />
        <span
          className="text-[10px] font-display tracking-[0.3em] uppercase"
          style={{ color: `${COLORS.peach}50` }}
        >
          Drag to rotate
        </span>
        <div
          className="h-px w-12"
          style={{
            background: `linear-gradient(90deg, ${COLORS.peach}40, transparent)`,
          }}
        />
      </motion.div>
    </div>
  );
}
