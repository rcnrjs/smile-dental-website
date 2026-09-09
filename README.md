# Smile Dental — Minimalist Practice Website & AI Receptionist

A high-converting, editorial web application for **Smile Dental Family Dentistry** (Orlando, FL). Built with **Next.js 15**, **TypeScript**, and **Vanilla CSS**, designed for zero-cost deployment on **Vercel** (`*.vercel.app` subdomain) with native integration to **self-hosted n8n**.

This application directly implements the design and structural guidelines of:
- **[anti-slop](https://github.com/miqdadbadjuber/anti-slop)**: Zero generic AI tropes, no loud purple/blue gradients, no excessive drop shadows or glassmorphism, no fake trust badges, no emojis in code/content, and purposeful editorial narrative.
- **[minimalist-skill](https://github.com/nexu-io/open-design/blob/main/skills/minimalist-skill/SKILL.md)**: Premium Utilitarian Minimalism & Editorial UI. Warm monochrome palette (`#FAF9F5` / `#FFFFFF` / `#1E2022`), high-contrast serif typography (`Newsreader`), crisp hairline borders (`#E8E7E1`), desaturated clinical sage accents (`#EBF3EF`), and generous structural macro-whitespace.

---

## Architecture

```
                                  ┌───────────────────────────────┐
                                  │      Vercel Free Tier         │
                                  │ (your-subdomain.vercel.app)   │
                                  └───────────────┬───────────────┘
                                                  │
                                                  ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Next.js 15 Frontend                                                             │
│  ├── Editorial Hero (Practice ledger, credentials, consultation action)         │
│  ├── Clinical Services Ledger (Procedures, indications, duration index)         │
│  ├── In-Network Insurance Directory (MetLife, Cigna, Delta Dental lookup)      │
│  ├── Same-Day Emergency Protocol (Acute pain & trauma phone dispatch)          │
│  └── 24/7 AI Receptionist Widget ("Ava")                                       │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
                                       ▼ POST /api/chat
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Next.js Dual-Mode API Route                                                     │
│  ├── Connected Mode: Proxies to N8N_WEBHOOK_URL                                 │
│  └── Fallback Mode: Built-in Ava deterministic engine (always works offline)   │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
                                       ▼ (Webhook)
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Self-Hosted n8n Instance (Import template from n8n/)                            │
│  ├── Webhook Trigger ('When Chat Message Received')                             │
│  ├── AI Agent (Ava LangChain Node) ─── OpenAI Model (gpt-4o-mini)               │
│  │                                 ─── Window Buffer Memory                     │
│  ├── Code in JavaScript (Extracts name, email, phone, service interest)         │
│  ├── If (LeadFound Check)                                                       │
│  └── Append / Deduplicate in Google Sheets / Postgres / EHR CRM                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Features

1. **Ava AI Virtual Receptionist**:
   - **One-Question Discipline**: Strictly asks **one question at a time** to reduce cognitive friction and maximize lead completion.
   - **Medical Safety Guardrails**: Never diagnoses clinical conditions, never claims to be human, never quotes binding procedure costs.
   - **Emergency Phone Dispatch**: Instantly provides direct telephone dispatch `(407) 555-0123` for acute pain or trauma.
   - **Lead Qualification**: Detects and extracts patient contact details and intent for complimentary new patient consultations.
2. **Interactive Insurance Lookup**:
   - Live search for accepted providers (MetLife, Cigna, Delta Dental, Aetna, UnitedHealthcare, Guardian).
   - One-tap verification triggers in chat.
3. **Dual-Mode Backend**:
   - Works immediately out-of-the-box on Vercel with zero external dependencies via the built-in conversational fallback engine.
   - Connects to your self-hosted n8n instance simply by adding `N8N_WEBHOOK_URL` in Vercel settings.

---

## Free Deployment to Vercel (Subdomain)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: minimalist dental practice with n8n AI receptionist"
   # Push to your GitHub repository
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **Add New...** ➔ **Project**.
   - Import your GitHub repository.
   - Under **Project Name**, choose your desired free subdomain (e.g. `smile-dental-orlando`).
   - Your site will deploy live at:
     ```
     https://smile-dental-orlando.vercel.app
     ```

3. **Connect Your Self-Hosted n8n (Optional)**:
   - In your Vercel Project Dashboard: **Settings** ➔ **Environment Variables**.
   - Add:
     - `N8N_WEBHOOK_URL`: Your self-hosted n8n webhook URL (e.g., `https://n8n.yourdomain.com/webhook/smile-dental-chat`).
   - Click **Save** and trigger a redeploy.

---

## Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## Testing & Verification

```bash
# Verify TypeScript compilation and production build
npm run build
```

---

## License & Attribution

- Built with Next.js 15, React 19, and TypeScript.
- Follows [anti-slop](https://github.com/miqdadbadjuber/anti-slop) and [minimalist-skill](https://github.com/nexu-io/open-design) design architectures.
