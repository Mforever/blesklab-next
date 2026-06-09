// hooks/useDiscord.ts
'use client';

import { useCallback } from 'react';

interface SendOrderParams {
  name: string;
  phone: string;
  car?: string;
  service?: string;
  message?: string;
  selectedZones?: string;
  totalPrice?: number;
}

interface SendReviewParams {
  name: string;
  carModel: string;
  service: string;
  rating: number;
  text: string;
}

const ORDERS_WEBHOOK = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_ORDERS || '';
const REVIEWS_WEBHOOK = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_REVIEWS || '';

export function useDiscord() {
  const sendOrder = useCallback(async (params: SendOrderParams): Promise<boolean> => {
    if (!ORDERS_WEBHOOK) {
      console.error('Discord: вебхук для заявок не настроен');
      return false;
    }

    const { name, phone, car, service, message, selectedZones, totalPrice } = params;

    const fields = [
      { name: '👤 Имя', value: name || 'Не указано', inline: true },
      { name: '📞 Телефон', value: phone, inline: true },
    ];

    if (car) fields.push({ name: '🚗 Автомобиль', value: car, inline: true });
    if (service) fields.push({ name: '🛠️ Услуга', value: service, inline: true });
    if (selectedZones) fields.push({ name: '📍 Зоны', value: selectedZones, inline: false });
    if (totalPrice) fields.push({ name: '💰 Сумма', value: `${totalPrice.toLocaleString()} ₽`, inline: true });

    const embed = {
      title: '🔔 Новая заявка с сайта!',
      color: 0x91CB7D,
      fields,
      footer: {
        text: `Лаборатория блеска • ${new Date().toLocaleString('ru-RU')}`,
      },
      timestamp: new Date().toISOString(),
    };

    if (message) {
      embed.fields.push({ name: '💬 Комментарий', value: message, inline: false });
    }

    try {
      const response = await fetch(ORDERS_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
      });

      return response.ok;
    } catch (error) {
      console.error('Discord send error:', error);
      return false;
    }
  }, []);

  const sendReview = useCallback(async (params: SendReviewParams): Promise<boolean> => {
    if (!REVIEWS_WEBHOOK) {
      console.error('Discord: вебхук для отзывов не настроен');
      return false;
    }

    const { name, carModel, service, rating, text } = params;

    const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);

    const embed = {
      title: '📝 Новый отзыв на модерацию',
      color: 0xFBBF24,
      fields: [
        { name: '👤 Имя', value: name, inline: true },
        { name: '🚗 Автомобиль', value: carModel, inline: true },
        { name: '🛠️ Услуга', value: service, inline: true },
        { name: '⭐ Оценка', value: `${stars} (${rating}/5)`, inline: false },
        { name: '💬 Текст', value: text, inline: false },
      ],
      footer: {
        text: `Лаборатория блеска • ${new Date().toLocaleString('ru-RU')}`,
      },
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(REVIEWS_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
      });

      return response.ok;
    } catch (error) {
      console.error('Discord send error:', error);
      return false;
    }
  }, []);

  return { sendOrder, sendReview };
}