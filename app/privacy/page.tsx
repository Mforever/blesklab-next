// app/privacy/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description:
    'Политика обработки персональных данных ИП Руденко Д.С. Соблюдение 152-ФЗ «О персональных данных».',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-text-secondary text-sm">
            Дата последнего обновления: 31 мая 2026 г.
          </p>
        </div>

        <div className="space-y-6">
          <section className="bg-bg-element rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-accent">
              1. Общие положения
            </h2>
            <p className="text-text-secondary mb-4">
              Настоящая политика обработки персональных данных составлена в соответствии с
              требованиями Федерального закона от 27.07.2006 №152-ФЗ «О персональных данных» и
              определяет порядок обработки персональных данных и меры по обеспечению безопасности
              персональных данных, предпринимаемые ИП Руденко Д.С. (далее — Оператор).
            </p>
            <p className="text-text-secondary">
              Оператор ставит своей важнейшей целью и условием осуществления своей деятельности
              соблюдение прав и свобод человека и гражданина при обработке его персональных данных,
              в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
            </p>
          </section>

          <section className="bg-bg-element rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-accent">
              2. Какие данные мы собираем
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Имя, фамилия, отчество</li>
              <li>Номер контактного телефона</li>
              <li>Адрес электронной почты</li>
              <li>Марка и модель автомобиля</li>
              <li>IP-адрес и данные о местоположении</li>
              <li>Файлы cookie</li>
            </ul>
          </section>

          <section className="bg-bg-element rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-accent">
              3. Цели обработки данных
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Заключение и исполнение договоров</li>
              <li>Обратная связь с клиентами</li>
              <li>Предоставление консультаций</li>
              <li>Анализ посещаемости сайта</li>
              <li>Повышение качества услуг</li>
            </ul>
          </section>

          <section className="bg-bg-element rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-accent">
              4. Контакты
            </h2>
            <p className="text-text-secondary mb-2">
              <strong>Индивидуальный предприниматель:</strong> Руденко Дмитрий Сергеевич
            </p>
            <p className="text-text-secondary mb-2">
              <strong>Телефон:</strong>{' '}
              <a href="tel:+79620555858" className="text-accent hover:underline">
                +7 (962) 055-58-58
              </a>
            </p>
            <p className="text-text-secondary">
              <strong>Email:</strong>{' '}
              <a href="mailto:mforever040@gmail.com" className="text-accent hover:underline">
                mforever040@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}