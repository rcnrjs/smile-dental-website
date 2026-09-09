"use client";

import React from "react";
import { CLINIC_INFO } from "@/lib/clinicData";

interface HeroProps {
  onOpenChat: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  return (
    <section style={{
      paddingTop: "4.5rem",
      paddingBottom: "4.5rem",
      borderBottom: "1px solid var(--border-subtle)",
      backgroundColor: "var(--canvas)",
    }}>
      <div className="site-container">
        {/* Subtle status tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <span className="badge-sage">
            New Patient Welcome
          </span>
          <span className="mono-meta">
            Accepting new families in Orlando & Orange County
          </span>
        </div>

        {/* High-contrast editorial heading */}
        <h1 style={{
          fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
          maxWidth: "880px",
          marginBottom: "1.5rem",
          fontWeight: 400,
        }}>
          Modern dentistry founded on patience, precision, and clinical clarity.
        </h1>

        <p style={{
          fontSize: "1.125rem",
          maxWidth: "680px",
          color: "var(--text-secondary)",
          marginBottom: "2.5rem",
          lineHeight: 1.7,
        }}>
          Smile Dental provides thorough preventive care, custom implant restorations, and same-day emergency relief. We operate with transparent treatment plans, unhurried consultations, and direct insurance verification.
        </p>

        {/* Action triggers */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "3.5rem" }}>
          <button
            onClick={onOpenChat}
            className="btn-primary"
            id="hero-start-consultation-btn"
            style={{ padding: "0.75rem 1.5rem" }}
          >
            Start Free Consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <a href="#services" className="btn-secondary" style={{ padding: "0.75rem 1.5rem" }}>
            Explore Clinical Procedures
          </a>
        </div>

        {/* Utilitarian metadata ledger */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border-subtle)",
        }}>
          <div>
            <div className="mono-meta" style={{ textTransform: "uppercase", marginBottom: "0.25rem" }}>Location</div>
            <div style={{ fontSize: "0.9375rem", fontWeight: 500 }}>Downtown Orlando, FL</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Orange Ave Medical Corridor</div>
          </div>

          <div>
            <div className="mono-meta" style={{ textTransform: "uppercase", marginBottom: "0.25rem" }}>Practice Scale</div>
            <div style={{ fontSize: "0.9375rem", fontWeight: 500 }}>2,000+ Local Patients</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Continuous care since 2018</div>
          </div>

          <div>
            <div className="mono-meta" style={{ textTransform: "uppercase", marginBottom: "0.25rem" }}>Primary Network</div>
            <div style={{ fontSize: "0.9375rem", fontWeight: 500 }}>MetLife & Cigna In-Network</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Real-time benefits verification</div>
          </div>

          <div>
            <div className="mono-meta" style={{ textTransform: "uppercase", marginBottom: "0.25rem" }}>Emergency Intake</div>
            <div style={{ fontSize: "0.9375rem", fontWeight: 500 }}>Same-Day Priority Slots</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Dedicated daily relief blocks</div>
          </div>
        </div>
      </div>
    </section>
  );
}
