// components/layout/Footer.tsx
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const socialLinks = [
  { name: 'Telegram', icon: 'FaTelegram', url: 'https://t.me/rudenko_ds' },
  { name: 'VK Видео', icon: 'FaVk', url: 'https://vkvideo.ru/@labofgloss' },
  { name: 'Instagram', icon: 'FaInstagram', url: 'https://instagram.com/labofgloss' },
] as const;

const serviceLinks = [
  { href: '/polish', label: 'Полировка кузова' },
  { href: '/ceramic', label: 'Керамическое покрытие' },
  { href: '/ppf', label: 'Бронирование плёнкой' },
] as const;

const infoLinks = [
  { href: '/gallery', label: 'Наши работы' },
  { href: '/advice', label: 'Советы экспертов' },
  { href: '/contacts', label: 'Контакты' },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">

          {/* Logo + About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="/images/logo/logo.svg"
                alt="Лаборатория блеска"
                className="w-8 h-8"
              />
              <span className="font-bold text-lg">
                Лаборатория <span className="text-accent">блеска</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Детейлинг студия в Омске. Возвращаем автомобилям идеальный блеск и надёжную защиту. Опыт с 2012 года.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent text-accent hover:text-bg-primary flex items-center justify-center transition-all duration-300"
                >
                  <Icon name={social.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Услуги
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Информация
            </h4>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Контакты
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Icon name="FaPhoneAlt" className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <a
                  href="tel:+79620555858"
                  className="text-text-secondary hover:text-accent text-sm transition-colors"
                >
                  +7 (962) 055-58-58
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="FaTelegram" className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <a
                  href="https://t.me/rudenko_ds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent text-sm transition-colors"
                >
                  @rudenko_ds
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="FaMapMarkerAlt" className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-text-secondary text-sm">
                  Омск, ул. Индустриальная, 5Б
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="FaClockIcon" className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-text-secondary text-sm">
                  Ежедневно 10:00 – 20:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-2 pt-6 text-text-secondary/50 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {currentYear} Лаборатория блеска. Все права защищены.</p>
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
          <p className="text-text-secondary/30">ИП Руденко Дмитрий Сергеевич · ИНН: 550608187157</p>
        </div>
      </div>
    </footer>
  );
}