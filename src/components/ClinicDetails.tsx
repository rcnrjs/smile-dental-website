"use client";

import React from "react";
import { CLINIC_INFO } from "@/lib/clinicData";

interface ClinicDetailsProps {
  onOpenChat: () => void;
}

export default function ClinicDetails({ onOpenChat }: ClinicDetailsProps) {
  return (
    <section id="location" style={{
      paddingTop: "5rem",
      paddingBottom: "5rem",
      borderBottom: "1px solid var(--border-subtle)",
      backgroundColor: "var(--canvas)",
    }}>
      <div className="site-container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "3rem",
        }}>
          {/* Practice Hours & Facility */}
          <div>
            <span className="badge-outline" style={{ marginBottom: "0.75rem" }}>
              Practice Facility
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "1.5rem" }}>
              Conveniently situated in Central Orlando.
            </h2>

            <div style={{ marginBottom: "1.5rem" }}>
              <div className="mono-meta" style={{ marginBottom: "0.25rem" }}>Physical Address</div>
              <p style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 500 }}>
                {CLINIC_INFO.address.street}
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
                {CLINIC_INFO.address.city}, {CLINIC_INFO.address.state} {CLINIC_INFO.address.zip}
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.375rem" }}>
                {CLINIC_INFO.address.parking}
              </p>
            </div>

            <div>
              <div className="mono-meta" style={{ marginBottom: "0.25rem" }}>Clinical Contact</div>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
                Phone: <strong style={{ color: "var(--text-primary)" }}>{CLINIC_INFO.contact.phone}</strong>
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
                Email: <strong style={{ color: "var(--text-primary)" }}>{CLINIC_INFO.contact.email}</strong>
              </p>
            </div>
          </div>

          {/* Operating Hours Table */}
          <div>
            <span className="badge-outline" style={{ marginBottom: "0.75rem" }}>
              Clinical Hours
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "1.5rem" }}>
              Structured appointment blocks.
            </h2>

            <div style={{ borderTop: "1px solid var(--border-subtle)", marginBottom: "2rem" }}>
              {CLINIC_INFO.hours.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <span style={{ fontSize: "0.9375rem", fontWeight: 500 }}>{h.days}</span>
                  <span className="mono-meta" style={{ color: "var(--text-primary)" }}>{h.time}</span>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem",
            }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                First Time at Smile Dental?
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
                New patient intake begins with a complimentary consultation. No hidden fees or unexpected diagnostic charges.
              </p>
              <button
                onClick={onOpenChat}
                className="btn-primary"
                style={{ width: "100%", fontSize: "0.8125rem" }}
              >
                Schedule with Ian (AI Receptionist)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
