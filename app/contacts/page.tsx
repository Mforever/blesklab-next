// app/contacts/page.tsx
import Icon from '@/components/ui/Icon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Контакты детейлинг-студии Лаборатория блеска в Омске. Адрес, телефон, Telegram, карта проезда. Работаем ежедневно с 10:00 до 20:00.',
};

const contactCards = [
  {
    id: 'address',
    icon: 'FaMapMarkerAlt',
    title: 'Адрес',
    lines: ['Омск, ул. Индустриальная, 5Б'],
    note: 'Ежедневно 10:00–20:00',
    noteSmall: 'по предварительной записи',
  },
  {
    id: 'phone',
    icon: 'FaPhoneAlt',
    title: 'Телефон',
    lines: ['+7 (962) 055-58-58'],
    link: 'tel:+79620555858',
    linkText: 'Позвонить',
  },
  {
    id: 'telegram',
    icon: 'FaTelegram',
    title: 'Telegram',
    lines: ['@rudenko_ds'],
    link: 'https://t.me/rudenko_ds',
    linkText: 'Написать',
  },
];

const socialLinks = [
  { name: 'Telegram', icon: 'FaTelegram', url: 'https://t.me/rudenko_ds' },
  { name: 'VK Видео', icon: 'FaVk', url: 'https://vkvideo.ru/@labofgloss' },
  { name: 'Instagram', icon: 'FaInstagram', url: 'https://instagram.com/labofgloss' },
];

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
            Свяжитесь с нами
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
          <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full" />
        </div>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactCards.map((card) => (
            <div
              key={card.id}
              className="group bg-bg-element rounded-xl p-6 text-center border border-white/5 hover:border-accent/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <Icon name={card.icon} className="text-accent text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-3">{card.title}</h3>
              {card.lines.map((line, i) => (
                <p key={i} className="text-text-secondary text-sm">
                  {line}
                </p>
              ))}
              {card.note && <p className="text-text-secondary/70 text-xs mt-2">{card.note}</p>}
              {card.noteSmall && (
                <p className="text-accent text-xs mt-1">{card.noteSmall}</p>
              )}
              {card.link && (
                <a
                  href={card.link}
                  target={card.link.startsWith('http') ? '_blank' : undefined}
                  rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 mt-4 text-accent hover:gap-3 transition-all text-sm font-medium"
                >
                  {card.linkText}
                  <Icon name="FaArrowRight" className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Соцсети */}
        <div className="text-center mb-12">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Мы в соцсетях
          </h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-12 h-12 rounded-xl bg-bg-element hover:bg-accent text-accent hover:text-bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Icon name={social.icon} className="text-xl" />
              </a>
            ))}
          </div>
        </div>

        {/* Карта */}
        <div className="bg-bg-element rounded-xl p-2 shadow-lg">
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
            <iframe
              src="https://yandex.ru/map-widget/v1/?z=17&ol=biz&oid=224582731097"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Лаборатория блеска на карте Омска"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}