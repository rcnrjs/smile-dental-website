import { CLINIC_INFO, INSURANCE_ROSTER } from "./clinicData";
import { ChatMessage, LeadRecord } from "./types";

export const AVA_SYSTEM_PROMPT = `
You are Ava, the friendly virtual assistant for Smile Dental Family Dentistry — a dental clinic in Orlando, FL serving families since 2018.
Your job is to help website visitors learn about Smile Dental's services, answer common dental questions, and guide them toward booking an appointment or claiming their free consultation.

You must sound warm, calm, professional, and concise.

IMPORTANT CONVERSATION STYLE:
* Ask only ONE question at a time.
* Never ask multiple questions in the same message.
* Do not ask for name, email, phone, and service all at once.
* Keep replies short, usually 1-3 short sentences.
* Guide the visitor step by step.
* Do not overwhelm the visitor with long paragraphs.

ABOUT SMILE DENTAL:
* Address: ${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state} ${CLINIC_INFO.address.zip}
* Phone: ${CLINIC_INFO.contact.phone}
* Hours: Monday–Thursday 8:00 AM–5:00 PM, Friday 8:00 AM–2:00 PM.
* Serving 2,000+ local patients since 2018.

OFFERS:
* New patients: Free consultation (comprehensive exam + digital X-ray review).
* Returning patients: Easy online appointment booking or scheduled checkups.
* Emergencies: Same-day emergency availability. If in acute pain, call immediately at ${CLINIC_INFO.contact.phone}.

INSURANCE:
* In-network with MetLife, Cigna, Delta Dental, Aetna, UnitedHealthcare, Guardian, and many out-of-network PPOs.

MAIN GOALS:
1. Welcome the visitor warmly.
2. Ask whether they are a new patient or returning patient when booking intent appears.
3. Answer questions about services, insurance, location, and appointments.
4. Guide new patients toward the free consultation.

GUARDRAILS:
1. Never claim to be human or a licensed dentist. If asked, state you are Ava, Smile Dental's virtual assistant.
2. Never diagnose dental symptoms or prescribe medications. Suggest they come in for an evaluation.
3. Never quote exact binding prices in chat. Explain that fees depend on exam findings, and invite them to the free consultation.
4. For urgent emergency symptoms (severe facial swelling, uncontrolled bleeding, broken jaw), emphasize calling ${CLINIC_INFO.contact.phone} immediately or visiting an emergency room.
`.trim();

/**
 * Intelligent deterministic / fallback conversational engine
 * Enforces "One question at a time", safety guardrails, and lead extraction.
 */
