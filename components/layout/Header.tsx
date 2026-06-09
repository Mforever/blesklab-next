// components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { useModalContext } from '@/contexts/ModalContext';

const navItems = [
  { href: '/', label: 'Главная' },
  {
    label: 'Услуги',
    children: [
      { href: '/polish', label: 'Полировка кузова' },
      { href: '/ceramic', label: 'Керамическое покрытие' },
      { href: '/ppf', label: 'Бронирование плёнкой' },
    ],
  },
  { href: '/gallery', label: 'Галерея' },
  { href: '/advice', label: 'Советы' },
  { href: '/contacts', label: 'Контакты' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { openModal } = useModalContext();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const handleBookingClick = () => {
    openModal({ serviceType: 'general', serviceName: 'услугу' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-bg-primary shadow-lg shadow-black/30 py-2'
          : 'bg-bg-primary/0 py-4'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 group shrink-0"
            aria-label="На главную"
          >
            <img
              src="/images/logo/logo.svg"
              alt="Лаборатория блеска"
              className="w-8 h-8"
            />
            <span className="font-bold text-base sm:text-lg whitespace-nowrap">
              Лаборатория <span className="text-accent">блеска</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-text-secondary hover:text-accent transition-colors text-sm py-2">
                    {item.label}
                    <Icon name="FaChevronDown" className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-bg-secondary rounded-xl shadow-xl overflow-hidden border border-white/10"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-text-secondary hover:text-accent hover:bg-bg-element transition-colors text-sm"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm py-2 transition-colors ${pathname === item.href
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-accent'
                    }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+79620555858"
              className="w-9 h-9 rounded-lg bg-bg-element/30 hover:bg-accent/20 text-text-secondary hover:text-accent flex items-center justify-center transition-all"
              aria-label="Позвонить"
            >
              <Icon name="FaPhoneAlt" className="w-4 h-4" />
            </a>
            <a
              href="https://t.me/rudenko_ds"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-bg-element/30 hover:bg-accent/20 text-text-secondary hover:text-accent flex items-center justify-center transition-all"
              aria-label="Написать в Telegram"
            >
              <Icon name="FaTelegram" className="w-4 h-4" />
            </a>
            <button
              onClick={handleBookingClick}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-bg-primary text-sm font-medium rounded-lg transition-all hover:scale-105"
            >
              Записаться
            </button>
          </div>

          {/* Mobile CTA + Burger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:+79620555858"
              className="w-9 h-9 rounded-lg bg-bg-element/50 flex items-center justify-center"
              aria-label="Позвонить"
            >
              <Icon name="FaPhoneAlt" className="w-4 h-4 text-accent" />
            </a>
            <a
              href="https://t.me/rudenko_ds"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-bg-element/50 flex items-center justify-center"
              aria-label="Написать в Telegram"
            >
              <Icon name="FaTelegram" className="w-4 h-4 text-accent" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              <Icon
                name={isMobileMenuOpen ? 'FaTimes' : 'FaBars'}
                className="w-4 h-4 text-bg-primary"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-3 bg-bg-secondary rounded-xl overflow-hidden border border-white/10"
            >
              <nav className="p-4 space-y-1">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.label} className="space-y-1">
                      <div className="text-text-secondary px-4 py-2 text-sm font-medium">
                        {item.label}
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-8 py-2 text-text-secondary hover:text-accent transition-colors text-sm rounded-lg"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-2 rounded-lg text-sm transition-colors ${pathname === item.href
                          ? 'bg-accent text-bg-primary'
                          : 'text-text-secondary hover:bg-bg-element'
                        }`}
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <div className="pt-3 mt-3 border-t border-white/10">
                  <button
                    onClick={handleBookingClick}
                    className="w-full px-4 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all text-sm font-medium"
                  >
                    Записаться онлайн
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}