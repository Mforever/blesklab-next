// components/forms/ModalForm.tsx
'use client';

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDiscord } from '@/hooks/useDiscord';
import { useYandexGoal } from '@/hooks/useYandexGoal';
import { useRouter } from 'next/navigation';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: 'polish' | 'ceramic' | 'ppf' | 'general';
  serviceName?: string;
  selectedZones?: string[];
  totalPrice?: number;
}

const SERVICE_LABELS: Record<string, string> = {
  polish: 'Полировка кузова',
  ceramic: 'Керамическое покрытие',
  ppf: 'Бронирование плёнкой',
};

export default function ModalForm({
  isOpen,
  onClose,
  serviceType = 'general',
  serviceName = 'услугу',
  selectedZones = [],
  totalPrice = 0,
}: ModalFormProps) {
  const router = useRouter();
  const { sendOrder } = useDiscord();
  const { sendGoal } = useYandexGoal();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    car: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFormData({ name: '', phone: '', car: '', message: '' });
        setPhoneError(null);
        setSubmitStatus(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Получаем только цифры
    let value = e.target.value.replace(/\D/g, '');

    // Ограничиваем 11 цифр (7 + 10)
    if (value.length > 11) value = value.slice(0, 11);

    // Форматируем
    let formatted = '';
    if (value.length > 0) {
      formatted = '+7';
      if (value.length > 1) formatted += ' ' + value.slice(1, 4);
      if (value.length > 4) formatted += ' ' + value.slice(4, 7);
      if (value.length > 7) formatted += ' ' + value.slice(7, 9);
      if (value.length > 9) formatted += ' ' + value.slice(9, 11);
    }

    setFormData({ ...formData, phone: formatted });

    // Проверка
    if (value.length > 0 && value.length < 11) {
      setPhoneError('Введите номер полностью');
    } else if (value.length === 11) {
      setPhoneError(null);
    } else {
      setPhoneError(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 11) {
      setPhoneError('Введите номер телефона полностью');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const displayName = SERVICE_LABELS[serviceType] || serviceName;

    const success = await sendOrder({
      name: formData.name,
      phone: formData.phone,
      car: formData.car,
      service: serviceType !== 'general' ? displayName : undefined,
      message: formData.message || undefined,
      selectedZones: selectedZones.length > 0 ? selectedZones.join(', ') : undefined,
      totalPrice: totalPrice > 0 ? totalPrice : undefined,
    });

    if (success) {
      sendGoal('form_submit', {
        service_type: serviceType,
        service_name: displayName,
        total_price: totalPrice,
        order_price: totalPrice,
        currency: 'RUB',
      });
      setSubmitStatus('success');
      setTimeout(() => onClose(), 2000);
    } else {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const getTitle = () => {
    switch (serviceType) {
      case 'polish': return 'Запись на полировку';
      case 'ceramic': return 'Запись на керамику';
      case 'ppf': return 'Запись на бронирование';
      default: return `Запись на ${serviceName}`;
    }
  };

  const isPhoneValid = formData.phone.replace(/\D/g, '').length === 11;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-bg-element rounded-2xl w-full max-w-md pointer-events-auto shadow-2xl border border-white/5 overflow-hidden">
              {/* Заголовок */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h2 className="text-lg font-semibold">{getTitle()}</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-white/5 text-text-secondary hover:text-accent transition-colors flex items-center justify-center"
                  aria-label="Закрыть"
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="2" y1="2" x2="14" y2="14" />
                    <line x1="14" y1="2" x2="2" y2="14" />
                  </svg>
                </button>
              </div>

              {/* Выбранные зоны */}
              {selectedZones.length > 0 && (
                <div className="px-6 pt-4">
                  <div className="bg-accent/5 rounded-lg p-3 border border-accent/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Выбрано зон:</span>
                      <span className="text-accent font-medium">{selectedZones.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-text-secondary">Сумма:</span>
                      <span className="text-accent font-medium">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Имя */}
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя *"
                    required
                    className="w-full px-4 py-3 bg-bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-text-primary placeholder-text-secondary/50 text-sm transition-all"
                  />
                </div>

                {/* Телефон */}
                <div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (___) ___-__-__"
                    className={`w-full px-4 py-3 bg-bg-secondary rounded-xl focus:outline-none focus:ring-2 text-text-primary text-base tracking-wider transition-all ${phoneError
                        ? 'ring-1 ring-red-500/30 focus:ring-red-500/50'
                        : isPhoneValid
                          ? 'ring-1 ring-green-500/30 focus:ring-green-500/50'
                          : 'focus:ring-accent/50'
                      }`}
                    maxLength={16}
                  />
                  {phoneError && (
                    <p className="text-red-400/80 text-xs mt-1">{phoneError}</p>
                  )}
                </div>

                {/* Авто */}
                <div>
                  <input
                    type="text"
                    value={formData.car}
                    onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                    placeholder="Марка и модель авто"
                    className="w-full px-4 py-3 bg-bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-text-primary placeholder-text-secondary/50 text-sm transition-all"
                  />
                </div>

                {/* Сообщение */}
                <div>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ваш вопрос (необязательно)"
                    rows={2}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-text-primary placeholder-text-secondary/50 text-sm resize-none transition-all"
                  />
                </div>

                {/* Кнопка */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.phone || !isPhoneValid}
                  className="w-full py-3 bg-accent hover:bg-accent-hover text-bg-primary font-medium rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>

                {/* Статусы */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-green-400 text-xs text-center p-2 bg-green-400/10 rounded-xl"
                  >
                    Заявка отправлена! Ответим в ближайшее время.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-red-400 text-xs text-center p-2 bg-red-400/10 rounded-xl"
                  >
                    Ошибка. Позвоните нам: +7 (962) 055-58-58
                  </motion.div>
                )}
              </form>

              {/* Политика */}
              <div className="px-6 pb-6">
                <p className="text-xs text-text-secondary/40 text-center">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setTimeout(() => router.push('/privacy'), 300);
                    }}
                    className="text-accent/70 hover:text-accent transition-colors"
                  >
                    политикой конфиденциальности
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}