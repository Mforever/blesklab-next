// app/gallery/page.tsx
import GalleryPageClient from './GalleryPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Наши работы',
  description:
    'Портфолио детейлинг-студии Лаборатория блеска в Омске. Примеры полировки, керамического покрытия и бронирования плёнкой.',
  openGraph: {
    title: 'Наши работы | Лаборатория блеска',
    description:
      'Реальные проекты: полировка, керамика, бронирование. BMW, Mercedes, Audi и другие автомобили.',
  },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}