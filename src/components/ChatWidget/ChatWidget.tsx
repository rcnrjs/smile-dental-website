"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "@/lib/types";

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export default function ChatWidget({ isOpen, onClose, initialPrompt }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello, welcome to Smile Dental! I am Ian, your friendly virtual receptionist. How can I assist you today?",
      timestamp: "Just now",
      quickReplies: ["Book Free Consultation", "Check Insurance", "Same-Day Emergency", "View Services"],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Math.random().toString(36).substring(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  // Handle external initial prompt if passed
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputText).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          sessionId,
          history: messages,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to process message");
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `msg_res_${Date.now()}`,
        sender: "assistant",
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickReplies: data.quickReplies || [],
        isEmergencyAlert: data.isEmergencyAlert || false,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: "assistant",
        text: "I am having trouble connecting to our booking desk at this exact moment. Please feel free to call us directly at (407) 555-0123.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickReplies: ["Call Clinic at (407) 555-0123"],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Smile Dental AI Assistant"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        width: "min(400px, calc(100vw - 3rem))",
        height: "min(580px, calc(100vh - 5rem))",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-floating)",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{
        padding: "1rem 1.25rem",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "var(--surface-subtle)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Avatar status dot */}
          <div style={{
            position: "relative",
            width: "34px",
            height: "34px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--text-primary)",
            color: "var(--surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            fontSize: "1rem",
          }}>
            A
            <span style={{
              position: "absolute",
              bottom: "-2px",
              right: "-2px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#2ECC71",
              border: "2px solid var(--surface)",
            }}></span>
          </div>

          <div>
            <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
              Ian
            </div>
            <div className="mono-meta" style={{ fontSize: "0.6875rem", marginTop: "-2px" }}>
              Virtual Receptionist • Active 24/7
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "0.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close assistant"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Message History Feed */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "var(--canvas)",
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div style={{
              maxWidth: "85%",
              padding: "0.75rem 1rem",
              borderRadius: varRadiusFor(msg.sender),
              backgroundColor: msg.sender === "user" ? "var(--text-primary)" : "var(--surface)",
              color: msg.sender === "user" ? "var(--surface)" : "var(--text-primary)",
              border: msg.sender === "user" ? "1px solid var(--text-primary)" : "1px solid var(--border-subtle)",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}>
              {msg.text}
            </div>

            <span className="mono-meta" style={{ fontSize: "0.6875rem", marginTop: "0.25rem", padding: "0 0.25rem" }}>
              {msg.timestamp}
            </span>

            {/* Quick reply chips */}
            {msg.quickReplies && msg.quickReplies.length > 0 && (
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.375rem",
                marginTop: "0.5rem",
                maxWidth: "100%",
              }}>
                {msg.quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(reply)}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border-strong)",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.3125rem 0.625rem",
                      fontSize: "0.75rem",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                      transition: "all 0.15s ease",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--surface-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--surface)";
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0" }}>
            <span className="mono-meta" style={{ fontStyle: "italic" }}>
              Ian is writing...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div style={{
        padding: "0.875rem 1.25rem",
        borderTop: "1px solid var(--border-subtle)",
        backgroundColor: "var(--surface)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask a question or enter details..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          style={{
            flex: 1,
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--radius-md)",
            padding: "0.625rem 0.875rem",
            fontSize: "0.875rem",
            fontFamily: "var(--font-sans)",
            outline: "none",
            backgroundColor: "var(--canvas)",
            color: "var(--text-primary)",
          }}
          id="chat-user-input"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputText.trim()}
          style={{
            backgroundColor: inputText.trim() ? "var(--text-primary)" : "var(--surface-hover)",
            color: inputText.trim() ? "var(--surface)" : "var(--text-muted)",
            border: "none",
            borderRadius: "var(--radius-md)",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: inputText.trim() ? "pointer" : "not-allowed",
            transition: "all 0.15s ease",
          }}
          aria-label="Send message"
          id="chat-send-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </aside>
  );
}

function varRadiusFor(sender: "user" | "assistant" | "system") {
  if (sender === "user") {
    return "10px 10px 2px 10px";
  }
  return "10px 10px 10px 2px";
}
