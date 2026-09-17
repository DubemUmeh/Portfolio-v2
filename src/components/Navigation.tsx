'use client';
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Booking & FAQs", href: "/booking" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
      if (window.scrollY > 80 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 z-50 transition-all duration-500 box-border bg-white/80 backdrop-blur-md ${
        isScrolled || isOpen
          ? "top-4 mx-4 md:mx-10 lg:mx-16 rounded-2xl border border-accent-foreground/20 shadow-sm py-1"
          : "top-0 py-3 border-b border-b-accent-foreground/20"
      }`}
    >
      <div className="flex flex-col px-4 max-w-7xl mx-auto">
        {/* Top Header Row (Logo, Desktop Links, Toggle) */}
        <div className="flex items-center justify-between w-full">
          {/* Logo & Name */}
          <Link href="/" className="flex items-center justify-center cursor-pointer" onClick={() => setIsOpen(false)}>
            <div className="size-full border border-gray-200 flex items-center justify-center rounded-full bg-white text-primary shadow-sm bg-opacity-100">
              <span className="text-xl font-bold tracking-tight text-primary p-3">DU</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.label}
                href={item.href}
                className="text-md font-medium text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href='/#contact' className="hidden md:flex py-2 md:py-3 items-center px-5 rounded-xl border border-gray-200 text-sm font-semibold text-primary bg-blue-200/70 hover:bg-blue-200/50 transition-colors cursor-pointer shadow-xs">
              Contact Me
            </Link>

             {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden flex flex-col"
            >
              <div className="pt-4 pb-2 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 text-lg font-medium text-gray-700 bg-gray-50/50 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link 
                    href='/#contact' 
                    onClick={() => setIsOpen(false)}
                    className="w-full flex h-12 items-center justify-center px-5 rounded-xl border border-gray-200 text-base font-semibold text-primary bg-blue-200/70 hover:bg-blue-200/50 transition-colors cursor-pointer shadow-sm">
                    Contact Me
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
