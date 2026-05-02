'use client';

import type { MouseEvent } from "react";
import { Github, Linkedin, Mail, Twitter, Terminal } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "HOME", href: "#home" },
      { label: "ABOUT", href: "#about" },
      { label: "PROJECTS", href: "/projects" },
      { label: "BLOGS", href: "/blog" },
      { label: "CONTACT", href: "#contact" },
    ],
    social: [
      { icon: Github, href: "https://github.com/DubemUmeh", label: "GitHub" },
      { icon: Linkedin, href: "https://linkedin.com/in/dubem-umeh", label: "LinkedIn" },
      { icon: Twitter, href: "https://x.com/dubem_umeh", label: "Twitter" },
      { icon: Mail, href: "mailto:dev@umeh.site", label: "Email" },
    ],
  };

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      return;
    }

    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#09090b] text-[#f7f7f7] border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_36%)] pointer-events-none" />
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div className="lg:col-span-2">
            <Link
              href="/"
              onClick={(e) => scrollToSection(e, "#home")}
              className="flex items-center gap-3 mb-6 group"
            >
              <div className="p-3 border-2 border-white/15 rounded-2xl group-hover:bg-white transition-all">
                <Terminal className="w-6 h-6 text-white group-hover:text-black transition-colors" />
              </div>
              <span className="font-bold text-2xl tracking-tighter">DUBEM UMEH</span>
            </Link>
            <p className="text-neutral-400 mb-8 max-w-md leading-relaxed">
              Full-stack software developer crafting modern digital products with crisp UX, strong systems, and measurable outcomes.
            </p>
            <div className="flex flex-wrap gap-3">
              {footerLinks.social.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/5 text-white hover:border-white hover:bg-white/20 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 tracking-tight text-white">Navigation</h3>
            <ul className="space-y-3 text-neutral-400 font-mono text-sm">
              {footerLinks.navigation.map((link) => {
                const isHashLink = link.href.startsWith("#");
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...(isHashLink ? { onClick: (e) => scrollToSection(e, link.href) } : {})}
                      className="block hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 tracking-tight text-white">Contact</h3>
            <ul className="space-y-3 text-neutral-400 font-mono text-sm">
              <li>Takoradi, Ghana</li>
              <li>
                <Link href="mailto:dev@umeh.site" className="hover:text-white transition-colors">
                  dev@umeh.site
                </Link>
              </li>
              <li>
                <Link href="tel:+233559966394" className="hover:text-white transition-colors">
                  +233 (55) 995-6394
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400 font-mono">
          <p>© {currentYear} DUBEM UMEH. ALL RIGHTS RESERVED.</p>
          <p>BUILT WITH NEXT.JS & TAILWIND CSS</p>
        </div>
      </div>
    </footer>
  );
}
