"use client";

import { useState } from "react";
import { Suspense } from "react";
import TerminalWelcome from "@/components/TerminalWelcome";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "./ui/sonner";

// Lazy load heavy components for better initial paint
const LazyPortfolio = () => (
  <Suspense fallback={<div className="h-96" />}>
    <Portfolio />
  </Suspense>
);

const LazyBlog = () => (
  <Suspense fallback={<div className="h-96" />}>
    <Blog />
  </Suspense>
);

const LazyTestimonials = () => (
  <Suspense fallback={<div className="h-96" />}>
    <Testimonials />
  </Suspense>
);

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(true);

  return (
    <>
      <CustomCursor />
      {showTerminal && <TerminalWelcome onComplete={() => setShowTerminal(false)} />}
      {!showTerminal && (
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>
            <Hero />
            <About />
            <Process />
            <LazyPortfolio />
            <LazyTestimonials />
            <LazyBlog />
            <Contact />
          </main>
          <Toaster />
          <Footer />
        </div>
      )}
    </>
  );
}