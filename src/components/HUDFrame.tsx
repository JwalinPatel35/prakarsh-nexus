import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HUDFrameProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  label?: string;
  labelPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  animate?: boolean;
}

/**
 * Reusable transparent HUD frame with notched corners and accent styling.
 * Matches the aesthetic of EventIdCard for consistency across the site.
 */
export default function HUDFrame({
  children,
  className,
  accentColor = "hsl(var(--primary))",
  label,
  labelPosition = "top-left",
  animate = true,
}: HUDFrameProps) {
  const Wrapper = animate ? motion.div : "div";
  const animateProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }
    : {};

  const labelPositionClasses = {
    "top-left": "top-0 left-4",
    "top-right": "top-0 right-4",
    "bottom-left": "bottom-0 left-4",
    "bottom-right": "bottom-0 right-4",
  };

  return (
    <Wrapper
      {...animateProps}
      className={cn("relative", className)}
      style={
        {
          "--hud-accent": accentColor,
        } as React.CSSProperties
      }
    >
      {/* Outer notched frame */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath:
            "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
          border: `1px solid ${accentColor}40`,
        }}
      />

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2"
        style={{ borderColor: accentColor }}
      />

      {/* Optional label */}
      {label && (
        <div
          className={cn(
            "absolute -translate-y-1/2 px-3 py-1 bg-background/80 backdrop-blur-sm",
            labelPositionClasses[labelPosition]
          )}
        >
          <span
            className="text-xs font-display tracking-widest uppercase"
            style={{ color: accentColor }}
          >
            {label}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative">{children}</div>
    </Wrapper>
  );
}
