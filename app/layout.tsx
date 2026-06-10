// app/layout.tsx
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ModalProvider } from '@/contexts/ModalContext';
import YandexMetrika from '@/components/layout/YandexMetrika';
import ScrollToTop from '@/components/ui/ScrollToTop';

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: {
    default: 'Лаборатория блеска — Детейлинг студия в Омске',
    template: '%s | Лаборатория блеска',
  },
  description:
    'Профессиональный детейлинг в Омске. Полировка кузова, керамическое покрытие, бронирование плёнкой. Гарантия качества, опыт 5 лет.',
  keywords: [
    'детейлинг Омск',
    'полировка кузова Омск',
    'керамическое покрытие Омск',
    'бронирование плёнкой Омск',
    'защита кузова',
    'детейлинг студия',
  ],
  authors: [{ name: 'Лаборатория блеска' }],
  creator: 'Лаборатория блеска',
  publisher: 'Лаборатория блеска',
  metadataBase: new URL('https://blesklab.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://blesklab.ru',
    siteName: 'Лаборатория блеска',
    title: 'Лаборатория блеска — Детейлинг студия в Омске',
    description:
      'Профессиональный детейлинг в Омске. Полировка, керамика, бронирование. Опыт 5 лет.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Лаборатория блеска',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    yandex: '125dc7f4e9c95fd8',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Лаборатория блеска',
  description:
    'Профессиональный детейлинг в Омске. Полировка, керамическое покрытие, бронирование плёнкой.',
  image: 'https://blesklab.ru/images/og-image.jpg',
  telephone: '+79620555858',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Индустриальная, 5Б',
    addressLocality: 'Омск',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 55.0302,
    longitude: 73.2345,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '10:00',
    closes: '20:00',
  },
  priceRange: 'от 5000 ₽',
  url: 'https://blesklab.ru',
  sameAs: [
    'https://t.me/rudenko_ds',
    'https://vkvideo.ru/@labofgloss',
    'https://instagram.com/labofgloss',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/logo/logo.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/images/logo/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      
      <body className="bg-bg-primary text-text-primary font-montserrat overflow-x-hidden">
        <ModalProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ModalProvider>
        <YandexMetrika />
        <ScrollToTop />
      </body>
    </html>
  );
}