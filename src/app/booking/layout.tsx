import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, generateJsonLd } from "@/lib/seo";
import BookingAndFaqsPage from "./page";

export const metadata: Metadata = generateSEOMetadata({
  title: "Booking & FAQs | Dubem Umeh",
  description:
    "Book a web development project or consultation with Dubem Umeh. Browse answers to frequently asked questions about full-stack engineering services.",
  canonical: "https://umeh.vercel.app/booking",
  keywords: ["booking", "consultation", "freelance developer", "hire full-stack developer", "web development FAQ"],
});

export default function BookingLayout() {
  const faqSchema = generateJsonLd("FAQPage" as any, {
    mainEntity: [
      {
        "@type": "Question",
        name: "What services do you offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Full-stack web application development, frontend engineering with React/Next.js, e-commerce solutions, and technical consultations.",
        },
      },
      {
        "@type": "Question",
        name: "What is your typical project timeline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Landing pages take 1-2 weeks, while full-stack web applications or e-commerce platforms take 3-6 weeks depending on scope.",
        },
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <BookingAndFaqsPage />
    </>
  );
}
