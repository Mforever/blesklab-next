// components/home/GalleryPreview.tsx
import Link from 'next/link';
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

const projects = projectsData as GalleryProject[];

const previewProjects = [...projects]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 4);

export default function GalleryPreview() {
  return (
    <section className="py-16 sm:py-20 bg-bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-accent font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4">
            Портфолио
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Наши работы</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Каждый проект — это история преображения автомобиля
          </p>
        </div>

        {/* Сетка — 4 карточки в ряд */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {previewProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/gallery/${project.slug}`}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover brightness-[0.5] group-hover:brightness-[0.75] group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/30 rounded-2xl transition-all duration-500 pointer-events-none" />

                {/* Название + стрелка внизу */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white/80 text-xs sm:text-sm font-medium line-clamp-2 leading-snug group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-accent/60 text-[10px] sm:text-xs inline-flex items-center gap-1 mt-1.5 group-hover:text-accent group-hover:gap-1.5 transition-all">
                    Подробнее
                    <span className="text-[9px]">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Ссылка на всю галерею */}
        <div className="text-center mt-6 sm:mt-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all text-sm font-medium"
          >
            Смотреть все работы
            <span className="text-xs">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}