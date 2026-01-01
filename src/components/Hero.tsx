"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { Button } from "@/app/ui/button";
import { useEffect, useRef, useState } from "react";

// Text scramble effect
const useTextScramble = (finalText: string, trigger: boolean) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  
  useEffect(() => {
    if (!trigger) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return finalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= finalText.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [finalText, trigger]);
  
  return displayText;
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; vx: number; vy: number }>>([]);
  const [startScramble, setStartScramble] = useState(false);
  
  const scrambledName = useTextScramble("BUILD. SCALE. DOMINATE.", startScramble);
  
  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    setStartScramble(true);
    
    // Generate particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setParticles(newParticles);
    
    // Animate particles
    const animateParticles = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.vx + window.innerWidth) % window.innerWidth,
        y: (p.y + p.vy + window.innerHeight) % window.innerHeight,
      })));
    };
    
    const interval = setInterval(animateParticles, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Magnetic effect for buttons
  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>, ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    
    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };
  
  const handleMagneticLeave = (ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };
  
  const buttonRef1 = useRef<HTMLAnchorElement>(null);
  const buttonRef2 = useRef<HTMLAnchorElement>(null);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden"
    >
      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: "#ffffff",
            borderRadius: "50%",
            opacity: 0.3,
          }}
        />
      ))}
      
      {/* Mouse follower glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
          left: smoothMouseX,
          top: smoothMouseY,
          x: "-50%",
          y: "-50%",
        }}
      />
      
      <motion.div 
        className="container mx-auto relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Main content - centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.3, 
                type: "spring",
                stiffness: 200,
                damping: 15 
              }}
              className="inline-block mb-8"
            >
              <div className="px-6 py-2 border border-white/20 glass backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                  <span className="text-sm tracking-widest font-mono">AVAILABLE FOR HIRE</span>
                </div>
              </div>
            </motion.div>
            
            {/* Main heading with scramble effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-4"
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                <motion.span
                  className="inline-block"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  {scrambledName || "BUILD. SCALE. DOMINATE."}
                </motion.span>
              </h1>
            </motion.div>
            
            {/* Subtitle with typing effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-3xl text-neutral-400 font-mono flex items-center justify-center gap-3">
                <Terminal className="w-6 h-6" />
                <span className="border-r-2 border-white/50 pr-1 animate-pulse">
                  SOLVING BUSINESS PROBLEMS WITH CODE
                </span>
              </h2>
            </motion.div>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-lg md:text-xl text-neutral-500 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              I don't just write code. I build <span className="text-white font-semibold">robust, scalable solutions</span> that save time, 
              increase conversion, and deliver real ROI. Let's turn your complex problems into elegant software.
            </motion.p>

            {/* CTA Buttons with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="relative top-0 left-0 flex flex-wrap gap-6 justify-center mb-16 !z-50"
            >
              <a
                ref={buttonRef1}
                href="#portfolio"
                className="magnetic group px-8 py-4 bg-white text-black font-mono font-bold tracking-wider hover:bg-neutral-200 transition-all border-2 border-white relative overflow-hidden"
                onMouseMove={(e) => handleMagneticMove(e, buttonRef1)}
                onMouseLeave={() => handleMagneticLeave(buttonRef1)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  SEE RESULTS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
              
              <a
                ref={buttonRef2}
                href="#contact"
                className="magnetic group px-8 py-4 border-2 border-white text-white font-mono font-bold tracking-wider hover:bg-white hover:text-black transition-all"
                onMouseMove={(e) => handleMagneticMove(e, buttonRef2)}
                onMouseLeave={() => handleMagneticLeave(buttonRef2)}
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  DOWNLOAD CV
                </span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="flex gap-6 justify-center mb-10 md:mb-0"
            >
              {[
                { icon: Github, href: "https://github.com/DubemUmeh" },
                { icon: Linkedin, href: "https://linkedin.com/in/dubem-umeh" },
                { icon: Mail, href: "mailto:dev@mandc2025.org" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border border-white/20 hover:border-white hover:bg-white transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5 group-hover:text-black transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats - Bottom corners */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="relative md:absolute md:bottom-20 z-10 md:left-6 md:right-6 flex justify-between items-center text-sm font-mono"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="glass backdrop-blur-md px-6 py-4 text-center border border-white/20"
            >
              <div className="text-4xl font-bold mb-1">100%</div>
              <div className="text-neutral-500 tracking-wider">PROJECT SUCCESS</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="glass backdrop-blur-md px-6 py-4 text-center border border-white/20"
            >
              <div className="text-4xl font-bold mb-1">6+</div>
              <div className="text-neutral-500 tracking-wider">HAPPY CLIENTS</div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-neutral-500"
            >
              <span className="text-xs font-mono tracking-widest">SCROLL</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
          </motion.div> */}
        </div>
      </motion.div>
    </section>
  );
}