"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DASH_COUNT = 48;
const DASHES = Array.from({ length: DASH_COUNT });

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingLineRef = useRef(null);
  const statementRef = useRef(null);
  const cardRef = useRef(null);
  const sunburstRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingLineRef.current,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        statementRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.to(sunburstRef.current, {
        rotate: 360,
        duration: 70,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <style>{css}</style>

      <div className="about-grid-overlay" />

      <div className="about-hero-heading">
        <h2 className="about-heading-mask">
          <span ref={headingLineRef} className="about-heading-line">
            About Us
          </span>
        </h2>
        <div data-fade className="about-top-bar-right">
          <a href="#" className="about-view-all-btn">
            View all
          </a>
          <span className="about-icon-btn" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v18M3 12h18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <p ref={statementRef} className="about-statement">
        PKR Estate is a builder-led studio shaping homes around light,
        material, and the small rituals of daily life. Every plan you see
        began as a decision made by hand, long before it became a blueprint.
      </p>

      <div className="about-card-stage">
        <span className="about-ghost-text about-ghost-left">Play</span>
        <span className="about-ghost-text about-ghost-right">Reel</span>

        <svg
          ref={sunburstRef}
          className="about-sunburst"
          viewBox="-100 -100 200 200"
        >
          {DASHES.map((_, i) => {
            const round = (n) => Math.round(n * 1000) / 1000;
            const angle = (i / DASH_COUNT) * Math.PI * 2;
            const r1 = 62;
            const r2 = 80;
            return (
              <line
                key={i}
                x1={round(Math.cos(angle) * r1)}
                y1={round(Math.sin(angle) * r1)}
                x2={round(Math.cos(angle) * r2)}
                y2={round(Math.sin(angle) * r2)}
                stroke="rgba(20,18,16,0.14)"
                strokeWidth="1.4"
              />
            );
          })}
        </svg>

        <div ref={cardRef} className="about-video-card">
          <img
            src="/About.png"
            alt="PKR Estate walkthrough preview"
            className="about-video-image"
          />
          <div className="about-video-overlay" />
          <div className="about-video-top-row">
            <span className="about-video-eyebrow">by</span>
            <span className="about-video-label">PKR Estate</span>
          </div>
          <span className="about-video-time">00:48</span>
        </div>

        <div className="about-annotation">
          <svg
            width="72"
            height="60"
            viewBox="0 0 72 60"
            className="about-annotation-arrow"
          >
            <path
              d="M62 8 C 42 8, 20 20, 12 45"
              stroke="#ff5a3c"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M4 37 L12 45 L19 35"
              stroke="#ff5a3c"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="about-annotation-text">Take a look inside!</span>
        </div>
      </div>
    </section>
  );
}

