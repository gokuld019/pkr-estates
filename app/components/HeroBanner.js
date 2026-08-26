"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ---- Frame sequence config ----
const FRAME_COUNT = 88;
const FRAME_PATH = (index) =>
  `/hero-frames/frame_${String(index).padStart(4, "0")}.webp`;

const SCRUB_HEIGHT_VH = 400;
const MAX_UPSCALE = 1.75;

// ---- Global font stack ----
const FONT_STACK = "var(--font-jakarta)";

export default function HeroBanner() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef({ index: 0 });

  const arriveWrapRef = useRef(null);
  const arriveLeftRef = useRef(null);
  const arriveRightRef = useRef(null);
  const phraseWrapRef = useRef(null);
  const finalHeroRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const scrollPillRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    let cancelled = false;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const backdropCanvas = document.createElement("canvas");
    const backdropCtx = backdropCanvas.getContext("2d");
    const BACKDROP_W = 64;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    };
    setCanvasSize();

    const drawFrame = (index) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasW = window.innerWidth;
      const canvasH = window.innerHeight;
      const coverScale = Math.max(
        canvasW / img.naturalWidth,
        canvasH / img.naturalHeight
      );

      context.clearRect(0, 0, canvasW, canvasH);

      const scale = Math.min(coverScale, MAX_UPSCALE);

      if (scale < coverScale) {
        const backdropH = Math.round(
          BACKDROP_W / (img.naturalWidth / img.naturalHeight)
        );
        if (
          backdropCanvas.width !== BACKDROP_W ||
          backdropCanvas.height !== backdropH
        ) {
          backdropCanvas.width = BACKDROP_W;
          backdropCanvas.height = backdropH;
        }
        backdropCtx.filter = "blur(6px) brightness(0.55)";
        backdropCtx.drawImage(img, 0, 0, BACKDROP_W, backdropH);
        context.drawImage(backdropCanvas, 0, 0, canvasW, canvasH);
      }

      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      context.drawImage(
        img,
        (canvasW - drawW) / 2,
        (canvasH - drawH) / 2,
        drawW,
        drawH
      );
    };

    let loadedCount = 0;
    const images = new Array(FRAME_COUNT);

    const onFrameLoaded = () => {
      loadedCount += 1;
      setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
      if (loadedCount === 1) drawFrame(0);
      if (loadedCount === FRAME_COUNT && !cancelled) {
        setIsReady(true);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      img.onload = onFrameLoaded;
      img.onerror = onFrameLoaded;
      images[i] = img;
    }
    imagesRef.current = images;

    const ctx = gsap.context(() => {
      if (scrollPillRef.current) {
        gsap.to(scrollPillRef.current, {
          y: 18,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: "power2.inOut",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${SCRUB_HEIGHT_VH}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const targetIndex = Math.min(
              FRAME_COUNT - 1,
              Math.round(self.progress * (FRAME_COUNT - 1))
            );
            if (targetIndex !== frameRef.current.index) {
              frameRef.current.index = targetIndex;
              drawFrame(targetIndex);
            }
          },
        },
      });

      if (scrollIndicatorRef.current) {
        tl.to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 20,
            duration: 0.05,
            ease: "power2.out",
          },
          0
        );
      }

      if (arriveWrapRef.current) {
        tl.fromTo(
          arriveWrapRef.current,
          {
            y: prefersReducedMotion ? 0 : 140,
            scale: prefersReducedMotion ? 1 : 0.96,
            filter: prefersReducedMotion ? "none" : "blur(8px)",
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.14,
            ease: "power3.out",
          },
          0.06
        );
      }

      if (arriveLeftRef.current && arriveRightRef.current) {
        tl.to(
          arriveLeftRef.current,
          {
            x: prefersReducedMotion ? 0 : "-35vw",
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.05,
            filter: prefersReducedMotion ? "none" : "blur(4px)",
            duration: 0.16,
            ease: "power2.in",
          },
          0.32
        );

        tl.to(
          arriveRightRef.current,
          {
            x: prefersReducedMotion ? 0 : "35vw",
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.05,
            filter: prefersReducedMotion ? "none" : "blur(4px)",
            duration: 0.16,
            ease: "power2.in",
          },
          0.32
        );
      }

      if (arriveWrapRef.current) {
        tl.set(arriveWrapRef.current, { display: "none" }, 0.49);
      }

      if (phraseWrapRef.current) {
        tl.fromTo(
          phraseWrapRef.current,
          {
            y: prefersReducedMotion ? 0 : 180,
            scale: prefersReducedMotion ? 1 : 0.94,
            filter: prefersReducedMotion ? "none" : "blur(10px)",
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.14,
            ease: "power3.out",
          },
          0.60
        );

        tl.to(
          phraseWrapRef.current,
          {
            y: prefersReducedMotion ? 0 : -90,
            scale: prefersReducedMotion ? 1 : 0.96,
            filter: prefersReducedMotion ? "none" : "blur(6px)",
            opacity: 0,
            duration: 0.09,
            ease: "power2.in",
          },
          0.82
        );

        tl.set(phraseWrapRef.current, { display: "none" }, 0.92);
      }

      if (finalHeroRef.current) {
        tl.fromTo(
          finalHeroRef.current,
          {
            y: prefersReducedMotion ? 0 : 90,
            filter: prefersReducedMotion ? "none" : "blur(8px)",
            opacity: 0,
          },
          {
            y: 0,
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.14,
            ease: "power2.out",
          },
          0.86
        );
      }
    }, wrapperRef);

    const handleResize = () => {
      setCanvasSize();
      drawFrame(frameRef.current.index);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  return (
    <section ref={wrapperRef} data-hero-banner style={styles.wrapper}>
      <canvas ref={canvasRef} style={styles.canvas} />
      <div style={styles.vignetteOverlay} />

      {!isReady && (
        <div style={styles.loaderOverlay}>
          <div style={styles.loaderBarTrack}>
            <div style={{ ...styles.loaderBarFill, width: `${progress}%` }} />
          </div>
          <span style={styles.loaderText}>{progress}%</span>
        </div>
      )}

      {/* PHASE 1 & 2 & 3: Emerging & Splitting "PKR ESTATES" with gap */}
      <div ref={arriveWrapRef} style={styles.arriveContainer}>
        <span ref={arriveLeftRef} style={styles.arriveHalfLeft}>
          UNVEILING PKR'S ESTATES
        </span>
        <span ref={arriveRightRef} style={styles.arriveHalfRight}>
         GURUDEV
        </span>
      </div>

      {/* PHASE 5: Large Architectural Phrase */}
      <div ref={phraseWrapRef} style={styles.phraseContainer}>
        <span style={styles.phraseEyebrow}>PKR ESTATES</span>
        <h2 style={styles.phraseText}>BUILT TO BELONG.</h2>
      </div>

      {/* PHASE 6: Final Main Hero Headline */}
      <div ref={finalHeroRef} style={styles.finalHeroContainer}>
        <div style={styles.identifierWrap}>
          <span style={styles.identifierDot} />
          <span style={styles.identifierText}>
            PKR ESTATE &bull; PRIVATE RESIDENCES
          </span>
        </div>
        <h1 style={styles.finalHeadline}>
          <span style={styles.headlineLine}>WHERE</span>
          <span style={styles.headlineLine}>LUXURY</span>
          <span style={styles.headlineLine}>MEETS LIFE.</span>
        </h1>
      </div>

      {/* Minimal Scroll Indicator */}
      <div ref={scrollIndicatorRef} style={styles.scrollIndicator}>
        <span style={styles.scrollText}>SCROLL TO EXPLORE</span>
        <div style={styles.scrollTrack}>
          <div ref={scrollPillRef} style={styles.scrollPill} />
        </div>
      </div>
    </section>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100vh",
    height: "100dvh",
    overflow: "hidden",
    backgroundColor: "#0b0a09",
    border: "none",
    outline: "none",
    boxShadow: "none",
    fontFamily: FONT_STACK,
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "block",
    border: "none",
    outline: "none",
  },
  vignetteOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(11,10,9,0.4) 0%, rgba(11,10,9,0.04) 25%, rgba(11,10,9,0.12) 65%, rgba(11,10,9,0.75) 100%)",
    pointerEvents: "none",
    zIndex: 2,
  },
  loaderOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    backgroundColor: "#0b0a09",
    zIndex: 20,
  },
  loaderBarTrack: {
    width: "220px",
    maxWidth: "70vw",
    height: "2px",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    overflow: "hidden",
  },
  loaderBarFill: {
    height: "100%",
    backgroundColor: "#c8a05a",
    transition: "width 0.15s ease-out",
  },
  loaderText: {
    color: "#e8e3da",
    fontSize: "clamp(10px, 1.5vw, 14px)",
    letterSpacing: "0.14em",
    fontFamily: FONT_STACK,
    fontWeight: 400,
  },
  arriveContainer: {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
    pointerEvents: "none",
    whiteSpace: "nowrap",
    willChange: "transform, opacity, filter",
    gap: "clamp(8px, 1.5vw, 40px)",
    border: "none",
    flexWrap: "wrap",
  },

  arriveHalfLeft: {
    fontFamily: FONT_STACK,
    fontSize: "clamp(1rem, 3vw, 3rem)",
    fontWeight: 500,
    letterSpacing: "clamp(0.01em, 0.02em, 0.04em)",
    color: "#fcfbf9",
    textTransform: "uppercase",
    display: "inline-block",
    textShadow: "0 4px 30px rgba(0, 0, 0, 0.55)",
    willChange: "transform, opacity, filter",
    border: "none",
    lineHeight: 0.2,
  },

  arriveHalfRight: {
    fontFamily: FONT_STACK,
    fontSize: "clamp(2.2rem, 7vw, 8.5rem)",
    fontWeight: 700,
    letterSpacing: "clamp(0.01em, 0.02em, 0.04em)",
    color: "#fcfbf9",
    textTransform: "uppercase",
    display: "inline-block",
    textShadow: "0 4px 30px rgba(0, 0, 0, 0.55)",
    willChange: "transform, opacity, filter",
    border: "none",
    lineHeight: 0.9,
  },

  phraseContainer: {
    position: "absolute",
    bottom: "clamp(40px, 10vh, 120px)",
    left: 0,
    right: 0,
    margin: "0 auto",
    maxWidth: "1000px",
    padding: "0 clamp(16px, 4vw, 6vw)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    zIndex: 4,
    pointerEvents: "none",
    willChange: "transform, opacity, filter",
    border: "none",
  },

  phraseEyebrow: {
    fontFamily: FONT_STACK,
    fontSize: "clamp(0.55rem, 0.8vw, 0.8rem)",
    letterSpacing: "clamp(0.25em, 0.35em, 0.45em)",
    fontWeight: 400,
    color: "#c8a05a",
    textTransform: "uppercase",
    marginBottom: "clamp(6px, 1.2vw, 18px)",
    border: "none",
  },

  phraseText: {
    margin: 0,
    fontFamily: FONT_STACK,
    fontSize: "clamp(1.6rem, 5vw, 5.4rem)",
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    color: "#fcfbf9",
    textTransform: "uppercase",
    textShadow: "0 4px 24px rgba(0, 0, 0, 0.6)",
    border: "none",
  },

  finalHeroContainer: {
    position: "absolute",
    bottom: "clamp(40px, 9vh, 110px)",
    left: "clamp(16px, 4vw, 6vw)",
    maxWidth: "clamp(280px, 50vw, 720px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    zIndex: 4,
    pointerEvents: "none",
    willChange: "transform, opacity, filter",
    border: "none",
  },
  identifierWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: "clamp(4px, 0.6vw, 8px)",
    marginBottom: "clamp(6px, 1.2vw, 16px)",
    border: "none",
    flexWrap: "wrap",
  },
  identifierDot: {
    width: "clamp(3px, 0.4vw, 5px)",
    height: "clamp(3px, 0.4vw, 5px)",
    borderRadius: "50%",
    backgroundColor: "#c8a05a",
    boxShadow: "0 0 6px rgba(200, 160, 90, 0.6)",
    flexShrink: 0,
  },

  identifierText: {
    fontFamily: FONT_STACK,
    fontSize: "clamp(0.5rem, 0.7vw, 0.78rem)",
    letterSpacing: "clamp(0.2em, 0.3em, 0.4em)",
    fontWeight: 400,
    color: "#ded6ca",
    textTransform: "uppercase",
    opacity: 0.88,
    border: "none",
    lineHeight: 1.2,
  },

  finalHeadline: {
    margin: 0,
    fontFamily: FONT_STACK,
    fontSize: "clamp(1.6rem, 4.5vw, 4.6rem)",
    fontWeight: 500,
    lineHeight: "clamp(0.9, 0.96, 1)",
    letterSpacing: "-0.01em",
    color: "#fcfbf9",
    textTransform: "uppercase",
    textShadow: "0 2px 16px rgba(0, 0, 0, 0.45)",
    border: "none",
  },
  headlineLine: {
    display: "block",
    border: "none",
    lineHeight: "clamp(0.9, 0.96, 1)",
  },
  scrollIndicator: {
    position: "absolute",
    right: "clamp(12px, 4vw, 6vw)",
    bottom: "clamp(16px, 3vh, 48px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(6px, 0.8vw, 10px)",
    zIndex: 4,
    pointerEvents: "none",
    willChange: "transform, opacity",
    border: "none",
  },

  scrollText: {
    fontFamily: FONT_STACK,
    fontSize: "clamp(7px, 0.7vw, 9.5px)",
    letterSpacing: "clamp(0.2em, 0.3em, 0.4em)",
    fontWeight: 400,
    color: "rgba(255, 255, 255, 0.55)",
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    transform: "rotate(180deg)",
    marginBottom: "clamp(2px, 0.3vw, 3px)",
    border: "none",
  },
  scrollTrack: {
    width: "1px",
    height: "clamp(24px, 3vh, 36px)",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    position: "relative",
    overflow: "hidden",
    border: "none",
  },
  scrollPill: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "clamp(10px, 1.2vh, 14px)",
    backgroundColor: "#c8a05a",
    border: "none",
  },
};

