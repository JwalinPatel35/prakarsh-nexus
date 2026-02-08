import { useEffect, useRef, memo } from "react";

/* ── Prakarsh poster-inspired animated background ──
   Deep purple sky · twinkling stars · drifting clouds
   Warm horizon glow · cityscape silhouette · art-deco side accents
*/

/* ── Deterministic pseudo-random (seeded) ── */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ── Star field ── */
const STAR_COUNT = 80;
const starData = (() => {
  const rng = seededRandom(42);
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    x: rng() * 100,
    y: rng() * 60, // mostly in the upper sky
    size: 1 + rng() * 2,
    opacity: 0.2 + rng() * 0.6,
    delay: rng() * 6,
    duration: 2 + rng() * 4,
  }));
})();

/* ── Cloud shapes ── */
const cloudData = [
  { x: -5, y: 52, scale: 1.1, speed: 120, opacity: 0.08, blur: 2 },
  { x: 30, y: 56, scale: 0.8, speed: 150, opacity: 0.06, blur: 3 },
  { x: 60, y: 50, scale: 1.3, speed: 180, opacity: 0.07, blur: 2 },
  { x: -20, y: 60, scale: 0.9, speed: 200, opacity: 0.05, blur: 4 },
  { x: 45, y: 64, scale: 1.0, speed: 160, opacity: 0.06, blur: 3 },
  { x: 80, y: 54, scale: 0.7, speed: 140, opacity: 0.08, blur: 2 },
];

function Cloud({ x, y, scale, opacity, blur }: { x: number; y: number; scale: number; opacity: number; blur: number }) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      opacity={opacity}
      filter={`url(#cloudBlur${blur})`}
    >
      <ellipse cx="0" cy="0" rx="60" ry="18" fill="url(#cloudGrad)" />
      <ellipse cx="-30" cy="3" rx="35" ry="14" fill="url(#cloudGrad)" />
      <ellipse cx="25" cy="5" rx="40" ry="15" fill="url(#cloudGrad)" />
      <ellipse cx="-10" cy="-6" rx="30" ry="12" fill="url(#cloudGrad)" />
    </g>
  );
}

