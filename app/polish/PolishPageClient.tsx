// app/polish/PolishPageClient.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useModalContext } from '@/contexts/ModalContext';
import polishPrices from '@/data/prices/polish.json';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';

const beforeAfterExamples = [
  { id: 1, title: 'BMW X5', before: '/images/before-after/polish-1/before.jpg', after: '/images/before-after/polish-1/after.jpg' },
  { id: 2, title: 'Mercedes E-Class', before: '/images/before-after/polish-2/before.jpg', after: '/images/before-after/polish-2/after.jpg' },
  { id: 3, title: 'Audi Q7', before: '/images/before-after/polish-3/before.jpg', after: '/images/before-after/polish-3/after.jpg' },
];

const benefits = [
  {
    icon: 'FaBrush',
    title: 'Глубокая очистка',
    description: 'Удаляем до 95% загрязнений, битум, металлические вкрапления. Возвращаем первоначальный цвет и гладкость.',
  },
  {
    icon: 'FaMagic',
    title: 'Удаление царапин и голограмм',
    description: 'Убираем паутину, голограммы и мелкие дефекты ЛКП. Работаем в щадящем режиме — сохраняем лак, а не стираем его.',
  },
  {
    icon: 'FaGem',
    title: 'Глубокий блеск',
    description: 'После полировки автомобиль сияет как новый. Для продления эффекта рекомендуем покрыть кузов воском или керамикой.',
  },
  {
    icon: 'FaShieldAlt',
    title: 'Подготовка к защите',
    description: 'Полировка — обязательный этап перед нанесением керамики или воска. Создаём идеально ровную поверхность для защитного слоя.',
  },
];

const steps = [
  { number: '01', title: 'Мойка и подготовка', description: 'Бесконтактная мойка, удаление битума, обезжиривание' },
  { number: '02', title: 'Диагностика ЛКП', description: 'Измеряем толщину лака, определяем глубину царапин' },
  { number: '03', title: 'Абразивная полировка', description: 'Удаляем дефекты пастами Koch Chemie и Farecla' },
  { number: '04', title: 'Финишная полировка', description: 'Выравниваем поверхность для глубины цвета и блеска' },
  { number: '05', title: 'Контроль качества', description: 'Проверяем результат под разными углами освещения' },
];

const prices = [
  ...polishPrices.classes.map((cls) => ({
    car: cls.name,
    price: `от ${cls.price.toLocaleString()} ₽`,
    examples: cls.examples,
  })),
  ...polishPrices.additional.map((add) => ({
    car: add.name,
    price: `${add.price.toLocaleString()} ₽`,
    description: add.description,
  })),
];

const faqs = [
  {
    question: 'Сколько держится эффект после полировки?',
    answer: 'Без защиты — 3–6 месяцев. С воском — до 6 месяцев. С керамикой — до 2–5 лет. Рекомендуем всегда наносить защитный слой после полировки.',
  },
  {
    question: 'Не повредит ли полировка краску?',
    answer: 'Нет, мы используем щадящие абразивные пасты и эксцентриковые машинки RUPES. Снимается минимальный слой лака — мы сохраняем ЛКП, а не стираем его.',
  },
  {
    question: 'Как часто можно полировать?',
    answer: 'Не чаще 1–2 раз в год. При щадящей полировке заводского лака хватает на весь срок службы автомобиля.',
  },
  {
    question: 'Стоит ли добавлять керамику после полировки?',
    answer: 'Да! Полировка восстанавливает блеск, керамика сохраняет его на годы. Вместе — максимальный эффект. Без защиты блеск уходит через 3–6 месяцев.',
  },
  {
    question: 'Как понять, отполируется ли царапина?',
    answer: 'Намочите царапину водой — если становится почти невидимой, полировка поможет. Если царапина цепляется ногтем — потребуется более глубокая обработка.',
  },
];

