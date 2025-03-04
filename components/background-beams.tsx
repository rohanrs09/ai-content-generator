"use client";

import React, { useEffect, useRef, useState } from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Draw beams
    const drawBeams = () => {
      if (!context || !canvas) return;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Set beam properties
      const numBeams = 30;
      const beamMaxLength = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
      const beamColors = ["rgba(125, 125, 255, 0.1)", "rgba(200, 200, 255, 0.05)"];

      // Draw each beam
      for (let i = 0; i < numBeams; i++) {
        const angle = (Math.PI * 2 * i) / numBeams;
        const length = beamMaxLength * (0.5 + Math.random() * 0.5);
        const thickness = 10 + Math.random() * 20;
        
        const startX = mousePosition.x;
        const startY = mousePosition.y;
        const endX = startX + Math.cos(angle) * length;
        const endY = startY + Math.sin(angle) * length;
        
        const gradient = context.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, "rgba(125, 125, 255, 0.2)");
        gradient.addColorStop(1, "rgba(125, 125, 255, 0)");
        
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.strokeStyle = gradient;
        context.lineWidth = thickness;
        context.stroke();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      drawBeams();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 opacity-40 ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
};