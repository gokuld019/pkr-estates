"use client";
/**
 * ProjectDetail.js
 *
 * Section 1 — project name hero
 * Section 2 — two-image showcase
 * Section 3 — wide full-bleed image
 * Section 4 — "Spotlight" horizontal scroll section
 * Section 5 — "360° Site View" cinematic section (REBUILT)
 * Section 6 — "Location" parallax map section
 * Section 7 — "Nearby Landmarks" newsroom-style carousel
 */
import { useEffect, useRef, useState, useCallback } from "react";
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

const AMENITIES = [
  { label: "Shops", icon: "shop" },
  { label: "Security Cabin with CCTV", icon: "cctv" },
  { label: "Children Play Area", icon: "play" },
  { label: "Walking Track", icon: "track" },
  { label: "Park", icon: "park" },
  { label: "Avenue Trees", icon: "tree" },
  { label: "Elevator", icon: "elevator" },
  { label: "Sewage Treatment Plant (STP)", icon: "stp" },
  { label: "Car Parking", icon: "parking" },
];

const SPECIFICATION_HIGHLIGHTS = [
  { label: "Structure", value: "RCC framed, seismic compliant (Zone 3)" },
  { label: "Flooring", value: "Vitrified tiles 600x600mm — Foyer, Living, Bedrooms" },
  { label: "Kitchen", value: "600mm granite platform, single-bowl quartz sink" },
  { label: "Doors", value: "Teak wood main door, engineered bedroom doors" },
  { label: "Windows", value: "UPVC / powder-coated aluminium, MS grills" },
  { label: "Electrical", value: "3-phase supply, MCB & ELCB, modular switches" },
  { label: "Lift", value: "6-passenger automatic elevator" },
  { label: "Safety", value: "CCTV surveillance at all pivotal locations" },
];

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

const LANDMARKS = [
  { tag: "RAILWAY", name: "Guduvancheri Railway Station", distance: "5 mins", image: "/guduvanchery.jpeg" },
  { tag: "HIGHWAY", name: "GST Road (NH-45)", distance: "5 mins", image: "/gst.jpeg" },
  { tag: "EDUCATION", name: "SRM University", distance: "8 mins", image: "/srm.jpeg" },
  { tag: "EDUCATION", name: "VIT University", distance: "20 mins", image: "/vit.jpeg" },
  { tag: "EDUCATION", name: "Velammal Vidhyashram CBSE", distance: "2 mins", image: "/velammal.jpeg" },
  { tag: "HEALTHCARE", name: "Shri Sathya Sai Medical College", distance: "10 mins", image: "/healthcare.jpeg" },
  { tag: "IT PARK", name: "Siruseri IT Park", distance: "15 mins", image: "/siruseri.jpeg" },
];

