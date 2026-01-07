import { Metadata } from "next";
import { projects } from "@/lib/data";
import { generateMetadata as generateSEOMetadata, generateArticleSchema } from "@/lib/seo";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((p) => p.id === parseInt(params.id));

  if (!project) {
    return notFound();
  }

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
    ogImage: project.image,
    canonical: `https://umeh.site/projects/${project.id}`,
    robots: "index, follow",
  });
}

export default function ProjectLayout({
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
