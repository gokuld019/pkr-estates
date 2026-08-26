"use client";
/**
 * ProjectDetail.js
 *
 * Section 1 — project name hero
 * Section 2 — two-image showcase
 * Section 3 — wide full-bleed image
 * Section 4 — "Spotlight" horizontal scroll section. Pinned full-viewport,
 *              scrubs through four panels (Overview / Highlights & Masterplan /
 *              Pricing / Masterplan Layout) one per scroll-length.
 * Section 5 — "Location" parallax map section. Sleek light map card with
 *              floating pin, parallax-scaling background, and a location
 *              info panel — matches the Spotlight card language.
 * Section 6 — "Nearby Landmarks" newsroom-style carousel. Horizontally
 *              scrollable row of landmark cards with image, category tag,
 *              name, and distance — left/right nav arrows.
 */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PLOT_PRICING = [
  { type: "1 BHK", dimensions: "391–460 sq.ft", perSqYd: "₹22 Lacs", total: "₹22 Lacs" },
  { type: "2 BHK", dimensions: "730–732 sq.ft", perSqYd: "₹42 Lacs", total: "₹42 Lacs" },
  { type: "3 BHK Villa", dimensions: "1,138–1,217 sq.ft", perSqYd: "₹75 Lacs", total: "₹75 Lacs" },
  { type: "2 BHK Villa", dimensions: "924–936 sq.ft", perSqYd: "₹55 Lacs", total: "₹55 Lacs" },
];

const HIGHLIGHTS = [
  "90 Elegantly Crafted Apartments",
  "Stilt + 5 Floors Design Structure",
  "12 Contemporary Modern Villas",
  "1, 2 & 3 BHK Unit Plans",
  "100% Vaastu Compliant Homes",
  "Surrounded by IT/ITES Companies",
  "Schools, Colleges & Hospitals Nearby",
  "Gated Community with CCTV",
];

// Each panel = light info card (left) + dark wordmark card (right)
const SPOTLIGHT_PANELS = [
  {
    key: "overview",
    eyebrow: "PROJECT DETAILS",
    heading: "Built for how\nfamilies actually live.",
    body:
      "Located in the Guduvancheri neighbourhood of the South-Eastern Suburbs of Chennai, Gurudev is a residential community consisting of 90 thoughtfully crafted Apartments & 12 Independent Villas for a living experience that is a class apart.",
    statLine: "90 Apartments · 12 Villas",
    statSub: "CMDA & RERA Approved",
    ctaLabel: "Enquire Now",
    word: "Gurudev",
    quote:
      "Gurudev offers a serene, high-quality lifestyle that is in perfect harmony with your preferences and expectations. You have a choice of one, two, and three bedroom homes.",
    quoteName: "Location",
    quoteRole: "Guduvancheri, Chennai",
    quoteTag: "CHENNAI",
  },
  {
    key: "highlights",
    eyebrow: "MASTERPLAN & FEATURES",
    heading: "Every detail\nplanned in advance.",
    body:
      "Elegantly crafted 90 apartments with Stilt + 5 floors design structure and 12 contemporary modern villas. Thoughtfully designed 1, 2 & 3 BHK unit plans with 100% vaastu compliant homes with zero dead space.",
    statLine: "8 / 8 Amenities Delivered",
    statSub: "Gated Community · CCTV · STP",
    ctaLabel: "Download Brochure",
    word: "Masterplan",
    quote:
      "Contemporary styled villas with G+1 structure, surrounded by prominent IT/ITES companies, schools, colleges and hospitals.",
    quoteName: "Highlights",
    quoteRole: "Gated Community",
    quoteTag: "8 FEATURES",
  },
  {
    key: "pricing",
    eyebrow: "UNIT SIZES & COST",
    heading: "Transparent pricing,\nno hidden costs.",
    body:
      "Choose from 1 BHK, 2 BHK apartments and 2 & 3 BHK villas. Starting at ₹22 Lacs onwards with up to 90% financing through our banking partners.",
    statLine: "₹22 Lacs Onwards*",
    statSub: "1 BHK · 391–460 sq.ft",
    ctaLabel: "Check Availability",
    word: "Pricing",
    quote:
      "Four unit types, one transparent rate. What you see in the price sheet is what you pay — financing partners handle the rest.",
    quoteName: "Finance",
    quoteRole: "Up to 90% Bank Loan",
    quoteTag: "5 BANKS",
  },
  {
    key: "masterplan-layout",
    eyebrow: "SITE LAYOUT",
    word: "Masterplan Layout",
    body:
      "Block A features 1 & 2 BHK apartments with stilt + 5 floors. Block B features 2 & 3 BHK villas with G+1 structure. Block C features 3 BHK villas with G+1 structure. All units are 100% vaastu compliant with zero dead space.",
    quoteTag: "BLOCK A · B · C",
  },
];

