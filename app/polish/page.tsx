// app/polish/page.tsx
import PolishPageClient from './PolishPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Полировка кузова',
  description:
    'Профессиональная полировка кузова в Омске. Удаление царапин, голограмм и паутины. Цены от 10 000 ₽. Опыт 5 лет, гарантия качества.',
  openGraph: {
    title: 'Полировка кузова | Лаборатория блеска',
    description:
      'Профессиональная полировка кузова в Омске. Вернём блеск и глубину цвета вашему автомобилю.',
  },
};

export default function PolishPage() {
  return <PolishPageClient />;
}