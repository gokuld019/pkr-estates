"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CHEVRON_IMAGES = [
  "/hero-frames/frame_0012.webp",
  "/hero-frames/frame_0030.webp",
  "/hero-frames/frame_0052.webp",
  "/hero-frames/frame_0078.webp",
];

const CHEVRON_CLIP =
  "polygon(0% 0%, 55% 0%, 100% 50%, 55% 100%, 0% 100%, 40% 50%)";

const PARALLAX_SPEEDS = [-1, 0.6, -0.5, 1];

export default function ManifestoSection() {
  const sectionRef = useRef(null);
  const ribbonWrapRef = useRef(null);
  const chevronRefs = useRef([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Reduce/disable parallax + heavy scrub work on small screens
      // for smoother mobile scrolling, keep full effect on larger screens.
      mm.add(
        {
          isMobile: "(max-width: 599px)",
          isTablet: "(min-width: 600px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions;

          gsap.fromTo(
            sectionRef.current.querySelector("[data-heading]"),
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            chevronRefs.current.filter(Boolean),
            { opacity: 0, scale: 0.85, filter: "blur(6px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 68%",
                once: true,
              },
            }
          );

          // Parallax drift while section is in view — scaled down on
          // mobile/tablet to avoid jank and excessive vertical travel.
          const parallaxScale = isMobile ? 0.35 : isTablet ? 0.6 : 1;

          imageRefs.current.filter(Boolean).forEach((img, i) => {
            const speed = PARALLAX_SPEEDS[i % PARALLAX_SPEEDS.length];
            gsap.to(img, {
              yPercent: 18 * speed * parallaxScale,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          });

          gsap.fromTo(
            ribbonWrapRef.current,
            { x: 0, opacity: 1 },
            {
              x: isMobile ? "8vw" : "18vw",
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "center 80%",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );

          gsap.fromTo(
            sectionRef.current.querySelector("[data-closing]"),
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current.querySelector("[data-closing]"),
                start: "top 85%",
                once: true,
              },
            }
          );

          return () => {
            // matchMedia handles cleanup on context revert
          };
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={styles.section}>
      <h2 data-heading style={styles.heading}>
        <span style={styles.bold}>This isn&rsquo;t just</span>{" "}
        <span style={styles.muted}>about real estate.</span>
      </h2>

      <div ref={ribbonWrapRef} style={styles.ribbonWrap}>
        {CHEVRON_IMAGES.map((src, i) => (
          <div
            key={src}
            ref={(el) => (chevronRefs.current[i] = el)}
            style={{
              ...styles.chevron,
              marginLeft: i === 0 ? 0 : "var(--chevron-overlap)",
              zIndex: CHEVRON_IMAGES.length - i,
            }}
          >
            <img
              ref={(el) => (imageRefs.current[i] = el)}
              src={src}
              alt=""
              style={styles.chevronImage}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <p data-closing style={styles.closing}>
        <span style={styles.closingBold}>
          It&rsquo;s about belonging. Comfort. A place that&rsquo;s yours.
        </span>
        <br />
        <span style={styles.closingBold}>
          You&rsquo;re not just looking for an apartment.
        </span>{" "}
        <span style={styles.closingMuted}>
          You&rsquo;re looking for a home that fits. That&rsquo;s what we
          help you find.
        </span>
      </p>

      <style jsx>{`
        section {
          --chevron-overlap: clamp(-56px, -6vw, -30px);
        }

        /* Small phones */
        @media (max-width: 380px) {
          section {
            --chevron-overlap: -14px;
          }
        }

        /* Phones */
        @media (max-width: 599px) {
          section {
            padding: 56px 20px !important;
          }
        }

        /* Tablets */
        @media (min-width: 600px) and (max-width: 1023px) {
          section {
            padding: 72px 5vw !important;
          }
        }

        /* Laptops */
        @media (min-width: 1024px) and (max-width: 1439px) {
          section {
            padding: 90px 6vw !important;
          }
        }

        /* Desktops */
        @media (min-width: 1440px) and (max-width: 1919px) {
          section {
            padding: 110px 6vw !important;
          }
        }

        /* Big / ultra-wide screens */
        @media (min-width: 1920px) {
          section {
            padding: 130px 6vw !important;
          }
          h2 {
            font-size: clamp(3.2rem, 3.6vw, 4.2rem) !important;
          }
          p {
            font-size: 1.55rem !important;
            max-width: 860px !important;
          }
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    backgroundColor: "#fbfaf7",
    padding: "min(9vw, 110px) 6vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
  },

  // ✅ HEADING FONT: Figtree (Light/Regular)
  heading: {
    margin: "0 0 min(6vw, 72px)",
    maxWidth: "1100px",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 300,
    fontSize: "clamp(1.7rem, 4.4vw, 3.4rem)",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },

  bold: {
    color: "#171412",
    fontWeight: 400,
  },
  muted: {
    color: "rgba(23,20,18,0.38)",
    fontWeight: 300,
  },

  ribbonWrap: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1240px",
    marginBottom: "min(6vw, 72px)",
    willChange: "transform, opacity",
  },
  chevron: {
    position: "relative",
    flex: "1 1 0",
    minWidth: 0,
    maxWidth: "340px",
    height: "clamp(150px, 30vw, 440px)",
    clipPath: CHEVRON_CLIP,
    overflow: "hidden",
    willChange: "transform, opacity, filter",
  },
  chevronImage: {
    position: "absolute",
    top: "-20%",
    left: 0,
    width: "100%",
    height: "140%",
    objectFit: "cover",
    display: "block",
    pointerEvents: "none",
    willChange: "transform",
  },

  // ✅ BODY FONT: Figtree (Regular/Medium)
  closing: {
    margin: 0,
    maxWidth: "740px",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: "clamp(0.95rem, 1.9vw, 1.4rem)",
    lineHeight: 1.5,
    color: "#171412",
  },

  closingBold: {
    fontWeight: 500,
    color: "#171412",
  },

  closingMuted: {
    fontWeight: 400,
    color: "rgba(23,20,18,0.45)",
  },
};