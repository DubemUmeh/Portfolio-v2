"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Send, CheckCircle2,
  AlertCircle, Loader2, Linkedin, Github,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsSubmitted(true);
        toast("Message Sent Successfully", { description: "I typically respond within 24 hours" });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        if (data.errors) setFieldErrors(data.errors);
        toast("Failed to send message", { description: "Please try again" });
        setError(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      toast("Network error", { description: "Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail,   label: "Email",    value: "dev@umeh.site",       href: "mailto:dev@umeh.site" },
    { icon: Phone,  label: "Phone",    value: "+233 (55) 995-6394",  href: "tel:+233559956394" },
    { icon: MapPin, label: "Location", value: "Takoradi, Ghana",     href: "https://wa.me/233559956394" },
  ];

  const inputClass =
    "w-full border border-[rgba(10,10,10,0.1)] rounded-[0.85rem] bg-[rgba(255,255,255,0.72)] shadow-[0_2px_8px_rgba(15,23,42,0.04)] px-4 h-11 text-[0.95rem] text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[rgba(10,10,10,0.28)] focus:bg-white transition-all";

  return (
    <section id="contact" className="landing-section relative px-5 pb-20">
      <div className="landing-container w-[min(100%,76rem)] mx-auto">
        <div className="landing-ai-shell relative border border-[rgba(10,10,10,0.07)] rounded-4xl bg-[radial-gradient(circle_at_top_left,rgba(246,213,247,0.16),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(255,225,147,0.12),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.68))] shadow-[0_20px_48px_rgba(15,23,42,0.05),0_1px_0_rgba(255,255,255,0.74)_inset] p-6 before:content-[''] before:absolute before:inset-x-[-0.8rem] before:top-[-1.2rem] before:h-56 before:rounded-full before:bg-[radial-gradient(circle_at_24%_48%,rgba(246,213,247,0.55),transparent_42%),radial-gradient(circle_at_78%_38%,rgba(255,225,147,0.38),transparent_36%),radial-gradient(circle_at_62%_72%,rgba(255,184,142,0.26),transparent_34%)] before:blur-[42px] before:opacity-[0.72] before:pointer-events-none before:z-0 *:relative *:z-1">
          <div className="landing-ai-header max-w-2xl mb-8">
            <div className="landing-kicker inline-flex items-center gap-[0.45rem] border border-[rgba(10,10,10,0.1)] rounded-full bg-[rgba(255,255,255,0.72)] shadow-[0_8px_20px_rgba(15,23,42,0.05)] px-[0.8rem] py-[0.45rem] text-[0.76rem] font-semibold tracking-[0.12em] uppercase text-[#737373]">
              Get In Touch
            </div>
            <h2 className="display-title landing-section-title mt-4 text-[clamp(2rem,5vw,3.6rem)] leading-none tracking-[-0.04em] text-[#0a0a0a] font-['Fraunces',Georgia,serif] [font-optical-sizing:auto]">
              Let's work together.
            </h2>
            <p className="landing-section-copy mt-4 text-[1.05rem] leading-[1.72] text-[#525252]">
              Have a project in mind? I'd love to discuss how I can help bring your ideas to life.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="border border-[rgba(10,10,10,0.07)] rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(249,239,250,0.72))] shadow-[0_14px_36px_rgba(15,23,42,0.04),0_1px_0_rgba(255,255,255,0.72)_inset] p-6">
                <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#0a0a0a] mb-5 font-['Fraunces',Georgia,serif]">
                  Send a Message
                </h3>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-3.5 rounded-xl border border-[rgba(34,197,94,0.22)] bg-[rgba(240,253,244,0.9)] flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="text-[0.88rem] font-medium text-green-700">Message sent successfully!</span>
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
                  <div>
                    <label htmlFor="name" className="block text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-[#737373] mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                    {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-[#737373] mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                    {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-[#737373] mb-1.5">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Project inquiry, collaboration, etc."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                    {fieldErrors.subject && <p className="text-red-500 text-xs mt-1">{fieldErrors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-[#737373] mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="w-full border border-[rgba(10,10,10,0.1)] rounded-[0.85rem] bg-[rgba(255,255,255,0.72)] shadow-[0_2px_8px_rgba(15,23,42,0.04)] px-4 py-3 text-[0.95rem] text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[rgba(10,10,10,0.28)] focus:bg-white transition-all resize-none"
                    />
                    {fieldErrors.message && <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-[0.85rem] bg-[#0a0a0a] text-white text-[0.9rem] font-semibold hover:bg-[#262626] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(10,10,10,0.18)]"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                    ) : isSubmitted ? (
                      <><CheckCircle2 className="w-4 h-4" /> Sent!</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="border border-[rgba(10,10,10,0.07)] rounded-[1.35rem] bg-[rgba(255,255,255,0.76)] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-5">
                <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#0a0a0a] mb-1 font-['Fraunces',Georgia,serif]">
                  Contact Info
                </h3>
                <p className="text-[0.9rem] leading-[1.65] text-[#525252] mb-5">
                  Reach out through any of these channels. I typically respond within 24 hours.
                </p>
                <div className="space-y-3">
                  {contactInfo.map((info) => (
                    <Link
                      key={info.label}
                      href={info.href}
                      className="flex items-center gap-3.5 p-3.5 rounded-[1rem] border border-[rgba(10,10,10,0.07)] bg-[rgba(255,255,255,0.6)] hover:bg-white hover:border-[rgba(10,10,10,0.14)] hover:shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition-all group"
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[rgba(255,205,112,0.18)] border border-[rgba(255,205,112,0.3)] shrink-0">
                        <info.icon className="w-4 h-4 text-[#0a0a0a]" />
                      </div>
                      <div>
                        <div className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-[#737373]">
                          {info.label}
                        </div>
                        <div className="text-[0.92rem] font-semibold text-[#0a0a0a]">
                          {info.value}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border border-[rgba(10,10,10,0.07)] rounded-[1.35rem] bg-[rgba(255,255,255,0.76)] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-5">
                <p className="text-[0.76rem] font-semibold tracking-[0.12em] uppercase text-[#737373] mb-4">
                  Connect on social
                </p>
                <div className="flex gap-3">
                  {[
                    { href: "https://github.com/dubemUmeh", Icon: Github, label: "GitHub" },
                    { href: "https://linkedin.com/in/dubem-umeh", Icon: Linkedin, label: "LinkedIn" },
                  ].map(({ href, Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-[0.85rem] border border-[rgba(10,10,10,0.1)] bg-[rgba(255,255,255,0.72)] hover:bg-white hover:border-[rgba(10,10,10,0.2)] hover:shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition-all text-[0.82rem] font-semibold text-[#0a0a0a]"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                  </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
