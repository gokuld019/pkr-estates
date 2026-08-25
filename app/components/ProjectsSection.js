"use client";

import { useEffect, useRef } from "react";
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
      developmentSize: "5 Acres",
      bedrooms: "1BHK & 2BHK & 3BHK",
      totalUnits: "90 Apartments",
      completionLabel: "TIME LEFT FOR PROJECT COMPLETION",
      completionDate: "JAN 2029",
      countdown: { days: "891", hours: "4", minutes: "58", seconds: "4" },
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
      developmentSize: "3.2 Acres",
      bedrooms: "1BHK & 2BHK & 3 BHK",
      totalUnits: "120 Units",
      completionLabel: "TIME LEFT FOR PROJECT COMPLETION",
      completionDate: "JUN 2028",
      countdown: { days: "652", hours: "11", minutes: "22", seconds: "40" },
    },
  },
];

const CHEVRON_CLIP =
  "polygon(0% 0%, 55% 0%, 100% 50%, 55% 100%, 0% 100%, 40% 50%)";

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const headingLineRef = useRef(null);
  const stripRef = useRef(null);
  const dotRefs = useRef([]);

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

      // Travel exactly one viewport per extra card — no trailing gap.
      const getScrollLength = () =>
        Math.max(0, stripRef.current.scrollWidth - stripRef.current.offsetWidth);

      gsap.to(stripRef.current, {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={styles.section}>
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

      <div style={styles.stripWrap}>
        <div ref={stripRef} style={styles.strip}>
          {PROJECTS.map((project) => {
            const d = project.details;
            return (
              <div key={project.name} style={styles.card}>
                <div style={styles.cardImageWrap}>
                  <img src={project.image} alt={project.name} style={styles.cardImage} />
                  <div style={styles.imageGradient} />
                </div>

                <div style={styles.detailCard}>
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

                  <div style={styles.detailGrid}>
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

      <div style={styles.progressRow}>
        {PROJECTS.map((project, i) => (
          <span key={project.name} ref={(el) => (dotRefs.current[i] = el)} style={styles.progressDot} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    height: "100vh",
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
    width: "clamp(160px, 20vw, 300px)",
    height: "clamp(160px, 20vw, 300px)",
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
    padding: "min(0.5vw, 6px) 3vw min(0.5vw, 4px)",
    width: "100%",
    boxSizing: "border-box",
    flex: "0 0 auto",
  },
  headingMask: {
    margin: "0 0 12px",
    overflow: "hidden",
  },

  // ✅ HEADING FONT: Figtree Light
  headingLine: {
    display: "inline-block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "clamp(2.1rem, 7vw, 5.5rem)",
    letterSpacing: "-0.02em",
    color: "#141313",
    lineHeight: 1,
    textTransform: "uppercase",
  },
  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  // ✅ BODY FONT: Figtree Medium
  viewAllBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.7em 1.3em",
    borderRadius: "999px",
    backgroundColor: "#f0eee9",
    color: "#141313",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.85rem",
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
  },
  stripWrap: {
    position: "relative",
    flex: 1,
    minHeight: 0,
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    paddingBottom: "min(4vw, 40px)",
    boxSizing: "border-box",
  },
  strip: {
    display: "flex",
    flexWrap: "nowrap",
    height: "110%",
    width: "100%",
    willChange: "transform",
  },
  // Full-width cards — one viewport per card, nothing peeking, no trailing gap.
  card: {
    position: "relative",
    flex: "0 0 100%",
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(24px, 4vw, 64px)",
    padding: "0 6vw",
    boxSizing: "border-box",
  },
  cardImageWrap: {
    position: "relative",
    flex: "0 0 auto",
    width: "min(42vw, 620px)",
    height: "min(60vh, 620px)",
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
    flex: "0 1 440px",
    maxWidth: "440px",
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

  // ✅ BODY FONT: Figtree Medium (uppercase)
  projectTag: {
    display: "inline-block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.66rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#8a8a86",
    marginBottom: "10px",
  },

  // ✅ BODY FONT: Figtree Medium
  detailTitle: {
    margin: "0 0 4px",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "0.95rem",
    color: "#141313",
    letterSpacing: "-0.01em",
  },

  // ✅ BODY FONT: Figtree Regular
  detailAddress: {
    margin: 0,
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: "0.78rem",
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
    paddingBottom: "24px",
    borderBottom: "1px solid rgba(20,19,19,0.15)",
  },

  // ✅ BODY FONT: Figtree Regular
  priceLabel: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: "0.8rem",
    color: "#6b6b68",
  },

  // ✅ BODY FONT: Figtree Bold (800 not available, using 700)
  detailPrice: {
    margin: "6px 0 0",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
    color: "#141313",
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
  },

  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    rowGap: "18px",
    columnGap: "16px",
    margin: "24px 0",
    paddingBottom: "24px",
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

  // ✅ BODY FONT: Figtree Regular
  detailLabel: {
    display: "block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: "0.75rem",
    color: "#8a8a86",
    marginBottom: "2px",
  },

  // ✅ BODY FONT: Figtree Medium
  detailValue: {
    display: "block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "0.9rem",
    color: "#141313",
  },

  countdownWrap: {
    marginBottom: "24px",
  },

  // ✅ BODY FONT: Figtree Medium
  completionBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    color: "#8a8a86",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.68rem",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "0 0 12px",
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
    padding: "14px 4px",
  },

  // ✅ BODY FONT: Figtree Bold
  countdownValue: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 700,
    fontSize: "1.15rem",
    color: "#141313",
  },

  // ✅ BODY FONT: Figtree Medium
  countdownUnit: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "0.6rem",
    letterSpacing: "0.03em",
    color: "#8a8a86",
    marginTop: "3px",
    textTransform: "uppercase",
  },

  countdownDivider: {
    width: "1px",
    backgroundColor: "rgba(20,19,19,0.1)",
  },

  // ✅ BODY FONT: Figtree Medium
  knowMoreBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "#141313",
    textDecoration: "none",
    backgroundColor: "#f0eee9",
    borderRadius: "999px",
    padding: "10px 18px",
    transition: "background-color 0.2s ease",
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