// Media query styles for additional responsive fine-tuning
const mediaStyles = `
  [data-hero-banner],
  [data-hero-banner] * {
    font-family: "Figtree", "Figtree Placeholder", sans-serif;
  }

  /* Small Mobile (320px - 480px) */
  @media (max-width: 480px) {
    [data-hero-banner] .arriveContainer {
      gap: 4px;
    }
    [data-hero-banner] .finalHeroContainer {
      left: 16px;
      max-width: 200px;
    }
    [data-hero-banner] .scrollIndicator {
      right: 8px;
    }
  }

  /* Mobile (481px - 768px) */
  @media (min-width: 481px) and (max-width: 768px) {
    [data-hero-banner] .arriveContainer {
      gap: 8px;
    }
    [data-hero-banner] .finalHeroContainer {
      left: 24px;
      max-width: 280px;
    }
  }

  /* Tablet (769px - 1024px) */
  @media (min-width: 769px) and (max-width: 1024px) {
    [data-hero-banner] .arriveContainer {
      gap: 16px;
    }
    [data-hero-banner] .finalHeroContainer {
      left: 32px;
      max-width: 400px;
    }
  }

  /* Laptop (1025px - 1440px) */
  @media (min-width: 1025px) and (max-width: 1440px) {
    [data-hero-banner] .arriveContainer {
      gap: 24px;
    }
  }

  /* Desktop (1441px - 1920px) */
  @media (min-width: 1441px) and (max-width: 1920px) {
    [data-hero-banner] .arriveContainer {
      gap: 32px;
    }
  }

  /* Large Desktop (1921px+) */
  @media (min-width: 1921px) {
    [data-hero-banner] .arriveContainer {
      gap: 48px;
    }
    [data-hero-banner] .finalHeroContainer {
      max-width: 900px;
    }
  }
`;

// Inject media styles into head
if (typeof document !== 'undefined' && !document.getElementById('hero-banner-styles')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'hero-banner-styles';
  styleTag.textContent = mediaStyles;
  document.head.appendChild(styleTag);
}