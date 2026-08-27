"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/pkrestates",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/PKRestates/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 9V7.2c0-.9.2-1.3 1.4-1.3H17V3h-2.6C11.3 3 10 4.4 10 6.9V9H8v3h2v9h4v-9h2.6l.4-3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCqxFo8on9tQNwQq11KNfU2w",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23 12s0-3.4-.43-5.03a2.62 2.62 0 00-1.84-1.85C19.1 4.7 12 4.7 12 4.7s-7.1 0-8.73.42A2.62 2.62 0 001.43 6.97C1 8.6 1 12 1 12s0 3.4.43 5.03a2.62 2.62 0 001.84 1.85c1.63.42 8.73.42 8.73.42s7.1 0 8.73-.42a2.62 2.62 0 001.84-1.85C23 15.4 23 12 23 12zM9.75 15.3V8.7L15.5 12z" />
      </svg>
    ),
  },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Sitemap", href: "#" },
];

const BLUE = "#1e4fa0";
const GREEN = "#12a877";
const INK = "#0a1830";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !agreed) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer className="pkr-footer">
      <style>{css}</style>

      <div className="pkr-inner">
        {/* ============ TOP : LOGO + NEWSLETTER ============ */}
        <div className="pkr-top">
          <div className="pkr-statement-block">
            <Link href="/" className="pkr-logo-link" aria-label="PKR Estates — Home">
              <img src="/pkr-logo.png" alt="PKR Estates" className="pkr-logo" />
            </Link>

            <div className="pkr-contact-row">
              <a href="mailto:pkr@pkrestates.com" className="pkr-mail">
                pkr@pkrestates.com
              </a>

              <div className="pkr-social-row">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="pkr-social"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pkr-news">
            <h3 className="pkr-news-heading">Subscribe to the newsletter</h3>

            <form onSubmit={handleSubmit} className="pkr-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="pkr-input"
              />
              <button type="submit" aria-label="Subscribe" className="pkr-submit">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12h16M14 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            <label className="pkr-consent">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="pkr-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="pkr-consent-text">
                I have read and accept the{" "}
                <a href="#" className="pkr-consent-link">Privacy Policy</a>.
              </span>
            </label>

            <span className={`pkr-toast ${sent ? "is-on" : ""}`}>
              Thanks — you&apos;re on the list.
            </span>

            <div className="pkr-address">
              <p className="pkr-address-text">
                Flat A10, Archana Castle
                <br />
                4/23 Patrick Church Road, St. Thomas Mount
                <br />
                Chennai 600016
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=St.Thomas+Mount+Chennai+600016"
                target="_blank"
                rel="noopener noreferrer"
                className="pkr-directions"
              >
                Get Directions
              </a>
              <a href="tel:+919543633333" className="pkr-phone">
                +91 95436 33333
              </a>
            </div>
          </div>
        </div>

        <div className="pkr-rule" />

        {/* ============ LINK GRID ============ */}
        <div className="pkr-grid">
          <nav aria-label="Footer" className="pkr-col">
            <span className="pkr-label">Navigate</span>
            <div className="pkr-links">
              {NAV_LINKS.map((item) => (
                <Link key={item.label} href={item.href} className="pkr-link">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="pkr-col">
            <span className="pkr-label">Projects</span>
            <div className="pkr-links">
              <Link href="/projects" className="pkr-link">Ongoing</Link>
              <Link href="/projects" className="pkr-link">Completed</Link>
              <Link href="/projects" className="pkr-link">Upcoming</Link>
              <Link href="/projects" className="pkr-link">Commercial</Link>
            </div>
          </div>

          <div className="pkr-col">
            <span className="pkr-label">Company</span>
            <div className="pkr-links">
              <Link href="/about" className="pkr-link">About Us</Link>
              <Link href="/blogs" className="pkr-link">Insights</Link>
              <a href="#" className="pkr-link">Careers</a>
              <Link href="/contact-us" className="pkr-link">Enquiries</Link>
            </div>
          </div>

          <div className="pkr-col pkr-col--cta">
            <span className="pkr-label">Let&apos;s Talk</span>
            <p className="pkr-cta-copy">
              Planning your next home or investment? Our team will walk you
              through every option.
            </p>
            <Link href="/contact-us" className="pkr-cta">
              Book a site visit
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ============ LEGAL ============ */}
        <div className="pkr-legal">
          <span className="pkr-copy">
            © {year} PKR Estates. All rights reserved.
          </span>
          <div className="pkr-legal-links">
            {LEGAL_LINKS.map((item) => (
              <a key={item.label} href={item.href} className="pkr-legal-link">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const css = `
.pkr-footer{
  position:relative;
  width:100%;
  max-width:100%;
  background:#f4f2ee;
  color:${INK};
  border-top:1px solid rgba(10,24,48,.07);
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  overflow-x:clip;
}
.pkr-footer::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(90% 60% at 88% 0%,rgba(30,79,160,.07),transparent 62%),
    radial-gradient(70% 50% at 5% 100%,rgba(18,168,119,.06),transparent 60%);
}
.pkr-inner{
  position:relative;
  width:100%;
  max-width:1320px;margin:0 auto;
  padding:clamp(60px,8vw,120px) clamp(20px,5vw,64px) 26px;
}

/* ---------- TOP ---------- */
.pkr-top{
  display:grid;
  grid-template-columns:1.15fr .85fr;
  gap:clamp(40px,7vw,110px);
  align-items:start;
}
.pkr-logo-link{
  display:inline-block;width:fit-content;
  transition:transform .5s cubic-bezier(.16,1,.3,1),opacity .3s ease;
}
.pkr-logo-link:hover{transform:translateY(-2px);opacity:.88}
.pkr-logo{
  display:block;
  width:min(100%,460px);
  height:auto;
  object-fit:contain;
}
.pkr-contact-row{
  display:flex;flex-wrap:wrap;align-items:center;
  gap:clamp(18px,3vw,42px);
  margin-top:clamp(32px,4vw,54px);
}
.pkr-mail{
  position:relative;
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:clamp(.95rem,1.3vw,1.1rem);
  font-weight:500;color:${INK};text-decoration:none;
  padding-bottom:5px;
}
.pkr-mail::after{
  content:"";position:absolute;left:0;bottom:0;height:1.5px;width:100%;
  background:${INK};transform-origin:right;transition:transform .35s cubic-bezier(.16,1,.3,1);
}
.pkr-mail:hover{color:${BLUE}}
.pkr-mail:hover::after{background:${BLUE};transform:scaleX(.4);transform-origin:left}

.pkr-social-row{display:flex;align-items:center;gap:10px}
.pkr-social{
  display:grid;place-items:center;
  width:40px;height:40px;border-radius:50%;
  border:1px solid rgba(10,24,48,.14);
  color:rgba(10,24,48,.7);
  background:rgba(255,255,255,.5);
  transition:transform .3s cubic-bezier(.16,1,.3,1),background .3s ease,color .3s ease,border-color .3s ease;
}
.pkr-social svg{width:17px;height:17px}
.pkr-social:hover{
  background:${INK};border-color:${INK};color:#fff;transform:translateY(-3px);
}

/* ---------- NEWSLETTER ---------- */
.pkr-news{padding-top:clamp(4px,1vw,10px)}
.pkr-news-heading{
  margin:0 0 22px;
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:clamp(1.1rem,1.7vw,1.4rem);
  font-weight:600;letter-spacing:-.02em;color:${INK};
}
.pkr-form{
  display:flex;align-items:center;gap:14px;
  border-bottom:1.5px solid rgba(10,24,48,.18);
  padding-bottom:12px;transition:border-color .3s ease;
}
.pkr-form:focus-within{border-color:${BLUE}}
.pkr-input{
  flex:1;min-width:0;background:transparent;border:0;outline:0;
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.95rem;color:${INK};padding:6px 0;
}
.pkr-input::placeholder{color:rgba(10,24,48,.34)}
.pkr-submit{
  flex:0 0 auto;display:grid;place-items:center;
  width:40px;height:40px;border-radius:50%;border:0;
  background:${INK};color:#fff;cursor:pointer;
  transition:transform .3s cubic-bezier(.16,1,.3,1),background .3s ease;
}
.pkr-submit:hover{background:${BLUE};transform:translateX(4px)}
.pkr-submit:active{transform:scale(.93)}

.pkr-consent{
  display:flex;align-items:flex-start;gap:10px;
  margin-top:16px;cursor:pointer;user-select:none;
}
.pkr-consent input{position:absolute;opacity:0;width:0;height:0}
.pkr-box{
  flex:0 0 auto;display:grid;place-items:center;
  width:18px;height:18px;margin-top:1px;border-radius:5px;
  border:1.5px solid rgba(10,24,48,.28);
  color:transparent;background:transparent;
  transition:background .22s ease,border-color .22s ease,color .22s ease;
}
.pkr-box svg{width:11px;height:11px}
.pkr-consent input:checked + .pkr-box{
  background:${GREEN};border-color:${GREEN};color:#fff;
}
.pkr-consent input:focus-visible + .pkr-box{outline:2px solid ${BLUE};outline-offset:2px}
.pkr-consent-text{
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.78rem;line-height:1.55;color:rgba(10,24,48,.55);
}
.pkr-consent-link{color:${BLUE};text-decoration:underline;text-underline-offset:2px}

.pkr-toast{
  display:block;margin-top:10px;
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.76rem;color:${GREEN};
  opacity:0;transform:translateY(-4px);transition:.3s ease;
}
.pkr-toast.is-on{opacity:1;transform:none}

.pkr-address{
  margin-top:clamp(30px,4vw,46px);
  display:flex;flex-direction:column;align-items:flex-start;gap:10px;
}
.pkr-address-text{
  margin:0;
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.9rem;line-height:1.7;color:rgba(10,24,48,.68);
}
.pkr-directions{
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.84rem;font-weight:600;color:${INK};
  text-decoration:underline;text-underline-offset:4px;
  transition:color .2s ease;
}
.pkr-directions:hover{color:${BLUE}}
.pkr-phone{
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.9rem;font-weight:500;color:rgba(10,24,48,.68);
  text-decoration:none;transition:color .2s ease;
}
.pkr-phone:hover{color:${BLUE}}

.pkr-rule{
  height:1px;background:rgba(10,24,48,.1);
  margin:clamp(48px,7vw,90px) 0 clamp(36px,4.5vw,54px);
}

/* ---------- GRID ---------- */
.pkr-grid{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:clamp(30px,4vw,52px);
  align-items:start;
}
.pkr-col{display:flex;flex-direction:column;gap:14px;min-width:0}
.pkr-links{display:flex;flex-direction:column;gap:11px}
.pkr-label{
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.64rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:rgba(10,24,48,.4);
}
.pkr-link{
  position:relative;width:fit-content;
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.92rem;font-weight:500;color:rgba(10,24,48,.75);
  text-decoration:none;transition:color .22s ease,transform .28s cubic-bezier(.16,1,.3,1);
}
.pkr-link::after{
  content:"";position:absolute;left:0;bottom:-3px;height:1px;width:0;
  background:${BLUE};transition:width .3s cubic-bezier(.16,1,.3,1);
}
.pkr-link:hover{color:${BLUE};transform:translateX(3px)}
.pkr-link:hover::after{width:100%}

.pkr-col--cta{gap:12px}
.pkr-cta-copy{
  margin:0;
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.88rem;line-height:1.65;color:rgba(10,24,48,.6);max-width:30ch;
}
.pkr-cta{
  display:inline-flex;align-items:center;gap:9px;width:fit-content;
  margin-top:6px;padding:12px 22px;border-radius:999px;
  background:${INK};color:#fff;text-decoration:none;
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.8rem;font-weight:600;letter-spacing:.01em;
  transition:background .3s ease,transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s ease;
}
.pkr-cta:hover{
  background:${BLUE};transform:translateY(-2px);
  box-shadow:0 14px 30px rgba(30,79,160,.28);
}

/* ---------- LEGAL ---------- */
.pkr-legal{
  display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;
  gap:16px;
  margin-top:clamp(48px,7vw,90px);
  padding-top:24px;border-top:1px solid rgba(10,24,48,.1);
}
.pkr-copy{
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.74rem;color:rgba(10,24,48,.42);
}
.pkr-legal-links{display:flex;flex-wrap:wrap;gap:24px}
.pkr-legal-link{
  font-family:var(--font-figtree), 'Figtree', system-ui, -apple-system, sans-serif;
  font-size:.74rem;color:rgba(10,24,48,.42);text-decoration:none;transition:color .2s ease;
}
.pkr-legal-link:hover{color:${BLUE}}

/* ---------- RESPONSIVE ---------- */
@media (max-width:960px){
  .pkr-top{grid-template-columns:1fr;gap:48px}
  .pkr-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:38px 24px}
  .pkr-col--cta{grid-column:1 / -1}
}
@media (max-width:560px){
  .pkr-grid{grid-template-columns:1fr}
  .pkr-legal{flex-direction:column;align-items:flex-start}
  .pkr-contact-row{flex-direction:column;align-items:flex-start;gap:22px}
  .pkr-logo{width:min(100%,260px)}
}

@media (prefers-reduced-motion:reduce){
  .pkr-social,.pkr-link,.pkr-cta,.pkr-submit,.pkr-logo-link{transition:none !important}
}
`;