// app/ceramic/CeramicPageClient.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useModalContext } from '@/contexts/ModalContext';
import ceramicPrices from '@/data/prices/ceramic.json';

const videoItems = [
  {
    title: 'Гидрофобный эффект',
    url: 'https://vkvideo.ru/video_ext.php?oid=-99576867&id=456239037&hash=fcdd6247d4c3aa76&hd=4&autoplay=1&loop=1&mute=1',
    type: 'video' as const,
  },
  {
    title: 'Глубина блеска',
    url: 'https://s.fotora.ru/7f1ab6858362ac2a.jpeg',
    type: 'image' as const,
  },
];

const benefits = [
  {
    icon: 'FaTint',
    title: 'Гидрофобный эффект',
    description: 'Вода скатывается шариками, автомобиль дольше остаётся чистым',
  },
  {
    icon: 'FaShieldAlt',
    title: 'Защита от царапин',
    description: 'Твёрдость покрытия 9H защищает от мелких механических воздействий',
  },
  {
    icon: 'FaSun',
    title: 'Защита от УФ',
    description: 'Предотвращает выгорание краски и старение лакокрасочного покрытия',
  },
  {
    icon: 'FaFlask',
    title: 'Химическая стойкость',
    description: 'Устойчивость к реагентам, битуму и птичьему помёту',
  },
];

const materials = [
  {
    id: 'fc8',
    name: 'Hendlex FC8',
    subtitle: 'Профессиональная нанокерамика для базового покрытия',
    description:
      'Профессиональная нанокерамика, которая создаёт «базу» — твёрдую, гидрофобную матрицу с максимальным блеском.',
  },
  {
    id: 'fc15',
    name: 'Hendlex FC15',
    subtitle: 'Обслуживающий состав для ежегодного обновления покрытия',
    description:
      'Специализированный обслуживающий состав, совместимый с защитными плёнками (PPF). Наносится поверх базы. Во время ежегодного обслуживания восстанавливает грязеотталкивающие свойства, «омолаживая» покрытие и продлевая срок службы до 5 лет.',
  },
];

const steps = [
  { number: '01', title: 'Подготовка', description: 'Мойка, обезжиривание, оклейка пластика и хрома' },
  { number: '02', title: 'Полировка', description: 'Удаление дефектов ЛКП для идеальной основы' },
  { number: '03', title: 'Обезжиривание', description: 'Специальным препаратом для лучшей адгезии' },
  { number: '04', title: 'Нанесение керамики', description: '2–3 слоя с промежуточной сушкой' },
  { number: '05', title: 'Кристаллизация', description: 'Покрытие сохнет 10–12 часов, после чего автомобиль готов к выдаче' },
];

