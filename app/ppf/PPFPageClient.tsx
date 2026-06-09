// app/ppf/PPFPageClient.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import CarProtectionCalculator from '@/components/ppf/CarProtectionCalculator';
import { useModalContext } from '@/contexts/ModalContext';

const benefits = [
  {
    icon: 'FaShieldAlt',
    title: 'Защита от сколов',
    description: 'Плёнка принимает удар камней и песка на себя, сохраняя ЛКП',
  },
  {
    icon: 'FaMagic',
    title: 'Самовосстановление',
    description: 'Мелкие царапины исчезают при нагреве феном или на солнце',
  },
  {
    icon: 'FaSun',
    title: 'Защита от УФ',
    description: 'Предотвращает выгорание краски и помутнение фар',
  },
  {
    icon: 'FaFlask',
    title: 'Химическая стойкость',
    description: 'Устойчивость к реагентам, битуму и следам насекомых',
  },
];

const steps = [
  { number: '01', title: 'Подготовка', description: 'Тщательная мойка и обезжиривание' },
  { number: '02', title: 'Раскрой плёнки', description: 'Точный раскрой по лекалам автомобиля' },
  { number: '03', title: 'Нанесение', description: 'Оклейка с использованием профессионального оборудования' },
  { number: '04', title: 'Фиксация', description: 'Прогрев и фиксация краёв' },
  { number: '05', title: 'Контроль', description: 'Проверка качества и выдача автомобиля' },
];

const faqs = [
  {
    question: 'Сколько служит защитная плёнка?',
    answer:
      'Качественная полиуретановая плёнка служит 5–7 лет. За это время она не желтеет и не теряет своих свойств.',
  },
  {
    question: 'Не повредит ли плёнка краску при снятии?',
    answer:
      'Нет, профессиональная плёнка снимается без следов, не повреждая заводской ЛКП.',
  },
  {
    question: 'Можно ли бронировать частично?',
    answer:
      'Да, вы можете выбрать только самые уязвимые зоны: капот, бампер, фары, зеркала.',
  },
  {
    question: 'Влияет ли плёнка на внешний вид?',
    answer:
      'Современные плёнки практически незаметны на кузове и не меняют цвет автомобиля.',
  },
  {
    question: 'Что такое самовосстановление?',
    answer:
      'При нагреве (фен, солнце, горячая вода) полиуретановая плёнка «затягивает» мелкие царапины и возвращается к первоначальному состоянию. Это свойство сохраняется весь срок службы.',
  },
  {
    question: 'Можно ли поверх плёнки нанести керамику?',
    answer:
      'Да, некоторые плёнки (Spektrol) уже имеют керамический слой. На другие можно нанести керамику для дополнительного блеска и гидрофобного эффекта.',
  },
  {
    question: 'Как ухаживать за плёнкой?',
    answer:
      'Можно мыть бесконтактным способом или вручную с мягкой микрофиброй. Не использовать абразивные средства и щётки. Раз в год рекомендуется профессиональный осмотр покрытия.',
  },
];

