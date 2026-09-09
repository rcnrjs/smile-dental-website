import React from "react";
import { CLINIC_INFO } from "@/lib/clinicData";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--surface)",
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: "3.5rem",
      paddingBottom: "3.5rem",
    }}>
      <div className="site-container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "2.5rem",
          marginBottom: "3rem",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 500, marginBottom: "0.5rem" }}>
              {CLINIC_INFO.name}
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", maxWidth: "320px", lineHeight: 1.6 }}>
              {CLINIC_INFO.tagline}
            </p>
          </div>

          <div>
            <div className="mono-meta" style={{ textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Clinical Department
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
              {CLINIC_INFO.address.street}
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
              {CLINIC_INFO.address.city}, {CLINIC_INFO.address.state} {CLINIC_INFO.address.zip}
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              Tel: {CLINIC_INFO.contact.phone}
            </p>
          </div>

          <div>
            <div className="mono-meta" style={{ textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Compliance & Privacy
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              Patient privacy is safeguarded under Federal HIPAA privacy standards. Communications through our website and virtual assistant are encrypted.
            </p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}>
          <span className="mono-meta">
            © {new Date().getFullYear()} {CLINIC_INFO.name}. All clinical rights reserved.
          </span>
          <span className="mono-meta">
            Automated Patient Intake powered by n8n & OpenAI
          </span>
        </div>
      </div>
    </footer>
  );
}
