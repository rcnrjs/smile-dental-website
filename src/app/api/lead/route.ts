import { NextRequest, NextResponse } from "next/server";
import { LeadRecord } from "@/lib/types";

// In-memory array for demo/dev verification
const leadStorage: LeadRecord[] = [];

export async function POST(req: NextRequest) {
  try {
    const lead: LeadRecord = await req.json();

    if (!lead.firstName && !lead.phone && !lead.email) {
      return NextResponse.json({ error: "Missing required contact details" }, { status: 400 });
    }

    lead.dateCaptured = new Date().toISOString();
    lead.status = "New Lead";
    leadStorage.push(lead);

    const n8nLeadUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    if (n8nLeadUrl) {
      try {
        await fetch(n8nLeadUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (err) {
        console.warn("Could not forward lead to n8n lead webhook:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully",
      lead,
    });
  } catch (error) {
    console.error("API /api/lead error:", error);
    return NextResponse.json({ error: "Failed to store lead" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    totalLeads: leadStorage.length,
    leads: leadStorage,
  });
}
