"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const POSTS = [
  {
    id: 1,
    slug: "guduvancheri-growth-corridor",
    title:
      "Guduvancheri emerges as Chennai's fastest-growing residential corridor along GST Road",
    image: "/blog-1.jpeg",
    date: "12 August 2026",
    category: "Market Insight",
  },
  {
    id: 2,
    slug: "vaastu-compliant-homes",
    title:
      "Why 100% vaastu-compliant floor plans are becoming the default expectation for homebuyers",
    image: "/blog-2.jpeg",
    date: "04 August 2026",
    category: "Design",
  },
  {
    id: 3,
    slug: "home-loan-guide-2026",
    title:
      "A complete guide to home loan eligibility, documentation and interest rates in 2026",
    image: "/blog-3.jpeg",
    date: "28 July 2026",
    category: "Finance",
  },
  {
    id: 4,
    slug: "villa-vs-apartment",
    title:
      "Villa or apartment: how to decide what actually suits your family and your budget",
    image: "/blog-4.jpeg",
    date: "19 July 2026",
    category: "Buying Guide",
  },
  {
    id: 5,
    slug: "rera-cmda-approvals",
    title:
      "Reading RERA and CMDA approvals: the checks every buyer should make before booking",
    image: "/blog-5.jpeg",
    date: "07 July 2026",
    category: "Legal",
  },
  {
    id: 6,
    slug: "siruseri-it-corridor",
    title:
      "Siruseri IT Park expansion and what it means for property values in South Chennai",
    image: "/blog-6.jpeg",
    date: "26 June 2026",
    category: "Market Insight",
  },
];

