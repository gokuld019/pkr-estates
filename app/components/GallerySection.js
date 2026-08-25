"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// A handful of confirmed-good frames from the hero sequence, cycled to
// fill out the sphere and the scattered closing section.
const GALLERY_IMAGES = [
  "/hero-frames/frame_0010.webp",
  "/hero-frames/frame_0035.webp",
  "/hero-frames/frame_0060.webp",
  "/hero-frames/frame_0080.webp",
  "/hero-frames/frame_0088.webp",
];

const CARD_COUNT = 24;

const CAPTIONS = [
  {
    title: "Where Light Meets Living",
    text: "Every residence is oriented to catch the first and last light of day, turning ordinary rooms into something worth pausing in.",
  },
  {
    title: "Framed By Nature",
    text: "Mature trees and layered planting were part of the architectural brief from day one, not an afterthought added at handover.",
  },
  {
    title: "An Address After Dark",
    text: "Landscape lighting is designed frame by frame, so every property reads as intentionally at dusk as it does at noon.",
  },
  {
    title: "Interiors Built To Breathe",
    text: "Generous ceiling heights and uninterrupted sightlines give every layout room to exhale.",
  },
];

const SCATTER_POSITIONS = [
  { top: "8%", left: "12%" },
  { top: "18%", left: "78%" },
  { top: "58%", left: "8%" },
  { top: "72%", left: "82%" },
  { top: "84%", left: "32%" },
  { top: "14%", left: "48%" },
];

