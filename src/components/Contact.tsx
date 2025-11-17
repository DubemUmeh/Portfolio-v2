"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/app/ui/card";
import { Input } from "@/app/ui/input";
import { Textarea } from "@/app/ui/textarea";
import { Label } from "@/app/ui/label";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        toast('Message Sent Successfully', {
          description: 'Replies in <10mins'
        })
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        // Handle validation errors
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        toast('Failed to send message', {
          description: 'Please try again'
        })
        setError(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Network error. Please check your connection and try again.");
      toast('Network error', {
        description: 'Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "dev@mandc2025.org",
      href: "mailto:dev@mandc2025.org",
    },
    {
      icon: Phone,
      label: "PHONE",
      value: "+233 (55) 995-6394",
      href: "tel:+233559956394",
    },
    {
      icon: MapPin,
      label: "LOCATION",
      value: "Takoradi, Ghana",
      href: "https://wa.me/233559956394",
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-24 h-[2px] bg-white mx-auto mb-8"
          />
          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
            LET'S TALK
          </h2>
          <p className="text-xl text-neutral-500 max-w-3xl mx-auto font-mono">
            HAVE A PROJECT IN MIND? LET'S CREATE SOMETHING AMAZING
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass backdrop-blur-md border border-white/10">
              <CardContent className="p-10">
                <h3 className="text-3xl font-bold mb-8 tracking-tight">SEND MESSAGE</h3>
                
                {/* Success Message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-white/10 border border-white/20 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span className="font-mono text-sm">MESSAGE SENT SUCCESSFULLY!</span>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/50 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="font-mono text-sm text-red-400">{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-mono text-sm tracking-wider mb-2 block">NAME</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="glass border border-white/20 focus:border-white bg-transparent h-12 font-mono"
                    />
                    {fieldErrors.name && (
                      <p className="text-red-400 text-xs font-mono mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-mono text-sm tracking-wider mb-2 block">EMAIL</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="glass border border-white/20 focus:border-white bg-transparent h-12 font-mono"
                    />
                    {fieldErrors.email && (
                      <p className="text-red-400 text-xs font-mono mt-1">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject" className="font-mono text-sm tracking-wider mb-2 block">SUBJECT</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="glass border border-white/20 focus:border-white bg-transparent h-12 font-mono"
                    />
                    {fieldErrors.subject && (
                      <p className="text-red-400 text-xs font-mono mt-1">{fieldErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-mono text-sm tracking-wider mb-2 block">MESSAGE</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="glass border border-white/20 focus:border-white bg-transparent font-mono resize-none"
                    />
                    {fieldErrors.message && (
                      <p className="text-red-400 text-xs font-mono mt-1">{fieldErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full px-8 py-4 bg-white text-black font-mono font-bold tracking-wider hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> SENDING...
                      </span>
                    ) : isSubmitted ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> MESSAGE SENT!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" /> SEND MESSAGE
                      </span>
                    )}
                  </button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-8 tracking-tight">CONTACT INFO</h3>
              <p className="text-neutral-500 mb-10 leading-relaxed">
                Feel free to reach out through any of these channels. I typically respond within 24 hours.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.label}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="glass backdrop-blur-md border border-white/10 hover:border-white/30 transition-all">
                      <CardContent className="p-6">
                        <a
                          href={info.href}
                          className="flex items-center gap-5 group"
                          onClick={(e) => info.href === "#" && e.preventDefault()}
                        >
                          <div className="p-4 border-2 rounded-2xl border-white group-hover:bg-white transition-all">
                            <info.icon className="w-6 h-6 group-hover:text-black transition-colors" />
                          </div>
                          <div>
                            <div className="text-xs text-neutral-500 font-mono mb-1">{info.label}</div>
                            <div className="font-bold tracking-tight">{info.value}</div>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <Card className="glass backdrop-blur-md border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white" />
              <CardContent className="p-8">
                <h4 className="font-bold text-xl mb-4 tracking-tight">AVAILABILITY</h4>
                <p className="text-neutral-500 mb-6 leading-relaxed">
                  I'm currently available for freelance projects and full-time opportunities. Let's discuss how I can help bring your ideas to life.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 border border-white/20 text-xs font-mono tracking-wider">
                    AVAILABLE FOR HIRE
                  </span>
                  <span className="px-4 py-2 border border-white/20 text-xs font-mono tracking-wider">
                    OPEN TO REMOTE
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}