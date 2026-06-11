// components/home/BeforeAfterBlock.tsx
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';

const items = [
  {
    id: 1,
    title: 'BMW X5',
    before: '/images/before-after/polish-1/before.jpg',
    after: '/images/before-after/polish-1/after.jpg',
  },
  {
    id: 2,
    title: 'Mercedes E-Class',
    before: '/images/before-after/polish-2/before.jpg',
    after: '/images/before-after/polish-2/after.jpg',
  },
  {
    id: 3,
    title: 'Audi Q7',
    before: '/images/before-after/polish-3/before.jpg',
    after: '/images/before-after/polish-3/after.jpg',
  },
];

export default function BeforeAfterBlock() {
  return (
    <section className="py-16 sm:py-20 bg-bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Результаты работы</h2>
          <p className="text-text-secondary text-sm">Передвигайте ползунок, чтобы увидеть разницу</p>
        </div>
        <BeforeAfterSlider items={items} />
      </div>
    </section>
  );
}