// ---- Location / map data ----
const LOCATION = {
  name: "Gurudev",
  address: "Guduvancheri, Chennai South, Tamil Nadu",
  lat: 12.8453,
  lng: 80.0608,
  distances: [
    { label: "Guduvancheri Railway Station", value: "5 mins" },
    { label: "GST Road", value: "5 mins" },
    { label: "Urapakkam", value: "10 mins" },
    { label: "Tambaram", value: "20 mins" },
    { label: "Chennai International Airport", value: "30 mins" },
  ],
};

// ---- Nearby landmarks (Section 6) ----
const LANDMARKS = [
  {
    tag: "RAILWAY",
    name: "Guduvancheri Railway Station",
    distance: "5 mins",
    image: "/guduvanchery.jpeg",
  },
  {
    tag: "HIGHWAY",
    name: "GST Road (NH-45)",
    distance: "5 mins",
    image: "/gst.jpeg",
  },
  {
    tag: "EDUCATION",
    name: "SRM University",
    distance: "8 mins",
    image: "/srm.jpeg",
  },
  {
    tag: "EDUCATION",
    name: "VIT University",
    distance: "20 mins",
    image: "/vit.jpeg",
  },
  {
    tag: "EDUCATION",
    name: "Velammal Vidhyashram CBSE",
    distance: "2 mins",
    image: "/velammal.jpeg",
  },
  {
    tag: "HEALTHCARE",
    name: "Shri Sathya Sai Medical College",
    distance: "10 mins",
    image: "/healthcare.jpeg",
  },
  {
    tag: "IT PARK",
    name: "Siruseri IT Park",
    distance: "15 mins",
    image: "/siruseri.jpeg",
  },
];

