"use client";

import { Cormorant_Garamond, Jost, IBM_Plex_Mono, Inter } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const heroSans = Inter({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-hero",
  display: "swap",
});

export default function ContactUsPage() {
  return (
    <main className={`${display.variable} ${body.variable} ${mono.variable} ${heroSans.variable}`}>
      {/* ===== HERO ===== */}
      <section className="hero">
        <h1 className="hero-title">CONTACT US</h1>
        <p className="hero-subtitle">
          A CONVERSATION IS THE FIRST FLOOR PLAN.
        </p>
      </section>

      {/* ===== CONTACT + FORM ===== */}
      <section className="contact">
        <div className="contact-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="contact-media-img"
            src="/contact-office.jpg"
            alt=""
          />
          <div className="contact-media-rule" />
        </div>

        <div className="contact-panel">
          <div className="contact-block">
            <h2 className="contact-heading">Contact</h2>

            <div className="contact-item">
              <span className="contact-label">CORPORATE OFFICE</span>
              <p className="contact-value contact-value--strong">
                Flat A10, Archana Castle
                <br />
                4/23 Patrick Church Road, St. Thomas Mount
                <br />
                Chennai 600016
              </p>
            </div>

            <div className="contact-item">
              <span className="contact-label">PHONE</span>
              <a className="contact-value contact-value--strong" href="tel:+919543633333">
                +91 95436 33333
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-label">EMAIL</span>
              <a
                className="contact-value contact-value--strong"
                href="mailto:pkr@pkrestates.com"
              >
                pkr@pkrestates.com
              </a>
            </div>

            <div className="contact-divider" />

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <h2 className="contact-heading">Form</h2>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your Name" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="Your Email" />
                </div>
              </div>

              <div className="form-field form-field--full">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                />
              </div>

              <button type="submit" className="form-submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx global>{`
        main {
          font-family: var(--font-body), "Helvetica Neue", Arial, sans-serif;
          background: #faf7f1;
          color: #241f1a;
        }

        /* ---------- HERO ---------- */
        .hero {
          width: 100%;
          background: #fbfbfb;
          border-bottom: 1px solid #ececec;
          padding: 5.5rem 6vw 4.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .hero-title {
          font-family: var(--font-hero), "Helvetica Neue", Arial, sans-serif;
          font-weight: 800;
          font-size: clamp(2.6rem, 10vw, 7.5rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: #111111;
          margin: 0;
          margin-top: 50px;
          word-break: break-word;
        }
        .hero-subtitle {
          margin-top: 1.25rem;
          font-family: var(--font-mono), "Courier New", monospace;
          font-size: clamp(0.62rem, 1.1vw, 0.8rem);
          letter-spacing: 0.12em;
          color: #6b7280;
          padding: 0 4px;
        }

        /* ---------- CONTACT + FORM ---------- */
        .contact {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          min-height: 100vh;
          background: #fbfbfb;
        }

        .contact-media {
          position: relative;
          overflow: hidden;
          background: #e5e2da;
          min-height: 340px;
        }
        .contact-media-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .contact-media-rule {
          position: absolute;
          top: 2.5rem;
          left: 2.5rem;
          right: 2.5rem;
          height: 1px;
          background: rgba(255, 255, 255, 0.7);
        }

        .contact-panel {
          padding: 5vw 3vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .contact-heading {
          font-family: var(--font-hero), "Helvetica Neue", Arial, sans-serif;
          font-weight: 800;
          font-size: clamp(1.5rem, 3vw, 2rem);
          letter-spacing: -0.02em;
          color: #111111;
          margin: 0 0 2rem;
        }

        .contact-block {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .contact-label {
          font-family: var(--font-mono), "Courier New", monospace;
          font-size: 0.66rem;
          letter-spacing: 0.16em;
          color: #9a9690;
        }

        .contact-value {
          font-family: var(--font-hero), "Helvetica Neue", Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(0.92rem, 2vw, 1.05rem);
          color: #241f1a;
          text-decoration: none;
          line-height: 1.55;
          word-break: break-word;
        }
        .contact-value--strong {
          font-weight: 700;
        }
        a.contact-value:hover,
        a.contact-value:focus-visible {
          color: #9a6b3f;
        }
        a.contact-value:focus-visible {
          outline: 2px solid #9a6b3f;
          outline-offset: 3px;
        }

        .contact-divider {
          height: 1px;
          background: #e6e3dc;
          margin: 3.25rem 0;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .form-field--full {
          width: 100%;
        }

        .form-field label {
          font-family: var(--font-body), sans-serif;
          font-weight: 400;
          font-size: 0.92rem;
          color: #4a463f;
        }

        .form-field input,
        .form-field textarea {
          font-family: var(--font-body), sans-serif;
          font-size: 16px; /* prevents iOS zoom-on-focus */
          color: #241f1a;
          background: transparent;
          border: none;
          border-bottom: 1px solid #d8d4cb;
          padding: 0.5rem 0.1rem;
          outline: none;
          resize: vertical;
          transition: border-color 0.25s ease;
          width: 100%;
        }
        .form-field input::placeholder,
        .form-field textarea::placeholder {
          color: #b3aea3;
        }
        .form-field input:focus,
        .form-field textarea:focus {
          border-color: #9a6b3f;
        }

        .form-submit {
          align-self: flex-start;
          font-family: var(--font-body), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #fbfbfb;
          background: #111111;
          border: none;
          padding: 0.85rem 2.2rem;
          cursor: pointer;
          transition: background 0.25s ease;
        }
        .form-submit:hover,
        .form-submit:focus-visible {
          background: #9a6b3f;
        }
        .form-submit:focus-visible {
          outline: 2px solid #111111;
          outline-offset: 3px;
        }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 1024px) {
          .contact-panel {
            padding: 6vw;
          }
          .form-row {
            gap: 1.75rem;
          }
        }

        @media (max-width: 900px) {
          .contact {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .contact-media {
            min-height: 42vh;
            order: 1;
          }
          .contact-panel {
            order: 2;
            padding: 12vw 6vw 16vw;
          }
          .form-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding: 3.5rem 6vw 2.5rem;
          }
          .hero-title {
            margin-top: 30px;
          }
          .contact-media {
            min-height: 34vh;
          }
          .contact-media-rule {
            top: 1.5rem;
            left: 1.5rem;
            right: 1.5rem;
          }
          .contact-panel {
            padding: 10vw 6vw 12vw;
          }
          .contact-heading {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .contact-block {
            gap: 1.4rem;
          }
          .contact-divider {
            margin: 2.2rem 0;
          }
          .form-submit {
            width: 100%;
          }
        }

        @media (max-width: 400px) {
          .contact-media {
            min-height: 28vh;
          }
          .hero-title {
            font-size: clamp(2.2rem, 12vw, 3rem);
          }
        }
      `}</style>
    </main>
  );
}