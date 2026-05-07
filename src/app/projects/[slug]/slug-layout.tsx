import { Metadata } from "next";
import { projects } from "@/lib/data";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import createSlug from "@/util/use-slug";

interface ProjectLayoutProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: createSlug(project.title),
  }));
}

export async function generateMetadata({ params }: ProjectLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => createSlug(p.title) === slug); 

  if (!project) return notFound();

  const keywords = [
    ...project.tags,
    project.title,
    project.category,
    "portfolio",
    "web development",
  ];

  return generateSEOMetadata({
    title: project.title,
    description: project.fullDescription,
    keywords,
    ogTitle: `${project.title} - Dubem Umeh`,
    ogDescription: project.description,
    // ogImage: project.image,
    canonical: `https://umeh.site/projects/${createSlug(project.title)}`, 
    robots: "index, follow",
  });
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}