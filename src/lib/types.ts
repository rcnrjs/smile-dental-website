export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  quickReplies?: string[];
  isEmergencyAlert?: boolean;
}

export interface LeadRecord {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  dateCaptured: string;
  source: string;
  status: string;
  notes?: string;
}

export interface ClinicalService {
  id: string;
  category: string;
  name: string;
  description: string;
  typicalDuration: string;
  idealFor: string;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  status: "In-Network" | "Accepted Out-of-Network";
  plans: string[];
  verificationNote: string;
}
