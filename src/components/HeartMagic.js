"use client";

import { useEffect, useCallback, useState, useRef } from "react";

const HEART_COLORS = [
  "#ff6b8a",
  "#ff4d6d",
  "#ff85a1",
  "#c9184a",
  "#ffb3c1",
  "#e75480",
  "#f472b6",
  "#fb7185",
];

const SPARKLE_COLORS = [
  "#ffd700",
  "#fff8dc",
  "#ffefd5",
  "#fffacd",
];

export default function HeartMagic() {
  const [hearts, setHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const idCounter = useRef(0);

  const createEffect = useCallback((e) => {
    const { clientX, clientY } = e;
    const id = idCounter.current++;

    const heartCount = 3;
    const newHearts = [];

    for (let i = 0; i < heartCount; i++) {
      const angle = (Math.random() * 120 - 60) * (Math.PI / 180);
      const distance = 5 + Math.random() * 15;
      const offsetX = Math.sin(angle) * distance;
      const offsetY = -Math.abs(Math.cos(angle) * distance);

      newHearts.push({
        id: `${id}-h-${i}`,
        x: clientX + offsetX,
        y: clientY + offsetY,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        size: 10 + Math.random() * 6,
        rotation: Math.random() * 30 - 15,
        delay: i * 60,
      });
    }

    const sparkleCount = 4 + Math.floor(Math.random() * 4);
    const newSparkles = [];

    for (let i = 0; i < sparkleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 3 + Math.random() * 12;

      newSparkles.push({
        id: `${id}-s-${i}`,
        x: clientX + Math.cos(angle) * distance,
        y: clientY + Math.sin(angle) * distance,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        size: 3 + Math.random() * 5,
        delay: i * 40,
      });
    }

    setHearts((prev) => [...prev, ...newHearts]);
    setSparkles((prev) => [...prev, ...newSparkles]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
      setSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)));
    }, 2000);
  }, []);

  useEffect(() => {
    window.addEventListener("click", createEffect);
    return () => window.removeEventListener("click", createEffect);
  }, [createEffect]);

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-magic-heart"
          style={{
            left: heart.x,
            top: heart.y,
            color: heart.color,
            fontSize: heart.size,
            transform: `rotate(${heart.rotation}deg)`,
            animationDelay: `${heart.delay}ms`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      ))}

      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="heart-magic-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            background: `radial-gradient(circle, ${sparkle.color} 0%, transparent 70%)`,
            animationDelay: `${sparkle.delay}ms`,
          }}
        />
      ))}
    </>
  );
}
