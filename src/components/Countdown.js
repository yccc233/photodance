"use client";

import { useState, useEffect, useRef } from "react";

const WEDDING_DATE = new Date("2026-09-26T00:00:00+08:00");

function pad(num) {
  return String(num).padStart(2, "0");
}

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00", passed: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    passed: false,
  };
}

function FlipCard({ value, label }) {
  const [top, setTop] = useState(value);
  const [bottom, setBottom] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      setTop(value);
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setBottom(value);
        setIsFlipping(false);
      }, 350);
      prev.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="fc-unit">
      <div className={`fc-card ${isFlipping ? "fc-card--flip" : ""}`}>
        <div className="fc-card__top">
          <span>{top}</span>
        </div>
        <div className="fc-card__bottom">
          <span>{bottom}</span>
        </div>
        {isFlipping && (
          <>
            <div className="fc-card__flip-top">
              <span>{prev.current}</span>
            </div>
            <div className="fc-card__flip-bottom">
              <span>{value}</span>
            </div>
          </>
        )}
      </div>
      <div className="fc-label">{label}</div>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fc">
      <div className="fc__label">Wedding Countdown</div>
      <div className="fc__timer">
        <FlipCard value={time.days} label="Days" />
        <span className="fc__sep">:</span>
        <FlipCard value={time.hours} label="Hours" />
        <span className="fc__sep">:</span>
        <FlipCard value={time.minutes} label="Min" />
        <span className="fc__sep">:</span>
        <FlipCard value={time.seconds} label="Sec" />
      </div>
    </div>
  );
}
