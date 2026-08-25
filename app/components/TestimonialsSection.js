"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Suzette",
    quote:
      "Jamie worked hard to find a property with our quite specific parameters in mind. She was patient, thorough, and always available to answer questions throughout the whole process.",
    rating: 5,
    date: "May 6, 2025",
  },
  {
    id: 2,
    name: "Anthony",
    quote: "She's our Hometown girl?? Best agent we could have asked for, honestly.",
    rating: 5,
    date: "February 16, 2024",
  },
  {
    id: 3,
    name: "Matthew",
    quote:
      "Jamie is absolutely amazing! Easy to work with, all questions answered even if she had to go find the answer herself.",
    rating: 5,
    date: "December 26, 2023",
  },
  {
    id: 4,
    name: "Priya",
    quote:
      "From the first call to closing day, everything felt effortless. Highly recommend to anyone buying their first home.",
    rating: 5,
    date: "November 2, 2023",
  },
  {
    id: 5,
    name: "Daniel",
    quote:
      "Communicative, sharp, and genuinely cared about getting us the right place, not just any place.",
    rating: 5,
    date: "August 14, 2023",
  },
];

// Breakpoints (px)
const BP = {
  mobile: 640,   // < 640  -> 1 card
  tablet: 1024,  // < 1024 -> 2 cards
  laptop: 1440,  // < 1440 -> 3 cards
  // >= 1440 (big/desktop) -> 3 cards, wider gutters
};

function getCardsVisible(width) {
  if (width < BP.mobile) return 1;
  if (width < BP.tablet) return 2;
  return 3;
}

