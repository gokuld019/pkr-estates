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

const BP = { mobile: 640, tablet: 1024 };

export default function CompletedProjectsSection() {
  const sectionRef = useRef(null);
  const headingLineRef = useRef(null);
  const imageRefs = useRef([]);
  const wrapRefs = useRef([]);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  const isMobile = viewportWidth < BP.mobile;
  const isTablet = viewportWidth >= BP.mobile && viewportWidth < BP.tablet;
  const gridColumns = isMobile ? "1fr" : "1fr 1fr";
  const gridGap = isMobile ? 14 : isTablet ? 18 : 20;

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
          { scale: 1.16, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: wrap, start: "top 90%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = (i) => {
    if (isMobile) return; // no hover scale on touch devices
    const img = imageRefs.current[i];
    if (!img) return;
    gsap.to(img, {
      scale: 1.06,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleLeave = (i) => {
    if (isMobile) return;
    const img = imageRefs.current[i];
    if (!img) return;
    gsap.to(img, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.heroHeading}>
        <h2 style={styles.headingMask}>
          <span ref={headingLineRef} style={styles.headingLine}>
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
          gridTemplateColumns: gridColumns,
          columnGap: `${gridGap}px`,
          rowGap: `${gridGap}px`,
        }}
      >
        {COMPLETED_PROJECTS.map((project, i) => (
          <div
            key={project.name}
            style={styles.column}
          >
            <div data-fade style={styles.titleRow}>
              <span style={styles.dot} />
              <span style={styles.title}>{project.name}</span>
            </div>

            <div
              ref={(el) => (wrapRefs.current[i] = el)}
              data-fade
              style={styles.imageWrap}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              <span style={{ ...styles.plusIcon, top: "16px" }}>+</span>
              <span style={{ ...styles.plusIcon, bottom: "16px" }}>+</span>

              <img
                ref={(el) => (imageRefs.current[i] = el)}
                src={project.image}
                alt={project.name}
                style={styles.image}
                draggable={false}
              />

              {project.badge.type === "ribbon" && (
                <div style={styles.ribbonTab}>
                  <span style={styles.ribbonCheck}>&#10003;</span>
                  <span style={styles.ribbonText}>{project.badge.value}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footerBrand}>
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

  grid: {
    display: "grid",
    gridAutoRows: "1fr",
    padding: "0 clamp(1rem, 4vw, 20px)",
    width: "100%",
    boxSizing: "border-box",
    alignItems: "stretch",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "14px",
    height: "100%",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "clamp(10px, 2vw, 14px) clamp(14px, 3vw, 20px)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    backgroundColor: "#ffffff",
    height: "clamp(46px, 6vw, 52px)",
    boxSizing: "border-box",
    flex: "0 0 auto",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#ff5a3c",
    flex: "0 0 auto",
  },

  // ✅ BODY FONT: Figtree Medium
  title: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.82rem, 2vw, 0.9rem)",
    fontWeight: 500,
    color: "#171412",
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  // ✅ BODY FONT: Figtree Medium
  countBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "22px",
    height: "22px",
    padding: "0 6px",
    borderRadius: "6px",
    border: "1px solid rgba(0,0,0,0.15)",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 500,
    color: "#171412",
  },

  imageWrap: {
    position: "relative",
    width: "100%",
    flex: "1 1 auto",
    height: "clamp(260px, 62vw, 560px)",
    overflow: "hidden",
    backgroundColor: "#e8e8e8",
    cursor: "pointer",
    borderRadius: "0 0 14px 14px",
  },
  image: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transformOrigin: "center center",
    willChange: "transform",
  },

  // ✅ BODY FONT: Figtree Light
  plusIcon: {
    position: "absolute",
    left: "16px",
    zIndex: 2,
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "1.1rem",
    fontWeight: 300,
    color: "rgba(0,0,0,0.4)",
    lineHeight: 1,
  },

  ribbonTab: {
    position: "absolute",
    top: "20px",
    right: 0,
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "clamp(10px, 2vw, 14px) clamp(8px, 1.5vw, 10px)",
    backgroundColor: "#171412",
    color: "#ffffff",
  },
  ribbonCheck: {
    fontSize: "0.9rem",
    fontWeight: 700,
  },

  // ✅ BODY FONT: Figtree Medium
  ribbonText: {
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.72rem",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },

  footerBrand: {
    padding: "20px clamp(1rem, 6vw, 6vw) 0",
    textAlign: "right",
  },

  // ✅ BODY FONT: Figtree Regular
  brandName: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 400,
    color: "rgba(0,0,0,0.25)",
    letterSpacing: "0.02em",
  },
};