/* ── City skyline ── */
function CitySkyline() {
  return (
    <g>
      {/* Buildings from left to right */}
      {/* Tall slim tower */}
      <rect x="5" y="72" width="3" height="20" fill="#2D1B4E" opacity="0.5" />
      <rect x="4.5" y="71" width="4" height="2" fill="#6B3FA0" opacity="0.3" />

      {/* Wide building */}
      <rect x="10" y="78" width="8" height="14" fill="#1A0E2E" opacity="0.6" />
      {/* Windows */}
      <rect x="11.5" y="80" width="1" height="1" fill="#E84FAA" opacity="0.15" />
      <rect x="14" y="80" width="1" height="1" fill="#6CB4EE" opacity="0.2" />
      <rect x="11.5" y="83" width="1" height="1" fill="#6CB4EE" opacity="0.12" />
      <rect x="14" y="83" width="1" height="1" fill="#E84FAA" opacity="0.18" />
      <rect x="11.5" y="86" width="1" height="1" fill="#D4A574" opacity="0.15" />

      {/* Medium tower */}
      <rect x="20" y="75" width="5" height="17" fill="#2D1B4E" opacity="0.55" />
      <rect x="21" y="77" width="1" height="1" fill="#E84FAA" opacity="0.2" />
      <rect x="23" y="77" width="1" height="1" fill="#6CB4EE" opacity="0.15" />
      <rect x="21" y="80" width="1" height="1" fill="#6CB4EE" opacity="0.18" />
      <rect x="23" y="83" width="1" height="1" fill="#E84FAA" opacity="0.12" />

      {/* Tall skyscraper */}
      <rect x="28" y="68" width="6" height="24" fill="#1A0E2E" opacity="0.65" />
      <rect x="27.5" y="67" width="7" height="2" fill="#6B3FA0" opacity="0.3" />
      {/* Windows */}
      <rect x="29.5" y="70" width="1" height="1.2" fill="#E84FAA" opacity="0.25" />
      <rect x="32" y="70" width="1" height="1.2" fill="#6CB4EE" opacity="0.2" />
      <rect x="29.5" y="73" width="1" height="1.2" fill="#6CB4EE" opacity="0.15" />
      <rect x="32" y="73" width="1" height="1.2" fill="#D4A574" opacity="0.18" />
      <rect x="29.5" y="76" width="1" height="1.2" fill="#E84FAA" opacity="0.12" />
      <rect x="32" y="79" width="1" height="1.2" fill="#6CB4EE" opacity="0.15" />

      {/* Short wide */}
      <rect x="36" y="82" width="10" height="10" fill="#2D1B4E" opacity="0.5" />
      <rect x="38" y="84" width="1" height="1" fill="#E84FAA" opacity="0.15" />
      <rect x="41" y="84" width="1" height="1" fill="#6CB4EE" opacity="0.2" />
      <rect x="44" y="84" width="1" height="1" fill="#D4A574" opacity="0.12" />

      {/* Arc/dome */}
      <ellipse cx="52" cy="85" rx="4" ry="6" fill="#1A0E2E" opacity="0.5" />

      {/* Tall pink tower */}
      <rect x="58" y="70" width="5" height="22" fill="#2D1B4E" opacity="0.6" />
      <rect x="59" y="72" width="1" height="1.5" fill="#E84FAA" opacity="0.3" />
      <rect x="61.5" y="72" width="1" height="1.5" fill="#E84FAA" opacity="0.2" />
      <rect x="59" y="76" width="1" height="1.5" fill="#6CB4EE" opacity="0.15" />
      <rect x="61.5" y="76" width="1" height="1.5" fill="#E84FAA" opacity="0.25" />
      <rect x="59" y="80" width="1" height="1.5" fill="#D4A574" opacity="0.18" />

      {/* Communication tower */}
      <rect x="67" y="72" width="2" height="20" fill="#1A0E2E" opacity="0.5" />
      <rect x="66" y="71" width="4" height="1.5" fill="#6B3FA0" opacity="0.3" />
      <rect x="67.5" y="68" width="1" height="4" fill="#6CB4EE" opacity="0.25" />
      <circle cx="68" cy="67.5" r="0.8" fill="#6CB4EE" opacity="0.35" />

      {/* Bridge arches */}
      <path d="M 72 88 Q 76 82 80 88" fill="none" stroke="#6B3FA0" strokeWidth="0.5" opacity="0.25" />
      <path d="M 80 88 Q 84 83 88 88" fill="none" stroke="#6B3FA0" strokeWidth="0.5" opacity="0.2" />

      {/* Right buildings */}
      <rect x="80" y="76" width="6" height="16" fill="#2D1B4E" opacity="0.55" />
      <rect x="81.5" y="78" width="1" height="1" fill="#E84FAA" opacity="0.18" />
      <rect x="84" y="78" width="1" height="1" fill="#6CB4EE" opacity="0.15" />
      <rect x="81.5" y="81" width="1" height="1" fill="#D4A574" opacity="0.12" />

      <rect x="88" y="80" width="7" height="12" fill="#1A0E2E" opacity="0.5" />
      <rect x="89.5" y="82" width="1" height="1" fill="#6CB4EE" opacity="0.2" />
      <rect x="92" y="82" width="1" height="1" fill="#E84FAA" opacity="0.15" />
      <rect x="89.5" y="85" width="1" height="1" fill="#E84FAA" opacity="0.12" />

      <rect x="96" y="78" width="4" height="14" fill="#2D1B4E" opacity="0.45" />
    </g>
  );
}

/* ── Art-deco side accent lines ── */
function ArtDecoAccents() {
  return (
    <>
      {/* Left side */}
      <line x1="2" y1="10" x2="2" y2="90" stroke="url(#decoGrad)" strokeWidth="0.3" opacity="0.2" />
      <line x1="4" y1="15" x2="4" y2="85" stroke="url(#decoGrad)" strokeWidth="0.15" opacity="0.15" />
      {/* Small ornamental dots */}
      <circle cx="2" cy="10" r="0.6" fill="#D4A574" opacity="0.25" />
      <circle cx="2" cy="90" r="0.6" fill="#D4A574" opacity="0.25" />
      <circle cx="2" cy="50" r="0.4" fill="#E84FAA" opacity="0.2" />

      {/* Right side */}
      <line x1="98" y1="10" x2="98" y2="90" stroke="url(#decoGrad)" strokeWidth="0.3" opacity="0.2" />
      <line x1="96" y1="15" x2="96" y2="85" stroke="url(#decoGrad)" strokeWidth="0.15" opacity="0.15" />
      <circle cx="98" cy="10" r="0.6" fill="#D4A574" opacity="0.25" />
      <circle cx="98" cy="90" r="0.6" fill="#D4A574" opacity="0.25" />
      <circle cx="98" cy="50" r="0.4" fill="#E84FAA" opacity="0.2" />
    </>
  );
}

