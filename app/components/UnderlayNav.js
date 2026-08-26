"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Image from "next/image";

/* ================== BRAND PALETTE (from PKR ESTATES logo) ==================
   Deep blue   #12459B  — primary brand blue ("PKR" wordmark)
   Blue tint   #1E5BC6  — lighter swirl blue
   Green       #0BA37F  — "ESTATES" wordmark / swirl green
   Ink         #0C2340  — near-black navy for text
   Cream       #F5F7FA  — cool off-white panel
=========================================================================== */
const BRAND = {
  blue: "#12459B",
  blueLight: "#1E5BC6",
  green: "#0BA37F",
  ink: "#0C2340",
  panel: "#F4F7FA",
  border: "rgba(12,35,64,0.15)",
};

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Gurudev", href: "/projects/gurudev" },
      { label: "Privana", href: "/projects/privana" },
    ],
  },
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "Blogs", href: "/" },
  { label: "Contact Us", href: "/contact-us" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "WhatsApp", href: "#" },
];

const QUICK_LINKS = [
  { label: "Privacy Policy ↗", href: "#" },
  { label: "Terms & Conditions ↗", href: "#" },
];

export default function UnderlayNav() {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const darkRef = useRef(null);
  const isOpenRef = useRef(false);
  const headerRef = useRef(null);
  const toggleFnRef = useRef(null); // exposes toggle() outside the setup effect
  const [hideHeader, setHideHeader] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  // Hero visibility → header colour only (transparent over hero, white after)
  useEffect(() => {
    const heroEl = document.querySelector("[data-hero-banner]");
    if (!heroEl) {
      setScrolledPastHero(true);
      return;
    }

    setScrolledPastHero(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const heroActive = entry.isIntersecting && entry.intersectionRatio > 0.15;
        setScrolledPastHero(!heroActive);
      },
      { threshold: [0, 0.15, 0.5, 1] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [pathname]);

  // Scroll direction → hide on scroll down, reveal on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;

        if (isOpenRef.current) {
          setHideHeader(false);
          lastY = y;
          ticking = false;
          return;
        }

        if (y < 80) {
          setHideHeader(false);
        } else if (delta > 6) {
          setHideHeader(true);
        } else if (delta < -6) {
          setHideHeader(false);
        }

        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate header in/out
  useEffect(() => {
    if (!headerRef.current) return;
    const shouldHide = hideHeader && !isOpenRef.current;
    gsap.to(headerRef.current, {
      autoAlpha: shouldHide ? 0 : 1,
      y: shouldHide ? -100 : 0,
      duration: 0.4,
      ease: "power2.out",
      pointerEvents: shouldHide ? "none" : "auto",
    });
  }, [hideHeader]);

  // Menu GSAP setup — no longer hard-requires [data-main]
  useEffect(() => {
    if (!toggleBtnRef.current || !menuRef.current) return;

    // mainEl is optional: some pages don't wrap content in [data-main].
    // When absent, the menu/overlay still animate; we just skip pushing the page content.
    const mainEl = document.querySelector("[data-main]");

    gsap.registerPlugin(CustomEase);
    if (!CustomEase.get("energy")) {
      CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1");
    }

    const toggleBtn = toggleBtnRef.current;
    const menuEl = menuRef.current;
    const overlayEl = overlayRef.current;
    const darkEl = darkRef.current;

    const toggleLabels = rootRef.current.querySelectorAll("[data-toggle-label]");
    const toggleBars = rootRef.current.querySelectorAll("[data-toggle-bar]");
    const largeItems = rootRef.current.querySelectorAll("[data-reveal-l]");
    const smallItems = rootRef.current.querySelectorAll("[data-reveal-s]");
    const menuBorder = rootRef.current.querySelector("[data-menu-border]");
    const corners = rootRef.current.querySelectorAll("[data-overlay-corner]");
    const overlayBorderRows = rootRef.current.querySelectorAll("[data-overlay-border-row]");
    const topRow = rootRef.current.querySelector('[data-overlay-border-row="top"]') || overlayBorderRows[0];
    const bottomRow = rootRef.current.querySelector('[data-overlay-border-row="bottom"]') || overlayBorderRows[1];

    const getMenuOffset = () => -menuEl.offsetWidth;

    // Panel parked fully off-screen right so it never widens the document
    gsap.set(menuEl, { xPercent: 100, pointerEvents: "none" });
    gsap.set(darkEl, { autoAlpha: 0 });
    if (mainEl) gsap.set(mainEl, { borderTopRightRadius: 0, borderBottomRightRadius: 0 });
    gsap.set(toggleLabels, { yPercent: 0 });
    gsap.set(toggleBars, { y: 0, rotation: 0 });
    if (menuBorder) gsap.set(menuBorder, { scaleX: 0 });
    gsap.set(overlayEl, { visibility: "hidden", pointerEvents: "none" });
    gsap.set(corners, { scale: 0 });
    if (topRow) gsap.set(topRow, { yPercent: -100 });
    if (bottomRow) gsap.set(bottomRow, { yPercent: 100 });

    let isOpen = false;
    let enterEndTime = 0;
    let tl;

    function buildTimeline() {
      tl = gsap.timeline({
        paused: true,
        defaults: { ease: "energy", easeReverse: "power2.inOut" },
      });

      tl.set(overlayEl, { visibility: "visible", pointerEvents: "auto" }, 0)
        .to(menuEl, { xPercent: 0, pointerEvents: "auto", duration: 0.7 }, 0);

      if (mainEl) {
        tl.to(
          mainEl,
          {
            x: getMenuOffset,
            borderTopRightRadius: "2em",
            borderBottomRightRadius: "2em",
            duration: 0.7,
          },
          0
        );
      }

      tl.to(overlayEl, { x: getMenuOffset, duration: 0.7 }, 0)
        .to(darkEl, { autoAlpha: 1, duration: 0.5 }, 0)
        .to(corners, { scale: 1, duration: 0.5 }, 0)
        .to(overlayBorderRows, { yPercent: 0, duration: 0.5 }, 0)
        .to(toggleLabels, { yPercent: -100, duration: 0.4 }, 0)
        .to(
          toggleBars[0],
          { y: "0.25em", rotation: 45, duration: 0.35, ease: "back.out(1.4)", easeReverse: "power3.out" },
          0.05
        )
        .to(
          toggleBars[1],
          { y: "-0.25em", rotation: -45, duration: 0.35, ease: "back.out(1.4)", easeReverse: "power3.out" },
          0.05
        )
        .fromTo(
          largeItems,
          { autoAlpha: 0, xPercent: 25 },
          { autoAlpha: 1, xPercent: 0, duration: 0.7, stagger: 0.05 },
          0
        )
        .fromTo(
          smallItems,
          { autoAlpha: 0, yPercent: 100 },
          { autoAlpha: 1, yPercent: 0, duration: 0.5, stagger: 0.03, ease: "power3.out" },
          0.3
        );

      if (menuBorder) tl.to(menuBorder, { scaleX: 1, duration: 0.5 }, "<");

      enterEndTime = tl.duration();

      tl.addPause();

      tl.to([largeItems, smallItems], { autoAlpha: 0, duration: 0.3 }, "<");

      if (mainEl) {
        tl.to(mainEl, { x: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, duration: 0.6 }, "<");
      }

      tl.to(overlayEl, { x: 0, duration: 0.6 }, "<")
        .to(menuEl, { xPercent: 100, pointerEvents: "none", duration: 0.6 }, "<")
        .to(darkEl, { autoAlpha: 0, duration: 0.35, ease: "power2.inOut" }, "<")
        .to(corners, { scale: 0, duration: 0.5 }, "<");

      if (topRow) tl.to(topRow, { yPercent: -100, duration: 0.5 }, "<");
      if (bottomRow) tl.to(bottomRow, { yPercent: 100, duration: 0.5 }, "<");

      tl.to(toggleLabels, { yPercent: 0, duration: 0.25, ease: "power3.in" }, "<+=0.1")
        .to(toggleBars, { y: 0, rotation: 0, duration: 0.25, ease: "power3.in" }, "<")
        .set(overlayEl, { visibility: "hidden", pointerEvents: "none" });

      if (mainEl) tl.set(mainEl, { clearProps: "transform" });
    }

    function toggle(forceState) {
      const nextState = typeof forceState === "boolean" ? forceState : !isOpen;
      if (nextState === isOpen) return;

      isOpen = nextState;
      isOpenRef.current = isOpen;
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.setAttribute("aria-label", isOpen ? "close menu" : "open menu");
      rootRef.current.setAttribute("data-menu-status", isOpen ? "open" : "");

      document.body.style.overflow = isOpen ? "hidden" : "";

      if (isOpen && headerRef.current) {
        setHideHeader(false);
        gsap.to(headerRef.current, { autoAlpha: 1, y: 0, duration: 0.3, pointerEvents: "auto" });
      }

      if (!isOpen) setExpandedItem(null);

      if (isOpen) {
        tl.invalidate();
        if (tl.time() >= enterEndTime) tl.timeScale(1).restart();
        else tl.timeScale(1).play();
      } else if (tl.time() < enterEndTime) {
        tl.timeScale(1).reverse();
      } else {
        tl.timeScale(1).play();
      }
    }

    // Instant close, no animation — used on route change so there's no
    // visible reverse-animation flash and no stale transform state left behind.
    function closeInstantly() {
      if (!isOpen && tl.time() === 0) return;
      tl.pause(0);
      isOpen = false;
      isOpenRef.current = false;
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "open menu");
      rootRef.current.setAttribute("data-menu-status", "");
      document.body.style.overflow = "";
      setExpandedItem(null);
    }

    toggleFnRef.current = { toggle, closeInstantly, isOpen: () => isOpen };

    buildTimeline();

    const handleToggleClick = () => toggle();
    const handleOverlayClick = () => {
      if (isOpen) toggle(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        toggle(false);
        toggleBtn.focus();
      }
    };

    toggleBtn.addEventListener("click", handleToggleClick);
    overlayEl.addEventListener("click", handleOverlayClick);
    document.addEventListener("keydown", handleKeyDown);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isOpen) {
          const offset = getMenuOffset();
          if (mainEl) gsap.set(mainEl, { x: offset });
          gsap.set(overlayEl, { x: offset });
          gsap.set(menuEl, { xPercent: 0 });
        } else {
          tl.invalidate();
          gsap.set(menuEl, { xPercent: 100 });
        }
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      toggleBtn.removeEventListener("click", handleToggleClick);
      overlayEl.removeEventListener("click", handleOverlayClick);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      tl.kill();
      document.body.style.overflow = "";
      if (mainEl) {
        gsap.set(mainEl, { clearProps: "transform,borderTopRightRadius,borderBottomRightRadius" });
      }
      toggleFnRef.current = null;
    };
    // Intentionally re-run this setup whenever the route changes, since some
    // pages render/remove [data-main] conditionally and refs can point at
    // stale DOM nodes after a Next.js route transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Force-close the menu on every route change.
  useEffect(() => {
    if (toggleFnRef.current) {
      toggleFnRef.current.closeInstantly();
    }
  }, [pathname]);

  const handleNavigation = (href, e) => {
    e.preventDefault();
    if (toggleFnRef.current && toggleFnRef.current.isOpen()) {
      toggleFnRef.current.closeInstantly();
    }
    router.push(href);
  };

  const handleParentClick = (item, e) => {
    if (item.children && item.children.length) {
      e.preventDefault();
      setExpandedItem((prev) => (prev === item.label ? null : item.label));
      return;
    }
    handleNavigation(item.href, e);
  };

  return (
    <div ref={rootRef} style={styles.wrap}>
      <style jsx global>{`
        .pkr-link-large:hover {
          background-color: rgba(18, 69, 155, 0.07);
          color: ${BRAND.blue};
        }
        .pkr-link-large-current:hover {
          background-color: ${BRAND.blue};
          color: #ffffff;
        }
        .pkr-sublink:hover {
          background-color: rgba(11, 163, 127, 0.1);
          color: ${BRAND.green};
        }
        .pkr-small-link {
          transition: color 0.2s ease;
        }
        .pkr-small-link:hover {
          color: ${BRAND.green};
        }
      `}</style>

      <header
        ref={headerRef}
        style={{
          ...styles.header,
          ...(scrolledPastHero ? styles.headerOnWhite : styles.headerOnHero),
        }}
      >
        <Link href="/" style={styles.logo}>
          <Image src="/pkr-logo.png" alt="PKR Estate" width={140} height={50} priority style={styles.logoImg} />
        </Link>

        <button
          ref={toggleBtnRef}
          type="button"
          aria-expanded="false"
          aria-label="open menu"
          style={{
            ...styles.toggle,
            color: scrolledPastHero ? BRAND.blue : "#ffffff",
          }}
        >
          <span style={styles.toggleTextWrap}>
            <span data-toggle-label style={styles.toggleLabel}>Menu</span>
            <span data-toggle-label style={styles.toggleLabel}>Close</span>
          </span>
          <span style={styles.toggleIconWrap}>
            <span data-toggle-bar style={styles.toggleBar} />
            <span data-toggle-bar style={styles.toggleBar} />
          </span>
        </button>
      </header>

      <nav ref={menuRef} style={styles.menu} aria-label="Primary">
        <div style={styles.menuInner}>
          <ul style={styles.linkList}>
            {NAV_LINKS.map((item) => {
              const isCurrent = pathname === item.href;
              const hasChildren = !!(item.children && item.children.length);
              const isExpanded = expandedItem === item.label;

              return (
                <li key={item.label} data-reveal-l style={styles.linkListItem}>
                  <button
                    onClick={(e) => handleParentClick(item, e)}
                    className={isCurrent ? "pkr-link-large-current" : "pkr-link-large"}
                    style={{
                      ...styles.linkLargeButton,
                      ...(isCurrent ? styles.linkLargeButtonCurrent : null),
                    }}
                  >
                    <span style={styles.linkLargeLabelRow}>
                      {item.label}
                      {hasChildren && (
                        <span
                          style={{
                            ...styles.chevron,
                            color: isCurrent ? "#ffffff" : BRAND.green,
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >
                          ⌄
                        </span>
                      )}
                    </span>
                  </button>

                  {hasChildren && (
                    <ul
                      style={{
                        ...styles.subLinkList,
                        maxHeight: isExpanded ? `${item.children.length * 3}em` : "0em",
                        opacity: isExpanded ? 1 : 0,
                      }}
                    >
                      {item.children.map((child) => {
                        const isChildCurrent = pathname === child.href;
                        return (
                          <li key={child.label}>
                            <button
                              onClick={(e) => handleNavigation(child.href, e)}
                              className="pkr-sublink"
                              style={{
                                ...styles.subLinkButton,
                                ...(isChildCurrent ? styles.subLinkButtonCurrent : null),
                              }}
                            >
                              {child.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div style={styles.bottom}>
            <div style={styles.bottomBorder} data-menu-border />
            <div style={styles.bottomCol}>
              <div data-reveal-s>
                <span style={styles.linkSmallFaded}>Socials</span>
              </div>
              <ul style={styles.linkListSmall}>
                {SOCIAL_LINKS.map((item) => (
                  <li key={item.label} data-reveal-s>
                    <a href={item.href} className="pkr-small-link" style={styles.linkSmall}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div style={styles.bottomCol}>
              <div data-reveal-s>
                <span style={styles.linkSmallFaded}>Quick Links</span>
              </div>
              <ul style={styles.linkListSmall}>
                {QUICK_LINKS.map((item) => (
                  <li key={item.label} data-reveal-s>
                    <a href={item.href} className="pkr-small-link" style={styles.linkSmall}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div ref={overlayRef} style={styles.overlay}>
        <div ref={darkRef} style={styles.dark} />

        <div style={styles.overlayBorders}>
          <div data-overlay-border-row="top" style={styles.overlayBorderRow}>
            <div style={styles.overlayBorder} />
            <div data-overlay-corner style={styles.overlayCorner} />
          </div>
          <div data-overlay-border-row="bottom" style={styles.overlayBorderRow}>
            <div data-overlay-corner style={{ ...styles.overlayCorner, ...styles.overlayCornerBottom }} />
            <div style={styles.overlayBorder} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    position: "relative",
    width: "100%",
    maxWidth: "100%",
  },

  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    maxWidth: "100%",
    zIndex: 520,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "5.25em",
    padding: "0 clamp(1.25em, 5vw, 6em)",
    boxSizing: "border-box",
    willChange: "transform",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  headerOnHero: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  headerOnWhite: {
    backgroundColor: "#ffffff",
    boxShadow: `0 2px 14px rgba(12,35,64,0.10)`,
    borderBottom: `1px solid rgba(18,69,155,0.10)`,
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    lineHeight: 0,
  },
  logoImg: {
    height: "auto",
    width: "auto",
    maxHeight: "2.6em",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    gap: "0.6em",
    background: "transparent",
    border: "none",
    padding: "0.4em",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  toggleTextWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    height: "1.6em",
    overflow: "hidden",
  },
  toggleLabel: {
    fontFamily: "var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: "1.6em",
  },
  toggleIconWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0.35em",
    width: "1.5em",
  },
  toggleBar: {
    display: "block",
    width: "100%",
    height: "0.13em",
    background: "currentColor",
  },

  menu: {
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    width: "min(28em, 92vw)",
    maxWidth: "100%",
    backgroundColor: BRAND.panel,
    borderLeft: `3px solid ${BRAND.green}`,
    overflow: "hidden",
    willChange: "transform",
  },
  menuInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    padding: "calc(5.25em + 1.5em) 1.5em 2em",
    boxSizing: "border-box",
    overflowY: "auto",
    overflowX: "hidden",
  },
  linkList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  linkListItem: {
    width: "100%",
    maxWidth: "100%",
  },
  linkLargeButton: {
    display: "flex",
    alignItems: "center",
    borderRadius: "0.4em",
    padding: "0.5em 0.7em",
    margin: 0,
    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
    fontWeight: 700,
    fontSize: "clamp(1.9rem, 4.6vw, 2.9rem)",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: BRAND.ink,
    textDecoration: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  linkLargeLabelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: "0.5em",
  },
  chevron: {
    display: "inline-block",
    fontSize: "0.65em",
    transition: "transform 0.3s ease, color 0.2s ease",
    lineHeight: 1,
  },
  linkLargeButtonCurrent: {
    color: "#ffffff",
    background: `linear-gradient(100deg, ${BRAND.blue} 0%, ${BRAND.blueLight} 62%, ${BRAND.green} 190%)`,
  },
  subLinkList: {
    listStyle: "none",
    margin: 0,
    padding: "0 0.7em",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "max-height 0.35s ease, opacity 0.3s ease",
  },
  subLinkButton: {
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "none",
    border: "none",
    borderLeft: `2px solid rgba(18,69,155,0.18)`,
    cursor: "pointer",
    padding: "0.4em 0.7em",
    margin: 0,
    fontFamily: "var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif",
    fontSize: "1.1rem",
    fontWeight: 500,
    color: "rgba(12,35,64,0.68)",
    borderRadius: "0.35em",
    transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
  },
  subLinkButtonCurrent: {
    color: BRAND.green,
    borderLeftColor: BRAND.green,
    backgroundColor: "rgba(11,163,127,0.08)",
  },
  bottom: {
    position: "relative",
    display: "flex",
    gap: "2em",
    paddingTop: "2em",
    width: "100%",
  },
  bottomBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "2px",
    background: `linear-gradient(90deg, ${BRAND.blue} 0%, ${BRAND.blueLight} 45%, ${BRAND.green} 100%)`,
    transformOrigin: "0% 50%",
  },
  bottomCol: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75em",
    flex: 1,
    minWidth: 0,
  },
  linkSmallFaded: {
    fontFamily: "var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: BRAND.green,
  },
  linkListSmall: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.6em",
  },
  linkSmall: {
    fontFamily: "var(--font-manrope), 'Manrope', 'Segoe UI', sans-serif",
    fontSize: "0.95rem",
    color: "rgba(12,35,64,0.85)",
    textDecoration: "none",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 490,
    overflow: "clip",
    pointerEvents: "none",
    cursor: "pointer",
    visibility: "hidden",
  },
  dark: {
    position: "absolute",
    inset: 0,
    background: "rgba(12,35,64,0.55)",
  },
  overlayBorders: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  overlayBorderRow: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  overlayBorder: {
    width: "100%",
    height: "1em",
    backgroundColor: BRAND.panel,
  },
  overlayCorner: {
    width: "2em",
    height: "2em",
    color: BRAND.panel,
    transformOrigin: "100% 0%",
    backgroundImage:
      "radial-gradient(circle farthest-side at 0 100%, rgba(244,247,250,0) 99%, #F4F7FA)",
  },
  overlayCornerBottom: {
    transformOrigin: "100% 100%",
    backgroundImage:
      "radial-gradient(circle farthest-side at 0 0, rgba(244,247,250,0) 99%, #F4F7FA)",
  },
};