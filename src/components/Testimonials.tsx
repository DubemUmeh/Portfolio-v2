"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/app/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/ui/avatar";
import { testimonials } from "@/lib/data";

export default function Testimonials() {

  return (
    <section id="testimonials" className="py-32 px-6 relative overflow-hidden">
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
            TESTIMONIALS
          </h2>
          <p className="text-xl text-neutral-500 max-w-3xl mx-auto font-mono">
            WHAT CLIENTS SAY ABOUT WORKING WITH ME
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full glass backdrop-blur-md border border-white/10 hover:border-white/30 transition-all relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white" />
                  
                  <CardContent className="p-8">
                    <Quote className="w-12 h-12 text-white/20 mb-6" />
                    <p className="text-neutral-400 mb-8 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                      <Avatar className="border-2 border-white/20 grayscale group-hover:grayscale-0 transition-all">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold tracking-tight">{testimonial.name}</div>
                        <div className="text-sm text-neutral-500 font-mono">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}