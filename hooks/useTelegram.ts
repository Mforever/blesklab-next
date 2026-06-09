// hooks/useTelegram.ts
'use client';

import { useCallback } from 'react';

interface SendMessageParams {
  name: string;
  phone: string;
  car?: string;
  service?: string;
  message?: string;
  selectedZones?: string;
  totalPrice?: number;
}

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '';
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '';

export function useTelegram() {
  const sendMessage = useCallback(
    async (params: SendMessageParams): Promise<boolean> => {
      if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Telegram: токен или chat_id не настроены');
        return false;
      }

      const { name, phone, car, service, message, selectedZones, totalPrice } = params;

      let text = '🔔 *Новая заявка с сайта!*\n\n';
      text += `👤 *Имя:* ${name || 'Не указано'}\n`;
      text += `📞 *Телефон:* ${phone}\n`;
      if (car) text += `🚗 *Автомобиль:* ${car}\n`;
      if (service) text += `🛠️ *Услуга:* ${service}\n`;
      if (selectedZones) text += `📍 *Зоны:* ${selectedZones}\n`;
      if (totalPrice) text += `💰 *Сумма:* ${totalPrice.toLocaleString()} ₽\n`;
      if (message) text += `💬 *Сообщение:* ${message}\n`;
      text += `\n📅 *Дата:* ${new Date().toLocaleString('ru-RU')}`;

      try {
        const response = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: CHAT_ID,
              text,
              parse_mode: 'Markdown',
            }),
          }
        );

        const data = await response.json();
        return data.ok === true;
      } catch (error) {
        console.error('Telegram send error:', error);
        return false;
      }
    },
    []
  );

  return { sendMessage };
}