"use client";

import React, { useState } from "react";
import { CLINICAL_SERVICES } from "@/lib/clinicData";

interface ServicesLedgerProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesLedger({ onSelectService }: ServicesLedgerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(CLINICAL_SERVICES.map((s) => s.category)))];

  const filtered = activeCategory === "All"
    ? CLINICAL_SERVICES
    : CLINICAL_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" style={{
      paddingTop: "5rem",
      paddingBottom: "5rem",
      borderBottom: "1px solid var(--border-subtle)",
      backgroundColor: "var(--surface)",
    }}>
      <div className="site-container">
        {/* Section Header */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", gap: "1.5rem" }}>
          <div>
            <span className="badge-outline" style={{ marginBottom: "0.75rem" }}>
              Clinical Catalog
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 400 }}>
              Preventive, restorative, and surgical procedures.
            </h2>
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? "var(--text-primary)" : "transparent",
                  color: activeCategory === cat ? "var(--surface)" : "var(--text-secondary)",
                  border: `1px solid ${activeCategory === cat ? "var(--text-primary)" : "var(--border-strong)"}`,
                  borderRadius: "var(--radius-sm)",
                  padding: "0.375rem 0.75rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Procedure Ledger (Index table format) */}
        <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {filtered.map((service, index) => (
            <div
              key={service.id}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                paddingTop: "1.75rem",
                paddingBottom: "1.75rem",
                borderBottom: "1px solid var(--border-subtle)",
                alignItems: "baseline",
                transition: "background-color 0.15s ease",
              }}
            >
              {/* Service Title & Category */}
              <div>
                <div className="mono-meta" style={{ marginBottom: "0.25rem" }}>
                  0{index + 1} // {service.category}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                  {service.name}
                </h3>
                <span className="badge-outline" style={{ fontSize: "0.6875rem" }}>
                  Avg. {service.typicalDuration}
                </span>
              </div>

              {/* Description & Indication */}
              <div>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", marginBottom: "0.5rem", lineHeight: 1.6 }}>
                  {service.description}
                </p>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                  <strong style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Indication:</strong> {service.idealFor}
                </div>
              </div>

              {/* Consultation trigger */}
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <button
                  onClick={() => onSelectService(service.name)}
                  className="btn-secondary"
                  style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem" }}
                  id={`inquire-${service.id}`}
                >
                  Consult on this service
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
