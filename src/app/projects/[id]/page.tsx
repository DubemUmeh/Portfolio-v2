"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedLinks } from "@/components/InternalLink";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === parseInt(params.id));

  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 3)
    .map((p) => ({
      href: `/projects/${p.id}`,
      title: p.title,
      description: p.description,
    }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/#portfolio" },
            { label: project.title, href: `/projects/${project.id}` },
          ]}
          className="mb-8"
        />
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Image */}
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Title and Meta */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
              {project.title}
            </h1>
            <p className="text-xl text-neutral-400 mb-8">{project.description}</p>

            {/* Links */}
            <div className="flex gap-4 mb-8">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-neutral-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:border-white transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Full Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-neutral-400 leading-relaxed mb-6">
                {project.fullDescription}
              </p>
              <p className="text-neutral-300 text-sm italic">
                Category: <span className="font-semibold">{project.category.toUpperCase()}</span>
              </p>
            </motion.div>

            {/* Challenge & Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">Challenge</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">{project.challenge}</p>
              <h2 className="text-3xl font-bold mb-4">Solution</h2>
              <p className="text-neutral-400 leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>

          {/* Features and Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-12 border-t border-white/10 pt-12"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">▸</span>
                    <span className="text-neutral-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.results && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Results & Impact</h3>
                <p className="text-neutral-400 leading-relaxed mb-4">{project.results}</p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <p className="text-sm text-neutral-300">
                    This project demonstrates the impact of thoughtful engineering and user-centered design.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Related Projects */}
          <RelatedLinks
            links={relatedProjects}
            sectionTitle="Other Projects"
          />
        </motion.div>
      </div>
    </div>
  );
}
