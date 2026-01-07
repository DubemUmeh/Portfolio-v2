"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { posts } from "@/lib/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedLinks } from "@/components/InternalLink";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Parse date
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
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/#blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
          className="mb-8"
        />
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-neutral-400 font-mono mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase">
                {post.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tighter">
              {post.title}
            </h1>

            <p className="text-xl text-neutral-400 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-300 leading-relaxed space-y-6"
            >
              <p>
                {post.excerpt}
              </p>

              <h2 className="text-3xl font-bold mt-8 mb-4">Coming Soon</h2>
              <p>
                This article is currently being prepared. Check back soon for insights on {post.title.toLowerCase()} and best practices in modern web development.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 my-8">
                <h3 className="font-bold mb-2">📝 Note</h3>
                <p className="text-sm">
                  Articles on this portfolio are curated to provide maximum value. We ensure each piece is thoroughly researched and provides actionable insights.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Author Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-t border-white/10 pt-12"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                <span className="text-2xl font-bold">DU</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Dubem Umeh</h3>
                <p className="text-neutral-400 mb-4">
                  Full-stack software developer passionate about building scalable web applications and sharing knowledge about modern development practices.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/dubem_umeh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://github.com/DubemUmeh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/dubem-umeh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Articles */}
          <RelatedLinks
            links={relatedArticles}
            sectionTitle="More Articles"
          />
        </motion.article>
      </div>
    </div>
  );
}
