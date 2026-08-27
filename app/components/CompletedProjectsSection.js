"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COMPLETED_PROJECTS = [
  {
    name: "Radiant Avenue - Guduvanchery",
    badge: { type: "ribbon", value: "Completed" },
    image: "/radiant.jpeg",
  },
  {
    name: "PK's Paradise - T Nagar",
    badge: { type: "ribbon", value: "Completed" },
    image: "/pkparadise.jpeg",
  },
  {
    name: "Premavathy Nagar - Maraimalai Nagar",
    badge: { type: "ribbon", value: "Completed" },
    image: "/premavathy.jpeg",
  },
  {
    name: "Aditi Gardenz - SP Koil",
    badge: { type: "ribbon", value: "Completed" },
    image: "/aditisp.jpeg",
  },
  {
    name: "Aditi Gardenz - Veppampattu",
    badge: { type: "ribbon", value: "Completed" },
    image: "/aditiv.jpeg",
  },
];

const BP = { mobile: 768, tablet: 1024 };

export default function CompletedProjectsSection() {
  const sectionRef = useRef(null);
  const headingLineRef = useRef(null);
  const imageRefs = useRef([]);
  const wrapRefs = useRef([]);
  const veilRefs = useRef([]);
  const revealRefs = useRef([]);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  const isMobile = viewportWidth < BP.mobile;
  const isTablet = viewportWidth >= BP.mobile && viewportWidth < BP.tablet;
  const gridGap = isMobile ? 24 : isTablet ? 18 : 20;

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    let ro;
    if (sectionRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          if (w > 0) setViewportWidth(w);
        }
      });
      ro.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ro) ro.disconnect();
    };
  }, []);

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
        sectionRef.current.querySelectorAll("[data-fade]"),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );

      imageRefs.current.filter(Boolean).forEach((img, i) => {
        const wrap = wrapRefs.current[i];

        gsap.fromTo(
          img,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: wrap, start: "top 90%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = (i) => {
    if (isMobile) return;
    const img = imageRefs.current[i];
    const veil = veilRefs.current[i];
    const reveal = revealRefs.current[i];

    if (img) {
      gsap.to(img, {
        filter: "grayscale(0) brightness(1.02) saturate(1.08)",
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (veil) {
      gsap.to(veil, { opacity: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    }
    if (reveal) {
      gsap.to(reveal, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  const handleLeave = (i) => {
    if (isMobile) return;
    const img = imageRefs.current[i];
    const veil = veilRefs.current[i];
    const reveal = revealRefs.current[i];

    if (img) {
      gsap.to(img, {
        filter: "grayscale(0.18) brightness(1) saturate(1)",
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (veil) {
      gsap.to(veil, { opacity: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" });
    }
    if (reveal) {
      gsap.to(reveal, {
        y: 18,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <section ref={sectionRef} style={styles.section}>
      <style>{`
        .cp-wrap .cp-frame {
          transition: border-color 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease;
        }
        .cp-wrap:hover .cp-frame { border-color: rgba(255,255,255,0.55); opacity: 1; }
        .cp-wrap .cp-corner {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
        }
        .cp-wrap:hover .cp-corner--tl { transform: translate(4px, 4px); opacity: 1; }
        .cp-wrap:hover .cp-corner--br { transform: translate(-4px, -4px); opacity: 1; }
        .cp-wrap .cp-plus { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), color 0.4s ease; }
        .cp-wrap:hover .cp-plus { color: rgba(255,255,255,0.85); transform: rotate(90deg); }
        .cp-wrap .cp-arrow { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .cp-wrap:hover .cp-arrow { transform: translate(3px, -3px); }
        @media (prefers-reduced-motion: reduce) {
          .cp-wrap .cp-frame, .cp-wrap .cp-corner, .cp-wrap .cp-plus, .cp-wrap .cp-arrow {
            transition: none !important;
          }
        }
      `}</style>

      <div style={{ ...styles.heroHeading, ...(isMobile ? styles.heroHeadingMobile : {}) }}>
        <h2 style={styles.headingMask}>
          <span
            ref={headingLineRef}
            style={{
              ...styles.headingLine,
              ...(isMobile ? { fontSize: "clamp(1.8rem, 9vw, 2.4rem)" } : {}),
            }}
          >
            Completed Projects
          </span>
        </h2>
        <div data-fade style={styles.topBarRight}>
          <Link href="/#projects" style={styles.viewAllBtn}>
            View all
          </Link>
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

      <div
        style={{
          ...styles.grid,
          ...(isMobile ? styles.gridMobile : {}),
          columnGap: `${gridGap}px`,
          rowGap: `${gridGap}px`,
        }}
      >
        {COMPLETED_PROJECTS.map((project, i) => (
          <div
            key={project.name}
            style={{
              ...styles.column,
              ...(isMobile ? styles.columnMobile : {}),
            }}
          >
            <div
              data-fade
              style={{
                ...styles.titleRow,
                ...(isMobile
                  ? {
                      padding: "14px 16px",
                      height: "auto",
                      borderBottom: "none",
                      alignItems: "flex-start",
                    }
                  : {}),
              }}
            >
              <span
                style={{
                  ...styles.dot,
                  ...(isMobile ? { width: "7px", height: "7px", marginTop: "7px" } : {}),
                }}
              />
              <span
                style={{
                  ...styles.title,
                  ...(isMobile
                    ? {
                        fontSize: "0.98rem",
                        whiteSpace: "normal",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                      }
                    : {}),
                }}
              >
                {project.name}
              </span>
            </div>

            <div
              ref={(el) => (wrapRefs.current[i] = el)}
              data-fade
              className="cp-wrap"
              style={{
                ...styles.imageWrap,
                ...(isMobile
                  ? {
                      width: "100%",
                      aspectRatio: "16 / 10",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "0 0 18px 18px",
                    }
                  : {
                      height: "clamp(240px, 62vw, 560px)",
                    }),
              }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              <img
                ref={(el) => (imageRefs.current[i] = el)}
                src={project.image}
                alt={project.name}
                style={styles.image}
                draggable={false}
              />

              {/* darkening veil — fades in on hover, no scaling */}
              <span
                ref={(el) => (veilRefs.current[i] = el)}
                style={styles.veil}
                aria-hidden="true"
              />

              {/* inset frame line that brightens on hover */}
              <span className="cp-frame" style={styles.frame} aria-hidden="true" />

              {/* corner ticks that ease outward */}
              <span className="cp-corner cp-corner--tl" style={styles.cornerTL} aria-hidden="true" />
              <span className="cp-corner cp-corner--br" style={styles.cornerBR} aria-hidden="true" />

              <span
                className="cp-plus"
                style={{ ...styles.plusIcon, top: isMobile ? "12px" : "16px" }}
              >
                +
              </span>
              <span
                className="cp-plus"
                style={{ ...styles.plusIcon, bottom: isMobile ? "12px" : "16px" }}
              >
                +
              </span>

              {/* slide-up reveal label */}
              {!isMobile && (
                <span
                  ref={(el) => (revealRefs.current[i] = el)}
                  style={styles.revealPill}
                  aria-hidden="true"
                >
                  View project
                  <svg
                    className="cp-arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 17L17 7M17 7H9M17 7v8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}

              {project.badge.type === "ribbon" && (
                <div
                  style={{
                    ...styles.ribbonTab,
                    top: isMobile ? "14px" : "clamp(12px, 2vw, 20px)",
                    padding: isMobile
                      ? "12px 8px"
                      : "clamp(8px, 2vw, 14px) clamp(6px, 1.5vw, 10px)",
                  }}
                >
                  <span
                    style={{
                      ...styles.ribbonCheck,
                      fontSize: isMobile ? "1rem" : "clamp(0.7rem, 1.2vw, 0.9rem)",
                    }}
                  >
                    &#10003;
                  </span>
                  <span
                    style={{
                      ...styles.ribbonText,
                      fontSize: isMobile ? "0.72rem" : "clamp(0.6rem, 1vw, 0.72rem)",
                    }}
                  >
                    {project.badge.value}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...styles.footerBrand, ...(isMobile ? { textAlign: "center", padding: "16px 16px 0" } : {}) }}>
        <span style={styles.brandName}>Cuberto™</span>
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    backgroundColor: "#ffffff",
    padding: "0 0 min(6vw, 64px)",
    overflow: "hidden",
    width: "100%",
  },
  heroHeading: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    textAlign: "center",
    padding: "clamp(2.5em, 8vw, 6em) clamp(1rem, 6vw, 6vw) min(5vw, 56px)",
    width: "100%",
    boxSizing: "border-box",
  },
  heroHeadingMobile: {
    padding: "2.2em 1.25rem 1.75rem",
    gap: "14px",
  },

  headingMask: {
    margin: "0",
    overflow: "hidden",
    flex: "1 1 auto",
    minWidth: "160px",
  },

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

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoRows: "1fr",
    padding: "0 clamp(1rem, 4vw, 20px)",
    width: "100%",
    boxSizing: "border-box",
    alignItems: "stretch",
  },
  gridMobile: {
    gridTemplateColumns: "1fr",
    padding: "0 16px",
    maxWidth: "560px",
    margin: "0 auto",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "14px",
    height: "100%",
    width: "100%",
  },
  columnMobile: {
    maxWidth: "100%",
    marginBottom: "0",
    height: "auto",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    border: "1px solid rgba(0,0,0,0.06)",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 1.5vw, 10px)",
    padding: "clamp(12px, 2vw, 14px) clamp(12px, 3vw, 20px)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    backgroundColor: "#ffffff",
    height: "clamp(48px, 6vw, 52px)",
    boxSizing: "border-box",
    flex: "0 0 auto",
  },
  dot: {
    width: "clamp(5px, 0.8vw, 6px)",
    height: "clamp(5px, 0.8vw, 6px)",
    borderRadius: "50%",
    backgroundColor: "#ff5a3c",
    flex: "0 0 auto",
  },

  title: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
    fontWeight: 500,
    color: "#171412",
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  imageWrap: {
    position: "relative",
    width: "100%",
    flex: "1 1 auto",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
    borderRadius: "0 0 14px 14px",
  },

  image: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
    filter: "grayscale(0.18) brightness(1) saturate(1)",
    willChange: "filter, opacity",
  },

  veil: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
    opacity: 0,
    background:
      "linear-gradient(180deg, rgba(10,10,12,0.30) 0%, rgba(10,10,12,0.06) 45%, rgba(10,10,12,0.62) 100%)",
  },

  frame: {
    position: "absolute",
    inset: "14px",
    zIndex: 2,
    pointerEvents: "none",
    border: "1px solid rgba(255,255,255,0)",
    borderRadius: "6px",
    opacity: 0.9,
  },

  cornerTL: {
    position: "absolute",
    top: "14px",
    left: "14px",
    zIndex: 3,
    width: "22px",
    height: "22px",
    pointerEvents: "none",
    borderTop: "2px solid rgba(255,255,255,0.9)",
    borderLeft: "2px solid rgba(255,255,255,0.9)",
    borderRadius: "4px 0 0 0",
    opacity: 0,
  },

  cornerBR: {
    position: "absolute",
    bottom: "14px",
    right: "14px",
    zIndex: 3,
    width: "22px",
    height: "22px",
    pointerEvents: "none",
    borderBottom: "2px solid rgba(255,255,255,0.9)",
    borderRight: "2px solid rgba(255,255,255,0.9)",
    borderRadius: "0 0 4px 0",
    opacity: 0,
  },

  plusIcon: {
    position: "absolute",
    left: "clamp(12px, 2vw, 16px)",
    zIndex: 3,
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
    fontWeight: 300,
    color: "rgba(0,0,0,0.4)",
    lineHeight: 1,
    pointerEvents: "none",
  },

  revealPill: {
    position: "absolute",
    left: "clamp(16px, 2.5vw, 24px)",
    bottom: "clamp(16px, 2.5vw, 24px)",
    zIndex: 4,
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    padding: "10px 18px",
    borderRadius: "999px",
    backgroundColor: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.34)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#ffffff",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.78rem",
    fontWeight: 600,
    letterSpacing: "0.01em",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    opacity: 0,
    transform: "translateY(18px)",
  },

  ribbonTab: {
    position: "absolute",
    right: 0,
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(6px, 1vw, 10px)",
    backgroundColor: "#171412",
    color: "#ffffff",
    borderRadius: "4px 0 0 4px",
  },
  ribbonCheck: {
    fontWeight: 700,
  },

  ribbonText: {
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },

  footerBrand: {
    padding: "20px clamp(1rem, 6vw, 6vw) 0",
    textAlign: "right",
  },

  brandName: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 400,
    color: "rgba(0,0,0,0.25)",
    letterSpacing: "0.02em",
  },
};