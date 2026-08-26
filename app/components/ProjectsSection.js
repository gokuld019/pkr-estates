"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    name: "Gurudev",
    slug: "gurudev",
    location: "Perumathunallur",
    description:
      "Low-rise residences wrapped in mature landscaping, framed for a slow morning coffee and a quieter evening.",
    image: "/gurudev.jpeg",
    details: {
      title: "Gurudev",
      address:
        "PKR ESTATES Gurudev, Next to SHRIRAM SHANKARI, Perumathunallur, Chennai, Tamil Nadu 603202, India",
      price: " 22 Lacs Onwards*",
      projectType: "Apartments",
      developmentSize: "0.6 Acres",
      bedrooms: "1BHK & 2BHK",
      totalUnits: "90 Apartments",
      completionLabel: "TIME LEFT FOR PROJECT COMPLETION",
      completionDate: "DEC 2026",
      countdown: { days: "122", hours: "12", minutes: "58", seconds: "4" },
      amenities: [
        "Swimming Pool",
        "Club House",
        "Gymnasium",
        "Children's Play Area",
        "Landscaped Gardens",
        "24/7 Security",
        "Power Backup",
        "Rainwater Harvesting",
        "Parking Facilities",
        "Elevator Access",
      ],
      floorPlans: [
        { type: "2 BHK", area: "1200 sq.ft" },
        { type: "3 BHK", area: "1600 sq.ft" },
      ],
      possession: "Ready to Move",
    },
  },
  {
    name: "Privana",
    slug: "privana",
    location: "Guduvancheri",
    description:
      "A dusk-lit address facing the city skyline, built around wide balconies and uninterrupted views.",
    image: "/privanaa.jpeg",
    details: {
      title: "Privana",
      address: "Perumattunallur Village, Guduvancheri, Chennai South, Chennai",
      price: "20.01 Lacs Onwards*",
      projectType: "Apartments",
      developmentSize: "1.41 Acres",
      bedrooms: "Studio, 1BHK, 2BHK & 3 BHK",
      totalUnits: "186 Units",
      completionLabel: "TIME LEFT FOR PROJECT COMPLETION",
      completionDate: "JUN 2028",
      countdown: { days: "652", hours: "11", minutes: "22", seconds: "40" },
    },
  },
];

const CHEVRON_CLIP =
  "polygon(0% 0%, 55% 0%, 100% 50%, 55% 100%, 0% 100%, 40% 50%)";

// Tailwind-style breakpoints: mobile <640, tablet 640-1024, laptop 1024-1440, desktop 1440-1920, big 1920+
const BREAKPOINTS = {
  mobile: 639,
  tablet: 1023,
  laptop: 1439,
  desktop: 1919,
};

