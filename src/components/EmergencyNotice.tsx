"use client";

import React from "react";
import { CLINIC_INFO } from "@/lib/clinicData";

export default function EmergencyNotice() {
  return (
    <section id="emergency" style={{
      paddingTop: "4rem",
      paddingBottom: "4rem",
      borderBottom: "1px solid var(--border-subtle)",
      backgroundColor: "var(--surface)",
    }}>
      <div className="site-container">
        <div style={{
          backgroundColor: "var(--alert-tint)",
          border: "1px solid var(--alert-tint-border)",
          borderRadius: "var(--radius-md)",
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          alignItems: "center",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--alert-tint-text)",
                display: "inline-block",
              }}></span>
              <span className="mono-meta" style={{ color: "var(--alert-tint-text)", fontWeight: 600, textTransform: "uppercase" }}>
                Same-Day Emergency Protocol
              </span>
            </div>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              Experiencing severe tooth pain, swelling, or trauma?
            </h2>

            <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              We reserve emergency evaluation blocks daily for acute pulpitis, broken crowns, avulsed teeth, and facial swellings. Please do not delay treatment.
            </p>
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "flex-start",
            borderLeft: "1px solid var(--alert-tint-border)",
            paddingLeft: "1.5rem",
          }}>
            <span className="mono-meta" style={{ color: "var(--text-muted)" }}>
              Direct Emergency Line
            </span>
            <a
              href={`tel:${CLINIC_INFO.contact.cleanPhone}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "var(--alert-tint-text)",
                textDecoration: "none",
              }}
            >
              {CLINIC_INFO.contact.phone}
            </a>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              Call before 11:00 AM for guaranteed same-day assessment. Walk-ins triaged based on clinical urgency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
