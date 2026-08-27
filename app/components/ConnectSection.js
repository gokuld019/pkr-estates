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

const BP = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
};

export default function ConnectSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingLineRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsMobile(width < BP.tablet);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      
      const items = gsap.utils.toArray(track.children);

      if (headingLineRef.current) {
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
      }

      gsap.from(sectionRef.current.querySelectorAll("[data-scroll-reveal]"), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: isMobile ? 20 : 50,
        opacity: 0,
        duration: isMobile ? 0.6 : 1,
        stagger: isMobile ? 0.15 : 0.3,
        ease: "power3.out",
      });

      // Only apply horizontal scroll with pinning on desktop
      if (!isMobile) {
        const getScrollAmount = () => {
          if (!track) return 0;
          const trackWidth = track.scrollWidth;
          const containerWidth = window.innerWidth;
          const padding = parseFloat(getComputedStyle(track).paddingLeft || 0) * 2;
          return -(trackWidth - containerWidth + padding);
        };

        gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }

      const updateCoverflow = () => {
        const viewportCenter = window.innerWidth / 2;
        const maxRotation = isMobile ? 10 : 45;

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const distance = itemCenter - viewportCenter;

          const rotation = Math.max(-maxRotation, Math.min(maxRotation, 
            (distance / (window.innerWidth * 0.4)) * maxRotation
          ));

          const scale = Math.max(isMobile ? 0.6 : 0.7, 1 - Math.abs(distance) / (window.innerWidth * 1.6));
          const z = -Math.abs(distance) * (isMobile ? 0.1 : 0.4);

          gsap.set(item, { 
            rotationY: rotation, 
            scale: scale, 
            z: z,
            transformPerspective: isMobile ? 400 : 1200
          });
        });
      };

      gsap.ticker.add(updateCoverflow);
      
      return () => {
        gsap.ticker.remove(updateCoverflow);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current) {
          st.kill();
        }
      });
      ScrollTrigger.refresh();
    };
  }, [viewportWidth, isMobile]);

  return (
    <section ref={sectionRef} id="connect-section" className="connect-section">
      <div className="hero-heading">
        <h2 className="heading-mask">
          <span ref={headingLineRef} className="heading-line">
            Let&rsquo;s connect
          </span>
        </h2>
        <div data-scroll-reveal className="top-bar-right">
          <a href="#" className="view-all-btn">
            View all
          </a>
          <span className="icon-btn" aria-hidden="true">
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

      <div className="viewport-container">
        <div ref={trackRef} className="track">
          {GALLERY_ITEMS.map((src, i) => (
            <div key={src} className="gallery-item">
              <div className="clay-box">
                <img 
                  src={src} 
                  alt={`PKR Estate ${i + 1}`} 
                  className="item-image"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div data-scroll-reveal className="form-container">
        <form onSubmit={(e) => e.preventDefault()} className="form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email*"
              required
              className="email-input"
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
        <p className="disclaimer">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>

      <style jsx>{`
        .connect-section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 100vh;
          padding: 0;
          background: #ffffff;
          overflow: hidden;
          box-sizing: border-box;
        }

        .hero-heading {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 24px;
          text-align: center;
          padding: 4rem 6vw 3rem;
          width: 100%;
          box-sizing: border-box;
          background: #ffffff;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }

        .heading-mask {
          margin: 0;
          overflow: hidden;
          flex: 1 1 auto;
          min-width: 300px;
        }

        .heading-line {
          display: inline-block;
          font-family: 'Figtree', 'Segoe UI', sans-serif;
          font-weight: 500;
          font-size: 5.5rem;
          letter-spacing: -0.02em;
          color: #171412;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .top-bar-right {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 0 0 auto;
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          padding: 0.7em 1.3em;
          border-radius: 999px;
          background-color: #f0f0f0;
          color: #171412;
          font-family: 'Figtree', 'Segoe UI', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background-color: #f0f0f0;
          color: #171412;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .viewport-container {
          width: 100%;
          height: 480px;
          perspective: 1200px;
          display: flex;
          align-items: center;
          overflow: hidden;
          margin-bottom: 3rem;
          background: #ffffff;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        /* White fade effect */
        .viewport-container::before,
        .viewport-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 12%;
          z-index: 10;
          pointer-events: none;
        }

        .viewport-container::before {
          left: 0;
          background: linear-gradient(to right, #ffffff, transparent);
        }

        .viewport-container::after {
          right: 0;
          background: linear-gradient(to left, #ffffff, transparent);
        }

        .track {
          display: flex;
          align-items: center;
          gap: 40px;
          padding: 0 25vw;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .gallery-item {
          position: relative;
          flex: 0 0 420px;
          height: 440px;
          transform-style: preserve-3d;
          cursor: pointer;
          transition: transform 0.1s ease-out;
        }

        .clay-box {
          width: 100%;
          height: 100%;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 12px 12px 24px #d9d0bd, -12px -12px 24px #ffffff, 
                      inset 4px 4px 8px rgba(255,255,255,0.8), 
                      inset -4px -4px 8px rgba(0,0,0,0.05);
          border: 2px solid rgba(0,0,0,0.06);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
          filter: saturate(0.9) contrast(1.1);
          pointer-events: none;
          user-select: none;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 500px;
          padding: 0 1.5rem 3rem;
          box-sizing: border-box;
          background: #ffffff;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }

        .form {
          width: 100%;
        }

        .input-group {
          display: flex;
          width: 100%;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 12px 12px 24px #d9d0bd, -12px -12px 24px #ffffff, 
                      inset 4px 4px 8px rgba(255,255,255,0.8), 
                      inset -4px -4px 8px rgba(0,0,0,0.05);
          padding: 8px;
          margin-bottom: 1.5rem;
          border: 2px solid rgba(0,0,0,0.06);
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        .email-input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          outline: none;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-family: 'Figtree', 'Segoe UI', sans-serif;
          color: #171412;
          font-weight: 500;
        }

        .email-input::placeholder {
          color: rgba(23, 20, 18, 0.4);
        }

        .submit-btn {
          background: #171412;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-family: 'Figtree', 'Segoe UI', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0 2rem;
          min-height: 56px;
          box-shadow: 6px 6px 12px rgba(0,0,0,0.15), 
                      -6px -6px 12px rgba(255,255,255,0.1), 
                      inset 2px 2px 5px rgba(255,255,255,0.2);
          transition: all 0.3s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .submit-btn:hover {
          background: #2a2522;
          transform: scale(1.02);
        }

        .view-all-btn:hover {
          background: #e5e5e5;
          transform: scale(1.02);
        }

        .icon-btn:hover {
          background: #e5e5e5;
          transform: scale(1.02);
        }

        .disclaimer {
          font-family: 'Figtree', 'Segoe UI', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: rgba(23, 20, 18, 0.55);
          text-align: center;
          margin: 0;
        }

        /* ========== MOBILE RESPONSIVE ========== */
        @media (max-width: 768px) {
          .connect-section {
            min-height: auto;
            padding: 0;
            overflow: visible;
          }

          .hero-heading {
            gap: 10px;
            padding: 1.5rem 4vw 1.5rem;
          }

          .heading-mask {
            min-width: auto;
            flex: 1 1 100%;
          }

          .heading-line {
            font-size: 2.2rem;
            white-space: normal;
          }

          .top-bar-right {
            gap: 8px;
            width: 100%;
            justify-content: flex-end;
          }

          .view-all-btn {
            padding: 0.4em 0.8em;
            font-size: 0.65rem;
          }

          .icon-btn {
            width: 28px;
            height: 28px;
          }

          .icon-btn svg {
            width: 10px;
            height: 10px;
          }

          .viewport-container {
            height: 280px;
            margin-bottom: 1.5rem;
            background: #ffffff;
            overflow: visible;
            perspective: none;
          }

          .viewport-container::before,
          .viewport-container::after {
            display: none !important;
          }

          .track {
            gap: 16px;
            padding: 0 12vw;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            flex-wrap: nowrap;
            width: 100%;
          }

          .track::-webkit-scrollbar {
            display: none;
          }

          .gallery-item {
            flex: 0 0 180px;
            height: 220px;
            scroll-snap-align: center;
          }

          .clay-box {
            padding: 6px;
            box-shadow: 8px 8px 16px #d9d0bd, -8px -8px 16px #ffffff,
                        inset 3px 3px 6px rgba(255,255,255,0.8),
                        inset -3px -3px 6px rgba(0,0,0,0.05);
          }

          .form-container {
            max-width: 100%;
            padding: 0 1rem 1.5rem;
          }

          .input-group {
            flex-direction: column;
            padding: 5px;
            box-shadow: 8px 8px 16px #d9d0bd, -8px -8px 16px #ffffff,
                        inset 3px 3px 6px rgba(255,255,255,0.8),
                        inset -3px -3px 6px rgba(0,0,0,0.05);
            margin-bottom: 1rem;
          }

          .email-input {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
            width: 100%;
          }

          .submit-btn {
            width: 100%;
            padding: 0.7rem 1.5rem;
            font-size: 0.7rem;
            min-height: 40px;
            margin-top: 4px;
          }

          .disclaimer {
            font-size: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .hero-heading {
            padding: 1rem 3vw 1rem;
            gap: 6px;
          }

          .heading-line {
            font-size: 1.6rem;
          }

          .view-all-btn {
            padding: 0.3em 0.6em;
            font-size: 0.55rem;
          }

          .icon-btn {
            width: 24px;
            height: 24px;
          }

          .icon-btn svg {
            width: 8px;
            height: 8px;
          }

          .viewport-container {
            height: 200px;
            margin-bottom: 1rem;
            background: #ffffff;
          }

          .track {
            gap: 12px;
            padding: 0 8vw;
          }

          .gallery-item {
            flex: 0 0 130px;
            height: 160px;
          }

          .clay-box {
            padding: 4px;
            box-shadow: 6px 6px 12px #d9d0bd, -6px -6px 12px #ffffff,
                        inset 2px 2px 4px rgba(255,255,255,0.8),
                        inset -2px -2px 4px rgba(0,0,0,0.05);
            border-radius: 6px;
          }

          .form-container {
            padding: 0 0.8rem 1rem;
          }

          .input-group {
            padding: 4px;
            border-radius: 6px;
          }

          .email-input {
            padding: 0.5rem 0.7rem;
            font-size: 0.7rem;
          }

          .submit-btn {
            font-size: 0.6rem;
            min-height: 34px;
            padding: 0.4rem 0.8rem;
          }

          .disclaimer {
            font-size: 0.5rem;
          }
        }

        @media (max-width: 375px) {
          .hero-heading {
            padding: 0.8rem 2vw 0.8rem;
          }

          .heading-line {
            font-size: 1.3rem;
          }

          .viewport-container {
            height: 160px;
            margin-bottom: 0.8rem;
            background: #ffffff;
          }

          .track {
            gap: 8px;
            padding: 0 5vw;
          }

          .gallery-item {
            flex: 0 0 100px;
            height: 130px;
          }

          .form-container {
            padding: 0 0.5rem 0.8rem;
          }

          .email-input {
            padding: 0.4rem 0.6rem;
            font-size: 0.6rem;
          }

          .submit-btn {
            font-size: 0.55rem;
            min-height: 30px;
            padding: 0.3rem 0.6rem;
          }
        }

        /* Tablet landscape - keep fade */
        @media (min-width: 769px) and (max-width: 1024px) {
          .gallery-item {
            flex: 0 0 320px;
            height: 360px;
          }

          .track {
            gap: 28px;
            padding: 0 20vw;
          }

          .viewport-container {
            height: 400px;
          }

          .viewport-container::before,
          .viewport-container::after {
            width: 10%;
          }
        }

        /* Large screens */
        @media (min-width: 1920px) {
          .viewport-container {
            height: 600px;
            max-height: 600px;
          }

          .gallery-item {
            flex: 0 0 480px;
            height: 500px;
          }
        }

        @media (min-width: 2560px) {
          .viewport-container {
            height: 700px;
            max-height: 700px;
          }

          .gallery-item {
            flex: 0 0 560px;
            height: 580px;
          }

          .track {
            gap: 64px;
            padding: 0 32vw;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}