function useBreakpoint() {
  const [bp, setBp] = useState("desktop");

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w <= BREAKPOINTS.mobile) return "mobile";
      if (w <= BREAKPOINTS.tablet) return "tablet";
      if (w <= BREAKPOINTS.laptop) return "laptop";
      if (w <= BREAKPOINTS.desktop) return "desktop";
      return "big";
    };
    const onResize = () => setBp(calc());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return bp;
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const headingLineRef = useRef(null);
  const stripRef = useRef(null);
  const dotRefs = useRef([]);
  const bp = useBreakpoint();
  const isStacked = bp === "mobile" || bp === "tablet";

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
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      const mm = gsap.matchMedia();

      // Horizontal pinned scroll only on laptop+ where the card layout is
      // side-by-side. On mobile/tablet the section scrolls normally —
      // pinning a stacked, image-heavy card creates a huge unusable scroll
      // distance on small screens.
      mm.add("(min-width: 1024px)", () => {
        const getScrollLength = () =>
          Math.max(0, stripRef.current.scrollWidth - stripRef.current.offsetWidth);

        const st = gsap.to(stripRef.current, {
          x: () => -getScrollLength(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            start: "top top",
            end: () => `+=${getScrollLength()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const active = Math.round(self.progress * (PROJECTS.length - 1));
              dotRefs.current.forEach((el, i) => {
                if (!el) return;
                el.style.opacity = i === active ? "1" : "0.35";
                el.style.width = i === active ? "28px" : "8px";
              });
            },
          },
        });

        return () => st.scrollTrigger && st.scrollTrigger.kill();
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        ...styles.section,
        height: isStacked ? "auto" : "100vh",
        minHeight: isStacked ? "auto" : "100vh",
      }}
    >
      <span style={styles.chevronDecor} aria-hidden="true" />

      <div style={styles.heroHeading}>
        <h2 style={styles.headingMask}>
          <span ref={headingLineRef} style={styles.headingLine}>
            Ongoing Projects
          </span>
        </h2>
        <div data-fade style={styles.topBarRight}>
          <a href="#" style={styles.viewAllBtn}>
            View all
          </a>
          <span style={styles.iconBtn} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>

      <div
        style={{
          ...styles.stripWrap,
          flex: isStacked ? "0 0 auto" : 1,
          overflow: isStacked ? "visible" : "hidden",
        }}
      >
        <div
          ref={stripRef}
          style={{
            ...styles.strip,
            flexDirection: isStacked ? "column" : "row",
            height: isStacked ? "auto" : "110%",
          }}
        >
          {PROJECTS.map((project) => {
            const d = project.details;
            return (
              <div
                key={project.name}
                style={{
                  ...styles.card,
                  flexDirection: isStacked ? "column" : "row",
                  padding: isStacked ? "0 5vw" : "0 6vw",
                  gap: isStacked ? "24px" : "clamp(24px, 4vw, 64px)",
                  marginBottom: isStacked ? "48px" : 0,
                }}
              >
                <div
                  style={{
                    ...styles.cardImageWrap,
                    width: isStacked ? "100%" : "min(42vw, 620px)",
                    height: isStacked ? "min(70vw, 420px)" : "min(60vh, 620px)",
                  }}
                >
                  <img src={project.image} alt={project.name} style={styles.cardImage} />
                  <div style={styles.imageGradient} />
                </div>

                <div
                  style={{
                    ...styles.detailCard,
                    flex: isStacked ? "1 1 auto" : "0 1 440px",
                    maxWidth: isStacked ? "100%" : "440px",
                    width: "100%",
                  }}
                >
                  <div style={styles.detailTopRow}>
                    <div>
                      <span style={styles.projectTag}>{d.projectType}</span>
                      <h3 style={styles.detailTitle}>{d.title}</h3>
                      <p style={styles.detailAddress}>{d.address}</p>
                    </div>
                    <span style={styles.phoneBtn} aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <div style={styles.priceRow}>
                    <span style={styles.priceLabel}>Starting from</span>
                    <p style={styles.detailPrice}>₹{d.price}</p>
                  </div>

                  <div
                    style={{
                      ...styles.detailGrid,
                      gridTemplateColumns:
                        bp === "mobile" ? "1fr 1fr" : "1fr 1fr",
                    }}
                  >
                    <div style={styles.detailItem}>
                      <span style={styles.detailIcon} aria-hidden="true">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M4 21V6l7-3 7 3v15M4 21h16M9 21v-4h4v4M9 10h1M14 10h1M9 14h1M14 14h1"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <span style={styles.detailLabel}>Type</span>
                        <span style={styles.detailValue}>{d.projectType}</span>
                      </div>
                    </div>

                    <div style={styles.detailItem}>
                      <span style={styles.detailIcon} aria-hidden="true">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      </span>
                      <div>
                        <span style={styles.detailLabel}>Size</span>
                        <span style={styles.detailValue}>{d.developmentSize}</span>
                      </div>
                    </div>

                    <div style={styles.detailItem}>
                      <span style={styles.detailIcon} aria-hidden="true">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                          <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                      <div>
                        <span style={styles.detailLabel}>Bedrooms</span>
                        <span style={styles.detailValue}>{d.bedrooms}</span>
                      </div>
                    </div>

                    <div style={styles.detailItem}>
                      <span style={styles.detailIcon} aria-hidden="true">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M4 20V10l8-6 8 6v10M4 20h16M9 20v-6h6v6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <span style={styles.detailLabel}>Units</span>
                        <span style={styles.detailValue}>{d.totalUnits}</span>
                      </div>
                    </div>
                  </div>

                  <div style={styles.countdownWrap}>
                    <div style={styles.completionBanner}>
                      <span>{d.completionLabel}</span>
                      <strong>{d.completionDate}</strong>
                    </div>

                    <div style={styles.countdownRow}>
                      <div style={styles.countdownItem}>
                        <span style={styles.countdownValue}>{d.countdown.days}</span>
                        <span style={styles.countdownUnit}>Days</span>
                      </div>
                      <div style={styles.countdownDivider} />
                      <div style={styles.countdownItem}>
                        <span style={styles.countdownValue}>{d.countdown.hours}</span>
                        <span style={styles.countdownUnit}>Hrs</span>
                      </div>
                      <div style={styles.countdownDivider} />
                      <div style={styles.countdownItem}>
                        <span style={styles.countdownValue}>{d.countdown.minutes}</span>
                        <span style={styles.countdownUnit}>Min</span>
                      </div>
                      <div style={styles.countdownDivider} />
                      <div style={styles.countdownItem}>
                        <span style={styles.countdownValue}>{d.countdown.seconds}</span>
                        <span style={styles.countdownUnit}>Sec</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/projects/${project.slug}`} style={styles.knowMoreBtn}>
                    <span>Know More</span>
                    <span style={styles.knowMoreArrow} aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!isStacked && (
        <div style={styles.progressRow}>
          {PROJECTS.map((project, i) => (
            <span key={project.name} ref={(el) => (dotRefs.current[i] = el)} style={styles.progressDot} />
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  chevronDecor: {
    position: "absolute",
    top: "8%",
    right: 0,
    width: "clamp(120px, 20vw, 300px)",
    height: "clamp(120px, 20vw, 300px)",
    backgroundColor: "#eeece7",
    clipPath: CHEVRON_CLIP,
    pointerEvents: "none",
    zIndex: 0,
  },
  heroHeading: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "clamp(16px, 3vw, 24px) 5vw clamp(12px, 2vw, 16px)",
    width: "100%",
    boxSizing: "border-box",
    flex: "0 0 auto",
  },
  headingMask: {
    margin: "0 0 12px",
    overflow: "hidden",
  },
  headingLine: {
    display: "inline-block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "clamp(1.9rem, 7vw, 5.5rem)",
    letterSpacing: "-0.02em",
    color: "#141313",
    lineHeight: 1,
    textTransform: "uppercase",
  },
  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  viewAllBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.7em 1.3em",
    borderRadius: "999px",
    backgroundColor: "#f0eee9",
    color: "#141313",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.78rem, 1.6vw, 0.85rem)",
    fontWeight: 500,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  iconBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    backgroundColor: "#f0eee9",
    color: "#141313",
    flexShrink: 0,
  },
  stripWrap: {
    position: "relative",
    minHeight: 0,
    width: "100%",
    maxWidth: "100%",
    paddingBottom: "clamp(24px, 4vw, 40px)",
    boxSizing: "border-box",
  },
  strip: {
    display: "flex",
    flexWrap: "nowrap",
    width: "100%",
    willChange: "transform",
  },
  card: {
    position: "relative",
    flex: "0 0 100%",
    width: "100%",
    maxWidth: "1600px",
    margin: "0 auto",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  cardImageWrap: {
    position: "relative",
    flex: "0 0 auto",
    overflow: "hidden",
    backgroundColor: "#e8e4da",
    borderRadius: "4px",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  imageGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.28) 100%)",
    pointerEvents: "none",
  },
  detailCard: {
    position: "relative",
    minWidth: 0,
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    padding: 0,
    boxSizing: "border-box",
    color: "#141313",
  },
  detailTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "10px",
  },
  projectTag: {
    display: "inline-block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.62rem, 1.4vw, 0.66rem)",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#8a8a86",
    marginBottom: "10px",
  },
  detailTitle: {
    margin: "0 0 4px",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
    color: "#141313",
    letterSpacing: "-0.01em",
  },
  detailAddress: {
    margin: 0,
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: "clamp(0.75rem, 1.6vw, 0.8rem)",
    lineHeight: 1.5,
    color: "#8a8a86",
  },
  phoneBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#f0eee9",
    color: "#141313",
    flex: "0 0 auto",
  },
  priceRow: {
    display: "block",
    paddingBottom: "clamp(16px, 3vw, 24px)",
    borderBottom: "1px solid rgba(20,19,19,0.15)",
  },
  priceLabel: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: "clamp(0.75rem, 1.6vw, 0.8rem)",
    color: "#6b6b68",
  },
  detailPrice: {
    margin: "6px 0 0",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
    color: "#141313",
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    rowGap: "clamp(14px, 2.5vw, 18px)",
    columnGap: "16px",
    margin: "clamp(16px, 3vw, 24px) 0",
    paddingBottom: "clamp(16px, 3vw, 24px)",
    borderBottom: "1px solid rgba(20,19,19,0.15)",
  },
  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    minWidth: 0,
  },
  detailIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#141313",
    flex: "0 0 auto",
    marginTop: "2px",
  },
  detailLabel: {
    display: "block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: "clamp(0.7rem, 1.5vw, 0.75rem)",
    color: "#8a8a86",
    marginBottom: "2px",
  },
  detailValue: {
    display: "block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "clamp(0.82rem, 1.8vw, 0.9rem)",
    color: "#141313",
    wordBreak: "break-word",
  },
  countdownWrap: {
    marginBottom: "clamp(16px, 3vw, 24px)",
  },
  completionBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    color: "#8a8a86",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.62rem, 1.4vw, 0.68rem)",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "0 0 12px",
    flexWrap: "wrap",
  },
  countdownRow: {
    display: "flex",
    alignItems: "stretch",
    backgroundColor: "#f7f6f3",
    borderRadius: "10px",
  },
  countdownItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(10px, 2vw, 14px) 4px",
    minWidth: 0,
  },
  countdownValue: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(0.95rem, 2.4vw, 1.15rem)",
    color: "#141313",
  },
  countdownUnit: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "clamp(0.55rem, 1.3vw, 0.6rem)",
    letterSpacing: "0.03em",
    color: "#8a8a86",
    marginTop: "3px",
    textTransform: "uppercase",
  },
  countdownDivider: {
    width: "1px",
    backgroundColor: "rgba(20,19,19,0.1)",
  },
  knowMoreBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.76rem, 1.6vw, 0.8rem)",
    fontWeight: 500,
    color: "#141313",
    textDecoration: "none",
    backgroundColor: "#f0eee9",
    borderRadius: "999px",
    padding: "10px 18px",
    transition: "background-color 0.2s ease",
    width: "fit-content",
  },
  knowMoreArrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    color: "#141313",
  },
  progressRow: {
    position: "absolute",
    bottom: "24px",
    right: "6vw",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  progressDot: {
    display: "inline-block",
    height: "4px",
    width: "8px",
    borderRadius: "2px",
    backgroundColor: "#141313",
    opacity: 0.35,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
};