export default function BlogPage() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        updateEdges();
      });
    };

    updateEdges();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateEdges);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateEdges);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [updateEdges]);

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 40;
    const step = card ? card.getBoundingClientRect().width + gap : 400;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <main className="nw">
      <style>{css}</style>

      <div className="nw__inner">
        <header className="nw__head">
          <h1 className="nw__title">NEWS</h1>
        </header>

        <div className="nw__rule" />

        <div className="nw__stage">
          <button
            type="button"
            className="nw__nav nw__nav--prev"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous articles"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M15 5 L8 12 L15 19"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div ref={trackRef} className="nw__track">
            {POSTS.map((post) => (
              <article key={post.id} data-card className="nw__card">
                <Link href={`/blogs/${post.slug}`} className="nw__link">
                  <div className="nw__imgWrap">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="nw__img"
                      draggable={false}
                    />
                    <span className="nw__veil" aria-hidden="true" />
                    <span className="nw__frame" aria-hidden="true" />
                    <span className="nw__tag">{post.category}</span>
                    <span className="nw__pill">
                      Read article
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M7 17L17 7M17 7H9M17 7v8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <h2 className="nw__headline">{post.title}</h2>
                  <span className="nw__date">{post.date}</span>
                </Link>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="nw__nav nw__nav--next"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next articles"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 5 L16 12 L9 19"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="nw__foot">
          <Link href="/blogs/archive" className="nw__all">
            All articles
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 12h16M14 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

const css = `
.nw{
  --nw-font: var(--font-figtree), 'Figtree', 'Segoe UI', Arial, sans-serif;
  --nw-ink:#121212;
  --nw-muted:rgba(18,18,18,.45);
  --nw-rule:rgba(18,18,18,.85);
  --nw-gap:clamp(24px,2.4vw,40px);

  position:relative;
  width:100%;
  
  background-color:#ffffff !important;
  color:var(--nw-ink);
  font-family:var(--nw-font);
  box-sizing:border-box;
  padding:clamp(24px,4vw,44px) 0 clamp(48px,6vw,88px);
  overflow-x:hidden;
}
.nw *,
.nw *::before,
.nw *::after{box-sizing:border-box}

.nw__inner{
  width:100%;
  max-width:1783px;
  margin:0 auto;
  padding:0 clamp(20px,4vw,48px);
}

/* ---------- HEAD ---------- */
.nw__head{
  display:flex;align-items:baseline;justify-content:space-between;
  gap:20px;flex-wrap:wrap;
}
.nw__title{
  margin:0;
  font-family:var(--nw-font);
  font-weight:800;
  font-size:clamp(1.9rem,3.4vw,2.6rem);
  letter-spacing:-.03em;
  line-height:1;
  text-transform:uppercase;
  color:#121212;
}
.nw__rule{
  width:100%;height:1px;
  background-color:var(--nw-rule);
  margin:clamp(12px,1.6vw,18px) 0 clamp(22px,3vw,34px);
}

/* ---------- STAGE + ARROWS ---------- */
.nw__stage{position:relative;width:100%}

.nw__nav{
  position:absolute;
  top:clamp(90px,10vw,190px);
  z-index:3;
  width:34px;height:34px;
  display:grid;place-items:center;
  padding:0;border:0;
  border-radius:999px;
  background:transparent;
  color:#121212;
  cursor:pointer;
  transition:opacity .25s ease,transform .3s cubic-bezier(.16,1,.3,1);
  -webkit-tap-highlight-color:transparent;
}
.nw__nav svg{width:22px;height:22px}
.nw__nav--prev{left:clamp(-40px,-3vw,-8px)}
.nw__nav--next{right:clamp(-40px,-3vw,-8px)}
.nw__nav--prev:hover:not(:disabled){transform:translateX(-3px)}
.nw__nav--next:hover:not(:disabled){transform:translateX(3px)}
.nw__nav:disabled{opacity:.22;cursor:default}

/* ---------- TRACK : 3 CARDS PER SCREEN ---------- */
.nw__track{
  display:grid;
  grid-auto-flow:column;
  grid-auto-columns:calc((100% - (var(--nw-gap) * 2)) / 3);
  gap:var(--nw-gap);
  overflow-x:auto;overflow-y:hidden;
  scroll-snap-type:x mandatory;
  scroll-behavior:smooth;
  -webkit-overflow-scrolling:touch;
  overscroll-behavior-x:contain;
  scrollbar-width:none;
  padding-bottom:4px;
}
.nw__track::-webkit-scrollbar{display:none}

.nw__card{scroll-snap-align:start;min-width:0}

.nw__link{
  display:flex;flex-direction:column;
  text-decoration:none;color:inherit;height:100%;
}

/* ---------- IMAGE (shorter) ---------- */
.nw__imgWrap{
  position:relative;width:100%;
  aspect-ratio:16 / 10;
  max-height:clamp(200px,26vw,420px);
  overflow:hidden;
  background-color:#efefef;
}
.nw__img{
  position:absolute;inset:0;
  width:100%;height:100%;
  object-fit:cover;object-position:center;
  display:block;
  filter:grayscale(.14);
  transition:filter .55s ease;
}
.nw__link:hover .nw__img{filter:grayscale(0) saturate(1.06)}

.nw__veil{
  position:absolute;inset:0;z-index:1;pointer-events:none;opacity:0;
  background:linear-gradient(180deg,rgba(10,10,12,.28) 0%,rgba(10,10,12,.04) 42%,rgba(10,10,12,.6) 100%);
  transition:opacity .5s ease;
}
.nw__link:hover .nw__veil{opacity:1}

.nw__frame{
  position:absolute;inset:12px;z-index:2;pointer-events:none;
  border:1px solid rgba(255,255,255,0);
  transition:border-color .5s cubic-bezier(.16,1,.3,1);
}
.nw__link:hover .nw__frame{border-color:rgba(255,255,255,.5)}

.nw__tag{
  position:absolute;top:12px;left:12px;z-index:3;
  font-family:var(--nw-font);
  font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:#ffffff;
  background-color:rgba(10,10,12,.55);
  border:1px solid rgba(255,255,255,.24);
  border-radius:999px;padding:5px 11px;
  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
}

.nw__pill{
  position:absolute;left:14px;bottom:14px;z-index:3;
  display:inline-flex;align-items:center;gap:8px;
  padding:8px 15px;border-radius:999px;
  background-color:rgba(255,255,255,.15);
  border:1px solid rgba(255,255,255,.35);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  color:#ffffff;
  font-family:var(--nw-font);
  font-size:.72rem;font-weight:600;white-space:nowrap;
  pointer-events:none;opacity:0;transform:translateY(16px);
  transition:opacity .45s ease,transform .5s cubic-bezier(.16,1,.3,1);
}
.nw__pill svg{width:13px;height:13px}
.nw__link:hover .nw__pill{opacity:1;transform:translateY(0)}

/* ---------- TEXT ---------- */
.nw__headline{
  margin:clamp(14px,1.6vw,20px) 0 0;
  font-family:var(--nw-font);
  font-weight:700;
  font-size:clamp(.98rem,1.1vw,1.18rem);
  line-height:1.3;
  letter-spacing:-.015em;
  color:#121212;
  transition:color .25s ease;
  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.nw__link:hover .nw__headline{color:#1e4fa0}

.nw__date{
  margin-top:8px;
  font-family:var(--nw-font);
  font-size:.74rem;font-weight:500;letter-spacing:.02em;
  color:var(--nw-muted);
}

/* ---------- FOOT ---------- */
.nw__foot{
  display:flex;justify-content:flex-start;
  margin-top:clamp(28px,3.5vw,48px);
}
.nw__all{
  display:inline-flex;align-items:center;gap:10px;
  padding:11px 22px;border-radius:999px;
  background-color:#121212;color:#ffffff;text-decoration:none;
  font-family:var(--nw-font);
  font-size:.8rem;font-weight:600;letter-spacing:.01em;
  transition:background-color .3s ease,transform .3s cubic-bezier(.16,1,.3,1);
}
.nw__all svg{width:15px;height:15px}
.nw__all:hover{background-color:#1e4fa0;transform:translateY(-2px)}

/* ---------- RESPONSIVE ---------- */
@media (max-width:1100px){
  .nw__nav--prev{left:-6px}
  .nw__nav--next{right:-6px}
  .nw__nav{
    background-color:rgba(255,255,255,.86);
    backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
    width:38px;height:38px;
  }
}

@media (max-width:1023px){
  .nw{--nw-gap:24px}
  .nw__track{grid-auto-columns:calc((100% - var(--nw-gap)) / 2)}
}

@media (max-width:620px){
  .nw{padding-top:20px;--nw-gap:16px}
  .nw__title{font-size:1.75rem}
  .nw__track{
    grid-auto-columns:82%;
    margin:0 -20px;
    padding:0 20px 4px;
    scroll-padding-left:20px;
  }
  .nw__nav{display:none}
  .nw__imgWrap{max-height:none}
  .nw__headline{font-size:1rem}
  .nw__pill,.nw__frame{display:none}
  .nw__foot{justify-content:stretch}
  .nw__all{width:100%;justify-content:center}
}

@media (max-width:380px){
  .nw__track{grid-auto-columns:88%}
}

@media (prefers-reduced-motion:reduce){
  .nw__track{scroll-behavior:auto}
  .nw__img,.nw__veil,.nw__frame,.nw__pill,.nw__nav,.nw__all,.nw__headline{
    transition:none !important;
  }
}
`;