"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { Card, CardContent } from "@/app/ui/card";
// import { Button } from "@/app/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/app/ui/dialog";
import { projects, type Project } from "@/lib/data";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card
                    onClick={() => setSelectedProject(project)}
                    className="glass backdrop-blur-md border border-white/10 hover:border-white/30 overflow-hidden transition-all cursor-pointer group h-full"
                  >
                    <div className="relative overflow-hidden aspect-video px-2">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 rounded-2xl"
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
                        <a href={project.liveUrl} className="flex items-center gap-1 hover:text-neutral-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink className="w-4 h-4" /> LIVE
                        </a>
                        <a href={project.githubUrl} className="flex items-center gap-1 hover:text-neutral-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                          <Github className="w-4 h-4" /> CODE
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="w-full sm:max-w-[85vw] max-h-[90vh] overflow-y-auto glass backdrop-blur-xl border border-white/20 bg-black/95">
            {selectedProject && (
              <div>
                <div className="relative overflow-hidden mb-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full aspect-video object-contain"
                  />
                </div>
                <DialogTitle className="text-4xl font-bold mb-4 tracking-tighter">{selectedProject.title}</DialogTitle>
                <p className="text-lg text-neutral-400 mb-8">{selectedProject.fullDescription}</p>

                <div className="space-y-8">
                  <div className="glass backdrop-blur-md p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-3 tracking-tight">KEY FEATURES</h3>
                    <ul className="space-y-2 text-neutral-400">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-white mt-1">→</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass backdrop-blur-md p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-3 tracking-tight">THE CHALLENGE</h3>
                    <p className="text-neutral-400">{selectedProject.challenge}</p>
                  </div>

                  <div className="glass backdrop-blur-md p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-3 tracking-tight">THE SOLUTION</h3>
                    <p className="text-neutral-400">{selectedProject.solution}</p>
                  </div>

                  {selectedProject.results && (
                    <div className="glass backdrop-blur-md p-6 border border-white/10 bg-white/5">
                      <h3 className="text-xl font-bold mb-3 tracking-tight text-white">THE RESULTS</h3>
                      <p className="text-white font-medium text-lg">{selectedProject.results}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-4 pt-4">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 md:px-8 py-3 bg-white text-black font-mono font-bold tracking-wider hover:bg-neutral-200 transition-all"
                    >
                      VIEW LIVE →
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 border border-white text-white font-mono font-bold tracking-wider hover:bg-white hover:text-black transition-all"
                    >
                      VIEW CODE
                    </a>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}