/* ---- Inline SVG icon set for amenities ---- */
function AmenityIcon({ name }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "shop":
      return (<svg {...common}><path d="M3 9l1.5-5h15L21 9" /><path d="M3 9h18v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" /><path d="M9 20v-6h6v6" /></svg>);
    case "cctv":
      return (<svg {...common}><path d="M3 7l11-3v4L3 11V7z" /><rect x="14" y="6" width="7" height="5" rx="1" /><path d="M9 11v3a3 3 0 003 3" /><circle cx="18" cy="19" r="1.4" /></svg>);
    case "play":
      return (<svg {...common}><circle cx="12" cy="6" r="2" /><path d="M5 21l4-8 3 3 3-3 4 8" /><path d="M9 13l-2 3M15 13l2 3" /></svg>);
    case "track":
      return (<svg {...common}><path d="M4 18c4-10 12-10 16 0" /><path d="M4 18h16" /><path d="M8 18c2-6 6-6 8 0" /></svg>);
    case "park":
      return (<svg {...common}><path d="M12 2l5 8h-3l4 6h-4v6h-4v-6H6l4-6H7l5-8z" /></svg>);
    case "tree":
      return (<svg {...common}><circle cx="12" cy="8" r="5" /><path d="M12 13v8" /><path d="M9 21h6" /></svg>);
    case "elevator":
      return (<svg {...common}><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M10 9l2-2 2 2" /><path d="M10 15l2 2 2-2" /></svg>);
    case "stp":
      return (<svg {...common}><path d="M4 12a8 8 0 0116 0" /><path d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" /><path d="M9 16h6" /><path d="M12 4v4" /></svg>);
    case "parking":
      return (<svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 16V8h3.5a2.5 2.5 0 010 5H9" /></svg>);
    default:
      return (<svg {...common}><circle cx="12" cy="12" r="9" /></svg>);
  }
}

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
  siteView = {
    kicker: "(Site Preview)",
    heading: "360° View",
    image: "/360.png",
    quote: "Step inside Gurudev before it's built — explore the site in a full 360-degree cinematic view.",
    name: "Site Walkthrough",
    role: "Guduvancheri, Chennai",
  },
}) {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  const dotRefs = useRef([]);
  const [activePanel, setActivePanel] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const mapSectionRef = useRef(null);
  const mapBgRef = useRef(null);
  const mapPinRef = useRef(null);

  const landmarkTrackRef = useRef(null);

  /* ---- Section 5: 360 site view refs/state ---- */
  const siteSectionRef = useRef(null);
  const siteHeadingRef = useRef(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerLoaded, setViewerLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [heading, setHeading] = useState(0); // 0..360 for compass readout

  const sceneRef = useRef(null);
  const trackRef = useRef(null);
  const progressFillRef = useRef(null);
  const compassRef = useRef(null);

  // engine state
  const engine = useRef({
    offset: 0,        // px, negative = looking right
    velocity: 0,      // px/frame
    dragging: false,
    pointerId: null,
    lastX: 0,
    startX: 0,
    startOffset: 0,
    tileW: 1,         // width of one full panorama tile
    raf: null,
    lastTs: 0,
    auto: true,
    keys: { left: false, right: false },
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const getScrollLength = () =>
          Math.max(0, stripRef.current.scrollWidth - stripRef.current.offsetWidth);

        const st = ScrollTrigger.create({
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

        return () => st.kill();
      });

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
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      if (!window.matchMedia("(min-width: 900px)").matches) {
        gsap.utils.toArray(".pd-panel-pair, .pd-layout-panel").forEach((panel) => {
          gsap.fromTo(panel, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 88%", once: true },
          });
        });
      }

      // ---- Section 5 scroll animations ----
      if (siteSectionRef.current) {
        if (siteHeadingRef.current) {
          gsap.fromTo(siteHeadingRef.current,
            { yPercent: 14, opacity: 0.1 },
            {
              yPercent: -14, opacity: 0.38, ease: "none",
              scrollTrigger: { trigger: siteSectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
            }
          );
        }

        gsap.fromTo(
          siteSectionRef.current.querySelectorAll("[data-site-fade]"),
          { opacity: 0, y: 34 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09,
            scrollTrigger: { trigger: siteSectionRef.current, start: "top 78%", once: true },
          }
        );

        const pImg = siteSectionRef.current.querySelector("[data-site-parallax-img]");
        if (pImg) {
          gsap.fromTo(pImg,
            { scale: 1.18, yPercent: -7 },
            {
              scale: 1.02, yPercent: 7, ease: "none",
              scrollTrigger: { trigger: siteSectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
            }
          );
        }
      }

      // ---- Section 6 ----
      if (mapSectionRef.current && mapBgRef.current) {
        gsap.fromTo(mapBgRef.current,
          { yPercent: -8, scale: 1.15 },
          {
            yPercent: 8, scale: 1.05, ease: "none",
            scrollTrigger: { trigger: mapSectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
          }
        );

        if (mapPinRef.current) {
          gsap.to(mapPinRef.current, { y: -10, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
        }

        gsap.fromTo(
          mapSectionRef.current.querySelectorAll("[data-map-fade]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08,
            scrollTrigger: { trigger: mapSectionRef.current, start: "top 70%", once: true },
          }
        );
      }

      // ---- Section 7 ----
      const landmarkSection = landmarkTrackRef.current?.closest("[data-landmark-section]");
      if (landmarkSection) {
        gsap.fromTo(
          landmarkSection.querySelectorAll("[data-landmark-fade]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07,
            scrollTrigger: { trigger: landmarkSection, start: "top 78%", once: true },
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

  /* ================= 360° VIEWER ENGINE ================= */

  const measure = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    // one tile = 2x the scene width so the panorama reads wide & cinematic
    const tileW = Math.max(scene.offsetWidth * 1.6, 900);
    engine.current.tileW = tileW;
    if (trackRef.current) {
      trackRef.current.style.width = `${tileW * 3}px`;
      Array.from(trackRef.current.children).forEach((child, i) => {
        child.style.width = `${tileW}px`;
        child.style.left = `${i * tileW}px`;
      });
    }
  }, []);

  const render = useCallback(() => {
    const e = engine.current;
    const tileW = e.tileW || 1;
    // wrap into [-tileW, 0)
    let wrapped = e.offset % tileW;
    if (wrapped > 0) wrapped -= tileW;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${wrapped - tileW}px,0,0)`;
    }
    // compass / progress
    const norm = ((-e.offset % tileW) + tileW) % tileW;
    const deg = (norm / tileW) * 360;
    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `translateX(${(deg / 360) * 100}%)`;
    }
    if (compassRef.current) {
      compassRef.current.textContent = `${Math.round(deg)}°`;
    }
  }, []);

  const loop = useCallback((ts) => {
    const e = engine.current;
    if (!e.lastTs) e.lastTs = ts;
    const dt = Math.min((ts - e.lastTs) / 16.6667, 3);
    e.lastTs = ts;

    if (!e.dragging) {
      // keyboard steering
      if (e.keys.left) e.velocity += 0.9 * dt;
      if (e.keys.right) e.velocity -= 0.9 * dt;

      // inertia
      e.offset += e.velocity * dt;
      e.velocity *= Math.pow(0.94, dt);
      if (Math.abs(e.velocity) < 0.02) e.velocity = 0;

      // auto rotate drift when idle
      if (e.auto && e.velocity === 0 && !e.keys.left && !e.keys.right) {
        e.offset -= 0.35 * dt;
      }
    }

    render();
    e.raf = requestAnimationFrame(loop);
  }, [render]);

  const openViewer = useCallback(() => {
    engine.current.offset = 0;
    engine.current.velocity = 0;
    engine.current.auto = true;
    setAutoRotate(true);
    setHasInteracted(false);
    setViewerLoaded(false);
    setIsViewerOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
  }, []);

  useEffect(() => {
    if (!isViewerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const raf1 = requestAnimationFrame(() => {
      measure();
      render();
      engine.current.lastTs = 0;
      engine.current.raf = requestAnimationFrame(loop);
    });

    const onKey = (e) => {
      if (e.key === "Escape") { closeViewer(); return; }
      if (e.key === "ArrowLeft") { engine.current.keys.left = true; engine.current.auto = false; setAutoRotate(false); setHasInteracted(true); }
      if (e.key === "ArrowRight") { engine.current.keys.right = true; engine.current.auto = false; setAutoRotate(false); setHasInteracted(true); }
    };
    const onKeyUp = (e) => {
      if (e.key === "ArrowLeft") engine.current.keys.left = false;
      if (e.key === "ArrowRight") engine.current.keys.right = false;
    };
    const onResize = () => { measure(); render(); };

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf1);
      if (engine.current.raf) cancelAnimationFrame(engine.current.raf);
      engine.current.raf = null;
      engine.current.keys.left = false;
      engine.current.keys.right = false;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", onResize);
    };
  }, [isViewerOpen, measure, render, loop, closeViewer]);

  // re-measure once the first image reports its natural size
  useEffect(() => {
    if (isViewerOpen && viewerLoaded) {
      measure();
      render();
    }
  }, [isViewerOpen, viewerLoaded, measure, render]);

  const onPointerDown = (ev) => {
    const e = engine.current;
    e.dragging = true;
    e.pointerId = ev.pointerId;
    e.startX = ev.clientX;
    e.lastX = ev.clientX;
    e.startOffset = e.offset;
    e.velocity = 0;
    e.auto = false;
    setAutoRotate(false);
    setHasInteracted(true);
    try { ev.currentTarget.setPointerCapture(ev.pointerId); } catch (_) {}
  };

  const onPointerMove = (ev) => {
    const e = engine.current;
    if (!e.dragging || ev.pointerId !== e.pointerId) return;
    const dx = ev.clientX - e.startX;
    e.velocity = (ev.clientX - e.lastX) * 0.85;
    e.lastX = ev.clientX;
    e.offset = e.startOffset + dx;
    render();
  };

  const onPointerUp = (ev) => {
    const e = engine.current;
    if (!e.dragging) return;
    e.dragging = false;
    try { ev.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
    e.pointerId = null;
  };

  const nudge = (dir) => {
    engine.current.auto = false;
    setAutoRotate(false);
    setHasInteracted(true);
    engine.current.velocity += dir * 14;
  };

  const toggleAuto = () => {
    const next = !engine.current.auto;
    engine.current.auto = next;
    engine.current.velocity = 0;
    setAutoRotate(next);
  };

  const resetView = () => {
    gsap.to(engine.current, {
      offset: 0,
      duration: 0.9,
      ease: "power3.inOut",
      onUpdate: render,
    });
    engine.current.velocity = 0;
  };

  return (
    <main style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
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
          font-size: clamp(2.2rem, 8vw, 6.5rem);
          word-break: break-word;
        }
        .pd-spot-word--layout { font-size: clamp(1.7rem, 5.4vw, 4.2rem); }
        .pd-acc-table { width: 100%; border-collapse: collapse; }
        .pd-acc-table th, .pd-acc-table td {
          text-align: left; padding: 10px 12px;
          font-family: 'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif;
          font-size: 0.78rem; font-weight: 400;
        }
        .pd-acc-table thead th {
          color: rgba(255,255,255,0.6); font-weight: 600; font-size: 0.66rem;
          letter-spacing: 0.05em; text-transform: uppercase;
          border-bottom: 1px solid rgba(255,255,255,0.18);
        }
        .pd-acc-table tbody td { color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.1); }

        .pd-amenity-card { transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease; }
        .pd-amenity-card:hover { background-color: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.28); transform: translateY(-2px); }
        .pd-amenity-icon-wrap { transition: background-color 0.25s ease, color 0.25s ease; }
        .pd-amenity-card:hover .pd-amenity-icon-wrap { background-color: #0851a2; color: #ffffff; }

        /* ================= SECTION 5 — 360 SITE VIEW ================= */
        .pd-site-card {
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s cubic-bezier(0.16,1,0.3,1);
          cursor: pointer;
        }
        .pd-site-card:hover { transform: translateY(-6px); box-shadow: 0 40px 90px rgba(20,19,19,0.22); }
        .pd-site-card:hover .pd-site-img { transform: scale(1.06); }
        .pd-site-card:focus-visible { outline: 2px solid #0851a2; outline-offset: 4px; }
        .pd-site-img { transition: transform 1.1s cubic-bezier(0.16,1,0.3,1); }

        .pd-site-orb {
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), background-color 0.35s ease, border-color 0.35s ease;
        }
        .pd-site-card:hover .pd-site-orb {
          transform: scale(1.1);
          background-color: rgba(8,81,162,0.85);
          border-color: rgba(255,255,255,0.95);
        }
        .pd-site-orb-ring { animation: pdOrbPulse 3s cubic-bezier(0.16,1,0.3,1) infinite; }
        .pd-site-orb-ring2 { animation: pdOrbPulse 3s cubic-bezier(0.16,1,0.3,1) infinite; animation-delay: 1.2s; }
        @keyframes pdOrbPulse {
          0%   { transform: scale(0.85); opacity: 0.65; }
          70%  { transform: scale(2.1); opacity: 0; }
          100% { transform: scale(2.1); opacity: 0; }
        }
        .pd-site-spin { animation: pdSpin 14s linear infinite; }

        .pd-site-openpill { transition: gap 0.35s ease, background-color 0.35s ease; }
        .pd-site-card:hover .pd-site-openpill { gap: 14px; background-color: rgba(255,255,255,0.2); }

        /* ---- viewer modal ---- */
        .pd-viewer-overlay { animation: pdViewerFadeIn 0.35s ease forwards; }
        @keyframes pdViewerFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .pd-viewer-stage { animation: pdViewerScaleIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes pdViewerScaleIn {
          from { opacity: 0; transform: scale(0.955) translateY(22px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .pd-vbtn {
          transition: background-color 0.25s ease, transform 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }
        .pd-vbtn:hover { background-color: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.42); }
        .pd-vbtn:active { transform: scale(0.93); }
        .pd-vbtn--close:hover { transform: rotate(90deg); background-color: rgba(255,80,80,0.35); }
        .pd-vbtn--on { background-color: rgba(8,81,162,0.9) !important; border-color: rgba(255,255,255,0.55) !important; }

        .pd-viewer-scene { cursor: grab; }
        .pd-viewer-scene:active { cursor: grabbing; }

        .pd-drag-hint { animation: pdDragHint 2.6s cubic-bezier(0.4,0,0.2,1) infinite; }
        @keyframes pdDragHint {
          0%, 100% { transform: translateX(-8px); opacity: 0.45; }
          50%      { transform: translateX(8px); opacity: 1; }
        }
        .pd-hint-fade-out { animation: pdHintOut 0.5s ease forwards; }
        @keyframes pdHintOut { to { opacity: 0; visibility: hidden; } }

        @keyframes pdSpin { to { transform: rotate(360deg); } }
        .pd-viewer-spinner { animation: pdSpin 0.9s linear infinite; }

        /* ---- Section 6 ---- */
        .pd-map-bg-img { transition: transform 0.6s ease; }
        .pd-map-pin-dot { animation: pdPinPulse 2.2s ease-out infinite; }
        @keyframes pdPinPulse {
          0% { transform: scale(0.6); opacity: 0.7; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .pd-map-distance-row { transition: background-color 0.25s ease, padding-left 0.25s ease; }
        .pd-map-distance-row:hover { background-color: rgba(0,0,0,0.04); padding-left: 6px; }
        .pd-map-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(8,81,162,0.3); }
        .pd-map-frame iframe { display: block; }

        /* ---- Section 7 ---- */
        .pd-lm-track { scrollbar-width: none; -ms-overflow-style: none; }
        .pd-lm-track::-webkit-scrollbar { display: none; }
        .pd-lm-card { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .pd-lm-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(20,19,19,0.08); }
        .pd-lm-card-img { transition: transform 0.6s ease; }
        .pd-lm-card:hover .pd-lm-card-img { transform: scale(1.05); }
        .pd-lm-nav-btn { transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
        .pd-lm-nav-btn:hover:not(:disabled) { background-color: #141313; color: #ffffff; }
        .pd-lm-nav-btn:active:not(:disabled) { transform: scale(0.94); }
        .pd-lm-view-all:hover { background-color: #0b3f7a; }

        .pd-spec-row { transition: background-color 0.2s ease; }
        .pd-spec-row:hover { background-color: rgba(255,255,255,0.06); }

        /* ================= RESPONSIVE ================= */
        @media (max-width: 899px) {
          .pd-hero-title { font-size: clamp(2.6rem, 13vw, 4.2rem) !important; letter-spacing: -0.03em !important; margin-top: 50px !important; }
          .pd-hero-tagline { margin-left: 0 !important; text-align: center !important; font-size: 0.66rem !important; }

          .pd-showcase { flex-direction: column !important; gap: 12px !important; }
          .pd-showcase-img-wrap { aspect-ratio: 4 / 3.2 !important; }

          .pd-strip-wrap { overflow: visible !important; }
          .pd-strip { flex-direction: column !important; transform: none !important; height: auto !important; width: 100% !important; gap: 20px !important; }
          .pd-panel-pair {
            flex-direction: column !important; height: auto !important; flex: 0 0 auto !important;
            width: 100% !important; gap: 14px !important; padding: 0 5vw 0 !important; scroll-snap-align: none !important;
          }
          .pd-light-card, .pd-dark-card { flex: 1 1 auto !important; width: 100% !important; }
          .pd-light-card { padding: 1.5em 1.4em !important; gap: 0.85em !important; }
          .pd-dark-card { padding: 1.6em 1.4em !important; gap: 1.3em !important; max-height: none !important; overflow: visible !important; }
          .pd-quote-row-mobile { flex-direction: column !important; }
          .pd-layout-panel { flex: 0 0 auto !important; width: 100% !important; height: auto !important; padding: 0 5vw !important; }
          .pd-layout-img-wrap { min-height: 200px !important; aspect-ratio: 4/3 !important; }

          .pd-amenity-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pd-spec-grid { grid-template-columns: 1fr !important; }
          .pd-acc-table { font-size: 0.72rem !important; }
          .pd-acc-table th, .pd-acc-table td { padding: 8px 6px !important; }

          .pd-site-heading { font-size: clamp(2.6rem, 15vw, 5rem) !important; }
          .pd-site-card { border-radius: 20px !important; }
          .pd-site-card-inner { padding: 1.5em !important; min-height: 300px !important; }
          .pd-site-caption-title { font-size: 1rem !important; }
          .pd-site-meta-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }

          .pd-viewer-overlay { padding: 0 !important; }
          .pd-viewer-stage { height: 100dvh !important; max-height: 100dvh !important; border-radius: 0 !important; }
          .pd-viewer-topbar { padding: 14px 14px !important; }
          .pd-viewer-footer { padding: 1em 1.1em 1.3em !important; flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }
          .pd-viewer-footer-left { align-items: center !important; text-align: center !important; }
          .pd-viewer-controls { justify-content: center !important; }
          .pd-drag-hint-text { font-size: 0.72rem !important; }

          .pd-map-grid { flex-direction: column !important; }
          .pd-map-frame { min-height: 280px !important; }
          .pd-map-frame iframe { min-height: 280px !important; }

          .pd-lm-card { width: 74vw !important; }
          .pd-lm-header-row { align-items: flex-start !important; }
        }

        @media (max-width: 480px) {
          .pd-amenity-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
          .pd-lm-nav-btn { width: 40px !important; height: 40px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pd-showcase-img-wrap img { transition: none !important; }
          .pd-map-pin-dot, .pd-site-orb-ring, .pd-site-orb-ring2,
          .pd-site-spin, .pd-drag-hint { animation: none !important; }
        }
      `}</style>

      {/* ================= SECTION 1 — PROJECT NAME ================= */}
      <section style={styles.hero} aria-label="Project name">
        <h1 className="pd-hero-title" style={styles.heroTitle}>{name}</h1>
        <p className="pd-hero-tagline" style={styles.heroTagline}>{tagline}</p>
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

      {/* ================= SECTION 4 — SPOTLIGHT ================= */}
      <section
        ref={sectionRef}
        style={isMobile ? styles.spotlightSectionMobile : styles.spotlightSection}
        aria-label="Gurudev"
      >
        <div style={styles.spotlightHeadingRow} data-fade>
          <span style={styles.spotlightKicker}>PROJECT — GURUDEV</span>
          {!isMobile && (
            <div style={styles.progressRow}>
              {SPOTLIGHT_PANELS.map((p, i) => (
                <span key={p.key} ref={(el) => (dotRefs.current[i] = el)} style={styles.progressDot} />
              ))}
            </div>
          )}
        </div>

        <div className="pd-strip-wrap" style={styles.stripWrap}>
          <div ref={stripRef} className="pd-strip" style={styles.strip}>
            {SPOTLIGHT_PANELS.slice(0, 3).map((panel) => (
              <div key={panel.key} className="pd-panel-pair" style={styles.panelPair}>
                <div className="pd-light-card" style={styles.lightCard}>
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

                <div className="pd-dark-card" style={styles.darkCard}>
                  <span style={styles.darkCardTexture} aria-hidden="true" />
                  <h3 className="pd-spot-word" style={styles.spotWord}>{panel.word}</h3>

                  {panel.key === "overview" && (
                    <>
                      <div className="pd-quote-row-mobile" style={styles.quoteRow}>
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

                      <div style={styles.amenityWrap}>
                        <span style={styles.amenitySectionLabel}>AMENITIES</span>
                        <div className="pd-amenity-grid" style={styles.amenityGrid}>
                          {AMENITIES.map((a) => (
                            <div key={a.label} className="pd-amenity-card" style={styles.amenityCard}>
                              <span className="pd-amenity-icon-wrap" style={styles.amenityIconWrap}>
                                <AmenityIcon name={a.icon} />
                              </span>
                              <span style={styles.amenityLabel}>{a.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {panel.key === "highlights" && (
                    <>
                      <div className="pd-quote-row-mobile" style={styles.quoteRow}>
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

                      <div style={styles.specWrap}>
                        <span style={styles.amenitySectionLabel}>SPECIFICATIONS</span>
                        <div className="pd-spec-grid" style={styles.specGrid}>
                          {SPECIFICATION_HIGHLIGHTS.map((s) => (
                            <div key={s.label} className="pd-spec-row" style={styles.specRow}>
                              <span style={styles.specLabel}>{s.label}</span>
                              <span style={styles.specValue}>{s.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {panel.key === "pricing" && (
                    <div style={styles.pricingBlock}>
                      <div style={{ overflowX: "auto" }}>
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
                      </div>
                      <div style={styles.quoteFooterRow}>
                        <div>
                          <span style={styles.quoteName}>{panel.quoteName}</span>
                          <span style={styles.quoteRole}>{panel.quoteRole}</span>
                        </div>
                        <span style={styles.quoteTag}>{panel.quoteTag}</span>
                      </div>

                      <div style={styles.pricingNoteWrap}>
                        <span style={styles.pricingNoteLabel}>NOTE</span>
                        <p style={styles.pricingNoteText}>
                          Prices are indicative and subject to final RERA-approved
                          sale agreement. Bank loan tie-ups available with 5 leading
                          nationalised and private banks for eligible buyers.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="pd-layout-panel" style={styles.layoutPanel}>
              <div style={styles.layoutCard}>
                <span style={styles.darkCardTexture} aria-hidden="true" />
                <div style={styles.layoutHeaderRow}>
                  <span style={styles.eyebrowDark}>{SPOTLIGHT_PANELS[3].eyebrow}</span>
                  <span style={styles.quoteTag}>{SPOTLIGHT_PANELS[3].quoteTag}</span>
                </div>
                <h3 className="pd-spot-word pd-spot-word--layout" style={styles.spotWord}>
                  {SPOTLIGHT_PANELS[3].word}
                </h3>

                <div className="pd-layout-img-wrap" style={styles.layoutImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={masterplanImage} alt="Gurudev Masterplan" style={styles.layoutImg} />
                </div>

                <p style={styles.layoutBody}>{SPOTLIGHT_PANELS[3].body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5 — 360° SITE VIEW ================= */}
      <section ref={siteSectionRef} style={styles.siteSection} aria-label="360 degree site view">
        <div style={styles.siteAura} aria-hidden="true" />

        <span style={styles.siteKicker} data-site-fade>{siteView.kicker}</span>

        <h2 ref={siteHeadingRef} className="pd-site-heading" style={styles.siteGhostHeading} aria-hidden="true">
          {siteView.heading}
        </h2>

        <div style={styles.siteCardWrap}>
          <div
            className="pd-site-card"
            style={styles.siteCard}
            onClick={openViewer}
            role="button"
            tabIndex={0}
            aria-label="Open 360 degree site view"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openViewer();
              }
            }}
            data-site-fade
          >
            <div className="pd-site-card-inner" style={styles.siteCardInner}>
              <div style={styles.siteImgWrap} data-site-parallax-img>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="pd-site-img" src={siteView.image} alt="Gurudev site 360 view" style={styles.siteImg} />
              </div>
              <div style={styles.siteOverlay} />
              <div style={styles.siteGrain} aria-hidden="true" />

              <div style={styles.siteTopRow}>
                <span style={styles.siteBadge}>
                  <span style={styles.siteBadgeDot} aria-hidden="true" />
                  360° INTERACTIVE
                </span>
                <span className="pd-site-openpill" style={styles.siteOpenPill}>
                  Open Viewer
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H9M17 7v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <div style={styles.siteOrbCenter}>
                <span className="pd-site-orb-ring" style={styles.siteOrbRing} aria-hidden="true" />
                <span className="pd-site-orb-ring2" style={styles.siteOrbRing} aria-hidden="true" />
                <span className="pd-site-spin" style={styles.siteOrbitDashed} aria-hidden="true">
                  <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
                    <ellipse cx="56" cy="56" rx="52" ry="20" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeDasharray="4 6" />
                  </svg>
                </span>
                <span className="pd-site-orb" style={styles.siteOrb}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M8 5.5v13l10-6.5-10-6.5z" fill="#ffffff" />
                  </svg>
                </span>
              </div>

              <div style={styles.siteCaptionRow}>
                <p className="pd-site-caption-title" style={styles.siteCaptionTitle}>{siteView.quote}</p>
                <div className="pd-site-meta-row" style={styles.siteMetaRow}>
                  <div style={styles.siteCaptionFooter}>
                    <span style={styles.siteCaptionName}>{siteView.name}</span>
                    <span style={styles.siteCaptionRole}>{siteView.role}</span>
                  </div>
                  <div style={styles.siteChipRow}>
                    <span style={styles.siteChip}>Drag to pan</span>
                    <span style={styles.siteChip}>Full screen</span>
                    <span style={styles.siteChip}>Auto-rotate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 360° FULLSCREEN VIEWER MODAL ================= */}
      {isViewerOpen && (
        <div
          className="pd-viewer-overlay"
          style={styles.viewerOverlay}
          onClick={closeViewer}
          role="dialog"
          aria-modal="true"
          aria-label="360 degree site viewer"
        >
          <div
            className="pd-viewer-stage"
            style={styles.viewerStage}
            onClick={(e) => e.stopPropagation()}
          >
            {/* --- panorama scene --- */}
            <div
              ref={sceneRef}
              className="pd-viewer-scene"
              style={styles.viewerScene}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div ref={trackRef} style={styles.viewerTrack}>
                {[0, 1, 2].map((i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={i}
                    src={siteView.image}
                    alt={i === 0 ? "Gurudev 360 degree site view" : ""}
                    style={styles.viewerImg}
                    draggable={false}
                    onLoad={i === 0 ? () => setViewerLoaded(true) : undefined}
                  />
                ))}
              </div>
              <div style={styles.viewerVignette} aria-hidden="true" />
              <div style={styles.viewerTopScrim} aria-hidden="true" />
              <div style={styles.viewerBottomScrim} aria-hidden="true" />
            </div>

            {/* --- loading --- */}
            {!viewerLoaded && (
              <div style={styles.viewerLoadingWrap}>
                <div className="pd-viewer-spinner" style={styles.viewerSpinner} />
                <span style={styles.viewerLoadingText}>Loading panorama…</span>
              </div>
            )}

            {/* --- top bar --- */}
            <div className="pd-viewer-topbar" style={styles.viewerTopbar}>
              <div style={styles.viewerTitleWrap}>
                <span style={styles.viewerLiveBadge}>
                  <span style={styles.viewerLiveDot} aria-hidden="true" />
                  360°
                </span>
                <div style={styles.viewerTitleCol}>
                  <span style={styles.viewerFooterTitle}>{siteView.name}</span>
                  <span style={styles.viewerFooterRole}>{siteView.role}</span>
                </div>
              </div>

              <div style={styles.viewerTopActions}>
                <span style={styles.viewerCompass}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" />
                    <path d="M14.5 9.5l-1.8 5-5 1.8 1.8-5 5-1.8z" fill="rgba(255,255,255,0.85)" />
                  </svg>
                  <b ref={compassRef} style={styles.viewerCompassNum}>0°</b>
                </span>
                <button
                  type="button"
                  className="pd-vbtn pd-vbtn--close"
                  style={styles.viewerIconBtn}
                  onClick={closeViewer}
                  aria-label="Close 360 view"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* --- centre drag hint --- */}
            <div
              className={`pd-viewer-hint ${hasInteracted ? "pd-hint-fade-out" : ""}`}
              style={styles.viewerHintCenter}
              aria-hidden="true"
            >
              <div className="pd-drag-hint" style={styles.viewerHintInner}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                </svg>
                <span className="pd-drag-hint-text" style={styles.viewerHintText}>Drag to look around</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                </svg>
              </div>
            </div>

            {/* --- footer controls --- */}
            <div className="pd-viewer-footer" style={styles.viewerFooter}>
              <div className="pd-viewer-footer-left" style={styles.viewerProgressWrap}>
                <div style={styles.viewerProgressTrack}>
                  <span ref={progressFillRef} style={styles.viewerProgressThumb} />
                </div>
                <div style={styles.viewerProgressLabels}>
                  <span>N</span><span>E</span><span>S</span><span>W</span><span>N</span>
                </div>
              </div>

              <div className="pd-viewer-controls" style={styles.viewerControls}>
                <button type="button" className="pd-vbtn" style={styles.viewerIconBtn} onClick={() => nudge(1)} aria-label="Pan left">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                <button
                  type="button"
                  className={`pd-vbtn ${autoRotate ? "pd-vbtn--on" : ""}`}
                  style={styles.viewerPillBtn}
                  onClick={toggleAuto}
                  aria-pressed={autoRotate}
                >
                  {autoRotate ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6v12M15 6v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M8 5.5v13l10-6.5-10-6.5z" fill="#fff" /></svg>
                  )}
                  {autoRotate ? "Pause" : "Auto-rotate"}
                </button>

                <button type="button" className="pd-vbtn" style={styles.viewerPillBtn} onClick={resetView}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12a8 8 0 108-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 1.5L8.5 4 12 6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Reset
                </button>

                <button type="button" className="pd-vbtn" style={styles.viewerIconBtn} onClick={() => nudge(-1)} aria-label="Pan right">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 6 — LOCATION PARALLAX MAP ================= */}
      <section ref={mapSectionRef} style={styles.mapSection} aria-label="Project location">
        <div style={styles.mapBgWrap} aria-hidden="true">
          <div ref={mapBgRef} className="pd-map-bg-img" style={styles.mapBgImgOuter}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mapImage} alt="" style={styles.mapBgImg} />
          </div>
          <div style={styles.mapBgOverlay} />
          <div style={styles.mapBgGrid} />
        </div>

        <div style={styles.mapContentWrap}>
          <div style={styles.mapHeadingRow} data-map-fade>
            <h2 style={styles.mapHeading}>Location</h2>
            <p style={styles.mapSubHeading}>Rooted in the right location.</p>
          </div>

          <div className="pd-map-grid" style={styles.mapGrid}>
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

              <div style={styles.mapDivider} aria-hidden="true" />
              <div style={styles.mapExtraCol}>
                <span style={styles.mapExtraLabel}>Nearby Colleges</span>
                <span style={styles.mapExtraLine}>SRM University · Apollo Arts &amp; Science · VIT University</span>
              </div>
              <div style={styles.mapExtraCol}>
                <span style={styles.mapExtraLabel}>Nearby Schools</span>
                <span style={styles.mapExtraLine}>Velammal Vidhyashram CBSE (2 mins) · SRM Public School (5 mins)</span>
              </div>

              <div style={styles.mapCtaWrapper}>
                <a href={mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.mapCta}
                  className="pd-map-cta"
                >
                  Get Directions
                  <span style={styles.ctaArrow} aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 7 — NEARBY LANDMARKS ================= */}
      <section style={styles.lmSection} aria-label="Nearby landmarks" data-landmark-section>
        <div className="pd-lm-header-row" style={styles.lmHeaderRow}>
          <div style={styles.lmHeaderLeft}>
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
          {landmarks.map((lm) => (
            <div key={lm.name} className="pd-lm-card" style={styles.lmCard} data-landmark-card>
              <div style={styles.lmCardImgWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="pd-lm-card-img" src={lm.image} alt={lm.name} style={styles.lmCardImg} />
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
    padding: "clamp(1.5em, 5vw, 4.5em) clamp(1.25em, 4vw, 4em) clamp(2em, 4vw, 3em)",
    display: "flex",
    flexDirection: "column",
    paddingTop: "clamp(72px, 12vw, 100px)",
  },
  heroTitle: {
    margin: 0, padding: 0, fontWeight: 600,
    fontSize: "clamp(3.2rem, 17.5vw, 13rem)",
    lineHeight: 0.88, letterSpacing: "-0.045em",
    textTransform: "none", color: "#141313",
    width: "100%", textAlign: "center",
  },
  heroTagline: {
    margin: 0, marginTop: "0.8em",
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "clamp(0.68rem, 1.4vw, 1rem)",
    fontWeight: 500, letterSpacing: "0.045em",
    textTransform: "uppercase", color: "#3a3a3a",
    lineHeight: 1.5, textAlign: "center",
  },
  heroMetaRow: {
    display: "flex", alignItems: "flex-end", justifyContent: "space-between",
    marginTop: "clamp(2em, 7vw, 5em)",
    borderTop: "1px solid rgba(20, 19, 19, 0.12)", paddingTop: "1.2em",
  },
  heroMetaLeft: { display: "flex", flexDirection: "column", gap: "0.6em" },
  heroMetaLabel: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.06em",
    textTransform: "uppercase", color: "rgba(20, 19, 19, 0.5)",
  },
  heroMetaBar: { display: "block", width: "1.8em", height: "3px", backgroundColor: "#0851a2" },
  heroMetaIndex: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.8rem", fontWeight: 400,
    color: "rgba(20, 19, 19, 0.28)", whiteSpace: "nowrap",
  },
  showcase: {
    display: "flex", width: "100%", minHeight: "auto",
    gap: "clamp(12px, 1.6vw, 20px)",
    padding: "0 clamp(1.25em, 4vw, 4em)", boxSizing: "border-box",
  },
  showcaseImgWrap: { flex: "1 1 50%", minWidth: 0, height: "auto", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "16px" },
  showcaseImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  wideSection: {
    width: "100%",
    padding: "clamp(12px, 1.6vw, 20px) clamp(1.25em, 4vw, 4em) 0",
    boxSizing: "border-box",
  },
  wideImgWrap: { width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: "16px" },

  spotlightSection: {
    position: "relative", height: "100vh", width: "100%", maxWidth: "100%",
    overflow: "hidden", backgroundColor: "#fbfaf7",
    display: "flex", flexDirection: "column", boxSizing: "border-box",
    padding: "clamp(1.6em, 3vw, 2.4em) 0 0",
  },
  spotlightSectionMobile: {
    position: "relative", height: "auto", width: "100%", maxWidth: "100%",
    overflow: "visible", backgroundColor: "#fbfaf7",
    display: "flex", flexDirection: "column", boxSizing: "border-box",
    padding: "2.6em 0 2.6em",
  },
  spotlightHeadingRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 clamp(1.25em, 4vw, 4em)", marginBottom: "clamp(1em, 2.5vw, 1.6em)",
  },
  spotlightKicker: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
    textTransform: "uppercase", color: "rgba(20,19,19,0.45)",
  },
  progressRow: { display: "flex", alignItems: "center", gap: "8px" },
  progressDot: {
    display: "inline-block", height: "4px", width: "8px", borderRadius: "2px",
    backgroundColor: "#0851a2", opacity: 0.35,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  stripWrap: {
    position: "relative", flex: 1, minHeight: 0, width: "100%", maxWidth: "100%",
    overflow: "hidden", backgroundColor: "#fbfaf7",
  },
  strip: {
    display: "flex", flexWrap: "nowrap", height: "100%",
    willChange: "transform", backgroundColor: "#fbfaf7", gap: 0,
  },
  panelPair: {
    position: "relative", flex: "0 0 100%", width: "100%", height: "100%",
    display: "flex", alignItems: "stretch", gap: "clamp(28px, 3.2vw, 44px)",
    padding: "0 clamp(1.25em, 4vw, 4em) clamp(1.6em, 3vw, 2.6em)",
    boxSizing: "border-box", backgroundColor: "#fbfaf7",
  },
  lightCard: {
    flex: "1 1 42%", minWidth: 0, backgroundColor: "#ffffff",
    border: "1px solid rgba(20,19,19,0.08)",
    boxShadow: "0 4px 24px rgba(20,19,19,0.04)", borderRadius: "20px",
    padding: "clamp(1.6em, 3vw, 2.6em) clamp(1.6em, 3vw, 2.4em)",
    boxSizing: "border-box", display: "flex", flexDirection: "column",
    justifyContent: "center", gap: "clamp(0.9em, 2vw, 1.3em)",
  },
  lightCardRule: {
    display: "block", width: "100%", height: "1px",
    backgroundColor: "rgba(20,19,19,0.12)", marginBottom: "0.2em",
  },
  eyebrow: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
    textTransform: "uppercase", color: "rgba(20,19,19,0.45)",
  },
  eyebrowDark: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
    textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
    position: "relative", zIndex: 1,
  },
  panelHeading: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 700, fontSize: "clamp(1.5rem, 3.4vw, 2.5rem)",
    lineHeight: 1.12, letterSpacing: "-0.02em", color: "#141313",
  },
  panelHeadingLine: { display: "inline" },
  panelBody: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "clamp(0.85rem, 1vw, 0.98rem)",
    lineHeight: 1.6, color: "#5a5a57", maxWidth: "480px",
  },
  statBlock: { display: "flex", flexDirection: "column", gap: "4px" },
  statLine: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 700, fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
    color: "#0851a2", letterSpacing: "-0.01em",
  },
  statSub: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "0.82rem", color: "#8a8a86",
  },
  ctaBtn: {
    alignSelf: "flex-start", display: "inline-flex", alignItems: "center",
    gap: "10px", padding: "0.95em 1.7em", borderRadius: "999px", border: "none",
    backgroundColor: "#0851a2", color: "#ffffff",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.03em",
    textTransform: "uppercase", cursor: "pointer",
  },
  ctaArrow: { fontSize: "0.95rem" },
  darkCard: {
    position: "relative", flex: "1 1 58%", minWidth: 0,
    backgroundColor: "#3d3f40", borderRadius: "20px",
    padding: "clamp(1.8em, 3.4vw, 2.8em) clamp(1.8em, 3.4vw, 2.8em)",
    boxSizing: "border-box", overflow: "auto",
    display: "flex", flexDirection: "column", gap: "clamp(1.4em, 2.6vw, 2em)",
  },
  darkCardTexture: {
    position: "absolute", inset: 0,
    backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
    backgroundSize: "5px 5px", pointerEvents: "none",
  },
  spotWord: { position: "relative", zIndex: 1 },
  quoteRow: {
    position: "relative", zIndex: 1, display: "flex",
    alignItems: "flex-start", gap: "clamp(14px, 2vw, 22px)",
  },
  quoteImgWrap: {
    flex: "0 0 auto", width: "clamp(72px, 8vw, 108px)", height: "clamp(90px, 10vw, 132px)",
    borderRadius: "10px", overflow: "hidden", backgroundColor: "#55575a",
  },
  quoteImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  quoteTextCol: { flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", gap: "clamp(0.7em, 1.6vw, 1.1em)" },
  quoteText: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "clamp(0.85rem, 1.15vw, 1.02rem)",
    lineHeight: 1.55, color: "#ffffff",
  },
  quoteFooterRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" },
  quoteName: {
    display: "block",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600, fontSize: "0.9rem", color: "#ffffff",
  },
  quoteRole: {
    display: "block",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "0.76rem",
    color: "rgba(255,255,255,0.6)", marginTop: "2px",
  },
  quoteTag: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.04em",
    color: "#050505", backgroundColor: "#ffffff", borderRadius: "999px",
    padding: "6px 12px", whiteSpace: "nowrap", flex: "0 0 auto",
  },
  highlightsList: {
    flex: "0 0 auto", display: "grid", gridTemplateColumns: "1fr",
    rowGap: "8px", minWidth: "180px",
  },
  highlightRow: {
    display: "flex", alignItems: "center", gap: "8px",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "0.78rem", color: "#ffffff",
  },
  highlightDot: {
    display: "block", width: "5px", height: "5px", borderRadius: "50%",
    backgroundColor: "#ffffff", flex: "0 0 auto",
  },
  pricingBlock: {
    position: "relative", zIndex: 1, display: "flex",
    flexDirection: "column", gap: "clamp(1em, 2.2vw, 1.6em)",
  },
  amenityWrap: {
    position: "relative", zIndex: 1, display: "flex", flexDirection: "column",
    gap: "0.9em", paddingTop: "clamp(0.6em, 1.4vw, 1em)",
    borderTop: "1px solid rgba(255,255,255,0.12)",
  },
  amenitySectionLabel: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.08em",
    color: "rgba(255,255,255,0.5)",
  },
  amenityGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" },
  amenityCard: {
    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px",
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px", padding: "14px 12px", cursor: "default",
  },
  amenityIconWrap: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "38px", height: "38px", borderRadius: "10px",
    backgroundColor: "rgba(255,255,255,0.1)", color: "#8fd3c0", flex: "0 0 auto",
  },
  amenityLabel: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 500, fontSize: "0.74rem", lineHeight: 1.35, color: "#ffffff",
  },
  specWrap: {
    position: "relative", zIndex: 1, display: "flex", flexDirection: "column",
    gap: "0.8em", paddingTop: "clamp(0.6em, 1.4vw, 1em)",
    borderTop: "1px solid rgba(255,255,255,0.12)",
  },
  specGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "6px 16px",
  },
  specRow: { display: "flex", flexDirection: "column", gap: "2px", padding: "8px 10px", borderRadius: "8px" },
  specLabel: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.04em",
    textTransform: "uppercase", color: "#8fd3c0",
  },
  specValue: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "0.78rem",
    color: "rgba(255,255,255,0.85)", lineHeight: 1.4,
  },
  pricingNoteWrap: {
    position: "relative", zIndex: 1, display: "flex", flexDirection: "column",
    gap: "0.5em", paddingTop: "clamp(0.8em, 1.6vw, 1.2em)",
    borderTop: "1px solid rgba(255,255,255,0.12)",
  },
  pricingNoteLabel: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.5)",
  },
  pricingNoteText: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "0.82rem", lineHeight: 1.55,
    color: "rgba(255,255,255,0.75)",
  },
  layoutPanel: {
    position: "relative", flex: "0 0 100%", width: "100%", height: "100%",
    display: "flex", padding: "0 clamp(1.25em, 4vw, 4em) clamp(1.6em, 3vw, 2.6em)",
    boxSizing: "border-box", backgroundColor: "#fbfaf7",
  },
  layoutCard: {
    position: "relative", width: "100%", backgroundColor: "#3d3f40",
    borderRadius: "20px",
    padding: "clamp(1.6em, 3vw, 2.4em) clamp(1.8em, 3.4vw, 2.8em) clamp(1.4em, 2.6vw, 2em)",
    boxSizing: "border-box", overflow: "hidden",
    display: "flex", flexDirection: "column", gap: "clamp(0.9em, 1.8vw, 1.3em)",
  },
  layoutHeaderRow: {
    position: "relative", zIndex: 1, display: "flex",
    alignItems: "center", justifyContent: "space-between",
  },
  layoutImgWrap: {
    position: "relative", zIndex: 1, flex: 1, minHeight: "220px", width: "100%",
    maxWidth: "1100px", margin: "0 auto", borderRadius: "14px", overflow: "hidden",
    backgroundColor: "#55575a", display: "flex", alignItems: "center", justifyContent: "center",
  },
  layoutImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  layoutBody: {
    position: "relative", zIndex: 1, margin: "0 auto",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "clamp(0.8rem, 1vw, 0.92rem)",
    lineHeight: 1.6, color: "rgba(255,255,255,0.8)",
    maxWidth: "900px", textAlign: "center",
  },

  /* ---------- Section 5 — 360° Site View ---------- */
  siteSection: {
    position: "relative", width: "100%",
    background: "linear-gradient(180deg, #ffffff 0%, #eceae5 22%, #e3e1dc 100%)",
    boxSizing: "border-box",
    padding: "clamp(3.2em, 7vw, 6em) clamp(1.25em, 4vw, 4em) clamp(4em, 9vw, 7em)",
    overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center",
  },
  siteAura: {
    position: "absolute", top: "12%", left: "50%",
    transform: "translateX(-50%)",
    width: "min(1000px, 90vw)", height: "min(1000px, 90vw)",
    background: "radial-gradient(circle, rgba(8,81,162,0.10) 0%, rgba(8,81,162,0) 62%)",
    pointerEvents: "none", zIndex: 0,
  },
  siteKicker: {
    position: "relative", zIndex: 1,
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.78rem", fontWeight: 500,
    letterSpacing: "0.08em",
    color: "rgba(20,19,19,0.55)", marginBottom: "0.4em",
  },
  siteGhostHeading: {
    margin: "0 0 -3.4rem",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 800, fontSize: "clamp(3.4rem, 11vw, 8.5rem)",
    lineHeight: 1, letterSpacing: "-0.045em", textAlign: "center",
    color: "rgba(20,19,19,0.10)",
    WebkitTextStroke: "1px rgba(20,19,19,0.16)",
    userSelect: "none", pointerEvents: "none",
    position: "relative", zIndex: 0,
  },
  siteCardWrap: { position: "relative", zIndex: 1, width: "100%", maxWidth: "1240px" },
  siteCard: {
    position: "relative", width: "100%", borderRadius: "28px", overflow: "hidden",
    boxShadow: "0 28px 70px rgba(20,19,19,0.18)",
    border: "1px solid rgba(255,255,255,0.35)",
  },
  siteCardInner: {
    position: "relative", width: "100%",
    minHeight: "clamp(360px, 50vw, 600px)",
    display: "flex", flexDirection: "column", justifyContent: "flex-end",
    padding: "clamp(1.6em, 3.4vw, 3em)", boxSizing: "border-box",
  },
  siteImgWrap: { position: "absolute", inset: 0, overflow: "hidden" },
  siteImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  siteOverlay: {
    position: "absolute", inset: 0,
    background:
      "linear-gradient(180deg, rgba(10,14,20,0.45) 0%, rgba(10,14,20,0.08) 32%, rgba(10,14,20,0.58) 76%, rgba(10,14,20,0.82) 100%)",
  },
  siteGrain: {
    position: "absolute", inset: 0,
    backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
    backgroundSize: "4px 4px", pointerEvents: "none", mixBlendMode: "overlay",
  },
  siteTopRow: {
    position: "absolute",
    top: "clamp(1.2em, 2.6vw, 2em)",
    left: "clamp(1.4em, 3vw, 2.4em)",
    right: "clamp(1.4em, 3vw, 2.4em)",
    zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
  },
  siteBadge: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em",
    color: "#ffffff", backgroundColor: "rgba(10,14,20,0.42)",
    border: "1px solid rgba(255,255,255,0.28)", borderRadius: "999px",
    padding: "7px 14px", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
  },
  siteBadgeDot: {
    width: "6px", height: "6px", borderRadius: "50%",
    backgroundColor: "#5ce0b0", boxShadow: "0 0 10px #5ce0b0",
  },
  siteOpenPill: {
    display: "inline-flex", alignItems: "center", gap: "9px",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.02em",
    color: "#ffffff", backgroundColor: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.3)", borderRadius: "999px",
    padding: "8px 16px", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
    whiteSpace: "nowrap",
  },
  siteOrbCenter: {
    position: "absolute", top: "48%", left: "50%",
    transform: "translate(-50%, -50%)", zIndex: 2,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  siteOrbRing: {
    position: "absolute", width: "78px", height: "78px", borderRadius: "50%",
    border: "1.5px solid rgba(255,255,255,0.55)",
  },
  siteOrbitDashed: {
    position: "absolute", width: "112px", height: "112px",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  siteOrb: {
    position: "relative", width: "70px", height: "70px", borderRadius: "50%",
    backgroundColor: "rgba(10,14,20,0.5)",
    border: "1.5px solid rgba(255,255,255,0.75)",
    display: "flex", alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 10px 34px rgba(0,0,0,0.35)",
  },
  siteCaptionRow: {
    position: "relative", zIndex: 2, display: "flex", flexDirection: "column",
    gap: "1.1em", maxWidth: "760px",
  },
  siteCaptionTitle: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 700, fontSize: "clamp(1.15rem, 2.2vw, 1.7rem)",
    lineHeight: 1.35, letterSpacing: "-0.015em", color: "#ffffff",
    textShadow: "0 2px 18px rgba(0,0,0,0.4)",
  },
  siteMetaRow: {
    display: "flex", alignItems: "flex-end", justifyContent: "space-between",
    gap: "18px", flexWrap: "wrap",
  },
  siteCaptionFooter: { display: "flex", flexDirection: "column", gap: "3px" },
  siteCaptionName: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600, fontSize: "0.88rem", color: "#ffffff",
  },
  siteCaptionRole: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "0.76rem", color: "rgba(255,255,255,0.65)",
  },
  siteChipRow: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" },
  siteChip: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.02em",
    color: "rgba(255,255,255,0.85)",
    backgroundColor: "rgba(255,255,255,0.09)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "999px", padding: "5px 12px",
    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    whiteSpace: "nowrap",
  },

  /* ---- viewer modal ---- */
  viewerOverlay: {
    position: "fixed", inset: 0, zIndex: 9999,
    backgroundColor: "rgba(6,7,9,0.94)",
    backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "clamp(1em, 3.5vw, 2.6em)",
  },
  viewerStage: {
    position: "relative", width: "100%", maxWidth: "1500px",
    height: "min(86vh, 880px)", borderRadius: "24px", overflow: "hidden",
    backgroundColor: "#08090b",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 50px 120px rgba(0,0,0,0.7)",
  },
  viewerScene: {
    position: "absolute", inset: 0, overflow: "hidden",
    touchAction: "none", backgroundColor: "#08090b", userSelect: "none",
  },
  viewerTrack: {
    position: "absolute", top: 0, left: 0, height: "100%",
    willChange: "transform",
  },
  viewerImg: {
    position: "absolute", top: 0, height: "100%",
    objectFit: "cover", userSelect: "none", pointerEvents: "none",
    display: "block",
  },
  viewerVignette: {
    position: "absolute", inset: 0,
    boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)", pointerEvents: "none",
  },
  viewerTopScrim: {
    position: "absolute", top: 0, left: 0, right: 0, height: "170px",
    background: "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, transparent 100%)",
    pointerEvents: "none",
  },
  viewerBottomScrim: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
    background: "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, transparent 100%)",
    pointerEvents: "none",
  },
  viewerLoadingWrap: {
    position: "absolute", inset: 0, zIndex: 4,
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: "16px",
    backgroundColor: "#08090b", pointerEvents: "none",
  },
  viewerSpinner: {
    width: "38px", height: "38px", borderRadius: "50%",
    border: "2.5px solid rgba(255,255,255,0.16)", borderTopColor: "#ffffff",
  },
  viewerLoadingText: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.72rem", letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
  },
  viewerTopbar: {
    position: "absolute", top: 0, left: 0, right: 0, zIndex: 5,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: "12px", padding: "20px 22px", pointerEvents: "none",
  },
  viewerTitleWrap: { display: "flex", alignItems: "center", gap: "12px" },
  viewerLiveBadge: {
    display: "inline-flex", alignItems: "center", gap: "7px",
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em",
    color: "#ffffff", backgroundColor: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.24)", borderRadius: "999px",
    padding: "6px 13px", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
  },
  viewerLiveDot: {
    width: "6px", height: "6px", borderRadius: "50%",
    backgroundColor: "#5ce0b0", boxShadow: "0 0 8px #5ce0b0",
  },
  viewerTitleCol: { display: "flex", flexDirection: "column", gap: "1px" },
  viewerFooterTitle: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600, fontSize: "0.92rem", color: "#ffffff", lineHeight: 1.2,
  },
  viewerFooterRole: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "0.74rem", color: "rgba(255,255,255,0.55)",
  },
  viewerTopActions: { display: "flex", alignItems: "center", gap: "10px", pointerEvents: "auto" },
  viewerCompass: {
    display: "inline-flex", alignItems: "center", gap: "7px",
    backgroundColor: "rgba(255,255,255,0.09)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "999px", padding: "7px 13px",
    backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
  },
  viewerCompassNum: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.72rem", fontWeight: 700, color: "#ffffff",
    minWidth: "34px", textAlign: "right", fontVariantNumeric: "tabular-nums",
  },
  viewerIconBtn: {
    width: "42px", height: "42px", borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.22)",
    backgroundColor: "rgba(255,255,255,0.09)",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", flex: "0 0 auto",
    backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
  },
  viewerPillBtn: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    height: "42px", padding: "0 18px", borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.22)",
    backgroundColor: "rgba(255,255,255,0.09)",
    color: "#ffffff", cursor: "pointer",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600, fontSize: "0.76rem", letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
  },
  viewerHintCenter: {
    position: "absolute", top: "50%", left: "50%",
    transform: "translate(-50%, -50%)", zIndex: 3,
    pointerEvents: "none",
  },
  viewerHintInner: {
    display: "flex", alignItems: "center", gap: "12px",
    backgroundColor: "rgba(10,12,16,0.45)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "999px", padding: "10px 20px",
    backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
  },
  viewerHintText: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontSize: "0.8rem", fontWeight: 500,
    color: "rgba(255,255,255,0.9)", whiteSpace: "nowrap",
  },
  viewerFooter: {
    position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 5,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: "20px", padding: "1.3em 1.8em 1.6em",
  },
  viewerProgressWrap: {
    display: "flex", flexDirection: "column", gap: "7px",
    flex: "1 1 240px", maxWidth: "420px", minWidth: 0,
  },
  viewerProgressTrack: {
    position: "relative", width: "100%", height: "3px",
    borderRadius: "999px", backgroundColor: "rgba(255,255,255,0.18)",
    overflow: "hidden",
  },
  viewerProgressThumb: {
    position: "absolute", top: 0, left: 0, height: "100%", width: "18%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, rgba(92,224,176,0.9), #ffffff)",
    willChange: "transform",
  },
  viewerProgressLabels: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.6rem", letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.38)",
  },
  viewerControls: { display: "flex", alignItems: "center", gap: "10px", flex: "0 0 auto", flexWrap: "wrap" },

  /* ---------- Section 6 — Location parallax map ---------- */
  mapSection: {
    position: "relative", width: "100%", minHeight: "auto", overflow: "hidden",
    backgroundColor: "#ffffff", display: "flex", alignItems: "center",
    boxSizing: "border-box", padding: "clamp(3em, 8vw, 7em) 0",
  },
  mapBgWrap: { position: "absolute", inset: 0, overflow: "hidden" },
  mapBgImgOuter: { position: "absolute", inset: "-10%", width: "120%", height: "120%" },
  mapBgImg: { width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(0.2) brightness(0.9)" },
  mapBgOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.85) 60%, #ffffff 100%)",
  },
  mapBgGrid: {
    position: "absolute", inset: 0,
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
  },
  mapContentWrap: {
    position: "relative", zIndex: 1, width: "100%", boxSizing: "border-box",
    padding: "0 clamp(1.25em, 4vw, 4em)", margin: "0 auto",
  },
  mapHeadingRow: {
    display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center", gap: "0.3em", marginBottom: "clamp(1.6em, 4vw, 3em)",
  },
  mapHeading: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 700, fontSize: "clamp(1.9rem, 5vw, 3.6rem)",
    lineHeight: 1.05, letterSpacing: "-0.03em", color: "#141313",
    maxWidth: "100%", textAlign: "center",
  },
  mapSubHeading: {
    margin: 0,
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.82rem", fontWeight: 400, letterSpacing: "0.06em",
    textTransform: "uppercase", color: "rgba(20,19,19,0.5)", textAlign: "center",
  },
  mapGrid: { display: "flex", alignItems: "stretch", gap: "clamp(16px, 2vw, 28px)", flexWrap: "wrap" },
  mapFrameCard: {
    position: "relative", flex: "1 1 55%", minWidth: "280px", minHeight: "360px",
    borderRadius: "20px", overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#f5f5f5",
  },
  mapIframe: {
    width: "100%", height: "100%", minHeight: "360px", border: "0",
    filter: "grayscale(0.3) contrast(1.05) brightness(1.05)",
  },
  mapPinOverlay: {
    position: "absolute", inset: 0, display: "flex",
    alignItems: "center", justifyContent: "center",
    pointerEvents: "none", zIndex: 2,
  },
  mapPin: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center" },
  mapPinDotOuter: { position: "relative", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" },
  mapPinPulse: { position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#0851a2" },
  mapPinDot: {
    position: "relative", width: "16px", height: "16px", borderRadius: "50%",
    backgroundColor: "#0851a2", border: "3px solid #ffffff",
    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
  },
  mapInfoCard: {
    position: "relative", flex: "1 1 35%", minWidth: "280px",
    backgroundColor: "#3d3f40", borderRadius: "20px",
    padding: "clamp(1.6em, 3vw, 2.4em)", boxSizing: "border-box",
    overflow: "hidden", display: "flex", flexDirection: "column",
    gap: "clamp(1em, 2vw, 1.5em)", border: "1px solid rgba(0,0,0,0.06)",
  },
  mapInfoTop: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "0.6em" },
  mapAddress: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600, fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
    lineHeight: 1.3, letterSpacing: "-0.01em", color: "#ffffff",
  },
  mapDivider: { position: "relative", zIndex: 1, height: "1px", width: "100%", backgroundColor: "rgba(255,255,255,0.12)" },
  mapDistanceList: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "2px" },
  mapDistanceRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 4px", borderRadius: "8px" },
  mapDistanceLabel: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "0.84rem", color: "rgba(255,255,255,0.72)",
  },
  mapDistanceValue: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600, fontSize: "0.84rem", color: "#ffffff", whiteSpace: "nowrap",
  },
  mapExtraCol: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "4px" },
  mapExtraLabel: {
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.06em",
    textTransform: "uppercase", color: "#8fd3c0",
  },
  mapExtraLine: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "0.8rem", lineHeight: 1.5, color: "rgba(255,255,255,0.75)",
  },
  mapCtaWrapper: { position: "relative", zIndex: 1, alignSelf: "flex-start", marginTop: "auto" },
  mapCta: {
    display: "inline-flex", alignItems: "center", gap: "10px",
    padding: "0.95em 1.7em", borderRadius: "999px", border: "none",
    backgroundColor: "#0851a2", color: "#ffffff",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.03em",
    textTransform: "uppercase", textDecoration: "none", cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },

  /* ---------- Section 7 — Nearby landmarks ---------- */
  lmSection: {
    position: "relative", width: "100%", backgroundColor: "#ffffff",
    boxSizing: "border-box",
    padding: "clamp(3em, 7vw, 6em) clamp(1.25em, 4vw, 4em) clamp(3.5em, 7vw, 6em)",
  },
  lmHeaderRow: {
    display: "flex", alignItems: "flex-end", justifyContent: "space-between",
    marginBottom: "clamp(1.6em, 4vw, 3em)", gap: "1.5em", flexWrap: "wrap",
  },
  lmHeaderLeft: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5em" },
  lmHeading: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 700, fontSize: "clamp(1.9rem, 6vw, 4.2rem)",
    lineHeight: 1, letterSpacing: "-0.035em", color: "#141313",
  },
  lmViewAllBtn: {
    marginTop: "0.6em", display: "inline-flex", alignItems: "center",
    justifyContent: "center", padding: "0.85em 1.8em", borderRadius: "999px",
    border: "none", backgroundColor: "#0851a2", color: "#ffffff",
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.01em", cursor: "pointer",
  },
  lmNavRow: { display: "flex", alignItems: "center", gap: "10px", flex: "0 0 auto" },
  lmNavBtn: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "48px", height: "48px", borderRadius: "50%",
    border: "1px solid rgba(20,19,19,0.12)", backgroundColor: "#f2efe9",
    color: "#141313", cursor: "pointer",
  },
  lmTrack: {
    display: "flex", gap: "clamp(16px, 2vw, 28px)", overflowX: "auto",
    scrollSnapType: "x mandatory", paddingBottom: "0.5em",
  },
  lmCard: {
    position: "relative", flex: "0 0 auto", width: "clamp(260px, 26vw, 380px)",
    scrollSnapAlign: "start", borderRadius: "18px", overflow: "hidden",
    border: "1px solid rgba(20,19,19,0.08)", backgroundColor: "#fbfaf7", cursor: "default",
  },
  lmCardImgWrap: { width: "100%", aspectRatio: "4 / 3", overflow: "hidden", backgroundColor: "#e7e3db" },
  lmCardImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  lmCardBody: { display: "flex", flexDirection: "column", gap: "0.6em", padding: "1.4em 1.5em 1.7em" },
  lmCardTag: {
    alignSelf: "flex-start",
    fontFamily: "'Courier New', 'Consolas', monospace",
    fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.06em",
    textTransform: "uppercase", color: "#0851a2",
    backgroundColor: "rgba(8,81,162,0.1)", borderRadius: "999px", padding: "5px 12px",
  },
  lmCardName: {
    margin: 0,
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 600, fontSize: "1.1rem", lineHeight: 1.3,
    letterSpacing: "-0.01em", color: "#141313",
  },
  lmCardDistance: {
    fontFamily: "'Figtree', var(--font-figtree), 'Segoe UI', Arial, sans-serif",
    fontWeight: 400, fontSize: "0.82rem", color: "rgba(20,19,19,0.5)",
  },
};