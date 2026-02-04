import { useEffect, useRef } from "react";

interface Symbol {
  x: number;
  y: number;
  type: string;
  size: number;
  opacity: number;
  color: string;
  phase: number;
}

const SYMBOLS = ["circle", "x", "dot", "square", "plus", "concentric", "diamond", "target"];
const COLORS = [
  "123, 123, 248", // lavender
  "255, 103, 213", // pink
  "241, 181, 162", // peach
];

const GeometricPattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbolsRef = useRef<Symbol[]>([]);
  const blocksRef = useRef<{ x: number; y: number; w: number; h: number; opacity: number; phase: number }[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPattern();
    };

    const initPattern = () => {
      const cellSize = 20;
      const cols = Math.ceil(canvas.width / cellSize) + 2;
      const rows = Math.ceil(canvas.height / cellSize) + 2;
      
      symbolsRef.current = [];
      blocksRef.current = [];

      // Create random blocks
      const blockCount = Math.floor((cols * rows) / 80);
      for (let i = 0; i < blockCount; i++) {
        blocksRef.current.push({
          x: Math.floor(Math.random() * cols) * cellSize,
          y: Math.floor(Math.random() * rows) * cellSize,
          w: (Math.floor(Math.random() * 6) + 3) * cellSize,
          h: (Math.floor(Math.random() * 6) + 3) * cellSize,
          opacity: Math.random() * 0.15 + 0.05,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // Create symbols grid with varying density
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Skip some cells for organic feel
          if (Math.random() > 0.4) continue;
          
          // Check if inside a block - reduce density
          const inBlock = blocksRef.current.some(
            (b) => col * cellSize >= b.x && col * cellSize < b.x + b.w && 
                   row * cellSize >= b.y && row * cellSize < b.y + b.h
          );
          if (inBlock && Math.random() > 0.2) continue;

          symbolsRef.current.push({
            x: col * cellSize + cellSize / 2,
            y: row * cellSize + cellSize / 2,
            type: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
            size: Math.random() * 6 + 4,
            opacity: Math.random() * 0.4 + 0.1,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const drawSymbol = (ctx: CanvasRenderingContext2D, symbol: Symbol, time: number) => {
      const { x, y, type, size, opacity, color, phase } = symbol;
      const animatedOpacity = opacity * (0.7 + 0.3 * Math.sin(time * 0.5 + phase));
      
      ctx.strokeStyle = `rgba(${color}, ${animatedOpacity})`;
      ctx.fillStyle = `rgba(${color}, ${animatedOpacity * 0.8})`;
      ctx.lineWidth = 1;

      switch (type) {
        case "circle":
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.stroke();
          break;
          
        case "dot":
          ctx.beginPath();
          ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case "x":
          ctx.beginPath();
          ctx.moveTo(x - size, y - size);
          ctx.lineTo(x + size, y + size);
          ctx.moveTo(x + size, y - size);
          ctx.lineTo(x - size, y + size);
          ctx.stroke();
          break;
          
        case "plus":
          ctx.beginPath();
          ctx.moveTo(x, y - size);
          ctx.lineTo(x, y + size);
          ctx.moveTo(x - size, y);
          ctx.lineTo(x + size, y);
          ctx.stroke();
          break;
          
        case "square":
          ctx.strokeRect(x - size, y - size, size * 2, size * 2);
          break;
          
        case "concentric":
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, size * 0.2, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case "diamond":
          ctx.beginPath();
          ctx.moveTo(x, y - size);
          ctx.lineTo(x + size, y);
          ctx.lineTo(x, y + size);
          ctx.lineTo(x - size, y);
          ctx.closePath();
          ctx.stroke();
          break;
          
        case "target":
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x - size * 1.3, y);
          ctx.lineTo(x - size * 0.5, y);
          ctx.moveTo(x + size * 0.5, y);
          ctx.lineTo(x + size * 1.3, y);
          ctx.moveTo(x, y - size * 1.3);
          ctx.lineTo(x, y - size * 0.5);
          ctx.moveTo(x, y + size * 0.5);
          ctx.lineTo(x, y + size * 1.3);
          ctx.stroke();
          break;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;
    const animate = () => {
      time += 0.016;

      // Clear with dark background
      ctx.fillStyle = "hsl(240, 15%, 3%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated blocks with pulsing opacity
      blocksRef.current.forEach((block) => {
        const pulseOpacity = block.opacity * (0.6 + 0.4 * Math.sin(time * 0.3 + block.phase));
        ctx.fillStyle = `rgba(123, 123, 248, ${pulseOpacity})`;
        ctx.fillRect(block.x, block.y, block.w, block.h);
        
        // Add glow border
        ctx.strokeStyle = `rgba(123, 123, 248, ${pulseOpacity * 1.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(block.x, block.y, block.w, block.h);
      });

      // Draw symbols
      symbolsRef.current.forEach((symbol) => {
        drawSymbol(ctx, symbol, time);
      });

      // Add scan line effect
      const scanY = (time * 50) % (canvas.height + 100) - 50;
      const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      gradient.addColorStop(0, "rgba(123, 123, 248, 0)");
      gradient.addColorStop(0.5, "rgba(123, 123, 248, 0.03)");
      gradient.addColorStop(1, "rgba(123, 123, 248, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 30, canvas.width, 60);

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

export default GeometricPattern;
