"use client";

import React from "react";
import { CLINIC_INFO } from "@/lib/clinicData";

interface HeaderProps {
  onOpenChat: () => void;
}

export default function Header({ onOpenChat }: HeaderProps) {
  return (
    <header style={{
      borderBottom: "1px solid var(--border-subtle)",
      backgroundColor: "var(--canvas)",
      position: "sticky",
      top: 0,
      zIndex: 40,
    }}>
      <div className="site-container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "1.125rem",
        paddingBottom: "1.125rem",
      }}>
        {/* Brand identity */}
        <a href="#" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
          <span style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.25rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}>
            {CLINIC_INFO.name}
          </span>
          <span className="mono-meta" style={{ fontSize: "0.6875rem", marginTop: "-2px" }}>
            Orlando, FL • Established {CLINIC_INFO.establishedYear}
          </span>
        </a>

        {/* Minimalist text navigation */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} aria-label="Main Navigation">
          <a href="#services" style={{ textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>
            Services
          </a>
          <a href="#insurance" style={{ textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>
            Insurance
          </a>
          <a href="#emergency" style={{ textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>
            Emergency
          </a>
          <a href="#location" style={{ textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>
            Location
          </a>
        </nav>

        {/* Action & Direct Phone */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href={`tel:${CLINIC_INFO.contact.cleanPhone}`}
            style={{
              textDecoration: "none",
              color: "var(--text-primary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
            aria-label={`Call clinic at ${CLINIC_INFO.contact.phone}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            {CLINIC_INFO.contact.phone}
          </a>

          <button
            onClick={onOpenChat}
            className="btn-primary"
            style={{ fontSize: "0.8125rem", padding: "0.5rem 0.875rem" }}
            id="header-consultation-btn"
          >
            Book Free Consultation
          </button>
        </div>
      </div>
    </header>
  );
}
