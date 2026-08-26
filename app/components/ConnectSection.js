"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GALLERY_ITEMS = [
  "/amenity1.jpeg",
  "/Amenity2.jpeg",
  "/amenity3.jpeg",
  "/amenity4.jpeg",
  "/amenity5.jpeg",
  "/amenity6.jpeg",
  "/amenity7.jpeg",
];

// Enhanced breakpoints for better device coverage
const BP = {
  smallMobile: 375,
  mobile: 480,
  largeMobile: 640,
  tablet: 768,
  largeTablet: 1024,
  laptop: 1280,
  desktop: 1536,
  largeDesktop: 1920,
  ultraWide: 2560,
};

// Improved item sizing with smoother transitions
function getItemDimensions(width) {
  let itemWidth, itemHeight, itemGap, sidePadding;
  
  if (width < BP.smallMobile) {
    // Very small phones (iPhone SE, etc.)
    itemWidth = Math.min(200, width * 0.55);
    itemHeight = itemWidth * 1.25;
    itemGap = 16;
    sidePadding = Math.max(12, width * 0.1);
  } else if (width < BP.mobile) {
    // Small phones
    itemWidth = Math.min(220, width * 0.58);
    itemHeight = itemWidth * 1.2;
    itemGap = 18;
    sidePadding = Math.max(16, width * 0.12);
  } else if (width < BP.largeMobile) {
    // Standard phones
    itemWidth = Math.min(260, width * 0.6);
    itemHeight = itemWidth * 1.15;
    itemGap = 20;
    sidePadding = Math.max(20, width * 0.15);
  } else if (width < BP.tablet) {
    // Large phones / small tablets
    itemWidth = Math.min(300, width * 0.55);
    itemHeight = itemWidth * 1.1;
    itemGap = 24;
    sidePadding = Math.max(24, width * 0.18);
  } else if (width < BP.largeTablet) {
    // Tablets
    itemWidth = Math.min(340, width * 0.45);
    itemHeight = itemWidth * 1.1;
    itemGap = 28;
    sidePadding = Math.max(32, width * 0.2);
  } else if (width < BP.laptop) {
    // Small laptops / large tablets
    itemWidth = Math.min(380, width * 0.4);
    itemHeight = itemWidth * 1.08;
    itemGap = 32;
    sidePadding = Math.max(40, width * 0.22);
  } else if (width < BP.desktop) {
    // Standard laptops / desktops
    itemWidth = Math.min(420, width * 0.35);
    itemHeight = itemWidth * 1.05;
    itemGap = 40;
    sidePadding = Math.max(48, width * 0.25);
  } else if (width < BP.largeDesktop) {
    // Large desktops
    itemWidth = Math.min(480, width * 0.3);
    itemHeight = itemWidth * 1.05;
    itemGap = 48;
    sidePadding = Math.max(60, width * 0.28);
  } else if (width < BP.ultraWide) {
    // Very large screens
    itemWidth = Math.min(520, width * 0.25);
    itemHeight = itemWidth * 1.04;
    itemGap = 56;
    sidePadding = Math.max(80, width * 0.3);
  } else {
    // Ultra-wide screens
    itemWidth = Math.min(560, width * 0.22);
    itemHeight = itemWidth * 1.03;
    itemGap = 64;
    sidePadding = Math.max(100, width * 0.32);
  }
  
  return { itemWidth, itemHeight, itemGap, sidePadding };
}

