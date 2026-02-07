import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface TeamSliderProps {
  members: TeamMember[];
}

const COLORS = {
  white: "#FFFFFF",
  peach: "#F1B5A2",
  accent: "#3C2A56",
} as const;

const TRANSITION_DURATION = 600; // ms

function SlideCard({
  member,
  index,
  position,
}: {
  member: TeamMember;
  index: number;
  position: "previous" | "current" | "next" | "hidden";
}) {
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, bgX: 0, bgY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (position !== "current") return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const ox = (e.clientX - rect.left - rect.width * 0.5) / (Math.PI * 3);
      const oy = -(e.clientY - rect.top - rect.height * 0.5) / (Math.PI * 4);
      setTilt({ rotX: ox, rotY: oy, bgX: -ox * 0.3, bgY: oy * 0.3 });
    },
    [position]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotX: 0, rotY: 0, bgX: 0, bgY: 0 });
  }, []);

  const getTransformStyles = () => {
    switch (position) {
      case "current":
        return {
          transform: `perspective(1000px) translate3d(0, 0, 0) rotateY(0deg) scale(1.15) rotateX(${tilt.rotY}deg) rotateY(${tilt.rotX}deg)`,
          zIndex: 20,
          opacity: 1,
          filter: "brightness(0.9)",
        };
      case "next":
        return {
          transform:
            "perspective(1000px) translate3d(115%, 0, 0) rotateY(-45deg) scale(1)",
          zIndex: 10,
          opacity: 1,
          filter: "brightness(0.5)",
        };
      case "previous":
        return {
          transform:
            "perspective(1000px) translate3d(-115%, 0, 0) rotateY(45deg) scale(1)",
          zIndex: 10,
          opacity: 1,
          filter: "brightness(0.5)",
        };
      default:
        return {
          transform:
            "perspective(1000px) translate3d(0, 0, -500px) rotateY(0deg) scale(0.5)",
          zIndex: 0,
          opacity: 0,
          filter: "brightness(0.3)",
        };
    }
  };

  const styles = getTransformStyles();
  const serialNum = `PRK-${String(index + 1).padStart(3, "0")}`;

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
      style={{
        width: "min(25vw, 280px)",
        aspectRatio: "2 / 3",
        ...styles,
        transition: `transform ${TRANSITION_DURATION}ms ease, opacity ${TRANSITION_DURATION}ms ease, filter ${TRANSITION_DURATION}ms ease`,
        pointerEvents: position === "current" ? "auto" : "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full overflow-hidden relative"
        style={{
          borderRadius: "10px",
          border: `1px solid ${position === "current" ? COLORS.peach : `${COLORS.peach}30`}`,
          background: COLORS.accent,
          boxShadow:
            position === "current"
              ? `0 0 60px -15px ${COLORS.peach}40, 0 25px 50px -15px rgba(0,0,0,0.5)`
              : `0 10px 30px -10px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Photo area */}
        <div className="relative w-full" style={{ height: "68%" }}>
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `scale(1.15) translate3d(${tilt.bgX}%, ${tilt.bgY}%, 0)`,
                transition: "transform 0.15s ease-out",
              }}
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="hex-grid absolute inset-0 opacity-20" />
              <div
                className="relative text-9xl font-display font-black"
                style={{ color: `${COLORS.peach}12` }}
              >
                {member.name.charAt(0)}
              </div>
            </div>
          )}

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${COLORS.accent} 0%, transparent 50%)`,
            }}
          />

          {/* Corner marks */}
          <div
            className="absolute top-3 left-3 w-4 h-4 border-t border-l"
            style={{ borderColor: `${COLORS.peach}50` }}
          />
          <div
            className="absolute top-3 right-3 w-4 h-4 border-t border-r"
            style={{ borderColor: `${COLORS.peach}50` }}
          />
        </div>

        {/* Info area */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-4"
          style={{ height: "32%" }}
        >
          {/* Role label */}
          <div
            className="inline-block px-2.5 py-1 mb-2"
            style={{
              background: `${COLORS.peach}15`,
              border: `1px solid ${COLORS.peach}25`,
              clipPath:
                "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
            }}
          >
            <span
              className="text-[8px] font-display tracking-[0.3em] uppercase"
              style={{ color: COLORS.peach }}
            >
              {member.role}
            </span>
          </div>

          <h3
            className="font-display text-sm font-bold tracking-[0.12em] uppercase leading-tight"
            style={{ color: COLORS.white }}
          >
            {member.name}
          </h3>

          <div className="flex items-center justify-between mt-2">
            <span
              className="text-[7px] font-display tracking-[0.3em]"
              style={{ color: `${COLORS.peach}50` }}
            >
              {serialNum}
            </span>
            <div className="flex gap-[1px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3"
                  style={{
                    width: i % 3 === 0 ? "2px" : "1px",
                    background:
                      i % 5 === 0 ? `${COLORS.peach}40` : `${COLORS.peach}20`,
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

export default function TeamSlider({ members }: TeamSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const wrap = (n: number, max: number) => ((n % max) + max) % max;

  const prevIndex = wrap(currentIndex - 1, members.length);
  const nextIndex = wrap(currentIndex + 1, members.length);

  const change = useCallback(
    (direction: 1 | -1) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex((prev) => wrap(prev + direction, members.length));
      setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
    },
    [isTransitioning, members.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") change(-1);
      if (e.key === "ArrowRight") change(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [change]);

  const currentMember = members[currentIndex];

  const getPosition = (
    idx: number
  ): "previous" | "current" | "next" | "hidden" => {
    if (idx === currentIndex) return "current";
    if (idx === prevIndex) return "previous";
    if (idx === nextIndex) return "next";
    return "hidden";
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Blurred background from current slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMember.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: currentMember.image
              ? `url(${currentMember.image})`
              : `linear-gradient(135deg, ${COLORS.accent}, hsl(240 15% 3%))`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(60px) brightness(0.2)",
            transform: "scale(1.2)",
          }}
        />
      </AnimatePresence>

      {/* Slider area */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center z-10">
        {/* Prev button */}
        <button
          onClick={() => change(-1)}
          disabled={isTransitioning}
          className="absolute left-4 md:left-8 z-30 p-2 opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30"
          style={{ color: COLORS.white }}
        >
          <ChevronLeft size={36} />
        </button>

        {/* Cards container */}
        <div
          className="relative w-full mx-auto"
          style={{
            height: "min(65vh, 500px)",
          }}
        >
          {members.map((member, idx) => (
            <SlideCard
              key={member.id}
              member={member}
              index={idx}
              position={getPosition(idx)}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => change(1)}
          disabled={isTransitioning}
          className="absolute right-4 md:right-8 z-30 p-2 opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30"
          style={{ color: COLORS.white }}
        >
          <ChevronRight size={36} />
        </button>
      </div>

      {/* Info panel below */}
      <div className="relative z-10 mt-8 text-center min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMember.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="text-[10px] font-display tracking-[0.4em] mb-2"
              style={{ color: `${COLORS.peach}70` }}
            >
              PERSONNEL FILE // {String(currentIndex + 1).padStart(2, "0")} OF{" "}
              {String(members.length).padStart(2, "0")}
            </div>
            <h2
              className="font-display text-3xl md:text-5xl font-bold tracking-[0.12em] uppercase"
              style={{ color: COLORS.white }}
            >
              {currentMember.name}
            </h2>
            <div className="mt-3 flex items-center justify-center gap-4">
              <div
                className="h-px w-12"
                style={{
                  background: `linear-gradient(90deg, transparent, ${COLORS.peach}50)`,
                }}
              />
              <span
                className="text-sm font-display tracking-[0.3em] uppercase"
                style={{ color: COLORS.peach }}
              >
                {currentMember.role}
              </span>
              <div
                className="h-px w-12"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.peach}50, transparent)`,
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="relative z-10 mt-6 flex items-center gap-2">
        {members.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(idx);
                setTimeout(
                  () => setIsTransitioning(false),
                  TRANSITION_DURATION
                );
              }
            }}
            className="p-1"
          >
            <div
              className="transition-all duration-300"
              style={{
                width: idx === currentIndex ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background:
                  idx === currentIndex
                    ? COLORS.peach
                    : `${COLORS.peach}30`,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
