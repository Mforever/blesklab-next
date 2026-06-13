// components/home/Services.tsx
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';

const services = [
  {
    id: 'polish',
    title: 'Полировка кузова',
    badge: 'Восстановление ЛКП',
    description: 'Удаляем царапины, голограммы и паутину. Возвращаем глубину цвета и зеркальный блеск.',
    image: '/images/services/polish.jpg',
    href: '/polish',
    features: [
      'Эксцентриковая машинка RUPES — безопасно для ЛКП',
      'Пасты Koch Chemie и Farecla — премиум-сегмент',
      'Сохраняем лак, а не стираем его',
    ],
  },
  {
    id: 'ceramic',
    title: 'Керамическое покрытие',
    badge: 'Защита на годы',
    description: 'Создаём прочный защитный слой. Гидрофобный эффект 115°, защита от УФ и реагентов.',
    image: '/images/services/ceramic.jpg',
    href: '/ceramic',
    features: [
      'Профессиональная нанокерамика Hendlex',
      'Срок службы до 5 лет с обслуживанием',
      'Гидрофобность 115° — грязь не прилипает',
    ],
  },
  {
    id: 'ppf',
    title: 'Бронирование плёнкой',
    badge: 'Защита от сколов',
    description: 'Полиуретановая плёнка премиум-сегмента. Самовосстановление, срок службы 7 лет.',
    image: '/images/services/ppf.jpg',
    href: '/ppf',
  
    features: [
      'Премиум-бренды: DeltaSkin, VHQ, Quantum, Spectroll',
      'Самовосстановление царапин при нагреве',
      'Не желтеет, не трескается — 7 лет',
    ],
  },
];

export default function Services() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-bg-secondary overflow-hidden" id="services">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-14">
          <span className="inline-block text-accent font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4">
            Наши услуги
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Что мы предлагаем</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base px-4">
            Полный спектр услуг по уходу за автомобилем — от восстановления до защиты
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-7 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-bg-element rounded-2xl border border-white/10 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(145,203,125,0.12)] flex flex-col min-w-0 h-full"
            >
              {/* Бейдж */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <span className="bg-bg-primary border border-accent text-accent rounded-full px-5 py-2 text-[11px] sm:text-xs font-medium whitespace-nowrap">
                  {service.badge}
                </span>
              </div>

              {/* Фото */}
              <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-element via-bg-element/30 to-transparent" />
              </div>

              {/* Контент */}
              <div className="px-5 py-5 sm:px-6 sm:py-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-accent transition-colors leading-relaxed">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm mb-4 sm:mb-5 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6 flex-grow">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 sm:gap-2.5">
                      <Icon name="FaCheckCircle" className="text-accent text-[10px] sm:text-xs mt-0.5 shrink-0" />
                      <span className="text-text-secondary text-[11px] sm:text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/5">
                  <Link
                    href={service.href}
                    className="flex items-center justify-center w-full py-2.5 sm:py-3 border border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-xl font-medium transition-all text-xs sm:text-sm"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}