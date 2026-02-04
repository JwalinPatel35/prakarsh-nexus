import { useEffect, useRef } from "react";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters - mix of katakana, numbers, and symbols
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops: number[] = Array(columns).fill(1);
    
    // Array to track character for each column (for persistence effect)
    const columnChars: string[][] = Array(columns).fill(null).map(() => []);

    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = "rgba(251, 218, 204, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading character (brightest)
        ctx.fillStyle = "#3c2a56";
        ctx.globalAlpha = 1;
        ctx.fillText(char, x, y);

        // Trail characters with fading opacity
        const trailLength = 20;
        for (let j = 1; j < trailLength; j++) {
          const trailY = y - j * fontSize;
          if (trailY > 0) {
            const trailChar = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.globalAlpha = Math.max(0, (trailLength - j) / trailLength * 0.6);
            ctx.fillText(trailChar, x, trailY);
          }
        }

        ctx.globalAlpha = 1;

        // Reset drop to top with random delay
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Initial fill with background color
    ctx.fillStyle = "#fbdacc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const interval = setInterval(draw, 50);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: "#fbdacc" }}
    />
  );
};

export default MatrixRain;
