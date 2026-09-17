"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Clock, CheckCircle2, AlertCircle, Loader2,
  HelpCircle, ChevronDown, Send
} from "lucide-react";
import { toast } from "sonner";
import Script from "next/script";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/ui/accordion";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I specialize in full-stack web application development, custom frontend UI/UX engineering with React & Next.js, API backend integrations, e-commerce solutions, and database optimization.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Timelines vary depending on project scope. A targeted landing page or portfolio site typically takes 1-2 weeks, while full-stack web applications or e-commerce platforms take 3-6 weeks.",
  },
  {
    question: "How do we get started with a booking?",
    answer:
      "Fill out the booking form on this page with your project specifications and preferred launch timeframe. I'll review your details and respond within 24 hours to schedule a discovery call.",
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer:
      "Yes! I provide ongoing support, bug fixes, performance monitoring, and feature updates to ensure your application remains secure and performs at its best.",
  },
  {
    question: "What pricing models do you work with?",
    answer:
      "I offer fixed-price quotes for well-defined scope items and hourly or retainer rates for ongoing development and consulting services.",
  },
];

export default function BookingAndFaqsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Full-Stack Web App",
    date: "",
    details: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formStartTime, setFormStartTime] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    setFormStartTime(Date.now());
  }, []);

  const renderTurnstile = () => {
    if (
      typeof window !== "undefined" &&
      window.turnstile &&
      turnstileContainerRef.current &&
      !widgetIdRef.current
    ) {
      try {
        const id = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: "0x4AAAAAAE6cNGzpSTCH-jtW",
          action: "booking",
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => setTurnstileToken(""),
        });
        widgetIdRef.current = id;
      } catch (e) {
        console.error("Turnstile render error:", e);
      }
    }
  };

  const resetTurnstile = () => {
    if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch (e) {
        console.error("Turnstile reset error:", e);
      }
      setTurnstileToken("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setError("Please complete the bot security check.");
      toast("Security Check Required", { description: "Please complete the Cloudflare security widget." });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website: honeypot,
          formStartTime,
          "cf-turnstile-response": turnstileToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        toast("Booking Request Sent!", { description: "I'll review your details and reach out shortly." });
        setFormData({ name: "", email: "", service: "Full-Stack Web App", date: "", details: "" });
        setHoneypot("");
        resetTurnstile();
        setFormStartTime(Date.now());
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(data.message || "Failed to submit booking. Please try again.");
        toast("Failed to submit", { description: data.message || "Please try again" });
        resetTurnstile();
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      toast("Network error", { description: "Please check your connection and try again." });
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-[rgba(10,10,10,0.1)] rounded-[0.85rem] bg-[rgba(255,255,255,0.72)] shadow-[0_2px_8px_rgba(15,23,42,0.04)] px-4 h-11 text-[0.95rem] text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[rgba(10,10,10,0.28)] focus:bg-white transition-all";

  return (
    <div className="min-h-screen landing-page pt-20 pb-20 px-5">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderTurnstile}
      />
      <div className="landing-container w-[min(100%,76rem)] mx-auto space-y-16">

        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto">
          
          <h1 className="display-title mt-4 text-[clamp(2.4rem,5vw,4rem)] leading-none tracking-[-0.04em] text-[#0a0a0a] font-['Fraunces',Georgia,serif]">
            Book a Project or Consultation
          </h1>
          <p className="mt-4 text-[1.1rem] leading-[1.7] text-[#525252]">
            Select your required service, share your project timeframe, and view frequently asked questions below.
          </p>
        </div>

        {/* Booking Form & Info Section */}
        <div className="landing-ai-shell relative border border-[rgba(10,10,10,0.07)] rounded-4xl bg-[radial-gradient(circle_at_top_left,rgba(246,213,247,0.16),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(255,225,147,0.12),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.68))] shadow-[0_20px_48px_rgba(15,23,42,0.05),0_1px_0_rgba(255,255,255,0.74)_inset] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border border-[rgba(10,10,10,0.07)] rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(249,239,250,0.72))] shadow-[0_14px_36px_rgba(15,23,42,0.04),0_1px_0_rgba(255,255,255,0.72)_inset] p-6"
            >
              <h2 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-[#0a0a0a] mb-6 font-['Fraunces',Georgia,serif] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-neutral-700" /> Reserve a Slot
              </h2>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-3.5 rounded-xl border border-[rgba(34,197,94,0.22)] bg-[rgba(240,253,244,0.9)] flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-[0.88rem] font-medium text-green-700">Booking submitted successfully!</span>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-3.5 rounded-xl border border-[rgba(239,68,68,0.2)] bg-[rgba(254,242,242,0.9)] flex items-center gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="text-[0.88rem] font-medium text-red-600">{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="confirm_email">Confirm Email</label>
                  <input
                    type="text"
                    id="confirm_email"
                    name="confirm_email"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="booking-name" className="block text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-[#737373] mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="booking-email" className="block text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-[#737373] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-service" className="block text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-[#737373] mb-1.5">
                      Service Requested
                    </label>
                    <select
                      id="booking-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      disabled={isSubmitting}
                      className={inputClass}
                    >
                      <option value="Full-Stack Web App">Full-Stack Web App</option>
                      <option value="Frontend Engineering">Frontend Engineering</option>
                      <option value="E-Commerce Store">E-Commerce Store</option>
                      <option value="Consultation & Code Review">Consultation & Code Review</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="booking-date" className="block text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-[#737373] mb-1.5">
                      Target Start Date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-details" className="block text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-[#737373] mb-1.5">
                    Project Overview
                  </label>
                  <textarea
                    id="booking-details"
                    rows={4}
                    placeholder="Provide a brief summary of your goals, key features, or questions..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="w-full border border-[rgba(10,10,10,0.1)] rounded-[0.85rem] bg-[rgba(255,255,255,0.72)] shadow-[0_2px_8px_rgba(15,23,42,0.04)] px-4 py-3 text-[0.95rem] text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[rgba(10,10,10,0.28)] focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Turnstile Widget Container */}
                <div className="py-2 flex justify-center min-h-[65px]">
                  <div ref={turnstileContainerRef} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted || !turnstileToken}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-[0.85rem] bg-[#0a0a0a] text-white text-[0.9rem] font-semibold hover:bg-[#262626] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(10,10,10,0.18)] cursor-pointer"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                  ) : isSubmitted ? (
                    <><CheckCircle2 className="w-4 h-4" /> Submitted!</>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit Booking</>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Side Info Panel */}
            <div className="flex flex-col gap-6">
              <div className="border border-[rgba(10,10,10,0.07)] rounded-[1.35rem] bg-[rgba(255,255,255,0.76)] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-6">
                <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#0a0a0a] mb-2 font-['Fraunces',Georgia,serif]">
                  Why Book a Call?
                </h3>
                <ul className="space-y-3.5 text-[0.92rem] text-[#525252] mt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Tailored Architecture:</strong> Get direct technical clarity on tech stack, architecture, and timeline.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Fast Turnaround:</strong> Direct line to a Senior Full-Stack Engineer without middleware overhead.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Transparent Estimates:</strong> Clear milestones, deliverables, and fixed scope breakdown.</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[rgba(10,10,10,0.07)] rounded-[1.35rem] bg-[rgba(255,255,255,0.76)] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-neutral-700" />
                  <h3 className="text-[1.1rem] font-semibold text-[#0a0a0a]">Availability</h3>
                </div>
                <p className="text-[0.9rem] text-[#525252] leading-relaxed">
                  Currently taking on new projects for Q2/Q3. Typical response time is within 24 business hours.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="pt-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-neutral-600 font-semibold text-xs tracking-widest uppercase mb-2">
              <HelpCircle className="w-4 h-4" /> Got Questions?
            </div>
            <h2 className="text-3xl font-bold font-['Fraunces',Georgia,serif] text-[#0a0a0a]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto border border-[rgba(10,10,10,0.08)] rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-sm">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-neutral-100 last:border-0 pb-2">
                  <AccordionTrigger className="text-left font-semibold text-[1.02rem] text-[#0a0a0a] hover:text-neutral-600 transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#525252] text-[0.95rem] leading-relaxed pt-1 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

      </div>
    </div>
  );
}
