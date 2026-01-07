import { Metadata } from "next";
import { posts } from "@/lib/data";
import { generateMetadata as generateSEOMetadata, generateArticleSchema } from "@/lib/seo";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return notFound();
  }

  const publishedDate = new Date(post.date).toISOString();
  const keywords = [post.category, "web development", "software engineering", "tutorial"];

  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    keywords,
    ogTitle: `${post.title} - Blog`,
    ogDescription: post.excerpt,
    ogImage: post.image,
    canonical: `https://umeh.site/blog/${post.slug}`,
    robots: "index, follow",
    publishedDate,
    articleAuthor: "Dubem Umeh",
    articleCategory: post.category,
  });
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
