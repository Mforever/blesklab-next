// components/ui/BeforeAfterSlider.tsx
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface BeforeAfterItem {
  id: number;
  title: string;
  before: string;
  after: string;
}

interface BeforeAfterSliderProps {
  items: BeforeAfterItem[];
}

export default function BeforeAfterSlider({ items }: BeforeAfterSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const current = items[activeIndex];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
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
  }, [updatePosition]);

  const handleChangeAuto = (index: number) => {
    setActiveIndex(index);
    setSliderPos(50);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Шторка */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl bg-bg-element select-none mb-4"
        style={{ aspectRatio: '16/10' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Слой ПОСЛЕ */}
        <div className="absolute inset-0">
          <img
            src={current.after}
            alt={`${current.title} — после`}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Слой ДО */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="absolute inset-0" style={{ width: `${100 / (sliderPos / 100)}%` }}>
            <img
              src={current.before}
              alt={`${current.title} — до`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* Линия разделения */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        />

        {/* Ручка */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ left: `${sliderPos}%` }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 3L13 10L7 17" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 3L7 10L13 17" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Метки */}
        <div
          className="absolute top-3 text-white text-[10px] font-medium pointer-events-none transition-opacity duration-200"
          style={{
            left: `${Math.max(4, sliderPos - 10)}%`,
            opacity: sliderPos < 15 ? 0 : 1,
          }}
        >
          <span className="bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1">ДО</span>
        </div>
        <div
          className="absolute top-3 text-white text-[10px] font-medium pointer-events-none transition-opacity duration-200"
          style={{
            left: `${Math.min(sliderPos + 2, 94)}%`,
            opacity: sliderPos > 85 ? 0 : 1,
          }}
        >
          <span className="bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1">ПОСЛЕ</span>
        </div>
      </div>

      {/* Выбор автомобиля */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleChangeAuto(index)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeIndex === index
                  ? 'bg-accent text-bg-primary'
                  : 'bg-bg-element text-text-secondary hover:text-accent border border-white/5'
                }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}