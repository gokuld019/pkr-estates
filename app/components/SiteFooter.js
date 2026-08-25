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
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
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
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer className="pkr-footer">
      <style>{css}</style>

      <div className="pkr-inner">
        <div className="pkr-top">
          <div className="pkr-brand-block">
            <img src="/pkr-logo.png" alt="PKR Estates" className="pkr-mark" />
            <p className="pkr-tagline">
              Crafting landmark residences and commercial spaces across North
              India since 1998.
            </p>
          </div>

          <div className="pkr-news">
            <h3 className="pkr-news-heading">Subscribe to our Newsletter</h3>
            <p className="pkr-news-sub">
              New launches, market insights and offers — once a month, no spam.
            </p>

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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
            <span className={`pkr-toast ${sent ? "is-on" : ""}`}>
              Thanks — you&apos;re on the list.
            </span>
          </div>
        </div>

        <div className="pkr-rule" />

        <div className="pkr-grid">
          <div className="pkr-col">
            <span className="pkr-label">Head Office</span>
            <p className="pkr-text">
              Flat A10, Archana Castle,
              <br />
              4/23 Patrick Church Road,
              <br />
              St.Thomas Mount, Chennai 600016
            </p>
          </div>

          <div className="pkr-col">
            <span className="pkr-label">Get in Touch</span>
            <a href="mailto:pkr@pkrestates.com" className="pkr-text pkr-a">
              pkr@pkrestates.com
            </a>
            <a href="tel:+919543633333" className="pkr-text pkr-a">
              +91 95436 33333
            </a>
          </div>

          <nav aria-label="Footer" className="pkr-col">
            <span className="pkr-label">Navigate</span>
            {NAV_LINKS.map((item) => (
              <Link key={item.label} href={item.href} className="pkr-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pkr-col">
            <span className="pkr-label">Follow</span>
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pkr-link"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="pkr-wordmark">
          <span>PKR&nbsp;ESTATES</span>
        </div>

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
  background:#fff;
  color:${INK};
  border-top:1px solid rgba(10,24,48,.08);
  font-family:var(--font-geist-sans),system-ui,sans-serif;
  overflow-x:clip;
}
.pkr-footer::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(120% 80% at 85% 0%,rgba(30,79,160,.06),transparent 60%);
}
.pkr-inner{
  position:relative;
  width:100%;
  max-width:1280px;margin:0 auto;
  padding:clamp(56px,7vw,96px) clamp(20px,5vw,64px) 28px;
}

.pkr-top{
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:clamp(32px,6vw,80px);
  align-items:start;
}
.pkr-mark{height:clamp(38px,4vw,54px);width:auto;display:block}
.pkr-tagline{
  margin:20px 0 0;max-width:34ch;
  font-size:.95rem;line-height:1.7;color:rgba(10,24,48,.6);
  font-family:var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif;
}
.pkr-news-heading{
  margin:0;font-size:clamp(1.25rem,2vw,1.6rem);font-weight:700;letter-spacing:-.02em;
  font-family:var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
}
.pkr-news-sub{
  margin:10px 0 22px;font-size:.9rem;line-height:1.6;color:rgba(10,24,48,.55);max-width:42ch;
  font-family:var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif;
}
.pkr-form{
  display:flex;align-items:center;gap:12px;
  border-bottom:1px solid rgba(10,24,48,.2);
  padding-bottom:12px;transition:border-color .25s ease;
}
.pkr-form:focus-within{border-color:${BLUE}}
.pkr-input{
  flex:1;min-width:0;background:transparent;border:0;outline:0;
  font:inherit;font-size:.95rem;color:${INK};padding:4px 0;
  font-family:var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif;
}
.pkr-input::placeholder{color:rgba(10,24,48,.35)}
.pkr-submit{
  flex:0 0 auto;display:grid;place-items:center;
  width:38px;height:38px;border-radius:50%;border:0;
  background:${BLUE};color:#fff;cursor:pointer;
  transition:transform .25s ease,background .25s ease;
}
.pkr-submit:hover{background:${GREEN};transform:translateX(3px)}
.pkr-toast{
  display:block;margin-top:10px;font-size:.78rem;color:${GREEN};
  opacity:0;transform:translateY(-4px);transition:.3s ease;
}
.pkr-toast.is-on{opacity:1;transform:none}

.pkr-rule{
  height:1px;background:rgba(10,24,48,.1);
  margin:clamp(40px,6vw,72px) 0 clamp(32px,4vw,48px);
}

.pkr-grid{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:clamp(28px,4vw,48px);
  align-items:start;
}
.pkr-col{display:flex;flex-direction:column;gap:12px;min-width:0}
.pkr-label{
  font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:${GREEN};margin-bottom:4px;
  font-family:var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif;
}
.pkr-text{
  margin:0;font-size:.92rem;line-height:1.65;color:rgba(10,24,48,.72);
  font-family:var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif;
}
.pkr-a{text-decoration:none;transition:color .2s ease;width:fit-content}
.pkr-a:hover{color:${BLUE}}
.pkr-link{
  position:relative;width:fit-content;
  font-size:.95rem;font-weight:500;color:rgba(10,24,48,.72);
  text-decoration:none;transition:color .22s ease;
  font-family:var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif;
}
.pkr-link::after{
  content:"";position:absolute;left:0;bottom:-3px;height:1px;width:0;
  background:${BLUE};transition:width .28s ease;
}
.pkr-link:hover{color:${BLUE}}
.pkr-link:hover::after{width:100%}

.pkr-wordmark{
  margin:clamp(56px,8vw,104px) 0 clamp(24px,3vw,36px);
  text-align:center;line-height:.9;user-select:none;
  width:100%;
}
.pkr-wordmark span{
  display:block;
  width:100%;
  font-size:clamp(2rem,11vw,9rem);
  font-weight:800;letter-spacing:-.045em;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:clip;
  background:linear-gradient(180deg,rgba(10,24,48,.14),rgba(10,24,48,.03));
  -webkit-background-clip:text;background-clip:text;color:transparent;
  font-family:var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
}

.pkr-legal{
  display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;
  gap:16px;padding-top:22px;border-top:1px solid rgba(10,24,48,.1);
}
.pkr-copy{
  font-size:.76rem;color:rgba(10,24,48,.45);
  font-family:var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif;
}
.pkr-legal-links{display:flex;flex-wrap:wrap;gap:22px}
.pkr-legal-link{
  font-size:.76rem;color:rgba(10,24,48,.45);text-decoration:none;transition:color .2s ease;
  font-family:var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif;
}
.pkr-legal-link:hover{color:${BLUE}}

@media (max-width:900px){
  .pkr-top{grid-template-columns:1fr;gap:44px}
  .pkr-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:36px 24px}
}
@media (max-width:560px){
  .pkr-grid{grid-template-columns:1fr}
  .pkr-legal{flex-direction:column;align-items:flex-start}
  .pkr-wordmark span{font-size:clamp(2rem,16vw,4rem)}
}
`;