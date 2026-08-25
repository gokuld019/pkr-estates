"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GALLERY_ITEMS = [
  "/amenity1.jpeg",
  "/Amenity2.jpeg",
  "/amenity3.jpeg",
  "/amenity4.jpeg",
  "/amenity5.jpeg",
  "/amenity6.jpeg",
  "/amenity7.jpeg",
];

const BP = { mobile: 640, tablet: 1024 };

function getItemWidth(width) {
  if (width < BP.mobile) return Math.min(240, width * 0.62);
  if (width < BP.tablet) return 280;
  return 350;
}

function getItemHeight(width) {
  if (width < BP.mobile) return Math.min(280, width * 0.72);
  if (width < BP.tablet) return 340;
  return 400;
}

export default function ConnectSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingLineRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  const isMobile = viewportWidth < BP.mobile;
  const itemWidth = getItemWidth(viewportWidth);
  const itemHeight = getItemHeight(viewportWidth);
  const itemGap = isMobile ? 24 : viewportWidth < BP.tablet ? 32 : 48;
  const sidePadding = Math.max(16, viewportWidth / 2 - itemWidth / 2);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self) => {
      const track = trackRef.current;
      const items = gsap.utils.toArray(track.children);

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

      gsap.from(sectionRef.current.querySelectorAll("[data-scroll-reveal]"), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const updateCoverflow = () => {
        const viewportCenter = window.innerWidth / 2;
        const maxRotation = window.innerWidth < BP.mobile ? 22 : window.innerWidth < BP.tablet ? 32 : 45;

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const distance = itemCenter - viewportCenter;

          let rotation = (distance / (window.innerWidth * 0.5)) * maxRotation;
          rotation = Math.max(-maxRotation, Math.min(maxRotation, rotation));

          const scale = 1 - Math.abs(distance) / (window.innerWidth * 1.8);
          const clampedScale = Math.max(0.7, scale);
          const z = -Math.abs(distance) * 0.4;

          gsap.set(item, { rotationY: rotation, scale: clampedScale, z });
        });
      };

      gsap.ticker.add(updateCoverflow);
      self.add(() => () => gsap.ticker.remove(updateCoverflow));
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportWidth]);

  return (
    <section ref={sectionRef} id="connect-section" style={styles.section}>
      <div style={styles.heroHeading}>
        <h2 style={styles.headingMask}>
          <span ref={headingLineRef} style={styles.headingLine}>
            Let&rsquo;s connect
          </span>
        </h2>
        <div data-scroll-reveal style={styles.topBarRight}>
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
          style={{
            ...styles.track,
            gap: `${itemGap}px`,
            padding: `0 ${sidePadding}px`,
          }}
        >
          {GALLERY_ITEMS.map((src, i) => (
            <div
              key={src}
              style={{
                ...styles.item,
                flex: `0 0 ${itemWidth}px`,
                height: `${itemHeight}px`,
              }}
            >
              <div style={styles.clayBox}>
                <img src={src} alt={`PKR Estate ${i + 1}`} style={styles.itemImage} draggable={false} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div data-scroll-reveal style={styles.formContainer}>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ width: "100%" }}
        >
          <div style={{ ...styles.inputGroup, flexDirection: isMobile ? "column" : "row" }}>
            <input
              type="email"
              placeholder="Email*"
              required
              style={styles.input}
            />
            <button
              type="submit"
              style={{
                ...styles.button,
                width: isMobile ? "100%" : "auto",
                padding: isMobile ? "0.9rem 2rem" : "0 2rem",
                marginTop: isMobile ? "8px" : 0,
              }}
            >
              Submit
            </button>
          </div>
        </form>
        <p style={styles.disclaimer}>
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

const CLAY_BASE = "#ffffff";
const CLAY_LIGHT = "#ffffff";
const CLAY_DARK = "#d9d0bd";
const SHADOW_OUTSET = `12px 12px 24px ${CLAY_DARK}, -12px -12px 24px ${CLAY_LIGHT}`;
const SHADOW_INSET =
  "inset 4px 4px 8px rgba(255,255,255,0.8), inset -4px -4px 8px rgba(0,0,0,0.05)";

const styles = {
  section: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "clamp(90vh, 100dvh, 120vh)",
    padding: "clamp(2.5rem, 8vw, 5rem) 0",
    backgroundColor: CLAY_BASE,
    overflow: "hidden",
    boxSizing: "border-box",
  },
  heroHeading: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    textAlign: "center",
    padding: "0 clamp(1rem, 6vw, 6vw) min(5vw, 56px)",
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
    color: "#171412",
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
    backgroundColor: "#f0f0f0",
    color: "#171412",
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
    backgroundColor: "#f0f0f0",
    color: "#171412",
    flexShrink: 0,
  },

  viewport: {
    width: "100%",
    height: "clamp(300px, 55vh, 460px)",
    perspective: "1200px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: "clamp(2rem, 6vw, 4rem)",
    maskImage:
      "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
  },
  track: {
    display: "flex",
    alignItems: "center",
    transformStyle: "preserve-3d",
  },
  item: {
    position: "relative",
    transformStyle: "preserve-3d",
    cursor: "pointer",
  },
  clayBox: {
    width: "100%",
    height: "100%",
    padding: "clamp(8px, 1.5vw, 12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: CLAY_BASE,
    borderRadius: "0",
    boxShadow: `${SHADOW_OUTSET}, ${SHADOW_INSET}`,
    border: "4px solid rgba(0,0,0,0.08)",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "0",
    filter: "saturate(0.9) contrast(1.1)",
    pointerEvents: "none",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "500px",
    padding: "0 clamp(1rem, 4vw, 1.5rem)",
    boxSizing: "border-box",
  },
  inputGroup: {
    display: "flex",
    width: "100%",
    background: CLAY_BASE,
    borderRadius: "0",
    boxShadow: `${SHADOW_OUTSET}, ${SHADOW_INSET}`,
    padding: "8px",
    marginBottom: "1.5rem",
    border: "2px solid rgba(0,0,0,0.1)",
    boxSizing: "border-box",
  },

  // ✅ BODY FONT: Figtree Medium
  input: {
    flex: 1,
    minWidth: 0,
    background: "transparent",
    border: "none",
    outline: "none",
    padding: "clamp(0.85rem, 2.5vw, 1rem) clamp(1rem, 3vw, 1.5rem)",
    fontSize: "clamp(0.92rem, 2vw, 1rem)",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    color: "#171412",
    fontWeight: 500,
  },

  // ✅ BODY FONT: Figtree Bold
  button: {
    background: "#171412",
    color: "#fff",
    border: "none",
    borderRadius: "0",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow:
      "6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.1), inset 2px 2px 5px rgba(255,255,255,0.2)",
  },

  // ✅ BODY FONT: Figtree Regular
  disclaimer: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 400,
    color: "rgba(23,20,18,0.55)",
    textAlign: "center",
  },
};