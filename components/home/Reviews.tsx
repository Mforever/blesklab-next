// components/home/Reviews.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { useDiscord } from '@/hooks/useDiscord';
import approvedReviews from '@/data/reviews/approved.json';

interface Review {
  id: number;
  name: string;
  carModel: string;
  rating: number;
  text: string;
  date: string;
  service: string;
  verified: boolean;
}

const REVIEWS_PER_PAGE = 3;

export default function Reviews() {
  const [reviews] = useState<Review[]>(approvedReviews as Review[]);
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', carModel: '', service: '', rating: 5, text: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const { sendReview } = useDiscord();

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;

    setFormStatus('submitting');

    // Отправка в Discord на модерацию
    await sendReview({
      name: formData.name,
      carModel: formData.carModel || 'Не указана',
      service: formData.service || 'Не указана',
      rating: formData.rating,
      text: formData.text,
    });

    setFormData({ name: '', carModel: '', service: '', rating: 5, text: '' });
    setShowForm(false);
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <section className="py-16 sm:py-20 bg-bg-primary">
      <div className="container-custom">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-accent font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4">
            Отзывы
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Что говорят о нас</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Реальные клиенты, реальные автомобили — честные впечатления
          </p>
        </div>

        {/* Внешние ссылки */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <a
            href="https://yandex.ru/maps/org/laboratoriya_bleska/224582731097/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all text-xs sm:text-sm font-medium active:scale-95 sm:hover:scale-105"
          >
            <Icon name="FaYandex" className="w-4 h-4" />
            Читать на Яндекс Картах
          </a>
          <a
            href="https://2gis.ru/omsk/firm/70000001028325432/tab/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-xl transition-all text-xs sm:text-sm font-medium active:scale-95 sm:hover:scale-105"
          >
            <Icon name="FaMapMarkerAlt" className="w-4 h-4" />
            Читать на 2ГИС
          </a>
        </div>

        {/* Карточки отзывов */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-bg-element rounded-xl p-4 sm:p-5 border border-white/5 hover:border-accent/20 transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">{review.name}</h4>
                  <p className="text-text-secondary text-xs">{review.carModel}</p>
                  {review.service && (
                    <p className="text-accent text-[10px] sm:text-xs mt-0.5">{review.service}</p>
                  )}
                </div>
                {review.verified && (
                  <span title="Подтверждённый отзыв">
  <Icon name="FaCheckCircle" className="text-accent/60 text-xs sm:text-sm shrink-0" />
</span>
                )}
              </div>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    name={i < review.rating ? 'FaStar' : 'FaRegStar'}
                    className={`text-xs ${i < review.rating ? 'text-accent' : 'text-text-secondary/30'}`}
                  />
                ))}
              </div>

              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">{review.text}</p>
              <p className="text-text-secondary/40 text-[10px] sm:text-xs mt-3 sm:mt-4">{review.date}</p>
            </div>
          ))}
        </div>

        {/* Показать ещё */}
        {hasMore && (
          <div className="text-center mb-6 sm:mb-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + REVIEWS_PER_PAGE)}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 border border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-lg transition-all text-xs sm:text-sm active:scale-95"
            >
              Показать ещё
              <Icon name="FaChevronDown" className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Кнопка «Оставить отзыв» */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all text-sm font-medium active:scale-95"
          >
            <Icon name="FaPen" className="w-3 h-3" />
            Оставить отзыв
          </button>
        </div>
      </div>

      {/* Модалка формы отзыва */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="bg-bg-element rounded-2xl w-full max-w-lg border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 sm:p-5 border-b border-white/10">
                  <h3 className="text-lg sm:text-xl font-bold">Оставить отзыв</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="w-8 h-8 rounded-lg bg-bg-secondary hover:bg-accent hover:text-bg-primary text-text-secondary transition-colors flex items-center justify-center"
                    aria-label="Закрыть"
                  >
                    <Icon name="FaTimes" className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                  <p className="text-text-secondary text-xs">Отзыв будет опубликован после проверки модератором.</p>
                  <input type="text" placeholder="Ваше имя *" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-text-primary placeholder-text-secondary/50 text-sm" required />
                  <input type="text" placeholder="Марка и модель авто" value={formData.carModel}
                    onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-text-primary placeholder-text-secondary/50 text-sm" />
                  <select value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-text-primary text-sm">
                    <option value="">Какую услугу заказывали?</option>
                    <option value="Полировка кузова">Полировка кузова</option>
                    <option value="Керамическое покрытие">Керамическое покрытие</option>
                    <option value="Бронирование плёнкой">Бронирование плёнкой</option>
                    <option value="Полировка + Керамика">Полировка + Керамика</option>
                  </select>
                  <div>
                    <label className="text-text-secondary text-sm mb-2 block">Ваша оценка</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          aria-label={`Оценка ${star}`}>
                          <Icon
                            name={star <= formData.rating ? 'FaStar' : 'FaRegStar'}
                            className={`text-lg sm:text-xl transition-colors ${star <= formData.rating ? 'text-accent' : 'text-text-secondary/30'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea placeholder="Ваш отзыв *" rows={4} value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-text-primary placeholder-text-secondary/50 text-sm resize-none" required />
                  <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={formStatus === 'submitting'}
                      className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all text-sm font-medium disabled:opacity-50 active:scale-95">
                      {formStatus === 'submitting' ? 'Отправка...' : 'Отправить на модерацию'}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 border border-white/10 rounded-lg hover:border-accent transition-all text-sm text-text-secondary active:scale-95">
                      Отмена
                    </button>
                  </div>
                  {formStatus === 'success' && (
                    <p className="text-green-400 text-xs text-center">Спасибо! Отзыв отправлен на модерацию.</p>
                  )}
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}