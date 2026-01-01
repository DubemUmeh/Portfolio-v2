"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Handshake, Rocket, Trophy } from "lucide-react";
import { Card, CardContent } from "@/app/ui/card";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skills = {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular"],
    backend: ["Node.js", "Python", "Django", "Express", "PostgreSQL", "MongoDB"],
    tools: ["Git", "Docker", "AWS", "CI/CD", "Jest", "Figma"],
  };

  const highlights = [
    {
      icon: Trophy,
      title: "Results First",
      description: "I focus on ROI, conversions, and performance, not just code.",
    },
    {
      icon: Handshake,
      title: "Easy to Work With",
      description: "Clear communication, regular updates, and no technical jargon.",
    },
    {
      icon: Rocket,
      title: "On-Time Delivery",
      description: "I respect deadlines. Your project launches when we say it will.",
    },
    {
      icon: Code2,
      title: "Problem Solver",
      description: "I don't just build features; I solve business challenges.",
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 relative overflow-hidden">
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
            ABOUT
          </h2>
          <motion.p
            style={{ opacity }}
            className="text-xl text-neutral-500 max-w-3xl mx-auto font-mono tracking-wide"
          >
            PARTNERING WITH BUSINESSES TO BUILD SCALABLE SOLUTIONS
          </motion.p>
        </motion.div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass backdrop-blur-md rounded-2xl p-12 border border-white/10 scanline relative group hover-lift"
          >
            <div className="absolute inset-0 spotlight" />
            <h3 className="text-3xl font-bold mb-6 tracking-tight">WHY WORK WITH ME?</h3>
            <div className="space-y-4 text-neutral-400 leading-relaxed">
              <p>
                In a world full of developers, why choose me? It's simple: <span className="text-white font-semibold">I care about your success.</span>
              </p>

              <p>
                I've learned that clean code is important, but <span className="text-white font-semibold">solving the right problem</span> is critical. 
                Whether you need to increase sales, streamline operations, or launch a new product, I bring a business-first mindset to engineering.
              </p>

              <p>
                From our first conversation to the final deployment, you'll get clear communication, honest feedback, and a partner who treats your project like their own.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Card className="glass backdrop-blur-md border border-white/10 hover:border-white/30 transition-all h-full group perspective-card">
                  <CardContent className="p-8">
                    <div className="p-4 border rounded-2xl border-white/20 w-fit mb-4 group-hover:border-animate">
                      <highlight.icon className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold mb-2 text-lg tracking-tight">{highlight.title}</h4>
                    <p className="text-sm text-neutral-500">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold mb-12 text-center tracking-tighter">
            TECHNICAL ARSENAL
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "FRONTEND", skills: skills.frontend, icon: Code2 },
              { title: "BACKEND", skills: skills.backend, icon: Rocket },
              { title: "TOOLS", skills: skills.tools, icon: Trophy } // Changed icon to match imported
            ].map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="glass backdrop-blur-md border border-white/10 hover:border-white/30 transition-all h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                      <div className="p-2 border border-white/20">
                        <category.icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-xl tracking-tight">{category.title}</h4>
                    </div>
                    <div className="space-y-3">
                      {category.skills.map((skill, i) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.2 + i * 0.05 }}
                          className="px-4 py-2 glass border border-white/10 hover:border-white/30 transition-all font-mono text-sm hover-lift"
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}