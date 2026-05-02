"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { posts } from "@/lib/data";

export default function Blog() {
  return (
    <section id="blog" className="landing-section relative px-5 pb-20">
      <div className="landing-container w-[min(100%,76rem)] mx-auto">
        <div className="landing-process-shell overflow-hidden rounded-[2.4rem] bg-[radial-gradient(circle_at_top_left,rgba(246,213,247,0.28),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(255,225,147,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,184,142,0.16),transparent_28%),linear-gradient(180deg,#fdfcfa_0%,#f5f1ea_100%)] border border-[rgba(10,10,10,0.06)] shadow-[0_24px_60px_rgba(15,23,42,0.06),0_1px_0_rgba(255,255,255,0.72)_inset] p-6">
          <div className="landing-process-header grid gap-4 items-end mb-8 md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.7fr)]">
            <div>
              <div className="landing-kicker inline-flex items-center gap-[0.45rem] border border-[rgba(10,10,10,0.1)] rounded-full bg-[rgba(255,255,255,0.72)] shadow-[0_8px_20px_rgba(15,23,42,0.05)] px-[0.8rem] py-[0.45rem] text-[0.76rem] font-semibold tracking-[0.12em] uppercase text-[#737373]">
                Latest Insights
              </div>
              <h2 className="display-title landing-process-title mt-4 text-[clamp(2rem,5vw,3.6rem)] leading-none tracking-[-0.04em] text-[#0a0a0a] font-['Fraunces',Georgia,serif] [font-optical-sizing:auto]">
                Thoughts on craft, code, and digital strategy.
              </h2>
            </div>
            <p className="mt-4 text-[1.05rem] leading-[1.72] text-[#525252] max-w-xl">
              Practical writing on building maintainable products, scaling teams, and designing experiences with intention.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="h-full flex flex-col border border-[rgba(10,10,10,0.07)] rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))] shadow-[0_12px_28px_rgba(15,23,42,0.04),0_1px_0_rgba(255,255,255,0.72)_inset] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_48px_rgba(15,23,42,0.09)] hover:border-[rgba(10,10,10,0.12)] hover:-translate-y-1">
                    <div className="relative overflow-hidden aspect-[4/3] bg-[rgba(10,10,10,0.04)]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-[rgba(255,255,255,0.92)] border border-[rgba(10,10,10,0.08)] shadow-[0_4px_12px_rgba(15,23,42,0.08)] px-[0.65rem] py-[0.28rem] text-[0.7rem] font-semibold tracking-widest uppercase text-[#525252]">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-4 mb-3 text-[0.76rem] font-medium text-[#737373]">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-[1.2rem] font-semibold leading-[1.2] tracking-[-0.03em] text-[#0a0a0a] mb-3 group-hover:text-[#252525] transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-[0.95rem] leading-[1.7] text-[#525252] line-clamp-3 flex-1 mb-5">
                        {post.excerpt}
                      </p>

                      <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-[#0a0a0a] group-hover:text-[#404040] transition-colors">
                        Read more
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/blog" className="inline-flex items-center gap-2 border border-[rgba(10,10,10,0.1)] rounded-full bg-[rgba(255,255,255,0.78)] shadow-[0_8px_20px_rgba(15,23,42,0.05)] px-5 py-3 text-[0.9rem] font-semibold text-[#0a0a0a] hover:bg-white hover:border-[rgba(10,10,10,0.16)] transition-all">
              See all articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
