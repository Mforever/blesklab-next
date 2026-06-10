// components/ui/ReelsDrum.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Icon from '@/components/ui/Icon';
import { useReelsStats } from '@/hooks/useReelsStats';

export interface Reel {
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

interface ReelsDrumProps {
  reels: Reel[];
  showStats?: boolean;
  showServiceBadge?: boolean;
  centerWidth?: string;
  sideWidth?: string;
  farWidth?: string;
  sideBrightness?: number;
  autoPlay?: boolean;
  initialIndex?: number;
  onCenterClick?: (reel: Reel) => void;
  className?: string;
}

const DEFAULT_CENTER_WIDTH = '35%';
const DEFAULT_SIDE_WIDTH = '18%';
const DEFAULT_FAR_WIDTH = '14%';
const DEFAULT_SIDE_BRIGHTNESS = 0.7;
const VISIBLE_SLOTS = 5;

export default function ReelsDrum({
  reels,
  showStats = false,
  showServiceBadge = false,
  centerWidth = DEFAULT_CENTER_WIDTH,
  sideWidth = DEFAULT_SIDE_WIDTH,
  farWidth = DEFAULT_FAR_WIDTH,
  sideBrightness = DEFAULT_SIDE_BRIGHTNESS,
  autoPlay = true,
  initialIndex = 0,
  onCenterClick,
  className = '',
}: ReelsDrumProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [playQueue, setPlayQueue] = useState<number[]>([]);
  const [queueIdx, setQueueIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { toggleLike, trackView, getLikes, getViews, isLiked } = useReelsStats();

  const shuffleQueue = useCallback(
    (excludeIndex: number) => {
      const indices = Array.from({ length: reels.length }, (_, i) => i).filter(
        (i) => i !== excludeIndex
      );
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
    },
    [reels.length]
  );

  useEffect(() => {
    const reel = reels[currentIndex];
    if (reel) trackView(reel.id);
  }, [currentIndex, reels, trackView]);

  useEffect(() => {
    setPlayQueue(shuffleQueue(initialIndex));
  }, []);

  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const currentReel = reels[currentIndex];
    if (!currentReel) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const nextQueueIdx = queueIdx + 1;
      if (nextQueueIdx >= playQueue.length) {
        const newQueue = shuffleQueue(currentIndex);
        setPlayQueue(newQueue);
        setQueueIdx(0);
        goToIndex(newQueue[0]);
      } else {
        setQueueIdx(nextQueueIdx);
        goToIndex(playQueue[nextQueueIdx]);
      }
    }, (currentReel.duration + 1) * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, queueIdx, playQueue, isPaused, autoPlay, reels]);

  const goToIndex = (newIndex: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentIndex(newIndex);
  };

  const goTo = useCallback(
    (newIndex: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setIsPaused(true);

      let clamped = newIndex;
      if (clamped < 0) clamped = reels.length - 1;
      if (clamped >= reels.length) clamped = 0;

      setTimeout(() => {
        goToIndex(clamped);
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning, reels.length]
  );

  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;
      const elapsed = Date.now() - startTime;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40 && elapsed < 300) {
        if (diffX > 0) goNext();
        else goPrev();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  const handleLikeClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(id);
  };

  const handleMuteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const sideSlots = Math.floor(VISIBLE_SLOTS / 2);
  const visibleIndices = Array.from({ length: VISIBLE_SLOTS }, (_, i) => {
    let offset = i - sideSlots;
    let index = currentIndex + offset;
    if (index < 0) index = reels.length + index;
    if (index >= reels.length) index = index - reels.length;
    return { index, offset };
  });

  const getSlotWidth = (offset: number) => {
    const absOffset = Math.abs(offset);
    if (absOffset === 0) return centerWidth;
    if (absOffset === 1) return sideWidth;
    return farWidth;
  };

  const getSlotOpacity = (offset: number) => {
    const absOffset = Math.abs(offset);
    if (absOffset === 0) return 1;
    if (absOffset === 1) return 0.85;
    return 0.55;
  };

  const getSlotScale = (offset: number) => {
    const absOffset = Math.abs(offset);
    if (absOffset === 0) return 1;
    if (absOffset === 1) return 0.85;
    return 0.7;
  };

  const getSlotZIndex = (offset: number) => 10 - Math.abs(offset);
  const getSlotBrightness = (offset: number) => (offset === 0 ? 1 : sideBrightness);

  const getSlotTranslateY = (offset: number) => {
    const scale = getSlotScale(offset);
    return `${((1 - scale) / 2) * 100}%`;
  };

  return (
    <div className={className}>
      <div className="flex items-start justify-center gap-2 sm:gap-3 py-4 overflow-hidden">
        {visibleIndices.map(({ index, offset }) => {
          const reel = reels[index];
          const isCenter = offset === 0;
          const opacity = getSlotOpacity(offset);
          const scale = getSlotScale(offset);
          const zIndex = getSlotZIndex(offset);
          const width = getSlotWidth(offset);
          const brightness = getSlotBrightness(offset);
          const translateY = getSlotTranslateY(offset);
          const liked = isLiked(reel.id);

          return (
            <div
              key={`${reel.id}-${offset}`}
              className="flex-shrink-0 transition-all duration-500 ease-out cursor-pointer select-none"
              style={{
                width,
                opacity,
                transform: `scale(${scale}) translateY(${translateY})`,
                zIndex,
                filter: `brightness(${brightness})`,
              }}
              onClick={() => {
                if (isCenter && onCenterClick) {
                  onCenterClick(reel);
                } else if (!isCenter) {
                  goTo(index);
                }
              }}
            >
              <div
                className={`rounded-xl overflow-hidden bg-bg-element border transition-all duration-500 ${isCenter
                    ? 'border-accent/30 shadow-xl shadow-accent/10'
                    : 'border-white/5'
                  }`}
              >
                <div className="relative aspect-[9/16] bg-black overflow-hidden">
                  {isCenter ? (
                    <>
                      <div className="absolute inset-0">
                        <iframe
                          key={`video-${reel.id}`}
                          src={`${reel.videoUrl}&autoplay=1&loop=1&mute=${isMuted ? '1' : '0'}&rel=0&showinfo=0`}
                          className="absolute top-0 left-0 w-full h-full"
                          style={{ pointerEvents: 'none' }}
                          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                          frameBorder="0"
                          allowFullScreen
                          title={reel.title}
                        />
                      </div>
                      <div className="absolute inset-0 z-[5]" />

                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

                      <div className="absolute top-2 right-2 z-20">
                        <button
                          onClick={handleMuteClick}
                          className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-all"
                          aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                        >
                          <Icon
                            name={isMuted ? 'FaVolumeMute' : 'FaVolumeUp'}
                            className="w-3 h-3"
                          />
                        </button>
                      </div>

                      {showServiceBadge && reel.service && (
                        <div className="absolute top-2 left-2 z-20">
                          <span className="bg-accent/90 text-bg-primary text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            {reel.service}
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                        <h3 className="font-semibold text-white text-xs sm:text-sm line-clamp-2 leading-snug mb-1.5">
                          {reel.title}
                        </h3>
                        {showStats && (
                          <div className="flex items-center justify-between text-white/70 text-[10px] sm:text-xs">
                            <span className="flex items-center gap-1">
                              <Icon name="FaEye" className="w-3 h-3" />
                              {getViews(reel.id, reel.views).toLocaleString()}
                            </span>
                            <button
                              onClick={(e) => handleLikeClick(reel.id, e)}
                              className={`flex items-center gap-1 transition-colors ${liked ? 'text-red-400' : 'hover:text-accent'
                                }`}
                              aria-label={liked ? 'Убрать лайк' : 'Поставить лайк'}
                            >
                              <Icon
                                name={liked ? 'FaHeart' : 'FaRegHeart'}
                                className="w-3 h-3"
                              />
                              {getLikes(reel.id, reel.likes).toLocaleString()}
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  ) : reel.thumbnail ? (
                    <>
                      <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                    </>
                  ) : (
                    <>
                      <div className="w-full h-full bg-gradient-to-br from-bg-element via-bg-secondary to-bg-element flex flex-col items-center justify-center p-3 gap-2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                          <Icon name="FaPlay" className="text-accent text-sm sm:text-base ml-0.5" />
                        </div>
                        <p className="text-white/50 text-[9px] sm:text-[10px] leading-tight text-center line-clamp-2 max-w-[140px] sm:max-w-[180px]">
                          {reel.title}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-black/15" />
                    </>
                  )}

                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-md px-1.5 py-0.5 text-white text-[10px] z-10">
                    {reel.duration}с
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-1.5 mt-4">
        {reels.map((reel, idx) => (
          <button
            key={reel.id}
            onClick={() => goTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                ? 'w-6 bg-accent'
                : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            aria-label={`Перейти к видео ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}