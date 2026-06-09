// components/home/Contacts.tsx
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

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

export default function Contacts() {
  return (
    <section className="py-20 bg-bg-primary" id="contacts">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
            Свяжитесь с нами
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ответим на все вопросы и поможем подобрать оптимальную услугу
          </p>
        </div>

        {/* Карточки контактов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        {/* Отсылка на полные контакты */}
        <div className="text-center">
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all text-sm font-medium"
          >
            Все контакты и карта проезда
            <Icon name="FaArrowRight" className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}