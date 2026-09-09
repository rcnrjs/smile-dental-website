"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesLedger from "@/components/ServicesLedger";
import InsuranceDirectory from "@/components/InsuranceDirectory";
import EmergencyNotice from "@/components/EmergencyNotice";
import ClinicDetails from "@/components/ClinicDetails";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget/ChatWidget";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>();

  const openChatWithPrompt = (prompt?: string) => {
    setChatInitialPrompt(prompt);
    setIsChatOpen(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Clinic Header */}
      <Header onOpenChat={() => openChatWithPrompt("Hi, I would like to learn about booking a free consultation.")} />

      <main style={{ flex: 1 }}>
        {/* Editorial Hero */}
        <Hero onOpenChat={() => openChatWithPrompt("Hi, I am a new patient interested in claiming the free consultation.")} />

        {/* Clinical Services Ledger */}
        <ServicesLedger
          onSelectService={(serviceName) =>
            openChatWithPrompt(`Hi, I would like to ask some questions regarding ${serviceName}.`)
          }
        />

        {/* In-Network Insurance Directory */}
        <InsuranceDirectory
          onVerifyInsurance={(providerName) =>
            openChatWithPrompt(`Do you accept ${providerName}? Is it in-network for dental checkups?`)
          }
        />

        {/* Same-Day Emergency Relief Notice */}
        <EmergencyNotice />

        {/* Clinic Location, Hours & Facility */}
        <ClinicDetails
          onOpenChat={() => openChatWithPrompt("What are your available consultation slots this week?")}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Receptionist Launcher (Visible when chat is closed) */}
      {!isChatOpen && (
        <button
          onClick={() => openChatWithPrompt()}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            backgroundColor: "var(--text-primary)",
            color: "var(--surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--radius-lg)",
            padding: "0.75rem 1.125rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            boxShadow: "var(--shadow-floating)",
            cursor: "pointer",
            zIndex: 45,
            transition: "transform 0.15s ease, background-color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
          aria-label="Open virtual receptionist chat"
          id="floating-chat-launcher"
        >
          {/* Avatar Dot */}
          <div style={{
            position: "relative",
            width: "28px",
            height: "28px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--surface)",
            color: "var(--text-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}>
            A
            <span style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#2ECC71",
              border: "1.5px solid var(--text-primary)",
            }}></span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.2 }}>
              Ask Ava
            </span>
            <span className="mono-meta" style={{ fontSize: "0.6875rem", color: "#B8BABF" }}>
              24/7 Virtual Receptionist
            </span>
          </div>

          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.25rem" }}>
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}

      {/* Floating Chat Widget Window */}
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatInitialPrompt(undefined);
        }}
        initialPrompt={chatInitialPrompt}
      />
    </div>
  );
}
