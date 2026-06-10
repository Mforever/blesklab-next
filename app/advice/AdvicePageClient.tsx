// app/advice/AdvicePageClient.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import type { ArticleMeta } from '@/lib/mdx';

const CATEGORY_LABELS: Record<string, string> = {
  ceramic: 'Керамика',
  polish: 'Полировка',
  ppf: 'Бронирование',
  headlights: 'Фары',
  general: 'Общие советы',
};

interface AdvicePageClientProps {
  articles: ArticleMeta[];
}

export default function AdvicePageClient({ articles }: AdvicePageClientProps) {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 sm:pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
            Советы экспертов
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-accent mx-auto mb-4 sm:mb-6 rounded-full" />
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Отвечаем на частые вопросы и делимся опытом, чтобы ваш автомобиль всегда сиял
          </p>
        </div>

        {/* Статьи */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/advice/${article.slug}`}
              className="group block bg-bg-element rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-accent/90 text-bg-primary text-xs font-semibold px-2 py-1 rounded-full">
                    {CATEGORY_LABELS[article.category] || article.category}
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-text-secondary/40 text-xs">{article.date}</span>
                  <div className="flex items-center gap-1 text-text-secondary/40 text-xs">
                    <Icon name="FaClockIcon" className="w-3 h-3" />
                    <span>{article.readTime} мин чтения</span>
                  </div>
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm line-clamp-3 mb-4">
                  {article.description}
                </p>
                <div className="flex items-center gap-2 text-accent text-sm font-medium pt-4 border-t border-white/5 group-hover:gap-3 transition-all">
                  Читать статью
                  <Icon name="FaArrowRight" className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}