export default function PolishPageClient() {
  const router = useRouter();
  const { openModal } = useModalContext();
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');
  const [selectedExample, setSelectedExample] = useState(0);

  const handleBooking = () => {
    openModal({ serviceType: 'polish', serviceName: 'Полировку кузова' });
  };

  const handlePolishAndCeramic = () => {
    openModal({ serviceType: 'ceramic', serviceName: 'Полировку + Керамику' });
  };

  return (
    <div className="bg-bg-primary overflow-x-hidden pt-32">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Услуга</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Полировка кузова</h1>
              <p className="text-text-secondary text-lg mb-8">
                Вернём блеск и глубину цвета вашему автомобилю. Удалим царапины, паутину и голограммы.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="large" onClick={handleBooking}>Записаться</Button>
                <Button variant="outline" size="large" onClick={() => router.push('/gallery')}>Смотреть работы</Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black">
              <iframe
                src="https://vkvideo.ru/video_ext.php?oid=-99576867&id=456239036&hash=...&autoplay=1&loop=1&mute=1&rel=0&showinfo=0"
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                frameBorder="0"
                title="Полировка кузова — процесс"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Преимущества</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Что вы получаете</h2>
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

      {/* До/После */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Результат</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">До / После</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Посмотрите на реальные примеры наших работ</p>
          </div>
          <BeforeAfterSlider items={beforeAfterExamples} />
        </div>
      </section>

      {/* Этапы */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Процесс</span>
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

      {/* Полировка + Керамика */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Полировка + Керамика — выгода очевидна</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-sm">
              Полировка возвращает блеск, но без защиты он уходит за 3–6 месяцев. Добавьте керамику — и результат останется на годы. Посчитали за вас:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="bg-bg-element rounded-2xl p-6 flex flex-col">
              <p className="text-text-secondary text-xs uppercase tracking-wider mb-3">Вариант А</p>
              <h3 className="text-lg font-bold mb-3">Только полировка</h3>
              <p className="text-text-secondary text-sm mb-4 flex-grow">
                Блеск держится 3–6 месяцев. Затем снова паутина, голограммы, потеря глубины цвета. Нужно повторять раз в полгода.
              </p>
              <div className="pt-3 border-t border-white/10">
                <p className="text-text-secondary/60 text-xs mb-1">Затраты за 3 года</p>
                <p className="text-text-secondary text-lg font-semibold">≈ 60 000 – 120 000 ₽</p>
              </div>
            </div>
            <div className="bg-accent/10 rounded-2xl p-6 flex flex-col border border-accent/30">
              <p className="text-accent text-xs uppercase tracking-wider mb-3">Рекомендуем</p>
              <h3 className="text-lg font-bold mb-3">Полировка + Керамика</h3>
              <p className="text-text-secondary text-sm mb-4 flex-grow">
                Блеск и защита на 2–5 лет. Гидрофобный эффект, защита от УФ и реагентов. Экономия на повторных полировках.
              </p>
              <div className="pt-3 border-t border-accent/20">
                <p className="text-text-secondary/60 text-xs mb-1">Затраты за 3 года</p>
                <p className="text-accent text-lg font-bold">≈ 22 000 – 45 000 ₽</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handlePolishAndCeramic}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium"
            >
              Хочу полировку + керамику
            </button>
          </div>
        </div>
      </section>

      {/* Защитите уязвимые зоны */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom max-w-4xl">
          <div className="bg-accent/5 rounded-2xl p-6 md:p-8 text-center">
            <Icon name="FaShieldAlt" className="text-accent text-3xl mb-4 mx-auto" />
            <h3 className="text-xl md:text-2xl font-bold mb-3">Защитите уязвимые зоны</h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-sm">
              Фары, капот и зеркала страдают от камней и реагентов больше всего. Бронирование этих зон продлит жизнь вашему авто и сэкономит бюджет.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-left mb-6">
              <div className="bg-bg-element rounded-xl p-4 text-center">
                <Icon name="FaCar" className="text-accent text-xl mb-2 mx-auto" />
                <p className="font-semibold text-sm">Замена фары</p>
                <p className="text-text-secondary text-xs">от 30 000 ₽</p>
              </div>
              <div className="bg-bg-element rounded-xl p-4 text-center">
                <Icon name="FaGem" className="text-accent text-xl mb-2 mx-auto" />
                <p className="font-semibold text-sm">Полировка фар</p>
                <p className="text-text-secondary text-xs">от 3 000 ₽ (6-12 мес)</p>
              </div>
              <div className="bg-accent/20 rounded-xl p-4 text-center border border-accent">
                <Icon name="FaShieldAlt" className="text-accent text-xl mb-2 mx-auto" />
                <p className="font-semibold text-sm">Бронирование фар</p>
                <p className="text-text-secondary text-xs">от 5 000 ₽ (5-7 лет)</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/ppf')}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl font-medium transition-all inline-flex items-center gap-2 group mx-auto"
            >
              <span>Рассчитать защиту зон</span>
              <Icon name="FaArrowRight" className="text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* Прайс-лист */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Цены</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Стоимость полировки</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-bg-element rounded-xl overflow-hidden">
              {prices.map((item, index) => (
                <div key={index} className={`flex justify-between items-center p-4 ${index < prices.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <div>
                    <span className="text-text-primary font-medium">{item.car}</span>
                    {'examples' in item && item.examples && (
                      <div className="text-text-secondary/50 text-xs mt-0.5">{item.examples}</div>
                    )}
                    {'description' in item && item.description && (
                      <div className="text-text-secondary/50 text-xs mt-0.5">{item.description}</div>
                    )}
                  </div>
                  <span className="text-accent font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-accent/5 rounded-xl p-5 border border-accent/10">
              <h3 className="font-semibold mb-3 text-center">Полировка отдельных элементов</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {polishPrices.elements.map((el) => (
                  <div key={el.name} className="bg-bg-element rounded-lg p-3 text-center">
                    <p className="font-medium text-sm">{el.name}</p>
                    <p className="text-text-secondary text-xs">{el.description}</p>
                    <p className="text-accent font-bold mt-2">{el.price.toLocaleString()} ₽</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Вопросы и ответы</span>
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
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы записаться?</h2>
          <p className="text-text-secondary text-sm mb-8 max-w-2xl mx-auto">
            Оставьте заявку, и мы перезвоним в течение 15 минут
          </p>
          <button
            onClick={handleBooking}
            className="px-8 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium hover:scale-105"
          >
            Записаться онлайн
          </button>
        </div>
      </section>
    </div>
  );
}