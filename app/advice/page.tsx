// app/advice/page.tsx
import { getAllArticles } from '@/lib/mdx';
import AdvicePageClient from './AdvicePageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Советы экспертов',
  description:
    'Полезные статьи от детейлинг-студии Лаборатория блеска. Узнайте, как сохранить автомобиль в идеальном состоянии.',
  openGraph: {
    title: 'Советы экспертов | Лаборатория блеска',
    description: 'Статьи о полировке, керамике и бронировании автомобиля.',
  },
};

export default function AdvicePage() {
  const articles = getAllArticles();
  return <AdvicePageClient articles={articles} />;
}