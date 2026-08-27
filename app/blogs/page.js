"use client";

import { useEffect, useRef, useState } from "react";
import { Inter, IBM_Plex_Mono } from "next/font/google";

const heroSans = Inter({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-hero",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const BLOG_POSTS = [
  {
    date: "JUL, 2026",
    title: "The Future of Luxury Living: Smart Homes in Chennai",
    body: "Smart home technology is revolutionizing the real estate landscape in Chennai. From automated lighting and climate control to advanced security systems, discover how luxury properties are integrating cutting-edge technology to enhance comfort, convenience, and energy efficiency.",
    image: "/amenity1.jpeg",
  },
  {
    date: "JUN, 2026",
    title: "Why Location Matters: Prime Neighborhoods in South Chennai",
    body: "Location remains the single most important factor in real estate investment. Explore the most sought-after neighborhoods in South Chennai, including Velachery, Adyar, and OMR, and understand what makes these areas prime destinations for homebuyers and investors alike.",
    image: "/amenity2.jpeg",
  },
  {
    date: "MAY, 2026",
    title: "RERA Compliance: What Every Homebuyer Must Know",
    body: "The Real Estate (Regulation and Development) Act has transformed the Indian real estate market. We break down the key provisions of RERA, how it protects homebuyers, and what to look for when verifying a project's compliance status before making your investment.",
    image: "/amenity3.jpeg",
  },
  {
    date: "APR, 2026",
    title: "Sustainable Building Materials for Modern Homes",
    body: "As environmental consciousness grows, sustainable building materials are becoming the standard in premium residential projects. From fly ash bricks and recycled steel to bamboo flooring and solar-ready infrastructure, discover the materials shaping eco-friendly homes of tomorrow.",
    image: "/amenity4.jpeg",
  },
];

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function BlogsPage() {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isAnimating = useRef(false);
  const wheelAccum = useRef(0);
  const touchStartY = useRef(null);

  const DURATION = 900;

  const go = (dir) => {
    setActiveIndex((prev) => {
      const next = Math.min(Math.max(prev + dir, 0), BLOG_POSTS.length - 1);
      if (next !== prev) {
        setDirection(dir);
        isAnimating.current = true;
        setTimeout(() => {
          isAnimating.current = false;
        }, DURATION);
      }
      return next;
    });
  };

  useEffect(() => {
    if (isMobile) return;

    const onWheel = (e) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      const atLastCard = activeIndex === BLOG_POSTS.length - 1;
      const atFirstCard = activeIndex === 0;

      if (atLastCard && e.deltaY > 0) return;
      if (atFirstCard && e.deltaY < 0 && window.scrollY <= 0) return;

      e.preventDefault();

      wheelAccum.current += e.deltaY;
      const THRESHOLD = 40;
      if (Math.abs(wheelAccum.current) < THRESHOLD) return;

      const dir = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      go(dir);
    };

    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isMobile, activeIndex]);

  useEffect(() => {
    if (isMobile) return;
    const onKey = (e) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (activeIndex === BLOG_POSTS.length - 1) return;
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (activeIndex === 0) return;
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile, activeIndex]);

  useEffect(() => {
    if (!isMobile) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: [0.5], rootMargin: "-35% 0px -35% 0px" }
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [isMobile]);

  const onTouchStart = (e) => {
    if (isMobile) return;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (isMobile || touchStartY.current === null) return;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    touchStartY.current = null;
    if (Math.abs(dy) < 50 || isAnimating.current) return;
    go(dy > 0 ? 1 : -1);
  };

  const scrollToIndex = (idx) => {
    if (isMobile) {
      cardRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      if (isAnimating.current || idx === activeIndex) return;
      setDirection(idx > activeIndex ? 1 : -1);
      isAnimating.current = true;
      setActiveIndex(idx);
      setTimeout(() => {
        isAnimating.current = false;
      }, DURATION);
    }
  };

  const progress = ((activeIndex + 1) / BLOG_POSTS.length) * 100;

  return (
    <main className={`${heroSans.variable} ${mono.variable}`}>
      <section
        className={`blog-section dir-${direction > 0 ? "fwd" : "back"}`}
        ref={sectionRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="blog-left">
          <span className="blog-eyebrow">
            <span className="blog-eyebrow-dot" aria-hidden="true" />
            Real Estate Insights
          </span>

          <h2 className="blog-mark">BLOGS</h2>
          <div className="blog-left-sub">
            <span>Property News</span>
            <span>and Expert Analysis</span>
          </div>

          <div className="blog-counter" aria-hidden="true">
            <span className="blog-counter-cur" key={activeIndex}>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="blog-counter-sep" />
            <span className="blog-counter-total">
              {String(BLOG_POSTS.length).padStart(2, "0")}
            </span>
          </div>

          <div className="blog-progress" aria-hidden="true">
            <span className="blog-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="blog-dots">
            {BLOG_POSTS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to post ${i + 1}`}
                className={`blog-dot ${activeIndex === i ? "active" : ""}`}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>

          <span className="blog-hint" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M6 13l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Scroll to explore
          </span>
        </div>

        <div className="blog-right">
          {!isMobile ? (
            <div className="blog-track-desktop">
              {BLOG_POSTS.map((post, i) => (
                <article
                  key={i}
                  className={`blog-card blog-card--single ${
                    i === activeIndex
                      ? "is-active"
                      : i < activeIndex
                      ? "is-prev"
                      : "is-next"
                  }`}
                  aria-hidden={i !== activeIndex}
                >
                  <div className="blog-card-img-wrap">
                    <span className="blog-card-curtain" aria-hidden="true" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} className="blog-card-img" />
                    <span className="blog-card-sheen" aria-hidden="true" />
                  </div>

                  <div className="blog-card-content">
                    <span className="blog-card-date stag s1">{post.date}</span>

                    <h3 className="blog-card-title stag s2">{post.title}</h3>

                    <span className="blog-card-rule stag s3" aria-hidden="true" />

                    <button type="button" className="blog-discover stag s4">
                      Read More
                      <span className="blog-discover-arrow" aria-hidden="true">→</span>
                    </button>

                    <p className="blog-card-body stag s5">{post.body}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            BLOG_POSTS.map((post, i) => (
              <article
                key={i}
                className="blog-card"
                data-index={i}
                ref={(el) => (cardRefs.current[i] = el)}
              >
                <div className="blog-card-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.title} className="blog-card-img" />
                </div>

                <div className="blog-card-content">
                  <span className="blog-card-date">{post.date}</span>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <span className="blog-card-rule" aria-hidden="true" />

                  <button type="button" className="blog-discover">
                    Read More
                    <span className="blog-discover-arrow" aria-hidden="true">→</span>
                  </button>

                  <p className="blog-card-body">{post.body}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        main {
          font-family: var(--font-hero), "Helvetica Neue", Arial, sans-serif;
          background: #ffffff;
          color: #141313;

          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-io: cubic-bezier(0.65, 0, 0.35, 1);
          --dur: 900ms;
        }

        /* ---------- BLOG SPLIT SECTION ---------- */
        .blog-section {
          display: grid;
          grid-template-columns: 0.62fr 1fr;
          background: #ffffff;
          min-height: 100vh;
          height: 100vh;
          overflow: hidden;
        }

        .blog-left {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4vw 3vw 4vw 5vw;
          overflow: hidden;
        }
        .blog-left::after {
          content: "";
          position: absolute;
          top: 12%;
          bottom: 12%;
          right: 0;
          width: 1px;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(17, 17, 17, 0.12) 22%,
            rgba(17, 17, 17, 0.12) 78%,
            transparent
          );
        }

        .blog-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: var(--font-mono), "Courier New", monospace;
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8a8a84;
          margin-bottom: clamp(0.9rem, 2vw, 1.4rem);
        }
        .blog-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #111111;
          animation: bpPulse 2.4s ease-in-out infinite;
        }
        @keyframes bpPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.7);
          }
        }

        .blog-mark {
          margin: 0;
          font-family: var(--font-hero), "Helvetica Neue", Arial, sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 6vw, 5.6rem);
          line-height: 1;
          letter-spacing: -0.035em;
          color: #111111;
        }
        .blog-left-sub {
          margin-top: clamp(0.8rem, 1.6vw, 1.2rem);
          display: flex;
          flex-direction: column;
          font-family: var(--font-hero), "Helvetica Neue", Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(1.1rem, 2.2vw, 1.6rem);
          line-height: 1.35;
          color: rgba(17, 17, 17, 0.55);
        }

        /* ---- counter ---- */
        .blog-counter {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-top: clamp(2rem, 4vw, 3.2rem);
          font-family: var(--font-mono), "Courier New", monospace;
          font-variant-numeric: tabular-nums;
        }
        .blog-counter-cur {
          display: inline-block;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 500;
          color: #111111;
          line-height: 1;
          animation: bpCount 0.7s var(--ease-out) both;
        }
        @keyframes bpCount {
          from {
            opacity: 0;
            transform: translateY(14px);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .blog-counter-sep {
          width: 22px;
          height: 1px;
          background: rgba(17, 17, 17, 0.3);
          transform: translateY(-6px);
        }
        .blog-counter-total {
          font-size: 0.86rem;
          color: rgba(17, 17, 17, 0.4);
        }

        /* ---- progress ---- */
        .blog-progress {
          position: relative;
          width: min(220px, 60%);
          height: 2px;
          margin-top: clamp(1rem, 2vw, 1.4rem);
          background: rgba(17, 17, 17, 0.1);
          border-radius: 999px;
          overflow: hidden;
        }
        .blog-progress-fill {
          position: absolute;
          inset: 0 auto 0 0;
          background: #111111;
          border-radius: 999px;
          transition: width var(--dur) var(--ease-io);
        }

        .blog-dots {
          margin-top: clamp(1.4rem, 3vw, 2.2rem);
          display: flex;
          gap: 10px;
        }
        .blog-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: none;
          background: rgba(17, 17, 17, 0.22);
          cursor: pointer;
          padding: 0;
          transition: background 0.4s var(--ease-out), width 0.5s var(--ease-out);
        }
        .blog-dot:hover {
          background: rgba(17, 17, 17, 0.45);
        }
        .blog-dot.active {
          background: #111111;
          width: 30px;
        }

        .blog-hint {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: clamp(2rem, 4vw, 3rem);
          font-family: var(--font-mono), "Courier New", monospace;
          font-size: 0.66rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(17, 17, 17, 0.35);
        }
        .blog-hint svg {
          width: 14px;
          height: 14px;
          animation: bpNudge 2.2s var(--ease-io) infinite;
        }
        @keyframes bpNudge {
          0%,
          100% {
            transform: translateY(-2px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(3px);
            opacity: 1;
          }
        }

        .blog-right {
          height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .blog-track-desktop {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .blog-card {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          align-items: center;
          gap: clamp(2rem, 4vw, 4rem);
          padding: 6vh 4vw 6vh 3vw;
        }

        .blog-card--single {
          position: absolute;
          inset: 0;
          height: 100%;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 420ms var(--ease-io),
            visibility 0s linear var(--dur);
        }
        .blog-card--single.is-active {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition: opacity 420ms var(--ease-io), visibility 0s;
          z-index: 2;
        }

        /* --- image frame --- */
        .blog-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          max-height: 68vh;
          overflow: hidden;
          border-radius: 14px;
          background: #f0eee9;
          box-shadow: 0 30px 70px rgba(20, 19, 19, 0.14);
        }
        .blog-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.14);
          will-change: transform;
        }
        .blog-card--single.is-active .blog-card-img {
          animation: bpImgSettle var(--dur) var(--ease-out) forwards;
        }
        @keyframes bpImgSettle {
          from {
            transform: scale(1.14);
          }
          to {
            transform: scale(1);
          }
        }

        /* curtain that wipes off the image */
        .blog-card-curtain {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: #111111;
          transform-origin: bottom;
          transform: scaleY(1);
          pointer-events: none;
        }
        .blog-card--single.is-active .blog-card-curtain {
          animation: bpCurtainUp 780ms var(--ease-out) forwards;
        }
        @keyframes bpCurtainUp {
          0% {
            transform: scaleY(1);
          }
          100% {
            transform: scaleY(0);
          }
        }
        .dir-back .blog-card--single.is-active .blog-card-curtain {
          transform-origin: top;
        }

        /* light sweep across the photo */
        .blog-card-sheen {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255, 255, 255, 0.32) 50%,
            transparent 65%
          );
          transform: translateX(-120%);
        }
        .blog-card--single.is-active .blog-card-sheen {
          animation: bpSheen 1150ms var(--ease-io) 260ms forwards;
        }
        @keyframes bpSheen {
          to {
            transform: translateX(120%);
          }
        }

        /* --- content --- */
        .blog-card-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stag {
          opacity: 0;
          transform: translateY(26px);
          filter: blur(6px);
        }
        .blog-card--single.is-active .stag {
          animation: bpRise 820ms var(--ease-out) forwards;
        }
        .dir-back .blog-card--single.is-active .stag {
          animation-name: bpRiseBack;
        }
        @keyframes bpRise {
          from {
            opacity: 0;
            transform: translateY(26px);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @keyframes bpRiseBack {
          from {
            opacity: 0;
            transform: translateY(-26px);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .blog-card--single.is-active .s1 {
          animation-delay: 180ms;
        }
        .blog-card--single.is-active .s2 {
          animation-delay: 260ms;
        }
        .blog-card--single.is-active .s3 {
          animation-delay: 340ms;
        }
        .blog-card--single.is-active .s4 {
          animation-delay: 420ms;
        }
        .blog-card--single.is-active .s5 {
          animation-delay: 500ms;
        }

        .blog-card-date {
          font-family: var(--font-mono), "Courier New", monospace;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          color: #8a8a84;
        }
        .blog-card-title {
          margin: 0;
          font-family: var(--font-hero), "Helvetica Neue", Arial, sans-serif;
          font-weight: 700;
          font-size: clamp(1.6rem, 3vw, 2.5rem);
          line-height: 1.14;
          letter-spacing: -0.028em;
          color: #111111;
          max-width: 20ch;
        }
        .blog-card-rule {
          display: block;
          width: 56px;
          height: 2px;
          background: #111111;
          border-radius: 999px;
        }

        .blog-discover {
          align-self: flex-start;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: #111111;
          color: #ffffff;
          border: none;
          border-radius: 999px;
          padding: 0.85em 1.7em;
          font-family: var(--font-hero), sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.02em;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.45s var(--ease-out),
            box-shadow 0.45s var(--ease-out);
          margin-top: 0.2rem;
        }
        .blog-discover::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, #1e4fa0, #3f79d6);
          opacity: 0;
          transition: opacity 0.45s var(--ease-out);
        }
        .blog-discover:hover::before {
          opacity: 1;
        }
        .blog-discover:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 34px rgba(30, 79, 160, 0.3);
        }
        .blog-discover > * {
          position: relative;
          z-index: 1;
        }
        .blog-discover-arrow {
          font-size: 0.95rem;
          display: inline-block;
          transition: transform 0.45s var(--ease-out);
        }
        .blog-discover:hover .blog-discover-arrow {
          transform: translate(3px, -3px);
        }

        .blog-card-body {
          margin: 0.4rem 0 0;
          font-family: var(--font-mono), "Courier New", monospace;
          font-size: clamp(0.8rem, 1.3vw, 0.9rem);
          line-height: 1.75;
          color: #55534d;
          max-width: 600px;
        }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 1100px) {
          .blog-card {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 2.4rem;
          }
          .blog-card-title {
            max-width: none;
          }
        }

        @media (max-width: 900px) {
          .blog-section {
            grid-template-columns: 1fr;
            height: auto;
            overflow: visible;
          }
          .blog-left {
            height: auto;
            padding: 10vw 6vw 6vw;
            align-items: center;
            text-align: center;
          }
          .blog-left::after {
            display: none;
          }
          .blog-mark {
            font-size: clamp(2.2rem, 10vw, 3.4rem);
          }
          .blog-left-sub {
            align-items: center;
          }
          .blog-counter,
          .blog-dots,
          .blog-hint {
            justify-content: center;
          }
          .blog-progress {
            width: 60%;
          }
          .blog-right {
            height: auto;
            overflow: visible;
            padding: 0 6vw;
          }
          .blog-card {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 8vh 0;
            gap: 1.6rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          }
          .blog-card:last-child {
            border-bottom: none;
          }
          .blog-card-img-wrap {
            max-height: 60vh;
            aspect-ratio: 4 / 3;
            box-shadow: 0 18px 40px rgba(20, 19, 19, 0.1);
          }
          .blog-card-img {
            transform: none;
          }
        }

        @media (max-width: 560px) {
          .blog-left {
            padding: 8vw 6vw 5vw;
          }
          .blog-mark {
            font-size: clamp(2rem, 12vw, 2.8rem);
          }
          .blog-left-sub {
            font-size: 1rem;
          }
          .blog-card {
            padding: 6vh 0;
          }
          .blog-card-img-wrap {
            aspect-ratio: 4 / 3.2;
            max-height: 50vh;
          }
          .blog-card-title {
            font-size: 1.4rem;
          }
          .blog-discover {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .blog-card--single.is-active .blog-card-curtain,
          .blog-card--single.is-active .blog-card-sheen,
          .blog-card--single.is-active .blog-card-img,
          .blog-card--single.is-active .stag,
          .blog-eyebrow-dot,
          .blog-hint svg {
            animation: none !important;
          }
          .stag {
            opacity: 1;
            transform: none;
            filter: none;
          }
          .blog-card-curtain {
            display: none;
          }
          .blog-card-img {
            transform: none;
          }
          .blog-discover,
          .blog-dot,
          .blog-progress-fill {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}