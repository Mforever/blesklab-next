// components/home/FAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { useModalContext } from '@/contexts/ModalContext';

const faqs = [
  {
    id: 1,
    question: 'Сколько времени занимает полировка?',
    answer:
      'Полная полировка кузова занимает 1–2 дня в зависимости от состояния ЛКП и размера автомобиля. Предпродажная подготовка — 4–6 часов.',
  },
  {
    id: 2,
    question: 'Нужна ли предварительная запись?',
    answer:
      'Да, мы работаем строго по записи. Это гарантирует, что вашему автомобилю будет уделено достаточно времени и внимания.',
  },
  {
    id: 3,
    question: 'Как часто можно полировать автомобиль?',
    answer:
      'Рекомендуется не чаще 1–2 раз в год. При щадящей полировке заводского слоя лака хватает на весь срок службы автомобиля.',
  },
  {
    id: 4,
    question: 'Сколько держится керамическое покрытие?',
    answer:
      'Базовое покрытие — до 2 лет. С ежегодным обслуживанием — до 5 лет. Реальный срок зависит от условий эксплуатации и ухода.',
  },
  {
    id: 5,
    question: 'Защищает ли керамика от сколов?',
    answer:
      'От мелких царапин и потёртостей — да. Но от серьёзных сколов камнями защитит только бронирование полиуретановой плёнкой (PPF).',
  },
  {
    id: 6,
    question: 'Сколько служит защитная плёнка?',
    answer:
      'Качественная полиуретановая плёнка служит 5–7 лет. Она не желтеет, не трескается и сохраняет свойства самовосстановления.',
  },
  {
    id: 7,
    question: 'Когда можно мыть автомобиль после нанесения керамики?',
    answer:
      'Первые 10–12 часов после нанесения — полная кристаллизация состава, мыть нельзя. В первую неделю — только сухая уборка без воды. После 7 дней — разрешена бесконтактная мойка.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const { openModal } = useModalContext();

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
            Вопросы и ответы
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто спрашивают</h2>
          <p className="text-text-secondary">
            Собрали ответы на самые популярные вопросы клиентов
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-bg-element rounded-xl border border-white/5 hover:border-accent/20 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-white/[0.02] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-sm pr-4">{faq.question}</span>
                  <Icon
                    name={isOpen ? 'FaChevronUp' : 'FaChevronDown'}
                    className={`text-accent w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-text-secondary text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => openModal({ serviceType: 'general', serviceName: 'консультацию' })}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm group"
          >
            Остались вопросы? Задайте их нам
            <Icon name="FaArrowRight" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}