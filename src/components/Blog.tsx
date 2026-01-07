"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/app/ui/card";
import { posts } from "@/lib/data";

export default function Blog() {
  return (
    <section id="blog" className="py-32 px-6 relative overflow-hidden">
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
            LATEST INSIGHTS
          </h2>
          <p className="text-xl text-neutral-500 max-w-3xl mx-auto font-mono">
            THOUGHTS ON SOFTWARE DEVELOPMENT AND BEST PRACTICES
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="glass backdrop-blur-md border border-white/10 hover:border-white/30 overflow-hidden transition-all group h-full flex flex-col cursor-pointer">
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 px-4 py-1 bg-white text-black font-mono text-xs font-bold tracking-wider">
                        {post.category}
                      </div>
                    </div>
                    <CardContent className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-6 text-xs text-neutral-500 mb-4 font-mono">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-neutral-300 transition-colors tracking-tight">
                        {post.title}
                      </h3>
                      <p className="text-neutral-500 mb-6 flex-1 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider group-hover:text-neutral-400 transition-colors">
                        READ MORE
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="/#blog"
            className="inline-block px-8 py-4 border-2 border-white text-white font-mono font-bold tracking-wider hover:bg-white hover:text-black transition-all"
          >
            MORE ARTICLES COMING SOON →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}