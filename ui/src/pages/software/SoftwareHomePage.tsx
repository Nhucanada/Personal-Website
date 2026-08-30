/**
 * SoftwareHomePage.tsx
 *
 * Landing page for the software section (/dev).
 *
 * First screen (.sw-home-visual): mirrors the software half of the
 * SiteSelectorPage — same dark background, dot grid, and centered
 * placeholder at the same size as the photography selector image.
 * This creates a seamless reveal when navigating from the selector.
 *
 * Second screen (.sw-hero): the existing full-viewport hero with bio,
 * tagline, and CTA links. Accessible by scrolling.
 *
 * The SoftwareNav (rendered by App.tsx) provides navigation.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/software.css';

const SoftwareHomePage: React.FC = () => (
  <div className="sw-site">

    {/* ── Visual section — matches selector right side ──────────────── */}
    <section className="sw-home-visual">
      <div className="sw-home-placeholder">
        <span className="sw-home-ph-eyebrow">— software</span>
        <h1 className="sw-home-ph-name">Nathan Hu</h1>
        <p className="sw-home-ph-sub">Software Engineer · Computer Science &amp; AI</p>
      </div>
    </section>

    {/* ── Detailed hero — scrollable below the visual ───────────────── */}
    <section className="sw-hero">
      <div className="sw-hero-content">
        <p className="sw-eyebrow">Software Engineer · Computer Science &amp; AI @ McGill</p>
        <p className="sw-hero-name" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 600 }}>
          Nathan Hu
        </p>
        <p className="sw-hero-title">
          Building clean, reliable software from backend to frontend.
        </p>
        <p className="sw-hero-bio">
          I&apos;m a Computer Science &amp; Artificial Intelligence student at McGill University
          with internship experience at companies like PointClickCare, Intact, and 360insights.
          I care about well-tested code, pragmatic tooling, and systems that hold up.
        </p>
        <div className="sw-hero-cta">
          <Link className="sw-btn-primary" to="/dev/work">
            View Experience
          </Link>
          <Link className="sw-btn-ghost" to="/dev/projects">
            Projects
          </Link>
          <Link className="sw-btn-ghost" to="/dev/about">
            About
          </Link>
          <a
            className="sw-btn-ghost"
            href="/documents/Nathan_Hu___Resume_January_2026__CAN.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé ↗
          </a>
        </div>
      </div>
    </section>

  </div>
);

export default SoftwareHomePage;
