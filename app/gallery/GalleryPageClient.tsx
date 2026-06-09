// app/gallery/GalleryPageClient.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import projectsData from '@/data/gallery/projects.json';

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

interface GalleryProject {
  slug: string;
  title: string;
  description: string;
  cover: string;
  photos: Photo[];
  video?: string;
  services: string[];
  date: string;
}

const typedProjects: GalleryProject[] = projectsData as GalleryProject[];

export default function GalleryPageClient() {
  const router = useRouter();

  const sortedProjects = [...typedProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-bg-primary pt-20 sm:pt-24 pb-20">
      <div className="container-custom">
        {/* Сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {sortedProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="group cursor-pointer"
              onClick={() => router.push(`/gallery/${project.slug}`)}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                {/* Фото — затемнённое */}
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover brightness-[0.4] group-hover:brightness-[0.65] group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Рамка при наведении */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/30 rounded-2xl transition-all duration-500 pointer-events-none" />

                {/* Надпись снизу */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                  <span className="text-white/60 text-xs group-hover:text-white/80 transition-colors">
                    {project.title}
                  </span>
                  <span className="text-accent/60 text-xs font-medium inline-flex items-center gap-1 group-hover:text-accent group-hover:gap-1.5 transition-all">
                    Подробнее
                    <span className="text-[10px]">→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}