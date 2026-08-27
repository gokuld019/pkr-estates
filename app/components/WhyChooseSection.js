"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
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

const AMENITIES = [
  { index: "01", title: "Prime Locations", description: "Properties in well-connected, high-growth locations." },
  { index: "02", title: "Trusted Expertise", description: "Experience and insight you can rely on." },
  { index: "03", title: "Quality Developments", description: "Thoughtfully designed spaces built for lasting value." },
  { index: "04", title: "Complete Transparency", description: "Clear processes, honest guidance, and no surprises." },
  { index: "06", title: "Future Appreciation", description: "Properties selected for strong growth potential." },
  { index: "07", title: "Customer First", description: "Personalized support from enquiry to ownership." },
  { index: "08", title: "Premium Living", description: "Modern spaces designed for comfort and lifestyle." },
  { index: "09", title: "Lasting Trust", description: "Building relationships beyond the property purchase." },
];

const CHEVRON_CLIP =
  "polygon(0% 0%, 55% 0%, 100% 50%, 55% 100%, 0% 100%, 40% 50%)";

const MOBILE_QUERY = "(max-width: 599px)";

export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const wordRefs = useRef([]);
  const headingLineRef = useRef(null);

  const trackRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  /* mount flag — keeps SSR markup and first client render identical */
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const mql = window.matchMedia(MOBILE_QUERY);
    const apply = (e) => setIsMobileView(e.matches);
    apply(mql);
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, [mounted]);

  /* track which slide is active while the user swipes */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isMobileView) return;

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const slide = track.querySelector("[data-slide]");
        if (!slide) return;
        const step = slide.getBoundingClientRect().width + 16;
        const i = Math.round(track.scrollLeft / step);
        setActiveSlide(Math.max(0, Math.min(AMENITIES.length - 1, i)));
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobileView]);

  const goToSlide = useCallback((i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(AMENITIES.length - 1, i));
    const slide = track.querySelectorAll("[data-slide]")[clamped];
    if (!slide) return;
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
    setActiveSlide(clamped);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const els = [
          headingLineRef.current,
          ...wordRefs.current.filter(Boolean),
          ...sectionRef.current.querySelectorAll("[data-fade],[data-reveal]"),
        ].filter(Boolean);
        gsap.set(els, { clearProps: "all", opacity: 1, y: 0, yPercent: 0 });
      });

      mm.add(
        {
          isPhone: "(max-width: 599px)",
          isTablet: "(min-width: 600px) and (max-width: 1023px)",
          isLaptop: "(min-width: 1024px) and (max-width: 1599px)",
          isDesktop: "(min-width: 1600px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isPhone, reduce } = context.conditions;
          if (reduce) return;

          if (headingLineRef.current) {
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
          }

          const fades = sectionRef.current.querySelectorAll("[data-fade]");
          if (fades.length) {
            gsap.fromTo(
              fades,
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
          }

          const words = wordRefs.current.filter(Boolean);
          if (words.length) {
            gsap.fromTo(
              words,
              { yPercent: 115, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power3.out",
                stagger: isPhone ? 0.008 : 0.012,
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 72%",
                  once: true,
                },
              }
            );
          }

          if (imageRef.current && imageWrapRef.current) {
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

            gsap.to(imageRef.current, {
              yPercent: isPhone ? -4 : -8,
              ease: "none",
              scrollTrigger: {
                trigger: imageWrapRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          const gridEl = sectionRef.current.querySelector("[data-amenities-grid]");
          const cards = sectionRef.current.querySelectorAll("[data-reveal]");
          if (gridEl && cards.length) {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: isPhone ? 0 : 0.1,
                scrollTrigger: { trigger: gridEl, start: "top 85%", once: true },
              }
            );
          }
        }
      );
    }, sectionRef);

    const onOrient = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", onOrient);

    return () => {
      window.removeEventListener("orientationchange", onOrient);
      ctx.revert();
    };
  }, [mounted]);

  const showCarousel = mounted && isMobileView;

  return (
    <section ref={sectionRef} className="pkr-why">
      <span className="pkr-why__chevronDecor" aria-hidden="true" />

      <div className="pkr-why__inner">
        <div className="pkr-why__heroHeading">
          <h2 className="pkr-why__headingMask">
            <span ref={headingLineRef} className="pkr-why__headingLine">
              Why PKR
            </span>
          </h2>
        </div>

        <div className="pkr-why__header">
          <h2 className="pkr-why__heading">
            {HEADLINE_WORDS.map((word, i) => (
              <span key={i}>
                <span className="pkr-why__wordMaskWrap">
                  <span className="pkr-why__wordMask">
                    <span
                      ref={(el) => {
                        wordRefs.current[i] = el;
                      }}
                      className={
                        "pkr-why__word " +
                        (word.tone === "bold"
                          ? "pkr-why__word--bold"
                          : "pkr-why__word--muted")
                      }
                    >
                      {word.text}
                    </span>
                  </span>
                </span>{" "}
              </span>
            ))}
          </h2>
        </div>

        <div
          ref={trackRef}
          data-amenities-grid
          className="pkr-why__grid"
          aria-label="Why choose PKR"
        >
          {AMENITIES.map((item) => (
            <div key={item.index} data-reveal data-slide className="pkr-why__column">
              <div className="pkr-why__divider" />
              <span className="pkr-why__bigIndex">{item.index}</span>
              <h3 className="pkr-why__title">{item.title}</h3>
              <p className="pkr-why__description">{item.description}</p>
            </div>
          ))}
        </div>

        {/* wrapper always rendered — only its contents are conditional */}
        <div className="pkr-why__controls" aria-hidden={!showCarousel}>
          {showCarousel && (
            <>
              <div className="pkr-why__arrows">
                <button
                  type="button"
                  className="pkr-why__arrow"
                  onClick={() => goToSlide(activeSlide - 1)}
                  disabled={activeSlide === 0}
                  aria-label="Previous"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M15 5 L8 12 L15 19"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="pkr-why__arrow"
                  onClick={() => goToSlide(activeSlide + 1)}
                  disabled={activeSlide === AMENITIES.length - 1}
                  aria-label="Next"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M9 5 L16 12 L9 19"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="pkr-why__dots">
                {AMENITIES.map((item, i) => (
                  <button
                    key={item.index}
                    type="button"
                    className={
                      "pkr-why__dot " + (i === activeSlide ? "is-active" : "")
                    }
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to ${item.title}`}
                  />
                ))}
              </div>

              <span className="pkr-why__count">
                {String(activeSlide + 1).padStart(2, "0")} / {AMENITIES.length}
              </span>
            </>
          )}
        </div>

        <Link data-reveal href="/contact-us" className="pkr-why__cta">
          Contact Us &raquo;
        </Link>
      </div>

      <style jsx>{`
        .pkr-why {
          position: relative;
          background-color: #ffffff;
          padding: 0 clamp(16px, 6vw, 96px) clamp(56px, 9vw, 140px);
          overflow: hidden;
          box-sizing: border-box;

          --font: var(--font-figtree), "Figtree", "Segoe UI", sans-serif;
          --ink: #141312;
          --ink-muted: rgba(20, 19, 18, 0.55);
          --rule: rgba(20, 19, 18, 0.16);
          --chip: #f0eee9;
        }

        .pkr-why__inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1680px;
          margin: 0 auto;
        }

        .pkr-why__heroHeading {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(40px, 8vw, 96px) 0 clamp(10px, 2vw, 24px);
          width: 100%;
          box-sizing: border-box;
        }

        .pkr-why__headingMask {
          margin: 0 0 clamp(8px, 1.6vw, 20px);
          overflow: hidden;
          padding-bottom: 0.06em;
        }

        .pkr-why__headingLine {
          display: inline-block;
          font-family: var(--font);
          font-weight: 500;
          font-size: clamp(2.1rem, 7vw, 5.5rem);
          letter-spacing: -0.02em;
          color: var(--ink);
          line-height: 1.04;
          text-transform: uppercase;
        }

        .pkr-why__header {
          position: relative;
          z-index: 2;
          max-width: min(81ch, 1040px);
          margin: 0 auto clamp(28px, 5vw, 56px);
          text-align: center;
          padding: 0 4px;
          box-sizing: border-box;
        }

        .pkr-why__heading {
          margin: 0;
          font-family: var(--font);
          font-weight: 400;
          font-size: clamp(1.05rem, 1.1vw + 0.75rem, 2.4rem);
          line-height: 1.38;
          letter-spacing: -0.01em;
          color: var(--ink);

          /* Force exactly 3 lines */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .pkr-why__wordMaskWrap {
          display: inline-block;
        }
        .pkr-why__wordMask {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          padding-bottom: 0.08em;
        }
        .pkr-why__word {
          display: inline-block;
          will-change: transform, opacity;
        }
        .pkr-why__word--bold {
          color: #141313;
        }
        .pkr-why__word--muted {
          color: rgba(20, 19, 18, 0.36);
        }

        .pkr-why__chevronDecor {
          position: absolute;
          top: 6%;
          right: 8vw;
          width: clamp(96px, 20vw, 340px);
          height: clamp(96px, 20vw, 340px);
          background-color: var(--chip);
          clip-path: ${CHEVRON_CLIP};
          pointer-events: none;
          z-index: 0;
        }

        .pkr-why__grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: clamp(32px, 5vw, 64px);
          margin: clamp(28px, 6vw, 64px) 0 clamp(28px, 5vw, 56px);
        }

        .pkr-why__column {
          display: flex;
          flex-direction: column;
          min-width: 0;
          box-sizing: border-box;
        }

        .pkr-why__divider {
          width: 100%;
          height: 1px;
          background-color: var(--rule);
          margin-bottom: clamp(14px, 2vw, 20px);
        }

        .pkr-why__bigIndex {
          font-family: var(--font);
          font-weight: 500;
          font-size: clamp(2.6rem, 5.5vw, 6.5rem);
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--ink);
        }

        .pkr-why__title {
          margin: clamp(8px, 1.2vw, 12px) 0 8px;
          font-family: var(--font);
          font-weight: 500;
          font-size: clamp(1.05rem, 0.4vw + 0.95rem, 1.35rem);
          color: var(--ink);
        }

        .pkr-why__description {
          margin: 0;
          font-family: var(--font);
          font-weight: 400;
          font-size: clamp(0.88rem, 0.25vw + 0.82rem, 1.02rem);
          line-height: 1.6;
          color: var(--ink-muted);
          max-width: 34ch;
        }

        .pkr-why__cta {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          padding: 0.8em 1.5em;
          border-radius: 999px;
          background-color: var(--chip);
          color: var(--ink);
          font-family: var(--font);
          font-size: clamp(0.85rem, 0.2vw + 0.8rem, 0.95rem);
          font-weight: 500;
          text-decoration: none;
          margin-top: 8px;
          transition: background-color 0.25s ease, transform 0.25s ease;
        }
        .pkr-why__cta:hover {
          background-color: #e6e3dc;
          transform: translateY(-1px);
        }

        /* wrapper exists at all sizes but collapses above 600px */
        .pkr-why__controls {
          display: none;
        }

        /* ---- PHONES ---- */
        @media (max-width: 599px) {
          .pkr-why {
            padding: 0 16px 56px;
          }

          /* chevron pushed fully behind and clear of the text block */
          .pkr-why__chevronDecor {
            top: 0;
            right: 3vw;
            width: 108px;
            height: 108px;
            opacity: 0.55;
            z-index: 0;
          }

          .pkr-why__heroHeading {
            padding: 36px 0 10px;
          }
          .pkr-why__header {
            margin-bottom: 26px;
            /* keeps the headline off the chevron */
            padding-inline: 2px;
          }
          .pkr-why__heading {
            -webkit-line-clamp: unset;
            display: block;
            overflow: visible;
          }

          .pkr-why__grid {
            display: flex;
            grid-template-columns: none;
            gap: 16px;
            margin: 26px -16px 18px;
            padding: 0 16px;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scroll-padding-left: 16px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            overscroll-behavior-x: contain;
          }
          .pkr-why__grid::-webkit-scrollbar {
            display: none;
          }

          .pkr-why__column {
            flex: 0 0 calc(100% - 40px);
            max-width: calc(100% - 40px);
            scroll-snap-align: start;
            scroll-snap-stop: always;
            padding: 20px 20px 24px;
            border: 1px solid var(--rule);
            border-radius: 14px;
            background: #fff;
          }

          .pkr-why__divider {
            display: none;
          }
          .pkr-why__bigIndex {
            font-size: 3.4rem;
            color: rgba(20, 19, 18, 0.85);
          }
          .pkr-why__title {
            font-size: 1.12rem;
            margin-top: 6px;
          }
          .pkr-why__description {
            font-size: 0.92rem;
            max-width: none;
          }

          /* ---- CONTROLS: count on its own row ABOVE the arrows ---- */
          .pkr-why__controls {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-areas:
              "count count"
              "arrows dots";
            align-items: center;
            column-gap: 14px;
            row-gap: 12px;
            margin: 0 0 22px;
          }
          .pkr-why__controls:empty {
            display: none;
          }

          .pkr-why__count {
            grid-area: count;
            justify-self: start;
            font-family: var(--font);
            font-size: 0.8rem;
            font-weight: 500;
            font-variant-numeric: tabular-nums;
            letter-spacing: 0.04em;
            color: var(--ink-muted);
            white-space: nowrap;
            line-height: 1;
          }

          .pkr-why__arrows {
            grid-area: arrows;
            display: flex;
            gap: 8px;
          }
          .pkr-why__arrow {
            width: 44px;
            height: 44px;
            display: grid;
            place-items: center;
            border-radius: 999px;
            border: 1px solid var(--rule);
            background: #fff;
            color: var(--ink);
            cursor: pointer;
            padding: 0;
            transition: background-color 0.2s ease, opacity 0.2s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .pkr-why__arrow svg {
            width: 20px;
            height: 20px;
          }
          .pkr-why__arrow:active {
            background: var(--chip);
          }
          .pkr-why__arrow:disabled {
            opacity: 0.3;
            cursor: default;
          }

          .pkr-why__dots {
            grid-area: dots;
            display: flex;
            gap: 6px;
            justify-content: flex-end;
            flex-wrap: wrap;
          }
          .pkr-why__dot {
            width: 7px;
            height: 7px;
            padding: 0;
            border: none;
            border-radius: 999px;
            background: rgba(20, 19, 18, 0.2);
            cursor: pointer;
            transition: width 0.25s ease, background-color 0.25s ease;
          }
          .pkr-why__dot.is-active {
            width: 20px;
            background: var(--ink);
          }

          .pkr-why__cta {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 359px) {
          .pkr-why__headingLine {
            font-size: 1.95rem;
          }
          .pkr-why__heading {
            font-size: 1rem;
          }
          .pkr-why__column {
            flex-basis: calc(100% - 28px);
            max-width: calc(100% - 28px);
          }
          .pkr-why__bigIndex {
            font-size: 3rem;
          }
          .pkr-why__controls {
            column-gap: 10px;
          }
          .pkr-why__chevronDecor {
            width: 88px;
            height: 88px;
            right: -18vw;
          }
        }

        @media (min-width: 430px) and (max-width: 599px) {
          .pkr-why {
            padding-inline: 20px;
          }
          .pkr-why__grid {
            margin-inline: -20px;
            padding-inline: 20px;
            scroll-padding-left: 20px;
          }
          .pkr-why__column {
            flex-basis: calc(100% - 56px);
            max-width: calc(100% - 56px);
          }
        }

        @media (min-width: 600px) and (max-width: 1023px) {
          .pkr-why {
            padding: 0 5vw min(9vw, 90px);
          }
          .pkr-why__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(32px, 5vw, 52px);
          }
        }

        @media (min-width: 1024px) and (max-width: 1439px) {
          .pkr-why {
            padding: 0 6vw min(9vw, 100px);
          }
          .pkr-why__grid {
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(40px, 4vw, 56px);
          }
        }

        @media (min-width: 1440px) and (max-width: 1919px) {
          .pkr-why {
            padding: 0 6vw 110px;
          }
          .pkr-why__grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 56px;
          }
        }

        @media (min-width: 1920px) {
          .pkr-why {
            padding: 0 6vw 140px;
          }
          .pkr-why__grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 72px;
          }
          .pkr-why__headingLine {
            font-size: 5.5rem;
          }
          .pkr-why__heading {
            font-size: 2.3rem;
          }
        }

        @media (min-width: 2560px) {
          .pkr-why__inner {
            max-width: 1880px;
          }
          .pkr-why__grid {
            gap: 88px;
          }
        }

        @media (max-height: 520px) and (orientation: landscape) and (max-width: 899px) {
          .pkr-why__heroHeading {
            padding: 24px 0 8px;
          }
          .pkr-why__header {
            margin-bottom: 20px;
          }
          .pkr-why__grid {
            margin-top: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pkr-why__grid {
            scroll-behavior: auto;
          }
          .pkr-why__word {
            will-change: auto;
          }
          .pkr-why__cta,
          .pkr-why__dot,
          .pkr-why__arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}