export default function ProjectDetail({
  name = "Gurudev",
  tagline = "A RESIDENCE BUILT ON QUIET DETAIL AND LASTING MATERIAL.",
  label = "FOUNDATION",
  index = "01",
  images = {
    detail: "/gurudev.jpeg",
    full: "/gurudev.jpeg",
  },
  masterplanImage = "/masterplan.jpg",
  mapImage = "/map-satellite.jpg",
  location = LOCATION,
  landmarks = LANDMARKS,
}) {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  const dotRefs = useRef([]);
  const [activePanel, setActivePanel] = useState(0);

  const mapSectionRef = useRef(null);
  const mapBgRef = useRef(null);
  const mapPinRef = useRef(null);

  const landmarkTrackRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const getScrollLength = () =>
        Math.max(0, stripRef.current.scrollWidth - stripRef.current.offsetWidth);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        start: "top top",
        end: () => `+=${getScrollLength()}`,
        invalidateOnRefresh: true,
        animation: gsap.to(stripRef.current, {
          x: () => -getScrollLength(),
          ease: "none",
        }),
        onUpdate: (self) => {
          const active = Math.round(self.progress * (SPOTLIGHT_PANELS.length - 1));
          setActivePanel(active);
          dotRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = i === active ? "1" : "0.35";
            el.style.width = i === active ? "28px" : "8px";
          });
        },
      });

      // Re-measure once images/fonts finish loading so scrollWidth (and thus
      // the pin distance / end point) is accurate — this fixes both the
      // stutter and the trailing blank gap that were caused by ScrollTrigger
      // computing the end point before images had finished loading.
      const imgs = sectionRef.current.querySelectorAll("img");
      let pending = imgs.length;
      const onLoad = () => {
        pending -= 1;
        if (pending <= 0) ScrollTrigger.refresh();
      };
      if (imgs.length === 0) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      } else {
        imgs.forEach((img) => {
          if (img.complete) onLoad();
          else {
            img.addEventListener("load", onLoad, { once: true });
            img.addEventListener("error", onLoad, { once: true });
          }
        });
      }
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      gsap.fromTo(
        sectionRef.current.querySelectorAll("[data-fade]"),
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // ---- Section 5: Location parallax map ----
      if (mapSectionRef.current && mapBgRef.current) {
        gsap.fromTo(
          mapBgRef.current,
          { yPercent: -8, scale: 1.15 },
          {
            yPercent: 8,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: mapSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );

        if (mapPinRef.current) {
          gsap.to(mapPinRef.current, {
            y: -10,
            duration: 1.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }

        gsap.fromTo(
          mapSectionRef.current.querySelectorAll("[data-map-fade]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: mapSectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      // ---- Section 6: Nearby landmarks fade-in ----
      const landmarkSection = landmarkTrackRef.current?.closest("[data-landmark-section]");
      if (landmarkSection) {
        gsap.fromTo(
          landmarkSection.querySelectorAll("[data-landmark-fade]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: landmarkSection,
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const mapEmbedSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=13&output=embed`;
  const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;

  const scrollLandmarks = (dir) => {
    const track = landmarkTrackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector("[data-landmark-card]")?.offsetWidth || 380;
    track.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  };

  return (
    <main style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');
        .pd-hero-title {
          font-family: 'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif;
        }
        .pd-showcase-img-wrap img { transition: transform 0.5s ease; }
        .pd-showcase-img-wrap:hover img { transform: scale(1.03); }

        .pd-spot-word {
          font-family: 'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif;
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 0.85;
          color: #ffffff;
          margin: 0;
          font-size: clamp(3.2rem, 8vw, 6.5rem);
          word-break: break-word;
        }
        .pd-spot-word--layout {
          font-size: clamp(2.2rem, 5.4vw, 4.2rem);
        }
        .pd-acc-table { width: 100%; border-collapse: collapse; }
        .pd-acc-table th, .pd-acc-table td {
          text-align: left;
          padding: 10px 12px;
          font-family: 'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
        }
        .pd-acc-table thead th {
          color: rgba(255,255,255,0.6);
          font-weight: 600;
          font-size: 0.66rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255,255,255,0.18);
        }
        .pd-acc-table tbody td {
          color: #ffffff;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        /* ---- Section 5: Location / map ---- */
        .pd-map-bg-img { transition: transform 0.6s ease; }
        .pd-map-pin-dot {
          animation: pdPinPulse 2.2s ease-out infinite;
        }
        @keyframes pdPinPulse {
          0% { transform: scale(0.6); opacity: 0.7; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .pd-map-distance-row {
          transition: background-color 0.25s ease, padding-left 0.25s ease;
        }
        .pd-map-distance-row:hover {
          background-color: rgba(0,0,0,0.04);
          padding-left: 6px;
        }
        .pd-map-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(244,99,58,0.35); }
        .pd-map-frame iframe { display: block; }

        /* ---- Section 6: Nearby landmarks ---- */
        .pd-lm-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .pd-lm-track::-webkit-scrollbar { display: none; }
        .pd-lm-card { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .pd-lm-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(20,19,19,0.08); }
        .pd-lm-card-img { transition: transform 0.6s ease; }
        .pd-lm-card:hover .pd-lm-card-img { transform: scale(1.05); }
        .pd-lm-nav-btn {
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .pd-lm-nav-btn:hover:not(:disabled) {
          background-color: #141313;
          color: #ffffff;
        }
        .pd-lm-nav-btn:active:not(:disabled) { transform: scale(0.94); }
        .pd-lm-view-all:hover { background-color: #0851a2; }

        @media (max-width: 720px) {
          .pd-showcase { flex-direction: column !important; }
          .pd-showcase-img-wrap { aspect-ratio: 4 / 3 !important; }
          .pd-hero-title { font-size: clamp(3.4rem, 18vw, 6rem) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pd-showcase-img-wrap img { transition: none !important; }
          .pd-map-pin-dot { animation: none !important; }
        }
      `}</style>

      {/* ================= SECTION 1 — PROJECT NAME ================= */}
      <section style={styles.hero} aria-label="Project name">
        <h1 className="pd-hero-title" style={styles.heroTitle}>{name}</h1>
        <p style={styles.heroTagline}>{tagline}</p>
        <div style={styles.heroMetaRow}>
          <div style={styles.heroMetaLeft}>
            <span style={styles.heroMetaLabel}>{label}</span>
            <span style={styles.heroMetaBar} aria-hidden="true" />
          </div>
          <span style={styles.heroMetaIndex}>/{index}</span>
        </div>
      </section>

      {/* ================= SECTION 2 — IMAGE SHOWCASE ================= */}
      <section className="pd-showcase" style={styles.showcase} aria-label="Project imagery">
        <div className="pd-showcase-img-wrap" style={styles.showcaseImgWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.detail} alt={`${name} — material detail`} style={styles.showcaseImg} />
        </div>
        <div className="pd-showcase-img-wrap" style={styles.showcaseImgWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.full} alt={`${name} — full view`} style={styles.showcaseImg} />
        </div>
      </section>

      {/* ================= SECTION 3 — WIDE FULL-BLEED IMAGE ================= */}
      <section style={styles.wideSection} aria-label="Project imagery wide">
        <div className="pd-showcase-img-wrap" style={styles.wideImgWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gurudev3.jpeg" alt={`${name} — wide view`} style={styles.showcaseImg} />
        </div>
      </section>

      {/* ================= SECTION 4 — SPOTLIGHT HORIZONTAL SCROLL ================= */}
      <section ref={sectionRef} style={styles.spotlightSection} aria-label="Gurudev">
        <div style={styles.spotlightHeadingRow} data-fade>
          <span style={styles.spotlightKicker}>PROJECT — GURUDEV</span>
          <div style={styles.progressRow}>
            {SPOTLIGHT_PANELS.map((p, i) => (
              <span key={p.key} ref={(el) => (dotRefs.current[i] = el)} style={styles.progressDot} />
            ))}
          </div>
        </div>

        <div style={styles.stripWrap}>
          <div ref={stripRef} style={styles.strip}>
            {SPOTLIGHT_PANELS.slice(0, 3).map((panel) => (
              <div key={panel.key} style={styles.panelPair}>
                {/* ---- LEFT: light info card ---- */}
                <div style={styles.lightCard}>
                  <span style={styles.lightCardRule} aria-hidden="true" />
                  <span style={styles.eyebrow}>{panel.eyebrow}</span>
                  <h3 style={styles.panelHeading}>
                    {panel.heading.split("\n").map((line, i) => (
                      <span key={i} style={styles.panelHeadingLine}>
                        {line}
                        {i === 0 ? <br /> : null}
                      </span>
                    ))}
                  </h3>
                  <p style={styles.panelBody}>{panel.body}</p>

                  <div style={styles.statBlock}>
                    <span style={styles.statLine}>{panel.statLine}</span>
                    <span style={styles.statSub}>{panel.statSub}</span>
                  </div>

                  <button type="button" style={styles.ctaBtn}>
                    {panel.ctaLabel}
                    <span style={styles.ctaArrow} aria-hidden="true">→</span>
                  </button>
                </div>

                {/* ---- RIGHT: dark wordmark card ---- */}
                <div style={styles.darkCard}>
                  <span style={styles.darkCardTexture} aria-hidden="true" />
                  <h3 className="pd-spot-word" style={styles.spotWord}>{panel.word}</h3>

                  {panel.key === "overview" && (
                    <div style={styles.quoteRow}>
                      <div style={styles.quoteImgWrap}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={images.detail} alt="Gurudev" style={styles.quoteImg} />
                      </div>
                      <div style={styles.quoteTextCol}>
                        <p style={styles.quoteText}>&ldquo;{panel.quote}&rdquo;</p>
                        <div style={styles.quoteFooterRow}>
                          <div>
                            <span style={styles.quoteName}>{panel.quoteName}</span>
                            <span style={styles.quoteRole}>{panel.quoteRole}</span>
                          </div>
                          <span style={styles.quoteTag}>{panel.quoteTag}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {panel.key === "highlights" && (
                    <div style={styles.quoteRow}>
                      <div style={styles.highlightsList}>
                        {HIGHLIGHTS.map((h) => (
                          <div key={h} style={styles.highlightRow}>
                            <span style={styles.highlightDot} aria-hidden="true" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                      <div style={styles.quoteTextCol}>
                        <p style={styles.quoteText}>&ldquo;{panel.quote}&rdquo;</p>
                        <div style={styles.quoteFooterRow}>
                          <div>
                            <span style={styles.quoteName}>{panel.quoteName}</span>
                            <span style={styles.quoteRole}>{panel.quoteRole}</span>
                          </div>
                          <span style={styles.quoteTag}>{panel.quoteTag}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {panel.key === "pricing" && (
                    <div style={styles.pricingBlock}>
                      <table className="pd-acc-table">
                        <thead>
                          <tr>
                            <th>Unit Type</th>
                            <th>Dimensions</th>
                            <th>Price</th>
                            <th>Starting From</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PLOT_PRICING.map((row) => (
                            <tr key={row.type}>
                              <td>{row.type}</td>
                              <td>{row.dimensions}</td>
                              <td>{row.perSqYd}</td>
                              <td>{row.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div style={styles.quoteFooterRow}>
                        <div>
                          <span style={styles.quoteName}>{panel.quoteName}</span>
                          <span style={styles.quoteRole}>{panel.quoteRole}</span>
                        </div>
                        <span style={styles.quoteTag}>{panel.quoteTag}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* ---- 4th panel: full-bleed Masterplan Layout, image centered ---- */}
            <div style={styles.layoutPanel}>
              <div style={styles.layoutCard}>
                <span style={styles.darkCardTexture} aria-hidden="true" />
                <div style={styles.layoutHeaderRow}>
                  <span style={styles.eyebrowDark}>{SPOTLIGHT_PANELS[3].eyebrow}</span>
                  <span style={styles.quoteTag}>{SPOTLIGHT_PANELS[3].quoteTag}</span>
                </div>
                <h3 className="pd-spot-word pd-spot-word--layout" style={styles.spotWord}>
                  {SPOTLIGHT_PANELS[3].word}
                </h3>

                <div style={styles.layoutImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={masterplanImage}
                    alt="Gurudev Masterplan"
                    style={styles.layoutImg}
                  />
                </div>

                <p style={styles.layoutBody}>{SPOTLIGHT_PANELS[3].body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5 — LOCATION PARALLAX MAP ================= */}
      <section ref={mapSectionRef} style={styles.mapSection} aria-label="Project location">
        {/* Parallax background layer */}
        <div style={styles.mapBgWrap} aria-hidden="true">
          <div ref={mapBgRef} className="pd-map-bg-img" style={styles.mapBgImgOuter}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mapImage} alt="" style={styles.mapBgImg} />
          </div>
          <div style={styles.mapBgOverlay} />
          <div style={styles.mapBgGrid} />
        </div>

        <div style={styles.mapContentWrap}>
          {/* CENTERED HEADING */}
          <div style={styles.mapHeadingRow} data-map-fade>
            <h2 style={styles.mapHeading}>Location</h2>
            <p style={styles.mapSubHeading}>Rooted in the right location.</p>
          </div>

          <div style={styles.mapGrid}>
            {/* ---- LEFT: embedded map card with floating pin ---- */}
            <div className="pd-map-frame" style={styles.mapFrameCard} data-map-fade>
              <div style={styles.mapPinOverlay}>
                <span ref={mapPinRef} style={styles.mapPin}>
                  <span style={styles.mapPinDotOuter}>
                    <span className="pd-map-pin-dot" style={styles.mapPinPulse} />
                    <span style={styles.mapPinDot} />
                  </span>
                </span>
              </div>
              <iframe
                title={`${location.name} location map`}
                src={mapEmbedSrc}
                style={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* ---- RIGHT: dark info card ---- */}
            <div style={styles.mapInfoCard} data-map-fade>
              <span style={styles.darkCardTexture} aria-hidden="true" />
              <div style={styles.mapInfoTop}>
                <span style={styles.eyebrowDark}>ADDRESS</span>
                <p style={styles.mapAddress}>{location.address}</p>
              </div>

              <div style={styles.mapDivider} aria-hidden="true" />

              <div style={styles.mapDistanceList}>
                {location.distances.map((d) => (
                  <div key={d.label} className="pd-map-distance-row" style={styles.mapDistanceRow}>
                    <span style={styles.mapDistanceLabel}>{d.label}</span>
                    <span style={styles.mapDistanceValue}>{d.value}</span>
                  </div>
                ))}
              </div>

              <div style={styles.mapCtaWrapper}>
                <a
                  href={mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.mapCta}
                >
                  Get Directions
                  <span style={styles.ctaArrow} aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6 — NEARBY LANDMARKS ================= */}
      <section style={styles.lmSection} aria-label="Nearby landmarks" data-landmark-section>
        <div style={styles.lmHeaderRow}>
          <div style={styles.lmHeaderLeft}>
            {/* <span style={styles.lmKicker} data-landmark-fade>
              <span style={styles.lmKickerDot} aria-hidden="true" />
              NEARBY LANDMARKS
            </span> */}
            <h2 style={styles.lmHeading} data-landmark-fade>NEARBY LANDMARKS</h2>

            <button type="button" className="pd-lm-view-all" style={styles.lmViewAllBtn} data-landmark-fade>
              View All
            </button>
          </div>

          <div style={styles.lmNavRow} data-landmark-fade>
            <button
              type="button"
              className="pd-lm-nav-btn"
              style={styles.lmNavBtn}
              onClick={() => scrollLandmarks(-1)}
              aria-label="Scroll landmarks left"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="pd-lm-nav-btn"
              style={styles.lmNavBtn}
              onClick={() => scrollLandmarks(1)}
              aria-label="Scroll landmarks right"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={landmarkTrackRef} className="pd-lm-track" style={styles.lmTrack} data-landmark-fade>
          {landmarks.map((lm, i) => (
            <div key={lm.name} className="pd-lm-card" style={styles.lmCard} data-landmark-card>
              <div style={styles.lmCardImgWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="pd-lm-card-img"
                  src={lm.image}
                  alt={lm.name}
                  style={styles.lmCardImg}
                />
              </div>
              <div style={styles.lmCardBody}>
                <span style={styles.lmCardTag}>{lm.tag}</span>
                <h3 style={styles.lmCardName}>{lm.name}</h3>
                <span style={styles.lmCardDistance}>{lm.distance} away</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "#ffffff",
    color: "#141313",
    overflowX: "hidden",
  },
  hero: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    padding: "clamp(2.5em, 6vw, 4.5em) clamp(1.25em, 4vw, 4em) clamp(2em, 4vw, 3em)",
    display: "flex",
    flexDirection: "column",
    paddingTop: "100px",
  },
  heroTitle: {
    margin: 0,
    padding: 0,
    fontWeight: 600,
    fontSize: "clamp(8rem, 17.5vw, 13rem)",
    lineHeight: 0.88,
    letterSpacing: "-0.045em",
    textTransform: "none",
    color: "#141313",
    width: "100%",
    textAlign: "center",
  },
  heroTagline: {
    margin: 0,
    marginTop: "0.6em",
    marginLeft: "600px",
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "1rem",
    fontWeight: 500,
    letterSpacing: "0.045em",
    textTransform: "uppercase",
    color: "#3a3a3a",
    lineHeight: 1.45,
  },
  heroMetaRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: "clamp(3em, 7vw, 5em)",
    borderTop: "1px solid rgba(20, 19, 19, 0.12)",
    paddingTop: "1.2em",
  },
  heroMetaLeft: { display: "flex", flexDirection: "column", gap: "0.6em" },
  heroMetaLabel: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.72rem",
    fontWeight: 400,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "rgba(20, 19, 19, 0.5)",
  },
  heroMetaBar: { display: "block", width: "1.8em", height: "3px", backgroundColor: "#0851a2" },
  heroMetaIndex: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.85rem",
    fontWeight: 400,
    color: "rgba(20, 19, 19, 0.28)",
    whiteSpace: "nowrap",
  },
  showcase: {
    display: "flex",
    width: "100%",
    minHeight: "70vh",
    gap: "clamp(12px, 1.6vw, 20px)",
    padding: "0 clamp(1.25em, 4vw, 4em)",
    boxSizing: "border-box",
  },
  showcaseImgWrap: { flex: "1 1 50%", minWidth: 0, height: "auto", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "16px" },
  showcaseImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  wideSection: {
    width: "100%",
    padding: "clamp(12px, 1.6vw, 20px) clamp(1.25em, 4vw, 4em) 0",
    boxSizing: "border-box",
  },
  wideImgWrap: { width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: "16px" },

  /* ---------- Section 4 — Spotlight horizontal scroll ---------- */
  spotlightSection: {
    position: "relative",
    height: "100vh",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    backgroundColor: "#fbfaf7",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "clamp(1.6em, 3vw, 2.4em) 0 0",
  },
  spotlightHeadingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 clamp(1.25em, 4vw, 4em)",
    marginBottom: "clamp(1em, 2.5vw, 1.6em)",
  },
  spotlightKicker: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(20,19,19,0.45)",
  },
  progressRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  progressDot: {
    display: "inline-block",
    height: "4px",
    width: "8px",
    borderRadius: "2px",
    backgroundColor: "#0851a2",
    opacity: 0.35,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  stripWrap: {
    position: "relative",
    flex: 1,
    minHeight: 0,
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    backgroundColor: "#fbfaf7",
  },
  strip: {
    display: "flex",
    flexWrap: "nowrap",
    height: "100%",
    willChange: "transform",
    backgroundColor: "#fbfaf7",
  },
  panelPair: {
    position: "relative",
    flex: "0 0 100%",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "stretch",
    gap: "clamp(28px, 3.2vw, 44px)",
    padding: "0 clamp(1.25em, 4vw, 4em) clamp(1.6em, 3vw, 2.6em)",
    boxSizing: "border-box",
    backgroundColor: "#fbfaf7",
  },

  /* Light card (left) */
  lightCard: {
    flex: "1 1 42%",
    minWidth: 0,
    backgroundColor: "#f2efe9",
    borderRadius: "20px",
    padding: "clamp(1.6em, 3vw, 2.6em) clamp(1.6em, 3vw, 2.4em)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "clamp(0.9em, 2vw, 1.3em)",
  },
  lightCardRule: {
    display: "block",
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(20,19,19,0.12)",
    marginBottom: "0.2em",
  },
  eyebrow: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(20,19,19,0.45)",
  },
  eyebrowDark: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.65)",
    position: "relative",
    zIndex: 1,
  },
  panelHeading: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(1.7rem, 3.4vw, 2.5rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.02em",
    color: "#141313",
  },
  panelHeadingLine: { display: "inline" },
  panelBody: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400,
    fontSize: "clamp(0.85rem, 1vw, 0.98rem)",
    lineHeight: 1.6,
    color: "#5a5a57",
    maxWidth: "480px",
  },
  statBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statLine: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
    color: "#0851a2",
    letterSpacing: "-0.01em",
  },
  statSub: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400,
    fontSize: "0.82rem",
    color: "#8a8a86",
  },
  ctaBtn: {
    alignSelf: "flex-start",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "0.95em 1.7em",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#0851a2",
    color: "#ffffff",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600,
    fontSize: "0.8rem",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  ctaArrow: { fontSize: "0.95rem" },

  /* Dark card (right) */
  darkCard: {
    position: "relative",
    flex: "1 1 58%",
    minWidth: 0,
    backgroundColor: "#3d3f40",
    borderRadius: "20px",
    padding: "clamp(1.8em, 3.4vw, 2.8em) clamp(1.8em, 3.4vw, 2.8em)",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  darkCardTexture: {
    position: "absolute",
    inset: 0,
    backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
    backgroundSize: "5px 5px",
    pointerEvents: "none",
  },
  spotWord: {
    position: "relative",
    zIndex: 1,
  },

  quoteRow: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(14px, 2vw, 22px)",
    marginTop: "clamp(1em, 2.4vw, 1.8em)",
  },
  quoteImgWrap: {
    flex: "0 0 auto",
    width: "clamp(72px, 8vw, 108px)",
    height: "clamp(90px, 10vw, 132px)",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#55575a",
  },
  quoteImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  quoteTextCol: { flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", gap: "clamp(0.7em, 1.6vw, 1.1em)" },
  quoteText: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400,
    fontSize: "clamp(0.85rem, 1.15vw, 1.02rem)",
    lineHeight: 1.55,
    color: "#ffffff",
  },
  quoteFooterRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },
  quoteName: {
    display: "block",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#ffffff",
  },
  quoteRole: {
    display: "block",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400,
    fontSize: "0.76rem",
    color: "rgba(255,255,255,0.6)",
    marginTop: "2px",
  },
  quoteTag: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: "#050505",
    backgroundColor: "#ffffff",
    borderRadius: "999px",
    padding: "6px 12px",
    whiteSpace: "nowrap",
    flex: "0 0 auto",
  },

  highlightsList: {
    flex: "0 0 auto",
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: "8px",
    minWidth: "180px",
  },
  highlightRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400,
    fontSize: "0.78rem",
    color: "#ffffff",
  },
  highlightDot: {
    display: "block",
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    flex: "0 0 auto",
  },

  pricingBlock: {
    position: "relative",
    zIndex: 1,
    marginTop: "clamp(1em, 2.4vw, 1.8em)",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(1em, 2.2vw, 1.6em)",
  },

  /* ---------- 4th panel: Masterplan Layout (full-width, centered image) ---------- */
  layoutPanel: {
    position: "relative",
    flex: "0 0 100%",
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "0 clamp(1.25em, 4vw, 4em) clamp(1.6em, 3vw, 2.6em)",
    boxSizing: "border-box",
    backgroundColor: "#fbfaf7",
  },
  layoutCard: {
    position: "relative",
    width: "100%",
    backgroundColor: "#3d3f40",
    borderRadius: "20px",
    padding: "clamp(1.6em, 3vw, 2.4em) clamp(1.8em, 3.4vw, 2.8em) clamp(1.4em, 2.6vw, 2em)",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(0.9em, 1.8vw, 1.3em)",
  },
  layoutHeaderRow: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  layoutImgWrap: {
    position: "relative",
    zIndex: 1,
    flex: 1,
    minHeight: 0,
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    borderRadius: "14px",
    overflow: "hidden",
    backgroundColor: "#55575a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  layoutImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  layoutBody: {
    position: "relative",
    zIndex: 1,
    margin: "0 auto",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400,
    fontSize: "clamp(0.8rem, 1vw, 0.92rem)",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.8)",
    maxWidth: "900px",
    textAlign: "center",
  },

  /* ---------- Section 5 — Location parallax map ---------- */
  mapSection: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "clamp(4em, 8vw, 7em) 0",
  },
  mapBgWrap: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
  },
  mapBgImgOuter: {
    position: "absolute",
    inset: "-10%",
    width: "120%",
    height: "120%",
  },
  mapBgImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    filter: "grayscale(0.2) brightness(0.9)",
  },
  mapBgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.85) 60%, #ffffff 100%)",
  },
  mapBgGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
  },
  mapContentWrap: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    boxSizing: "border-box",
    padding: "0 clamp(1.25em, 4vw, 4em)",
    margin: "0 auto",
  },
  mapHeadingRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "0.3em",
    marginBottom: "clamp(2em, 4vw, 3em)",
  },
  mapHeading: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: "#141313",
    maxWidth: "100%",
    textAlign: "center",
  },
  mapSubHeading: {
    margin: 0,
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.85rem",
    fontWeight: 400,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "rgba(20,19,19,0.5)",
    textAlign: "center",
  },
  mapGrid: {
    display: "flex",
    alignItems: "stretch",
    gap: "clamp(16px, 2vw, 28px)",
    flexWrap: "wrap",
  },
  mapFrameCard: {
    position: "relative",
    flex: "1 1 55%",
    minWidth: "300px",
    minHeight: "440px",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.08)",
    backgroundColor: "#f5f5f5",
  },
  mapIframe: {
    width: "100%",
    height: "100%",
    minHeight: "440px",
    border: "0",
    filter: "grayscale(0.3) contrast(1.05) brightness(1.05)",
  },
  mapPinOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    zIndex: 2,
  },
  mapPin: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mapPinDotOuter: {
    position: "relative",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mapPinPulse: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    backgroundColor: "#0851a2",
  },
  mapPinDot: {
    position: "relative",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "#0851a2",
    border: "3px solid #ffffff",
    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
  },
  mapInfoCard: {
    position: "relative",
    flex: "1 1 35%",
    minWidth: "280px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "clamp(1.8em, 3vw, 2.4em)",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "clamp(1.2em, 2.4vw, 1.8em)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
  },
  mapInfoTop: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.6em",
  },
  mapAddress: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600,
    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    color: "#141313",
  },
  mapDivider: {
    position: "relative",
    zIndex: 1,
    height: "1px",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  mapDistanceList: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  mapDistanceRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 4px",
    borderRadius: "8px",
  },
  mapDistanceLabel: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400,
    fontSize: "0.86rem",
    color: "rgba(20,19,19,0.72)",
  },
  mapDistanceValue: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600,
    fontSize: "0.86rem",
    color: "#141313",
    whiteSpace: "nowrap",
  },
  mapCtaWrapper: {
    position: "relative",
    zIndex: 1,
    alignSelf: "flex-start",
  },
  mapCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "0.95em 1.7em",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#0851a2",
    color: "#ffffff",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600,
    fontSize: "0.8rem",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },

  /* ---------- Section 6 — Nearby landmarks (newsroom-style carousel) ---------- */
  lmSection: {
    position: "relative",
    width: "100%",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    padding: "clamp(3.5em, 7vw, 6em) clamp(1.25em, 4vw, 4em) clamp(4em, 7vw, 6em)",
  },
  lmHeaderRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: "clamp(2em, 4vw, 3em)",
    gap: "1.5em",
    flexWrap: "wrap",
  },
  lmHeaderLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.5em",
  },
  lmKicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(20,19,19,0.55)",
  },
  lmKickerDot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    backgroundColor: "#0851a2",
    transform: "rotate(45deg)",
  },
  lmHeading: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
    lineHeight: 1,
    letterSpacing: "-0.035em",
    color: "#141313",
  },
  lmViewAllBtn: {
    marginTop: "0.6em",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.85em 1.8em",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#141313",
    color: "#ffffff",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600,
    fontSize: "0.85rem",
    letterSpacing: "0.01em",
    cursor: "pointer",
  },
  lmNavRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: "0 0 auto",
  },
  lmNavBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "1px solid rgba(20,19,19,0.12)",
    backgroundColor: "#f2efe9",
    color: "#141313",
    cursor: "pointer",
  },
  lmTrack: {
    display: "flex",
    gap: "clamp(16px, 2vw, 28px)",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    paddingBottom: "0.5em",
  },
  lmCard: {
    position: "relative",
    flex: "0 0 auto",
    width: "clamp(280px, 26vw, 380px)",
    scrollSnapAlign: "start",
    borderRadius: "18px",
    overflow: "hidden",
    border: "1px solid rgba(20,19,19,0.08)",
    backgroundColor: "#fbfaf7",
    cursor: "default",
  },
  lmCardImgWrap: {
    width: "100%",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    backgroundColor: "#e7e3db",
  },
  lmCardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  lmCardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6em",
    padding: "1.4em 1.5em 1.7em",
  },
  lmCardTag: {
    alignSelf: "flex-start",
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.66rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#0851a2",
    backgroundColor: "rgba(244,99,58,0.1)",
    borderRadius: "999px",
    padding: "5px 12px",
  },
  lmCardName: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600,
    fontSize: "1.15rem",
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    color: "#141313",
  },
  lmCardDistance: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400,
    fontSize: "0.82rem",
    color: "rgba(20,19,19,0.5)",
  },
};