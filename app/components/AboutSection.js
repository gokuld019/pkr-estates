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

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingLineRef = useRef(null);
  const statementRef = useRef(null);
  const ribbonWrapRef = useRef(null);
  const chevronRefs = useRef([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ---------- reduced motion: no animation, everything visible ---------- */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            headingLineRef.current,
            statementRef.current,
            ...chevronRefs.current.filter(Boolean),
          ],
          { clearProps: "all", opacity: 1, y: 0, yPercent: 0, scale: 1 }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
          statementRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      });

      /* ---------- breakpoint-aware parallax ---------- */
      mm.add(
        {
          isPhone: "(max-width: 599px)",
          isTablet: "(min-width: 600px) and (max-width: 1023px)",
          isLaptop: "(min-width: 1024px) and (max-width: 1599px)",
          isDesktop: "(min-width: 1600px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isPhone, isTablet, isLaptop, reduce } = context.conditions;

          if (!reduce) {
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
          }

          const parallaxScale = reduce
            ? 0
            : isPhone
            ? 0.3
            : isTablet
            ? 0.55
            : isLaptop
            ? 0.85
            : 1;

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

          if (!reduce) {
            gsap.fromTo(
              ribbonWrapRef.current,
              { x: 0, opacity: 1 },
              {
                x: isPhone ? "6vw" : isTablet ? "12vw" : "18vw",
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
          }
        }
      );
    }, sectionRef);

    /* refresh on orientation change / mobile URL-bar resize */
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("orientationchange", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <style>{css}</style>

      <div className="about-grid-overlay" />

      <div className="about-inner">
        <div className="about-hero-heading">
          <h2 className="about-heading-mask">
            <span ref={headingLineRef} className="about-heading-line">
              About Us
            </span>
          </h2>
        </div>

        <p ref={statementRef} className="about-statement">
          PKR Estate is a builder-led studio shaping homes around light,
          material, and the small rituals of daily life. Every plan you see
          began as a decision made by hand, long before it became a blueprint.
          This isn&rsquo;t just about real estate — it&rsquo;s about belonging,
          comfort, a place that&rsquo;s yours. You&rsquo;re not just looking
          for an apartment. You&rsquo;re looking for a home that fits, and
          that&rsquo;s what we help you find.
        </p>

        <div className="about-card-stage">
          <div ref={ribbonWrapRef} className="about-ribbon-wrap">
            {CHEVRON_IMAGES.map((src, i) => (
              <div
                key={src}
                ref={(el) => (chevronRefs.current[i] = el)}
                className="about-chevron"
                style={{
                  marginLeft: i === 0 ? 0 : "var(--chevron-overlap)",
                  zIndex: CHEVRON_IMAGES.length - i,
                }}
              >
                <img
                  ref={(el) => (imageRefs.current[i] = el)}
                  src={src}
                  alt=""
                  className="about-chevron-image"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 599px) 30vw, (max-width: 1023px) 24vw, 320px"
                />
              </div>
            ))}
          </div>

          <div className="about-annotation">
            <svg
              viewBox="0 0 72 60"
              className="about-annotation-arrow"
              aria-hidden="true"
            >
              <path
                d="M62 8 C 42 8, 20 20, 12 45"
                stroke="#ff5a3c"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M4 37 L12 45 L19 35"
                stroke="#ff5a3c"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="about-annotation-text">Take a look inside!</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
/* =========================================================
   ABOUT — fluid across phone → tablet → laptop → desktop → 4K
   ========================================================= */

.about-section {
  position: relative;
  background-color: #f4f4f2;
  padding: 0 clamp(16px, 5vw, 96px) clamp(56px, 1vw, 200px);
  overflow: hidden;
  box-sizing: border-box;

  --font-heading: "Figtree", "Figtree Placeholder", sans-serif;
  --font-body: "Figtree", "Figtree Placeholder", sans-serif;

  /* chevron sizing tokens */
  --chevron-h: clamp(132px, 26vw, 420px);
  --chevron-max-w: clamp(120px, 22vw, 320px);
  --chevron-overlap: clamp(-52px, -5vw, -18px);

  --stage-min-h: clamp(240px, 40vw, 560px);
}

.about-section,
.about-section * {
  font-family: "Figtree", "Figtree Placeholder", sans-serif;
  box-sizing: border-box;
}

/* content wrapper — stops everything stretching on ultrawide */
.about-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
}

.about-grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(20,18,16,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20,18,16,0.06) 1px, transparent 1px);
  background-size: 50% 100%, 100% 1px;
  background-position: center top, center clamp(300px, 42vw, 560px);
  background-repeat: no-repeat;
  pointer-events: none;
}

/* ---------------- heading ---------------- */

.about-hero-heading {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(40px, 9vw, 70px) 0 clamp(18px, 4.5vw, 1px);
  width: 100%;
}

.about-heading-mask {
  margin: 0 0 clamp(8px, 1.6vw, 24px);
  overflow: hidden;
  padding-bottom: 0.08em;   /* stops descender clipping in the mask */
}

.about-heading-line {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 7.5vw, 7rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  color: #151414;
  line-height: 1.02;
  text-wrap: balance;
}

