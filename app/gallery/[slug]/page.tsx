// app/gallery/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import projectsData from '@/data/gallery/projects.json';
import { ProjectPageClient } from './ProjectPageClient';

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

interface Project {
  slug: string;
  title: string;
  description: string;
  cover: string;
  photos: Photo[];
  video?: string;
  services: string[];
  date: string;
}

const projects = projectsData as Project[];

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Проект не найден' };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Лаборатория блеска`,
      description: project.description,
      images: [{ url: project.cover, width: 1200, height: 900 }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}