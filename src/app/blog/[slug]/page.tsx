"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { posts } from "@/lib/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedLinks } from "@/components/InternalLink";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPage({ params }: BlogPageProps) {
  const { slug } = use(params);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedArticles = posts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)
    .map((p) => ({
      href: `/blog/${p.slug}`,
      title: p.title,
      description: p.excerpt,
    }));

  return (
    <div className="min-h-screen bg-background">
      <div className="landing-container w-[min(100%,60rem)] mx-auto px-5 py-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
          className="mb-8"
        />
        {/* <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#525252] hover:text-[#0a0a0a] mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link> */}

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(10,10,10,0.08)] bg-[rgba(255,255,255,0.72)] text-xs font-bold uppercase tracking-widest text-[#525252]">
                {post.category}
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,7vw,4rem)] font-['Fraunces',Georgia,serif] leading-none tracking-[-0.04em] font-bold mb-6 text-[#0a0a0a]">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 mb-8 text-sm text-[#737373] font-medium">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <p className="text-[1.1rem] leading-[1.75] text-[#525252]">
              {post.excerpt}
            </p>
          </header>

          <div className="mb-12 rounded-[2.4rem] overflow-hidden border border-[rgba(10,10,10,0.06)] shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none mb-16"
          >
            <div className="text-[#525252] leading-[1.85] space-y-6">
              <p>
                {post.excerpt}
              </p>

              <h2 className="text-[1.8rem] font-['Fraunces',Georgia,serif] font-bold mt-8 mb-4 text-[#0a0a0a]">Coming Soon</h2>
              <p>
                This article is currently being prepared. Check back soon for insights on {post.title.toLowerCase()} and best practices in modern web development.
              </p>

              <div className="bg-[rgba(255,205,112,0.08)] border border-[rgba(255,205,112,0.2)] rounded-[1.2rem] p-6 my-8">
                <h3 className="font-['Fraunces',Georgia,serif] font-bold mb-2 text-[#0a0a0a]">📝 Note</h3>
                <p className="text-sm text-[#525252]">
                  Articles on this portfolio are curated to provide maximum value. We ensure each piece is thoroughly researched and provides actionable insights.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-t border-[rgba(10,10,10,0.06)] pt-12 mb-12"
          >
            <div className="border border-[rgba(10,10,10,0.07)] rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,rgba(255,205,112,0.25),rgba(255,184,142,0.15))] flex items-center justify-center shrink-0 border border-[rgba(255,205,112,0.2)]">
                  <span className="text-2xl font-bold text-[#0a0a0a]">DU</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-[#0a0a0a]">Dubem Umeh</h3>
                  <p className="text-[#525252] mb-4 leading-[1.65]">
                    Full-stack software developer passionate about building scalable web applications and sharing knowledge about modern development practices.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="https://twitter.com/dubem_umeh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#525252] hover:text-[#0a0a0a] font-semibold transition-colors"
                    >
                      Twitter
                    </Link>
                    <Link
                      href="https://github.com/DubemUmeh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#525252] hover:text-[#0a0a0a] font-semibold transition-colors"
                    >
                      GitHub
                    </Link>
                    <Link
                      href="https://linkedin.com/in/dubem-umeh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#525252] hover:text-[#0a0a0a] font-semibold transition-colors"
                    >
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <RelatedLinks
            links={relatedArticles}
            sectionTitle="More Articles"
          />
        </motion.article>
      </div>
    </div>
  );
}
