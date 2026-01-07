"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/app/ui/card";
import { projects, type Project } from "@/lib/data";

export default function Portfolio() {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "ALL" },
    { id: "web", label: "WEB" },
    { id: "mobile", label: "MOBILE" },
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-32 px-6 relative overflow-hidden">
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
            FEATURED WORK
          </h2>
          <p className="text-xl text-neutral-500 max-w-3xl mx-auto mb-12 font-mono">
            SELECTED PROJECTS THAT SHOWCASE MY EXPERTISE
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-8 py-3 font-mono font-bold tracking-wider transition-all border ${
                  filter === category.id
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/20 hover:border-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="glass backdrop-blur-md border border-white/10 hover:border-white/30 overflow-hidden transition-all cursor-pointer group h-full">
                      <div className="relative overflow-hidden aspect-video px-2">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-700 rounded-2xl"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-mono text-sm border border-white px-4 py-2">
                            VIEW PROJECT →
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 tracking-tight">{project.title}</h3>
                        <p className="text-neutral-500 mb-4 text-sm">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 text-xs font-mono border border-white/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4 text-sm font-mono">
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-neutral-400 transition-colors" 
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" /> LIVE
                          </a>
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-neutral-400 transition-colors" 
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-4 h-4" /> CODE
                          </a>
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
    </section>
  );
}