function getGap(width) {
  if (width < BP.mobile) return 14;
  if (width < BP.tablet) return 18;
  return 24;
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const headingLineRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const autoplayRef = useRef(null);
  const isHoveringRef = useRef(false);

  // touch/drag state
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isDragging = useRef(false);

  const cardsVisible = getCardsVisible(viewportWidth);
  const gap = getGap(viewportWidth);
  const maxIndex = Math.max(0, TESTIMONIALS.length - cardsVisible);

  const measure = useCallback(() => {
    if (cardRefs.current[0]) {
      const rect = cardRefs.current[0].getBoundingClientRect();
      setCardWidth(rect.width + gap);
    }
  }, [gap]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // remeasure whenever layout-affecting values change
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [measure, viewportWidth, cardsVisible]);

  // clamp index whenever cardsVisible / maxIndex changes (e.g. resize crosses a breakpoint)
  useEffect(() => {
    setIndex((prev) => Math.max(0, Math.min(maxIndex, prev)));
  }, [maxIndex]);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const goTo = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(maxIndex, next));
      setIndex(clamped);
      if (trackRef.current && cardWidth) {
        gsap.to(trackRef.current, {
          x: -clamped * cardWidth,
          duration: 0.8,
          ease: "power3.out",
        });
      }
      const visible = cardRefs.current.slice(clamped, clamped + cardsVisible);
      gsap.fromTo(
        visible.map((c) => c?.querySelector("[data-quote]")).filter(Boolean),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.15 }
      );
      gsap.fromTo(
        visible.map((c) => c?.querySelector("[data-name]")).filter(Boolean),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 }
      );
    },
    [cardWidth, maxIndex, cardsVisible]
  );

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      if (isHoveringRef.current) return;
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3800);
    return () => clearInterval(autoplayRef.current);
  }, [maxIndex]);

  useEffect(() => {
    goTo(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, cardWidth]);

  // --- touch swipe handlers (mobile) ---
  const handleTouchStart = (e) => {
    isDragging.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isHoveringRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    if (trackRef.current && cardWidth) {
      gsap.set(trackRef.current, {
        x: -index * cardWidth + touchDeltaX.current,
      });
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    isHoveringRef.current = false;
    const threshold = cardWidth * 0.18;
    if (touchDeltaX.current < -threshold) {
      goTo(index + 1);
    } else if (touchDeltaX.current > threshold) {
      goTo(index - 1);
    } else {
      goTo(index); // snap back
    }
    touchDeltaX.current = 0;
  };

  const progressPct =
    maxIndex === 0 ? 100 : ((index + cardsVisible) / TESTIMONIALS.length) * 100;

  const isMobile = viewportWidth < BP.mobile;

  return (
    <section
      ref={sectionRef}
      style={styles.section}
      onMouseEnter={() => (isHoveringRef.current = true)}
      onMouseLeave={() => (isHoveringRef.current = false)}
    >
      <div style={styles.inner}>
        <div style={styles.heroHeading}>
          <h2 style={styles.headingMask}>
            <span ref={headingLineRef} style={styles.headingLine}>
              Client Reviews
            </span>
          </h2>
          <div style={styles.topBarRight}>
            <a href="#" style={styles.viewAllBtn}>
              View all
            </a>
            <span style={styles.iconBtn} aria-hidden="true">
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

        <div style={styles.viewport}>
          <div
            ref={trackRef}
            style={{ ...styles.track, gap: `${gap}px` }}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.id}
                ref={(el) => (cardRefs.current[i] = el)}
                style={{
                  ...styles.card,
                  flex: `0 0 calc((100% - ${gap * (cardsVisible - 1)}px) / ${cardsVisible})`,
                }}
              >
                <div style={styles.cardGlow} aria-hidden="true" />

                <div style={styles.cardTop}>
                  <span data-name style={styles.cardName}>
                    {t.name}
                  </span>
                  <span style={styles.cardQuoteMark} aria-hidden="true">
                    &rdquo;
                  </span>
                </div>

                <p data-quote style={styles.cardQuote}>
                  &ldquo; {t.quote} &rdquo;
                </p>

                <div style={styles.cardBottom}>
                  <span style={styles.cardStars}>{"★".repeat(t.rating)}</span>
                  <span style={styles.cardRating}>{t.rating}</span>
                  <span style={styles.metaSep}>/</span>
                  <span style={styles.cardDate}>{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progressPct}%`,
              }}
            />
          </div>

          <div style={styles.navButtons}>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              style={{
                ...styles.navBtn,
                ...styles.navBtnPrev,
                opacity: index === 0 ? 0.35 : 1,
                cursor: index === 0 ? "default" : "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => goTo(index + 1)}
              disabled={index === maxIndex}
              style={{
                ...styles.navBtn,
                ...styles.navBtnNext,
                opacity: index === maxIndex ? 0.35 : 1,
                cursor: index === maxIndex ? "default" : "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    padding: "clamp(2.5em, 8vw, 6em) clamp(1rem, 4vw, 4vw)",
    backgroundColor: "#eeeeec",
    boxSizing: "border-box",
  },
  inner: {
    width: "100%",
    maxWidth: "1500px",
    margin: "0 auto",
  },
  heroHeading: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    textAlign: "center",
    padding: "0 0 min(5vw, 56px)",
    width: "100%",
    boxSizing: "border-box",
  },

  // ✅ BODY FONT: Figtree Regular
  subtitle: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 400,
    color: "rgba(0,0,0,0.55)",
    marginBottom: "18px",
  },

  headingMask: {
    margin: "0",
    overflow: "hidden",
    flex: "1 1 auto",
    minWidth: "200px",
  },

  // ✅ HEADING FONT: Figtree Light
  headingLine: {
    display: "inline-block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "clamp(2rem, 7vw, 5.5rem)",
    letterSpacing: "-0.02em",
    color: "#101010",
    lineHeight: 1,
    textTransform: "uppercase",
  },

  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: "0 0 auto",
  },

  // ✅ BODY FONT: Figtree Medium
  viewAllBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "clamp(0.55em, 1.5vw, 0.7em) clamp(1em, 2.5vw, 1.3em)",
    borderRadius: "999px",
    backgroundColor: "#ffffff",
    color: "#101010",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.78rem, 1.3vw, 0.85rem)",
    fontWeight: 500,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },

  iconBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "clamp(34px, 5vw, 38px)",
    height: "clamp(34px, 5vw, 38px)",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    color: "#101010",
    flexShrink: 0,
  },

  viewport: {
    overflow: "hidden",
    width: "100%",
    touchAction: "pan-y",
  },
  track: {
    display: "flex",
    willChange: "transform",
  },
  card: {
    position: "relative",
    minWidth: "240px",
    minHeight: "clamp(19em, 26vw, 22em)",
    backgroundColor: "#ffffff",
    borderRadius: "1.25em",
    padding: "clamp(1.5em, 4vw, 2.4em) clamp(1.3em, 3.5vw, 2.2em)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
    boxShadow: "0 1px 2px rgba(16,16,16,0.04), 0 20px 44px -20px rgba(16,16,16,0.12)",
    border: "1px solid rgba(16,16,16,0.05)",
    overflow: "hidden",
    transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease",
  },
  cardGlow: {
    position: "absolute",
    top: "-40%",
    right: "-30%",
    width: "60%",
    height: "60%",
    background:
      "radial-gradient(circle, rgba(19,19,19,0.05) 0%, rgba(19,19,19,0) 70%)",
    pointerEvents: "none",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "relative",
    zIndex: 1,
  },

  // ✅ BODY FONT: Figtree Medium
  cardName: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.88rem, 2vw, 0.95rem)",
    fontWeight: 500,
    color: "#131313",
    letterSpacing: "0.01em",
  },

  // ✅ HEADING FONT: Figtree Light (for quote marks)
  cardQuoteMark: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 300,
    fontSize: "clamp(1.6rem, 3.5vw, 2rem)",
    lineHeight: 1,
    color: "rgba(19,19,19,0.85)",
  },

  // ✅ BODY FONT: Figtree Regular (italic)
  cardQuote: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.95rem, 2vw, 1.08rem)",
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.6,
    color: "#1a1a1a",
    margin: "1.4em 0",
    position: "relative",
    zIndex: 1,
  },

  // ✅ BODY FONT: Figtree Regular
  cardBottom: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.55em",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.78rem, 1.8vw, 0.85rem)",
    fontWeight: 400,
    color: "rgba(19,19,19,0.6)",
    position: "relative",
    zIndex: 1,
  },

  cardStars: {
    color: "#131313",
    fontSize: "0.9rem",
    letterSpacing: "0.03em",
  },

  // ✅ BODY FONT: Figtree Medium
  cardRating: {
    color: "#131313",
    fontWeight: 500,
  },
  cardDate: {
    color: "rgba(19,19,19,0.55)",
  },
  metaSep: {
    color: "rgba(19,19,19,0.28)",
  },
  footer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "clamp(16px, 4vw, 28px)",
    marginTop: "clamp(2em, 5vw, 3.2em)",
  },
  progressTrack: {
    flex: "1 1 140px",
    height: "2px",
    backgroundColor: "rgba(19,19,19,0.13)",
    position: "relative",
    borderRadius: "2px",
    overflow: "hidden",
  },
  progressFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#131313",
    borderRadius: "2px",
    transition: "width 0.5s ease",
  },
  navButtons: {
    display: "flex",
    gap: "12px",
    flex: "0 0 auto",
  },
  navBtn: {
    width: "clamp(42px, 8vw, 50px)",
    height: "clamp(42px, 8vw, 50px)",
    borderRadius: "50%",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  },
  navBtnPrev: {
    backgroundColor: "#d6d6d3",
    color: "#fff",
  },
  navBtnNext: {
    backgroundColor: "#131313",
    color: "#fff",
  },
};