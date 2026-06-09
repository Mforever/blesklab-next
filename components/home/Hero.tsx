// components/home/Hero.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';

export default function Hero() {
  return (
    <section className="relative min-h-[95svh] flex items-center overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.jpg"
          alt=""
          fill
          className="object-cover object-right"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/90 via-bg-primary/70 to-bg-primary/30" />
      </div>

      {/* Контент */}
      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="text-center lg:text-left">
            {/* Бейдж */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-xs sm:text-sm font-medium text-balance">
                Работаем ежедневно 10:00–20:00 · только по записи
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
              Снова <span className="text-accent">как новый</span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0 text-balance">
              Вернём блеск нового авто. Полировка, керамика, бронирование в Омске
            </p>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-12">
              <Link
                href="/polish"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-xl font-medium transition-all active:scale-95 sm:hover:scale-105 inline-flex items-center justify-center"
              >
                Полировка
              </Link>
              <Link
                href="/ceramic"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-xl font-medium transition-all active:scale-95 sm:hover:scale-105 inline-flex items-center justify-center"
              >
                Керамика
              </Link>
              <Link
                href="/ppf"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-xl font-medium transition-all active:scale-95 sm:hover:scale-105 inline-flex items-center justify-center"
              >
                Бронирование
              </Link>
            </div>

            {/* Быстрые контакты */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
            
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Мышь-скроллер */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <div className="w-[22px] sm:w-[26px] h-[34px] sm:h-[40px] rounded-[12px] sm:rounded-[14px] border-2 border-white/30 flex items-start justify-center p-1 sm:p-1.5">
          <div className="w-[3px] h-[8px] sm:h-[10px] bg-white/60 rounded-full animate-mouse-scroll" />
        </div>
        <Icon name="FaChevronDown" className="w-3 h-3 text-white/40 animate-bounce" />
      </div>
    </section>
  );
}