export default function CeramicPageClient() {
  const router = useRouter();
  const { openModal } = useModalContext();

  const handleBooking = (type?: 'base' | 'premium') => {
    openModal({
      serviceType: 'ceramic',
      serviceName:
        type === 'base'
          ? 'Керамика базовое покрытие'
          : type === 'premium'
            ? 'Керамика с обслуживанием'
            : 'Керамическое покрытие',
    });
  };

  const handleGiftBooking = () => {
    openModal({
      serviceType: 'ceramic',
      serviceName: 'Керамическое покрытие + бронирование ручек в подарок',
    });
  };

  return (
    <div className="bg-bg-primary overflow-x-hidden pt-32">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Услуга</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Керамическое покрытие</h1>
              <p className="text-text-secondary text-lg mb-8">
                Защита кузова от ультрафиолета, реагентов и мелких царапин. Гидрофобный эффект и глубокий блеск на годы.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="large" onClick={() => handleBooking()}>Рассчитать стоимость</Button>
                <Button variant="outline" size="large" onClick={() => router.push('/gallery')}>Смотреть работы</Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black">
              <iframe
                src="https://vkvideo.ru/video_ext.php?oid=-99576867&id=456239037&hash=fcdd6247d4c3aa76&hd=4&autoplay=1&loop=1&mute=1"
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                frameBorder="0"
                title="Керамическое покрытие"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Что даёт керамика</h2>
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
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Видео</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Керамика в действии</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Посмотрите, как работает гидрофобный эффект и насколько глубоким становится блеск
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {videoItems.map((item, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black">
                {item.type === 'video' ? (
                  <iframe
                    src={`${item.url}&autoplay=1&loop=1&mute=1&rel=0&showinfo=0`}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                    frameBorder="0"
                    title={item.title}
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <span className="text-white text-xs">{item.title}</span>
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
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Материалы</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Что мы используем</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Профессиональные составы Hendlex для надёжной защиты</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            {materials.map((mat) => (
              <div key={mat.id} className="bg-bg-element rounded-xl p-6 border border-white/5 hover:border-accent/20 transition-all">
                <h3 className="text-xl font-bold text-accent mb-1">{mat.name}</h3>
                <p className="text-text-secondary text-xs mb-3">{mat.subtitle}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{mat.description}</p>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-bold mb-4 text-center">Технические данные</h3>
            <p className="text-text-secondary/60 text-xs text-center mb-6">Характеристики составов</p>
            <div className="bg-bg-element rounded-xl overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-text-primary text-sm">Параметр</th>
                    <th className="text-center py-3 px-4 text-accent text-sm">Hendlex FC8</th>
                    <th className="text-center py-3 px-4 text-accent text-sm">Hendlex FC15</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-text-secondary text-sm">Срок службы (макс.)</td>
                    <td className="text-center py-3 px-4 text-text-secondary text-sm">до 2 лет</td>
                    <td className="text-center py-3 px-4 text-text-secondary text-sm">до 50 моек</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-text-secondary text-sm">Химическая стойкость (pH)</td>
                    <td className="text-center py-3 px-4 text-text-secondary text-sm">3–11</td>
                    <td className="text-center py-3 px-4 text-text-secondary text-sm">3–11</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-text-secondary text-sm">Рекомендуемое кол-во слоёв</td>
                    <td className="text-center py-3 px-4 text-text-secondary text-sm">2 слоя</td>
                    <td className="text-center py-3 px-4 text-text-secondary text-sm">1 слой</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text-secondary text-sm">Подходит для плёнки PPF</td>
                    <td className="text-center py-3 px-4 text-text-secondary text-sm">нет</td>
                    <td className="text-center py-3 px-4 text-text-secondary text-sm">да</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Процесс */}
      <section className="py-16">
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
      <section className="py-16 bg-bg-secondary">
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
                <p className="text-accent text-lg font-bold">≈ {ceramicPrices.classes[0].base.toLocaleString()} – {ceramicPrices.classes[2].premium.toLocaleString()} ₽</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => openModal({ serviceType: 'ceramic', serviceName: 'Полировку + Керамику' })}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium"
            >
              Хочу полировку + керамику
            </button>
          </div>
        </div>
      </section>

      {/* Два варианта */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Выберите защиту</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Два варианта покрытия</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-bg-element rounded-2xl p-8 border border-white/10 hover:border-accent/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">Базовое покрытие</h3>
                <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full">Hendlex FC8</span>
              </div>
              <p className="text-text-secondary text-sm mb-4">Однократное нанесение профессиональной нанокерамики</p>
              <div className="text-3xl font-bold text-accent mb-6">от {ceramicPrices.classes[0].base.toLocaleString()} ₽</div>
              <ul className="space-y-3 mb-6">
                {['Срок службы: до 2 лет', 'Гидрофобность: 115°', 'Защита от УФ и реагентов', 'Насыщение цвета и глубокий блеск'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Icon name="FaCheckCircle" className="text-accent text-xs shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleBooking('base')} className="w-full py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium">
                Записаться
              </button>
            </div>
            <div className="bg-bg-element rounded-2xl p-8 border border-accent/30 bg-gradient-to-br from-bg-element to-accent/5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">Премиум-защита</h3>
                <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full">FC8 + FC15</span>
              </div>
              <p className="text-text-secondary text-sm mb-4">Базовое покрытие + ежегодное обслуживание</p>
              <div className="text-3xl font-bold text-accent mb-6">от {ceramicPrices.classes[0].premium.toLocaleString()} ₽</div>
              <ul className="space-y-3 mb-6">
                {['Срок службы: до 5 лет', 'Ежегодное обслуживание включено', 'Обновление гидрофобности каждый год', 'Дефектовка и диагностика покрытия'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Icon name="FaCheckCircle" className="text-accent text-xs shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleBooking('premium')} className="w-full py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium">
                Записаться
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Подарок */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom max-w-4xl">
          <div className="bg-accent/5 rounded-2xl p-6 md:p-8 text-center border border-accent/10">
            <Icon name="FaGift" className="text-accent text-3xl mb-4 mx-auto" />
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Закажите керамическое покрытие и получите бронирование мест под ручками в подарок
            </h3>
            <p className="text-text-secondary mb-6 text-sm">Экономия до 3 000 ₽</p>
            <button
              onClick={handleGiftBooking}
              className="px-8 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium hover:scale-105 inline-flex items-center gap-2"
            >
              Записаться
              <Icon name="FaArrowRight" className="text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* Таблица цен */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Цены</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Стоимость керамики</h2>
          </div>
          <div className="overflow-x-auto max-w-3xl mx-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-accent/30">
                  <th className="text-left py-3 px-4 text-text-primary text-sm">Класс авто</th>
                  <th className="text-center py-3 px-4 text-text-primary text-sm">Базовое</th>
                  <th className="text-center py-3 px-4 text-text-primary text-sm">Премиум</th>
                </tr>
              </thead>
              <tbody>
                {ceramicPrices.classes.map((item) => (
                  <tr key={item.id} className="border-b border-white/10">
                    <td className="py-3 px-4">
                      <div className="text-text-primary text-sm">{item.name}</div>
                      <div className="text-text-secondary/50 text-xs">{item.examples}</div>
                    </td>
                    <td className="text-center py-3 px-4 text-accent font-semibold text-sm">от {item.base.toLocaleString()} ₽</td>
                    <td className="text-center py-3 px-4 text-accent font-semibold text-sm">от {item.premium.toLocaleString()} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6 text-text-secondary/60 text-xs space-y-1">
            <p>* Ежегодное обслуживание для премиум-защиты: 8 000 ₽</p>
            <p>** Цены указаны с учётом подготовки кузова</p>
          </div>
        </div>
      </section>

      {/* PPF upsell */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom max-w-4xl">
          <div className="bg-accent/5 rounded-2xl p-6 md:p-8 text-center border border-accent/10">
            <Icon name="FaShieldAlt" className="text-accent text-3xl mb-4 mx-auto" />
            <h3 className="text-xl md:text-2xl font-bold mb-3">Керамика не защищает от сколов и камней</h3>
            <p className="text-text-secondary mb-6">
              Керамика отлично работает против УФ, реагентов и мелких царапин. Но от камней и сколов защитит только бронирование плёнкой (PPF).
            </p>
            <button
              onClick={() => router.push('/ppf')}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium"
            >
              Рассчитать бронирование
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Вопросы и ответы</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто спрашивают</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Сколько реально держится керамика?',
                a: 'Максимальный срок — до 2 лет для базового покрытия и до 5 лет для покрытия с ежегодным обслуживанием. Это максимальные сроки при идеальных условиях. Реалистично: 12–18 месяцев для базового, 3–4 года с обслуживанием. На срок влияют: уличное хранение (сокращает на 30–40%), агрессивная химия зимой, качество мойки.',
              },
              {
                q: 'В чём разница между FC8 и FC15?',
                a: 'FC8 — профессиональное нанокерамическое покрытие для создания твёрдой гидрофобной основы с долговечностью до 2 лет. FC15 — это специализированный обслуживающий состав. Он не заменяет FC8, а дополняет его. FC15 совместим с защитными плёнками (PPF) и используется для ежегодного обновления покрытия — восстановления гидрофобных свойств и продления срока службы до 5 лет.',
              },
              {
                q: 'Что входит в ежегодное обслуживание?',
                a: 'Осмотр и диагностика покрытия, мягкая мойка, безабразивная полировка (чистка) для удаления остатков старого состава, нанесение свежего слоя FC15 для восстановления гидрофобных свойств.',
              },
              {
                q: 'Почему цена зависит от размера авто?',
                a: 'На внедорожник уходит больше материалов и времени на подготовку кузова, чем на легковой автомобиль. Это влияет на итоговую стоимость.',
              },
              {
                q: 'Как понять, что керамика перестала работать?',
                a: 'Вода перестала собираться в шарики (гидрофобный эффект пропал), блеск стал тусклым, грязь начинает прилипать. Это значит, что защитный слой истощился и требует обновления.',
              },
              {
                q: 'Стоит ли защищать фары и капот дополнительно?',
                a: (
                  <>
                    Да! Керамика защищает от ультрафиолета и реагентов, но от камней и сколов она не спасёт. Для максимальной защиты уязвимых зон рекомендуем бронирование плёнкой. Подробнее в статье{' '}
                    <Link href="/advice/headlights-yellowing-repair" className="text-accent hover:underline">
                      Защита фар: почему это дешевле, чем замена
                    </Link>
                    .
                  </>
                ),
              },
              {
                q: 'Как ухаживать за авто после керамики?',
                a: (
                  <>
                    Первые 7 дней — нельзя мочить авто (период кристаллизации). После — только бесконтактная мойка или{' '}
                    <Link href="/advice/wrong-washing" className="text-accent hover:underline">
                      ручная мойка по принципу двух вёдер
                    </Link>{' '}
                    с мягкой микрофиброй. Также рекомендуем профессиональную 2–3 фазную мойку. Никогда не используйте щётки и абразивные средства. Подробнее о правильном уходе читайте в статье{' '}
                    <Link href="/advice/self-care-after-detailing" className="text-accent hover:underline">
                      Как ухаживать за авто после детейлинга
                    </Link>
                    .
                  </>
                ),
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-bg-element rounded-xl p-5 md:p-6"
              >
                <h3 className="font-semibold mb-2 text-accent text-sm md:text-base">{faq.q}</h3>
                <div className="text-text-secondary text-xs md:text-sm leading-relaxed">{faq.a}</div>
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
            Оставьте заявку, и мы поможем подобрать оптимальное покрытие
          </p>
          <button
            onClick={() => handleBooking()}
            className="px-8 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium hover:scale-105"
          >
            Записаться онлайн
          </button>
        </div>
      </section>
    </div>
  );
}