import type { Metadata } from "next";
import "./globals.css";
import { CLINIC_INFO } from "@/lib/clinicData";

export const metadata: Metadata = {
  title: `${CLINIC_INFO.name} | Orlando, FL`,
  description: "Modern dental care in Orlando, Florida. General dentistry, pediatric care, precision dental implants, clear aligners, and 24/7 AI-assisted intake.",
  keywords: ["Orlando dentist", "Smile Dental", "family dentistry", "dental implants Orlando", "teeth whitening", "MetLife in-network dentist"],
  openGraph: {
    title: `${CLINIC_INFO.name} — Orlando, FL`,
    description: "Modern dental care founded on patience, precision, and clinical clarity. Complimentary new patient consultation available.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
