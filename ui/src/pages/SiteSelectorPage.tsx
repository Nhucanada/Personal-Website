/**
 * SiteSelectorPage.tsx
 *
 * Full-viewport split selector. Two full-bleed layers share the screen,
 * divided by an invisible edge that follows the cursor with lerp damping.
 * The split is INVERTED relative to the cursor — moving left reveals
 * more photography (left layer expands), moving right reveals more software.
 *
 * The inactive side dims and shows its section name as a click hint.
 * Split movement is capped so neither side collapses below MIN_X.
 *
 * Clicking left of split  → photography layer fills screen → navigate /photo
 * Clicking right of split → photography layer collapses    → navigate /dev
 *
 * Touch / hover:none: static 50/50 split with <Link> tap zones.
 */

import React, { useCallback, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/photography.css';
import '../styles/software.css';
import '../styles/selector.css';

// ─── Constants ────────────────────────────────────────────────────────────────

/** Lerp factor per frame. */
const LERP = 0.09;

/** Default split position (%) when no cursor is present */
const DEFAULT_X = 50;

/** How long (ms) to wait after the click animation before navigating */
const NAV_DELAY = 600;

/** Maximum overlay opacity applied to the inactive side */
const MAX_DIM = 1.0;

/**
 * Minimum and maximum split positions during hover.
 * The dim/inactive side is always at least 1/3 of the viewport (33%).
 */
const MIN_X = 33;
const MAX_X = 67;

// ─── Cursor tracker ───────────────────────────────────────────────────────────
// pointermove only fires on movement, so we can't read cursor position at
// mount time. This module-level listener runs as soon as the bundle loads and
// keeps the last known clientX available so the selector can seed targetX
// correctly even when the cursor is stationary on arrival.

let lastKnownClientX: number | null = null;
document.addEventListener(
  'mousemove',
  (e: MouseEvent) => { lastKnownClientX = e.clientX; },
  { passive: true },
);

function clientXToSplitPct(clientX: number): number {
  const raw = 100 - (clientX / window.innerWidth) * 100;
  return Math.max(MIN_X, Math.min(MAX_X, raw));
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ─── Component ────────────────────────────────────────────────────────────────

const SiteSelectorPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // When returning from a section, start the split at that section's full-screen
  // extreme so the lerp loop animates it back to centre rather than snapping.
  const fromSection = (location.state as { from?: string } | null)?.from;
  const initialX = fromSection === 'photo' ? 100 : fromSection === 'software' ? 0 : DEFAULT_X;

  // Pre-compute the initial overlay/label values to match initialX so there
  // is no single-frame flash before the rAF loop takes over.
  const INIT_RANGE = MAX_X - DEFAULT_X;
  const initSwDev = Math.max(0, Math.min(1, (initialX - DEFAULT_X) / INIT_RANGE));
  const initPhotoDev = Math.max(0, Math.min(1, (DEFAULT_X - initialX) / INIT_RANGE));

  const containerRef = useRef<HTMLDivElement>(null);
  const photoLayerRef = useRef<HTMLDivElement>(null);
  const swOverlayRef = useRef<HTMLDivElement>(null);
  const photoOverlayRef = useRef<HTMLDivElement>(null);
  const swLabelRef = useRef<HTMLDivElement>(null);
  const photoLabelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Seed targetX from the last known cursor position so the split immediately
  // reflects where the mouse is, even if it hasn't moved since navigation.
  const initialTargetX = fromSection && lastKnownClientX !== null
    ? clientXToSplitPct(lastKnownClientX)
    : DEFAULT_X;

  const targetX = useRef<number>(initialTargetX);
  const currentX = useRef<number>(initialX);
  const isTransitioning = useRef<boolean>(false);

  // ── rAF loop ─────────────────────────────────────────────────────────────────

  const animate = useCallback(() => {
    const photoLayer = photoLayerRef.current;
    const swOverlay = swOverlayRef.current;
    const photoOverlay = photoOverlayRef.current;
    const swLabel = swLabelRef.current;
    const photoLabel = photoLabelRef.current;
    if (!photoLayer) return;

    currentX.current = lerp(currentX.current, targetX.current, LERP);
    const x = currentX.current;

    // clip-path: inset(0 [100-x]% 0 0) → shows left x% of the photo layer
    photoLayer.style.clipPath = `inset(0 ${100 - x}% 0 0)`;

    // Dim the inactive side — normalised to the cap range so full dim
    // is reached at MIN_X / MAX_X, the same point labels reach full opacity
    const RANGE = MAX_X - DEFAULT_X; // 17
    const swDeviation = Math.max(0, Math.min(1, (x - DEFAULT_X) / RANGE));
    const photoDeviation = Math.max(0, Math.min(1, (DEFAULT_X - x) / RANGE));
    if (swOverlay) swOverlay.style.opacity = String(swDeviation * MAX_DIM);
    if (photoOverlay) photoOverlay.style.opacity = String(photoDeviation * MAX_DIM);

    // Section labels share the same normalised value
    if (swLabel) swLabel.style.opacity = String(photoDeviation);
    if (photoLabel) photoLabel.style.opacity = String(swDeviation);

    // Centre each label within its dim strip
    // "software" lives in the photo layer (strip = 0 → x%): centre at x/2
    if (swLabel) swLabel.style.left = `${x / 2}%`;
    // "photography" lives in the SW layer (strip = x → 100%): centre at (x+100)/2
    if (photoLabel) photoLabel.style.left = `${(x + 100) / 2}%`;

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // ── Pointer handlers ─────────────────────────────────────────────────────────

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (isTransitioning.current) return;
    const rect = containerRef.current!.getBoundingClientRect();
    /*
     * INVERTED: cursor at mouseX% → split goes to (100 - mouseX)%.
     * Clamped to [MIN_X, MAX_X] so labels always have room.
     */
    const raw = 100 - ((e.clientX - rect.left) / rect.width) * 100;
    targetX.current = Math.max(MIN_X, Math.min(MAX_X, raw));
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (isTransitioning.current) return;
    targetX.current = DEFAULT_X;
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTransitioning.current) return;

      const rect = containerRef.current!.getBoundingClientRect();
      const clickPct = ((e.clientX - rect.left) / rect.width) * 100;
      const isPhotoSide = clickPct <= currentX.current;

      isTransitioning.current = true;
      if (containerRef.current) {
        containerRef.current.dataset.transitioning = 'true';
      }

      if (isPhotoSide) {
        targetX.current = 100;
        setTimeout(() => navigate('/photo'), NAV_DELAY);
      } else {
        targetX.current = 0;
        setTimeout(() => navigate('/dev'), NAV_DELAY);
      }
    },
    [navigate],
  );

  // ── Setup / teardown ──────────────────────────────────────────────────────────

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    rafRef.current = requestAnimationFrame(animate);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [animate, handlePointerMove, handlePointerLeave]);

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={containerRef}
      className="sel-root"
      onClick={handleClick}
      role="presentation"
    >
      {/* ── Layer 1: Software (back, full width) ───────────────────────── */}
      <div className="sel-layer sel-layer--sw">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-noninteractive-element-interactions */}
        <nav
          className="sw-nav"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to="/" className="sw-nav-brand">Nathan Hu</Link>
          <div className="sw-nav-links">
            <Link to="/dev">Home</Link>
            <Link to="/dev/work">Work</Link>
            <Link to="/dev/projects">Projects</Link>
            <Link to="/dev/about">About</Link>
            <Link to="/dev/contact">Contact</Link>
            <a
              className="sw-nav-resume-btn"
              href="/documents/Nathan_Hu___Resume_January_2026__CAN.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé
            </a>
          </div>
        </nav>

        <div className="sel-body--sw">
          <div className="sw-home-placeholder">
            <span className="sw-home-ph-eyebrow">— software</span>
            <h2 className="sw-home-ph-name">Nathan Hu</h2>
            <p className="sw-home-ph-sub">Software Engineer · Computer Science &amp; AI</p>
          </div>
        </div>

        {/* Dims when cursor is on the photography (left) side */}
        <div ref={swOverlayRef} className="sel-dim-overlay" style={{ opacity: initSwDev }} aria-hidden="true" />

        {/* "photography" label: appears on the dim right strip when photo is dominant */}
        <div ref={photoLabelRef} className="sel-side-label sel-side-label--photo" style={{ opacity: initSwDev, left: `${(initialX + 100) / 2}%` }} aria-hidden="true">
          photography
        </div>
      </div>

      {/* ── Layer 2: Photography (front, clipped) ──────────────────────── */}
      <div ref={photoLayerRef} className="sel-layer sel-layer--photo" style={{ clipPath: `inset(0 ${100 - initialX}% 0 0)` }}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-noninteractive-element-interactions */}
        <nav
          className="photo-nav"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to="/" className="photo-nav-brand">Nathan Hu</Link>
          <div className="photo-nav-links">
            <Link to="/photo">Home</Link>
            <Link to="/photo/work">Work</Link>
            <Link to="/photo/about">About</Link>
            <Link to="/photo/contact">Contact</Link>
          </div>
        </nav>

        <div className="sel-body--photo">
          <img
            className="sel-photo-image"
            src="/photos/selector-background.jpg"
            alt=""
            draggable={false}
          />
        </div>

        {/* Dims when cursor is on the software (right) side */}
        <div ref={photoOverlayRef} className="sel-dim-overlay" style={{ opacity: initPhotoDev }} aria-hidden="true" />

        {/* "software" label: appears on the dim left strip when SW is dominant */}
        <div ref={swLabelRef} className="sel-side-label sel-side-label--sw" style={{ opacity: initPhotoDev, left: `${initialX / 2}%` }} aria-hidden="true">
          software
        </div>
      </div>

      {/*
       * ── Touch / hover:none fallback ──────────────────────────────────
       * @media (hover: none) in selector.css shows this and hides the layers.
       */}
      <div className="sel-touch" role="navigation" aria-label="Site sections">
        <Link
          to="/photo"
          className="sel-touch-half sel-touch-half--photo"
          style={{ backgroundImage: 'url(/photos/selector-background.jpg)' }}
          aria-label="Go to Photography portfolio"
        >
          <span className="sel-touch-label">
            <span className="sel-touch-eyebrow">— photography</span>
            <span className="sel-touch-heading">Photography</span>
          </span>
        </Link>

        <div className="sel-touch-divider" aria-hidden="true" />

        <Link
          to="/dev"
          className="sel-touch-half sel-touch-half--sw"
          aria-label="Go to Software portfolio"
        >
          <span className="sel-touch-label">
            <span className="sel-touch-eyebrow">— software</span>
            <span className="sel-touch-heading">Software</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SiteSelectorPage;
