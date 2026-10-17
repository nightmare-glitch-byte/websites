"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  radius: number;
  phase: number;
};

export function AmbientEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let particles: Particle[] = [];
    let pointerX = -1000;
    let pointerY = -1000;
    let pageVisible = document.visibilityState === "visible";

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const columns = Math.ceil(width / 72);
      const rows = Math.ceil(height / 72);
      particles = Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        return {
          x: (column + 0.5 + (Math.random() - 0.5) * 0.28) * (width / columns),
          y: (row + 0.5 + (Math.random() - 0.5) * 0.28) * (height / rows),
          offsetX: 0,
          offsetY: 0,
          radius: 0.8 + Math.random() * 0.65,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const movePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const clearPointer = (event: PointerEvent) => {
      if (event.relatedTarget !== null) return;
      pointerX = -1000;
      pointerY = -1000;
    };

    const draw = (time: number) => {
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      const influenceRadius = 145;

      for (const particle of particles) {
        const dx = particle.x - pointerX;
        const dy = particle.y - pointerY;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const push = influence * influence * 18;
        const targetX = distance > 0 ? (dx / distance) * push : 0;
        const targetY = distance > 0 ? (dy / distance) * push : 0;
        particle.offsetX += (targetX - particle.offsetX) * 0.055;
        particle.offsetY += (targetY - particle.offsetY) * 0.055;

        const idle = reducedMotion.matches ? 0 : Math.sin(time * 0.00045 + particle.phase) * 0.65;
        const x = particle.x + particle.offsetX + idle;
        const y = particle.y + particle.offsetY + idle;

        if (influence > 0.04) {
          const glowRadius = 10 + influence * 20;
          const glow = context.createRadialGradient(x, y, 0, x, y, glowRadius);
          glow.addColorStop(0, `rgba(255, 177, 83, ${influence * 0.28})`);
          glow.addColorStop(0.38, `rgba(255, 145, 65, ${influence * 0.11})`);
          glow.addColorStop(1, "rgba(255, 145, 65, 0)");
          context.beginPath();
          context.arc(x, y, glowRadius, 0, Math.PI * 2);
          context.fillStyle = glow;
          context.fill();
        }

        context.beginPath();
        context.arc(x, y, particle.radius + influence * 0.45, 0, Math.PI * 2);
        context.fillStyle = influence > 0.04
          ? `rgba(255, ${Math.round(205 - influence * 35)}, ${Math.round(143 - influence * 55)}, ${0.2 + influence * 0.38})`
          : "rgba(143, 219, 226, 0.16)";
        context.fill();
      }

      if (!reducedMotion.matches && pageVisible) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const updateVisibility = () => {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible && !reducedMotion.matches) {
        frame = window.requestAnimationFrame(draw);
      } else {
        window.cancelAnimationFrame(frame);
      }
    };

    resize();
    if (reducedMotion.matches || !pageVisible) draw(0);

    if (!reducedMotion.matches) {
      if (pageVisible) frame = window.requestAnimationFrame(draw);
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", movePointer, { passive: true });
      window.addEventListener("pointerout", clearPointer);
      document.addEventListener("visibilitychange", updateVisibility);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", movePointer);
      window.removeEventListener("pointerout", clearPointer);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
}
