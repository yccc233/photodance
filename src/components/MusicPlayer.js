"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useMusic } from "@/app/MusicContext";
import "./MusicPlayer.css";

const STORAGE_POS = "photodance-player-pos";
const DRAG_THRESHOLD = 4;
const SNAP = 50; // px from edge to auto-snap
const BTN_SIZE = 44;

function loadPosition() {
  try {
    const raw = localStorage.getItem(STORAGE_POS);
    if (raw) {
      const pos = JSON.parse(raw);
      if (typeof pos.top === "number" && typeof pos.right === "number") return pos;
    }
  } catch {}
  return { top: 20, right: 120 };
}

function savePosition(pos) {
  localStorage.setItem(STORAGE_POS, JSON.stringify(pos));
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="19 20 9 12 19 4 19 20" />
      <line x1="5" y1="19" x2="5" y2="5" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  );
}

function VolumeLowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

export default function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    toggle,
    nextTrack,
    prevTrack,
    setVolume,
  } = useMusic();

  const [pos, setPos] = useState({ top: 20, right: 120 });
  const [panelOpen, setPanelOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [posReady, setPosReady] = useState(false);
  const posLoaded = useRef(false);

  // Load saved position on mount (client-side only)
  useEffect(() => {
    setPos(loadPosition());
    setPosReady(true);
  }, []);

  // Persist position changes
  useEffect(() => {
    if (!posLoaded.current) { posLoaded.current = true; return; }
    savePosition(pos);
  }, [pos]);
  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const dragRef = useRef({ startX: 0, startY: 0, startRight: 0, startTop: 0, moved: false });
  const posRef = useRef(pos);
  posRef.current = pos;

  // Click outside to close
  useEffect(() => {
    if (!panelOpen) return;
    const handleClick = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [panelOpen]);

  // Drag handlers
  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    const d = dragRef.current;
    d.startX = e.clientX;
    d.startY = e.clientY;
    d.startRight = pos.right;
    d.startTop = pos.top;
    d.moved = false;
    setDragging(true);
  }, [pos]);

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e) => {
      const d = dragRef.current;
      const dx = d.startX - e.clientX;
      const dy = e.clientY - d.startY;
      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        d.moved = true;
      }
      setPos({
        right: clamp(d.startRight + dx, 0, window.innerWidth - BTN_SIZE),
        top: clamp(d.startTop + dy, 0, window.innerHeight - BTN_SIZE),
      });
    };

    const handleUp = () => {
      setDragging(false);
      const p = posRef.current;
      const maxRight = window.innerWidth - BTN_SIZE;
      const maxTop = window.innerHeight - BTN_SIZE;
      let snapped = { ...p };

      // Snap to right edge
      if (p.right < SNAP) snapped.right = 2;
      // Snap to left edge
      else if (p.right > maxRight - SNAP) snapped.right = maxRight - 2;
      // Snap to top edge
      if (p.top < SNAP) snapped.top = 2;
      // Snap to bottom edge
      else if (p.top > maxTop - SNAP) snapped.top = maxTop - 2;

      setPos(snapped);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dragging]);

  const handleClick = useCallback(() => {
    if (dragRef.current.moved) return;
    setPanelOpen((prev) => !prev);
  }, []);

  const handleVolumeChange = useCallback((e) => {
    setVolume(parseFloat(e.target.value));
  }, [setVolume]);

  if (!posReady) return null;

  return (
    <>
      <button
        ref={btnRef}
        className={`music-btn ${dragging ? "music-btn--dragging" : ""} ${isPlaying ? "music-btn--playing" : ""}`}
        style={{ top: pos.top, right: pos.right }}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        aria-label="音乐控制"
      >
        <NoteIcon />
      </button>

      {panelOpen && (
        <div className="music-panel" ref={panelRef} style={{ top: pos.top + 56, right: pos.right }}>
          <div className="music-panel__now">
            <p className="music-panel__label">正在播放</p>
            <p className="music-panel__title">{currentTrack?.title || "未选择"}</p>
            <p className="music-panel__artist">{currentTrack?.artist || ""}</p>
          </div>

          <div className="music-panel__controls">
            <button className="music-panel__ctrl" onClick={prevTrack} aria-label="上一首">
              <PrevIcon />
            </button>
            <button className="music-panel__ctrl music-panel__ctrl--play" onClick={toggle} aria-label={isPlaying ? "暂停" : "播放"}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className="music-panel__ctrl" onClick={nextTrack} aria-label="下一首">
              <NextIcon />
            </button>
          </div>

          <div className="music-panel__volume">
            <VolumeLowIcon />
            <input
              type="range"
              className="music-panel__slider"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
