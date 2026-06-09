// app/advice/AdvicePageClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import ReelsDrum from '@/components/ui/ReelsDrum';
import type { Reel } from '@/components/ui/ReelsDrum';
import reelsData from '@/data/reels.json';
import type { ArticleMeta } from '@/lib/mdx';

const videoReels = reelsData as Reel[];

const CATEGORY_LABELS: Record<string, string> = {
  ceramic: 'Керамика',
  polish: 'Полировка',
  ppf: 'Бронирование',
};

interface AdvicePageClientProps {
  articles: ArticleMeta[];
}

export default function AdvicePageClient({ articles }: AdvicePageClientProps) {
  const [modalReel, setModalReel] = useState<Reel | null>(null);

  const openModal = (reel: Reel) => {
    setModalReel(reel);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalReel(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalReel) closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modalReel]);

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
            Знания экспертов
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            Советы экспертов
          </h1>
          <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Отвечаем на частые вопросы и делимся опытом, чтобы ваш автомобиль всегда сиял
          </p>
        </div>

        {/* Блок коротких видео */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Короткие видео</h2>
          <ReelsDrum
            reels={videoReels}
            autoPlay
            centerWidth="240px"
            sideWidth="150px"
            farWidth="100px"
            sideBrightness={0.8}
            onCenterClick={openModal}
          />
        </div>

        {/* Статьи */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Полезные статьи</h2>
            <span className="text-text-secondary/50 text-sm">
              {articles.length} статьи
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-text-secondary/40 text-xs">{article.date}</span>
                    <div className="flex items-center gap-1 text-text-secondary/40 text-xs">
                      <Icon name="FaClockIcon" className="w-3 h-3" />
                      <span>{article.readTime} мин чтения</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary text-sm line-clamp-3 mb-4">
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

      {/* Модальное окно */}
      <AnimatePresence>
        {modalReel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="relative w-full max-w-lg aspect-[9/16] max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-accent text-white transition-colors flex items-center justify-center"
                  aria-label="Закрыть"
                >
                  <Icon name="FaTimes" className="w-4 h-4" />
                </button>

                <div className="absolute top-3 left-3 right-12 z-20">
                  <h3 className="text-white text-sm font-medium line-clamp-1 drop-shadow-lg">
                    {modalReel.title}
                  </h3>
                </div>

                <iframe
                  src={`${modalReel.videoUrl}&autoplay=1&mute=0&loop=1&rel=0&showinfo=0`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  frameBorder="0"
                  allowFullScreen
                  title={modalReel.title}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}