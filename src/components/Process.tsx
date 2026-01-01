"use client";

import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, PenTool, Rocket } from "lucide-react";
import { Card, CardContent } from "@/app/ui/card";

export default function Process() {
  const steps = [
    {
      icon: MessageSquare,
      title: "1. DISCOVERY",
      description: "We start with a deep dive into your business goals, target audience, and current challenges. No code is written until we know exactly what success looks like.",
      videoPlaceholder: "WATCH A SAMPLE DISCOVERY CALL"
    },
    {
      icon: Lightbulb,
      title: "2. STRATEGY",
      description: "I creating a roadmap and technical architecture. You'll see exactly how we'll solve your problem before we build.",
      videoPlaceholder: "SEE HOW I PLAN A PROJECT"
    },
    {
      icon: PenTool,
      title: "3. DEVELOPMENT",
      description: "I build your solution using modern, scalable tech details. You get regular updates and can see the progress in real-time.",
      videoPlaceholder: "WATCH ME CODE A FEATURE"
    },
    {
      icon: Rocket,
      title: "4. LAUNCH",
      description: "We test everything rigourously. Then we launch. But I don't just disappear; I ensure your system runs smoothly.",
      videoPlaceholder: "A SUCCESSFUL LAUNCH DAY"
    }
  ];

  return (
    <section id="process" className="py-32 px-6 relative overflow-hidden bg-black/50">
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
            MY PROCESS
          </h2>
          <p className="text-xl text-neutral-500 max-w-3xl mx-auto font-mono">
            HOW I DELIVER PREDICTABLE RESULTS
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/20 transform -translate-x-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}
            >
              {/* Timeline Dot */}
              <div className="absolute top-8 left-0 md:top-8 w-4 h-4 bg-white rounded-full 
                md:transform md:-translate-x-1/2 md:left-1/2 shadow-[0_0_10px_white]" 
                style={{ left: index % 2 !== 0 && window.innerWidth < 768 ? '-8px' : undefined }}
              />

              <Card className="glass backdrop-blur-md border border-white/10 hover:border-white/30 transition-all mb-12 group overflow-hidden">
                <CardContent className="p-8">
                  <div className={`inline-block p-3 border border-white/20 rounded-xl mb-4 group-hover:bg-white group-hover:text-black transition-colors`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-neutral-400 mb-6">{step.description}</p>
                  
                  {/* Video Placeholder */}
                  <div className="relative aspect-video bg-black/50 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all cursor-pointer">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                      </div>
                      <p className="text-xs font-mono text-neutral-500">{step.videoPlaceholder}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
