// components/home/Advantages.tsx

const advantages = [
  {
    title: 'Опыт с 2012 года',
    description:
      'Начинали с обучения у лучших мастеров России. Постоянно повышаем квалификацию, тестируем новые технологии.',
  },
  {
    title: 'Соблюдаем сроки',
    description: 'Сдаём автомобиль точно в оговоренное время, без задержек и переносов.',
  },
  {
    title: 'Профессиональное оборудование',
    description:
      'Эксцентриковые машинки RUPES, пасты Koch Chemie и Farecla — только то, чем пользуемся сами.',
  },
  {
    title: 'Гарантия качества',
    description: 'Отвечаем за результат. Если что-то не устроит — исправим за свой счёт.',
  },
];

export default function Advantages() {
  return (
    <section className="py-16 sm:py-20 bg-bg-primary">
      <div className="container-custom">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Почему мы</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {advantages.map((adv) => (
            <div
              key={adv.title}
              className="group bg-bg-element rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-accent/20 transition-all duration-300"
            >
              <h3 className="text-sm font-semibold mb-2 group-hover:text-accent transition-colors">
                {adv.title}
              </h3>
              <p className="text-text-secondary text-xs leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}