export default function GallerySection() {
  const sectionRef = useRef(null);
  const sphereRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardRefs = useRef([]);
  const scatterRefs = useRef([]);
  const activeCaptionRef = useRef(0);
  const [caption, setCaption] = useState(CAPTIONS[0]);
  const [radius, setRadius] = useState(360);

  const cards = useMemo(
    () =>
      Array.from({ length: CARD_COUNT }, (_, i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / CARD_COUNT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        return { image: GALLERY_IMAGES[i % GALLERY_IMAGES.length], phi, theta };
      }),
    []
  );

  useEffect(() => {
    const updateRadius = () => setRadius(window.innerWidth < 768 ? 190 : 360);
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(sphereRef.current, {
            rotateY: self.progress * 720,
            rotateX: self.progress * 40,
          });

          const capIndex = Math.min(
            CAPTIONS.length - 1,
            Math.floor(self.progress * CAPTIONS.length)
          );
          if (capIndex !== activeCaptionRef.current) {
            activeCaptionRef.current = capIndex;
            gsap.to([titleRef.current, descRef.current], {
              opacity: 0,
              duration: 0.2,
              onComplete: () => {
                setCaption(CAPTIONS[capIndex]);
                gsap.to([titleRef.current, descRef.current], {
                  opacity: 1,
                  duration: 0.3,
                });
              },
            });
          }

          const focus = Math.floor(self.progress * CARD_COUNT);
          cardRefs.current.forEach((el, idx) => {
            if (!el) return;
            el.style.filter =
              Math.abs(idx - focus) < 2
                ? "grayscale(0%) brightness(1)"
                : "grayscale(70%) brightness(0.9)";
          });
        },
      });

      gsap.to(scatterRefs.current, {
        y: -100,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.gridOverlay} />

      <div style={styles.scene}>
        <div style={styles.floatingText}>
          <h2 ref={titleRef} style={styles.floatingTitle}>
            {caption.title}
          </h2>
          <p ref={descRef} style={styles.floatingDesc}>
            {caption.text}
          </p>
        </div>

        <div style={styles.sphereStage}>
          <div ref={sphereRef} style={styles.sphere}>
            {cards.map((card, i) => {
              // Rounded to 2 decimals: the browser silently rounds long
              // float strings when it parses the SSR'd inline style into
              // the CSSOM, which otherwise makes React's hydration check
              // see a (harmless but noisy) mismatch against its own
              // full-precision recomputation.
              const round = (n) => Math.round(n * 100) / 100;
              const x = round(radius * Math.cos(card.theta) * Math.sin(card.phi));
              const y = round(radius * Math.sin(card.theta) * Math.sin(card.phi));
              const z = round(radius * Math.cos(card.phi));
              const rotY = round(Math.atan2(x, z) * (180 / Math.PI));
              const rotX = round(Math.asin(-y / radius) * (180 / Math.PI));
              return (
                <div
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  style={{
                    ...styles.clayCard,
                    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
                  }}
                >
                  <img src={card.image} alt="" style={styles.clayCardImage} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={styles.journey}>
        <div style={styles.constellation}>
          {SCATTER_POSITIONS.map((pos, i) => (
            <div
              key={i}
              ref={(el) => (scatterRefs.current[i] = el)}
              style={{ ...styles.scatterCard, top: pos.top, left: pos.left }}
            >
              <img
                src={GALLERY_IMAGES[i % GALLERY_IMAGES.length]}
                alt=""
                style={styles.clayCardImage}
              />
            </div>
          ))}
        </div>

        <div style={styles.journeyContent}>
          <h2 style={styles.journeyHeading}>Ready when you are</h2>
          <p style={styles.journeyText}>
            Schedule a private site visit or speak with our sales team.
          </p>
          <a href="#" style={styles.journeyButton}>
            Enquire Now
          </a>
        </div>
      </div>
    </section>
  );
}

const CLAY_SHADOW = "8px 8px 18px rgba(0,0,0,0.12)";

const styles = {
  section: {
    position: "relative",
    backgroundColor: "#ffffff",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  scene: {
    position: "sticky",
    top: 0,
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  floatingText: {
    position: "absolute",
    left: "8%",
    top: "50%",
    transform: "translateY(-50%)",
    width: "min(340px, 80vw)",
    zIndex: 2,
  },
  floatingTitle: {
    margin: "0 0 16px",
    fontFamily: "var(--font-serif), Georgia, serif",
    fontWeight: 600,
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    color: "#1a1712",
    textShadow: "none",
  },
  floatingDesc: {
    margin: 0,
    fontFamily: "var(--font-geist-sans), sans-serif",
    fontSize: "0.92rem",
    lineHeight: 1.7,
    color: "#6b6459",
    fontWeight: 300,
  },
  sphereStage: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    perspective: "1200px",
  },
  sphere: {
    position: "relative",
    width: 0,
    height: 0,
    transformStyle: "preserve-3d",
  },
  clayCard: {
    position: "absolute",
    width: "150px",
    height: "200px",
    left: "-75px",
    top: "-100px",
    backgroundColor: "#f6f4f0",
    borderRadius: "14px",
    padding: "7px",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: `${CLAY_SHADOW}, inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.04)`,
    transition: "filter 0.4s ease",
  },
  clayCardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "9px",
    display: "block",
  },
  journey: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    background: "radial-gradient(circle at center, #ffffff 0%, #f3f1ec 70%)",
  },
  constellation: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  scatterCard: {
    position: "absolute",
    width: "100px",
    height: "138px",
    opacity: 0.55,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: CLAY_SHADOW,
  },
  journeyContent: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: "56px 48px",
    borderRadius: "24px",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
  },
  journeyHeading: {
    margin: "0 0 12px",
    fontFamily: "var(--font-serif), Georgia, serif",
    fontWeight: 600,
    fontSize: "clamp(2rem, 4vw, 3rem)",
    color: "#1a1712",
  },
  journeyText: {
    margin: "0 0 32px",
    fontFamily: "var(--font-geist-sans), sans-serif",
    fontSize: "1rem",
    color: "#6b6459",
    fontWeight: 300,
  },
  journeyButton: {
    display: "inline-block",
    fontFamily: "var(--font-geist-sans), sans-serif",
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#1a1712",
    backgroundColor: "#c8a05a",
    padding: "16px 38px",
    borderRadius: "40px",
    textDecoration: "none",
    boxShadow:
      "0px 4px 0px rgba(160,125,70,0.35), 0px 8px 16px rgba(0,0,0,0.15)",
  },
};