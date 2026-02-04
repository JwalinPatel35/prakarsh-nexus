import { useEffect, useRef } from "react";

interface Line {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
  glowing: boolean;
}

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLines();
    };

    const initLines = () => {
      const lineCount = Math.floor(canvas.width / 8); // Denser lines
      linesRef.current = Array.from({ length: lineCount }, () => createLine(canvas.height, true));
    };

    const createLine = (canvasHeight: number, randomY: boolean = false): Line => ({
      x: Math.random() * canvas.width,
      y: randomY ? Math.random() * canvasHeight : -Math.random() * 100,
      length: Math.random() * 80 + 20, // Varying lengths
      speed: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.6 + 0.2,
      thickness: Math.random() * 1.5 + 0.5,
      glowing: Math.random() > 0.85, // 15% chance to glow
    });

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;
    const animate = () => {
      time += 0.016;
      
      // Clear with dark background
      ctx.fillStyle = "hsl(240, 15%, 3%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw lines
      linesRef.current.forEach((line, index) => {
        // Update position
        line.y += line.speed;

        // Reset if off screen
        if (line.y - line.length > canvas.height) {
          linesRef.current[index] = createLine(canvas.height);
        }

        // Create gradient for each line
        const gradient = ctx.createLinearGradient(line.x, line.y - line.length, line.x, line.y);
        
        // Primary color from design system (lavender)
        const baseColor = line.glowing ? "168, 168, 248" : "123, 123, 248"; // hsl(240, 90%, 78%) converted
        
        gradient.addColorStop(0, `rgba(${baseColor}, 0)`);
        gradient.addColorStop(0.3, `rgba(${baseColor}, ${line.opacity * 0.3})`);
        gradient.addColorStop(0.7, `rgba(${baseColor}, ${line.opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(${baseColor}, ${line.opacity})`);

        ctx.beginPath();
        ctx.moveTo(line.x, line.y - line.length);
        ctx.lineTo(line.x, line.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.thickness;
        ctx.lineCap = "round";
        ctx.stroke();

        // Add glow effect for special lines
        if (line.glowing) {
          ctx.beginPath();
          ctx.moveTo(line.x, line.y - line.length * 0.3);
          ctx.lineTo(line.x, line.y);
          ctx.strokeStyle = `rgba(168, 168, 248, ${line.opacity * 0.4})`;
          ctx.lineWidth = line.thickness * 3;
          ctx.filter = "blur(3px)";
          ctx.stroke();
          ctx.filter = "none";
        }

        // Draw bright head dot
        ctx.beginPath();
        ctx.arc(line.x, line.y, line.thickness * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${line.opacity})`;
        ctx.fill();
      });

      // Add occasional sparkle particles
      const sparkleCount = 5;
      for (let i = 0; i < sparkleCount; i++) {
        const sparkleX = Math.random() * canvas.width;
        const sparkleY = Math.random() * canvas.height;
        const sparkleOpacity = Math.sin(time * 3 + i) * 0.3 + 0.2;
        
        if (sparkleOpacity > 0.3) {
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 103, 213, ${sparkleOpacity * 0.3})`; // Accent pink
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: "hsl(240, 15%, 3%)" }}
    />
  );
};

export default MatrixRain;
