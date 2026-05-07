import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import createSlug from "@/util/use-slug";
import ProjectClient from "./page-client";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => createSlug(p.title) === slug);

  if (!project) notFound();

  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 3)
    .map((p) => ({
      href: `/projects/${createSlug(p.title)}`,
      title: p.title,
      description: p.description,
    }));

  return <ProjectClient project={project} relatedProjects={relatedProjects} />;
}