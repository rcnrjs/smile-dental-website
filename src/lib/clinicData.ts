import { ClinicalService, InsuranceProvider } from "./types";

export const CLINIC_INFO = {
  name: "Smile Dental Family Dentistry",
  tagline: "Modern dental care founded on patience, precision, and clinical clarity.",
  establishedYear: 2018,
  patientCount: "2,000+",
  address: {
    street: "1234 E Orange Ave, Suite 200",
    city: "Orlando",
    state: "FL",
    zip: "32806",
    crossStreet: "Near Downtown Orlando medical district",
    parking: "Dedicated surface parking lot behind building. ADA accessible ground-level entry.",
  },
  contact: {
    phone: "(407) 555-0123",
    cleanPhone: "4075550123",
    email: "care@smiledentalorlando.com",
    emergencyPhone: "(407) 555-0123",
  },
  hours: [
    { days: "Monday – Thursday", time: "8:00 AM – 5:00 PM" },
    { days: "Friday", time: "8:00 AM – 2:00 PM" },
    { days: "Saturday – Sunday", time: "Emergency On-Call Only" },
  ],
  offers: {
    newPatient: {
      title: "New Patient Consultation",
      description: "Complimentary initial exam, digital X-rays review, and treatment plan consultation with our lead practitioner.",
      cost: "Free (Normally $180)",
      eligibility: "All first-time visitors with or without insurance",
    },
    emergency: {
      title: "Same-Day Emergency Relief",
      description: "Dedicated daily emergency reservation blocks for acute pain, trauma, tooth fractures, or crown dislodgements.",
      availability: "Call directly before 11:00 AM for guaranteed same-day triage",
    },
  },
};

export const CLINICAL_SERVICES: ClinicalService[] = [
  {
    id: "preventive",
    category: "General Dentistry",
    name: "Comprehensive Preventive Exams & Hygiene",
    description: "Periodontal probing, low-radiation digital radiography, ultrasonic cleaning, and oral cancer screening performed with methodical thoroughness.",
    typicalDuration: "50–60 minutes",
    idealFor: "Routine biannual checkups, early cavity detection, and gingival maintenance",
  },
  {
    id: "pediatric",
    category: "Family & Pediatric",
    name: "Pediatric Gentle Dentistry",
    description: "Child-centered preventive care, fluoride varnish, molar sealants, and bite development monitoring in a calm, pressure-free environment.",
    typicalDuration: "30–45 minutes",
    idealFor: "Infants through adolescents transitioning into permanent dentition",
  },
  {
    id: "implants",
    category: "Restorative Care",
    name: "Precision Dental Implants",
    description: "Biocompatible titanium root replacements paired with custom ceramic crowns, engineered for structural durability and natural chewing function.",
    typicalDuration: "Multi-stage protocol",
    idealFor: "Single or multiple missing teeth; permanent alternative to bridges or removable dentures",
  },
  {
    id: "orthodontics",
    category: "Orthodontics",
    name: "Clear Aligners & Orthodontic Guidance",
    description: "Digital 3D-scanned alignment regimens designed to correct crowding, diastemas, and crossbites discreetly without brackets or metal wires.",
    typicalDuration: "6–18 months active cycle",
    idealFor: "Mild to moderate malocclusion in adult and teenage patients",
  },
  {
    id: "whitening",
    category: "Cosmetic Care",
    name: "In-Office Clinical Brightening",
    description: "Professional-grade hydrogen peroxide activation yielding 4–8 shades of brightening in a single clinical visit, stabilized with desensitizing agents.",
    typicalDuration: "60 minutes",
    idealFor: "Deep extrinsic staining from coffee, tea, aging, or dietary enamel darkening",
  },
  {
    id: "emergency-triage",
    category: "Urgent Care",
    name: "Acute Pain Management & Emergency Repair",
    description: "Same-day diagnostic assessment, local anesthesia stabilization, temporary fillings, and emergency pulp debridement.",
    typicalDuration: "30–60 minutes",
    idealFor: "Severe toothaches, pulpitis, fractured cusps, or dental trauma",
  },
];

export const INSURANCE_ROSTER: InsuranceProvider[] = [
  {
    id: "metlife",
    name: "MetLife Dental",
    status: "In-Network",
    plans: ["MetLife PDP Plus", "MetLife Federal Dental Plan (FEDVIP)", "MetLife Preferred Dentist Program"],
    verificationNote: "Full preventive coverage typically 100% covered. In-network benefits confirmed in real time.",
  },
  {
    id: "cigna",
    name: "Cigna Dental",
    status: "In-Network",
    plans: ["Cigna Dental Total Care", "Cigna Dental EPO", "Cigna Dental PPO Radius"],
    verificationNote: "Direct billing accepted with zero upfront deductible on routine annual prophylaxis.",
  },
  {
    id: "delta",
    name: "Delta Dental",
    status: "In-Network",
    plans: ["Delta Dental Premier", "Delta Dental PPO", "DeltaCare USA (Select Networks)"],
    verificationNote: "Most common regional employer plan; negotiated fee schedule applied immediately.",
  },
  {
    id: "aetna",
    name: "Aetna Dental",
    status: "In-Network",
    plans: ["Aetna Dental PPO", "Aetna Extend Network"],
    verificationNote: "Standard diagnostic procedures covered under standard policy terms.",
  },
  {
    id: "united",
    name: "UnitedHealthcare",
    status: "In-Network",
    plans: ["UHC Dental PPO", "UHC Dual Complete (Select Programs)"],
    verificationNote: "We verify copayments and deductible status prior to your appointment.",
  },
  {
    id: "guardian",
    name: "Guardian",
    status: "In-Network",
    plans: ["Guardian DentalGuard Preferred PPO"],
    verificationNote: "Electronic claims submission processed on the date of service.",
  },
  {
    id: "humana",
    name: "Humana Dental",
    status: "Accepted Out-of-Network",
    plans: ["Humana Dental PPO", "Humana Preventive Plus"],
    verificationNote: "We file claims on your behalf; reimbursement sent directly to patient.",
  },
];