/* ── Main background component ── */
const PrakarshBackground = memo(function PrakarshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Twinkling stars on canvas for performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = (t: number) => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      for (const s of starData) {
        const phase = ((t / 1000) + s.delay) / s.duration;
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(phase * Math.PI));
        const alpha = s.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(
          (s.x / 100) * w,
          (s.y / 100) * h,
          s.size * 0.5,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Subtle glow for larger stars
        if (s.size > 2) {
          ctx.beginPath();
          ctx.arc(
            (s.x / 100) * w,
            (s.y / 100) * h,
            s.size * 1.5,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(200, 180, 255, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* ── Sky gradient layers ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, " +
            "#0C0618 0%, " +      // deep night top
            "#1A0E2E 15%, " +     // dark purple
            "#2D1B4E 35%, " +     // mid purple
            "#4A2060 50%, " +     // warm purple
            "#6B3570 60%, " +     // pink-purple horizon
            "#B8607A 72%, " +     // warm peach-pink glow
            "#D4926A 80%, " +     // golden horizon
            "#3A1845 88%, " +     // back to purple (city area)
            "#1A0E2E 100%)",      // dark bottom
        }}
      />

      {/* ── Animated aurora/ambient glow ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 30% at 25% 45%, rgba(232,79,170,0.08) 0%, transparent 70%), " +
            "radial-gradient(ellipse 60% 25% at 75% 55%, rgba(108,180,238,0.06) 0%, transparent 70%)",
          animation: "auroraShift 12s ease-in-out infinite alternate",
        }}
      />

      {/* ── Twinkling stars canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* ── SVG layer: clouds, city, accents ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cloud gradient */}
          <radialGradient id="cloudGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#E8D0F0" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#B888D0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6B3FA0" stopOpacity="0" />
          </radialGradient>

          {/* Deco line gradient */}
          <linearGradient id="decoGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A574" stopOpacity="0.3" />
            <stop offset="30%" stopColor="#E84FAA" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#6CB4EE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4A574" stopOpacity="0.3" />
          </linearGradient>

          {/* Cloud blur filters */}
          <filter id="cloudBlur2">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <filter id="cloudBlur3">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <filter id="cloudBlur4">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          {/* Horizon glow */}
          <radialGradient id="horizonGlow" cx="50%" cy="65%" r="40%">
            <stop offset="0%" stopColor="#F1B5A2" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Horizon glow */}
        <rect x="0" y="0" width="100" height="100" fill="url(#horizonGlow)" />

        {/* Drifting clouds */}
        <g>
          {cloudData.map((cloud, i) => (
            <g key={i} style={{ animation: `cloudDrift${i % 3} ${cloud.speed}s linear infinite` }}>
              <Cloud {...cloud} />
            </g>
          ))}
        </g>

        {/* City silhouette */}
        <CitySkyline />

        {/* Art deco side accents */}
        <ArtDecoAccents />

        {/* Bottom ground fade */}
        <rect x="0" y="88" width="100" height="12" fill="#1A0E2E" opacity="0.7" />
      </svg>

      {/* ── Inline keyframes ── */}
      <style>{`
        @keyframes auroraShift {
          0% {
            opacity: 0.6;
            transform: translateX(-2%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateX(2%) scale(1.03);
          }
          100% {
            opacity: 0.7;
            transform: translateX(-1%) scale(0.98);
          }
        }
        @keyframes cloudDrift0 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(15px); }
        }
        @keyframes cloudDrift1 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-12px); }
        }
        @keyframes cloudDrift2 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
});

export default PrakarshBackground;
