// app/ceramic/page.tsx
import  CeramicPageClient  from './CeramicPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Керамическое покрытие',
  description:
    'Керамическое покрытие кузова в Омске. Защита от УФ, реагентов и царапин. Гидрофобный эффект, блеск на годы. Цены от 22 000 ₽.',
  openGraph: {
    title: 'Керамическое покрытие | Лаборатория блеска',
    description:
      'Профессиональное керамическое покрытие кузова. Защита на 2–5 лет, гидрофобный эффект 115°.',
  },
};

export default function CeramicPage() {
  return <CeramicPageClient />;
}