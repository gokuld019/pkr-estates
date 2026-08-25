"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AMENITIES = [
  {
    index: "01",
    title: "Safe & Secure Living",
    description: "Gated community environments designed for peace of mind.",
  },
  {
    index: "02",
    title: "Green Open Spaces",
    description: "Beautiful surroundings that encourage healthier lifestyles.",
  },
  {
    index: "03",
    title: "Utilities",
    description:
      "Quality roads, electricity, water connections, and planned development.",
  },
  {
    index: "04",
    title: "Swimming Pool",
    description: "Refreshing pool designed for relaxation and recreation.",
  },
  // {
  //   index: "05",
  //   title: "Club House",
  //   description: "Exclusive clubhouse for social gatherings and events.",
  // },
  {
    index: "06",
    title: "Gymnasium",
    description: "State-of-the-art fitness center with modern equipment.",
  },
  {
    index: "07",
    title: "Children's Play Area",
    description: "Safe and fun playground for children of all ages.",
  },
  {
    index: "08",
    title: "Landscaped Gardens",
    description: "Beautifully designed gardens for peaceful walks and relaxation.",
  },
  {
    index: "09",
    title: "24/7 Security",
    description: "Round-the-clock security with CCTV surveillance and guards.",
  },
];

const CHEVRON_CLIP =
  "polygon(0% 0%, 55% 0%, 100% 50%, 55% 100%, 0% 100%, 40% 50%)";

export default function AmenitiesSection() {
  const sectionRef = useRef(null);
  const headingLineRef = useRef(null);

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
        sectionRef.current.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={styles.section} className="pkr-amenities">
      <span style={styles.chevronDecor} aria-hidden="true" />

      <div style={styles.heroHeading} className="pkr-amenities__head">
        <h2 style={styles.headingMask}>
          <span ref={headingLineRef} style={styles.headingLine}>
            Amenities
          </span>
        </h2>
        <div data-reveal style={styles.topBarRight}>
          <Link href="/contact-us" style={styles.viewAllBtn}>
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

      <div style={styles.grid} className="pkr-amenities__grid">
        {AMENITIES.map((item) => (
          <div key={item.index} data-reveal style={styles.column}>
            <div style={styles.divider} />
            <span style={styles.bigIndex}>{item.index}</span>
            <h3 style={styles.title}>{item.title}</h3>
            <p style={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>

      <Link
        data-reveal
        href="/contact-us"
        style={styles.ctaBtn}
        className="pkr-amenities__cta"
      >
        Contact Us &raquo;
      </Link>

      <style jsx>{`
        .pkr-amenities {
          padding: 0 0 min(8vw, 96px);
        }

        /* --- Small phones (<=380px) --- */
        @media (max-width: 380px) {
          .pkr-amenities__head {
            padding: 40px 18px 32px !important;
          }
          .pkr-amenities__head :global(h2 span) {
            font-size: 2rem !important;
          }
          .pkr-amenities__grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            padding: 0 18px !important;
          }
          .pkr-amenities__cta {
            margin-left: 18px !important;
          }
        }

        /* --- Phones (<=599px) --- */
        @media (min-width: 381px) and (max-width: 599px) {
          .pkr-amenities__head {
            padding: 48px 20px 36px !important;
          }
          .pkr-amenities__grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 0 20px !important;
          }
          .pkr-amenities__cta {
            margin-left: 20px !important;
          }
        }

        /* Stack the header (heading + buttons) on all mobile widths */
        @media (max-width: 599px) {
          .pkr-amenities__head {
            flex-direction: column !important;
            align-items: center !important;
          }
          .pkr-amenities__head > div {
            margin-top: 18px !important;
          }
        }

        /* --- Tablets (600–1023px) --- */
        @media (min-width: 600px) and (max-width: 1023px) {
          .pkr-amenities__head {
            padding: 64px 5vw 44px !important;
          }
          .pkr-amenities__grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 5vw !important;
            padding: 0 5vw !important;
          }
          .pkr-amenities__cta {
            margin-left: 5vw !important;
          }
        }

        /* --- Laptops (1024–1439px) --- */
        @media (min-width: 1024px) and (max-width: 1439px) {
          .pkr-amenities__grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        /* --- Desktops (1440–1919px) --- */
        @media (min-width: 1440px) and (max-width: 1919px) {
          .pkr-amenities__grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 64px !important;
          }
        }

        /* --- Big / ultra-wide (>=1920px) --- */
        @media (min-width: 1920px) {
          .pkr-amenities__grid {
            max-width: 1600px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            gap: 80px !important;
          }
          .pkr-amenities__head :global(h2 span) {
            font-size: 6rem !important;
          }
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    backgroundColor: "#ffffff",
    padding: "0 0 min(8vw, 96px)",
    overflow: "hidden",
  },
  chevronDecor: {
    position: "absolute",
    top: "-6%",
    right: "4vw",
    width: "clamp(120px, 22vw, 340px)",
    height: "clamp(120px, 22vw, 340px)",
    backgroundColor: "#f0eee9",
    clipPath: CHEVRON_CLIP,
    pointerEvents: "none",
  },
  heroHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "min(8vw, 96px) 6vw min(5vw, 56px)",
    width: "100%",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 1,
    gap: "20px",
    flexWrap: "wrap",
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
    margin: 0,
    overflow: "hidden",
  },

  // ✅ HEADING FONT: Figtree Light
  headingLine: {
    display: "inline-block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "clamp(2.1rem, 7vw, 5.5rem)",
    letterSpacing: "-0.02em",
    color: "#141312",
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
    color: "#141312",
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
    color: "#141312",
    flexShrink: 0,
  },

  grid: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "min(6vw, 64px)",
    marginBottom: "min(5vw, 56px)",
    padding: "0 6vw",
  },

  column: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },

  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(20,19,18,0.16)",
    marginBottom: "20px",
  },

  // ✅ HEADING FONT: Figtree Light (for numbers)
  bigIndex: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "clamp(2.6rem, 8vw, 6.5rem)",
    lineHeight: 1,
    letterSpacing: "-0.03em",
    color: "#141312",
  },

  // ✅ BODY FONT: Figtree Medium
  title: {
    margin: "12px 0 8px",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "1.15rem",
    color: "#141312",
  },

  // ✅ BODY FONT: Figtree Regular
  description: {
    margin: 0,
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: "0.9rem",
    lineHeight: 1.6,
    color: "rgba(20,19,18,0.55)",
    maxWidth: "34ch",
  },

  // ✅ BODY FONT: Figtree Medium
  ctaBtn: {
    position: "relative",
    zIndex: 1,
    display: "inline-flex",
    alignItems: "center",
    padding: "0.75em 1.4em",
    borderRadius: "999px",
    backgroundColor: "#f0eee9",
    color: "#141312",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 500,
    textDecoration: "none",
    marginLeft: "6vw",
  },
};