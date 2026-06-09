// app/ppf/page.tsx
import  PPFPageClient  from './PPFPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Бронирование плёнкой',
  description:
    'Бронирование автомобиля защитной плёнкой в Омске. Защита от сколов, царапин и реагентов. Самовосстановление при нагреве. Калькулятор стоимости.',
  openGraph: {
    title: 'Бронирование плёнкой | Лаборатория блеска',
    description:
      'Защитная полиуретановая плёнка для автомобиля. Самовосстановление, срок службы 5–7 лет.',
  },
};

export default function PPFPage() {
  return <PPFPageClient />;
}