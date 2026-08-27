"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TIMELINE_ITEMS = [
  {
    year: "2019",
    image: "/timeline/timeline-1.jpg",
    text: "PKR Estate was founded in Chennai to build homes shaped around light, material, and daily life — planned and delivered under one roof.",
  },
  {
    year: "2021",
    image: "/timeline/timeline-2.jpg",
    text: "Our first residential projects broke ground, bringing thoughtful layouts and lasting materials to growing neighborhoods.",
  },
  {
    year: "2023",
    image: "/timeline/timeline-3.jpg",
    text: "Expanded into full-service delivery — design, construction, and after-sale support handled entirely in-house.",
  },
  {
    year: "2025",
    image: "/timeline/timeline-4.jpg",
    text: "Today we continue building homes across Chennai with a focus on craft, transparency, and long-term trust.",
  },
];

const STATS = [
  { value: "86+", label: "PROJECTS SHIPPED", code: "//001" },
  { value: "80%", label: "REPEAT COLLABORATIONS", code: "//002" },
  { value: "32", label: "INDUSTRY AWARDS", code: "//003" },
  { value: "89%", label: "CLIENT RETENTION RATE", code: "// 004" },
];

export default function AboutUsPage() {
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const heroRef = useRef(null);

  const timelineSectionRef = useRef(null);
  const timelineHeadingRef = useRef(null);
  const timelineTrackRef = useRef(null);
  const timelineWrapperRef = useRef(null);

  const statsSectionRef = useRef(null);
  const statsHeadingRef = useRef(null);
  const statsSubtitleRef = useRef(null);
  const statNumberRefs = useRef([]);
  const statBarRefs = useRef([]);

  const ctaSectionRef = useRef(null);
  const ctaYearsRef = useRef(null);
  const ctaStatRefs = useRef([]);
  const ctaHeadingRef = useRef(null);
  const ctaPersonRef = useRef(null);
  const ctaQuoteRef = useRef(null);
  const ctaButtonRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(
        heroRef.current,
        { opacity: 0, scale: 1.04 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        timelineHeadingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      const mm = gsap.matchMedia();

      // Pin-scrub horizontal timeline only on larger screens.
      // On mobile/tablet the track becomes a native horizontal-scroll strip instead.
      mm.add("(min-width: 1024px)", () => {
        const track = timelineTrackRef.current;
        const wrapper = timelineWrapperRef.current;

        const getScrollDistance = () => {
          const distance = track.scrollWidth - wrapper.offsetWidth;
          return distance > 0 ? distance : 0;
        };

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            start: "top top",
            end: () => `+=${getScrollDistance() || 1}`,
            scrub: 0.6,
            pin: true,
            pinType: "fixed",
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.kill();
        };
      });

      const images = Array.from(
        timelineSectionRef.current.querySelectorAll("img")
      );
      let loadedCount = 0;
      const handleImageLoad = () => {
        loadedCount += 1;
        if (loadedCount === images.length) {
          ScrollTrigger.refresh();
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          handleImageLoad();
        } else {
          img.addEventListener("load", handleImageLoad);
          img.addEventListener("error", handleImageLoad);
        }
      });

      window.addEventListener("load", () => ScrollTrigger.refresh());

      return () => {
        images.forEach((img) => {
          img.removeEventListener("load", handleImageLoad);
          img.removeEventListener("error", handleImageLoad);
        });
      };
    }, timelineSectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsHeadingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        statsSubtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        statNumberRefs.current.filter(Boolean),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: "top 55%",
            once: true,
          },
        }
      );

      statBarRefs.current.filter(Boolean).forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            delay: i * 0.12,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: statsSectionRef.current,
              start: "top 55%",
              once: true,
            },
          }
        );
      });
    }, statsSectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaYearsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ctaStatRefs.current.filter(Boolean),
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 60%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ctaHeadingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ctaPersonRef.current,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaPersonRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ctaQuoteRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaPersonRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ctaButtonRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaPersonRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ctaSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="aboutus-page">
      <style>{css}</style>

      {/* ---- Section 1: Heading ---- */}
      <section className="aboutus-heading-section">
        <h1 className="aboutus-heading-mask">
          <span ref={headingRef} className="aboutus-heading-line">
            ABOUT US
          </span>
        </h1>
        <p ref={subtitleRef} className="aboutus-subtitle">
          A RESIDENCE BUILT ON QUIET DETAIL AND LASTING MATERIAL.
        </p>
      </section>

      {/* ---- Section 2: Hero Image ---- */}
      <section className="aboutus-hero-section">
        <div ref={heroRef} className="aboutus-hero-wrap">
          <img
            src="/aboutbanner2.jpeg"
            alt="Our team on site"
            className="aboutus-hero-image"
            draggable={false}
          />
        </div>
      </section>

      {/* ---- Section 3: Our Timeline ---- */}
      <section ref={timelineSectionRef} className="timeline-section">
        <div className="timeline-heading-wrap">
          <h2 ref={timelineHeadingRef} className="timeline-heading">
            Our Timeline
          </h2>
          <span className="timeline-heading-rule" aria-hidden="true" />
        </div>

        <div ref={timelineWrapperRef} className="timeline-wrapper">
          <div ref={timelineTrackRef} className="timeline-track">
            {TIMELINE_ITEMS.map((item) => (
              <div key={item.year} className="timeline-item">
                <div className="timeline-image-wrap">
                  <img
                    src={item.image}
                    alt={item.year}
                    className="timeline-image"
                    draggable={false}
                  />
                </div>
                <span className="timeline-year">{item.year}</span>
                <p className="timeline-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Section 4: Stats / Performance ---- */}
      <section ref={statsSectionRef} className="stats-section">
        <div className="stats-topbar">
          <span className="stats-topbar-dash" />
          <span className="stats-topbar-line">
            <span className="stats-topbar-line-fill" />
          </span>
          <span className="stats-brand">pkr</span>
        </div>

        <div className="stats-content">
          <span className="stats-eyebrow">PERFORMANCE</span>

          <h2 ref={statsHeadingRef} className="stats-heading">
            The proof behind
            <br />
            our work
          </h2>

          <p ref={statsSubtitleRef} className="stats-subtitle">
            <span className="stats-subtitle-dash" />
            From first plots to lasting homes, we&rsquo;re trusted to
            deliver on time and at quality.
          </p>

          <div className="stats-tick-row" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="stats-tick" />
            ))}
          </div>

          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="stats-item">
                <span
                  ref={(el) => (statNumberRefs.current[i] = el)}
                  className="stats-number"
                >
                  {stat.value}
                </span>
                <span className="stats-label">{stat.label}</span>
                <div className="stats-bar-row">
                  <span className="stats-bar-track">
                    <span
                      ref={(el) => (statBarRefs.current[i] = el)}
                      className="stats-bar-fill"
                    />
                  </span>
                  <span className="stats-code">{stat.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Section 5: CTA / Let us inspire ---- */}
      <section ref={ctaSectionRef} className="cta-section">
        <div className="cta-bg-decor" aria-hidden="true" />

        <div className="cta-grid">
          <div className="cta-left">
            <span className="cta-left-rule" />
            <h3 ref={ctaYearsRef} className="cta-years">
              9 years
            </h3>
            <p className="cta-left-copy">
              Building lasting partnerships, delivering homes, and
              shipping work that stands out.
            </p>

            <ul className="cta-stat-list">
              <li
                ref={(el) => (ctaStatRefs.current[0] = el)}
                className="cta-stat"
              >
                <span className="cta-stat-icon">+</span>
                120+ projects delivered
              </li>
              <li
                ref={(el) => (ctaStatRefs.current[1] = el)}
                className="cta-stat"
              >
                <span className="cta-stat-icon">+</span>
                99% on-time launches
              </li>
              <li
                ref={(el) => (ctaStatRefs.current[2] = el)}
                className="cta-stat"
              >
                <span className="cta-stat-icon">+</span>
                84% average boost in engagement
              </li>
            </ul>

            <span className="cta-left-rule" />

            <span className="cta-year-range">2016 &mdash; 2025</span>
          </div>

          <div className="cta-right">
            <h2 ref={ctaHeadingRef} className="cta-heading">
              Let us <span className="cta-heading-accent">inspire</span>
              <br />
              your next
              <br />
              project
            </h2>

            <div className="cta-person-row">
              <div ref={ctaPersonRef} className="cta-person-photo">
                <img
                  src="/team/ceo.jpg"
                  alt="Team lead portrait"
                  draggable={false}
                />
              </div>

              <div ref={ctaQuoteRef} className="cta-person-quote">
                <p className="cta-quote-text">
                  &ldquo;We listen first, stay transparent, and deliver
                  what we promise. Every home matters to us.&rdquo;
                </p>
                <span className="cta-quote-name">Prasanna Kumar</span>
                <span className="cta-quote-role">
                  Founder, PKR Estate
                </span>
              </div>
            </div>

            <a
              ref={ctaButtonRef}
              href="/contact-us"
              className="cta-button"
            >
              BOOK AN INTRO CALL
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

