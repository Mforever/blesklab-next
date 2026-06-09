// components/home/BeforeAfterBlock.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const items = [
  {
    id: 1,
    title: 'BMW X5',
    before: '/images/before-after/polish-1/before.jpg',
    after: '/images/before-after/polish-1/after.jpg',
  },
  {
    id: 2,
    title: 'Mercedes E-Class',
    before: '/images/before-after/polish-2/before.jpg',
    after: '/images/before-after/polish-2/after.jpg',
  },
  {
    id: 3,
    title: 'Audi Q7',
    before: '/images/before-after/polish-3/before.jpg',
    after: '/images/before-after/polish-3/after.jpg',
  },
];

export default function BeforeAfterBlock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const current = items[activeIndex];

  const getClientX = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) return e.touches[0].clientX;
    return e.clientX;
  };

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.touches[0].clientX);
    };

    const handleEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-bg-secondary">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Результаты работы</h2>
          <p className="text-text-secondary text-sm">Передвигайте ползунок, чтобы увидеть разницу</p>
        </div>

        {/* Шторка */}
        <div
          ref={containerRef}
          className="relative aspect-video rounded-2xl overflow-hidden bg-bg-element select-none mb-4"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* ПОСЛЕ — фон */}
          <Image
            src={current.after}
            alt={`${current.title} — после`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
            draggable={false}
          />

          {/* ДО — обрезается шторкой слева */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <Image
              src={current.before}
              alt={`${current.title} — до`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
              draggable={false}
            />
            <div className="absolute inset-y-0 right-0 w-0.5 bg-white shadow-lg" />
          </div>

          {/* Ручка ползунка */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center transition-shadow hover:shadow-2xl"
            style={{ left: `${sliderPos}%` }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L10 8L6 13" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 3L6 8L10 13" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Метки */}
          <div
            className="absolute top-3 text-white text-[10px] font-medium transition-opacity"
            style={{
              left: `${Math.max(8, sliderPos - 8)}%`,
              opacity: sliderPos < 15 ? 0 : 1,
            }}
          >
            <span className="bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1">ДО</span>
          </div>
          <div
            className="absolute top-3 text-white text-[10px] font-medium transition-opacity"
            style={{
              right: `${Math.max(8, 100 - sliderPos - 8)}%`,
              opacity: sliderPos > 85 ? 0 : 1,
            }}
          >
            <span className="bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1">ПОСЛЕ</span>
          </div>
        </div>

        {/* Выбор автомобиля */}
        <div className="flex justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveIndex(index);
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeIndex === index
                  ? 'bg-accent text-bg-primary'
                  : 'bg-bg-element text-text-secondary hover:text-accent border border-white/5'
                }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}