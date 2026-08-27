"use client";

import { useEffect, useRef, useState } from "react";

function formatINR(num) {
  return "₹" + Math.round(num).toLocaleString("en-IN");
}

function Reveal({ children, className = "", style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "in" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const r = interestRate / 12 / 100;
  const n = tenure * 12;
  const emi = r === 0 ? loanAmount / n : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;
  const principalPct = (loanAmount / totalPayment) * 100;
  const interestPct = 100 - principalPct;

  return (
    <>
      <style>{`
        :root{
          --paper:#ffffff;
          --paper-warm:#f7f7f7;
          --ink:#000000;
          --ink-soft:#555555;
          --hairline:rgba(0,0,0,0.14);
          --brass:#000000;
          --brass-deep:#000000;
          --clay:#000000;
          --stone:#e5e5e5;
        }
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{background:var(--paper);color:var(--ink);font-family:var(--font-figtree), sans-serif;overflow-x:hidden;}
        ::selection{background:var(--ink);color:var(--paper);}
        a{color:inherit;text-decoration:none;}

        .top-strip{height:14px;background:linear-gradient(180deg,var(--stone) 0%, var(--paper) 100%);border-bottom:1px solid var(--hairline);}

        .hero{position:relative;min-height:78vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8vh 6% 10vh;overflow:hidden;}
        .hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 20%, rgba(0,0,0,0.04), transparent 70%);z-index:0;}
        .hero-grain{position:absolute;inset:0;opacity:0.5;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");}
        .hero-word{font-family:var(--font-figtree), sans-serif;font-weight:800;font-size:clamp(2.6rem, 13vw, 10.5rem);line-height:0.92;letter-spacing:-0.03em;color:var(--ink);z-index:2;will-change:transform;word-break:break-word;}
        .hero-tagline{margin-top:22px;font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:clamp(0.62rem,1.1vw,0.85rem);letter-spacing:0.18em;text-transform:uppercase;color:var(--ink-soft);z-index:2;padding:0 4px;}
        .hero-sub{margin-top:28px;max-width:560px;font-size:clamp(0.9rem,2vw,1.05rem);line-height:1.7;color:var(--ink-soft);z-index:2;}
        .hero-actions{margin-top:36px;display:flex;gap:14px;z-index:2;flex-wrap:wrap;justify-content:center;width:100%;}
        .btn-primary{background:var(--ink);color:var(--paper);padding:15px 28px;font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.75rem;letter-spacing:0.08em;text-transform:uppercase;border:1px solid var(--ink);cursor:pointer;transition:transform .3s cubic-bezier(.2,.8,.2,1), background .3s ease, color .3s ease;display:inline-block;text-align:center;}
        .btn-primary:hover{background:var(--paper);color:var(--ink);transform:translateY(-2px);}
        .btn-ghost{border:1px solid var(--hairline);padding:15px 28px;font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.75rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink-soft);background:transparent;cursor:pointer;transition:border-color .3s ease,color .3s ease;display:inline-block;text-align:center;}
        .btn-ghost:hover{border-color:var(--ink);color:var(--ink);}

        .scroll-cue{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--ink-soft);display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;}
        .scroll-line{width:1px;height:32px;background:linear-gradient(var(--ink-soft),transparent);animation:scrollpulse 2s ease-in-out infinite;}
        @keyframes scrollpulse{0%,100%{transform:scaleY(1);opacity:0.5;}50%{transform:scaleY(0.6);opacity:1;}}

        .band{position:relative;min-height:280px;display:flex;align-items:center;justify-content:center;background:linear-gradient(rgba(0,0,0,0.66), rgba(0,0,0,0.66)),url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop') center 40%/cover fixed;text-align:center;overflow:hidden;padding:60px 6%;}
        .band-text{color:var(--paper);max-width:680px;}
        .band-eyebrow{font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.68rem;letter-spacing:0.18em;text-transform:uppercase;color:#e5e5e5;margin-bottom:16px;}
        .band-line{font-family:var(--font-figtree), sans-serif;font-size:clamp(1.25rem,4vw,2.4rem);font-weight:600;line-height:1.35;letter-spacing:-0.01em;}
        @media(max-width:700px){.band{background-attachment:scroll;}}

        section{padding:clamp(60px,10vw,76px) 6%;position:relative;}
        .section-head{max-width:640px;margin:0 auto clamp(36px,6vw,64px);text-align:center;}
        .eyebrow{font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.7rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--ink);margin-bottom:14px;}
        .section-title{font-family:var(--font-figtree), sans-serif;font-size:clamp(1.7rem,5.5vw,3.1rem);font-weight:800;letter-spacing:-0.02em;line-height:1.12;}
        .section-desc{margin-top:16px;color:var(--ink-soft);font-size:clamp(0.88rem,2vw,1.02rem);line-height:1.7;}

        .reveal{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1);}
        .reveal.in{opacity:1;transform:translateY(0);}

        #emi{background:var(--paper-warm);border-top:1px solid var(--hairline);border-bottom:1px solid var(--hairline);}
        .calc-wrap{max-width:1120px;margin:0 auto;grid-template-columns:1.05fr 0.95fr;gap:0;border:1px solid var(--hairline);background:var(--paper);box-shadow:0 40px 80px -40px rgba(0,0,0,0.18);}
        @media(max-width:900px){.calc-wrap{grid-template-columns:1fr !important;}}

        .calc-inputs{padding:clamp(28px,5vw,56px) clamp(20px,4vw,48px);border-right:1px solid var(--hairline);}
        @media(max-width:900px){.calc-inputs{border-right:none;border-bottom:1px solid var(--hairline);}}
        .calc-label-row{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:10px;gap:8px;flex-wrap:wrap;}
        .calc-label{font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.7rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink-soft);}
        .calc-value{font-family:var(--font-figtree), sans-serif;font-weight:700;font-size:0.95rem;color:var(--ink);white-space:nowrap;}
        .field{margin-bottom:clamp(24px,4vw,36px);}
        .field input[type="range"]{-webkit-appearance:none;appearance:none;width:100%;height:4px;background:var(--hairline);outline:none;margin-top:14px;touch-action:pan-y;}
        .field input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--ink);border:3px solid var(--paper);box-shadow:0 0 0 1px var(--ink);cursor:pointer;transition:background .2s ease;}
        .field input[type="range"]::-webkit-slider-thumb:hover{background:var(--ink-soft);}
        .field input[type="range"]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:var(--ink);border:3px solid var(--paper);box-shadow:0 0 0 1px var(--ink);cursor:pointer;}
        .field-note{display:flex;justify-content:space-between;margin-top:8px;font-family:var(--font-figtree), sans-serif;font-size:0.65rem;color:#8a8a8a;letter-spacing:0.04em;}

        .calc-results{padding:clamp(28px,5vw,56px) clamp(20px,4vw,48px);background:var(--ink);color:var(--paper);display:flex;flex-direction:column;justify-content:center;}
        .emi-headline{font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.7rem;letter-spacing:0.18em;text-transform:uppercase;color:#bdbdbd;margin-bottom:12px;}
        .emi-amount{font-family:var(--font-figtree), sans-serif;font-size:clamp(2rem,7vw,3.6rem);font-weight:800;letter-spacing:-0.02em;line-height:1;margin-bottom:8px;word-break:break-word;}
        .emi-sub{font-size:0.82rem;color:#bdbdbd;margin-bottom:clamp(24px,5vw,40px);line-height:1.5;}
        .emi-breakdown{display:flex;flex-direction:column;gap:0;border-top:1px solid rgba(255,255,255,0.16);}
        .emi-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.16);gap:10px;flex-wrap:wrap;}
        .emi-row-label{font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.68rem;letter-spacing:0.06em;text-transform:uppercase;color:#bdbdbd;display:flex;align-items:center;gap:10px;}
        .dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
        .dot.principal{background:#ffffff;}
        .dot.interest{background:#8a8a8a;}
        .emi-row-value{font-family:var(--font-figtree), sans-serif;font-weight:700;font-size:0.95rem;}

        .ratio-bar{margin-top:24px;height:8px;width:100%;background:rgba(255,255,255,0.12);display:flex;overflow:hidden;}
        .ratio-principal{background:#ffffff;height:100%;transition:width .5s ease;}
        .ratio-interest{background:#7a7a7a;height:100%;transition:width .5s ease;}
        .emi-note{margin-top:22px;font-size:0.75rem;line-height:1.6;color:#9a9a9a;}

        .trust{display:grid;grid-template-columns:repeat(4,1fr);max-width:1120px;margin:80px auto 0;border-top:1px solid var(--hairline);}
        @media(max-width:760px){.trust{grid-template-columns:repeat(2,1fr);}}
        .trust-item{padding:28px 18px;border-right:1px solid var(--hairline);border-bottom:1px solid var(--hairline);text-align:center;}
        .trust-item:last-child{border-right:none;}
        .trust-num{font-family:var(--font-figtree), sans-serif;font-size:clamp(1.6rem,4vw,2.1rem);font-weight:800;letter-spacing:-0.02em;}
        .trust-label{margin-top:8px;font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.62rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink-soft);}

        .process{max-width:980px;margin:0 auto;}
        .process-item{grid-template-columns:70px 1fr;gap:20px;padding:28px 0;border-top:1px solid var(--hairline);align-items:start;}
        .process-item:last-child{border-bottom:1px solid var(--hairline);}
        .process-num{font-family:var(--font-figtree), sans-serif;font-weight:700;font-size:0.82rem;color:var(--ink);letter-spacing:0.06em;}
        .process-title{font-family:var(--font-figtree), sans-serif;font-size:clamp(1.05rem,3vw,1.25rem);font-weight:700;margin-bottom:8px;letter-spacing:-0.01em;}
        .process-desc{color:var(--ink-soft);font-size:clamp(0.85rem,2vw,0.96rem);line-height:1.65;max-width:520px;}

        .band2{background:linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.78)),url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop') center/cover fixed;}

        .cta-section{text-align:center;}
        .cta-title{font-family:var(--font-figtree), sans-serif;font-size:clamp(1.7rem,6vw,3.8rem);font-weight:800;letter-spacing:-0.02em;max-width:700px;margin:0 auto 22px;line-height:1.16;}
        .cta-title em{font-style:italic;color:var(--ink);font-weight:600;}

        footer{border-top:1px solid var(--hairline);padding:clamp(40px,7vw,64px) 6% 32px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:32px;}
        .footer-mark{font-family:var(--font-figtree), sans-serif;font-weight:800;font-size:1.3rem;}
        .footer-tag{margin-top:10px;font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.66rem;letter-spacing:0.06em;text-transform:uppercase;color:var(--ink-soft);max-width:260px;}
        .footer-cols{display:flex;gap:clamp(32px,6vw,70px);flex-wrap:wrap;}
        .footer-col-title{font-family:var(--font-figtree), sans-serif;font-weight:600;font-size:0.64rem;letter-spacing:0.1em;text-transform:uppercase;color:#8a8a8a;margin-bottom:14px;}
        .footer-col a{display:block;margin-bottom:10px;font-size:0.88rem;color:var(--ink-soft);transition:color .2s ease;}
        .footer-col a:hover{color:var(--ink);}
        .footer-bottom{max-width:1400px;margin:50px auto 0;padding-top:22px;border-top:1px solid var(--hairline);font-family:var(--font-figtree), sans-serif;font-size:0.64rem;letter-spacing:0.04em;color:#8a8a8a;text-align:center;}

        /* ===== Small phones ===== */
        @media(max-width:480px){
          .hero{min-height:70vh;padding:9vh 5% 8vh;}
          .hero-actions{flex-direction:column;width:100%;}
          .btn-primary,.btn-ghost{width:100%;}
          .calc-inputs,.calc-results{padding:24px 18px;}
          .emi-row{flex-direction:row;}
          .process-item{grid-template-columns:1fr;gap:8px;}
          .footer{flex-direction:column;gap:28px;}
          .footer-cols{gap:28px;}
        }
      `}</style>

      <div className="top-strip" />

      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <h1
          className="hero-word"
          style={{ transform: `translateY(${scrollY * 0.18}px)`, opacity: Math.max(1 - scrollY / 500, 0) }}
        >
          EMI CALCULATOR
        </h1>
        <p className="hero-tagline">A residence built on quiet detail and lasting material.</p>
        <p className="hero-sub">
          Plan your home loan with clarity before you plan your rooms. Our EMI calculator gives you honest numbers in seconds, no paperwork, no pressure.
        </p>
        <div className="hero-actions">
          <a href="#emi" className="btn-primary">Open Emi Calculator</a>
          <a href="#process" className="btn-ghost">How It Works</a>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <span className="scroll-line" />
        </div>
      </header>

      {/* <div className="band">
        <Reveal className="band-text">
          <div className="band-eyebrow">Material · Craft · Time</div>
          <div className="band-line">Every Gurudev home is priced the way it&apos;s built — transparently, and to last.</div>
        </Reveal>
      </div> */}

      <section id="emi">
        <Reveal className="section-head">
          <div className="eyebrow">Loan Planning</div>
          <h2 className="section-title">Emi Calculator</h2>
          <p className="section-desc">Move the sliders to match your loan amount, tenure and rate. Your monthly instalment and interest breakdown update instantly.</p>
        </Reveal>

        <Reveal className="calc-wrap" style={{ display: "grid" }}>
          <div className="calc-inputs">
            <div className="field">
              <div className="calc-label-row">
                <span className="calc-label">Loan Amount</span>
                <span className="calc-value">{formatINR(loanAmount)}</span>
              </div>
              <input type="range" min={500000} max={20000000} step={50000} value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
              <div className="field-note"><span>₹5L</span><span>₹2Cr</span></div>
            </div>

            <div className="field">
              <div className="calc-label-row">
                <span className="calc-label">Interest Rate</span>
                <span className="calc-value">{interestRate.toFixed(1)}%</span>
              </div>
              <input type="range" min={5} max={16} step={0.1} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
              <div className="field-note"><span>5%</span><span>16%</span></div>
            </div>

            <div className="field" style={{ marginBottom: 8 }}>
              <div className="calc-label-row">
                <span className="calc-label">Tenure</span>
                <span className="calc-value">{tenure} {tenure === 1 ? "Year" : "Years"}</span>
              </div>
              <input type="range" min={1} max={30} step={1} value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
              <div className="field-note"><span>1 Yr</span><span>30 Yrs</span></div>
            </div>
          </div>

          <div className="calc-results">
            <div className="emi-headline">Your Monthly Emi</div>
            <div className="emi-amount">₹{Math.round(emi).toLocaleString("en-IN")}</div>
            <div className="emi-sub">
              Based on {formatINR(loanAmount)} over {tenure} year{tenure === 1 ? "" : "s"} at {interestRate.toFixed(1)}%
            </div>

            <div className="emi-breakdown">
              <div className="emi-row">
                <span className="emi-row-label"><span className="dot principal" />Principal Amount</span>
                <span className="emi-row-value">{formatINR(loanAmount)}</span>
              </div>
              <div className="emi-row">
                <span className="emi-row-label"><span className="dot interest" />Total Interest</span>
                <span className="emi-row-value">{formatINR(totalInterest)}</span>
              </div>
              <div className="emi-row">
                <span className="emi-row-label">Total Payment</span>
                <span className="emi-row-value">{formatINR(totalPayment)}</span>
              </div>
            </div>

            <div className="ratio-bar">
              <div className="ratio-principal" style={{ width: `${principalPct}%` }} />
              <div className="ratio-interest" style={{ width: `${interestPct}%` }} />
            </div>
            <p className="emi-note">Estimate only, for planning purposes. Actual rates and eligibility are set by your lender.</p>
          </div>
        </Reveal>
      </section>

      <section id="process">
        <Reveal className="section-head">
          <div className="eyebrow">From Enquiry To Keys</div>
          <h2 className="section-title">How financing works with us</h2>
        </Reveal>
        <div className="process">
          <Reveal className="process-item" style={{ display: "grid" }}>
            <div className="process-num">01</div>
            <div>
              <div className="process-title">Estimate your Emi</div>
              <div className="process-desc">Use the calculator above to understand what a comfortable monthly payment looks like before you commit to a unit.</div>
            </div>
          </Reveal>
          <Reveal className="process-item" style={{ display: "grid" }}>
            <div className="process-num">02</div>
            <div>
              <div className="process-title">Talk to our loan desk</div>
              <div className="process-desc">Our in-house advisors compare offers across partner banks and shortlist the terms that suit your income and tenure.</div>
            </div>
          </Reveal>
          <Reveal className="process-item" style={{ display: "grid" }}>
            <div className="process-num">03</div>
            <div>
              <div className="process-title">Documentation, handled</div>
              <div className="process-desc">We coordinate paperwork, valuation and sanction directly with the lender so you&apos;re not chasing branches.</div>
            </div>
          </Reveal>
          <Reveal className="process-item" style={{ display: "grid" }}>
            <div className="process-num">04</div>
            <div>
              <div className="process-title">Move in</div>
              <div className="process-desc">Disbursal is aligned to your construction milestones, and your EMI begins only as agreed in the schedule.</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <Reveal>
          <div className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>Ready When You Are</div>
          <h2 className="cta-title">Run the numbers today, walk the site this weekend.</h2>
          <div className="hero-actions" style={{ marginTop: 10 }}>
            <a href="#emi" className="btn-primary">Recalculate Emi</a>
            <a href="tel:+910000000000" className="btn-ghost">Talk To Loan Desk</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}