export default function PPFPageClient() {
  const router = useRouter();
  const { openModal } = useModalContext();
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bonus, setBonus] = useState<string | undefined>();

  const handleSelectionChange = useCallback(
    (zones: string[], price: number, bonusText?: string) => {
      setSelectedZones(zones);
      setTotalPrice(price);
      setBonus(bonusText);
    },
    []
  );

  const handleBooking = () => {
    openModal({
      serviceType: 'ppf',
      serviceName: 'Бронирование плёнкой',
      selectedZones,
      totalPrice,
    });
  };

  return (
    <div className="bg-bg-primary overflow-x-hidden pt-32">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
                Услуга
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Бронирование плёнкой
              </h1>
              <p className="text-text-secondary text-lg mb-8">
                Надёжная защита кузова от сколов, царапин и реагентов. Сохраним ваш автомобиль в идеальном состоянии.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="large"
                  onClick={() =>
                    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Рассчитать стоимость
                </Button>
                <Button variant="outline" size="large" onClick={() => router.push('/gallery')}>
                  Смотреть работы
                </Button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black">
              <iframe
                src="https://vkvideo.ru/video_ext.php?oid=-99576867&id=456239035&hash=...&autoplay=1&loop=1&mute=1&rel=0&showinfo=0"
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                frameBorder="0"
                title="Бронирование плёнкой"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Преимущества
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему стоит бронировать</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-bg-element rounded-xl p-6 text-center border border-white/5 hover:border-accent/20 transition-all hover:scale-[1.02]"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={benefit.icon} className="text-accent text-xl" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-text-secondary text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Видео */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Видео
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Бронирование в действии</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Посмотрите, как работает самовосстановление плёнки
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                url: 'https://vkvideo.ru/video_ext.php?oid=-99576867&id=456239035&hash=e7efa9a2106eee07&hd=4',
                label: 'Самовосстановление царапин',
              },
              {
                url: 'https://vkvideo.ru/video_ext.php?oid=-99576867&id=456239034&hash=0b35690ca9bf2ef8&hd=4',
                label: 'Гидрофобный эффект',
              },
            ].map((video, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black"
              >
                <iframe
                  src={`${video.url}&autoplay=1&loop=1&mute=1`}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                  frameBorder="0"
                  title={video.label}
                />
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <span className="text-white text-xs">{video.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Материалы */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Материалы
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Виды защитных плёнок</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Используем только полиуретановые плёнки премиум-сегмента. Гибридные и бюджетные аналоги не применяем — у них короткий срок службы и слабая защита.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                brand: 'DELTASKIN',
                type: 'Премиум полиуретан',
                features: ['Топ-сегмент', 'Лаковый и керамический слой', 'Матовые версии', 'Срок службы 7+ лет'],
              },
              {
                brand: 'VHQ',
                type: 'Премиум полиуретан',
                features: ['Высокая прозрачность', 'Самовосстановление', 'Гидрофобный слой', 'Срок службы 5+ лет'],
              },
              {
                brand: 'Quantum',
                type: 'Премиум полиуретан',
                features: ['Усиленная защита от сколов', 'Стойкость к пескострую', 'Эластичность', 'Срок службы 7+ лет'],
              },
              {
                brand: 'Spectroll',
                type: 'Премиум полиуретан',
                features: ['Керамическое покрытие на плёнке', 'Глубокий блеск', 'Гидрофобность', 'Срок службы 5+ лет'],
              },
            ].map((film) => (
              <motion.div
                key={film.brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-bg-element rounded-xl p-5 border border-white/5 hover:border-accent/20 transition-all"
              >
                <h3 className="text-lg font-bold text-accent mb-1">{film.brand}</h3>
                <p className="text-text-secondary/60 text-xs mb-3">{film.type}</p>
                <ul className="space-y-1.5">
                  {film.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-text-secondary text-xs">
                      <Icon name="FaCheckCircle" className="text-accent text-[10px] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Калькулятор */}
      <section id="calculator" className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Калькулятор
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Рассчитайте стоимость бронирования
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Выберите зоны на схеме автомобиля, и мы мгновенно рассчитаем цену
            </p>
          </div>
          <CarProtectionCalculator onSelectionChange={handleSelectionChange} />
        </div>
      </section>

      {/* Этапы */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Процесс
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Как мы работаем</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-bg-element rounded-xl p-5 text-center border border-white/5"
              >
                <div className="text-3xl font-bold text-accent/30 mb-2">{step.number}</div>
                <h3 className="font-semibold mb-2 text-sm">{step.title}</h3>
                <p className="text-text-secondary text-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Вопросы и ответы
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто спрашивают</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-bg-element rounded-xl p-5 border border-white/5"
              >
                <h3 className="font-semibold mb-2 text-accent">{faq.question}</h3>
                <p className="text-text-secondary text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы защитить авто?</h2>
          <p className="text-text-secondary text-sm mb-8">
            {selectedZones.length > 0
              ? `Вы выбрали ${selectedZones.length} зон на сумму ${totalPrice.toLocaleString()} ₽`
              : 'Оставьте заявку, и мы поможем подобрать оптимальную защиту'}
            {bonus && (
              <span className="block text-accent mt-1">🎁 {bonus}</span>
            )}
          </p>
          <button
            onClick={handleBooking}
            className="px-8 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium hover:scale-105"
          >
            {selectedZones.length > 0 ? 'Оформить заказ' : 'Записаться онлайн'}
          </button>
        </div>
      </section>
    </div>
  );
}