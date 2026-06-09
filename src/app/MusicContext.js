"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import tracks from "@/config/music";

const MusicContext = createContext(null);

const STORAGE_TRACK = "photodance-track";
const STORAGE_PLAYING = "photodance-playing";
const STORAGE_VOLUME = "photodance-volume";

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [ready, setReady] = useState(false);

  // Init audio element and restore state
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.5;
    audio.preload = "auto";
    audioRef.current = audio;

    const savedTrack = localStorage.getItem(STORAGE_TRACK);
    const savedPlaying = localStorage.getItem(STORAGE_PLAYING);
    const savedVolume = localStorage.getItem(STORAGE_VOLUME);

    let targetIndex = 0;
    if (savedTrack) {
      const found = tracks.findIndex((t) => t.src === savedTrack);
      if (found !== -1) targetIndex = found;
    }
    setCurrentIndex(targetIndex);

    if (savedVolume) {
      const v = parseFloat(savedVolume);
      audio.volume = v;
      setVolume(v);
    }

    const track = tracks[targetIndex];
    if (track) {
      audio.src = track.src;
      audio.load();
    }

    const wasPlaying = savedPlaying === "true";
    if (wasPlaying) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }

    setReady(true);

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Sync playing state to localStorage
  useEffect(() => {
    if (ready) {
      localStorage.setItem(STORAGE_PLAYING, String(isPlaying));
    }
  }, [isPlaying, ready]);

  // Persist track index
  useEffect(() => {
    if (ready && tracks[currentIndex]) {
      localStorage.setItem(STORAGE_TRACK, tracks[currentIndex].src);
    }
  }, [currentIndex, ready]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const switchToTrack = useCallback((index) => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = tracks[index];
    if (!track) return;

    if (index === currentIndex) {
      // Same track: just seek to start
      audio.currentTime = 0;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
      return;
    }

    // Different track: load and play
    setCurrentIndex(index);
    const onReady = () => {
      audio.removeEventListener("canplay", onReady);
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };
    audio.addEventListener("canplay", onReady);
    audio.src = track.src;
    audio.load();
  }, [currentIndex]);

  const nextTrack = useCallback(() => {
    const next = (currentIndex + 1) % tracks.length;
    switchToTrack(next);
  }, [currentIndex, switchToTrack]);

  const prevTrack = useCallback(() => {
    const prev = (currentIndex - 1 + tracks.length) % tracks.length;
    switchToTrack(prev);
  }, [currentIndex, switchToTrack]);

  const selectTrack = useCallback((index) => {
    switchToTrack(index);
  }, [switchToTrack]);

  const setAudioVolume = useCallback((v) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = v;
    setVolume(v);
    localStorage.setItem(STORAGE_VOLUME, String(v));
  }, []);

  // Auto-advance to next track on ended
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      nextTrack();
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [nextTrack]);

  return (
    <MusicContext.Provider
      value={{
        tracks,
        currentTrack: tracks[currentIndex],
        currentIndex,
        isPlaying,
        volume,
        play,
        pause,
        toggle,
        nextTrack,
        prevTrack,
        selectTrack,
        setVolume: setAudioVolume,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
