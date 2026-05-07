"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedLinks } from "@/components/InternalLink";
import createSlug from "@/util/use-slug";

interface Props {
  project: Project;
  relatedProjects: { href: string; title: string; description: string }[];
}

export default function ProjectPageClient({ project, relatedProjects }: Props) {

  return (
    <div className="min-h-screen bg-background">
      <div className="landing-container w-[min(100%,76rem)] mx-auto px-5">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/projects" },
            { label: project.title, href: `/projects/${createSlug(project.title)}` },
          ]}
          className="mb-8"
        />
        {/* <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[#525252] hover:text-[#0a0a0a] mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 rounded-[2.4rem] overflow-hidden border border-[rgba(10,10,10,0.06)] shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
            {project.image && (
              <Image
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover"
              width={1000}
              height={1000}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              loading="eager"
              />
            )}
          </div>

          <div className="mb-16">
            <h1 className="text-[clamp(2.5rem,7vw,4rem)] font-['Fraunces',Georgia,serif] leading-none tracking-[-0.04em] font-bold mb-6 text-[#0a0a0a]">
              {project.title}
            </h1>
            <p className="text-[1.1rem] leading-[1.72] text-[#525252] mb-8 max-w-3xl">{project.description}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0a0a0a] text-white font-semibold hover:bg-[#262626] transition-all shadow-[0_4px_14px_rgba(10,10,10,0.18)]"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </Link>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-[rgba(10,10,10,0.12)] bg-[rgba(255,255,255,0.72)] text-[#0a0a0a] font-semibold hover:bg-white hover:border-[rgba(10,10,10,0.2)] transition-all"
              >
                <Github className="w-4 h-4" />
                View Code
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgba(10,10,10,0.2)] bg-[rgba(255,255,255,0.72)] px-4 py-2 text-sm font-semibold text-[#525252] uppercase tracking-[0.08em]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-[rgba(10,10,10,0.07)] rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-8"
            >
              <h2 className="text-[1.8rem] font-['Fraunces',Georgia,serif] font-bold mb-4 text-[#0a0a0a]">Overview</h2>
              <p className="text-[#525252] leading-[1.75] mb-6">
                {project.fullDescription}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,205,112,0.15)] border border-[rgba(255,205,112,0.3)]">
                <span className="text-sm font-semibold uppercase tracking-widest text-[#525252]">Category:</span>
                <span className="font-semibold text-[#0a0a0a]">{project.category.toUpperCase()}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="border border-[rgba(10,10,10,0.07)] rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-8">
                <h3 className="text-[1.5rem] font-['Fraunces',Georgia,serif] font-bold mb-4 text-[#0a0a0a]">Challenge</h3>
                <p className="text-[#525252] leading-[1.75]">{project.challenge}</p>
              </div>

              <div className="border border-[rgba(10,10,10,0.07)] rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-8">
                <h3 className="text-[1.5rem] font-['Fraunces',Georgia,serif] font-bold mb-4 text-[#0a0a0a]">Solution</h3>
                <p className="text-[#525252] leading-[1.75]">{project.solution}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-8 border-t border-[rgba(10,10,10,0.06)] pt-12"
          >
            <div className="border border-[rgba(10,10,10,0.07)] rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-8">
              <h3 className="text-[1.5rem] font-['Fraunces',Georgia,serif] font-bold mb-6 text-[#0a0a0a]">Key Features</h3>
              <ul className="space-y-4">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#0a0a0a] font-bold mt-1 text-lg">▸</span>
                    <span className="text-[#525252] leading-[1.6]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.results && (
              <div className="border border-[rgba(10,10,10,0.07)] rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-8">
                <h3 className="text-[1.5rem] font-['Fraunces',Georgia,serif] font-bold mb-6 text-[#0a0a0a]">Results & Impact</h3>
                <p className="text-[#525252] leading-[1.75] mb-6">{project.results}</p>
                <div className="bg-[rgba(255,205,112,0.08)] border border-[rgba(255,205,112,0.2)] rounded-2xl p-5">
                  <p className="text-sm text-[#525252]">
                    This project demonstrates the impact of thoughtful engineering and user-centered design.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          <RelatedLinks
            links={relatedProjects}
            sectionTitle="Other Projects"
          />
        </motion.div>
      </div>
    </div>
  );
}
