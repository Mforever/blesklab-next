// components/home/VideoReels.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Icon from '@/components/ui/Icon';
import reelsData from '@/data/reels.json';

interface Reel {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  duration: number;
  views?: number;
  likes?: number;
  service?: string;
}

const reels = reelsData as Reel[];

export default function VideoReels() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('reels_likes');
      if (saved) setLikedVideos(JSON.parse(saved));
    } catch { }
  }, []);

  const goTo = useCallback((index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    let clamped = index;
    if (clamped < 0) clamped = reels.length - 1;
    if (clamped >= reels.length) clamped = 0;
    setCurrentIndex(clamped);
  }, []);

  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  // Автопереключение
  useEffect(() => {
    const reel = reels[currentIndex];
    if (!reel) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => goNext(), (reel.duration + 0.5) * 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentIndex, goNext]);

  // Центрирование активной карточки
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const activeEl = container.querySelector(`[data-index="${currentIndex}"]`) as HTMLElement;
    if (!activeEl) return;
    const cardWidth = activeEl.offsetWidth;
    const scrollLeft = activeEl.offsetLeft - container.clientWidth / 2 + cardWidth / 2;
    container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
  }, [currentIndex]);

  // Свайпы — только на мобильных
  useEffect(() => {
    let startX = 0, startY = 0, startTime = 0;
    const ts = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };
    const te = (e: TouchEvent) => {
      const dx = startX - e.changedTouches[0].clientX;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40 && Date.now() - startTime < 300) {
        if (dx > 0) goNext(); else goPrev();
      }
    };
    window.addEventListener('touchstart', ts, { passive: true });
    window.addEventListener('touchend', te, { passive: true });
    return () => {
      window.removeEventListener('touchstart', ts);
      window.removeEventListener('touchend', te);
    };
  }, [goNext, goPrev]);

  // Клавиатура — только на десктопе
  useEffect(() => {
    const hk = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', hk);
    return () => window.removeEventListener('keydown', hk);
  }, [goNext, goPrev]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...likedVideos, [id]: !likedVideos[id] };
    setLikedVideos(updated);
    localStorage.setItem('reels_likes', JSON.stringify(updated));
  };

  return (
    <section className="py-16 sm:py-20 bg-bg-primary overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block text-accent font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4">
            Короткие видео
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Это интересно</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Быстрые ответы на частые вопросы и демонстрация наших работ
          </p>
        </div>

        {/* Лента + стрелки */}
        <div className="relative max-w-6xl mx-auto group/lenta">
          {/* Стрелка влево — только десктоп, проявляется при наведении на ленту */}
          <button
            onClick={goPrev}
            className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 w-16 items-center justify-start pointer-events-none"
            type="button"
            aria-label="Предыдущее видео"
          >
            <span className="w-10 h-10 rounded-full bg-bg-element/0 group-hover/lenta:bg-bg-element/80 text-transparent group-hover/lenta:text-text-secondary flex items-center justify-center transition-all duration-300 ml-1 pointer-events-auto">
              <Icon name="FaChevronLeft" className="w-4 h-4" />
            </span>
          </button>

          {/* Стрелка вправо — только десктоп, проявляется при наведении на ленту */}
          <button
            onClick={goNext}
            className="hidden md:flex absolute right-0 top-0 bottom-0 z-20 w-16 items-center justify-end pointer-events-none"
            type="button"
            aria-label="Следующее видео"
          >
            <span className="w-10 h-10 rounded-full bg-bg-element/0 group-hover/lenta:bg-bg-element/80 text-transparent group-hover/lenta:text-text-secondary flex items-center justify-center transition-all duration-300 mr-1 pointer-events-auto">
              <Icon name="FaChevronRight" className="w-4 h-4" />
            </span>
          </button>

          {/* Лента карточек */}
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 md:px-16 scroll-smooth items-center"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {/* Левый спейсер для центрирования крайних карточек */}
            <div className="shrink-0" style={{ width: 'calc(50vw - 140px)' }} />

            {reels.map((reel, idx) => {
              const isActive = idx === currentIndex;

              return (
                <div
                  key={reel.id}
                  data-index={idx}
                  onClick={() => { if (!isActive) goTo(idx); }}
                  className="shrink-0 snap-center rounded-xl overflow-hidden bg-black transition-all duration-500"
                  style={{
                    width: 'min(75vw, 280px)',
                    aspectRatio: '9/16',
                    opacity: isActive ? 1 : 0.75,
                    filter: isActive ? 'none' : 'brightness(0.7)',
                    cursor: isActive ? 'default' : 'pointer',
                  }}
                >
                  <div className="w-full h-full relative">
                    {isActive ? (
                      <>
                        <iframe
                          key={`video-${reel.id}`}
                          src={`${reel.videoUrl}&autoplay=1&loop=1&mute=${isMuted ? '1' : '0'}&rel=0&showinfo=0`}
                          className="absolute inset-0 w-full h-full"
                          style={{ pointerEvents: 'none' }}
                          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                          frameBorder="0"
                          allowFullScreen
                          title={reel.title}
                        />
                        <div className="absolute inset-0 z-[5]" />
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

                        {/* Кнопка звука */}
                        <div className="absolute top-2 right-2 z-20">
                          <button
                            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                            className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center"
                            type="button"
                          >
                            <Icon name={isMuted ? 'FaVolumeMute' : 'FaVolumeUp'} className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Бейдж услуги */}
                        {reel.service && (
                          <div className="absolute top-2 left-2 z-20">
                            <span className="bg-accent/90 text-bg-primary text-[9px] font-semibold px-1.5 py-0.5 rounded-full">{reel.service}</span>
                          </div>
                        )}

                        {/* Инфо снизу */}
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 z-20">
                          <p className="font-medium text-white text-[11px] sm:text-xs leading-tight line-clamp-2 mb-1.5">{reel.title}</p>
                          <div className="flex items-center justify-between text-white/60 text-[9px]">
                            <span className="flex items-center gap-0.5">
                              <Icon name="FaEye" className="w-2.5 h-2.5" />
                              {reel.views?.toLocaleString()}
                            </span>
                            <button
                              onClick={(e) => handleLike(reel.id, e)}
                              className={`flex items-center gap-0.5 transition-colors ${likedVideos[reel.id] ? 'text-red-400' : 'hover:text-accent'}`}
                              type="button"
                            >
                              <Icon name={likedVideos[reel.id] ? 'FaHeart' : 'FaRegHeart'} className="w-2.5 h-2.5" />
                              {((reel.likes || 0) + (likedVideos[reel.id] ? 1 : 0)).toLocaleString()}
                            </button>
                          </div>
                        </div>
                      </>
                    ) : reel.thumbnail ? (
                      <img src={reel.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-bg-element via-bg-secondary to-bg-element flex flex-col items-center justify-center p-3 gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                          <Icon name="FaPlay" className="text-accent text-xs ml-0.5" />
                        </div>
                        <p className="text-white/40 text-[8px] sm:text-[9px] leading-tight text-center line-clamp-3">
                          {reel.description || reel.title}
                        </p>
                      </div>
                    )}

                    {/* Длительность */}
                    <div className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-sm rounded-md px-1.5 py-0.5 text-white text-[9px] z-10">
                      {reel.duration}с
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Правый спейсер */}
            <div className="shrink-0" style={{ width: 'calc(50vw - 140px)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}