/* ---------------- statement ---------------- */

.about-statement {
  position: relative;
  z-index: 1;
  margin: 0 auto clamp(30px, 8vw, 104px);
  max-width: min(72ch, 1040px);
  text-align: center;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: clamp(1rem, 1.35vw + 0.6rem, 1.65rem);
  line-height: 1.55;
  letter-spacing: -0.01em;
  color: #151414;
  text-wrap: pretty;
}

/* ---------------- chevron stage ---------------- */

.about-card-stage {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(18px, 4vw, 56px);
  min-height: var(--stage-min-h);
}

.about-ribbon-wrap {
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  max-width: 1240px;
  will-change: transform, opacity;
}

.about-chevron {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  max-width: var(--chevron-max-w);
  height: var(--chevron-h);
  clip-path: ${CHEVRON_CLIP};
  overflow: hidden;
  will-change: transform, opacity, filter;
  background: #e6e4e0;   /* placeholder while images load */
}

.about-chevron-image {
  position: absolute;
  top: -20%;
  left: 0;
  width: 100%;
  height: 140%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  will-change: transform;
  user-select: none;
}

/* ---------------- annotation ---------------- */

.about-annotation {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.about-annotation-arrow {
  display: block;
  width: clamp(46px, 5vw, 84px);
  height: auto;
}

.about-annotation-text {
  margin-top: -4px;
  font-family: var(--font-script), "Caveat", cursive !important;
  font-weight: 600;
  font-size: clamp(1.05rem, 1.5vw, 1.75rem);
  color: #ff5a3c;
  white-space: nowrap;
}

/* =========================================================
   BREAKPOINTS
   ========================================================= */

/* --- very small phones (up to 359px) --- */
@media (max-width: 359px) {
  .about-section {
    --chevron-overlap: -12px;
    --chevron-h: 112px;
    --chevron-max-w: 86px;
  }
  .about-heading-line { font-size: 2rem; }
  .about-statement { font-size: 0.95rem; }
  .about-annotation-text { font-size: 1rem; }
}

/* --- phones (up to 599px) — tightened vertical rhythm --- */
@media (max-width: 599px) {
  .about-section {
    padding-inline: 16px;
    padding-bottom: 56px;

    /* let content set the height instead of forcing 240px */
    --stage-min-h: 0px;
    --chevron-h: clamp(120px, 34vw, 190px);
    --chevron-max-w: 112px;
    --chevron-overlap: -16px;
  }

  .about-hero-heading { padding: 40px 0 18px; }
  .about-heading-mask { margin-bottom: 8px; }

  .about-statement {
    margin-bottom: 30px;
    font-size: 1rem;
    line-height: 1.5;
  }

  .about-card-stage {
    min-height: 0;
    gap: 18px;
  }

  .about-annotation-arrow { width: 46px; }
  .about-annotation-text { margin-top: -2px; }

  .about-grid-overlay {
    background-image: linear-gradient(90deg, rgba(20,18,16,0.06) 1px, transparent 1px);
    background-size: 100% 1px;
    background-position: center 68%;
  }
}

/* --- tablets portrait (600–1023px) --- */
@media (min-width: 600px) and (max-width: 1023px) {
  .about-section {
    --chevron-h: clamp(200px, 28vw, 320px);
    --chevron-max-w: clamp(150px, 21vw, 240px);
    --stage-min-h: clamp(260px, 34vw, 400px);
  }
}

/* --- laptops (1024–1439px) --- */
@media (min-width: 1024px) and (max-width: 1439px) {
  .about-section {
    --chevron-h: clamp(280px, 26vw, 380px);
    --chevron-max-w: clamp(210px, 20vw, 290px);
  }
}

/* --- desktop (1440px+) --- */
@media (min-width: 1440px) {
  .about-section { --chevron-h: 400px; --chevron-max-w: 310px; }
}

/* --- large desktop / 4K (1920px+) --- */
@media (min-width: 1920px) {
  .about-section {
    
    --chevron-h: 440px;
    --chevron-max-w: 340px;
    --chevron-overlap: -56px;
  }
  .about-heading-line { font-size: 7rem; }
  .about-statement { font-size: 1.6rem; max-width: 1100px; }
}

@media (min-width: 2560px) {
  .about-inner { max-width: 1880px; }
  .about-heading-line { font-size: 7.5rem; }
}

/* --- landscape phones / short viewports --- */
@media (max-height: 520px) and (orientation: landscape) {
  .about-hero-heading { padding: 24px 0 12px; }
  .about-statement { margin-bottom: 24px; font-size: 0.95rem; }
  .about-card-stage { min-height: 0; gap: 16px; }
  .about-section {
    --chevron-h: 150px;
    --chevron-max-w: 150px;
    padding-bottom: 48px;
  }
}

/* --- touch devices: parallax overflow guard --- */
@media (hover: none) {
  .about-chevron-image { top: -12%; height: 124%; }
}

/* --- reduced motion --- */
@media (prefers-reduced-motion: reduce) {
  .about-chevron,
  .about-chevron-image,
  .about-ribbon-wrap { will-change: auto; }
}
`;