export function processFallbackMessage(
  userText: string,
  history: ChatMessage[] = []
): { response: string; quickReplies?: string[]; extractedLead?: Partial<LeadRecord> | null } {
  const text = userText.trim().toLowerCase();

  // 1. Emergency Detection
  if (
    text.includes("emergency") ||
    text.includes("severe pain") ||
    text.includes("bleeding") ||
    text.includes("swelling") ||
    text.includes("knocked out") ||
    text.includes("broken tooth") ||
    text.includes("excruciating")
  ) {
    return {
      response:
        "Yes, we offer same-day emergency appointments. If you are experiencing acute dental pain or injury, please call our direct clinic line right now at (407) 555-0123. Would you like our address for immediate directions?",
      quickReplies: ["Get Clinic Address", "I can wait for an appointment", "Speak with someone"],
    };
  }

  // 2. Identity Check (Never claim human)
  if (text.includes("are you human") || text.includes("are you a person") || text.includes("are you real") || text.includes("are you ai")) {
    return {
      response:
        "I am Ava, the virtual assistant for Smile Dental. I am here 24/7 to help you book appointments, check your insurance, and answer questions about our practice. How can I help you today?",
      quickReplies: ["Book Free Consultation", "Check Insurance", "View Services"],
    };
  }

  // 3. Medical Diagnosis Guardrail
  if (text.includes("diagnose") || text.includes("my tooth hurts what is it") || text.includes("do i need a root canal") || text.includes("antibiotic")) {
    return {
      response:
        "I cannot diagnose clinical conditions or recommend medications over chat, as only our licensed dentist can evaluate that. We would love to take a look in person during a consultation. Would you like to check our availability this week?",
      quickReplies: ["Yes, check availability", "What are your hours?", "Ask about pricing"],
    };
  }

  // 4. Exact Pricing Guardrail
  if ((text.includes("how much") || text.includes("exact cost") || text.includes("price")) && !text.includes("free consultation")) {
    return {
      response:
        "Dental treatment costs vary depending on your specific oral health needs and insurance benefits, so we do not quote fixed prices without an exam. We do offer a complimentary initial consultation for new patients. Would you like to claim that offer?",
      quickReplies: ["Yes, claim free consultation", "Do you accept my insurance?", "View services"],
    };
  }

  // 5. Insurance Inquiries
  if (text.includes("insurance") || text.includes("metlife") || text.includes("cigna") || text.includes("delta") || text.includes("aetna") || text.includes("united")) {
    const matched = INSURANCE_ROSTER.find((i) => text.includes(i.name.toLowerCase()) || text.includes(i.id));
    if (matched) {
      return {
        response: `Yes! ${matched.name} is accepted here as an in-network provider. Would you like to book an appointment or learn about a specific service?`,
        quickReplies: ["Book Appointment", "Learn About Free Consultation", "Other Insurance Questions"],
      };
    }
    return {
      response:
        "We accept most major dental insurance plans, including MetLife, Cigna, Delta Dental, Aetna, UnitedHealthcare, and Guardian. Which insurance provider do you have?",
      quickReplies: ["MetLife", "Delta Dental", "Cigna", "Aetna / Others", "I don't have insurance"],
    };
  }

  // 6. Services Inquiries
  if (text.includes("service") || text.includes("offer") || text.includes("what do you do") || text.includes("cleaning") || text.includes("whitening") || text.includes("implant")) {
    if (text.includes("whitening")) {
      return {
        response:
          "We offer professional in-office teeth whitening that brightens smiles in a single 60-minute visit. Would you like to book a brightening session or ask about eligibility?",
        quickReplies: ["Book Whitening Session", "Ask About Sensitivity", "Other Services"],
      };
    }
    if (text.includes("implant")) {
      return {
        response:
          "Our precision dental implants provide permanent, natural-looking root replacements for missing teeth. Would you like to schedule a consultation to see if you are a candidate?",
        quickReplies: ["Book Free Consultation", "What is the procedure like?", "Check Insurance"],
      };
    }
    return {
      response:
        "We offer comprehensive general dentistry, pediatric care, dental implants, clear aligners, and in-office teeth whitening. Which service would you like to know more about?",
      quickReplies: ["Teeth Whitening", "Dental Implants", "General Checkup", "Clear Aligners"],
    };
  }

  // 7. Free Consultation / New Patient Qualification Flow
  if (text.includes("free consultation") || text.includes("consultation") || text.includes("new patient") || text.includes("appointment") || text.includes("book")) {
    return {
      response:
        "Welcome! First-time patients qualify for our complimentary consultation, including digital X-rays and an exam with our doctor. Are you seeking a routine checkup or looking into a specific dental concern?",
      quickReplies: ["Routine Checkup", "Teeth Whitening", "Tooth Discomfort", "Cosmetic Consultation"],
    };
  }

  // 8. Lead Extraction & Sequential Collection Flow
  // Check for email
  const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  // Check for phone
  const phoneMatch = userText.match(/(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})/);
  
  if (emailMatch || phoneMatch) {
    const lead: Partial<LeadRecord> = {
      email: emailMatch ? emailMatch[0] : "",
      phone: phoneMatch ? phoneMatch[0] : "",
      source: "Smile Dental Chat",
      status: "New Lead",
      dateCaptured: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    };

    return {
      response:
        "Thank you! I have saved your contact details. What is your full name so our patient coordinator can address your reservation correctly?",
      extractedLead: lead,
      quickReplies: ["Confirm with name", "Call me instead"],
    };
  }

  // Check if user answered with a name (e.g. "Jasmine Reyes" or "My name is Jasmine")
  if (text.startsWith("my name is ") || text.split(" ").length === 2 && !text.includes("how") && !text.includes("what")) {
    const cleanName = userText.replace(/^my name is\s+/i, "").trim();
    const [firstName, ...rest] = cleanName.split(" ");
    const lastName = rest.join(" ");

    return {
      response: `Nice to meet you, ${firstName}! To finalize your free consultation slot, what is the best phone number or email address to confirm your time?`,
      extractedLead: {
        firstName,
        lastName: lastName || "",
      },
    };
  }

  // 9. Hours & Location
  if (text.includes("hours") || text.includes("open") || text.includes("location") || text.includes("address") || text.includes("where are you")) {
    return {
      response:
        "We are located at 1234 E Orange Ave, Suite 200 in Orlando, FL. We are open Monday through Thursday from 8:00 AM to 5:00 PM, and Friday from 8:00 AM to 2:00 PM. Would you like to schedule a visit?",
      quickReplies: ["Book an appointment", "Check insurance", "Call clinic"],
    };
  }

  // Default Greeting / Step-by-step guidance
  if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text === "") {
    return {
      response:
        "Hello, welcome to Smile Dental! I am Ava, your virtual receptionist. How can I assist you today?",
      quickReplies: ["Book Free Consultation", "Do you accept my insurance?", "Same-day Emergency", "View Services"],
    };
  }

  // Fallback helpful reply adhering to 1-3 sentences and asking only ONE question
  return {
    response:
      "I am happy to assist you with that. Would you like to book a complimentary new patient consultation, or do you have a question about our dental services?",
    quickReplies: ["Book Free Consultation", "Services & Procedures", "Insurance Information", "Clinic Hours & Location"],
  };
}
