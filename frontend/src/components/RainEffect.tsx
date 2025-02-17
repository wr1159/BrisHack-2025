"use client";

import { useEffect, useRef } from 'react';

export default function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Raindrop configuration with blue colors
    const drops: Array<{
      x: number;
      y: number;
      speed: number;
      length: number;
      opacity: number;
    }> = [];

    // Initialize raindrops
    for (let i = 0; i < 150; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        speed: 3 + Math.random() * 5,
        length: 15 + Math.random() * 25,
        opacity: 0.6 + Math.random() * 0.4, // Increase opacity for brighter rain
      });
    }

    // Rain animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Use a blue color for the rain
      ctx.strokeStyle = `hsla(210, 80%, 70%, 0.8)`; // Light blue with opacity

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.lineWidth = 1.5; // Slightly thicker lines
        ctx.stroke();

        // Update position
        drop.y += drop.speed;

        // Reset position when off screen
        if (drop.y > canvas.height) {
          drop.y = Math.random() * -canvas.height;
          drop.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}