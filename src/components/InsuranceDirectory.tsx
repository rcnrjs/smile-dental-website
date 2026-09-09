"use client";

import React, { useState } from "react";
import { INSURANCE_ROSTER } from "@/lib/clinicData";

interface InsuranceDirectoryProps {
  onVerifyInsurance: (providerName: string) => void;
}

export default function InsuranceDirectory({ onVerifyInsurance }: InsuranceDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = INSURANCE_ROSTER.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.plans.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="insurance" style={{
      paddingTop: "5rem",
      paddingBottom: "5rem",
      borderBottom: "1px solid var(--border-subtle)",
      backgroundColor: "var(--canvas)",
    }}>
      <div className="site-container">
        {/* Section Header */}
        <div style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
          <span className="badge-sage" style={{ marginBottom: "0.75rem" }}>
            Direct Network Coverage
          </span>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 400, marginBottom: "1rem" }}>
            In-network with major dental plans.
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Insurance clarity matters. We are in-network with premier carriers so your preventive visits carry zero or minimal out-of-pocket expenses. Search your carrier below or verify with Ava.
          </p>
        </div>

        {/* Live Search Input */}
        <div style={{
          marginBottom: "2rem",
          display: "flex",
          maxWidth: "480px",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--surface)",
          overflow: "hidden",
        }}>
          <input
            type="text"
            placeholder="Type insurance name (e.g. MetLife, Cigna, Delta)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "0.75rem 1rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              backgroundColor: "transparent",
              color: "var(--text-primary)",
            }}
            id="insurance-search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{
                border: "none",
                background: "transparent",
                padding: "0 0.75rem",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Provider List Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2.5rem",
        }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>{item.name}</h3>
                  <span className={item.status === "In-Network" ? "badge-sage" : "badge-outline"}>
                    {item.status}
                  </span>
                </div>

                <div className="mono-meta" style={{ marginBottom: "0.75rem" }}>
                  Covered Plans:
                </div>

                <ul style={{ listStyleType: "none", padding: 0, marginBottom: "1rem" }}>
                  {item.plans.map((p, i) => (
                    <li key={i} style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "var(--text-muted)" }}></span>
                      {p}
                    </li>
                  ))}
                </ul>

                <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", fontStyle: "italic", borderTop: "1px dashed var(--border-subtle)", paddingTop: "0.75rem" }}>
                  {item.verificationNote}
                </p>
              </div>

              <button
                onClick={() => onVerifyInsurance(item.name)}
                className="btn-secondary"
                style={{ marginTop: "1.25rem", width: "100%", fontSize: "0.8125rem" }}
              >
                Verify {item.name} with Ava
              </button>
            </div>
          ))}
        </div>

        {/* Note on out of network */}
        <div style={{
          backgroundColor: "var(--surface-subtle)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-md)",
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}>
          <div>
            <strong style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>Don&apos;t see your plan listed?</strong>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.125rem" }}>
              We accept and bill most dental PPO policies as an out-of-network provider and maximize your reimbursement.
            </p>
          </div>
          <button
            onClick={() => onVerifyInsurance("My Insurance")}
            className="btn-secondary"
            style={{ fontSize: "0.8125rem" }}
          >
            Check Custom Policy
          </button>
        </div>
      </div>
    </section>
  );
}
