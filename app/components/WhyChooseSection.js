"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HEADLINE_BOLD =
  "Your life's changing. Don't just find a home — find what's next.";
const HEADLINE_MUTED =
  "We help you move forward with clarity, confidence, and the right team by your side.";

const HEADLINE_WORDS = [
  ...HEADLINE_BOLD.split(" ").map((text) => ({ text, tone: "bold" })),
  ...HEADLINE_MUTED.split(" ").map((text) => ({ text, tone: "muted" })),
];

export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const wordRefs = useRef([]);
  const headingLineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 599px)",
          isTablet: "(min-width: 600px) and (max-width: 1023px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

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
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            wordRefs.current.filter(Boolean),
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              stagger: 0.012,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 72%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            imageRef.current,
            { scale: 1.12, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageWrapRef.current,
                start: "top 88%",
                once: true,
              },
            }
          );

          // Parallax travel reduced on mobile to avoid the image
          // drifting past its wrapper edges on short viewports.
          gsap.to(imageRef.current, {
            yPercent: isMobile ? -4 : -8,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.heroHeading}>
        <h2 style={styles.headingMask}>
          <span ref={headingLineRef} style={styles.headingLine}>
            Why PKR
          </span>
        </h2>
      </div>

      <div style={styles.header}>
        <h2 style={styles.heading}>
          {HEADLINE_WORDS.map((word, i) => (
            <span key={i}>
              <span style={styles.wordMaskWrap}>
                <span style={styles.wordMask}>
                  <span
                    ref={(el) => (wordRefs.current[i] = el)}
                    style={{
                      ...styles.word,
                      color:
                        word.tone === "bold"
                          ? "#141313"
                          : "rgba(20,19,18,0.36)",
                    }}
                  >
                    {word.text}
                  </span>
                </span>
              </span>{" "}
            </span>
          ))}
        </h2>
      </div>

      <div ref={imageWrapRef} data-fade style={styles.imageWrap}>
        <img
          ref={imageRef}
          src="/why.jpeg"
          alt="A PKR Estate neighborhood from above"
          style={styles.image}
          draggable={false}
        />
      </div>

      <style jsx>{`
        @media (max-width: 380px) {
          section {
            padding: 0 16px min(9vw, 70px) !important;
          }
        }
        @media (max-width: 599px) {
          section {
            padding: 0 20px min(9vw, 80px) !important;
          }
        }
        @media (min-width: 600px) and (max-width: 1023px) {
          section {
            padding: 0 5vw min(9vw, 90px) !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1439px) {
          section {
            padding: 0 6vw min(9vw, 100px) !important;
          }
        }
        @media (min-width: 1440px) and (max-width: 1919px) {
          section {
            padding: 0 6vw 110px !important;
          }
        }
        @media (min-width: 1920px) {
          section {
            padding: 0 6vw 140px !important;
          }
          h2 {
            font-size: revert;
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
    padding: "0 6vw min(9vw, 100px)",
    overflow: "hidden",
  },

  heroHeading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "min(8vw, 96px) 0 min(2vw, 24px)",
    width: "100%",
    boxSizing: "border-box",
  },
  headingMask: {
    margin: "0 0 20px",
    overflow: "hidden",
  },

  // ✅ HEADING FONT: Figtree (Light/Regular)
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

  header: {
    maxWidth: "1040px",
    margin: "0 auto min(5vw, 56px)",
    textAlign: "center",
    padding: "0 4px",
    boxSizing: "border-box",
  },

  // ✅ BODY FONT: Figtree (Regular)
  heading: {
    margin: 0,
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: "clamp(1.15rem, 2.8vw, 2.4rem)",
    lineHeight: 1.35,
    letterSpacing: "-0.01em",
    color: "#141313",
  },
  wordMaskWrap: {
    display: "inline-block",
  },
  wordMask: {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "top",
  },
  word: {
    display: "inline-block",
    willChange: "transform, opacity",
  },
  imageWrap: {
    position: "relative",
    width: "100%",
    height: "clamp(240px, 62vw, 720px)",
    overflow: "hidden",
    backgroundColor: "#e8e4da",
    borderRadius: "clamp(0px, 1vw, 4px)",
  },
  image: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "112%",
    objectFit: "cover",
    display: "block",
    willChange: "transform, opacity",
  },
};