const css = `
.aboutus-page {
  --font-heading: "Figtree", "Figtree Placeholder", sans-serif;
  --font-body: "Figtree", "Figtree Placeholder", sans-serif;
  --pkr-blue: #1c4fa0;
  --pkr-green: #1c4fa0;
  background-color: #ffffff;
  overflow-x: hidden;
  width: 100%;
}

.aboutus-page,
.aboutus-page * {
  font-family: "Figtree", "Figtree Placeholder", sans-serif;
  box-sizing: border-box;
}

.aboutus-heading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(56px, 10vw, 120px) 6vw clamp(28px, 6vw, 64px);
}

.aboutus-heading-mask {
  margin: 0 0 20px;
  overflow: hidden;
}

.aboutus-heading-line {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 9vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #141313;
  line-height: 1;
  text-transform: uppercase;
}

.aboutus-subtitle {
  margin: 0;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: clamp(0.65rem, 1.1vw, 0.95rem);
  letter-spacing: 0.08em;
  color: rgba(20,19,18,0.55);
  text-transform: uppercase;
}

.aboutus-hero-section {
  padding: 0 6vw clamp(48px, 10vw, 140px);
}

.aboutus-hero-wrap {
  position: relative;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  overflow: hidden;
  aspect-ratio: 16 / 8.4;
  border-radius: 0;
}

.aboutus-hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.timeline-section {
  position: relative;
  background-color: #ffffff;
  padding: clamp(40px, 8vw, 96px) 0 clamp(40px, 8vw, 96px);
}

.timeline-heading-wrap {
  padding: 0 6vw;
  margin-bottom: clamp(28px, 6vw, 72px);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.timeline-heading {
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: clamp(1.9rem, 6vw, 4.2rem);
  letter-spacing: -0.03em;
  color: #141313;
  line-height: 1;
}

.timeline-heading-rule {
  width: 48px;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--pkr-blue), var(--pkr-green));
}

.timeline-wrapper {
  width: 100%;
  overflow: hidden;
}

.timeline-track {
  display: flex;
  align-items: flex-start;
  gap: clamp(28px, 6vw, 96px);
  padding: 0 6vw;
  width: max-content;
  will-change: transform;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  width: clamp(240px, 26vw, 420px);
  flex-shrink: 0;
}

.timeline-image-wrap {
  position: relative;
  width: 100%;
  height: clamp(240px, 34vw, 520px);
  overflow: hidden;
  background-color: #ececec;
  margin-bottom: clamp(16px, 2.4vw, 32px);
}

.timeline-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.timeline-year {
  display: block;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--pkr-blue);
  margin-bottom: 10px;
}

.timeline-text {
  margin: 0;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.92rem;
  line-height: 1.55;
  color: rgba(20,19,18,0.6);
  max-width: 34ch;
}

.stats-section {
  position: relative;
  background-color: #ffffff;
  background-image: none;
  overflow: hidden;
  padding: clamp(40px, 6vw, 72px) 6vw clamp(56px, 8vw, 110px);
}

.stats-topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: clamp(36px, 8vw, 88px);
  position: relative;
  z-index: 2;
}

.stats-topbar-dash {
  width: 24px;
  height: 2px;
  background-color: rgba(0,0,0,0.2);
  flex-shrink: 0;
}

.stats-topbar-line {
  flex: 1;
  height: 1px;
  background-color: rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

.stats-topbar-line-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background-color: var(--pkr-green);
}

.stats-brand {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--pkr-green);
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.stats-content {
  position: relative;
  z-index: 2;
}

.stats-eyebrow {
  display: block;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: rgba(0,0,0,0.45);
  margin-bottom: clamp(14px, 2.4vw, 24px);
}

.stats-heading {
  margin: 0 0 clamp(20px, 3.6vw, 40px);
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: clamp(2rem, 6vw, 4.4rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: rgba(0,0,0,0.72);
  max-width: 780px;
}

.stats-subtitle {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin: 0 0 clamp(40px, 7vw, 96px);
  max-width: 560px;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: clamp(0.88rem, 1.3vw, 1.1rem);
  line-height: 1.55;
  color: rgba(0,0,0,0.55);
}

.stats-subtitle-dash {
  flex-shrink: 0;
  width: 22px;
  height: 1px;
  background-color: rgba(0,0,0,0.45);
  margin-top: 12px;
}

.stats-tick-row {
  display: flex;
  gap: 8px;
  margin-bottom: clamp(36px, 7vw, 88px);
  overflow: hidden;
}

.stats-tick {
  width: 1px;
  height: 20px;
  background-color: rgba(0,0,0,0.18);
  flex-shrink: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(24px, 4vw, 48px);
}

.stats-item {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stats-number {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2.1rem, 6vw, 4.2rem);
  letter-spacing: -0.02em;
  color: var(--pkr-green);
  line-height: 1;
  margin-bottom: clamp(16px, 2.6vw, 32px);
}

.stats-label {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: rgba(0,0,0,0.85);
  text-transform: uppercase;
  margin-bottom: 14px;
}

.stats-bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stats-bar-track {
  position: relative;
  flex: 1;
  height: 3px;
  background-color: rgba(0,0,0,0.15);
  overflow: hidden;
}

.stats-bar-fill {
  position: absolute;
  inset: 0;
  background-color: var(--pkr-blue);
  transform: scaleX(0);
}

.stats-code {
  flex-shrink: 0;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.68rem;
  letter-spacing: 0.02em;
  color: rgba(0,0,0,0.35);
  white-space: nowrap;
}

.cta-section {
  position: relative;
  background-color: #ebebe9;
  overflow: hidden;
  padding: clamp(40px, 8vw, 96px) 6vw;
}

.cta-bg-decor {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 220px at 80% 15%, rgba(28,79,160,0.08), transparent 70%),
    radial-gradient(circle 260px at 55% 65%, rgba(20,164,104,0.06), transparent 70%),
    radial-gradient(circle 160px at 20% 80%, rgba(255,255,255,0.6), transparent 70%);
  opacity: 0.9;
  pointer-events: none;
}

.cta-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(32px, 6vw, 96px);
  max-width: 1600px;
  margin: 0 auto;
}

.cta-left {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cta-left-rule {
  width: 100%;
  height: 1px;
  background-color: rgba(20,19,18,0.15);
}

.cta-years {
  margin: clamp(16px, 2.6vw, 28px) 0 clamp(12px, 1.8vw, 18px);
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: clamp(1.6rem, 2.6vw, 2.4rem);
  color: var(--pkr-blue);
  letter-spacing: -0.01em;
}

.cta-left-copy {
  margin: 0 0 clamp(32px, 5vw, 64px);
  max-width: 320px;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.92rem;
  line-height: 1.55;
  color: rgba(20,19,18,0.6);
}

.cta-stat-list {
  list-style: none;
  margin: 0 0 clamp(32px, 5vw, 64px);
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cta-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.92rem;
  color: #29282a;
}

.cta-stat-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  background-color: var(--pkr-green);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 3px;
}

.cta-year-range {
  margin-top: auto;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(2.1rem, 6vw, 4.6rem);
  letter-spacing: -0.03em;
  color: rgba(20,19,18,0.12);
  padding-top: clamp(16px, 2.6vw, 28px);
  white-space: nowrap;
}

.cta-right {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cta-heading {
  margin: 0 0 clamp(32px, 6vw, 72px);
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: clamp(2rem, 5.6vw, 4.6rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #4a4846;
}

.cta-heading-accent {
  color: var(--pkr-blue);
  font-weight: 600;
}

.cta-person-row {
  display: flex;
  align-items: center;
  gap: clamp(18px, 2.6vw, 32px);
  margin-bottom: clamp(24px, 3.6vw, 40px);
  flex-wrap: wrap;
}

.cta-person-photo {
  width: clamp(120px, 12vw, 190px);
  height: clamp(150px, 15vw, 230px);
  flex-shrink: 0;
  overflow: hidden;
  background-color: #d8d6d2;
  border-radius: 8px;
}

.cta-person-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cta-person-quote {
  display: flex;
  flex-direction: column;
  max-width: 360px;
  min-width: 0;
}

.cta-quote-text {
  margin: 0 0 12px;
  font-family: var(--font-body);
  font-style: italic;
  font-weight: 400;
  font-size: 0.98rem;
  line-height: 1.55;
  color: #3f3d3b;
}

.cta-quote-name {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  color: #29282a;
}

.cta-quote-role {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.82rem;
  color: rgba(20,19,18,0.5);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-self: flex-start;
  padding: 0.9em 1.6em;
  background-color: var(--pkr-blue);
  color: #ffffff;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  border-radius: 999px;
  transition: background-color 0.25s ease;
  white-space: nowrap;
}

.cta-button:hover,
.cta-button:focus-visible {
  background-color: var(--pkr-green);
}

/* ============ Very small phones (<= 380px) ============ */
@media (max-width: 380px) {
  .aboutus-heading-section {
    padding: 40px 20px 20px;
  }
  .aboutus-heading-line {
    font-size: 2rem;
  }
  .aboutus-subtitle {
    font-size: 0.62rem;
    letter-spacing: 0.06em;
  }
  .aboutus-hero-section {
    padding: 0 16px 40px;
  }
  .aboutus-hero-wrap {
    aspect-ratio: auto;
    min-height: 200px;
    border-radius: 14px;
  }
  .timeline-heading-wrap {
    padding: 0 16px;
    margin-bottom: 22px;
  }
  .timeline-heading {
    font-size: 1.7rem;
  }
  .timeline-track {
    gap: 18px;
    padding: 0 16px;
  }
  .timeline-item {
    width: 84vw;
  }
  .timeline-image-wrap {
    height: 58vw;
    margin-bottom: 12px;
    border-radius: 12px;
  }
  .timeline-text {
    font-size: 0.85rem;
  }
  .stats-section {
    padding: 32px 16px 44px;
  }
  .stats-heading {
    font-size: 1.7rem;
  }
  .stats-subtitle {
    font-size: 0.82rem;
    margin-bottom: 28px;
  }
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 26px;
  }
  .stats-number {
    font-size: 2.4rem;
    margin-bottom: 10px;
  }
  .cta-section {
    padding: 32px 16px;
  }
  .cta-heading {
    font-size: 1.9rem;
    margin-bottom: 24px;
  }
  .cta-person-photo {
    width: 100px;
    height: 130px;
  }
  .cta-button {
    width: 100%;
  }
}

/* ============ Mobile (<= 599px) ============ */
@media (max-width: 599px) {
  .aboutus-heading-section {
    padding: 48px 20px 22px;
    gap: 14px;
    margin-top: 60px;
  }

  .aboutus-heading-line {
    font-size: clamp(2.1rem, 11vw, 2.8rem);
  }

  .aboutus-subtitle {
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    line-height: 1.5;
  }

  .aboutus-hero-section {
    padding: 0 16px 48px;
  }

  .aboutus-hero-wrap {
    aspect-ratio: 4 / 3.2;
    border-radius: 16px;
  }

  .timeline-section {
    padding: 36px 0;
  }

  .timeline-heading-wrap {
    padding: 0 20px;
    margin-bottom: 24px;
  }

  .timeline-heading {
    font-size: clamp(1.7rem, 8vw, 2.2rem);
  }

  .timeline-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .timeline-wrapper::-webkit-scrollbar {
    display: none;
  }

  .timeline-track {
    gap: 20px;
    padding: 0 20px;
  }

  .timeline-item {
    width: 80vw;
    scroll-snap-align: start;
  }

  .timeline-wrapper {
    scroll-snap-type: x mandatory;
  }

  .timeline-image-wrap {
    height: 60vw;
    margin-bottom: 14px;
    border-radius: 14px;
  }

  .timeline-year {
    font-size: 1rem;
  }

  .timeline-text {
    font-size: 0.9rem;
    max-width: none;
  }

  .stats-section {
    padding: 36px 20px 56px;
  }

  .stats-topbar {
    margin-bottom: 32px;
  }

  .stats-topbar-dash {
    display: none;
  }

  .stats-eyebrow {
    font-size: 0.66rem;
  }

  .stats-heading {
    font-size: clamp(1.8rem, 8vw, 2.4rem);
    margin-bottom: 18px;
  }

  .stats-subtitle {
    font-size: 0.86rem;
    margin-bottom: 36px;
  }

  .stats-tick-row {
    margin-bottom: 30px;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 28px 18px;
  }

  .stats-number {
    font-size: clamp(1.9rem, 8vw, 2.6rem);
    margin-bottom: 12px;
  }

  .stats-label {
    font-size: 0.68rem;
  }

  .stats-code {
    font-size: 0.6rem;
  }

  .cta-section {
    padding: 40px 20px;
  }

  .cta-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .cta-years {
    font-size: 1.5rem;
    margin: 14px 0 10px;
  }

  .cta-left-copy {
    max-width: none;
    margin-bottom: 28px;
  }

  .cta-stat-list {
    margin-bottom: 28px;
  }

  .cta-stat {
    font-size: 0.88rem;
  }

  .cta-year-range {
    margin-top: 20px;
    font-size: clamp(2rem, 12vw, 2.8rem);
  }

  .cta-heading {
    font-size: clamp(1.9rem, 9vw, 2.6rem);
    margin-bottom: 28px;
  }

  .cta-person-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    margin-bottom: 28px;
  }

  .cta-person-photo {
    width: 130px;
    height: 160px;
  }

  .cta-person-quote {
    max-width: none;
  }

  .cta-button {
    width: 100%;
  }
}

/* ============ Tablet (600px - 1023px) ============ */
@media (min-width: 600px) and (max-width: 1023px) {
  .aboutus-heading-section {
    padding: 64px 5vw 32px;
  }

  .aboutus-hero-section {
    padding: 0 5vw 72px;
  }

  .aboutus-hero-wrap {
    aspect-ratio: 16 / 10;
    border-radius: 18px;
  }

  .timeline-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .timeline-wrapper::-webkit-scrollbar {
    display: none;
  }

  .timeline-track {
    gap: 28px;
    padding: 0 5vw;
  }

  .timeline-item {
    width: 46vw;
    scroll-snap-align: start;
  }

  .timeline-wrapper {
    scroll-snap-type: x mandatory;
  }

  .timeline-image-wrap {
    height: 36vw;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 28px;
  }

  .cta-grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }

  .cta-year-range {
    margin-top: 32px;
  }

  .cta-person-row {
    flex-wrap: nowrap;
  }

  .cta-button {
    width: auto;
  }
}

/* ============ Small laptop (1024px - 1279px) ============ */
@media (min-width: 1024px) and (max-width: 1279px) {
  .stats-grid {
    gap: 28px;
  }
  .cta-grid {
    gap: 48px;
  }
}

/* ============ Large desktop (>= 1920px) ============ */
@media (min-width: 1920px) {
  .aboutus-heading-line {
    font-size: 7.5rem;
  }

  .timeline-item {
    width: 460px;
  }

  .cta-heading {
    font-size: 5rem;
  }
}

/* ============ Short / landscape phones ============ */
@media (max-height: 480px) and (orientation: landscape) {
  .aboutus-heading-section {
    padding: 24px 6vw 14px;
  }
  .aboutus-hero-wrap {
    min-height: 200px;
    aspect-ratio: auto;
  }
  .timeline-image-wrap {
    height: 40vh;
  }
  .cta-person-row {
    flex-direction: row;
  }
}
`;