export default function ConnectSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingLineRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const { itemWidth, itemHeight, itemGap, sidePadding } = getItemDimensions(viewportWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsMobile(width < BP.largeMobile);
      setIsTablet(width < BP.largeTablet && width >= BP.largeMobile);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Add resize observer for more reliable updates
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(handleResize);
      observer.observe(document.body);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", handleResize);
      };
    }
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self) => {
      const track = trackRef.current;
      const items = gsap.utils.toArray(track.children);

      // Heading animation with better timing
      gsap.fromTo(
        headingLineRef.current,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Reveal animations with device-aware timing
      gsap.from(sectionRef.current.querySelectorAll("[data-scroll-reveal]"), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: isMobile ? 30 : 50,
        opacity: 0,
        duration: isMobile ? 0.8 : 1,
        stagger: isMobile ? 0.2 : 0.3,
        ease: "power3.out",
      });

      // Optimized scroll amount calculation
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const containerWidth = window.innerWidth;
        const padding = parseFloat(getComputedStyle(track).paddingLeft || 0) * 2;
        return -(trackWidth - containerWidth + padding);
      };

      // Smooth horizontal scroll with better performance
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: isMobile ? 0.5 : 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Enhanced coverflow effect with device-aware parameters
      const updateCoverflow = () => {
        const viewportCenter = window.innerWidth / 2;
        
        // Dynamic rotation based on device
        let maxRotation;
        if (viewportWidth < BP.smallMobile) maxRotation = 15;
        else if (viewportWidth < BP.mobile) maxRotation = 18;
        else if (viewportWidth < BP.largeMobile) maxRotation = 22;
        else if (viewportWidth < BP.tablet) maxRotation = 28;
        else if (viewportWidth < BP.largeTablet) maxRotation = 35;
        else maxRotation = 45;

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const distance = itemCenter - viewportCenter;

          // Smoother rotation with device-aware scaling
          const rotation = Math.max(-maxRotation, Math.min(maxRotation, 
            (distance / (window.innerWidth * 0.4)) * maxRotation
          ));

          // Scale with better perspective
          const scaleFactor = viewportWidth < BP.mobile ? 0.6 : 0.7;
          const scale = Math.max(scaleFactor, 1 - Math.abs(distance) / (window.innerWidth * 1.6));
          
          // Depth adjustment
          const z = -Math.abs(distance) * (viewportWidth < BP.mobile ? 0.2 : 0.4);

          gsap.set(item, { 
            rotationY: rotation, 
            scale: scale, 
            z,
            transformPerspective: viewportWidth < BP.mobile ? 600 : 1200
          });
        });
      };

      // Throttled ticker for better performance
      let tickerId = gsap.ticker.add(updateCoverflow);
      self.add(() => () => {
        if (tickerId) {
          gsap.ticker.remove(updateCoverflow);
          tickerId = null;
        }
      });
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportWidth, isMobile]);

  return (
    <section ref={sectionRef} id="connect-section" style={styles.section}>
      <div style={styles.heroHeading}>
        <h2 style={styles.headingMask}>
          <span ref={headingLineRef} style={styles.headingLine}>
            Let&rsquo;s connect
          </span>
        </h2>
        <div data-scroll-reveal style={styles.topBarRight}>
          <a href="#" style={styles.viewAllBtn}>
            View all
          </a>
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

      <div style={styles.viewport}>
        <div
          ref={trackRef}
          style={{
            ...styles.track,
            gap: `${itemGap}px`,
            padding: `0 ${sidePadding}px`,
          }}
        >
          {GALLERY_ITEMS.map((src, i) => (
            <div
              key={src}
              style={{
                ...styles.item,
                flex: `0 0 ${itemWidth}px`,
                height: `${itemHeight}px`,
              }}
            >
              <div style={styles.clayBox}>
                <img 
                  src={src} 
                  alt={`PKR Estate ${i + 1}`} 
                  style={styles.itemImage} 
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div data-scroll-reveal style={styles.formContainer}>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ width: "100%" }}
        >
          <div style={{ 
            ...styles.inputGroup, 
            flexDirection: viewportWidth < BP.largeMobile ? "column" : "row",
            padding: viewportWidth < BP.mobile ? "6px" : "8px"
          }}>
            <input
              type="email"
              placeholder="Email*"
              required
              style={{
                ...styles.input,
                fontSize: viewportWidth < BP.mobile ? "clamp(0.8rem, 3vw, 0.92rem)" : "clamp(0.92rem, 2vw, 1rem)",
                padding: viewportWidth < BP.mobile ? "clamp(0.6rem, 2vw, 0.85rem) clamp(0.8rem, 2.5vw, 1rem)" : "clamp(0.85rem, 2.5vw, 1rem) clamp(1rem, 3vw, 1.5rem)"
              }}
            />
            <button
              type="submit"
              style={{
                ...styles.button,
                width: viewportWidth < BP.largeMobile ? "100%" : "auto",
                padding: viewportWidth < BP.largeMobile ? "clamp(0.8rem, 2.5vw, 1rem) 1.5rem" : "0 2rem",
                marginTop: viewportWidth < BP.largeMobile ? "6px" : 0,
                fontSize: viewportWidth < BP.mobile ? "clamp(0.75rem, 2.5vw, 0.85rem)" : "0.85rem"
              }}
            >
              Submit
            </button>
          </div>
        </form>
        <p style={{
          ...styles.disclaimer,
          fontSize: viewportWidth < BP.mobile ? "clamp(0.65rem, 2vw, 0.75rem)" : "0.75rem"
        }}>
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

// Enhanced shadow system with device-aware values
const getShadows = (width) => {
  const isSmall = width < BP.mobile;
  const isMedium = width < BP.largeTablet;
  
  const outsetSize = isSmall ? "8px" : isMedium ? "10px" : "12px";
  const insetSize = isSmall ? "2px" : isMedium ? "3px" : "4px";
  
  return {
    SHADOW_OUTSET: `${outsetSize} ${outsetSize} ${parseInt(outsetSize) * 2}px #d9d0bd, -${outsetSize} -${outsetSize} ${parseInt(outsetSize) * 2}px #ffffff`,
    SHADOW_INSET: `inset ${insetSize} ${insetSize} ${parseInt(insetSize) * 2}px rgba(255,255,255,0.8), inset -${insetSize} -${insetSize} ${parseInt(insetSize) * 2}px rgba(0,0,0,0.05)`
  };
};

// Responsive styles object
const styles = {
  section: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "clamp(100vh, 100dvh, 120vh)",
    padding: "clamp(2rem, 8vh, 5rem) 0",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  heroHeading: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(12px, 2vw, 24px)",
    textAlign: "center",
    padding: "0 clamp(1rem, 5vw, 6vw) clamp(2rem, 5vw, 56px)",
    width: "100%",
    boxSizing: "border-box",
  },
  headingMask: {
    margin: "0",
    overflow: "hidden",
    flex: "1 1 auto",
    minWidth: "clamp(150px, 40vw, 300px)",
  },
  headingLine: {
    display: "inline-block",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontWeight: 500,
    fontSize: "clamp(2rem, 8vw, 5.5rem)",
    letterSpacing: "-0.02em",
    color: "#171412",
    lineHeight: 1,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 1.5vw, 14px)",
    flex: "0 0 auto",
  },
  viewAllBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "clamp(0.4em, 1.2vw, 0.7em) clamp(0.8em, 2vw, 1.3em)",
    borderRadius: "999px",
    backgroundColor: "#f0f0f0",
    color: "#171412",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
    fontWeight: 500,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  iconBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "clamp(32px, 4.5vw, 38px)",
    height: "clamp(32px, 4.5vw, 38px)",
    borderRadius: "10px",
    backgroundColor: "#f0f0f0",
    color: "#171412",
    flexShrink: 0,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  viewport: {
    width: "100%",
    height: "clamp(280px, 50vh, 480px)",
    perspective: "clamp(800px, 1000px, 1200px)",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: "clamp(1.5rem, 5vh, 4rem)",
    maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
  },
  track: {
    display: "flex",
    alignItems: "center",
    transformStyle: "preserve-3d",
    willChange: "transform",
  },
  item: {
    position: "relative",
    transformStyle: "preserve-3d",
    cursor: "pointer",
    transition: "transform 0.1s ease-out",
  },
  clayBox: {
    width: "100%",
    height: "100%",
    padding: "clamp(6px, 1.2vw, 12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffffff",
    borderRadius: "clamp(4px, 1vw, 8px)",
    boxShadow: `12px 12px 24px #d9d0bd, -12px -12px 24px #ffffff, inset 4px 4px 8px rgba(255,255,255,0.8), inset -4px -4px 8px rgba(0,0,0,0.05)`,
    border: "2px solid rgba(0,0,0,0.06)",
    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "clamp(2px, 0.5vw, 4px)",
    filter: "saturate(0.9) contrast(1.1)",
    pointerEvents: "none",
    userSelect: "none",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "min(500px, 90vw)",
    padding: "0 clamp(1rem, 4vw, 1.5rem)",
    boxSizing: "border-box",
  },
  inputGroup: {
    display: "flex",
    width: "100%",
    background: "#ffffff",
    borderRadius: "clamp(4px, 1vw, 8px)",
    boxShadow: `12px 12px 24px #d9d0bd, -12px -12px 24px #ffffff, inset 4px 4px 8px rgba(255,255,255,0.8), inset -4px -4px 8px rgba(0,0,0,0.05)`,
    padding: "8px",
    marginBottom: "clamp(1rem, 2.5vw, 1.5rem)",
    border: "2px solid rgba(0,0,0,0.06)",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
  },
  input: {
    flex: 1,
    minWidth: "0",
    background: "transparent",
    border: "none",
    outline: "none",
    padding: "clamp(0.85rem, 2.5vw, 1rem) clamp(1rem, 3vw, 1.5rem)",
    fontSize: "clamp(0.92rem, 2vw, 1rem)",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    color: "#171412",
    fontWeight: 500,
    "::placeholder": {
      color: "rgba(23,20,18,0.4)",
    },
  },
  button: {
    background: "#171412",
    color: "#fff",
    border: "none",
    borderRadius: "clamp(4px, 0.8vw, 8px)",
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "clamp(0.78rem, 1.2vw, 0.85rem)",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    cursor: "pointer",
    padding: "0 2rem",
    minHeight: "clamp(44px, 6vh, 56px)",
    boxShadow: "6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.1), inset 2px 2px 5px rgba(255,255,255,0.2)",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  disclaimer: {
    fontFamily: "var(--font-figtree), 'Figtree', 'Segoe UI', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 400,
    color: "rgba(23,20,18,0.55)",
    textAlign: "center",
    margin: 0,
  },
};

// CSS media query overrides (add to your global CSS)
const responsiveStyles = `
  @media (max-width: 480px) {
    [data-scroll-reveal] {
      transform: translateY(20px);
    }
    
    .clay-box {
      padding: 4px !important;
    }
    
    #connect-section {
      min-height: 90vh !important;
    }
  }
  
  @media (min-width: 1920px) {
    #connect-section {
      padding: 6rem 0 !important;
    }
    
    .viewport {
      height: 60vh !important;
      max-height: 600px !important;
    }
  }
  
  @media (min-width: 2560px) {
    #connect-section {
      padding: 8rem 0 !important;
    }
    
    .viewport {
      height: 65vh !important;
      max-height: 700px !important;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

// Export styles for use in your app
export { responsiveStyles };