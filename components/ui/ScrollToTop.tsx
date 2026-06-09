// components/ui/ScrollToTop.tsx
'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-40 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/20 hover:text-white/40 flex items-center justify-center transition-all duration-500 ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      aria-label="Наверх"
    >
      <Icon name="FaChevronUp" className="w-3.5 h-3.5" />
    </button>
  );
}