const css = `
/* =========================================================
   FONT — Figtree (single family for headings + body)
   ========================================================= */

/* =========================================================
   BASE (fluid, fills gaps between breakpoints via clamp)
   ========================================================= */
.about-section {
  position: relative;
  background-color: #f4f4f2;
  padding: 0 6vw 160px;
  overflow: hidden;

  --font-heading: "Figtree", "Figtree Placeholder", sans-serif;
  --font-body: "Figtree", "Figtree Placeholder", sans-serif;
}

.about-section,
.about-section * {
  font-family: "Figtree", "Figtree Placeholder", sans-serif;
}

.about-grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(20,18,16,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20,18,16,0.06) 1px, transparent 1px);
  background-size: 50% 100%, 100% 1px;
  background-position: center top, center 522px;
  background-repeat: no-repeat;
  pointer-events: none;
}

.about-hero-heading {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 96px 0 56px;
  width: 100%;
  box-sizing: border-box;
}

.about-heading-mask {
  margin: 0 0 20px;
  overflow: hidden;
}

.about-heading-line {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: clamp(2rem, 8vw, 6.5rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  color: #151414;
  line-height: 1;
  text-transform: none;
}

.about-top-bar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.about-view-all-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.7em 1.3em;
  border-radius: 999px;
  background-color: #ffffff;
  color: #151414;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
}

.about-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-color: #ffffff;
  color: #151414;
  flex-shrink: 0;
}

.about-statement {
  position: relative;
  z-index: 1;
  margin: 0 auto 80px;
  max-width: 1040px;
  text-align: center;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: clamp(0.95rem, 1.8vw, 1.8rem);
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: #151414;
  padding: 0;
}

.about-card-stage {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  padding: 0;
}

.about-ghost-text {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1.8rem, 6vw, 7rem);
  letter-spacing: -0.03em;
  color: rgba(20,18,16,0.09);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}

.about-ghost-left { left: clamp(10px, 15vw, 200px); }
.about-ghost-right { right: clamp(10px, 15vw, 200px); }

.about-sunburst {
  position: absolute;
  width: clamp(200px, 40vw, 520px);
  height: clamp(200px, 40vw, 520px);
  pointer-events: none;
}

.about-video-card {
  position: relative;
  z-index: 2;
  width: 700px;
  max-width: 90vw;
  aspect-ratio: 340 / 210;
  border-radius: 15px;
  overflow: hidden;
  background-color: #8f8f8f;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.about-video-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.about-video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.55) 100%);
}

.about-video-top-row {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.about-video-eyebrow {
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 400;
  color: rgba(255,255,255,0.7);
}

.about-video-label {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #ffffff;
}

.about-video-time {
  position: absolute;
  top: 14px;
  right: 16px;
  z-index: 1;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  color: #ffffff;
}

.about-annotation {
  position: absolute;
  bottom: -18%;
  right: 0%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.about-annotation-arrow {
  display: block;
  width: 72px;
  height: 60px;
}

.about-annotation-text {
  margin-top: -4px;
  font-family: var(--font-script), "Caveat", cursive !important;
  font-weight: 600;
  font-size: 1.5rem;
  color: #ff5a3c;
  white-space: nowrap;
}

/* =========================================================
   BREAKPOINTS
   ========================================================= */

/* Small mobile: 0 - 380px */
@media (max-width: 380px) {
  .about-section { padding: 0 5vw 90px; }
  .about-hero-heading { padding: 56px 0 24px; }
  .about-heading-line { font-size: 1.7rem; }
  .about-view-all-btn { font-size: 0.6rem; padding: 0.35em 0.8em; }
  .about-icon-btn { width: 26px; height: 26px; }
  .about-icon-btn svg { width: 11px; height: 11px; }
  .about-statement { font-size: 0.85rem; margin-bottom: 40px; }
  .about-card-stage { min-height: 200px; }
  .about-ghost-text { font-size: 1.4rem; }
  .about-ghost-left { left: 6px; }
  .about-ghost-right { right: 6px; }
  .about-video-card { width: 92vw; padding: 8px 10px; }
  .about-video-label { font-size: 0.68rem; }
  .about-video-eyebrow { font-size: 0.4rem; }
  .about-video-time { font-size: 0.5rem; top: 8px; right: 8px; }
  .about-annotation { bottom: -14%; right: -2%; }
  .about-annotation-arrow { width: 26px; height: 22px; }
  .about-annotation-text { font-size: 0.62rem; }
  .about-sunburst { display: none; }
}

/* Mobile: 381px - 480px */
@media (min-width: 381px) and (max-width: 480px) {
  .about-section { padding: 0 5vw 100px; }
  .about-hero-heading { padding: 64px 0 28px; }
  .about-heading-line { font-size: 2rem; }
  .about-view-all-btn { font-size: 0.65rem; padding: 0.4em 0.9em; }
  .about-icon-btn { width: 28px; height: 28px; }
  .about-icon-btn svg { width: 12px; height: 12px; }
  .about-statement { font-size: 0.9rem; margin-bottom: 48px; }
  .about-card-stage { min-height: 230px; }
  .about-ghost-text { font-size: 1.7rem; }
  .about-ghost-left { left: 8px; }
  .about-ghost-right { right: 8px; }
  .about-video-card { width: 90vw; padding: 8px 12px; }
  .about-video-label { font-size: 0.75rem; }
  .about-annotation { bottom: -15%; right: -2%; }
  .about-annotation-arrow { width: 30px; height: 25px; }
  .about-annotation-text { font-size: 0.7rem; }
  .about-sunburst { display: none; }
}

/* Large mobile / small phablet: 481px - 640px */
@media (min-width: 481px) and (max-width: 640px) {
  .about-hero-heading { padding: 72px 0 32px; }
  .about-statement { margin-bottom: 56px; }
  .about-card-stage { min-height: 280px; }
  .about-video-card { width: 88vw; }
  .about-annotation { bottom: -13%; right: -1%; }
  .about-annotation-arrow { width: 38px; height: 32px; }
  .about-annotation-text { font-size: 0.85rem; }
  .about-sunburst { width: 260px; height: 260px; }
}

/* Tablet portrait: 641px - 768px */
@media (min-width: 641px) and (max-width: 768px) {
  .about-hero-heading { padding: 80px 0 40px; }
  .about-card-stage { min-height: 340px; }
  .about-video-card { width: 78vw; }
  .about-annotation { bottom: -12%; }
  .about-annotation-arrow { width: 46px; height: 38px; }
  .about-annotation-text { font-size: 1rem; }
}

/* Tablet landscape: 769px - 1024px */
@media (min-width: 769px) and (max-width: 1024px) {
  .about-card-stage { min-height: 420px; }
  .about-video-card { width: 62vw; }
  .about-annotation { bottom: -14%; right: -1%; }
  .about-annotation-arrow { width: 56px; height: 46px; }
  .about-annotation-text { font-size: 1.15rem; }
}

/* Laptop: 1025px - 1440px */
@media (min-width: 1025px) and (max-width: 1440px) {
  .about-card-stage { min-height: 480px; }
  .about-video-card { width: 46vw; }
}

/* Desktop: 1441px - 1920px */
@media (min-width: 1441px) and (max-width: 1920px) {
  .about-card-stage { min-height: 520px; }
  .about-video-card { width: 700px; }
}

/* Large / ultra-wide desktop: 1921px+ */
@media (min-width: 1921px) {
  .about-section { padding: 0 6vw 200px; }
  .about-card-stage { min-height: 600px; }
  .about-video-card { width: 820px; }
  .about-statement { max-width: 1200px; font-size: 2.1rem; }
  .about-heading-line { font-size: 7.5rem; }
}

/* Landscape short-height mobile (common orientation-change bug) */
@media (max-height: 480px) and (orientation: landscape) {
  .about-hero-heading { padding: 32px 0 16px; }
  .about-card-stage { min-height: 200px; }
  .about-annotation { bottom: -10%; }
}

@media (prefers-reduced-motion: reduce) {
  .about-sunburst { animation: none !important; }
}
`;