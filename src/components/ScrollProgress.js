"use client";

import { useState, useEffect } from "react";

export default function ScrollProgress({ containerRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef?.current;
    const target = el || window;

    const handleScroll = () => {
      if (el) {
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight - el.clientHeight;
        const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, pct)));
      } else {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, pct)));
      }
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => target.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return (
    <div className="scroll-progress">
      <div className="scroll-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
