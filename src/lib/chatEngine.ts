import { CLINIC_INFO, INSURANCE_ROSTER } from "./clinicData";
import { ChatMessage, LeadRecord } from "./types";

export const IAN_SYSTEM_PROMPT = `
You are Ian, the friendly virtual assistant for Smile Dental Family Dentistry — a dental clinic in Orlando, FL serving families since 2018.
export const AVA_SYSTEM_PROMPT = IAN_SYSTEM_PROMPT;
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

MANDATORY BOOKING INTAKE (Ask ONE question at a time):
When a visitor is booking an appointment or claiming a free consultation, you MUST sequentially collect ALL of the following details before finalizing:
1. Preferred Day & Time (ensure it falls within office hours)
2. Full Name
3. Phone Number (best number to reach them)
4. Email Address (required to send the booking confirmation and digital intake forms)

CRITICAL RULE:
* NEVER conclude with "You are all set" until you have asked for and received their EMAIL ADDRESS.
* If you have their name and phone number, your next question MUST be: "What is the best email address to send your appointment confirmation to?"

GUARDRAILS:
1. Never claim to be human or a licensed dentist. If asked, state you are Ian, Smile Dental's virtual assistant.
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
        "I am Ian, the virtual assistant for Smile Dental. I am here 24/7 to help you book appointments, check your insurance, and answer questions about our practice. How can I help you today?",
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

  // 6. Direct Service Booking Actions (Break loops when user selects action buttons)
  if (text.includes("book whitening") || text.includes("brightening session")) {
    return {
      response:
        "I'd be delighted to help you book your professional teeth whitening session! To get started, may I have your first and last name?",
    };
  }

  if (text.includes("sensitivity") || text.includes("sensitive")) {
    return {
      response:
        "Our in-office whitening procedure uses protective barrier gel and desensitizing agents to keep sensitivity minimal during and after your visit. Would you like to go ahead and book your whitening session?",
      quickReplies: ["Book Whitening Session", "Other Services", "Check Insurance"],
    };
  }

  if (text === "routine checkup" || text.includes("routine checkup")) {
    return {
      response:
        "Wonderful! Routine preventive exams and cleanings keep your smile healthy. May I have your first and last name to schedule your visit?",
    };
  }

  if (text === "tooth discomfort" || text.includes("discomfort")) {
    return {
      response:
        "I'm sorry to hear you are experiencing discomfort. Our clinical team will take gentle care of you. May I have your first and last name so we can arrange an exam?",
    };
  }

  if (text === "cosmetic consultation" || text.includes("cosmetic")) {
    return {
      response:
        "We would love to discuss cosmetic enhancement options with you! May I have your first and last name to reserve your consultation with our doctor?",
    };
  }

  // 7. General Services Inquiries
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

  // 8. Free Consultation / New Patient Qualification Flow
  if (text.includes("free consultation") || text.includes("consultation") || text.includes("new patient") || text.includes("appointment") || text.includes("book")) {
    return {
      response:
        "Welcome! First-time patients qualify for our complimentary consultation, including digital X-rays and an exam with our doctor. Are you seeking a routine checkup or looking into a specific dental concern?",
      quickReplies: ["Routine Checkup", "Teeth Whitening", "Tooth Discomfort", "Cosmetic Consultation"],
    };
  }

  // 9. Multi-Turn History Awareness (Track what has already been collected)
  let knownName = "";
  let knownPhone = "";
  let knownEmail = "";

  for (const m of history) {
    const t = m.text || "";
    // If assistant greeted with name
    const greetingMatch = t.match(/Nice to meet you, ([A-Za-z]+)!/i);
    if (greetingMatch && !knownName) {
      knownName = greetingMatch[1];
    }
    if (m.sender === "user") {
      const email = t.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (email && !knownEmail) knownEmail = email[0].toLowerCase();
      
      const phoneMatch = t.match(/(?:\+?\d{1,4}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,5}/);
      if (phoneMatch) {
        const digits = phoneMatch[0].replace(/\D/g, "");
        if (digits.length >= 10 && digits.length <= 15 && !knownPhone) {
          knownPhone = phoneMatch[0].trim();
        }
      }
    }
  }

  // 10. Sequential Collection Flow
  // Check for email in current message
  const currentEmail = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  // Check for phone in current message
  const currentPhoneCandidates = userText.match(/(?:\+?\d{1,4}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,5}/g);
  let currentPhone = "";
  if (currentPhoneCandidates) {
    for (const cand of currentPhoneCandidates) {
      const digits = cand.replace(/\D/g, "");
      if (digits.length >= 10 && digits.length <= 15) {
        currentPhone = cand.trim();
        break;
      }
    }
  }

  // If user just provided an EMAIL
  if (currentEmail) {
    return {
      response:
        "Got it, thank you! What day of the week or time works best for your visit?",
      extractedLead: {
        email: currentEmail[0].toLowerCase(),
        phone: knownPhone || "",
        firstName: knownName || "",
      },
    };
  }

  // If user just provided a PHONE
  if (currentPhone) {
    if (knownName) {
      return {
        response:
          `Thank you, ${knownName}! What is the best email address to send your confirmation to?`,
        extractedLead: {
          phone: currentPhone,
          firstName: knownName,
        },
      };
    }
    return {
      response:
        "Thank you! What is your full name so our coordinator can address your reservation correctly?",
      extractedLead: {
        phone: currentPhone,
      },
    };
  }

  // If user provided DATE / TIME preference
  if (text.includes("am") || text.includes("pm") || text.includes("monday") || text.includes("tuesday") || text.includes("wednesday") || text.includes("thursday") || text.includes("friday") || text.includes("september") || text.includes("october") || text.includes("morning") || text.includes("afternoon")) {
    return {
      response:
        "That works wonderfully! Is there a specific dental concern you'd like our team to focus on during your visit?",
      quickReplies: ["Routine Checkup", "Teeth Whitening", "Tooth Discomfort", "Cosmetic Consultation"],
    };
  }

  // If user provided a DENTAL CONCERN or answered the concern question
  if (text.includes("crack") || text.includes("pain") || text.includes("clean") || text.includes("checkup") || text.includes("whitening") || text.includes("cavity") || text.includes("bleeding") || text.includes("discomfort") || text.includes("teeth")) {
    return {
      response:
        `Thank you${knownName ? `, ${knownName}` : ""}! Our clinical team will prepare for your visit. Is there anything else I can help you with today?`,
      quickReplies: ["No, I'm good", "Check Insurance", "Clinic Location"],
    };
  }

  // If user says "no" or "good" or closes
  if (text === "no" || text.includes("no,") || text.includes("i'm good") || text.includes("im good") || text.includes("all set") || text.includes("that's all")) {
    return {
      response:
        "You're all set! We look forward to seeing you at Smile Dental. Have a wonderful rest of your day!",
    };
  }

  // Check if user answered with a NAME (ignore common button phrases like "Confirm with name", "Call me instead", etc.)
  const isIgnoredPhrase = /^(confirm|confirm with name|call me|call me instead|book|check|free|consultation|emergency|services|yes|no|good|okay|ok)$/i.test(userText.trim());
  const introMatch = !isIgnoredPhrase ? userText.match(/(?:my name is|name is)\s+([A-Za-z\s.'-]+?)(?=(?:\s+and|\s+my|\s+phone|\s+email|[.,\n]|$))/i) : null;

  function splitFullName(fullName: string) {
    const words = fullName.trim().split(/\s+/);
    if (words.length === 1) return { firstName: words[0], lastName: "" };
    if (words.length === 2) return { firstName: words[0], lastName: words[1] };
    const surnamePrefixes = /^(de|del|dela|da|van|von|san|st\.?|dos|das)$/i;
    if (words.length >= 3 && surnamePrefixes.test(words[words.length - 2])) {
      return {
        firstName: words.slice(0, words.length - 2).join(" "),
        lastName: words.slice(words.length - 2).join(" "),
      };
    }
    return {
      firstName: words.slice(0, words.length - 1).join(" "),
      lastName: words[words.length - 1],
    };
  }

  const isDentalTerm = /(aligner|teeth|whitening|implant|checkup|cleaning|crown|veneer|cosmetic|emergency|consultation|routine|exam|appointment|service|dentist|dentistry|filling|bridge|braces|invisalign|root canal|extraction)/i.test(userText);

  if (introMatch && introMatch[1] && !isDentalTerm) {
    const { firstName, lastName } = splitFullName(introMatch[1]);
    return {
      response: `Nice to meet you, ${firstName}! What is the best phone number to reach you at?`,
      extractedLead: {
        firstName,
        lastName,
      },
    };
  } else if (!isIgnoredPhrase && !isDentalTerm && /^[A-Za-z\s.'-]+$/.test(userText.trim()) && userText.trim().split(/\s+/).length >= 2 && userText.trim().split(/\s+/).length <= 4 && !text.includes("how") && !text.includes("what") && !text.includes("book")) {
    const { firstName, lastName } = splitFullName(userText);
    return {
      response: `Nice to meet you, ${firstName}! What is the best phone number to reach you at?`,
      extractedLead: {
        firstName,
        lastName,
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
        "Hello, welcome to Smile Dental! I am Ian, your virtual receptionist. How can I assist you today?",
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
