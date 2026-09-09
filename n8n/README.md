# Self-Hosted n8n Workflow Guide: Smile Dental AI Receptionist

This folder contains the complete, ready-to-import n8n workflow (`smile-dental-ai-receptionist.json`) replicating the exact architecture from the video walkthrough.

---

## Architecture Overview

```
[ Next.js Chat Widget ]
         │
         ▼ (HTTP POST /chatInput)
[ When Chat Message Received ] (Webhook Node)
         │
         ▼
  [ AI Agent (Ava) ] ─── [ OpenAI Chat Model (gpt-4o-mini) ]
         │           ─── [ Window Buffer Memory ]
         ▼
[ Code in JavaScript ] (Extracts name, email, phone, service interest)
         │
    ┌────┴────────────────────────┐
    ▼                             ▼
[ If LeadFound ]          [ Respond to Webhook ]
    │ (True)                      │
    ▼                             ▼
[ Append / Deduplicate ]   (Immediate response back to Next.js widget)
  in Google Sheets / DB
```

---

## Setup Instructions

### 1. Import Workflow into n8n
1. Log into your self-hosted n8n instance (e.g. `https://n8n.yourdomain.com`).
2. Go to **Workflows** ➔ Click **Add Workflow** (or the three dots in top right) ➔ Select **Import from File**.
3. Select `n8n/smile-dental-ai-receptionist.json`.

### 2. Configure Credentials
1. **OpenAI Account**:
   - Double-click the **OpenAI Chat Model** node.
   - Select your existing OpenAI credentials or create a new credential with your `OPENAI_API_KEY`.
   - Recommended model: `gpt-4o-mini` (cost-efficient, sub-second latency).
2. **Google Sheets / Database**:
   - Double-click the **Append / Deduplicate in Google Sheet** node.
   - Connect your Google Service Account or OAuth credential.
   - Set your Spreadsheet ID and Sheet name. Ensure your sheet has header columns:
     `First Name`, `Last Name`, `Email`, `Phone`, `Service Interest`, `Date Captured`, `Source`, `Status`.
   - *Note on HIPAA*: For production healthcare environments with protected health information (PHI), replace the Google Sheets node with a HIPAA-compliant database (PostgreSQL with encryption-at-rest and BAA, Supabase Enterprise, or GoHighLevel HIPAA webhook).

### 3. Activate the Workflow & Obtain Webhook URL
1. Toggle the workflow to **Active** (in top-right corner).
2. Double-click the **When Chat Message Received** node.
3. Copy the **Production URL** (e.g., `https://n8n.yourdomain.com/webhook/smile-dental-chat`).

### 4. Connect to Vercel
In your Vercel project settings:
1. Go to **Settings** ➔ **Environment Variables**.
2. Add:
   ```env
   N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/smile-dental-chat
   ```
3. Redeploy your project. The chat widget on your Vercel subdomain will now stream directly through your self-hosted n8n instance!
