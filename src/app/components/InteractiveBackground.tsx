"use client";

import React, { useEffect, useState } from "react";

interface Pos {
  x: number;
  y: number;
}

const InteractiveBackground: React.FC = () => {
  const [pos, setPos] = useState<Pos>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setPos({
        x: e.clientX / innerWidth,
        y: e.clientY / innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const primaryX = pos.x * 100;
  const primaryY = pos.y * 100;
  const secondaryX = (1 - pos.x) * 100;
  const secondaryY = (1 - pos.y) * 100;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Bordo ana glow */}
      <div
        className="absolute w-[480px] h-[480px] rounded-full bg-[#800000]/40 blur-[160px] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${primaryX - 25}vw, ${primaryY - 25}vh, 0)`,
        }}
      />
      {/* Mor ikinci glow */}
      <div
        className="absolute w-[420px] h-[420px] rounded-full bg-purple-500/35 blur-[150px] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${secondaryX - 20}vw, ${secondaryY - 20}vh, 0)`,
        }}
      />
    </div>
  );
};

export default InteractiveBackground;