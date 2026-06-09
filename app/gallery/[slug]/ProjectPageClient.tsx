// app/gallery/[slug]/ProjectPageClient.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { useModalContext } from '@/contexts/ModalContext';
import projectsData from '@/data/gallery/projects.json';

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

const SERVICE_LABELS: Record<string, string> = {
  polish: 'Полировка',
  ceramic: 'Керамика',
  ppf_partial: 'Бронирование зон',
  ppf_full: 'Полное бронирование',
};

export function ProjectPageClient({ project }: { project: Project }) {
  const { openModal } = useModalContext();
  const [activePhoto, setActivePhoto] = useState(0);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const handleOrderClick = () => {
    openModal({ serviceType: 'general', serviceName: 'такой же проект' });
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Верхняя панель */}
      <div className="pt-20 sm:pt-24 pb-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-text-secondary/60">
            <Link href="/gallery" className="hover:text-accent transition-colors">
              Галерея
            </Link>
            <span>/</span>
            <span className="text-text-secondary truncate max-w-[200px] sm:max-w-xs">
              {project.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            {prevProject && (
              <Link
                href={`/gallery/${prevProject.slug}`}
                className="w-8 h-8 rounded-lg bg-bg-element hover:bg-accent/20 text-text-secondary hover:text-accent flex items-center justify-center transition-all"
                aria-label="Предыдущий проект"
              >
                <Icon name="FaChevronLeft" className="w-3.5 h-3.5" />
              </Link>
            )}
            {nextProject && (
              <Link
                href={`/gallery/${nextProject.slug}`}
                className="w-8 h-8 rounded-lg bg-bg-element hover:bg-accent/20 text-text-secondary hover:text-accent flex items-center justify-center transition-all"
                aria-label="Следующий проект"
              >
                <Icon name="FaChevronRight" className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Основной контент: фото + описание */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 px-4 sm:px-6 lg:px-8 pb-6 max-w-7xl mx-auto w-full">
        {/* Фото — слева, занимает больше места */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Основное фото */}
          <div className="relative flex-1 bg-bg-element rounded-xl overflow-hidden min-h-[300px] sm:min-h-[400px]">
            <Image
              src={project.photos[activePhoto].src}
              alt={project.photos[activePhoto].alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 70vw"
              priority={activePhoto === 0}
            />

            {/* Навигация по фото */}
            {project.photos.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActivePhoto((prev) => (prev - 1 + project.photos.length) % project.photos.length)
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-accent text-white transition-all flex items-center justify-center"
                  aria-label="Предыдущее фото"
                >
                  <Icon name="FaChevronLeft" className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    setActivePhoto((prev) => (prev + 1) % project.photos.length)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-accent text-white transition-all flex items-center justify-center"
                  aria-label="Следующее фото"
                >
                  <Icon name="FaChevronRight" className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            {/* Счётчик фото */}
            <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-[10px]">
              {activePhoto + 1} / {project.photos.length}
            </div>
          </div>

          {/* Миниатюры */}
          {project.photos.length > 1 && (
            <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-hide">
              {project.photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className={`flex-shrink-0 w-12 h-10 sm:w-14 sm:h-11 rounded-lg overflow-hidden border-2 transition-all ${activePhoto === idx ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={56}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Описание — справа, уже */}
        <div className="lg:w-80 xl:w-96 flex flex-col gap-4">
          {/* Заголовок и услуги */}
          <div>
            <h1 className="text-lg sm:text-xl font-bold leading-tight mb-1.5">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="bg-accent/20 text-accent text-[10px] px-2 py-0.5 rounded-full"
                >
                  {SERVICE_LABELS[service] || service}
                </span>
              ))}
            </div>
            <p className="text-text-secondary/60 text-[10px]">{project.date}</p>
          </div>

          {/* Подпись к текущему фото */}
          <div className="bg-bg-element rounded-xl p-3 flex-1">
            <p className="text-text-secondary/40 text-[10px] uppercase tracking-wider mb-1">
              Фото {activePhoto + 1}
            </p>
            <p className="text-text-secondary text-xs leading-relaxed">
              {project.photos[activePhoto].caption}
            </p>
          </div>

          {/* Описание проекта */}
          <div className="bg-bg-element rounded-xl p-3">
            <p className="text-text-secondary/40 text-[10px] uppercase tracking-wider mb-1">
              О проекте
            </p>
            <p className="text-text-secondary text-xs leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Кнопка */}
          <button
            onClick={handleOrderClick}
            className="w-full py-2.5 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl font-medium transition-all text-sm"
          >
            Хочу такой же результат
          </button>
        </div>
      </div>
    </div>
  );
}