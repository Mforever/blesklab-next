// components/home/Services.tsx
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';

const services = [
  {
    id: 'polish',
    title: 'Полировка кузова',
    description:
      'Удаляем царапины, голограммы и паутину. Возвращаем глубину цвета и зеркальный блеск. Работаем в щадящем режиме — сохраняем лак, а не стираем его.',
    image: '/images/services/polish.jpg',
    href: '/polish',
    features: [
      'Абразивная и финишная полировка',
      'Эксцентриковая машинка RUPES — безопасно для ЛКП',
      'Пасты Koch Chemie и Farecla — премиум-сегмент',
    ],
  },
  {
    id: 'ceramic',
    title: 'Керамическое покрытие',
    description:
      'Создаём прочный защитный слой на кузове. Гидрофобный эффект 115°, защита от УФ, реагентов и мелких царапин. Срок службы — до 5 лет.',
    image: '/images/services/ceramic.jpg',
    href: '/ceramic',
    features: [
      'Профессиональная нанокерамика Hendlex',
      'Гидрофобный угол смачивания 115°',
      'Ежегодное сервисное обслуживание',
    ],
  },
  {
    id: 'ppf',
    title: 'Бронирование плёнкой',
    description:
      'Защищаем кузов от сколов, царапин и пескоструя. Полиуретановая плёнка с эффектом самовосстановления. Незаметна на кузове, служит до 7 лет.',
    image: '/images/services/ppf.jpg',
    href: '/ppf',
    features: [
      'Самовосстановление царапин при нагреве',
      'Полная или частичная оклейка',
      'Не желтеет, не трескается',
    ],
  },
];

export default function Services() {
  return (
    <section className="py-16 sm:py-20 bg-bg-secondary" id="services">
      <div className="container-custom">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-accent font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4">
            Наши услуги
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Что мы предлагаем</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base px-2">
            Полный спектр услуг по уходу за автомобилем — от восстановления до защиты
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-bg-element rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-element/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{service.title}</h3>
                </div>
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 flex-grow">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 sm:gap-2.5 text-text-secondary text-xs sm:text-sm">
                      <Icon
                        name="FaCheckCircle"
                        className="text-accent text-[10px] sm:text-xs mt-0.5 shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl font-medium transition-all active:scale-95 sm:hover:scale-105 text-xs sm:text-sm"
                >
                  Подробнее
                  <Icon name="FaArrowRight" className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}