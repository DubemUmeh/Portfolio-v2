"use client";

import { Code2, Github, Linkedin, Mail, Twitter, Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "HOME", href: "#home" },
      { label: "ABOUT", href: "#about" },
      { label: "WORK", href: "#portfolio" },
      { label: "CONTACT", href: "#contact" },
    ],
    social: [
      { icon: Github, href: "https://github.com/DubemUmeh", label: "GitHub" },
      { icon: Linkedin, href: "https://linkedin.com/in/dubem-umeh", label: "LinkedIn" },
      { icon: Twitter, href: "https://x.com/dubem_umeh", label: "Twitter" },
      { icon: Mail, href: "mailto:dev@mandc2025.org", label: "Email" },
    ],
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="glass backdrop-blur-md border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "#home")}
              className="flex items-center gap-3 mb-6 group"
            >
              <div className="p-3 border-2 border-white group-hover:bg-white transition-all">
                <Terminal className="w-6 h-6 group-hover:text-black transition-colors" />
              </div>
              <span className="font-bold text-2xl tracking-tighter">DUBEM UMEH</span>
            </a>
            <p className="text-neutral-500 mb-8 max-w-md leading-relaxed">
              Full-Stack Software Developer crafting exceptional digital experiences through clean code and innovative solutions.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-white/20 hover:border-white hover:bg-white transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-tight">NAVIGATION</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-neutral-500 hover:text-white transition-colors font-mono text-sm tracking-wider"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-tight">CONTACT</h3>
            <ul className="space-y-3 text-neutral-500 font-mono text-sm">
              <li>Takoradi, Ghana</li>
              <li>
                <a href="mailto:dev@mandc2025.org" className="hover:text-white transition-colors">
                  dev@mandc2025.org
                </a>
              </li>
              <li>
                <a href="tel:+233559966394" className="hover:text-white transition-colors">
                  +233 (55) 995-6394
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm font-mono">
            © {currentYear} DUBEM UMEH. ALL RIGHTS RESERVED.
          </p>
          <p className="text-neutral-500 text-sm font-mono">
            BUILT WITH NEXT.JS & TAILWIND CSS
          </p>
        </div>
      </div>
    </footer>
  );
}