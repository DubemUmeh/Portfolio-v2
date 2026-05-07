"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/app/ui/card";
import { projects, } from "@/lib/data";
import createSlug from "@/util/use-slug";

export default function Portfolio() {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "ALL" },
    { id: "web", label: "WEB" },
    // { id: "backend", label: "BACKEND" },
    // { id: "fullstack", label: "FULLSTACK" },
    { id: "mobile", label: "MOBILE" },
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="landing-section relative px-5 pb-20">
      <div className="landing-container w-[min(100%,76rem)] mx-auto">
        <div className="landing-ai-shell relative border border-[rgba(10,10,10,0.07)] rounded-4xl bg-[radial-gradient(circle_at_top_left,rgba(246,213,247,0.16),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(255,225,147,0.12),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.68))] shadow-[0_20px_48px_rgba(15,23,42,0.05),0_1px_0_rgba(255,255,255,0.74)_inset] p-6 before:content-[''] before:absolute before:inset-x-[-0.8rem] before:top-[-1.2rem] before:h-56 before:rounded-full before:bg-[radial-gradient(circle_at_24%_48%,rgba(246,213,247,0.55),transparent_42%),radial-gradient(circle_at_78%_38%,rgba(255,225,147,0.38),transparent_36%),radial-gradient(circle_at_62%_72%,rgba(255,184,142,0.26),transparent_34%)] before:blur-[42px] before:opacity-[0.72] before:pointer-events-none before:z-0 *:relative *:z-1">
          <div className="landing-ai-header max-w-3xl mb-8">
            <div className="landing-kicker inline-flex items-center gap-2 border border-[rgba(10,10,10,0.1)] rounded-full bg-[rgba(255,255,255,0.72)] shadow-[0_8px_20px_rgba(15,23,42,0.05)] px-[0.8rem] py-[0.45rem] text-[0.76rem] font-semibold tracking-[0.12em] uppercase text-[#737373]">
              Featured Work
            </div>
            <h2 className="display-title landing-section-title mt-4 text-[clamp(2rem,5vw,3.6rem)] leading-none tracking-[-0.04em] text-[#0a0a0a] font-['Fraunces',Georgia,serif] [font-optical-sizing:auto]">
              Projects built for scale, clarity, and results.
            </h2>
            <p className="landing-section-copy mt-4 text-[1.05rem] leading-[1.72] text-[#525252]">
              A curated selection of responsive web and mobile experiences designed to solve business problems and move projects forward.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold tracking-[0.12em] transition-all border ${
                  filter === category.id
                    ? "bg-[rgba(155,144,144,0.95)] text-[#0a0a0a] border-[rgba(10,10,10,0.12)] shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                    : "bg-[rgba(255,255,255,0.55)] text-[#525252] border-[rgba(10,10,10,0.08)] hover:bg-[rgba(255,255,255,0.8)]"
                }`}>
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Link href={`/projects/${createSlug(project.title)}`}>
                    <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
                      <Card className="glass backdrop-blur-md border border-[rgba(136,132,132,0.2)] hover:border-foreground/30 overflow-hidden transition-all cursor-pointer group h-full flex flex-col">
                        {/* <div className="relative overflow-hidden bg-[rgba(10,10,10,0.03)]">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white border border-white/25 rounded-full px-4 py-2">
                              View Project
                            </span>
                          </div>
                        </div> */}
                        <CardContent className="px-6 pb-4 pt-2 flex flex-col flex-1">
                          <h3 className="text-xl font-semibold mb-2 tracking-tight text-[#0a0a0a]">{project.title}</h3>
                          <p className="text-[#525252] mb-auto text-sm">{project.description}</p>
                          <div className="mt-auto pt-4">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map((tag) => (
                                <span key={tag} className="rounded-full border border-[rgba(10,10,10,0.08)] px-3 py-1 text-[0.72rem] font-semibold uppercase text-[#737373] bg-[rgba(255,255,255,0.8)]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-3 text-sm font-mono text-[#525252]">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(project.liveUrl, '_blank');
                                }}
                                className="inline-flex items-center gap-1 hover:text-[#0a0a0a] transition-colors bg-none border-none p-0 cursor-pointer"
                              >
                                <ExternalLink className="w-4 h-4" /> LIVE
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(project.githubUrl, '_blank');
                                }}
                                className="inline-flex items-center gap-1 hover:text-[#0a0a0a] transition-colors bg-none border-none p-0 cursor-pointer"
                              >
                                <Github className="w-4 h-4" /> CODE
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
