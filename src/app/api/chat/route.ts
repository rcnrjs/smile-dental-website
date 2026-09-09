import { NextRequest, NextResponse } from "next/server";
import { processFallbackMessage } from "@/lib/chatEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    // 1. If N8N_WEBHOOK_URL is configured, proxy request to self-hosted n8n instance
    if (n8nWebhookUrl) {
      try {
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.N8N_WEBHOOK_SECRET ? { "X-N8N-Secret": process.env.N8N_WEBHOOK_SECRET } : {}),
          },
          body: JSON.stringify({
            chatInput: message,
            sessionId: sessionId || "default_session",
            history: history || [],
            source: "Smile Dental Website",
            timestamp: new Date().toISOString(),
          }),
        });

        if (n8nResponse.ok) {
          const n8nData = await n8nResponse.json();
          // Support various n8n output schemas (e.g. { output: "..." } or { text: "..." } or { response: "..." })
          const responseText =
            n8nData.output || n8nData.response || n8nData.text || n8nData.message || (typeof n8nData === "string" ? n8nData : null);

          if (responseText) {
            return NextResponse.json({
              response: responseText,
              quickReplies: n8nData.quickReplies || [],
              source: "n8n-self-hosted",
            });
          }
        }
        console.warn("n8n webhook did not return standard text payload, falling back to local engine.");
      } catch (n8nErr) {
        console.warn("Failed to reach self-hosted n8n webhook, utilizing built-in Ava engine:", n8nErr);
      }
    }

    // 2. Built-in Ava Engine (Zero external dependencies, always operational)
    const result = processFallbackMessage(message, history || []);

    return NextResponse.json({
      response: result.response,
      quickReplies: result.quickReplies || [],
      extractedLead: result.extractedLead || null,
      source: "ava-builtin-engine",
    });
  } catch (error) {
    console.error("API /api/chat error:", error);
    return NextResponse.json(
      {
        response:
          "I apologize, but our messaging system experienced a brief interruption. Please give our reception desk a call at (407) 555-0123.",
      },
      { status: 500 }
    );
  }
}
